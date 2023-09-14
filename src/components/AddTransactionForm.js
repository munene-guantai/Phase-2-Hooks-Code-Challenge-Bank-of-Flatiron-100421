import React, {useState} from "react";

function AddTransactionForm({ setTransactions }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  })

  const handleFormSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/transactions", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newTransaction = await response.json();

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

      setFormData({
        date: "",
        description: "",
        category: "",
        amount: 0,
      });
    } catch (error) {
      console.error("Error addind transaction:", error)
    }
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleFormSumbit}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
