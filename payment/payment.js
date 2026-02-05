


const MEMBERSHIP_FEES = {
    'basic': { name: 'Basic Plan', price: 49, duration: '1 month' },
    'standard': { name: 'Standard Plan', price: 99, duration: '3 months' },
    'premium': { name: 'Premium Plan', price: 249, duration: '12 months' }
};

function createPaymentPage() {
    const container = document.createElement('div');
    container.className = 'payment-container';

    let paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

    container.innerHTML = `
        <div class="page-header">
            <h1>💳 Payments</h1>
            <p>Manage your membership payments</p>
        </div>

        <div class="membership-plans">
            <h2>Membership Plans</h2>
            <div class="plans-grid grid grid-3">
                ${Object.entries(MEMBERSHIP_FEES).map(([key, plan]) => `
                    <div class="plan-card card">
                        <h3>${plan.name}</h3>
                        <div class="plan-price">$${plan.price}</div>
                        <p class="plan-duration">${plan.duration}</p>
                        <ul class="plan-benefits">
                            <li>✓ Full gym access</li>
                            <li>✓ Personal trainer consultation</li>
                            <li>✓ Locker facility</li>
                            <li>✓ Workout plans</li>
                            <li>✓ Diet plans</li>
                        </ul>
                        <button class="btn btn-primary btn-block" onclick="processPayment('${key}', ${plan.price})">
                            Upgrade Now
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="payment-history">
            <h2>Payment History</h2>
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Receipt</th>
                    </tr>
                </thead>
                <tbody id="paymentHistoryList">
                    ${paymentHistory.length === 0 ? 
                        '<tr><td colspan="5" class="no-data">No payment history yet</td></tr>' 
                        : paymentHistory.map(payment => `
                            <tr>
                                <td>${payment.date}</td>
                                <td>${payment.plan}</td>
                                <td>$${payment.amount}</td>
                                <td><span class="badge badge-success">${payment.status}</span></td>
                                <td><a href="#" onclick="alert('Receipt: ID-' + '${payment.id}')">View</a></td>
                            </tr>
                        `).join('')
                    }
                </tbody>
            </table>
        </div>

        <div id="paymentNotification"></div>
    `;

    return container;
}

// Process payment
function processPayment(planKey, amount) {
    const plan = MEMBERSHIP_FEES[planKey];

    // Simulate payment processing
    const notification = document.getElementById('paymentNotification');
    const notif = document.createElement('div');
    notif.className = 'alert alert-info';
    notif.textContent = 'Processing payment...';
    notification.innerHTML = '';
    notification.appendChild(notif);

    setTimeout(() => {
        // Simulate successful payment
        const paymentRecord = {
            id: 'TXN' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            plan: plan.name,
            amount: amount,
            status: 'Completed'
        };

        let paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
        paymentHistory.push(paymentRecord);
        localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));

        const successNotif = document.createElement('div');
        successNotif.className = 'alert alert-success';
        successNotif.innerHTML = `
            <strong>✓ Payment Successful!</strong><br>
            Thank you for upgrading to ${plan.name}.<br>
            Transaction ID: ${paymentRecord.id}<br>
            A confirmation email has been sent to you.
        `;
        notification.innerHTML = '';
        notification.appendChild(successNotif);

        // Refresh payment history
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: 'payments' }));
        }, 2000);
    }, 1500);
}

// Create membership page
function createMembershipPage(user) {
    const container = document.createElement('div');
    container.className = 'membership-container';

    const membership = {
        type: 'Premium',
        startDate: '2023-01-15',
        expiryDate: '2025-01-15',
        status: 'Active',
        daysLeft: 345
    };

    container.innerHTML = `
        <div class="page-header">
            <h1>🎫 Membership Details</h1>
            <p>View your current membership information</p>
        </div>

        <div class="membership-card card">
            <div class="membership-header">
                <h2>${membership.type} Membership</h2>
                <span class="status-badge status-${membership.status.toLowerCase()}">
                    ${membership.status}
                </span>
            </div>

            <div class="membership-details">
                <div class="detail-row">
                    <span>Member Name:</span>
                    <strong>${user.name}</strong>
                </div>

                <div class="detail-row">
                    <span>Email:</span>
                    <strong>${user.email}</strong>
                </div>

                <div class="detail-row">
                    <span>Member ID:</span>
                    <strong>MEM-${user.id}-2024</strong>
                </div>

                <div class="detail-row">
                    <span>Membership Type:</span>
                    <strong>${membership.type}</strong>
                </div>

                <div class="detail-row">
                    <span>Status:</span>
                    <span class="badge badge-${membership.status === 'Active' ? 'success' : 'danger'}">
                        ${membership.status}
                    </span>
                </div>

                <div class="detail-row">
                    <span>Start Date:</span>
                    <strong>${membership.startDate}</strong>
                </div>

                <div class="detail-row">
                    <span>Expiry Date:</span>
                    <strong>${membership.expiryDate}</strong>
                </div>

                ${membership.status === 'Active' ? `
                    <div class="detail-row highlight">
                        <span>Days Remaining:</span>
                        <strong class="days-left">${membership.daysLeft} days</strong>
                    </div>
                ` : ''}
            </div>
        </div>

        <div class="membership-benefits">
            <h2>Your Benefits</h2>
            <div class="benefits-list">
                <div class="benefit-item">
                    <div class="benefit-icon">🏋️</div>
                    <h4>Full Gym Access</h4>
                    <p>24/7 access to all gym facilities and equipment</p>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">👨‍🏫</div>
                    <h4>Personal Training</h4>
                    <p>Complimentary consultation with certified trainers</p>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">📋</div>
                    <h4>Customized Plans</h4>
                    <p>Personalized workout and diet plans</p>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">🏆</div>
                    <h4>Progress Tracking</h4>
                    <p>Track your fitness progress and achievements</p>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">💪</div>
                    <h4>Group Classes</h4>
                    <p>Unlimited access to all group fitness classes</p>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">🎯</div>
                    <h4>Premium Support</h4>
                    <p>Priority support and expert guidance</p>
                </div>
            </div>
        </div>

        <div class="membership-actions">
            <h2>Actions</h2>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: 'payments' }))">
                    Renew/Upgrade Membership
                </button>
                <button class="btn btn-secondary" onclick="alert('For cancellation requests, please contact support@gymfit.com')">
                    Cancel Membership
                </button>
            </div>
        </div>
    `;

    return container;
}
