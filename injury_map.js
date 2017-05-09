var padding = 5;
//var widthGeo = window.innerWidth - padding
var w = 1200;
var h = 600;


var path = d3.geoPath();
var boroughs_names_data = 'data/borough_locs.json'
var data_fatigued = "data/xy_injured_Fatigued_Drowsy.csv";
var data_alcohol = "data/xy_injured_Alcohol Involvement.csv";
var data_speeding = "data/xy_injured_Unsafe Speed.csv";
var data_traffic = "data/xy_injured_Traffic.csv";
var data_turning = "data/xy_injured_Turning.csv";
var draw_data = data_fatigued;

var points1;
var points2;
var selector2 = 0;
var prev_selector2 = 2;

var url = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
//var url = 'data/borough.geojson'
var svg = d3.select("#map").append("svg")
                         .attr("width", w)
                         .attr("height", h+padding);

d3.json(url, function (json) {
  map = json
  drawMap()
});

d3.select("#buttons")
  .on("click", function() {
    var btn_val = d3.event.target
    selector = btn_val.value;
    document.getElementById('button'+selector).className = 'button_active';
    document.getElementById('button'+prev_selector).className = 'button';
    prev_selector = selector;  
    if(selector == 2){
      draw_data = data_fatigued;
    }
    else if(selector == 3){
      draw_data = data_speeding;
    }
    else if(selector == 4){
      draw_data = data_turning;
    }
    else if(selector == 5){
      draw_data = data_traffic;
    }
    else if(selector == 6){
      draw_data = data_alcohol;
    }
    d3.json(url, function (json) {
      map = json
      updateMap()
    });
});


var drawMap = function(){
  projection = d3.geoAlbersUsa()
                   .fitSize([w, h], map);
  path.projection(projection)
  svg.selectAll("path")
              .data(map.features)
              .enter()
              .append("path")
              .attr("d", path)
              .style("fill", "lightgray")
              .attr("stroke", "rgba(0, 0, 0, 0.5)")
              .attr("stroke-width", 0.5);

  d3.csv(draw_data, function(data) {
            
    svg.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                 return projection([d.LONGITUDE, d.LATITUDE])[0];
               })
               .attr("cy", function(d) {
                 return projection([d.LONGITUDE, d.LATITUDE])[1];
               })
               .attr("r", 2)
               .style("fill", function(d) {
                if(d.NUMBER_OF_PERSONS_INJURED > 0 ){
                  return 'red';
                }
                else{
                  return 'yellow';
                }
              })
               .style("opacity", 0.75)
               .attr("stroke", "rgba(0, 0, 0, 0.5)")
               .attr("stroke-width", 0.5);
            
          });
d3.json(boroughs_names_data, function(data) {
            
    svg.selectAll("text")
               .data(data)
               .enter()
               .append("text")
               .style('opacity', 0.5)
               .style("text-anchor", "middle")
               .style("font-size", "7px")
               .style("font-family", "Helvetica")
                .attr("x", function(d) {
                    var longitude = d.loc[1];
            var latitude = d.loc[0];
            return projection([longitude, latitude])[0];
          })
          .attr("y", function(d) { 
            var longitude = d.loc[1];
            var latitude = d.loc[0];
            return projection([longitude, latitude])[1];
          })
               //.attr("r", 30);
               .text(function(d) {
            return d.dist;
          });
            
          });
}

var updateMap = function(){

  d3.csv(draw_data, function(data) {
    svg.selectAll("circle")
               .data(data)
               //.enter()
               //.append("circle")
               .attr("cx", function(d) {
                 return projection([d.LONGITUDE, d.LATITUDE])[0];
               })
               .attr("cy", function(d) {
                 return projection([d.LONGITUDE, d.LATITUDE])[1];
               })
               .attr("r", 2)
               .style("fill", function(d) {
                if(d.NUMBER_OF_PERSONS_INJURED > 0 ){
                  return 'red';
                }
                else{
                  return 'yellow';
                }
                //return 'red';
              })
               .style("opacity", 0.75)
               .attr("stroke", "rgba(0, 0, 0, 0.5)")
               .attr("stroke-width", 0.5);
            
  });

}
