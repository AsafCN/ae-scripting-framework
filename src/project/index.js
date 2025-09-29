/**
 * Project module exports
 */

// Import project modules
#include "project.js"
#include "items.js"

// Export project namespace
(function(ae) {
    ae.project = {
        management: ae.project,
        items: ae.items
    };
}(ae));