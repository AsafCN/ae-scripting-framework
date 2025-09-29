/**
 * Core framework exports
 */

// Import core modules
#include "framework.js"
#include "utils.js"

// Export the complete framework
(function(ae) {
    // Public API
    ae.core = {
        version: ae.version,
        init: ae.init,
        config: ae.config,
        handleError: ae.handleError,
        log: ae.log,
        utils: ae.utils
    };
}(ae));