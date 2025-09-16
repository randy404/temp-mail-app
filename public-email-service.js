const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Database = require('./database');
const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const nodemailer = require('nodemailer');

class PublicEmailService {
    constructor() {
        this.app = express();
        this.db = new Database();
        this.smtpServer = null;
        this.port = process.env.PORT || 3000;
        this.smtpPort = process.env.SMTP_PORT || 25;
        
        this.setupMiddleware();
        this.setupRoutes();
        
        // Only setup SMTP if not on Vercel
        if (!process.env.VERCEL) {
            this.setupSMTP();
        }
    }

    setupMiddleware() {
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname)));
        
        // Add security headers
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    setupRoutes() {
        // Public API for generating temporary emails
        this.app.get('/api/generate', async (req, res) => {
            try {
                const email = this.generateEmail();
                
                // For Vercel, use in-memory storage
                if (process.env.VERCEL) {
                    if (!global.tempEmails) global.tempEmails = new Map();
                    global.tempEmails.set(email, {
                        email: email,
                        created_at: new Date().toISOString(),
                        last_accessed: new Date().toISOString()
                    });
                } else {
                    await this.db.createTemporaryEmail(email);
                }
                
                res.json({
                    success: true,
                    email: email,
                    message: 'Temporary email generated successfully'
                });
            } catch (error) {
                console.error('Generate email error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to generate email'
                });
            }
        });

        // Public API for getting emails
        this.app.get('/api/emails/:email', async (req, res) => {
            try {
                const email = req.params.email;
                let emails = [];
                
                // For Vercel, use in-memory storage
                if (process.env.VERCEL) {
                    if (!global.emails) global.emails = new Map();
                    emails = global.emails.get(email) || [];
                } else {
                    emails = await this.db.getEmailsForAddress(email);
                }
                
                res.json({
                    success: true,
                    emails: emails,
                    message: 'Emails retrieved successfully'
                });
            } catch (error) {
                console.error('Get emails error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to retrieve emails'
                });
            }
        });

        // Test endpoint
        this.app.get('/test', (req, res) => {
            res.json({
                success: true,
                message: 'TempMail API is working!',
                timestamp: new Date().toISOString(),
                environment: process.env.VERCEL ? 'Vercel' : 'Local'
            });
        });

        // Public interface
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public-interface.html'));
        });

        // API for external services
        this.app.get('/api/domains', (req, res) => {
            res.json({
                success: true,
                domains: [
                    'tempmail.com',
                    'temp-mail.org',
                    'guerrillamail.com',
                    'mailinator.com',
                    '10minutemail.com',
                    'tempmail.net',
                    'disposable.email',
                    'throwaway.email'
                ]
            });
        });
    }

    setupSMTP() {
        this.smtpServer = new SMTPServer({
            authOptional: true,
            
            onData: (stream, session, callback) => {
                simpleParser(stream, {}, (err, parsed) => {
                    if (err) {
                        console.error('Email parsing error:', err);
                        return callback(err);
                    }

                    this.processIncomingEmail(parsed, session)
                        .then(() => {
                            console.log('Email processed successfully');
                            callback();
                        })
                        .catch((error) => {
                            console.error('Email processing error:', error);
                            callback(error);
                        });
                });
            },

            onRcptTo: (address, session, callback) => {
                const email = address.address.toLowerCase();
                console.log(`Email received for: ${email}`);
                
                const domains = [
                    'tempmail.com',
                    'temp-mail.org', 
                    'guerrillamail.com',
                    'mailinator.com',
                    '10minutemail.com',
                    'tempmail.net',
                    'disposable.email',
                    'throwaway.email'
                ];

                const emailDomain = email.split('@')[1];
                if (domains.includes(emailDomain)) {
                    console.log(`Accepting email for ${email}`);
                    callback();
                } else {
                    console.log(`Rejecting email for ${email} - not a temp mail domain`);
                    callback(new Error('Not a temporary email domain'));
                }
            },

            onMailFrom: (address, session, callback) => {
                console.log(`Email from: ${address.address}`);
                callback();
            }
        });
    }

    async processIncomingEmail(parsed, session) {
        try {
            const to = session.envelope.rcptTo[0].address.toLowerCase();
            const from = session.envelope.mailFrom.address;
            const subject = parsed.subject || 'No Subject';
            const content = parsed.text || parsed.html || 'No content';

            console.log(`Processing email:`);
            console.log(`  From: ${from}`);
            console.log(`  To: ${to}`);
            console.log(`  Subject: ${subject}`);

            // Check if temporary email exists
            const tempEmail = await this.db.getTemporaryEmail(to);
            if (!tempEmail) {
                console.log(`Temporary email ${to} not found in database`);
                return;
            }

            // Save email to database
            const emailData = {
                id: uuidv4(),
                email_address: to,
                from_address: from,
                subject: subject,
                content: content
            };

            await this.db.saveEmail(emailData);
            await this.db.updateLastAccessed(to);
            await this.db.updateEmailCount(to);

            console.log(`Email saved to database for ${to}`);
        } catch (error) {
            console.error('Error processing incoming email:', error);
            throw error;
        }
    }

    generateEmail() {
        const domains = [
            'tempmail.com',
            'temp-mail.org', 
            'guerrillamail.com',
            'mailinator.com',
            '10minutemail.com',
            'tempmail.net',
            'disposable.email',
            'throwaway.email'
        ];
        
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomString = this.generateRandomString(12);
        return `${randomString}@${randomDomain}`;
    }

    generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    start() {
        // Check if running on Vercel
        if (process.env.VERCEL) {
            console.log('🚀 Running on Vercel - SMTP server disabled');
            // Start only HTTP server for Vercel
            this.app.listen(this.port, () => {
                console.log(`🌐 Public Email Service running on Vercel`);
                console.log(`📨 Available domains:`);
                console.log(`   - tempmail.com`);
                console.log(`   - temp-mail.org`);
                console.log(`   - guerrillamail.com`);
                console.log(`   - mailinator.com`);
                console.log(`   - 10minutemail.com`);
                console.log(`   - tempmail.net`);
                console.log(`   - disposable.email`);
                console.log(`   - throwaway.email`);
                console.log(`\n✅ Web interface and API are ready!`);
                console.log(`❌ SMTP server disabled (not supported on Vercel)`);
            });
        } else {
            // Start HTTP server
            this.app.listen(this.port, () => {
                console.log(`🌐 Public Email Service running on http://localhost:${this.port}`);
                console.log(`📧 SMTP Server running on port ${this.smtpPort}`);
                console.log(`\n📨 Available domains:`);
                console.log(`   - tempmail.com`);
                console.log(`   - temp-mail.org`);
                console.log(`   - guerrillamail.com`);
                console.log(`   - mailinator.com`);
                console.log(`   - 10minutemail.com`);
                console.log(`   - tempmail.net`);
                console.log(`   - disposable.email`);
                console.log(`   - throwaway.email`);
                console.log(`\n🚀 To make this accessible from internet:`);
                console.log(`   1. Deploy to cloud server (Heroku, DigitalOcean, AWS)`);
                console.log(`   2. Configure DNS for domains`);
                console.log(`   3. Setup SMTP port forwarding`);
                console.log(`   4. Use public IP/domain`);
            });

            // Start SMTP server (only if not on Vercel)
            this.smtpServer.listen(this.smtpPort, () => {
                console.log(`📧 SMTP Server listening on port ${this.smtpPort}`);
            });

            this.smtpServer.on('error', (err) => {
                console.error('SMTP Server error:', err);
            });
        }
    }
}

// Create instance and start server
const service = new PublicEmailService();
service.start();

// Export for Vercel
module.exports = service.app;
