/**
 * Layer marker creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.marker = {
        /**
         * Add marker to layer
         * @param {Layer} layer - Target layer
         * @param {number} time - Marker time
         * @param {string} comment - Marker comment
         * @returns {Property} Marker property
         */
        add: function(layer, time, comment) {
            if (!layer) return null;
            try {
                var marker = layer.property("ADBE Marker").setValueAtTime(time, new MarkerValue(comment));
                return marker;
            } catch (error) {
                ae.handleError(error, 'marker.add');
                return null;
            }
        },

        /**
         * Remove marker from layer
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @returns {ae} Chainable
         */
        remove: function(layer, markerIndex) {
            if (!layer) return ae;
            try {
                var markers = layer.property("ADBE Marker");
                if (markers && markers.numKeys >= markerIndex) {
                    markers.removeKey(markerIndex + 1);
                }
            } catch (error) {
                ae.handleError(error, 'marker.remove');
            }
            return ae;
        },

        /**
         * Set marker comment
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @param {string} comment - New comment
         * @returns {ae} Chainable
         */
        setComment: function(layer, markerIndex, comment) {
            if (!layer) return ae;
            try {
                var markers = layer.property("ADBE Marker");
                if (markers && markers.numKeys >= markerIndex) {
                    var markerValue = markers.keyValue(markerIndex + 1);
                    markerValue.comment = comment;
                    markers.setValueAtKey(markerIndex + 1, markerValue);
                }
            } catch (error) {
                ae.handleError(error, 'marker.setComment');
            }
            return ae;
        },

        /**
         * Set marker duration
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @param {number} duration - Marker duration
         * @returns {ae} Chainable
         */
        setDuration: function(layer, markerIndex, duration) {
            if (!layer) return ae;
            try {
                var markers = layer.property("ADBE Marker");
                if (markers && markers.numKeys >= markerIndex) {
                    var markerValue = markers.keyValue(markerIndex + 1);
                    markerValue.duration = duration;
                    markers.setValueAtKey(markerIndex + 1, markerValue);
                }
            } catch (error) {
                ae.handleError(error, 'marker.setDuration');
            }
            return ae;
        },

        /**
         * Set marker chapter
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @param {string} chapter - Chapter name
         * @returns {ae} Chainable
         */
        setChapter: function(layer, markerIndex, chapter) {
            if (!layer) return ae;
            try {
                var markers = layer.property("ADBE Marker");
                if (markers && markers.numKeys >= markerIndex) {
                    var markerValue = markers.keyValue(markerIndex + 1);
                    markerValue.chapter = chapter;
                    markers.setValueAtKey(markerIndex + 1, markerValue);
                }
            } catch (error) {
                ae.handleError(error, 'marker.setChapter');
            }
            return ae;
        },

        /**
         * Set marker URL
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @param {string} url - URL link
         * @returns {ae} Chainable
         */
        setURL: function(layer, markerIndex, url) {
            if (!layer) return ae;
            try {
                var markers = layer.property("ADBE Marker");
                if (markers && markers.numKeys >= markerIndex) {
                    var markerValue = markers.keyValue(markerIndex + 1);
                    markerValue.url = url;
                    markers.setValueAtKey(markerIndex + 1, markerValue);
                }
            } catch (error) {
                ae.handleError(error, 'marker.setURL');
            }
            return ae;
        },

        /**
         * Get all markers from layer
         * @param {Layer} layer - Target layer
         * @returns {Array} Array of marker objects
         */
        getAll: function(layer) {
            if (!layer) return [];
            var markers = [];
            try {
                var markerProp = layer.property("ADBE Marker");
                if (markerProp && markerProp.numKeys > 0) {
                    for (var i = 1; i <= markerProp.numKeys; i++) {
                        var markerValue = markerProp.keyValue(i);
                        markers.push({
                            index: i - 1,
                            time: markerProp.keyTime(i),
                            comment: markerValue.comment,
                            duration: markerValue.duration,
                            chapter: markerValue.chapter,
                            url: markerValue.url
                        });
                    }
                }
            } catch (error) {
                ae.handleError(error, 'marker.getAll');
            }
            return markers;
        },

        /**
         * Clear all markers from layer
         * @param {Layer} layer - Target layer
         * @returns {ae} Chainable
         */
        clearAll: function(layer) {
            if (!layer) return ae;
            try {
                var markers = layer.property("ADBE Marker");
                if (markers && markers.numKeys > 0) {
                    while (markers.numKeys > 0) {
                        markers.removeKey(1);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'marker.clearAll');
            }
            return ae;
        }
    };
}(ae));