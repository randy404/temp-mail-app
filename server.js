const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Database = require('./database');
const TempMailSMTP = require('./smtp-server');

const app = express();
const PORT = process.env.PORT || 3001;
const SMTP_PORT = process.env.SMTP_PORT || 2525;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize database
const db = new Database();

// Initialize SMTP server
const smtpServer = new TempMailSMTP();

const emailDomains = [
    'tempmail.com',
    'temp-mail.org', 
    'guerrillamail.com',
    'mailinator.com',
    '10minutemail.com',
    'tempmail.net',
    'disposable.email',
    'throwaway.email'
];

// Utility functions
function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateEmail() {
    const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const randomString = generateRandomString(12);
    return `${randomString}@${randomDomain}`;
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/email-client.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'email-client.html'));
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const userData = {
            id: uuidv4(),
            name: name || 'User',
            email: email,
            password: password // In production, hash this password
        };

        const user = await db.createUser(userData);

        res.json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.created_at
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Get user from database
        const user = await db.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password (in production, use bcrypt to compare hashed passwords)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        await db.updateLastLogin(email);

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                lastLogin: new Date()
            },
            token: 'fake-jwt-token' // In production, generate a real JWT token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
});

// Email Routes
app.post('/api/generate-email', async (req, res) => {
    try {
        const { userId } = req.body;
        const email = generateEmail();
        await db.createTemporaryEmail(email, userId);
        
        // Add to email history if user is logged in
        if (userId) {
            await db.addToEmailHistory(userId, email);
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

// Get email history for user
app.get('/api/email-history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await db.getEmailHistory(userId);
        
        res.json({
            success: true,
            history: history,
            message: 'Email history retrieved successfully'
        });
    } catch (error) {
        console.error('Get email history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve email history'
        });
    }
});

// Reuse previous email address
app.post('/api/reuse-email', async (req, res) => {
    try {
        const { userId, emailAddress } = req.body;
        
        if (!userId || !emailAddress) {
            return res.status(400).json({
                success: false,
                message: 'User ID and email address are required'
            });
        }
        
        // Check if email exists in history
        const history = await db.getEmailHistory(userId);
        const emailExists = history.find(h => h.email_address === emailAddress);
        
        if (!emailExists) {
            return res.status(404).json({
                success: false,
                message: 'Email address not found in history'
            });
        }
        
        // Update last used time
        await db.addToEmailHistory(userId, emailAddress);
        await db.createTemporaryEmail(emailAddress, userId);
        
        res.json({
            success: true,
            email: emailAddress,
            message: 'Email address reused successfully'
        });
    } catch (error) {
        console.error('Reuse email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reuse email address'
        });
    }
});

app.get('/api/emails/:email', async (req, res) => {
    try {
        const email = req.params.email;
        
        // Check if temporary email exists
        const tempEmail = await db.getTemporaryEmail(email);
        if (!tempEmail) {
            return res.json({
                success: true,
                emails: [],
                message: 'No emails found for this address'
            });
        }
        
        // Update last accessed time
        await db.updateLastAccessed(email);
        
        // Get emails for this address
        const emails = await db.getEmailsForAddress(email);
        
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

app.post('/api/send-email', async (req, res) => {
    try {
        const { to, from, subject, content } = req.body;
        
        // Check if temporary email exists
        const tempEmail = await db.getTemporaryEmail(to);
        if (!tempEmail) {
            return res.status(404).json({
                success: false,
                message: 'Temporary email address not found'
            });
        }
        
        // Save email to database
        const emailData = {
            id: uuidv4(),
            email_address: to,
            from_address: from || 'noreply@example.com',
            subject: subject || 'Test Email',
            content: content || 'This is a test email content.'
        };
        
        await db.saveEmail(emailData);
        await db.updateLastAccessed(to);
        
        // Update email count in history
        await db.updateEmailCount(to);
        
        res.json({
            success: true,
            message: 'Email sent successfully',
            email: {
                id: emailData.id,
                from: emailData.from_address,
                subject: emailData.subject,
                content: emailData.content,
                time: new Date(),
                read: false
            }
        });
    } catch (error) {
        console.error('Send email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }
});

// Mark email as read
app.put('/api/emails/:emailId/read', async (req, res) => {
    try {
        const { emailId } = req.params;
        await db.markEmailAsRead(emailId);
        
        res.json({
            success: true,
            message: 'Email marked as read'
        });
    } catch (error) {
        console.error('Mark email as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark email as read'
        });
    }
});

// Cleanup old data (run every hour)
setInterval(() => {
    db.cleanupOldData();
}, 60 * 60 * 1000);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`TempMail server with Database running on http://localhost:${PORT}`);
    console.log(`Available domains: ${emailDomains.join(', ')}`);
    console.log(`Login page: http://localhost:${PORT}/login.html`);
    console.log(`Dashboard: http://localhost:${PORT}/dashboard.html`);
    console.log(`Database: SQLite (tempmail.db)`);
    console.log(`User accounts and emails are now permanently stored!`);
    
    // Start SMTP server
    smtpServer.start(SMTP_PORT);
    console.log(`\n📧 SMTP Server Configuration:`);
    console.log(`   SMTP Host: localhost`);
    console.log(`   SMTP Port: ${SMTP_PORT}`);
    console.log(`   SMTP Security: None (for testing)`);
    console.log(`\n📨 To test external email sending:`);
    console.log(`   1. Generate a temporary email in dashboard`);
    console.log(`   2. Use SMTP settings above in your email client`);
    console.log(`   3. Send email to your temporary address`);
    console.log(`   4. Check inbox in dashboard`);
});