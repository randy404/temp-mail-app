// Simple script for index page
document.addEventListener('DOMContentLoaded', () => {
    console.log('TempMail homepage loaded');
    
    // Check if user is already logged in
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        // User is logged in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});