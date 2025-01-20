/**
 * Javascript functions
 */

var GovtColor = '#F0AAAD';// '#ffb366';

// commented By Ameya for STH 
/*function setTable(url) {
	var table;
	if ($.fn.dataTable.isDataTable('#example-table')) {
		table = $('#example-table').dataTable();
		var newUrl = url;
		
		
		  //manisha STH
		    ajaxParamBase64(newUrl);
		    newUrl = newUrl + "&abfhttf="+document.getElementsByName(token_key)[0].value;

		    
		table.fnReloadAjax(newUrl);
	}

	else {
		
		
		
		
		  //manisha STH
		    ajaxParamBase64(url);
		    url = url + "&abfhttf="+document.getElementsByName(token_key)[0].value;

		table = $('#example-table').DataTable({
			
			"ajax" : url,
			"deferRender" : true,
			"fixedHeader" : true,
			"responsive" : true,
			"createdRow": function( row, data, dataIndex ) {
			    if ( data[5] == "Govt." ) {
			    	$(row).css('background-color', GovtColor)
			    }
			  }

		});
	}
	return table;
}
*/
// added By Ameya  for STH 
function setTable(url) {
    var table;

    if ($.fn.dataTable.isDataTable('#example-table')) {
        table = $('#example-table').DataTable();
        var newUrl = url;

        //alert("This is the if part of the bbpublic.js of setTable");

        //manisha STH
        ajaxParamBase64(newUrl);
        newUrl = newUrl + "&abfhttf=" + document.getElementsByName(token_key)[0].value;

        try {
            // Attempt to reload the data
            table.ajax.url(newUrl).load();
        } catch (error) {
            // Handle the error
            alert("Error reloading data: " + error);

            // Perform additional error handling if needed
        }
    } else {
        alert("This is the else part of the bbpublic.js of setTable");

        //manisha STH
        ajaxParamBase64(url);
        url = url + "&abfhttf=" + document.getElementsByName(token_key)[0].value;

        table = $('#example-table').DataTable({
            "ajax": {
                "url": url,
                "dataType": 'json', // Set the expected data type
                "error": function (xhr, error, thrown) {
                    alert("This Activity Not Allowed.....!");
                }
            },
            "deferRender": true,
            "fixedHeader": true,
            "responsive": true,
            "createdRow": function (row, data, dataIndex) {
                if (data[5] == "Govt.") {
                    $(row).css('background-color', GovtColor);
                }
            }
        });
    }

    return table;
}



function updateMapLocation()
{	
	console.log("here");
	$.ajax({
	    url: "/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=FETCHLOCATION"+"&lang="+lang,
	    success: function(data) {
	    	$.locations = data; 
	    }, 
	    async:false
	  });
	$.locations = JSON.parse($.locations);
	console.log("dfdfdf"+$.locations);        
}

function loadDistrictList(stateCode) {

	$('#dCode').val("-1");
	$('#sCode').val(stateCode);

	setSearchMode(SearchEnum.DROPDOWN);
	
	var newURL = "/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETDISTRICTLIST";
	  //manisha STH
	    ajaxParamBase64(newURL);
	    newURL = newURL + "&abfhttf="+document.getElementsByName(token_key)[0].value;

	
	
	$.getJSON(newURL, {
		selectedStateCode : stateCode
	}, function(data) {
		$("#distList option").not(':first').remove(); // Remove all <option> child tags.
		console.log(data);
		
		if(lang==1)
			{
				
					if(stateCode==35)
						data.records=JSON.parse('[{"value":"638","id":"à¤¨à¤¿à¤•à¥‹à¤¬à¤¾à¤° "},{"value":"639","id":"à¤‰à¤¤à¥�à¤¤à¤° à¤”à¤° à¤®à¤§à¥�à¤¯ à¤…à¤‚à¤¡à¤®à¤¾à¤¨ "},{"value":"640","id":"à¤¦à¤•à¥�à¤·à¤¿à¤£ à¤…à¤‚à¤¡à¤®à¤¾à¤¨ "}]');
					else if(stateCode==28)
						data.records=JSON.parse('[{"value":"553","id":"à¤…à¤¨à¤‚à¤¤à¤ªà¥�à¤° "},{"value":"554","id":"à¤šà¤¿à¤¤à¥�à¤¤à¥‚à¤°"},{"value":"545","id":"à¤ªà¥‚à¤°à¥�à¤µà¥€ à¤—à¥‹à¤¦à¤¾à¤µà¤°à¥€"},{"value":"548","id":"à¤—à¥�à¤‚à¤Ÿà¥‚à¤° "},{"value":"547","id":"à¤•à¥ƒà¤·à¥�à¤£à¤¾"},{"value":"552","id":"à¤•à¥�à¤°à¤¨à¥‚à¤²"},{"value":"549","id":"à¤ªà¥�à¤°à¤•à¤¾à¤¶à¤® "},{"value":"542","id":"à¤¶à¥�à¤°à¥€à¤•à¤¾à¤•à¥�à¤²à¤®"},{"value":"550","id":"à¤°à¥€ à¤ªà¥‹à¤Ÿà¥�à¤Ÿà¤¿ à¤¶à¥�à¤°à¥€à¤°à¤¾à¤®à¥�à¤²à¥� à¤¨à¥‡à¤²à¥�à¤²à¥‹à¤°"},{"value":"544","id":"à¤µà¤¿à¤¶à¤¾à¤–à¤¾à¤ªà¤¤à¥�à¤¤à¤¨à¤® "},{"value":"543","id":"à¤µà¤¿à¤œà¤¯à¤¨à¤—à¤°à¤®"},{"value":"546","id":"à¤ªà¤¶à¥�à¤šà¤¿à¤® à¤—à¥‹à¤¦à¤¾à¤µà¤°à¥€"},{"value":"551","id":"à¤µà¤¾à¤ˆ à¤�à¤¸ à¤†à¤°"}]');
					else if(stateCode==18)
						data.records=JSON.parse('[{"value":"324","id":"à¤¬à¤•à¥�à¤¸à¤¾ "},{"value":"303","id":"à¤¬à¤¾à¤°à¤ªà¥‡à¤Ÿà¤¾"},{"value":"319","id":"à¤¬à¥‹à¤‚à¤—à¤ˆà¤—à¤¾à¤‚à¤µ"},{"value":"316","id":"à¤•à¤›à¤¾à¤° "},{"value":"320","id":"à¤šà¤¿à¤°à¤¾à¤‚à¤—"},{"value":"325","id":"à¤šà¤¿à¤°à¤¾à¤‚à¤—"},{"value":"308","id":"à¤§à¥‡à¤®à¤¾à¤œà¥€ "},{"value":"301","id":"à¤§à¥�à¤¬à¤°à¥€"},{"value":"310","id":"à¤¡à¤¿à¤¬à¥�à¤°à¥‚à¤—à¤¢à¤¼"},{"value":"315","id":"à¤¦à¥€à¤®à¤¾ à¤¹à¤¸à¤¾à¤“ "},{"value":"302","id":"à¤—à¥‹à¤²à¤ªà¤¾à¤¡à¤¼à¤¾"},{"value":"313","id":"à¤—à¥‹à¤²à¤¾à¤˜à¤¾à¤Ÿ"},{"value":"318","id":"à¤¹à¥ˆà¤²à¤¾à¤•à¤¾à¤‚à¤¡à¥€"},{"value":"312","id":"à¤œà¥‹à¤°à¤¹à¤¾à¤Ÿ "},{"value":"321","id":"à¤•à¤¾à¤®à¤°à¥‚à¤ª"},{"value":"322","id":"à¤•à¤¾à¤®à¤°à¥‚à¤ª à¤®à¤¹à¤¾à¤¨à¤—à¤°"},{"value":"314","id":"à¤•à¤¾à¤°à¥�à¤¬à¥€ à¤†à¤‚à¤—à¤²à¥‹à¤‚à¤— "},{"value":"317","id":"à¤•à¤°à¥€à¤®à¤—à¤‚à¤œ"},{"value":"300","id":"à¤•à¥‹à¤•à¤°à¤¾à¤�à¤¾à¤°"},{"value":"307","id":"Lakhimpur "},{"value":"304","id":"à¤®à¥‹à¤°à¥€à¤—à¤¾à¤‚à¤µ"},{"value":"305","id":"à¤¨à¤—à¤¾à¤‚à¤µ"},{"value":"323","id":"à¤¨à¤²à¤¬à¤¾à¤¡à¤¼à¥€ "},{"value":"311","id":"à¤¶à¤¿à¤µà¤¸à¤¾à¤—à¤°"},{"value":"306","id":"à¤¸à¥‹à¤¨à¤¿à¤¤à¤ªà¥�à¤°"},{"value":"309","id":"à¤¤à¤¿à¤¨à¤¸à¥�à¤•à¤¿à¤¯à¤¾"},{"value":"326","id":"à¤‰à¤¦à¤²à¤—à¥�à¤¡à¤¼à¥€"}]');
					else if(stateCode==12)
						data.records=JSON.parse('[{"value":"260","id":"à¤…à¤¨à¥�à¤œà¤¾à¤µ  "},{"value":"253","id":"à¤šà¤¾à¤‚à¤—à¤²à¤¾à¤‚à¤—"},{"value":"257","id":"à¤‡à¤¬à¤‚à¤— à¤µà¥ˆà¤²à¥€"},{"value":"247","id":"à¤ªà¥‚à¤°à¥�à¤µà¥€ à¤•à¤¾à¤®à¥‡à¤‚à¤— "},{"value":"251","id":"à¤ªà¥‚à¤°à¥�à¤µà¥€ à¤¸à¤¿à¤¯à¤¾à¤‚à¤—"},{"value":"256","id":"à¤•à¥�à¤°à¥�à¤‚à¤— à¤•à¥�à¤®à¥‡"},{"value":"259","id":"à¤²à¥‹à¤¹à¤¿à¤¤ "},{"value":"642","id":"à¤²à¤‚à¤¬à¥€ à¤šà¥‹à¤Ÿà¥€"},{"value":"258","id":"à¤¨à¤¿à¤šà¤²à¥€ à¤¦à¤¿à¤¬à¤¾à¤‚à¤— à¤˜à¤¾à¤Ÿà¥€"},{"value":"255","id":"à¤²à¥‹à¤…à¤° à¤¸à¥�à¤¬à¤¨à¤¸à¤¿à¤°à¥€ "},{"value":"248","id":"à¤ªà¤¾à¤ªà¥�à¤® à¤ªà¤¾à¤°à¥‡"},{"value":"245","id":"à¤¤à¤µà¤¾à¤‚à¤—"},{"value":"254","id":"à¤¤à¤¿à¤°à¤ª"},{"value":"252","id":"à¤…à¤ªà¤° à¤¸à¤¿à¤¯à¤¾à¤‚à¤— "},{"value":"249","id":"à¤…à¤ªà¤° à¤¸à¥�à¤¬à¤¨à¤¸à¤¿à¤°à¥€"},{"value":"246","id":"à¤ªà¤¶à¥�à¤šà¤¿à¤® à¤•à¤¾à¤®à¥‡à¤‚à¤—"},{"value":"250","id":"à¤ªà¤¶à¥�à¤šà¤¿à¤® à¤¸à¤¿à¤¯à¤¾à¤‚à¤—"}]');
					else if(stateCode==97)
						data.records=JSON.parse('[{"value":"95","id":"à¤•à¥‡à¤‚à¤¦à¥�à¤°à¥€à¤¯ "},{"value":"93","id":"à¤ªà¥‚à¤°à¥�à¤µ"},{"value":"94","id":"à¤¨à¤ˆ à¤¦à¤¿à¤²à¥�à¤²à¥€"},{"value":"91","id":"à¤‰à¤¤à¥�à¤¤à¤° "},{"value":"92","id":"à¤ˆà¤¶à¤¾à¤¨ à¤•à¥‹à¤£"},{"value":"90","id":"à¤‰à¤¤à¥�à¤¤à¤° à¤ªà¤¶à¥�à¤šà¤¿à¤®"},{"value":"653","id":"à¤¶à¤¾à¤¹à¤¦à¤°à¤¾ "},{"value":"98","id":"à¤¦à¤•à¥�à¤·à¤¿à¤£"},{"value":"652","id":"à¤¦à¤•à¥�à¤·à¤¿à¤£ à¤ªà¥‚à¤°à¥�à¤µ"},{"value":"97","id":"à¤¦à¤•à¥�à¤·à¤¿à¤£ à¤ªà¤¶à¥�à¤šà¤¿à¤® "},{"value":"96","id":"à¤ªà¤¶à¥�à¤šà¤¿à¤®"}]');

						
			}
		$.each(data.records, function(index, item) { // Iterates through a collection
			$("#distList").append( // Append an object to the inside of the select box
			$("<option></option>").text(item.id).val(item.value));
		});
	});
}
function geolocate() {

}

function changeFont()
{
	$(".increaseFont,.decreaseFont").click(function(){
		  var type=  $(this).val();
		   var curFontSize = $('.data').css('font-size');
		   alert(curFontSize);
		   if(type=='increase'){
		    $('.data').css('font-size', parseInt(curFontSize)+1);
		    }
		   else{
		    $('.data').css('font-size', parseInt(curFontSize)-1);
		   }
		   alert($('.data').css('font-size'));

		     });	
}

// Contact Details
function fetchContacts()
{
	$.getJSON("/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=CONTACTLIST"+"&langg="+langg,		
	 function(data) {
		var count = data.count;
	
		if(count == 0) {
			$('#contacts').append("No contact details found");
		} else {
			for(i = 0; i < count; i++) {
				var title = "<h4>" + data.contact[i].title + "</h4>";
				var detail = "<p>" + data.contact[i].name + "</br>" + data.contact[i].addr + "</br>" + data.contact[i].phone + "<br/> " + data.contact[i].email + "</p>";
				var contacts = title + detail;
				$('#contacts').append(contacts);
			}
		}
	});
}
	

function fetchNotifications()
{	
	$.ajax({
	    url: "/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=FETCHNOTIFICATION&type=4"+"&lang="+lang,
	    contentType: "application/x-www-form-urlencoded;charset=utf-8",
	    success: function(data) {	
	    	//("fdfafaf");
	    	 $('#notifications').append(data);
	    	 $(".various").fancybox({
	 			
	 			maxWidth	: 800,
	 			maxHeight	: 600,
	 			fitToView	: false,
	 			width		: '70%',
	 			height		: '70%',
	 			autoSize	: false,
	 			closeClick	: false,
	 			openEffect	: 'none',
	 			closeEffect	: 'none',
	 			helpers: {
	 			    overlay: {
	 			      locked: false
	 			    }
	 			  }
	 		});// fancybox
	    }
	  });	
}

function getState(stateListType)
{
	
	 var newURL =  "/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETSTATELIST&statetype="+ stateListType+"&lang="+lang;
	  //manisha STH
	    ajaxParamBase64(newURL);
	    newURL = newURL + "&abfhttf="+document.getElementsByName(token_key)[0].value;
	
	$.getJSON(newURL,
			
			 function(data) {
		
		console.log(data);
		
		
		$.each(data, function(index, element) {
			$('#donorAddStateCode').append(new Option(element.label, element.value));
		});
	});
}
// commented By Ameya for STH old code
/*function setStockTable(url) {
	var table;
	if ($.fn.dataTable.isDataTable('#example-table')) {
		table = $('#example-table').dataTable();
		
		//var newUrl = url;
		 //manisha STH
		 	var newURL =  url;
		    ajaxParamBase64(newURL);
		    newURL = newURL + "&abfhttf="+document.getElementsByName(token_key)[0].value;
		
		table.fnReloadAjax(newURL);
	}

	else {
		 //manisha STH
		var newURL =  url;
	    ajaxParamBase64(newURL);
	    newURL = newURL + "&abfhttf="+document.getElementsByName(token_key)[0].value;
	
		table = $('#example-table').DataTable({
				
			"ajax" : newURL,
		
			"deferRender" : true,
			"fixedHeader" : true,
			"responsive" : true,
			"createdRow": function( row, data, dataIndex ) {			   
				if ( data[2] == "Govt." ) {
			    	$(row).css('background-color', GovtColor)
			    }			    
			  },
		 "columnDefs": [
		                 { "width": "40%", "targets": 1 }
		               ],
		
		});
		
	}
		
	return table;
}*/


// added By Ameya  for STH 
function setStockTable(url) {
    var table;

    if ($.fn.dataTable.isDataTable('#example-table')) {
        table = $('#example-table').dataTable();

        var newURL = url;
        ajaxParamBase64(newURL);
        newURL = newURL + "&abfhttf=" + document.getElementsByName(token_key)[0].value;

        // Use try-catch to handle errors during reload
        try {
            table.fnReloadAjax(newURL);
        } catch (error) {
            alert("Error reloading data: " + error);
        }
    } else {
        var newURL = url;
        ajaxParamBase64(newURL);
        newURL = newURL + "&abfhttf=" + document.getElementsByName(token_key)[0].value;

        table = $('#example-table').DataTable({
            "ajax": {
                "url": newURL,
                "dataType": 'json', // Set the expected data type
                "error": function (xhr, error, thrown) {
                    alert("This Activity Not Allowed.....!");
                }
            },
            "deferRender": true,
            "fixedHeader": true,
            "responsive": true,
            "createdRow": function (row, data, dataIndex) {
                if (data[2] == "Govt.") {
                    $(row).css('background-color', GovtColor);
                }
            },
            "columnDefs": [
                {"width": "40%", "targets": 1}
            ],
        });
    }

    return table;
}


	
