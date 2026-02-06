// Admin Module - Contains Admin Dashboard and Management View logic

// Create admin dashboard
function createAdminDashboard() {
    const container = document.createElement('div');
    container.className = 'admin-dashboard-container';

    // Get dummy statistics
    const stats = {
        totalMembers: 1245,
        activeMembers: 1089,
        inactiveMembers: 156,
        newThisMonth: 47
    };

    // Get recent announcements from localStorage
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];

    container.innerHTML = `
        <div class="dashboard-header">
            <h1>Admin Dashboard 📊</h1>
            <p>Manage gym members, plans, and announcements</p>
        </div>

        <div class="stats-grid grid grid-3">
            <div class="stat-card card">
                <div class="stat-icon">👥</div>
                <h3>Total Members</h3>
                <div class="stat-value">${stats.totalMembers}</div>
            </div>

            <div class="stat-card card">
                <div class="stat-icon">✅</div>
                <h3>Active Members</h3>
                <div class="stat-value">${stats.activeMembers}</div>
            </div>

            <div class="stat-card card">
                <div class="stat-icon">❌</div>
                <h3>Inactive Members</h3>
                <div class="stat-value">${stats.inactiveMembers}</div>
            </div>

            <div class="stat-card card">
                <div class="stat-icon">🆕</div>
                <h3>New This Month</h3>
                <div class="stat-value">${stats.newThisMonth}</div>
            </div>
        </div>

        <div class="admin-actions">
            <h2>Management Actions</h2>
            <div class="grid grid-3">
                <div class="action-card card" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-workouts' }))">
                    <div class="action-icon">📋</div>
                    <h3>Manage Workouts</h3>
                    <p>Create and update workout plans</p>
                </div>

                <div class="action-card card" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-diet' }))">
                    <div class="action-icon">🥗</div>
                    <h3>Manage Diet Plans</h3>
                    <p>Create and update diet plans</p>
                </div>

                <div class="action-card card" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'announcements-admin' }))">
                    <div class="action-icon">📢</div>
                    <h3>Manage Announcements</h3>
                    <p>Post and manage announcements</p>
                </div>
            </div>
        </div>

        <div class="recent-announcements">
            <h2>Recent Announcements (${announcements.length})</h2>
            <div id="announcementsList"></div>
        </div>
    `;

    // Display announcements
    const announcementsList = container.querySelector('#announcementsList');
    if (announcements.length === 0) {
        announcementsList.innerHTML = '<p class="no-data">No announcements yet. Create one!</p>';
    } 
    else {
        announcements.slice(-5).reverse().forEach(announcement => {
            const announcementCard = document.createElement('div');
            announcementCard.className = 'announcement-item card';
            announcementCard.innerHTML = `
                <h4>${announcement.title}</h4>
                <p>${announcement.content}</p>
                <small>Posted on: ${announcement.date}</small>
            `;
            announcementsList.appendChild(announcementCard);
        });
    }

    return container;
}
