/**
 * After Effects Scripting Framework
 * @version 2.0.0
 * @description A comprehensive JavaScript library for automating Adobe After Effects
 * @license MIT
 * @built 2026-05-28T14:32:57.688Z
 */

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.ae = factory();
    }
}(this, function() {
    'use strict';

    var ae; // This will hold our AEFramework instance

    // --- core/framework.js ---

    'use strict';

    // =========================================================================
    // CORE FRAMEWORK INITIALIZATION
    // =========================================================================

    ae = {
        version: "2.0.0",
        aeVersion: "2023+",
        debug: false,

        // Configuration
        config: {
            autoSave: true,
            errorHandling: true,
            logging: true
        },

        // Initialize framework
        init: function(options) {
            if (options) {
                this.config = Object.assign(this.config, options);
            }

            if (this.config.logging) {
                this.log('AEFramework initialized v' + this.version);
            }

            return this;
        },

        // Error handling
        handleError: function(error, context) {
            if (!this.config.errorHandling) throw error;

            var message = 'AEFramework Error: ' + error.message;
            if (context) message += ' (' + context + ')';

            this.log(message);

            if (this.config.logging) {
                alert(message);
            }

            return {
                success: false,
                error: message,
                context: context
            };
        },

        // Logging
        log: function(message) {
            if (this.config.logging && typeof $ !== 'undefined') {
                $.writeln('[AEFramework] ' + message);
            }
        }
    };



    // --- core/utils.js ---
/**
 * Utility functions and helpers
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.utils = {
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
         * Validate composition exists
         * @param {string} compName - Composition name
         * @returns {boolean} True if composition exists
         */
        validateComp: function(compName) {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem && item.name === compName) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Validate layer exists in composition
         * @param {CompItem} comp - Composition
         * @param {string} layerName - Layer name
         * @returns {boolean} True if layer exists
         */
        validateLayer: function(comp, layerName) {
            if (!comp || !(comp instanceof CompItem)) return false;
            return comp.layer(layerName) !== null;
        },

        /**
         * Show alert dialog
         * @param {string} message - Alert message
         * @returns {ae} Chainable
         */
        alert: function(message) {
            alert(message);
            return ae;
        },

        /**
         * Log message to console
         * @param {string} message - Log message
         * @returns {ae} Chainable
         */
        log: function(message) {
            $.writeln(message);
            return ae;
        },

        /**
         * Sleep for milliseconds
         * @param {number} ms - Milliseconds to sleep
         * @returns {ae} Chainable
         */
        sleep: function(ms) {
            var start = new Date().getTime();
            while (new Date().getTime() - start < ms);
            return ae;
        }
    };
}(ae));

    // --- core/index.js ---
/**
 * Core framework exports
 */

// Import core modules
// (included in bundle)
// (included in bundle)

// Export the complete framework
(function(ae) {
    // Public API
    ae.core = {
        version: ae.version,
        init: ae.init,
        config: ae.config,
        handleError: ae.handleError,
        log: ae.log,
        utils: ae.utils
    };
}(ae));

    // --- application/app.js ---
/**
 * Application-level controls and information
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.app = {
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
         * @returns {ae} Chainable
         */
        exit: function(force) {
            if (force) {
                app.quit();
            } else {
                app.quit(SaveOptions.DO_NOT_SAVE_CHANGES);
            }
            return ae;
        },

        /**
         * Execute a menu command by ID
         * @param {string} commandID - Command identifier
         * @returns {ae} Chainable
         */
        executeCommand: function(commandID) {
            app.executeCommand(commandID);
            return ae;
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
         * @returns {ae} Chainable
         */
        setMemoryLimit: function(imageCache, maxMemory) {
            app.setMemoryUsageLimits(imageCache, maxMemory);
            return ae;
        },

        /**
         * Purge memory caches
         * @param {string} target - Cache type: 'all', 'undo', 'image', 'snapshot'
         * @returns {ae} Chainable
         */
        purge: function(target) {
            var purgeTarget;
            switch(target) {
                case 'all': purgeTarget = PurgeTarget.ALL_CACHES; break;
                case 'undo': purgeTarget = PurgeTarget.UNDO_CACHES; break;
                case 'image': purgeTarget = PurgeTarget.IMAGE_CACHES; break;
                case 'snapshot': purgeTarget = PurgeTarget.SNAPSHOT_CACHES; break;
                default: purgeTarget = PurgeTarget.ALL_CACHES;
            }
            app.purge(purgeTarget);
            return ae;
        },

        /**
         * Get application settings
         * @returns {Settings} Application settings object
         */
        getSettings: function() {
            return app.settings;
        },

        /**
         * Check if After Effects is available
         * @returns {boolean} True if AE is running
         */
        isAvailable: function() {
            return typeof app !== 'undefined' && app instanceof Application;
        }
    };
}(ae));

    // --- application/index.js ---
/**
 * Application module exports
 */

// Import application modules
// (included in bundle)

// Export application namespace
(function(ae) {
    ae.application = ae.app;
}(ae));

    // --- project/items.js ---
/**
 * Project items management and operations
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.items = {
        /**
         * Get all items in the project
         * @returns {Array} Array of project items
         */
        getAll: function() {
            var items = [];
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    items.push(app.project.item(i));
                }
            } catch (error) {
                ae.handleError(error, 'items.getAll');
            }
            return items;
        },

        /**
         * Get items by type
         * @param {string} itemType - Item type: 'composition', 'folder', 'footage', 'solid'
         * @returns {Array} Array of items of specified type
         */
        getByType: function(itemType) {
            var items = [];
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    var include = false;

                    switch(itemType.toLowerCase()) {
                        case 'composition':
                            include = item instanceof CompItem;
                            break;
                        case 'folder':
                            include = item instanceof FolderItem;
                            break;
                        case 'footage':
                            include = item instanceof FootageItem;
                            break;
                        case 'solid':
                            include = (item instanceof FootageItem && item.mainSource instanceof SolidSource);
                            break;
                        case 'placeholder':
                            include = (item instanceof FootageItem && item.mainSource instanceof PlaceholderSource);
                            break;
                        default:
                            include = false;
                    }

                    if (include) {
                        items.push(item);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.getByType');
            }
            return items;
        },

        /**
         * Get item by ID
         * @param {number} id - Item ID
         * @returns {Item} Item or null
         */
        getByID: function(id) {
            try {
                return app.project.itemByID(id);
            } catch (error) {
                ae.handleError(error, 'items.getByID');
                return null;
            }
        },

        /**
         * Get item by name
         * @param {string} name - Item name
         * @returns {Item} Item or null
         */
        getByName: function(name) {
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    if (item.name === name) {
                        return item;
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.getByName');
            }
            return null;
        },

        /**
         * Find items by name pattern (regex or string)
         * @param {string|RegExp} pattern - Search pattern
         * @returns {Array} Array of matching items
         */
        findByName: function(pattern) {
            var matches = [];
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    var matchesPattern = false;

                    if (pattern instanceof RegExp) {
                        matchesPattern = pattern.test(item.name);
                    } else {
                        matchesPattern = item.name.indexOf(pattern) !== -1;
                    }

                    if (matchesPattern) {
                        matches.push(item);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.findByName');
            }
            return matches;
        },

        /**
         * Get root folder items
         * @returns {Array} Array of items in root folder
         */
        getRootItems: function() {
            var rootItems = [];
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    if (!item.parentFolder || item.parentFolder === app.project.rootFolder) {
                        rootItems.push(item);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.getRootItems');
            }
            return rootItems;
        },

        /**
         * Create a new folder
         * @param {string} name - Folder name
         * @returns {FolderItem} New folder
         */
        createFolder: function(name) {
            try {
                return app.project.items.addFolder(name || "New Folder");
            } catch (error) {
                ae.handleError(error, 'items.createFolder');
                return null;
            }
        },

        /**
         * Move item to folder
         * @param {Item} item - Item to move
         * @param {FolderItem} folder - Target folder
         * @returns {ae} Chainable
         */
        moveToFolder: function(item, folder) {
            if (item && folder && folder instanceof FolderItem) {
                try {
                    item.parentFolder = folder;
                } catch (error) {
                    ae.handleError(error, 'items.moveToFolder');
                }
            }
            return ae;
        },

        /**
         * Delete item
         * @param {Item} item - Item to delete
         * @returns {ae} Chainable
         */
        delete: function(item) {
            if (item) {
                try {
                    item.remove();
                } catch (error) {
                    ae.handleError(error, 'items.delete');
                }
            }
            return ae;
        },

        /**
         * Duplicate item
         * @param {Item} item - Item to duplicate
         * @param {string} [newName] - Name for duplicate
         * @returns {Item} Duplicated item
         */
        duplicate: function(item, newName) {
            if (!item) return null;
            try {
                var duplicate = item.duplicate();
                if (newName) duplicate.name = newName;
                return duplicate;
            } catch (error) {
                ae.handleError(error, 'items.duplicate');
                return null;
            }
        },

        /**
         * Replace item source
         * @param {FootageItem} item - Footage item to replace
         * @param {string} filepath - New source file path
         * @returns {ae} Chainable
         */
        replaceSource: function(item, filepath) {
            if (item && item.mainSource && filepath) {
                try {
                    item.mainSource.file = new File(filepath);
                } catch (error) {
                    ae.handleError(error, 'items.replaceSource');
                }
            }
            return ae;
        },

        /**
         * Set item comment
         * @param {Item} item - Target item
         * @param {string} comment - Comment text
         * @returns {ae} Chainable
         */
        setComment: function(item, comment) {
            if (item) {
                try {
                    item.comment = comment;
                } catch (error) {
                    ae.handleError(error, 'items.setComment');
                }
            }
            return ae;
        },

        /**
         * Set item label
         * @param {Item} item - Target item
         * @param {number} labelColor - Label color index (1-16)
         * @returns {ae} Chainable
         */
        setLabel: function(item, labelColor) {
            if (item && labelColor >= 1 && labelColor <= 16) {
                try {
                    item.label = labelColor;
                } catch (error) {
                    ae.handleError(error, 'items.setLabel');
                }
            }
            return ae;
        },

        /**
         * Get item usage (where item is used)
         * @param {Item} item - Target item
         * @returns {Array} Array of compositions where item is used
         */
        getUsage: function(item) {
            var usages = [];
            if (!item) return usages;

            try {
                var comps = ae.comp.getAll();
                for (var i = 0; i < comps.length; i++) {
                    var comp = comps[i];
                    for (var j = 1; j <= comp.numLayers; j++) {
                        var layer = comp.layer(j);
                        if (layer.source === item) {
                            usages.push({
                                composition: comp,
                                layer: layer,
                                layerIndex: j
                            });
                        }
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.getUsage');
            }
            return usages;
        },

        /**
         * Collect files used in project
         * @returns {Array} Array of file paths used in project
         */
        collectFiles: function() {
            var files = [];
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    if (item instanceof FootageItem && item.mainSource && item.mainSource.file) {
                        files.push(item.mainSource.file.fsName);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.collectFiles');
            }
            return files;
        },

        /**
         * Find missing files in project
         * @returns {Array} Array of missing files
         */
        findMissingFiles: function() {
            var missing = [];
            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    if (item instanceof FootageItem && item.mainSource && item.mainSource.missingFootage) {
                        missing.push({
                            item: item,
                            name: item.name,
                            expectedPath: item.mainSource.file ? item.mainSource.file.fsName : 'Unknown'
                        });
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.findMissingFiles');
            }
            return missing;
        },

        /**
         * Reload footage item
         * @param {FootageItem} item - Footage item to reload
         * @returns {ae} Chainable
         */
        reloadFootage: function(item) {
            if (item && item instanceof FootageItem) {
                try {
                    item.reload();
                } catch (error) {
                    ae.handleError(error, 'items.reloadFootage');
                }
            }
            return ae;
        },

        /**
         * Set footage interpret alpha
         * @param {FootageItem} item - Footage item
         * @param {string} alphaMode - Alpha mode: 'ignore', 'straight', 'premultiplied'
         * @returns {ae} Chainable
         */
        setAlphaMode: function(item, alphaMode) {
            if (item && item instanceof FootageItem) {
                try {
                    var interpretation = item.mainSource;
                    switch(alphaMode.toLowerCase()) {
                        case 'ignore':
                            interpretation.alphaMode = AlphaMode.IGNORE;
                            break;
                        case 'straight':
                            interpretation.alphaMode = AlphaMode.STRAIGHT;
                            break;
                        case 'premultiplied':
                            interpretation.alphaMode = AlphaMode.PREMULTIPLIED;
                            break;
                    }
                } catch (error) {
                    ae.handleError(error, 'items.setAlphaMode');
                }
            }
            return ae;
        },

        /**
         * Set footage frame rate
         * @param {FootageItem} item - Footage item
         * @param {number} frameRate - Frame rate
         * @returns {ae} Chainable
         */
        setFrameRate: function(item, frameRate) {
            if (item && item instanceof FootageItem) {
                try {
                    item.mainSource.frameRate = frameRate;
                } catch (error) {
                    ae.handleError(error, 'items.setFrameRate');
                }
            }
            return ae;
        },

        /**
         * Set footage duration
         * @param {FootageItem} item - Footage item
         * @param {number} duration - Duration in seconds
         * @returns {ae} Chainable
         */
        setDuration: function(item, duration) {
            if (item && item instanceof FootageItem) {
                try {
                    item.duration = duration;
                } catch (error) {
                    ae.handleError(error, 'items.setDuration');
                }
            }
            return ae;
        },

        /**
         * Create proxy for footage item
         * @param {FootageItem} item - Footage item
         * @param {string} proxyPath - Proxy file path
         * @returns {ae} Chainable
         */
        createProxy: function(item, proxyPath) {
            if (item && item instanceof FootageItem && proxyPath) {
                try {
                    item.setProxy(new File(proxyPath));
                } catch (error) {
                    ae.handleError(error, 'items.createProxy');
                }
            }
            return ae;
        },

        /**
         * Remove proxy from footage item
         * @param {FootageItem} item - Footage item
         * @returns {ae} Chainable
         */
        removeProxy: function(item) {
            if (item && item instanceof FootageItem) {
                try {
                    item.setProxy(null);
                } catch (error) {
                    ae.handleError(error, 'items.removeProxy');
                }
            }
            return ae;
        },

        /**
         * Get item statistics
         * @returns {Object} Project statistics
         */
        getStatistics: function() {
            var stats = {
                totalItems: 0,
                compositions: 0,
                folders: 0,
                footage: 0,
                solids: 0,
                placeholders: 0,
                missingFiles: 0
            };

            try {
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    stats.totalItems++;

                    if (item instanceof CompItem) {
                        stats.compositions++;
                    } else if (item instanceof FolderItem) {
                        stats.folders++;
                    } else if (item instanceof FootageItem) {
                        if (item.mainSource instanceof SolidSource) {
                            stats.solids++;
                        } else if (item.mainSource instanceof PlaceholderSource) {
                            stats.placeholders++;
                        } else {
                            stats.footage++;
                        }

                        if (item.mainSource && item.mainSource.missingFootage) {
                            stats.missingFiles++;
                        }
                    }
                }
            } catch (error) {
                ae.handleError(error, 'items.getStatistics');
            }

            return stats;
        }
    };
}(ae));

    // --- project/project.js ---
/**
 * Project creation, saving, and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.project = {
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
         * @returns {ae} Chainable
         */
        save: function(filepath) {
            try {
                if (filepath) {
                    app.project.save(new File(filepath));
                } else {
                    app.project.save();
                }
                ae.log('Project saved successfully');
            } catch (error) {
                ae.handleError(error, 'project.save');
            }
            return ae;
        },

        /**
         * Close the current project
         * @param {string} [saveOptions='dontSave'] - Save option: 'dontSave', 'save', 'prompt'
         * @returns {ae} Chainable
         */
        close: function(saveOptions) {
            var option;
            switch(saveOptions) {
                case 'save': option = SaveOptions.SAVE_CHANGES; break;
                case 'prompt': option = SaveOptions.PROMPT_TO_SAVE_CHANGES; break;
                default: option = SaveOptions.DO_NOT_SAVE_CHANGES;
            }
            app.project.close(option);
            return ae;
        },

        /**
         * Import a file into the project
         * @param {string} filepath - Path to file
         * @param {string} [importAsType] - Import type
         * @returns {FootageItem} Imported footage item
         */
        importFile: function(filepath, importAsType) {
            try {
                var importOptions = new ImportOptions(new File(filepath));
                if (importAsType) importOptions.importAs = importAsType;
                return app.project.importFile(importOptions);
            } catch (error) {
                ae.handleError(error, 'project.importFile');
                return null;
            }
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
            return app.project.items.addSolid(color, name, width, height, 1, duration);
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
         * @returns {ae} Chainable
         */
        setSelection: function(items) {
            app.project.selection = items;
            return ae;
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
        },

        /**
         * Get composition by name
         * @param {string} compName - Composition name
         * @returns {CompItem} Composition or null
         */
        getCompByName: function(compName) {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem && item.name === compName) {
                    return item;
                }
            }
            return null;
        }
    };
}(ae));

    // --- project/index.js ---
/**
 * Project module exports
 */

(function(ae) {
    // ae.project is already defined and extended in project.js and items.js
}(ae));

    // --- composition/composition-functions.js ---
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

    // --- composition/composition.js ---
/**
 * Composition creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.comp = {
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
            try {
                return app.project.items.addComp(
                    name || "New Composition",
                    width || 1920,
                    height || 1080,
                    pixelAspect || 1,
                    duration || 10,
                    frameRate || 30
                );
            } catch (error) {
                ae.handleError(error, 'comp.create');
                return null;
            }
        },

        /**
         * Get composition by name
         * @param {string} compName - Composition name
         * @returns {CompItem} Composition or null
         */
        getByName: function(compName) {
            return ae.project.getCompByName(compName);
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
         * @returns {ae} Chainable
         */
        setDuration: function(comp, duration) {
            if (comp) comp.duration = duration;
            return ae;
        },

        /**
         * Set composition frame rate
         * @param {CompItem} comp - Composition
         * @param {number} frameRate - Frames per second
         * @returns {ae} Chainable
         */
        setFrameRate: function(comp, frameRate) {
            if (comp) comp.frameRate = frameRate;
            return ae;
        },

        /**
         * Set composition background color
         * @param {CompItem} comp - Composition
         * @param {Array} color - Background color [r, g, b, a]
         * @returns {ae} Chainable
         */
        setBackgroundColor: function(comp, color) {
            if (comp) comp.bgColor = color;
            return ae;
        }
    };
}(ae));

    // --- composition/index.js ---
/**
 * Composition module exports
 */

(function(ae) {
    // Both composition.js and composition-functions.js
    // are already extending ae.comp and ae.composition respectively.
    // We just need to make sure they are available.
}(ae));

    // --- layer/3d-layer.js ---
/**
 * 3D layer properties and transformations
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.threeD = {
        /**
         * Enable or disable 3D for layer
         * @param {Layer} layer - Target layer
         * @param {boolean} enabled - 3D enabled state
         * @returns {ae} Chainable
         */
        enable3D: function(layer, enabled) {
            if (layer) {
                try {
                    layer.threeDLayer = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'threeD.enable3D');
                }
            }
            return ae;
        },

        /**
         * Set 3D position
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X position
         * @param {number} y - Y position
         * @param {number} z - Z position
         * @returns {ae} Chainable
         */
        setPosition: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    layer.property("ADBE Position").setValue([x, y, z || 0]);
                } catch (error) {
                    ae.handleError(error, 'threeD.setPosition');
                }
            }
            return ae;
        },

        /**
         * Set 3D orientation
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X orientation
         * @param {number} y - Y orientation
         * @param {number} z - Z orientation
         * @returns {ae} Chainable
         */
        setOrientation: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    layer.property("ADBE Orientation").setValue([x, y, z || 0]);
                } catch (error) {
                    ae.handleError(error, 'threeD.setOrientation');
                }
            }
            return ae;
        },

        /**
         * Set 3D rotation
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X rotation
         * @param {number} y - Y rotation
         * @param {number} z - Z rotation
         * @returns {ae} Chainable
         */
        setRotation: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    if (x !== undefined) layer.property("ADBE X Rotation").setValue(x);
                    if (y !== undefined) layer.property("ADBE Y Rotation").setValue(y);
                    if (z !== undefined) layer.property("ADBE Z Rotation").setValue(z);
                } catch (error) {
                    ae.handleError(error, 'threeD.setRotation');
                }
            }
            return ae;
        },

        /**
         * Set 3D anchor point
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {number} x - X anchor point
         * @param {number} y - Y anchor point
         * @param {number} z - Z anchor point
         * @returns {ae} Chainable
         */
        setAnchorPoint: function(layer, x, y, z) {
            if (layer && layer.threeDLayer) {
                try {
                    layer.property("ADBE AnchorPoint").setValue([x, y, z || 0]);
                } catch (error) {
                    ae.handleError(error, 'threeD.setAnchorPoint');
                }
            }
            return ae;
        },

        /**
         * Set material options
         * @param {Layer} layer - Target layer (must be 3D)
         * @param {Object} options - Material options
         * @returns {ae} Chainable
         */
        setMaterialOptions: function(layer, options) {
            if (layer && layer.threeDLayer) {
                try {
                    var material = layer.property("ADBE Material Options");
                    if (options.castsShadows !== undefined) material.property("ADBE Casts Shadows").setValue(options.castsShadows);
                    if (options.acceptsShadows !== undefined) material.property("ADBE Accepts Shadows").setValue(options.acceptsShadows);
                    if (options.acceptsLights !== undefined) material.property("ADBE Accepts Lights").setValue(options.acceptsLights);
                } catch (error) {
                    ae.handleError(error, 'threeD.setMaterialOptions');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- layer/av-layer.js ---
/**
 * Audio-visual layer specific methods
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.avLayer = {
        /**
         * Set layer source
         * @param {AVLayer} layer - Target layer
         * @param {Item} source - Source item
         * @returns {ae} Chainable
         */
        setSource: function(layer, source) {
            if (layer && source) {
                try {
                    layer.source = source;
                } catch (error) {
                    ae.handleError(error, 'avLayer.setSource');
                }
            }
            return ae;
        },

        /**
         * Enable or disable audio
         * @param {AVLayer} layer - Target layer
         * @param {boolean} enabled - Audio enabled state
         * @returns {ae} Chainable
         */
        setAudioEnabled: function(layer, enabled) {
            if (layer && layer.audio) {
                try {
                    layer.audio.enabled = enabled;
                } catch (error) {
                    ae.handleError(error, 'avLayer.setAudioEnabled');
                }
            }
            return ae;
        },

        /**
         * Set audio levels
         * @param {AVLayer} layer - Target layer
         * @param {number} leftLevel - Left channel level
         * @param {number} rightLevel - Right channel level
         * @returns {ae} Chainable
         */
        setAudioLevels: function(layer, leftLevel, rightLevel) {
            if (layer && layer.audio) {
                try {
                    var audioLevels = layer.audio.property("ADBE Audio Levels").value;
                    if (leftLevel !== undefined) audioLevels[0] = leftLevel;
                    if (rightLevel !== undefined) audioLevels[1] = rightLevel;
                    layer.audio.property("ADBE Audio Levels").setValue(audioLevels);
                } catch (error) {
                    ae.handleError(error, 'avLayer.setAudioLevels');
                }
            }
            return ae;
        },

        /**
         * Set time remapping
         * @param {AVLayer} layer - Target layer
         * @param {boolean} enabled - Time remap enabled
         * @returns {ae} Chainable
         */
        setTimeRemap: function(layer, enabled) {
            if (layer) {
                try {
                    layer.timeRemapEnabled = enabled;
                } catch (error) {
                    ae.handleError(error, 'avLayer.setTimeRemap');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- layer/base-layer.js ---
/**
 * Base layer creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.layer = {
        /**
         * Create a layer from source in composition
         * @param {CompItem} comp - Target composition
         * @param {Item} source - Source item
         * @param {number} [duration] - Layer duration
         * @returns {AVLayer} New layer
         */
        create: function(comp, source, duration) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.add(source, duration);
            } catch (error) {
                ae.handleError(error, 'layer.create');
                return null;
            }
        },

        /**
         * Create text layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} textContent - Text content
         * @returns {TextLayer} New text layer
         */
        createText: function(comp, textContent) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.addText(textContent || "Sample Text");
            } catch (error) {
                ae.handleError(error, 'layer.createText');
                return null;
            }
        },

        /**
         * Create shape layer in composition
         * @param {CompItem} comp - Target composition
         * @returns {ShapeLayer} New shape layer
         */
        createShape: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layers.addShape();
            } catch (error) {
                ae.handleError(error, 'layer.createShape');
                return null;
            }
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
            try {
                return comp.layers.addCamera(name || "Camera 1", centerPoint || [960, 540]);
            } catch (error) {
                ae.handleError(error, 'layer.createCamera');
                return null;
            }
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
            try {
                var light = comp.layers.addLight(name || "Light 1", [960, 540]);
                if (lightType) light.lightType = lightType;
                return light;
            } catch (error) {
                ae.handleError(error, 'layer.createLight');
                return null;
            }
        },

        /**
         * Create null object layer in composition
         * @param {CompItem} comp - Target composition
         * @param {string} [name] - Null object name
         * @returns {AVLayer} New null layer
         */
        createNull: function(comp, name) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                var nullLayer = comp.layers.addNull();
                if (name) nullLayer.name = name;
                return nullLayer;
            } catch (error) {
                ae.handleError(error, 'layer.createNull');
                return null;
            }
        },

        /**
         * Get layer by name from composition
         * @param {CompItem} comp - Composition
         * @param {string} name - Layer name
         * @returns {Layer} Layer or null
         */
        getByName: function(comp, name) {
            if (!comp || !(comp instanceof CompItem)) return null;
            try {
                return comp.layer(name);
            } catch (error) {
                ae.handleError(error, 'layer.getByName');
                return null;
            }
        },

        /**
         * Get layer by index from composition
         * @param {CompItem} comp - Composition
         * @param {number} index - Layer index (1-based)
         * @returns {Layer} Layer or null
         */
        getByIndex: function(comp, index) {
            if (!comp || !(comp instanceof CompItem) || index < 1 || index > comp.numLayers) return null;
            try {
                return comp.layer(index);
            } catch (error) {
                ae.handleError(error, 'layer.getByIndex');
                return null;
            }
        },

        /**
         * Get all layers from composition
         * @param {CompItem} comp - Composition
         * @returns {Array} Array of layers
         */
        getAll: function(comp) {
            if (!comp || !(comp instanceof CompItem)) return [];
            var layers = [];
            try {
                for (var i = 1; i <= comp.numLayers; i++) {
                    layers.push(comp.layer(i));
                }
            } catch (error) {
                ae.handleError(error, 'layer.getAll');
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
            try {
                return layer.duplicate();
            } catch (error) {
                ae.handleError(error, 'layer.duplicate');
                return null;
            }
        },

        /**
         * Delete a layer
         * @param {Layer} layer - Layer to delete
         * @returns {ae} Chainable
         */
        remove: function(layer) {
            if (layer) {
                try {
                    layer.remove();
                } catch (error) {
                    ae.handleError(error, 'layer.remove');
                }
            }
            return ae;
        },

        /**
         * Enable or disable a layer
         * @param {Layer} layer - Target layer
         * @param {boolean} enabled - Enable state
         * @returns {ae} Chainable
         */
        enable: function(layer, enabled) {
            if (layer) {
                try {
                    layer.enabled = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'layer.enable');
                }
            }
            return ae;
        },

        /**
         * Set layer parent
         * @param {Layer} layer - Child layer
         * @param {Layer} parentLayer - Parent layer
         * @returns {ae} Chainable
         */
        setParent: function(layer, parentLayer) {
            if (layer && parentLayer) {
                try {
                    layer.parent = parentLayer;
                } catch (error) {
                    ae.handleError(error, 'layer.setParent');
                }
            }
            return ae;
        },

        /**
         * Set layer start time
         * @param {Layer} layer - Target layer
         * @param {number} time - Start time in seconds
         * @returns {ae} Chainable
         */
        setStartTime: function(layer, time) {
            if (layer) {
                try {
                    layer.startTime = time;
                } catch (error) {
                    ae.handleError(error, 'layer.setStartTime');
                }
            }
            return ae;
        },

        /**
         * Set layer in point
         * @param {Layer} layer - Target layer
         * @param {number} time - In point time
         * @returns {ae} Chainable
         */
        setInPoint: function(layer, time) {
            if (layer) {
                try {
                    layer.inPoint = time;
                } catch (error) {
                    ae.handleError(error, 'layer.setInPoint');
                }
            }
            return ae;
        },

        /**
         * Set layer out point
         * @param {Layer} layer - Target layer
         * @param {number} time - Out point time
         * @returns {ae} Chainable
         */
        setOutPoint: function(layer, time) {
            if (layer) {
                try {
                    layer.outPoint = time;
                } catch (error) {
                    ae.handleError(error, 'layer.setOutPoint');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- layer/camera-layer.js ---
/**
 * Camera layer specific properties
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.camera = {
        /**
         * Set camera zoom
         * @param {CameraLayer} camera - Target camera
         * @param {number} zoom - Zoom value
         * @returns {ae} Chainable
         */
        setZoom: function(camera, zoom) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Zoom").setValue(zoom);
                } catch (error) {
                    ae.handleError(error, 'camera.setZoom');
                }
            }
            return ae;
        },

        /**
         * Set focus distance
         * @param {CameraLayer} camera - Target camera
         * @param {number} distance - Focus distance
         * @returns {ae} Chainable
         */
        setFocusDistance: function(camera, distance) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Focus Distance").setValue(distance);
                } catch (error) {
                    ae.handleError(error, 'camera.setFocusDistance');
                }
            }
            return ae;
        },

        /**
         * Set aperture size
         * @param {CameraLayer} camera - Target camera
         * @param {number} aperture - Aperture value
         * @returns {ae} Chainable
         */
        setAperture: function(camera, aperture) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Aperture").setValue(aperture);
                } catch (error) {
                    ae.handleError(error, 'camera.setAperture');
                }
            }
            return ae;
        },

        /**
         * Set blur level
         * @param {CameraLayer} camera - Target camera
         * @param {number} blurLevel - Blur level
         * @returns {ae} Chainable
         */
        setBlurLevel: function(camera, blurLevel) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Blur Level").setValue(blurLevel);
                } catch (error) {
                    ae.handleError(error, 'camera.setBlurLevel');
                }
            }
            return ae;
        },

        /**
         * Enable depth of field
         * @param {CameraLayer} camera - Target camera
         * @param {boolean} enabled - Depth of field enabled
         * @returns {ae} Chainable
         */
        setDepthOfField: function(camera, enabled) {
            if (camera) {
                try {
                    camera.property("ADBE Camera Options").property("ADBE Camera Depth of Field").setValue(enabled);
                } catch (error) {
                    ae.handleError(error, 'camera.setDepthOfField');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- layer/light-layer.js ---
/**
 * Light layer specific properties
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.light = {
        /**
         * Set light intensity
         * @param {LightLayer} light - Target light
         * @param {number} intensity - Light intensity
         * @returns {ae} Chainable
         */
        setIntensity: function(light, intensity) {
            if (light) {
                try {
                    light.property("ADBE Light Intensity").setValue(intensity);
                } catch (error) {
                    ae.handleError(error, 'light.setIntensity');
                }
            }
            return ae;
        },

        /**
         * Set light color
         * @param {LightLayer} light - Target light
         * @param {Array} color - Light color [r, g, b]
         * @returns {ae} Chainable
         */
        setColor: function(light, color) {
            if (light) {
                try {
                    light.property("ADBE Light Color").setValue(color);
                } catch (error) {
                    ae.handleError(error, 'light.setColor');
                }
            }
            return ae;
        },

        /**
         * Set cone angle (spot lights)
         * @param {LightLayer} light - Target light
         * @param {number} angle - Cone angle
         * @returns {ae} Chainable
         */
        setConeAngle: function(light, angle) {
            if (light && light.lightType === LightType.SPOT) {
                try {
                    light.property("ADBE Light Cone Angle").setValue(angle);
                } catch (error) {
                    ae.handleError(error, 'light.setConeAngle');
                }
            }
            return ae;
        },

        /**
         * Set cone feather (spot lights)
         * @param {LightLayer} light - Target light
         * @param {number} feather - Cone feather
         * @returns {ae} Chainable
         */
        setConeFeather: function(light, feather) {
            if (light && light.lightType === LightType.SPOT) {
                try {
                    light.property("ADBE Light Cone Feather").setValue(feather);
                } catch (error) {
                    ae.handleError(error, 'light.setConeFeather');
                }
            }
            return ae;
        },

        /**
         * Set shadow darkness
         * @param {LightLayer} light - Target light
         * @param {number} darkness - Shadow darkness
         * @returns {ae} Chainable
         */
        setShadowDarkness: function(light, darkness) {
            if (light) {
                try {
                    light.property("ADBE Light Shadow Darkness").setValue(darkness);
                } catch (error) {
                    ae.handleError(error, 'light.setShadowDarkness');
                }
            }
            return ae;
        },

        /**
         * Set light type
         * @param {LightLayer} light - Target light
         * @param {LightType} lightType - Light type
         * @returns {ae} Chainable
         */
        setLightType: function(light, lightType) {
            if (light) {
                try {
                    light.lightType = lightType;
                } catch (error) {
                    ae.handleError(error, 'light.setLightType');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- layer/shape-layer.js ---
/**
 * Shape layer creation and manipulation
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.shape = {
        /**
         * Add rectangle shape to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Rectangle shape property
         */
        addRectangle: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Shape - Rect");
            } catch (error) {
                ae.handleError(error, 'shape.addRectangle');
                return null;
            }
        },

        /**
         * Add ellipse shape to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Ellipse shape property
         */
        addEllipse: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Shape - Ellipse");
            } catch (error) {
                ae.handleError(error, 'shape.addEllipse');
                return null;
            }
        },

        /**
         * Add path to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Path property
         */
        addPath: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Shape - Group");
            } catch (error) {
                ae.handleError(error, 'shape.addPath');
                return null;
            }
        },

        /**
         * Add stroke to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Stroke property
         */
        addStroke: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Graphic - Stroke");
            } catch (error) {
                ae.handleError(error, 'shape.addStroke');
                return null;
            }
        },

        /**
         * Add fill to layer
         * @param {ShapeLayer} layer - Target shape layer
         * @returns {Property} Fill property
         */
        addFill: function(layer) {
            if (!layer) return null;
            try {
                var content = layer.property("ADBE Root Vectors Group");
                return content.addProperty("ADBE Vector Graphic - Fill");
            } catch (error) {
                ae.handleError(error, 'shape.addFill');
                return null;
            }
        },

        /**
         * Set path vertices and tangents
         * @param {Property} shape - Path property
         * @param {Array} vertices - Path vertices
         * @param {Array} inTangents - In tangent points
         * @param {Array} outTangents - Out tangent points
         * @param {boolean} closed - Closed path
         * @returns {ae} Chainable
         */
        setPath: function(shape, vertices, inTangents, outTangents, closed) {
            if (shape) {
                try {
                    var path = new Shape();
                    path.vertices = vertices;
                    path.inTangents = inTangents;
                    path.outTangents = outTangents;
                    path.closed = closed !== false;
                    shape.setValue(path);
                } catch (error) {
                    ae.handleError(error, 'shape.setPath');
                }
            }
            return ae;
        },

        /**
         * Set stroke color
         * @param {Property} stroke - Stroke property
         * @param {Array} color - Stroke color [r, g, b, a]
         * @returns {ae} Chainable
         */
        setStrokeColor: function(stroke, color) {
            if (stroke) {
                try {
                    stroke.property("Color").setValue(color);
                } catch (error) {
                    ae.handleError(error, 'shape.setStrokeColor');
                }
            }
            return ae;
        },

        /**
         * Set stroke width
         * @param {Property} stroke - Stroke property
         * @param {number} width - Stroke width
         * @returns {ae} Chainable
         */
        setStrokeWidth: function(stroke, width) {
            if (stroke) {
                try {
                    stroke.property("Stroke Width").setValue(width);
                } catch (error) {
                    ae.handleError(error, 'shape.setStrokeWidth');
                }
            }
            return ae;
        },

        /**
         * Set fill color
         * @param {Property} fill - Fill property
         * @param {Array} color - Fill color [r, g, b, a]
         * @returns {ae} Chainable
         */
        setFillColor: function(fill, color) {
            if (fill) {
                try {
                    fill.property("Color").setValue(color);
                } catch (error) {
                    ae.handleError(error, 'shape.setFillColor');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- layer/text-layer.js ---
/**
 * Text layer manipulation and styling
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.text = {
        /**
         * Set text content
         * @param {TextLayer} layer - Target text layer
         * @param {string} text - Text content
         * @returns {ae} Chainable
         */
        setText: function(layer, text) {
            if (!layer || !layer.property("Source Text")) return ae;
            try {
                var textDoc = layer.property("Source Text").value;
                textDoc.text = text;
                layer.property("Source Text").setValue(textDoc);
            } catch (error) {
                ae.handleError(error, 'text.setText');
            }
            return ae;
        },

        /**
         * Set font family
         * @param {TextLayer} layer - Target text layer
         * @param {string} fontName - Font name
         * @returns {ae} Chainable
         */
        setFont: function(layer, fontName) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.font = fontName;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set font size
         * @param {TextLayer} layer - Target text layer
         * @param {number} size - Font size
         * @returns {ae} Chainable
         */
        setSize: function(layer, size) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.fontSize = size;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set text color
         * @param {TextLayer} layer - Target text layer
         * @param {Array} color - Color array [r, g, b, a]
         * @returns {ae} Chainable
         */
        setColor: function(layer, color) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.fillColor = color;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set character tracking
         * @param {TextLayer} layer - Target text layer
         * @param {number} tracking - Tracking value
         * @returns {ae} Chainable
         */
        setTracking: function(layer, tracking) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.tracking = tracking;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set line leading
         * @param {TextLayer} layer - Target text layer
         * @param {number} leading - Leading value
         * @returns {ae} Chainable
         */
        setLeading: function(layer, leading) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.leading = leading;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        },

        /**
         * Set text alignment
         * @param {TextLayer} layer - Target text layer
         * @param {ParagraphJustification} alignment - Text alignment
         * @returns {ae} Chainable
         */
        setAlignment: function(layer, alignment) {
            if (!layer || !layer.property("Source Text")) return ae;
            var textDoc = layer.property("Source Text").value;
            textDoc.justification = alignment;
            layer.property("Source Text").setValue(textDoc);
            return ae;
        }
    };
}(ae));

    // --- layer/index.js ---
/**
 * Layer module exports
 */

(function(ae) {
    // ae.layer is already defined and extended in base-layer.js and others
}(ae));

    // --- properties/keyframes.js ---
/**
 * Keyframe interpolation and easing
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.keyframes = {
        /**
         * Set keyframe interpolation type
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {KeyframeInterpolationType} inType - In interpolation type
         * @param {KeyframeInterpolationType} outType - Out interpolation type
         * @returns {ae} Chainable
         */
        setInterpolationType: function(property, keyIndex, inType, outType) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    if (inType) property.setInterpolationTypeAtKey(keyIndex + 1, inType);
                    if (outType) property.setInterpolationTypeAtKey(keyIndex + 1, undefined, outType);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setInterpolationType');
                }
            }
            return ae;
        },

        /**
         * Set keyframe temporal ease
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {KeyframeEase} inEase - In ease
         * @param {KeyframeEase} outEase - Out ease
         * @returns {ae} Chainable
         */
        setTemporalEase: function(property, keyIndex, inEase, outEase) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setTemporalEaseAtKey(keyIndex + 1, inEase, outEase);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setTemporalEase');
                }
            }
            return ae;
        },

        /**
         * Set keyframe spatial continuity
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {number} inSpatial - In spatial continuity
         * @param {number} outSpatial - Out spatial continuity
         * @returns {ae} Chainable
         */
        setSpatialContinuity: function(property, keyIndex, inSpatial, outSpatial) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setSpatialContinuousAtKey(keyIndex + 1, inSpatial, outSpatial);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setSpatialContinuity');
                }
            }
            return ae;
        },

        /**
         * Set keyframe temporal auto bezier
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {boolean} autoBezier - Auto bezier enabled
         * @returns {ae} Chainable
         */
        setTemporalAutoBezier: function(property, keyIndex, autoBezier) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setTemporalAutoBezierAtKey(keyIndex + 1, autoBezier);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setTemporalAutoBezier');
                }
            }
            return ae;
        },

        /**
         * Set keyframe spatial auto bezier
         * @param {Property} property - Target property
         * @param {number} keyIndex - Keyframe index (0-based)
         * @param {boolean} autoBezier - Auto bezier enabled
         * @returns {ae} Chainable
         */
        setSpatialAutoBezier: function(property, keyIndex, autoBezier) {
            if (property && property.isTimeVarying && property.numKeys >= keyIndex) {
                try {
                    property.setSpatialAutoBezierAtKey(keyIndex + 1, autoBezier);
                } catch (error) {
                    ae.handleError(error, 'keyframes.setSpatialAutoBezier');
                }
            }
            return ae;
        },

        /**
         * Create linear keyframes
         * @param {Property} property - Target property
         * @param {Array} keyframes - Array of {time, value} objects
         * @returns {ae} Chainable
         */
        createLinear: function(property, keyframes) {
            if (property && property.isTimeVarying) {
                try {
                    for (var i = 0; i < keyframes.length; i++) {
                        var kf = keyframes[i];
                        property.setValueAtTime(kf.time, kf.value);
                        this.setInterpolationType(property, i, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR);
                    }
                } catch (error) {
                    ae.handleError(error, 'keyframes.createLinear');
                }
            }
            return ae;
        },

        /**
         * Create bezier keyframes
         * @param {Property} property - Target property
         * @param {Array} keyframes - Array of {time, value, inTangent, outTangent} objects
         * @returns {ae} Chainable
         */
        createBezier: function(property, keyframes) {
            if (property && property.isTimeVarying) {
                try {
                    for (var i = 0; i < keyframes.length; i++) {
                        var kf = keyframes[i];
                        property.setValueAtTime(kf.time, kf.value);
                        this.setInterpolationType(property, i, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
                    }
                } catch (error) {
                    ae.handleError(error, 'keyframes.createBezier');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- properties/properties.js ---
/**
 * Property manipulation and keyframing
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.property = {
        /**
         * Get property from layer
         * @param {Layer} layer - Target layer
         * @param {string} propertyName - Property name
         * @returns {Property} Property or null
         */
        get: function(layer, propertyName) {
            if (!layer) return null;
            try {
                return layer.property(propertyName);
            } catch (error) {
                ae.handleError(error, 'property.get');
                return null;
            }
        },

        /**
         * Get property group from layer
         * @param {Layer} layer - Target layer
         * @param {string} groupName - Property group name
         * @returns {PropertyGroup} Property group or null
         */
        getPropertyGroup: function(layer, groupName) {
            if (!layer) return null;
            try {
                return layer.property(groupName);
            } catch (error) {
                ae.handleError(error, 'property.getPropertyGroup');
                return null;
            }
        },

        /**
         * Set property value
         * @param {Property} property - Target property
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setValue: function(property, value) {
            if (property) {
                try {
                    property.setValue(value);
                } catch (error) {
                    ae.handleError(error, 'property.setValue');
                }
            }
            return ae;
        },

        /**
         * Set property value at specific time
         * @param {Property} property - Target property
         * @param {number} time - Time in seconds
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setValueAtTime: function(property, time, value) {
            if (property && property.isTimeVarying) {
                try {
                    property.setValueAtTime(time, value);
                } catch (error) {
                    ae.handleError(error, 'property.setValueAtTime');
                }
            }
            return ae;
        },

        /**
         * Set multiple values at multiple times
         * @param {Property} property - Target property
         * @param {Array} times - Array of times
         * @param {Array} values - Array of values
         * @returns {ae} Chainable
         */
        setValuesAtTimes: function(property, times, values) {
            if (property && property.isTimeVarying && times.length === values.length) {
                try {
                    for (var i = 0; i < times.length; i++) {
                        property.setValueAtTime(times[i], values[i]);
                    }
                } catch (error) {
                    ae.handleError(error, 'property.setValuesAtTimes');
                }
            }
            return ae;
        },

        /**
         * Add keyframe at time
         * @param {Property} property - Target property
         * @param {number} time - Time in seconds
         * @param {*} value - Keyframe value
         * @returns {ae} Chainable
         */
        addKeyframe: function(property, time, value) {
            if (property && property.isTimeVarying) {
                try {
                    property.setValueAtTime(time, value);
                } catch (error) {
                    ae.handleError(error, 'property.addKeyframe');
                }
            }
            return ae;
        },

        /**
         * Remove keyframe by index
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {ae} Chainable
         */
        removeKeyframe: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                try {
                    property.removeKey(keyframeIndex + 1); // AE uses 1-based indexing
                } catch (error) {
                    ae.handleError(error, 'property.removeKeyframe');
                }
            }
            return ae;
        },

        /**
         * Get number of keyframes
         * @param {Property} property - Target property
         * @returns {number} Number of keyframes
         */
        getKeyframeCount: function(property) {
            if (property && property.isTimeVarying) {
                return property.numKeys;
            }
            return 0;
        },

        /**
         * Get keyframe time
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {number} Keyframe time
         */
        getKeyframeTime: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                return property.keyTime(keyframeIndex + 1);
            }
            return 0;
        },

        /**
         * Get keyframe value
         * @param {Property} property - Target property
         * @param {number} keyframeIndex - Keyframe index (0-based)
         * @returns {*} Keyframe value
         */
        getKeyframeValue: function(property, keyframeIndex) {
            if (property && property.isTimeVarying && property.numKeys > keyframeIndex) {
                return property.keyValue(keyframeIndex + 1);
            }
            return null;
        }
    };
}(ae));

    // --- properties/index.js ---
/**
 * Properties module exports
 */

// Import properties modules
// (included in bundle)
// (included in bundle)

// Export properties namespace
(function(ae) {
    ae.properties = {
        base: ae.property,
        keyframes: ae.keyframes
    };
}(ae));

    // --- effects/effects.js ---
/**
 * Effects application and manipulation
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.effects = {
        /**
         * Add effect to layer
         * @param {Layer} layer - Target layer
         * @param {string} effectName - Effect name
         * @returns {PropertyGroup} Effect property group
         */
        add: function(layer, effectName) {
            if (!layer) return null;
            try {
                return layer.property("ADBE Effect Parade").addProperty(effectName);
            } catch (error) {
                ae.handleError(error, 'effects.add');
                return null;
            }
        },

        /**
         * Add effect by match name
         * @param {Layer} layer - Target layer
         * @param {string} matchName - Effect match name
         * @returns {PropertyGroup} Effect property group
         */
        addByMatchName: function(layer, matchName) {
            if (!layer) return null;
            try {
                return layer.property("ADBE Effect Parade").addProperty(matchName);
            } catch (error) {
                ae.handleError(error, 'effects.addByMatchName');
                return null;
            }
        },

        /**
         * Remove effect from layer
         * @param {Layer} layer - Target layer
         * @param {number} effectIndex - Effect index (1-based)
         * @returns {ae} Chainable
         */
        remove: function(layer, effectIndex) {
            if (!layer) return ae;
            try {
                var effects = layer.property("ADBE Effect Parade");
                if (effects && effects.numProperties >= effectIndex) {
                    effects.property(effectIndex).remove();
                }
            } catch (error) {
                ae.handleError(error, 'effects.remove');
            }
            return ae;
        },

        /**
         * Remove all effects from layer
         * @param {Layer} layer - Target layer
         * @returns {ae} Chainable
         */
        removeAll: function(layer) {
            if (!layer) return ae;
            try {
                var effects = layer.property("ADBE Effect Parade");
                if (effects) {
                    while (effects.numProperties > 0) {
                        effects.property(1).remove();
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.removeAll');
            }
            return ae;
        },

        /**
         * Get all effects from layer
         * @param {Layer} layer - Target layer
         * @returns {Array} Array of effects
         */
        getAll: function(layer) {
            if (!layer) return [];
            var effects = [];
            try {
                var effectGroup = layer.property("ADBE Effect Parade");
                if (effectGroup) {
                    for (var i = 1; i <= effectGroup.numProperties; i++) {
                        effects.push(effectGroup.property(i));
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.getAll');
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
            try {
                var effectGroup = layer.property("ADBE Effect Parade");
                if (effectGroup) {
                    for (var i = 1; i <= effectGroup.numProperties; i++) {
                        var effect = effectGroup.property(i);
                        if (effect.name === effectName) {
                            return effect;
                        }
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.getByName');
            }
            return null;
        },

        /**
         * Set effect property value
         * @param {PropertyGroup} effect - Target effect
         * @param {string} propertyName - Property name
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setProperty: function(effect, propertyName, value) {
            if (!effect) return ae;
            try {
                var prop = effect.property(propertyName);
                if (prop) {
                    prop.setValue(value);
                }
            } catch (error) {
                ae.handleError(error, 'effects.setProperty');
            }
            return ae;
        },

        /**
         * Set effect property by match name
         * @param {PropertyGroup} effect - Target effect
         * @param {string} matchName - Property match name
         * @param {*} value - Property value
         * @returns {ae} Chainable
         */
        setPropertyByMatchName: function(effect, matchName, value) {
            if (!effect) return ae;
            try {
                var prop = effect.property(matchName);
                if (prop) {
                    prop.setValue(value);
                }
            } catch (error) {
                ae.handleError(error, 'effects.setPropertyByMatchName');
            }
            return ae;
        },

        /**
         * Animate effect property with keyframes
         * @param {PropertyGroup} effect - Target effect
         * @param {string} propertyName - Property name
         * @param {Array} keyframes - Array of keyframe objects
         * @returns {ae} Chainable
         */
        animateProperty: function(effect, propertyName, keyframes) {
            if (!effect) return ae;
            try {
                var prop = effect.property(propertyName);
                if (prop && prop.isTimeVarying) {
                    for (var i = 0; i < keyframes.length; i++) {
                        prop.setValueAtTime(keyframes[i].time, keyframes[i].value);
                    }
                }
            } catch (error) {
                ae.handleError(error, 'effects.animateProperty');
            }
            return ae;
        },

        /**
         * Enable or disable effect
         * @param {PropertyGroup} effect - Target effect
         * @param {boolean} enabled - Effect enabled state
         * @returns {ae} Chainable
         */
        setEnabled: function(effect, enabled) {
            if (effect) {
                try {
                    effect.enabled = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'effects.setEnabled');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- effects/match-names.js ---
/**
 * Effect match names reference
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.effectsList = {
        // Color effects
        "Brightness & Contrast": "ADBE Brightness & Contrast",
        "Levels": "ADBE Levels",
        "Curves": "ADBE Curves",
        "Hue/Saturation": "ADBE Hue/Saturation",
        "Color Balance": "ADBE Color Balance",
        "Tint": "ADBE Tint",
        "Colorama": "ADBE Colorama",
        "Posterize": "ADBE Posterize",
        "Gradient Ramp": "ADBE Ramp",
        "Four-Color Gradient": "ADBE Four Color Gradient",

        // Blur effects
        "Gaussian Blur": "ADBE Gaussian Blur",
        "Fast Blur": "ADBE Fast Blur",
        "Directional Blur": "ADBE directionalBlur",
        "Radial Blur": "ADBE Radial Blur",
        "Box Blur": "ADBE Box Blur",
        "Camera Lens Blur": "ADBE Camera Lens Blur",

        // Distortion effects
        "Corner Pin": "ADBE Corner Pin",
        "Displacement Map": "ADBE Displacement Map",
        "Lens Distortion": "ADBE Lens Distortion",
        "Warp": "ADBE Warp",
        "Bezier Warp": "ADBE Bezier Warp",
        "Bulge": "ADBE Bulge",
        "Mesh Warp": "ADBE Mesh Warp",
        "Liquify": "ADBE Liquify",

        // Generate effects
        "4-Color Gradient": "ADBE Four Color Gradient",
        "Ramp": "ADBE Ramp",
        "Circle": "ADBE Circle",
        "Ellipse": "ADBE Ellipse",
        "Stroke": "ADBE Stroke",
        "Write-on": "ADBE Write-on",
        "Audio Spectrum": "ADBE Audio Spectrum",
        "Audio Waveform": "ADBE Audio Waveform",

        // Keying effects
        "Keylight": "ADBE Keylight",
        "Color Difference Key": "ADBE Color Difference Key",
        "Color Key": "ADBE Color Key",
        "Luma Key": "ADBE Luma Key",
        "Extract": "ADBE Extract",
        "Linear Color Key": "ADBE Linear Color Key",

        // Matte effects
        "Simple Choker": "ADBE Simple Choker",
        "Matte Choker": "ADBE Matte Choker",
        "Refine Matte": "ADBE Refine Matte",

        // Noise effects
        "Fractal Noise": "ADBE Fractal Noise",
        "Turbulent Noise": "ADBE Turbulent Noise",
        "Noise": "ADBE Noise",
        "Noise HLS": "ADBE Noise HLS",

        // Perspective effects
        "3D Glasses": "ADBE 3D Glasses",
        "Bevel Alpha": "ADBE Bevel Alpha",
        "Bevel Edges": "ADBE Bevel Edges",
        "Drop Shadow": "ADBE Drop Shadow",
        "Radial Shadow": "ADBE Radial Shadow",

        // Stylize effects
        "Glow": "ADBE Glow",
        "Roughen Edges": "ADBE Roughen Edges",
        "Scatter": "ADBE Scatter",
        "Texturize": "ADBE Texturize",
        "Threshold": "ADBE Threshold",

        // Time effects
        "Echo": "ADBE Echo",
        "Time Displacement": "ADBE Time Displacement",
        "Timewarp": "ADBE Timewarp",

        // Transition effects
        "Block Dissolve": "ADBE Block Dissolve",
        "Card Wipe": "ADBE Card Wipe",
        "Gradient Wipe": "ADBE Gradient Wipe",
        "Iris Wipe": "ADBE Iris Wipe",
        "Linear Wipe": "ADBE Linear Wipe",
        "Radial Wipe": "ADBE Radial Wipe",
        "Venetian Blinds": "ADBE Venetian Blinds"
    };

    // Common effect property match names
    ae.effectProperties = {
        // Blur effects
        "Blurriness": "ADBE Slider",
        "Blur Dimensions": "ADBE Menu",
        "Repeat Edge Pixels": "ADBE Checkbox",

        // Color effects
        "Brightness": "ADBE Slider",
        "Contrast": "ADBE Slider",
        "Hue": "ADBE Angle",
        "Saturation": "ADBE Slider",
        "Lightness": "ADBE Slider",
        "Black Point": "ADBE Point3",
        "White Point": "ADBE Point3",

        // Distortion effects
        "Amount": "ADBE Slider",
        "Center": "ADBE Point3",
        "Scale": "ADBE Slider",

        // Generate effects
        "Start Point": "ADBE Point3",
        "End Point": "ADBE Point3",
        "Start Color": "ADBE Color",
        "End Color": "ADBE Color",
        "Radius": "ADBE Slider",

        // Keying effects
        "Screen Colour": "ADBE Color",
        "Screen Gain": "ADBE Slider",
        "Screen Balance": "ADBE Slider",
        "Despill Bias": "ADBE Slider",
        "Alpha Bias": "ADBE Slider"
    };
}(ae));

    // --- effects/index.js ---
/**
 * Effects module exports
 */

// Import effects modules
// (included in bundle)
// (included in bundle)

// Export effects namespace
(function(ae) {
    ae.effects = {
        base: ae.effects,
        matchNames: ae.effectsList,
        properties: ae.effectProperties
    };
}(ae));

    // --- expressions/expressions.js ---
/**
 * Expression creation and management
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.expression = {
        /**
         * Set expression on property
         * @param {Property} property - Target property
         * @param {string} expression - Expression code
         * @returns {ae} Chainable
         */
        set: function(property, expression) {
            if (property) {
                try {
                    property.expression = expression;
                } catch (error) {
                    ae.handleError(error, 'expression.set');
                }
            }
            return ae;
        },

        /**
         * Enable or disable expression
         * @param {Property} property - Target property
         * @param {boolean} enabled - Expression enabled state
         * @returns {ae} Chainable
         */
        setEnabled: function(property, enabled) {
            if (property) {
                try {
                    property.expressionEnabled = enabled !== false;
                } catch (error) {
                    ae.handleError(error, 'expression.setEnabled');
                }
            }
            return ae;
        },

        /**
         * Create wiggle expression
         * @param {Property} property - Target property
         * @param {number} frequency - Wiggle frequency
         * @param {number} amplitude - Wiggle amplitude
         * @param {number} octaves - Wiggle octaves
         * @returns {ae} Chainable
         */
        setWiggler: function(property, frequency, amplitude, octaves) {
            var expr = "freq = " + (frequency || 3) + ";\n";
            expr += "amp = " + (amplitude || 20) + ";\n";
            expr += "octaves = " + (octaves || 1) + ";\n";
            expr += "t = time * freq;\n";
            expr += "wiggle(freq, amp, octaves, 0.5, t);";

            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Create loop expression
         * @param {Property} property - Target property
         * @param {string} loopType - Loop type: 'cycle', 'pingpong', 'offset', 'continue'
         * @param {number} duration - Loop duration
         * @returns {ae} Chainable
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
            return ae;
        },

        /**
         * Link property to another property
         * @param {Property} property - Source property
         * @param {Property} targetProperty - Target property to link to
         * @returns {ae} Chainable
         */
        linkToProperty: function(property, targetProperty) {
            if (property && targetProperty) {
                try {
                    property.expression = "thisComp.layer('" + targetProperty.layer.name + "').'" +
                                        targetProperty.matchName + "';";
                } catch (error) {
                    ae.handleError(error, 'expression.linkToProperty');
                }
            }
            return ae;
        },

        /**
         * Set time remap expression
         * @param {Layer} layer - Target layer with time remap
         * @param {string} expression - Time remap expression
         * @returns {ae} Chainable
         */
        setTimeRemap: function(layer, expression) {
            if (layer && layer.timeRemapEnabled) {
                try {
                    layer.property("ADBE Time Remapping").expression = expression;
                } catch (error) {
                    ae.handleError(error, 'expression.setTimeRemap');
                }
            }
            return ae;
        },

        /**
         * Create random expression
         * @param {Property} property - Target property
         * @param {number} min - Minimum value
         * @param {number} max - Maximum value
         * @returns {ae} Chainable
         */
        setRandom: function(property, min, max) {
            var expr = "seedRandom(" + (Math.floor(Math.random() * 1000) + ", true);\n";
            expr += "random(" + min + ", " + max + ");";

            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Create time-based expression
         * @param {Property} property - Target property
         * @param {string} expression - Time-based expression
         * @returns {ae} Chainable
         */
        setTimeBased: function(property, expression) {
            var expr = "t = time;\n";
            expr += expression;

            if (property) property.expression = expr;
            return ae;
        },

        /**
         * Create layer index expression
         * @param {Property} property - Target property
         * @param {string} expression - Layer index expression
         * @returns {ae} Chainable
         */
        setLayerIndex: function(property, expression) {
            var expr = "i = index;\n";
            expr += expression;

            if (property) property.expression = expr;
            return ae;
        }
    };
}(ae));

    // --- expressions/index.js ---
/**
 * Expressions module exports
 */

(function(ae) {
    // ae.expression is already defined and extended in expressions.js
}(ae));

    // --- masks/masks.js ---
/**
 * Mask creation and manipulation
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.mask = {
        /**
         * Create mask on layer
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        create: function(layer) {
            if (!layer) return null;
            try {
                return layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
            } catch (error) {
                ae.handleError(error, 'mask.create');
                return null;
            }
        },

        /**
         * Create elliptical mask
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        createEllipse: function(layer) {
            if (!layer) return null;
            try {
                var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
                mask.property("ADBE Mask Shape").setValue(this.createMaskEllipse());
                return mask;
            } catch (error) {
                ae.handleError(error, 'mask.createEllipse');
                return null;
            }
        },

        /**
         * Create rectangular mask
         * @param {Layer} layer - Target layer
         * @returns {PropertyGroup} Mask property group
         */
        createRectangle: function(layer) {
            if (!layer) return null;
            try {
                var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
                mask.property("ADBE Mask Shape").setValue(this.createMaskRect());
                return mask;
            } catch (error) {
                ae.handleError(error, 'mask.createRectangle');
                return null;
            }
        },

        /**
         * Create mask ellipse shape
         * @returns {Shape} Mask ellipse shape
         */
        createMaskEllipse: function() {
            var shape = new Shape();
            shape.vertices = [[0,0], [0,0], [0,0], [0,0]];
            shape.inTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.outTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.closed = true;
            return shape;
        },

        /**
         * Create mask rectangle shape
         * @returns {Shape} Mask rectangle shape
         */
        createMaskRect: function() {
            var shape = new Shape();
            shape.vertices = [[0,0], [0,0], [0,0], [0,0]];
            shape.inTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.outTangents = [[0,0], [0,0], [0,0], [0,0]];
            shape.closed = true;
            return shape;
        },

        /**
         * Set mask path vertices
         * @param {PropertyGroup} mask - Mask property group
         * @param {Array} vertices - Mask vertices
         * @returns {ae} Chainable
         */
        setPath: function(mask, vertices) {
            if (mask) {
                try {
                    var shape = mask.property("ADBE Mask Shape").value;
                    shape.vertices = vertices;
                    mask.property("ADBE Mask Shape").setValue(shape);
                } catch (error) {
                    ae.handleError(error, 'mask.setPath');
                }
            }
            return ae;
        },

        /**
         * Set mask feather
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} feather - Feather amount
         * @returns {ae} Chainable
         */
        setFeather: function(mask, feather) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Feather").setValue([feather, feather]);
                } catch (error) {
                    ae.handleError(error, 'mask.setFeather');
                }
            }
            return ae;
        },

        /**
         * Set mask opacity
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} opacity - Opacity percentage
         * @returns {ae} Chainable
         */
        setOpacity: function(mask, opacity) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Opacity").setValue(opacity);
                } catch (error) {
                    ae.handleError(error, 'mask.setOpacity');
                }
            }
            return ae;
        },

        /**
         * Set mask blending mode
         * @param {PropertyGroup} mask - Mask property group
         * @param {MaskMode} mode - Mask mode
         * @returns {ae} Chainable
         */
        setMode: function(mask, mode) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Mode").setValue(mode);
                } catch (error) {
                    ae.handleError(error, 'mask.setMode');
                }
            }
            return ae;
        },

        /**
         * Set mask expansion
         * @param {PropertyGroup} mask - Mask property group
         * @param {number} expansion - Expansion amount
         * @returns {ae} Chainable
         */
        setExpansion: function(mask, expansion) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Offset").setValue(expansion);
                } catch (error) {
                    ae.handleError(error, 'mask.setExpansion');
                }
            }
            return ae;
        },

        /**
         * Invert mask
         * @param {PropertyGroup} mask - Mask property group
         * @param {boolean} inverted - Inverted state
         * @returns {ae} Chainable
         */
        setInverted: function(mask, inverted) {
            if (mask) {
                try {
                    mask.property("ADBE Mask Inverted").setValue(inverted);
                } catch (error) {
                    ae.handleError(error, 'mask.setInverted');
                }
            }
            return ae;
        }
    };
}(ae));

    // --- masks/index.js ---
/**
 * Masks module exports
 */

// Import masks modules
// (included in bundle)

// Export masks namespace
(function(ae) {
    ae.masks = ae.mask;
}(ae));

    // --- markers/markers.js ---
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

    // --- markers/index.js ---
/**
 * Markers module exports
 */

// Import markers modules
// (included in bundle)

// Export markers namespace
(function(ae) {
    ae.markers = ae.marker;
}(ae));

    // --- render/render-queue.js ---
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

    // --- render/index.js ---
/**
 * Render module exports
 */

(function(ae) {
    // ae.render is already defined in render-queue.js
}(ae));

    // --- automation/job-executor.js ---
/**
 * Nexrender-style Job Executor
 * @namespace
 */

(function(ae) {
    'use strict';

    ae.automation = {
        /**
         * Execute a complete job description
         * @param {Object} job - Job object (nexrender style)
         * @returns {Object} Execution results
         */
        executeJob: function(job) {
            ae.log('Starting job execution: ' + (job.uid || 'unnamed'));

            var results = {
                uid: job.uid,
                actions: [],
                assets: [],
                success: true
            };

            try {
                // 1. Pre-render actions
                this._executeActions(job.actions ? job.actions.prerender : [], 'prerender', results);

                // 2. Process assets (setup composition)
                if (job.assets) {
                    this._processAssets(job.assets, results);
                }

                // 3. Render
                if (job.template && job.template.composition) {
                    var renderParams = {
                        composition: job.template.composition,
                        outputFile: job.template.outputFile || (job.uid + '.mp4'),
                        outputTemplate: job.template.outputModule || 'Lossless',
                        renderSettings: job.template.settings || 'Best Settings',
                        startRender: job.template.startRender !== false
                    };

                    ae.log('Adding composition to render queue: ' + renderParams.composition);
                    var renderResult = ae.functions.execute('composition-render', renderParams);
                    results.render = renderResult;
                }

                // 4. Post-render actions
                this._executeActions(job.actions ? job.actions.postrender : [], 'postrender', results);

            } catch (error) {
                results.success = false;
                results.error = error.message;
                ae.handleError(error, 'automation.executeJob');
            }

            return results;
        },

        /**
         * Load job from JSON file and execute
         * @param {string} filepath - Path to job.json
         * @returns {Object} Execution results
         */
        executeJobFile: function(filepath) {
            var file = new File(filepath);
            if (!file.exists) {
                throw new Error('Job file not found: ' + filepath);
            }

            file.open('r');
            var content = file.read();
            file.close();

            var job;
            try {
                // Use native JSON if available (AE 2023+)
                if (typeof JSON !== 'undefined' && JSON.parse) {
                    job = JSON.parse(content);
                } else {
                    job = eval('(' + content + ')');
                }
            } catch (e) {
                throw new Error('Failed to parse job JSON: ' + e.message);
            }

            return this.executeJob(job);
        },

        /**
         * Internal: Execute a list of actions
         * @private
         */
        _executeActions: function(actions, type, results) {
            if (!actions || actions.length === 0) return;

            ae.log('Executing ' + type + ' actions (' + actions.length + ')');

            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                try {
                    var result = ae.functions.execute(action.module || action.name, action.params || action);
                    results.actions.push({
                        type: type,
                        name: action.module || action.name,
                        success: true,
                        result: result
                    });
                } catch (e) {
                    ae.log('Action failed: ' + (action.module || action.name) + ' - ' + e.message);
                    results.actions.push({
                        type: type,
                        name: action.module || action.name,
                        success: false,
                        error: e.message
                    });
                }
            }
        },

        /**
         * Internal: Process assets/params
         * @private
         */
        _processAssets: function(assets, results) {
            ae.log('Processing assets (' + assets.length + ')');

            for (var i = 0; i < assets.length; i++) {
                var asset = assets[i];

                try {
                    var result;
                    if (asset.type === 'js' || asset.type === 'script') {
                        if (asset.script) {
                            eval(asset.script);
                        } else if (asset.src) {
                            $.evalFile(asset.src);
                        }
                        result = { success: true, type: 'script' };
                    } else if (asset.type === 'image' || asset.type === 'video' || asset.type === 'audio' || asset.type === 'footage') {
                        // Footage import support
                        if (asset.src) {
                            result = ae.project.importFile(asset.src);
                            if (result && asset.layerName && asset.composition) {
                                var comp = ae.comp.getByName(asset.composition);
                                if (comp) {
                                    var layer = ae.layer.getByName(comp, asset.layerName);
                                    if (layer && layer.replaceSource) {
                                        layer.replaceSource(result, false);
                                    } else {
                                        ae.layer.create(comp, result);
                                    }
                                }
                            }
                        }
                    } else {
                        // Data assets (text, properties, effects)
                        var functionName = asset.property ? 'layer-property-set' : 'text-params-set';
                        if (asset.effectName) functionName = 'effect-property-set';

                        result = ae.functions.execute(functionName, asset);
                    }

                    results.assets.push({
                        name: asset.layerName || asset.src || 'unnamed',
                        success: true,
                        result: result
                    });
                } catch (e) {
                    ae.log('Asset processing failed: ' + e.message);
                    results.assets.push({
                        name: asset.layerName || asset.src || 'unnamed',
                        success: false,
                        error: e.message
                    });
                }
            }
        }
    };
}(ae));

    // --- automation/index.js ---
/**
 * Automation module exports
 */

// Import automation modules
// (included in bundle)

// Export automation namespace
(function(ae) {
    // Already attached in job-executor.js
}(ae));

    // --- functions/function-executor.js ---
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

    // --- functions/index.js ---
/**
 * Functions module exports
 */

// Import function modules
// (included in bundle)

// Export functions namespace
(function(ae) {
    // Functions are already attached to ae.functions in function-executor.js
}(ae));

    // --- main.js ---
/**
 * After Effects Automation Main Entry Point
 * Use this script to run jobs from the command line or as a startup script.
 */

// Framework is included during build
// #include "index.js"

(function() {
    'use strict';

    // Initialize framework
    ae.init({
        logging: true,
        errorHandling: true
    });

    ae.log('Automation script started');

    /**
     * Get job file from environment or global variable
     * 1. Check for global NEXRENDER_JOB variable
     * 2. Check for environment variable via $.getenv
     */
    function getJobFilePath() {
        // 1. Check global variable (can be set via -r "var NEXRENDER_JOB='/path/to/job.json';")
        if (typeof NEXRENDER_JOB !== 'undefined' && NEXRENDER_JOB) {
            return NEXRENDER_JOB;
        }

        // 2. Check environment variable
        var envJob = $.getenv('NEXRENDER_JOB');
        if (envJob) {
            return envJob;
        }

        // 3. Look for job.json in the same directory as the script
        var scriptFile = new File($.fileName);
        var defaultJob = new File(scriptFile.path + '/job.json');
        if (defaultJob.exists) {
            return defaultJob.fsName;
        }

        return null;
    }

    var jobPath = getJobFilePath();

    if (jobPath) {
        ae.log('Loading job from: ' + jobPath);
        try {
            var results = ae.automation.executeJobFile(jobPath);
            ae.log('Job execution complete. Success: ' + results.success);

            if (!results.success) {
                ae.log('Error: ' + results.error);
            }
        } catch (error) {
            ae.handleError(error, 'main.executeJobFile');
        }
    } else {
        ae.log('No job file specified via NEXRENDER_JOB env/global or job.json. Standing by.');
    }

})();


    return ae;
}));