const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const Database = require('./database');

class TempMailSMTP {
    constructor() {
        this.db = new Database();
        this.server = null;
        this.setupSMTP();
    }

    setupSMTP() {
        this.server = new SMTPServer({
            // Allow all connections (in production, add authentication)
            authOptional: true,
            
            // Handle incoming emails
            onData(stream, session, callback) {
                simpleParser(stream, {}, (err, parsed) => {
                    if (err) {
                        console.error('Email parsing error:', err);
                        return callback(err);
                    }

                    // Process the email
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

            // Handle RCPT TO (recipient)
            onRcptTo(address, session, callback) {
                const email = address.address.toLowerCase();
                console.log(`Email received for: ${email}`);
                
                // Check if this is one of our temporary email domains
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
                    callback(); // Accept the email
                } else {
                    console.log(`Rejecting email for ${email} - not a temp mail domain`);
                    callback(new Error('Not a temporary email domain'));
                }
            },

            // Handle MAIL FROM (sender)
            onMailFrom(address, session, callback) {
                console.log(`Email from: ${address.address}`);
                callback(); // Accept all senders
            }
        });

        // Bind processIncomingEmail to this instance
        this.server.onData = this.server.onData.bind(this);
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

            // Check if temporary email exists in database
            const tempEmail = await this.db.getTemporaryEmail(to);
            if (!tempEmail) {
                console.log(`Temporary email ${to} not found in database`);
                return;
            }

            // Save email to database
            const emailData = {
                id: require('uuid').v4(),
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

    start(port = 2525) {
        this.server.listen(port, () => {
            console.log(`SMTP Server running on port ${port}`);
            console.log(`You can send emails to temporary addresses using SMTP port ${port}`);
            console.log(`Example: smtp://localhost:${port}`);
        });

        this.server.on('error', (err) => {
            console.error('SMTP Server error:', err);
        });
    }

    stop() {
        if (this.server) {
            this.server.close();
            console.log('SMTP Server stopped');
        }
    }
}

module.exports = TempMailSMTP;
