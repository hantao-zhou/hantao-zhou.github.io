// modules/terminal/terminal.js
(function() {
  // Retrieve the output display and input field
  const outputElement = document.getElementById('terminal-output');
  const inputElement = document.getElementById('terminal-input');

  // Maintain command history for navigation
  let commandHistory = [];
  let historyIndex = -1;

  /**
   * Appends a line of text to the terminal output.
   * @param {string} text - Text to display.
   */
  function appendOutput(text) {
    const line = document.createElement('div');
    line.textContent = text;
    outputElement.appendChild(line);
    // Ensure the latest output is visible.
    outputElement.scrollTop = outputElement.scrollHeight;
  }

  /**
   * Handles the entered command:
   * - Displays the command.
   * - Dispatches it to the command dispatcher.
   * - Outputs the result.
   * @param {string} command - The command string.
   */
  async function handleCommand(command) {
    if (!command.trim()) return;
    appendOutput(`> ${command}`);
    // Save command to history and reset history pointer.
    commandHistory.push(command);
    historyIndex = commandHistory.length;

    // Use the commandDispatcher if available.
    if (window.commandDispatcher) {
      try {
        const result = await window.commandDispatcher.dispatch(command);
        if (result !== undefined && result !== "") {
          if (typeof result === 'object') {
            appendOutput(JSON.stringify(result, null, 2));
          } else {
            appendOutput(result);
          }
        }
      } catch (err) {
        appendOutput(`Error: ${err.message}`);
      }
    } else {
      appendOutput('Command dispatcher not available.');
    }
  }

  // Listen for key events on the terminal input.
  inputElement.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const command = inputElement.value;
      inputElement.value = '';
      await handleCommand(command);
    } else if (event.key === 'ArrowUp') {
      // Navigate upward in command history.
      if (historyIndex > 0) {
        historyIndex--;
        inputElement.value = commandHistory[historyIndex];
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      // Navigate downward in command history.
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputElement.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputElement.value = '';
      }
      event.preventDefault();
    }
  });

  // Optionally expose a global function to clear terminal output.
  window.clearTerminal = function() {
    outputElement.innerHTML = '';
  };

  // (Optional) Automatically focus the input when the module loads.
  inputElement.focus();
})();
