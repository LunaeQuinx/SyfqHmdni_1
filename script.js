document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputtext');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const decimalButton = document.querySelector('.decimal');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const equalsButton = document.getElementById('equals');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentInput += button.value;
            inputText.value = currentInput;
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = button.value;
            previousInput = currentInput;
            currentInput = '';
        });
    });

    decimalButton.addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            inputText.value = currentInput;
        }
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        previousInput = '';
        operator = '';
        inputText.value = '0';
    });

    deleteButton.addEventListener('click', () => {
        currentInput = currentInput.slice(0, -1);
        inputText.value = currentInput || '0';
    });

    equalsButton.addEventListener('click', () => {
        calculate();
        operator = '';
    });

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        inputText.value = currentInput;
        previousInput = '';
    }
});
