class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
    }

    bindEvents() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Password confirmation validation
        document.getElementById('confirmPassword').addEventListener('input', () => {
            this.validatePasswordMatch();
        });
    }

    async handleLogin() {
        const form = document.getElementById('loginForm');
        const formData = new FormData(form);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
            rememberMe: document.getElementById('rememberMe').checked
        };

        const submitBtn = form.querySelector('.auth-btn');
        this.setLoading(submitBtn, true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (result.success) {
                this.currentUser = result.user;
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('userToken', result.token || 'fake-jwt-token');
                localStorage.setItem('userEmail', result.user.email);
                localStorage.setItem('userName', result.user.name);
                if (loginData.rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                this.showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                this.showMessage(result.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        } finally {
            this.setLoading(submitBtn, false);
        }
    }

    async handleRegister() {
        const form = document.getElementById('registerForm');
        const formData = new FormData(form);
        
        const registerData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validate passwords match
        if (registerData.password !== registerData.confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        const submitBtn = form.querySelector('.auth-btn');
        this.setLoading(submitBtn, true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            const result = await response.json();

            if (result.success) {
                this.showMessage('Registration successful! Please login.', 'success');
                setTimeout(() => {
                    showLogin();
                }, 1500);
            } else {
                this.showMessage(result.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        } finally {
            this.setLoading(submitBtn, false);
        }
    }

    validatePasswordMatch() {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmInput = document.getElementById('confirmPassword');

        if (confirmPassword && password !== confirmPassword) {
            confirmInput.style.borderColor = '#dc3545';
            return false;
        } else {
            confirmInput.style.borderColor = '#e0e0e0';
            return true;
        }
    }

    setLoading(button, loading) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showMessage(message, type) {
        const container = document.getElementById('messageContainer');
        
        // Remove existing messages
        const existingMessages = container.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        messageDiv.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    checkAuthStatus() {
        const user = localStorage.getItem('user');
        const rememberMe = localStorage.getItem('rememberMe');
        
        if (user && rememberMe) {
            this.currentUser = JSON.parse(user);
            // Auto redirect to dashboard if already logged in
            if (window.location.pathname === '/login.html') {
                window.location.href = 'dashboard.html';
            }
        }
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('rememberMe');
        this.currentUser = null;
        window.location.href = 'index.html';
    }
}

// Global functions for form switching
function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('authTitle').textContent = 'Create your account';
    document.getElementById('toggleAuth').innerHTML = 'Already have an account? <a href="#" onclick="showLogin()">Sign In</a>';
}

function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('authTitle').textContent = 'Sign in to your account';
    document.getElementById('toggleAuth').innerHTML = 'Don\'t have an account? <a href="#" onclick="showRegister()">Sign Up</a>';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
