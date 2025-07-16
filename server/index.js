const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Messages/Contact table
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Course registrations table
  db.run(`CREATE TABLE IF NOT EXISTS course_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_id TEXT NOT NULL,
    course_title TEXT NOT NULL,
    experience TEXT,
    goals TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin user if not exists
  db.run(`INSERT OR IGNORE INTO users (name, email, role) 
          VALUES ('Admin User', 'admin@language.com', 'admin')`);
  
  db.run(`INSERT OR IGNORE INTO users (name, email, role) 
          VALUES ('Ahmed Hassan', 'student@language.com', 'student')`);
});

// API Routes

// Get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Get user by email (for login)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple authentication (in production, use proper password hashing)
  if (email === 'admin@language.com' && password === 'admin123') {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (row) {
        res.json({ success: true, user: row });
      } else {
        res.status(401).json({ success: false, message: 'User not found' });
      }
    });
  } else if (email === 'student@language.com' && password === 'student123') {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (row) {
        res.json({ success: true, user: row });
      } else {
        res.status(401).json({ success: false, message: 'User not found' });
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name, email, role = 'student' } = req.body;
  
  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
    return;
  }

  db.run('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', 
    [name, email, role], 
    function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          res.status(400).json({ error: 'Email already exists' });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.json({ 
        success: true, 
        user: { id: this.lastID, name, email, role } 
      });
    }
  );
});

// Get all messages
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ messages: rows });
  });
});

// Create new message
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', 
    [name, email, message], 
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        success: true, 
        message: { id: this.lastID, name, email, message } 
      });
    }
  );
});

// Course registration endpoints
app.get('/api/registrations', (req, res) => {
  db.all('SELECT * FROM course_registrations ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ registrations: rows });
  });
});

app.post('/api/registrations', (req, res) => {
  const { user_name, email, phone, course_id, course_title, experience, goals } = req.body;
  
  if (!user_name || !email || !course_id || !course_title) {
    res.status(400).json({ error: 'Name, email, course_id, and course_title are required' });
    return;
  }

  db.run(`INSERT INTO course_registrations 
          (user_name, email, phone, course_id, course_title, experience, goals) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`, 
    [user_name, email, phone, course_id, course_title, experience, goals], 
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        success: true, 
        registration: { 
          id: this.lastID, 
          user_name, 
          email, 
          phone, 
          course_id, 
          course_title, 
          experience, 
          goals 
        } 
      });
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database file: ${dbPath}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});