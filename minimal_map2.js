var padding2 = 5;
var w2 = 1200;
var h2 = 600;
var boroughs_names_data = 'data/borough_locs.json'
var centroids_alcohol = "data/AI_centroids.csv";
var centroids_turning = "data/TI_centroids.csv";
var centroids_speeding = "data/US_centroids.csv";
var centroids_traffic = "data/TCD_centroids.csv";
var centroids_fatigued = "data/FD_centroids.csv";
var draw_centroids = centroids_fatigued;

var ti_size = 18958;
var us_size = 2181;
var ai_size = 6458;
var fd_size = 38219;
var tcd_size = 10074;
var curr_size = fd_size;
var path2 = d3.geoPath();
var url2 = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
var bor_names;
var selector = 0;
var prev_selector = 2;
var projection2;
var svg2 = d3.select("#map2").append("svg")
                         .attr("width", w2)
                         .attr("height", h2+padding2);
var total = 0;


d3.json(url2, function (json2) {
  map2 = json2
  drawMap2()

});




d3.select("#c_buttons")
  .on("click", function() {
    var btn_val2 = d3.event.target
    selector2 = btn_val2.value;
    document.getElementById('c_button'+selector2).className = 'c_button_active';
    document.getElementById('c_button'+prev_selector2).className = 'c_button';
    prev_selector2 = selector2;
    console.log('SECOND'+selector)  
    if(selector2 == 2){
      draw_centroids = centroids_fatigued;
      curr_size = fd_size;
    }
    else if(selector2 == 3){
      draw_centroids = centroids_speeding;
      curr_size = us_size;
    }
    else if(selector2 == 4){
      draw_centroids = centroids_turning;
      curr_size =ti_size;
    }
    else if(selector2 == 5){
      draw_centroids = centroids_traffic;
      curr_size = tcd_size;
    }
    else if(selector2 == 6){
      draw_centroids = centroids_alcohol;
      curr_size = ai_size;
    }
    d3.json(url, function (json) {
      map2 = json
      updateMap2()
    });
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
               //.style("fill", '#e1361a')
               .style("opacity", function(d) {
                  return d.size/curr_size*5;
               })
               .attr("stroke", "rgba(0, 0, 0, 1)")
               .attr("stroke-width", 1.5)
               .on("mouseover", function(d) {
                  d3.select(this).style("fill", "yellow");
                })                  
              .on("mouseout", function(d) {
                d3.select(this).style("fill", "#e1361a");
              })
              .style("fill", '#e1361a');


     $('svg circle').tipsy({ 
        gravity: 'w', 
        html: true, 
        title: function() {
          var d = this.__data__, c = 'blue';
          if(d.size != null){
            return 'Total accidents in area: ' + d.size + '<br>' ;
          }
          else{
            return 'Injured: '+ d.NUMBER_OF_PERSONS_INJURED ;
          }
           
        }
      });
          });

    d3.json(boroughs_names_data, function(data) {
            
    svg2.selectAll("text")
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


var updateMap2 = function(){

  d3.csv(draw_centroids, function(data) {
    svg2.selectAll("circle").remove();
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
               .style("opacity", function(d) {
                  return d.size/curr_size*4;
               })
               .attr("stroke", "rgba(0, 0, 0, 1)")
               .attr("stroke-width", 1.5)
                           .on("mouseover", function(d) {
                  d3.select(this).style("fill", "yellow");
                })                  
              .on("mouseout", function(d) {
                d3.select(this).style("fill", "#e1361a");
              })
              .style("fill", '#e1361a');

$('svg circle').tipsy({ 
        gravity: 'w', 
        html: true, 
        title: function() {
          var d = this.__data__, c = 'blue';
          if(d.size != null){
            return 'Total accidents in area: ' + d.size + '<br>' ;
          }
          else{
            return 'Injured: '+ d.NUMBER_OF_PERSONS_INJURED ;
          }
           
        }
      });
            
  });

}