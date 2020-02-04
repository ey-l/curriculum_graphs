import { getXCoord, getYCoord, add_legend_cs_only } from './cs_only.js';

// Set node colours
var noncoreNodeColour = 'lightsteelblue';
var coreNodeColour = 'yellow';
var logicNodeColour = 'white';
var noncsNodeColour = "lightgray";

// Set stroke colours
var logicStrokeColour = 'transparent';
var courseStrokeColour = 'gray';
var linkColour = 'black';
var textColour = 'black';
var highlightColour = '#fabdad';

function getNodeColor(node, neighbors) {
  if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
    return node.course === 0 ? logicNodeColour : highlightColour;
  }
  return node.course === 0 ? logicNodeColour : node.cs === 0? noncoreNodeColour : node.core === 0 ? noncoreNodeColour : coreNodeColour;
}

function getNodeSize(node, neighbors) {
  return node.course ? 12 : 12;
}

function getStrokeColor(node, neighbors) {
  return node.course ? courseStrokeColour : logicStrokeColour;
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
    "label" : node.name + "_1",
    "value" : "CLO 1"
    });

    obj.rows.push({
      "label" : node.name + "_2",
      "value" : "CLO 2"
    });
  }
  return obj;
}

export function customTooltip(width, height) {
  var custom_tooltip = tnt.tooltip()
  .width(width*0.25)
  .fill (function (obj) {
    var tooltip_div = d3.select(this);
    var obj_info_table = tooltip_div
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
    .enter()

  nodeElements.append("circle")
    .filter(function(d){ return d.shape === "circle" })
      .attr('cx', function (node) { return getXCoord(node) })
      .attr('cy', function (node) { return getYCoord(node) })
      .attr("r", getNodeSize)
      .attr("fill", getNodeColor)
      .style("stroke", getStrokeColor)
      .on("click", function (node) {
        if (node.course) {
          var obj = makeObj(node)
          custom_tooltip.call(this, obj)
        }
      })

  nodeElements.append("ellipse")
      .filter(function(d){ return d.shape === "ellipse" })
      .attr('cx', function (node) { return getXCoord(node) })
      .attr('cy', function (node) { return getYCoord(node) })
      .attr("rx", 25)
      .attr("ry", 10)
      .attr("fill", getNodeColor)
      .style("stroke", getStrokeColor)

  nodeElements.append("circle")
      .filter(function(d){ return d.shape === "rect" })
      .attr('cx', function (node) { return getXCoord(node) })
      .attr('cy', function (node) { return getYCoord(node) })
      .attr("r", 12)
      .attr("fill", "white")
      .style("stroke", "transparent")

  return nodeElements.exit;
}

export function addTextElements(svg, data, custom_tooltip) {
  var textElements = svg.selectAll("text")
    .data(data.nodes)
    .enter()

  textElements.append("text").filter(function(d){ return d.shape === "circle" })
      .text(function (node) { return node.name })
      .attr('x', function (node) { return getXCoord(node) })
      .attr('y', function (node) { return getYCoord(node) })
      .attr("font-size", 10)
      .attr("dx", -8) 
      .attr("dy", 3)
      .on("click", function (node) {
        if (node.course) {
          var obj = makeObj(node)
          custom_tooltip.call(this, obj)
        }
      })

  textElements.append("text").filter(function(d){ return d.shape === "ellipse" })
      .html(function (node) {
        return node.name
      })
      .attr('x', function (node) { return getXCoord(node) })
      .attr('y', function (node) { return getYCoord(node) })
      .attr("font-size", 10)
      .attr("dx", -20) 
      .attr("dy", 3)

  textElements.append("text").filter(function(d){ return d.shape === "rect" })
      .html(function (node) {
        var arr = node.name.split('|')
        var xCoord = getXCoord(node) - 30
        var yCoord = getYCoord(node) + 30
        if (arr.length > 1) {
          return "<tspan x = " + xCoord.toString() + " dy='1em'>" + arr.join("</tspan>" + "<tspan x = " + xCoord.toString() + " dy='1em'>") + "</tspan>"
        }
        return arr.join('')
      })
      .attr('x', function (node) { return getXCoord(node) })
      .attr('y', function (node) { return getYCoord(node) })
      .attr("font-size", 10)
      .attr("dx", 2) 
      .attr("dy", 0)

  return textElements;
}