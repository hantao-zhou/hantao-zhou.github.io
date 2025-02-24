/**
 * event-bus.js – A simple, asynchronous event bus for Godspear OS.
 *
 * This event bus allows decoupled communication between different modules and the kernel.
 * It implements a publish–subscribe pattern:
 *   - subscribe(eventName, listener): Registers a listener for a specific event.
 *   - unsubscribe(eventName, listener): Removes a listener from a specific event.
 *   - publish(eventName, data): Asynchronously notifies all listeners of an event.
 *
 * Optional: This bus can be extended to use Web Workers for inter-thread messaging.
 */

(function () {
  const events = {};

  const eventBus = {
    /**
     * Subscribes a listener function to an event.
     * @param {string} eventName - The event to subscribe to.
     * @param {Function} listener - The callback function to invoke when the event is published.
     */
    subscribe(eventName, listener) {
      if (!events[eventName]) {
        events[eventName] = [];
      }
      events[eventName].push(listener);
    },

    /**
     * Unsubscribes a listener function from an event.
     * @param {string} eventName - The event to unsubscribe from.
     * @param {Function} listener - The callback function to remove.
     */
    unsubscribe(eventName, listener) {
      if (!events[eventName]) return;
      events[eventName] = events[eventName].filter((l) => l !== listener);
    },

    /**
     * Publishes an event, asynchronously notifying all subscribed listeners.
     * @param {string} eventName - The event name to publish.
     * @param {any} data - The data to send along with the event.
     */
    publish(eventName, data) {
      if (!events[eventName]) return;
      // Use setTimeout to ensure asynchronous delivery.
      events[eventName].forEach((listener) => {
        setTimeout(() => {
          try {
            listener(data);
          } catch (err) {
            console.error(`Error in event listener for "${eventName}":`, err);
          }
        }, 0);
      });
    },
  };

  // Expose the event bus globally.
  window.eventBus = eventBus;
})();
