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
