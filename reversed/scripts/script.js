// Set node colours
var noncoreNodeColour = '#97D4E9';
var coreNodeColour = 'yellow';
var logicNodeColour = 'white';
var noncsNodeColour = "lightgray";
var noncoreNodeHoverColour = '#40B4E5' 
var coreNodeHoverColour = '#ffd21c'
//var noncsNodeColour = "#002145"

// Set stroke colours
var logicStrokeColour = 'transparent';
var courseStrokeColour = 'gray';
var seStrokeColour = '#E69F00'; // '#CC79A7';
var theoryStrokeColour = '#0055B7';
var systemsStrokeColour = '#932ee6';
var appliedStrokeColour = '#b00000';
var ethicsStrokeColour = courseStrokeColour; // '#E69F00';
var linkColour = 'black';
var textColour = 'black';
var highlightColour = '#fabdad';

// Set node size
var nodeSize = 12;
var fontSize = 10;
var noncoreStrokeWidth = 1; // 3;
var coreStrokeWidth = 1;

function getNodeColor(node, neighbors) {
  if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
    return node.course === 0 ? logicNodeColour : highlightColour;
  }
  return node.course === 0 ? logicNodeColour : node.cs === 0? noncsNodeColour : node.core === 0 ? noncoreNodeColour : coreNodeColour;
}

function getNodeHoverColor(node) {
  return node.course === 0 ? logicNodeColour : node.cs === 0? noncsNodeColour : node.core === 0 ? noncoreNodeHoverColour : coreNodeHoverColour;
}

function getCourseStrokeColour(node) {
  if (node.topic) {
    switch(node.topic) {
      case "Software engineering":
        return seStrokeColour;
      case "Theory":
        return theoryStrokeColour;
      case "Systems":
        return systemsStrokeColour;
      case "Applied":
        return appliedStrokeColour;
      case "Ethics":
        return ethicsStrokeColour;
    }
  }
  return courseStrokeColour;
}

function getStrokeColor(node) {
  // return node.course ? getCourseStrokeColour(node) : logicStrokeColour;
  return node.course ? courseStrokeColour : logicStrokeColour;
}

function getStrokeWidth(node) {
  return node.core === 0 ? noncoreStrokeWidth : coreStrokeWidth;
}

function getLinkType(link) {
  if (link.type != null) {
    return "link " + link.type;
  }
  return "link";
}

function getLinkColor(link) {
  return linkColour;
}

function getTextColor(node, neighbors) {
  return Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1 ? textColour : textColour;
}

export function getX(node) {
  return node.fx;
}

export function getY(node) {
  return node.fy;
}

export function makeLinkArrow(svg) {
  // Build the arrow.
  svg.append("svg:defs").selectAll("marker")
  .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
  .attr("id", String)
  .attr("viewBox", "0 -5 10 10")
  .attr("refX", 30)
  .attr("refY", 0)
  .attr("markerWidth", 6)
  .attr("markerHeight", 6)
  .attr("orient", "auto")
  .append("svg:path")
  .attr("d", "M0,-5L10,0L0,5");

  return svg;
}

export function makeObj(node) {
  var obj = {};
  obj.header = "CPSC " + node.name + ": " + node.title;
  obj.rows = [];
  obj.rows.push({
    "label" : "Course Learning Outcomes",
    "value" : ""
  });

  if (node.clos != null) {
    var clos = node.clos // Get CLO list
    var label = 1
    // Keep pushing till the end of the list
    for (var i in clos) {
      obj.rows.push({
        "label" : label + ". ",
        "value" : clos[i]
      });
      label ++
    }
  } else {
    obj.rows.push({
    "label" : node.name,
    "value" : "TBD"
    });
  }
  return obj;
}

export function customTooltip(width, height) {
  var custom_tooltip = tnt.tooltip()
  .width(width*0.3)
  .fill (function (obj) {
    var tooltip_div = d3.select(this);
    var obj_info_table = tooltip_div
      //.style("overflow", "hidden")
      .append("div")
      .attr("class", "scrollable")
      .style("width", custom_tooltip.width() + "px")
      .style("height", height*0.4 + "px")
      .append("table")
      .attr("class", "tnt_zmenu")
      .attr("border", "solid")
      .style("width", custom_tooltip.width() + "px");

    // Tooltip header
    if (obj.header) {
      obj_info_table.append("tr")
        .attr("class", "tnt_zmenu_header")
        .append("th")
        .attr("colspan", 2)
        .text(obj.header);
    }

    // Tooltip rows
    var table_rows = obj_info_table.selectAll(".tnt_zmenu_row")
      .data(obj.rows)
      .enter()
      .append("tr")
      .attr("class", "tnt_zmenu_row");

    table_rows
      .append("th")
      .attr("colspan", function (d, i) {
                if (d.value === "") {
                    return 2;
                }
                return 1;
            })
            .attr("class", function (d) {
                if (d.value === "") {
                    return "tnt_zmenu_inner_header";
                }
                return "tnt_zmenu_cell";
            })
            .html(function(d,i) {
                return obj.rows[i].label;
            });

        table_rows
            .append("td")
            .html(function(d,i) {
                if (typeof obj.rows[i].value === 'function') {
                    obj.rows[i].value.call(this, d);
                } else {
                    return obj.rows[i].value;
                }
            })
            .each(function (d) {
                if (d.value === "") {
                    d3.select(this).remove();
                }
            })
            .each(function (d) {
                if (d.link === undefined) {
                    return;
                }
                d3.select(this)
                .classed("link", 1)
                .on('click', function (d) {
                    d.link(d.obj);
                    t.close.call(this);
                });
            });
    });
  return custom_tooltip;
}

export function addLinkElements(svg, data) {
  var linkElements = svg.selectAll("line.link")
  .data(data.links)
  .enter().append("line")
  // .attr("class", "link")
  .attr("class", getLinkType)
  .attr("stroke-width", 1)
  .attr("stroke", getLinkColor)
  .attr("marker-end", "url(#end)");

  return linkElements; 
}

export function addNodeElements(svg, data, custom_tooltip) {
  var nodeElements = svg.selectAll("circle")
    .data(data.nodes)
    .enter();

  nodeElements.append("circle")
    .filter(function(d){ return d.shape === "circle" })
      .attr('cx', function (node) { return getX(node) })
      .attr('cy', function (node) { return getY(node) })
      .attr("r", nodeSize)
      .attr("fill", getNodeColor)
      .style("stroke", getStrokeColor)
      .style("stroke-width", getStrokeWidth)
      .on("click", function (node) {
        if (node.course) {
          var obj = makeObj(node);
          custom_tooltip.call(this, obj);
        }
      })
      .on("mouseover", function(node) {
        d3.select(this).attr('fill', getNodeHoverColor).style("cursor", "pointer");
      })                  
      .on("mouseout", function(node) {
        d3.select(this).attr('fill', getNodeColor).style("cursor", "default");
      });

  nodeElements.append("ellipse")
      .filter(function(d){ return d.shape === "ellipse" })
      .attr('cx', function (node) { return getX(node) })
      .attr('cy', function (node) { return getY(node) })
      .attr("rx", 25)
      .attr("ry", 10)
      .attr("fill", getNodeColor)
      .style("stroke", getStrokeColor);

  nodeElements.append("circle")
      .filter(function(d){ return d.shape === "rect" })
      .attr('cx', function (node) { return getX(node) })
      .attr('cy', function (node) { return getY(node) })
      .attr("r", nodeSize)
      .attr("fill", logicNodeColour)
      .style("stroke", logicStrokeColour);

  return nodeElements.exit;
}

export function addTextElements(svg, data, custom_tooltip) {
  var textElements = svg.selectAll("text")
    .data(data.nodes)
    .enter();

  textElements.append("text").filter(function(d){ return d.shape === "circle" })
      //.text(function (node) { return node.name })
      // For cases where the course id is too long to fit in one line
      .html(function (node) {
        var arr = node.name.split('|')
        var xCoord = getX(node) - 1;
        var xCoord_onwards = xCoord - 6; // Handle indentation on the second line onwards
        if (arr.length > 1) {
          return "<tspan x = " + xCoord.toString() + " dy='0.1em'>" + arr.join("</tspan>" + "<tspan x = " + xCoord_onwards.toString() + " dy='0.8em'>") + "</tspan>"
        }
        return arr.join('');
      })
      .attr('x', function (node) { return getX(node) })
      .attr('y', function (node) { return getY(node) })
      .attr("font-size", fontSize)
      .attr("dx", -8) 
      .attr("dy", 3)
      .on("click", function (node) {
        if (node.course) {
          var obj = makeObj(node)
          custom_tooltip.call(this, obj)
        }
      })
      .on({
        "mouseover": function(d) {
        d3.select(this).style("cursor", "pointer"); 
        },
        "mouseout": function(d) {
          d3.select(this).style("cursor", "default"); 
        }
      });

  textElements.append("text").filter(function(d){ return d.shape === "ellipse" })
      .html(function (node) {
        return node.name
      })
      .attr('x', function (node) { return getX(node) })
      .attr('y', function (node) { return getY(node) })
      .attr("font-size", fontSize)
      .attr("dx", -20) 
      .attr("dy", 3);

  textElements.append("text").filter(function(d){ return d.shape === "rect" })
      .html(function (node) {
        var arr = node.name.split('|')
        var xCoord = getX(node) - 30;
        var yCoord = getY(node) + 30;
        if (arr.length > 1) {
          return "<tspan x = " + xCoord.toString() + " dy='1em'>" + arr.join("</tspan>" + "<tspan x = " + xCoord.toString() + " dy='1em'>") + "</tspan>"
        }
        return arr.join('');
      })
      .attr('x', function (node) { return getX(node) })
      .attr('y', function (node) { return getY(node) })
      .attr("font-size", fontSize)
      .attr("dx", 2) 
      .attr("dy", 0);

  return textElements;
}