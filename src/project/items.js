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