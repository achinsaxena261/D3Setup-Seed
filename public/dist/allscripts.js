var width = 960,
    height = 700;

var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
    root = nodes[0],
    color = d3.scale.category10();

root.radius = 0;
root.fixed = true;

var force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return i ? 0 : -2000; })
    .nodes(nodes)
    .size([width, height]);

force.start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("circle")
    .data(nodes.slice(1))
  .enter().append("circle")
    .attr("r", function(d) { return d.radius; })
    .style("fill", function(d, i) { return color(i % 3); });

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) q.visit(collide(nodes[i]));

  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

svg.on("mousemove", function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}


function svgExample(){
    var canvas = d3.select("body")
        .append("svg")
        .attr("width",700)
        .attr("height",700);

    var circle = canvas.append("circle")
        .attr("cx",90)
        .attr("cy",90)
        .attr("r",90)
        .attr("fill","blue");

    var rectangle = canvas.append("rect")
        .attr("width",50)
        .attr("height",50)
        .attr("fill","red"); 

    var line = canvas.append("line")
        .attr("x1",0)
        .attr("x2",200)
        .attr("y1",100)
        .attr("y2",300)
        .attr("stroke","grey")
        .attr("stroke-width",3);    
}

function visualizeOranges() {
    var data = [ { num : 10, color : "red" }, 
                 { num : 30, color : "blue" },  
                 { num : 50, color : "green" },
                 { num : 70, color : "orange" },
                 { num : 90, color : "green" },
                 { num : 120, color : "blue" },                 
                 { num : 170, color : "red" } ];

    var canvas = d3.select(".container")
        .append("svg")
        .attr("width", 1028)
        .attr("height", 760);

    var oranges = canvas.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("fill", function(d){
            return d.color;
        })
        .attr("cx", function (d, i) {
            return d.num + (i * 100);
        })
        .attr("cy", function (d) {
            return d.num;
        })
        .attr("r", function (d) {
            return d.num;
        });
}