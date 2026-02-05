// Announcements Module

// Dummy announcements
const DUMMY_ANNOUNCEMENTS = [
    {
        id: 1,
        title: 'New Equipment Arrived',
        content: 'We have received new state-of-the-art cardio equipment including 5 new treadmills and elliptical machines.',
        date: '2024-01-20',
        importance: 'high'
    },
    {
        id: 2,
        title: 'Gym Maintenance',
        content: 'The gym will be closed on January 25th for routine maintenance and deep cleaning. We apologize for the inconvenience.',
        date: '2024-01-18',
        importance: 'high'
    },
    {
        id: 3,
        title: 'New Group Classes',
        content: 'We are excited to announce new group classes including HIIT, Pilates, and Boxing. Join now!',
        date: '2024-01-15',
        importance: 'medium'
    },
    {
        id: 4,
        title: 'Membership Renewal',
        content: 'Don\'t forget to renew your membership before the expiry date to continue enjoying our facilities.',
        date: '2024-01-12',
        importance: 'medium'
    }
];

// Create announcements page for members
function createAnnouncementsPage() {
    const container = document.createElement('div');
    container.className = 'announcements-container';

    const announcements = JSON.parse(localStorage.getItem('announcements')) || DUMMY_ANNOUNCEMENTS;

    container.innerHTML = `
        <div class="page-header">
            <h1>📢 Announcements</h1>
            <p>Stay updated with the latest gym news and information</p>
        </div>

        <div id="announcementsList" class="announcements-list"></div>
    `;

    // Display announcements
    const announcementsList = container.querySelector('#announcementsList');
    if (announcements.length === 0) {
        announcementsList.innerHTML = '<p class="no-data">No announcements yet.</p>';
    } else {
        announcements.slice().reverse().forEach(announcement => {
            const announcementCard = document.createElement('div');
            announcementCard.className = `announcement-card card importance-${announcement.importance}`;
            announcementCard.innerHTML = `
                <div class="announcement-header">
                    <h3>${announcement.title}</h3>
                    <span class="importance-badge importance-${announcement.importance}">
                        ${announcement.importance.toUpperCase()}
                    </span>
                </div>
                <p class="announcement-content">${announcement.content}</p>
                <div class="announcement-date">
                    <small>📅 ${announcement.date}</small>
                </div>
            `;
            announcementsList.appendChild(announcementCard);
        });
    }

    return container;
}

// Create announcements management page for admin
function createAnnouncementsAdminPage() {
    const container = document.createElement('div');
    container.className = 'announcements-admin-container';

    let announcements = JSON.parse(localStorage.getItem('announcements')) || DUMMY_ANNOUNCEMENTS;

    container.innerHTML = `
        <div class="page-header">
            <h1>📢 Manage Announcements</h1>
        </div>

        <div class="management-section">
            <h2>Post New Announcement</h2>
            <form id="announcementForm" class="management-form">
                <div class="form-group">
                    <label for="announcementTitle">Title:</label>
                    <input type="text" id="announcementTitle" name="announcementTitle" required>
                </div>

                <div class="form-group">
                    <label for="announcementContent">Content:</label>
                    <textarea id="announcementContent" name="announcementContent" rows="5" required></textarea>
                </div>

                <div class="form-group">
                    <label for="announcementImportance">Importance Level:</label>
                    <select id="announcementImportance" name="announcementImportance" required>
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Post Announcement</button>
            </form>
        </div>

        <div class="announcements-list-admin">
            <h2>Current Announcements (${announcements.length})</h2>
            <div id="announcementsListAdmin"></div>
        </div>
    `;

    // Display announcements
    const announcementsList = container.querySelector('#announcementsListAdmin');
    if (announcements.length === 0) {
        announcementsList.innerHTML = '<p class="no-data">No announcements yet. Create one above!</p>';
    } else {
        announcements.slice().reverse().forEach((announcement, index) => {
            const announcementCard = document.createElement('div');
            announcementCard.className = 'announcement-item card';
            announcementCard.innerHTML = `
                <div class="announcement-header">
                    <div>
                        <h4>${announcement.title}</h4>
                        <span class="importance-badge importance-${announcement.importance}">
                            ${announcement.importance.toUpperCase()}
                        </span>
                    </div>
                    <button class="btn btn-danger btn-small" onclick="deleteAnnouncement('${announcement.id}')">Delete</button>
                </div>
                <p>${announcement.content}</p>
                <small>Posted on: ${announcement.date}</small>
            `;
            announcementsList.appendChild(announcementCard);
        });
    }

    // Handle form submission
    container.querySelector('#announcementForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0];

        const newAnnouncement = {
            id: Date.now().toString(),
            title: document.getElementById('announcementTitle').value,
            content: document.getElementById('announcementContent').value,
            importance: document.getElementById('announcementImportance').value,
            date: today
        };

        announcements.push(newAnnouncement);
        localStorage.setItem('announcements', JSON.stringify(announcements));

        alert('Announcement posted successfully!');
        window.dispatchEvent(new CustomEvent('navigate', { detail: 'announcements-admin' }));
    });

    return container;
}

// Delete announcement
function deleteAnnouncement(id) {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements = announcements.filter(a => a.id !== id);
    localStorage.setItem('announcements', JSON.stringify(announcements));

    alert('Announcement deleted successfully!');
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'announcements-admin' }));
}
