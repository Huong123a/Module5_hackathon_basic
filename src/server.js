const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const routes = require("./routes");
require("dotenv/config");

const app = express();
const db = process.env.SQL_DATABASE;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Create todo
app.post('/todo', (req, res) => {
  const { name, status } = req.body;
  const sql = 'INSERT INTO todos (name, status) VALUES (?, ?)';
  db.query(sql, [name, status], (err, result) => {
    if (err) {
      console.error('Error inserting todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ id: result.insertId, name, status });
  });
});

// Get all todos
app.get('/todo', (req, res) => {
  const sql = 'SELECT * FROM hackathon_basic.todos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update todo status to completed
app.put('/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const sql = 'UPDATE todos SET status="complete" WHERE id=?';
  db.query(sql, [todoId], (err) => {
    if (err) throw err;
    const updatedTodo = { id: todoId, status: 'complete' };
    res.json(updatedTodo);
  });
});

// Route để xóa một công việc theo ID
app.delete('/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const sql = 'DELETE FROM todos WHERE id = ?';
  
  db.query(sql, [todoId], (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });
});








const PORT = process.env.PORT || 3111;
app.listen(PORT, () => {
  console.log(`Connecting to port http://localhost:${PORT}`);
});