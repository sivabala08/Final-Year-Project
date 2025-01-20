$(document).ready(function() {
textFit(document.getElementsByClassName('textFit'), {multiLine: true});
/*textFit($('#textFit'));*/
});


$(document).ready(function(){
	$(".refreshBtn").click(function(){
		document.getElementsByName('hmode')[0].value="NEW";
		document.forms[0].submit();
	});
	
	$(".closeBtn").click(function(){
		window.parent.closeTab();
	});
	

	/*console.log("pmmm");
	console.log("parentPM: "+window.parent.jQuery("#tabframe").length);
	console.log("parentPM: "+window.parent.jQuery("#tabframe >.tabs-panels").length);
	console.log("parentPM: "+window.parent.jQuery("#tabframe >.tabs-panels >.panel").length);
	console.log("parentPM: "+window.parent.jQuery("#tabframe >.tabs-panels >.panel >.panel-body").length);
	
	window.parent.jQuery("#tabframe")[0].style.cssText+=" height:769px !important;"
	window.parent.jQuery("#tabframe").css({"height":"769px !important"}); 
	window.parent.jQuery("#tabframe >.tabs-panels").css({"height":"100% !important"}); 
	window.parent.jQuery("#tabframe >.tabs-panels >.panel").css({"height":"100% !important"}); 
	window.parent.jQuery("#tabframe >.tabs-panels >.panel >.panel-body").css({"height":"100% !important"});*/ 
	
	
});




/*-Open in new tab on expand btn click-*/
$(document).ready(function(){
	$('.fullScreenBtn').click(function(){

		var crNo=null; if($("#crNoInput").length) crNo=$("#crNoInput")[0].value;
		var billNo=null; if($("#billNoInput").length) billNo=$("#billNoInput")[0].value;
		var strParamBean="";
		if(crNo!=null){ strParamBean="&crNo="+crNo}
		else if(billNo!=null){ strParamBean="&billNo="+billNo;}

		var url="";

		var strHref=window.location.href;
		var strPosition = strHref.search("varSSOTicketGrantingTicket");

		if(strPosition!=null && strPosition>-1){
		    var part1 = strHref.substr(0, strPosition);
		    var part2 = strHref.substr( strPosition);
		    url=part1+strParamBean+"&"+part2;

		  } else if (strPosition!=null && strPosition==-1){
			  if(strHref.endsWith(".cnt?")){ url=strHref+strParamBean; }
			  else if(strHref.endsWith(".cnt")){ url=strHref+"?"+strParamBean;}
			  else { url=strHref; }

		  } else { url=strHref;  }

		var win = window.open(url,'_blank');
		localStorage.setItem('isFullScreen','1');
	});

	if(localStorage.getItem('isFullScreen')=='1')
	{
		//$('.toggleForfullScreenBtn').toggleClass('col-sm-4 col-sm-5');
		$('.fullScreenBtn').hide();
	}
	$(window).on("beforeunload", function() {
	    return localStorage.setItem('isFullScreen','0');
	});

	if(!localStorage.getItem('isFullScreen'))
		$('.fullScreenBtn:first-child').click();
	});


var tippyBorderUtlInstance = {}

$(document).ready(function(){
	var tippy_fullScrBtn=tippy('.fullScreenBtn', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 350,
	    animation: 'shift-away-extreme', /*perspective-extreme*/
	    placement: 'bottom',
	    allowHTML: true,
	    content: '<strong><span style="color: aqua;">Responsive </span> View</strong>',
	});

	var tippy_refreshBtn=tippy('.refreshBtn', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 350,
	    animation: 'shift-away-extreme', /*perspective-extreme*/
	    placement: 'bottom',
	    allowHTML: true,
	    content: '<strong><span style="color: aqua;">Refresh </span> Tab</strong>',
	});
	
	var tippy_closeBtn=tippy('.closeBtn', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 350,
	    animation: 'shift-away-extreme', /*perspective-extreme*/
	    placement: 'bottom',
	    allowHTML: true,
	    content: '<strong><span style="color: aqua;">Close </span> Tab</strong>',
	});
	
	tippyBorderUtlInstance.fullScrBtn=tippy_fullScrBtn[0];
	tippyBorderUtlInstance.refreshBtn=tippy_refreshBtn[0];
	tippyBorderUtlInstance.closeBtn=tippy_closeBtn[0];
	
});

$(document).ready(function(){
	var tippy_searchTileMinimizeBtn=tippy('#container2ExpandBtn', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 350,
	    animation: 'shift-away-extreme',
	    placement: 'bottom',
	    allowHTML: true,
	    content: '<strong><span style="color: aqua;">Minimize/Maxmize </span> Search Criteria</strong>',
	});
	
	tippyBorderUtlInstance.searchTileMinimizeBtn=tippy_searchTileMinimizeBtn[0];
});

