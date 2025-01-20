function validate()
{
	
	var user = document.getElementsByName("varUserName")[0].value ;
	var maxlength = 30;
	var passwordpw = document.getElementsByName("varPassword")[0].value;
	//alert(passwordpw);
	//alert('here');
	document.getElementById("divElementErrorsId").innerHTML = "";
	//var specialChars = "#,+,~,\`,=,\,,.,@,!,~,*,^,\`,&,$,(,),[,],{,},:,;,>,<,%,?,<,>,\",\'";
	if (document.getElementsByName("varUserName")[0].value == "" || document.getElementsByName("varPassword")[0].value == "")
	{
		document.getElementById("divElementErrorsId").innerHTML = "User Name / Password is empty!";
		return false;
	}
	if (!validateAlphaNumWithUnderscoreValue(document.getElementsByName("varUserName")[0].value))
		//	|| (!isValidAlphaNumericInput(document.getElementById("passwd").value, ""))) //specialChars ) ) )
	{
		document.getElementById("divElementErrorsId").innerHTML = "User Name should be Alphabnumeric with Underscore only...";
		//document.getElementById("divElementErrorsId").innerHTML = "User Name / Password is not an Alpha Numeric...";
		return false;
	}
	
	if(user.length>= maxlength || passwordpw.length > maxlength)
		{
		document.getElementById("divElementErrorsId").innerHTML = "User Name & Password is too long ";
		return false;
		}
	
	if(!securePassword())
	{
		document.getElementById("divElementErrorsId").innerHTML = "Faced Some Unknown Problem. Please try Again!";
		document.getElementsByName("varUserName")[0].value = "";
		document.getElementsByName("varPassword")[0].value = "";
		document.getElementsByName("varPassword1")[0].value = "";
		return false;
	}
	// Setting window.name property
	
	window.name = sessionToken;
	//alert(window.name);
	return true;
}

function securePassword()
{
	var hashValue = "";
	var hashValue1 = "";
	var varUserName1 = document.getElementsByName("varUserName")[0].value;
	//alert(varUserName);
	
	var objPassHash = new jsSHA(document.getElementsByName("varPassword")[0].value+document.getElementsByName("varUserName")[0].value, "ASCII");
	//---var objPassHash = new jsSHA(document.getElementsByName("varUserName")[0].value+document.getElementsByName("varUserName")[0].value, "ASCII");
	var objPassHash1 = new jsSHA(document.getElementsByName("varPassword")[0].value, "ASCII");
	
	//var obj= document.getElementsByName("varPassword")[0].value+"";
	//document.getElementsByName("varPassword2")[0].value =obj;
	// Added By Ameya for encryption of user Name 
	var varUserName =  ConvertStringToHex(encryptBase64(varUserName1)) ;
	//alert(varUserName);
	document.getElementsByName("varUserName")[0].value = varUserName;
	
	try 
	{
		hashValue = objPassHash.getHash("SHA-1", "HEX");
		
		hashValue1 = objPassHash1.getHash("SHA-1", "HEX");		
	//	alert(hashValue1);
	} 
	catch(e)
	{
		return false;
	}

	objPassHash = new jsSHA(hashValue + sessionToken, "ASCII");
	//objPassHash1 = new jsSHA(hashValue1 + sessionToken, "ASCII");
	try
	{
		hashValue = objPassHash.getHash("SHA-1", "HEX");
		//hashValue1 = objPassHash1.getHash("SHA-1", "HEX");
	}
	catch(e)
	{
		return false;
	}
// added by Rohit 
	 const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	  let result = '';
	  let result1 = '';

	  for (let i = 0; i < 8; i++) {
	    const randomIndex = Math.floor(Math.random() * characters.length);
	    result += characters.charAt(randomIndex);
	    //result1 += characters.charAt(randomIndex);
	    
	  }
	  const characters1 = 'erwtewritpoe#$%#$%fdgdfgd0123456789';
	  for (let i = 0; i < 8; i++) {
		    const randomIndex = Math.floor(Math.random() * characters1.length);
		   
		    result1 += characters.charAt(randomIndex);
		    
		  }
	  objPassHash = new jsSHA(result, "ASCII");
	  
	console.log("hashValue"+hashValue);
	console.log("hashValue1"+hashValue1);
	document.getElementsByName("varPassword")[0].value = hashValue;
	//alert('adas ' + hashValue);
	
	
	document.getElementsByName("varPassword1")[0].value = result1+hashValue1+result;
	document.getElementsByName("paricahaylogin")[0].value = 0;
	//alert(hashValue);
	//alert(hashValue1);
	
	return true;
}

function submitFormOnValidate(flg, actionURL)
{
	if(flg)
	{
		submitForm(actionURL);
	}
}

function submitForm(actionURL) 
{
	//document.forms[0].action = actionURL + ".action";
	
	//added BY ameya
	//var actionURL = sortandEncodebase64(actionURL);
	document.forms[0].action = actionURL;
	document.forms[0].submit();
}



/**
 * Purpose : To ensure to enter a Alphanumeric Value with Underscore Only
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed A-65, Z-90, a-97, z-122, Underscore - 95
*/
function validateAlphaNumWithUnderscoreOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==0 || 
		charCode==95 || 
		(charCode>=65 && charCode<=90) || 
		(charCode>=97 && charCode<=122) ||
		(charCode>=48 && charCode<=57) )
		return true;
	else
		return false;
}


/**
 * Purpose : To validate whether a given String is Alphanumeric having Underscore Only
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
*/
function validateAlphaNumWithUnderscoreValue(val)
{
	var pattern=/^[a-zA-Z0-9_]*$/;
	return pattern.test(val);
}

