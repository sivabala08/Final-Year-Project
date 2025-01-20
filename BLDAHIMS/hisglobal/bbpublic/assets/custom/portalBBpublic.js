

 function validateEmail(email){
	  var valid=true;
      //var email=document.getElementsByName("campEmail")[0].value;
      //alert(email.length)
      if(email.length>0){
    	  //alert(document.getElementsByName("emailId")[0].value);
            var s=email.split("@");
            var index=email.indexOf("@");
            if(s.length!=2){
                  valid=false;
            }
            else{
          	 // alert((email.length)); alert((email.lastIndexOf(".")));
                  //alert(email.lastIndexOf(".")- email.indexOf(".",index))
                  //alert(email.length - email.lastIndexOf("."))
          	  if(s[1].split(".").length>1){
                    if((email.length - email.lastIndexOf("."))>2){
                          valid=true;
                    }
                    else{
                          valid=false;
                    }
              }
                  
                  if((email.indexOf(".",index)- index)==1){
                        valid=false;
                  }
            }

      }
      if(!valid){
            alert("Please Enter Valid Email")
           // document.getElementsByName("campEmail")[0].focus();
      }     

      return valid;
}
 


function validateNumeric(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) )
	   return true;

	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}//end of numericOnly

/*AddedBy Neha Rajgariya Date:19May2016*/
/*numeric with dots*/
function validateNumericwithDot(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) )
	   return true;

	// numbers
	else if ((("0123456789.").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}//end of numericWithDot

//only alpha
function validateAlphaOnly(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==32))
	   return true;
	

	// alphas 
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
		   
	 
	   
	   
	else
	   return false;
}//end of only alpha

//alpha with dots and space
function validateAlphaOnlyWithDotAndSpace(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==188) || (key==32) )
	   return true;
	
	
	// alphas 
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ. ").indexOf(keychar) > -1))
	   return true;
		   
	 
	   
	   
	   
	else
	   return false;
}// end of alpha with dots and space 


//aplha numeric with dots
function validateAlphaNumericWithDotsOnly(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==32)|| (key==47) || (key==45) )
	   return true;
	
	


	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789.,").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}// end alpha numeric with dots

//alpha numeric with dots and spaces
function validateAlphaNumericWithDotsAndSpaces(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==32)|| (key==47) || (key==45) )
	   return true;
	

	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789. ").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}//end alpha numeric with dots and spaces



//numeric with comma
function validateNumericWithComma(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==44) )
	   return true;

	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}//end of numericOnly



function validateAlphaNumeric(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
			(key==9) || (key==13) || (key==27) || (key==32)|| (key==47) || (key==45))
		   return true;
	

	// alphas and numeric
	if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}// end alpha numeric




