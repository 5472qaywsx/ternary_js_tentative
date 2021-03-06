graticule = d3.ternary.graticule()
  .majorInterval(0.2)
  .minorInterval(0.05);

function resize(t) {
  t.fit(window.innerWidth,window.innerHeight);
};

var ternary = d3.ternary.plot()
  .call(resize)
  .call(d3.ternary.scalebars())
  .call(d3.ternary.vertexLabels(["Clay", "Sand", "Silt"]))
  .call(d3.ternary.neatline())
  .call(graticule);

d3.select('body').call(ternary);

function gotData(d) {

  data = d3.entries(d).map(function(d) {
    v = d.value.map(function(c) {return [c.clay, c.silt, c.sand]});
    return { type: d.key, value: v };
  });

  paths = ternary.plot()
    .selectAll("path")
    .data(data);

  paths
    .enter()
      .append('path')
      .attr({
        class: 'ternary-line',
        id: function(d) {return d.type.replace('-', ' ')}
        })
      .on('click', function(d) { console.log(this.id);});

  drawPaths = function(){
    paths.attr("d",function(d) {
      return ternary.path(d.value);
    });
  };
  drawPaths();
  ternary.on("resize", drawPaths);
}

d3.json('data.json', gotData);

window.onresize = function(){
  resize(ternary);
};
