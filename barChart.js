var colors = {
  "Ireland": "#ff9933",
  "Leinster": "#33cc33",
  "Carlow": "#d6f5d6",
  "Offaly": "#85e085",
  "Westmeath": "#70db70",
  "Kildare": "#5cd65c",
  "Kilkenny": "#47d147",
  "Louth": "#2eb82e",
  "Wicklow": "#29a329",
  "Wexford": "#248f24",
  "Meath": "#1f7a1f",
  "Laois": "#196619",
  "Dublin": "#196619",
  "Longford": "#0f3d0f",
  "Munster": "#0066ff",
  "Cork": "#b3e0ff",
  "Limerick": "#80ccff",
  "Kerry": "#1aa3ff",
  "Tipperary": "#0039e6",
  "Clare": "#002db3",
  "Waterford": "#001a66",

  "Connacht": "#ff3300",
  "Galway": "#ffd6cc",
  "Mayo": "#ff9980",
  "Sligo": "#ff471a",
  "Roscommon": "#e62e00",
  "Leitrim": "#b32400",

  "Ulster": "#33cccc",
  "Antrim": "#99e6e6",
  "Down": "#adebeb",
  "Derry": "#85e0e0",
  "Tyrone": "#2eb8b8",
  "Armagh": "#29a3a3",
  "Donegal": "#248f8f",
  "Cavan": "#1f7a7a",
  "Fermanagh": "#196666",
  "Monaghan": "#145252"
};
var margin = {top: 20, right: 20, bottom: 70, left: 70},
    width = 850 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("counties.csv", function(error, data) {

    
    data.forEach(function(d) {
        d.county = d.county;
        d.value = +d.value;
    });

    data.sort(function(a, b) {
      return d3.descending(a.value, b.value)
    })
  
  x.domain(data.map(function(d) { return d.county; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", ".11em")
      .style("text-anchor", "end");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", function(d) { return colors[d.county]; })
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.county); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});