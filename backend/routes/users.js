const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const authMiddleware = require('./middleware');

const router = express.Router();

// Get All Users (for dashboard)
router.get('/', (req, res) => {
  db.query('SELECT id, name, email, created_at FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching users' });
    res.json(results);
  });
});

// Create User
router.post('/', authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Email already exists or error' });
        res.status(201).json({ message: 'User created', id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const updates = [];
  const values = [];

  if (name) { updates.push('name = ?'); values.push(name); }
  if (email) { updates.push('email = ?'); values.push(email); }
  if (password) { 
    const hashed = await bcrypt.hash(password, 10);
    updates.push('password = ?'); 
    values.push(hashed);
  }

  if (updates.length === 0) return res.status(400).json({ message: 'No data to update' });

  values.push(id); // For WHERE clause
  const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating user' });
    res.json({ message: 'User updated' });
  });
});

// Delete User
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting user' });
    res.json({ message: 'User deleted' });
  });
});



module.exports = router;