/**
 * kernel.js – Core Microkernel Implementation
 *
 * This microkernel serves as the backbone of Godspear OS. It manages:
 * - Process management: starting, stopping, and listing processes.
 * - A simulated virtual file system: reading, writing, and deleting files.
 * - Memory management: simple allocation/free simulation.
 * - Service registration: allowing new kernel services to be added.
 * 
 * It also integrates with an event bus (if available) for IPC.
 */

class Kernel {
  constructor() {
    // Process management properties
    this.processes = {}; // Store processes by their unique IDs
    this.nextProcessId = 1;

    // Virtual file system (VFS) simulation
    this.virtualFileSystem = {};

    // Registered kernel services
    this.services = {};
  }

  /* ================================
     Process Management Functions
     ================================ */

  /**
   * Starts a new process.
   * @param {string} processName - A human-readable name for the process.
   * @param {function} processFunction - A function to execute for this process.
   * @returns {object} The process object.
   */
  startProcess(processName, processFunction) {
    const processId = this.nextProcessId++;
    const process = {
      id: processId,
      name: processName,
      status: "running",
      startTime: new Date(),
      // Optionally, memory allocation info, logs, etc.
    };
    this.processes[processId] = process;

    // Execute the process function asynchronously if provided.
    if (typeof processFunction === "function") {
      try {
        // Wrap in a promise to catch asynchronous errors if needed.
        Promise.resolve(processFunction())
          .catch((err) => {
            console.error(`Error in process ${processName}:`, err);
            process.status = "error";
          });
      } catch (err) {
        console.error(`Error starting process ${processName}:`, err);
        process.status = "error";
      }
    }
    return process;
  }

  /**
   * Stops a running process.
   * @param {number} processId - The ID of the process to stop.
   * @returns {boolean} True if stopped successfully; otherwise, false.
   */
  stopProcess(processId) {
    if (this.processes[processId]) {
      // Mark process as stopped.
      this.processes[processId].status = "stopped";
      return true;
    }
    return false;
  }

  /**
   * Returns a list of all current processes.
   * @returns {Array} Array of process objects.
   */
  listProcesses() {
    return Object.values(this.processes);
  }

  /* ================================
     Virtual File System (VFS) Functions
     ================================ */

  /**
   * Reads a file from the virtual file system.
   * @param {string} filePath - Path of the file to read.
   * @returns {string} The file content.
   * @throws Will throw an error if the file is not found.
   */
  readFile(filePath) {
    if (this.virtualFileSystem[filePath] !== undefined) {
      return this.virtualFileSystem[filePath];
    }
    throw new Error(`File not found: ${filePath}`);
  }

  /**
   * Writes content to a file in the virtual file system.
   * @param {string} filePath - Path of the file to write.
   * @param {string} content - Content to write.
   * @returns {boolean} True on success.
   */
  writeFile(filePath, content) {
    this.virtualFileSystem[filePath] = content;
    return true;
  }

  /**
   * Deletes a file from the virtual file system.
   * @param {string} filePath - Path of the file to delete.
   * @returns {boolean} True if deleted successfully.
   * @throws Will throw an error if the file does not exist.
   */
  deleteFile(filePath) {
    if (this.virtualFileSystem[filePath] !== undefined) {
      delete this.virtualFileSystem[filePath];
      return true;
    }
    throw new Error(`File not found: ${filePath}`);
  }

  /* ================================
     Memory Management Functions (Simulation)
     ================================ */

  /**
   * Allocates memory for a process.
   * @param {number} processId - The process ID.
   * @param {number} size - The size of memory to allocate.
   * @returns {boolean} True on success.
   * @throws Will throw an error if the process is not found.
   */
  allocateMemory(processId, size) {
    if (this.processes[processId]) {
      this.processes[processId].memoryAllocated = size;
      return true;
    }
    throw new Error(`Process ${processId} not found`);
  }

  /**
   * Frees the memory allocated for a process.
   * @param {number} processId - The process ID.
   * @returns {boolean} True on success.
   * @throws Will throw an error if the process is not found.
   */
  freeMemory(processId) {
    if (this.processes[processId]) {
      this.processes[processId].memoryAllocated = 0;
      return true;
    }
    throw new Error(`Process ${processId} not found`);
  }

  /* ================================
     Service Registration & IPC
     ================================ */

  /**
   * Registers a new kernel service.
   * @param {string} serviceName - The name of the service.
   * @param {function} serviceFunction - The function implementing the service.
   * @throws Will throw an error if the service is already registered.
   */
  registerService(serviceName, serviceFunction) {
    if (this.services[serviceName]) {
      throw new Error(`Service "${serviceName}" is already registered.`);
    }
    this.services[serviceName] = serviceFunction;
  }

  /**
   * Calls a registered kernel service.
   * @param {string} serviceName - The service to call.
   * @param {...any} args - Arguments to pass to the service function.
   * @returns {any} The result from the service.
   * @throws Will throw an error if the service is not found.
   */
  callService(serviceName, ...args) {
    if (this.services[serviceName] && typeof this.services[serviceName] === "function") {
      return this.services[serviceName](...args);
    }
    throw new Error(`Service "${serviceName}" not found.`);
  }
}

/* ================================
   Global Kernel Instance & Event Bus Integration
   ================================ */

// Expose a global kernel instance for use by the command dispatcher and other modules.
window.kernel = new Kernel();

// If an event bus is available, subscribe to IPC commands for kernel operations.
if (window.eventBus) {
  eventBus.subscribe("kernel-command", (data) => {
    // Expect data in the form { command: 'startProcess', args: [ ... ] }
    try {
      const result = kernel[data.command](...data.args);
      eventBus.publish("kernel-response", { result });
    } catch (err) {
      eventBus.publish("kernel-response", { error: err.message });
    }
  });
}
