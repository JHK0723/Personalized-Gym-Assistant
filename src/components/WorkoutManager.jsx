import React, { useState, useEffect } from 'react';

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
                { day: 'Wednesday', exercise: 'HIIT Training', duration: '40 mins', intensity: 'Very High' }
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
                { day: 'Tuesday', exercise: 'Back & Biceps', duration: '60 mins', intensity: 'High' }
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
                { day: 'Monday', exercise: 'Steady State Cardio', duration: '45 mins', intensity: 'Medium' }
            ]
        }
    ]
};

export default function WorkoutManager({ isAdmin }) {
    const [goal, setGoal] = useState('weight-loss');
    const [allPlans, setAllPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        const defaultPlans = WORKOUT_PLANS[goal] || [];
        const customPlans = (JSON.parse(localStorage.getItem('workoutPlans')) || []).filter(p => p.goal === goal);
        setAllPlans([...defaultPlans, ...customPlans]);
    }, [goal]);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this plan?')) return;
        const allCustom = JSON.parse(localStorage.getItem('workoutPlans')) || [];
        const updated = allCustom.filter(p => p.id !== id);
        localStorage.setItem('workoutPlans', JSON.stringify(updated));
        setAllPlans(prev => prev.filter(p => p.id !== id));
    };

    if (selectedPlan) {
        return (
            <div className="workout-details fade-in">
                <button className="btn btn-text" onClick={() => setSelectedPlan(null)}>← Back to Programs</button>
                <div className="workout-plan-card card">
                    <div className="card-title">{selectedPlan.name}</div>
                    <div className="plan-info">
                        <div className="info-item"><span>Duration:</span> <strong>{selectedPlan.duration}</strong></div>
                        <div className="info-item"><span>Intensity:</span> <strong>{selectedPlan.intensity || 'Medium'}</strong></div>
                        <div className="info-item"><span>Description:</span> <p>{selectedPlan.description}</p></div>
                    </div>
                </div>

                <div className="schedule-section">
                    <h2>Weekly Schedule</h2>
                    <table className="schedule-table">
                        <thead>
                            <tr><th>Day</th><th>Exercise</th><th>Duration</th><th>Intensity</th></tr>
                        </thead>
                        <tbody>
                            {selectedPlan.schedule?.map((session, i) => (
                                <tr key={i} className="schedule-row">
                                    <td><strong>{session.day}</strong></td>
                                    <td>{session.exercise}</td>
                                    <td>{session.duration}</td>
                                    <td><span className="intensity-badge">{session.intensity}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="workout-container">
            <div className="page-header">
                <h1>📋 Workout Plans</h1>
                <p>Choose your fitness goal and follow your personalized workout routine</p>
            </div>

            <div className="goal-selector">
                <label>Select Your Fitness Goal:</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="endurance">Endurance Training</option>
                </select>
            </div>

            {allPlans.length === 0 ? (
                <p className="no-data">No programs available for this category yet.</p>
            ) : (
                <div className="programs-grid grid grid-2 fade-in">
                    {allPlans.map((plan) => (
                        <div key={plan.id} className="program-card card" onClick={() => setSelectedPlan(plan)}>
                            <h3>{plan.name}</h3>
                            <div className="program-meta">
                                <span>⏱️ {plan.duration}</span>
                                <span>🔥 {plan.intensity || 'Medium'}</span>
                            </div>
                            <p>{plan.description.substring(0, 100)}...</p>
                            <button className="btn btn-secondary btn-block">View Schedule</button>

                            {isAdmin && plan.id.startsWith('custom-') && (
                                <button
                                    className="btn btn-danger btn-block"
                                    style={{ marginTop: '0.5rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleDelete(plan.id); }}
                                >
                                    Delete Program
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
