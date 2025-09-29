/**
 * Layers module exports
 */

// Import all layer modules
#include "base-layer.js"
#include "av-layer.js"
#include "text-layer.js"
#include "shape-layer.js"
#include "camera-layer.js"
#include "light-layer.js"
#include "3d-layer.js"

// Export layers namespace
(function(ae) {
    ae.layers = {
        base: ae.layer,
        av: ae.avLayer,
        text: ae.text,
        shape: ae.shape,
        camera: ae.camera,
        light: ae.light,
        threeD: ae.threeD
    };
}(ae));