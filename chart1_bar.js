async function chart1() {
    svg_clean(C1_DIV_ID, C1_SVG_ID);
    svg1 = d3.select(C1_DIV_ID).select(C1_SVG_ID);

    var height = svg1.attr("height");
    var width = svg1.attr("width");

    var ageTickVals = [30, 40, 50, 60, 70, 80];
    var ageTickValsAxis = ["30-40", "40-50", "50-60", "60-70", "70-80", "80-90"];

    var aggDataMale = [
	{ age: "30-40", count: 0, total: 0 },
	{ age: "40-50", count: 0, total: 0 },
        { age: "50-60", count: 0, total: 0 },
        { age: "60-70", count: 0, total: 0 }, 
        { age: "70-80", count: 0, total: 0 },
	{ age: "80-90", count: 0, total: 0 }
	];

    var aggDataFemale = [
	{ age: "30-40", count: 0, total: 0 },
	{ age: "40-50", count: 0, total: 0 },
        { age: "50-60", count: 0, total: 0 },
        { age: "60-70", count: 0, total: 0 }, 
        { age: "70-80", count: 0, total: 0 },
	{ age: "80-90", count: 0, total: 0 }
	];
    var data = await d3.csv("https://rajeshkay.github.io/data/stroke-data.csv");

    for (var i = 0; i < data.length; i++) {	
	if (parseInt(data[i].age) < 40) {
	    aggDataMale[0].total += 1;
	    aggDataFemale[0].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[0].count += 1;
	    else	
		aggDataMale[0].count += 1;
	}
	else if (parseInt(data[i].age) < 50) {
	    aggDataMale[1].total += 1;
	    aggDataFemale[1].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[1].count += 1;
	    else	
		aggDataMale[1].count += 1;
	}
	else if (parseInt(data[i].age) < 60) {
	    aggDataMale[2].total += 1;
	    aggDataFemale[2].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[2].count += 1;
	    else	
		aggDataMale[2].count += 1;
	}
	else if (parseInt(data[i].age) < 70) {
	    aggDataMale[3].total += 1;
	    aggDataFemale[3].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[3].count += 1;
	    else	
		aggDataMale[3].count += 1;
	}
	else if (parseInt(data[i].age) < 80) {
	    aggDataMale[4].total += 1;
	    aggDataFemale[4].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[4].count += 1;
	    else	
		aggDataMale[4].count += 1;
	}
	else if (parseInt(data[i].age) < 90) {
	    aggDataMale[5].total += 1;
	    aggDataFemale[5].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[5].count += 1;
	    else
		aggDataMale[5].count += 1;
	}
	else {
	    aggDataMale[6].total += 1;
	    aggDataFemale[6].total += 1;
	    if (data[i].gender == "Female")
		aggDataFemale[6].count += 1;
	    else	
		aggDataMale[6].count += 1;
	}
    }

    d3.select(C1_DIV_ID)
        .select(C1_SVG_H3_ID)
	.text("NEW Factors: Age and Gender");

    var age = data.map(function(d) {
	return parseInt(d.age); });

    var scaleX = d3.scaleBand()
        .domain(ageTickValsAxis)
        .range([0, (width- (2*MARGIN))]);

    var scaleY = d3.scaleLinear()
        .domain([0, d3.max([...aggDataMale, ...aggDataFemale], d=> d.count)])
        .range([height - (2*MARGIN),0 ]);

    var xAxis = d3.axisBottom().scale(scaleX);
    var yAxis = d3.axisLeft().scale(scaleY);

    d3.select(C1_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")
        .style("stroke-width", AXIS_LNE_SZE)
        .style("color", AXIS_LNE_COL)
        .call(yAxis)
        .selectAll("text")
        .style("font-weight", "bold");

    d3.select(C1_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(height - MARGIN)+ ")" )
        .style("stroke-width", AXIS_LNE_SZE)
        .style("color", AXIS_LNE_COL)
        .call(xAxis)
        .selectAll("text")
        .style("font-weight", "bold");

// Axis title names
    
    d3.select(C1_SVG_ID).append("text")
      .attr("class", "x-axis-title")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Age Groups")
      .style("fill", AXIS_FONT_COL)
      .style("font-family", AXIS_FONT_FMLY)
      .style("font-size", AXIS_FONT_SZE);

    d3.select(C1_SVG_ID).append("text")
      .attr("class", "y-axis-title")
      .attr("x", -height / 2)
      .attr("y", MARGIN - 30)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Stroke Patients")
      .style("fill", AXIS_FONT_COL)
      .style("font-family", AXIS_FONT_FMLY)
      .style("font-size", AXIS_FONT_SZE);

    svg1 = d3.select(C1_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")

    var barWidth = (scaleX.bandwidth() - BAR_SPACE)/2;

    var tooltip = svg1.append("text")
        .style("opacity", 0)
        .style("fill", "black")
        .style("font-size", "12px");

    svg1.selectAll(".female")
        .data(aggDataFemale)
        .enter()
        .append("rect")
        .attr("class", function(d,i) { return ("Female" + d.age) })
        .attr("width", barWidth)
        .attr("x", function(d,i) { return (scaleX(ageTickValsAxis[i]) + BAR_SPACE/2) })
        .attr("y", function(d,i) { return scaleY(d.count) })
        .attr("height", function(d,i) { return (scaleY(0) - scaleY(d.count)) })
        .attr("fill", function(d,i) { return gender_col("Female") })
        .on("mouseenter", function(d,i) { return mouse_over(d, i, "Female") })
        .on("mouseover", function(d,i) { return mouse_over(d, i, "Female") });

    svg1.selectAll(".male")
        .data(aggDataMale)
        .enter()
        .append("rect")
        .attr("class", function(d,i) { return ("Male" + d.age) })
        .attr("width", barWidth)
        .attr("x", function(d,i) { return (scaleX(ageTickValsAxis[i]) + BAR_SPACE/2 + barWidth) })
        .attr("y", function(d,i) { return scaleY(d.count) })
        .attr("height", function(d,i) { return (scaleY(0) - scaleY(d.count)) })
        .attr("fill", function(d,i) { return gender_col("Male") })
        .on("mouseover", function(d,i) { return mouse_over(d, i, "Male") })
        .on("mouseenter", function(d,i) { return mouse_over(d, i, "Male") });
}

function mouse_over(event, d, gender) {
    var tooltip = "Affected Count \n# " + gender + "s: "+ d.count + 
                  "\n# Total: " + d.total +
                  "\n# Percentage: " + Math.round((d.count/d.total)*100) + "%";
    var classStr = "." + gender + d.age;
    return d3.select(classStr).append("title").text(tooltip);
}
