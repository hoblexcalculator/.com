function appendToDisplay(value) {
    const input = document.getElementById("MyInput");
    input.value += value;
    
  }
  function clearExpression() {
    document.getElementById("MyExpression").value = "";
    document.getElementById("MyResult").textContent = "";
  }

  function solveExpression() {
    // Get the expression and x value from input fields
    const expr = document.getElementById("MyInput").value;
    const x = parseFloat(document.getElementById("xValue").value);

    // Replace x with its value (wrap in parentheses for safety)
    let replacedExpr = expr.replace(/x/g, `(${x})`).replace(/\^/g, '**');

    try {
        // Evaluate the expression
        const result = eval(replacedExpr); // WARNING: eval is unsafe for production!
        // Check if result is valid
        if (isNaN(result) || !isFinite(result)) {
            document.getElementById("result").textContent = "Invalid expression";
        } else {
            document.getElementById("result").textContent = result;
        }
    } catch (e) {
        document.getElementById("result").textContent = "Invalid expression";
    }
}
                function squareRoot() {
    const input = document.getElementById("MyInput");
    try {
      input.value = Math.sqrt(eval(input.value));
    } catch {
      input.value = "Error";
    }
  }

  function cubeRoot() {
    const input = document.getElementById("MyInput");
    try {
      input.value = Math.cbrt(eval(input.value));
    } catch {
      input.value = "Error";
    }
  }
                 function moveCursorLeft() {
    const input = document.getElementById("MyInput");
    let pos = input.selectionStart;

    // Move one character left, but not below 0
    if (pos > 0) {
      input.setSelectionRange(pos - 1, pos - 1);
      input.focus();
    }
  }

  function moveCursorRight() {
    const input = document.getElementById("MyInput");
    let pos = input.selectionStart;

    // Move one character right, but not beyond the length of the value
    if (pos < input.value.length) {
      input.setSelectionRange(pos + 1, pos + 1);
      input.focus();
    }
  }
             function deleteAll() {
    document.getElementById("MyInput").value = "";
  }
     function calculate() {
    const display = document.getElementById("MyInput");
 try {
                let expression = display.value;

                // Handle percentage: e.g., "100 + 20%" becomes "100 + (20/100 * 100)"
                expression = expression.replace(/(\d+\.?\d*)\s*%\s*([+\-])/g, function(match, num, op) {
                    const percentage = parseFloat(num) / 100;
                    const base = expression.slice(0, expression.indexOf(num)).trim().split(/[\+\-\*\/^]/).pop();
                    return `${op} (${percentage} * ${base})`;
                });

                // Handle standalone percentage: e.g., "20%" becomes "20/100"
                expression = expression.replace(/(\d+\.?\d*)%/g, '($1/100)');

                // Replace ^ with ** for JavaScript evaluation
                expression = expression.replace(/\^/g, '**');

                // Evaluate the expression
                let result = eval(expression);

                // Check if result is valid
                if (isNaN(result) || !isFinite(result)) {
                    display.value = 'Error';
                } else {
                    display.value = result;
                }
            } catch (error) {
                display.value = 'Error';
            }
        }
   function smartDelete() {
    const input = document.getElementById("MyInput");
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start !== end) {
      // If text is selected, delete the selected part
      input.value = input.value.slice(0, start) + input.value.slice(end);
      input.setSelectionRange(start, start); // Set cursor to where deletion occurred
    } else if (start > 0) {
      // No selection, delete one character before the cursor (like Backspace)
      input.value = input.value.slice(0, start - 1) + input.value.slice(start);
      input.setSelectionRange(start - 1, start - 1); // Move cursor back
    }
    // If start === 0 and no selection, do nothing (nothing to delete)
  }

   function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds}`;
      document.getElementById('clock').textContent = timeString;
    }

    // Update the clock immediately, then every second
    updateClock();
    setInterval(updateClock, 1000);