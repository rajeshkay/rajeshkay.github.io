var GEN_COL_MALE = "brown";
var GEN_COL_FEMALE = "grey";
var GEN_COL_BOTH = "black";

var AXIS_FONT_FMLY = "Verdana";
var AXIS_FONT_SZE = "15px";
var AXIS_FONT_COL = "black";
var AXIS_LNE_COL = "black";
var AXIS_LNE_SZE = "2px";

var LEG_FONT_FMLY = "Verdana";
var LEG_FONT_SZE = "15px";
var LEG_FONT_COL = "blue";

var ANN_FONT_COL = "red";

var CLK_HERE_COL = "brown";

var SZE_vSMALL = 1.5;
var SZE_SMALL = 3;
var SZE_MED = 5;
var SZE_LARGE = 9;

var MARGIN = 50;

var BMI_CWT = 19;
var BMI_OVWT = 25;
var BMI_OBESE = 30;

var SL_OBESE = 0x1;
var SL_OVWT = 0x2;
var SL_CWT = 0x4;
var SL_UWT = 0x8;
var RST_BMI = 0xF0;

var RST_GEN = 0x0F;
var SL_MALE = 0x10;
var SL_FEMALE = 0x20;

// Get the window dimensions
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var BAR_SPACE = 20;

var DFLT_SVG_WID = 600
var DFLT_SVG_HT = 600

var C1_DIV_ID = "#chart1";
var C1_SVG_CL = "c1svg1";
var C1_SVG_ID = "#c1svg1";
var C1_SVG_H3 = "c1h3";
var C1_SVG_H3_ID = "#c1h3";

var C2_DIV_ID = "#chart2";
var C2_SVG_CL = "c2svg1";
var C2_SVG_ID = "#c2svg1";
var C2_SVG_H3 = "c2h3";
var C2_SVG_H3_ID = "#c2h3";

var C3_DIV_ID = "#chart3";
var C3_SVG_CL = "c3svg1";
var C3_SVG_ID = "#c3svg1";
var C3_SVG_H3 = "c3h3";
var C3_SVG_H3_ID = "#c3h3";

function create_svgs(div, svg, svghdr) {

    d3.select(div)
        .append(svghdr)
        .attr("class", svghdr)
        .attr("id", svghdr)

    d3.select(div)
        .append("svg")
        .attr("class", svg)
        .attr("id", svg)
        .attr("width", DFLT_SVG_WID)
        .attr("height", DFLT_SVG_HT)
        .attr("class", svg)
        .attr("id", svg);
}

function init_svg(div, svg, svghdr) {

//var centerX = (windowWidth - width) / 2;
//var centerY = (windowHeight - height) / 2;

    d3.select(div).select(svg)
	.attr("width", DFLT_SVG_WID)
	.attr("height", DFLT_SVG_HT)
/*
	.style("background-color", "lightgray");
	.style("position", "relative")
	.style("left", centerX + "px")
	.style("top", centerY + "px")
*/

}

function svg_clean(div, svg) {
    d3.select(svg).selectAll("*").remove();
    d3.select(div).select("h3").text("");
    d3.select(div).select("p").text("");
}

function bmi_size(bmi) {
   if(bmi < BMI_CWT) 
	return SZE_vSMALL;
   else if (bmi < BMI_OVWT)
	return SZE_SMALL;
   else if (bmi < BMI_OBESE) 
	return SZE_MED;
   else
	return SZE_LARGE;
}

function gender_col(gender) {
   if (gender == "Female")
	return GEN_COL_FEMALE;
   else
	return GEN_COL_MALE;
}


function change_cursor() {
    if (event.type = "mouseover")
       this.style.cursor = "pointer";
    else
       this.style.cursor = "default";
}

init_svg(C1_DIV_ID, C1_SVG_ID, C1_SVG_H3_ID);
init_svg(C2_DIV_ID, C2_SVG_ID, C2_SVG_H3_ID);
init_svg(C3_DIV_ID, C3_SVG_ID, C3_SVG_H3_ID);

chart1();
chart2();
chart3();

