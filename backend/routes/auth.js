const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashedPassword], 
    (err, result) => {
      if (err) return res.status(500).json({ message: 'User already exists or error' });
      res.status(201).json({ message: 'User registered successfully' });
    });
});

// Login User
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

module.exports = router;