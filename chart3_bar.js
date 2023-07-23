
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

    var aggSmokingDataMale = [
	{ age: "30-40", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
	{ age: "40-50", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
        { age: "50-60", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
        { age: "60-70", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 }, 
        { age: "70-80", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
	{ age: "80-90", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 }
	];

    var aggSmokingDataFemale = [
	{ age: "30-40", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
	{ age: "40-50", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
        { age: "50-60", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
        { age: "60-70", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 }, 
        { age: "70-80", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 },
	{ age: "80-90", count_sm: 0, count_nsm: 0, count_fsm: 0, count_unk: 0, total: 0 }
	];

function prep_smoking_data(data, aggData) {
    if (parseInt(data.age) < 40) {
        aggData[0].total += 1;
        if (data.smoking_status == "smokes")
            aggData[0].count_sm += 1;
        else if (data.smoking_status == "never smoked")
            aggData[0].count_nsm += 1;
        else if (data.smoking_status == "formerly smoked")
            aggData[0].count_fsm += 1;
        else
            aggData[0].count_unk += 1;
        }
    else if (parseInt(data.age) < 50) {
        aggData[1].total += 1;
        if (data.smoking_status == "smokes")
            aggData[1].count_sm += 1;
        else if (data.smoking_status == "never smoked")
            aggData[1].count_nsm += 1;
        else if (data.smoking_status == "formerly smoked")
            aggData[1].count_fsm += 1;
        else
            aggData[1].count_unk += 1;
        }
    else if (parseInt(data.age) < 60) {
        aggData[2].total += 1;
        if (data.smoking_status == "smokes")
            aggData[2].count_sm += 1;
        else if (data.smoking_status == "never smoked")
            aggData[2].count_nsm += 1;
        else if (data.smoking_status == "formerly smoked")
            aggData[2].count_fsm += 1;
        else
                aggData[2].count_unk += 1;
        }
    else if (parseInt(data.age) < 70) {
        aggData[3].total += 1;
        if (data.smoking_status == "smokes")
            aggData[3].count_sm += 1;
	else if (data.smoking_status == "never smoked")
            aggData[3].count_nsm += 1;
	else if (data.smoking_status == "formerly smoked")
            aggData[3].count_fsm += 1;
        else
            aggData[3].count_unk += 1;
	}
    else if (parseInt(data.age) < 80) {
	    aggData[4].total += 1;
	if (data.smoking_status == "smokes")
            aggData[4].count_sm += 1;
	else if (data.smoking_status == "never smoked")
            aggData[4].count_nsm += 1;
	else if (data.smoking_status == "formerly smoked")
            aggData[4].count_fsm += 1;
        else
            aggData[4].count_unk += 1;
    }
    else {
	aggData[5].total += 1;
	if (data.smoking_status == "smokes")
            aggData[5].count_sm += 1;
	else if (data.smoking_status == "never smoked")
            aggData[5].count_nsm += 1;
	else if (data.smoking_status == "formerly smoked")
            aggData[5].count_fsm += 1;
        else
            aggData[5].count_unk += 1;
    }
}

function prep_age_data(data, aggData) {
    if (parseInt(data.age) < 40) {
        aggData[0].total += 1;
        aggData[0].count += 1;
    }
    else if (parseInt(data.age) < 50) {
        aggData[1].total += 1;
        aggData[1].count += 1;
    }
    else if (parseInt(data.age) < 60) {
        aggData[2].total += 1;
        aggData[2].count += 1;
    }
    else if (parseInt(data.age) < 70) {
        aggData[3].total += 1;
        aggData[3].count += 1;
    }
    else if (parseInt(data.age) < 80) {
        aggData[4].total += 1;
        aggData[4].count += 1;
    }
    else {
        aggData[5].total += 1;
        aggData[5].count += 1;
    }
}

function mse_evt_age(event, d, gender) {
    var tooltip = "Affected Count \n# " + gender + "s: "+ d.count + 
                  "\n# Total: " + d.total +
                  "\n# Percentage: " + Math.round((d.count/d.total)*100) + "%";
    var classStr = "." + gender + d.age;
    return d3.select(classStr).append("title").text(tooltip);
}

function mse_evt_smoke(event, d, gender) {

//TBD -KR
}

async function chart3() {
    svg_clean();
    svg_init();

    svg_init();
    svg1 = d3.select(".svg1");

    var height = svg1.attr("height");
    var width = svg1.attr("width");

    var ageTickVals = [30, 40, 50, 60, 70, 80];
    var ageTickValsAxis = ["30-40", "40-50", "50-60", "60-70", "70-80", "80-90"];

    var data = await d3.csv("https://rajeshkay.github.io/data/stroke-data.csv");

    for (var i = 0; i < data.length; i++) {	
        if (data[i].gender == "Female") {
            prep_age_data(data[i], aggDataFemale);
            prep_smoking_data(data[i], aggSmokingDataFemale);
        }
        else {
            prep_age_data(data[i], aggDataMale);
            prep_smoking_data(data[i], aggSmokingDataMale);
        }
    }

    d3.select("main")
        .select(".svg1h3")
	.text("Age, Gender and Smoking Status");

    var age = data.map(function(d) {
	return parseInt(d.age); });

    var scaleX = d3.scaleBand()
        .domain(ageTickValsAxis)
        .range([0, (width- (2*MARGIN))]);

    var scaleY = d3.scaleLinear()
        .domain([-(d3.max([...aggDataMale, ...aggDataFemale], d=> d.total)),
                 d3.max([...aggDataMale, ...aggDataFemale], d=> d.count)])
        .range([(height - (2*MARGIN)),0 ]);


    var yLabels = ["50","40","30","20","10","0","10","20","30","40","50"];
    var xAxis = d3.axisBottom().scale(scaleX);
    var yAxis = d3.axisLeft().scale(scaleY)
                   .tickFormat(function (d,i) { return yLabels[i] });

    d3.select(".svg1")
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")
	.style("stroke-width", "2px")
        .call(yAxis)
        .selectAll("text") 
        .style("font-weight", "bold"); 

    d3.select(".svg1")
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(height/2)+ ")" )
        .style("stroke-width", "2px")
        .call(xAxis)
        .selectAll("text") 
        .style("font-weight", "bold"); 

/*SECOND AXIS - if needed
    d3.select(".svg1")
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(height - MARGIN)+ ")" )
        .call(xAxis)
*/
    svg1.append("text")
      .attr("class", "x-axis-title")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Age Groups");

    svg1.append("text")
      .attr("class", "y-axis-title")
      .attr("x", -height / 2)
      .attr("y", MARGIN - 30)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Stroke Patients");

    svg1 = d3.select(".svg1")
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
        .on("mouseenter", function(d,i) { return mse_evt_age(d, i, "Female") })
        .on("mouseover", function(d,i) { return mse_evt_age(d, i, "Female") });

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
        .on("mouseover", function(d,i) { return mse_evt_age(d, i, "Male") })
        .on("mouseenter", function(d,i) { return mse_evt_age(d, i, "Male") });

    var stackedSmDataFemale = d3.stack()
        .keys(["count_nsm", "count_sm", "count_fsm", "count_unk"])(aggSmokingDataFemale);

    var stackedSmDataMale = d3.stack()
        .keys(["count_nsm", "count_sm", "count_fsm", "count_unk"])(aggSmokingDataMale);

    var colorScale = d3.scaleOrdinal()
        .domain(["count_nsm", "count_sm", "count_fsm", "count_unk"])
        .range(["lightgreen", "red", "orange", "lightblue"]);

    svg = d3.select(".svg1")

    layer = svg.selectAll(".layer1")
        .data(stackedSmDataFemale)
        .enter()
        .append("g")
        .attr("class", "layer1")
        .style("fill", function(d,i) { return colorScale(i); })
        .style("opacity", 0.5)
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")

    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(d) { return (scaleY(-d[1]) - scaleY(-d[0])); })
        .attr("x", function(d,i) { return (scaleX(ageTickValsAxis[i]) + BAR_SPACE/2) })
        .attr("y", function(d,i) { 
            var ht = (scaleY(-d[1]) - scaleY(-d[0]));
            return (scaleY(-d[1]) - ht); })
//        .on("mouseover", mse_evt_smoke)
//function(d,i) { return mse_evt_smoke(d, i, "Male") })
//        .on("mouseenter", function(d,i) { return mse_evt_smoke(d, i, "Male") });

    layer = svg.selectAll(".layer2")
        .data(stackedSmDataMale)
        .enter()
        .append("g")
         .attr("class", "layer2")
        .style("fill", function(d,i) { return colorScale(i); })
        .style("opacity", 0.5)
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")

    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(d) { return (scaleY(-d[1]) - scaleY(-d[0])); })
        .attr("x", function(d,i) { return (scaleX(ageTickValsAxis[i]) + BAR_SPACE/2 + barWidth) })
        .attr("y", function(d,i) { 
            var ht = (scaleY(-d[1]) - scaleY(-d[0]));
            return (scaleY(-d[1]) - ht); })
//        .on("mouseover", function(d,i) { return mse_evt_smoke(d, i, "Male") })
//        .on("mouseenter", function(d,i) { return mse_evt_smoke(d, i, "Male") });
}

