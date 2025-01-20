function loadStateList() {


	$.getJSON("/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETSTATELIST", {
		
	}, function(data) {
		
	//	alert("ngsdga"+data[0].value + data[0].label);
		$('select[name="stateList"]').empty();
		$('select[name="stateList"]').append($("<option></option>").text('Select State').val(-1));
		$.each(data, function(index, item) { // Iterates through a collection
		//	console.log("hdfs"+item.label);
			//alert(item.label);
			$('select[name="stateList"]').append( // Append an object to the inside of the select box
			$("<option></option>").text(item.label).val(item.value));
		});
		
	});
}



function loadeAddressDistrictList(stateCode) {
	
	$.getJSON("/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETDISTRICTLIST", {
		selectedStateCode : stateCode
	}, function(data) {
		$('select[name="district"]').empty();
		$('select[name="district"]').append($("<option></option>").text('Select District').val(-1));
		$.each(data.records, function(index, item) { // Iterates through a collection
			//console.log(item.id);
			$('select[name="district"]').append( // Append an object to the inside of the select box
			$("<option></option>").text(item.id).val(item.value));
		});
		
	});
}


function loadBBList(distCode) {
	var stateCode = $('select[name="stateList"]').val();
	
	//alert(distCode);
	if(distCode==-2){
		$('select[name="bloodBank"]').val(-1);
		
		return;
	}
	//alert("stateateta"+stateCode);
	$.getJSON("/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETBBLIST", {
		selectedStateCode : stateCode
		,selectedDistrictCode : distCode
		,hospitalType : 1
	}, function(data) {
		$('select[name="bloodBank"]').empty();	
		$('select[name="bloodBank"]').append($("<option></option>").text('Select BloodBank').val(-1));
		
		if(data.records.length == 0){
			alert("No BloodBank Found for selection");
			return ;
		}
		$.each(data.records, function(index, item) { // Iterates through a collection
			//console.log(item.id);
			$('select[name="bloodBank"]').append( // Append an object to the inside of the select box
			$("<option></option>").text(item.id).val(item.value));
		});
		
	});
}



function getSetID(bbCode){
	
	var bbCode =bbCode;// $('select[name="bloodBank"]').val();
	
	$.getJSON("/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=GETROLELIST", {
		hospCode : bbCode
	},function(data) {
		//alert(data);
		//	alert("ngsdga"+data[0].value + data[0].label);
			$('select[name="seat"]').empty();
			$('select[name="seat"]').append($("<option></option>").text('Select seat').val(-1));
			$.each(data, function(index, item) { // Iterates through a collection
				//console.log("hdfs"+item.label);
				
				$('select[name="seat"]').append( // Append an object to the inside of the select box
				$("<option></option>").text(item.label).val(item.value));
			});
			
		});
	}

function saveRoleandPermission(){
	
	
	//action   Call savePrammanUserDetails
	
	var name = document.getElementsByName("prmaanusername")[0].value; // $("prmaanusername").val();
	var state = $('select[name="stateList"]').val();
	var district = $('select[name="district"]').val();
	var bbCode = $('select[name="bloodBank"]').val();
	var role = $('select[name="seat"]').val();
	var email = document.getElementsByName("email")[0].value;
	var mobile_no = document.getElementsByName("mobile")[0].value;
	var Password="Bld@123";
	//var ssoid = document.getElementsByName("ssoid")[0].value;

	 if (state=="-1") {
	        alert('Please select a state.');
	        return false;
	    }

	    // Check if district is empty or null
	    if (district=="-1") {
	        alert('Please select a district.');
	        return false;
	    }

	    // Check if bbCode is empty or null
	    if (bbCode=="-1") {
	        alert('Please select a blood bank.');
	        return false;
	    }

	    // Check if role is empty or null
	    if (role=="-1") {
	        alert('Please select a Role');
	        return false;
	    }
	
		console.log(name+state+district+bbCode+role+mobile_no);
	
//var newURL="/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=savePrammanUser_RoleDetails";
//$.ajax({
//url : newURL
//, type : 'POST'
//, data : {
//	name : name,
//   stateCode : state,
//   districtCode :district,
//   bbCode:bbCode,
//   role=role,
//   email:email,
//   mobile_no=mobile_no
//   
//	   
//	
//}
//,success : function (data){
//
//	}
//	
//});


		var hashPasswrd="";
		hashPasswrd=decodePasswword(Password,mobile_no);
		
		console.log(hashPasswrd);
	
	var newURL="/BLDAHIMS/bloodbank/portalLogin.cnt?hmode=savePrammanUser_RoleDetails";
	$.ajax({
	url : newURL
	, type : 'POST'
	, data : {
		name : name
	   ,stateCode : state
	   ,districtCode :district
	   ,bbCode:bbCode
	   ,role:role,
	   email:email
	   ,password:hashPasswrd
	   ,mobile_no:mobile_no,
	   ssoid:""
		   
		   
		   
		   
		   
		
	}
	,success : function (data){
		
//		Swal.fire({
//			 // title: "Good job!",
//			  text: "Your user request has been successfully submitted , you would be able to login after blood bank approval.",
//			  icon: "Success"
//			});
		//alert("Your user request has been successfully submitted , you would be able to login after blood bank approval.");
		
		Swal.fire({
			  text: "Your user request has been successfully submitted , you would be able to login after blood bank approval.",
			 // showDenyButton: true,
			 // showCancelButton: true,
			  confirmButtonText: "Ok",
			 // denyButtonText: `Don't save`
			}).then((result) => {
			  /* Read more about isConfirmed, isDenied below */
			  if (result.isConfirmed) {
				  closeModal();
			  } else if (result.isDenied) {
			   
			  }
			});
		
	
	}
	
	
	
});
	
	
}


function closeModal() {
	  document.getElementById("modal").style.display = "none";
	}


function decodePortalPasswword(passwword,username)
{
	//alert(passwword);
	//alert(username);
	
	var hashValue="";
	var objPassHash = new jsSHA(passwword, "ASCII");
	
		hashValue = objPassHash.getHash("SHA-1", "HEX");
       
	     return hashValue;
}

function decodePasswword(passwword,username)
{
	//alert(passwword);
	//alert(username);
	
	var hashValue="";
	var objPassHash = new jsSHA(passwword+username, "ASCII");
	
		hashValue = objPassHash.getHash("SHA-1", "HEX");
       
	     return hashValue;
}


//function GET_USERLIST(){
//	
//	
//	var newURL="/BLDAHIMS/bloodbank/ssoUserRequestApproval.cnt?hmode=GET_USER_APPROVAL_LIST";
//	$.getJSON("/BLDAHIMS/bloodbank/ssoUserRequestApproval.cnt?hmode=GET_USER_APPROVAL_LIST", {
//		
//	}, function(data) {
//		$.each(data, function(index, item) { // Iterates through a collection
//			
//			
//		
//			
//		});
//	});
	
//}











