const DIET_PLANS = {
    'weight-loss': [
        {
            id: 'wl-d1',
            name: 'Standard Weight Loss Diet',
            calories: '1800 kcal/day',
            description: 'Balanced deficit diet to support healthy weight loss',
            macros: { protein: '150g', carbs: '180g', fats: '60g' },
            meals: [
                {
                    type: 'Breakfast',
                    time: '7:00 AM',
                    items: ['Oatmeal with berries and almond milk', 'Green tea', 'Whole wheat toast'],
                    calories: 350
                },
                {
                    type: 'Mid-Morning Snack',
                    time: '10:00 AM',
                    items: ['Greek yogurt', 'Mixed nuts (handful)'],
                    calories: 150
                },
                {
                    type: 'Lunch',
                    time: '1:00 PM',
                    items: ['Grilled chicken breast (150g)', 'Brown rice (1 cup)', 'Steamed broccoli', 'Olive oil dressing'],
                    calories: 500
                },
                {
                    type: 'Afternoon Snack',
                    time: '4:00 PM',
                    items: ['Apple', 'Protein shake', 'Almonds (10-12)'],
                    calories: 200
                },
                {
                    type: 'Dinner',
                    time: '7:00 PM',
                    items: ['Baked salmon (150g)', 'Sweet potato', 'Spinach salad', 'Lemon juice'],
                    calories: 500
                }
            ]
        }
    ],
    'muscle-gain': [
        {
            id: 'mg-d1',
            name: 'Bulking Diet',
            calories: '2800 kcal/day',
            description: 'High calorie, protein-rich diet to support muscle growth',
            macros: { protein: '200g', carbs: '350g', fats: '93g' },
            meals: [
                {
                    type: 'Breakfast',
                    time: '7:00 AM',
                    items: ['5 Egg whites + 2 whole eggs', 'Oatmeal (1.5 cups)', 'Banana', 'Whole milk'],
                    calories: 600
                },
                {
                    type: 'Mid-Morning Snack',
                    time: '10:00 AM',
                    items: ['Protein shake with whey', 'Rice cakes with peanut butter'],
                    calories: 400
                },
                {
                    type: 'Lunch',
                    time: '1:00 PM',
                    items: ['Lean beef (200g)', 'White rice (2 cups)', 'Mixed vegetables', 'Olive oil'],
                    calories: 700
                },
                {
                    type: 'Pre-Workout Snack',
                    time: '4:00 PM',
                    items: ['Banana', 'Energy bar', 'Black coffee'],
                    calories: 300
                },
                {
                    type: 'Dinner',
                    time: '7:00 PM',
                    items: ['Grilled chicken (200g)', 'Sweet potato (large)', 'Broccoli', 'Olive oil'],
                    calories: 600
                },
                {
                    type: 'Evening Snack',
                    time: '10:00 PM',
                    items: ['Casein protein shake', 'Almonds'],
                    calories: 200
                }
            ]
        }
    ],
    'endurance': [
        {
            id: 'en-d1',
            name: 'Endurance Fuel',
            calories: '2400 kcal/day',
            description: 'Carb-focused diet for sustaining long duration activities',
            macros: { protein: '120g', carbs: '360g', fats: '60g' },
            meals: [
                {
                    type: 'Breakfast',
                    time: '7:00 AM',
                    items: ['Whole grain cereal', 'Skim milk', 'Banana', 'Whole wheat toast with honey'],
                    calories: 450
                },
                {
                    type: 'Mid-Morning Snack',
                    time: '10:00 AM',
                    items: ['Energy bar', 'Orange juice'],
                    calories: 250
                },
                {
                    type: 'Lunch',
                    time: '1:00 PM',
                    items: ['Pasta with lean meat sauce', 'Steamed vegetables', 'Whole wheat bread'],
                    calories: 600
                },
                {
                    type: 'Pre-Run Snack',
                    time: '4:00 PM',
                    items: ['Banana', 'Granola bar', 'Water'],
                    calories: 300
                },
                {
                    type: 'Dinner',
                    time: '7:00 PM',
                    items: ['Fish (150g)', 'Rice pilaf', 'Roasted vegetables', 'Olive oil'],
                    calories: 550
                },
                {
                    type: 'Evening Snack',
                    time: '9:00 PM',
                    items: ['Yogurt', 'Granola', 'Berries'],
                    calories: 250
                }
            ]
        }
    ]
};

function initDietPage() {
    const dietContent = document.getElementById('dietContent');
    const dietGoalSelect = document.getElementById('dietGoalSelect');

    if (dietGoalSelect) {
        // Clear previous custom options (since we now duplicate them internally)
        Array.from(dietGoalSelect.options).forEach(opt => {
            if (opt.value.startsWith('custom-')) opt.remove();
        });
    }

    if (dietContent) {
        switchDietPlan('weight-loss');
    }
}

function createDietPage() {
    const container = document.createElement('div');
    container.className = 'diet-container';

    container.innerHTML = `
        <div class="page-header">
            <h1>🥗 Diet Plans</h1>
            <p>Follow your personalized nutrition plan to achieve your fitness goals</p>
        </div>

        <div class="goal-selector">
            <label for="dietGoalSelect">Select Your Fitness Goal:</label>
            <select id="dietGoalSelect" onchange="switchDietPlan(this.value)">
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Endurance Training</option>
            </select>
        </div>

        <div id="dietContent"></div>
    `;

    setTimeout(() => initDietPage(), 0);

    return container;
}


function switchDietPlan(goal) {
    const contentDiv = document.getElementById('dietContent');
    if (!contentDiv) return;

    // Get default plans + custom plans
    const defaultPlans = DIET_PLANS[goal] || [];
    const customPlans = (JSON.parse(localStorage.getItem('dietPlans')) || [])
        .filter(p => p.goal === goal);

    const allPlans = [...defaultPlans, ...customPlans];

    if (allPlans.length === 0) {
        contentDiv.innerHTML = '<p class="no-data">No diet plans available for this goal yet.</p>';
        return;
    }

    contentDiv.innerHTML = `
        <div class="programs-grid grid grid-2">
            ${allPlans.map((plan, index) => `
                <div class="program-card card" onclick="showDietDetails('${goal}', ${index}, '${plan.id || 'custom'}')">
                    <h3>${plan.name}</h3>
                    <div class="program-meta">
                        <span>🍎 ${plan.calories}</span>
                    </div>
                    <p>${plan.description.substring(0, 100)}...</p>
                    <button class="btn btn-secondary btn-block">View Meal Plan</button>
                </div>
            `).join('')}
        </div>
    `;
}

function showDietDetails(category, index, id) {
    const contentDiv = document.getElementById('dietContent');

    let plan;
    if (id === 'custom') {
        const defaultPlans = DIET_PLANS[category] || [];
        const customPlans = (JSON.parse(localStorage.getItem('dietPlans')) || [])
            .filter(p => p.goal === category);
        const allPlans = [...defaultPlans, ...customPlans];
        plan = allPlans[index];
    } else {
        plan = (DIET_PLANS[category] || []).find(p => p.id === id);
        if (!plan) {
            const customPlans = (JSON.parse(localStorage.getItem('dietPlans')) || [])
                .filter(p => p.goal === category);
            const allPlans = [...(DIET_PLANS[category] || []), ...customPlans];
            plan = allPlans[index];
        }
    }

    if (!plan) return;

    const html = `
        <button class="btn btn-text" onclick="switchDietPlan('${category}')">← Back to Diet Plans</button>
        <div class="diet-plan-card card fade-in">
            <div class="card-title">${plan.name}</div>
            <div class="plan-info">
                <div class="info-grid">
                    <div class="info-item">
                        <span>Daily Calories:</span>
                        <strong>${plan.calories}</strong>
                    </div>
                    <div class="info-item">
                        <span>Protein:</span>
                        <strong>${plan.macros ? plan.macros.protein : 'N/A'}</strong>
                    </div>
                    <div class="info-item">
                        <span>Carbs:</span>
                        <strong>${plan.macros ? plan.macros.carbs : 'N/A'}</strong>
                    </div>
                    <div class="info-item">
                        <span>Fats:</span>
                        <strong>${plan.macros ? plan.macros.fats : 'N/A'}</strong>
                    </div>
                </div>
                <div style="margin-top: 1rem; color: var(--text-color);">
                    <p>${plan.description}</p>
                </div>
            </div>
        </div>

        <div class="meals-section fade-in">
            <h2>Daily Meal Plan</h2>
            <div class="meals-grid">
                ${plan.meals ? plan.meals.map(meal => `
                    <div class="meal-card card">
                        <div class="meal-header">
                            <h3>${meal.type}</h3>
                            <span class="meal-time">${meal.time}</span>
                        </div>
                        <div class="meal-items">
                            <ul>
                                ${meal.items.map(item => `<li>✓ ${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="meal-calories">
                            <strong>~${meal.calories} kcal</strong>
                        </div>
                    </div>
                `).join('') : '<p>No meal details available.</p>'}
            </div>
        </div>

        <div class="nutrition-tips fade-in">
            <h2>🔔 Nutrition Tips</h2>
            <div class="tips-list">
                <div class="tip-item"><strong>Hydration:</strong> Drink at least 2-3 liters of water daily</div>
                <div class="tip-item"><strong>Meal Timing:</strong> Eat every 3-4 hours to maintain steady energy</div>
                <div class="tip-item"><strong>Macro Balance:</strong> Follow the recommended macros for optimal results</div>
            </div>
        </div>
    `;

    contentDiv.innerHTML = html;
}

function initDietManagementPage(container) {
    const dietForm = container.querySelector('#dietForm');
    if (dietForm) {
        dietForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
            const meals = mealTypes.map(type => {
                const itemsStr = document.getElementById(`meal${type}Items`).value;
                const items = itemsStr.split(',').map(i => i.trim()).filter(i => i);
                return {
                    type: type,
                    time: document.getElementById(`meal${type}Time`).value,
                    items: items,
                    calories: document.getElementById(`meal${type}Calories`).value
                };
            });

            const macros = {
                protein: document.getElementById('macroProtein').value,
                carbs: document.getElementById('macroCarbs').value,
                fats: document.getElementById('macroFats').value
            };

            let dietList = JSON.parse(localStorage.getItem('dietPlans')) || [];
            const newPlan = {
                id: 'custom-diet-' + Date.now(),
                name: document.getElementById('dietName').value,
                goal: document.getElementById('dietGoal').value,
                calories: document.getElementById('dietCalories').value,
                description: document.getElementById('dietDescription').value,
                macros: macros,
                meals: meals
            };

            dietList.push(newPlan);
            localStorage.setItem('dietPlans', JSON.stringify(dietList));

            alert('Diet plan added successfully!');
            if (window.location.pathname.includes('manage-diet.html')) {
                window.location.reload();
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-diet' }));
            }
        });
    }

    const plansListContainer = container.querySelector('#dietPlansList');
    if (plansListContainer) {
        let dietList = JSON.parse(localStorage.getItem('dietPlans')) || [];
        if (dietList.length === 0) {
            plansListContainer.innerHTML = '<p class="no-data">No custom diet plans yet. Create one above!</p>';
        } else {
            plansListContainer.innerHTML = '';
            dietList.forEach((plan, index) => {
                const planCard = document.createElement('div');
                planCard.className = 'plan-item card';
                planCard.innerHTML = `
                    <h3>${plan.name}</h3>
                    <p><strong>Goal:</strong> ${plan.goal}</p>
                    <p><strong>Calories:</strong> ${plan.calories}</p>
                    <p>${plan.description}</p>
                    <button class="btn btn-danger" onclick="deleteDietPlan(${index})">Delete</button>
                `;
                plansListContainer.appendChild(planCard);
            });
        }
    }
}

function createDietManagementPage() {
    const container = document.createElement('div');
    container.className = 'diet-management-container';

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    container.innerHTML = `
        <div class="page-header">
            <h1>🥗 Manage Diet Plans</h1>
        </div>

        <div class="management-section">
            <h2>Create New Diet Plan</h2>
            <form id="dietForm" class="management-form">
                <div class="grid grid-2">
                    <div class="form-group">
                        <label for="dietName">Plan Name:</label>
                        <input type="text" id="dietName" name="dietName" placeholder="e.g. Keto Starter" required>
                    </div>

                    <div class="form-group">
                        <label for="dietGoal">Fitness Goal:</label>
                        <select id="dietGoal" name="dietGoal" required>
                            <option value="weight-loss">Weight Loss</option>
                            <option value="muscle-gain">Muscle Gain</option>
                            <option value="endurance">Endurance</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-2">
                    <div class="form-group">
                        <label for="dietCalories">Total Daily Calories:</label>
                        <input type="text" id="dietCalories" name="dietCalories" placeholder="e.g., 1800 kcal" required>
                    </div>
                     <div class="form-group">
                        <label>Target Macros (P/C/F):</label>
                        <div style="display: flex; gap: 0.5rem;">
                            <input type="text" id="macroProtein" placeholder="Prot (g)" required>
                            <input type="text" id="macroCarbs" placeholder="Carb (g)" required>
                            <input type="text" id="macroFats" placeholder="Fat (g)" required>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="dietDescription">Description:</label>
                    <textarea id="dietDescription" name="dietDescription" rows="3" required></textarea>
                </div>

                <h3>Daily Meal Structure</h3>
                <div class="meals-inputs">
                    ${mealTypes.map(type => `
                        <div class="meal-input-group card" style="padding: 1rem; margin-bottom: 1rem;">
                            <h4>${type}</h4>
                            <div class="grid grid-3">
                                <div class="form-group">
                                    <label>Approx Time</label>
                                    <input type="text" id="meal${type}Time" placeholder="e.g. 8:00 AM">
                                </div>
                                <div class="form-group">
                                    <label>Calories</label>
                                    <input type="text" id="meal${type}Calories" placeholder="e.g. 400">
                                </div>
                                <div class="form-group">
                                    <label>Food Items (comma separated)</label>
                                    <input type="text" id="meal${type}Items" placeholder="Eggs, Toast, Coffee">
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 1rem;">Create Diet Plan</button>
            </form>
        </div>

        <div class="plans-list">
            <h2>Current Diet Plans</h2>
            <div id="dietPlansList"></div>
        </div>
    `;

    setTimeout(() => initDietManagementPage(container), 0);

    return container;
}


function deleteDietPlan(index) {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    let dietList = JSON.parse(localStorage.getItem('dietPlans')) || [];
    dietList.splice(index, 1);
    localStorage.setItem('dietPlans', JSON.stringify(dietList));

    alert('Diet plan deleted successfully!');
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'manage-diet' }));
}
