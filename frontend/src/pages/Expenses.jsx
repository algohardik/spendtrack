import { useEffect, useState } from "react";
import api from "../api";

const emptyForm = {
  title: "",
  amount: "",
  category: "Food",
  expense_date: "",
  description: ""
};

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    try {
      const response = await api.get("/expenses", {
        params: filter ? { category: filter } : {}
      });
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [filter]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        await api.put(`/expenses/${editingId}`, form);
      } else {
        await api.post("/expenses", form);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save expense");
    }
  };

  const editExpense = (expense) => {
    setEditingId(expense.id);
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      expense_date: expense.expense_date?.slice(0, 10),
      description: expense.description || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteExpense = async (id) => {
    const confirmed = window.confirm("Delete this expense?");
    if (!confirmed) return;

    try {
      await api.delete(`/expenses/${id}`);
      await loadExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete expense");
    }
  };

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Expenses</h2>
          <p className="muted">Add, update, filter and delete expenses.</p>
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {error && <div className="alert">{error}</div>}

      <section className="card">
        <h3>{editingId ? "Edit Expense" : "Add Expense"}</h3>

        <form onSubmit={submit} className="expense-form">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Health</option>
            <option>Education</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            value={form.expense_date}
            onChange={(e) => setForm({ ...form, expense_date: e.target.value })}
            required
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="form-actions">
            <button className="btn" type="submit">
              {editingId ? "Update" : "Add Expense"}
            </button>

            {editingId && (
              <button
                className="btn secondary"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h3>Transaction History</h3>

        {expenses.length === 0 ? (
          <p className="muted">No expenses found.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td>₹{Number(expense.amount).toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.expense_date?.slice(0, 10)}</td>
                    <td>{expense.description || "-"}</td>
                    <td className="actions">
                      <button
                        className="btn small"
                        onClick={() => editExpense(expense)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn danger small"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Expenses;
