/**
 * Sequoia Boat Rentals & Concierge Services
 * Component Loader Utility
 */

class ComponentLoader {
    /**
     * Load HTML content into a container element
     * @param {string} containerId - The ID of the container element
     * @param {string} htmlContent - The HTML content to load
     * @param {Function} callback - Optional callback function to run after loading
     */
    static loadComponent(containerId, htmlContent, callback) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = htmlContent;

            // Execute any scripts in the component content
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');

                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                newScript.textContent = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            });

            // Run callback if provided
            if (callback && typeof callback === 'function') {
                callback();
            }
        } else {
            console.error(`Container with ID "${containerId}" not found.`);
        }
    }

    /**
     * Parse a string of HTML and extract just the content inside a specific component
     * @param {string} htmlString - The full HTML string
     * @param {string} componentId - The ID of the component to extract
     * @returns {string} - The HTML content of the component
     */
    static extractComponentContent(htmlString, componentId) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const component = doc.getElementById(componentId);

        return component ? component.innerHTML : '';
    }

    /**
     * Initialize dynamic component loading and interaction
     */
    static initializeComponents() {
        // Add any global component initialization logic here
        document.addEventListener('componentLoaded', function (e) {
            // You can add specific initialization for newly loaded components
            const componentId = e.detail.componentId;
            console.log(`Component loaded: ${componentId}`);
        });
    }
}

// Initialize components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    ComponentLoader.initializeComponents();
}); 