class TempMailDashboard {
    constructor() {
        this.currentEmail = '';
        this.emails = [];
        this.emailHistory = [];
        this.refreshInterval = null;
        this.userId = null;
        this.init();
    }

    init() {
        this.checkAuth();
        this.bindEvents();
        this.generateNewEmail();
        this.startAutoRefresh();
        this.updateStats();
    }

    checkAuth() {
        const userToken = localStorage.getItem('userToken');
        const userName = localStorage.getItem('userName');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!userToken) {
            window.location.href = 'login.html';
            return;
        }

        // Set user ID for API calls
        this.userId = user.id;

        // Update user name in header
        if (userName) {
            document.getElementById('userName').textContent = userName;
        }

        // Load email history
        this.loadEmailHistory();
    }

    bindEvents() {
        // Generate new email button
        document.getElementById('generateNew').addEventListener('click', () => {
            this.generateNewEmail();
        });

        // Copy email button
        document.getElementById('copyEmail').addEventListener('click', () => {
            this.copyEmailToClipboard();
        });

        // Refresh inbox button
        document.getElementById('refreshInbox').addEventListener('click', () => {
            this.refreshInbox();
        });

        // Toggle history button
        document.getElementById('toggleHistory').addEventListener('click', () => {
            this.toggleEmailHistory();
        });

        // Send test email button
        document.getElementById('sendTestEmail').addEventListener('click', () => {
            this.sendTestEmail();
        });

        // Modal close events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            const modal = document.getElementById('emailModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    async generateNewEmail() {
        try {
            const response = await fetch('/api/generate-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: this.userId
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.currentEmail = result.email;
                document.getElementById('emailAddress').value = this.currentEmail;
                this.emails = [];
                this.updateInbox();
                this.showMessage('New temporary email generated!', 'success');
                
                // Reload email history
                this.loadEmailHistory();
            } else {
                this.showMessage('Failed to generate email', 'error');
            }
        } catch (error) {
            console.error('Generate email error:', error);
            this.showMessage('Failed to generate email', 'error');
        }
    }

    generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async copyEmailToClipboard() {
        try {
            await navigator.clipboard.writeText(this.currentEmail);
            this.showMessage('Email address copied to clipboard!', 'success');
            
            // Visual feedback
            const copyBtn = document.getElementById('copyEmail');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '#2196F3';
            }, 2000);
        } catch (err) {
            this.showMessage('Failed to copy email address', 'error');
        }
    }

    async refreshInbox() {
        if (!this.currentEmail) {
            this.showMessage('Please generate a temporary email first', 'error');
            return;
        }

        const refreshBtn = document.getElementById('refreshInbox');
        const originalText = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<div class="loading"></div> Refreshing...';
        refreshBtn.disabled = true;

        try {
            // Get emails from database
            const response = await fetch(`/api/emails/${this.currentEmail}`);
            const result = await response.json();
            
            if (result.success) {
                // Convert database emails to local format
                this.emails = result.emails.map(email => ({
                    id: email.id,
                    from: email.from_address,
                    subject: email.subject,
                    content: email.content,
                    time: new Date(email.created_at),
                    read: email.is_read === 1
                }));
                
                this.updateInbox();
                this.updateStats();
                this.showMessage('Inbox refreshed!', 'success');
            } else {
                this.showMessage('Failed to refresh inbox', 'error');
            }
        } catch (error) {
            console.error('Refresh inbox error:', error);
            this.showMessage('Failed to refresh inbox', 'error');
        } finally {
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
        }
    }


    updateInbox() {
        const inbox = document.getElementById('inbox');
        
        if (this.emails.length === 0) {
            inbox.innerHTML = `
                <div class="empty-inbox">
                    <i class="fas fa-inbox"></i>
                    <p>No emails yet. Your temporary email is ready to receive messages.</p>
                </div>
            `;
            return;
        }

        const emailsHTML = this.emails.map(email => `
            <div class="email-item ${!email.read ? 'unread' : ''}" onclick="tempMailDashboard.openEmail('${email.id}')">
                <div class="email-preview">
                    <div class="email-from">${email.from}</div>
                    <div class="email-subject">${email.subject}</div>
                    <div class="email-snippet">${email.content.substring(0, 100)}...</div>
                </div>
                <div class="email-time">${this.formatTime(email.time)}</div>
            </div>
        `).join('');

        inbox.innerHTML = emailsHTML;
    }

    async openEmail(emailId) {
        const email = this.emails.find(e => e.id == emailId);
        if (!email) return;

        // Mark as read locally
        email.read = true;

        // Mark as read in database
        try {
            await fetch(`/api/emails/${emailId}/read`, {
                method: 'PUT'
            });
        } catch (error) {
            console.error('Error marking email as read:', error);
        }

        // Update modal content
        document.getElementById('emailSubject').textContent = email.subject;
        document.getElementById('emailFrom').textContent = email.from;
        document.getElementById('emailTo').textContent = this.currentEmail;
        document.getElementById('emailDate').textContent = email.time.toLocaleString();
        document.getElementById('emailContent').textContent = email.content;

        // Show modal
        document.getElementById('emailModal').style.display = 'block';
        
        // Update inbox display
        this.updateInbox();
    }

    closeModal() {
        document.getElementById('emailModal').style.display = 'none';
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert after email generator
        const emailGenerator = document.querySelector('.email-generator');
        emailGenerator.insertAdjacentElement('afterend', messageDiv);

        // Auto remove after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    updateStats() {
        document.getElementById('totalEmails').textContent = this.emails.length;
        document.getElementById('activeEmails').textContent = this.currentEmail ? '1' : '0';
        document.getElementById('blockedSpam').textContent = Math.floor(Math.random() * 10);
    }

    startAutoRefresh() {
        // Auto refresh every 30 seconds
        this.refreshInterval = setInterval(() => {
            this.refreshInbox();
        }, 30000);
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    // Email History Functions
    async loadEmailHistory() {
        if (!this.userId) return;

        try {
            const response = await fetch(`/api/email-history/${this.userId}`);
            const result = await response.json();
            
            if (result.success) {
                this.emailHistory = result.history;
                this.updateEmailHistoryUI();
            }
        } catch (error) {
            console.error('Load email history error:', error);
        }
    }

    updateEmailHistoryUI() {
        const historyList = document.getElementById('historyList');
        
        if (this.emailHistory.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-history"></i>
                    <p>No email history yet. Generate your first temporary email to see it here.</p>
                </div>
            `;
            return;
        }

        const historyHTML = this.emailHistory.map(item => `
            <div class="history-item">
                <div class="history-item-info">
                    <div class="history-email">${item.email_address}</div>
                    <div class="history-meta">
                        <span><i class="fas fa-envelope"></i> ${item.total_emails_received} emails</span>
                        <span><i class="fas fa-clock"></i> ${this.formatTime(new Date(item.last_used))}</span>
                    </div>
                </div>
                <div class="history-actions">
                    <button class="reuse-btn" onclick="tempMailDashboard.reuseEmail('${item.email_address}')">
                        <i class="fas fa-recycle"></i> Reuse
                    </button>
                </div>
            </div>
        `).join('');

        historyList.innerHTML = historyHTML;
    }

    toggleEmailHistory() {
        const historySection = document.getElementById('emailHistory');
        const toggleBtn = document.getElementById('toggleHistory');
        
        if (historySection.classList.contains('hidden')) {
            historySection.classList.remove('hidden');
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide History';
        } else {
            historySection.classList.add('hidden');
            toggleBtn.innerHTML = '<i class="fas fa-history"></i> Show History';
        }
    }

    async reuseEmail(emailAddress) {
        try {
            const response = await fetch('/api/reuse-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: this.userId,
                    emailAddress: emailAddress
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.currentEmail = result.email;
                document.getElementById('emailAddress').value = this.currentEmail;
                this.emails = [];
                this.updateInbox();
                this.showMessage('Email address reused successfully!', 'success');
                
                // Reload email history
                this.loadEmailHistory();
            } else {
                this.showMessage(result.message || 'Failed to reuse email', 'error');
            }
        } catch (error) {
            console.error('Reuse email error:', error);
            this.showMessage('Failed to reuse email', 'error');
        }
    }

    async sendTestEmail() {
        if (!this.currentEmail) {
            this.showMessage('Please generate a temporary email first', 'error');
            return;
        }

        const fromEmail = document.getElementById('testFrom').value;
        const subject = document.getElementById('testSubject').value;
        const content = document.getElementById('testContent').value;

        if (!fromEmail || !subject || !content) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const sendBtn = document.getElementById('sendTestEmail');
        const originalText = sendBtn.innerHTML;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        sendBtn.disabled = true;

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: this.currentEmail,
                    from: fromEmail,
                    subject: subject,
                    content: content
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.showMessage('Test email sent successfully! Check your inbox.', 'success');
                
                // Add email to local inbox immediately
                const newEmail = {
                    id: result.email.id,
                    from: result.email.from,
                    subject: result.email.subject,
                    content: result.email.content,
                    time: new Date(result.email.time),
                    read: false
                };
                
                this.emails.unshift(newEmail);
                this.updateInbox();
                this.updateStats();
                
                // Clear form
                document.getElementById('testFrom').value = 'test@example.com';
                document.getElementById('testSubject').value = 'Test Email from TempMail';
                document.getElementById('testContent').value = 'This is a test email to verify that your temporary email address is working correctly. If you receive this email, the system is functioning properly!';
                
            } else {
                this.showMessage(result.message || 'Failed to send test email', 'error');
            }
        } catch (error) {
            console.error('Send test email error:', error);
            this.showMessage('Failed to send test email', 'error');
        } finally {
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberMe');
    window.location.href = 'index.html';
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tempMailDashboard = new TempMailDashboard();
});
