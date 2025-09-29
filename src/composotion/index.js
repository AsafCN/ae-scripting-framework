/**
 * Composition module exports
 */

// Import composition modules
#include "composition.js"
#include "composition-functions.js"

// Export composition namespace
(function(ae) {
    ae.composition = {
        base: ae.comp,
        functions: ae.composition
    };
}(ae));