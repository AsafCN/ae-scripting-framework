/**
 * Base layer creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.layer = {
        /**
         * Create a layer from source in composition
         * @param {CompItem} comp - Target composition
         * @param {Item} source - Source item
         * @param {number} [duration] - Layer duration
         * @returns {AVLayer} New layer
         */
        create: function(comp, source, duration) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.add(source, duration);
            } catch (error) {
                ae.handleError(error, 'layer.create');
                return null;
            }
        },

        /**
         * Create text layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} textContent - Text content
         * @returns {TextLayer} New text layer
         */
        createText: function(comp, textContent) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.addText(textContent || "Sample Text");
            } catch (error) {
                ae.handleError(error, 'layer.createText');
                return null;
            }
        },

        /**
         * Create shape layer in composition
         * @param {CompItem} comp - Target composition
         * @returns {ShapeLayer} New shape layer
         */
        createShape: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.addShape();
            } catch (error) {
                ae.handleError(error, 'layer.createShape');
                return null;
            }
        },

        /**
         * Create camera layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Camera name
         * @param {Array} [centerPoint] - Center point [x, y]
         * @returns {CameraLayer} New camera layer
         */
        createCamera: function(comp, name, centerPoint) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.addCamera(name || "Camera 1", centerPoint || [960, 540]);
            } catch (error) {
                ae.handleError(error, 'layer.createCamera');
                return null;
            }
        },

        /**
         * Create light layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Light name
         * @param {LightType} [lightType] - Type of light
         * @returns {LightLayer} New light layer
         */
        createLight: function(comp, name, lightType) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                var light = comp.layers.addLight(name || "Light 1", [960, 540]);
                if (lightType) light.lightType = lightType;
                return light;
            } catch (error) {
                ae.handleError(error, 'layer.createLight');
                return null;
            }
        },

        /**
         * Create null object layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Null object name
         * @returns {AVLayer} New null layer
         */
        createNull: function(comp, name) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                var nullLayer = comp.layers.addNull();
                if (name) nullLayer.name = name;
                return nullLayer;
            } catch (error) {
                ae.handleError(error, 'layer.createNull');
                return null;
            }
        },

        /**
         * Get layer by name from composition
         * @param {CompItem} comp - Composition
         * @param {string} name - Layer name
         * @returns {Layer} Layer or null
         */
        getByName: function(comp, name) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layer(name);
            } catch (error) {
                ae.handleError(error, 'layer.getByName');
                return null;
            }
        },

        /**
         * Get layer by index from composition
         * @param {CompItem} comp - Composition
         * @param {number} index - Layer index (1-based)
         * @returns {Layer} Layer or null
         */
        getByIndex: function(comp, index) {
            if (!comp || !(comp instanceof CompItem) || index < 1 || index > comp.numLayers) return null;
            try {
                return comp.layer(index);
            } catch (error) {
                ae.handleError(error, 'layer.getByIndex');
                return null;
            }
        },

        /**
         * Get all layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of layers
         */
        getAll: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return [];
            var layers = [];
            try {
                for (var i = 1; i <= comp.numLayers; i++) {
                    layers.push(comp.layer(i));
                }
            } catch (error) {
                ae.handleError(error, 'layer.getAll');
            }
            return layers;
        },

        /**
         * Duplicate a layer
         * @param {Layer} layer - Layer to duplicate
         * @returns {Layer} Duplicated layer
         */
        duplicate: function(layer) {
            if (!layer) return null;
            try {
                return layer.duplicate();
            } catch (error) {
                ae.handleError(error, 'layer.duplicate');
                return null;
            }
        },

        /**
         * Delete a layer
         * @param {Layer} layer - Layer to delete
         * @returns {ae} Chainable
         */
        remove: function(layer) {
            if (layer) {
                try {
                    layer.remove();
                } catch (error) {
                    ae.handleError(error, 'layer.remove');
                }
            }
            return ae;
        },

        /**
         * Enable or disable a layer
         * @param {Layer} layer - Target layer
         * @param {boolean} enabled - Enable state
         * @returns {ae} Chainable
         */
        enable: function(layer, enabled) {
            if (layer) {
                try {
                    layer.enabled = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'layer.enable');
                }
            }
            return ae;
        },

        /**
         * Set layer parent
         * @param {Layer} layer - Child layer
         * @param {Layer} parentLayer - Parent layer
         * @returns {ae} Chainable
         */
        setParent: function(layer, parentLayer) {
            if (layer && parentLayer) {
                try {
                    layer.parent = parentLayer;
                } catch (error) {
                    ae.handleError(error, 'layer.setParent');
                }
            }
            return ae;
        },

        /**
         * Set layer start time
         * @param {Layer} layer - Target layer
         * @param {number} time - Start time in seconds
         * @returns {ae} Chainable
         */
        setStartTime: function(layer, time) {
            if (layer) {
                try {
                    layer.startTime = time;
                } catch (error) {
                    ae.handleError(error, 'layer.setStartTime');
                }
            }
            return ae;
        },

        /**
         * Set layer in point
         * @param {Layer} layer - Target layer
         * @param {number} time - In point time
         * @returns {ae} Chainable
         */
        setInPoint: function(layer, time) {
            if (layer) {
                try {
                    layer.inPoint = time;
                } catch (error) {
                    ae.handleError(error, 'layer.setInPoint');
                }
            }
            return ae;
        },

        /**
         * Set layer out point
         * @param {Layer} layer - Target layer
         * @param {number} time - Out point time
         * @returns {ae} Chainable
         */
        setOutPoint: function(layer, time) {
            if (layer) {
                try {
                    layer.outPoint = time;
                } catch (error) {
                    ae.handleError(error, 'layer.setOutPoint');
                }
            }
            return ae;
        }
    };
}(ae));