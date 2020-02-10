// Set node colours
var noncoreNodeColour = '#97D4E9'
var coreNodeColour = 'yellow'
var noncsNodeColour = "lightgray"

// Set stroke colours
var logicStrokeColour = 'transparent';
var courseStrokeColour = 'gray'
var seStrokeColour = '#fa55a7';
var theoryStrokeColour = '#35c72e';
var systemsStrokeColour = '#932ee6';
var appliedStrokeColour = '#b00000';
var ethicsStrokeColour = 'orange';

// Set link colours
var linkColour = 'black'

export function add_legend_all(legend) {
	var lx = 350 // 350, 70
  var ly = 480 // 480, 330
  var legend_width = 112;
  var legend_height = 130;

  // Handmade legend
  legend.append("circle").attr("cx",lx).attr("cy",ly).attr("r", 6).style("fill", coreNodeColour).style("stroke", courseStrokeColour)
  legend.append("circle").attr("cx",lx).attr("cy",ly+20).attr("r", 6).style("fill", noncoreNodeColour).style("stroke", courseStrokeColour)
  legend.append("ellipse").attr("cx",lx).attr("cy",ly+40).attr("rx", 12.5).attr("ry", 5).style("fill", noncsNodeColour).style("stroke", courseStrokeColour)
  legend.append('line').attr("x1", lx-10).attr("y1", ly+60).attr("x2", lx+13).attr("y2", ly+60).attr("stroke-width", 1).attr("stroke", linkColour)
  legend.append('line').attr("x1", lx-12).attr("y1", ly+80).attr("x2", lx+13).attr("y2", ly+80).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 0.1')
  legend.append('line').attr("x1", lx-12).attr("y1", ly+100).attr("x2", lx+13).attr("y2", ly+100).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 3')
  legend.append("rect").attr("x", lx-20).attr("y", ly-15).attr("width", legend_width).attr("height", legend_height).attr("stroke-width", 0.5).style("fill", 'transparent').style("stroke", linkColour)
  legend.append("text").attr("x", lx+20).attr("y", ly).text("Core CPSC").style("font-size", "10px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+20).text("Non-core CPSC").style("font-size", "10px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+40).text("Non-CPSC").style("font-size", "10px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+60).text("Pre-requisite").style("font-size", "10px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+80).text("Co-requisite").style("font-size", "10px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+100).text("Recommended").style("font-size", "10px").attr("alignment-baseline","middle")

	return legend;
}

export function add_legend_cs(legend) {
  // Handmade legend
  var lx = 150 // 350, 70
  var ly = 185 // 480, 330
  var legend_width = 130;
  var legend_height = 300;

  legend.append("circle").attr("cx",lx).attr("cy",ly).attr("r", 12).style("fill", coreNodeColour).style("stroke", courseStrokeColour)
  legend.append("circle").attr("cx",lx).attr("cy",ly+30).attr("r", 12).style("fill", noncoreNodeColour).style("stroke", courseStrokeColour)
  legend.append("circle").attr("cx",lx).attr("cy",ly+60).attr("r", 12).style("fill", logicStrokeColour).style("stroke", seStrokeColour).style("stroke-width", 3)
  legend.append("circle").attr("cx",lx).attr("cy",ly+90).attr("r", 12).style("fill", logicStrokeColour).style("stroke", theoryStrokeColour).style("stroke-width", 3)
  legend.append("circle").attr("cx",lx).attr("cy",ly+120).attr("r", 12).style("fill", logicStrokeColour).style("stroke", systemsStrokeColour).style("stroke-width", 3)
  legend.append("circle").attr("cx",lx).attr("cy",ly+150).attr("r", 12).style("fill", logicStrokeColour).style("stroke", appliedStrokeColour).style("stroke-width", 3)
  legend.append("circle").attr("cx",lx).attr("cy",ly+180).attr("r", 12).style("fill", logicStrokeColour).style("stroke", ethicsStrokeColour).style("stroke-width", 3)
  legend.append('line').attr("x1", lx-10).attr("y1", ly+210).attr("x2", lx+13).attr("y2", ly+210).attr("stroke-width", 1).attr("stroke", linkColour)
  legend.append('line').attr("x1", lx-12).attr("y1", ly+240).attr("x2", lx+13).attr("y2", ly+240).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 0.1')
  legend.append('line').attr("x1", lx-12).attr("y1", ly+270).attr("x2", lx+13).attr("y2", ly+270).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 3')
  legend.append("rect").attr("x", lx-25).attr("y", ly-20).attr("width", legend_width).attr("height", legend_height).attr("stroke-width", 0.5).style("fill", 'transparent').style("stroke", linkColour)
  legend.append("text").attr("x", lx+20).attr("y", ly).text("Core CPSC").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+30).text("Non-core CPSC").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+210).text("Pre-requisite").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+240).text("Co-requisite").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+270).text("Recommended").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+60).text("SE").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+90).text("Theory").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+120).text("Systems").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+150).text("Applied").style("font-size", "12px").attr("alignment-baseline","middle")
  legend.append("text").attr("x", lx+20).attr("y", ly+180).text("Ethics").style("font-size", "12px").attr("alignment-baseline","middle")
  
  return legend;
}