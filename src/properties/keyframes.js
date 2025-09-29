/**
 * Keyframe interpolation and easing
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.keyframes = {
        /**
         * Set keyframe interpolation type
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {KeyframeInterpolationType} inType - In interpolation type
         * @param {KeyframeInterpolationType} outType - Out interpolation type
         * @returns {ae} Chainable
         */
        setInterpolationType: function(property, keyIndex, inType, outType) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    if (inType) property.setInterpolationTypeAtKey(keyIndex + 1, inType);
                    if (outType) property.setInterpolationTypeAtKey(keyIndex + 1, undefined, outType);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setInterpolationType');
                }
            }
            return ae;
        },

        /**
         * Set keyframe temporal ease
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {KeyframeEase} inEase - In ease
         * @param {KeyframeEase} outEase - Out ease
         * @returns {ae} Chainable
         */
        setTemporalEase: function(property, keyIndex, inEase, outEase) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setTemporalEaseAtKey(keyIndex + 1, inEase, outEase);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setTemporalEase');
                }
            }
            return ae;
        },

        /**
         * Set keyframe spatial continuity
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {number} inSpatial - In spatial continuity
         * @param {number} outSpatial - Out spatial continuity
         * @returns {ae} Chainable
         */
        setSpatialContinuity: function(property, keyIndex, inSpatial, outSpatial) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setSpatialContinuousAtKey(keyIndex + 1, inSpatial, outSpatial);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setSpatialContinuity');
                }
            }
            return ae;
        },

        /**
         * Set keyframe temporal auto bezier
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {boolean} autoBezier - Auto bezier enabled
         * @returns {ae} Chainable
         */
        setTemporalAutoBezier: function(property, keyIndex, autoBezier) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setTemporalAutoBezierAtKey(keyIndex + 1, autoBezier);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setTemporalAutoBezier');
                }
            }
            return ae;
        },

        /**
         * Set keyframe spatial auto bezier
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {boolean} autoBezier - Auto bezier enabled
         * @returns {ae} Chainable
         */
        setSpatialAutoBezier: function(property, keyIndex, autoBezier) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setSpatialAutoBezierAtKey(keyIndex + 1, autoBezier);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setSpatialAutoBezier');
                }
            }
            return ae;
        },

        /**
         * Create linear keyframes
         * @param {Property} property - Target property
         * @param {Array} keyframes - Array of {time, value} objects
         * @returns {ae} Chainable
         */
        createLinear: function(property, keyframes) {
            if (property && property.isTimeVarying) {
                try {
                    for (var i = 0; i < keyframes.length; i++) {
                        var kf = keyframes[i];
                        property.setValueAtTime(kf.time, kf.value);
                        this.setInterpolationType(property, i, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR);
                    }
                } catch (error) {
                    ae.handleError(error, 'keyframes.createLinear');
                }
            }
            return ae;
        },

        /**
         * Create bezier keyframes
         * @param {Property} property - Target property
         * @param {Array} keyframes - Array of {time, value, inTangent, outTangent} objects
         * @returns {ae} Chainable
         */
        createBezier: function(property, keyframes) {
            if (property && property.isTimeVarying) {
                try {
                    for (var i = 0; i < keyframes.length; i++) {
                        var kf = keyframes[i];
                        property.setValueAtTime(kf.time, kf.value);
                        this.setInterpolationType(property, i, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
                    }
                } catch (error) {
                    ae.handleError(error, 'keyframes.createBezier');
                }
            }
            return ae;
        }
    };
}(ae));