/**
 * After Effects Scripting Framework
 * @version 2.0.0
 * @description A comprehensive JavaScript library for automating Adobe After Effects 2023+
 * @author Asaf Cohen
 * @license MIT
 * @repository https://github.com/AsafCN/ae-scripting-framework
 */

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else {
        // Browser globals
        root.ae = factory();
    }
}(this, function() {
    'use strict';

    // =========================================================================
    // CORE FRAMEWORK
    // =========================================================================

    var AEFramework = {
        version: "2.0.0",
        aeVersion: "2023+",
        debug: false
    };

    // =========================================================================
    // APPLICATION MANAGEMENT
    // =========================================================================

    /**
     * Application-level controls and information
     * @namespace
     */
    AEFramework.app = {
        /**
         * Get application version information
         * @returns {string} After Effects version
         */
        getVersion: function() {
            return app.version;
        },

        /**
         * Get application language setting
         * @returns {string} ISO language code
         */
        getLanguage: function() {
            return app.isoLanguage;
        },

        /**
         * Get current memory usage
         * @returns {number} Memory in use (bytes)
         */
        getMemoryUsage: function() {
            return app.getMemoryInUse();
        },

        /**
         * Exit After Effects
         * @param {boolean} [force=false] Force quit without saving
         * @returns {AEFramework} Chainable
         */
        exit: function(force) {
            if (force) {
                app.quit();
            } else {
                app.quit(SaveOptions.DO_NOT_SAVE_CHANGES);
            }
            return this;
        },

        /**
         * Execute a menu command by ID
         * @param {string} commandID - Command identifier
         * @returns {AEFramework} Chainable
         */
        executeCommand: function(commandID) {
            app.executeCommand(commandID);
            return this;
        },

        /**
         * Get current project
         * @returns {Project} Active project
         */
        getProject: function() {
            return app.project;
        },

        /**
         * Set memory usage limits
         * @param {number} imageCache - Image cache limit (MB)
         * @param {number} maxMemory - Maximum memory limit (MB)
         * @returns {AEFramework} Chainable
         */
        setMemoryLimit: function(imageCache, maxMemory) {
            app.setMemoryUsageLimits(imageCache, maxMemory);
            return this;
        },

        /**
         * Purge memory caches
         * @param {string} target - Cache type: 'all', 'undo', 'image', 'snapshot'
         * @returns {AEFramework} Chainable
         */
        purge: function(target) {
            var purgeTarget;
            switch(target) {
                case 'all': purgeTarget = PurgeTarget.ALL; break;
                case 'undo': purgeTarget = PurgeTarget.UNDO_CACHES; break;
                case 'image': purgeTarget = PurgeTarget.IMAGE_CACHES; break;
                case 'snapshot': purgeTarget = PurgeTarget.SNAPSHOT_CACHES; break;
                default: purgeTarget = PurgeTarget.ALL;
            }
            app.purge(purgeTarget);
            return this;
        },

        /**
         * Get application settings
         * @returns {Settings} Application settings object
         */
        getSettings: function() {
            return app.settings;
        }
    };

    // =========================================================================
    // PROJECT MANAGEMENT
    // =========================================================================

    /**
     * Project creation, saving, and management
     * @namespace
     */
    AEFramework.project = {
        /**
         * Create a new project
         * @returns {Project} New project
         */
        create: function() {
            app.newProject();
            return app.project;
        },

        /**
         * Open an existing project file
         * @param {string} filepath - Path to project file
         * @returns {Project} Opened project
         */
        open: function(filepath) {
            return app.open(new File(filepath));
        },

        /**
         * Save the current project
         * @param {string} [filepath] - Optional save path
         * @returns {AEFramework} Chainable
         */
        save: function(filepath) {
            if (filepath) {
                app.project.save(new File(filepath));
            } else {
                app.project.save();
            }
            return this;
        },

        /**
         * Close the current project
         * @param {string} [saveOptions='dontSave'] - Save option: 'dontSave', 'save', 'prompt'
         * @returns {AEFramework} Chainable
         */
        close: function(saveOptions) {
            var option;
            switch(saveOptions) {
                case 'save': option = SaveOptions.SAVE_CHANGES; break;
                case 'prompt': option = SaveOptions.PROMPT_TO_SAVE_CHANGES; break;
                default: option = SaveOptions.DO_NOT_SAVE_CHANGES;
            }
            app.project.close(option);
            return this;
        },

        /**
         * Import a file into the project
         * @param {string} filepath - Path to file
         * @param {string} [importAsType] - Import type
         * @returns {FootageItem} Imported footage item
         */
        importFile: function(filepath, importAsType) {
            var importOptions = new ImportOptions(new File(filepath));
            if (importAsType) importOptions.importAs = importAsType;
            return app.project.importFile(importOptions);
        },

        /**
         * Create and import a placeholder
         * @param {string} name - Placeholder name
         * @param {number} width - Width in pixels
         * @param {number} height - Height in pixels
         * @param {number} frameRate - Frame rate
         * @param {number} duration - Duration in seconds
         * @returns {PlaceholderSource} Placeholder item
         */
        importPlaceholder: function(name, width, height, frameRate, duration) {
            return app.project.importPlaceholder(name, width, height, frameRate, duration);
        },

        /**
         * Create and import a solid color layer
         * @param {string} name - Solid name
         * @param {number} width - Width in pixels
         * @param {number} height - Height in pixels
         * @param {Array} color - RGB color array [r, g, b]
         * @param {number} duration - Duration in seconds
         * @returns {SolidSource} Solid item
         */
        importSolid: function(name, width, height, color, duration) {
            return app.project.importSolid(color, name, width, height, duration);
        },

        /**
         * Get all items in the project
         * @returns {Array} Array of project items
         */
        getItems: function() {
            var items = [];
            for (var i = 1; i <= app.project.numItems; i++) {
                items.push(app.project.item(i));
            }
            return items;
        },

        /**
         * Get the active item
         * @returns {Item} Active item
         */
        getActiveItem: function() {
            return app.project.activeItem;
        },

        /**
         * Get current selection
         * @returns {Array} Array of selected items
         */
        getSelection: function() {
            return app.project.selection;
        },

        /**
         * Set selection
         * @param {Array} items - Array of items to select
         * @returns {AEFramework} Chainable
         */
        setSelection: function(items) {
            app.project.selection = items;
            return this;
        },

        /**
         * Get render queue
         * @returns {RenderQueue} Render queue object
         */
        getRenderQueue: function() {
            return app.project.renderQueue;
        },

        /**
         * Find item by name
         * @param {string} name - Item name to find
         * @returns {Item} Found item or null
         */
        findItemByName: function(name) {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item.name === name) {
                    return item;
                }
            }
            return null;
        }
    };

    // =========================================================================
    // COMPOSITION MANAGEMENT
    // =========================================================================

    /**
     * Composition creation and management
     * @namespace
     */
    AEFramework.comp = {
        /**
         * Create a new composition
         * @param {string} name - Composition name
         * @param {number} width - Width in pixels
         * @param {number} height - Height in pixels
         * @param {number} [pixelAspect=1] - Pixel aspect ratio
         * @param {number} [duration=10] - Duration in seconds
         * @param {number} [frameRate=30] - Frames per second
         * @returns {CompItem} New composition
         */
        create: function(name, width, height, pixelAspect, duration, frameRate) {
            return app.project.items.addComp(
                name || "New Composition",
                width || 1920,
                height || 1080,
                pixelAspect || 1,
                duration || 10,
                frameRate || 30
            );
        },

        /**
         * Get composition by name
         * @param {string} compName - Composition name
         * @returns {CompItem} Composition or null
         */
        getByName: function(compName) {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem && item.name === compName) {
                    return item;
                }
            }
            return null;
        },

        /**
         * Duplicate a composition
         * @param {CompItem} comp - Composition to duplicate
         * @param {string} [newName] - Name for duplicate
         * @returns {CompItem} Duplicated composition
         */
        duplicate: function(comp, newName) {
            if (!comp || !(comp instanceof CompItem)) return null;
            var newComp = comp.duplicate();
            if (newName) newComp.name = newName;
            return newComp;
        },

        /**
         * Get all compositions in project
         * @returns {Array} Array of compositions
         */
        getAll: function() {
            var comps = [];
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem) {
                    comps.push(item);
                }
            }
            return comps;
        },

        /**
         * Get layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of layers
         */
        getLayers: function(comp) {
            if (!comp || !comp.layers) return [];
            var layers = [];
            for (var i = 1; i <= comp.numLayers; i++) {
                layers.push(comp.layer(i));
            }
            return layers;
        },

        /**
         * Get camera layer from composition
         * @param {CompItem} comp - Composition
         * @returns {CameraLayer} Camera layer or null
         */
        getCamera: function(comp) {
            if (!comp) return null;
            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);
                if (layer instanceof CameraLayer) {
                    return layer;
                }
            }
            return null;
        },

        /**
         * Get light layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of light layers
         */
        getLights: function(comp) {
            if (!comp) return [];
            var lights = [];
            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);
                if (layer instanceof LightLayer) {
                    lights.push(layer);
                }
            }
            return lights;
        },

        /**
         * Set composition duration
         * @param {CompItem} comp - Composition
         * @param {number} duration - Duration in seconds
         * @returns {AEFramework} Chainable
         */
        setDuration: function(comp, duration) {
            if (comp) comp.duration = duration;
            return this;
        },

        /**
         * Set composition frame rate
         * @param {CompItem} comp - Composition
         * @param {number} frameRate - Frames per second
         * @returns {AEFramework} Chainable
         */
        setFrameRate: function(comp, frameRate) {
            if (comp) comp.frameRate = frameRate;
            return this;
        },

        /**
         * Set composition background color
         * @param {CompItem} comp - Composition
         * @param {Array} color - Background color [r, g, b, a]
         * @returns {AEFramework} Chainable
         */
        setBackgroundColor: function(comp, color) {
            if (comp) comp.bgColor = color;
            return this;
        }
    };

    // =========================================================================
    // LAYER MANAGEMENT
    // =========================================================================

    /**
     * Layer creation and management
     * @namespace
     */
    AEFramework.layer = {
        /**
         * Create a layer from source in composition
         * @param {CompItem} comp - Target composition
         * @param {Item} source - Source item
         * @param {number} [duration] - Layer duration
         * @returns {AVLayer} New layer
         */
        create: function(comp, source, duration) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return comp.layers.add(source, duration);
        },

        /**
         * Create text layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} textContent - Text content
         * @returns {TextLayer} New text layer
         */
        createText: function(comp, textContent) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return comp.layers.addText(textContent || "Sample Text");
        },

        /**
         * Create shape layer in composition
         * @param {CompItem} comp - Target composition
         * @returns {ShapeLayer} New shape layer
         */
        createShape: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return comp.layers.addShape();
        },

        /**
         * Create camera layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Camera name
         * @param {Array} [centerPoint] - Center point [x, y]
         * @returns {CameraLayer} New camera layer
         */
        createCamera: function(comp, name, centerPoint) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return comp.layers.addCamera(name || "Camera 1", centerPoint || [960, 540]);
        },

        /**
         * Create light layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Light name
         * @param {LightType} [lightType] - Type of light
         * @returns {LightLayer} New light layer
         */
        createLight: function(comp, name, lightType) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return comp.layers.addLight(name || "Light 1", lightType || LightType.SPOT);
        },

        /**
         * Create null object layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Null object name
         * @returns {AVLayer} New null layer
         */
        createNull: function(comp, name) {
            if (!comp || !(comp instanceof CompItem)) return null;
            var nullLayer = comp.layers.addNull();
            if (name) nullLayer.name = name;
            return nullLayer;
        },

        /**
         * Get layer by name from composition
         * @param {CompItem} comp - Composition
         * @param {string} name - Layer name
         * @returns {Layer} Layer or null
         */
        getByName: function(comp, name) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return comp.layer(name);
        },

        /**
         * Get layer by index from composition
         * @param {CompItem} comp - Composition
         * @param {number} index - Layer index (1-based)
         * @returns {Layer} Layer or null
         */
        getByIndex: function(comp, index) {
            if (!comp || !(comp instanceof CompItem) || index < 1 || index > comp.numLayers) return null;
            return comp.layer(index);
        },

        /**
         * Get all layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of layers
         */
        getAll: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return [];
            var layers = [];
            for (var i = 1; i <= comp.numLayers; i++) {
                layers.push(comp.layer(i));
            }
            return layers;
        },

        /**
         * Duplicate a layer
         * @param {Layer} layer - Layer to duplicate
         * @returns {Layer} Duplicated layer
         */
        duplicate: function(layer) {
            if (!layer) return null;
            return layer.duplicate();
        },

        /**
         * Delete a layer
         * @param {Layer} layer - Layer to delete
         * @returns {AEFramework} Chainable
         */
        delete: function(layer) {
            if (layer) layer.remove();
            return this;
        },

        /**
         * Enable or disable a layer
         * @param {Layer} layer - Target layer
         * @param {boolean} enabled - Enable state
         * @returns {AEFramework} Chainable
         */
        enable: function(layer, enabled) {
            if (layer) layer.enabled = enabled !== false;
            return this;
        },

        /**
         * Set layer parent
         * @param {Layer} layer - Child layer
         * @param {Layer} parentLayer - Parent layer
         * @returns {AEFramework} Chainable
         */
        setParent: function(layer, parentLayer) {
            if (layer && parentLayer) {
                layer.parent = parentLayer;
            }
            return this;
        },

        /**
         * Set layer start time
         * @param {Layer} layer - Target layer
         * @param {number} time - Start time in seconds
         * @returns {AEFramework} Chainable
         */
        setStartTime: function(layer, time) {
            if (layer) layer.startTime = time;
            return this;
        },

        /**
         * Set layer in point
         * @param {Layer} layer - Target layer
         * @param {number} time - In point time
         * @returns {AEFramework} Chainable
         */
        setInPoint: function(layer, time) {
            if (layer) layer.inPoint = time;
            return this;
        },

        /**
         * Set layer out point
         * @param {Layer} layer - Target layer
         * @param {number} time - Out point time
         * @returns {AEFramework} Chainable
         */
        setOutPoint: function(layer, time) {
            if (layer) layer.outPoint = time;
            return this;
        }
    };

    // =========================================================================
    // AV LAYER SPECIFIC METHODS
    // =========================================================================

    /**
     * Audio-visual layer specific methods
     * @namespace
     */
    AEFramework.avLayer = {
        /**
         * Set layer source
         * @param {AVLayer} layer - Target layer
         * @param {Item} source - Source item
         * @returns {AEFramework} Chainable
         */
        setSource: function(layer, source) {
            if (layer && source) {
                layer.source = source;
            }
            return this;
        },

        /**
         * Enable or disable audio
         * @param {AVLayer} layer - Target layer
         * @param {boolean} enabled - Audio enabled state
         * @returns {AEFramework} Chainable
         */
        setAudioEnabled: function(layer, enabled) {
            if (layer && layer.audio) {
                layer.audio.enabled = enabled;
            }
            return this;
        },

        /**
         * Set audio levels
         * @param {AVLayer} layer - Target layer
         * @param {number} leftLevel - Left channel level
         * @param {number} rightLevel - Right channel level
         * @returns {AEFramework} Chainable
         */
        setAudioLevels: function(layer, leftLevel, rightLevel) {
            if (layer && layer.audio) {
                var audioLevels = layer.audio.property("Levels").value;
                if (leftLevel !== undefined) audioLevels[0] = leftLevel;
                if (rightLevel !== undefined) audioLevels[1] = rightLevel;
                layer.audio.property("Levels").setValue(audioLevels);
            }
            return this;
        }
    };

    // =========================================================================
    // TEXT LAYER MANAGEMENT
    // =========================================================================

    /**
     * Text layer manipulation and styling
     * @namespace
     */
    AEFramework.text = {
        /**
         * Set text content
         * @param {TextLayer} layer - Target text layer
         * @param {string} text - Text content
         * @returns {AEFramework} Chainable
         */
        setText: function(layer, text) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.text = text;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Set font family
         * @param {TextLayer} layer - Target text layer
         * @param {string} fontName - Font name
         * @returns {AEFramework} Chainable
         */
        setFont: function(layer, fontName) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.font = fontName;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Set font size
         * @param {TextLayer} layer - Target text layer
         * @param {number} size - Font size
         * @returns {AEFramework} Chainable
         */
        setSize: function(layer, size) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.fontSize = size;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Set text color
         * @param {TextLayer} layer - Target text layer
         * @param {Array} color - Color array [r, g, b, a]
         * @returns {AEFramework} Chainable
         */
        setColor: function(layer, color) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.fillColor = color;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Set character tracking
         * @param {TextLayer} layer - Target text layer
         * @param {number} tracking - Tracking value
         * @returns {AEFramework} Chainable
         */
        setTracking: function(layer, tracking) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.tracking = tracking;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Set line leading
         * @param {TextLayer} layer - Target text layer
         * @param {number} leading - Leading value
         * @returns {AEFramework} Chainable
         */
        setLeading: function(layer, leading) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.leading = leading;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Set text alignment
         * @param {TextLayer} layer - Target text layer
         * @param {ParagraphJustification} alignment - Text alignment
         * @returns {AEFramework} Chainable
         */
        setAlignment: function(layer, alignment) {
            if (!layer || !layer.property("Source Text")) return this;
            var textDoc = layer.property("Source Text").value;
            textDoc.justification = alignment;
            layer.property("Source Text").setValue(textDoc);
            return this;
        },

        /**
         * Get character range object
         * @param {TextLayer} layer - Target text layer
         * @param {number} start - Start index
         * @param {number} end - End index
         * @returns {CharacterRange} Character range object
         */
        getCharacterRange: function(layer, start, end) {
            if (!layer) return null;
            return new CharacterRange(layer, start, end);
        },

        /**
         * Get paragraph range object
         * @param {TextLayer} layer - Target text layer
         * @param {number} start - Start index
         * @param {number} end - End index
         * @returns {ParagraphRange} Paragraph range object
         */
        getParagraphRange: function(layer, start, end) {
            if (!layer) return null;
            return new ParagraphRange(layer, start, end);
        },

        /**
         * Get available fonts
         * @returns {FontsObject} Fonts collection
         */
        getFonts: function() {
            return app.fonts;
        },

        /**
         * Create font object
         * @param {string} fontName - Font name
         * @returns {FontObject} Font object
         */
        getFont: function(fontName) {
            return new FontObject(fontName);
        }
    };

    // =========================================================================
    // SHAPE LAYER MANAGEMENT
    // =========================================================================

    /**
     * Shape layer creation and manipulation
     * @namespace
     */
    AEFramework.shape = {
        /**
         * Add rectangle shape to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Rectangle shape property
         */
        addRectangle: function(layer) {
            if (!layer) return null;
            var content = layer.property("ADBE Root Vectors Group");
            return content.addProperty("ADBE Vector Shape - Rect");
        },

        /**
         * Add ellipse shape to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Ellipse shape property
         */
        addEllipse: function(layer) {
            if (!layer) return null;
            var content = layer.property("ADBE Root Vectors Group");
            return content.addProperty("ADBE Vector Shape - Ellipse");
        },

        /**
         * Add path to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Path property
         */
        addPath: function(layer) {
            if (!layer) return null;
            var content = layer.property("ADBE Root Vectors Group");
            return content.addProperty("ADBE Vector Shape - Group");
        },

        /**
         * Add stroke to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Stroke property
         */
        addStroke: function(layer) {
            if (!layer) return null;
            var content = layer.property("ADBE Root Vectors Group");
            return content.addProperty("ADBE Vector Graphic - Stroke");
        },

        /**
         * Add fill to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Fill property
         */
        addFill: function(layer) {
            if (!layer) return null;
            var content = layer.property("ADBE Root Vectors Group");
            return content.addProperty("ADBE Vector Graphic - Fill");
        },

        /**
         * Set path vertices and tangents
         * @param {Property} shape - Path property
         * @param {Array} vertices - Path vertices
         * @param {Array} inTangents - In tangent points
         * @param {Array} outTangents - Out tangent points
         * @param {boolean} closed - Closed path
         * @returns {AEFramework} Chainable
         */
        setPath: function(shape, vertices, inTangents, outTangents, closed) {
            if (shape) {
                var path = new Shape();
                path.vertices = vertices;
                path.inTangents = inTangents;
                path.outTangents = outTangents;
                path.closed = closed !== false;
                shape.setValue(path);
            }
            return this;
        }
    };

    // =========================================================================
    // 3D LAYER MANAGEMENT
    // =========================================================================

    /**
     * 3D layer properties and transformations
     * @namespace
     */
    AEFramework.threeD = {
        /**
         * Enable or disable 3D for layer
         * @param {Layer} layer - Target layer
         * @param {boolean} enabled - 3D enabled state
         * @returns {AEFramework} Chainable
         */
        enable3D: function(layer, enabled) {
            if (layer) layer.threeDLayer = enabled !== false;
            return this;
        },

        /**
         * Set 3D position
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X position
         * @param {number} y - Y position
         * @param {number} z - Z position
         * @returns {AEFramework} Chainable
         */
        setPosition: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                layer.property("Position").setValue([x, y, z || 0]);
            }
            return this;
        },

        /**
         * Set 3D orientation
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X orientation
         * @param {number} y - Y orientation
         * @param {number} z - Z orientation
         * @returns {AEFramework} Chainable
         */
        setOrientation: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                layer.property("Orientation").setValue([x, y, z || 0]);
            }
            return this;
        },

        /**
         * Set 3D rotation
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X rotation
         * @param {number} y - Y rotation
         * @param {number} z - Z rotation
         * @returns {AEFramework} Chainable
         */
        setRotation: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                if (x !== undefined) layer.property("X Rotation").setValue(x);
                if (y !== undefined) layer.property("Y Rotation").setValue(y);
                if (z !== undefined) layer.property("Z Rotation").setValue(z);
            }
            return this;
        },

        /**
         * Set 3D anchor point
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X anchor point
         * @param {number} y - Y anchor point
         * @param {number} z - Z anchor point
         * @returns {AEFramework} Chainable
         */
        setAnchorPoint: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                layer.property("Anchor Point").setValue([x, y, z || 0]);
            }
            return this;
        }
    };

    // =========================================================================
    // CAMERA LAYER MANAGEMENT
    // =========================================================================

    /**
     * Camera layer specific properties
     * @namespace
     */
    AEFramework.camera = {
        /**
         * Set camera zoom
         * @param {CameraLayer} camera - Target camera
         * @param {number} zoom - Zoom value
         * @returns {AEFramework} Chainable
         */
        setZoom: function(camera, zoom) {
            if (camera) camera.property("Zoom").setValue(zoom);
            return this;
        },

        /**
         * Set focus distance
         * @param {CameraLayer} camera - Target camera
         * @param {number} distance - Focus distance
         * @returns {AEFramework} Chainable
         */
        setFocusDistance: function(camera, distance) {
            if (camera) camera.property("Focus Distance").setValue(distance);
            return this;
        },

        /**
         * Set aperture size
         * @param {CameraLayer} camera - Target camera
         * @param {number} aperture - Aperture value
         * @returns {AEFramework} Chainable
         */
        setAperture: function(camera, aperture) {
            if (camera) camera.property("Aperture").setValue(aperture);
            return this;
        },

        /**
         * Set blur level
         * @param {CameraLayer} camera - Target camera
         * @param {number} blurLevel - Blur level
         * @returns {AEFramework} Chainable
         */
        setBlurLevel: function(camera, blurLevel) {
            if (camera) camera.property("Blur Level").setValue(blurLevel);
            return this;
        }
    };

    // =========================================================================
    // LIGHT LAYER MANAGEMENT
    // =========================================================================

    /**
     * Light layer specific properties
     * @namespace
     */
    AEFramework.light = {
        /**
         * Set light intensity
         * @param {LightLayer} light - Target light
         * @param {number} intensity - Light intensity
         * @returns {AEFramework} Chainable
         */
        setIntensity: function(light, intensity) {
            if (light) light.property("Intensity").setValue(intensity);
            return this;
        },

        /**
         * Set light color
         * @param {LightLayer} light - Target light
         * @param {Array} color - Light color [r, g, b]
         * @returns {AEFramework} Chainable
         */
        setColor: function(light, color) {
            if (light) light.property("Color").setValue(color);
            return this;
        },

        /**
         * Set cone angle (spot lights)
         * @param {LightLayer} light - Target light
         * @param {number} angle - Cone angle
         * @returns {AEFramework} Chainable
         */
        setConeAngle: function(light, angle) {
            if (light) light.property("Cone Angle").setValue(angle);
            return this;
        },

        /**
         * Set cone feather (spot lights)
         * @param {LightLayer} light - Target light
         * @param {number} feather - Cone feather
         * @returns {AEFramework} Chainable
         */
        setConeFeather: function(light, feather) {
            if (light) light.property("Cone Feather").setValue(feather);
            return this;
        },

        /**
         * Set shadow darkness
         * @param {LightLayer} light - Target light
         * @param {number} darkness - Shadow darkness
         * @returns {AEFramework} Chainable
         */
        setShadowDarkness: function(light, darkness) {
            if (light) light.property("Shadow Darkness").setValue(darkness);
            return this;
        }
    };

    // =========================================================================
    // PROPERTY MANAGEMENT
    // =========================================================================

    /**
     * Property manipulation and keyframing
     * @namespace
     */
    AEFramework.property = {
        /**
         * Get property from layer
         * @param {Layer} layer - Target layer
         * @param {string} propertyName - Property name
         * @returns {Property} Property or null
         */
        get: function(layer, propertyName) {
            if (!layer) return null;
            return layer.property(propertyName);
        },

        /**
         * Get property group from layer
         * @param {Layer} layer - Target layer
         * @param {string} groupName - Property group name
         * @returns {PropertyGroup} Property group or null
         */
        getPropertyGroup: function(layer, groupName) {
            if (!layer) return null;
            return layer.property(groupName);
        },

        /**
         * Set property value
         * @param {Property} property - Target property
         * @param {*} value - Property value
         * @returns {AEFramework} Chainable
         */
        setValue: function(property, value) {
            if (property) property.setValue(value);
            return this;
        },

        /**
         * Set property value at specific time
         * @param {Property} property - Target property
         * @param {number} time - Time in seconds
         * @param {*} value - Property value
         * @returns {AEFramework} Chainable
         */
        setValueAtTime: function(property, time, value) {
            if (property && property.isTimeVarying) {
                property.setValueAtTime(time, value);
            }
            return this;
        },

        /**
         * Set multiple values at multiple times
         * @param {Property} property - Target property
         * @param {Array} times - Array of times
         * @param {Array} values - Array of values
         * @returns {AEFramework} Chainable
         */
        setValuesAtTimes: function(property, times, values) {
            if (property && property.isTimeVarying && times.length === values.length) {
                for (var i = 0; i < times.length; i++) {
                    property.setValueAtTime(times[i], values[i]);
                }
            }
            return this;
        },

        /**
         * Add keyframe at time
         * @param {Property} property - Target property
         * @param {number} time - Time in seconds
         * @param {*} value - Keyframe value
         * @returns {AEFramework} Chainable
         */
        addKeyframe: function(property, time, value) {
            if (property && property.isTimeVarying) {
                property.setValueAtTime(time, value);
            }
            return this;
        },

        /**
         * Remove keyframe by index
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {AEFramework} Chainable
         */
        removeKeyframe: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                property.removeKey(keyframeIndex + 1); // AE uses 1-based indexing
            }
            return this;
        },

        /**
         * Set keyframe interpolation type
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {KeyframeInterpolationType} inType - In interpolation type
         * @param {KeyframeInterpolationType} outType - Out interpolation type
         * @returns {AEFramework} Chainable
         */
        setInterpolationType: function(property, keyIndex, inType, outType) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                if (inType) property.setInterpolationTypeAtKey(keyIndex + 1, inType);
                if (outType) property.setInterpolationTypeAtKey(keyIndex + 1, undefined, outType);
            }
            return this;
        },

        /**
         * Set keyframe temporal ease
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {KeyframeEase} inEase - In ease
         * @param {KeyframeEase} outEase - Out ease
         * @returns {AEFramework} Chainable
         */
        setTemporalEase: function(property, keyIndex, inEase, outEase) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                property.setTemporalEaseAtKey(keyIndex + 1, inEase, outEase);
            }
            return this;
        }
    };

    // =========================================================================
    // EXPRESSIONS MANAGEMENT
    // =========================================================================

    /**
     * Expression creation and management
     * @namespace
     */
    AEFramework.expression = {
        /**
         * Set expression on property
         * @param {Property} property - Target property
         * @param {string} expression - Expression code
         * @returns {AEFramework} Chainable
         */
        set: function(property, expression) {
            if (property) {
                property.expression = expression;
            }
            return this;
        },

        /**
         * Enable or disable expression
         * @param {Property} property - Target property
         * @param {boolean} enabled - Expression enabled state
         * @returns {AEFramework} Chainable
         */
        setEnabled: function(property, enabled) {
            if (property) {
                property.expressionEnabled = enabled !== false;
            }
            return this;
        },

        /**
         * Create wiggle expression
         * @param {Property} property - Target property
         * @param {number} frequency - Wiggle frequency
         * @param {number} amplitude - Wiggle amplitude
         * @param {number} octaves - Wiggle octaves
         * @returns {AEFramework} Chainable
         */
        setWiggler: function(property, frequency, amplitude, octaves) {
            var expr = "freq = " + (frequency || 3) + ";\n";
            expr += "amp = " + (amplitude || 20) + ";\n";
            expr += "octaves = " + (octaves || 1) + ";\n";
            expr += "t = time * freq;\n";
            expr += "value + [Math.sin(t)*amp, Math.cos(t)*amp];";

            if (property) property.expression = expr;
            return this;
        },

        /**
         * Create loop expression
         * @param {Property} property - Target property
         * @param {string} loopType - Loop type: 'cycle', 'pingpong', 'offset', 'continue'
         * @param {number} duration - Loop duration
         * @returns {AEFramework} Chainable
         */
        setLoop: function(property, loopType, duration) {
            var expr = "";
            switch(loopType) {
                case 'cycle':
                    expr = "loopOut('cycle');";
                    break;
                case 'pingpong':
                    expr = "loopOut('pingpong');";
                    break;
                case 'offset':
                    expr = "loopOut('offset');";
                    break;
                case 'continue':
                    expr = "loopOut('continue');";
                    break;
                default:
                    expr = "loopOut('cycle');";
            }
            if (property) property.expression = expr;
            return this;
        },

        /**
         * Link property to another property
         * @param {Property} property - Source property
         * @param {Property} targetProperty - Target property to link to
         * @returns {AEFramework} Chainable
         */
        linkToProperty: function(property, targetProperty) {
            if (property && targetProperty) {
                property.expression = "thisComp.layer('" + targetProperty.layer.name + "').'" + 
                                    targetProperty.matchName + "';";
            }
            return this;
        },

        /**
         * Set time remap expression
         * @param {Layer} layer - Target layer with time remap
         * @param {string} expression - Time remap expression
         * @returns {AEFramework} Chainable
         */
        setTimeRemap: function(layer, expression) {
            if (layer && layer.timeRemapEnabled) {
                layer.property("Time Remap").expression = expression;
            }
            return this;
        }
    };

    // =========================================================================
    // EFFECTS MANAGEMENT
    // =========================================================================

    /**
     * Effects application and manipulation
     * @namespace
     */
    AEFramework.effects = {
        /**
         * Add effect to layer
         * @param {Layer} layer - Target layer
         * @param {string} effectName - Effect name
         * @returns {PropertyGroup} Effect property group
         */
        add: function(layer, effectName) {
            if (!layer) return null;
            return layer.property("ADBE Effect Parade").addProperty(effectName);
        },

        /**
         * Add effect by match name
         * @param {Layer} layer - Target layer
         * @param {string} matchName - Effect match name
         * @returns {PropertyGroup} Effect property group
         */
        addByMatchName: function(layer, matchName) {
            if (!layer) return null;
            return layer.property("ADBE Effect Parade").addProperty(matchName);
        },

        /**
         * Remove effect from layer
         * @param {Layer} layer - Target layer
         * @param {number} effectIndex - Effect index (1-based)
         * @returns {AEFramework} Chainable
         */
        remove: function(layer, effectIndex) {
            if (!layer) return this;
            var effects = layer.property("ADBE Effect Parade");
            if (effects && effects.numProperties >= effectIndex) {
                effects.property(effectIndex).remove();
            }
            return this;
        },

        /**
         * Remove all effects from layer
         * @param {Layer} layer - Target layer
         * @returns {AEFramework} Chainable
         */
        removeAll: function(layer) {
            if (!layer) return this;
            var effects = layer.property("ADBE Effect Parade");
            if (effects) {
                while (effects.numProperties > 0) {
                    effects.property(1).remove();
                }
            }
            return this;
        },

        /**
         * Get all effects from layer
         * @param {Layer} layer - Target layer
         * @returns {Array} Array of effects
         */
        getAll: function(layer) {
            if (!layer) return [];
            var effects = [];
            var effectGroup = layer.property("ADBE Effect Parade");
            if (effectGroup) {
                for (var i = 1; i <= effectGroup.numProperties; i++) {
                    effects.push(effectGroup.property(i));
                }
            }
            return effects;
        },

        /**
         * Get effect by name
         * @param {Layer} layer - Target layer
         * @param {string} effectName - Effect name
         * @returns {PropertyGroup} Effect or null
         */
        getByName: function(layer, effectName) {
            if (!layer) return null;
            var effectGroup = layer.property("ADBE Effect Parade");
            if (effectGroup) {
                for (var i = 1; i <= effectGroup.numProperties; i++) {
                    var effect = effectGroup.property(i);
                    if (effect.name === effectName) {
                        return effect;
                    }
                }
            }
            return null;
        },

        /**
         * Set effect property value
         * @param {PropertyGroup} effect - Target effect
         * @param {string} propertyName - Property name
         * @param {*} value - Property value
         * @returns {AEFramework} Chainable
         */
        setProperty: function(effect, propertyName, value) {
            if (!effect) return this;
            var prop = effect.property(propertyName);
            if (prop) {
                prop.setValue(value);
            }
            return this;
        },

        /**
         * Set effect property by match name
         * @param {PropertyGroup} effect - Target effect
         * @param {string} matchName - Property match name
         * @param {*} value - Property value
         * @returns {AEFramework} Chainable
         */
        setPropertyByMatchName: function(effect, matchName, value) {
            if (!effect) return this;
            var prop = effect.property(matchName);
            if (prop) {
                prop.setValue(value);
            }
            return this;
        },

        /**
         * Animate effect property with keyframes
         * @param {PropertyGroup} effect - Target effect
         * @param {string} propertyName - Property name
         * @param {Array} keyframes - Array of keyframe objects
         * @returns {AEFramework} Chainable
         */
        animateProperty: function(effect, propertyName, keyframes) {
            if (!effect) return this;
            var prop = effect.property(propertyName);
            if (prop && prop.isTimeVarying) {
                for (var i = 0; i < keyframes.length; i++) {
                    prop.setValueAtTime(keyframes[i].time, keyframes[i].value);
                }
            }
            return this;
        },

        /**
         * Common first-party effect match names
         * @type {Object}
         */
        effectsList: {
            // Color effects
            "Brightness & Contrast": "ADBE Brightness & Contrast",
            "Levels": "ADBE Levels",
            "Curves": "ADBE Curves",
            "Hue/Saturation": "ADBE Hue/Saturation",
            "Color Balance": "ADBE Color Balance",
            "Tint": "ADBE Tint",
            
            // Blur effects
            "Gaussian Blur": "ADBE Gaussian Blur",
            "Fast Blur": "ADBE Fast Blur",
            "Directional Blur": "ADBE directionalBlur",
            "Radial Blur": "ADBE Radial Blur",
            
            // Distortion effects
            "Corner Pin": "ADBE Corner Pin",
            "Displacement Map": "ADBE Displacement Map",
            "Lens Distortion": "ADBE Lens Distortion",
            "Warp": "ADBE Warp",
            
            // Generate effects
            "4-Color Gradient": "ADBE Four Color Gradient",
            "Ramp": "ADBE Ramp",
            "Circle": "ADBE Circle",
            "Ellipse": "ADBE Ellipse",
            "Stroke": "ADBE Stroke",
            
            // Keying effects
            "Keylight": "ADBE Keylight",
            "Color Difference Key": "ADBE Color Difference Key",
            
            // Matte effects
            "Simple Choker": "ADBE Simple Choker",
            "Matte Choker": "ADBE Matte Choker"
        }
    };

    // =========================================================================
    // RENDER QUEUE MANAGEMENT
    // =========================================================================

    /**
     * Render queue control and output management
     * @namespace
     */
    AEFramework.render = {
        /**
         * Add composition to render queue
         * @param {CompItem} comp - Composition to render
         * @returns {RenderQueueItem} Render queue item
         */
        addToQueue: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return null;
            return app.project.renderQueue.items.add(comp);
        },

        /**
         * Remove item from render queue
         * @param {RenderQueueItem} renderItem - Render queue item
         * @returns {AEFramework} Chainable
         */
        removeFromQueue: function(renderItem) {
            if (renderItem) renderItem.remove();
            return this;
        },

        /**
         * Clear entire render queue
         * @returns {AEFramework} Chainable
         */
        clearQueue: function() {
            app.project.renderQueue.items.removeAll();
            return this;
        },

        /**
         * Set output module template
         * @param {RenderQueueItem} renderItem - Render queue item
         * @param {string} templateName - Output template name
         * @returns {AEFramework} Chainable
         */
        setOutputModule: function(renderItem, templateName) {
            if (!renderItem) return this;
            var om = renderItem.outputModule(1);
            if (om && templateName) {
                om.applyTemplate(templateName);
            }
            return this;
        },

        /**
         * Set output file path
         * @param {RenderQueueItem} renderItem - Render queue item
         * @param {string} filepath - Output file path
         * @returns {AEFramework} Chainable
         */
        setOutputFile: function(renderItem, filepath) {
            if (!renderItem) return this;
            var om = renderItem.outputModule(1);
            if (om) {
                om.file = new File(filepath);
            }
            return this;
        },

        /**
         * Set render settings template
         * @param {RenderQueueItem} renderItem - Render queue item
         * @param {string} templateName - Render settings template
         * @returns {AEFramework} Chainable
         */
        setRenderSettings: function(renderItem, templateName) {
            if (!renderItem) return this;
            if (templateName) {
                renderItem.applyTemplate(templateName);
            }
            return this;
        },

        /**
         * Start rendering
         * @returns {AEFramework} Chainable
         */
        startRender: function() {
            app.project.renderQueue.render();
            return this;
        },

        /**
         * Stop rendering
         * @returns {AEFramework} Chainable
         */
        stopRender: function() {
            app.project.renderQueue.stopRendering();
            return this;
        },

        /**
         * Pause rendering
         * @returns {AEFramework} Chainable
         */
        pauseRender: function() {
            app.project.renderQueue.pauseRendering();
            return this;
        },

        /**
         * Get render queue items
         * @returns {Array} Array of render queue items
         */
        getQueue: function() {
            var items = [];
            for (var i = 1; i <= app.project.renderQueue.items.length; i++) {
                items.push(app.project.renderQueue.items[i]);
            }
            return items;
        },

        /**
         * Get render status
         * @returns {boolean} True if currently rendering
         */
        getStatus: function() {
            return app.project.renderQueue.rendering;
        }
    };

    // =========================================================================
    // MASK MANAGEMENT
    // =========================================================================

    /**
     * Mask creation and manipulation
     * @namespace
     */
    AEFramework.mask = {
        /**
         * Create mask on layer
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        create: function(layer) {
            if (!layer) return null;
            return layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        },

        /**
         * Create elliptical mask
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        createEllipse: function(layer) {
            if (!layer) return null;
            var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
            mask.property("ADBE Mask Shape").setValue(createMaskEllipse());
            return mask;
        },

        /**
         * Create rectangular mask
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        createRectangle: function(layer) {
            if (!layer) return null;
            var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
            mask.property("ADBE Mask Shape").setValue(createMaskRect());
            return mask;
        },

        /**
         * Set mask path vertices
         * @param {PropertyGroup} mask - Mask property group
         * @param {Array} vertices - Mask vertices
         * @returns {AEFramework} Chainable
         */
        setPath: function(mask, vertices) {
            if (mask) {
                var shape = mask.property("ADBE Mask Shape").value;
                shape.vertices = vertices;
                mask.property("ADBE Mask Shape").setValue(shape);
            }
            return this;
        },

        /**
         * Set mask feather
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} feather - Feather amount
         * @returns {AEFramework} Chainable
         */
        setFeather: function(mask, feather) {
            if (mask) mask.property("ADBE Mask Feather").setValue(feather);
            return this;
        },

        /**
         * Set mask opacity
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} opacity - Opacity percentage
         * @returns {AEFramework} Chainable
         */
        setOpacity: function(mask, opacity) {
            if (mask) mask.property("ADBE Mask Opacity").setValue(opacity);
            return this;
        },

        /**
         * Set mask blending mode
         * @param {PropertyGroup} mask - Mask property group
         * @param {MaskMode} mode - Mask mode
         * @returns {AEFramework} Chainable
         */
        setMode: function(mask, mode) {
            if (mask) mask.property("ADBE Mask Mode").setValue(mode);
            return this;
        }
    };

    // =========================================================================
    // MARKER MANAGEMENT
    // =========================================================================

    /**
     * Layer marker creation and management
     * @namespace
     */
    AEFramework.marker = {
        /**
         * Add marker to layer
         * @param {Layer} layer - Target layer
         * @param {number} time - Marker time
         * @param {string} comment - Marker comment
         * @returns {Property} Marker property
         */
        add: function(layer, time, comment) {
            if (!layer) return null;
            var marker = layer.property("Marker").setValueAtTime(time, new MarkerValue(comment));
            return marker;
        },

        /**
         * Remove marker from layer
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @returns {AEFramework} Chainable
         */
        remove: function(layer, markerIndex) {
            if (!layer) return this;
            var markers = layer.property("Marker");
            if (markers && markers.numKeys >= markerIndex) {
                markers.removeKey(markerIndex + 1);
            }
            return this;
        },

        /**
         * Set marker comment
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @param {string} comment - New comment
         * @returns {AEFramework} Chainable
         */
        setComment: function(layer, markerIndex, comment) {
            if (!layer) return this;
            var markers = layer.property("Marker");
            if (markers && markers.numKeys >= markerIndex) {
                var markerValue = markers.keyValue(markerIndex + 1);
                markerValue.comment = comment;
                markers.setValueAtKey(markerIndex + 1, markerValue);
            }
            return this;
        },

        /**
         * Set marker duration
         * @param {Layer} layer - Target layer
         * @param {number} markerIndex - Marker index (0-based)
         * @param {number} duration - Marker duration
         * @returns {AEFramework} Chainable
         */
        setDuration: function(layer, markerIndex, duration) {
            if (!layer) return this;
            var markers = layer.property("Marker");
            if (markers && markers.numKeys >= markerIndex) {
                var markerValue = markers.keyValue(markerIndex + 1);
                markerValue.duration = duration;
                markers.setValueAtKey(markerIndex + 1, markerValue);
            }
            return this;
        }
    };

    // =========================================================================
    // COMPOSITION-BASED FUNCTION SYSTEM
    // =========================================================================

    /**
     * Direct composition targeting system (nexrender premium style)
     * @namespace
     */
    AEFramework.composition = {
        /**
         * Set text parameters in any composition
         * @param {Object} params - Text parameters
         * @returns {Object} Execution result
         */
        setTextParams: function(params) {
            var comp = this.getByName(params.composition);
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
        },

        /**
         * Set multiple text parameters in batch
         * @param {Array} textParamsArray - Array of text parameter objects
         * @returns {Array} Array of results
         */
        setMultipleTextParams: function(textParamsArray) {
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
        },

        /**
         * Set layer properties in any composition
         * @param {Object} params - Layer property parameters
         * @returns {Object} Execution result
         */
        setLayerProperty: function(params) {
            var comp = this.getByName(params.composition);
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
                        ae.property.setTemporalEase(property, i, kf.easeIn, kf.easeOut);
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
        }
    };

    // =========================================================================
    // FUNCTION EXECUTION SYSTEM
    // =========================================================================

    /**
     * Nexrender-style function execution system
     * @namespace
     */
    AEFramework.functions = {
        /**
         * Execute a function with parameters
         * @param {string} name - Function name
         * @param {Object} params - Function parameters
         * @returns {Object} Execution result
         */
        execute: function(name, params) {
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
        },

        /**
         * Set text parameters in any composition
         * @param {Object} params - Text parameters
         * @returns {Object} Execution result
         */
        textParamsSet: function(params) {
            return AEFramework.composition.setTextParams(params);
        },

        /**
         * Set layer properties in any composition
         * @param {Object} params - Layer property parameters
         * @returns {Object} Execution result
         */
        layerPropertySet: function(params) {
            return AEFramework.composition.setLayerProperty(params);
        },

        /**
         * Set effect properties in any composition
         * @param {Object} params - Effect property parameters
         * @returns {Object} Execution result
         */
        effectPropertySet: function(params) {
            var comp = AEFramework.comp.getByName(params.composition);
            if (!comp) {
                throw new Error("Composition '" + params.composition + "' not found");
            }

            var layer = ae.layer.getByName(comp, params.layerName);
            if (!layer) {
                throw new Error("Layer '" + params.layerName + "' not found");
            }

            var effect = ae.effects.getByName(layer, params.effectName);
            if (!effect) {
                // Effect doesn't exist, try to add it
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
        },

        /**
         * Render a specific composition
         * @param {Object} params - Render parameters
         * @returns {Object} Execution result
         */
        compositionRender: function(params) {
            var comp = AEFramework.comp.getByName(params.composition);
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

    // =========================================================================
    // UTILITIES
    // =========================================================================

    /**
     * Utility functions and helpers
     * @namespace
     */
    AEFramework.utils = {
        /**
         * Convert time to frames
         * @param {number} time - Time in seconds
         * @param {number} [frameRate=30] - Frame rate
         * @returns {number} Frame number
         */
        timeToFrames: function(time, frameRate) {
            return Math.round(time * (frameRate || 30));
        },

        /**
         * Convert frames to time
         * @param {number} frames - Frame number
         * @param {number} [frameRate=30] - Frame rate
         * @returns {number} Time in seconds
         */
        framesToTime: function(frames, frameRate) {
            return frames / (frameRate || 30);
        },

        /**
         * Create color array
         * @param {number} r - Red (0-255)
         * @param {number} g - Green (0-255)
         * @param {number} b - Blue (0-255)
         * @param {number} [a=1] - Alpha (0-1)
         * @returns {Array} Color array [r, g, b, a]
         */
        createColor: function(r, g, b, a) {
            return [r/255, g/255, b/255, a !== undefined ? a : 1];
        },

        /**
         * Create 2D point
         * @param {number} x - X coordinate
         * @param {number} y - Y coordinate
         * @returns {Array} Point array [x, y]
         */
        createPoint: function(x, y) {
            return [x, y];
        },

        /**
         * Create 3D point
         * @param {number} x - X coordinate
         * @param {number} y - Y coordinate
         * @param {number} z - Z coordinate
         * @returns {Array} Point array [x, y, z]
         */
        createPoint3D: function(x, y, z) {
            return [x, y, z];
        },

        /**
         * Create keyframe ease
         * @param {number} speed - Ease speed
         * @param {number} influence - Ease influence
         * @returns {KeyframeEase} Keyframe ease object
         */
        createKeyframeEase: function(speed, influence) {
            return new KeyframeEase(speed, influence);
        },

        /**
         * Create shape object
         * @param {Array} vertices - Shape vertices
         * @param {Array} inTangents - In tangent points
         * @param {Array} outTangents - Out tangent points
         * @param {boolean} [closed=true] - Closed path
         * @returns {Shape} Shape object
         */
        createShape: function(vertices, inTangents, outTangents, closed) {
            var shape = new Shape();
            shape.vertices = vertices;
            shape.inTangents = inTangents;
            shape.outTangents = outTangents;
            shape.closed = closed !== false;
            return shape;
        },

        /**
         * Show alert dialog
         * @param {string} message - Alert message
         * @returns {AEFramework} Chainable
         */
        alert: function(message) {
            alert(message);
            return this;
        },

        /**
         * Log message to console
         * @param {string} message - Log message
         * @returns {AEFramework} Chainable
         */
        log: function(message) {
            $.writeln(message);
            return this;
        },

        /**
         * Sleep for milliseconds
         * @param {number} ms - Milliseconds to sleep
         * @returns {AEFramework} Chainable
         */
        sleep: function(ms) {
            var start = new Date().getTime();
            while (new Date().getTime() - start < ms);
            return this;
        },

        /**
         * Enable or disable debug mode
         * @param {boolean} enabled - Debug enabled
         * @returns {AEFramework} Chainable
         */
        setDebug: function(enabled) {
            AEFramework.debug = enabled;
            return this;
        }
    };

    // =========================================================================
    // MATCH NAMES REFERENCE
    // =========================================================================

    /**
     * Match names reference for layers and properties
     * @namespace
     */
    AEFramework.matchNames = {
        layers: {
            avLayer: "ADBE AV Layer",
            textLayer: "ADBE Text Layer",
            shapeLayer: "ADBE Vector Layer",
            cameraLayer: "ADBE Camera Layer",
            lightLayer: "ADBE Light Layer"
        },
        
        properties: {
            position: "ADBE Position",
            scale: "ADBE Scale",
            rotation: "ADBE Rotation",
            opacity: "ADBE Opacity",
            anchorPoint: "ADBE AnchorPoint",
            marker: "ADBE Marker",
            timeRemap: "ADBE Time Remapping",
            audioLevels: "ADBE Audio Levels"
        },
        
        effects: AEFramework.effects.effectsList
    };

    // =========================================================================
    // INITIALIZATION AND EXPORT
    // =========================================================================

    // Add composition methods to comp namespace for backward compatibility
    AEFramework.comp.getByName = AEFramework.comp.getByName;

    // Export the framework
    return AEFramework;
}));