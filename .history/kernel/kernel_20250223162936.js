// Advanced Microkernel Implementation for Nova OS

// Define the GodspearKernel module as an IIFE for encapsulation
var GodspearKernel = (function () {
    // ===== Global Variables & Process Management =====
    let processIdCounter = 0;
    let processes = [];
    const processQueue = []; // Simple queue for cooperative scheduling
  
    // ===== Logging Function =====
    function log(message) {
      console.log(`[GodspearKernel] ${message}`);
    }
  
    // ===== Event Bus via Worker =====
    let eventBusWorker = null;
    function initEventBus() {
      const eventBusBlobCode = `
        const eventBus = new EventTarget();
        const listeners = new Map();
        self.addEventListener('message', (e) => {
          const { action, type, id, data } = e.data;
          if (action === 'addListener') {
            const handler = (evt) => {
              self.postMessage({ type: evt.type, detail: evt.detail, id });
            };
            listeners.set(id, { type, handler });
            eventBus.addEventListener(type, handler);
          } else if (action === 'removeListener') {
            const listener = listeners.get(id);
            if (listener) {
              eventBus.removeEventListener(listener.type, listener.handler);
              listeners.delete(id);
            }
          } else if (action === 'dispatch') {
            eventBus.dispatchEvent(new CustomEvent(type, { detail: data }));
          }
        });
      `;
      const blob = new Blob([eventBusBlobCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      eventBusWorker = new Worker(url);
      log("Event Bus initialized.");
    }
  
    // Dispatch an event through the event bus worker
    function dispatchEvent(type, data) {
      if (eventBusWorker) {
        eventBusWorker.postMessage({ action: 'dispatch', type: type, data: data });
        log(`Dispatched event "${type}" with data: ${JSON.stringify(data)}`);
      }
    }
  
    // Register an event handler using the event bus worker
    function registerEventHandler(type, handler) {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
      const listener = (event) => {
        if (event.data.type === type) {
          handler(event.data.detail);
        }
      };
      eventBusWorker.addEventListener('message', listener);
      eventBusWorker.postMessage({ action: 'addListener', type: type, id: id });
      log(`Registered event handler for "${type}" with id ${id}.`);
      return function remove() {
        eventBusWorker.postMessage({ action: 'removeListener', id: id });
        eventBusWorker.removeEventListener('message', listener);
        log(`Removed event handler for "${type}" with id ${id}.`);
      };
    }
  
    // ===== Process Management & Scheduling =====
    function startProcess(name, taskFunction) {
      const pid = ++processIdCounter;
      const process = {
        pid: pid,
        name: name,
        status: 'running',
        taskFunction: taskFunction,
        startTime: Date.now()
      };
      processes.push(process);
      processQueue.push(process);
      log(`Started process '${name}' with PID ${pid}.`);
      return process;
    }
  
    function listProcesses() {
      return processes;
    }
  
    function stopProcess(pid) {
      const index = processes.findIndex(p => p.pid === pid);
      if (index >= 0) {
        const proc = processes[index];
        proc.status = 'stopped';
        processes.splice(index, 1);
        log(`Stopped process '${proc.name}' with PID ${pid}.`);
        return proc;
      }
      log(`Process with PID ${pid} not found.`);
      return null;
    }
  
    // A simple scheduler that cycles through process tasks every 100ms
    function schedule() {
      if (processQueue.length > 0) {
        const proc = processQueue.shift();
        if (proc.status === 'running') {
          try {
            proc.taskFunction();
            log(`Executed task for process '${proc.name}' (PID ${proc.pid}).`);
          } catch (err) {
            log(`Error in process '${proc.name}' (PID ${proc.pid}): ${err}`);
          }
        }
        // Re-enqueue the process if still running
        if (proc.status === 'running') {
          processQueue.push(proc);
        }
      }
      setTimeout(schedule, 100);
    }
  
    // ===== Virtual File System (In-Memory) =====
    const fileSystem = {
      files: {},
      createFile: function (path, content) {
        this.files[path] = {
          content: content,
          created: Date.now()
        };
        log(`Created file at ${path}.`);
      },
      readFile: function (path) {
        if (this.files[path]) {
          log(`Read file at ${path}.`);
          return this.files[path].content;
        } else {
          log(`File at ${path} not found.`);
          return null;
        }
      },
      listFiles: function () {
        return Object.keys(this.files);
      }
    };
  
    // ===== Cryptography Functions =====
    // Derive a crypto key from a password using PBKDF2
    async function getKey(password) {
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      return crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: encoder.encode("novaSalt"),
          iterations: 100000,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    }
  
    // Encrypt data using AES-GCM
    async function encryptData(key, data) {
      const encoder = new TextEncoder();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoder.encode(data)
      );
      return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted))
      };
    }
  
    // Decrypt data using AES-GCM
    async function decryptData(key, encryptedData) {
      const iv = new Uint8Array(encryptedData.iv);
      const data = new Uint8Array(encryptedData.data);
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
      );
      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    }
  
    // ===== Kernel Initialization =====
    function init() {
      log("Initializing GodspearKernel...");
      initEventBus();
      schedule();
      log("GodspearKernel initialized and scheduler started.");
    }
  
    // ===== Public API =====
    return {
      init,
      log,
      startProcess,
      listProcesses,
      stopProcess,
      dispatchEvent,
      registerEventHandler,
      fileSystem,
      getKey,
      encryptData,
      decryptData,
    };
  })();
  
  // Immediately initialize the kernel on script load
  GodspearKernel.init();
  