var dataset;
var subsetData;

var height, width;
var scaleX, scaleY;

var glucTickVals = [50,100, 150, 200, 250]
var ageTickVals = [30, 40, 50, 60, 70, 80]

var slxnFlag =0;

var filterTxtCol = "brown";
var clrTxtCol = "red";
var butnTxtCol = "white";

var chart2S

function plot_chart(data) {
    var svg1 = d3.select(C2_SVG_MN);

    svg1.selectAll("circle").remove();
    svg1.selectAll(".bmiText").remove();
    svg1.selectAll(".bmiClkText").remove();

    svg1 = d3.select(C2_SVG_MN)
             .append("g")
             .attr("transform", "translate(" +MARGIN+ "," +(2*MARGIN)+ ")")

    svg1.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d,i) { return (scaleX(data[i].avg_glucose_level)) })
		.attr("cy", function(d,i) { return (scaleY(data[i].age)) })
		.attr("r", function(d,i)  { return bmi_size(data[i].bmi) })
		.style("fill", function(d,i)  { return gender_col(data[i].gender) })
		.style("stroke", function(d,i)  { return gender_col(data[i].gender) })

    add_legend();
}

async function chart1() {
    svg_clean();
    svg_init();

    svg1 = d3.select(C2_SVG_MN);
    height = svg1.attr("height");
    width =  svg1.attr("width");

    d3.select("main")
        .select(C2_SVG_HDR)
	.text("Age and Blood Glucose Level");

    dataset = await d3.csv("https://rajeshkay.github.io/data/stroke-data.csv");

    var age = dataset.map(function(d) {
	return parseInt(d.age); });

    var avgGlucoseLevel = dataset.map(function(d) {
	return parseFloat(d.avg_glucose_level); });

    scaleX = d3.scaleLinear()
		.domain([50, d3.max(avgGlucoseLevel)])
                .range([0, (width - (2*MARGIN))]);

    scaleY = d3.scaleLinear()
		.domain([d3.min(ageTickVals), d3.max(age)])
		.range([height-(3*MARGIN),0]);


    xAxis = d3.axisBottom(scaleX)
		.tickValues(glucTickVals)
		.tickFormat(function(d, i) {return glucTickVals[i]});

    yAxis = d3.axisLeft(scaleY)
		.tickValues(ageTickVals)
		.tickFormat(function(d, i) {return ageTickVals[i]});

    slxnFlag = 0;
    handleBothClick();

    d3.select(C2_SVG_MN)
	.append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(2*MARGIN)+ ")")
        .style("stroke-width", "2px")
	.call(yAxis)
        .selectAll("text")
        .style("font-weight", "bold");

    d3.select(C2_SVG_MN)
	.append("g")
	.attr("transform", "translate("+MARGIN+","+(height - MARGIN)+")")
        .style("stroke-width", "2px")
	.call(xAxis)
        .selectAll("text")
        .style("font-weight", "bold");


    // Axis title names
    svg1 = d3.select(C2_SVG_MN);

    svg1.append("text")
      .attr("class", "x-axis-title")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Blood Glucose Level");

    svg1.append("text")
      .attr("class", "y-axis-title")
      .attr("x", -height / 2)
      .attr("y", MARGIN - 30)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Age at the time of Stroke");

}

function handleMaleClick() {
    slxnFlag &= RST_GEN;
    slxnFlag |= SL_MALE;
    filter_data();

    plot_chart(subsetData); 
    this.remove();
    add_button("Both", handleBothClick, MARGIN, (height - (3*MARGIN - 20)), GEN_COL_BOTH);
    add_button("Female", handleFemaleClick, (MARGIN+MARGIN+2), (height - (3*MARGIN - 20)), GEN_COL_FEMALE);
}

function handleFemaleClick() {
    slxnFlag &= RST_GEN;
    slxnFlag |= SL_FEMALE;
    filter_data();

    plot_chart(subsetData); 
    this.remove();
    add_button("Male", handleMaleClick, MARGIN, (height - (3*MARGIN - 20)), GEN_COL_MALE);
    add_button("Both", handleBothClick, (MARGIN+MARGIN+2), (height - (3*MARGIN - 20)), GEN_COL_BOTH);
}

function handleBothClick() {
    slxnFlag &= RST_GEN;
    filter_data();
    plot_chart(subsetData); 
    add_button("Male", handleMaleClick, MARGIN, (height - (3*MARGIN - 20)), GEN_COL_MALE);
    add_button("Female", handleFemaleClick, (MARGIN+MARGIN+2), (height - (3*MARGIN - 20)), GEN_COL_FEMALE);
}

function add_button(buttonText, onclick, x, y, col) {

    svg1 = d3.select(C2_SVG_MN)
             .append("g")
             .attr("transform", "translate(" +(MARGIN+10)+ "," +(2*MARGIN)+ ")")

    var buttonObj = svg1.append("foreignObject")
         .attr("width", 50)
         .attr("height", 30)
         .attr("x", x)
         .attr("y", y);

    var button = buttonObj.append("xhtml:button")
        .style("width", "100%")
        .style("height", "80%")
        .style("background-color", col)
        .text(buttonText)
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("color", butnTxtCol)
        .on("click", onclick);

    d3.select(".genClkText").remove();
    var textObj = svg1.append("foreignObject")
         .attr("width", 120)
         .attr("height", 30)
         .attr("x", -MARGIN)
         .attr("y", (y-10));

    var textBox = textObj.append("xhtml:h4")
        .text("Choose to filter >>")
        .attr("class", "genClkText")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("color", filterTxtCol);
}

function add_legend(){

    var sizeLegend = d3.select(C2_SVG_MN).append("g")
                        .attr("transform", "translate(" +(2*MARGIN+10)+ ",20)");

    var sizeValues = [SZE_vSMALL, SZE_SMALL, SZE_MED, SZE_LARGE]; 
    var bmiText = ["Under Weight", "Healthy Weight", "Over Weight", "Obese"];

    sizeLegend.selectAll("circle")
      .data(sizeValues)
      .enter()
      .append("circle")
      .attr("id", (d, i) => ("bmiCle-"+bmiText[i]))
      .text(function(d,i) { return bmiText[i];})
      .attr("cy", 10)
      .attr("cx", (d, i) => i * 120)
      .attr("r", d => d)
      .attr("fill", "steelblue")
      .on("click", legendClick);

    sizeLegend.selectAll("text")
      .data(bmiText)
      .enter()
      .append("text")
      .attr("class", "bmiText")
      .attr("id", (d, i) => ("bmiTxt-"+bmiText[i]))
      .attr("y", 12)
      .attr("x", (d, i) => i * 120 + sizeValues[i] +5)
      .attr("alignment-baseline", "middle")
      .style("font-size", "12px")
      .style("color", "blue")
      .text(d => d)
      .on("click", legendClick);

    var textObj = d3.select(C2_SVG_MN).append("foreignObject")
         .attr("width", 120)
         .attr("height", 30)
         .attr("x", 5)
         .attr("y", 8);

    var textBox = textObj.append("xhtml:h4")
        .text("Click to Filter >>")
        .attr("class", "bmiClkText")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("color", filterTxtCol)
        .on("click", legendClick);

}

function legendClick() {

    if (this.textContent == "Clear BMI Selection") {
        slxnFlag &= RST_BMI;
        rem_clear();
    }
    else {
        add_clear()
    if (this.textContent == "Obese") {
        slxnFlag &= RST_BMI;
        slxnFlag |= SL_OBESE;
    }
    else if (this.textContent == "Over Weight") {
        slxnFlag &= RST_BMI;
        slxnFlag |= SL_OVWT;
    }
    else if (this.textContent == "Healthy Weight") {
        slxnFlag &= RST_BMI;
        slxnFlag |= SL_CWT;
    }
    else {
        slxnFlag &= RST_BMI;
        slxnFlag |= SL_UWT;
    }
    }

    filter_data();
    plot_chart(subsetData);
    
}

function filter_data() {

    var gender = '*';

    if (slxnFlag == 0) {
        subsetData = dataset;
        return;
    }

    if (slxnFlag & SL_MALE) 
         gender = "Male";
    else if (slxnFlag & SL_FEMALE)
         gender = "Female";

    if (slxnFlag & SL_OBESE) {
        if (gender != "*")
            subsetData = dataset.filter(d => ((d.bmi >= BMI_OBESE) && (d.gender == gender)));
        else
            subsetData = dataset.filter(d => (d.bmi >= BMI_OBESE));
    }
    else if (slxnFlag & SL_OVWT) {
        if (gender != "*")
            subsetData = dataset.filter(d => (((d.bmi < BMI_OBESE) && (d.bmi >= BMI_OVWT))
                                              && (d.gender == gender)));
        else
            subsetData = dataset.filter(d => ((d.bmi < BMI_OBESE) && (d.bmi >= BMI_OVWT)));
    }
    else if (slxnFlag & SL_CWT) {
        if (gender != "*")
            subsetData = dataset.filter(d => (((d.bmi < BMI_OVWT) && (d.bmi >= BMI_CWT))
                                              && (d.gender == gender)));

        else
            subsetData = dataset.filter(d => ((d.bmi < BMI_OVWT) && (d.bmi >= BMI_CWT)));
    }
    else if (slxnFlag & SL_UWT) {
        if (gender != "*")
            subsetData = dataset.filter(d => ((d.bmi < BMI_CWT)
                                              && (d.gender == gender)));
        else
            subsetData = dataset.filter(d => (d.bmi < BMI_CWT));
    }
    else {
            subsetData = dataset.filter(d => (d.gender == gender));
    }
}

function add_clear() {
    var textObj = d3.select(C2_SVG_MN).append("foreignObject")
         .attr("width", 120)
         .attr("height", 30)
         .attr("x", 5)
         .attr("y", 25);

    var textBox = textObj.append("xhtml:h4")
        .text("Clear BMI Selection")
        .attr("class", "bmiClrText")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("color", clrTxtCol)
        .on("click", legendClick);
}

function rem_clear() {
    d3.selectAll(".bmiClrText").remove();
}
