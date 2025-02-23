// Minimal Microkernel Implementation

// The kernel object simulates process management and system logging.
const kernel = {
    processes: [],
  
    // Initialize the kernel: set up initial state.
    init: function () {
      this.log("Kernel initialized.");
    },
  
    // Simple logging function.
    log: function (message) {
      console.log("[Kernel]", message);
    },
  
    // Start a new process by name.
    startProcess: function (name) {
      const pid = this.processes.length + 1;
      const process = { pid, name, status: "running" };
      this.processes.push(process);
      this.log(`Started process '${name}' with PID ${pid}.`);
      return process;
    },
  
    // List all running processes.
    listProcesses: function () {
      return this.processes;
    },
  
    // A simple IPC simulation: broadcast a message to all processes.
    broadcast: function (msg) {
      this.log(`Broadcasting message: "${msg}"`);
      // In a real system, each process might have its own message queue.
      this.processes.forEach(proc => {
        console.log(`[Process ${proc.pid} - ${proc.name}] received: ${msg}`);
      });
    }
  };
  
  // Initialize kernel upon script load.
  kernel.init();
  