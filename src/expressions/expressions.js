/**
 * Expression creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.expression = {
        /**
         * Set expression on property
         * @param {Property} property - Target property
         * @param {string} expression - Expression code
         * @returns {ae} Chainable
         */
        set: function(property, expression) {
            if (property) {
                try {
                    property.expression = expression;
                } catch (error) {
                    ae.handleError(error, 'expression.set');
                }
            }
            return ae;
        },

        /**
         * Enable or disable expression
         * @param {Property} property - Target property
         * @param {boolean} enabled - Expression enabled state
         * @returns {ae} Chainable
         */
        setEnabled: function(property, enabled) {
            if (property) {
                try {
                    property.expressionEnabled = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'expression.setEnabled');
                }
            }
            return ae;
        },

        /**
         * Create wiggle expression
         * @param {Property} property - Target property
         * @param {number} frequency - Wiggle frequency
         * @param {number} amplitude - Wiggle amplitude
         * @param {number} octaves - Wiggle octaves
         * @returns {ae} Chainable
         */
        setWiggler: function(property, frequency, amplitude, octaves) {
            var expr = "freq = " + (frequency || 3) + ";\n";
            expr += "amp = " + (amplitude || 20) + ";\n";
            expr += "octaves = " + (octaves || 1) + ";\n";
            expr += "t = time * freq;\n";
            expr += "wiggle(freq, amp, octaves, 0.5, t);";

            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Create loop expression
         * @param {Property} property - Target property
         * @param {string} loopType - Loop type: 'cycle', 'pingpong', 'offset', 'continue'
         * @param {number} duration - Loop duration
         * @returns {ae} Chainable
         */
        setLoop: function(property, loopType, duration) {
            var expr = "";
            switch(loopType) {
                case 'cycle':
                    expr = "loopOut('cycle');";
                    break;
                case 'pingpong':
                    expr = "loopOut('pingpong');";
                    break;
                case 'offset':
                    expr = "loopOut('offset');";
                    break;
                case 'continue':
                    expr = "loopOut('continue');";
                    break;
                default:
                    expr = "loopOut('cycle');";
            }
            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Link property to another property
         * @param {Property} property - Source property
         * @param {Property} targetProperty - Target property to link to
         * @returns {ae} Chainable
         */
        linkToProperty: function(property, targetProperty) {
            if (property && targetProperty) {
                try {
                    property.expression = "thisComp.layer('" + targetProperty.layer.name + "').'" + 
                                        targetProperty.matchName + "';";
                } catch (error) {
                    ae.handleError(error, 'expression.linkToProperty');
                }
            }
            return ae;
        },

        /**
         * Set time remap expression
         * @param {Layer} layer - Target layer with time remap
         * @param {string} expression - Time remap expression
         * @returns {ae} Chainable
         */
        setTimeRemap: function(layer, expression) {
            if (layer && layer.timeRemapEnabled) {
                try {
                    layer.property("ADBE Time Remapping").expression = expression;
                } catch (error) {
                    ae.handleError(error, 'expression.setTimeRemap');
                }
            }
            return ae;
        },

        /**
         * Create random expression
         * @param {Property} property - Target property
         * @param {number} min - Minimum value
         * @param {number} max - Maximum value
         * @returns {ae} Chainable
         */
        setRandom: function(property, min, max) {
            var expr = "seedRandom(" + (Math.floor(Math.random() * 1000) + ", true);\n";
            expr += "random(" + min + ", " + max + ");";
            
            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Create time-based expression
         * @param {Property} property - Target property
         * @param {string} expression - Time-based expression
         * @returns {ae} Chainable
         */
        setTimeBased: function(property, expression) {
            var expr = "t = time;\n";
            expr += expression;
            
            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Create layer index expression
         * @param {Property} property - Target property
         * @param {string} expression - Layer index expression
         * @returns {ae} Chainable
         */
        setLayerIndex: function(property, expression) {
            var expr = "i = index;\n";
            expr += expression;
            
            if (property) property.expression = expr;
            return ae;
        }
    };
}(ae));