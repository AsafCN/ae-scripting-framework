/**
 * Camera layer specific properties
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.camera = {
        /**
         * Set camera zoom
         * @param {CameraLayer} camera - Target camera
         * @param {number} zoom - Zoom value
         * @returns {ae} Chainable
         */
        setZoom: function(camera, zoom) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Zoom").setValue(zoom);
                } catch (error) {
                    ae.handleError(error, 'camera.setZoom');
                }
            }
            return ae;
        },

        /**
         * Set focus distance
         * @param {CameraLayer} camera - Target camera
         * @param {number} distance - Focus distance
         * @returns {ae} Chainable
         */
        setFocusDistance: function(camera, distance) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Focus Distance").setValue(distance);
                } catch (error) {
                    ae.handleError(error, 'camera.setFocusDistance');
                }
            }
            return ae;
        },

        /**
         * Set aperture size
         * @param {CameraLayer} camera - Target camera
         * @param {number} aperture - Aperture value
         * @returns {ae} Chainable
         */
        setAperture: function(camera, aperture) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Aperture").setValue(aperture);
                } catch (error) {
                    ae.handleError(error, 'camera.setAperture');
                }
            }
            return ae;
        },

        /**
         * Set blur level
         * @param {CameraLayer} camera - Target camera
         * @param {number} blurLevel - Blur level
         * @returns {ae} Chainable
         */
        setBlurLevel: function(camera, blurLevel) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Blur Level").setValue(blurLevel);
                } catch (error) {
                    ae.handleError(error, 'camera.setBlurLevel');
                }
            }
            return ae;
        },

        /**
         * Enable depth of field
         * @param {CameraLayer} camera - Target camera
         * @param {boolean} enabled - Depth of field enabled
         * @returns {ae} Chainable
         */
        setDepthOfField: function(camera, enabled) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Options").property("ADBE Camera Depth of Field").setValue(enabled);
                } catch (error) {
                    ae.handleError(error, 'camera.setDepthOfField');
                }
            }
            return ae;
        }
    };
}(ae));