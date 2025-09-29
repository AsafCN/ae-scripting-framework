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