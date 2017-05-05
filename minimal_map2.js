var padding2 = 5;
var w2 = 1200;
var h2 = 600;

var centroids_fatigued = "data/ti_centroids_8.csv";
//var centroids_alcohol = "data/xy_injured_Alcohol Involvement.csv";
//var centroids_speeding = "data/xy_injured_Unsafe Speed.csv";
//var centroids_traffic = "data/xy_injured_Traffic.csv";
//var centroids_turning = "data/xy_injured_Turning.csv";
var draw_centroids = centroids_fatigued;

var path2 = d3.geoPath();
var url2 = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"

var svg2 = d3.select("#map2").append("svg")
                         .attr("width", w2)
                         .attr("height", h2+padding2);


d3.json(url2, function (json2) {
  map2 = json2
  drawMap2()

});

var drawMap2 = function(){
  projection2 = d3.geoAlbersUsa()
                   .fitSize([w2, h2], map2);
  path2.projection(projection2)
  svg2.selectAll("path")
              .data(map2.features)
              .enter()
              .append("path")
              .attr("d", path2)
              .style("fill", "lightblue")
              .attr("stroke", "rgba(0, 0, 0, 0.5)")
              .attr("stroke-width", 0.5);

  d3.csv(draw_centroids, function(data) {
            
    svg2.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                 return projection([d.x, d.y])[0];
               })
               .attr("cy", function(d) {
                 return projection([d.x, d.y])[1];
               })
               .attr("r", function(d) {
                  return d.average_distance*500;
               })
               .style("fill", 'black')
               .style("opacity", function(d) {
                  return d.size*0.0001;
               })
               .attr("stroke", "rgba(0, 0, 0, 0.5)")
               .attr("stroke-width", 0.5);
            
          });

}