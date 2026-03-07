import React, { useState, useEffect } from 'react';

export default function AnnouncementBoard({ isAdmin }) {
    const [announcements, setAnnouncements] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        // Load announcements from localStorage
        const storedAnnouncements = JSON.parse(localStorage.getItem('gymAnnouncements')) || [
            {
                id: '1',
                title: 'Welcome to GymFit!',
                content: 'Get ready to achieve your fitness goals. Check out our new workout plans!',
                date: new Date().toISOString(),
                author: 'Admin'
            }
        ];
        setAnnouncements(storedAnnouncements);
    }, []);

    const handlePost = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        const newAnnouncement = {
            id: Date.now().toString(),
            title: newTitle,
            content: newContent,
            date: new Date().toISOString(),
            author: 'Admin'
        };

        const updated = [newAnnouncement, ...announcements];
        setAnnouncements(updated);
        localStorage.setItem('gymAnnouncements', JSON.stringify(updated));
        setNewTitle('');
        setNewContent('');
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        const updated = announcements.filter(a => a.id !== id);
        setAnnouncements(updated);
        localStorage.setItem('gymAnnouncements', JSON.stringify(updated));
    };

    return (
        <div className="announcements-container">
            <div className="page-header">
                <h1>{isAdmin ? '📢 Manage Announcements' : '📢 Gym Announcements'}</h1>
            </div>

            {isAdmin && (
                <form onSubmit={handlePost} className="card fade-in" style={{ marginBottom: '2rem' }}>
                    <h3>Post New Announcement</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Announcement Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Announcement Content"
                            rows="4"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Post Announcement</button>
                </form>
            )}

            <div className="announcements-list">
                {announcements.length === 0 ? (
                    <p className="no-data">No announcements at this time.</p>
                ) : (
                    announcements.map((announcement) => (
                        <div key={announcement.id} className="announcement-card card fade-in">
                            <div className="announcement-header">
                                <h3>{announcement.title}</h3>
                                <span className="date">
                                    {new Date(announcement.date).toLocaleDateString()}
                                </span>
                            </div>
                            <p>{announcement.content}</p>

                            {isAdmin && (
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(announcement.id)}
                                    style={{ marginTop: '1rem' }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
