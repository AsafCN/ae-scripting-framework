/**
 * Composition creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.comp = {
        /**
         * Create a new composition
         * @param {string} name - Composition name
         * @param {number} width - Width in pixels
         * @param {number} height - Height in pixels
         * @param {number} [pixelAspect=1] - Pixel aspect ratio
         * @param {number} [duration=10] - Duration in seconds
         * @param {number} [frameRate=30] - Frames per second
         * @returns {CompItem} New composition
         */
        create: function(name, width, height, pixelAspect, duration, frameRate) {
            try {
                return app.project.items.addComp(
                    name || "New Composition",
                    width || 1920,
                    height || 1080,
                    pixelAspect || 1,
                    duration || 10,
                    frameRate || 30
                );
            } catch (error) {
                ae.handleError(error, 'comp.create');
                return null;
            }
        },

        /**
         * Get composition by name
         * @param {string} compName - Composition name
         * @returns {CompItem} Composition or null
         */
        getByName: function(compName) {
            return ae.project.getCompByName(compName);
        },

        /**
         * Duplicate a composition
         * @param {CompItem} comp - Composition to duplicate
         * @param {string} [newName] - Name for duplicate
         * @returns {CompItem} Duplicated composition
         */
        duplicate: function(comp, newName) {
            if (!comp || !(comp instanceof CompItem)) return null;
            var newComp = comp.duplicate();
            if (newName) newComp.name = newName;
            return newComp;
        },

        /**
         * Get all compositions in project
         * @returns {Array} Array of compositions
         */
        getAll: function() {
            var comps = [];
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem) {
                    comps.push(item);
                }
            }
            return comps;
        },

        /**
         * Get layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of layers
         */
        getLayers: function(comp) {
            if (!comp || !comp.layers) return [];
            var layers = [];
            for (var i = 1; i <= comp.numLayers; i++) {
                layers.push(comp.layer(i));
            }
            return layers;
        },

        /**
         * Get camera layer from composition
         * @param {CompItem} comp - Composition
         * @returns {CameraLayer} Camera layer or null
         */
        getCamera: function(comp) {
            if (!comp) return null;
            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);
                if (layer instanceof CameraLayer) {
                    return layer;
                }
            }
            return null;
        },

        /**
         * Get light layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of light layers
         */
        getLights: function(comp) {
            if (!comp) return [];
            var lights = [];
            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);
                if (layer instanceof LightLayer) {
                    lights.push(layer);
                }
            }
            return lights;
        },

        /**
         * Set composition duration
         * @param {CompItem} comp - Composition
         * @param {number} duration - Duration in seconds
         * @returns {ae} Chainable
         */
        setDuration: function(comp, duration) {
            if (comp) comp.duration = duration;
            return ae;
        },

        /**
         * Set composition frame rate
         * @param {CompItem} comp - Composition
         * @param {number} frameRate - Frames per second
         * @returns {ae} Chainable
         */
        setFrameRate: function(comp, frameRate) {
            if (comp) comp.frameRate = frameRate;
            return ae;
        },

        /**
         * Set composition background color
         * @param {CompItem} comp - Composition
         * @param {Array} color - Background color [r, g, b, a]
         * @returns {ae} Chainable
         */
        setBackgroundColor: function(comp, color) {
            if (comp) comp.bgColor = color;
            return ae;
        }
    };
}(ae));