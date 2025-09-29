/**
 * Basic Usage Example
 * Demonstrates core framework functionality
 */

// Load the framework
#include "../build/ae-scripting.jsx"

(function() {
    try {
        // Initialize framework
        ae.init({
            logging: true,
            errorHandling: true
        });

        // Create a new project
        ae.project.create();
        ae.log("New project created");

        // Create a composition
        var comp = ae.comp.create("Demo Composition", 1920, 1080, 1, 10, 30);
        ae.log("Composition created: " + comp.name);

        // Create a text layer
        var textLayer = ae.layer.createText(comp, "Hello After Effects!");
        ae.text.setColor(textLayer, ae.utils.createColor(255, 0, 0))
              .setSize(textLayer, 60)
              .setFont(textLayer, "Arial");

        // Animate the text
        ae.property.setValueAtTime(textLayer.property("ADBE Position"), 0, [100, 100])
                  .setValueAtTime(textLayer.property("ADBE Position"), 5, [500, 500]);

        // Add a wiggle expression to scale
        ae.expression.setWiggler(textLayer.property("ADBE Scale"), 2, 20, 1);

        // Create a shape layer
        var shapeLayer = ae.layer.createShape(comp);
        var rect = ae.shape.addRectangle(shapeLayer);
        ae.shape.setFillColor(ae.shape.addFill(shapeLayer), ae.utils.createColor(0, 150, 255));

        // Add to render queue
        var renderItem = ae.render.addToQueue(comp);
        ae.render.setOutputFile(renderItem, "~/Desktop/demo_output.mp4");

        ae.log("Basic example completed successfully!");
        ae.utils.alert("Basic example completed! Check the render queue.");

    } catch (error) {
        ae.handleError(error, "basic-usage-example");
    }
})();