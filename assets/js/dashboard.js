// Shadow Agency - Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                sidebar.classList.add('show');
                if (sidebarOverlay) sidebarOverlay.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                sidebar.classList.toggle('collapsed');
                const mainContent = document.getElementById('mainContent');
                if (mainContent) mainContent.classList.toggle('expanded');
            }
        });
    }

    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('show');
            if (sidebarOverlay) sidebarOverlay.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Active Menu Item
    const menuItems = document.querySelectorAll('.sidebar-nav .nav-link');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Chart Initialization
    initializeCharts();

    // Rebuild dashboard charts after theme changes so labels stay readable.
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTimeout(initializeCharts, 0);
        });
    }
    
    // Data Tables
    initializeDataTables();
    
    // Real-time Updates
    startRealTimeUpdates();
    
    // Form Submissions
    handleFormSubmissions();
    
    // Notifications
    initializeNotifications();
});

let analyticsChartInstance = null;

function getDashboardChartTheme() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (theme === 'light') {
        return {
            text: '#1a1a1a',
            grid: 'rgba(26, 26, 26, 0.12)',
            line: '#1a1f2e',
            fill: 'rgba(26, 31, 46, 0.10)'
        };
    }
    return {
        text: '#e8e8e8',
        grid: 'rgba(255, 255, 255, 0.14)',
        line: '#d4af37',
        fill: 'rgba(212, 175, 55, 0.14)'
    };
}

function initializeCharts() {
    // Analytics Chart
    const analyticsCtx = document.getElementById('analyticsChart');
    if (analyticsCtx) {
        const chartTheme = getDashboardChartTheme();
        if (analyticsChartInstance) {
            analyticsChartInstance.destroy();
        }
        analyticsChartInstance = new Chart(analyticsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Cases',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: chartTheme.line,
                    backgroundColor: chartTheme.fill,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: chartTheme.text
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: chartTheme.text
                        },
                        grid: {
                            color: chartTheme.grid
                        }
                    },
                    y: {
                        ticks: {
                            color: chartTheme.text
                        },
                        grid: {
                            color: chartTheme.grid
                        }
                    }
                }
            }
        });
    }
    
    // Cases Distribution Chart
    const casesCtx = document.getElementById('casesChart');
    if (casesCtx) {
        new Chart(casesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Surveillance', 'Background', 'Fraud', 'Corporate', 'Missing Persons'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#1a1f2e',
                        '#4a5568',
                        '#718096',
                        '#a0aec0',
                        '#cbd5e0'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
}

function initializeDataTables() {
    // Users Table
    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        // Initialize DataTable or custom table functionality
        console.log('Users table initialized');
    }
    
    // Cases Table
    const casesTable = document.getElementById('casesTable');
    if (casesTable) {
        // Initialize DataTable or custom table functionality
        console.log('Cases table initialized');
    }
    
    // Messages Table
    const messagesTable = document.getElementById('messagesTable');
    if (messagesTable) {
        // Initialize DataTable or custom table functionality
        console.log('Messages table initialized');
    }
}

function startRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        updateDashboardStats();
    }, 30000); // Update every 30 seconds
}

function updateDashboardStats() {
    // Update statistics
    const statsElements = document.querySelectorAll('.stat-value');
    
    statsElements.forEach(element => {
        const currentValue = parseInt(element.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // Random change between -2 and 2
        const newValue = Math.max(0, currentValue + change);
        
        element.textContent = newValue;
        
        // Add animation
        element.classList.add('updated');
        setTimeout(() => {
            element.classList.remove('updated');
        }, 1000);
    });
}

function handleFormSubmissions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Show loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
            }
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Submit';
                }
                
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                
                // Reset form
                this.reset();
            }, 2000);
        });
    });
}

function initializeNotifications() {
    // Notification dropdown
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationBadge = document.getElementById('notificationBadge');
    
    if (notificationDropdown && notificationBadge) {
        // Simulate new notifications
        setInterval(() => {
            const currentCount = parseInt(notificationBadge.textContent);
            const newCount = currentCount + Math.floor(Math.random() * 3);
            
            notificationBadge.textContent = newCount;
            notificationBadge.classList.add('pulse');
            
            setTimeout(() => {
                notificationBadge.classList.remove('pulse');
            }, 1000);
        }, 60000); // New notification every minute
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusBadge(status) {
    const badges = {
        'active': '<span class="badge bg-success">Active</span>',
        'pending': '<span class="badge bg-warning">Pending</span>',
        'completed': '<span class="badge bg-info">Completed</span>',
        'cancelled': '<span class="badge bg-danger">Cancelled</span>'
    };
    
    return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}

// Export functions for global use
window.dashboardUtils = {
    showNotification,
    formatCurrency,
    formatDate,
    getStatusBadge
};

