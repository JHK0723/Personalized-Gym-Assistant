# Personalized Gym Management System 💪

A comprehensive university project for managing gym members, workout plans, diet plans, payments, and announcements using vanilla HTML, CSS, and JavaScript.

## Project Features

### Module 1: Authentication & Member Dashboard
- **Member Login**: Email/password authentication with dummy user credentials
- **Member Dashboard**: Welcome screen with membership status and quick action buttons
- **Clean UI**: Gym-themed design with smooth animations

#### Demo Credentials:
```
Email: john@gym.com
Password: password123

Email: jane@gym.com
Password: password456

Email: mike@gym.com
Password: password789
```

### Module 2: Workout & Diet Plans
- **Workout Plans**: Three different workout programs (Weight Loss, Muscle Gain, Endurance)
- **Weekly Schedule**: Detailed workout schedule with exercises and duration
- **Diet Plans**: Customized meal plans with calorie tracking and macro breakdown
- **Interactive UI**: Select fitness goals and view personalized plans

### Module 3: Admin Dashboard & Announcements
- **Admin Login**: Secure admin authentication
- **Admin Dashboard**: Statistics on total, active, and inactive members
- **Announcement Management**: Post and manage announcements for members
- **Importance Levels**: Mark announcements as Low, Medium, or High priority

#### Demo Admin Credentials:
```
Email: admin@gym.com
Password: admin123
```

### Module 4: Payments & Membership
- **Membership Plans**: Basic, Standard, and Premium plans with different pricing
- **Payment Processing**: Simulate payment transactions
- **Payment History**: Track all past payments
- **Membership Details**: View current membership status and benefits

## Project Structure

```
Personalized-Gym-Management-System/
├── index.html                          # Main entry point
├── README.md                           # This file
│
├── assets/
│   ├── global.css                      # Global styles
│   ├── app.js                          # Main app controller
│
├── auth/
│   ├── login.js                        # Member login module
│
├── member-dashboard/
│   ├── member-dashboard.js             # Dashboard logic
│   ├── member-dashboard.css            # Dashboard styles
│
├── workout-diet/
│   ├── workout.js                      # Workout plans
│   ├── diet.js                         # Diet plans
│   ├── workout-diet.css                # Workout/Diet styles
│
├── admin/
│   ├── admin-login.js                  # Admin authentication & dashboard
│   ├── announcements.js                # Announcements module
│   ├── admin.css                       # Admin styles
│
└── payments/
    ├── payment.js                      # Payments & membership
    ├── membership.js                   # (Placeholder for modular structure)
    └── payment.css                     # Payment styles
```

## How to Use

### 1. **Open the Application**
   - Open `index.html` in your web browser
   - You'll see the login page

### 2. **Member Login**
   - Use one of the demo credentials above
   - You'll be redirected to the Member Dashboard
   - Use the navbar to navigate between different sections

### 3. **Member Features**
   - **Dashboard**: View membership status and quick actions
   - **Workouts**: View workout plans for different fitness goals
   - **Diet Plans**: Check personalized meal plans
   - **Announcements**: Read gym announcements
   - **Membership**: View membership details and benefits
   - **Payments**: View membership plans and payment history

### 4. **Admin Features**
   - Click "Admin? Login as Admin" on the login page
   - Use admin credentials: `admin@gym.com` / `admin123`
   - **Dashboard**: View gym statistics
   - **Manage Workouts**: Create custom workout plans
   - **Manage Diet**: Create custom diet plans
   - **Announcements**: Post new announcements to members

### 5. **Logout**
   - Click the "Logout" button in the navbar
   - You'll be returned to the login page

## Key Features Implemented

### Client-Side Validation
- Email format validation
- Required field validation
- Form error handling

### Data Persistence
- Uses browser localStorage for:
  - User session data
  - Payment history
  - Workout plans (custom)
  - Diet plans (custom)
  - Announcements

### Dummy Data
- Pre-loaded users and admin credentials
- Sample workout plans and diet plans
- Sample announcements

### UI/UX Features
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Color-coded badges for status
- Hover effects on interactive elements
- Modal alerts for confirmations

### Navigation
- SPA-like behavior with JavaScript routing
- Consistent navbar across pages
- Easy navigation between modules

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and animations
- **Vanilla JavaScript**: No frameworks or libraries
- **LocalStorage**: Client-side data persistence

### Design System
- **Color Scheme**: 
  - Primary: #ff6b35 (Orange)
  - Secondary: #004e89 (Dark Blue)
  - Accent: #1b998f (Teal)
- **Typography**: Segoe UI, system fonts
- **Responsive Breakpoint**: 768px

### Code Quality
- Modular file structure
- Reusable JavaScript functions
- Clear comments for important logic
- Consistent naming conventions
- Easy to convert to React later

## Future Enhancements

This project is designed to be easily convertible to React:
1. Each module can become a React component
2. JavaScript functions can become component methods
3. LocalStorage can be replaced with a backend database
4. Form validation can use libraries like Formik or React Hook Form

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Notes

- All data is stored in browser localStorage and will persist until cleared
- Payment processing is simulated (no real transactions)
- User authentication is client-side only (for demo purposes)
- This is a frontend-only application (no backend)

---

**Project Status**: ✅ Complete and Ready for Submission

For questions or improvements, feel free to modify the code according to your requirements!
