export function add_legend_all_included(legend) {
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

	return legend
}

export function getXCoord(node) {
  return 1269 - (node.fx * 28 + 230)
}

export function getYCoord(node) {
  return 616 - (node.fy * 80 + 200)
}

export function add_legend_cs_only(legend) {
  // Handmade legend
    var legend_width = 130
    var legend_height = 155

    // Set node colours
	 var noncoreNodeColour = 'lightsteelblue'
	 var coreNodeColour = 'yellow'
	 var noncsNodeColour = "lightgray"

	// Set stroke colours
	var courseStrokeColour = 'gray'
	var linkColour = 'black'

  	legend.append("circle").attr("cx",200).attr("cy",330).attr("r", 12).style("fill", coreNodeColour).style("stroke", courseStrokeColour)
  	legend.append("circle").attr("cx",200).attr("cy",360).attr("r", 12).style("fill", noncoreNodeColour).style("stroke", courseStrokeColour)
  	legend.append('line').attr("x1", 190).attr("y1", 390).attr("x2", 213).attr("y2", 390).attr("stroke-width", 1).attr("stroke", linkColour)
  	legend.append('line').attr("x1", 188).attr("y1", 420).attr("x2", 213).attr("y2", 420).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 0.1')
  	legend.append('line').attr("x1", 188).attr("y1", 450).attr("x2", 213).attr("y2", 450).attr("stroke-width", 1).attr("stroke", linkColour).attr("stroke-dasharray", '0,2 3')
  	legend.append("rect").attr("x", 175).attr("y", 310).attr("width", legend_width).attr("height", legend_height).attr("stroke-width", 0.5).style("fill", 'transparent').style("stroke", linkColour)
  	legend.append("text").attr("x", 220).attr("y", 330).text("Core CPSC").style("font-size", "12px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", 220).attr("y", 360).text("Non-core CPSC").style("font-size", "12px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", 220).attr("y", 390).text("Pre-requisite").style("font-size", "12px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", 220).attr("y", 420).text("Co-requisite").style("font-size", "12px").attr("alignment-baseline","middle")
  	legend.append("text").attr("x", 220).attr("y", 450).text("Recommended").style("font-size", "12px").attr("alignment-baseline","middle")
	return legend
}