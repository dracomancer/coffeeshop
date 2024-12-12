const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');  // Database configuration
const helmet = require('helmet');
const { check, validationResult } = require('express-validator');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Coffee Shop Payment Processing API');
});

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Get menu items
app.get('/menu', (req, res) => {
    const query = 'SELECT * FROM menu';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.status(200).json({ success: true, data: result });
    });
});

// Create a new order
app.post('/orders', (req, res) => {
    const { customer_name, items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, error: 'Items are required to create an order' });
    }

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });

        const queryOrder = 'INSERT INTO orders (customer_name, status) VALUES (?, "pending")';
        db.query(queryOrder, [customer_name], (err, orderResult) => {
            if (err) {
                db.rollback();
                return res.status(500).json({ success: false, error: err.message });
            }

            const orderId = orderResult.insertId;
            const itemQueries = items.map(item => {
                return new Promise((resolve, reject) => {
                    const queryItem = 'INSERT INTO order_items (order_id, item_name, quantity, price) VALUES (?, ?, ?, ?)';
                    db.query(queryItem, [orderId, item.item_name, item.quantity, item.price], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            });

            Promise.all(itemQueries)
                .then(() => {
                    db.commit((err) => {
                        if (err) {
                            db.rollback();
                            return res.status(500).json({ success: false, error: err.message });
                        }
                        res.status(201).json({ success: true, message: 'Order created successfully', orderId });
                    });
                })
                .catch((err) => {
                    db.rollback();
                    res.status(500).json({ success: false, error: err.message });
                });
        });
    });
});

// Process payment
app.post('/payments', [
    check('orderId').isInt(),
    check('amount').isFloat({ gt: 0 }),
    check('method').isString().isIn(['credit_card', 'qris'])
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { orderId, amount, method } = req.body;
    const query = 'INSERT INTO payments (order_id, amount, method) VALUES (?, ?, ?)';
    db.query(query, [orderId, amount, method], (err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.status(201).json({ success: true, message: 'Payment processed' });
    });
});

// Example route to create a transaction after payment
app.post('/payments', async (req, res) => {
    const { orderId, method } = req.body;

    try {
        // Fetch the order details to get the total amount
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create a new transaction
        const transaction = await Transaction.create({
            order_id: orderId,
            method,
            total_amount: order.totalAmount,
            status: 'completed', // Assuming payment is successful
        });

        res.status(200).json({ message: 'Payment processed successfully', transactionId: transaction.id });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ message: 'Payment processing failed' });
    }
});

// Example route to fetch a transaction
app.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error);
        res.status(500).json({ message: 'Failed to fetch transaction' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});