export function addLegend(legend) {
	var lx = 350 // 350, 70
  	var ly = 480 // 480, 330
  	
  	// Set node colours
	var noncoreNodeColour = 'lightsteelblue'
	var coreNodeColour = 'yellow'
	var noncsNodeColour = "lightgray"

	// Set stroke colours
	var courseStrokeColour = 'gray'
	var linkColour = 'black'

  	// Handmade legend
  	legend.append("circle").attr("cx",lx).attr("cy",ly).attr("r", 6).style("fill", coreNodeColour).style("stroke", courseStrokeColour)
  	legend.append("circle").attr("cx",lx).attr("cy",ly+20).attr("r", 6).style("fill", noncoreNodeColour).style("stroke", courseStrokeColour)
  	legend.append("ellipse").attr("cx",lx).attr("cy",ly+40).attr("rx", 12.5).attr("ry", 5).style("fill", noncsNodeColour).style("stroke", courseStrokeColour)
  	legend.append('line').attr("x1", lx-10).attr("y1", ly+60).attr("x2", lx+13).attr("y2", ly+60).attr("stroke-width", 1).attr("stroke", linkColour)
  	legend.append('line').attr("x1", lx-12).attr("y1", ly+80).attr("x2", lx+13).attr("y2", ly+80).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 0.1')
  	legend.append('line').attr("x1", lx-12).attr("y1", ly+100).attr("x2", lx+13).attr("y2", ly+100).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 3')
  	legend.append("rect").attr("x", lx-20).attr("y", ly-15).attr("width", 112).attr("height", 130).attr("stroke-width", 0.5).style("fill", 'transparent').style("stroke", linkColour)
  	legend.append("text").attr("x", lx+20).attr("y", ly).text("Core CPSC").style("font-size", "10px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", lx+20).attr("y", ly+20).text("Non-core CPSC").style("font-size", "10px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", lx+20).attr("y", ly+40).text("Non-CPSC").style("font-size", "10px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", lx+20).attr("y", ly+60).text("Pre-requisite").style("font-size", "10px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", lx+20).attr("y", ly+80).text("Co-requisite").style("font-size", "10px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", lx+20).attr("y", ly+100).text("Recommended").style("font-size", "10px").attr("alignment-baseline","middle")

	return legend;
}