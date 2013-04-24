(function () {

    //<summary>
    //  Dijkstra's algorithm to find shortest path from s to all other nodes
    //</summary>
    //<params name="graph" type="DirectedGraph"></param>
    //<params name="start" type="string"></param>
    var Djikstra = function (graph, start) {
        this.Graph = graph;
        this.visited = new Array(graph.size());
        this.distance = new Array(graph.size());
        this.preds = [];
        this.start = start;
        this.initialize();
    };

    var minVertex = function (distance, visitedNodes) {
        var x = MAX_VALUE, y = -1, i;

        for (i = 0; i < distance.length; i++) {
            if (!visitedNodes[i] && distance[i] < x) {
                y = i;
                x = distance[i];
            }
        }
        return y;
    }

    var MAX_VALUE = Number.MAX_VALUE;

    Djikstra.prototype = {
        distance: [],

        //<summary>
        // initialize
        //</summary>
        initialize: function () {

            var idxStart = this.Graph.indexOf(this.start), i, j;

            for (var i = 0; i < this.Graph.size() ; i++) {
                this.distance[i] = Number.MAX_VALUE;
                this.visited[i] = false;
                this.preds[i] = null;
            }

            this.distance[idxStart] = 0;

            for (i = 0 ; i < this.distance.length; i++) {

                var next = minVertex(this.distance, this.visited);

                this.visited[next] = true;

                // The shortest path to next is dist[next] and via pred[next].

                var neighbors = this.Graph.edgesFrom(this.Graph.nodeAt(next));

                for (j = 0; j < neighbors.length; j++) {

                    var neighborlength = Number(neighbors[j][1]) + Number(this.distance[next]);
                    var neighbor = neighbors[j][0];
                    var neighborIdx = this.Graph.indexOf(neighbor);

                    if (this.distance[neighborIdx] > neighborlength) {
                        this.distance[neighborIdx] = neighborlength;
                        this.preds[neighborIdx] = next;
                    }
                }
            }
            return this;
        },
        //<summary>
        // Find the best path between 2 nodes.
        //</summary>
        bestPath: function (source, destination) {

            var path = [];
            var end = this.Graph.indexOf(destination);
            var idxSource = this.Graph.indexOf(source);
            while (end != idxSource) {

                path.splice(0, 0, this.Graph.nodeAt(end));
                end = this.preds[end];
            }
            path.splice(0, 0, source);

            return path;
        },
    };

    window.Djikstra = Djikstra;

    if (typeof define === "function" && define.amd) {

        define("Djikstra", [], function () {
            return Djikstra;
        });
    }
})();
