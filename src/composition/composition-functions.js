/**
 * Direct composition targeting system (nexrender premium style)
 * @namespace
 */

(function(ae) {
    'use strict';

    // Extend ae.composition if it already exists, or create it
    ae.composition = ae.composition || {};

    /**
     * Set text parameters in any composition
     * @param {Object} params - Text parameters
     * @returns {Object} Execution result
     */
    ae.composition.setTextParams = function(params) {
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
            throw new Error("Layer '" + params.layerName + "' not found in composition '" + params.composition + "'");
        }

        // Apply text properties
        if (params.textValue !== undefined) {
            ae.text.setText(layer, params.textValue);
        }

        if (params.positionValue) {
            ae.property.setValue(layer.property("ADBE Position"), params.positionValue);
        }

        if (params.scaleValue) {
            ae.property.setValue(layer.property("ADBE Scale"), params.scaleValue);
        }

        if (params.rotationValue !== undefined) {
            ae.property.setValue(layer.property("ADBE Rotation"), params.rotationValue);
        }

        if (params.opacityValue !== undefined) {
            ae.property.setValue(layer.property("ADBE Opacity"), params.opacityValue);
        }

        // Apply expressions
        if (params.scaleExpression) {
            ae.expression.set(layer.property("ADBE Scale"), params.scaleExpression);
        }

        if (params.opacityExpression) {
            ae.expression.set(layer.property("ADBE Opacity"), params.opacityExpression);
        }

        if (params.positionExpression) {
            ae.expression.set(layer.property("ADBE Position"), params.positionExpression);
        }

        if (params.rotationExpression) {
            ae.expression.set(layer.property("ADBE Rotation"), params.rotationExpression);
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

        if (params.tracking !== undefined) {
            ae.text.setTracking(layer, params.tracking);
        }

        if (params.leading !== undefined) {
            ae.text.setLeading(layer, params.leading);
        }

        if (params.alignment) {
            ae.text.setAlignment(layer, params.alignment);
        }

        return {
            success: true,
            composition: params.composition,
            layer: params.layerName,
            propertiesSet: Object.keys(params).filter(key => key !== 'composition' && key !== 'layerName')
        };
    };

    /**
     * Set multiple text parameters in batch
     * @param {Array} textParamsArray - Array of text parameter objects
     * @returns {Array} Array of results
     */
    ae.composition.setMultipleTextParams = function(textParamsArray) {
        var results = [];
        for (var i = 0; i < textParamsArray.length; i++) {
            try {
                var result = this.setTextParams(textParamsArray[i]);
                results.push({
                    success: true,
                    params: textParamsArray[i],
                    result: result
                });
            } catch (error) {
                results.push({
                    success: false,
                    params: textParamsArray[i],
                    error: error.message
                });
            }
        }
        return results;
    };

    /**
     * Set layer properties in any composition
     * @param {Object} params - Layer property parameters
     * @returns {Object} Execution result
     */
    ae.composition.setLayerProperty = function(params) {
        if (!params.composition) {
            throw new Error("Missing required parameter: composition");
        }
        if (!params.layerName) {
            throw new Error("Missing required parameter: layerName");
        }
        if (!params.property) {
            throw new Error("Missing required parameter: property");
        }

        var comp = ae.comp.getByName(params.composition);
        if (!comp) {
            throw new Error("Composition '" + params.composition + "' not found");
        }

        var layer = ae.layer.getByName(comp, params.layerName);
        if (!layer) {
            throw new Error("Layer '" + params.layerName + "' not found");
        }

        var property = layer.property(params.property);
        if (!property) {
            throw new Error("Property '" + params.property + "' not found");
        }

        if (params.expression !== undefined) {
            ae.expression.set(property, params.expression);
        }

        if (params.value !== undefined) {
            if (params.time !== undefined) {
                ae.property.setValueAtTime(property, params.time, params.value);
            } else {
                ae.property.setValue(property, params.value);
            }
        }

        if (params.keyframes) {
            for (var i = 0; i < params.keyframes.length; i++) {
                var kf = params.keyframes[i];
                ae.property.setValueAtTime(property, kf.time, kf.value);

                if (kf.easeIn) {
                    ae.keyframes.setTemporalEase(property, i, kf.easeIn, kf.easeOut);
                }
            }
        }

        return {
            success: true,
            composition: params.composition,
            layer: params.layerName,
            property: params.property,
            value: params.value,
            expression: params.expression
        };
    };

    /**
     * Set effect properties in any composition
     * @param {Object} params - Effect property parameters
     * @returns {Object} Execution result
     */
    ae.composition.setEffectProperty = function(params) {
        if (!params.composition) {
            throw new Error("Missing required parameter: composition");
        }
        if (!params.layerName) {
            throw new Error("Missing required parameter: layerName");
        }
        if (!params.effectName) {
            throw new Error("Missing required parameter: effectName");
        }
        if (!params.propertyName) {
            throw new Error("Missing required parameter: propertyName");
        }

        var comp = ae.comp.getByName(params.composition);
        if (!comp) {
            throw new Error("Composition '" + params.composition + "' not found");
        }

        var layer = ae.layer.getByName(comp, params.layerName);
        if (!layer) {
            throw new Error("Layer '" + params.layerName + "' not found");
        }

        var effect = ae.effects.getByName(layer, params.effectName);
        if (!effect) {
            effect = ae.effects.add(layer, params.effectName);
        }

        ae.effects.setProperty(effect, params.propertyName, params.value);

        return {
            success: true,
            composition: params.composition,
            layer: params.layerName,
            effect: params.effectName,
            property: params.propertyName,
            value: params.value
        };
    };
}(ae));