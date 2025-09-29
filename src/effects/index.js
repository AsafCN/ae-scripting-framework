/**
 * Effects module exports
 */

// Import effects modules
#include "effects.js"
#include "match-names.js"

// Export effects namespace
(function(ae) {
    ae.effects = {
        base: ae.effects,
        matchNames: ae.effectsList,
        properties: ae.effectProperties
    };
}(ae));