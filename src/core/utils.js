/**
 * Utility functions and helpers
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.utils = {
        /**
         * Convert time to frames
         * @param {number} time - Time in seconds
         * @param {number} [frameRate=30] - Frame rate
         * @returns {number} Frame number
         */
        timeToFrames: function(time, frameRate) {
            return Math.round(time * (frameRate || 30));
        },

        /**
         * Convert frames to time
         * @param {number} frames - Frame number
         * @param {number} [frameRate=30] - Frame rate
         * @returns {number} Time in seconds
         */
        framesToTime: function(frames, frameRate) {
            return frames / (frameRate || 30);
        },

        /**
         * Create color array
         * @param {number} r - Red (0-255)
         * @param {number} g - Green (0-255)
         * @param {number} b - Blue (0-255)
         * @param {number} [a=1] - Alpha (0-1)
         * @returns {Array} Color array [r, g, b, a]
         */
        createColor: function(r, g, b, a) {
            return [r/255, g/255, b/255, a !== undefined ? a : 1];
        },

        /**
         * Create 2D point
         * @param {number} x - X coordinate
         * @param {number} y - Y coordinate
         * @returns {Array} Point array [x, y]
         */
        createPoint: function(x, y) {
            return [x, y];
        },

        /**
         * Create 3D point
         * @param {number} x - X coordinate
         * @param {number} y - Y coordinate
         * @param {number} z - Z coordinate
         * @returns {Array} Point array [x, y, z]
         */
        createPoint3D: function(x, y, z) {
            return [x, y, z];
        },

        /**
         * Create keyframe ease
         * @param {number} speed - Ease speed
         * @param {number} influence - Ease influence
         * @returns {KeyframeEase} Keyframe ease object
         */
        createKeyframeEase: function(speed, influence) {
            return new KeyframeEase(speed, influence);
        },

        /**
         * Create shape object
         * @param {Array} vertices - Shape vertices
         * @param {Array} inTangents - In tangent points
         * @param {Array} outTangents - Out tangent points
         * @param {boolean} [closed=true] - Closed path
         * @returns {Shape} Shape object
         */
        createShape: function(vertices, inTangents, outTangents, closed) {
            var shape = new Shape();
            shape.vertices = vertices;
            shape.inTangents = inTangents;
            shape.outTangents = outTangents;
            shape.closed = closed !== false;
            return shape;
        },

        /**
         * Validate composition exists
         * @param {string} compName - Composition name
         * @returns {boolean} True if composition exists
         */
        validateComp: function(compName) {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem && item.name === compName) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Validate layer exists in composition
         * @param {CompItem} comp - Composition
         * @param {string} layerName - Layer name
         * @returns {boolean} True if layer exists
         */
        validateLayer: function(comp, layerName) {
            if (!comp || !(comp instanceof CompItem)) return false;
            return comp.layer(layerName) !== null;
        },

        /**
         * Show alert dialog
         * @param {string} message - Alert message
         * @returns {ae} Chainable
         */
        alert: function(message) {
            alert(message);
            return ae;
        },

        /**
         * Log message to console
         * @param {string} message - Log message
         * @returns {ae} Chainable
         */
        log: function(message) {
            $.writeln(message);
            return ae;
        },

        /**
         * Sleep for milliseconds
         * @param {number} ms - Milliseconds to sleep
         * @returns {ae} Chainable
         */
        sleep: function(ms) {
            var start = new Date().getTime();
            while (new Date().getTime() - start < ms);
            return ae;
        }
    };
}(ae));