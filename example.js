var graphlib = require("graphlib");
var reliability = require("./index.js");

/**
 * Compute the reliability of the following graph :
 *     ---(0.1)---b---(0.2)---
 *    /                       \
 * --a-----------(0.5)----------c--
 *
 */
var g = new graphlib.Graph();
g.setEdge("a", "c", 0.5);
g.setEdge("a", "b", 0.1);
g.setEdge("b", "c", 0.2);


/* The result is
 * 1 - (1 - 0.5) * (1 - 0.1*0.2) = 0.51
 */
var result = reliability(g);
console.log(result); // Prints 0.51
