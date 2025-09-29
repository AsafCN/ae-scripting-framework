/**
 * Service Logo Generator Example
 * Complete example for generating service logos with dynamic text
 */

// Load the framework
#include "../build/ae-scripting.jsx"

(function() {
    try {
        // Initialize framework
        ae.init({ logging: true });

        // Configuration
        var config = {
            username: "John Designer",
            serviceType: "design", // 'design' or 'service'
            copyright: true,
            copyrightName: "© 2024 John Designer",
            hueValue: 45,
            outputPath: "~/Desktop/service_logo.mp4"
        };

        // Open template project
        ae.project.open("~/Desktop/service-template.aep");

        // Build function calls
        var functions = [];

        // 1. Username text
        functions.push({
            name: 'text-params-set',
            params: {
                composition: "Username Comp",
                layerName: "Username Text",
                textValue: config.username,
                fontSize: 60,
                fontColor: ae.utils.createColor(255, 255, 255, 1),
                positionValue: [960, 540]
            }
        });

        // 2. Service type text
        if (config.serviceType === "design") {
            functions.push({
                name: 'text-params-set',
                params: {
                    composition: "ServiceType Comp",
                    layerName: "Design Text", 
                    textValue: "DESIGN",
                    fontSize: 48,
                    fontColor: ae.utils.createColor(0, 200, 255, 1),
                    scaleExpression: "wiggle(1, 5)"
                }
            });
        } else {
            functions.push({
                name: 'text-params-set',
                params: {
                    composition: "ServiceType Comp",
                    layerName: "Service Text",
                    textValue: "SERVICE", 
                    fontSize: 48,
                    fontColor: ae.utils.createColor(0, 200, 255, 1),
                    scaleExpression: "wiggle(1, 5)"
                }
            });
        }

        // 3. Copyright text
        if (config.copyright) {
            functions.push({
                name: 'text-params-set',
                params: {
                    composition: "Copyright Comp",
                    layerName: "Copyright Text",
                    textValue: config.copyrightName,
                    fontSize: 18,
                    fontColor: ae.utils.createColor(150, 150, 150, 1),
                    positionValue: [960, 1000]
                }
            });
        }

        // 4. Color adjustment
        functions.push({
            name: 'effect-property-set',
            params: {
                composition: "Color Comp", 
                layerName: "Color Adjustment",
                effectName: "Hue/Saturation",
                propertyName: "Master Hue",
                value: config.hueValue
            }
        });

        // 5. Render
        functions.push({
            name: 'composition-render',
            params: {
                composition: "Master Comp",
                outputFile: config.outputPath,
                startRender: true
            }
        });

        // Execute all functions
        var results = [];
        functions.forEach(function(func, index) {
            try {
                var result = ae.functions.execute(func.name, func.params);
                results.push({
                    index: index,
                    function: func.name,
                    success: true,
                    result: result
                });
                ae.log("✓ " + func.name + " executed successfully");
            } catch (error) {
                results.push({
                    index: index,
                    function: func.name, 
                    success: false,
                    error: error.message
                });
                ae.log("✗ " + func.name + " failed: " + error.message);
            }
        });

        // Summary
        var successCount = results.filter(r => r.success).length;
        var totalCount = results.length;

        ae.log("Service logo generation completed!");
        ae.log("Success: " + successCount + "/" + totalCount + " operations");

        if (successCount === totalCount) {
            ae.utils.alert("Service logo created successfully!\nOutput: " + config.outputPath);
        } else {
            ae.utils.alert("Service logo creation completed with " + (totalCount - successCount) + " errors.");
        }

    } catch (error) {
        ae.handleError(error, "service-logo-generator");
    }
})();