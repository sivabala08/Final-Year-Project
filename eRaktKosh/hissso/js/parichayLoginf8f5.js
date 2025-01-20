function prmaanlogin(){
	console.log("prmaan");
	//var url = "/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=prmaanGetToken"; // Replace with the actual URL of your Struts action
	 var url = "/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=pramaanlogin";  
	 submitFormPramaan(url);
	 /* $.ajax({
	    url: url,
	  
	    success: function(response) {
	    	//alert(response);
	        // Handle the response from the server if needed
	    	window.location.href=response;
	    	
	    	
	        console.log(response);
	      },
//	      error: function(xhr, textStatus, errorThrown) {
//	        // Handle any error that occurs during the AJAX request
//	        console.log("Error: " + errorThrown);
//	      }
	    });
	  */
		 
	 
}



function parichayssoLogin() {
	
	
//Requierd Params	
const client_id_uat ="eraktkosh22aee534b72ca3008b7c18c";
const client_id ="eraktkosh72ca3022aee534b08b7c18c";
const code_challenge ="gS8th_h3nGOYxeeetVBueifFij_Qw6XxeWkk4VXYcyk";
//const redirect_uri = "https://uateraktkosh.dcservices.in/eRaktKosh/hissso/Login";
const redirect_uri = "https://eraktkosh.in/eRaktKosh/hissso/Login";
const response_type="code";
const scope="user_details";
const state="parichaylogin";
const code_challenge_method="S256";
  
//window.location.href = "https://parichay.staging.nic.in/pnv1/oauth2/authorize?response_type=code&client_id="+client_id+"&redirect_uri="+redirect_uri+"&scope="+scope+"&code_challenge="+code_challenge+"&code_challenge_method="+code_challenge_method+"&state="+state;
  						 // https://parichay.staging.nic.in/pnv1/oauth2/authorize?response_type=code&client_id=eraktkosh22aee534b72ca3008b7c18c&redirect_uri=https://uateraktkosh.dcservices.in/eRaktKosh/hissso/Login&scope=user_details&code_challenge=gS8th_h3nGOYxeeetVBueifFij_Qw6XxeWkk4VXYcyk4&code_challenge_method=S256&state=jhvjhvjsdf
  
//  				
var url = "/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=getParichayAuthcode";  

submitFormPramaan(url);


//  const redirect_url="https://parichay.staging.nic.in?code=123456789";
  //setCodewithtokenAPI(redirect_url);
}


//function to extract code and set code to token API 
function setCodewithtokenAPI(redirect_url) {
  //const returnUrl = window.location.href;
	const returnUrl=redirect_url;
  // Extract parameters from the return URL
  const parameters = getCode(returnUrl);
  const code = parameters.code;
  console.log("code"+code);
  //const token="eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImVyYWt0a29zaDIyYWVlNTM0YjcyY2EzMDA4YjdjMThjIiwiaWRfdG9rZW4iOiIiLCJiZWFyZXIiOiJUb2tlbiIsImFjY2Vzc1Rva2VuIjoiNDQ4YzdlNzEtNWRkMS00ZWRkLThmNjUtMzNkZDI5NjljY2M1IiwicmVmcmVzaFRva2VuIjoiZjIzODY0NTMtMGExNS00ZDM4LWE2NGEtMjVlMTc5NGM2NjE1IiwiaXNzIjoiSmFuUGFyaWNoYXkiLCJleHAiOjE2ODY3NDEyMDV9.3epZbRWN7dJF5m0lpQA38p-jZg1Fj7q-mRoHdufzIlg"
	
	
  if (code!="") {
    getToken(code).then(tokendetails=> {
    const responseObject = JSON.parse(tokendetails);

	//const accessToken = "";
    	const accessToken = responseObject.access_token;
//    	 access_token=JSON.stringify(responseObject.access_token);
        console.log("Token:",responseObject);
    	
 
   
        if (accessToken!="") {
        	console.log("Access Token "+accessToken);
          getUserDetails(accessToken)
            .then(userdetails => {  const userdetails1 = JSON.parse(userdetails);
              console.log("User details:", userdetails1);
              const data = new URLSearchParams(userdetails).toString();
              const tokenDetails=new URLSearchParams(tokendetails).toString();

              //Call save user detail function to save user and token Details...
              var newURL="/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=saveparichayDtl";
              $.ajax({
          		url : newURL
          		, type : 'POST'
          		, data : {
          			userdtl : userdetails
         		   ,tokendtl :tokendetails 
          			
          		}
          		,success : function (data){
          			data = jQuery.parseJSON(data);
        			userdata=data["userdetails"];
        			tokendata=data["tokendetails"];
        			
          			console.log("after login action..."+userdata["FirstName"]);
          			saveusermapping(userdata,tokendata);
          			
          		}
          		
          	});
             
            })
            .catch(error => {
              console.error("Failed to get user details:", error);
            });
        } else {
          console.error("Token is Empty");
        }
    });

  } else {
    console.error("Code parameter not found in the return URL");
  }
}
//function to fetch code from URL
function getCode(url) {
  const queryString = url.split("?")[1];
  const parameterPairs = queryString.split("&");
  const parameters = {};

  for (let pair of parameterPairs) {
    const [key, value] = pair.split("=");
    parameters[key] = decodeURIComponent(value);
  }

  return parameters;
}
//function to fetch token details from parichay
function getToken(code) {
// Params to call token API;	
	
		var client_id ="eraktkosh22aee534b72ca3008b7c18c";
		var client_secret ="a360f1d6686d49b7784b588b4849535d";
		var code_verifier ="jUTTD8O6I1wenXVLCjBIzZ_hEIOERFNRLmqbUYbPPHc";
		var grant_type ="authorization_code";
		var redirect_uri = "https://uateraktkosh.dcservices.in/eRaktKosh/hissso/Login";
		//var code=17847751571110753644121410065056;
		
	
	
	const tokenApiUrl = "https://parichay.staging.nic.in/pnv1/salt/api/oauth2/token";
	 const apiUrl = '${tokenApiUrl}';

	const requestBody = {
			  code: code,
			  client_id: client_id,
			  client_secret: client_id,
			  code_verifier:code_verifier,
			  grant_type:grant_type,
			  redirect_uri:redirect_uri
			  
			};

	const requestOptions = {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(requestBody),
			};
	 
	// const token="eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImVyYWt0a29zaDIyYWVlNTM0YjcyY2EzMDA4YjdjMThjIiwiaWRfdG9rZW4iOiIiLCJiZWFyZXIiOiJUb2tlbiIsImFjY2Vzc1Rva2VuIjoiNDQ4YzdlNzEtNWRkMS00ZWRkLThmNjUtMzNkZDI5NjljY2M1IiwicmVmcmVzaFRva2VuIjoiZjIzODY0NTMtMGExNS00ZDM4LWE2NGEtMjVlMTc5NGM2NjE1IiwiaXNzIjoiSmFuUGFyaWNoYXkiLCJleHAiOjE2ODY3NDEyMDV9.3epZbRWN7dJF5m0lpQA38p-jZg1Fj7q-mRoHdufzIlg"

console.log("inside fetch Token" +requestBody);
	return fetch(apiUrl, requestOptions)
	  .then(response => JSON.stringify(
			  {"access_token":"eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImVyYWt0a29zaDIyYWVlNTM0YjcyY2EzMDA4YjdjMThjIiwiaWRfdG9rZW4iOiIiLCJiZWFyZXIiOiJUb2tlbiIsImFjY2Vzc1Rva2VuIjoiNDQ4YzdlNzEtNWRkMS00ZWRkLThmNjUtMzNkZDI5NjljY2M1IiwicmVmcmVzaFRva2VuIjoiZjIzODY0NTMtMGExNS00ZDM4LWE2NGEtMjVlMTc5NGM2NjE1IiwiaXNzIjoiSmFuUGFyaWNoYXkiLCJleHAiOjE2ODY3NDEyMDV9.3epZbRWN7dJF5m0lpQA38p-jZg1Fj7q-mRoHdufzIlg","refresh_token":"eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImVyYWt0a29zaDIyYWVlNTM0YjcyY2EzMDA4YjdjMThjIiwiaWRfdG9rZW4iOiIiLCJiZWFyZXIiOiJUb2tlbiIsImFjY2Vzc1Rva2VuIjoiNDQ4YzdlNzEtNWRkMS00ZWRkLThmNjUtMzNkZDI5NjljY2M1IiwicmVmcmVzaFRva2VuIjoiZjIzODY0NTMtMGExNS00ZDM4LWE2NGEtMjVlMTc5NGM2NjE1IiwiaXNzIjoiSmFuUGFyaWNoYXkiLCJleHAiOjE2ODcyNTk2MDV9.21K5b-5v7h6nRGcHiJwiH-18QHa5ZWaEwp5COYly4vI","id_token":"","created_at":"","token_type":"bearer","expires_in":604800000}  )
	
	  )  //response.text()
	  .catch(error => {
	    throw new Error("Failed to fetch token: " + error);
	  });

	
	
}



//function to get user details from parichay...
function getUserDetails(token) {
	  const userDetailsApiUrl = 'https://parichay.staging.nic.in/pnv1/salt/api/oauth2/userdetails';
	  const apiUrl = '${userDetailsApiUrl}';

	  const headers = {
	    'Authorization': 'Bearer ${token}',
	     'mode': 'cors' 
	  };

	  return fetch(apiUrl, { headers })
	    .then(response => JSON.stringify({"FirstName":"Ashish","LastName": "Mishra",	"Gender" : "Male","MobileNo":"9582270626"
	    	}))
	  
    .catch(error => {
	      throw new Error('Failed to fetch user details: ' + error);
	    });
	  
	  
	  	}



//to fetch eraktkosh username and passowrd of parichay user..

function saveusermapping(userdata,tokendata){

	console.log("Calling Maping function...");
	console.log("userdata"+userdata["FirstName"]);
	console.log("userdata"+userdata["LastName"]);
	
	
	console.log("tokendata"+tokendata["access_token"]);
	
	
	   var newURL="/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=fetchparichyUserDtl";
       $.ajax({
   		url : newURL
   		, type : 'POST'
   		, data : {
   			userdtl : userdata["FirstName"]
  		   ,pwd :userdata["LastName"] 
   			
   		}
   		,success : function (data){
   			console.log("after succes action..."+data);
   			data = jQuery.parseJSON(data);
			username=data["username"];
			pwd=data["password"];
			
			console.log(username);
			if(username!=null){
				submitFormOnValidatepramaan(validate(username,pwd),'loginLogin');
	   				
				
			}
			else{
				
				alert("User not Found...");
			}
			
   		}
   		
   	});
   	
}
   	
   	//calling this function after fetching data {e-raktkosh username and pwd for parichay user}
       
       function submitFormOnValidatepramaan(flg, actionURL,username,pwd)
       {
    	   console.log("inside submit form validate..");
    	   console.log(flg);
    	  //flg=true;
   		var varUserName1 = document.getElementsByName("varUserName")[0].value;
		var varUserName =  ConvertStringToHex(encryptBase64(varUserName1)) ;
		document.getElementsByName("varUserName")[0].value = varUserName;
			
    	   
       	if(flg)
       	{
       		
       		 		submitFormPramaan(actionURL);
       	}
       }
       
       
       
       
	 function submitFormPramaan(actionURL)
       {

       	document.forms[0].action = actionURL;
       	document.forms[0].submit();
       }

       
       
      //validate user details.. 
       
       function validatepramaan(username,pwd)
       {
    	   
  //for STH 
//    	   alert(username);
//    	   alert(pwd);
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
    	   
      	 	document.getElementsByName("varUserName")[0].value =username;
 		//	document.getElementsById("varUserName")[0].value =username;
			
 		  document.getElementsByName("varPassword")[0].value =pwd;
			//document.getElementsByName("varPassword")[0].value = "";
			//document.getElementsByName("varPassword1")[0].value = pwd;
			
			document.getElementsByName("varPassword1")[0].value=result+pwd+result1;
			
		
			document.getElementsByName("paricahaylogin")[0].value = 1;
			
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
    		
    		if(!securePassword1())
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

    	function securePassword1()
    	{
//    		var hashValue = "";
//    		var hashValue1 = "";
//    		
//    		var objPassHash = new jsSHA(document.getElementsByName("varPassword")[0].value+document.getElementsByName("varUserName")[0].value, "ASCII");
//    		//---var objPassHash = new jsSHA(document.getElementsByName("varUserName")[0].value+document.getElementsByName("varUserName")[0].value, "ASCII");
//    		var objPassHash1 = new jsSHA(document.getElementsByName("varPassword")[0].value, "ASCII");
//    		
//    		//var obj= document.getElementsByName("varPassword")[0].value+"";
//    		//document.getElementsByName("varPassword2")[0].value =obj;
//    		try 
//    		{
//    			hashValue = objPassHash.getHash("SHA-1", "HEX");
//    			
//    			hashValue1 = objPassHash1.getHash("SHA-1", "HEX");		
//    		//	alert(hashValue1);
//    		} 
//    		catch(e)
//    		{
//    			return false;
//    		}
//
//    		objPassHash = new jsSHA(hashValue + sessionToken, "ASCII");
//    		try
//    		{
//    			hashValue = objPassHash.getHash("SHA-1", "HEX");
//    		}
//    		catch(e)
//    		{
//    			return false;
//    		}
//
//    		console.log("hashValue"+hashValue);
//    		console.log("hashValue1"+hashValue1);
//    		document.getElementsByName("varPassword")[0].value = hashValue;
//    		//alert('adas ' + hashValue);
//    		document.getElementsByName("varPassword1")[0].value = hashValue1;
//    		
    		
    		return true;
    		
    		
    	}

    
	
