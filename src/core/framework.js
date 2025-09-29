/**
 * After Effects Scripting Framework Core
 * @version 2.0.0
 * @description Core framework initialization and configuration
 * @license MIT
 */

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.ae = factory();
    }
}(this, function() {
    'use strict';

    // =========================================================================
    // CORE FRAMEWORK INITIALIZATION
    // =========================================================================

    var AEFramework = {
        version: "2.0.0",
        aeVersion: "2023+",
        debug: false,
        
        // Configuration
        config: {
            autoSave: true,
            errorHandling: true,
            logging: true
        },
        
        // Initialize framework
        init: function(options) {
            if (options) {
                this.config = Object.assign(this.config, options);
            }
            
            if (this.config.logging) {
                this.log('AEFramework initialized v' + this.version);
            }
            
            return this;
        },
        
        // Error handling
        handleError: function(error, context) {
            if (!this.config.errorHandling) throw error;
            
            var message = 'AEFramework Error: ' + error.message;
            if (context) message += ' (' + context + ')';
            
            this.log(message);
            
            if (this.config.logging) {
                alert(message);
            }
            
            return {
                success: false,
                error: message,
                context: context
            };
        },
        
        // Logging
        log: function(message) {
            if (this.config.logging && typeof $ !== 'undefined') {
                $.writeln('[AEFramework] ' + message);
            }
        }
    };

    return AEFramework;
}));