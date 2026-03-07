import React from 'react';

export default function Navbar() {
    const currentPath = window.location.pathname;

    const isActive = (path) => {
        return currentPath.includes(path) ? 'active' : '';
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    };

    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Admin', role: 'admin' };

    const links = user.role === 'admin'
        ? [
            { label: 'Dashboard', href: '/admin/dashboard.html' },
            { label: 'Workouts', href: '/workout-diet/manage-workouts.html' },
            { label: 'Diet Plans', href: '/workout-diet/manage-diet.html' },
            { label: 'Announcements', href: '/admin/announcements-admin.html' }
        ]
        : [
            { label: 'Dashboard', href: '/member-dashboard/dashboard.html' },
            { label: 'Workouts & Diet', href: '/workout-diet/workout.html' },
            { label: 'Payments', href: '/payments/payment.html' },
            { label: 'Announcements', href: '/member-dashboard/announcements.html' }
        ];

    return (
        <nav>
            <div className="logo">💪 GymFit</div>
            <ul className="nav-links">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.href}
                            className={isActive(link.href.split('/').pop())}
                            style={isActive(link.href.split('/').pop()) ? { fontWeight: 'bold', borderBottom: '2px solid white' } : {}}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="user-info">
                <span>{user.name}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
