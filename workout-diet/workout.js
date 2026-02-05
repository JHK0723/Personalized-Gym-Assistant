// Workout Plans Module

// Dummy workout plans data
const WORKOUT_PLANS = {
    'weight-loss': {
        name: 'Weight Loss Program',
        duration: '12 weeks',
        intensity: 'High',
        description: 'High-intensity cardio and strength training for rapid fat loss',
        schedule: [
            { day: 'Monday', exercise: 'Cardio + Core', duration: '60 mins', intensity: 'High' },
            { day: 'Tuesday', exercise: 'Full Body Strength', duration: '50 mins', intensity: 'High' },
            { day: 'Wednesday', exercise: 'HIIT Training', duration: '40 mins', intensity: 'Very High' },
            { day: 'Thursday', exercise: 'Cardio + Abs', duration: '60 mins', intensity: 'High' },
            { day: 'Friday', exercise: 'Full Body Strength', duration: '50 mins', intensity: 'High' },
            { day: 'Saturday', exercise: 'Outdoor Running', duration: '45 mins', intensity: 'Medium' },
            { day: 'Sunday', exercise: 'Rest / Recovery', duration: 'Self-paced', intensity: 'Low' }
        ]
    },
    'muscle-gain': {
        name: 'Muscle Building Program',
        duration: '16 weeks',
        intensity: 'Medium-High',
        description: 'Progressive strength training focused on hypertrophy and muscle growth',
        schedule: [
            { day: 'Monday', exercise: 'Chest & Triceps', duration: '60 mins', intensity: 'High' },
            { day: 'Tuesday', exercise: 'Back & Biceps', duration: '60 mins', intensity: 'High' },
            { day: 'Wednesday', exercise: 'Legs & Core', duration: '70 mins', intensity: 'Very High' },
            { day: 'Thursday', exercise: 'Shoulders & Arms', duration: '50 mins', intensity: 'High' },
            { day: 'Friday', exercise: 'Full Body Compound', duration: '60 mins', intensity: 'High' },
            { day: 'Saturday', exercise: 'Accessory Work', duration: '45 mins', intensity: 'Medium' },
            { day: 'Sunday', exercise: 'Complete Rest', duration: 'Rest day', intensity: 'Rest' }
        ]
    },
    'endurance': {
        name: 'Endurance Training Program',
        duration: '10 weeks',
        intensity: 'Medium',
        description: 'Build cardiovascular fitness and stamina for long-distance activities',
        schedule: [
            { day: 'Monday', exercise: 'Steady State Cardio', duration: '45 mins', intensity: 'Medium' },
            { day: 'Tuesday', exercise: 'Speed Work / Intervals', duration: '40 mins', intensity: 'High' },
            { day: 'Wednesday', exercise: 'Strength Training', duration: '45 mins', intensity: 'Medium' },
            { day: 'Thursday', exercise: 'Long Duration Cardio', duration: '60+ mins', intensity: 'Low-Medium' },
            { day: 'Friday', exercise: 'Cross Training', duration: '45 mins', intensity: 'Medium' },
            { day: 'Saturday', exercise: 'Active Recovery', duration: '30 mins', intensity: 'Low' },
            { day: 'Sunday', exercise: 'Rest Day', duration: 'Rest', intensity: 'Rest' }
        ]
    }
};

// Function to initialize workout page
function initWorkoutPage() {
    const workoutContent = document.getElementById('workoutContent');
    if (workoutContent) {
        switchWorkoutPlan('weight-loss');
    }
}

// Create workout page (Legacy support)
function createWorkoutPage() {
    const container = document.createElement('div');
    container.className = 'workout-container';

    container.innerHTML = `
        <div class="page-header">
            <h1>📋 Workout Plans</h1>
            <p>Choose your fitness goal and follow your personalized workout routine</p>
        </div>

        <div class="goal-selector">
            <label for="goalSelect">Select Your Fitness Goal:</label>
            <select id="goalSelect" onchange="switchWorkoutPlan(this.value)">
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Endurance Training</option>
            </select>
        </div>

        <div id="workoutContent"></div>
    `;

    setTimeout(() => initWorkoutPage(), 0);

    return container;
}


// Switch workout plan based on selection
function switchWorkoutPlan(goal) {
    const plan = WORKOUT_PLANS[goal];
    const contentDiv = document.getElementById('workoutContent');

    if (!contentDiv) return;

    const html = `
        <div class="workout-plan-card card">
            <div class="card-title">${plan.name}</div>
            <div class="plan-info">
                <div class="info-item">
                    <span>Duration:</span>
                    <strong>${plan.duration}</strong>
                </div>
                <div class="info-item">
                    <span>Intensity:</span>
                    <strong>${plan.intensity}</strong>
                </div>
                <div class="info-item">
                    <span>Description:</span>
                    <p>${plan.description}</p>
                </div>
            </div>
        </div>

        <div class="schedule-section">
            <h2>Weekly Schedule</h2>
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Exercise</th>
                        <th>Duration</th>
                        <th>Intensity</th>
                    </tr>
                </thead>
                <tbody>
                    ${plan.schedule.map(session => `
                        <tr class="schedule-row">
                            <td><strong>${session.day}</strong></td>
                            <td>${session.exercise}</td>
                            <td>${session.duration}</td>
                            <td>
                                <span class="intensity-badge intensity-${session.intensity.toLowerCase().replace(/[- ]/g, '-')}">
                                    ${session.intensity}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="tips-section">
            <h2>💡 Tips for Success</h2>
            <ul>
                <li>Warm up for 5-10 minutes before each session</li>
                <li>Stay hydrated throughout your workout</li>
                <li>Get adequate rest between sessions</li>
                <li>Follow proper form to prevent injuries</li>
                <li>Progressive overload: Gradually increase weight/intensity</li>
                <li>Track your progress and celebrate milestones</li>
                <li>Combine with proper nutrition for best results</li>
            </ul>
        </div>
    `;

    contentDiv.innerHTML = html;
}

// Function to initialize workout management page
function initWorkoutManagementPage(container) {
    const workoutForm = container.querySelector('#workoutForm');
    if (workoutForm) {
        workoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let workoutList = JSON.parse(localStorage.getItem('workoutPlans')) || [];
            const newPlan = {
                name: document.getElementById('planName').value,
                goal: document.getElementById('planGoal').value,
                duration: document.getElementById('planDuration').value,
                description: document.getElementById('planDescription').value
            };

            workoutList.push(newPlan);
            localStorage.setItem('workoutPlans', JSON.stringify(workoutList));

            alert('Workout plan added successfully!');
            // Reload current view
            if (window.location.pathname.includes('manage-workouts.html')) {
                window.location.reload();
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-workouts' }));
            }
        });
    }

    // Load existing plans
    const plansListContainer = container.querySelector('#plansList');
    if (plansListContainer) {
        let workoutList = JSON.parse(localStorage.getItem('workoutPlans')) || [];
        if (workoutList.length === 0) {
            plansListContainer.innerHTML = '<p class="no-data">No custom workout plans yet. Create one above!</p>';
        } else {
            plansListContainer.innerHTML = '';
            workoutList.forEach((plan, index) => {
                const planCard = document.createElement('div');
                planCard.className = 'plan-item card';
                planCard.innerHTML = `
                    <h3>${plan.name}</h3>
                    <p><strong>Goal:</strong> ${plan.goal}</p>
                    <p><strong>Duration:</strong> ${plan.duration}</p>
                    <p>${plan.description}</p>
                    <button class="btn btn-danger" onclick="deleteWorkoutPlan(${index})">Delete</button>
                `;
                plansListContainer.appendChild(planCard);
            });
        }
    }
}

// Create workout management page (Legacy support)
function createWorkoutManagementPage() {
    const container = document.createElement('div');
    container.className = 'workout-management-container';

    container.innerHTML = `
        <div class="page-header">
            <h1>📋 Manage Workout Plans</h1>
        </div>

        <div class="management-section">
            <h2>Add New Workout Plan</h2>
            <form id="workoutForm" class="management-form">
                <div class="form-group">
                    <label for="planName">Plan Name:</label>
                    <input type="text" id="planName" name="planName" required>
                </div>

                <div class="form-group">
                    <label for="planGoal">Fitness Goal:</label>
                    <select id="planGoal" name="planGoal" required>
                        <option value="weight-loss">Weight Loss</option>
                        <option value="muscle-gain">Muscle Gain</option>
                        <option value="endurance">Endurance</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="planDuration">Duration:</label>
                    <input type="text" id="planDuration" name="planDuration" placeholder="e.g., 12 weeks" required>
                </div>

                <div class="form-group">
                    <label for="planDescription">Description:</label>
                    <textarea id="planDescription" name="planDescription" rows="3" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Add Workout Plan</button>
            </form>
        </div>

        <div class="plans-list">
            <h2>Current Workout Plans</h2>
            <div id="plansList"></div>
        </div>
    `;

    setTimeout(() => initWorkoutManagementPage(container), 0);

    return container;
}


// Delete workout plan
function deleteWorkoutPlan(index) {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    let workoutList = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    workoutList.splice(index, 1);
    localStorage.setItem('workoutPlans', JSON.stringify(workoutList));

    alert('Workout plan deleted successfully!');
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-workouts' }));
}
