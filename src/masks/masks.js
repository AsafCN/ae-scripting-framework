/**
 * Mask creation and manipulation
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.mask = {
        /**
         * Create mask on layer
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        create: function(layer) {
            if (!layer) return null;
            try {
                return layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
            } catch (error) {
                ae.handleError(error, 'mask.create');
                return null;
            }
        },

        /**
         * Create elliptical mask
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        createEllipse: function(layer) {
            if (!layer) return null;
            try {
                var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
                mask.property("ADBE Mask Shape").setValue(this.createMaskEllipse());
                return mask;
            } catch (error) {
                ae.handleError(error, 'mask.createEllipse');
                return null;
            }
        },

        /**
         * Create rectangular mask
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        createRectangle: function(layer) {
            if (!layer) return null;
            try {
                var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
                mask.property("ADBE Mask Shape").setValue(this.createMaskRect());
                return mask;
            } catch (error) {
                ae.handleError(error, 'mask.createRectangle');
                return null;
            }
        },

        /**
         * Create mask ellipse shape
         * @returns {Shape} Mask ellipse shape
         */
        createMaskEllipse: function() {
            var shape = new Shape();
            shape.vertices = [[0,0], [0,0], [0,0], [0,0]];
            shape.inTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.outTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.closed = true;
            return shape;
        },

        /**
         * Create mask rectangle shape
         * @returns {Shape} Mask rectangle shape
         */
        createMaskRect: function() {
            var shape = new Shape();
            shape.vertices = [[0,0], [0,0], [0,0], [0,0]];
            shape.inTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.outTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.closed = true;
            return shape;
        },

        /**
         * Set mask path vertices
         * @param {PropertyGroup} mask - Mask property group
         * @param {Array} vertices - Mask vertices
         * @returns {ae} Chainable
         */
        setPath: function(mask, vertices) {
            if (mask) {
                try {
                    var shape = mask.property("ADBE Mask Shape").value;
                    shape.vertices = vertices;
                    mask.property("ADBE Mask Shape").setValue(shape);
                } catch (error) {
                    ae.handleError(error, 'mask.setPath');
                }
            }
            return ae;
        },

        /**
         * Set mask feather
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} feather - Feather amount
         * @returns {ae} Chainable
         */
        setFeather: function(mask, feather) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Feather").setValue([feather, feather]);
                } catch (error) {
                    ae.handleError(error, 'mask.setFeather');
                }
            }
            return ae;
        },

        /**
         * Set mask opacity
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} opacity - Opacity percentage
         * @returns {ae} Chainable
         */
        setOpacity: function(mask, opacity) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Opacity").setValue(opacity);
                } catch (error) {
                    ae.handleError(error, 'mask.setOpacity');
                }
            }
            return ae;
        },

        /**
         * Set mask blending mode
         * @param {PropertyGroup} mask - Mask property group
         * @param {MaskMode} mode - Mask mode
         * @returns {ae} Chainable
         */
        setMode: function(mask, mode) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Mode").setValue(mode);
                } catch (error) {
                    ae.handleError(error, 'mask.setMode');
                }
            }
            return ae;
        },

        /**
         * Set mask expansion
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} expansion - Expansion amount
         * @returns {ae} Chainable
         */
        setExpansion: function(mask, expansion) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Offset").setValue(expansion);
                } catch (error) {
                    ae.handleError(error, 'mask.setExpansion');
                }
            }
            return ae;
        },

        /**
         * Invert mask
         * @param {PropertyGroup} mask - Mask property group
         * @param {boolean} inverted - Inverted state
         * @returns {ae} Chainable
         */
        setInverted: function(mask, inverted) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Inverted").setValue(inverted);
                } catch (error) {
                    ae.handleError(error, 'mask.setInverted');
                }
            }
            return ae;
        }
    };
}(ae));