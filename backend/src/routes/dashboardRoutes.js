const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [summaryRows] = await db.execute(`
      SELECT
        COUNT(*) AS total_expenses,
        COALESCE(SUM(amount), 0) AS total_spent,
        COALESCE(AVG(amount), 0) AS average_expense
      FROM expenses
    `);

    const [categoryRows] = await db.execute(`
      SELECT category, COALESCE(SUM(amount), 0) AS total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);

    res.json({
      summary: summaryRows[0],
      byCategory: categoryRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
