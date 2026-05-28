/**
 * Render queue control and output management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.render = {
        /**
         * Add composition to render queue
         * @param {CompItem} comp - Composition to render
         * @returns {RenderQueueItem} Render queue item
         */
        addToQueue: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return app.project.renderQueue.items.add(comp);
            } catch (error) {
                ae.handleError(error, 'render.addToQueue');
                return null;
            }
        },

        /**
         * Remove item from render queue
         * @param {RenderQueueItem} renderItem - Render queue item
         * @returns {ae} Chainable
         */
        removeFromQueue: function(renderItem) {
            if (renderItem) {
                try {
                    renderItem.remove();
                } catch (error) {
                    ae.handleError(error, 'render.removeFromQueue');
                }
            }
            return ae;
        },

        /**
         * Clear entire render queue
         * @returns {ae} Chainable
         */
        clearQueue: function() {
            try {
                app.project.renderQueue.items.removeAll();
            } catch (error) {
                ae.handleError(error, 'render.clearQueue');
            }
            return ae;
        },

        /**
         * Set output module template
         * @param {RenderQueueItem} renderItem - Render queue item
         * @param {string} templateName - Output template name
         * @returns {ae} Chainable
         */
        setOutputModule: function(renderItem, templateName) {
            if (!renderItem) return ae;
            try {
                var om = renderItem.outputModule(1);
                if (om && templateName) {
                    om.applyTemplate(templateName);
                }
            } catch (error) {
                ae.handleError(error, 'render.setOutputModule');
            }
            return ae;
        },

        /**
         * Set output file path
         * @param {RenderQueueItem} renderItem - Render queue item
         * @param {string} filepath - Output file path
         * @returns {ae} Chainable
         */
        setOutputFile: function(renderItem, filepath) {
            if (!renderItem) return ae;
            try {
                var om = renderItem.outputModule(1);
                if (om) {
                    om.file = new File(filepath);
                }
            } catch (error) {
                ae.handleError(error, 'render.setOutputFile');
            }
            return ae;
        },

        /**
         * Set render settings template
         * @param {RenderQueueItem} renderItem - Render queue item
         * @param {string} templateName - Render settings template
         * @returns {ae} Chainable
         */
        setRenderSettings: function(renderItem, templateName) {
            if (!renderItem) return ae;
            try {
                if (templateName) {
                    renderItem.applyTemplate(templateName);
                }
            } catch (error) {
                ae.handleError(error, 'render.setRenderSettings');
            }
            return ae;
        },

        /**
         * Start rendering
         * @returns {ae} Chainable
         */
        startRender: function() {
            try {
                app.project.renderQueue.render();
            } catch (error) {
                ae.handleError(error, 'render.startRender');
            }
            return ae;
        },

        /**
         * Stop rendering
         * @returns {ae} Chainable
         */
        stopRender: function() {
            try {
                app.project.renderQueue.stopRendering();
            } catch (error) {
                ae.handleError(error, 'render.stopRender');
            }
            return ae;
        },

        /**
         * Pause rendering
         * @returns {ae} Chainable
         */
        pauseRender: function() {
            try {
                app.project.renderQueue.pauseRendering();
            } catch (error) {
                ae.handleError(error, 'render.pauseRender');
            }
            return ae;
        },

        /**
         * Get render queue items
         * @returns {Array} Array of render queue items
         */
        getQueue: function() {
            var items = [];
            try {
                for (var i = 1; i <= app.project.renderQueue.items.length; i++) {
                    items.push(app.project.renderQueue.items[i]);
                }
            } catch (error) {
                ae.handleError(error, 'render.getQueue');
            }
            return items;
        },

        /**
         * Get render status
         * @returns {boolean} True if currently rendering
         */
        getStatus: function() {
            try {
                return app.project.renderQueue.rendering;
            } catch (error) {
                ae.handleError(error, 'render.getStatus');
                return false;
            }
        }
    };
}(ae));