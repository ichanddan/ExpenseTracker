import { Button, Card, CardBody, CardHeader, DatePicker, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { today } from "@internationalized/date";

export default function App() {
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(today);
  const [reason, setReason] = React.useState("");
  const [data, setData] = React.useState([]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expenses")) || [];
    setData(storedData);
  }, []);

  // Save data to localStorage after adding a new expense
  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { amount, reason, date };
    const updatedData = [...data, newExpense];

    // Update the state and localStorage
    setData(updatedData);
    localStorage.setItem("expenses", JSON.stringify(updatedData));
  };

  return (
    <div className="p-4">
      <Card className="flex items-center justify-between w-full">
        <CardHeader className="flex items-center justify-center text-6xl font-bold">
          Expense Tracker
        </CardHeader>
        <CardBody>

            <div>
              <label htmlFor="amount">Amount</label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="w-1/2"
              />
            </div>
            <div>
              <label htmlFor="reason">Reason</label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for expense"
                required
                className="w-1/2"
              />
            </div>

            <label htmlFor="date">Date</label>
            <DatePicker
              defaultValue={today} // Set initial value
              value={date}
              onChange={setDate} // Use the state setter directly
            />
            <Button onClick={handleSubmit} className="w-full my-6">
              Add Expense
            </Button>
        </CardBody>
      </Card>

      <Card className="p-4">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody >
            {data.map((expense, index) => (
              <tr key={index}>
                <td className="text-center">{`${expense.date.day}-${expense.date.month}-${expense.date.year}`}</td>
                <td className="text-center">{expense.amount}</td>
                <td className="text-center">{expense.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
