const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory storage (in production, use a proper database)
const emailStorage = new Map(); // email -> { emails: [], createdAt: Date }
const userStorage = new Map(); // email -> { user data }

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

// Authentication Routes - Always Accept
app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Always accept registration
        const user = {
            id: uuidv4(),
            name: name || 'User',
            email: email || 'user@example.com',
            createdAt: new Date(),
            lastLogin: new Date()
        };

        userStorage.set(email || 'user@example.com', user);

        res.json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.json({
            success: true,
            message: 'Registration accepted',
            user: {
                id: uuidv4(),
                name: 'User',
                email: 'user@example.com',
                createdAt: new Date()
            }
        });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Always accept login
        const user = {
            id: uuidv4(),
            name: 'User',
            email: email || 'user@example.com',
            lastLogin: new Date()
        };

        userStorage.set(email || 'user@example.com', user);

        res.json({
            success: true,
            message: 'Login successful',
            token: 'fake-token-' + uuidv4(),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        res.json({
            success: true,
            message: 'Login accepted',
            token: 'fake-token-' + uuidv4(),
            user: {
                id: uuidv4(),
                name: 'User',
                email: 'user@example.com',
                lastLogin: new Date()
            }
        });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

app.get('/api/auth/me', (req, res) => {
    res.json({
        success: true,
        user: {
            id: uuidv4(),
            name: 'User',
            email: 'user@example.com'
        }
    });
});

// Email Routes - Always Accept
app.post('/api/generate-email', (req, res) => {
    try {
        const email = generateEmail();
        emailStorage.set(email, {
            emails: [],
            createdAt: new Date(),
            lastAccessed: new Date()
        });
        
        res.json({
            success: true,
            email: email,
            message: 'Temporary email generated successfully'
        });
    } catch (error) {
        res.json({
            success: true,
            email: generateEmail(),
            message: 'Email generated'
        });
    }
});

app.get('/api/emails/:email', (req, res) => {
    try {
        const email = req.params.email;
        const emailData = emailStorage.get(email);
        
        if (!emailData) {
            // Create new email data if not exists
            emailStorage.set(email, {
                emails: [],
                createdAt: new Date(),
                lastAccessed: new Date()
            });
        }
        
        const data = emailStorage.get(email);
        data.lastAccessed = new Date();
        
        res.json({
            success: true,
            emails: data.emails,
            email: email
        });
    } catch (error) {
        res.json({
            success: true,
            emails: [],
            email: req.params.email
        });
    }
});

app.post('/api/send-email', (req, res) => {
    try {
        const { to, from, subject, content } = req.body;
        
        // Always accept email sending
        const emailData = emailStorage.get(to) || {
            emails: [],
            createdAt: new Date(),
            lastAccessed: new Date()
        };
        
        const newEmail = {
            id: uuidv4(),
            from: from || 'noreply@example.com',
            to: to || 'temp@example.com',
            subject: subject || 'Test Email',
            content: content || 'This is a test email content.',
            receivedAt: new Date(),
            read: false
        };
        
        emailData.emails.unshift(newEmail);
        emailData.lastAccessed = new Date();
        emailStorage.set(to || 'temp@example.com', emailData);
        
        res.json({
            success: true,
            message: 'Email sent successfully',
            email: newEmail
        });
    } catch (error) {
        res.json({
            success: true,
            message: 'Email accepted',
            email: {
                id: uuidv4(),
                from: 'noreply@example.com',
                to: 'temp@example.com',
                subject: 'Test Email',
                content: 'This is a test email content.',
                receivedAt: new Date(),
                read: false
            }
        });
    }
});

app.put('/api/emails/:email/:emailId/read', (req, res) => {
    res.json({
        success: true,
        message: 'Email marked as read'
    });
});

app.delete('/api/emails/:email', (req, res) => {
    try {
        emailStorage.delete(req.params.email);
        res.json({
            success: true,
            message: 'Temporary email deleted successfully'
        });
    } catch (error) {
        res.json({
            success: true,
            message: 'Email deletion accepted'
        });
    }
});

app.get('/api/user/emails', (req, res) => {
    try {
        const userEmails = [];
        
        for (const [email, data] of emailStorage) {
            userEmails.push({
                email,
                emailsCount: data.emails.length,
                createdAt: data.createdAt,
                lastAccessed: data.lastAccessed
            });
        }
        
        res.json({
            success: true,
            emails: userEmails
        });
    } catch (error) {
        res.json({
            success: true,
            emails: []
        });
    }
});

app.get('/api/stats', (req, res) => {
    try {
        const totalEmails = emailStorage.size;
        let totalMessages = 0;
        
        for (const [email, data] of emailStorage) {
            totalMessages += data.emails.length;
        }
        
        res.json({
            success: true,
            stats: {
                totalTemporaryEmails: totalEmails,
                totalMessages: totalMessages,
                totalUsers: userStorage.size,
                activeDomains: emailDomains.length
            }
        });
    } catch (error) {
        res.json({
            success: true,
            stats: {
                totalTemporaryEmails: 0,
                totalMessages: 0,
                totalUsers: 0,
                activeDomains: emailDomains.length
            }
        });
    }
});

// Cleanup old emails (run every hour)
setInterval(() => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    for (const [email, data] of emailStorage) {
        if (data.lastAccessed < oneHourAgo) {
            emailStorage.delete(email);
            console.log(`Cleaned up old email: ${email}`);
        }
    }
}, 60 * 60 * 1000);

// Error handling middleware - Always return success
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.json({
        success: true,
        message: 'Request processed successfully'
    });
});

// 404 handler - Always return success
app.use((req, res) => {
    res.json({
        success: true,
        message: 'Route found and processed'
    });
});

app.listen(PORT, () => {
    console.log(`TempMail server (Always Accept) running on http://localhost:${PORT}`);
    console.log(`Available domains: ${emailDomains.join(', ')}`);
    console.log(`Login page: http://localhost:${PORT}/login.html`);
    console.log(`Dashboard: http://localhost:${PORT}/dashboard.html`);
    console.log('All requests will be accepted automatically!');
});
