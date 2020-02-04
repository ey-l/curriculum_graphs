export function addLegend(legend) {
  // Handmade legend
    var legend_width = 130;
    var legend_height = 155;

    // Set node colours
	 var noncoreNodeColour = 'lightsteelblue';
	 var coreNodeColour = 'yellow';
	 var noncsNodeColour = "lightgray";

	// Set stroke colours
	var courseStrokeColour = 'gray';
	var linkColour = 'black';

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
	
  return legend;
}