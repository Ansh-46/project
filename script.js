const transactionList = document.getElementById('transactionList');
const addTransactionBtn = document.getElementById('addTransaction');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const ctx = document.getElementById('myChart').getContext('2d');

let transactions = [];

addTransactionBtn.addEventListener('click', addTransaction);

function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (description && !isNaN(amount)) {
        transactions.push({ description, amount, category });
        updateTransactionList();
        updateChart();
        descriptionInput.value = '';
        amountInput.value = '';
    } else {
        alert("Please fill in both fields.");
    }
}

function updateTransactionList() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.description} - $${transaction.amount} (${transaction.category})`;
        transactionList.appendChild(li);
    });
}

function updateChart() {
    const expenses = transactions.filter(t => t.category === 'expense');
    const incomes = transactions.filter(t => t.category === 'income');

    const expenseAmount = expenses.reduce((total, t) => total + t.amount, 0);
    const incomeAmount = incomes.reduce((total, t) => total + t.amount, 0);

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Amount',
            data: [incomeAmount, expenseAmount],
            backgroundColor: ['#28a745', '#dc3545'],
            borderColor: ['#28a745', '#dc3545'],
            borderWidth: 1,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, config);
}
