function reliability(graph) {
  var sources = graph.sources(),
      sinks   = graph.sinks();
  if (sources.length !== 1 || sinks.length !== 1)
    throw new Error("graph must have exactly one source and one sink");
  
  var source = sources[0], sink = sinks[0];

  var stack = [source];
  var explored = {};

  explore:
  while(stack.length > 0) {
    source = stack.pop();
    if (source === sink) return 1;
    explored[source] = true;
    var edges = graph.nodeEdges(source);
    for(var i=0; i<edges.length; i++) {
      var val = graph.edge(edges[i]);
      if (val === 0) {
        continue;
      } else if (val === 1) {
        var target = edges[i].w;
        if (!explored[target]) stack.push(target);
      } else if (0 < val && val < 1) {
        var sum = 0;
        graph.setEdge(edges[i], 0);
        sum += (1 - val) * reliability(graph);
        graph.setEdge(edges[i], 1);
        sum += val * reliability(graph);
        graph.setEdge(edges[i], val);
        return sum;
      } else {
        throw new Error("Invalid node value: " + val);
      }
    }
  }
  return 0;
}

if (typeof module !== "undefined") module.exports = reliability;

