
/*=========================================end of file===============================================*/



var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function encryptBase64(val){
	var encodedString  = Base64.encode(val);
	return encodedString ;
}

function decryptBase64(encodedString){
	var decodedString = Base64.decode(encodedString);
	return decodedString;
}

var token_key = "abfhttf";
/*
var createFHash = function(){
	
	var datastring = $(':input').serializeArray()
	$('#'+token_key).val(getHexaCode(datastring));
	console.log("abfhttf :: "+document.getElementsByName(token_key)[0].value);		
};*/
function removeobjectfromjson(){
	var  bypassObject=["org.apache.struts.taglib.html.TOKEN"];
}
function sortandEncodebase64(forrmobj){
	$('#'+token_key).val("");
	var datastring = $(':input').serializeArray();
	if(forrmobj!=null){
		//	alert("form is not null");
		datastring=$(forrmobj).serializeArray();
	}
	
	datastring.sort(function(a, b){
        var a1= a.name.toLowerCase(), b1= b.name.toLowerCase();
        if(a1== b1) return 0;
        return a1> b1? 1: -1;
    });
	//alert($('[name='+token_key+']').length);
	//alert(JSON.stringify(datastring));

		
		var hexnum = ConvertStringToHex(encryptBase64(JSON.stringify(datastring)));
		var hexnumd = hex_to_ascii(hexnum);
		//alert(decryptBase64(hexnumd));
		//alert("hexnum::"+hexnum);
	  //  hexnum = hex_to_ascii(hexnum);
      //alert("hexnumup::"+hexnum);
      // alert(decryptBase64(hexnum));
	
		$('#'+token_key).val(ConvertStringToHex(encryptBase64(JSON.stringify(datastring))));
	//console.log("abfhttf :: "+document.getElementsByName(token_key)[0].value);
	//alert("abfhttf :: "+document.getElementsByName(token_key)[0].value);
	//alert(document.getElementsByName(token_key)[0].value);
	//return JSON.stringify(datastring);
}
function ajaxParamBase64(str)
{
console.log("str :::: "+str);	
var newjson=[];
var n = str.includes("?");
//alert(n);
if(n== true || n=="true")
str = str.split('?')[1];		
	
var outputArray = new Array();		
var strVals = str.split("&");		
for(var i=0; i< strVals.length; i++)
{			
var newVals = strVals[i].split("=");
var obj = {name:""+newVals[0] , value:""+newVals[1]} ;
newjson[i] = obj;		
}	
	
// added by Ameya STH Stage 3 
var hmodeValue = null; // Declare variable to store hmode value

for (var i = 0; i < newjson.length; i++) {
if (newjson[i].name === "hmode") {
hmodeValue = newjson[i].value; // Store the hmode value
break;
}
}
var filteredParams = newjson.filter(function(param) {
return param.name !== "hmode";
});
var hexnum = encodeURI(ConvertStringToHex(encryptBase64(JSON.stringify(filteredParams))));

var hexnumd = hex_to_ascii(hexnum);
//alert(decryptBase64(hexnumd));
//alert("hexnumr::"+hexnum);
// hexnum = hex_to_ascii(hexnum);
// alert("hexnumupr::"+hexnum);
//  alert(decryptBase64(hexnum));
	
$('#'+token_key).val("");
$('#'+token_key).val(hexnum);
//console.log("abfhttf :: "+document.getElementsByName(token_key)[0].value);
//alert("abfhttf :: "+document.getElementsByName(token_key)[0].value);
//alert(document.getElementsByName(token_key)[0].value);
//return JSON.stringify(datastring);
}
/*
function reconfigureAjaxParameterandEncodebase64(json){
	$('#'+token_key).val("");
	var newjson=[];
	
	$.each(json, function(key, value) {
		if(value  instanceof Array){
			for(var i=0;i<value.length;i++){
				newjson.push({"name":key,"value":value[i]});
			}
		}
		else{
			newjson.push({"name":key,"value":value});
		}		
		
	});
	//alert(JSON.stringify(newjson));
	datastring.sort(function(a, b){
        var a1= a.name.toLowerCase(), b1= b.name.toLowerCase();
        if(a1== b1) return 0;
        return a1> b1? 1: -1;
    });
	$('#'+token_key).val(encryptBase64(JSON.stringify(newjson)));
	console.log("abfhttf :: "+document.getElementsByName(token_key)[0].value);
	//return JSON.stringify(datastring);
}

*/

    
try{
$(document).ready(function() {
$("form").attr('autocomplete', 'off');
$("input[name='org.apache.struts.taglib.html.TOKEN']").attr("name", "");
//alert(document.getElementById(token_key));
//if(document.getElementById(token_key)==undefined || document.getElementById(token_key)==null){
if($('#'+token_key).length==0){
$('<input>').attr({
type: 'hidden',
id: token_key,
name: token_key
}).appendTo('form');
}
	 
(function(){
		  
var originalSubmit = document.forms[0].submit;
		 
document.forms[0].submit = function(){
// alert("here");
sortandEncodebase64();
//createFHash();			  
// Call the original submit() function to actually submit the form
// Per Aria's suggestion below keeping the "this" binding consistent
originalSubmit.apply(document.forms[0]);

return false;
};
		 
})();
	//}	
});
}catch(e)
{
	alert("Error Message -> "+e.message);
}

function showAjaxError(_errorthrown)
{
//alert(_funcName +": "+_errorMsg+" textstatus::"+_textstatus+" errorthrown::"+_errorthrown);	
window.location = "/HISRegistration/hissso/jsp/error/sso_error_login_illegalactivity.jsp";
		
}


/*for disabling right click*/
/*var ie = document.all;
var nn6 = document.getElementById &&! document.all;
if(ie)
{
    document.attachEvent('oncontextmenu',blockRightClickHandler);      
}
else
{
    //document.oncontextmenu=blockRightClickHandler;
    window.focus();
}*/

/*function blockRightClickHandler(e) {
   e.preventDefault();
   alert("Right Click Disabled !");
} */

/*Content added for file uplaod file content change vulnerability  start */

/*
$my_jQuery(document)
.on(
		'change',
		':file',
		function() {
			
			alert("in File Change" );
			
			var input = $(this), numFiles = input
					.get(0).files ? input.get(0).files.length
					: 1, label = input.val()
					.replace(/\\/g, '/').replace(
							/.*\//, '');
					
				
			input.trigger('fileselect', [ numFiles, label ]);

			var f = $(this).get(0).files[0];
			
			readSingleFile(f , input.attr("id"));
		});


function readSingleFile(f , id) {
	  //Retrieve the first (and only!) File from the FileList object
	 
//	alert("inside read single file ");

	  if (f) {
	    var r = new FileReader();
	    r.onload = function(e) { 
	    	  var contents = e.target.result;
		    //  var base64Contents=Base64.encode(contents);
	    	  
	    	 contents = contents.split(',')[1];
	    	  
	    	 
	    	 console.log("contents >> "+contents);
	    	 
	    	 var  encodedFileContent = hex_md5(contents);
	    	 
	    	 console.log("encodedFileContent >> "+encodedFileContent);
	     
	    	 document.getElementById("hash_file_"+id).value = encodedFileContent;
	    	 
	    //	  $( "<input type='hidden' name='f_codes' class='f_codes' id='f_codes"+id+"' value='"+encodedFileContent+"' />" ).insertAfter( "#fhttf" );
	    	  
	   	  alert("file_codes created for  >> "+encodedFileContent);
	    	  
		}
	    r.readAsDataURL(f);
	    
	  } else { 
	    alert("Failed to load file");
	  }
	}

*/
/*Content added for file uplaod file content change vulnerability end */
function ConvertStringToHex(str) {
var arr = [];
for (var i = 0; i < str.length; i++) {
arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
}
return "\\u" + arr.join("\\u");
}
function hex_to_ascii(str1)
 {
var hex  = str1.toString();
var str = '';
for (var n = 0; n < hex.length; n += 2) {
str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
}
return str;
}
// added By Ameya for sth stage 5
$(document).ready(function() {
    $("body").on("contextmenu", function(e) {
        return false;
      });
  });




//added by Ps to generate hash key
function gen_hkey(data)
{
var hashValue = "", objOTPHash="";
objOTPHash = new jsSHA('SHA-512', 'TEXT',1);
objOTPHash.update(data, "ASCII");
hashValue = objOTPHash.getHash("HEX");
return hashValue;
}

function match_bypass_resp_key(resp_data, key, text2)
{
try{
var responses = JSON.parse(resp_data);
var resp_key = responses.resp_key;
	
var hashValue = "", objOTPHash="";
objOTPHash = new jsSHA('SHA-512', 'TEXT',1);
objOTPHash.update(key+text2, "ASCII");
hashValue = objOTPHash.getHash("HEX");
	
	//alert("hashValue "+hashValue);
//	alert("resp_key "+resp_key);

if(hashValue==resp_key)
return true;
else
return false;
}catch(e)
{
swal("Illigal Acitivity Not Allowed !!");
}
}

//Ended
