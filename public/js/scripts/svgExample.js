
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