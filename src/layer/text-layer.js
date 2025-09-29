/**
 * Text layer manipulation and styling
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.text = {
        /**
         * Set text content
         * @param {TextLayer} layer - Target text layer
         * @param {string} text - Text content
         * @returns {ae} Chainable
         */
        setText: function(layer, text) {
            if (!layer || !layer.property("Source Text")) return ae;
            try {
                var textDoc = layer.property("Source Text").value;
                textDoc.text = text;
                layer.property("Source Text").setValue(textDoc);
            } catch (error) {
                ae.handleError(error, 'text.setText');
            }
            return ae;
        },

        /**
         * Set font family
         * @param {TextLayer} layer - Target text layer
         * @param {string} fontName - Font name
         * @returns {ae} Chainable
         */
        setFont: function(layer, fontName) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.font = fontName;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set font size
         * @param {TextLayer} layer - Target text layer
         * @param {number} size - Font size
         * @returns {ae} Chainable
         */
        setSize: function(layer, size) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.fontSize = size;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set text color
         * @param {TextLayer} layer - Target text layer
         * @param {Array} color - Color array [r, g, b, a]
         * @returns {ae} Chainable
         */
        setColor: function(layer, color) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.fillColor = color;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set character tracking
         * @param {TextLayer} layer - Target text layer
         * @param {number} tracking - Tracking value
         * @returns {ae} Chainable
         */
        setTracking: function(layer, tracking) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.tracking = tracking;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set line leading
         * @param {TextLayer} layer - Target text layer
         * @param {number} leading - Leading value
         * @returns {ae} Chainable
         */
        setLeading: function(layer, leading) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.leading = leading;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set text alignment
         * @param {TextLayer} layer - Target text layer
         * @param {ParagraphJustification} alignment - Text alignment
         * @returns {ae} Chainable
         */
        setAlignment: function(layer, alignment) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.justification = alignment;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        }
    };
}(ae));