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