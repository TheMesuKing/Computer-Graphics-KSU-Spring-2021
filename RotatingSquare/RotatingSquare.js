﻿"use strict";

/*
 * Course: CS 4722
 * Section: 01
 * Name: Johnny Huynh
 * Professor: Shaw
 * Assignment #: Mod #1 Assignment 2 Excercise 1
 */

var canvas;
var gl;

var theta = 0.0;
var dtheta = 0.1;
var thetaLoc;
var speed = 50;
var bufferId;
var vertices;
var dir = -1;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1, 0),
        vec2(0, -1)
    ];

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // uniform variable declaration in init()
    thetaLoc = gl.getUniformLocation(program, "theta");
    gl.uniform1f(thetaLoc, theta);

    // slider handler
    document.getElementById("sliderval").onchange =
        function (event) {
            speed = event.target.value;
        };


    // button handler
    document.getElementById("buttonval").onclick =
        function () {
            dir = -dir;
        };


    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // new render() function:
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += dir * dtheta * speed / 100;
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimFrame(render);
}