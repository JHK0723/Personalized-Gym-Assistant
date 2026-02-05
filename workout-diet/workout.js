
const WORKOUT_PLANS = {
    'weight-loss': [
        {
            id: 'wl-1',
            name: 'Standard Weight Loss',
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
        }
    ],
    'muscle-gain': [
        {
            id: 'mg-1',
            name: 'Classic Muscle Building',
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
        }
    ],
    'endurance': [
        {
            id: 'en-1',
            name: 'Marathon Prep',
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
    ]
};

function initWorkoutPage() {
    const workoutContent = document.getElementById('workoutContent');
    const goalSelect = document.getElementById('goalSelect');

    if (goalSelect) {
        // Clear previous custom options (since we now duplicate them internally)
        Array.from(goalSelect.options).forEach(opt => {
            if (opt.value.startsWith('custom-')) opt.remove();
        });
    }

    if (workoutContent) {
        switchWorkoutPlan('weight-loss');
    }
}

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


function switchWorkoutPlan(goal) {
    const contentDiv = document.getElementById('workoutContent');
    if (!contentDiv) return;

    // Get default plans + custom plans for this category
    const defaultPlans = WORKOUT_PLANS[goal] || [];
    const customPlans = (JSON.parse(localStorage.getItem('workoutPlans')) || [])
        .filter(p => p.goal === goal);

    const allPlans = [...defaultPlans, ...customPlans];

    if (allPlans.length === 0) {
        contentDiv.innerHTML = '<p class="no-data">No programs available for this category yet.</p>';
        return;
    }

    contentDiv.innerHTML = `
        <div class="programs-grid grid grid-2">
            ${allPlans.map((plan, index) => `
                <div class="program-card card" onclick="showPlanDetails('${goal}', ${index}, '${plan.id || 'custom'}')">
                    <h3>${plan.name}</h3>
                    <div class="program-meta">
                        <span>⏱️ ${plan.duration}</span>
                        <span>🔥 ${plan.intensity || 'Medium'}</span>
                    </div>
                    <p>${plan.description.substring(0, 100)}...</p>
                    <button class="btn btn-secondary btn-block">View Schedule</button>
                </div>
            `).join('')}
        </div>
    `;
}

function showPlanDetails(category, index, id) {
    const contentDiv = document.getElementById('workoutContent');

    let plan;
    if (id === 'custom') {
        const defaultPlans = WORKOUT_PLANS[category] || [];
        const customPlans = (JSON.parse(localStorage.getItem('workoutPlans')) || [])
            .filter(p => p.goal === category);
        const allPlans = [...defaultPlans, ...customPlans];
        plan = allPlans[index];
    } else {
        plan = (WORKOUT_PLANS[category] || []).find(p => p.id === id);
        if (!plan) {
            const customPlans = (JSON.parse(localStorage.getItem('workoutPlans')) || [])
                .filter(p => p.goal === category);
            const allPlans = [...(WORKOUT_PLANS[category] || []), ...customPlans];
            plan = allPlans[index];
        }
    }


    if (!plan) return;

    const html = `
        <button class="btn btn-text" onclick="switchWorkoutPlan('${category}')">← Back to Programs</button>
        <div class="workout-plan-card card fade-in">
            <div class="card-title">${plan.name}</div>
            <div class="plan-info">
                <div class="info-item">
                    <span>Duration:</span>
                    <strong>${plan.duration}</strong>
                </div>
                <div class="info-item">
                    <span>Intensity:</span>
                    <strong>${plan.intensity || 'Medium'}</strong>
                </div>
                <div class="info-item">
                    <span>Description:</span>
                    <p>${plan.description}</p>
                </div>
            </div>
        </div>

        <div class="schedule-section fade-in">
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
                    ${plan.schedule ? plan.schedule.map(session => `
                        <tr class="schedule-row">
                            <td><strong>${session.day}</strong></td>
                            <td>${session.exercise}</td>
                            <td>${session.duration}</td>
                            <td>
                                <span class="intensity-badge intensity-${(session.intensity || 'medium').toLowerCase().replace(/[- ]/g, '-')}">
                                    ${session.intensity || 'Medium'}
                                </span>
                            </td>
                        </tr>
                    `).join('') : '<tr><td colspan="4">No schedule details available</td></tr>'}
                </tbody>
            </table>
        </div>
    `;

    contentDiv.innerHTML = html;
}

function initWorkoutManagementPage(container) {
    const workoutForm = container.querySelector('#workoutForm');
    if (workoutForm) {
        workoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const schedule = days.map(day => ({
                day: day,
                exercise: document.getElementById(`schedule${day}Exercise`).value,
                duration: document.getElementById(`schedule${day}Duration`).value,
                intensity: document.getElementById(`schedule${day}Intensity`).value
            }));

            let workoutList = JSON.parse(localStorage.getItem('workoutPlans')) || [];
            const newPlan = {
                id: 'custom-' + Date.now(),
                name: document.getElementById('planName').value,
                goal: document.getElementById('planGoal').value,
                duration: document.getElementById('planDuration').value,
                intensity: document.getElementById('planIntensity').value,
                description: document.getElementById('planDescription').value,
                schedule: schedule
            };

            workoutList.push(newPlan);
            localStorage.setItem('workoutPlans', JSON.stringify(workoutList));

            alert('Workout program added successfully!');
            if (window.location.pathname.includes('manage-workouts.html')) {
                window.location.reload();
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-workouts' }));
            }
        });
    }

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

function createWorkoutManagementPage() {
    const container = document.createElement('div');
    container.className = 'workout-management-container';

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    container.innerHTML = `
        <div class="page-header">
            <h1>📋 Manage Workout Plans</h1>
        </div>

        <div class="management-section">
            <h2>Create New Program</h2>
            <form id="workoutForm" class="management-form">
                <div class="grid grid-2">
                    <div class="form-group">
                        <label for="planName">Program Name:</label>
                        <input type="text" id="planName" name="planName" placeholder="e.g. Advanced Shred" required>
                    </div>

                    <div class="form-group">
                        <label for="planGoal">Fitness Goal (Category):</label>
                        <select id="planGoal" name="planGoal" required>
                            <option value="weight-loss">Weight Loss</option>
                            <option value="muscle-gain">Muscle Gain</option>
                            <option value="endurance">Endurance</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-2">
                    <div class="form-group">
                        <label for="planDuration">Duration:</label>
                        <input type="text" id="planDuration" name="planDuration" placeholder="e.g., 12 weeks" required>
                    </div>
                     <div class="form-group">
                        <label for="planIntensity">Overall Intensity:</label>
                        <select id="planIntensity" name="planIntensity" required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Very High">Very High</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="planDescription">Program Description:</label>
                    <textarea id="planDescription" name="planDescription" rows="3" required></textarea>
                </div>

                <h3>Daily Schedule</h3>
                <div class="schedule-inputs">
                    ${days.map(day => `
                        <div class="day-input-group card" style="padding: 1rem; margin-bottom: 1rem;">
                            <h4>${day}</h4>
                            <div class="grid grid-3">
                                <div class="form-group">
                                    <label>Exercise Focus</label>
                                    <input type="text" id="schedule${day}Exercise" placeholder="e.g. Cardio" required>
                                </div>
                                <div class="form-group">
                                    <label>Duration</label>
                                    <input type="text" id="schedule${day}Duration" placeholder="e.g. 45 mins" required>
                                </div>
                                <div class="form-group">
                                    <label>Intensity</label>
                                    <select id="schedule${day}Intensity">
                                        <option value="Low">Low</option>
                                        <option value="Medium" selected>Medium</option>
                                        <option value="High">High</option>
                                        <option value="Rest">Rest</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 1rem;">Create Program</button>
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


function deleteWorkoutPlan(index) {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    let workoutList = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    workoutList.splice(index, 1);
    localStorage.setItem('workoutPlans', JSON.stringify(workoutList));

    alert('Workout plan deleted successfully!');
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-workouts' }));
}
