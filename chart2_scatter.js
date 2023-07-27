var dataset;
var subsetData;

var height, width;
var c2ScaleX, c2ScaleY;

var glucTickVals = [50,100, 150, 200, 250]
var ageTickVals = [30, 40, 50, 60, 70, 80]

var slxnFlag =0;

var filterTxtCol = "brown";
var clrTxtCol = "red";
var butnTxtCol = "white";

function plot_chart(data) {
    var svg1 = d3.select(C2_SVG_ID);

    svg1.selectAll("circle").remove();
    svg1.selectAll(".bmiText").remove();
    svg1.selectAll(".bmiClkText").remove();
    svg1.selectAll(".blnkText").remove();

    svg1 = d3.select(C2_SVG_ID)
             .append("g")
             .attr("transform", "translate(" +MARGIN+ "," +(2*MARGIN)+ ")")

    if (data.length == 0) {

        var textObj = svg1.append("foreignObject")
            .attr("width", 150)
            .attr("height",200)
            .attr("x", (DFLT_SVG_WID/3))
            .attr("y", (DFLT_SVG_HT/2));
                
        textBox = textObj.append("xhtml:h4")
            .text("There is no data for this selection")
            .attr("class", "blnkText")
            .style("font-size", LEG_FONT_SZE);
    }
    else {
        svg1.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d,i) { return (c2ScaleX(data[i].avg_glucose_level)) })
		.attr("cy", function(d,i) { return (c2ScaleY(data[i].age)) })
		.attr("r", function(d,i)  { return bmi_size(data[i].bmi) })
		.style("fill", function(d,i)  { return gender_col(data[i].gender) })
		.style("stroke", function(d,i)  { return gender_col(data[i].gender) })
    }

    add_legend();
}

async function chart2() {
    svg_clean(C2_DIV_ID, C2_SVG_ID);

    svg1 = d3.select(C2_SVG_ID);
    height = svg1.attr("height");
    width =  svg1.attr("width");

    d3.select(C2_DIV_ID)
        .select(C2_SVG_H3_ID)
	.text("Blood Glucose Level & Obesity vs Age and Gender");

    dataset = await d3.csv("https://rajeshkay.github.io/data/stroke-data.csv");

    var age = dataset.map(function(d) {
	return parseInt(d.age); });

    var avgGlucoseLevel = dataset.map(function(d) {
	return parseFloat(d.avg_glucose_level); });

    c2ScaleX = d3.scaleLinear()
		.domain([50, d3.max(avgGlucoseLevel)])
                .range([0, (width - (2*MARGIN))]);

    c2ScaleY = d3.scaleLinear()
		.domain([d3.min(ageTickVals), d3.max(age)])
		.range([height-(3*MARGIN),0]);


    xAxis = d3.axisBottom(c2ScaleX)
		.tickValues(glucTickVals)
		.tickFormat(function(d, i) {return glucTickVals[i]});

    yAxis = d3.axisLeft(c2ScaleY)
		.tickValues(ageTickVals)
		.tickFormat(function(d, i) {return ageTickVals[i]});

    slxnFlag = 0;
    handleBothClick();

    d3.select(C2_SVG_ID)
	.append("g")
        .attr("transform", "translate(" +MARGIN+ "," +(2*MARGIN)+ ")")
        .style("stroke-width", AXIS_LNE_SZE)
        .style("color", AXIS_LNE_COL)
	.call(yAxis)
        .selectAll("text")
        .style("font-weight", "bold");

    d3.select(C2_SVG_ID)
	.append("g")
	.attr("transform", "translate("+MARGIN+","+(height - MARGIN)+")")
        .style("stroke-width", AXIS_LNE_SZE)
        .style("color", AXIS_LNE_COL)
	.call(xAxis)
        .selectAll("text")
        .style("font-weight", "bold");


    // Axis title names
    svg1 = d3.select(C2_SVG_ID);

    svg1.append("text")
      .attr("class", "x-axis-title")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Blood Glucose Level")
      .style("fill", AXIS_FONT_COL)
      .style("font-family", AXIS_FONT_FMLY)
      .style("font-size", AXIS_FONT_SZE);

    svg1.append("text")
      .attr("class", "y-axis-title")
      .attr("x", -height / 2)
      .attr("y", MARGIN - 30)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Age at the time of Stroke")
      .style("fill", AXIS_FONT_COL)
      .style("font-family", AXIS_FONT_FMLY)
      .style("font-size", AXIS_FONT_SZE);

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

    svg1 = d3.select(C2_SVG_ID)
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
        .on("click", onclick)
        .on("mouseover", change_cursor)
        .on("mouseleave", change_cursor);

    d3.select(".genClkText").remove();

    var textObj = svg1.append("foreignObject")
         .attr("width", 100)
         .attr("height",120)
         .attr("x", -MARGIN)
         .attr("y", (y-10));

    var textBox = textObj.append("xhtml:h4")
        .text("Click to Filter")
        .attr("class", "genClkText")
        .style("font-weight", "bold")
        .style("font-size", LEG_FONT_SZE)
        .style("color", CLK_HERE_COL);
}

function add_legend(){

    var sizeLegend = d3.select(C2_SVG_ID).append("g")
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
      .attr("cx", (d, i) => (30 + i * 130))
      .attr("r", d => d)
      .attr("fill", "steelblue")
      .on("click", legend_click)
      .on("mouseover", change_cursor)
      .on("mouseleave", change_cursor);

    sizeLegend.selectAll("text")
      .data(bmiText)
      .enter()
      .append("text")
      .attr("class", "bmiText")
      .attr("id", (d, i) => ("bmiTxt-"+bmiText[i]))
      .attr("y", 14)
      .attr("x", function(d, i){
              var offset = 0;
              if (i == 2)
                  offset = 3;
              else if (i == 3)
                  offset = 6;
              return (40 + i * 130 + offset) })
      .attr("alignment-baseline", "left")
      .style("font-size", LEG_FONT_SZE)
      .style("fill", LEG_FONT_COL)
      .style("text-decoration", "underline")
      .text(d => d)
      .on("click", legend_click)
      .on("mouseover", change_cursor)
      .on("mouseleave", change_cursor);

    var textObj = d3.select(C2_SVG_ID).append("foreignObject")
         .attr("width", 120)
         .attr("height",40)
         .attr("x", 5)
         .attr("y", 0);

    var textBox = textObj.append("xhtml:h4")
        .text("Click BMI to Filter")
        .attr("class", "bmiClkText")
        .style("font-weight", "bold")
        .style("font-size", LEG_FONT_SZE)
        .style("color", CLK_HERE_COL);
}

function legend_click() {

    if (this.textContent.substring(0,15) == "Clear Selection") {
        slxnFlag &= RST_BMI;
        rem_clear();
    }
    else {
        add_clear(this.textContent)
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

function add_clear(text="") {
   
    d3.select(C2_SVG_ID).select(".bmiClrText").remove();

    var textObj = d3.select(C2_SVG_ID).append("foreignObject")
         .attr("width", 200)
         .attr("height",100)
         .attr("x", 5)
         .attr("y", 35);

    textObj.append("xhtml:h4")
        .text(("Clear Selection: " + text))
        .attr("class", "bmiClrText")
        .style("font-size", LEG_FONT_SZE)
        .style("font-weight", "bold")
        .style("color", clrTxtCol)
        .on("click", legend_click)
        .on("mouseover", change_cursor)
        .on("mouseleave", change_cursor);
}

function rem_clear() {
    d3.selectAll(".bmiClrText").remove();
}
