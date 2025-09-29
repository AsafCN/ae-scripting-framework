/**
 * Nexrender Style Example
 * Demonstrates function-based execution like nexrender premium
 */

// Load the framework
#include "../build/ae-scripting.jsx"

(function() {
    try {
        // Initialize framework
        ae.init({ logging: true });

        // Open a template project
        ae.project.open("~/Desktop/template.aep");

        // Execute functions like nexrender premium
        var functions = [
            {
                name: 'text-params-set',
                params: {
                    composition: "Main Comp",
                    layerName: "Title Text",
                    textValue: "Dynamic Title",
                    positionValue: [960, 200],
                    fontSize: 72,
                    fontColor: ae.utils.createColor(255, 255, 255, 1),
                    scaleExpression: "wiggle(2, 10)"
                }
            },
            {
                name: 'text-params-set',
                params: {
                    composition: "Main Comp", 
                    layerName: "Subtitle Text",
                    textValue: "Generated with AEFramework",
                    positionValue: [960, 300],
                    fontSize: 36,
                    opacityExpression: "time > 2 ? 100 : 0"
                }
            },
            {
                name: 'effect-property-set',
                params: {
                    composition: "Background Comp",
                    layerName: "Background Layer",
                    effectName: "Gaussian Blur",
                    propertyName: "Blurriness",
                    value: 15
                }
            },
            {
                name: 'composition-render',
                params: {
                    composition: "Main Comp",
                    outputFile: "~/Desktop/nexrender_output.mp4",
                    startRender: true
                }
            }
        ];

        // Execute all functions
        functions.forEach(function(func) {
            var result = ae.functions.execute(func.name, func.params);
            ae.log("Executed " + func.name + ": " + (result.success ? "SUCCESS" : "FAILED"));
        });

        ae.log("Nexrender-style example completed!");

    } catch (error) {
        ae.handleError(error, "nexrender-style-example");
    }
})();