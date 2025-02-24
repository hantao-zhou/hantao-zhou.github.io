// terminal.js

document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
  
    // Append output to terminal
    function appendToTerminal(text) {
      const line = document.createElement('div');
      line.textContent = text;
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  
    // Listen for input
    terminalInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim();
        appendToTerminal(`> ${command}`);
        terminalInput.value = '';
  
        // Pass command to Command Dispatcher
        const result = await CommandDispatcher.handle(command);
        appendToTerminal(result);
      }
    });
  
    // Initial welcome message
    appendToTerminal('Welcome to Godspear Terminal. Type "help" to see available commands.');
  });
  
  const eventBusWorker = new Worker('scripts/event-bus.js');

  eventBusWorker.onmessage = (e) => {
    if (e.data.type === 'kernel_response') {
      appendToTerminal(e.data.payload);
    }
  };
  
  function sendCommandToKernel(command, args) {
    eventBusWorker.postMessage({
      type: 'kernel_command',
      payload: { command, args }
    });
  }
  