import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <AddTransactionForm setTransactions={setTransactions} />
      <TransactionsList transactions={transactions} searchTerm={searchTerm} />
    </div>
  );
}

export default AccountContainer;
