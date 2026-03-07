import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import AnnouncementBoard from './components/AnnouncementBoard'
import WorkoutManager from './components/WorkoutManager'

// We inject the components into the DOM depending on what elements exist on the current page

document.addEventListener('DOMContentLoaded', () => {
    // Mount Navbar globally (replaces old vanilla <nav>)
    const navRoot = document.getElementById('react-navbar-root')
    if (navRoot) {
        ReactDOM.createRoot(navRoot).render(
            <React.StrictMode>
                <Navbar />
            </React.StrictMode>
        )
    }

    // Mount Announcements Board if we are on Dashboard or Announcements page
    const announcementsRoot = document.getElementById('react-announcements-root')
    if (announcementsRoot) {
        const isAdmin = window.location.pathname.includes('/admin/');
        ReactDOM.createRoot(announcementsRoot).render(
            <React.StrictMode>
                <AnnouncementBoard isAdmin={isAdmin} />
            </React.StrictMode>
        )
    }

    // Mount Workout Manager if we are on Workouts page
    const workoutRoot = document.getElementById('react-workout-root')
    if (workoutRoot) {
        const isAdmin = window.location.pathname.includes('/manage-workouts.html') || window.location.pathname.includes('/admin/');
        ReactDOM.createRoot(workoutRoot).render(
            <React.StrictMode>
                <WorkoutManager isAdmin={isAdmin} />
            </React.StrictMode>
        )
    }
})
