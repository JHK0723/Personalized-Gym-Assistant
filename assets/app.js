// Main Application Controller
// Handles navigation and global state management

class GymManagementApp {
    constructor() {
        this.currentUser = null;
        this.currentRole = null; // 'member' or 'admin'
        this.appContainer = document.getElementById('app');
        this.init();
    }

    init() {
        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem('currentUser');
        const savedRole = localStorage.getItem('currentRole');

        if (savedUser && savedRole) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.currentRole = savedRole;
            } catch (e) {
                console.error('Error parsing saved user data:', e);
                this.logout();
                return;
            }
        }

        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        // Protected routes check
        const publicPages = ['login.html', 'signup.html', 'admin-login.html', 'admin-signup.html', 'index.html'];
        const isPublicPage = publicPages.includes(page);

        if (!this.currentUser && !isPublicPage) {
            window.location.href = '../auth/login.html';
            return;
        }

        // Initialize current page logic
        this.initCurrentPage(page);

        // Set up global navigation listener
        window.addEventListener('navigate', (e) => this.handleNavigation(e.detail));
    }

    initCurrentPage(page) {
        // Update user info if navbar exists
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay && this.currentUser) {
            userNameDisplay.textContent = this.currentUser.name || this.currentUser.email;
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Call specific init functions based on page
        if (page === 'login.html' || page === 'index.html') {
            if (typeof initLoginPage === 'function') initLoginPage();
        } else if (page === 'signup.html') {
            if (typeof initSignupPage === 'function') initSignupPage();
        } else if (page === 'admin-login.html') {
            if (typeof initAdminLoginPage === 'function') initAdminLoginPage();
        } else if (page === 'admin-signup.html') {
            if (typeof initAdminSignupPage === 'function') initAdminSignupPage();
        } else if (page === 'dashboard.html') {
            const dashboardContent = document.getElementById('dashboardContent');
            if (dashboardContent && typeof createMemberDashboard === 'function') {
                dashboardContent.appendChild(createMemberDashboard(this.currentUser));
            }
            const adminDashboardContent = document.getElementById('adminDashboardContent');
            if (adminDashboardContent && typeof createAdminDashboard === 'function') {
                adminDashboardContent.appendChild(createAdminDashboard());
            }
        } else if (page === 'workouts.html') {
            if (typeof initWorkoutPage === 'function') initWorkoutPage();
        } else if (page === 'diet.html') {
            if (typeof initDietPage === 'function') initDietPage();
        } else if (page === 'manage-workouts.html') {
            const container = document.getElementById('workoutManagementContent');
            if (container && typeof createWorkoutManagementPage === 'function') {
                container.appendChild(createWorkoutManagementPage());
            }
        } else if (page === 'manage-diet.html') {
            const container = document.getElementById('dietManagementContent');
            if (container && typeof createDietManagementPage === 'function') {
                container.appendChild(createDietManagementPage());
            }
        } else if (page === 'membership.html') {
            const container = document.getElementById('membershipContent');
            if (container && typeof createMembershipPage === 'function') {
                container.appendChild(createMembershipPage(this.currentUser));
            }
        } else if (page === 'payment.html') {
            const container = document.getElementById('paymentContent');
            if (container && typeof createPaymentPage === 'function') {
                container.appendChild(createPaymentPage());
            }
        } else if (page === 'announcements-admin.html') {
            const container = document.getElementById('announcementManagementContent');
            if (container && typeof createAnnouncementsAdminPage === 'function') {
                container.appendChild(createAnnouncementsAdminPage());
            }
        }
    }


    showLoginPage() {
        this.appContainer.innerHTML = '';
        this.appContainer.appendChild(createLoginPage());
    }

    showAdminLoginPage() {
        this.appContainer.innerHTML = '';
        this.appContainer.appendChild(createAdminLoginPage());
    }

    showDashboard() {
        this.appContainer.innerHTML = '';
        this.renderNavbar();

        if (this.currentRole === 'member') {
            this.appContainer.appendChild(createMemberDashboard(this.currentUser));
        } else if (this.currentRole === 'admin') {
            this.appContainer.appendChild(createAdminDashboard());
        }
    }

    renderNavbar() {
        const navbar = document.createElement('nav');
        const userName = this.currentUser.name || this.currentUser.email;

        navbar.innerHTML = `
            <div class="logo">💪 GymFit</div>
            <ul class="nav-links" id="navLinks"></ul>
            <div class="user-info">
                <span>${userName}</span>
                <button class="logout-btn">Logout</button>
            </div>
        `;

        const navLinks = navbar.querySelector('#navLinks');

        if (this.currentRole === 'member') {
            navLinks.innerHTML = `
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))">Dashboard</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'workout' }))">Workouts</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'diet' }))">Diet Plans</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'announcements' }))">Announcements</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'membership' }))">Membership</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'payments' }))">Payments</a></li>
            `;
        } else if (this.currentRole === 'admin') {
            navLinks.innerHTML = `
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'admin-dashboard' }))">Dashboard</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-workouts' }))">Workouts</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-diet' }))">Diet Plans</a></li>
                <li><a onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'announcements-admin' }))">Announcements</a></li>
            `;
        }

        navbar.querySelector('.logout-btn').addEventListener('click', () => this.logout());
        this.appContainer.insertBefore(navbar, this.appContainer.firstChild);
    }

    handleNavigation(page) {
        const routes = {
            'dashboard': '../member-dashboard/dashboard.html',
            'workout': '../workout-diet/workouts.html',
            'diet': '../workout-diet/diet.html',
            'announcements': '../member-dashboard/announcements.html',
            'membership': '../payments/membership.html',
            'payments': '../payments/payment.html',
            'admin-dashboard': '../admin/dashboard.html',
            'manage-workouts': '../workout-diet/manage-workouts.html',
            'manage-diet': '../workout-diet/manage-diet.html',
            'announcements-admin': '../admin/announcements-admin.html'
        };

        if (routes[page]) {
            window.location.href = routes[page];
        }
    }


    setUser(user, role) {
        this.currentUser = user;
        this.currentRole = role;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentRole', role);

        if (role === 'member') {
            window.location.href = '../member-dashboard/dashboard.html';
        } else {
            window.location.href = '../admin/dashboard.html';
        }
    }


    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRole');
        this.currentUser = null;
        this.currentRole = null;

        // Find path to login
        const path = window.location.pathname;
        if (path.includes('/auth/')) {
            window.location.href = 'login.html';
        } else {
            window.location.href = '../auth/login.html';
        }
    }

}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GymManagementApp();
});
