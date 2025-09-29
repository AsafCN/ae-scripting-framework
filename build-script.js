const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  srcDir: './src',
  buildDir: './build',
  outputFile: 'ae-scripting.jsx',
  minifiedFile: 'ae-scripting-min.jsx'
};

// Get all JSX files recursively
function getJSXFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getJSXFiles(filePath));
    } else if (path.extname(file) === '.js') {
      results.push(filePath);
    }
  });
  
  return results;
}

// Build the framework
function buildFramework(minify = false) {
  console.log('Building AE Scripting Framework...');
  
  const files = getJSXFiles(config.srcDir);
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

    var AEFramework = {
        version: "2.0.0",
        aeVersion: "2023+",
        debug: false
    };

    // Include all modules\n\n`;

  // Read and concatenate all files
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    output += '    // ' + path.relative(config.srcDir, file) + '\n';
    output += content + '\n\n';
  });

  output += `    return AEFramework;
}));`;

  // Minify if requested
  if (minify) {
    output = output
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([{}();,=])\s*/g, '$1') // Remove spaces around operators
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