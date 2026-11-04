"use strict";

const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const formatCurrency = (number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number);
};

const removeTransaction = (id) => {
	transactions = transactions.filter((transaction) => transaction.id !== id);

	localStorage.setItem("transactions", JSON.stringify(transactions));

	updateTransactionList();
	updateSummary();
};

const createTransactionElement = (transaction) => {
	const li = document.createElement("li");
	li.classList.add("transaction");
	li.classList.add(transaction.amount > 0 ? "income" : "expense");

	li.innerHTML = `
    <span>${transaction.description}</span>
    <span>
    ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
	`;

	return li;
};

const updateTransactionList = () => {
	transactionListEl.innerHTML = "";

	const sortedTransactions = [...transactions].reverse();

	sortedTransactions.forEach((transaction) => {
		const transactionEl = createTransactionElement(transaction);
		transactionListEl.appendChild(transactionEl);
	});
};

const updateSummary = () => {
	const balance = transactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0,
	);

	const income = transactions
		.filter((transaction) => transaction.amount > 0)
		.reduce((acc, transaction) => acc + transaction.amount, 0);

	const expenses = transactions
		.filter((transaction) => transaction.amount < 0)
		.reduce((acc, transaction) => acc + transaction.amount, 0);

	balanceEl.textContent = formatCurrency(balance);
	incomeAmountEl.textContent = formatCurrency(income);
	expenseAmountEl.textContent = formatCurrency(expenses);
};

const addTransaction = (e) => {
	e.preventDefault();

	const description = descriptionEl.value.trim();
	const amount = parseFloat(amountEl.value);

	transactions.push({
		id: Date.now(),
		description,
		amount,
	});

	descriptionEl.value = "";
	amountEl.value = "";

	localStorage.setItem("transactions", JSON.stringify(transactions));

	updateTransactionList();
	updateSummary();
};

transactionFormEl.addEventListener("submit", addTransaction);

console.log(transactions);

updateTransactionList();
updateSummary();
