async function chart2() {
    svg_clean();
    svg_init();

    svg1 = d3.select(".svg1");

    var height = svg1.attr("height");
    var width = svg1.attr("width");

    var glucTickVals = [50,100, 150, 200, 250]
    var ageTickVals = [30, 40, 50, 60, 70, 80]

    d3.select("main")
        .select(".svg1h3")
	.text("Age vs Avg Glucose Level");

/* TBD-KR
    div1.select("p")
	.text("Size of the Mark indicates BMI");
*/

    var data = await d3.csv("https://rajeshkay.github.io/data/stroke-data.csv");

    var age = data.map(function(d) {
	return parseInt(d.age); });

    var avgGlucoseLevel = data.map(function(d) {
	return parseFloat(d.avg_glucose_level); });

    var scaleX = d3.scaleLinear()
		.domain([50, d3.max(avgGlucoseLevel)])
		.range([0,height-(2*MARGIN)])

    var scaleY = d3.scaleLinear()
		.domain([20, d3.max(age)])
		.range([width-(2*MARGIN),0])


    xAxis = d3.axisBottom(scaleX)
		.tickValues(glucTickVals)
		.tickFormat(function(d, i) {return glucTickVals[i]});

    yAxis = d3.axisLeft(scaleY)
		.tickValues(ageTickVals)
		.tickFormat(function(d, i) {return ageTickVals[i]});

    svg1 = d3.select(".svg1")
                .append("g")
                .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")
    
    svg1.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d,i) { return (scaleX(data[i].avg_glucose_level)) })
		.attr("cy", function(d,i) { return (scaleY(data[i].age)) })
		.attr("r", function(d,i)  { return bmi_size(data[i].bmi) })
		.style("fill", function(d,i)  { return gender_col(data[i].gender) })
		.style("stroke", function(d,i)  { return gender_col(data[i].gender) })


    d3.select(".svg1")
	.append("g")
	.attr("transform", "translate("+MARGIN+","+MARGIN+")")
	.call(yAxis);

    d3.select(".svg1")
	.append("g")
	.attr("transform", "translate("+MARGIN+","+(height - MARGIN)+")")
	.call(xAxis);
}
