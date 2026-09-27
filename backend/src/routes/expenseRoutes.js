const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let sql = `
      SELECT id, title, amount, category, expense_date, description, created_at
      FROM expenses
    `;
    const params = [];

    if (category) {
      sql += " WHERE category = ?";
      params.push(category);
    }

    sql += " ORDER BY expense_date DESC, id DESC";

    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, amount, category, expense_date, description } = req.body;

    if (!title || amount === undefined || !category || !expense_date) {
      return res.status(400).json({
        message: "Title, amount, category and date are required"
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const [result] = await db.execute(
      `
        INSERT INTO expenses
        (title, amount, category, expense_date, description)
        VALUES (?, ?, ?, ?, ?)
      `,
      [title, numericAmount, category, expense_date, description || null]
    );

    res.status(201).json({
      message: "Expense added",
      expenseId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, amount, category, expense_date, description } = req.body;

    const [result] = await db.execute(
      `
        UPDATE expenses
        SET title = ?, amount = ?, category = ?, expense_date = ?, description = ?
        WHERE id = ?
      `,
      [title, amount, category, expense_date, description || null, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM expenses WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
