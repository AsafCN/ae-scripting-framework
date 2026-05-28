/**
 * Nexrender-style function execution system
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.functions = {
        /**
         * Execute a function with parameters
         * @param {string} name - Function name
         * @param {Object} params - Function parameters
         * @returns {Object} Execution result
         */
        execute: function(name, params) {
            try {
                switch (name) {
                    case 'text-params-set':
                        return this.textParamsSet(params);
                    case 'layer-property-set':
                        return this.layerPropertySet(params);
                    case 'effect-property-set':
                        return this.effectPropertySet(params);
                    case 'composition-render':
                        return this.compositionRender(params);
                    default:
                        throw new Error("Unknown function: " + name);
                }
            } catch (error) {
                return ae.handleError(error, 'functions.execute.' + name);
            }
        },

        /**
         * Set text parameters in any composition
         * @param {Object} params - Text parameters
         * @returns {Object} Execution result
         */
        textParamsSet: function(params) {
            return ae.composition.setTextParams(params);
        },

        /**
         * Set layer properties in any composition
         * @param {Object} params - Layer property parameters
         * @returns {Object} Execution result
         */
        layerPropertySet: function(params) {
            return ae.composition.setLayerProperty(params);
        },

        /**
         * Set effect properties in any composition
         * @param {Object} params - Effect property parameters
         * @returns {Object} Execution result
         */
        effectPropertySet: function(params) {
            return ae.composition.setEffectProperty(params);
        },

        /**
         * Render a specific composition
         * @param {Object} params - Render parameters
         * @returns {Object} Execution result
         */
        compositionRender: function(params) {
            if (!params.composition) {
                throw new Error("Missing required parameter: composition");
            }

            var comp = ae.comp.getByName(params.composition);
            if (!comp) {
                throw new Error("Composition '" + params.composition + "' not found");
            }

            var renderItem = ae.render.addToQueue(comp);
            
            if (params.outputFile) {
                ae.render.setOutputFile(renderItem, params.outputFile);
            }

            if (params.outputTemplate) {
                ae.render.setOutputModule(renderItem, params.outputTemplate);
            }

            if (params.renderSettings) {
                ae.render.setRenderSettings(renderItem, params.renderSettings);
            }

            if (params.startRender !== false) {
                ae.render.startRender();
            }

            return {
                success: true,
                composition: params.composition,
                renderItem: renderItem,
                outputFile: params.outputFile
            };
        }
    };
}(ae));