/**
 * Shape layer creation and manipulation
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.shape = {
        /**
         * Add rectangle shape to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Rectangle shape property
         */
        addRectangle: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Shape - Rect");
            } catch (error) {
                ae.handleError(error, 'shape.addRectangle');
                return null;
            }
        },

        /**
         * Add ellipse shape to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Ellipse shape property
         */
        addEllipse: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Shape - Ellipse");
            } catch (error) {
                ae.handleError(error, 'shape.addEllipse');
                return null;
            }
        },

        /**
         * Add path to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Path property
         */
        addPath: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Shape - Group");
            } catch (error) {
                ae.handleError(error, 'shape.addPath');
                return null;
            }
        },

        /**
         * Add stroke to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Stroke property
         */
        addStroke: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Graphic - Stroke");
            } catch (error) {
                ae.handleError(error, 'shape.addStroke');
                return null;
            }
        },

        /**
         * Add fill to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Fill property
         */
        addFill: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Graphic - Fill");
            } catch (error) {
                ae.handleError(error, 'shape.addFill');
                return null;
            }
        },

        /**
         * Set path vertices and tangents
         * @param {Property} shape - Path property
         * @param {Array} vertices - Path vertices
         * @param {Array} inTangents - In tangent points
         * @param {Array} outTangents - Out tangent points
         * @param {boolean} closed - Closed path
         * @returns {ae} Chainable
         */
        setPath: function(shape, vertices, inTangents, outTangents, closed) {
            if (shape) {
                try {
                    var path = new Shape();
                    path.vertices = vertices;
                    path.inTangents = inTangents;
                    path.outTangents = outTangents;
                    path.closed = closed !== false;
                    shape.setValue(path);
                } catch (error) {
                    ae.handleError(error, 'shape.setPath');
                }
            }
            return ae;
        },

        /**
         * Set stroke color
         * @param {Property} stroke - Stroke property
         * @param {Array} color - Stroke color [r, g, b, a]
         * @returns {ae} Chainable
         */
        setStrokeColor: function(stroke, color) {
            if (stroke) {
                try {
                    stroke.property("Color").setValue(color);
                } catch (error) {
                    ae.handleError(error, 'shape.setStrokeColor');
                }
            }
            return ae;
        },

        /**
         * Set stroke width
         * @param {Property} stroke - Stroke property
         * @param {number} width - Stroke width
         * @returns {ae} Chainable
         */
        setStrokeWidth: function(stroke, width) {
            if (stroke) {
                try {
                    stroke.property("Stroke Width").setValue(width);
                } catch (error) {
                    ae.handleError(error, 'shape.setStrokeWidth');
                }
            }
            return ae;
        },

        /**
         * Set fill color
         * @param {Property} fill - Fill property
         * @param {Array} color - Fill color [r, g, b, a]
         * @returns {ae} Chainable
         */
        setFillColor: function(fill, color) {
            if (fill) {
                try {
                    fill.property("Color").setValue(color);
                } catch (error) {
                    ae.handleError(error, 'shape.setFillColor');
                }
            }
            return ae;
        }
    };
}(ae));