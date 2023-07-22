var COL_MALE = "darkblue";
var COL_FEMALE = "darkgreen";

var SZE_vSMALL = 1;
var SZE_SMALL = 3;
var SZE_MED = 5;
var SZE_LARGE = 7;
var SZE_vLARGE = 9;

var MARGIN = 50;

// Get the window dimensions
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var BAR_SPACE = 20;




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
   if(bmi <= 18.5) 
	return SZE_vSMALL;
   else if (bmi <= 24.9)
	return SZE_SMALL;
   else if (bmi <= 29.9)
	return SZE_MED;
   else
	return SZE_vLARGE;
}

function gender_col(gender) {
   if (gender == "Female")
	return COL_FEMALE;
   else
	return COL_MALE;
}
