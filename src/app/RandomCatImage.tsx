import { useEffect, useState } from "react";

type Expense = {
  id: number;
  name: string;
  cost: number;
};

const EXPENSE = {
  name: "Water",
  cost: 1200,
};

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/expenses");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("getting expenses", response);
  return response;
};

const postExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/create-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/jason",
    },
    body: JSON.stringify(EXPENSE),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log("getting expenses", response);
  return response;
};

const RandomExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>();

  const fetchExpenses = async () => {
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-10">
      <div className="mb-4">
        <p onClick={postExpenses}>Hello</p>
        {expenses.map((expense) => (
          <p key={expense.id}>
            {expense.name}: {expense.cost}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RandomExpense;
