import React from "react";

export default function App() {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for expense"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p>No expenses recorded yet.</p>
          ) : (
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense.id} className="border-b pb-2">
                  <p>
                    <strong>Amount:</strong> ${expense.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Date:</strong> {format(expense.date, "PPP")}
                  </p>
                  <p>
                    <strong>Reason:</strong> {expense.reason}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
