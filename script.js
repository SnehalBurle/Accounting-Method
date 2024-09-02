document.addEventListener('DOMContentLoaded', () => {
    const stack = [];
    const stackDiv = document.getElementById('stack');
    const calculationsDiv = document.getElementById('calculations');
    const pushButton = document.getElementById('push');
    const popButton = document.getElementById('pop');
    const multipopButton = document.getElementById('multipop');

    let totalActualCost = 0;
    let totalAmortizedCost = 0;
    let totalCredit = 0;
    let operationCount = 0;

    const renderStack = () => {
        stackDiv.innerHTML = '';
        stack.forEach(item => {
            const div = document.createElement('div');
            div.className = 'stack-item';
            div.innerText = item.value;
            stackDiv.appendChild(div);
        });
    };

    const updateCalculations = (operation, actualCost, amortizedCost, creditChange) => {
        totalActualCost += actualCost;
        totalAmortizedCost += amortizedCost;
        totalCredit += creditChange;
        operationCount++;
        const amortizedCostPerOp = totalAmortizedCost / operationCount;

        const div = document.createElement('div');
        div.innerHTML = `
            <strong>OPERATION ${operationCount}</strong><br>
            <strong>Operation:</strong> ${operation},
            <strong>Actual Cost:</strong> ${actualCost}, 
            <strong>Amortized Cost:</strong> ${amortizedCost}, 
            <strong>Credit Change:</strong> ${creditChange},<br>
            <strong>Total Actual Cost:</strong> ${totalActualCost}, 
            <strong>Total Amortized Cost:</strong> ${totalAmortizedCost}, 
            <strong>Total Credit:</strong> ${totalCredit}, 
            <strong>Amortized Cost Per Operation:</strong> ${amortizedCostPerOp.toFixed(2)}<br>
        `;
        calculationsDiv.appendChild(div);
    };

    pushButton.addEventListener('click', () => {
        const value = Math.floor(Math.random() * 100);
        stack.push({ value, credit: 1 });
        renderStack();
        updateCalculations('Push', 1, 2, 1);
    });

    popButton.addEventListener('click', () => {
        if (stack.length > 0) {
            const popped = stack.pop();
            renderStack();
            updateCalculations('Pop', 1, 0, -popped.credit);
        } else {
            alert('Stack is empty!');
        }
    });

    multipopButton.addEventListener('click', () => {
        if (stack.length === 0) {
            alert('Stack is empty! No elements to pop.');
            return;
        }

        const popCount = parseInt(prompt("Enter the number of elements to pop: "), 10);
        if (isNaN(popCount) || popCount < 0) {
            alert("Please enter a valid number!");
            return;
        }

        for (let i = 0; i < popCount && stack.length > 0; i++) {
            const popped = stack.pop();
            updateCalculations('Multipop', -1, -1, -popped.credit);
        }
        renderStack();
    });
});
