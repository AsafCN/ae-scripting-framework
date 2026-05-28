/**
 * After Effects Scripting Framework
 * @version 2.0.0
 * @description A comprehensive JavaScript library for automating Adobe After Effects
 * @license MIT
 */

// Core
// #include "core/index.js"

// Application
// #include "application/index.js"

// Project
// #include "project/index.js"

// Composition
// #include "composition/index.js"

// Layer
// #include "layer/index.js"

// Properties & Keyframes
// #include "properties/index.js"

// Effects
// #include "effects/index.js"

// Expressions
// #include "expressions/index.js"

// Masks
// #include "masks/index.js"

// Markers
// #include "markers/index.js"

// Render
// #include "render/index.js"

// Automation
// #include "automation/index.js"

// Functions (Nexrender compatibility)
// #include "functions/index.js"

// Export a single object if in Node.js/CommonJS environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ae;
}
