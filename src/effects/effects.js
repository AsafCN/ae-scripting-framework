/**
 * Effects application and manipulation
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.effects = {
        /**
         * Add effect to layer
         * @param {Layer} layer - Target layer
         * @param {string} effectName - Effect name
         * @returns {PropertyGroup} Effect property group
         */
        add: function(layer, effectName) {
            if (!layer) return null;
            try {
                return layer.property("ADBE Effect Parade").addProperty(effectName);
            } catch (error) {
                ae.handleError(error, 'effects.add');
                return null;
            }
        },

        /**
         * Add effect by match name
         * @param {Layer} layer - Target layer
         * @param {string} matchName - Effect match name
         * @returns {PropertyGroup} Effect property group
         */
        addByMatchName: function(layer, matchName) {
            if (!layer) return null;
            try {
                return layer.property("ADBE Effect Parade").addProperty(matchName);
            } catch (error) {
                ae.handleError(error, 'effects.addByMatchName');
                return null;
            }
        },

        /**
         * Remove effect from layer
         * @param {Layer} layer - Target layer
         * @param {number} effectIndex - Effect index (1-based)
         * @returns {ae} Chainable
         */
        remove: function(layer, effectIndex) {
            if (!layer) return ae;
            try {
                var effects = layer.property("ADBE Effect Parade");
                if (effects && effects.numProperties >= effectIndex) {
                    effects.property(effectIndex).remove();
                }
            } catch (error) {
                ae.handleError(error, 'effects.remove');
            }
            return ae;
        },

        /**
         * Remove all effects from layer
         * @param {Layer} layer - Target layer
         * @returns {ae} Chainable
         */
        removeAll: function(layer) {
            if (!layer) return ae;
            try {
                var effects = layer.property("ADBE Effect Parade");
                if (effects) {
                    while (effects.numProperties > 0) {
                        effects.property(1).remove();
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.removeAll');
            }
            return ae;
        },

        /**
         * Get all effects from layer
         * @param {Layer} layer - Target layer
         * @returns {Array} Array of effects
         */
        getAll: function(layer) {
            if (!layer) return [];
            var effects = [];
            try {
                var effectGroup = layer.property("ADBE Effect Parade");
                if (effectGroup) {
                    for (var i = 1; i <= effectGroup.numProperties; i++) {
                        effects.push(effectGroup.property(i));
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.getAll');
            }
            return effects;
        },

        /**
         * Get effect by name
         * @param {Layer} layer - Target layer
         * @param {string} effectName - Effect name
         * @returns {PropertyGroup} Effect or null
         */
        getByName: function(layer, effectName) {
            if (!layer) return null;
            try {
                var effectGroup = layer.property("ADBE Effect Parade");
                if (effectGroup) {
                    for (var i = 1; i <= effectGroup.numProperties; i++) {
                        var effect = effectGroup.property(i);
                        if (effect.name === effectName) {
                            return effect;
                        }
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.getByName');
            }
            return null;
        },

        /**
         * Set effect property value
         * @param {PropertyGroup} effect - Target effect
         * @param {string} propertyName - Property name
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setProperty: function(effect, propertyName, value) {
            if (!effect) return ae;
            try {
                var prop = effect.property(propertyName);
                if (prop) {
                    prop.setValue(value);
                }
            } catch (error) {
                ae.handleError(error, 'effects.setProperty');
            }
            return ae;
        },

        /**
         * Set effect property by match name
         * @param {PropertyGroup} effect - Target effect
         * @param {string} matchName - Property match name
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setPropertyByMatchName: function(effect, matchName, value) {
            if (!effect) return ae;
            try {
                var prop = effect.property(matchName);
                if (prop) {
                    prop.setValue(value);
                }
            } catch (error) {
                ae.handleError(error, 'effects.setPropertyByMatchName');
            }
            return ae;
        },

        /**
         * Animate effect property with keyframes
         * @param {PropertyGroup} effect - Target effect
         * @param {string} propertyName - Property name
         * @param {Array} keyframes - Array of keyframe objects
         * @returns {ae} Chainable
         */
        animateProperty: function(effect, propertyName, keyframes) {
            if (!effect) return ae;
            try {
                var prop = effect.property(propertyName);
                if (prop && prop.isTimeVarying) {
                    for (var i = 0; i < keyframes.length; i++) {
                        prop.setValueAtTime(keyframes[i].time, keyframes[i].value);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.animateProperty');
            }
            return ae;
        },

        /**
         * Enable or disable effect
         * @param {PropertyGroup} effect - Target effect
         * @param {boolean} enabled - Effect enabled state
         * @returns {ae} Chainable
         */
        setEnabled: function(effect, enabled) {
            if (effect) {
                try {
                    effect.enabled = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'effects.setEnabled');
                }
            }
            return ae;
        }
    };
}(ae));