/**
 * Properties module exports
 */

// Import properties modules
#include "properties.js"
#include "keyframes.js"

// Export properties namespace
(function(ae) {
    ae.properties = {
        base: ae.property,
        keyframes: ae.keyframes
    };
}(ae));