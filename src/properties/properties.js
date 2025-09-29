/**
 * Property manipulation and keyframing
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.property = {
        /**
         * Get property from layer
         * @param {Layer} layer - Target layer
         * @param {string} propertyName - Property name
         * @returns {Property} Property or null
         */
        get: function(layer, propertyName) {
            if (!layer) return null;
            try {
                return layer.property(propertyName);
            } catch (error) {
                ae.handleError(error, 'property.get');
                return null;
            }
        },

        /**
         * Get property group from layer
         * @param {Layer} layer - Target layer
         * @param {string} groupName - Property group name
         * @returns {PropertyGroup} Property group or null
         */
        getPropertyGroup: function(layer, groupName) {
            if (!layer) return null;
            try {
                return layer.property(groupName);
            } catch (error) {
                ae.handleError(error, 'property.getPropertyGroup');
                return null;
            }
        },

        /**
         * Set property value
         * @param {Property} property - Target property
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setValue: function(property, value) {
            if (property) {
                try {
                    property.setValue(value);
                } catch (error) {
                    ae.handleError(error, 'property.setValue');
                }
            }
            return ae;
        },

        /**
         * Set property value at specific time
         * @param {Property} property - Target property
         * @param {number} time - Time in seconds
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setValueAtTime: function(property, time, value) {
            if (property && property.isTimeVarying) {
                try {
                    property.setValueAtTime(time, value);
                } catch (error) {
                    ae.handleError(error, 'property.setValueAtTime');
                }
            }
            return ae;
        },

        /**
         * Set multiple values at multiple times
         * @param {Property} property - Target property
         * @param {Array} times - Array of times
         * @param {Array} values - Array of values
         * @returns {ae} Chainable
         */
        setValuesAtTimes: function(property, times, values) {
            if (property && property.isTimeVarying && times.length === values.length) {
                try {
                    for (var i = 0; i < times.length; i++) {
                        property.setValueAtTime(times[i], values[i]);
                    }
                } catch (error) {
                    ae.handleError(error, 'property.setValuesAtTimes');
                }
            }
            return ae;
        },

        /**
         * Add keyframe at time
         * @param {Property} property - Target property
         * @param {number} time - Time in seconds
         * @param {*} value - Keyframe value
         * @returns {ae} Chainable
         */
        addKeyframe: function(property, time, value) {
            if (property && property.isTimeVarying) {
                try {
                    property.setValueAtTime(time, value);
                } catch (error) {
                    ae.handleError(error, 'property.addKeyframe');
                }
            }
            return ae;
        },

        /**
         * Remove keyframe by index
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {ae} Chainable
         */
        removeKeyframe: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                try {
                    property.removeKey(keyframeIndex + 1); // AE uses 1-based indexing
                } catch (error) {
                    ae.handleError(error, 'property.removeKeyframe');
                }
            }
            return ae;
        },

        /**
         * Get number of keyframes
         * @param {Property} property - Target property
         * @returns {number} Number of keyframes
         */
        getKeyframeCount: function(property) {
            if (property && property.isTimeVarying) {
                return property.numKeys;
            }
            return 0;
        },

        /**
         * Get keyframe time
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {number} Keyframe time
         */
        getKeyframeTime: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                return property.keyTime(keyframeIndex + 1);
            }
            return 0;
        },

        /**
         * Get keyframe value
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {*} Keyframe value
         */
        getKeyframeValue: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                return property.keyValue(keyframeIndex + 1);
            }
            return null;
        }
    };
}(ae));