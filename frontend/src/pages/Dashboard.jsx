import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [data, setData] = useState({
    summary: {
      total_expenses: 0,
      total_spent: 0,
      average_expense: 0
    },
    byCategory: []
  });

  const loadDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p className="muted">Your spending summary.</p>
        </div>
      </div>

      <section className="stats-grid">
        <div className="card stat">
          <span>Total Expenses</span>
          <strong>{data.summary.total_expenses}</strong>
        </div>
        <div className="card stat">
          <span>Total Spent</span>
          <strong>₹{Number(data.summary.total_spent).toFixed(2)}</strong>
        </div>
        <div className="card stat">
          <span>Average Expense</span>
          <strong>₹{Number(data.summary.average_expense).toFixed(2)}</strong>
        </div>
      </section>

      <section className="card">
        <h3>Spending by Category</h3>

        {data.byCategory.length === 0 ? (
          <p className="muted">No expenses yet.</p>
        ) : (
          <div className="category-list">
            {data.byCategory.map((item) => (
              <div className="category-row" key={item.category}>
                <span>{item.category}</span>
                <strong>₹{Number(item.total).toFixed(2)}</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
