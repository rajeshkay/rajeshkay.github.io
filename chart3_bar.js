var barWidth;
var scaleX, scaleY, xAxis, yAxis;
var height, width;

var ageTickVals = [30, 40, 50, 60, 70, 80];
var ageTickValsAxis = ["30-40", "40-50", "50-60", "60-70", "70-80", "80-90"];

var factors = ["Smoking", "Heart Disease", "Hypertension", "Residence Type"];

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

var aggResidDataMale = [
    { age: "30-40", count_rural: 0, count_urban: 0, total: 0 },
    { age: "40-50", count_rural: 0, count_urban: 0, total: 0 },
    { age: "50-60", count_rural: 0, count_urban: 0, total: 0 },
    { age: "60-70", count_rural: 0, count_urban: 0, total: 0 }, 
    { age: "70-80", count_rural: 0, count_urban: 0, total: 0 },
    { age: "80-90", count_rural: 0, count_urban: 0, total: 0 }
];

var aggResidDataFemale = [
    { age: "30-40", count_rural: 0, count_urban: 0, total: 0 },
    { age: "40-50", count_rural: 0, count_urban: 0, total: 0 },
    { age: "50-60", count_rural: 0, count_urban: 0, total: 0 },
    { age: "60-70", count_rural: 0, count_urban: 0, total: 0 }, 
    { age: "70-80", count_rural: 0, count_urban: 0, total: 0 },
    { age: "80-90", count_rural: 0, count_urban: 0, total: 0 }
];

var aggHrtDataMale = [
    { age: "30-40", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "40-50", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "50-60", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "60-70", count_hd: 0, count_nhd: 0, total: 0 }, 
    { age: "70-80", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "80-90", count_hd: 0, count_nhd: 0, total: 0 }
];

var aggHrtDataFemale = [
    { age: "30-40", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "40-50", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "50-60", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "60-70", count_hd: 0, count_nhd: 0, total: 0 }, 
    { age: "70-80", count_hd: 0, count_nhd: 0, total: 0 },
    { age: "80-90", count_hd: 0, count_nhd: 0, total: 0 }
];

var aggHtDataMale = [
    { age: "30-40", count_ht: 0, count_nht: 0, total: 0 },
    { age: "40-50", count_ht: 0, count_nht: 0, total: 0 },
    { age: "50-60", count_ht: 0, count_nht: 0, total: 0 },
    { age: "60-70", count_ht: 0, count_nht: 0, total: 0 }, 
    { age: "70-80", count_ht: 0, count_nht: 0, total: 0 },
    { age: "80-90", count_ht: 0, count_nht: 0, total: 0 }
];

var aggHtDataFemale = [
    { age: "30-40", count_ht: 0, count_nht: 0, total: 0 },
    { age: "40-50", count_ht: 0, count_nht: 0, total: 0 },
    { age: "50-60", count_ht: 0, count_nht: 0, total: 0 },
    { age: "60-70", count_ht: 0, count_nht: 0, total: 0 }, 
    { age: "70-80", count_ht: 0, count_nht: 0, total: 0 },
    { age: "80-90", count_ht: 0, count_nht: 0, total: 0 }
];

function prep_ht_data(data, aggData) {
    if (parseInt(data.age) < 40) {
        aggData[0].total += 1;
        if (data.hypertension == 1)
            aggData[0].count_ht += 1;
        else
            aggData[0].count_nht += 1;
    }
    else if (parseInt(data.age) < 50) {
        aggData[1].total += 1;
        if (data.hypertension == 1)
            aggData[1].count_ht += 1;
        else
            aggData[1].count_nht += 1;
    }
    else if (parseInt(data.age) < 60) {
        aggData[2].total += 1;
        if (data.hypertension == 1)
            aggData[2].count_ht += 1;
        else
            aggData[2].count_nht += 1;
    }
    else if (parseInt(data.age) < 70) {
        aggData[3].total += 1;
        if (data.hypertension == 1)
            aggData[3].count_ht += 1;
        else
            aggData[3].count_nht += 1;
    }
    else if (parseInt(data.age) < 80) {
	aggData[4].total += 1;
        if (data.hypertension == 1)
            aggData[4].count_ht += 1;
        else
            aggData[4].count_nht += 1;
    }
    else {
	aggData[5].total += 1;
        if (data.hypertension == 1)
            aggData[5].count_ht += 1;
        else
            aggData[5].count_nht += 1;
    }
}

function prep_heart_data(data, aggData) {
    if (parseInt(data.age) < 40) {
        aggData[0].total += 1;
        if (data.heart_disease == 1)
            aggData[0].count_hd += 1;
        else
            aggData[0].count_nhd += 1;
    }
    else if (parseInt(data.age) < 50) {
        aggData[1].total += 1;
        if (data.heart_disease == 1)
            aggData[1].count_hd += 1;
        else
            aggData[1].count_nhd += 1;
    }
    else if (parseInt(data.age) < 60) {
        aggData[2].total += 1;
        if (data.heart_disease == 1)
            aggData[2].count_hd += 1;
        else
            aggData[2].count_nhd += 1;
    }
    else if (parseInt(data.age) < 70) {
        aggData[3].total += 1;
        if (data.heart_disease == 1)
            aggData[3].count_hd += 1;
        else
            aggData[3].count_nhd += 1;
    }
    else if (parseInt(data.age) < 80) {
	aggData[4].total += 1;
        if (data.heart_disease == 1)
            aggData[4].count_hd += 1;
        else
            aggData[4].count_nhd += 1;
    }
    else {
	aggData[5].total += 1;
        if (data.heart_disease == 1)
            aggData[5].count_hd += 1;
        else
            aggData[5].count_nhd += 1;
    }
}

function prep_resid_data(data, aggData) {
    if (parseInt(data.age) < 40) {
        aggData[0].total += 1;
        if (data.Residence_type == "Rural")
            aggData[0].count_rural += 1;
        else
            aggData[0].count_urban += 1;
        }
    else if (parseInt(data.age) < 50) {
        aggData[1].total += 1;
        if (data.Residence_type == "Rural")
            aggData[1].count_rural += 1;
        else
            aggData[1].count_urban += 1;
        }
    else if (parseInt(data.age) < 60) {
        aggData[2].total += 1;
        if (data.Residence_type == "Rural")
            aggData[2].count_rural += 1;
        else
            aggData[2].count_urban += 1;
        }
    else if (parseInt(data.age) < 70) {
        aggData[3].total += 1;
        if (data.Residence_type == "Rural")
            aggData[3].count_rural += 1;
        else
            aggData[3].count_urban += 1;
	}
    else if (parseInt(data.age) < 80) {
	aggData[4].total += 1;
        if (data.Residence_type == "Rural")
            aggData[4].count_rural += 1;
        else
            aggData[4].count_urban += 1;
    }
    else {
	aggData[5].total += 1;
        if (data.Residence_type == "Rural")
            aggData[5].count_rural += 1;
        else
            aggData[5].count_urban += 1;
    }
}

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
    svg_clean(C3_DIV_ID, C3_SVG_ID);
    svg1 = d3.select(C3_SVG_ID);

    height = svg1.attr("height");
    width = svg1.attr("width");


    var data = await d3.csv("https://rajeshkay.github.io/data/stroke-data.csv");

    for (var i = 0; i < data.length; i++) {	
        if (data[i].gender == "Female") {
            prep_age_data(data[i], aggDataFemale);
            prep_smoking_data(data[i], aggSmokingDataFemale);
            prep_resid_data(data[i], aggResidDataFemale);
            prep_heart_data(data[i], aggHrtDataFemale);
            prep_ht_data(data[i], aggHtDataFemale);
        }
        else {
            prep_age_data(data[i], aggDataMale);
            prep_smoking_data(data[i], aggSmokingDataMale);
            prep_resid_data(data[i], aggResidDataMale);
            prep_heart_data(data[i], aggHrtDataMale);
            prep_ht_data(data[i], aggHtDataMale);
        }
    }

    d3.select(C3_DIV_ID)
        .select(C3_SVG_H3_ID)
	.text("Other Factors categorized by Age and Gender");

    var age = data.map(function(d) {
	return parseInt(d.age); });

    scaleX = d3.scaleBand()
        .domain(ageTickValsAxis)
        .range([0, (width- (2*MARGIN))]);

    scaleY = d3.scaleLinear()
        .domain([-(d3.max([...aggDataMale, ...aggDataFemale], d=> d.total)+10),
                 (d3.max([...aggDataMale, ...aggDataFemale], d=> d.count)+10)])
        .range([(height - (2*MARGIN)),0 ]);

    var yLabels = ["60","50","40","30","20","10","0","10","20","30","40","50", "60"];
    xAxis = d3.axisBottom().scale(scaleX);
    yAxis = d3.axisLeft().scale(scaleY)
                   .tickFormat(function (d,i) { return yLabels[i] });

    svg1 = d3.select(C3_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")

    barWidth = (scaleX.bandwidth() - BAR_SPACE)/2;

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

    draw_axis(xAxis, yAxis);
    draw_factors();

    add_gen_legend(C3_SVG_ID);
    plot_smoking();
}

function draw_axis(xAxis, yAxis) {

    d3.select(C3_SVG_ID).selectAll(".axis").remove();
    d3.select(C3_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")
	.style("stroke-width", AXIS_LNE_SZE)
        .style("color", AXIS_LNE_COL)
        .attr("class","axis")
        .call(yAxis)
        .selectAll("text") 
        .style("font-weight", "bold"); 

    d3.select(C3_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(height/2)+ ")" )
	.style("stroke-width", AXIS_LNE_SZE)
        .style("color", AXIS_LNE_COL)
        .attr("class","axis")
        .call(xAxis)
        .selectAll("text") 
        .style("font-weight", "bold"); 

    d3.select(C3_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(height - MARGIN)+ ")" )
        .style("stroke-width", "0.2px")
        .attr("class","axis")
        .call(xAxis)
        .selectAll("text") 
        .style("font-weight", "normal") 
        .style("color", "grey");

    svg1 = d3.select(C3_SVG_ID)
        .append("g")
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")

    svg1.append("text")
      .attr("class", "x-axis-title")
      .attr("x", (width / 2)-40)
      .attr("y", height - MARGIN - 15)
      .attr("text-anchor", "middle")
      .text("Age Groups")
      .attr("class","axis")
      .style("fill", AXIS_FONT_COL)
      .style("font-family", AXIS_FONT_FMLY)
      .style("font-size", AXIS_FONT_SZE);

    svg1.append("text")
      .attr("class", "y-axis-title")
      .attr("x", -height / 2 +MARGIN)
      .attr("y", -30)
      .attr("class","axis")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Stroke Patients")
      .style("fill", AXIS_FONT_COL)
      .style("font-family", AXIS_FONT_FMLY)
      .style("font-size", AXIS_FONT_SZE);
}

function draw_factors() {

    var sizeLegend = d3.select(C3_SVG_ID).append("g")
                        .attr("transform", "translate(" +(2*MARGIN+40)+ ",20)");
    
    
    sizeLegend.selectAll("text")
      .data(factors)
      .enter()
      .append("text")
      .attr("class", (d, i) => (factors[i]))
      .attr("y", 12)
      .attr("x", function(d, i){
              var offset = 0;
              if (i == 3)
                  offset = 60;
              else if (i == 2)
                  offset = 30;
              return (i * 90 + offset) })
      .attr("alignment-baseline", "left")
      .style("font-size", LEG_FONT_SZE)
      .style("fill", LEG_FONT_COL)
      .style("text-decoration", "underline")
      .text(d => d)
      .on("click", feature_click);

    var textObj = d3.select(C3_SVG_ID).append("foreignObject")
         .attr("width", 120)
         .attr("height", 50)
         .attr("x", 5)
         .attr("y", -2);

    var textBox = textObj.append("xhtml:h4")
        .text("Select a Factor: ")
        .attr("class", "factClkText")
        .style("font-weight", "bold")
        .style("font-size", LEG_FONT_SZE)
        .style("color", CLK_HERE_COL)
        .on("click", feature_click);


    var textObj2 = d3.select(C3_SVG_ID).append("foreignObject")
         .attr("width", 200)
         .attr("height",100)
         .attr("x", 70)
         .attr("y", (height - 4*MARGIN));

    var textBox2 = textObj2.append("xhtml:h4")
        .text("")
        .attr("class", "factText")
        .style("font-weight", "bold")
        .style("font-size", LEG_FONT_SZE)
        .style("color", CLK_HERE_COL)
}

function stacked_bar(layNum=1, stackedData, stDatacolor, shift){

    svg = d3.select(C3_SVG_ID)

    var layerCls = "layer" + layNum;

    layer = svg.selectAll(("."+ layerCls))
        .data(stackedData)
        .enter()
        .append("g")
        .attr("class", layerCls)
        .style("fill", function(d,i) { return stDatacolor(i); })
        .style("opacity", 1)
        .attr("transform", "translate(" +MARGIN+ "," +MARGIN+ ")")

    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(d) { return (scaleY(-d[1]) - scaleY(-d[0])); })
        .attr("x", function(d,i) { 
              return (scaleX(ageTickValsAxis[i]) + BAR_SPACE/2 + shift) })
        .attr("y", function(d,i) { 
            var ht = (scaleY(-d[1]) - scaleY(-d[0]));
            return (scaleY(-d[1]) - ht); });
}

function feature_click() {

    d3.selectAll(".layer1").remove();
    d3.selectAll(".layer2").remove();
    d3.select(".factText").text("");

    if (this.textContent == factors[0]) 
        plot_smoking();
    else if (this.textContent == factors[1]) 
        plot_heart();
    else if (this.textContent == factors[2]) 
        plot_ht();
    else if (this.textContent == factors[3]) 
        plot_residence();
}

function plot_smoking() {
    d3.select(".factText").text("Factor: Smoking and Non-smoking");
    var keys = ["count_nsm", "count_fsm", "count_sm", "count_unk"];
    var keyCol = ["green", "orange", "red", "lightblue"];

    var stackedDataFemale = d3.stack().keys(keys)(aggSmokingDataFemale);
    var stackedDataMale = d3.stack().keys(keys)(aggSmokingDataMale);

    var colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(keyCol);

    stacked_bar(1, stackedDataFemale, colorScale, 0);
    stacked_bar(2, stackedDataMale, colorScale, barWidth);
    draw_axis(xAxis, yAxis);
    c3_add_legend(keys, keyCol);
}

function plot_residence() {
    d3.select(".factText").text("Factor: Residence Type");
    var keys = ["count_urban", "count_rural"];
    var keyCol = ["pink", "purple"];

    var stackedDataFemale = d3.stack().keys(keys)(aggResidDataFemale);
    var stackedDataMale = d3.stack().keys(keys)(aggResidDataMale);

    var colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(keyCol);

    stacked_bar(1, stackedDataFemale, colorScale, 0);
    stacked_bar(2, stackedDataMale, colorScale, barWidth);
    draw_axis(xAxis, yAxis);
    c3_add_legend(keys, keyCol);
}

function plot_heart() {
    d3.select(".factText").text("Factor: Heart Disease");
    var keys = ["count_nhd", "count_hd"];
    var keyCol = ["green", "red"];

    var stackedDataFemale = d3.stack().keys(keys)(aggHrtDataFemale);
    var stackedDataMale = d3.stack().keys(keys)(aggHrtDataMale);

    var colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(keyCol);

    stacked_bar(1, stackedDataFemale, colorScale, 0);
    stacked_bar(2, stackedDataMale, colorScale, barWidth);
    draw_axis(xAxis, yAxis);
    c3_add_legend(keys, keyCol);
}

function plot_ht() {

    d3.select(".factText").text("Factor: Hypertension");
    var keys = ["count_nht", "count_ht"];
    var keyCol = ["green", "red"];
//    var keyCol = ["cyan", "lightcyan"];

    var stackedDataFemale = d3.stack().keys(keys)(aggHtDataFemale);
    var stackedDataMale = d3.stack().keys(keys)(aggHtDataMale);

    var colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(keyCol);

    stacked_bar(1, stackedDataFemale, colorScale, 0);
    stacked_bar(2, stackedDataMale, colorScale, barWidth);
    draw_axis(xAxis, yAxis);
    c3_add_legend(keys, keyCol);

}

function c3_add_legend(legText, legCol) {

    d3.selectAll(".legTextRect").remove();
    d3.selectAll(".legText").remove();

    var legendTxt = d3.select(C3_SVG_ID).append("g")
                        .attr("transform", "translate(" +(2*MARGIN+10)+ ",20)");

    legendTxt.selectAll("rect")
      .data(legText)
      .enter()
      .append("rect")
      .attr("class", "legTextRect")
      .text(function(d,i) { return legText[i];})
      .attr("height", 10)
      .attr("width", 10)
      .attr("x", function(d,i) { return (i*130 - MARGIN) })
      .attr("y", (height - 2*MARGIN))
      .attr("fill", function(d,i) { return legCol[i]; });

    legendTxt.selectAll("text")
      .data(legText)
      .enter()
      .append("text")
      .attr("class", "legText")
      .attr("x", function(d,i) { 
           var offset = c3_translate(d).length - 10;
           if (offset < 0)
               offset = 0;
           return (15 + offset + i*130 - MARGIN) })
      .attr("y", (height - 2*MARGIN + 9))
      .attr("alignment-baseline", "left")
      .style("font-size", LEG_FONT_SZE)
      .style("fill", "black")
      .text(function(d,i) { return c3_translate(d) })
}

function c3_translate(shortStr) {

    if (shortStr == "count_sm")
       return "Active Smoker";

    if (shortStr == "count_nsm")
       return "Non Smoker";

    if (shortStr == "count_fsm")
       return "Past Smoker";

    if (shortStr == "count_unk")
       return "Unknown";

    if (shortStr == "count_hd")
       return "Heart Patient";

    if (shortStr == "count_nhd")
       return "No Heart Issue";

    if (shortStr == "count_ht")
       return "Hypertension";

    if (shortStr == "count_nht")
       return "No Hypertension";

    if (shortStr == "count_rural")
       return "Rural";

    if (shortStr == "count_urban")
       return "Urban";

    return shortStr;
}
