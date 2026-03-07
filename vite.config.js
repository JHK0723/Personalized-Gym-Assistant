import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: './index.html',
                manageWorkouts: './workout-diet/manage-workouts.html',
                manageDiet: './workout-diet/manage-diet.html',
                adminAnnouncements: './admin/announcements-admin.html',
                adminDashboard: './admin/dashboard.html',
                memberDashboard: './member-dashboard/dashboard.html'
            }
        }
    }
})
