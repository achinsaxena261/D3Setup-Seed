
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