/**
 * module-loader.js
 *
 * This module loader dynamically loads modules into a provided module window.
 * It expects each module to reside under "modules/<module-type>/" with a standard
 * structure: an HTML template, a CSS file, and a JavaScript file.
 *
 * Usage:
 *   moduleLoader.load('terminal', moduleWindow)
 *     .then(() => { console.log('Terminal module loaded!'); })
 *     .catch(err => { console.error('Module load failed:', err); });
 */

const moduleLoader = (function () {
    // Track loaded resources to avoid duplicate loading
    const loadedResources = {};
  
    /**
     * Loads a module into the given module window.
     * @param {string} moduleType - The type of the module (e.g., 'terminal', 'text-editor', 'display').
     * @param {HTMLElement} moduleWindow - The container where the module content will be injected.
     * @returns {Promise} Resolves when the module is loaded successfully.
     */
    async function load(moduleType, moduleWindow) {
      const basePath = `modules/${moduleType}/`;
      try {
        // 1. Load the module's CSS (if not already loaded)
        const cssPath = `${basePath}${moduleType}.css`;
        if (!loadedResources[cssPath]) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssPath;
          document.head.appendChild(link);
          loadedResources[cssPath] = true;
        }
  
        // 2. Fetch and inject the module's HTML content
        const htmlPath = `${basePath}${moduleType}.html`;
        const response = await fetch(htmlPath);
        if (!response.ok) {
          throw new Error(`Failed to load module HTML: ${htmlPath}`);
        }
        const htmlContent = await response.text();
  
        // Insert HTML into the module window's content container
        const contentContainer = moduleWindow.querySelector(".module-content");
        if (!contentContainer) {
          throw new Error("Module window is missing a '.module-content' container.");
        }
        contentContainer.innerHTML = htmlContent;
  
        // 3. Load the module's JavaScript (if not already loaded)
        const jsPath = `${basePath}${moduleType}.js`;
        if (!loadedResources[jsPath]) {
          await loadScript(jsPath);
          loadedResources[jsPath] = true;
        }
        return true;
      } catch (err) {
        console.error("Module Loader Error:", err);
        throw err;
      }
    }
  
    /**
     * Dynamically loads a JavaScript file.
     * @param {string} src - The URL of the JavaScript file.
     * @returns {Promise} Resolves when the script has loaded.
     */
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    }
  
    return {
      load,
    };
  })();
  
  // Expose the module loader globally for other scripts to use.
  window.moduleLoader = moduleLoader;
  