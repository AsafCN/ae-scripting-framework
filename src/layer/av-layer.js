/**
 * Audio-visual layer specific methods
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.avLayer = {
        /**
         * Set layer source
         * @param {AVLayer} layer - Target layer
         * @param {Item} source - Source item
         * @returns {ae} Chainable
         */
        setSource: function(layer, source) {
            if (layer && source) {
                try {
                    layer.source = source;
                } catch (error) {
                    ae.handleError(error, 'avLayer.setSource');
                }
            }
            return ae;
        },

        /**
         * Enable or disable audio
         * @param {AVLayer} layer - Target layer
         * @param {boolean} enabled - Audio enabled state
         * @returns {ae} Chainable
         */
        setAudioEnabled: function(layer, enabled) {
            if (layer && layer.audio) {
                try {
                    layer.audio.enabled = enabled;
                } catch (error) {
                    ae.handleError(error, 'avLayer.setAudioEnabled');
                }
            }
            return ae;
        },

        /**
         * Set audio levels
         * @param {AVLayer} layer - Target layer
         * @param {number} leftLevel - Left channel level
         * @param {number} rightLevel - Right channel level
         * @returns {ae} Chainable
         */
        setAudioLevels: function(layer, leftLevel, rightLevel) {
            if (layer && layer.audio) {
                try {
                    var audioLevels = layer.audio.property("ADBE Audio Levels").value;
                    if (leftLevel !== undefined) audioLevels[0] = leftLevel;
                    if (rightLevel !== undefined) audioLevels[1] = rightLevel;
                    layer.audio.property("ADBE Audio Levels").setValue(audioLevels);
                } catch (error) {
                    ae.handleError(error, 'avLayer.setAudioLevels');
                }
            }
            return ae;
        },

        /**
         * Set time remapping
         * @param {AVLayer} layer - Target layer
         * @param {boolean} enabled - Time remap enabled
         * @returns {ae} Chainable
         */
        setTimeRemap: function(layer, enabled) {
            if (layer) {
                try {
                    layer.timeRemapEnabled = enabled;
                } catch (error) {
                    ae.handleError(error, 'avLayer.setTimeRemap');
                }
            }
            return ae;
        }
    };
}(ae));