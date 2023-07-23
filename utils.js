var GEN_COL_MALE = "darkblue";
var GEN_COL_FEMALE = "darkgreen";
var GEN_COL_BOTH = "black";

var AXIS_FONT_FMLY = "Verdana";
var AXIS_FONT_SZE = "15px";
var AXIS_FONT_COL = "black";
var AXIS_LNE_COL = "black";
var AXIS_LNE_SZE = "1px";

var LEG_FONT_FMLY = "Verdana";
var LEG_FONT_SZE = "15px";
var LEG_FONT_COL = "blue";

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

var C1_SVG_MN = ".svg1";
var C1_SVG_HDR = ".svg1h3";

var C2_SVG_MN = ".svg1";
var C2_SVG_HDR = ".svg1h3";

var C3_SVG_MN = ".svg1";
var C3_SVG_HDR = ".svg1h3";

/*
var C2_SVG_MN = ".svg2";
var C2_SVG_HDR = ".svg2h3";

var C3_SVG_MN = ".svg3";
var C3_SVG_HDR = ".svg3h3";
*/


function svg_init() {
    var height = 600;
    var width = 600;

var centerX = (windowWidth - width) / 2;
var centerY = (windowHeight - height) / 2;

    d3.select(".svg1")
	.attr("width", width)
	.attr("height", height)
	.style("background-color", "lightgray");

//	.style("position", "relative")
//	.style("left", centerX + "px")
//	.style("top", centerY + "px")

}

function svg_clean(svg=".svg1", div=".div1") {
    d3.select(svg).selectAll("*").remove();
//    d3.select(div).select("h3").text("");
//    d3.select(div).select("p").text("");
    d3.select("main").select(".svg1h3").text("");
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
