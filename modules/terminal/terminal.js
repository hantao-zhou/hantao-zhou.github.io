// modules/terminal/terminal.js
(function() {
  /**
   * Initializes a terminal instance within the given container.
   * Expects the container's HTML to include elements with classes:
   *   - .terminal-body (for output)
   *   - .terminal-input (for command input)
   * @param {HTMLElement} container - The DOM element containing the terminal markup.
   */
  function initTerminal(container) {
    const outputElement = container.querySelector('.terminal-body');
    const inputElement = container.querySelector('.terminal-input');

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
     * - If the command starts with "js:", executes it as JavaScript.
     * - Otherwise, dispatches it via the command dispatcher.
     * - If no dispatcher is available, falls back to JavaScript evaluation.
     * @param {string} command - The command string.
     */
    async function handleCommand(command) {
      if (!command.trim()) return;
      appendOutput(`> ${command}`);
      // Save command to history and reset history pointer.
      commandHistory.push(command);
      historyIndex = commandHistory.length;

      // If command starts with "js:", execute as JavaScript.
      if (command.trim().startsWith("js:")) {
        const jsCommand = command.trim().slice(3).trim();
        try {
          let result = eval(jsCommand);
          if (result !== undefined && result !== null) {
            appendOutput(String(result));
          }
        } catch (err) {
          appendOutput(`JS Error: ${err.message}`);
        }
      }
      // Otherwise, use the command dispatcher if available.
      else if (window.commandDispatcher) {
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
      }
      // Fallback: execute as JavaScript.
      else {
        try {
          let result = eval(command);
          if (result !== undefined && result !== null) {
            appendOutput(String(result));
          }
        } catch (err) {
          appendOutput(`JS Error: ${err.message}`);
        }
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

    // Expose a clear function for this terminal instance.
    container.clearTerminal = function() {
      outputElement.innerHTML = '';
    };

    // Automatically focus the input when the terminal loads.
    inputElement.focus();
  }

  // Expose the initTerminal function globally for the module loader.
  window.initTerminal = initTerminal;
})();
