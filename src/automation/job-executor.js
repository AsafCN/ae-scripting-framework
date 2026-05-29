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