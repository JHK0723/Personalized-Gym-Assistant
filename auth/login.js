// Member Login Module

// Dummy user data for testing
const DUMMY_USERS = [
    { id: 1, email: 'john@gym.com', password: 'password123', name: 'John Doe' },
    { id: 2, email: 'jane@gym.com', password: 'password456', name: 'Jane Smith' },
    { id: 3, email: 'mike@gym.com', password: 'password789', name: 'Mike Johnson' }
];

// Function to initialize admin login page
function initAdminLoginPage() {
    const adminForm = document.getElementById('adminLoginForm');
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => handleAdminLogin(e));
    }
}

// Function to create admin login page (Legacy support for SPA mode)
function createAdminLoginPage() {
    const adminContainer = document.createElement('div');
    adminContainer.className = 'admin-login-container';

    adminContainer.innerHTML = `
        <form class="admin-login-form fade-in" id="adminLoginForm">
            <div class="login-header">
                <h1>💪 GymFit</h1>
                <p>Admin Login</p>
            </div>

            <div id="adminAlertContainer"></div>

            <div class="form-group">
                <label for="adminEmail">Email Address</label>
                <input type="email" id="adminEmail" name="adminEmail" placeholder="Enter your admin email" required>
            </div>

            <div class="form-group">
                <label for="adminPassword">Password</label>
                <input type="password" id="adminPassword" name="adminPassword" placeholder="Enter your admin password" required>
            </div>

            <button type="submit" class="btn btn-primary btn-block">Login</button>

            <div class="login-footer">
                <p>New Admin? <a href="admin-signup.html" onclick="window.dispatchEvent(new CustomEvent('switchToAdminSignup')); return false;">Sign Up</a></p>
                <p>Member? <a href="login.html" onclick="window.dispatchEvent(new CustomEvent('switchToMemberLogin')); return false;">Login as Member</a></p>
                <p class="demo-hint">Demo: admin@gym.com / admin123</p>
            </div>
        </form>
    `;

    setTimeout(() => initAdminLoginPage(), 0);

    // Legacy switch events for SPA compatibility
    window.addEventListener('switchToMemberLogin', () => {
        window.location.href = 'login.html';
    });

    window.addEventListener('switchToAdminSignup', () => {
        window.location.href = 'admin-signup.html';
    });

    return adminContainer;
}


// Function to initialize admin signup page
function initAdminSignupPage() {
    const signupForm = document.getElementById('adminSignupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => handleAdminSignup(e));
    }
}

// Function to create admin signup page (Legacy support)
function createAdminSignupPage() {
    const container = document.createElement('div');
    container.className = 'admin-signup-container';

    container.innerHTML = `
        <form class="signup-form fade-in" id="adminSignupForm">
            <div class="login-header">
                <h1>💪 GymFit</h1>
                <p>Create Admin Account</p>
            </div>

            <div id="adminSignupAlertContainer"></div>

            <div class="form-group">
                <label for="adminSignupName">Full Name</label>
                <input type="text" id="adminSignupName" name="adminSignupName" placeholder="Enter your full name" required>
            </div>

            <div class="form-group">
                <label for="adminSignupEmail">Email Address</label>
                <input type="email" id="adminSignupEmail" name="adminSignupEmail" placeholder="Enter your admin email" required>
            </div>

            <div class="form-group">
                <label for="adminSignupPassword">Password</label>
                <input type="password" id="adminSignupPassword" name="adminSignupPassword" placeholder="Create a password" required>
            </div>

            <div class="form-group">
                <label for="adminConfirmPassword">Confirm Password</label>
                <input type="password" id="adminConfirmPassword" name="adminConfirmPassword" placeholder="Confirm your password" required>
            </div>

            <button type="submit" class="btn btn-primary btn-block">Sign Up as Admin</button>

            <div class="login-footer">
                <p>Already have an admin account? <a href="admin-login.html" onclick="window.dispatchEvent(new CustomEvent('switchToAdminLoginInternal')); return false;">Login</a></p>
            </div>
        </form>
    `;

    setTimeout(() => initAdminSignupPage(), 0);

    window.addEventListener('switchToAdminLoginInternal', () => {
        window.location.href = 'admin-login.html';
    });

    return container;
}



// Function to handle admin login
function handleAdminLogin(e) {
    e.preventDefault();

    const adminEmail = document.getElementById('adminEmail').value.trim();
    const adminPassword = document.getElementById('adminPassword').value.trim();

    // Validate inputs
    if (!adminEmail || !adminPassword) {
        showAlert('Please fill in all fields', 'error', 'adminAlertContainer');
        return;
    }

    // Client-side validation
    if (!isValidEmail(adminEmail)) {
        showAlert('Invalid email format', 'error', 'adminAlertContainer');
        return;
    }

    // Check against dummy admin users and registered admins
    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    let foundAdmin = existingAdmins.find(a => a.email === adminEmail && a.password === adminPassword);

    if (!foundAdmin && adminEmail === 'admin@gym.com' && adminPassword === 'admin123') {
        foundAdmin = { email: 'admin@gym.com', name: 'Admin' };
    }

    if (!foundAdmin) {
        showAlert('Invalid email or password', 'error', 'adminAlertContainer');
        return;
    }

    // Successful login
    showAlert('Admin login successful! Redirecting...', 'success', 'adminAlertContainer');

    // Store admin session and redirect
    setTimeout(() => {
        window.app.setUser({ email: adminEmail, name: foundAdmin.name }, 'admin');
    }, 500);
}

// Handle admin signup
function handleAdminSignup(e) {
    e.preventDefault();

    const name = document.getElementById('adminSignupName').value.trim();
    const email = document.getElementById('adminSignupEmail').value.trim();
    const password = document.getElementById('adminSignupPassword').value;
    const confirmPassword = document.getElementById('adminConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error', 'adminSignupAlertContainer');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Invalid email format', 'error', 'adminSignupAlertContainer');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error', 'adminSignupAlertContainer');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'error', 'adminSignupAlertContainer');
        return;
    }

    // Check if admin already exists
    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    if (email === 'admin@gym.com' || existingAdmins.find(a => a.email === email)) {
        showAlert('Admin already exists with this email', 'error', 'adminSignupAlertContainer');
        return;
    }

    // Save new admin
    const newAdmin = { id: Date.now(), name, email, password };
    existingAdmins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(existingAdmins));

    showAlert('Admin account created successfully! Redirecting to login...', 'success', 'adminSignupAlertContainer');

    setTimeout(() => {
        document.getElementById('app').innerHTML = '';
        document.getElementById('app').appendChild(createAdminLoginPage());
    }, 2000);
}

// Function to initialize member login page
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => handleMemberLogin(e));
    }
}

// Create login page element (Legacy support)
function createLoginPage() {
    const container = document.createElement('div');
    container.className = 'login-container';

    container.innerHTML = `
        <form class="login-form fade-in" id="loginForm">
            <div class="login-header">
                <h1>💪 GymFit</h1>
                <p>Member Login</p>
            </div>

            <div id="alertContainer"></div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="btn btn-primary btn-block">Login</button>

            <div class="login-footer">
                <p>New member? <a href="signup.html" onclick="window.dispatchEvent(new CustomEvent('switchToSignup')); return false;">Sign Up</a></p>
                <p>Admin? <a href="admin-login.html" onclick="window.dispatchEvent(new CustomEvent('switchToAdminLogin')); return false;">Login as Admin</a></p>
                <p class="demo-hint">Demo: john@gym.com / password123</p>
            </div>
        </form>
    `;

    setTimeout(() => initLoginPage(), 0);

    window.addEventListener('switchToSignup', () => {
        window.location.href = 'signup.html';
    });

    window.addEventListener('switchToAdminLogin', () => {
        window.location.href = 'admin-login.html';
    });

    return container;
}


// Function to initialize member signup page
function initSignupPage() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => handleSignup(e));
    }
}

// Create signup page element (Legacy support)
function createSignupPage() {
    const container = document.createElement('div');
    container.className = 'signup-container';

    container.innerHTML = `
        <form class="signup-form fade-in" id="signupForm">
            <div class="login-header">
                <h1>💪 GymFit</h1>
                <p>Create Account</p>
            </div>

            <div id="signupAlertContainer"></div>

            <div class="form-group">
                <label for="signupName">Full Name</label>
                <input type="text" id="signupName" name="signupName" placeholder="Enter your full name" required>
            </div>

            <div class="form-group">
                <label for="signupEmail">Email Address</label>
                <input type="email" id="signupEmail" name="signupEmail" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="signupPassword">Password</label>
                <input type="password" id="signupPassword" name="signupPassword" placeholder="Create a password" required>
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required>
            </div>

            <button type="submit" class="btn btn-primary btn-block">Sign Up</button>

            <div class="login-footer">
                <p>Already have an account? <a href="login.html" onclick="window.dispatchEvent(new CustomEvent('switchToLogin')); return false;">Login</a></p>
            </div>
        </form>
    `;

    setTimeout(() => initSignupPage(), 0);

    window.addEventListener('switchToLogin', () => {
        window.location.href = 'login.html';
    });

    return container;
}


// Handle member signup
function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error', 'signupAlertContainer');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Invalid email format', 'error', 'signupAlertContainer');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error', 'signupAlertContainer');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'error', 'signupAlertContainer');
        return;
    }

    // Check if user already exists in localStorage or dummy data
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (DUMMY_USERS.find(u => u.email === email) || existingUsers.find(u => u.email === email)) {
        showAlert('User already exists with this email', 'error', 'signupAlertContainer');
        return;
    }

    // Save new user
    const newUser = { id: Date.now(), name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    showAlert('Account created successfully! Redirecting to login...', 'success', 'signupAlertContainer');

    setTimeout(() => {
        document.getElementById('app').innerHTML = '';
        document.getElementById('app').appendChild(createLoginPage());
    }, 2000);
}

// Handle member login
function handleMemberLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate inputs
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Client-side validation
    if (!isValidEmail(email)) {
        showAlert('Invalid email format', 'error');
        return;
    }

    // Check against dummy users and localStorage users
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password) ||
        existingUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        showAlert('Invalid email or password', 'error');
        return;
    }

    // Successful login
    showAlert('Login successful! Redirecting...', 'success');

    // Store user session and redirect
    setTimeout(() => {
        window.app.setUser({ id: user.id, email: user.email, name: user.name }, 'member');
    }, 500);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show alert message
function showAlert(message, type, containerId = 'alertContainer') {
    const alertContainer = document.getElementById(containerId);
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);

    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}
