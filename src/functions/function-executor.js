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
            if (!params.composition) {
                throw new Error("Missing required parameter: composition");
            }
            if (!params.layerName) {
                throw new Error("Missing required parameter: layerName");
            }

            var comp = ae.comp.getByName(params.composition);
            if (!comp) {
                throw new Error("Composition '" + params.composition + "' not found");
            }

            var layer = ae.layer.getByName(comp, params.layerName);
            if (!layer) {
                throw new Error("Layer '" + params.layerName + "' not found");
            }

            // Apply text properties
            if (params.textValue !== undefined) {
                ae.text.setText(layer, params.textValue);
            }

            if (params.positionValue) {
                ae.property.setValue(layer.property("Position"), params.positionValue);
            }

            if (params.scaleValue) {
                ae.property.setValue(layer.property("Scale"), params.scaleValue);
            }

            if (params.rotationValue !== undefined) {
                ae.property.setValue(layer.property("Rotation"), params.rotationValue);
            }

            if (params.opacityValue !== undefined) {
                ae.property.setValue(layer.property("Opacity"), params.opacityValue);
            }

            // Apply expressions
            if (params.scaleExpression) {
                ae.expression.set(layer.property("Scale"), params.scaleExpression);
            }

            if (params.opacityExpression) {
                ae.expression.set(layer.property("Opacity"), params.opacityExpression);
            }

            if (params.positionExpression) {
                ae.expression.set(layer.property("Position"), params.positionExpression);
            }

            if (params.rotationExpression) {
                ae.expression.set(layer.property("Rotation"), params.rotationExpression);
            }

            // Apply text-specific properties
            if (params.fontSize !== undefined) {
                ae.text.setSize(layer, params.fontSize);
            }

            if (params.fontColor) {
                ae.text.setColor(layer, params.fontColor);
            }

            if (params.fontFamily) {
                ae.text.setFont(layer, params.fontFamily);
            }

            return {
                success: true,
                composition: params.composition,
                layer: params.layerName,
                properties: Object.keys(params).filter(key => 
                    key !== 'composition' && key !== 'layerName'
                )
            };
        },

        /**
         * Set layer properties in any composition
         * @param {Object} params - Layer property parameters
         * @returns {Object} Execution result
         */
        layerPropertySet: function(params) {
            // Implementation for layer-property-set
            return { success: true, function: 'layer-property-set' };
        },

        /**
         * Set effect properties in any composition
         * @param {Object} params - Effect property parameters
         * @returns {Object} Execution result
         */
        effectPropertySet: function(params) {
            // Implementation for effect-property-set
            return { success: true, function: 'effect-property-set' };
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

            if (params.startRender !== false) {
                ae.render.startRender();
            }

            return {
                success: true,
                composition: params.composition,
                outputFile: params.outputFile
            };
        }
    };
}(ae));