/**
 * 3D layer properties and transformations
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.threeD = {
        /**
         * Enable or disable 3D for layer
         * @param {Layer} layer - Target layer
         * @param {boolean} enabled - 3D enabled state
         * @returns {ae} Chainable
         */
        enable3D: function(layer, enabled) {
            if (layer) {
                try {
                    layer.threeDLayer = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'threeD.enable3D');
                }
            }
            return ae;
        },

        /**
         * Set 3D position
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X position
         * @param {number} y - Y position
         * @param {number} z - Z position
         * @returns {ae} Chainable
         */
        setPosition: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    layer.property("ADBE Position").setValue([x, y, z || 0]);
                } catch (error) {
                    ae.handleError(error, 'threeD.setPosition');
                }
            }
            return ae;
        },

        /**
         * Set 3D orientation
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X orientation
         * @param {number} y - Y orientation
         * @param {number} z - Z orientation
         * @returns {ae} Chainable
         */
        setOrientation: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    layer.property("ADBE Orientation").setValue([x, y, z || 0]);
                } catch (error) {
                    ae.handleError(error, 'threeD.setOrientation');
                }
            }
            return ae;
        },

        /**
         * Set 3D rotation
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X rotation
         * @param {number} y - Y rotation
         * @param {number} z - Z rotation
         * @returns {ae} Chainable
         */
        setRotation: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    if (x !== undefined) layer.property("ADBE X Rotation").setValue(x);
                    if (y !== undefined) layer.property("ADBE Y Rotation").setValue(y);
                    if (z !== undefined) layer.property("ADBE Z Rotation").setValue(z);
                } catch (error) {
                    ae.handleError(error, 'threeD.setRotation');
                }
            }
            return ae;
        },

        /**
         * Set 3D anchor point
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X anchor point
         * @param {number} y - Y anchor point
         * @param {number} z - Z anchor point
         * @returns {ae} Chainable
         */
        setAnchorPoint: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    layer.property("ADBE AnchorPoint").setValue([x, y, z || 0]);
                } catch (error) {
                    ae.handleError(error, 'threeD.setAnchorPoint');
                }
            }
            return ae;
        },

        /**
         * Set material options
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {Object} options - Material options
         * @returns {ae} Chainable
         */
        setMaterialOptions: function(layer, options) {
            if (layer && layer.threeDLayer) {
                try {
                    var material = layer.property("ADBE Material Options");
                    if (options.castsShadows !== undefined) material.property("ADBE Casts Shadows").setValue(options.castsShadows);
                    if (options.acceptsShadows !== undefined) material.property("ADBE Accepts Shadows").setValue(options.acceptsShadows);
                    if (options.acceptsLights !== undefined) material.property("ADBE Accepts Lights").setValue(options.acceptsLights);
                } catch (error) {
                    ae.handleError(error, 'threeD.setMaterialOptions');
                }
            }
            return ae;
        }
    };
}(ae));