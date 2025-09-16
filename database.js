const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, 'tempmail.db'));
        this.init();
    }

    init() {
        // Create users table
        this.db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME
            )
        `);

        // Create emails table
        this.db.run(`
            CREATE TABLE IF NOT EXISTS emails (
                id TEXT PRIMARY KEY,
                email_address TEXT NOT NULL,
                from_address TEXT NOT NULL,
                subject TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_read BOOLEAN DEFAULT 0
            )
        `);

        // Create temporary_emails table
        this.db.run(`
            CREATE TABLE IF NOT EXISTS temporary_emails (
                email_address TEXT PRIMARY KEY,
                user_id TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        `);

        // Create email_history table
        this.db.run(`
            CREATE TABLE IF NOT EXISTS email_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                email_address TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
                total_emails_received INTEGER DEFAULT 0,
                is_active BOOLEAN DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        `);

        console.log('Database initialized successfully');
    }

    // User methods
    createUser(userData) {
        return new Promise((resolve, reject) => {
            const { id, name, email, password } = userData;
            this.db.run(
                'INSERT INTO users (id, name, email, password, created_at, last_login) VALUES (?, ?, ?, ?, ?, ?)',
                [id, name, email, password, new Date().toISOString(), new Date().toISOString()],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID, ...userData });
                    }
                }
            );
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    updateLastLogin(email) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE users SET last_login = ? WHERE email = ?',
                [new Date().toISOString(), email],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    // Email methods
    createTemporaryEmail(emailAddress, userId = null) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT OR REPLACE INTO temporary_emails (email_address, user_id, created_at, last_accessed) VALUES (?, ?, ?, ?)',
                [emailAddress, userId, new Date().toISOString(), new Date().toISOString()],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ email_address: emailAddress, user_id: userId });
                    }
                }
            );
        });
    }

    getTemporaryEmail(emailAddress) {
        return new Promise((resolve, reject) => {
            this.db.get(
                'SELECT * FROM temporary_emails WHERE email_address = ?',
                [emailAddress],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    updateLastAccessed(emailAddress) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE temporary_emails SET last_accessed = ? WHERE email_address = ?',
                [new Date().toISOString(), emailAddress],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    // Email storage methods
    saveEmail(emailData) {
        return new Promise((resolve, reject) => {
            const { id, email_address, from_address, subject, content } = emailData;
            this.db.run(
                'INSERT INTO emails (id, email_address, from_address, subject, content, created_at, is_read) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id, email_address, from_address, subject, content, new Date().toISOString(), 0],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID, ...emailData });
                    }
                }
            );
        });
    }

    getEmailsForAddress(emailAddress) {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM emails WHERE email_address = ? ORDER BY created_at DESC',
                [emailAddress],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    markEmailAsRead(emailId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE emails SET is_read = 1 WHERE id = ?',
                [emailId],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    // Email history methods
    addToEmailHistory(userId, emailAddress) {
        return new Promise((resolve, reject) => {
            // Check if email already exists in history
            this.db.get(
                'SELECT * FROM email_history WHERE user_id = ? AND email_address = ?',
                [userId, emailAddress],
                (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    if (row) {
                        // Update existing record
                        this.db.run(
                            'UPDATE email_history SET last_used = ?, is_active = 1 WHERE user_id = ? AND email_address = ?',
                            [new Date().toISOString(), userId, emailAddress],
                            function(err) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({ id: row.id, ...row });
                                }
                            }
                        );
                    } else {
                        // Insert new record
                        this.db.run(
                            'INSERT INTO email_history (user_id, email_address, created_at, last_used, total_emails_received, is_active) VALUES (?, ?, ?, ?, ?, ?)',
                            [userId, emailAddress, new Date().toISOString(), new Date().toISOString(), 0, 1],
                            function(err) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({ id: this.lastID, user_id: userId, email_address: emailAddress });
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    getEmailHistory(userId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM email_history WHERE user_id = ? ORDER BY last_used DESC',
                [userId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    updateEmailCount(emailAddress) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE email_history SET total_emails_received = total_emails_received + 1, last_used = ? WHERE email_address = ?',
                [new Date().toISOString(), emailAddress],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    deactivateEmailHistory(userId, emailAddress) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE email_history SET is_active = 0 WHERE user_id = ? AND email_address = ?',
                [userId, emailAddress],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    // Cleanup old data
    cleanupOldData() {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        
        // Clean up old temporary emails
        this.db.run(
            'DELETE FROM temporary_emails WHERE last_accessed < ?',
            [oneHourAgo],
            function(err) {
                if (err) {
                    console.error('Error cleaning up temporary emails:', err);
                } else {
                    console.log(`Cleaned up ${this.changes} old temporary emails`);
                }
            }
        );

        // Clean up old emails
        this.db.run(
            'DELETE FROM emails WHERE created_at < ?',
            [oneHourAgo],
            function(err) {
                if (err) {
                    console.error('Error cleaning up emails:', err);
                } else {
                    console.log(`Cleaned up ${this.changes} old emails`);
                }
            }
        );
    }

    close() {
        this.db.close();
    }
}

module.exports = Database;
