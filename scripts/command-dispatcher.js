/**
 * command-dispatcher.js – Command Router for Godspear OS
 *
 * This module acts as the intermediary between user input and the kernel.
 * It parses and validates commands, then routes them to the appropriate kernel APIs.
 *
 * Available commands (examples):
 *   - help: Lists all available commands.
 *   - list_processes: Lists all running processes.
 *   - start_process <processName>: Starts a new process.
 *   - stop_process <processId>: Stops a running process.
 *   - read_file <filePath>: Reads a file from the virtual file system.
 *   - write_file <filePath> <content>: Writes content to a file.
 *   - delete_file <filePath>: Deletes a file.
 *   - allocate_memory <processId> <size>: Allocates memory for a process.
 *   - free_memory <processId>: Frees allocated memory for a process.
 *   - call_service <serviceName> [args...]: Invokes a registered kernel service.
 */

// Global commandDispatcher object.
const commandDispatcher = {
  // Registry mapping command names to their handler and description.
  registry: {},

  /**
   * Registers a command with a handler function and a description.
   * @param {string} commandName - The command identifier.
   * @param {function} handler - An async function that executes the command.
   * @param {string} description - A short description of the command.
   */
  registerCommand(commandName, handler, description) {
    this.registry[commandName] = { handler, description };
  },

  /**
   * Dispatches a command string: parses input, validates, and routes to the correct handler.
   * @param {string} commandText - The full command string input.
   * @returns {Promise<string|object>} The result from the command handler or an error message.
   */
  async dispatch(commandText) {
    const tokens = commandText.trim().split(/\s+/);
    if (tokens.length === 0 || tokens[0] === "") {
      return "No command entered.";
    }
    const cmd = tokens[0];
    const args = tokens.slice(1);

    if (!this.registry[cmd]) {
      return `Command not recognized: ${cmd}. Type "help" for a list of commands.`;
    }

    try {
      // Execute the registered command handler and return its result.
      const result = await this.registry[cmd].handler(args);
      return result !== undefined ? result : "";
    } catch (error) {
      return `Error executing command "${cmd}": ${error.message}`;
    }
  },

  /**
   * Returns a formatted help string with all available commands.
   * @returns {string} Help information.
   */
  getHelp() {
    let helpText = "Available commands:\n";
    for (const cmd in this.registry) {
      if (this.registry.hasOwnProperty(cmd)) {
        helpText += `  ${cmd}: ${this.registry[cmd].description}\n`;
      }
    }
    return helpText;
  },
};

/* ================================
   Registering Default Commands
   ================================ */

// Help command.
commandDispatcher.registerCommand(
  "help",
  async () => commandDispatcher.getHelp(),
  "Lists all available commands."
);

// List processes command.
commandDispatcher.registerCommand(
  "list_processes",
  async () => window.kernel.listProcesses(),
  "Lists all running processes."
);

// Start process command.
commandDispatcher.registerCommand(
  "start_process",
  async (args) => {
    if (args.length < 1) {
      throw new Error("Usage: start_process <processName>");
    }
    const processName = args[0];
    // For demonstration, we start a process with a dummy function.
    return window.kernel.startProcess(processName, () => {
      console.log(`${processName} process is running...`);
    });
  },
  "Starts a new process with a given name."
);

// Stop process command.
commandDispatcher.registerCommand(
  "stop_process",
  async (args) => {
    if (args.length < 1) {
      throw new Error("Usage: stop_process <processId>");
    }
    const processId = parseInt(args[0], 10);
    if (isNaN(processId)) {
      throw new Error("Invalid processId provided.");
    }
    const success = window.kernel.stopProcess(processId);
    return success
      ? `Process ${processId} stopped successfully.`
      : `Process ${processId} not found.`;
  },
  "Stops a running process by its ID."
);

// Read file command.
commandDispatcher.registerCommand(
  "read_file",
  async (args) => {
    if (args.length < 1) {
      throw new Error("Usage: read_file <filePath>");
    }
    return window.kernel.readFile(args[0]);
  },
  "Reads a file from the virtual file system."
);

// Write file command.
commandDispatcher.registerCommand(
  "write_file",
  async (args) => {
    if (args.length < 2) {
      throw new Error("Usage: write_file <filePath> <content>");
    }
    const filePath = args[0];
    const content = args.slice(1).join(" ");
    return window.kernel.writeFile(filePath, content);
  },
  "Writes content to a file in the virtual file system."
);

// Delete file command.
commandDispatcher.registerCommand(
  "delete_file",
  async (args) => {
    if (args.length < 1) {
      throw new Error("Usage: delete_file <filePath>");
    }
    return window.kernel.deleteFile(args[0]);
  },
  "Deletes a file from the virtual file system."
);

// Allocate memory command.
commandDispatcher.registerCommand(
  "allocate_memory",
  async (args) => {
    if (args.length < 2) {
      throw new Error("Usage: allocate_memory <processId> <size>");
    }
    const processId = parseInt(args[0], 10);
    const size = parseInt(args[1], 10);
    if (isNaN(processId) || isNaN(size)) {
      throw new Error("Invalid processId or size provided.");
    }
    return window.kernel.allocateMemory(processId, size);
  },
  "Allocates memory for a process."
);

// Free memory command.
commandDispatcher.registerCommand(
  "free_memory",
  async (args) => {
    if (args.length < 1) {
      throw new Error("Usage: free_memory <processId>");
    }
    const processId = parseInt(args[0], 10);
    if (isNaN(processId)) {
      throw new Error("Invalid processId provided.");
    }
    return window.kernel.freeMemory(processId);
  },
  "Frees the memory allocated for a process."
);

// Call service command.
commandDispatcher.registerCommand(
  "call_service",
  async (args) => {
    if (args.length < 1) {
      throw new Error("Usage: call_service <serviceName> [args...]");
    }
    const serviceName = args[0];
    const serviceArgs = args.slice(1);
    return window.kernel.callService(serviceName, ...serviceArgs);
  },
  "Calls a registered kernel service with optional arguments."
);

// Expose the command dispatcher globally.
window.commandDispatcher = commandDispatcher;
