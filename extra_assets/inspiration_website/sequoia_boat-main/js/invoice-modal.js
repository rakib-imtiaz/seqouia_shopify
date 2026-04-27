/**
 * Sequoia Boat Rentals & Concierge Services
 * Invoice Generator Component
 */

/**
 * Generate and display an invoice modal with payment option
 * 
 * @param {Object} bookingData - The booking data object
 * @param {String} bookingId - The document ID in Firestore
 * @returns {Promise<boolean>} - Returns true if payment was initiated
 */
async function showInvoiceModal(bookingData, bookingId) {
    return new Promise((resolve) => {
                // Format addon items for display
        const addonsArray = [];
        let addonsTotal = 0;

        if (bookingData.addons.cooler) {
            addonsArray.push({
                name: 'Cooler Rental',
                price: 30.00
            });
            addonsTotal += 30;
        }

        if (bookingData.addons.speaker) {
            addonsArray.push({
                name: 'JBL Speaker Rental',
                price: 20.00
            });
            addonsTotal += 20;
        }

        if (bookingData.addons.drybags) {
            addonsArray.push({
                name: 'Dry Bags Rental',
                price: 10.00
            });
            addonsTotal += 10;
        }

        // Parse the estimated total from string (e.g. "$140.00")
        const estimatedTotal = parseFloat(bookingData.estimatedTotal.replace(/[^0-9.]/g, ''));

        // In promotional pricing, final price is always the base price
        const basePrice = estimatedTotal;
        const finalPrice = basePrice;
        const savings = addonsTotal;

        // Generate invoice number from booking id and date
        const invoiceNum = `SBR-${new Date().getFullYear()}-${bookingId.substring(0, 6).toUpperCase()}`;

        // Format date for display
        const bookingDate = new Date(bookingData.date);
        const formattedDate = bookingDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Build the invoice HTML with promotional pricing
        const invoiceHTML = `
            <div class="invoice-container">
                <div class="invoice-header">
                    <div class="company-info">
                        <h2>Sequoia Boat Rentals</h2>
                        <p>Arrowstone Drive, Kamloops, BC, V2C1P9</p>
                        <p>Tel: (250) 879-6055 | Email: info@sequoiaservices.ca</p>
                    </div>
                    <div class="invoice-info">
                        <h3>INVOICE</h3>
                        <p><strong>Invoice #:</strong> ${invoiceNum}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                
                <div class="customer-details">
                    <h4>Booking Details</h4>
                    <p><strong>Location:</strong> ${bookingData.lake}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Time:</strong> ${bookingData.time}</p>
                    <p><strong>Boat Type:</strong> ${bookingData.boatType}</p>
                </div>
                
                <div class="promotional-notice">
                    <i class="fas fa-gift"></i>
                    <span>Special Offer: All add-ons included FREE!</span>
                </div>
                
                <table class="invoice-items">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th class="text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Boat Rental (${bookingData.duration}) - ${bookingData.boatType}</td>
                            <td class="text-right">$${basePrice.toFixed(2)}</td>
                        </tr>
                        ${addonsArray.map(addon => `
                            <tr class="addon-row">
                                <td>
                                    ${addon.name}
                                    <span class="addon-badge">FREE</span>
                                    <small class="addon-value">($${addon.price.toFixed(2)} value)</small>
                                </td>
                                <td class="text-right addon-price">$0.00</td>
                            </tr>
                        `).join('')}
                        ${addonsTotal > 0 ? `
                            <tr class="savings-row">
                                <td><strong>Add-ons Total Value:</strong></td>
                                <td class="text-right">$${addonsTotal.toFixed(2)}</td>
                            </tr>
                            <tr class="savings-row">
                                <td><strong>Your Savings:</strong></td>
                                <td class="text-right savings-amount">-$${savings.toFixed(2)}</td>
                            </tr>
                        ` : ''}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Amount Due</th>
                            <th class="text-right">$${finalPrice.toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
                
                <div class="payment-info">
                    <p><strong>Payment Status:</strong> <span class="status-badge status-pending">Pending Payment</span></p>
                    <p>Please complete your booking by proceeding to the secure payment checkout.</p>
                </div>
            </div>
            
            <style>
                .promotional-notice {
                    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
                    color: white;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    text-align: center;
                    margin: 1rem 0;
                    font-weight: 600;
                }
                
                .promotional-notice i {
                    margin-right: 0.5rem;
                    color: #ffeb3b;
                }
                
                .addon-row {
                    background: #f8f9fa;
                }
                
                .addon-badge {
                    background: #4caf50;
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    margin-left: 0.5rem;
                }
                
                .addon-value {
                    display: block;
                    color: #666;
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                }
                
                .addon-price {
                    color: #4caf50;
                    font-weight: 600;
                }
                
                .savings-row {
                    background: #e8f5e8;
                }
                
                .savings-amount {
                    color: #4caf50;
                    font-weight: 700;
                }
            </style>
        `;

        // Set up the modal
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalFooter = document.getElementById('modal-footer');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalCloseBtn = document.getElementById('modal-close');

        // Set content
        modalTitle.textContent = 'Booking Invoice';
        modalBody.innerHTML = invoiceHTML;
        modalFooter.innerHTML = '';

        // Add payment button - simplified to just one button
        const paymentButton = document.createElement('button');
        paymentButton.id = 'checkout-button';
        paymentButton.className = 'btn btn-accent';
        paymentButton.textContent = 'Proceed to Payment';
        modalFooter.appendChild(paymentButton);

        // Show modal
        modalOverlay.style.display = 'flex';

        // Helper to update payment status in Firebase
        function updatePaymentStatus() {
            try {
                // Update the booking with payment status
                db.collection('bookings').doc(bookingId).update({
                    isPaid: true,
                    paidAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (err) {
                console.error("Error updating payment status:", err);
            }
        }

        // Add event listeners
        function onCheckout() {
            modalOverlay.style.display = 'none';
            paymentButton.removeEventListener('click', onCheckout);
            modalCloseBtn.removeEventListener('click', onClose);

            // Redirect via Cloud Function created session
            if (typeof redirectToStripeCheckout === 'function') {
                redirectToStripeCheckout(bookingId);
            }
            resolve(true);
        }

        function onClose() {
            modalOverlay.style.display = 'none';
            paymentButton.removeEventListener('click', onCheckout);
            modalCloseBtn.removeEventListener('click', onClose);
            resolve(false);
        }

        // Add event listeners
        paymentButton.addEventListener('click', onCheckout);
        modalCloseBtn.addEventListener('click', onClose);
    });
} 