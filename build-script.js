const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  srcDir: './src',
  buildDir: './build',
  outputFile: 'ae-scripting.jsx',
  minifiedFile: 'ae-scripting-min.jsx'
};

// Get all JS files in correct order
function getFiles() {
  const coreFiles = [
    'core/framework.js',
    'core/utils.js',
    'core/index.js'
  ];

  const moduleDirs = [
    'application',
    'project',
    'composition',
    'layer',
    'properties',
    'effects',
    'expressions',
    'masks',
    'markers',
    'render',
    'automation',
    'functions'
  ];

  let files = [];
  
  coreFiles.forEach(f => files.push(path.join(config.srcDir, f)));

  moduleDirs.forEach(dir => {
    const dirPath = path.join(config.srcDir, dir);
    if (fs.existsSync(dirPath)) {
      const dirFiles = fs.readdirSync(dirPath);
      // Ensure specific order if needed, otherwise alphabetical
      dirFiles.sort().forEach(f => {
        if (f.endsWith('.js') && f !== 'index.js') {
          files.push(path.join(dirPath, f));
        }
      });
      if (fs.existsSync(path.join(dirPath, 'index.js'))) {
        files.push(path.join(dirPath, 'index.js'));
      }
    }
  });

  // Main entry point last
  files.push(path.join(config.srcDir, 'main.js'));

  return files;
}

// Build the framework
function buildFramework(minify = false) {
  console.log('Building AE Scripting Framework...');
  
  const files = getFiles();
  let output = `/**
 * After Effects Scripting Framework
 * @version 2.0.0
 * @description A comprehensive JavaScript library for automating Adobe After Effects
 * @license MIT
 * @built ${new Date().toISOString()}
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

    var ae; // This will hold our AEFramework instance\n\n`;

  // Read and concatenate all files
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove #include directives to ensure the bundle is self-contained
    content = content.replace(/^\s*#include\s+["'].*["']/gm, '// (included in bundle)');

    output += '    // --- ' + path.relative(config.srcDir, file) + ' ---\n';

    if (file.endsWith('core/framework.js')) {
        // Strip the UMD wrapper from core/framework.js and just extract the factory body
        const factoryMatch = content.match(/function\(\) \{([\s\S]*?)return AEFramework;\s*\}\)\);/);
        if (factoryMatch) {
            content = factoryMatch[1];
            content = content.replace(/var AEFramework =/, 'ae =');
        }
    }

    output += content + '\n\n';
  });

  output += `    return ae;
}));`;

  // Minify if requested
  if (minify) {
    // Simple minification that keeps internal logic intact
    output = output
      .replace(/\/\/\s*---\s*.*\s*---\n/g, '') // Remove our custom markers
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      // .replace(/\/\/.*/g, '') // Remove line comments - BE CAREFUL with URLs/regex
      .replace(/\n\s*\n/g, '\n') // Collapse multiple newlines
      .trim();
  }

  // Ensure build directory exists
  if (!fs.existsSync(config.buildDir)) {
    fs.mkdirSync(config.buildDir, { recursive: true });
  }

  // Write output file
  const outputPath = path.join(
    config.buildDir, 
    minify ? config.minifiedFile : config.outputFile
  );
  
  fs.writeFileSync(outputPath, output);
  console.log(`Built: ${outputPath} (${output.length} bytes)`);
}

// Run build
const minify = process.argv.includes('--minify');
buildFramework(minify);