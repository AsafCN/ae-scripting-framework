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