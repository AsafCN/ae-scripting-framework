# After Effects Scripting Framework

A comprehensive JavaScript library for automating Adobe After Effects 2023+ with a clean, chainable API that provides complete control over the After Effects ecosystem.

## Features

- 🎯 **Complete API Coverage** - Every aspect of After Effects automation
- 🔗 **Method Chaining** - Clean, readable code with fluent interface
- 🎨 **Composition-Based Targeting** - Direct access to any composition and layer
- ⚡ **Nexrender Compatibility** - Use the same JSON format as nexrender premium
- 🎞️ **Expressions & Keyframes** - Full support for animations and expressions
- 🎭 **Effects & Properties** - Complete effects and property manipulation
- 📊 **Render Queue Control** - Full render pipeline management
- 🛡️ **Error Handling** - Comprehensive error reporting and validation

## Installation

### For After Effects Scripts (.jsx)
```javascript
// Include the framework at the top of your script
#include "ae-framework.jsx"

// Or paste the entire framework into your script
```

### For Node.js (with nexrender)
```javascript
const ae = require('./ae-framework.jsx');
```

## Quick Start

### Basic Usage
```javascript
// Create project and composition
ae.project.create();
var comp = ae.comp.create("My Animation", 1920, 1080);

// Create and style text layer
var textLayer = ae.layer.createText(comp, "Hello World");
ae.text.setColor(textLayer, ae.utils.createColor(255, 0, 0))
      .setSize(textLayer, 60);

// Add animation
ae.property.setValueAtTime(textLayer.property("Position"), 0, [100, 100])
          .setValueAtTime(textLayer.property("Position"), 5, [500, 500]);

// Render
var renderItem = ae.render.addToQueue(comp);
ae.render.setOutputFile(renderItem, "~/Desktop/output.mp4")
        .startRender();
```

### Nexrender-Style Function Calls
```javascript
// Single function call
ae.functions.execute('text-params-set', {
    composition: "Text Comp",
    layerName: "Username-First 1", 
    textValue: "Dynamic Text",
    positionValue: [960, 540],
    scaleExpression: "wiggle(2, 10)",
    opacityExpression: "Math.sin(time * 2) * 50 + 50"
});

// Batch execution
var functions = [
    {
        name: 'text-params-set',
        params: {
            composition: "Text Comp",
            layerName: "Title",
            textValue: "Main Title",
            fontSize: 72
        }
    },
    {
        name: 'effect-property-set',
        params: {
            composition: "Effects Comp", 
            layerName: "Background",
            effectName: "Gaussian Blur",
            propertyName: "Blurriness",
            value: 15
        }
    }
];

functions.forEach(func => {
    ae.functions.execute(func.name, func.params);
});
```

## API Documentation

### Core Namespaces

- [`ae.app`](#application-management) - Application control and information
- [`ae.project`](#project-management) - Project creation and management  
- [`ae.comp`](#composition-management) - Composition operations
- [`ae.layer`](#layer-management) - Layer creation and manipulation
- [`ae.text`](#text-layer-management) - Text layer specific methods
- [`ae.property`](#property-management) - Property and keyframe control
- [`ae.expression`](#expressions-management) - Expression system
- [`ae.effects`](#effects-management) - Effects application and control
- [`ae.render`](#render-queue-management) - Render queue operations
- [`ae.functions`](#function-execution-system) - Nexrender-style function calls

### Application Management
```javascript
ae.app.getVersion()                    // Get AE version
    .getMemoryUsage()                  // Current memory usage
    .setMemoryLimit(2000, 4000)       // Set memory limits
    .purge('all')                     // Purge caches
    .executeCommand("ADBE Group Layers"); // Run menu command
```

### Project Management
```javascript
ae.project.create()                    // New project
    .importFile("~/Desktop/video.mov") // Import footage
    .save("~/Desktop/project.aep")     // Save project
    .getSelection()                    // Get selected items
    .setSelection([item1, item2]);     // Set selection
```

### Composition Management
```javascript
var comp = ae.comp.create("My Comp", 1920, 1080, 1, 10, 30)
    .setDuration(15)                   // Change duration
    .setFrameRate(25)                  // Change frame rate
    .setBackgroundColor([0, 0, 0, 1]); // Set background

var layers = ae.comp.getLayers(comp);  // Get all layers
```

### Layer Management
```javascript
var textLayer = ae.layer.createText(comp, "Sample Text");
var shapeLayer = ae.layer.createShape(comp);
var cameraLayer = ae.layer.createCamera(comp, "Camera 1");

ae.layer.enable(textLayer, false)      // Disable layer
    .setParent(shapeLayer, textLayer)  // Set parenting
    .setStartTime(textLayer, 2)        // Set start time
    .setInPoint(textLayer, 1)          // Set in point
    .setOutPoint(textLayer, 8);        // Set out point
```

### Text Layer Management
```javascript
ae.text.setText(layer, "New Text")     // Change text content
    .setFont(layer, "Arial")           // Change font
    .setSize(layer, 48)                // Font size
    .setColor(layer, [1, 0, 0, 1])     // Text color (red)
    .setTracking(layer, 50)            // Character tracking
    .setLeading(layer, 60)             // Line leading
    .setAlignment(layer, ParagraphJustification.CENTER_JUSTIFY);
```

### Property Management
```javascript
var positionProp = ae.property.get(layer, "Position");

ae.property.setValue(positionProp, [100, 200])                    // Static value
    .setValueAtTime(positionProp, 0, [100, 100])                 // Keyframe at time 0
    .setValueAtTime(positionProp, 5, [500, 500])                 // Keyframe at time 5
    .setInterpolationType(positionProp, 0, KeyframeInterpolationType.BEZIER) // Smooth interpolation
    .setTemporalEase(positionProp, 0, easeIn, easeOut);          // Set easing
```

### Expressions
```javascript
ae.expression.set(layer.property("Scale"), "wiggle(2, 50)")      // Wiggle expression
    .setWiggler(layer.property("Position"), 3, 100, 2)           // Pre-built wiggler
    .setLoop(layer.property("Rotation"), 'cycle')                // Loop animation
    .linkToProperty(layer1.property("Opacity"), layer2.property("Scale")) // Property linking
    .setEnabled(layer.property("Position"), false);              // Disable expression
```

### Effects
```javascript
var blurEffect = ae.effects.add(layer, "ADBE Gaussian Blur")     // Add effect
    .setProperty(blurEffect, "Blurriness", 25)                   // Set property
    .animateProperty(blurEffect, "Blurriness", [                 // Animate property
        { time: 0, value: 0 },
        { time: 2, value: 25 },
        { time: 5, value: 0 }
    ]);

ae.effects.remove(layer, 1)                                      // Remove effect
    .removeAll(layer);                                           // Remove all effects
```

### Render Queue
```javascript
var renderItem = ae.render.addToQueue(comp)                      // Add to render queue
    .setOutputFile(renderItem, "~/Desktop/output.mp4")           // Set output path
    .setOutputModule(renderItem, "Lossless")                     // Set output template
    .setRenderSettings(renderItem, "Best Settings")              // Set render settings
    .startRender();                                              // Start rendering

ae.render.stopRender()                                           // Stop rendering
    .pauseRender()                                               // Pause rendering
    .clearQueue();                                               // Clear render queue
```

## Advanced Examples

### Service Logo Generator
```javascript
function createServiceLogo(username, options = {}) {
    const functions = [];
    
    // Username text
    functions.push({
        name: 'text-params-set',
        params: {
            composition: "Username Comp",
            layerName: "Username Text",
            textValue: username,
            fontSize: options.fontSize || 60,
            fontColor: ae.utils.createColor(255, 255, 255, 1)
        }
    });
    
    // Copyright text
    if (options.copyright) {
        functions.push({
            name: 'text-params-set',
            params: {
                composition: "Copyright Comp", 
                layerName: "Copyright Text",
                textValue: options.copyrightText,
                fontSize: 24,
                opacityExpression: "time > 2 ? 100 : 0"
            }
        });
    }
    
    // Execute all functions
    functions.forEach(func => {
        ae.functions.execute(func.name, func.params);
    });
    
    // Render master composition
    ae.functions.execute('composition-render', {
        composition: "Master Comp",
        outputFile: options.outputPath || "~/Desktop/logo.mp4"
    });
}
```

### Batch Template System
```javascript
function processTemplate(templateData) {
    // Process text layers
    templateData.textLayers.forEach(layer => {
        ae.functions.execute('text-params-set', {
            composition: layer.comp,
            layerName: layer.name,
            textValue: layer.text,
            fontSize: layer.size,
            positionValue: layer.position
        });
    });
    
    // Process effects
    templateData.effects.forEach(effect => {
        ae.functions.execute('effect-property-set', {
            composition: effect.comp,
            layerName: effect.layer,
            effectName: effect.name, 
            propertyName: effect.property,
            value: effect.value
        });
    });
    
    // Start render
    ae.functions.execute('composition-render', {
        composition: templateData.outputComp,
        outputFile: templateData.outputPath
    });
}
```

## Match Names Reference

The framework includes a comprehensive reference of After Effects match names:

```javascript
// Layer match names
ae.matchNames.layers.avLayer      // "ADBE AV Layer"
ae.matchNames.layers.textLayer    // "ADBE Text Layer" 
ae.matchNames.layers.shapeLayer   // "ADBE Vector Layer"

// Property match names  
ae.matchNames.properties.position // "ADBE Position"
ae.matchNames.properties.scale    // "ADBE Scale"
ae.matchNames.properties.rotation // "ADBE Rotation"

// Effect match names
ae.matchNames.effects["Gaussian Blur"]    // "ADBE Gaussian Blur"
ae.matchNames.effects["Hue/Saturation"]   // "ADBE Hue/Saturation"
```

## Error Handling

```javascript
try {
    ae.comp.getByName("NonExistentComp");
} catch (error) {
    ae.utils.log("Error: " + error.message);
    ae.utils.alert("Operation failed: " + error.message);
}

// Batch operations with error handling
var results = ae.composition.setMultipleTextParams(textConfigs);
results.forEach(result => {
    if (!result.success) {
        ae.utils.log("Failed: " + result.error);
    }
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- 📧 Email: asafcohen370@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/AsafCN/ae-scripting-framework/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/AsafCN/ae-scripting-framework/discussions)

## Version History

- **2.0.0** - Complete rewrite with composition-based targeting and nexrender compatibility
- **1.0.0** - Initial release with basic After Effects automation

---

**Happy Scripting!** 🎬
```

This complete framework is now ready for GitHub with proper documentation, examples, and a professional structure that makes it easy for others to use and contribute to!