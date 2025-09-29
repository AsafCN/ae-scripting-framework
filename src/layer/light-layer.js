/**
 * Light layer specific properties
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.light = {
        /**
         * Set light intensity
         * @param {LightLayer} light - Target light
         * @param {number} intensity - Light intensity
         * @returns {ae} Chainable
         */
        setIntensity: function(light, intensity) {
            if (light) {
                try {
                    light.property("ADBE Light Intensity").setValue(intensity);
                } catch (error) {
                    ae.handleError(error, 'light.setIntensity');
                }
            }
            return ae;
        },

        /**
         * Set light color
         * @param {LightLayer} light - Target light
         * @param {Array} color - Light color [r, g, b]
         * @returns {ae} Chainable
         */
        setColor: function(light, color) {
            if (light) {
                try {
                    light.property("ADBE Light Color").setValue(color);
                } catch (error) {
                    ae.handleError(error, 'light.setColor');
                }
            }
            return ae;
        },

        /**
         * Set cone angle (spot lights)
         * @param {LightLayer} light - Target light
         * @param {number} angle - Cone angle
         * @returns {ae} Chainable
         */
        setConeAngle: function(light, angle) {
            if (light && light.lightType === LightType.SPOT) {
                try {
                    light.property("ADBE Light Cone Angle").setValue(angle);
                } catch (error) {
                    ae.handleError(error, 'light.setConeAngle');
                }
            }
            return ae;
        },

        /**
         * Set cone feather (spot lights)
         * @param {LightLayer} light - Target light
         * @param {number} feather - Cone feather
         * @returns {ae} Chainable
         */
        setConeFeather: function(light, feather) {
            if (light && light.lightType === LightType.SPOT) {
                try {
                    light.property("ADBE Light Cone Feather").setValue(feather);
                } catch (error) {
                    ae.handleError(error, 'light.setConeFeather');
                }
            }
            return ae;
        },

        /**
         * Set shadow darkness
         * @param {LightLayer} light - Target light
         * @param {number} darkness - Shadow darkness
         * @returns {ae} Chainable
         */
        setShadowDarkness: function(light, darkness) {
            if (light) {
                try {
                    light.property("ADBE Light Shadow Darkness").setValue(darkness);
                } catch (error) {
                    ae.handleError(error, 'light.setShadowDarkness');
                }
            }
            return ae;
        },

        /**
         * Set light type
         * @param {LightLayer} light - Target light
         * @param {LightType} lightType - Light type
         * @returns {ae} Chainable
         */
        setLightType: function(light, lightType) {
            if (light) {
                try {
                    light.lightType = lightType;
                } catch (error) {
                    ae.handleError(error, 'light.setLightType');
                }
            }
            return ae;
        }
    };
}(ae));