
var transactionID;
var crno;
var patNdhmHealthId
var hospitalcode;
var isverified;
var isconsentLinkId;
var isKyc;
var tmpData = [];
var reportfile = {};
var tmpDatareportfile = {};
var flag = 0;
var OpdRecord = 0;
var IpdRecord = 0;
var viewtype = "RX";
//added by nilesh
var defaultconsentvar = 0;
var txId;
var AdahrotptxId;
var Token;
var mobileNo;
var flag;
var checkedArr;
// end

function openLinkagePopup() {

	var url = '/BLDAHIMS/bloodbank/portalAbhaID.cnt?age=' + 21;
	$("#myLinkage_portal").find('iframe').attr('src', url);
	$("#btLinkPortalID").trigger('click');

	var url = '/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=UPDATEDONORIMAGE'
}

function openLinkage() {

	var url = '/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=ABHALINK'
	$("#myLinkage_portal").find('iframe').attr('src', url);
	$("#btLinkPortalID").trigger('click');
  var url = '/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=UPDATEDONORIMAGE'

}

function closeLinkagePopup() {
	location.reload();
	console.log("aaabbbbbbbbbbbb");
	//    alert("nil");
}

function ShowHideDiv(name) {
	console.log("called radio")

	$('#patienthealth').removeClass("data-none");
	document.getElementById("lblAllConsent").style.display = "block";

	if (name == "LinkABHA") {
		console.log("Choice: ", name);

		$('#BoxpatNdhmHealthId').removeClass("data-none");
		$('#btnverify').removeClass("data-none");
		$('#VERIFYHEALTHID').removeClass("data-none");
		$('#create1').addClass("data-none");
		$('#divVERIFYDATA').addClass("data-none");
		$('#btnMobileOTP').addClass("data-none");
		//BoxpatNdhmHealthId
		//btnverify
		document.getElementById("btnverify").style.display = "flex";

		document.getElementById("VERIFYHEALTHID").style.display = "block";
		document.getElementById("BoxpatNdhmHealthId").style.display = "block";
		//document.getElementById("btnverify").style.display = "block";
		//document.getElementById("CreateABHA").disabled = true;
		document.getElementById("lblverifyOtp").style.display = "none";
		document.getElementById("HIDMOBILEOTP").style.display = "none";
		document.getElementById("VerifyOTPLbl").style.display = "none";
		document.getElementById("LblAadharNo").style.display = "none";
		document.getElementById("AadaharNoOTP").style.display = "none";
		//alert("aaa");

	} else if (name == "CreateABHA") {

		console.log("Choice: ", name);
		$('#divVERIFYDATA').removeClass("data-none");
		$('#btnMobileOTP').removeClass("data-none");
		$('#create1').addClass("data-none");
		$('#BoxpatNdhmHealthId').addClass("data-none");
		$('#btnverify').addClass("data-none");
		document.getElementById("BoxpatNdhmHealthId").style.display = "none";
		//document.getElementById("btnverify").style.display = "none";
		//  document.getElementById("btnverify").style.display = "none";
		document.getElementById("btnverify").style.display = "none";
		$('#VERIFYDATA').addClass("data-none");
		$('#VERIFYDATABTN').addClass("data-none");
		$('#VERIFYCHECK').addClass("data-none");
		$('#VERIMAGE').addClass("data-none");
		//  VERIMAGE
		// lblverifyOtp
		document.getElementById("lblverifyOtp").style.display = "block";
		$("#divVERIFYDATA").show();
		$("#btnMobileOTP").show();
		// document.getElementById("divVERIFYDATA").style.display = "block";
		// document.getElementById("btnMobileOTP").style.display = "block";
		document.getElementById("LinkABHA").disabled = true;
		document.getElementById("VERIFYHEALTHID").style.display = "none";
	}
}
function validateNumeric(e) {
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
	if ((key == null) || (key == 0) || (key == 8) ||
		(key == 9) || (key == 13) || (key == 27))
		return true;

	if (key == 13)
		return submit();

	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
		return true;
	else
		return false;
}


function submit() {
	ClearDivheatlh();
	crno = document.getElementsByName('crno')[0].value;
	hospitalcode = crno.slice(0, 5);
	//----added by nilesh to clear healthid feild  
	document.getElementById("patNdhmHealthId").value = "";
	//--------end-------------
	if (crno.length < 12) {
		alert("Crno cannot be less than 12 digits.");
	}
	else {
		//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		//	var div = '<div class="blocks" id="preloadering"></div>'

		//document.getElementById("content_wrapper").appendChild(div)
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');

		$.ajax({

			type: "POST",
			async: "true",
			url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=SEARCH&crNo=" + crno + '&hospitalCode=' + hospitalcode + '&searchType=' + "1"),
			success: function(response) {
				$("#preloader").remove();
				var a = JSON.parse(response)
				console.log(a);
				//var a = response
				var patient_detail = a.patDetails[0];
				patient_name = patient_detail.patientName;
				patient_age = patient_detail.patAge;
				patient_gender = patient_detail.patGender;
				patient_dob = patient_detail.patDOB;
				patient_mobile_no = patient_detail.patMobileNo;
				//Added by Nilesh, dated 29-11-2021 to set value of mobile no at pop up
				$("#pateintMobNo").val(patient_detail.patMobileNo);
				patient_address = patient_detail.patAddress;
				patient_category = patient_detail.patCategory;
				patient_status = patient_detail.patStatus;
				patient_crnumber = patient_detail.patHospitalHealthId;
				patient_health_id = patient_detail.patNdhmHealthId;
				patient_health_no = patient_detail.patNdhmHealthCode;
				patient_guardian = patient_detail.patGuardianName;


				document.getElementById("patientname").innerHTML = patient_name + '<h12 style="float:right">CR No: <h13 id="patient_crnumber"></h13></h12>';
				document.getElementById("patientfullname").innerHTML = patient_detail.patientName;
				document.getElementById("patientfname").innerHTML = patient_detail.patFirstName;
				document.getElementById("patientmname").innerHTML = patient_detail.patMiddleName;
				document.getElementById("patientlname").innerHTML = patient_detail.patLastName;

				document.getElementById("patientage").innerHTML = patient_age;
				document.getElementById("patient_gender").innerHTML = patient_gender;
				document.getElementById("patient_dob").innerHTML = patient_dob;
				document.getElementById("patient_mobile_no").innerHTML = patient_mobile_no;
				document.getElementById("patient_crnumber").innerHTML = patient_crnumber;
				var ConsentNdhmHealthId = patient_health_id.split("@")[0];
				patndhmdob = patient_dob.split("-")[2];
				var age = patient_age.split(" ")[0];
				document.getElementById("patConsentNdhmHealthId").value = ConsentNdhmHealthId;
				if (patient_address == "") {
					document.getElementById("patient_address").innerHTML = "N.A.";
				}
				else {
					document.getElementById("patient_address").innerHTML = patient_address;
				}

				if (patient_mobile_no == "") {

					swal("Mobile related transactions will not be proceed as Mobile_NO is missing ")

				}


				document.getElementById("patient_category").innerHTML = patient_category;
				if (patient_guardian == "") {
					document.getElementById("patient_guardian").innerHTML = "N.A.";
				}
				else {
					document.getElementById("patient_guardian").innerHTML = patient_guardian;
				}
				if (patient_health_id == "") {


					document.getElementById("patient_health_id").innerHTML = "N.A.";
					//  added by nilesh	
					$('#create1').removeClass("data-none");
					document.getElementById("divVERIFYDATA").style.display = "block";
					document.getElementById("LbldisplayABHACreation").style.display = "block";
					document.getElementById("LbldisplayABHANO").style.display = "none";


					document.getElementById("btnMobileOTP").style.display = "block";
					editpatHealthid();
					//end 
				}
				else {
					//  added by nilesh
					document.getElementById("patient_health_id").innerHTML = patient_health_id;
					document.getElementById("LbldisplayABHANO").style.display = "block";
					document.getElementById("LbldisplayABHACreation").style.display = "none";

				}

				if (patient_health_no == "") {
					document.getElementById("patient_health_no").innerHTML = "N.A.";
				}
				else {
					document.getElementById("patient_health_no").innerHTML = patient_health_no;
				}
				document.getElementById("patient_status").innerHTML = patient_status;
				if (patient_gender == "Male") {

					if (age < 12) {
						document.getElementById("patDetails-icon-p").innerHTML = '<i class="mdi mdi-baby" id="patDetails-icon-m" style="color: #007BFF; font-size: 40px;"></i>';
					}
					else {
						document.getElementById("patDetails-icon-p").innerHTML = '<i class="mdi mdi-human-male" id="patDetails-icon-m" style="color: #007BFF; font-size: 40px;"></i>';
					}
				}
				else if (patient_gender == "Female") {
					if (age < 12) {
						document.getElementById("patDetails-icon-p").innerHTML = '<i class="mdi mdi-baby" id="patDetails-icon-m" style="color: #E83E8C; font-size: 40px;"></i>';
					}
					else {
						document.getElementById("patDetails-icon-p").innerHTML = '<i class="mdi mdi-human-female" id="patDetails-icon-m" style="color: #E83E8C;; font-size: 40px;"></i>';

					}

				}
				else {
					document.getElementById("patDetails-icon-p").innerHTML = '<span class="patientDetail" id="patDetails-icon-t"><img height="35" width="35" src="assets/images/dashboard/transgender.svg"></span>';
				}
				if (patient_status == "Emergency OPD") {
					document.getElementById("patDetails-icon-status").innerHTML = '<span class="patStatusSpan emgcOpdSpan">EMERGENCY OPD</span>';
				}
				else if (patient_status == "SPECIAL OPD") {
					document.getElementById("patDetails-icon-status").innerHTML = '<span class="patStatusSpan spclOpdSpan ">SPECIAL OPD</span>';
				}
				else {
					document.getElementById("patDetails-icon-status").innerHTML = '<span class="patStatusSpan opdSpan" >' + patient_status + '</span>';
				}

				//  added by nilesh
				document.getElementById("lblAllConsent").style.display = "block";
				//end

				$("#PATIENTDETAIL").removeClass("data-none");
				$('#patienthealth').removeClass("data-none");
				$('#CONSENTDIV').removeClass("data-none");
				$('#CONSENTDATA').addClass("data-none");
				$('#ERRORMESSAGEOTP').addClass("data-none");
				$('#ERRORMESSAGE').addClass("data-none");
				$('#ERRORMESSAGEDEMO').addClass("data-none");
				$('#NHDMHEALTHDETAIL').addClass("data-none")
				$('#MOBILEOTP').addClass("data-none");
				$('#fhir_display').addClass("data-none");
				$('#episodeCount').removeClass("data-none");
				//geturldetails();
				viewLinkedEpisodeList();
				if (patient_health_id == "" || patient_health_id == null || patient_health_id == "-") {
					//document.getElementById("patNdhmHealthId").readOnly = false;
					$('#AUTHMODE').addClass("data-none");
					$('#VERIFYHEALTHID').removeClass("data-none");


				}
				else {
					document.getElementById("patNdhmHealthId").value = patient_health_id;
					document.getElementById("patNdhmHealthId").readOnly = true;
					$('#AUTHMODE').removeClass("data-none");
					$('#VERIFYHEALTHID').addClass("data-none");
					verifyhealthid();

				}
				if (a.isSuccess == "0") {
					console.log("everything is fine till this point");
					swal("Oops", a.error || a.Error.message, "error", {
						button: "OK",
					});
				}

			},
			error: function(e) {
				$("#preloader").remove();
				alert('Error: ' + e);
			}


		});
	}
}

/*$(function() {
	$("#SEARCHID").on('show.bs.collapse hidden.bs.collapse', function() {
		$("#AddDId").find('.mdi').toggleClass('mdi-arrow-up-bold-circle mdi-arrow-down-bold-circle');
	});
});*/


function getOTP() {
	//		added by Nilesh
	flag = document.getElementsByName("patCrNo")[0].value;
	//alert("flag" + flag);
	if (checkConsent() === false) {
		return false;
	}
	// alert("aaaaaaa"+ndhmHealthIDCode);
	//	alert("nnnnnnnnnnnnn"+ndhmHealthID);
	//end
	$('#lblAbhaDetailsfetchDiv').addClass("data-none");
	$('#VERIFYONLY').addClass("data-none");
	patNdhmHealthId = document.getElementsByName("patNdhmHealthId")[0].value;
	hospitalcode = "212121";//crno.slice(0,5);
	if (document.getElementById("iskyc").checked == true) {
		isKyc = "1";
		$('#linkageconsent').addClass("data-none");
	}
	else {
		isKyc = "0";
	}
	console.log(isKyc + "-------" + isverified)
	authenticationMode = document.getElementsByName("verifydata")[0].value;
	if (document.getElementsByName("patNdhmHealthId")[0].value == "") {
		alert("Please Enter Health Id");
	}
	else {
		//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
		$.ajax({
			aysnc: true,
			url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=DETAIL&patNdhmHealthId=" + ndhmHealthID + '&hospitalcode=' + hospitalcode + '&authenticationMode=' + authenticationMode + "&patHospitalHealthId=" + crno + "&ndhmHealthIDCode=" + ndhmHealthIDCode + '&isKyc=' + isKyc + '&isVerified=' + isverified + '&flag=' + flag),

			success: function(response) {
				$("#preloader").remove();
				var responses = JSON.parse(response);
				console.log(responses)
				if (responses.status == "1") {

					transactionID = responses.transactionId;
					document.getElementById("patNdhmHealthId").readOnly = true;
					if (authenticationMode == "DEMOGRAPHICS") {
						$('#MOBILEOTP').addClass("data-none");
						getHealthDetail();
					}
					else if (authenticationMode != "DEMOGRAPHICS") {
						$('#MOBILEOTP').removeClass("data-none");

					}
				}
				else {
					$("#preloader").remove();
					$('#ERRORMESSAGE').removeClass("data-none");
					if (responses.isSuccess == "0") {
						console.log("everything is fine till this point");
						swal("Oops", responses.error || responses.Error.message, "error", {
							button: "OK",
						});
					}
				}
			},
			error: function(e) {
				$("#preloader").remove();
				alert('Error: ' + e);
			}
		});
	}

}

function getHealthDetail() {
	//		added by Nilesh

	flag = document.getElementsByName("patCrNo")[0].value;
	alert("flag" + flag);
	if (checkConsent() === false) {
		return false;
	}

	//  alert("aaaaaaa"+ndhmHealthIDCode);
	//alert("nnnnnnnnnnnnn"+ndhmHealthID);
	//end		
	var otp = document.getElementsByName("mobileOtp")[0].value;
	if (authenticationMode == "MOBILE_OTP" && document.getElementsByName("mobileOtp")[0].value == "") {
		alert("Please Enter OTP");
	}

	else {
		//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
		hospitalcode = "212121";
		var url1;

		//	var patient_name_final =document.getElementById("patientname");

		console.log("patient_name_final" + patient_name_final + "demo_patient_gender" + demo_patient_gender + "patient_dob" + patient_dob + "patient_address" + patient_address);
		//patient_name;  patientname//.substring(0, patient_name.indexOf(" "));
		//alert(patient_name_final);
		if (authenticationMode == "DEMOGRAPHICS") {

			var patient_name_final = document.getElementById("patientFirstName").innerHTML + " " + document.getElementById("patientLastName").innerHTML;
			var demo_patient_gender = document.getElementById("patient_gender").innerHTML;
			var patient_dob = document.getElementById("patient_dob").innerHTML;
			var patient_address = document.getElementById("patient_address").innerHTML;
			url1 = createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=OTP&patNdhmHealthId=" + ndhmHealthID + '&hospitalcode=' + hospitalcode + '&authenticationMode=' + authenticationMode + '&transactionId=' + transactionID + '&patHospitalHealthId=' + crno + '&ndhmHealthIDCode=' + ndhmHealthIDCode + "&patName=" + patient_name_final + '&patGender=' + demo_patient_gender + '&patDob=' + patient_dob + '&patAddress=' + patient_address + '&flag=' + flag);
		}
		else {
			url1 = createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=OTP&patNdhmHealthId=" + ndhmHealthID + '&hospitalcode=' + hospitalcode + '&authenticationMode=' + authenticationMode + '&otp=' + otp + '&transactionId=' + transactionID + '&patHospitalHealthId=' + crno + '&ndhmHealthIDCode=' + ndhmHealthIDCode + '&flag=' + flag);
		}
		$.ajax({
			//stype:"POST",
			url: url1,
			success: function(response) {
				$("#preloader").remove();
				var data = JSON.parse(response);
				localStorage.setItem("abhadetails", response);
				console.log("data---------------", data + "ssss" + response);
				if (data.status == "1") {




					document.getElementById("mobileOtp").readOnly = true;
					ndhm_name = data.patName;
					ndhm_dob = data.patDob;
					ndhm_mobile_no = data.mobileno;
					//"ndhm_health_id = data.ndhmHealthIDCode;
					ndhm_address = data.patAddress;
					ndhm_health_id_code = data.ndhmHealthIDCode;
					ndhm_hospital_id_code = data.patHospitalHealthId;
					ndhm_gender = data.patGender;
					ndhm_accesstoken = data.accessToken;
					if (ndhm_gender == "M") {
						document.getElementById("patNdhm-icon-p").innerHTML = '<i class="mdi mdi-human-male" id="patDetails-icon-m" style="color: #007BFF; font-size: 40px;"></i>';
						document.getElementById("ndhm_gender").innerHTML = "Male";
						ndhmpat_gender = "Male";
					}
					else if (ndhm_gender == "F") {
						document.getElementById("patNdhm-icon-p").innerHTML = '<i class="mdi mdi-human-female" id="patDetails-icon-m" style="color: #E83E8C;; font-size: 40px;"></i>';
						document.getElementById("ndhm_gender").innerHTML = "Female";
						ndhmpat_gender = "Female";
					}
					else {
						document.getElementById("patNdhm-icon-p").innerHTML = '<span class="patientDetail" id="patDetails-icon-t"><img height="35" width="35" src="assets/images/dashboard/transgender.svg"></span>';
						document.getElementById("ndhm_gender").innerHTML = "Others";
						ndhmpat_gender = "Others";
					}
					$("#preloader").remove();


					document.getElementById("ndhm_name").innerHTML = ndhm_name;
					document.getElementById("ndhm_dob").innerHTML = ndhm_dob;
					document.getElementById("ndhm_mobile_no").innerHTML = ndhm_mobile_no;
					document.getElementById("ndhm_health_id").innerHTML = "<span style='color:#96b9df'>Patient Hospital Health ID :</span> " + ndhm_hospital_id_code;
					document.getElementById("ndhm_address").innerHTML = ndhm_address;

					//document.getElementById("ndhm_health_id_code").innerHTML = ndhm_health_id_code;
					//document.getElementById("ndhm_gender").innerHTML =ndhm_gender;
					//document.getElementById("ndhm_hospital_id_code").innerHTML = ndhm_hospital_id_code;
					$('#ERRORMESSAGEOTP').addClass("data-none");
					$('#ERRORMESSAGEDEMO').addClass("data-none");
					$('#NHDMHEALTHDETAIL').removeClass("data-none");
					$('#CONSENTCHECK').removeClass("data-none");

					//---------added by nilesh--------------------------------
					if (authenticationMode == "MOBILE_OTP" || authenticationMode == "AADHAAR_OTP") {
						swal("", "OTP Successfully Verified, Please click on 'Confirm' to link.", "success", {
							button: "OK",
						});

						$('#lblAbhaDetailsfetchDiv').removeClass("data-none");
						$('#lblAbhaDetailsfetchDiv2').removeClass("data-none");
						$('#userBirthYear').val(data.patDob);
						$('#userGender').val(data.patGender);
						//  alert("ssss"+((data.patAddress!=null && data.patAddress!="")? (data.patAddress):(data.district+" "+data.state)));
						console.log(data.patAddress + "....." + data.district + data.state + "......" + ((data.patAddress != null || data.patAddress != "") ? (data.patAddress) : (data.district + data.state)));


						$('#donorAadress').val((data.patAddress != null && data.patAddress != "") ? (data.patAddress) : (data.district + " " + data.state));
						$('#lblAbhaDetailsfetchDiv3').removeClass("data-none");
						$('#donorDistrict').val(data.district);
						$('#donorastate').val(data.state);

						document.getElementById("userBirthYear").readOnly = true;
						document.getElementById("userGender").disabled = true;
						document.getElementById("userBirthYear").disabled = true;
						document.getElementById("donorAadress").disabled = true;
						document.getElementById("donorDistrict").disabled = true;
						document.getElementById("donorastate").disabled = true;

						//document.getElementById("donorAadress").disabled = true;  


					}
					if (authenticationMode == "DEMOGRAPHICS") {
						swal("", "Demographics Successfully Verified, Please click on 'Confirm' to link.", "success", {
							button: "OK",
						});
						// alert("userBirthYear"+data.patDob+"userGender"+data.patGender);

						//  $('#lblAbhaDetailsfetchDiv').removeClass("data-none");
						//  $('#lblAbhaDetailsfetchDiv2').removeClass("data-none");
						//   	$('#userBirthYear').val(data.patDob);
						//   $('#userGender').val(data.patGender);
						//$('#userGender').val(data.patGender);
					}
					$('#VERIFYDATA').addClass("data-none");
					$('#VERIFYDATABTN').addClass("data-none");
					$('#MOBILEOTP').addClass("data-none");
					$("#hideConsent").click();
					//---------------------------	

				}
				else if (data.status == "2") {
					$("#preloader").remove();
					$('#ERRORMESSAGEDEMO').removeClass("data-none");
				}

				else if (data.isSuccess == "0") {
					$("#preloader").remove();
					console.log("everything is fine till this point");
					swal("Oops", data.error || data.Error.message, "error", {
						button: "OK",
					});
				}

				else {
					$("#preloader").remove();
					$('#ERRORMESSAGEOTP').removeClass("data-none");

				}
			},
			error: function(e) {
				$("#preloader").remove();
				alert('Error: ' + e);
			}

		});
	}

}

function confirmdata() {

var abdetails =JSON.parse( localStorage.getItem("abhadetails"));

  console.log("abdcdass"+abdetails);
	//abdetails.arr=JSON.stringify(checkedDataArr);
	var fl = document.getElementsByName("patCrNo")[0].value;
	if(fl==2){
	abdetails.arr=(checkedDataArr);
	console.log("abdetails.arr"+abdetails);
	}
	
	
   var jsonData = JSON.stringify(abdetails);
    console.log("jsonData"+jsonData);
	
	flag = document.getElementsByName("patCrNo")[0].value;
	// alert("aaaaaaabbbbbbbbb"+ndhmHealthIDCode);
	//alert("nnnnnnnnnnnnnvvvvvvvvvvvvv"+ndhmHealthID);
	//=========================

	//console.log("authenticationMode"+authenticationMode)
	var patient_mobile_no = document.getElementById("patient_mobile_no").innerHTML;

	if (authenticationMode == "DEMOGRAPHICS") {
		swal({

			text: "We have Found Some Additional and Updated Details ,Do you Want to update your profile..?\n ",
			buttons: [
				'NO',
				'Yes'
			],
			dangerMode: false,
		}).then(function(isConfirm) {
			if (isConfirm) {
				var patient_dob = document.getElementById("patient_dob").innerHTML;

				console.log("authenticationMode111" + patient_dob)
				$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');

				$.ajax({
					async: true,
					url: "/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=SAVEDATA1&patient_mobile_no=" + patient_mobile_no
						+ '&patient_dob=' + patient_dob + '&ndhmHealthIDCode=' + ndhmHealthIDCode+'&flag=' + flag,
					type: "POST",
					data: jsonData,
					//data: {
				//		"abdetails": abdetails,
				//		"checkedDataArr": checkedDataArr,
				//		"flag": flag
				//	},
					contentType: "application/json",

					success: function(response) {
						$("#preloader").remove();
						console.log("responsesqqqq" + response);
						var responses = JSON.parse(response);
						console.log("responses" + responses);
						if (responses.isSuccess == "1" || responses.length == 0) {

							$('#Confirmdata').modal({ backdrop: 'static', keyboard: false, show: true });
							//swal("", " Success ,.", "success", {
							//    button: "OK",
							//   });

						}
						else if (responses.success == "1") {
							$('#DataError').modal({ backdrop: 'static', keyboard: false, show: true });
							document.getElementById("patNdhmHealthId").readOnly = false;
							document.getElementById("mobileOtp").readOnly = false;
							$('#MOBILEOTP').addClass("data-none");
							$('#NHDMHEALTHDETAIL').addClass("data-none");
							document.getElementsByName("mobileOtp")[0].value = "";

							//swal("", " Success", "success", {
							//    button: "OK",
							//    });
						}

					},
					error: function(e) {
						$("#preloader").remove();
						alert('Error: ' + e);
						$("#preloader").remove();
						$('#DataError').modal({ backdrop: 'static', keyboard: false, show: true });
					}

				});

			}
			else {

				console.log("aaaaa" + abdetails.yearOfBirth);
				$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');

				$.ajax({
					async: true,
					url: "/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=SAVEDATA&patient_mobile_no=" + patient_mobile_no + '&ndhmHealthIDCode=' + ndhmHealthIDCode+  '&flag=' + flag,
					type: "POST",
					data: jsonData,
					//data: {
					//	"abdetails": abdetails,
					//	"checkedDataArr": checkedDataArr,
					//	"flag": flag
					//},
					contentType: "application/json",

					success: function(response) {
						$("#preloader").remove();
						console.log("responsesqqqq" + response);
						var responses = JSON.parse(response);
						console.log("responses" + responses);
						if (responses.isSuccess == "1" || responses.length == 0) {

							$('#Confirmdata').modal({ backdrop: 'static', keyboard: false, show: true });
							//swal("", " Success ,.", "success", {
							//    button: "OK",
							//   });

						}
						else if (responses.success == "1") {
							$('#DataError').modal({ backdrop: 'static', keyboard: false, show: true });
							document.getElementById("patNdhmHealthId").readOnly = false;
							document.getElementById("mobileOtp").readOnly = false;
							$('#MOBILEOTP').addClass("data-none");
							$('#NHDMHEALTHDETAIL').addClass("data-none");
							document.getElementsByName("mobileOtp")[0].value = "";

							//swal("", " Success", "success", {
							//    button: "OK",
							//    });
						}

					},
					error: function(e) {
						$("#preloader").remove();
						alert('Error: ' + e);
						$("#preloader").remove();
						$('#DataError').modal({ backdrop: 'static', keyboard: false, show: true });
					}

				});

			}
		});
	}
	else {

		console.log("aaaaa" + abdetails.yearOfBirth);
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');

		$.ajax({
			async: true,
			url: "/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=SAVEDATA&patient_mobile_no=" + patient_mobile_no + '&ndhmHealthIDCode=' + ndhmHealthIDCode+  '&flag=' + flag,
			type: "POST",
			data: jsonData,
			//{
			//	"abdetails":abdetails,
			//	"checkedDataArr":checkedDataArr,
			//	"flag":flag
			//},
			contentType: "application/json",

			success: function(response) {
				$("#preloader").remove();
				console.log("responsesqqqq" + response);
				var responses = JSON.parse(response);
				console.log("responses" + responses);
				if (responses.isSuccess == "1" || responses.length == 0) {

					$('#Confirmdata').modal({ backdrop: 'static', keyboard: false, show: true });
					//swal("", " Success ,.", "success", {
					//    button: "OK",
					//   });

				}
				else if (responses.success == "1") {
					$('#DataError').modal({ backdrop: 'static', keyboard: false, show: true });
					document.getElementById("patNdhmHealthId").readOnly = false;
					document.getElementById("mobileOtp").readOnly = false;
					$('#MOBILEOTP').addClass("data-none");
					$('#NHDMHEALTHDETAIL').addClass("data-none");
					document.getElementsByName("mobileOtp")[0].value = "";

					//swal("", " Success", "success", {
					//    button: "OK",
					//    });
				}

			},
			error: function(e) {
				$("#preloader").remove();
				alert('Error: ' + e);
				$("#preloader").remove();
				$('#DataError').modal({ backdrop: 'static', keyboard: false, show: true });
			}

		});

	}




	//======================



}
/*	}*/




function saveConsentData() {
	var hospitalcode = crno.slice(0, 5);
	var patNdhmPurpose = "";
	var array = [];
	var patNdhmHealthId = document.getElementsByName("patConsentNdhmHealthId")[0].value + "@sbx";
	var patNdhmPurposeCode = document.getElementsByName("patNdhmPurposeCode")[0].value;
	if (patNdhmPurposeCode == "CAREMGT") {
		patNdhmPurpose = "Care Management";
	}
	else if (patNdhmPurposeCode == "BTG") {
		patNdhmPurposeCode = "Break the Glass";
	}
	else if (patNdhmPurposeCode == "PUBHLTH") {
		patNdhmPurpose = "Patient Health";
	}
	else if (patNdhmPurposeCode == "DSRCH") {
		patNdhmPurpose = "Disease Specific Healthcare Research";
	}
	else if (patNdhmPurposeCode == "PATRQT") {
		patNdhmPurpose = "Self Requested";
	}
	else if (patNdhmPurposeCode == "HPAYMT") {
		patNdhmPurpose = "Health Care Payment";
	}
	var healthInfoFrom = document.getElementsByName("fromCurrent")[0].value;
	var healthInfoTo = document.getElementsByName("toCurrent")[0].value;
	var consentdate = document.getElementsByName("consentdate")[0].value;
	$("input:checkbox[name=consentPurpose]:checked").each(function() {
		array.push($(this).val());
	});
	if (patNdhmHealthId == "" || patNdhmPurposeCode == "" || healthInfoFrom == "" || healthInfoTo == "" || consentdate == "" || array == "") {
		console.log("array" + array)
		console.log(patNdhmHealthId + "patNdhmHealthId")
		console.log(patNdhmPurposeCode + "patNdhmPurposeCode")
		console.log(healthInfoFrom + "healthInfoFrom")
		console.log(healthInfoTo + "healthInfoTo")
		console.log(consentdate + "consentdate")
		alert("All fields are mandotory");
	}

	else {
		document.getElementById("requestsend").disabled = true;
		/*	
			if(consentdate<healthInfoTo){
				alert("Consent Expiry cannot be less than Health Info To date");
			}
			else{*/
		//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
		$.ajax({
			async: true,
			url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=verifyPatHealthId&pathealthid=" + patNdhmHealthId),


			success: function(response) {
				$("#preloader").remove();
				console.log(response)
				var responses = JSON.parse(response);
				if (responses.isSuccess == "0") {
					alert("Health id is not Verified");
				}
				else {
					console.log("healthInfoType" + array)
					$.ajax({
						async: true,
						url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=saveConsentData&crNo=" + crno + "&hospitalcode=" + hospitalcode + "&patNdhmHealthId=" + patNdhmHealthId +
							"&patNdhmPurpose=" + patNdhmPurpose + "&healthInfoType=" + array + "&healthInfoFrom=" + healthInfoFrom + "&patNdhmPurposeCode=" + patNdhmPurposeCode + "&healthInfoTo=" + healthInfoTo + "&consentdate=" + consentdate),


						success: function(response) {
							$("#preloader").remove();
							var responses = JSON.parse(response);
							if (responses.isSuccess == "1") {
								$("#ModalViewInfo").modal('hide');
								if (defaultconsentvar == 0) {
									$('#Confirmdata').modal({ backdrop: 'static', keyboard: false, show: true });
								}
								else {
									$('#DeFaultConfirmdata').modal({ backdrop: 'static', keyboard: false, show: true });
								}
								document.getElementById("myForm").reset();
							}
							else {
								alert("Something went wrong.");
							}
						},
						error: function(e) {
							$("#preloader").remove();
							document.getElementById("requestsend").disabled = false;
							alert('Error: ' + e);
						}

					});
				}
			},
			error: function(e) {
				$("#preloader").remove();
				document.getElementById("requestsend").disabled = false;
				alert('Error: ' + e);
			}

		});

	}

}


function ndhmConsentpatdetails() {
	$('#fhir_display').addClass("data-none");
	var hospitalcode = crno.slice(0, 5);
	//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		async: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=consentpatDetails&crNo=" + crno + "&hospitalcode=" + hospitalcode),


		success: function(response) {
			$("#preloader").remove();
			var responses = JSON.parse(response);
			console.log(responses)
			if (responses.isSuccess == "1") {
				var data = responses.patConsentDetails;
				$('#DataTable11').DataTable().clear().destroy();
				// $.fn.dataTable.moment('DD-MMM-YYYY');
				datatable = $('#DataTable11').DataTable({
					"processing": true,
					responsive: true,
					"order": [[1, 'asc']],
					"language": { "emptyTable": "No Data Is Available " },
					"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
					"aaData": data,
					"columns": [
						{ "data": 'entry_date', "width": "10%" },
						{ "data": 'patNdhmHealthId', "width": "10%" },                     /* 0 */
						{ "data": 'patNdhmHealthPurpose', "width": "20%" },                   /*    1 */
						{ "data": 'patNdhmHealthType', "width": "30%" },                      /* 2 */
						{ "data": 'patNdhmHealthfromdate', "width": "10%" },                        /* 3 */
						{ "data": 'patNdhmHealthtodate', "width": "10%" },                      /* 4 */
						{ "data": 'patNdhmHealthconsentexpirydate', "width": "10%" },               /* 5 */
						{ "data": 'status', "width": "10%" },               /* 6 */
						{
							"className": 'details-control',
							"orderable": false,
							"data": 'status', render: function(data, type, row) {
								if (data == "Consent Granted") {
									return '<a class="actionButtonNational"><label class="badge badge-gradient-success">View</label></a>';
								}
								else if (data == "Consent Expired") {
									return 'Consent Expired';
								}
								else {
									return '-';
								}
							}
						},

					],

				});
				$('#CONSENTDATA').removeClass("data-none");
				// Add event listener for opening and closing details
				$('#DataTable11 tbody').on('click', 'td.details-control', function() {
					var tr = $(this).closest('tr');
					var row = datatable.row(tr);
					//  row.child( getfhirpatdetails(row.data()));
					if (row.child.isShown()) {
						// This row is already open - close it
						row.child.hide();
						tr.removeClass('shown');
					}
					else {
						// Open this row
						row.child(getfhirpatdetails(row.data()));

						tr.addClass('shown');
					}

				});
			}
			else {
				alert("Something went wrong.");
			}
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}

	});

}
/* Formatting function for row details - modify as you need */
function getfhirpatdetails(d) {
	fhir_patNdhmHealthId = d.patNdhmHealthId;
	fhir_patNdhmHealthConsentId = d.patNdhmHealthConsentId
	var jsonArray = [];
	var jsonArrayView = [];
	var value = [];
	var types = "";
	//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		async: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=getFHIRDATA&crNo=" + crno + "&fhir_patNdhmHealthId=" + fhir_patNdhmHealthId + "&fhir_patNdhmHealthConsentId=" + fhir_patNdhmHealthConsentId + "&hospitalCode=" + hospitalcode),

		success: function(response) {
			$("#preloader").remove();
			//alert(response);
			//response=response.replaceAll("/","\/");
			//response=response.replaceAll("http://","http:\\/\\/");
			//response=response.replaceAll("https://","https:\\/\\/");
			//alert(response);
			var responses = JSON.parse(response);
			//alert(responses);
			var data = responses.patFHIRDetails
			for (var i = 0; i < data.length; i++) {
				var fhir_data = data[i].fhir_data;
				fhir_data = fhir_data.replaceAll("http://", "http:\\/\\/");
				fhir_data = fhir_data.replaceAll("https://", "https:\\/\\/");
				fhir_data = fhir_data.replaceAll("\\\\r", "");
				fhir_data = fhir_data.replaceAll("\\\\n", "");
				fhir_data = fhir_data.replaceAll("\\\\t", "");
				//alert(fhir_data);

				var fhir_database64 = Base64.encode(fhir_data);
				fhirBundle = { "hiType": "DiagnosticReport", "fhirBundle": fhir_database64 };
				/*$.ajax({
						async:false,
						url : "/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=viewFirDetails",
						type:"POST",
						data:
						{
							fhirBundle:JSON.stringify(fhirBundle),
							
				 },     							
						success: function(response){					
							 responsess=  JSON.parse(response)	;
						//alert(response)
							  jsonArray.push(responsess);
							  console.log(jsonArray)
							//getJSONVALUE(jsonArray);
						}, 
						
						error: function(e){
							
								alert('Error: ' + e);
							 }
						});	*/


				$.ajax({
					async: false,
					url: "/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=getFHIRViewDetails",
					type: "POST",
					data:
					{
						fhirBundle: JSON.stringify(fhirBundle),
						sequence: i
					},
					success: function(response) {
						$("#preloader").remove();
						jsonArrayView.push(response);
						console.log(jsonArrayView)
						//alert(response);
					},
					error: function(e) {
						alert('Error: ' + e);
					}
				});
			}
			getJSONVALUE(jsonArray, jsonArrayView);
			// $(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
			/*setTimeout(function(){
				getJSONVALUE(jsonArray)
				 },10000)
				 $("#preloader").remove();	*/
		},


		error: function(e) {
			$("#preloader").remove();

			alert('Error: ' + e);
		}
	});
}
var collapse_seq = 1;

function getJSONVALUE(arr, view) {
	var doc_download = {};
	$('#fhir_display').removeClass("data-none");
	var encounter_record_date = "";
	var medication_detail = "";
	var cheif_complaints = "";
	document.getElementById("total_records").innerHTML = "Total Records : <h13>" + view.length + "</h13>";


	/*for(var i =0;i<arr.length;i++){
		if(arr[i].encounter_detail.encounter_start_date == ""|| arr[i].encounter_detail.encounter_start_date == null){
			record_date = "-"
		}
		else {
			record_date = arr[i].encounter_detail.encounter_start_date;
		}
		if(arr[i].provider_detail.hospital_name == ""|| arr[i].provider_detail.hospital_name == null){
			hospital_name = "-"
		}
		else {
			hospital_name = arr[i].provider_detail.hospital_name;
		}
		if(arr[i].encounter_detail.encounter_type == ""|| arr[i].encounter_detail.encounter_type == null){
			encounter_type = "-"
		}
		else {
			encounter_type = arr[i].encounter_detail.encounter_type;
		}
		var report_detail = arr[i].report_detail
		if(arr[i].report_detail==""|| arr[i].report_detail==null || arr[i].report_detail===undefined){
			report_order_status = "-";
			report_pdf="-"
				report_issue_date = "-"
					report_test_name ="-"		
					report_lab_name="-"	
					report_doc	 ="-"	
				//document.getElementById("pdf").innerHTML = report_pdf;
		}
		else {
			report_order_status = arr[i].report_detail.order_status
			report_test_name = arr[i].report_detail.test_name
			report_issue_date = arr[i].report_detail.report_date
			
			
			if(arr[i].report_detail.report_base64!=""|| arr[i].report_detail.report_base64!=null){
				report_lab_name = arr[i].report_detail.lab_name
			}
			else{
				report_lab_name = "-"
			
			}
			
			
					
			//	document.getElementById("pdf").innerHTML = report_pdf;
		}
		if(arr[i].doc_detail=="" || arr[i].doc_detail==null ||arr[i].doc_detail===undefined  ){
			doc_detail = "-"
				doc_download1 = "null"
				}
		else {
			doc_detail="Document Reference";
			//doc_download =arr[i].doc_detail.document_base64;
			doc_download = {"title":arr[i].doc_detail.document_type,"data":arr[i].doc_detail.document_base64,"type":arr[i].doc_detail.document_content_type};
			doc_download1 = JSON.stringify(doc_download);
			
		}
		
	encounter_record_date+= "<div class='hr_line'></div>"+
			"<div class='row'>" +
			"<div class='col-md-4'>" +
			"<h12>Record Date : <h13>"+arr[i].composition_date+"</h13></h12>" +
					"</div>" +
					"<div class='col-md-6'>" +
					"<button  class='btn btn-sm ml-auto collapsed more-sucess'  type='button' data-toggle='collapse' data-target='#MORECONTENT' aria-expanded='false' >"+
	"<i class='mdi mdi-arrow-down-bold-circle '></i></button></div>" +
					"</div>"+
					
					"<div class='row'>" +
					"<div class='col-md-12'>" +
					"<h2 class='hospital_code'>"+hospital_name+"</h2>" +
							"</div>" +
							"</div>"+
							"<div class='documentcard cardstyle'>" +
							"<div class='row'>" +
							"<div class='col-md-9 documenttxt' ><img src='assets/images/dashboard/document.svg' style='margin-bottom: 5px;height: 36px'/>"+arr[i].composition_title+
							"</div>" +
							"<div class='col-md-3'>" +
							"<h12> Type : <h13>"+encounter_type+"</h13></h12>" +
									"</div>" +
									"</div></div>" +
									"<div  id='MORECONTENT' class='panel-collapse collapse in grid-margin ' role'tabpanel' aria-labelledby='headingOne'>";
									

	
	//lst_cc Chief Complaints
	if( arr[i]["lst_cc"] &&  arr[i].lst_cc!=null &&  arr[i].lst_cc.length>0 ){
		for(var a in arr[i].lst_cc){
			cheif_complaints+= "<i class='mdi mdi-arrow-right-bold'></i>&nbsp;"+arr[i].lst_cc[a].value+"["+arr[i].lst_cc[a].record_date+"]. <br>"
			//medication_detail+= "<div class='row'>" +
				//	"<div class='col-md-12'>" +
					//"<h13><i class='ti-hand-point-right'></i>&nbsp;"+arr[i].lst_meds[a].medication_name+"("+arr[i].lst_meds[a].dosage+")" +
						//	"</h13></div></div>";
		}
		encounter_record_date+= "<div class='row'>" +
				"<div class ='col-md-12 reporttxt'>Chief Complaints :" +
				"</div>" +
				"</div><div style='border: 2px solid #00000038;'>" +
				 "<div class='row'>" +
					"<div class='col-md-12'>" +
					"<h13 style='font-weight:500'>"+cheif_complaints +
							"</h13></div></div></div>";
				
	}
	// lst_meds   Medications
	if( arr[i]["lst_meds"] &&  arr[i].lst_meds!=null && arr[i].lst_meds.length>0){
		for(var a in arr[i].lst_meds){
			medication_detail+= "<i class='mdi mdi-arrow-right-bold'></i>&nbsp;"+arr[i].lst_meds[a].medication_name+"("+arr[i].lst_meds[a].dosage+"). <br>"
		}
		encounter_record_date+= "<div class='row'>" +
				"<div class ='col-md-12 reporttxt'>Medication :" +
				"</div>" +
				"</div><div style='border: 2px solid #00000038;'>" +
				 "<div class='row'>" +
					"<div class='col-md-12'>" +
					"<h13 style='font-weight:500'>"+medication_detail +
							"</h13></div></div></div>";
				
	}
	
	//report_detail Diagnosis Report
		if( arr[i]["report_detail"] &&  arr[i].report_detail!=null){
			report_doc = JSON.stringify({"type":arr[i].report_detail.report_content_type,"data":arr[i].report_detail.report_base64})
		encounter_record_date+=	
									"<div class = 'row'>" +
									"<div class='col-md-12 reporttxt'>Diagnosis Report :</div>" +
									"</div><div style='border: 2px solid #00000038;'>" +
									"<div class='row'><div class='col-md-6'><h12>Status :<h13>" +arr[i].report_detail.order_status+"</h13></h12></div></div>" +
									"<div class='row'><div class='col-md-6'><h12>Issue Date :<h13>" +arr[i].report_detail.report_date+"</h13></h12></div></div>" +
									"<div class='row'><div class='col-md-6'><h12>Test Name :<h13>" +arr[i].report_detail.test_name+"</h13></h12></div></div>" +
									"<div class='row'><div class='col-md-6'><h13>Reference :<button class='nav-item test1' id='report_data_pdf' style='cursor:pointer;color:#007bff;background: none;border: none;' ><a value='"+report_doc+"' >"+arr[i].report_detail.lab_name+"</a></button></h13></div></div></div>" ;
		}
		
		// Document Refernce doc_detail
		if(arr[i]["doc_id"] && arr[i].doc_id!=null){
		doc_download = JSON.stringify({"title":arr[i].doc_detail.document_type,"data":arr[i].doc_detail.document_base64,"type":arr[i].doc_detail.document_content_type});
		if(arr[i].doc_detail.document_content_type.indexOf("text")!=-1)
		encounter_record_date+= 	"<div class = 'row'>" +
									"<div class='col-md-12 reporttxt'>Document Detail :   <h13><button class='nav-item test_text' style='cursor:pointer;color:#007bff;background: none;border: none;'><a>"+arr[i].composition_title+"</a></button></h13></div>" +
									"</div>"+
									"<div id='doc_text_data' style='display:none;border: 2px solid #00000038;'><div class='row'><div class='col-md-12'>"+arr[i].doc_detail.document_base64+"</div></div></div>" +
									"</div>"; 
			
		else
		encounter_record_date+= 	"<div class = 'row'>" +
									"<div class='col-md-12 reporttxt'>Document Detail :   <h13><button class='nav-item test'style='cursor:pointer;color:#007bff;background: none;border: none;'><a  value='"+doc_download+"'>"+arr[i].composition_title+"</a></button></h13></div>" +
									"</div></div>"; 
											
										
		}
		
	encounter_record_date+= "</div>" +view[i];
		document.getElementById("record_date").innerHTML=encounter_record_date;
		//document.getElementById("record_date1").innerHTML=;
		
		}*/

	var final = "";
	for (var i = 0; i < view.length; i++) {
		final += view[i];
		//alert(i);
	}
	document.getElementById("record_date").innerHTML = final;

	$(".more-sucess").click(function() {
		$(this).next(".morecontent").slideToggle(100);
	});

	$('.test').on("click", "a", function() {
		var fired_button = $(this).attr("value");
		downloadpdf(fired_button)
	});
	$('.test1').on("click", "a", function() {
		//alert('aa')
		var fired_button1 = $(this).attr("value");
		download_report_pdf(fired_button1)
	});
	$('#report_data_pdf').on("click", function() {
		//alert('aa')
		var fired_button1 = $(this).attr("value");
		download_report_pdf(fired_button1)
	});
	$('.test_text').on("click", "a", function() {
		//alert($(this).html());
		//alert($(this).parent().parent().parent().html());
		var elem = $(this).parent().parent().parent().parent();
		//alert(elem.next().html());
		elem.next().toggle();
	});


}
function moredata() {
	var coll = document.getElementsByClassName("collapsible");
	var i;
	alert(coll.length)
	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.display === "block") {
				content.style.display = "none";
			} else {
				content.style.display = "block";
			}
		});
	}
}
function downloadpdf(data) {
	//data1 = JSON.parse(data);
	if (data != "null") {
		var data1 = JSON.parse(data);
		var b64 = data1.data;
		//var b64 = data;
		$('#ex1').empty();
		/*$('#download').empty();*/
		$("#mymodal").modal('show');
		var obj = document.createElement('object');
		obj.style.width = '100%';
		obj.style.height = '100%';
		obj.type = data1.type;
		obj.data = 'data:' + data1.type + ';base64,' + b64;

		document.getElementById("ex1").appendChild(obj);


		/*var link = document.createElement('a');
		link.innerHTML = 'Download PDF file';
		link.download = "DocumentReference.pdf";
		link.href = 'data:application/octet-stream;base64,' + b64;
		$('#download').html(link);
		document.getElementById("download").appendChild(link);*/
	}
	else
		return false;
}
function download_report_pdf(data) {
	//alert(data)
	//data1 = JSON.parse(data);
	if (data != "null") {
		try {
			data1 = JSON.parse(data);
		} catch (e) { alert(e.message); }
		//alert(data1)
		var b64 = data1.data;
		//var b64 = data;
		$('#ex1').empty();
		$("#mymodal").modal('show');
		var obj = document.createElement('object');
		obj.style.width = '100%';
		obj.style.height = '100%';
		obj.type = data1.type;
		obj.data = 'data:' + data1.type + ';base64,' + b64;

		document.getElementById("ex1").appendChild(obj);

	}
	else
		return false;
}

$(function() {
	document.addEventListener("keypress", function(event) {
		if (event.key == "{") {
			console.log("Scan Started: {");
			setTimeout(function() {
				console.log("Scan TimeOut:3sec");
				$('#qrInputElm').val("");
				$('#qrInputElm').addClass("data-none");
			}, 3000);
			event.preventDefault();
			$('#qrInputElm').removeClass("data-none");
			$('#qrInputElm').val("{");
			$('#qrInputElm').focus();

			$('#qrInputElm').off("keypress").on("keypress", function(event) {
				if (event.key == "}") {
					var qrInputElmVal = $('#qrInputElm').val();
					$('#qrInputElm').addClass("data-none");
					qrInputElmVal += "}";
					console.log("Scan Ended: }");
					scanComplete(qrInputElmVal);
				}
			});
		}
	});
});
function scanComplete(scanJsonStr) {
	var scanJson = JSON.parse(scanJsonStr);
	document.getElementById("patNameInput").innerHTML = scanJson.name;
	document.getElementById("patGenderInput").innerHTML = scanJson.gender;
	document.getElementById("patDobInput").innerHTML = scanJson.dob;
	document.getElementById("patAddressInput").innerHTML = scanJson.address;
	$('#patNdhmHealthId').val(scanJson.hid);
	$('#qrScanElemntdiv').removeClass('data-none');


}

function myFunction() {
	var verifydata = document.getElementsByName("verifydata")[0].value;
	if (verifydata == "Demographic") {
		//	 $('#SCANNER').removeClass("data-none");
		$('#OTPBUTTON').addClass("data-none");
	}
	else {
		$('#OTPBUTTON').removeClass("data-none");
		// $('#SCANNER').addClass("data-none");
		$('#SCANNERDIV').addClass("data-none");
	}
}

function verifyhealthid() {
	if (checkConsent() === false) {
		return false;
	}
	var fl = document.getElementsByName("patCrNo")[0].value;
	if(fl==2){
	if (donorCheck() == false) {
		return false;
	}}

	document.getElementById("VERIFYHEALTHID").style.display = "none";

	$('#divVERIFYDATA').addClass("data-none");
	$('#create1').addClass("data-none");
	document.getElementById("divVERIFYDATA").style.display = "none";
	document.getElementById("btnMobileOTP").style.display = "none";
	$('#btnMobileOTP').addClass("data-none");
	var pathealthid = document.getElementsByName("patNdhmHealthId")[0].value;

	var r = /^[0-9]+$/i;///^(?!\s*$|\s)*$/;
	//alert(pathealthid);
	if (pathealthid.match(r) && pathealthid.length == 14) {
		pathealthid = pathealthid.substring(0, 2) + '-' + pathealthid.substring(2, 6) + '-' + pathealthid.substring(6, 10) + "-" + pathealthid.substring(10, 14);
		//alert(":inside"+pathealthid);
	}


	//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	//	$(".content-wrapper").prepend('<div class="blocks" id="preloadering"><div class="block orange"></div><div class="block blue"></div></div>');
	$.ajax({
		async: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=verifyPatHealthId&pathealthid=" + pathealthid),


		success: function(response) {
			$("#preloader").remove();
			console.log(response)
			var responses = JSON.parse(response);
			if (responses.isSuccess == "0") {
				$('#INVALIDDATA').removeClass("data-none");
				isverified = "0";
			}
			else {

				ndhmHealthID = responses.healthId;
				$('#lbAbhaid').val(responses.healthId);
				$('#userName').val(responses.name);


				ndhmHealthIDCode = responses.healthIdNumber;
				console.log("ndhmHealthIDCode" + ndhmHealthIDCode);
				if (responses.healthIdNumber && responses.healthIdNumber != "") {
					localStorage.setItem("abdmlinkageHealthIdNumber", responses.healthIdNumber)
					$('#LBAbhaNumber').val(responses.healthIdNumber);
					$('#lblAbhaNumberfecth').removeClass("data-none");
				}

				document.getElementById("ConsentNdhmHealthId").value = responses.healthId
				$('#selectauthMode').empty();
				var select = document.getElementById("selectauthMode");
				var authModes = responses.authMethods;

				var arr = responses.authMethods;

				// Removing the specified element by value from the array
				for (var i = 0; i < arr.length; i++) {
					if (authModes[i] != "PASSWORD" && arr[i] != "AADHAAR_BIO") {
						/*var spliced = arr.splice(i, 1);
						console.log("Removed element: " + spliced + "<br>");
						console.log("Remaining elements: " + arr);*/

						//for (var i = 0; i < arr.length; i++) {
						var opt = authModes[i]
						var el = document.createElement("option");
						el.textContent = opt;
						el.value = opt;
						select.appendChild(el);
					}

					/* if (arr[i] == "PASSWORD" ) { 
						 var spliced = arr.splice(i,1);
						if(arr[i] == "AADHAAR_BIO"){
							var sp = arr.splice(i,1);
							for(var i = 0; i < arr.length; i++) {
								 var opt = arr[i]
								 var el = document.createElement("option");
								 el.textContent = opt;
								 el.value = opt;
								 select.appendChild(el);
						    
						 }
						}
						else {
							 for(var i = 0; i < arr.length; i++) {
								 var opt = arr[i]
								 var el = document.createElement("option");
								 el.textContent = opt;
								 el.value = opt;
								 select.appendChild(el);
							 } 
						 }
						 
						 
					 } */
				}



				document.getElementById("userName").disabled = true;
				document.getElementById("lbAbhaid").disabled = true;
				document.getElementById("lblAbhaIaafecth").disabled = true;
				document.getElementById("LBAbhaNumber").disabled = true;
				document.getElementById("patNdhmHealthId").readOnly = true;
				$('#VERIFYHEALTHID').addClass("data-none");
				$('#AUTHMODE').addClass("data-none");
				$('#VERIFYDATA').removeClass("data-none");
				$('#VERIMAGE').removeClass("data-none");
				$('#lblEdithid').removeClass("data-none");
				$("#VERIFYDATABTN").removeClass("data-none");
				$('#VERIFYCHECK').removeClass("data-none");
				$('#INVALIDDATA').addClass("data-none");
				if (patient_health_id == "" || patient_health_id == null) {
					isverified = "1";
					// $('#VERIFYONLY').removeClass("data-none");

				}
				else {
					isverified = "2";
					$('#VERIFYONLY').addClass("data-none");
				}
			}
		},
		error: function(e) {
			$("#preloader").remove();

			alert('Error: ' + e);
		}
	});
}

function editpatHealthid() {
	document.getElementById("patNdhmHealthId").readOnly = false;
	$('#VERIFYHEALTHID').removeClass("data-none");
	$('#VERIFYDATA').addClass("data-none");
	$('#VERIFYDATABTN').addClass("data-none");
	$('#VERIFYCHECK').addClass("data-none");
	$('#AUTHMODE').addClass("data-none");
	$('#qrScanElemntdiv').addClass("data-none");
	$('#ERRORMESSAGE').addClass("data-none");
	$('#MOBILEOTP').addClass("data-none");
	$('#NHDMHEALTHDETAIL').addClass("data-none");
	$('#VERIMAGE').addClass("data-none");

	//---------------- addeded by nilesh----
	$("#btnverify").show();
	$("#VERIFYHEALTHID").show();
	$("#BoxpatNdhmHealthId").show();
	//	alert("2345");
	$("#lblhidcreate").addClass("data-none");
	document.getElementById("combo1").style.display = "none";
	document.getElementById("btn1").style.display = "none";
	document.getElementById("HIDByAaDhar").style.display = "none";
	document.getElementById("LblAadharNo").style.display = "none";
	document.getElementById("HIDMOBILEOTP").style.display = "none";
	document.getElementById("VerifyOTPLbl").style.display = "none";
	//	document.getElementById('lblAadharOTP').style.display ="none";
	//	document.getElementById("divVERIFYDATA").style.display = "block";
	//	document.getElementById("btnMobileOTP").style.display = "block";
	//----------ended by nilesh----------- 

}
function isVerifyonly() {
	$('#VERIFYDATA').addClass("data-none");
	$('#VERIFYDATABTN').addClass("data-none");
	console.log(ndhmHealthIDCode)
	patNdhmHealthId = document.getElementsByName("patNdhmHealthId")[0].value;

	hospitalcode = crno.slice(0, 5);
	if (document.getElementById("iskyc").checked == true) {
		isKyc = "1";
	}
	else {
		isKyc = "0";
	}
	if (document.getElementsByName("patNdhmHealthId")[0].value == "") {
		alert("Please Enter Health Id");
	}
	else {
		//$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
		$.ajax({
			aysnc: true,
			url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=IsVerifyOnly&patNdhmHealthId=" + patNdhmHealthId + '&hospitalcode=' + hospitalcode + '&patAuthMode=' + "VERIFY" + "&patHospitalHealthId=" + crno + "&ndhmHealthIDCode=" + ndhmHealthIDCode + '&isKyc=' + isKyc + '&isVerified=' + "3" + "&patName=" + patientname + "&patGender=" + patient_gender),

			success: function(response) {
				$("#preloader").remove();
				var responses = JSON.parse(response);
				console.log(responses)
				if (responses.isSuccess == "1") {

					$('#Confirmdata').modal({ backdrop: 'static', keyboard: false, show: true });
				}

			},
			error: function(e) {
				$("#preloader").remove();
				alert('Error: ' + e);
			}
		});
	}
}

function consentRequestModal() {
	$.ajax({
		async: true,
		url: createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=validateToken"),
	});

	$('#ModalViewInfo').modal({ backdrop: 'static', keyboard: false, show: true });
}





function healthrecordmodal() {
	$('#healthIdRecord').modal({ backdrop: 'static', keyboard: false, show: true });
}

function myfunction2() {
	if ($('.collapse').collapse('hide')) {
		$('.collapse').collapse('show');
	}
	else
		$('.collapse').collapse('hide');
}

function consentRequestChange() {
	if (document.getElementById('consentRequest').checked) {
		var myNodeList = document.querySelectorAll("input[name=consentPurpose]");
		for (i = 0; i < myNodeList.length; i++) {
			myNodeList[i].checked = true;
		}
		$('#ModalViewInfo').modal({ backdrop: 'static', keyboard: false, show: true });

	}
}

function saveConsentRequestForm() {
	var patNdhmPurpose = "";
	var array = [];
	var patNdhmHealthId = document.getElementsByName("patConsentNdhmHealthId")[0].value + "@sbx";
	var patNdhmPurposeCode = document.getElementsByName("patNdhmPurposeCode")[0].value;
	if (patNdhmPurposeCode == "CAREMGT") {
		patNdhmPurpose = "Care Management";
	}
	else if (patNdhmPurposeCode == "BTG") {
		patNdhmPurposeCode = "Break the Glass";
	}
	else if (patNdhmPurposeCode == "PUBHLTH") {
		patNdhmPurpose = "Patient Health";
	}
	else if (patNdhmPurposeCode == "DSRCH") {
		patNdhmPurpose = "Disease Specific Healthcare Research";
	}
	else if (patNdhmPurposeCode == "PATRQT") {
		patNdhmPurpose = "Self Requested";
	}
	else if (patNdhmPurposeCode == "HPAYMT") {
		patNdhmPurpose = "Health Care Payment";
	}
	var healthInfoFrom = document.getElementsByName("fromCurrent")[0].value;
	var healthInfoTo = document.getElementsByName("toCurrent")[0].value;
	var consentdate = document.getElementsByName("consentdate")[0].value;
	$("input:checkbox[name=consentPurpose]:checked").each(function() {
		array.push($(this).val());
	});
	if (patNdhmHealthId == "" || patNdhmPurposeCode == "" || healthInfoFrom == "" || healthInfoTo == "" || consentdate == "" || array == "") {
		alert("All fields are mandotory");
	}

	else {
		$('#ModalViewInfo').modal('hide')

	}
}


function geturldetails() {
	$.ajax({
		async: true,
		url: createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=GETURL&crno=" + crno),


		success: function(response) {
			console.log(response)
		},
		error: function(e) {
			$("#preloader").remove();

			alert('Error: ' + e);
		}
	});
}

//for Episde Details

function viewLinkedEpisodeList() {
	var ipdOpdUnlinkedData = [];
	var ipdOpdlinkedData = [];
	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		aysnc: true,
		url: createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=IpdData&crno=" + crno + "&hospitalCode=" + hospitalcode),
		success: function(response) {
			$("#preloader").remove();
			var responses = JSON.parse(response);
			if (responses.isSuccess == "1") {
				var patdetails = responses.episodesList;

				console.log("Linked data", patdetails)
				for (i = 0; i < patdetails.length; i++) {
					var variable = patdetails[i].episodeUniqueCode.split("_")[0]
					var encounter_type = variable.split("_")[0]

					if (patdetails[i].isLinked == "1") {
						ipdOpdlinkedData.push(patdetails[i])

					}
					else {
						ipdOpdUnlinkedData.push(patdetails[i])
					}
				}
				//alert(JSON.stringify(ipdOpdUnlinkedData));
				unlinkedepisodesData(ipdOpdUnlinkedData);
				linkedepisodesData(ipdOpdlinkedData);
				if (ipdOpdUnlinkedData.length != 0) {
					document.getElementById("datalist").innerHTML = '<span style="color:#dc1f0b">' + ipdOpdUnlinkedData.length + '&nbsp; Record to be Linked</span> <i class=" ti-hand-point-right blinking"></i>&nbsp;Click Here To Link'
				}
			}
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}
	});



}

function linkedepisodesData(jsonObject) {
	document.getElementById("LinkedTotal").innerHTML = "(" + jsonObject.length + ")";
	$('#DataTablelinkedEpisode').DataTable().clear().destroy();
	linkeddatatable = $('#DataTablelinkedEpisode').DataTable({
		"processing": true,
		responsive: true,
		"order": [[1, 'asc']],
		"language": { "emptyTable": "No Data Is Available " },
		"lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],

		"aaData": jsonObject,
		"columns": [

			{
				"data": 'episodeUniqueCode', "defaultContent": "", "searchable": false, render(data, type, row) {
					var encounter_type = data.split("_")[0]
					if (encounter_type == "IPD") { return '&nbsp;IPD &nbsp;<img src="assets/images/dashboard/ipdpatient.svg" class="imgclass"> ' }
					else {
						return '&nbsp;OPD &nbsp;<img src="assets/images/dashboard/doctor.svg" class="imgclass">'
					}
				}
			},
			{ "data": 'visitDate', "width": "10%", },
			{ "data": 'department_unit', "searchable": true },
			{ "data": 'status', "width": "10%", "searchable": true },
		]

	});

}

function navigate_event() {
	$("#linked_data").addClass("data-none")
}

function event_handler() {
	$("#linked_data").removeClass("data-none")

}

function unlinkedepisodesData(Jsondata) {
	var data = [];
	var jsonOpdData = [];
	var ipd_episode_code = [];


	var finalEpisodeListIPD = {};
	var finalEpisodeListOPD = {};
	for (var i = 0; i < Jsondata.length; i++) {
		if (Jsondata[i].episodeUniqueCode.split("_")[0] == "IPD") {
			var finalIPd = {};
			finalIPd.isLinked = Jsondata[i].isLinked;
			finalIPd.department_unit = Jsondata[i].department_unit
			finalIPd.dischargeDate = Jsondata[i].dischargeDate;
			finalIPd.episodeUniqueCode = Jsondata[i].episodeUniqueCode;
			finalIPd.isDischarge_present = Jsondata[i].isDischarge_present;
			finalIPd.isReport_present = Jsondata[i].isReport_present;
			finalIPd.isRx_present = Jsondata[i].isRx_present;
			finalIPd.status = Jsondata[i].status;
			finalIPd.visitDate = Jsondata[i].visitDate;
			var finalIPDEpisodeData = {};
			finalIPDEpisodeData.isLinked = Jsondata[i].isLinked;
			finalIPDEpisodeData.episodeUniqueCode = Jsondata[i].episodeUniqueCode;
			finalIPd.finalEpisodeListOPD = finalIPDEpisodeData;
			//finalIPd.finalEpisodeListIPD = "{isLinked :'"+Jsondata[i].isLinked+"', episodeUniqueCode:'"+Jsondata[i].episodeUniqueCode+"'}";
			data.push(finalIPd)
		}
		else {
			var finalOPd = {};
			finalOPd.isLinked = Jsondata[i].isLinked;
			finalOPd.department_unit = Jsondata[i].department_unit
			finalOPd.dischargeDate = Jsondata[i].dischargeDate;
			finalOPd.episodeUniqueCode = Jsondata[i].episodeUniqueCode;
			finalOPd.isDischarge_present = Jsondata[i].isDischarge_present;
			finalOPd.isReport_present = Jsondata[i].isReport_present;
			finalOPd.isRx_present = Jsondata[i].isRx_present;
			finalOPd.status = Jsondata[i].status;
			finalOPd.visitDate = Jsondata[i].visitDate; '"+doc_download+"'
			var finalOPDEpisodeData = {};
			finalOPDEpisodeData.isLinked = Jsondata[i].isLinked;
			finalOPDEpisodeData.episodeUniqueCode = Jsondata[i].episodeUniqueCode;
			finalOPd.finalEpisodeListOPD = finalOPDEpisodeData;
			//finalOPd.finalEpisodeListOPD = "{isLinked :'"+Jsondata[i].isLinked+"', episodeUniqueCode:'"+Jsondata[i].episodeUniqueCode+"'}";

			jsonOpdData.push(finalOPd);
			// alert(jsonOpdData)
		}
	}
	document.getElementById("IPDTotal").innerHTML = "(" + data.length + ")";
	document.getElementById("OPDTotal").innerHTML = "(" + jsonOpdData.length + ")";

	$('#DataTableipdEpisode').DataTable().clear().destroy();
	IPDdatatable = $('#DataTableipdEpisode').DataTable({
		"processing": true,
		responsive: true,
		"order": [[1, 'asc']],
		"language": { "emptyTable": "No Data Is Available " },
		"lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],

		"aaData": data,
		"columns": [

			{ "data": 'episodeUniqueCode', "defaultContent": "", "searchable": false },
			{ "data": 'visitDate', "width": "10%", },
			{ "data": 'department_unit', "searchable": true },
			{ "data": 'status', "width": "10%", "searchable": true },


			{
				"data": 'dischargeDate', "width": "10%", "searchable": true, render: function(data, type, row) {
					if (data == "" || data == null) {
						return "-";
					}
					else {
						return data;
					}
				}
			},
			{ "data": null, "defaultContent": '', "searchable": false, "className": 'details-control-IPD', "orderable": false, render: viewrdischarge_summary },

		],
		"columnDefs": [{
			orderable: false,
			targets: 0,
			'className': 'dt-body-center',
			'render': function(data, type, full, meta) {
				return '';//'<img src="assets/images/dashboard/check.svg" style="height: 45px; margin-top: -11px;">';//'<input type="checkbox" name="ipddata[]" value="'+data+ '">';
			},
			'checkboxes': {
				'selectRow': true
			}
		},

		],
		select: {
			style: 'multi',
		},
		order: [
			[1, 'dsc']
		],

	});

	$('#DataTableopdEpisode').DataTable().clear().destroy();
	OpdDatatable = $('#DataTableopdEpisode').DataTable({
		"processing": true,
		responsive: true,
		"order": [[1, 'asc']],
		"language": { "emptyTable": "No Data Is Available " },
		"lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
		"aaData": jsonOpdData,
		"columns": [
			{ "data": 'episodeUniqueCode', "defaultContent": "", "searchable": false },

			{ "data": 'visitDate', "width": "10%", "searchable": true },
			{ "data": 'department_unit' },
			{ "data": 'status', "width": "10%" },
			/* 0 */
			{ "data": null, "defaultContent": '', "searchable": false, "className": 'details-control-OPD', "orderable": false, render: viewreportdata },
		],

		"columnDefs": [{
			orderable: false,
			targets: 0,
			'className': 'dt-body-center',
			'render': function(data, type, full, meta) {
				return '';//'<img src="assets/images/dashboard/check.svg" style="height: 45px; margin-top: -11px;">';//'<input type="checkbox" name="id[]" value="'+data+'">';
			},
			'checkboxes': {
				'selectRow': true,
			}
		},

		],
		select: {
			style: 'multi',
			selector: 'td:first-child'
		},
		order: [
			[1, 'dsc']
		],


	});

	$('#DataTableopdEpisode tbody tr').on('click', 'td.details-control-OPD', function() {
		var tr = $(this).closest('tr');
		var row = OpdDatatable.row(tr);
		var d = row.data();

		if (flag == d) {
			if (viewType == "RX") {
				$('#reportpdf').empty();
				$('#reportpdfModal').modal({ backdrop: 'static', keyboard: false, show: true });
				var obj = document.createElement('object');
				obj.style.width = '100%';
				obj.style.height = '100%';
				obj.type = OpdRecord.encounter_detail.rx_content_type;
				obj.data = 'data:' + OpdRecord.encounter_detail.rx_content_type + ';base64,' + OpdRecord.encounter_detail.rx_base64;
				document.getElementById("reportpdf").appendChild(obj);
			}
			else {
				if (row.child.isShown()) {
					// This row is already open - close it
					row.child.hide();
					tr.removeClass('shown');
				}
				else {
					// $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');
					row.child(viewLabDetails(OpdRecord)).show();
					tr.addClass('shown');
				}
			}
		}

		else {
			var encounterType = d.episodeUniqueCode.split("_")[0]
			var episodeCode = d.episodeUniqueCode.split("_")[1]
			var visitNo = d.episodeUniqueCode.split("_")[2]
			var admissionNo = "";
			if (encounterType == "IPD")
				admissionNo = d.episodeUniqueCode.split("_")[1];

			$("#healthIdRecord").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
			$.ajax({

				aysnc: true,
				url: createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=viewReports&crno=" + crno + "&encounterType=" + encounterType + "&episodeCode=" + episodeCode + "&visitNo=" + visitNo + "&admissionNo=" + admissionNo),
				success: function(response) {
					$("#preloader").remove();
					var responses = JSON.parse(response);
					OpdRecord = responses;
					flag = d

					if (viewType == "RX") {
						$('#reportpdf').empty();

						$('#reportpdfModal').modal({ backdrop: 'static', keyboard: false, show: true });
						var obj = document.createElement('object');
						obj.style.width = '100%';
						obj.style.height = '100%';
						obj.type = OpdRecord.encounter_detail.rx_content_type;
						obj.data = 'data:' + OpdRecord.encounter_detail.rx_content_type + ';base64,' + OpdRecord.encounter_detail.rx_base64;
						$("#preloader").remove();
						document.getElementById("reportpdf").appendChild(obj);
					}

					else {
						if (row.child.isShown()) {
							// This row is already open - close it
							row.child.hide();
							tr.removeClass('shown');
							$("#preloader").remove();
						}
						else {
							// $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');
							row.child(viewLabDetails(OpdRecord)).show();
							tr.addClass('shown');
							$("#preloader").remove();
						}
					}
				},
				error: function(e) {
					$("#preloader").remove();
					alert('Error: ' + e);
				}
			});
		}
	});

	$('#DataTableipdEpisode tbody tr').on('click', 'td.details-control-IPD', function() {
		//alert("3")
		var tr = $(this).closest('tr');
		var row = IPDdatatable.row(tr);
		var d = row.data();

		if (flag == d) {
			if (viewType == "Discharge") {
				//alert(OpdRecord.encounter_detail.discharge_base64)
				$('#reportpdf').empty();
				$('#reportpdfModal').modal({ backdrop: 'static', keyboard: false, show: true });
				var obj = document.createElement('object');
				obj.style.width = '100%';
				obj.style.height = '100%';
				obj.type = OpdRecord.encounter_detail.discharge_content_type;
				obj.data = 'data:' + OpdRecord.encounter_detail.discharge_content_type + ';base64,' + OpdRecord.encounter_detail.discharge_base64;
				document.getElementById("reportpdf").appendChild(obj);
			}
			else {
				if (row.child.isShown()) {
					// This row is already open - close it
					row.child.hide();
					tr.removeClass('shown');
				}
				else {
					// $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');
					row.child(viewLabDetails(OpdRecord)).show();
					tr.addClass('shown');
				}
			}
		}

		else {
			var encounterType = d.episodeUniqueCode.split("_")[0]
			var episodeCode = d.episodeUniqueCode.split("_")[1]
			var visitNo = d.episodeUniqueCode.split("_")[2]
			var admissionNo = "";
			if (encounterType == "IPD")
				admissionNo = d.episodeUniqueCode.split("_")[1];

			$("#healthIdRecord").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
			$.ajax({

				aysnc: true,
				url: createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=viewReports&crno=" + crno + "&encounterType=" + encounterType + "&episodeCode=" + episodeCode + "&visitNo=" + visitNo + "&admissionNo=" + admissionNo),
				success: function(response) {
					$("#preloader").remove();
					var responses = JSON.parse(response);
					OpdRecord = responses;
					flag = d

					if (viewType == "RX") {
						$('#reportpdf').empty();

						$('#reportpdfModal').modal({ backdrop: 'static', keyboard: false, show: true });
						var obj = document.createElement('object');
						obj.style.width = '100%';
						obj.style.height = '100%';
						obj.type = OpdRecord.encounter_detail.rx_content_type;
						obj.data = 'data:' + OpdRecord.encounter_detail.rx_content_type + ';base64,' + OpdRecord.encounter_detail.rx_base64;
						$("#preloader").remove();
						document.getElementById("reportpdf").appendChild(obj);
					}
					else if (viewType == "Discharge") {
						//alert(OpdRecord.encounter_detail.discharge_base64)
						$('#reportpdf').empty();
						$('#reportpdfModal').modal({ backdrop: 'static', keyboard: false, show: true });
						var obj = document.createElement('object');
						obj.style.width = '100%';
						obj.style.height = '100%';
						obj.type = OpdRecord.encounter_detail.discharge_content_type;
						obj.data = 'data:' + OpdRecord.encounter_detail.discharge_content_type + ';base64,' + OpdRecord.encounter_detail.discharge_base64;
						document.getElementById("reportpdf").appendChild(obj);
					}

					else {
						if (row.child.isShown()) {
							// This row is already open - close it
							row.child.hide();
							tr.removeClass('shown');
							$("#preloader").remove();
						}
						else {
							// $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');
							row.child(viewLabDetails(OpdRecord)).show();
							tr.addClass('shown');
							$("#preloader").remove();
						}
					}
				},
				error: function(e) {
					$("#preloader").remove();
					alert('Error: ' + e);
				}
			});
		}
	});
}


function checkAllOPD(ele) {
	var checkboxes = document.getElementsByName('id[]');
	if (ele.checked) {
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].type == 'checkbox') {
				checkboxes[i].checked = true;
			}
		}
	} else {
		for (var i = 0; i < checkboxes.length; i++) {
			console.log(i)
			if (checkboxes[i].type == 'checkbox') {
				checkboxes[i].checked = false;
			}
		}
	}
}

function checkAllIPD(ele) {
	var checkboxes = document.getElementsByName('ipddata[]');
	if (ele.checked) {
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].type == 'checkbox') {
				checkboxes[i].checked = true;
			}
		}
	} else {
		for (var i = 0; i < checkboxes.length; i++) {
			console.log(i)
			if (checkboxes[i].type == 'checkbox') {
				checkboxes[i].checked = false;
			}
		}
	}
}
function viewrdischarge_summary(data, type, row) {
	var data = row.isReport_present
	var disch = row.isDischarge_present;
	//alert(dischargedata);
	if (data == "0" && disch == "1") {//viewdischargesummary
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewDischargedetails()"><label class="badge badge-gradient-success">Disharge</label></a>'
	}
	else if (data == "1" && disch == "0") {
		return '<a class="actionButtonNationalreportpdf" onclick="viewreportdetails()"><label class="badge badge-gradient-success" >Lab</label></a>'
	}
	else if (data == "1" && disch == "1") {
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewDischargedetails()"><label class="badge badge-gradient-success">Disharge</label></a>&nbsp;<a class="actionButtonNationalreportpdf" onclick="viewreportdetails()"><label class="badge badge-gradient-success">Lab</label></a>'
	}
	else {
		return "-";
	}
}

function viewdischargesummary() {
	$("#healthIdRecord").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	/*$('#DataTableipdEpisode tbody ').on('click', 'td.details-control', function () {
		   var tr = $(this).closest('tr');
		   var row = IPDdatatable.row( tr );
		  var d = row.data();
		  
		  var encounterType = d.episodeUniqueCode.split("_")[0]
			 var admissionNo = d.episodeUniqueCode.split("_")[1]
			 var visitNo = d.episodeUniqueCode.split("_")[2]
			 $.ajax({
				   aysnc:true,
				   url : createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=viewReports&crno="+crno+"&encounterType="+encounterType+"&visitNo="+visitNo+"&admissionNo="+admissionNo),
	   	
					success: function(response){
					   $("#preloader").remove();
					var responses = JSON.parse(response);
						$('#reportpdf').empty();
				   $('#reportpdfModal').modal({backdrop: 'static', keyboard: false, show: true});
				 var obj = document.createElement('object');
				   obj.style.width = '100%';
				   obj.style.height = '100%';
				   obj.type = responses.encounter_detail.discharge_content_type;
				   obj.data =  'data:'+responses.encounter_detail.discharge_content_type+';base64,'+responses.encounter_detail.discharge_base64;;
			   document.getElementById("reportpdf").appendChild(obj);
				   },
				    
					error: function(e){
						$("#preloader").remove();
						 alert('Error: ' + e);
					  }
			 });
			 });*/

}

function viewreportdata(data, type, row) {
	var data = row.isReport_present
	var rxdata = row.isRx_present;
	if (data == "0" && rxdata == "1") {
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewclinicalpdf()"><label class="badge badge-gradient-success">Rx</label></a>'
	}
	else if (data == "1" && rxdata == "0") {
		return '<a class="actionButtonNationalreportpdf" onclick="viewreportdetails()"><label class="badge badge-gradient-success" >Lab</label></a>'
	}
	else if (data == "1" && rxdata == "1") {
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewclinicalpdf()"><label class="badge badge-gradient-success">Rx</label></a>&nbsp;<a class="actionButtonNationalreportpdf" onclick="viewreportdetails()"><label class="badge badge-gradient-success">Lab</label></a>'
	}
	else {
		return "-";
	}
}

function viewclinicalpdf() {
	viewType = "RX";
}


function viewreportdetails() {
	viewType = "Lab";
}

function viewDischargedetails() {
	viewType = "Discharge";
	//alert("2"+viewType)
}

function saveunlinkedData() {
	tmpData = [];
	// var tblDataIPD = IPDdatatable.column(0).checkboxes.selected();
	// var tblData = OpdDatatable.column(0).checkboxes.selected();  
	OpdDatatable.$('input[name="id[]"]').each(function() {

		if (this.checked) {
			var finalOPDEpisodeData = {};
			finalOPDEpisodeData.isLinked = "0";
			finalOPDEpisodeData.episodeUniqueCode = $(this).val();
			tmpData.push(finalOPDEpisodeData);

		}
	});

	IPDdatatable.$('input[name="ipddata[]"]').each(function() {

		if (this.checked) {
			var finalIPDEpisodeData = {};
			finalIPDEpisodeData.isLinked = "0";
			finalIPDEpisodeData.episodeUniqueCode = $(this).val();
			tmpData.push(finalIPDEpisodeData);

		}
	});

	/*$.each(tblData, function(i, val) {
			tmpData.push(tblData[i]);

	  
	  });*/
	/*  $.each(tblDataIPD, function(i, val) {
						tmpData.push(tblDataIPD[i]);
		  
		  });*/
	console.log("tmpData----------------" + tmpData);
	$("#healthIdRecord").modal('hide');
}

function viewLabDetails(d) {
	try {
		console.log(JSON.stringify(d.investigations_detail));
		var investigations_detail = d.investigations_detail;

		//console.log("investigations_detail"+ JOSN.stringify(investigations_detail));
		var htm = "";
		if (investigations_detail.length > 0) {
			htm = "<table cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;margin-left:95px;'>";
			for (var i = 0; i < investigations_detail.length; i++) {
				reportfile = { "type": investigations_detail[i].report_content_type, "data": investigations_detail[i].report_base64, "title": investigations_detail[i].lab_name };
				tmpDatareportfile[investigations_detail[i].requistion_dno] = reportfile;
				htm += '<tr>' +
					'<td><h12>Test Date :</h12></td>' +
					'<td><h13>' + investigations_detail[i].test_date + '</h13></td>' +
					'<td><h12>Lab Name :</h12></td>' +
					'<td><h13>' + investigations_detail[i].lab_name + '</h13></td>' +
					'<td><h12>Test Name :</h12></td>' +
					'<td><h13>' + investigations_detail[i].test_name + '</h13></td>' +
					'<td><h12>Status :</h12></td>' +
					'<td><h13>' + investigations_detail[i].order_status + '</h13></td>' +
					'<td></td>' +
					'<td><a value="' + reportfile + '" id = "pdfile" onclick="downloadReportpdf(\'' + investigations_detail[i].requistion_dno + '\')"><img src="assets/images/dashboard/pdf-file.png" height="35" width="35"></a></td>' +
					'</tr>';
			}
			htm += '</table>';
		}
		//alert(JSON.stringify(tmpDatareportfile));
		return htm;
	} catch (e) { alert(e.message); }
}

function downloadReportpdf(jsonbj) {
	//alert(JSON.stringify(tmpDatareportfile));
	//var jsonbj = OpdRecord.investigations_detail[i];
	//alert(jsonbj);
	//alert(tmpDatareportfile[jsonbj])
	var reportfile = tmpDatareportfile[jsonbj];
	var b64 = reportfile.data;//jsonbj.report_base64;//data;//
	$('#reportpdf').empty();
	$('#reportpdfModal').modal({ backdrop: 'static', keyboard: false, show: true });
	var obj = document.createElement('object');
	obj.style.width = '100%';
	obj.style.height = '100%';
	obj.type = reportfile.type;//jsonbj.report_content_type;//type;//
	obj.data = 'data:' + reportfile.type + ';base64,' + b64;
	document.getElementById("reportpdf").appendChild(obj);

}


//function for clipboard  copy 

function clipboardCopy() {
	var copyText = document.getElementById("patient_health_no");
	//copyText.select();
	//copyText.setSelectionRange(0, 99999)
	document.execCommand("copy");
	// alert("Copied the text: " + copyText.value);
}
//------------------------------------------------Added by Nilesh---------------------------------------------------------------------

function genOTP() {
	//alert("nilesh")
	mobileNo = $("#patient_mobile_no").text();
	var mobileNo11 = $("#pateintMobNo").val();
	console.log("aaaaaaaaaaaa" + mobileNo);
	console.log("aaaaaaaaaaaa" + mobileNo11);

	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		aysnc: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=GenMobileOtp&mobileNo=" + mobileNo),

		success: function(response) {
			$("#preloader").remove();


			var respons = JSON.parse(response);
			console.log(respons)
			//	        alert (respons.txnId);
			txId = respons.txnId;
			//                 alert(123);
			//           alert(txId);

			if (respons.isSuccess != "0") {
				txId = respons.txnId;
				// alert(txId);

				swal("", "OTP Sent to registered Mobile Number Successfully.", "success", {
					button: "OK",
				});
				//document.getElementById("HIDMOBILEOTP").style.display = "block"
				// Start the timer for 60 seconds


			}

			else {

				a = respons.Error.details[0]

				console.log(a);
				swal("Oops", respons.Error.details[0].message || respons.Error || respons.error, "error", {
					button: "OK",
				});
				if (respons.isSuccess == "0") {
					console.log("everything is fine till this point");
					swal("Oops", respons.error || respons.Error.message, "error", {
						button: "OK",
					});
				}
				$("#preloader").remove();
				// $('#ERRORMESSAGE').removeClass("data-none");


			}


			$("#lbltimercnt").removeClass("data-none");
			var oneMinute = 60;
			var display = document.querySelector('#timer');
			display.textContent = "01:00"; // Set initial display to 01:00
			startTimer2(oneMinute, display);
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}
	});

}




function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	var intervalId = setInterval(function() {

		// minutes = parseInt(timer / 60, 10);
		// seconds = parseInt(timer % 60, 10);

		// minutes = minutes < 10 ? "0" + minutes : minutes;
		// seconds = seconds < 10 ? "0" + seconds : seconds;
		--timer;
		display.textContent = timer;

		if (timer <= 0) {
			clearInterval(intervalId);
			document.getElementById("AadaharNoOTPresend").style.display = "block";
			$("#lbltimercnt").addClass("data-none");

		}
	}, 1000);
}

function startTimer2(duration, display) {
	var timer = duration, minutes, seconds;
	var intervalId = setInterval(function() {

		// minutes = parseInt(timer / 60, 10);
		// seconds = parseInt(timer % 60, 10);

		// minutes = minutes < 10 ? "0" + minutes : minutes;
		// seconds = seconds < 10 ? "0" + seconds : seconds;
		--timer;
		display.textContent = timer;

		if (timer <= 0) {
			clearInterval(intervalId);
			document.getElementById("resendmobileOtp").style.display = "block";
			$("#lbltimercnt").addClass("data-none");

		}
	}, 1000);
}

function resendmobileotpcall() {


	mobileNo = $("#patient_mobile_no").text();
	var mobileNo11 = $("#pateintMobNo").val();
	console.log("aaaaaaaaaaaa" + mobileNo);
	console.log("aaaaaaaaaaaa" + mobileNo11);

	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		aysnc: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=resednMobileOtp&mobileNo=" + mobileNo + '&txnId=' + txId),

		success: function(response) {
			$("#preloader").remove();

			var respons = JSON.parse(response);
			console.log(respons)
			alert(respons);
			//txId = respons.txnId;
			//                 alert(123);
			//           alert(txId);

			if (respons.isSuccess != "0") {
				//txId = respons.txnId;
				// alert(txId);

				swal("", "OTP Resends to registered Mobile Number Successfully.", "success", {
					button: "OK",
				});
				//document.getElementById("HIDMOBILEOTP").style.display = "block"
				// Start the timer for 60 seconds
				document.getElementById("AadaharNoOTPresend").style.display = "none";

			}

			else {

				a = respons.Error.details[0]

				console.log(a);
				swal("Oops", respons.Error.details[0].message || respons.Error || respons.error, "error", {
					button: "OK",
				});
				if (respons.isSuccess == "0") {
					console.log("everything is fine till this point");
					swal("Oops", respons.error || respons.Error.message, "error", {
						button: "OK",
					});
				}
				$("#preloader").remove();
				// $('#ERRORMESSAGE').removeClass("data-none");


			}
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}
	});


}

function resendOTP() {
	// Code to resend the OTP
	// ...

	// Start the timer for 60 seconds
	var oneMinute = 60;
	var display = document.querySelector('#timer');
	display.textContent = "01:00"; // Set initial display to 01:00
	startTimer(oneMinute, display);

	// Hide the "Resend OTP" button again
	document.getElementById("resend-otp-button").style.display = "none";
	document.getElementById("otp-button").style.display = "block";
}
//-----------------------------



function delinkabha() {
	$.ajax({
		aysnc: true,
		dataType: "text",
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=delinkabha&mobileNo=" + mobileNo),

		success: function(response) {
			var respons = JSON.parse(response);
			console.log(response); // the data as a string
			alert("Nilesh" + response)
			if (respons.isSuccess == "1") {
				//txId = respons.txnId;
				// alert(txId);

				swal("", "ABHA Profile Delinked Successfully.", "success", {
					button: "OK",
				});
				//

			}


		},

		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}

	});
}
function openBase64PdfInModalPopup() {
	$.ajax({
		aysnc: true,
		dataType: "text",
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=getabhaBase64&mobileNo=" + mobileNo),

		success: function(response) {

			base64PdfString = response;

			console.log(response); // the data as a string


		},

		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}

	});

	//"JVBERi0xLjQKJaqrrK0KMSAwIG9iago8PAovUHJvZHVjZXIgKEFwYWNoZSBGT1AgVmVyc2lvbiAyLjU6IFBERiBUcmFuc2NvZGVyIGZvciBCYXRpaykKL0NyZWF0aW9uRGF0ZSAoRDoyMDIzMDMwNzExNTk0NSswNSczMCcpCj4+CmVuZG9iagoyIDAgb2JqCjw8CiAgL05hbWUgL0ltMQogIC9UeXBlIC9YT2JqZWN0CiAgL0xlbmd0aCAzIDAgUgogIC9GaWx0ZXIgL0RDVERlY29kZQogIC9TdWJ0eXBlIC9JbWFnZQogIC9XaWR0aCAzNTAKICAvSGVpZ2h0IDM1MAogIC9CaXRzUGVyQ29tcG9uZW50IDgKICAvQ29sb3JTcGFjZSAvRGV2aWNlUkdCCj4+CnN0cmVhbQr/2P/gABBKRklGAAECAAABAAEAAP/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAV4BXgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APf6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDP1vW9O8OaPPq2rXH2exg2+ZLsZ9u5go4UEnkgcCuP/AOF2/Dz/AKGH/wAkrj/43R8bf+SQ67/27/8ApRHXknwm+E2g+PPCt1qmqXepQzxXr26rayIqlQiNk7kY5y57+lAHrf8Awu34ef8AQw/+SVx/8bo/4Xb8PP8AoYf/ACSuP/jdc/8A8M4+D/8AoJa5/wB/4f8A41R/wzj4P/6CWuf9/wCH/wCNUAdB/wALt+Hn/Qw/+SVx/wDG66i98U6Np/hdfEt1eeXpDRRzC48pzlJCoQ7QN3O5e3Gea+aPjB8ONH+H/wDY39k3N9N9u8/zPtbo2Nnl4xtVf75657V6f4y/5Netv+wVpv8A6FDQB6R4b8U6N4u06S/0O8+12scphZ/KePDgAkYcA9GH50eJPFOjeEdOjv8AXLz7JaySiFX8p5MuQSBhAT0U/lXm/wCzj/yTzUP+wrJ/6KirmPDfiS8+O+oyeF/FEcFnY2sR1BJNMUxyGRSIwCZC424lbjGcgc+oB6P/AMLt+Hn/AEMP/klcf/G6P+F2/Dz/AKGH/wAkrj/43Xz5r/grTdK+MsXg+Ce7bT3vbS3Mjupl2yiMschQM/OccenWtT4wfDjR/h//AGN/ZNzfTfbvP8z7W6NjZ5eMbVX++eue1AHt/wDwu34ef9DD/wCSVx/8bo/4Xb8PP+hh/wDJK4/+N15Jr/wm0HSvg1F4wgu9SbUHsrS4MbyIYt0pjDDAQHHznHPp1rxugD7n8SeKdG8I6dHf65efZLWSUQq/lPJlyCQMICein8q5f/hdvw8/6GH/AMkrj/43XP8A7R3/ACTzT/8AsKx/+ipa5j4d/BTw34u8Cabrl/e6rHdXXm70gljCDbK6DAMZPRR3oA9n8MeNvDvjH7V/YGofbPsuzzv3Mke3dnb99RnO1unpWhret6d4c0efVtWuPs9jBt8yXYz7dzBRwoJPJA4Fc/4F+HGj/D/7f/ZNzfTfbvL8z7W6NjZuxjaq/wB89c9q8M+J3xZ17VZvEXg+e001dPS9e3EiRuJdsU2VOS5GfkGePXpQB9F+G/FOjeLtOkv9DvPtdrHKYWfynjw4AJGHAPRh+dbFeP8A7OP/ACTzUP8AsKyf+ioq4D/ho7xh/wBA3Q/+/E3/AMdoA+n65/xP428O+Dvsv9v6h9j+1b/J/cySbtuN33FOMbl6+tYegeNdS1X4NS+MJ4LRdQSyu7gRojCLdEZAowWJx8gzz69K878Mf8ZA/av+Er/0L+xNn2b+yv3e/wA7O7f5m/OPKXGMdT17AHqGifFLwb4j1iDSdJ1n7RfT7vLi+yzJu2qWPLIAOATya7CvD9b+HGj/AAk0efxxoFzfXOp6Zt8mK/dHhbzGETbgiqx+WRiMMOQOvSuQ/wCGjvGH/QN0P/vxN/8AHaAPp+ivmD/ho7xh/wBA3Q/+/E3/AMdo/wCGjvGH/QN0P/vxN/8AHaAPf/E/jbw74O+y/wBv6h9j+1b/ACf3Mkm7bjd9xTjG5evrVi98U6Np/hdfEt1eeXpDRRzC48pzlJCoQ7QN3O5e3Gea8X8Mf8ZA/av+Er/0L+xNn2b+yv3e/wA7O7f5m/OPKXGMdT17euan4K03VfAaeD557tdPS3gtxIjqJdsRUqclSM/IM8evSgC54b8U6N4u06S/0O8+12scphZ/KePDgAkYcA9GH51n+G/iJ4V8XajJYaHqv2u6jiMzJ9nljwgIBOXUDqw/OpPBXgrTfAejTaXpc93NBLcNcM106swYqq4G1VGMIO3rXlfiTw3Z/AjTo/FHheSe8vrqUae8epsJIxGwMhIEYQ7sxLznGCePQA94org9A8a6lqvwal8YTwWi6glld3AjRGEW6IyBRgsTj5Bnn16V45/w0d4w/wCgbof/AH4m/wDjtAHu9n8RPCuoeKG8NWuq+Zq6yyQm3+zyjDxhi43FdvG1u/OOKPEnxE8K+EdRjsNc1X7JdSRCZU+zyyZQkgHKKR1U/lXyZpnjXUtK8eP4wggtG1B7ie4Mboxi3ShgwwGBx85xz6daPGvjXUvHmsw6pqkFpDPFbrbqtqjKpUMzZO5mOcue/pQB9h+JPFOjeEdOjv8AXLz7JaySiFX8p5MuQSBhAT0U/lXP2Hxf8CanqNtYWeu+ZdXUqQwp9knG52ICjJTAySOtcv8AtHf8k80//sKx/wDoqWvAPAn/ACUPw1/2FbX/ANGrQB9f+J/G3h3wd9l/t/UPsf2rf5P7mSTdtxu+4pxjcvX1rn/+F2/Dz/oYf/JK4/8Ajdef/tNf8yt/29/+0aueGvgF4V1nwrpGqXGoays97ZQ3EixzRBQzoGIGYycZPqaAO0/4Xb8PP+hh/wDJK4/+N0f8Lt+Hn/Qw/wDklcf/ABuuf/4Zx8H/APQS1z/v/D/8ao/4Zx8H/wDQS1z/AL/w/wDxqgDqLD4v+BNT1G2sLPXfMurqVIYU+yTjc7EBRkpgZJHWu4r5IufDdn4R+P2l6HYSTyWtrqthsedgXO4xOckADqx7V9b0AFFFFABRRRQB5/8AG3/kkOu/9u//AKUR1z/7OP8AyTzUP+wrJ/6KiroPjb/ySHXf+3f/ANKI65/9nH/knmof9hWT/wBFRUAfMFdB4E/5KH4a/wCwra/+jVo/4QTxh/0Kmuf+C6b/AOJrc8F+C/FVr468PXFx4a1mGCLU7Z5JJLCVVRRKpJJK4AA5zQB6H+01/wAyt/29/wDtGug8Zf8AJr1t/wBgrTf/AEKGuf8A2mv+ZW/7e/8A2jXpGm2Whah8GdEtfErwJpD6VZfaDPOYUGFjK5cEY+YL356UAcv+zj/yTzUP+wrJ/wCioqx/EniSz+O+nR+F/C8c9nfWso1B5NTURxmNQYyAYy53ZlXjGMA8+vqngrTPCmlaNNB4PktH09rhnkNrdm4Xzdqg5Ys2DtC8Z9PWvK/ElloXhXTo774PvBP4hklENwumTnUJBakEsTGTJhd6xfNjg4GecEA8Q8U+G7zwj4ju9Dv5IJLq12b3gYlDuRXGCQD0Ydq2PAvw41j4gfb/AOybmxh+w+X5n2t3XO/djG1W/uHrjtUfiPR/HWs395r2vaFrLTsge5uZNNeJQqIBk4QKAFUc8dK9E/Z413R9E/4ST+1tVsbDzvs3l/a7hIt+PNzjcRnGR09RQB3/AIH+I+jx6npfw7Ntff2vYRf2fLMETyGkt4yHKtu3bT5bYJUHkZAr1Cvmjw1YXmnfHmfxRfWk9r4ebUL2ddVnjKWhjkWURuJj8m1iy7TnB3DHUV0/xH8a+NpPENufh3dT6jpH2RRNNplnHexrPvfcpcI2G27Dtz0IOOaALnwm+E2veA/FV1qmqXemzQS2T26rayOzBi6Nk7kUYwh7+lanjj4j6PJqeqfDsW19/a9/F/Z8UxRPIWS4jAQs27dtHmLkhSeDgGuw/wCE78H/APQ16H/4MYf/AIqvCPEtheaj8eYPFFjaT3Xh5dQsp21WCMvaCONYhI5mHybVKtuOcDac9DQBw/jr4cax8P8A7B/a1zYzfbvM8v7I7tjZtzncq/3x0z3qv8O/Eln4R8d6brl/HPJa2vm70gUFzuidBgEgdWHevqfU9G8DfEzyvtMtjrf9n52/ZL8nyfMxnPlOOuzv/dOO9cP8RPg/4Y0/wJqV14a8OTvq6eV9nEEs8znMqBsIWOflLduOtAFj/ho7wf8A9A3XP+/EP/x2j9o7/knmn/8AYVj/APRUtYfwm+Euj6r4Vup/GHhq7TUFvXSMXTT27eVsQjChlyNxbnHr6V7J4k8LaN4u06Ow1yz+12scomVPNePDgEA5Qg9GP50Aeb+Df+TXrn/sFal/6FNXmHwf+I+j/D/+2f7Wtr6b7d5Hl/ZERsbPMzncy/3x0z3q54+8Q6/4W8T6n8PPC88kOg7EtYNNjgWZmE8as6BmVpCWaRu+fmwMcVwf/CCeMP8AoVNc/wDBdN/8TQB9V+LtNm+I3wrkt9HaOB9Wt7a4gN2SoVS6S4baGwdoxxnn86r/AAm8Fal4D8K3Wl6pPaTTy3r3CtauzKFKIuDuVTnKHt6V4YPGfxf8M6HDHImq2GmWMSQo8+joqRIMIoLtF9Byea9n+CninWfF3g28v9cvPtd1HqDwq/lJHhBHGQMIAOrH86AOP8SeJLP476dH4X8Lxz2d9ayjUHk1NRHGY1BjIBjLndmVeMYwDz65nhr4BeKtG8VaRqlxqGjNBZXsNxIsc0pYqjhiBmMDOB6ivV9N8I+A/hzcNrFvHaaM8yG1NxdXzhWBIbYPMcjPyZ9eD715B49+LPi2H4h3um+EtejuNPZ4Us0tIILgOzRpkK21ixLkjGTzxQB7H46+I+j/AA/+wf2tbX0327zPL+yIjY2bc53Mv98dM968os/Dd54V8UN8YL6SCTw9NLJqC20DE3YjugyxgqQE3AzLuG/AwcE8Z4fxPH8UfGP2X+39F1y8+y7/ACf+JQ0e3djd9yMZztXr6V2HgdPHviDU9L8IeL9L1U+ETF5M0E+nG3QJFGWiBlCKww6J/FzjBznkA4v4s+NdN8eeKrXVNLgu4YIrJLdlukVWLB3bI2swxhx39a9j/aO/5J5p/wD2FY//AEVLXnnxZ+GMuleKrWDwf4Y1J9PayR5DawzXC+bvcHLHdg7QvGfT1rc8N3uu+KtRksfjAk8Hh6OIzW7anANPjN0CAoEgEeW2NL8ueRk44yADg9M+E2var4DfxhBd6aunpbz3BjeRxLtiLBhgIRn5Djn06VT8C/DjWPiB9v8A7JubGH7D5fmfa3dc792MbVb+4euO1ekXt7rth4oXw74dSdvhg0scMssEAmtPssgU3RN0QSFBabc2/wCXnkbePR/DEnwu8Hfav7A1rQ7P7Vs87/ibrJu252/fkOMbm6etAHzJpngrUtV8eP4PgntF1BLie3Mjuwi3RBixyFJx8hxx6dK9j8N+JLP4EadJ4X8URz3l9dSnUEk0xRJGI2AjAJkKHdmJuMYwRz6cBqOneNbH4lar4m8M6Pqr79QuZ7K+t9PaeOSORnw6HaVZWRuDyCDkV6n4K8HH4h6NNq3xM0e7n1qG4a2ha6SSzYW4VWUBE2Ajc8nzYz1GeOADwjwV4K1Lx5rM2l6XPaQzxW7XDNdOyqVDKuBtVjnLjt61qab4bvPCPxm0TQ7+SCS6tdVst7wMSh3NG4wSAejDtWX4K1PxXpWszT+D47t9Qa3ZJBa2guG8rcpOVKtgbgvOPT1r6L8D+B7LxBpml+L/ABfpE58XGXzpp5zJbuHikKxExAqowiJ/DzjJznkA4/8Aaa/5lb/t7/8AaNdB4y/5Netv+wVpv/oUNc/+01/zK3/b3/7RrqPElhean+zVZ2dhaT3d1JpWnbIYIzI7YMJOFHJwAT+FAHyxXsH7OP8AyUPUP+wVJ/6Nirz/AP4QTxh/0Kmuf+C6b/4mvVPgF4a17RvHV9capompWMDaZIiyXVq8SlvNiOAWAGcAnHsaAMvxl/ydDbf9hXTf/QYa+n6+YPGX/J0Nt/2FdN/9Bhr6foAKKKKACiiigDz/AONv/JIdd/7d/wD0ojrxD4cfGD/hX/h640n+wvt/nXbXPm/a/KxlEXbjY39zOc96+l/FN7oWn+HLu68SpA+kJs+0CeAzIcuoXKAHPzFe3HWvN/8AhMvgZ/z66H/4Im/+M0Ac/wD8NNf9Sj/5Uv8A7VR/w01/1KP/AJUv/tVewf8ACCeD/wDoVND/APBdD/8AE1x+t6v8HfDmsT6Tq2m6Hb30G3zIv7F37dyhhysRB4IPBoA8Q+JvxN/4WN/Zf/Eo/s/7B5v/AC8+bv37P9hcY2e/WvX/ABl/ya9bf9grTf8A0KGj/hMvgZ/z66H/AOCJv/jNemW1touueGrWKKztLnRbi3ieCB7ceU0WA0f7thgADaQCOMDpigDzP9nH/knmof8AYVk/9FRVwH7OP/JQ9Q/7BUn/AKNir2vUvF3gP4c3C6PcSWmjPMguhb2ti4VgSV3ny0Iz8mPXge1V/BWv/DfVdZmg8Hw6amoLbs8htdNNu3lblByxRcjcV4z6elAHN+Nvib5ni+++Gv8AZGP7R8vTf7Q+0/6v7TGo3+Xs52+Z03DOOozXkHxN+GX/AArn+y/+Jv8A2h9v83/l28rZs2f7bZzv9ulfS/ivwpYajpOrXtlotjJ4he0kNpeCCNZxOIyImWUgFWBC4bIxgcjFeT+GP+KS+1f8Lo/f/atn9lf2r/xMsbc+ds2+Z5f3os9M8dccAHQeMv8Ak162/wCwVpv/AKFDR+zj/wAk81D/ALCsn/oqKvMPHGjeOTpmqawkt9/wg8svnWcYvwIBavIPs4WDflVwY8LtG3jgY49P/Zx/5J5qH/YVk/8ARUVAHiHw48C/8LA8Q3Gk/wBo/YPJtGufN8jzc4dF243L/fznPavT/wDhJ/8AhEv+LL/Y/tfnf8S3+1/N8vH2v5t/k4P3PO6b+dvUZ4ofEfxr4Jj8PW5+Hd1Bp2r/AGtRNNplnJZSNBsfcpcIuV3bDtz1AOOK8bm1bUrnVBqk+oXcuoB1cXbzM0oZcbTvJzkYGDnjAoA9z/5Nz/6mH+3f+3TyPI/7+bt3ne2NvfPHqGs+Ov7I+F8fjT+zvN32ltc/Y/P2484oNu/aem/rt5x2r5g0zRvHPxM837NLfa3/AGfjd9rvwfJ8zOMea467O390Z7V0nw1udaufifp3hDxFeXd3p8Dz2txpd3cGe3BiifCGMkoQrICOoBUEdBQB738OPHX/AAsDw9cat/Z32DybtrbyvP8ANzhEbdnav9/GMdq5/wCHHxg/4WB4huNJ/sL7B5No1z5v2vzc4dF242L/AH85z2r0TTdJ03RrdrfS9PtLGBnLtHawrEpbAGSFAGcADPsK+QNS8I+PPhzbrrFxHd6Mkzi1Fxa3yBmJBbYfLcnHyZ9OB7UAdZ4y/wCTobb/ALCum/8AoMNev/E34m/8K5/sv/iUf2h9v83/AJefK2bNn+w2c7/bpXzBoGuP/wAJ9o2t63fzzeTqFvNc3U7tK+xHXJJ5Y4Vffpivo/U/if8ACTW/K/ta7sb/AMnPl/a9Kll2ZxnG6I4zgdPQUAHxP1P+2/2f7rVvJ8n7daWVz5W7ds3yxNtzgZxnGcCs/wDZx/5J5qH/AGFZP/RUVZfxK+JXgfWfhhqOg6DqcbTskCW1tHZyxKFSVDgZQKAFU8cdK8w8FaB8SNV0aafwfNqSaetwySC11IW6+btUnKl1ydpXnHp6UAeh/wDCT/8ADQP/ABSn2P8AsH7J/wATL7V5v2rfs/d7NmExnzc5z/DjHPHAReGP+EO+OWkaD9s+2fZdVsf3/leXu3NG/wB3Jxjdjr2qnqXhHx58ObddYuI7vRkmcWouLW+QMxILbD5bk4+TPpwPau80bxr4JPwvkfWLqCbxx9kuSl7PZyS3Yny/kMLjYSGA8va275cDkY4APT/ib8Tf+Fc/2X/xKP7Q+3+b/wAvPlbNmz/YbOd/t0rQ1nx1/ZHwvj8af2d5u+0trn7H5+3HnFBt37T039dvOO1fIGp67rGt+V/a2q31/wCTny/tdw8uzOM43E4zgdPQV3nwm1bUtc8faL4f1bULvUNFdJEbTruZpbdlSFygMbErhSqkDHBUY6UAfQfw48df8LA8PXGrf2d9g8m7a28rz/NzhEbdnav9/GMdq8v/AOEn/wCGgf8AilPsf9g/ZP8AiZfavN+1b9n7vZswmM+bnOf4cY549003SdN0a3a30vT7SxgZy7R2sKxKWwBkhQBnAAz7CvlT4KeKdG8I+Mry/wBcvPslrJp7wq/lPJlzJGQMICein8qAO3/4Sf8A4RL/AIsv9j+1+d/xLf7X83y8fa/m3+Tg/c87pv529RnjgPib8Mv+Fc/2X/xN/wC0Pt/m/wDLt5WzZs/22znf7dKj8eaqviz4wT3/AIWuZJ3vLi1Sxmj3QsZRHGi4LbSpDjqcdM+9eh+GP+KS+1f8Lo/f/atn9lf2r/xMsbc+ds2+Z5f3os9M8dccAHoEXif/AIQ74G6Rr32P7Z9l0qx/ceb5e7csafewcY3Z6dq0Phx46/4WB4euNW/s77B5N21t5Xn+bnCI27O1f7+MY7Vh/FeaxufgRfz6WIxp8lvaPaiOPYoiM0RTC4G0bccYGK4T4KfETwr4R8G3lhrmq/ZLqTUHmVPs8smUMcYByikdVP5UAY/7OP8AyUPUP+wVJ/6Nir0/WfjB/ZHxQj8F/wBhebvu7a2+2fa9uPOCHds2Hpv6bucdq4D4j+NfBMfh63Pw7uoNO1f7Womm0yzkspGg2PuUuEXK7th256gHHFeb+Er+81P4neHby/u57u6k1W03zTyGR2xIgGWPJwAB+FAHq/7TX/Mrf9vf/tGqGhftD/2J4e0zSf8AhFvO+w2kVt5v9obd+xAu7HlnGcZxk17/AKnoWj635X9raVY3/k58v7XbpLszjONwOM4HT0FcPZ3Pwl1DxQ3hq10nQ5NXWWSE2/8AYwGHjDFxuMe3ja3fnHFAHD/8NNf9Sj/5Uv8A7VR/w01/1KP/AJUv/tVdx4kufhL4R1GOw1zSdDtLqSITKn9jCTKEkA5SMjqp/Ksf/hMvgZ/z66H/AOCJv/jNAHkEXif/AITH45aRr32P7H9q1Wx/ceb5m3a0afewM5256d6+v68r0nxZ8GrnWbGDS7bRhqElxGlqY9FZGEpYBMN5Q2ndjnIxXqlABRRRQAUUUUAef/G3/kkOu/8Abv8A+lEdfIFff9fMH7R3/JQ9P/7BUf8A6NloAP8Aho7xh/0DdD/78Tf/AB2ty68Fab8Q/h9qHxM1ae7h1qeyuLhoLR1W3DQBo0AVlZsERLn5upOMdvJ/BXgrUvHmszaXpc9pDPFbtcM107KpUMq4G1WOcuO3rX0nbeG7zwj8AdU0O/kgkurXSr/e8DEodwlcYJAPRh2oA8Y+D/w40f4gf2z/AGtc30P2HyPL+yOi53+ZnO5W/uDpjvXvfi7Upvhz8K5LjR1jnfSbe2t4BdgsGUOkWW2lcnac8Y5/KvmTwL8ONY+IH2/+ybmxh+w+X5n2t3XO/djG1W/uHrjtX0nr/grUtV+DUXg+Ce0XUEsrS3Mjuwi3RGMschScfIccenSgDg/Dfhuz+O+nSeKPFEk9nfWsp09I9MYRxmNQJASJA53ZlbnOMAcep4k8N2fwI06PxR4XknvL66lGnvHqbCSMRsDISBGEO7MS85xgnj07z4TeCtS8B+FbrS9UntJp5b17hWtXZlClEXB3KpzlD29K5f4TfCbXvAfiq61TVLvTZoJbJ7dVtZHZgxdGydyKMYQ9/SgDmPDXx98Vaz4q0jS7jT9GWC9vYbeRo4ZQwV3CkjMhGcH0Net+Ovhxo/xA+wf2tc30P2HzPL+yOi537c53K39wdMd68s+LXwm17VfEXiDxhBd6aunpbi4MbyOJdsUChhgIRn5Djn06V4HQB7xZ+JLzxV4ob4P30cEfh6GWTT1uYFIuzHahmjJYkpuJhXcdmDk4A4weJPEl58CNRj8L+F44LyxuohqDyampkkEjExkAxlBtxEvGM5J59PL/AId+JLPwj4703XL+OeS1tfN3pAoLndE6DAJA6sO9eoeJPDd58d9Rj8UeF5ILOxtYhp7x6mxjkMikyEgRhxtxKvOc5B49QDg/hN4K03x54qutL1Se7hgisnuFa1dVYsHRcHcrDGHPb0r2P/hnHwf/ANBLXP8Av/D/APGq5jw34bvPgRqMnijxRJBeWN1EdPSPTGMkgkYiQEiQINuIm5znJHHp5f8AETxJZ+LvHepa5YRzx2t15WxJ1AcbYkQ5AJHVT3oA9X8T/wDGP32X/hFP9N/tvf8Aaf7V/ebPJxt2eXsxnzWznPQdO/kmmeNdS0rx4/jCCC0bUHuJ7gxujGLdKGDDAYHHznHPp1rm6+o/hj8WdB1WHw74PgtNSXUEsktzI8aCLdFDljkOTj5Djj06UAeef8NHeMP+gbof/fib/wCO1seG/El58d9Rk8L+KI4LOxtYjqCSaYpjkMikRgEyFxtxK3GM5A59foevH/8Aho7wf/0Ddc/78Q//AB2gDxzX/BWm6V8ZYvB8E922nve2luZHdTLtlEZY5CgZ+c449Otanxg+HGj/AA//ALG/sm5vpvt3n+Z9rdGxs8vGNqr/AHz1z2rL1/xrpuq/GWLxhBBdrp6XtpcGN0US7YhGGGAxGfkOOfTpX0n4F+I+j/ED7f8A2TbX0P2Hy/M+1oi537sY2s39w9cdqAPFNf8AhNoOlfBqLxhBd6k2oPZWlwY3kQxbpTGGGAgOPnOOfTrXL+Cvizr3gPRptL0u002aCW4a4ZrqN2YMVVcDa6jGEHb1r6H0z4s6Dqvjx/B8FpqS6glxPbmR40EW6IMWOQ5OPkOOPTpXeUAeP/tHf8k80/8A7Csf/oqWvnTw1psOs+KtI0u4aRYL29ht5GjIDBXcKSMgjOD6Gvq/4s+CtS8eeFbXS9LntIZ4r1LhmunZVKhHXA2qxzlx29a4vRPiPo/wk0eDwPr9tfXOp6Zu86WwRHhbzGMq7S7Kx+WRQcqOQevWgDgPjB8ONH+H/wDY39k3N9N9u8/zPtbo2Nnl4xtVf75657Vn/BL/AJK9oX/bx/6TyVofGD4j6P8AED+xv7Jtr6H7D5/mfa0Rc7/Lxjazf3D1x2rP+CX/ACV7Qv8At4/9J5KAPr+vgCvYP2jv+Sh6f/2Co/8A0bLXd/Cb4Ta94D8VXWqapd6bNBLZPbqtrI7MGLo2TuRRjCHv6UAY/wAJfhNoOq+HfD/jCe71JdQS4NwI0kQRbop2CjBQnHyDPPr0r0zx18ONH+IH2D+1rm+h+w+Z5f2R0XO/bnO5W/uDpjvXJ/E74s6DpUPiLwfPaak2oPZPbiRI0MW6WHKnJcHHzjPHr1ryz4P/ABH0f4f/ANs/2tbX0327yPL+yIjY2eZnO5l/vjpnvQB9F6n4K03VfAaeD557tdPS3gtxIjqJdsRUqclSM/IM8evSvmD4s+CtN8B+KrXS9Lnu5oJbJLhmunVmDF3XA2qoxhB29aNA8a6bpXxll8YTwXbae97d3AjRFMu2USBRgsBn5xnn160fFnxrpvjzxVa6ppcF3DBFZJbst0iqxYO7ZG1mGMOO/rQBwdfQfwl+E2g6r4d8P+MJ7vUl1BLg3AjSRBFuinYKMFCcfIM8+vSqnhvw3efAjUZPFHiiSC8sbqI6ekemMZJBIxEgJEgQbcRNznOSOPTp/wDho7wf/wBA3XP+/EP/AMdoA0PjB8R9Y+H/APY39k21jN9u8/zPtaO2Nnl4xtZf75657V458KNSm1n472GqXCxrPe3F3cSLGCFDPDKxAyScZPqa7PxP/wAZA/Zf+EU/0L+xN/2n+1f3e/zsbdnl7848ps5x1HXt6pJqUPw5+GVlcawsk6aTZW1vOLQBizAJFldxXI3HPOOPyoA8M/aO/wCSh6f/ANgqP/0bLXf/APDOPg//AKCWuf8Af+H/AONV3ngrxrpvjzRptU0uC7hgiuGt2W6RVYsFVsjazDGHHf1r5I8FeCtS8eazNpelz2kM8Vu1wzXTsqlQyrgbVY5y47etAH0PpPwC8K6NrNjqlvqGstPZXEdxGsk0RUsjBgDiMHGR6ivVK8b8HeNdN+Hh0r4Z6tBdza1BcLbtPaIrW5aeTzEIZmVsASrn5eoOM9/ZKACiiigAooooAK4PxroHw31XWYZ/GE2mpqC26pGLrUjbt5W5iMKHXI3FucevpXeV5f8AEf4P/wDCwPENvq39u/YPJtFtvK+yebnDu27O9f7+MY7UAecfBSwvPB3jK81HxRaT6HYyae8CXOpxm2jaQyRsEDSYBYhWOOuFPpXufiaeHXfhzrr6PLHqCXOmXSQNaMJRK3luuF253Hdxgd+K8j/4Sf8A4aB/4pT7H/YP2T/iZfavN+1b9n7vZswmM+bnOf4cY54P+Fm/8Kc/4oL+yP7X/sr/AJfvtP2fzfN/ff6vY+3HmbfvHOM8ZxQBwHhiP4o+DvtX9gaLrln9q2ed/wAShpN23O378Zxjc3T1r0f4d+JfitqHjvTbXxLb6qmkP5v2gz6SsKDETlcuIxj5gvfnpVf/AIaa/wCpR/8AKl/9qroPBPx0/wCEx8X2Ogf8I59j+1eZ+/8At3mbdsbP93yxnO3HXvQBj/Gv4ieKvCPjKzsND1X7JayaekzJ9niky5kkBOXUnoo/KuY/4TL45/8APrrn/giX/wCM0ftHf8lD0/8A7BUf/o2WvT/hx8YP+FgeIbjSf7C+weTaNc+b9r83OHRduNi/385z2oA8ktviV44ufEtr4d8X6nJb6fdXEVtqdtd2cVuRbyEBwx2KyAox+bIIByCOtXPib4J8Oyf2X/wrXT/7Tx5v2/8AsqaS+8v7nl78M+zP7zHTOD1xXf8Ajb4F/wDCY+L77X/+Ej+x/avL/cfYfM27Y1T73mDOdueneug+GXwy/wCFc/2p/wATf+0Pt/lf8u3lbNm//bbOd/t0oA8w1nwV4JPwvjTR7WCbxx9ktg9lBeSS3YnynnqbfeSGA8zcu35cHgY45fw3c/Frwjp0lhoek65aWskpmZP7GMmXIAJy8ZPRR+VbHg3/AJOhuf8AsK6l/wCgzV6f8R/jB/wr/wAQ2+k/2F9v860W5837X5WMu67cbG/uZznvQB4x4kufi14u06Ow1zSdcu7WOUTKn9jGPDgEA5SMHox/Ouo0bwV4JHwvkTWLWCHxx9kuQllPeSRXZny/kKLfeCWI8vau35sjg55v/wDDTX/Uo/8AlS/+1VwEXif/AITH45aRr32P7H9q1Wx/ceb5m3a0afewM5256d6AOg+GXgnw7H/an/CytP8A7Mz5X2D+1ZpLHzPv+Zsyyb8fu89cZHTNex6V4D+HfhN7fxTYW1pZJCm+LUH1CQxBZF2g7ncoQwfAPuMdqj+Jvwy/4WN/Zf8AxN/7P+web/y7ebv37P8AbXGNnv1rz/8A4Sf/AIS3/iy/2P7J5P8AxLf7X83zM/ZPm3+Tgff8npv43dTjkA9g/wCE78H/APQ16H/4MYf/AIqvizTdJ1LWbhrfS9Pu76dULtHawtKwXIGSFBOMkDPuK6T4j+Bf+Ff+IbfSf7R+3+daLc+b5HlYy7rtxub+5nOe9en/APCMf8M/f8VX9s/t77X/AMS37L5X2XZv/eb9+XzjysYx/FnPHIBqeAvhN4Sm+HllqXi3QZLfUFSZ7x7uee3KKsj4LLuUKAgBzgcc13ngXRvA2kfb/wDhC5bGTzfL+1/ZL83OMbtmcu23q/pnn0rPl8T/APCY/A3V9e+x/Y/tWlX37jzfM27VkT72BnO3PTvXgHwy+Jv/AArn+1P+JR/aH2/yv+Xnytmzf/sNnO/26UAXNY0fx1o3xS1rXtB0LWVnXU7t7a5j015VKu7jIyhUgqx5560al8V/iro1wtvqmo3djOyB1jutMhiYrkjIDRg4yCM+xr6j0LU/7b8PaZq3k+T9utIrnyt27ZvQNtzgZxnGcCvnD9o7/koen/8AYKj/APRstAB/wmXxz/59dc/8ES//ABmuP1vw/wDEDxHrE+rat4c1y4vp9vmS/wBlyJu2qFHCoAOABwK+n/iP46/4V/4et9W/s77f512tt5Xn+VjKO27O1v7mMY71oeCfE/8AwmPhCx1/7H9j+1eZ+483zNu2Rk+9gZztz070AfGGp6FrGieV/a2lX1h52fL+127xb8YzjcBnGR09RX0/4F8FeCfDnhnw/wCMJbWCxvl0+CaS/nvJFRXliCsSGfYMlyOnfjtXH/tNf8yt/wBvf/tGqGheOv8AhZHh7TPhZ/Z39nefaRW39pef5237Ogk3eVtXO7ysY3cbu+OQDD+PurabrPjqxuNL1C0voF0yNGktZllUN5spwSpIzgg49xXrfxH8cXsnh63Hw71eDUdX+1qZodMEd7IsGx9zFAGwu7YN2OpAzzXH/wDDMv8A1N3/AJTf/ttYH7OP/JQ9Q/7BUn/o2KgDi5Jr7WfibZP45Ekc9xe2yaj9rj+ykRZRTuAC7B5eOeOOfevoPTPhh8JNb83+ybSxv/Jx5n2TVZZdmc4ztlOM4PX0NeIfG3/kr2u/9u//AKTx13/7Mv8AzNP/AG6f+1qANj4ifB/wxp/gTUrrw14cnfV08r7OIJZ5nOZUDYQsc/KW7cda8I/4QTxh/wBCprn/AILpv/ia9v139of+xPEOp6T/AMIt532G7ltvN/tDbv2OV3Y8s4zjOMmvQPhx46/4WB4euNW/s77B5N21t5Xn+bnCI27O1f7+MY7UAfLHiT4ieKvF2nR2Guar9rtY5RMqfZ4o8OAQDlFB6MfzqTwb4N1XXNe0SWXQNSudFuL2JJ50tpPKaLzAsn7xRgADcCQeMHpipPhx4F/4WB4huNJ/tH7B5No1z5vkebnDou3G5f7+c57V6f8A8LN/4U5/xQX9kf2v/ZX/AC/fafs/m+b++/1ex9uPM2/eOcZ4zigD1DTNG8DfDPzfs0tjon9oY3fa78jzvLzjHmuem/t/eGe1eEfEbxP8QtSXXra5F9L4Rku2MM409RA8AlzCyzBOVOEw275sjk5rH+JvxN/4WN/Zf/Eo/s/7B5v/AC8+bv37P9hcY2e/Wvf4vDH/AAmPwN0jQftn2P7VpVj+/wDK8zbtWN/u5Gc7cde9AHz54K1/4kaVo00Hg+HUn09rhnkNrpouF83aoOWKNg7QvGfT1rrPgpYXng7xleaj4otJ9DsZNPeBLnU4zbRtIZI2CBpMAsQrHHXCn0rX/wCEn/4Z+/4pT7H/AG99r/4mX2rzfsuzf+72bMPnHlZzn+LGOOeg/aO/5J5p/wD2FY//AEVLQB2A8FeCfEeuQ+MIrWC+vmlSaO/gvJGRniwqkBX2HBQDp25712Fef/BL/kkOhf8Abx/6USV6BQAUUUUAFFFFABRXL/ETxJeeEfAmpa5YRwSXVr5WxJ1JQ7pUQ5AIPRj3rwj/AIaO8Yf9A3Q/+/E3/wAdoA6f4KfDvxV4R8ZXl/rmlfZLWTT3hV/tEUmXMkZAwjE9FP5VufE7X/hvBD4i07UYdNPig2TorvppeXzWh/dfvdhGcFMHdxx0xVf4TfFnXvHniq60vVLTTYYIrJ7hWtY3ViwdFwdzsMYc9vSvJPjb/wAle13/ALd//SeOgDQ+D+s+BtI/tn/hNIrGTzfI+yfa7A3OMeZvxhG29U9M8eler/EPT/D+mfCi88T+FdOsdOumit5rPULC1W2mVJJIxlWUBl3IxB6cEg15R8H/AIcaP8QP7Z/ta5vofsPkeX9kdFzv8zOdyt/cHTHevY/ivpsOjfAi/wBLt2kaCyt7S3jaQgsVSaJQTgAZwPQUAeefDjxr4Jk8PXB+Il1BqOr/AGthDNqdnJeyLBsTaoco2F3bztz1JOOa5f4KeKdG8I+Mry/1y8+yWsmnvCr+U8mXMkZAwgJ6Kfyrc+E3wm0Hx54VutU1S71KGeK9e3VbWRFUqERsncjHOXPf0o+LPwm0HwH4VtdU0u71KaeW9S3ZbqRGUKUdsjainOUHf1oAueOH8e+INT1Txf4Q1TVT4RMXnQzwaibdAkUYWUiIurDDo/8ADzjIznk+D/xUtdI/tn/hNPE19J5vkfZPtbT3OMeZvxgNt6p6Z49K5/wP8R9Yk0zS/h2bax/si/l/s+WYI/nrHcSEOVbdt3DzGwSpHAyDR8YPhxo/w/8A7G/sm5vpvt3n+Z9rdGxs8vGNqr/fPXPagDn3OqeI/irqMvg+edr691C6mspYJvs7shLtkMxXblM9SPT2rc1L4UfFXWbhbjVNOu76dUCLJdanDKwXJOAWkJxkk49zXq/wx+E2g6VD4d8YQXepNqD2SXBjeRDFulhwwwEBx85xz6da9coA+PPhNqfhTSvFV1P4wjtH09rJ0jF1aG4Xzd6EYUK2DtDc49fWve9R07wVffDXVfE3hnR9KTZp9zPZX1vp6wSRyRq+HQ7QysrrweCCMivLPiz8JtB8B+FbXVNLu9SmnlvUt2W6kRlClHbI2opzlB39ay/A/wAR9Yk0zS/h2bax/si/l/s+WYI/nrHcSEOVbdt3DzGwSpHAyDQB0Hwf+KlrpH9s/wDCaeJr6TzfI+yfa2nucY8zfjAbb1T0zx6Vy/ivwv4u0/VtW+IGnQz2ukXF3Je2upQXaRuYZ5D5bABhIu4SDjAI3cgc16v/AMM4+D/+glrn/f8Ah/8AjVcxZ+JLzxV4ob4P30cEfh6GWTT1uYFIuzHahmjJYkpuJhXcdmDk4A4wAeJ6lq2pazcLcapqF3fTqgRZLqZpWC5JwCxJxkk49zXrnwUv7zxj4yvNO8UXc+uWMenvOltqchuY1kEkahwsmQGAZhnrhj61yfxZ8Fab4D8VWul6XPdzQS2SXDNdOrMGLuuBtVRjCDt616X4k8N2fwI06PxR4XknvL66lGnvHqbCSMRsDISBGEO7MS85xgnj0ALGs+CvGw+KEaaPazw+B/tdsHsoLyOK0MGE89Tb7wCpPmbl2/Nk8HPOB+0PoWj6J/wjn9k6VY2HnfafM+yW6Rb8eVjO0DOMnr6mvU9A8a6lqvwal8YTwWi6glld3AjRGEW6IyBRgsTj5Bnn16V534Y/4yB+1f8ACV/6F/Ymz7N/ZX7vf52d2/zN+ceUuMY6nr2AOEl074qaL4Og11tR1m10FLeF4pI9XwqxPtEeEWTIHzKMY49q4fUtW1LWbhbjVNQu76dUCLJdTNKwXJOAWJOMknHua+z9T8FabqvgNPB8892unpbwW4kR1Eu2IqVOSpGfkGePXpXB/wDDOPg//oJa5/3/AIf/AI1QBxHwUv7zxj4yvNO8UXc+uWMenvOltqchuY1kEkahwsmQGAZhnrhj61j/ABS13WPDPxH1bSNA1W+0rTLfyfJsrC4eCGLdCjNtRCFGWZicDkknvXb+JPDdn8CNOj8UeF5J7y+upRp7x6mwkjEbAyEgRhDuzEvOcYJ49LGifDjR/i3o8HjjX7m+ttT1Pd50Vg6JCvlsYl2h1Zh8sak5Y8k9OlAHkGmaN45+Jnm/Zpb7W/7Pxu+134Pk+ZnGPNcddnb+6M9q9A+Fvwt8ZeHPiPpOrato32exg87zJftUL7d0LqOFck8kDgVf8T/8Y/fZf+EU/wBN/tvf9p/tX95s8nG3Z5ezGfNbOc9B07+ia/411LSvg1F4wggtG1B7K0uDG6MYt0pjDDAYHHznHPp1oA5f4s6B8SNV8VWs/g+bUk09bJEkFrqQt183e5OVLrk7SvOPT0r1DTfDWg6NcNcaXomm2M7IUaS1tUiYrkHBKgHGQDj2Fcv8JvGupePPCt1qmqQWkM8V69uq2qMqlQiNk7mY5y57+lcv8Jvizr3jzxVdaXqlppsMEVk9wrWsbqxYOi4O52GMOe3pQB5x8SJrG2/aIln1QRnT472xe6Eke9TEI4S+Vwdw254wc11fif8A4q37L/wpf9x9l3/2r/ZX/Etzux5O/d5fmfdlx1xz0zzynxI02HWf2iJdLuGkWC9vbG3kaMgMFeOFSRkEZwfQ1734F+HGj/D/AO3/ANk3N9N9u8vzPtbo2Nm7GNqr/fPXPagDh/iF4UsNO+Bc17e6LYx+IUtLM3d4YI2nM5kiErNKASzElstk5yeTmvnzTfEuvaNbtb6XrepWMDOXaO1uniUtgDJCkDOABn2FfVfxt/5JDrv/AG7/APpRHXknwm+E2g+PPCt1qmqXepQzxXr26rayIqlQiNk7kY5y57+lAFz4j+NfBMfh63Pw7uoNO1f7Womm0yzkspGg2PuUuEXK7th256gHHFeL31/eaneSXl/dz3d1JjfNPIZHbAAGWPJwAB+Fdp8JvBWm+PPFV1peqT3cMEVk9wrWrqrFg6Lg7lYYw57elen+JfgF4V0bwrq+qW+oay09lZTXEayTRFSyIWAOIwcZHqKAPnSvqfxJf3mmfs1Wd5YXc9pdR6Vp2yaCQxuuTCDhhyMgkfjXyxXean8Wde1XwGng+e001dPS3gtxIkbiXbEVKnJcjPyDPHr0oA9b+ClhZ+MfBt5qPii0g1y+j1B4EudTjFzIsYjjYIGkyQoLMcdMsfWvFNNj8b/Ea4bR7e+1LWXhQ3Rt7q/JVQCF3jzHAz8+PXk+9aHgr4s694D0abS9LtNNmgluGuGa6jdmDFVXA2uoxhB29a9L8SeG7P4EadH4o8LyT3l9dSjT3j1NhJGI2BkJAjCHdmJec4wTx6AHQfDrxTo3gzQdH8C6/efY/EsUphey8p5MPNKzxjegKcrIh+9xnnGDXrFeN+DvBWm/EM6V8TNWnu4danuFuGgtHVbcNBJ5aAKys2CIlz83UnGO3slABRRRQAUUUUAY/inxJZ+EfDl3rl/HPJa2uzekCgudzqgwCQOrDvXm/wDw0d4P/wCgbrn/AH4h/wDjteoa3omneI9Hn0nVrf7RYz7fMi3sm7awYcqQRyAeDXyx8a/C2jeEfGVnYaHZ/ZLWTT0mZPNeTLmSQE5ck9FH5UAe9+CvizoPjzWZtL0u01KGeK3a4ZrqNFUqGVcDa7HOXHb1ri/Gvw41iP4mXPxENzY/2RYSwahLCHfz2jt0QuFXbt3Hy2wCwHIyRXjmmyeN/hzcNrFvY6lozzIbU3F1YEKwJDbB5iEZ+TPrwfetCf4sfEHXbeXR31eS6S/Q2rW8dlDulDjbsG1M5Occc88UAeh+J/8AjIH7L/win+hf2Jv+0/2r+73+djbs8vfnHlNnOOo69vJNM8Falqvjx/B8E9ouoJcT25kd2EW6IMWOQpOPkOOPTpW54Yj+KPg77V/YGi65Z/atnnf8ShpN23O378Zxjc3T1r0e9stCsPC6+IvDrwN8T2ijmlignM139qkKi6BtSSAwDTbl2fLzwNvAB3nwm8Fal4D8K3Wl6pPaTTy3r3CtauzKFKIuDuVTnKHt6UeCvizoPjzWZtL0u01KGeK3a4ZrqNFUqGVcDa7HOXHb1rxz/hMvjn/z665/4Il/+M17H4K0D4b6VrM0/g+bTX1BrdkkFrqRuG8rcpOVLtgbgvOPT1oA8I+K+mzaz8d7/S7do1nvbi0t42kJChnhiUE4BOMn0Nex/B/4cax8P/7Z/ta5sZvt3keX9kd2xs8zOdyr/fHTPevHPivNfW3x3v59LEh1CO4tHtRHHvYyiGIphcHcd2OMHNan/CZfHP8A59dc/wDBEv8A8ZoA6P4tfFnQdV8O+IPB8FpqS6glwLcyPGgi3RTqWOQ5OPkOOPTpXnHgr4Ta9480abVNLu9NhgiuGt2W6kdWLBVbI2owxhx39a5e5tta1zxLdRS2d3c61cXErzwJbnzWlyWk/dqMgg7iQBxg9MV2nhu5+LXhHTpLDQ9J1y0tZJTMyf2MZMuQATl4yeij8qAKfjX4Ta94D0aHVNUu9NmgluFt1W1kdmDFWbJ3IoxhD39K9v8Ahvps2s/s7xaXbtGs97ZX1vG0hIUM8kygnAJxk+hrxzxJc/Frxdp0dhrmk65d2scomVP7GMeHAIBykYPRj+dZ9j8Q/H3gmzj8PQ30+mR2mcWk9jGHj3kvzvTdzuzz6+lAFfx18ONY+H/2D+1rmxm+3eZ5f2R3bGzbnO5V/vjpnvVzU/hNr2leA08YT3emtp728FwI0kcy7ZSoUYKAZ+cZ59etdp4F13R/iR9v/wCFp6rY3H2Dy/7O+13CWW3fu83HllN/3I+uccdM8+16npnhSfwGmnajJaDwuLeBFd7spF5SlfK/e7gcZCYO7njrmgDg/wBnH/knmof9hWT/ANFRUf8ADR3g/wD6Buuf9+If/jtdR4b1L4beEdOksND1/Q7S1klMzJ/aqSZcgAnLuT0UflXyx/wgnjD/AKFTXP8AwXTf/E0Ae73/AMa/DfjHTrnwvp1lqsV9rMT6fbyXEUaxrJMDGpciQkKCwyQCcdjXEf8ADOPjD/oJaH/3/m/+NV0/w68MfD3SdB0e98UGx03xVaymaWO/1BreaJ1lZoi0TOMfKEIyvIIPOa9o0zXdH1vzf7J1Wxv/ACceZ9kuEl2ZzjO0nGcHr6GgDDk1KH4c/DKyuNYWSdNJsra3nFoAxZgEiyu4rkbjnnHH5VY8FeNdN8eaNNqmlwXcMEVw1uy3SKrFgqtkbWYYw47+tfOnjrxr428R+JvEHg+K6nvrFtQnhjsILONnZIpSygFU3nAQHr25716P8FL+z8HeDbzTvFF3Bod9JqDzpbanILaRozHGocLJglSVYZ6ZU+lAHonjXxrpvgPRodU1SC7mgluFt1W1RWYMVZsncyjGEPf0rg/+GjvB/wD0Ddc/78Q//Ha8U1Lxd48+I1uuj3El3rKQuLoW9rYoWUgFd58tAcfPj05HtWPP4L8VWtvLcXHhrWYYIkLySSWEqqigZJJK4AA5zQB7H4n/AOMgfsv/AAin+hf2Jv8AtP8Aav7vf52Nuzy9+ceU2c46jr24z4UabNo3x3sNLuGjaeyuLu3kaMkqWSGVSRkA4yPQVyfhjxt4i8Hfav7A1D7H9q2ed+5jk3bc7fvqcY3N09a6j4Q31xqfxv0y/vJPMurqW6mmfaBudoZSxwOBkk9KANj9o7/koen/APYKj/8ARstd38JvhNr3gPxVdapql3ps0Etk9uq2sjswYujZO5FGMIe/pXCftHf8lD0//sFR/wDo2Wvf/wDhO/B//Q16H/4MYf8A4qgD5g+Nv/JXtd/7d/8A0njrQ+D/AMR9H+H/APbP9rW19N9u8jy/siI2NnmZzuZf746Z70eMzpfib9oRI454L/TL7ULGF3gm3JKhSJGAdT9RweK6D4wfCu10j+xv+EL8M30nm+f9r+yLPc4x5ezOS23q/pnn0oA4vQPGum6V8ZZfGE8F22nve3dwI0RTLtlEgUYLAZ+cZ59etd54k8N3nx31GPxR4Xkgs7G1iGnvHqbGOQyKTISBGHG3Eq85zkHj18fvvCfiTTLOS8v/AA/qtpax43zT2UkaLkgDLEYGSQPxrpPBWv8AxI0rRpoPB8OpPp7XDPIbXTRcL5u1QcsUbB2heM+nrQB9h143r/wm17VfjLF4wgu9NXT0vbS4MbyOJdsQjDDAQjPyHHPp0rL+CnxE8VeLvGV5Ya5qv2u1j095lT7PFHhxJGAcooPRj+dHxE8S/FbT/HepWvhq31V9ITyvs5g0lZkOYkLYcxnPzFu/HSgCv+01/wAyt/29/wDtGsTwd4K1L4eDSviZq09pNosFutw0Fo7NcFZ4/LQBWVVyDKufm6A4z32/DH/FW/av+F0fuPsuz+yv7V/4lud2fO2bfL8z7sWeuOOmeeQ8caz45Gmapo6RX3/CDxS+TZyCwBgNqkg+zlZ9mWXAjw247uOTnkA9P/4aO8H/APQN1z/vxD/8drxz4TeNdN8B+KrrVNUgu5oJbJ7dVtUVmDF0bJ3MoxhD39K5fTfDWvazbtcaXompX0CuUaS1tXlUNgHBKgjOCDj3FXP+EE8Yf9Cprn/gum/+JoA+x/C3iSz8XeHLTXLCOeO1ut+xJ1AcbXZDkAkdVPetivmT4f6j8VNF1LQNCXTtZtdBS9jSWOTSMKsTy5ky7R5A+ZjnPHtX03QAUUUUAFFFFABXzB+0d/yUPT/+wVH/AOjZa+n6+YP2jv8Akoen/wDYKj/9Gy0Ad/8AtHf8k80//sKx/wDoqWvnDQtT/sTxDpmreT532G7iufK3bd+xw23ODjOMZwa9o8N2Wu+FdRkvvjA88/h6SIw266nONQjF0SCpEYMmG2LL82OBkZ5weX8ceB73xBqeqeL/AAhpEB8ImLzoZ4DHboEijCykREqww6P/AA84yM55AOv/AOGmv+pR/wDKl/8Aaq5D4Yan/bf7QFrq3k+T9uu7258rdu2b4pW25wM4zjOBR8H9Z8DaR/bP/CaRWMnm+R9k+12BucY8zfjCNt6p6Z49K6zwH4B1yD4wQeLLXSY4vC89xdXNpPHJEq/Z5Y5PJIjDblBDp8u0EZ5AxQB9B18wfs4/8lD1D/sFSf8Ao2Kvp+vB/El7oXirTo7H4PpBB4hjlE1w2mQHT5DagEMDIRHld7RfLnk4OOMgA2PG3wy8vxfffEr+18/2d5epf2f9m/1n2aNTs8zfxu8vrtOM9Diuf/4aa/6lH/ypf/aq9U8BaXq8Pw8stN8WpJcagyTJeJdyi4Lq0j4DNlgwKEDGTxxXnfxg+Fd1q/8AY3/CF+GbGPyvP+1/ZFgts58vZnJXd0f1xz60AeQaN46/sj4oSeNP7O83fd3Nz9j8/bjzg4279p6b+u3nHavp/wCHHjr/AIWB4euNW/s77B5N21t5Xn+bnCI27O1f7+MY7V8cX9jcaZqNzYXkfl3VrK8MybgdrqSGGRwcEHpVzTfEuvaNbtb6XrepWMDOXaO1uniUtgDJCkDOABn2FAH038OPjB/wsDxDcaT/AGF9g8m0a5837X5ucOi7cbF/v5zntWf42+Bf/CY+L77X/wDhI/sf2ry/3H2HzNu2NU+95gznbnp3rH+Cnw78VeEfGV5f65pX2S1k094Vf7RFJlzJGQMIxPRT+VeoXvxE8K6f4oXw1dar5ertLHCLf7PKcvIFKDcF287l78Z5oA+aPib8Mv8AhXP9l/8AE3/tD7f5v/Lt5WzZs/22znf7dK0NZ+MH9r/C+PwX/YXlbLS2tvtn2vdnySh3bNg67Om7jPevT/jp4J8ReMf7B/sDT/tn2X7R5376OPbu8vb99hnO1unpXkH/AApL4h/9C9/5O2//AMcoA0Phx8H/APhYHh641b+3fsHk3bW3lfZPNzhEbdnev9/GMdq+r6+LNSj8b/Dm4XR7i+1LRnmQXQt7W/IVgSV3ny3Iz8mPXge1e3+NfGJ+IejQ6T8M9Yu59ahuFuZltXks2FuFZWJd9gI3PH8uc9DjjgAk8bfAv/hMfF99r/8Awkf2P7V5f7j7D5m3bGqfe8wZztz071z/APybn/1MP9u/9unkeR/383bvO9sbe+ePMNb8QfEDw5rE+k6t4j1y3voNvmRf2pI+3coYcq5B4IPBr0/4F/8AFa/29/wlf/E++yfZ/s39q/6V5O/zN2zzM7c7VzjrtHpQB0Hgn4ZeZ4vsfiV/a+P7R8zUv7P+zf6v7TGx2eZv52+Z12jOOgzXAftHf8lD0/8A7BUf/o2WvpuCCG1t4re3ijhgiQJHHGoVUUDAAA4AA4xXzJ+0d/yUPT/+wVH/AOjZaAOP+HHjr/hX/iG41b+zvt/nWjW3lef5WMujbs7W/uYxjvX0fL4n/wCEx+Bur699j+x/atKvv3Hm+Zt2rIn3sDOduenevFPgFpOm6z46vrfVNPtL6BdMkdY7qFZVDebEMgMCM4JGfc0fEq51q2+J+o+EPDt5d2mnzvBa2+l2lwYLcmWJMoIwQgDM5J6AliT1NAHldfR/wr+D/wDZF94e8af275u+0Fz9j+ybcedCRt37z039dvOO1YHgXQtH+G/2/wD4WnpVjb/b/L/s77Xbpe7tm7zceWH2ffj64zx1xxX+Hviu/wBR+OkNlZa1fSeHnu7wWlmJ5FgEAjlMSrESAqgBcLgYwOBigCv+0d/yUPT/APsFR/8Ao2WvH6+h/jX8O/FXi7xlZ3+h6V9rtY9PSFn+0RR4cSSEjDsD0YfnXoHiTTfht4R06O/1zQNDtLWSUQq/9lJJlyCQMIhPRT+VAHlHwr+D/wDa9j4e8af275Wy7Fz9j+ybs+TMRt37x12ddvGe9fR9fJHijxXf6h8QJdO+H+tX1tpFzLDDp9pYTyWkIdlQELHlQmZC2eBkknvmq/ieT4o+Dvsv9v61rln9q3+T/wATdpN23G77khxjcvX1oA+n/G3hj/hMfCF9oH2z7H9q8v8Af+V5m3bIr/dyM5246968f/4Sf/hn7/ilPsf9vfa/+Jl9q837Ls3/ALvZsw+ceVnOf4sY454i9tvi1p/hdfEt1q2uR6Q0UcwuP7ZJykhUIdok3c7l7cZ5rqPhx418EyeHrg/ES6g1HV/tbCGbU7OS9kWDYm1Q5RsLu3nbnqScc0Aef/Djx1/wr/xDcat/Z32/zrRrbyvP8rGXRt2drf3MYx3r6v8ABPif/hMfCFjr/wBj+x/avM/ceb5m3bIyfewM5256d68c8a2vhD4h6NDpPwz0zTZ9ahuFuZltbFbNhbhWViXdUBG54/lznoccceZh/HvhzXIfB8WqarY3yypDHYQaiVRXlwygFX2DJcHr3570Aen/ALTX/Mrf9vf/ALRrkNZ+MH9r/C+PwX/YXlbLS2tvtn2vdnySh3bNg67Om7jPejU/hh8W9b8r+1rS+v8Ayc+X9r1WKXZnGcbpTjOB09BW54u1LwBZ/CuTw/Fa6bD4xtLe2trgJp2JVuI3QTDzgmCflfLBiDzyc0AYfw4+MH/Cv/D1xpP9hfb/ADrtrnzftflYyiLtxsb+5nOe9fV9eF/ALw1oOs+Bb641TRNNvp11ORFkurVJWC+VEcAsCcZJOPc14p/wnfjD/oa9c/8ABjN/8VQB9v0V4/8ACz4p6C/hXRNG1nX55/EM0rQss8c0ru7zMIwZNpB4Kjk8e2K9goAKKKKACiiigDl/iJ4kvPCPgTUtcsI4JLq18rYk6kod0qIcgEHox715f4b8N2fx306TxR4okns761lOnpHpjCOMxqBICRIHO7Mrc5xgDj19g8U+JLPwj4cu9cv455LW12b0gUFzudUGASB1Yd6+VPiz4103x54qtdU0uC7hgiskt2W6RVYsHdsjazDGHHf1oAPGvxZ17x5o0Ol6paabDBFcLcK1rG6sWCsuDudhjDnt6V7v8KNNh1n4EWGl3DSLBe293byNGQGCvNKpIyCM4Poa8I+E3jXTfAfiq61TVILuaCWye3VbVFZgxdGydzKMYQ9/SvY/+GjvB/8A0Ddc/wC/EP8A8doAP+GcfB//AEEtc/7/AMP/AMariL/41+JPB2o3PhfTrLSpbHRpX0+3kuIpGkaOEmNS5EgBYhRkgAZ7CtfxP/xkD9l/4RT/AEL+xN/2n+1f3e/zsbdnl7848ps5x1HXtxnwo02bRvjvYaXcNG09lcXdvI0ZJUskMqkjIBxkegoA1P8Aho7xh/0DdD/78Tf/AB2un8SeG7P4EadH4o8LyT3l9dSjT3j1NhJGI2BkJAjCHdmJec4wTx6anxZ+E2vePPFVrqml3emwwRWSW7LdSOrFg7tkbUYYw47+tcR8WfizoPjzwra6XpdpqUM8V6lwzXUaKpUI64G12OcuO3rQBoeGvj74q1nxVpGl3Gn6MsF7ew28jRwyhgruFJGZCM4Poa+i6+ZNA+LOg6V8GpfB89pqTag9ld24kSNDFulMhU5Lg4+cZ49etcX4F+HGsfED7f8A2Tc2MP2Hy/M+1u6537sY2q39w9cdqANi28N2fi74/apod/JPHa3Wq3+94GAcbTK4wSCOqjtXq/8Awzj4P/6CWuf9/wCH/wCNVyHjX4j6PH8M7n4dm2vv7XsIoNPlmCJ5DSW7oHKtu3bT5bYJUHkZAri/BXwm17x5o02qaXd6bDBFcNbst1I6sWCq2RtRhjDjv60AdJ/w0d4w/wCgbof/AH4m/wDjtcvpviS88XfGbRNcv44I7q61Wy3pApCDa0aDAJJ6KO9ZfgrwVqXjzWZtL0ue0hnit2uGa6dlUqGVcDarHOXHb1r6n8I6bN8OfhXHb6w0c76Tb3NxObQlgyh3lwu4Lk7TjnHP50AYfxg+I+sfD/8Asb+ybaxm+3ef5n2tHbGzy8Y2sv8AfPXPavMP+GjvGH/QN0P/AL8Tf/Ha9v8AAvxH0f4gfb/7Jtr6H7D5fmfa0Rc792MbWb+4euO1cXoHwm17SvjLL4wnu9NbT3vbu4EaSOZdsokCjBQDPzjPPr1oAy/Dfhuz+O+nSeKPFEk9nfWsp09I9MYRxmNQJASJA53ZlbnOMAcevMfs4/8AJQ9Q/wCwVJ/6Niru/iz8Jte8eeKrXVNLu9Nhgiskt2W6kdWLB3bI2owxhx39a8I8FeCtS8eazNpelz2kM8Vu1wzXTsqlQyrgbVY5y47etAH0n4p+Cnhvxd4ju9cv73VY7q62b0gljCDaioMAxk9FHeuH8T/8Y/fZf+EU/wBN/tvf9p/tX95s8nG3Z5ezGfNbOc9B078pq3wC8VaNo19qlxqGjNBZW8lxIsc0pYqiliBmMDOB6iub8C/DjWPiB9v/ALJubGH7D5fmfa3dc792MbVb+4euO1AHYf8ADR3jD/oG6H/34m/+O1wfjXxrqXjzWYdU1SC0hnit1t1W1RlUqGZsnczHOXPf0rpPFPwU8SeEfDl3rl/e6VJa2uzekEshc7nVBgGMDqw715vQB9h+CvhNoPgPWZtU0u71KaeW3a3ZbqRGUKWVsjainOUHf1rL8cfDjR49T1T4iC5vv7XsIv7QihLp5DSW8YKBl27tp8tcgMDycEV5p8WfizoPjzwra6XpdpqUM8V6lwzXUaKpUI64G12OcuO3rWp8O/jX4b8I+BNN0O/stVkurXzd7wRRlDuldxgmQHow7UAeb+OviPrHxA+wf2tbWMP2HzPL+yI6537c53M39wdMd69MtfBWm/Dz4faf8TNJnu5tagsre4WC7dWty04WNwVVVbAErY+bqBnPd/if/jIH7L/win+hf2Jv+0/2r+73+djbs8vfnHlNnOOo69sD/hnHxh/0EtD/AO/83/xqgA/4aO8Yf9A3Q/8AvxN/8drY8N+JLz476jJ4X8URwWdjaxHUEk0xTHIZFIjAJkLjbiVuMZyBz64//DOPjD/oJaH/AN/5v/jVc341+E2veA9Gh1TVLvTZoJbhbdVtZHZgxVmydyKMYQ9/SgD1u/8Agp4b8Hadc+KNOvdVlvtGifULeO4ljaNpIQZFDgRglSVGQCDjuKx/DH/GQP2r/hK/9C/sTZ9m/sr93v8AOzu3+ZvzjylxjHU9e2JoHxZ0HSvg1L4PntNSbUHsru3EiRoYt0pkKnJcHHzjPHr1rxugD1Dxx8R9Yj0zVPh2Lax/siwl/s+KYo/ntHbyAIWbdt3Hy1yQoHJwBXl9fY+m+JLPwj8GdE1y/jnktbXSrLekCgudyxoMAkDqw7186fFnxrpvjzxVa6ppcF3DBFZJbst0iqxYO7ZG1mGMOO/rQBj+CvGupeA9Zm1TS4LSaeW3a3ZbpGZQpZWyNrKc5Qd/Wvd/B3grTfiGdK+JmrT3cOtT3C3DQWjqtuGgk8tAFZWbBES5+bqTjHbnPDfhu8+BGoyeKPFEkF5Y3UR09I9MYySCRiJASJAg24ibnOckcelfW/hxrHxb1ifxxoFzY22mant8mK/d0mXy1ETbgiso+aNiMMeCOnSgDv8A4wfEfWPh/wD2N/ZNtYzfbvP8z7WjtjZ5eMbWX++eue1eCeEdNh+I3xUjt9YaSBNWuLm4nNoQpVijy4XcGwNwxznj86j8dfDjWPh/9g/ta5sZvt3meX9kd2xs25zuVf746Z71c1P4Ta9pXgNPGE93prae9vBcCNJHMu2UqFGCgGfnGefXrQB9P+CvBWm+A9Gm0vS57uaCW4a4Zrp1ZgxVVwNqqMYQdvWvCPiz8JtB8B+FbXVNLu9SmnlvUt2W6kRlClHbI2opzlB39a8br7D8FfFnQfHmszaXpdpqUM8Vu1wzXUaKpUMq4G12OcuO3rQB5/8ACX4TaDqvh3w/4wnu9SXUEuDcCNJEEW6KdgowUJx8gzz69K98oooAKKKKACiiigDz/wCNv/JIdd/7d/8A0ojrzj4KfDvwr4u8G3l/rmlfa7qPUHhV/tEseEEcZAwjAdWP517P428Mf8Jj4QvtA+2fY/tXl/v/ACvM27ZFf7uRnO3HXvWf8OPAv/Cv/D1xpP8AaP2/zrtrnzfI8rGURduNzf3M5z3oA+RNS8Na9o1utxqmialYwM4RZLq1eJS2CcAsAM4BOPY1nwQTXVxFb28Uk08rhI441LM7E4AAHJJPGK9M+I/xg/4WB4et9J/sL7B5N2tz5v2vzc4R1242L/fznPauP8Cf8lD8Nf8AYVtf/Rq0AdB4Yj+KPg77V/YGi65Z/atnnf8AEoaTdtzt+/GcY3N09azynj3w5rk3jCXS9Vsb5ZXmkv59OKory5ViQybBkuR078dq+j/ib8Tf+Fc/2X/xKP7Q+3+b/wAvPlbNmz/YbOd/t0rP+J+p/wBt/s/3WreT5P260srnyt27ZvlibbnAzjOM4FAFP4TfE6LVfCt1P4w8T6amoLeukYupobdvK2IRhRtyNxbnHr6Vuf8ACkvh5/0L3/k7cf8AxyvEPhx8H/8AhYHh641b+3fsHk3bW3lfZPNzhEbdnev9/GMdq6//AIaa/wCpR/8AKl/9qoA5jxP8ORpvxcFtbeHb6LwjHd2pmnMcxgSArGZmaY9FGXy275cHkYrp/E//ABSX2X/hS/7/AO1b/wC1f7K/4mWNuPJ37vM8v70uOmeeuOPUNG1P/hZnwvkufJ/s3+2LS5ttu7zvJyXi3Zwu7pnHHp715f8A8m5/9TD/AG7/ANunkeR/383bvO9sbe+eAC54u+GWn3nwrk8QReH7ubxjd29tc3BTzjK1xI6GY+SDgH5nyoUAc8DFeeeG7n4teEdOksND0nXLS1klMzJ/Yxky5ABOXjJ6KPyrt/8Ahpr/AKlH/wAqX/2qj/hpr/qUf/Kl/wDaqAKnwC8Na9o3jq+uNU0TUrGBtMkRZLq1eJS3mxHALADOATj2Net+Otd0dvDPiDQxqtidXm0+eCKwFwnnySPEdiLHncWbcuABk5GOtdhXj/jb4ZeX4vvviV/a+f7O8vUv7P8As3+s+zRqdnmb+N3l9dpxnocUAc/8C/8Aiiv7e/4Sv/iQ/a/s/wBm/tX/AEXztnmbtnmY3Y3LnHTcPWvYP+E78H/9DXof/gxh/wDiq+YPib8Tf+Fjf2X/AMSj+z/sHm/8vPm79+z/AGFxjZ79a0NZ+D/9kfC+Pxp/bvm77S2ufsf2Tbjzig27956b+u3nHagD6P8A+E78H/8AQ16H/wCDGH/4qvCPgpYXng7xleaj4otJ9DsZNPeBLnU4zbRtIZI2CBpMAsQrHHXCn0rH+HHwf/4WB4euNW/t37B5N21t5X2Tzc4RG3Z3r/fxjHavf/iP4F/4WB4et9J/tH7B5N2tz5vkebnCOu3G5f7+c57UAeKfEv4l+JL3xnq/h7w9rUd7ot2kdrDDaQwziYSRKHRXCliSzMODnPArm/DEfxR8Hfav7A0XXLP7Vs87/iUNJu252/fjOMbm6etEXhj/AIQ745aRoP2z7Z9l1Wx/f+V5e7c0b/dycY3Y69q9/wDib8Tf+Fc/2X/xKP7Q+3+b/wAvPlbNmz/YbOd/t0oA8I8U+JfitqHhy7tfEtvqqaQ+z7QZ9JWFBh1K5cRjHzBe/PSuw+Cnw78K+LvBt5f65pX2u6j1B4Vf7RLHhBHGQMIwHVj+ddv8T9T/ALb/AGf7rVvJ8n7daWVz5W7ds3yxNtzgZxnGcCvIPhx8YP8AhX/h640n+wvt/nXbXPm/a/KxlEXbjY39zOc96ALnwm+GMuq+KrqDxh4Y1JNPWyd4zdQzW6+bvQDDDbk7S3GfX0o1/wCGMsHxli07TvDGpHwub20RnSGZ4vKYR+b+95OMl8ndxz0xX1HXl+s/GD+yPihH4L/sLzd93bW32z7Xtx5wQ7tmw9N/TdzjtQBx/wATf+LOf2X/AMIF/wASj+1fN+2f8vHm+Vs2f67ftx5j9MZzznAr2DQNcT/hAdG1vW7+CHztPt5rm6ndYk3ui5JPCjLN7dcV4/8AtNf8yt/29/8AtGuQ1n4wf2v8L4/Bf9heVstLa2+2fa92fJKHds2Drs6buM96APo//hO/B/8A0Neh/wDgxh/+KrwTwV4xHxD1mbSfiZrFpPosNu1zCt08dmouAyqpDpsJO15PlzjqccceN0UAd54+8HGDxPqd14T0e7n8LxIjwXloklxb7RGpkIm+YEBg+Tu4II4xXJ6ZoWsa35v9k6VfX/k48z7JbvLsznGdoOM4PX0NegaN8YP7I+F8ngv+wvN32lzbfbPte3HnFzu2bD039N3OO1df+zL/AMzT/wBun/tagDrPFmk6lc/s5W+lwafdy6gNMsENokLNKGVodw2AZyMHIxxg1y/wm+Euj6r4Vup/GHhq7TUFvXSMXTT27eVsQjChlyNxbnHr6V1mjfGD+1/ihJ4L/sLytl3c232z7Xuz5Ic7tmwddnTdxnvXqFAHzJ4K8Yj4h6zNpPxM1i0n0WG3a5hW6eOzUXAZVUh02Ena8ny5x1OOOK/iHx9rnhbxZN4X+HmrR/2DC8aafb2kcV2GaRVZgrsrs5Mjtxk8nA6Yrk/hx4F/4WB4huNJ/tH7B5No1z5vkebnDou3G5f7+c57VoReGP8AhDvjlpGg/bPtn2XVbH9/5Xl7tzRv93Jxjdjr2oAPE8fxR8Y/Zf7f0XXLz7Lv8n/iUNHt3Y3fcjGc7V6+lGtax8Tk8FnRtZs9Vg8PQxRQss+lCJERCojBk8sEchRyeffNe/8AxN+Jv/Cuf7L/AOJR/aH2/wA3/l58rZs2f7DZzv8AbpWf8T9T/tv9n+61byfJ+3Wllc+Vu3bN8sTbc4GcZxnAoA4j4KfDvwr4u8G3l/rmlfa7qPUHhV/tEseEEcZAwjAdWP515/4b034k+EdRkv8AQ9A1y0upIjCz/wBlPJlCQSMOhHVR+Vez/s4/8k81D/sKyf8AoqKuf/4aa/6lH/ypf/aqAPWPh3e67qHgTTbrxKk6au/m/aBPAIXGJXC5QAY+UL25611Fc/4J8T/8Jj4Qsdf+x/Y/tXmfuPN8zbtkZPvYGc7c9O9dBQAUUUUAFFFFAGfret6d4c0efVtWuPs9jBt8yXYz7dzBRwoJPJA4FeJ+Nbrxf8Q9Zh1b4Z6nqU+iw2620zWt81mouAzMwKOyEna8fzYx0GeOPZPFPhuz8XeHLvQ7+SeO1utm94GAcbXVxgkEdVHaqfgrwVpvgPRptL0ue7mgluGuGa6dWYMVVcDaqjGEHb1oA+ZP+FJfEP8A6F7/AMnbf/45WPp1jceCfiVpUPiGP7FJp2oW010Nwk8tAySZ+TOflOeM/nX2vXyB8bf+Sva7/wBu/wD6Tx0Ae36n8T/hJrflf2td2N/5OfL+16VLLszjON0RxnA6egrm/iV8SvA+s/DDUdB0HU42nZIEtraOzliUKkqHAygUAKp446Vwnwf+HGj/ABA/tn+1rm+h+w+R5f2R0XO/zM53K39wdMd6y9A8Fabqvxll8Hzz3a6el7d24kR1Eu2ISFTkqRn5Bnj16UAcvpviXXtGt2t9L1vUrGBnLtHa3TxKWwBkhSBnAAz7Cvov/hMvgZ/z66H/AOCJv/jNeOfFnwVpvgPxVa6Xpc93NBLZJcM106swYu64G1VGMIO3rR8JvBWm+PPFV1peqT3cMEVk9wrWrqrFg6Lg7lYYw57elAHo9rpnivV/iDp+t+CZLuPwA17bvFHaXYtrfykKifFuWUgb1lyNnzHJ5zzufHTwT4i8Y/2D/YGn/bPsv2jzv30ce3d5e377DOdrdPSu0j02H4c/DK9t9HaSdNJsrm4gN2QxZgHlw20LkbjjjHH514Z/w0d4w/6Buh/9+Jv/AI7QB7X4a+H3h628K6RBqnhXRjqEdlCl0ZLKF2MoQB8tg7juzzk5rwj4+6TpujeOrG30vT7SxgbTI3aO1hWJS3myjJCgDOABn2FXP+GjvGH/AEDdD/78Tf8Ax2un8N+G7P476dJ4o8UST2d9aynT0j0xhHGY1AkBIkDndmVuc4wBx6gHKfCb4nS6V4qup/GHifUn09rJ0jF1NNcL5u9CMKN2DtDc49fWvo/S9U0jxb4fW9snjvtLvUdP3kRCyrkowKuAcZBGCOa+UPhN4K03x54qutL1Se7hgisnuFa1dVYsHRcHcrDGHPb0rtNb+I+sfCTWJ/A+gW1jc6Zpm3yZb9HeZvMUStuKMqn5pGAwo4A69aAN/wCMHwrutX/sb/hC/DNjH5Xn/a/siwW2c+Xszkru6P6459a808IeJLnRfG9ro3jfVLt9BsXltbzT7uV7m3UxoyqhiG5WCuFxgEAgEdM17X8H/iPrHxA/tn+1raxh+w+R5f2RHXO/zM53M39wdMd65P4tfCbQdK8O+IPGEF3qTag9wLgxvIhi3SzqGGAgOPnOOfTrQB2Gm/Ff4VaNbtb6XqNpYwM5do7XTJolLYAyQsYGcADPsK4D4BeJde1nx1fW+qa3qV9AumSOsd1dPKobzYhkBiRnBIz7mvC6+h/Enhuz+BGnR+KPC8k95fXUo0949TYSRiNgZCQIwh3ZiXnOME8egByHxBvrfTP2kDf3knl2trqFhNM+0naixwljgcnAB6V6vqfxP+Emt+V/a13Y3/k58v7XpUsuzOM43RHGcDp6CvnyTUpviN8TbK41hY4H1a9trecWgKhVJSLK7i2DtGec8/lXuf8Awzj4P/6CWuf9/wCH/wCNUAZfxK+JXgfWfhhqOg6DqcbTskCW1tHZyxKFSVDgZQKAFU8cdK+dK+n/APhnHwf/ANBLXP8Av/D/APGqP+GcfB//AEEtc/7/AMP/AMaoA9gr5g8Zf8nQ23/YV03/ANBhr2P4s+NdS8B+FbXVNLgtJp5b1LdlukZlClHbI2spzlB39a+dNN8SXni74zaJrl/HBHdXWq2W9IFIQbWjQYBJPRR3oA9H/aa/5lb/ALe//aNeieC/BfhW68C+Hri48NaNNPLpls8kklhEzOxiUkklckk85rzv9pr/AJlb/t7/APaNdxc+JLzwj8AdL1ywjgkurXSrDYk6kodwiQ5AIPRj3oA6j/hBPB//AEKmh/8Aguh/+Jr50+AWk6brPjq+t9U0+0voF0yR1juoVlUN5sQyAwIzgkZ9zXt/wm8a6l488K3WqapBaQzxXr26raoyqVCI2TuZjnLnv6V8weCvGupeA9Zm1TS4LSaeW3a3ZbpGZQpZWyNrKc5Qd/WgDqPHVtouh/HxopbO0ttFt72yeeBLceUsWyJpP3ajBBG4kAc5PXNfQfgXWfA2r/b/APhC4rGPyvL+1/ZLA22c7tmcou7o/rjn1r5ck1Kb4jfE2yuNYWOB9Wvba3nFoCoVSUiyu4tg7RnnPP5V9R+Bfhxo/wAP/t/9k3N9N9u8vzPtbo2Nm7GNqr/fPXPagDD+LOk6bofgHWvEGk6faafrSPG66jaQrFcKzzIHIkUBssGYE55DHPWvFPDdt8WvF2nSX+h6trl3axymFn/tkx4cAEjDyA9GH51qfE74s69qs3iLwfPaaaunpevbiRI3Eu2KbKnJcjPyDPHr0r0P9nH/AJJ5qH/YVk/9FRUAeWab8KPiro1w1xpenXdjOyFGktdThiYrkHBKyA4yAcewrDQ6p4c+KunS+MJ51vrLULWa9lnm+0OqAo2Sylt2Ex0J9Pava/hN8Wde8eeKrrS9UtNNhgisnuFa1jdWLB0XB3Owxhz29K84+JGmw6z+0RLpdw0iwXt7Y28jRkBgrxwqSMgjOD6GgD1vU/if8JNb8r+1ruxv/Jz5f2vSpZdmcZxuiOM4HT0Fc38SviV4H1n4YajoOg6nG07JAltbR2csShUlQ4GUCgBVPHHSuE+MHw40f4f/ANjf2Tc30327z/M+1ujY2eXjG1V/vnrntWpr/wAJtB0r4NReMILvUm1B7K0uDG8iGLdKYwwwEBx85xz6daAOX8FaB8SNV0aafwfNqSaetwySC11IW6+btUnKl1ydpXnHp6VwdfT/AOzj/wAk81D/ALCsn/oqKuE+LPwm0HwH4VtdU0u71KaeW9S3ZbqRGUKUdsjainOUHf1oA7P4P/ETwrp/gnQPDV1qvl6u0rwi3+zynLyTuUG4Lt53L34zzXtFeB/CX4TaDqvh3w/4wnu9SXUEuDcCNJEEW6KdgowUJx8gzz69K98oAKKKKACiiigDH8U+JLPwj4cu9cv455LW12b0gUFzudUGASB1Yd68Q8SeG7z476jH4o8LyQWdjaxDT3j1NjHIZFJkJAjDjbiVec5yDx6+n/F+wvNT+Fus2dhaT3d1J5GyGCMyO2J4ycKOTgAn8K8A8N3Pxa8I6dJYaHpOuWlrJKZmT+xjJlyACcvGT0UflQB9b18gfG3/AJK9rv8A27/+k8dfX9fKnxIhsbn9oiWDVDGNPkvbFLoySbFERjhD5bI2jbnnIxQBzfgX4cax8QPt/wDZNzYw/YfL8z7W7rnfuxjarf3D1x2r3/wP8R9Hj1PS/h2ba+/tewi/s+WYInkNJbxkOVbdu2ny2wSoPIyBXH+J/wDikvsv/Cl/3/2rf/av9lf8TLG3Hk793meX96XHTPPXHHjkXiHX9F8Yz66s8lrryXEzyySQKGWV9wkyjLgH5mGMce1AHon7R3/JQ9P/AOwVH/6Nlr3vxr4103wHo0OqapBdzQS3C26raorMGKs2TuZRjCHv6V8eeJPFOs+LtRjv9cvPtd1HEIVfykjwgJIGEAHVj+de/wDxrv7Pxj4Ns9O8L3cGuX0eoJO9tpkguZFjEcilyseSFBZRnplh60AF/wDGvw34x0658L6dZarFfazE+n28lxFGsayTAxqXIkJCgsMkAnHY1j+GP+MfvtX/AAlf+m/23s+zf2V+82eTndv8zZjPmrjGeh6d+g+Fnws0FPCuiazrOgTweIYZWmZp5JonR0mYxkx7gBwFPI5981z/AO01/wAyt/29/wDtGgDQ8FfDjWJPiZbfEQXNj/ZF/LPqEUJd/PWO4RygZdu3cPMXIDEcHBNe4V5vc3uu6f8AAHS7rw0k76umlWH2cQQCZzkRBsIQc/KW7cda8o/4TL45/wDPrrn/AIIl/wDjNAEnxZ+LOg+PPCtrpel2mpQzxXqXDNdRoqlQjrgbXY5y47etXPBXxH0eT4Z23w7Ftff2vfxT6fFMUTyFkuHcIWbdu2jzFyQpPBwDXkepeGte0a3W41TRNSsYGcIsl1avEpbBOAWAGcAnHsa9c8FaN4GHwzttYSWx/wCE4iinms4xfkzm6R3+zhYN+GbIjwu07uODnkAz/wDhnHxh/wBBLQ/+/wDN/wDGq9P8D/EfR49T0v4dm2vv7XsIv7PlmCJ5DSW8ZDlW3btp8tsEqDyMgVn/AAy8beIo/wC1P+Flah/ZmfK+wf2rDHY+Z9/zNmVTfj93nrjI6ZriPDVhead8eZ/FF9aT2vh5tQvZ11WeMpaGORZRG4mPybWLLtOcHcMdRQBX/aO/5KHp/wD2Co//AEbLXf8A7R3/ACTzT/8AsKx/+ipa6zUvCPgP4jXC6xcR2msvCgtRcWt85VQCW2Hy3Az8+fXke1eWeG73XfFWoyWPxgSeDw9HEZrdtTgGnxm6BAUCQCPLbGl+XPIyccZABX8FfEfR5PhnbfDsW19/a9/FPp8UxRPIWS4dwhZt27aPMXJCk8HANd/8H/hxrHw//tn+1rmxm+3eR5f2R3bGzzM53Kv98dM968ouvCsWm/GGx1Lw3pk7eEbXULSdNRgDzWiRp5ZlcznK7VYPuJbC4OcYrt/jB8VLrSP7G/4QvxNYyeb5/wBr+yNBc4x5ezOQ23q/pnn0oAxPEvwC8Vaz4q1fVLfUNGWC9vZriNZJpQwV3LAHEZGcH1NafhvxJZ/AjTpPC/iiOe8vrqU6gkmmKJIxGwEYBMhQ7sxNxjGCOfTgLH4vfE/U7yOzsNWnu7qTOyGDToZHbAJOFEeTgAn8Kz/Emm/EnxdqMd/rmga5d3UcQhV/7KePCAkgYRAOrH86AOs+LPxZ0Hx54VtdL0u01KGeK9S4ZrqNFUqEdcDa7HOXHb1rzvwJ/wAlD8Nf9hW1/wDRq19P/wDCkvh5/wBC9/5O3H/xyvnj4h2Nv4J+K95D4ej+xR6dLbzWo3GTy3Eccmfnzn5jnnP5UAej/tNf8yt/29/+0a8AroPE/jbxF4x+y/2/qH2z7Lv8n9zHHt3Y3fcUZztXr6V0nw0+H97rXjPSF13w5qT6DcpI7zPBLHEy+UzIfMGOC23BB549aAPO6+m/hN8Jte8B+KrrVNUu9Nmglsnt1W1kdmDF0bJ3IoxhD39K8s+NfhbRvCPjKzsNDs/slrJp6TMnmvJlzJICcuSeij8q7T4TfFrWNV8VXUHjDxLaJp62TvGbpYLdfN3oBhgq5O0txn19KAMPxl/ydDbf9hXTf/QYa9v8dfEfR/h/9g/ta2vpvt3meX9kRGxs25zuZf746Z714R8Q9P8AEGp/Fe88T+FdOvtRtVlt5rPULC1a5hZ444xlWUFW2upB68gg1j+J4/ij4x+y/wBv6Lrl59l3+T/xKGj27sbvuRjOdq9fSgD6b1PxrpuleA08YTwXbae9vBcCNEUy7ZSoUYLAZ+cZ59etHgrxrpvjzRptU0uC7hgiuGt2W6RVYsFVsjazDGHHf1r5Q1Tx74wm8Pt4S1K/kXT4ES1eyktY0ZBERtQnYHBUoOpzxzWh4K1/4kaVo00Hg+HUn09rhnkNrpouF83aoOWKNg7QvGfT1oA6T/hnHxh/0EtD/wC/83/xqvN/FPhu88I+I7vQ7+SCS6tdm94GJQ7kVxgkA9GHavsf/hO/B/8A0Neh/wDgxh/+Kr5s8dXOi658fGllvLS50W4vbJJ50uB5TRbIlk/eKcAAbgSDxg9MUASfB/4j6P8AD/8Atn+1ra+m+3eR5f2REbGzzM53Mv8AfHTPeuD8S6lDrPirV9Ut1kWC9vZriNZAAwV3LAHBIzg+pr0z4m+CfDsn9l/8K10/+08eb9v/ALKmkvvL+55e/DPsz+8x0zg9cVz/AIJ8DTp4vsW8aaDfWXh4eZ9ruL+KW1hT922zdKdu3L7AORkkDvQB5/X0/wD8NHeD/wDoG65/34h/+O1qab8KPhVrNu1xpenWl9ArlGktdTmlUNgHBKyEZwQce4rxT4KeFtG8XeMryw1yz+12senvMqea8eHEkYByhB6MfzoA+n/C3iSz8XeHLTXLCOeO1ut+xJ1AcbXZDkAkdVPetis/RNE07w5o8Gk6Tb/Z7GDd5cW9n27mLHliSeSTya0KACiiigAooooAKK4f4v395pnwt1m8sLue0uo/I2TQSGN1zPGDhhyMgkfjXyx/wnfjD/oa9c/8GM3/AMVQB6//AMNNf9Sj/wCVL/7VVDXfAv8Awsjw9qfxT/tH+zvPtJbn+zfI87b9nQx7fN3Lnd5Wc7eN3fHPX/8ACZfAz/n10P8A8ETf/Ga59dF8S+IvHNnqfhJZ2+HNxdwAW8FysFo8AKrcKbZmX5Swl3KU+bJODnkA4D4ZfE3/AIVz/an/ABKP7Q+3+V/y8+Vs2b/9hs53+3Sug8bfDLzPCF98Sv7Xx/aPl6l/Z/2b/V/aZFOzzN/O3zOu0Zx0Ga9f8Tx/C7wd9l/t/RdDs/tW/wAn/iULJu243fcjOMbl6+tbmp6n4Ug8BpqOox2h8Lm3gdUe0LxeUxXyv3W0nGSmBt446YoA+dPhx8H/APhYHh641b+3fsHk3bW3lfZPNzhEbdnev9/GMdq5/wCHHjr/AIV/4huNW/s77f51o1t5Xn+VjLo27O1v7mMY716R4kstd8VajHffB954PD0cQhuF0ycafGboEliYyY8tsaL5scjAzxgcH8JtT8KaV4qup/GEdo+ntZOkYurQ3C+bvQjChWwdobnHr60AfUfgnxP/AMJj4Qsdf+x/Y/tXmfuPN8zbtkZPvYGc7c9O9eP/ALTX/Mrf9vf/ALRrrLn4leB7nw1deHfCGpx2+oXVvLbaZbWlnLbgXEgIQKdiqhLsPmyACckjrXgnjrRvHOkfYP8AhNJb6TzfM+yfa78XOMbd+MO23qnpnj0oA9f+Ffxg/te+8PeC/wCwvK2Wgtvtn2vdnyYSd2zYOuzpu4z3roPiP8YP+Ff+IbfSf7C+3+daLc+b9r8rGXdduNjf3M5z3q54ZtfCHhP4c6F4pv8ATNNsnh0y1eXUEsVMoaSNFJ3Ipcli+Cfc571sabJ4I+I1u2sW9jpuspC5tTcXVgCykANsHmIDj58+nJ96AOL/AGjv+Seaf/2FY/8A0VLXzhoWp/2J4h0zVvJ877DdxXPlbtu/Y4bbnBxnGM4NfUepfFf4Vazbrb6pqNpfQK4dY7rTJpVDYIyA0ZGcEjPua+dPiJe6FqHjvUrrw0kCaQ/lfZxBAYUGIkDYQgY+YN2560AbHxN+Jv8Awsb+y/8AiUf2f9g83/l583fv2f7C4xs9+taGs/GD+1/hfH4L/sLytlpbW32z7Xuz5JQ7tmwddnTdxnvXH+GPBPiLxj9q/sDT/tn2XZ5376OPbuzt++wzna3T0roPhdoaf8Lj0/RNbsIJvJluYbm1nRZU3pFJkEcqcMvv0zQBofDj4wf8K/8AD1xpP9hfb/Ou2ufN+1+VjKIu3Gxv7mc570fEf4wf8LA8PW+k/wBhfYPJu1ufN+1+bnCOu3Gxf7+c57V9H/8ACCeD/wDoVND/APBdD/8AE18wf8KS+If/AEL3/k7b/wDxygD1/wAG/wDJr1z/ANgrUv8A0KavIPhl8Mv+Fjf2p/xN/wCz/sHlf8u3m79+/wD21xjZ79a6DQ/BfxK8Ny2Tayl9b+FbKVZtRtzqSPALUNumDQrId6ld+VCndkjBzXp+mfE/4SaJ5v8AZN3Y2HnY8z7JpUsW/GcZ2xDOMnr6mgDwDRtT/wCFZ/FCS58n+0v7Hu7m227vJ87AeLdnDbeucc+nvX0/8OPHX/CwPD1xq39nfYPJu2tvK8/zc4RG3Z2r/fxjHasPS9e+Efi3xAtlZWWjX2qXru/7zRyGlbBdiWeMDOATknmub+I/grxtH4htx8O7WfTtI+yKZodMvI7KNp977mKB1y23YN2OgAzxQB0Hw4+MH/CwPENxpP8AYX2DybRrnzftfm5w6LtxsX+/nOe1eIfG3/kr2u/9u/8A6Tx10H7OP/JQ9Q/7BUn/AKNiqn8SJrG2/aIln1QRnT472xe6Eke9TEI4S+Vwdw254wc0AeV17hoX7Q/9ieHtM0n/AIRbzvsNpFbeb/aG3fsQLux5ZxnGcZNen+GI/hd4x+1f2Bouh3n2XZ53/EoWPbuzt+/GM52t09K8U8J6Tptz+0bcaXPp9pLp41O/QWjwq0QVVm2jYRjAwMDHGBQBzfxH8df8LA8Q2+rf2d9g8m0W28rz/Nzh3bdnav8AfxjHaj4ceBf+FgeIbjSf7R+weTaNc+b5Hm5w6LtxuX+/nOe1emfFn4S6xqviq1n8H+GrRNPWyRJBatBbr5u9ycqWXJ2lecenpXh+m6tqWjXDXGl6hd2M7IUaS1maJiuQcEqQcZAOPYUAfYejaZ/wrP4XyW3nf2l/Y9pc3O7b5PnYLy7cZbb1xnn19qz/AIZfE3/hY39qf8Sj+z/sHlf8vPm79+//AGFxjZ79a+ePCfizxJqnjLQ9O1HxBqt5Y3WoW8FxbXF7JJHNG0iqyOpJDKQSCDwQa+l9T1nwN8M/K+0xWOif2hnb9ksCPO8vGc+Uh6b+/wDeOO9AHzhL4Y/4TH45avoP2z7H9q1W+/f+V5m3a0j/AHcjOduOvevo/wCHHgX/AIV/4euNJ/tH7f5121z5vkeVjKIu3G5v7mc5718oa/rj/wDCfazreiX88PnahcTW11A7RPsd2wQeGGVb264o/wCE78Yf9DXrn/gxm/8AiqAOfrQ0LTP7b8Q6ZpPneT9uu4rbzdu7ZvcLuxkZxnOMivs//hBPB/8A0Kmh/wDguh/+Jrm5dR+Fei+MYNCbTtGtdeS4hSKOPSMMsr7THh1jwD8ynOePagCT4ZfDL/hXP9qf8Tf+0Pt/lf8ALt5WzZv/ANts53+3Sj42/wDJIdd/7d//AEojrj/2h9d1jRP+Ec/snVb6w877T5n2S4eLfjysZ2kZxk9fU1qaR8WPh9deCtL0zxHq8d5P9igS9iu7KacPKqru3ZQhjuGc88jNAHlnw4+MH/Cv/D1xpP8AYX2/zrtrnzftflYyiLtxsb+5nOe9aH7OP/JQ9Q/7BUn/AKNir2fw3pvw28XadJf6HoGh3drHKYWf+ykjw4AJGHQHow/OvkTTdW1LRrhrjS9Qu7GdkKNJazNExXIOCVIOMgHHsKAPvOivmT4f6d8VNa1LQNdXUdZutBe9jeWSTV8q0SS4kyjSZI+VhjHPvX03QAUUUUAFFFFAHn/xt/5JDrv/AG7/APpRHXyBX1/8bf8AkkOu/wDbv/6UR18gUAeyfFn4TaD4D8K2uqaXd6lNPLepbst1IjKFKO2RtRTnKDv61h+FvjX4k8I+HLTQ7Cy0qS1td+x54pC53OznJEgHVj2r1P4TfCbXvAfiq61TVLvTZoJbJ7dVtZHZgxdGydyKMYQ9/SsD4tfCbXtV8ReIPGEF3pq6eluLgxvI4l2xQKGGAhGfkOOfTpQA/wAMf8ZA/av+Er/0L+xNn2b+yv3e/wA7O7f5m/OPKXGMdT17QWfiS88VeKG+D99HBH4ehlk09bmBSLsx2oZoyWJKbiYV3HZg5OAOMeb+BfhxrHxA+3/2Tc2MP2Hy/M+1u6537sY2q39w9cdq3PhRps2jfHew0u4aNp7K4u7eRoySpZIZVJGQDjI9BQB1niTxJefAjUY/C/heOC8sbqIag8mpqZJBIxMZAMZQbcRLxjOSefTL+LPwm0HwH4VtdU0u71KaeW9S3ZbqRGUKUdsjainOUHf1qP8AaO/5KHp//YKj/wDRstcH4K8Fal481mbS9LntIZ4rdrhmunZVKhlXA2qxzlx29aAPX/hL8JtB1Xw74f8AGE93qS6glwbgRpIgi3RTsFGChOPkGefXpXpnjr4caP8AED7B/a1zfQ/YfM8v7I6Lnftzncrf3B0x3r5ck02b4c/E2yt9YaOd9Jvba4nNoSwZQUlwu4Lk7TjnHP516n4n/wCMgfsv/CKf6F/Ym/7T/av7vf52Nuzy9+ceU2c46jr2AILPxJeeKvFDfB++jgj8PQyyaetzApF2Y7UM0ZLElNxMK7jswcnAHGDxJ4kvPgRqMfhfwvHBeWN1ENQeTU1MkgkYmMgGMoNuIl4xnJPPp5XpngrUtV8eP4PgntF1BLie3Mjuwi3RBixyFJx8hxx6dK7z/hnHxh/0EtD/AO/83/xqgDm/hN4K03x54qutL1Se7hgisnuFa1dVYsHRcHcrDGHPb0r2P/hnHwf/ANBLXP8Av/D/APGq7zxr4103wHo0OqapBdzQS3C26raorMGKs2TuZRjCHv6V82XPiSz8XfH7S9csI547W61Ww2JOoDjaYkOQCR1U96AO38T/APGP32X/AIRT/Tf7b3/af7V/ebPJxt2eXsxnzWznPQdO/kmmeNdS0rx4/jCCC0bUHuJ7gxujGLdKGDDAYHHznHPp1r1v9pr/AJlb/t7/APaNMtfGum/EP4faf8M9Jgu4dansre3We7RVtw0AWRyWVmbBETY+XqRnHYAw/wDho7xh/wBA3Q/+/E3/AMdo/wCGjvGH/QN0P/vxN/8AHa6fw34ks/gRp0nhfxRHPeX11KdQSTTFEkYjYCMAmQod2Ym4xjBHPp5p41+E2veA9Gh1TVLvTZoJbhbdVtZHZgxVmydyKMYQ9/SgD6P8I6lN8RvhXHcawscD6tb3NvOLQFQql3iyu4tg7RnnPP5Vyf8Awzj4P/6CWuf9/wCH/wCNV0HwS/5JDoX/AG8f+lElegUAfFkepTfDn4m3txo6xzvpN7c28AuwWDKC8WW2lcnac8Y5/Ku0/wCGjvGH/QN0P/vxN/8AHa93+Inhu88XeBNS0OwkgjurrytjzsQg2yo5yQCeintXl/hvxJZ/AjTpPC/iiOe8vrqU6gkmmKJIxGwEYBMhQ7sxNxjGCOfQAPEnhuz+BGnR+KPC8k95fXUo0949TYSRiNgZCQIwh3ZiXnOME8elS68Fab8Q/h9qHxM1ae7h1qeyuLhoLR1W3DQBo0AVlZsERLn5upOMdsf4s/FnQfHnhW10vS7TUoZ4r1Lhmuo0VSoR1wNrsc5cdvWjQPizoOlfBqXwfPaak2oPZXduJEjQxbpTIVOS4OPnGePXrQBxfgX4j6x8P/t/9k21jN9u8vzPtaO2Nm7GNrL/AHz1z2qnpnjXUtK8eP4wggtG1B7ie4Mboxi3ShgwwGBx85xz6daueBfhxrHxA+3/ANk3NjD9h8vzPtbuud+7GNqt/cPXHavf/A/xH0ePU9L+HZtr7+17CL+z5ZgieQ0lvGQ5Vt27afLbBKg8jIFAHmH/AA0d4w/6Buh/9+Jv/jtc38JvBWm+PPFV1peqT3cMEVk9wrWrqrFg6Lg7lYYw57elev8AxZ+E2vePPFVrqml3emwwRWSW7LdSOrFg7tkbUYYw47+teEeCvBWpePNZm0vS57SGeK3a4Zrp2VSoZVwNqsc5cdvWgD3O/wDgp4b8Hadc+KNOvdVlvtGifULeO4ljaNpIQZFDgRglSVGQCDjuKx/DH/GQP2r/AISv/Qv7E2fZv7K/d7/Ozu3+ZvzjylxjHU9e1iz8SWfhXwu3wfvo55PEM0UmnrcwKDaCS6LNGSxIfaBMu47MjBwDxnqPg/8ADjWPh/8A2z/a1zYzfbvI8v7I7tjZ5mc7lX++Ome9AHzJ4l02HRvFWr6XbtI0FlezW8bSEFiqOVBOABnA9BWXX0H8WvizoOq+HfEHg+C01JdQS4FuZHjQRbop1LHIcnHyHHHp0r58oA9g/wCGjvGH/QN0P/vxN/8AHa5fTfEl54u+M2ia5fxwR3V1qtlvSBSEG1o0GAST0Ud66j9nH/koeof9gqT/ANGxV0/xE+CniTxd471LXLC90qO1uvK2JPLIHG2JEOQIyOqnvQB6R46+HGj/ABA+wf2tc30P2HzPL+yOi537c53K39wdMd68o+InwU8N+EfAmpa5YXuqyXVr5WxJ5Yyh3SohyBGD0Y96n8Mf8Y/fav8AhK/9N/tvZ9m/sr95s8nO7f5mzGfNXGM9D07+meLtNm+I3wrkt9HaOB9Wt7a4gN2SoVS6S4baGwdoxxnn86AOT/Zx/wCSeah/2FZP/RUVcJ8WfhNoPgPwra6ppd3qU08t6luy3UiMoUo7ZG1FOcoO/rXn/jXwVqXgPWYdL1Se0mnlt1uFa1dmUKWZcHcqnOUPb0r2PxJ4ks/jvp0fhfwvHPZ31rKNQeTU1EcZjUGMgGMud2ZV4xjAPPqAcp8Mfizr2lTeHfB8Fpprae96luZHjcy7ZZsschwM/OccenWvqOuX+Hfhu88I+BNN0O/kgkurXzd7wMSh3Su4wSAejDtXUUAFFFFABRRRQBj+KbLQtQ8OXdr4leBNIfZ9oM85hQYdSuXBGPmC9+elfKnxZ0zwppXiq1g8HyWj6e1kjyG1uzcL5u9wcsWbB2heM+nrX0H8bf8AkkOu/wDbv/6UR18gUAfQ/wAFPiJ4q8XeMryw1zVftdrHp7zKn2eKPDiSMA5RQejH86r/ABT1j4nP4q1vRtGs9Vn8PTRLCqwaUJUdHhUSASeWSeSw4PHtij/hGP8Ahn7/AIqv7Z/b32v/AIlv2Xyvsuzf+8378vnHlYxj+LOeOdDQv2h/7b8Q6ZpP/CLeT9uu4rbzf7Q3bN7hd2PLGcZzjIoA8w8MR/FHwd9q/sDRdcs/tWzzv+JQ0m7bnb9+M4xubp616n4g8OWnhX4b/wDCwbOxksvGot7e5nvJC5ZbidkWcmJyUBPmSDbtwM8AYGOs+JvxN/4Vz/Zf/Eo/tD7f5v8Ay8+Vs2bP9hs53+3SvIPG3x0/4THwhfaB/wAI59j+1eX+/wDt3mbdsiv93yxnO3HXvQB5v4k8U6z4u1GO/wBcvPtd1HEIVfykjwgJIGEAHVj+dfVfgrQPhvpWszT+D5tNfUGt2SQWupG4bytyk5Uu2BuC849PWvDPhx8H/wDhYHh641b+3fsHk3bW3lfZPNzhEbdnev8AfxjHauv/AOEY/wCGfv8Aiq/tn9vfa/8AiW/ZfK+y7N/7zfvy+ceVjGP4s545AOY+L/hPxJqfxS1m8sPD+q3drJ5GyaCykkRsQRg4YDBwQR+FdP8AAv8A4or+3v8AhK/+JD9r+z/Zv7V/0XztnmbtnmY3Y3LnHTcPWvUNG8df2v8AC+Txp/Z3lbLS5ufsfn7s+SXG3ftHXZ128Z7184fE34m/8LG/sv8A4lH9n/YPN/5efN379n+wuMbPfrQB7X4w8H6ZpOiX/jfwRpskviiR1urW7tHkuTIZnAkdYyWRgUdz90gA5GMA15p/wmXxz/59dc/8ES//ABmuv+Ffxg/te+8PeC/7C8rZaC2+2fa92fJhJ3bNg67Om7jPevcKAPjzxrr/AMSNV0aGDxhDqSaetwrxm600W6+btYDDBFydpbjPr6V2ngrRvAw+GdtrCS2P/CcRRTzWcYvyZzdI7/ZwsG/DNkR4Xad3HBzzf/4Sf/hoH/ilPsf9g/ZP+Jl9q837Vv2fu9mzCYz5uc5/hxjnjgIvDH/CHfHLSNB+2fbPsuq2P7/yvL3bmjf7uTjG7HXtQB3/AIY/4q37V/wuj9x9l2f2V/av/Etzuz52zb5fmfdiz1xx0zzxngW50XQ/j4ssV5aW2i297epBO9wPKWLZKsf7xjggjaASecjrmvc/ib8Mv+Fjf2X/AMTf+z/sHm/8u3m79+z/AG1xjZ79a8//AOGZf+pu/wDKb/8AbaAO48SW3wl8XajHf65q2h3d1HEIVf8AtkR4QEkDCSAdWP51xfgq18X/ABD1mbSfiZpmpT6LDbtcwrdWLWai4DKqkOioSdryfLnHU4448s+I/gX/AIV/4ht9J/tH7f51otz5vkeVjLuu3G5v7mc5716f/wANNf8AUo/+VL/7VQBckk8b+FfibZeGfDNjqUHgqG9tkVUsDNEsTlGm/fMjNjc8hJ3cc9McdJ8YNZ8c6R/Y3/CFxX0nm+f9r+yWAucY8vZnKNt6v6Z59K7DwT4n/wCEx8IWOv8A2P7H9q8z9x5vmbdsjJ97Aznbnp3rn/ib8Tf+Fc/2X/xKP7Q+3+b/AMvPlbNmz/YbOd/t0oA8s8BfFnxbN8Q7LTfFuvR2+nq8yXiXcEFuEZY3wGbapUhwBjI54r1/UvCPgP4jXC6xcR2msvCgtRcWt85VQCW2Hy3Az8+fXke1fMmjaZ/wsz4oSW3nf2b/AGxd3Nzu2+d5OQ8u3GV3dMZ49favp/4ceBf+Ff8Ah640n+0ft/nXbXPm+R5WMoi7cbm/uZznvQB8ial4a17RrdbjVNE1KxgZwiyXVq8SlsE4BYAZwCcexrY8G+DdV1zXtEll0DUrnRbi9iSedLaTymi8wLJ+8UYAA3AkHjB6Yr6j+I/gX/hYHh630n+0fsHk3a3Pm+R5ucI67cbl/v5zntXn+heOv+Fb+IdM+Fn9nf2j5F3Fbf2l5/k7vtDiTd5W1sbfNxjdzt7Z4APQNM0bwN8M/N+zS2Oif2hjd9rvyPO8vOMea56b+394Z7VJpfgLwfD4gXxbpthG2oTu90l7HdSOrmUHc4G8oQwc9BjnivK/2mv+ZW/7e/8A2jXoEXif/hDvgbpGvfY/tn2XSrH9x5vl7tyxp97Bxjdnp2oA6zUvEug6NcLb6prem2M7IHWO6ukiYrkjIDEHGQRn2NfOn7OP/JQ9Q/7BUn/o2KuP+I/jr/hYHiG31b+zvsHk2i23lef5ucO7bs7V/v4xjtR8OPHX/Cv/ABDcat/Z32/zrRrbyvP8rGXRt2drf3MYx3oA6z4saR4mtfi3qniPTNI1LyLR7e6ivks2eJDHDGd+7aVwpU5zxwc1T0z4n/FvW/N/sm7vr/yceZ9k0qKXZnOM7YjjOD19DXQa7+0P/bfh7U9J/wCEW8n7daS23m/2hu2b0K7seWM4znGRV/8AZl/5mn/t0/8Aa1AEnjzwDocHwfn8WXWkyReKJ7e1ubueSSVW+0SyR+cTGW2qSXf5doAzwBivENN8Na9rNu1xpeialfQK5RpLW1eVQ2AcEqCM4IOPcV9l+NvDH/CY+EL7QPtn2P7V5f7/AMrzNu2RX+7kZztx171n/DjwL/wr/wAPXGk/2j9v867a583yPKxlEXbjc39zOc96APBPgFq2m6N46vrjVNQtLGBtMkRZLqZYlLebEcAsQM4BOPY19R2N/Z6nZx3lhdwXdrJnZNBIJEbBIOGHBwQR+FfBFfV/ww1P+xP2f7XVvJ877DaXtz5W7bv2Syttzg4zjGcGgDn/ANofQtY1v/hHP7J0q+v/ACftPmfZLd5dmfKxnaDjOD19DWR8OvE/xC0nXtHsvFAvtN8K2sRhlkv9PW3hiRYmWINKyDHzBAMtySBzmvR/hl8Tf+Fjf2p/xKP7P+weV/y8+bv37/8AYXGNnv1roPG3hj/hMfCF9oH2z7H9q8v9/wCV5m3bIr/dyM524696APCPjXYXnjHxlZ6j4XtJ9csY9PSB7nTIzcxrIJJGKFo8gMAynHXDD1q58AvDWvaN46vrjVNE1KxgbTJEWS6tXiUt5sRwCwAzgE49jVv/AISf/hn7/ilPsf8Ab32v/iZfavN+y7N/7vZsw+ceVnOf4sY45+gKAPG9f1/4kQfGWLTtOh1I+Fze2iM6aaHi8phH5v73YTjJfJ3cc9MV7JRRQAUUUUAFFFFAHH/FLRNR8R/DjVtJ0m3+0X0/k+XFvVN22ZGPLEAcAnk184f8KS+If/Qvf+Ttv/8AHK+v68b+LPxZ17wH4qtdL0u002aCWyS4ZrqN2YMXdcDa6jGEHb1oA9A8a6n4U0rRoZ/GEdo+ntcKkYurQ3C+btYjChWwdobnHr61w8Hjn4JWtxFcW8WjQzxOHjkj0R1ZGByCCIsgg85ruPGvgrTfHmjQ6Xqk93DBFcLcK1q6qxYKy4O5WGMOe3pXl/iX4BeFdG8K6vqlvqGstPZWU1xGsk0RUsiFgDiMHGR6igDpNT+J/wAJNb8r+1ruxv8Ayc+X9r0qWXZnGcbojjOB09BRomr/AAd8R6xBpOk6bodxfT7vLi/sXZu2qWPLRADgE8mvIPg/8ONH+IH9s/2tc30P2HyPL+yOi53+ZnO5W/uDpjvXs/hb4KeG/CPiO01ywvdVkurXfsSeWModyMhyBGD0Y96ANTUvF3gP4c3C6PcSWmjPMguhb2ti4VgSV3ny0Iz8mPXge1eWfGv4ieFfF3g2zsND1X7XdR6gkzJ9nljwgjkBOXUDqw/OvS/Gvwm0Hx5rMOqapd6lDPFbrbqtrIiqVDM2TuRjnLnv6V5B8WfhNoPgPwra6ppd3qU08t6luy3UiMoUo7ZG1FOcoO/rQB6f8KJrG2+BFhPqgjOnx29290JI96mITSl8rg7htzxg5q54Yj+F3jH7V/YGi6HefZdnnf8AEoWPbuzt+/GM52t09Kp/CjTYdZ+BFhpdw0iwXtvd28jRkBgrzSqSMgjOD6GtzwL8ONH+H/2/+ybm+m+3eX5n2t0bGzdjG1V/vnrntQB8yXel6vN8XtW03wkklvqC6neJZpaSi3KKrSZCtlQoCAjGRxxXs/grxifh5o02k/EzWLuDWprhrmFbp5LxjblVVSHTeANySfLnPU4556jTPhNoOlePH8YQXepNqD3E9wY3kQxbpQwYYCA4+c459OtHjX4TaD481mHVNUu9Shnit1t1W1kRVKhmbJ3Ixzlz39KAMfTfiR8HtGuGuNLm02xnZCjSWukSRMVyDglYgcZAOPYVqa+vhbxD4B1nxlpFlYz3R0+4nttUFmEnWSJGVXV2UOrKyDB4I2jHauf/AOGcfB//AEEtc/7/AMP/AMarmL3xJeeFfFC/B+xjgk8PTSx6e1zOpN2I7oK0hDAhNwMzbTswMDIPOQCv8H/ipa6R/bP/AAmnia+k83yPsn2tp7nGPM34wG29U9M8ele73vinRtP8Lr4lurzy9IaKOYXHlOcpIVCHaBu53L24zzXm/wDwzj4P/wCglrn/AH/h/wDjVcxZ+JLzxV4ob4P30cEfh6GWTT1uYFIuzHahmjJYkpuJhXcdmDk4A4wAdnqXxI+D2s3C3GqTabfTqgRZLrSJJWC5JwC0ROMknHua5Dxra+EPiHo0Ok/DPTNNn1qG4W5mW1sVs2FuFZWJd1QEbnj+XOehxxx5/wDFnwVpvgPxVa6Xpc93NBLZJcM106swYu64G1VGMIO3rXpfiTw3Z/AjTo/FHheSe8vrqUae8epsJIxGwMhIEYQ7sxLznGCePQA5Cx+H3xn0yzjs7AaraWsedkMGsxxouSScKJcDJJP410/hj/ikvtX/AAuj9/8Aatn9lf2r/wATLG3PnbNvmeX96LPTPHXHFTw18ffFWs+KtI0u40/Rlgvb2G3kaOGUMFdwpIzIRnB9DXrfjr4caP8AED7B/a1zfQ/YfM8v7I6Lnftzncrf3B0x3oAAngLw5ocPjCLS9KsbFYkmjv4NOCuqS4VSAqbxkOB078962PDfinRvF2nSX+h3n2u1jlMLP5Tx4cAEjDgHow/Ovmjxx8R9Yj0zVPh2Lax/siwl/s+KYo/ntHbyAIWbdt3Hy1yQoHJwBXp/7OP/ACTzUP8AsKyf+ioqAOU+AXiXXtZ8dX1vqmt6lfQLpkjrHdXTyqG82IZAYkZwSM+5rj/jNPNa/GfWLi3lkhnie2eOSNirIwgjIII5BB5zXv8A4K+E2g+A9Zm1TS7vUpp5bdrdlupEZQpZWyNqKc5Qd/Wuf+J3wm0HVYfEXjCe71JdQSye4EaSIIt0UOFGChOPkGefXpQB82anrusa35X9rarfX/k58v7XcPLszjONxOM4HT0FeyfDLwj48vNW0OXxBHd3ng6W33m2u75JrdojCTDmAueA3lkDbwQDxivC6+3/AAJ/yTzw1/2CrX/0UtAHjnxZ+Eusar4qtZ/B/hq0TT1skSQWrQW6+bvcnKllydpXnHp6V7H/AMIJ4P8A+hU0P/wXQ/8AxNed/Fn4s694D8VWul6XaabNBLZJcM11G7MGLuuBtdRjCDt60fCb4s69488VXWl6paabDBFZPcK1rG6sWDouDudhjDnt6UAeYeOrbRdD+PjRS2dpbaLb3tk88CW48pYtkTSfu1GCCNxIA5yeua1Pib428Ox/2X/wrXUP7Mz5v2/+yoZLHzPueXvwqb8fvMdcZPTNer+Kfgp4b8XeI7vXL+91WO6utm9IJYwg2oqDAMZPRR3rH/4Zx8H/APQS1z/v/D/8aoAueLNW1K2/Zyt9Ug1C7i1A6ZYObtJmWUszQ7jvBzk5OTnnJr50/wCE78Yf9DXrn/gxm/8Aiq7Dxx8R9Yj0zVPh2Lax/siwl/s+KYo/ntHbyAIWbdt3Hy1yQoHJwBWp8JvhNoPjzwrdapql3qUM8V69uq2siKpUIjZO5GOcue/pQBsfCb4S6xpXiq6n8YeGrR9PaydIxdNBcL5u9CMKGbB2hucevrXp83i7wHo2qDwM8lpbTu62v9mJYv5RM2CEwqbMN5nPb5jnvXin/DR3jD/oG6H/AN+Jv/jtd34O8Fab8QzpXxM1ae7h1qe4W4aC0dVtw0EnloArKzYIiXPzdScY7AGH8dP+KK/sH/hFP+JD9r+0faf7K/0Xztnl7d/l43Y3NjPTcfWuY+EHizxJqfxS0azv/EGq3drJ5++Ge9kkRsQSEZUnBwQD+Fe7+Ovhxo/xA+wf2tc30P2HzPL+yOi537c53K39wdMd6+XI9Sm+HPxNvbjR1jnfSb25t4BdgsGUF4sttK5O054xz+VAHrfxr+Hfirxd4ys7/Q9K+12senpCz/aIo8OJJCRh2B6MPzrM+AXiXXtZ8dX1vqmt6lfQLpkjrHdXTyqG82IZAYkZwSM+5rL/AOGjvGH/AEDdD/78Tf8Ax2j9nH/koeof9gqT/wBGxUAe73vxE8K6f4oXw1dar5ertLHCLf7PKcvIFKDcF287l78Z5rqK4PU/hNoOq+PE8YT3epLqCXEFwI0kQRbogoUYKE4+QZ59eld5QAUUUUAFFFFAGP4p8SWfhHw5d65fxzyWtrs3pAoLnc6oMAkDqw715v8A8NHeD/8AoG65/wB+If8A47XUfF+wvNT+Fus2dhaT3d1J5GyGCMyO2J4ycKOTgAn8K+WP+EE8Yf8AQqa5/wCC6b/4mgCTwV4K1Lx5rM2l6XPaQzxW7XDNdOyqVDKuBtVjnLjt60an4K1LSvHieD557RtQe4gtxIjsYt0oUqclQcfOM8evWtTw3pvxJ8I6jJf6HoGuWl1JEYWf+ynkyhIJGHQjqo/Kvd/A/gey8QaZpfi/xfpE58XGXzpp5zJbuHikKxExAqowiJ/DzjJznkA8w/4Zx8Yf9BLQ/wDv/N/8ar0v4kabNo37O8ul3DRtPZWVjbyNGSVLJJCpIyAcZHoKk+MGs+OdI/sb/hC4r6TzfP8Atf2SwFzjHl7M5RtvV/TPPpXjHinxL8VtQ8OXdr4lt9VTSH2faDPpKwoMOpXLiMY+YL356UAU/BXwm17x5o02qaXd6bDBFcNbst1I6sWCq2RtRhjDjv616X4k8SWfx306Pwv4Xjns761lGoPJqaiOMxqDGQDGXO7Mq8YxgHn12P2cf+Seah/2FZP/AEVFXgngrU/FelazNP4Pju31BrdkkFraC4bytyk5Uq2BuC849PWgDvP+GcfGH/QS0P8A7/zf/Gq3/DH/ABj99q/4Sv8A03+29n2b+yv3mzyc7t/mbMZ81cYz0PTvgf8ACZfHP/n11z/wRL/8Zrf8Mf8AFW/av+F0fuPsuz+yv7V/4lud2fO2bfL8z7sWeuOOmeQCD4ifGvw34u8CalodhZarHdXXlbHnijCDbKjnJEhPRT2rg/BXwm17x5o02qaXd6bDBFcNbst1I6sWCq2RtRhjDjv616H428F/DV/CF8vgtLG98Qny/slvYak91M/7xd+2ISNuwm8ng4AJ7VxHhu5+LXhHTpLDQ9J1y0tZJTMyf2MZMuQATl4yeij8qAPe/iz4K1Lx54VtdL0ue0hnivUuGa6dlUqEdcDarHOXHb1qnbeG7zwj8AdU0O/kgkurXSr/AHvAxKHcJXGCQD0Ydq8o/wCEy+Of/Prrn/giX/4zXo9r4ql1L4PX2m+JNTgXxddafdwPp05SG7eR/MESCAYbcylNoC5bIxnNAHlHwf8AiPo/w/8A7Z/ta2vpvt3keX9kRGxs8zOdzL/fHTPejxx8ONYk0zVPiILmx/si/l/tCKEu/nrHcSAoGXbt3DzFyAxHBwTWh8MvBPh2P+1P+Flaf/ZmfK+wf2rNJY+Z9/zNmWTfj93nrjI6Zr3vU9M8KT+A007UZLQeFxbwIrvdlIvKUr5X73cDjITB3c8dc0AeEfCb4s6D4D8K3Wl6paalNPLevcK1rGjKFKIuDudTnKHt6V0fiTxJZ/HfTo/C/heOezvrWUag8mpqI4zGoMZAMZc7syrxjGAefXrNN+FHwq1m3a40vTrS+gVyjSWupzSqGwDglZCM4IOPcV5p8FLC88HeMrzUfFFpPodjJp7wJc6nGbaNpDJGwQNJgFiFY464U+lAHByabN8OfibZW+sNHO+k3ttcTm0JYMoKS4XcFydpxzjn866T4wfEfR/iB/Y39k219D9h8/zPtaIud/l4xtZv7h647Vl/FieHXfi3qj6PLHqCXL26QNaMJRK3kxrhdudx3cYHfisP/hBPGH/Qqa5/4Lpv/iaAO00n4BeKtZ0ax1S31DRlgvbeO4jWSaUMFdQwBxGRnB9TXt/wm8Fal4D8K3Wl6pPaTTy3r3CtauzKFKIuDuVTnKHt6V4YPGfxf8M6HDHImq2GmWMSQo8+joqRIMIoLtF9Byea9T+E3xOi1XwrdT+MPE+mpqC3rpGLqaG3bytiEYUbcjcW5x6+lAEf7R3/ACTzT/8AsKx/+ipa4TQPizoOlfBqXwfPaak2oPZXduJEjQxbpTIVOS4OPnGePXrVz4ca3qPxb8Q3GgeOLj+1dMt7Rr2KDYsG2ZXRA26IKx+WRxgnHPTgVj+J/hyNN+Lgtrbw7fReEY7u1M05jmMCQFYzMzTHooy+W3fLg8jFAHL+BfhxrHxA+3/2Tc2MP2Hy/M+1u6537sY2q39w9cdq9XvfEln4q8Lr8H7GOePxDDFHp7XM6gWhktSrSEMCX2kQttOzJyMgc47jwxJ8LvB32r+wNa0Oz+1bPO/4m6ybtudv35DjG5unrWppfgLwfD4gXxbpthG2oTu90l7HdSOrmUHc4G8oQwc9BjnigDwz/hnHxh/0EtD/AO/83/xqj9nH/koeof8AYKk/9GxV0/xr+Inirwj4ys7DQ9V+yWsmnpMyfZ4pMuZJATl1J6KPyrxDw34p1nwjqMl/od59kupIjCz+UkmUJBIw4I6qPyoA+n/FPxr8N+EfEd3od/ZarJdWuze8EUZQ7kVxgmQHow7Vj/8ADR3g/wD6Buuf9+If/jteEadfXHjb4laVN4hk+2yajqFtDdHaI/MQskePkxj5RjjH516R8YPhXa6R/Y3/AAhfhm+k83z/ALX9kWe5xjy9mcltvV/TPPpQBY+Inxr8N+LvAmpaHYWWqx3V15Wx54owg2yo5yRIT0U9q6f9nH/knmof9hWT/wBFRV82Q6TqVzqh0uDT7uXUA7IbRIWaUMudw2AZyMHIxxg19P8AwC0nUtG8C31vqmn3djO2pyOsd1C0TFfKiGQGAOMgjPsaAPNP+GcfGH/QS0P/AL/zf/Gq7vwd41034eHSvhnq0F3NrUFwtu09oitblp5PMQhmZWwBKufl6g4z3wPhN8WtY1XxVdQeMPEtomnrZO8Zulgt183egGGCrk7S3GfX0rh/iTqrXXxru9T8OXMd5P8AaLV7KW02zh5Vii27cZDHcMY55GKAPovx18R9H+H/ANg/ta2vpvt3meX9kRGxs25zuZf746Z715/4K+HGsSfEy2+IgubH+yL+WfUIoS7+esdwjlAy7du4eYuQGI4OCa8w8Tx/FHxj9l/t/RdcvPsu/wAn/iUNHt3Y3fcjGc7V6+laA8Z/F/wzocMciarYaZYxJCjz6OipEgwigu0X0HJ5oA9z8a/FnQfAesw6XqlpqU08tutwrWsaMoUsy4O51Ocoe3pR4K+LOg+PNZm0vS7TUoZ4rdrhmuo0VSoZVwNrsc5cdvWvmjUpPG/xGuF1i4sdS1l4UFqLi1sCVUAlth8tAM/Pn15HtXafs4/8lD1D/sFSf+jYqAPY9T+LOg6V48TwfPaak2oPcQW4kSNDFulClTkuDj5xnj1613lfOnizw1r1z+0bb6pBompS6eNTsHN2lq7RBVWHcd4GMDByc8YNfRdABRRRQAUUUUAc/wCNvE//AAh3hC+1/wCx/bPsvl/uPN8vdukVPvYOMbs9O1eP/wDDTX/Uo/8AlS/+1V6B8bf+SQ67/wBu/wD6UR1xfwC8NaDrPgW+uNU0TTb6ddTkRZLq1SVgvlRHALAnGSTj3NAFP/hpr/qUf/Kl/wDaqP8Ahpr/AKlH/wAqX/2qug/4TL4Gf8+uh/8Agib/AOM1YsPEnwV1PUbaws7HQ5Lq6lSGFP7DI3OxAUZMWBkkdaAOX/4aa/6lH/ypf/aq9Q1nTP8AhZnwvjtvO/s3+2LS2ud23zvJyUl24yu7pjPHr7V5B+0PoWj6J/wjn9k6VY2HnfafM+yW6Rb8eVjO0DOMnr6mu38SX95pn7NVneWF3PaXUeladsmgkMbrkwg4YcjIJH40AdR8OPAv/Cv/AA9caT/aP2/zrtrnzfI8rGURduNzf3M5z3ry/wD4Rj/hn7/iq/tn9vfa/wDiW/ZfK+y7N/7zfvy+ceVjGP4s5454jw3bfFrxdp0l/oera5d2scphZ/7ZMeHABIw8gPRh+dej/DjwV42k8Q3A+IlrPqOkfZGMMOp3kd7Gs+9NrBC7YbbvG7HQkZ5oA9Q8E+J/+Ex8IWOv/Y/sf2rzP3Hm+Zt2yMn3sDOdueneuf8Aib8Mv+Fjf2X/AMTf+z/sHm/8u3m79+z/AG1xjZ79a8/8beC/iUni++XwWl9ZeHh5f2S3sNSS1hT92u/bEJF25feTwMkk960PAuu6x8N/t/8AwtPVb63+3+X/AGd9ruHvd2zd5uPLL7Pvx9cZ4644ANDwT8C/+EO8X2Ov/wDCR/bPsvmfuPsPl7t0bJ97zDjG7PTtXsFY974p0bT/AAuviW6vPL0hoo5hceU5ykhUIdoG7ncvbjPNfOnxZ+J0uq+KrWfwf4n1JNPWyRJBazTW6+bvcnKnbk7SvOPT0oA6P/hpr/qUf/Kl/wDaq4CLxP8A8Jj8ctI177H9j+1arY/uPN8zbtaNPvYGc7c9O9H/AApL4h/9C9/5O2//AMcrk9U0vV/CXiBrK9SSx1SydH/dygtE2A6kMhIzgg5B4oA+q/ib8Mv+Fjf2X/xN/wCz/sHm/wDLt5u/fs/21xjZ79az/ifpn9ifs/3Wk+d532G0srbzdu3fsliXdjJxnGcZNc/+zxrusa3/AMJJ/a2q31/5P2by/tdw8uzPm5xuJxnA6egrnNB1bUtc/aBu/D+rahd6hor6nfo2nXczS27KglKAxsSuFKqQMcFRjpQB2f7OP/JPNQ/7Csn/AKKirsPiP4F/4WB4et9J/tH7B5N2tz5vkebnCOu3G5f7+c57V4x8a7+88HeMrPTvC93PodjJp6TvbaZIbaNpDJIpcrHgFiFUZ64Ueldn418Yn4h6NDpPwz1i7n1qG4W5mW1eSzYW4VlYl32Ajc8fy5z0OOOADySLwx/wh3xy0jQftn2z7Lqtj+/8ry925o3+7k4xux17V7/8Tfib/wAK5/sv/iUf2h9v83/l58rZs2f7DZzv9ulfOCHVPDnxV06XxhPOt9ZahazXss832h1QFGyWUtuwmOhPp7V7/qfxP+Emt+V/a13Y3/k58v7XpUsuzOM43RHGcDp6CgA+J+p/23+z/dat5Pk/brSyufK3btm+WJtucDOM4zgV8oV9F/Er4leB9Z+GGo6DoOpxtOyQJbW0dnLEoVJUOBlAoAVTxx0rxzw38O/FXi7TpL/Q9K+12scphZ/tEUeHABIw7A9GH50AWPhx46/4V/4huNW/s77f51o1t5Xn+VjLo27O1v7mMY719P6Nqf8Awsz4XyXPk/2b/bFpc223d53k5Lxbs4Xd0zjj0960P+EE8H/9Cpof/guh/wDia8E8W+JLnwj8cF0+01S70vw3Z3tm8ljaSvHbxxFYnkxEnGDlyQBySepNAHN/E34Zf8K5/sv/AIm/9ofb/N/5dvK2bNn+22c7/bpXYaF+0P8A2J4e0zSf+EW877DaRW3m/wBobd+xAu7HlnGcZxk1f+Jv/F4/7L/4QL/ib/2V5v2z/l38rzdmz/XbN2fLfpnGOcZFcB8LtDT/AIXHp+ia3YQTeTLcw3NrOiypvSKTII5U4ZffpmgDv/8AhGP+Ggf+Kr+2f2D9k/4lv2XyvtW/Z+8378pjPm4xj+HOeePAK9o+Nd/eeDvGVnp3he7n0Oxk09J3ttMkNtG0hkkUuVjwCxCqM9cKPSvF6ANDQtT/ALE8Q6Zq3k+d9hu4rnyt23fscNtzg4zjGcGvq/4ZfE3/AIWN/an/ABKP7P8AsHlf8vPm79+//YXGNnv1r5ArsPAujeOdX+3/APCFy30fleX9r+yX4ts53bM5dd3R/XHPrQB7/o3wf/sj4oSeNP7d83fd3Nz9j+ybcecHG3fvPTf12847V6hXxRf+LfHGmajc2F54n1yO6tZXhmT+0pTtdSQwyGwcEHpVf/hO/GH/AENeuf8Agxm/+KoA5+ug8Cf8lD8Nf9hW1/8ARq19f/8ACCeD/wDoVND/APBdD/8AE184eMxpfhn9oRJI4ILDTLHULGZ0gh2pEgSJ2IRR9TwOaAPb/ib8Tf8AhXP9l/8AEo/tD7f5v/Lz5WzZs/2Gznf7dKz/AIn6n/bf7P8Adat5Pk/brSyufK3btm+WJtucDOM4zgUan8T/AISa35X9rXdjf+Tny/telSy7M4zjdEcZwOnoK5v4lfErwPrPww1HQdB1ONp2SBLa2js5YlCpKhwMoFACqeOOlAGp+zj/AMk81D/sKyf+ioq4D9nH/koeof8AYKk/9GxV3/7OP/JPNQ/7Csn/AKKiryj4KeKdG8I+Mry/1y8+yWsmnvCr+U8mXMkZAwgJ6KfyoA+t6K4ew+L/AIE1PUbaws9d8y6upUhhT7JONzsQFGSmBkkda7igAooooAKKKKAPP/jb/wAkh13/ALd//SiOuf8A2cf+Seah/wBhWT/0VFXQfG3/AJJDrv8A27/+lEdc/wDs4/8AJPNQ/wCwrJ/6KioA+YK6DwJ/yUPw1/2FbX/0ategf8M4+MP+glof/f8Am/8AjVanhr4BeKtG8VaRqlxqGjNBZXsNxIsc0pYqjhiBmMDOB6igC3+01/zK3/b3/wC0a9I03w3Z+Lvgzomh38k8drdaVZb3gYBxtWNxgkEdVHavN/2mv+ZW/wC3v/2jXpGm+JLPwj8GdE1y/jnktbXSrLekCgudyxoMAkDqw70AangrwVpvgPRptL0ue7mgluGuGa6dWYMVVcDaqjGEHb1rwT/ho7xh/wBA3Q/+/E3/AMdrm/iz4103x54qtdU0uC7hgiskt2W6RVYsHdsjazDGHHf1r2P9o7/knmn/APYVj/8ARUtAHKeGvj74q1nxVpGl3Gn6MsF7ew28jRwyhgruFJGZCM4Poa9b8dfDjR/iB9g/ta5vofsPmeX9kdFzv25zuVv7g6Y71h/CjUodG+BFhqlwsjQWVvd3EixgFiqTSsQMkDOB6ivHPjB8R9H+IH9jf2TbX0P2Hz/M+1oi53+XjG1m/uHrjtQB1Fn4kvPFXihvg/fRwR+HoZZNPW5gUi7MdqGaMliSm4mFdx2YOTgDjHT/APDOPg//AKCWuf8Af+H/AONVwmv/ABZ0HVfg1F4PgtNSXUEsrS3MjxoIt0RjLHIcnHyHHHp0ru/2cf8Aknmof9hWT/0VFQBwH/DR3jD/AKBuh/8Afib/AOO1xcmpTfEb4m2VxrCxwPq17bW84tAVCqSkWV3FsHaM855/Ku0/4Zx8Yf8AQS0P/v8Azf8AxqvY9A8FalpXwal8Hzz2jag9ld24kR2MW6UyFTkqDj5xnj160Aed+J/+Mfvsv/CKf6b/AG3v+0/2r+82eTjbs8vZjPmtnOeg6d/JNM8a6lpXjx/GEEFo2oPcT3BjdGMW6UMGGAwOPnOOfTrVzx18ONY+H/2D+1rmxm+3eZ5f2R3bGzbnO5V/vjpnvWP4W8N3ni7xHaaHYSQR3V1v2POxCDajOckAnop7UAe3+G/Ddn8d9Ok8UeKJJ7O+tZTp6R6YwjjMagSAkSBzuzK3OcYA49fHPBXjXUvAeszappcFpNPLbtbst0jMoUsrZG1lOcoO/rXef8M4+MP+glof/f8Am/8AjVbHhvw3efAjUZPFHiiSC8sbqI6ekemMZJBIxEgJEgQbcRNznOSOPQA8f8U+JLzxd4ju9cv44I7q62b0gUhBtRUGAST0Ud67j4P/AA40f4gf2z/a1zfQ/YfI8v7I6Lnf5mc7lb+4OmO9fQcepQ/Eb4ZXtxo6yQJq1lc28AuwFKsQ8WW2lsDcM8Z4/KvK/DH/ABj99q/4Sv8A03+29n2b+yv3mzyc7t/mbMZ81cYz0PTuAQfET4KeG/CPgTUtcsL3VZLq18rYk8sZQ7pUQ5AjB6Me9dP+zj/yTzUP+wrJ/wCioq1PivqUOs/Ai/1S3WRYL23tLiNZAAwV5omAOCRnB9TXyZQB9/15H8TvhNoOqw+IvGE93qS6glk9wI0kQRboocKMFCcfIM8+vSo/2jv+Seaf/wBhWP8A9FS1h/CX4s6DpXh3w/4PntNSbUHuDbiRI0MW6WdipyXBx84zx69aAPLPAvxH1j4f/b/7JtrGb7d5fmfa0dsbN2MbWX++eue1bnwo1KbWfjvYapcLGs97cXdxIsYIUM8MrEDJJxk+pr2P4wfDjWPiB/Y39k3NjD9h8/zPtbuud/l4xtVv7h647UeB/iPo8ep6X8OzbX39r2EX9nyzBE8hpLeMhyrbt20+W2CVB5GQKAPMP2jv+Sh6f/2Co/8A0bLXN/CbwVpvjzxVdaXqk93DBFZPcK1q6qxYOi4O5WGMOe3pXr/xZ+E2vePPFVrqml3emwwRWSW7LdSOrFg7tkbUYYw47+tcJ/wzj4w/6CWh/wDf+b/41QBw/wARPDdn4R8d6lodhJPJa2vlbHnYFzuiRzkgAdWPavV/2Zf+Zp/7dP8A2tW54O8a6b8PDpXwz1aC7m1qC4W3ae0RWty08nmIQzMrYAlXPy9QcZ7+yUAfEHjv/kofiX/sK3X/AKNaufr0i28SWfhH4/aprl/HPJa2uq3+9IFBc7jKgwCQOrDvXq//AA0d4P8A+gbrn/fiH/47QBH8Jvizr3jzxVdaXqlppsMEVk9wrWsbqxYOi4O52GMOe3pXknxt/wCSva7/ANu//pPHUfjX4Ta94D0aHVNUu9NmgluFt1W1kdmDFWbJ3IoxhD39KueFvgp4k8XeHLTXLC90qO1ut+xJ5ZA42uyHIEZHVT3oA83rqPh34bs/F3jvTdDv5J47W683e8DAONsTuMEgjqo7V9D/AAf+HGsfD/8Atn+1rmxm+3eR5f2R3bGzzM53Kv8AfHTPevUKAOb8FeCtN8B6NNpelz3c0Etw1wzXTqzBiqrgbVUYwg7etfMHwm8Fab488VXWl6pPdwwRWT3CtauqsWDouDuVhjDnt6V0n7R3/JQ9P/7BUf8A6NlqT4s/FnQfHnhW10vS7TUoZ4r1Lhmuo0VSoR1wNrsc5cdvWgDDufDdn4R+P2l6HYSTyWtrqthsedgXO4xOckADqx7V9b15/wDBL/kkOhf9vH/pRJXoFABRRRQAUUUUAcP8X7C81P4W6zZ2FpPd3UnkbIYIzI7YnjJwo5OACfwrwDw3c/Frwjp0lhoek65aWskpmZP7GMmXIAJy8ZPRR+VfW9FAHzB/wmXxz/59dc/8ES//ABmj/hMvjn/z665/4Il/+M19P0UAfIHieP4o+Mfsv9v6Lrl59l3+T/xKGj27sbvuRjOdq9fSva/Fmk6lc/s5W+lwafdy6gNMsENokLNKGVodw2AZyMHIxxg16pRQB8Qf8IJ4w/6FTXP/AAXTf/E17H4KtfF/xD1mbSfiZpmpT6LDbtcwrdWLWai4DKqkOioSdryfLnHU44498ooA5PWPDlpo3wt1rQdBsZFgXTLtLa2jLysWdHOBkliSzHjnrXyZ/wAIJ4w/6FTXP/BdN/8AE19v0UAeB6/8JdHg+DUWo6d4auz4oNlaOyI07y+axj8391uIzgvkbeOemK6j4BaTqWjeBb631TT7uxnbU5HWO6haJivlRDIDAHGQRn2NeqUUAeN/CbX/AIkar4quoPGEOpJp62TvGbrTRbr5u9AMMEXJ2luM+vpXqHiWa+tvCurz6WJDqEdlM9qI497GUISmFwdx3Y4wc1qUUAeH+BdC1j4kfb/+Fp6VfXH2Dy/7O+1272W3fu83HlhN/wByPrnHHTPPoGifC3wb4c1iDVtJ0b7PfQbvLl+1TPt3KVPDOQeCRyK7CigAr5I8SXPxa8XadHYa5pOuXdrHKJlT+xjHhwCAcpGD0Y/nX1vRQB5n4Ftta0P4BrFFZ3dtrVvZXrwQPbnzVl3ytH+7YZJJ2kAjnI65rwzxPH8UfGP2X+39F1y8+y7/ACf+JQ0e3djd9yMZztXr6V9f0UAfJF7c/FrUPC6+GrrSdck0hYo4Rb/2MRhIypQbhHu42r35xzXd/Cb4S6PqvhW6n8YeGrtNQW9dIxdNPbt5WxCMKGXI3FucevpXvlFAHyR4kufi14u06Ow1zSdcu7WOUTKn9jGPDgEA5SMHox/OqfgvwX4qtfHXh64uPDWswwRanbPJJJYSqqKJVJJJXAAHOa+w6KAPL/jBrPjnSP7G/wCELivpPN8/7X9ksBc4x5ezOUbb1f0zz6V5h8LtA8Wf8Lj0/W9b0PVYfOluZrm6nsXiTe8UmSTtCjLN7dcV9P0UAeN/FnX/AIkaV4qtYPB8OpPp7WSPIbXTRcL5u9wcsUbB2heM+nrXslFFAHzp4s8Na9c/tG2+qQaJqUunjU7Bzdpau0QVVh3HeBjAwcnPGDX0XRRQB8eeNPBfiq68deIbi38NazNBLqdy8ckdhKyuplYgghcEEc5r0f4TfCXR9V8K3U/jDw1dpqC3rpGLpp7dvK2IRhQy5G4tzj19K98ooAx/EnhbRvF2nR2GuWf2u1jlEyp5rx4cAgHKEHox/Oqd1pS+E/h9qFh4WtpIHs7K4exhj3TMJSGdcBtxYlz0OeuPaukooA8v+D+s+OdX/tn/AITSK+j8ryPsn2uwFtnPmb8YRd3RPXHHrXqFFFAHL+JPh34V8XajHf65pX2u6jiEKv8AaJY8ICSBhGA6sfzr5I/4QTxh/wBCprn/AILpv/ia+36KAPmT4f6j8VNF1LQNCXTtZtdBS9jSWOTSMKsTy5ky7R5A+ZjnPHtX03RRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//ZCmVuZHN0cmVhbQplbmRvYmoKMyAwIG9iago0NjE4NgplbmRvYmoKNCAwIG9iago8PAogIC9OYW1lIC9JbTIKICAvVHlwZSAvWE9iamVjdAogIC9MZW5ndGggNSAwIFIKICAvRmlsdGVyIC9EQ1REZWNvZGUKICAvU3VidHlwZSAvSW1hZ2UKICAvV2lkdGggMTYwCiAgL0hlaWdodCAyMDAKICAvQml0c1BlckNvbXBvbmVudCA4CiAgL0NvbG9yU3BhY2UgL0RldmljZVJHQgo+PgpzdHJlYW0K/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1DNFJiimZ2FFLSCigLDs0oOKbS0gFBozTaKAsPLUZptFAWHZ5pc0yloCxJmjNMFOoCw6lzTaWiwWHZpc00UUBYdmjNNophYrUUZpMigBRS03NLmgB1FNzzSg0gFoqKeeK2haaeRI41GWdzgD6muWvPiV4Ys94+3tO6kgrDExz9CQAfzpDOuorzK8+M2lIgNnp93I3pMVj5/AtWOfjXeedldJg8rH3TId35/8A1qLhZnswpa8jtfjZGXK3Wk7Rnqs3Qf8AfPP6V12lfEjw5qeA121o54C3S7Qf+BDK/mRRcLM6+nVDFNHNGkkTrJG43K6nIYeoI608OCSO4oAkpaZmlzTAdRSZpN1FwH0lJmjNAFbGaMUuKKAEpKdgUUCIbi4itYWmnkWONRlmY4AFedeJfirHYzLBocMVy4OXknU7CMdsEH8fbvUnxE8ZNp8E+k2kQ811w8j4wAQDgAjByD+HpXjNxdM43yys7HoCcmpbKS7mxr3jXWtZV0vtQlMb8GGL5ExnOCowD+OT71zPm+ZwC340ufMYknFLsywIA49DSuURlWQ9am2Ejpz16dqdjf8Aw4P86FcxREKM8/pSuOw1o1JIwQw7Gp4pPLi27sZGQPWopH34yMY6GkliabbsXAQYzRddRpPob+jeMtT0Mq+n3TqhOXhY5RvXK+vHXrXpWk/FG3vkhnlh8mZQRcIvIkGOCpPTB5Oew9+PDCrID35zU8F08RAUdfWmvIlo+s7C+iv7ZJYpEfOQ2w5CsDhh+B4q1XlXwv1xrhJbXyywXLkrwq5PLN9cAdf4Rxwa9SilWQenOKolklFLRQIKMUUtAEGaKTFKBQAUmaUiqOr6nDo2k3OoTsBHbxl+e57D8TgfjQB4V8TdV+0+J7u2hCrHEwjcKclmHUt9DxjoMeua4bLM+ScYqa5uJbqZ5pZC8jEs7k8sT1NVwGLYFSWW4olfnPJ/z0q3bWEkrbFUkZ4OKq2ls7yjOc12OjQbsA8e9YVZ8qN6VPnZjtolwik+X7gjmqZsnXkjBz0r0yOw4/DvTRosTSb/AClz79K5FiX1Ox4VdDz+10aVyGZcexFW5dHkigJCdepxXffYgiYKqMdhUL22UYBMk+9S67bLWGUUeVvaGGUqw9xmojbAjJ2gngYrtNV0pWydu1uxrjL2KS3mIbPXtXZSqc5xVqXIW9O1O50piAX2HBK7tua928CataajpsbW5hEgXDoGLuvPQkgH+Y9K+fRKs8Yhc/P1DE13/wAJp2h1+S2Zcgr27e/9M4PXtmuhM5mj3cNRuqOlpkj9wpN1NopgAoxSA00vigQ7IFcF8Xbw2/gZ41GftNzHCx9By/8A7JXayTeleX/GK9U6FZWuTua5Eh9AArD8/m/Q0DR49GoY8kDj86txQFyFVRzVOEgck961dODTy7hnaOKyqOyubQV3Ysw2UqY2xnPcmum0qJlC549RVeGIFR049a2tOij7kD+tcFSbZ6VKmkatvuOOCT71d+bbk8CnW0EYjDH9Kvrbq6Eqwb2Nc250lPZ5ijI4FU7iIxqcYzWwtixXdkiopbdGTlxmhD3OQvzviDMAeK4/ULczSMVGSe2K9A1GxUAniubuYBHxjnrmtqUrM560ObQ4OSAwu24c+ld38KpynjS1UHJmiljceoClh+qiud1qFdofHPrWn8MHP/CeaeobGfM59hGx/pXpQlzK55VSPK7H0VRTAQe9LmtDIdRTd1JuoAaTUbGnGmMeKYivJXlnxeUtZWO3nazM/PToB+fP5H3r1N68y+JZtL3TWEV1A80bcosoJBHXIHf+XtSY0jx9FMjhF6mupsIBZWwJXcfSsXSYN94pYZ4yBXWCEhQSvy1z1pdGdVCN9Sqbu42btv0FLFd364dFl3dmC8VGbsG78iKJmkPRVUE5/pSxa5exwzK0KgQkq+ZCDnIGMAdTn+fpWai3sjZyS6mjb63qSsAzOR3yMV0Ola3cb9rMx96xpbW+hjt55omRLhFeMtyrAjI57HnvVuykCTgMnNc1X0Omlr1Owlv/ACbMsDlmHNchd69ciR8ZwPugVuajPGtkvBBx0rjpTLPIdgwOg4yT9B3qKauaVG0tCGfX9QY47f7uaoNql7PJtZQMdDitSeK60y4ghntX8yVPMAkmjj+XnnJ4GcHGTWf/AGqJ0ZpISih9m7gjP+8OK6+XS/KcLld/ERXG69tZI5EKyqMjjg074dyGHx1phBC/O4y3ujDH1OcD61atsSYdeUPTNV/BMbx+NbYIAdspyD1I56VtSfQ56x9FIakqCM4UVMDxW5zi0nNG6jNA7lcyr61G0oNVy1Rkn1pgQazceVpN46sVbymVWB5BIwD+ZFeLXdjKyyRM+4AbhmvablFnt5IW+7IpU+vIxxXmeq2skOoPC4/eIu0kDg98j8CDXNiOZNPoduFUWnF7nI6JB/pxUjkA/wA67eK1WWDYQPeubtbVrW/3Nn94u4D8a7HTkBC5UVzYiV7NHRh4crcTDTSpLO6NxbRgkHuM5pzadbXN+t5caWGlLbnAY7XPuK7KOBQu5iMelMlzghAAB3xWCryR1PDRkUNQ1Ke7g23qqseBthUYAx0/zms/TbYyz7zUepSEShfXqfWtzRLYlARyTUzk7XHCCUrIz9V3bwnYCs+02wy+Yo+cfdYHoa1dbjKTFmHSs7TmV5GVhkE0QbSuKcbysSa/Iuu2kI1C2k863GI5oSEYjuDxgj8B+prEeG3TTP7OtrRxGzbi0jAkn1rtFtfl2gBh2zSPYKo3FVH0FaLEO1jN4ZbnIWunfZbfaScisi1D2+qSz28kiSRu20xttOc46112ogJkDisGGE7ZDj/WSk5/GtYTdmzCVNOSXY9V8G6ldajoYkvSDNHIY89yAAQT+ePwrow3vXMeE9ONnYNcNuBuMMFJ6KOh/HJP0xXSL0rtptuKbPOqqKm+XYfnmjNNNJWhBnk00mgmmk0wGsa5bxZaHy47+Nfmj+ST3U9P1P6+1dM1VLyIXNrNCTt8xCueuMipnHmjYuEnGSkjy2cyNJBKxUgZGR1ro9LuQyKM8isa7sLqOQxyW0qshzjaSMeuR2pbK48pwucGuCcW46npQnadzurZg4y2KsGFG6njFYdne4jG6rb6kuzAPNcLTTPRT0Ma/EH9oyPPIqKnABOK09C16zjLLGysqnvWbfpaXR3ypl/72agt7C3mhYsW3A8EHBrW0WtTJ3T0NDX9as57lEdo4959aqWMEf2z90wdSM5FUbjTbZZthBKkc5OSauWawWSbYePxzTsktCFdy1OjiIVfm4x61VuLoHODVCW/JXAbrUE1wBDnPPrWajrc0nNJFTUZgznqT7Vc0HShqt/HEUKxRZeU9OOmM+p/xPaseSTfk54r0LwlYtZ6QJZU2TTtvII5C9B/j+Nd1Kndo82rVaTt1OijAVQFAAHQDtUw6VArVIrV2nnktJmm7qTdTCxllqazUtMNUCImc1C7kVMwqB1pDKsx3qVPIPBrzq7RrTUJIW6oxGa9HkWuW8UaYZAt9EuWUbZQPTsf8+1Z1Y3RpSlyyKdtdExYzUc9+0QJPT2GazrW42NgnirPmDO6vOcUnqeopuS0Gm/uJSDFbSyDsSpAq9aaldIhV7NsdsIev4VUW4ki5jJ+lW18R6msYjS1JUd1FVaL6Fxdt2RXWoXUkvzWMgwMY2EEVUOoujBXjkRjxhlIxVm41y/ul2yxFP8AgNVg5zukJzRaK6ESbvoyxHcsx+bNNnuCwwDUPmBckUWtvLe3ccEQ3O7YApxhqZznZHZeD7GNoXu5Y0Zt21CwzjHUj8xXYA5FUNNtFsrKG3XkIuCfU960lFdsY2VjzJO7uCk1MvXrTABT1q7CH8GjFGaM+9AjMzTWPFJvppNWAjVC2KkJzULUgIpOlcl401xtJ00RQ4M0/wAp4ztXv+fT866uUhFZmIAAyTXl3ixZmmubqNzLDMQsqleUxjaPYDA5HX8aicraFxVylHOeCTV6KdXIBNVLe3823XA5xUckUkJ74rkdmd0bx1Oq09YHYBsY966OI2Uce3H5V5rFqU8P3T+dWW8Q3GB8tc8qcr6HVGtG2qOy1EW5X93+ZrmbraGOO1UX8Qzum3Zg+tUXu5pz14NVCm1uZ1KqexfecZIz+NdN4H1Cz/tGW0kjIuWUNHIeQRzlfY8Z9/w55CK2crls/SrXh0ovi+ISuyxhQSVYA8H1JAHXOT6V0QdnocdRO2p7VHVlaqQSJMiyRNujYZVumRVqM8YroTuro5bD6XOKXHGaYRigB26jdURJo3U7gZ+RRUbypFdx20p2SuMgMMfn6VnnXLVJJkl3K0eDtALEjnnjp0queN7Byvc0yBUUskcZUOwBY4UdyfQDvWBc+IxJG7RXNvaoB8izHMknb5RnGc9uahs/GENzeW2nWGnSNqL+YJbgkYwgY8Zz/dJ9B6VnOrZPlKUL7mzq0VyuiPdJmFmk8kRSYQnJ25JPAH9OcgdaXifw5FaeCLiO3lzHgNIxG12cDdhweQfQHpn35l8OeJ11PVLbTrn9/wDZN1ybpRnzABsCbccn5ieOTgVt+JtCN3pk18jhFdNqWytwqc8g/wAI5zjoeT321zT99c1R2aNovldonkGm8wr7cVfmtRKuQPwqrbQGCd4iQdrEZB4yK1Ym4wRWEnZ3R6FNXRhyaWScqOtM/seTPUVvSRndlaiMxQEMvNHtGN00Yh0pozyalgslU9OlXpZzIcBafHEduTRzsj2aK8iKkfFO8G2rXPi5pEQs6xkKAAeT/wDWBpLkErjtU2lxx2GlXWomZFunYxwJkhmbacY+nWqjrFruZ1dGmemT3cekiRpIZHKKz3AjA+UjkkD2H3vcg+uLtnd29/bRXNpKssMg3KynqP6d6y9P1SbTITp3ii1HmTDat6BnPcKxH3l5OSOckkjJJriJZLvwtePIzzSWQmMcVzHyCgP8TL17eueCPStaMnFcm66M45pN82x6uOeKUiuY0jX57ie7WV4JoofmRw2GK5P4HjHpW3HqdrMiFZl+f7pPAbjPB6Hj0rpUlsZtMnbgVHnFOZgaiYjPBpkmD4l14QKs1vLBPcRxMrqSq7Nv8JA5HU9cn2rEtLsw2haXVgJZXcuLeNuzEABuCAR2ziutv/D2jwaFfGLTl3CCTbukY87TjjNTW9taCJDFYWiYlnXKwgniUjr+FeTWq0lSc09TuhCTlytaHl+ttZtrmjxWtvcT7Vj+TaFyxbnpk88d6ltPCmqaq15dx+TYeVI2Nx2lvnbIz3PTj8+1db40M0Wp6JPsYLsUAKAPusDx+dLa2t3rgKWJdYo3ZnkB+SEsSWbPcncfrk9q3c5WU4rTrciy2bONtJV1K7ZrezktntQBKADuYg/eYevAB9BXoGjeLVuVkt9flji3gkXRGFl/2SOgPYfgOvWvqehtaXUEmkRiO4toTJdyZwZFH8Rzx2PH09K5K9ms/GN+yTzJpohQkpGvyMR1J3FQHP8AnPNTJRnZv4ECutty1rOlW1nfBrN3e2k5R36nuD+VU0RlbOK0WdW02K0jjlkWOBJo5peC+Bh/YEHqM556VXQgkZ71ElJaM7KLTWgGI4yBVWVCTyK20h/d9CajNqHbis7nTy3MVLcs3TH4VJKhRMY5rb+yAdqpy2+Zf9kU7kuNjHntyI+Ryau2WkWd1BBf3gkijgKR2iqxIlkH33IPYEZJ4HQVNJCZ3WJeATlm4+VRyx5I6AE/hW5olrD4k1dorq1ubOwt2SNYYwcEKDiPnDZzgttB75I+U1tDna90469k7M5fUdfu7Cwi0aZDLDPCjbpPu7CoIZD/AAkjrg4GSOD00PClsiXdja3Mxl0qd2MJfh0CKWdXAOVOFGPUcjI4rtdT8M6VJLffbTC9lDLlo1wPnI3Kq45XAYf/AKq4W30LVtN1f+2YXkfTIJFCyq21lOflTBxnBPUcc+5FbRWvuq3fz/4Jyt6anoOsaOl1a6lqGhqrzvEfMhhUHzyoyNyjq4GQM8849K860jWJE028sLm3Wa1RtsbA48tTnAyOcdcHt69MekWV7Zz6c1+ryRGRfJSe3bY0ZJy3sCPvHGCQO9Efhma3nlv7a6GbzY86IiYDgkk7SMrw5GPmztyTk1jTtOF29ezKb5XsU9OM0vhxLi0V7mVIR8u4N8wXAHHK9BVSDV0liha4iktjKdqGQfKzegboT146+1W7jR5F1aBISqmXaiqHCKrbZmLDagwTtXldp4HNZ0uiarZ2V3Os8Ukcgaa4jlLSKwwc5YYfgH1Y9enfo5/Zu0nuZ8vNsdkbTULu3mg/cRJICu6PAPI9CGGOfWsyG2vLjSoZG1E/NI7MNnPzkycFcf3v1ooqK+mHkXD+IijceHLbVtX0tHvszW0cjyCQgvtJCrtHVuh6k46+gPVT2FvoFmlxZrsgiUkxKMlzySSP4ie/pjIwARRRV0JOVk+yJqKz0PLfHXiJrS1hmiYJNeSfPCpzsC44OOwP5kcd8ed6heXN+krMzFipxtG3pzRRRypWa7jbOl07xHFN4X02S6cAwb4C4HQheVx6su05PfNatpGk21l6HkUUVlXgo7HXhpNmw0YVPl71CoIP3elFFch3kxLFcAAfWqs1q4XcaKKe4MyZb42t3HHC2LpmURDnrnI+gyOfbNe22I0zTNLZnSLy3LO5TDCRjlmJ9c8n0AHYDgoruhFRgmjya8nKbueIfEDW9ag8dX6w3EyxRBFiHkqcKyBsZwSeWPU5+nQVLH4oa4totpqC2d3ZqNjQy24QMMdMrwfxB/rRRWrinDUwUveH2nii3trmP7O8ttBK5YIHEuF+6UbIw4CswBIzjvXocXxAsDbpJO0Eg2lhLYuHGf8AajOGXt69aKKwlGM0lJGmzbRj6Vr8LiOWTU1keEM0Sysys7BWAX1/iY8+1QxeNrsB4msocGJlOZDz+tFFRKEedaDUnyn/2QplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKNTgzNgplbmRvYmoKNiAwIG9iago8PCAKL1R5cGUgL1BhdHRlcm4gCi9SZXNvdXJjZXMgNyAwIFIgCi9QYXR0ZXJuVHlwZSAxIAovUGFpbnRUeXBlIDEgCi9UaWxpbmdUeXBlIDEgCi9CQm94IFsgMCA1MyA0NiAwIF0gCi9YU3RlcCA0NiAKL1lTdGVwIDUzIAovTWF0cml4IFsgMS4wMzM2MzQxNSAwIDAgLTEuMDMzNjM0MTUgOC4yNjkwNzMyMiA5OC4xNDYxMzAzOCBdIAovRmlsdGVyIC9GbGF0ZURlY29kZSAvTGVuZ3RoIDU1IAo+PiAKCnN0cmVhbQp4nCvkMtAzMjNVMABBMMtQz9wSBIyMgELJuVyGZmA5BV0jAxAFIoGi+p65Rgou+VyBXACrpw0UCmVuZHN0cmVhbQplbmRvYmoKOCAwIG9iago8PCAvTGVuZ3RoIDkgMCBSIC9GaWx0ZXIgL0ZsYXRlRGVjb2RlID4+CnN0cmVhbQp4nOy9S5N9y3IXNu9P0UNpcJt6PzwyBDY2ERDhQBEeEAxEI/lgdkMgcOCP73zU45e11urTurK458i+oPPvnbl3PbOq8p3/+c2/O/p/f+B/fHPvn19v7qOmTv8ThPkgyJAGYvxBwP/8lulrIfke9YvmY3EfybcUcvLSAoG+3kKKH83R/6LLBHhZgM/xw/OH4gnlLp/5B7+8/e9v/5HG45MPNBrqIdI/kf/5m/+DvvPPjiZT+yg8k9Lz2X9yH45RLVUZSVidPWNMe683/1Gd/C9/g7GtuctnO81vVuSXt79++9++XXbfwoeLicbh2nuuHznV4HOVHfhDnGOqhZYsy5++vx8Y7rLw3603Ho4POtoS67c4aHHvEm9RiJm3KMe6tohHHdtH5d92IihakTxX5G/+6v3XZnlHXB9uzweWdAyU1lQ6qz5+i4NmfkJqMX+EOYc/0Bykb/lD9rXvGf5k8/57Tyv0JNvj+Z/Mn9b24NC/zDTtpC4L8FucZ+rvSokp059jjrSp+1Cb2XqX4QCa6RrU72u+uFN4AX29VTh89mpCzG+dmG8n/ccRsl2E38lUb64i3L5BrL+jHY09yBy9b/RPoVdkHd1aCEv/o0FZUg7e7zf4eMQR9Ruf+vODg1Mfu2wmNrb5dzXZXBY9l1DXTPGqtbuMV7fd5KdL/bc47cfX9/rI2CmPPf49zfVHDJTd5Bs2+fc0SRpC+W5Df993s4+RMb6GzBtaSNgYc32axD8AtorOKB9Yx12bq+rvPuffPMfx+B79nbno3/zU75itx/f1y7zQx7TPt/u3ON3Hg/3NTtO8EmO6LzdTXqjf7Jz/tvLhD+f7W6fsx63+O1P3b33mP3up/yFKyY9MZ5h8yD8AgeKPIexw2bywObPf3hQfeZG/9RR/t2f1HPw/GOn/Z4qPf+CC4bOO57+f9P//or3Kvw+ijfTz+X427gAAIZIw3FIunv92H9W10JjMQ/twNdM4aWgh0BPl6QJ3rb7Tl7yj78RQ3j/fQnAf3TfnU47vMdBF6FLOLrwHT2J2i3RP5PAePe1ELzUQi8LHIsfSeq75PdSPUKLruUljrtIKuuhjDTyy7EsO1PJ7cOWj0DFKjkbj60drvtPgaJSODWDV1+ToogkfvZXG+0tteZpMSM3Vmt5pLt1XV0KTcWXnacXpPUq6DgKniexn+KMr4YwZ3iBoW0L6CDW32rqXllLPfDkGmlTxruXs3wt9IxI0yuK60krtzdN4Kk0yFGmfVi2HklqnBaW18dRcqnRl8DZ1l12i3Xn3ib5EY+6xvR8b+vmnJjQ+TE7eeFoOvkVa2YZRXr0xVqICMeS5KFToI187nh6UwqhMV1CtREVMBZG2jU5R4L2qjXY4DPAcXBvkIsvIPIVnW2BLqRZaOW2appt5j1OiBzl33eIWe6t05hncXIjSEBF7rPTlHgMjaKWJiJgE+VuE4Ha4A4KnmpIi6HA0btYTdfni+FDIdjKqJEf/N8afie6JVLmT7qmtKktBJM8bJKMSomL+HZfok5YXly/r5UTUOlav0yBpdRgjAkCgh4oPxF4lOnb0HV9aPhDtY/QiFIgoImo6jZWOS3w3nRD9ytBCGCs5d9XhkJn4G/+eT2cELpWJdrVO+DAgupP0Z6KDEKOLMuoaQ+70CElzodRY6BagadZS6eao73Zd0jqsf/JLd58FZhto/nwb3Z8Fs5tMyXSPRpozoWgtmi+lyQ60lunqJRIP/aPX2mvkv71fbxWt0WpLd7MVumfoCMl6+0SLWb0coBR9aHQR0+8/mH5Dawr3dE17Oog0kE5vQEy0/eOE9VgjdctXUAo0xC5tsSU9Ek17JTNPdB/4pqYPrF1t/ItG+/v5hkNte6TMINGtTu9vpqv9PbJMTJTSkjw3dE0XegW8gTM9YRNKOM6TiMHDoHMU6FJ2dI/KKfSp0EPB/hMfMfE7kPXkLmGy6nbMppKue2iyPHQ7NFeYBumC5nUvJfqxoDxqGc7DFtBHesZyjGPXCh3BGJhsE9Nwpy687DNd7iXx5fZAGtc7wMuBoueSqYbousQYHJ2mgaFV5/WmW5FaDrzgdDnS3tI4XP8gmqK3ku5YIit6qujG6X1sc6ALzCU+fvQG09tFG9tlm2msmX6VhFXg97RH6aLTExwb01ghEnV0nKruNt15RFqeTgHvl6druMn7ylSSaMZRb3vi1+jxlM2udIEQ0fFS8XRorYQb4J+7XNmHg5/UUumC9lHvDZ6rE5qgiRQ6KrVZxNzcWv2gk1vUS1E0eDq3QWjIpRbCvHv4HqM3ipaXqJuet/x+sx29/UbuHj6q7/sfc/d083p+WUhgmqupxRZl3iHTiQlV6D0Vx1uYhHqJa6K14h2RbaO7vPTJBjKd1CSHwRVHf0nDdDIKbWlh1o/460TE1oUNpJNUiNcjfod3kdaHGDzdeGLk+JWkXShyUdF0iHvUy6Xxw073m9xUtFDB8UNN9OzpsPmurBIRMHGhVdqiCUTmNQPfUyWV3D3zuvRzYlNz5EezwzOFr3G3L9s9hhlB6l2uVTpw3BbJxsK98D1GS+KUsOjs0NR5GnxiEt00fEbYnYm5b775lROhWRBbRBczTarQm8gbrZtFFyLdCXzqq5c9eT+39dd5QS9sa4t8n9FPqD+6D2j96FFlfy1ZySm0/oHXe79S86VnsQ8xL8SwQBTk78RrYxv8Fnm0aYUYngU9F36uOl3rf6TT1t+LhOW2pB/iHuWhH0CU6gcszDzqUTeWxZT1TXxj5mrxd0WxwpRU5OqOfGxpn+kB4luVELzDdDgaI2Kh+0EudD5n6yJN9gXrMOxkXm0WZPiRrX3+ih4h2g95D7MbdwANgO5uEon8eLdDtK+tXTLTgVexdIjS/FUQV/dqPa36b0IgEu3CEohCwot4NRlU9xlgHnlsJW0fXaj8BmfmrkhayPq08/LGQAxA4Htuvs1KIemkkDm+EI0Ojp85upYiyc0iZ3fXexbWgR+PWFOJgqA/6XX18uDLUzuvydE6v5mFH4NAXHomEdbpUIiPoOb4+aCpFWKgvNPB73mOObdWLtQAKCU3olfi/3isjKKrK8jwaAAlJF0kGgCL98EpYj9sxLtJY06eKeGt6NFKLuh8PLFDfEaYGcvEn/SsjI6nd82ncEHEtFfgQNEuU48swB69FNcaXej1GFm0KwCblTaXpwtAe07LnGTPCw05yRnn80Y3apV3KwmvEh0/rQeJCRNJJOXhsBhBPJhRtXntKCEu2xJ1oXJW93p1XCB4YyzE50HygHoJit7sQrTehAtgsvT8RoqaieR24ssEQRwZv/uKgIms0SoV4USWe/HrMn1A/QbYtm/UJz7iGT52jZgJx6zVILJQ2SeaESRs0FHPMlV6D0iWZtUAIZiZLlm1ayQflEjC5eC4ClESfdSXp1TnK+vn5IkgRFZemw4e3UptbPceGNy9T5iXxQRlBPb2EC9YWO5kFHFEuQmvzwgS+WtnQdUzGfDh7zoZuudikm8RP5XiuJdoXUh4pNb4LiImldhVx68Qyzx0GYkhihHM5pM4IwgeC3FGXpoCiiIUi5FBpBNCEfdLV0OX32RiMruwzp0k9CbXnY+3M9SWnlYFN88ssW5eJZHo2BTdvMRc1LmR43vCZ5rN15ZppPkgl3sK+03IM9/pFTuySngwCBMK38vlmCkhSC6mpyAea0MI4q1JXs+Xg0H8MYkVxHeXZveAEEShlUSUaHdNEFduRdtaatuwJcfXwNBG020nAkEPhaT2po05EitI9hUE/U2UHQSxbUthyN17jVW9QpJ45NuVxQyi0k6CmOeHgxAkVbCM1t9FpCJWLotSKQOvblSRos53tIwk0DMqskzltalCry4bB4XfIJmwsraTO18Ctx/TR4he/sQUECSK5pv4kZxE2idEpb+Zqpib6DSnyGrXoBYWUS75YBcXUMcB4+eHmw5dD1jwJPqHON7JSDxM0lsve1p2r9JWDdkRYyt3K73yrAItkzEm9ohoQFDE9NCnIYlloqeQlFJo0Z2Xw/ZAqb/1A+YhACmMB4cV7IlEaqGaQPus0gXtoa9ewYXmnOQy8WFfq8Kefi5Wg6hQYItbPRHrcBgOZDK0+6HJnq46Vtgx49rp4KYh1xBHkdkupFrB1EPoitjLNMR5N/QELMMT08pcFpuOiBNJqegtTKwn/bTkC+KbxjoMWjBO3oq0F/WEw8EzsySmnsi/JtW0Eivtm6pP6DDS46IHj64fZjiTIuYtM1c9iTaTvlOOLUq0gjmXqIi1pelj3Sr4jcAODk30LdgibR09RVkIHHsPq/cAh3YdgBMhi+l8P1YjGLGRUGzppXtclZi8Mrnp+9YznbnGtqDItktH7345tmmIMD3F+bqvrRUmgHimqK/7JgaDCM+NBbyRVepQDVj4uEI2TR/zC6ywJXlaF7byXJVwWSAMfCS4o8x2nVyOQxbWISPxhYSBIjbRSHcf3QF6ljxbAJhO+G/aNNo1bQXO+k+USJ6uQRpbiqyQSkR/JJ8m7/xQIoXtMzBJXl9nUXqPqRvUy6B87B/jPAVVFO0Wv8MdTc5rrjElLN8VtmdhVGB4r7Rwf3p10nfjDGHzzj5a21ERcUZJIJ4GloViReoU31+mvRNDomRx9CIENRN1xxYk0VoW+jtnNhJ01v7SdcH8c8AB1I8E8jajPCszaas8+yk2NtHIT0Ij1j2SFMgsBHH7zXm1BmQ+epGjpejuoTst5CAHjPUdRGKhNjn6zRPSiTGSJWk2uNMzzAvQaqNHgRHXNRvmgAfM60/9Ii+NYvBwBVb1kWNJozqSW7ouc6E7iVUUgWW0yBxiYQqqRXQNCDWM0oLTugeSpkpX68xqm9bZEbtVxJcBx5H0hlNzhxh0Fj8HqJeoymOM8kJIc574IrnGhK/rngfI3dN3WGkviH152vEKqdGrx3p+niDxW9l7ddigS7BH1pzLegRi2NjSfVm7z2M9s6oJ1L2IUUSJjo5eY1RgFYRwd4SgpYzO86VDvyFeMbLKPohYyTdzZ/8jYrI9W7bS6KfT3U2MiDRWGrGUpSktsoW+uyoa/NYKLX0VxGWHZC+6eM4Qilhr4p35BPOA+AMLI7rXJBi0csy4mAeFrRbSl/bTeQx0ymT5Ko8u6E940LWpJbLwhOQFYrebxkJjHW0lWYSkA+PFCV1/E4dCkRGRl1PshGGbSM9Jsu+Vc423UtaDRkjj1m2lpzfRaGQFSeIqJatlptDVME6UXBNiR9DGKn2P6DrqdUK/r1En2Zu4FciqB+5R7LAP5PAnVx3fXwDNmBRkIejGrswri5sWCXlRPUkciXutJIZHOtlF/IXM6WpWwUEiGC+wk+BUumODE10+fXCBLnvWLolfW2ELOMuObBXWh5pmMZoQuTTyoWSTLcuxwuZ0lWRFQc2uIMR4CLkQYivjwK2EdzIayDCusQjcm22E4Swzx1pstyGa1nGoB2oZWLQbOhaiH3oX5qayLjXJwaXJRzZ3v8uMONFB1hMty7l0iXq50lmNJTrZgsAaou716NIytNbZ+M4OQ5XNredl1c6bbz3RQmMMqJ5gUXar0E3fmyh3WJCtJbIHBv0dKz3G3KkEsB2njhUIRW4hoQS6NF0ep544ycinrhF98ZkdVvvQCk9E4M4Txx3mVSeeBdULil5fX0rRw9U8HbrgdX3Yw690fai2r+RcrsU5dCu0f4tKtFxs/+TJEncRRIjiR93TRZZyk+XJfF2zPIO8jvuR4E3Dbx89hsqW0neiYRL0iVJI7BgMLn2XZE/xWvhDJMaGPSnopuFdot1NJP0RX20wL8R4cX0h+itC5LbBb5FHm/vW+Nf/hqbw7+jy+Of0f/8ngf7bW3r/F2//5C/e/tH/XN/T+1/8NSZgce9/8fX+r//sH/85/fVn/+TP1VXWv//Z/7L//Md//m/e/+Kfv/1Pf/EraxUzjYieIRLDy3vsJADSokViTmSpCr17leU1ujz+kInAE93N7G389UZ7RcRBvEDjEDzEvSyus9dYoKutidUYm/wGdbQ4eWxicljX4ZhU2ZJJbN/ffL96/r3er96/lNX79/Lfl/z3r+S//+WXvYrvuKDsLq1/y1fe/+w/DWx4/7P/AN/8l/DNfw9//4e/3N//+mO2J0V6UWtMNdO5uGxPoZeQFsyx+HFuD+KO7WmVyJM4tCwctGnyG9TR4t9le8qvEbfS9fuA2IWe6/l/wTp/7W/82/2Nv9p//s38Mv39P9xudt5frvvPP8Dv3AbDn+X2T/xdvv0ddJLvf3f/jYp//hEUlYnDpos/sJ/UlaIqX5zsskgfTopC3EFRlbXzxIkEkUhNk9+gjhb/NBSFh/zfPfz9N/vrf4V3wn+5J6X/uLcIL4MX/B32V+L+E6B+//k/zt9V6hLI+//+Y7afGEfOwVQTsRTX7e8ssld22LrsPqCOzadrO9IOUxvnBj9jbHN/Dzv/T2Wf/1L++1/XVQ97te9yAvz17T7+k/t9BGr4r/vPX+Ab92Rxv+f/6PYKAihQQr/984+6Bkr37HXXWf9+IQPv+gcJZKwVyhdCMMiDFEiG8rTh7Ih77vg3qLPJvwdy+GcnCfzHh6P+V/cbfb+j/2L/+Zf2oO8n6I/YG5LcaO6O3n4WUi6bE/IzU2aQx+awk/MD6/UN6mzy72Fz/sV5HP+tZaeQW/uVM9bhGxX+LvB3vD1F5Rbabh9e/8Nd9Y6dwWj9iyfRP/F1SDIgiej68vraNB9eFfaqi3Ul0DdoW0verjEG9TKopkqLyrEXr6PF73BHk2NTRb9+2UR2Bvxvb97RPqruJHfIEUi/xs/4N2tKzs+qOflXsnDsKBZ65TSEmjZyffQkMbOA2jPr71IhQaywn78XJpi1BzRwDmUQrVRmN3VRDW4EyTQftOisZ+HHhz+GygJzS9/isMG5LjE7pVn9g/9Lo/hH/+uXf/+n/+lvq376wwhy5F342yqi8LfPmKtyyqetYuSoCf4ma1g4UHKbbhHDgZLbWsYxGHNEF4w4zbAIT5i4jWYxwfAMYthac0yKWY6Ocfh5rcaWvx27/MsAmrZ2AWx9Q4TV00YeMOmYVr/7DIot4lXvIFm7npC9micipVo9zQwRoCdh8PxKhwXO6JX0gHgdiLWNdjwkmG8vXfpcseFlhmLE/NKa44q/kM/LA1/609/D5+122reV4Rls5keCLlEGrwchsu+O1cKsz2SXrsTQyO6pOfEqLQt0LKg2fEBwUhlpAIjgBHQ4KAVJG0KFYwHKNlPR9YKNMAuZ1gnIaL+zvzCI3XT+GKNbE8s4sW8Qy81htcF+TzRlITm+X3tiFSq/4YWVhQpPdDt6dudxhkTX8D7fOL7yGLGCikaYO7ML8AgYTDL5QcLW7H+DyRfAJi101PoGDjQ389NeD5XFMMDjMRkAuuir89rbWk3PETmtpzGKtZr+fnSfbwdmqZhfJ0YOcE7i1GXG/QAHKypjWokcri0bR18Tow11ECKdLifgwhE66RzqskdIM4GtUo3jX+lqyIV9F2Rygb035YSw1tSJdRLXrBxTFmoBay6DZP27YFLOIRT1i+G7kRXUDJbmfDcubwiXtm8x0gXSpe0cryW7BXg9dtNaaN2zo52sha+5qPtUCCxkd6FO4l1Sc8MhChbV7s3z/pcfYexUqqshs++P7HSl6039kSpbeIgl1aMb2FAi420wQTzlgama+ZeuTwb776ifCjvSNzZtMlzcd1jBH+wTM/+Wlh6uRnGQoZ1m7z3EeAgsYDh/p6u3Ds67mrN8i3lZTNljVG5iXFnCz+B9htzDM8ZuShxcgQEh+Wzz0c/g62R/ni1NU610keCil4PDsUQMF66iKlxmzUm6xygX4POc0nb9jGZN5e/o1aUDbuAFl5YaD4CI5vILGL3sOTHb79P7br5SQiSlaEuIwWOc4KZ4xpS9eoJZptTjUkCM3ehyA7Bn7QLIZprYDRA3Yg74WgCfLQsAC5Ph8WWQNI5bjY0gaWRe9RzVn+NumNL4hcp4aj6bs/0ER3q1GL8o4QY+Tft3J2JPeD/o2VwnCN9rlvZd/Tm2cgF0o4DdwMT8thGLyQZkhvwMr2ZRUH5aA/J7grpvl8W8ktOFN1u0IBgfkz1pQ8gIOdqTCXzPcZZ5CCX2KEqqjxbY6VpbSinGlJVpaGxll6wb2dwi039eGqrQxUTIWPGMr4WaJ+sA2BMNN/lxohFzHOD96VsMHmkrQAPmF2ZnDc3yVFi24/SW9lzM6X8Df+BRu1lUI/fhAwWyKfexlvsZY4TUX94kSAdOuDStOuAHzH5ZxyuN4laA9VTpY7IHnGFgg2YmBIFI5ENXj8Q7AAh6T5jXibHDxRFYjGxkUzYE9RpBskDQ0VEWjNjf6FkHww7tkXM0KDtPZ7fmJPAt7KWt7hAGBTHTy2HyHvbzGF1pmnXNJ3stw+bEx81BTDLqlWTvp435I8Ic/hRKrRDMmVwn6usRw64oZjkw+RtScToBgw1R2gpI1kanFMK+GmK0XlE6jBpFdwWUOp152WXuglmvSbTRkbY1i9m/SUaYbbcAIZKh2sK/kT1v5pKxmH2nJ0zSgV5rx6Pb9lqa5+5ncGQJLCaa3hGz+axn+B6tFX+aebXwsWhXdln4j3aoRRZAmzM81xzMAd/1J9r9SyEt4ftmN+URM7QW61/DPwTbBk5bQfFujQieYE0rDD2fEiCBKm1R0peiyZXa1X+N3Uq86sY6X6m5StN4rUF6GBU5kN6sJhUn3T8kNpxkcMGwdkNicDiWjTpqTYURJ6HMCjdT594MKNjGcQXhdA3F6QVUjt+jWjGfIMOeBDeO6RWE6XEGaB254MxFfw83uqjgDEDG1EVx1AcZ0o8au/jSBS2ao6LvjmiO1L0TlwUd+S3zkWAwZtVn3+j0aU+meJNzaJWKO0sxwfOX2KqQjWKCXY6hByDL4A+SYR9K0UcES0zBWyKb+ogTvk/pE+ZlMYYmglWY5RNkCSA8UovFIIX4H2HyMagqFKCKo8QUwM7b7DrKFBCb3oJMAZmjch8VSgcGskjYtQ64PuJ7CpRQjkcdMXGqHhjOwk4KVs0YAtxYxVDnA0bf1fmaX3p/xmBrltnw+zcKkMlykoWY9yN1wJES8SGzFIeYnQHQ2yfuBBgHcYMxYf/2LZ6NH6vwjCmmtQCtGTuNwShfEqKRZ25AsPK/jDONPKE/KdoZOsS9dvdamnm3nqBw9+UfXnTPV6Md0MP7MwdkQQ+yImPgJWQpJlQO2aX5wksoUowvx42Z9o7IUBGDfK4/AL8TYeJ3MUjDlQFNfD1iXt9g/v+d+f/YIJHl4PyM8++vR8zrxDwwMJx4kf/U3GebyLCtpz7+iAiuP8niwXMR6mXNzgWBmD65FBFwfrQtf9qubEPwMn2DqcfzJoDf4Srb99uQj2VNkeBWJq7jF78KF0EAm9aP+3d2bPg7s/hPTIbF/D62I5p0B1az5gen9i3AfsRcgO9iXjh6+N28SiFBMWTwZ/k6MRhlbTHLevUNfN2S4lnz+XaAdjoWSQByB5gDk99mY2KQEa1fsAPQ7PnEKGBRLzhJYeo7cEKyYAxCN4g1OmHm9VuuI8KCgXz2EDRP4H6AGowOTNoNRhclLTUOC+zqgLDgvTGQ7BLA0syaHSBkdo41XK5Ubl9sBkmyIHZWiIXM4Cz6sNrNoWnbXvBpZPq2jRVWWd22feNEmBRWXDWEBHfP1Q1EFshdZOPMcj7XbWgiChT2SEeVt03CfY9Q4XduXB2jnpI0IPZSg+r8EawrqpGoWwO+4aoZZ8+jXDLBk7gj6fg50DpziCyBxXupby2Ftr6z0k89iLY+4Y/QpcOo5rwNPyxW7FdD6pzpOUbO3c1wnodTaatzGrMiYBm5vjrQfNbXJu92sza45EuzGONCyA2X9IAjHzKhErm9zKxaumFr5NvQCObuIqchrpxPjxY9Srx18zWGruQTHOc0F52qdJ8d0y3EN/vhFcm50wAh7Uv/nOGtHUrUR8RyLzib2oipEM6ucvwbTV+cmHrRmOUcaZ15RpVVi1krL+iJi9UQ4D1cDR/8J3U5dsdA5ufCyd3Su+SVjpyiS2wQ07jOiVtK7MEV1Y3zr+mlLLZ/hIu6Xe6Jlm4+b9I2cB2NeIH51N5Zox5KH7HwmYP4OQ13lpR2maO4pp2CvUfBeWKZI7jUA8AfoV6gkdvWpy+MRpzcVT0hYqZ/1073+6fXijYO4oTX7RitgCwzUt20lsvRThSw54bUdSgJeI99QdmLBEezEOI9UK8/4NDwPdnliDNdDXgbAKx+LjeI13LK4YAI228+PrNKl9+axtNMU2/PaV34rYl017GiltX2vphEMHYZ4e20yxilsk11TRDs8lqycHeJXV45jTuB2eM1eXE0W5Owmx33nYjEYcCzeI8HVZ9JS4KIak49MJvm9uUsYK1yPsEqLwRnzegyTkf8ZM3yfbqHOWiKh/NeDZ3Ti81To4kyQibsJRsab0zPMowuy+OCYW2b/hoedhxtEI7EQuLNV9HtuRmn5na4MjOWxzJXENTuG6pOuPMnG/464A3Wz2+OpO4N3U6yzJEYHcKoMCIcSTWU6pfnR4Wj8QRdCvRqDozbHE41B2YYguQ9TZJSMEl6QTEbcSIrvg/ogeI8KOiSY5QTByIQqcu17NjvN0neEAITDeSaxVs+VFd5pAymP6VmgDbDX8qK4J+mLKMJ3CSRHi7m5NJ1TnBogMU2a0/va8gxcpV0godKPFthBjvVzJVlsjx0zgf2R+57kZo0uT/Si80FvArHVrD3OmfkYKhMz3M4SZQpKVT+lKw0nVNxdk4CxnD5oWcxIUpzrSIFA3NvWAGIQNF4izvyP+Dr6HdkyFf7Bgok0w2XLvCuoRGrIwt/By+Atr3VDHRtjMnXA8JEQx8SNo53+XdNx+RMaShtAZdj4Mvq1VCogu0E6JoOjwngFds+RTltG8J2YOrb4XIIytp4HfJatojxhEsdkEfwclnkZoTVbsNbThDCr62z7sEybMFgyrKIrDvk3x/BKst0kZMLjmZdeVPY1yxEiPCYnqiCI4TfTTFCr2FNvlrnxGj1z89YO0P7DB5lOA/GOCB6BPNe3yJeBwJ2O5txjM+mxZGuWP/AI7M1Bs/gOfrPN4uAF9oigJzz+3gns8lLKqdsrVWwJL01KwE37juE3PEpGwRXXeEbrmnmU5EUZHJVbkGFhh66E2fXxolAuXSNwFNznG0OLgaGclYXOkAHGFa673MimVMHlfZ9Tib3wzsF1wGC1wXvtYrUQkhI2/xgG2rQEHS7hjYXJnhpHuFAwN7dAoAGGQA9YKiZhS/VoR7HA2Ci9s4pIiKOQYOHzSPUhBMiYl2kFryOeIe7JeIlYhEVB/mI2F5WcS25wJl959S/DGeuXi5+Udw42WaWTziP7Hvf2paZajUMVgIRWo8w6QuLCJlu0IflHrzDAAC83vOBkHWIIxASETLdKM/fUug8g5cWl9vfiOFwMNs3CD7NqQvvIqnQsoQIeDrNxcUqTEqnEWdJXuj5NKfJj/C5dQPBx7kp+8IHt7jtNK/DNNEQE2yXIR/LQPsVOO+/uMbTd4K0n2RvxZO+sVquSxzvXvwhFcUUj10kBE+WE753Duwk5k3XoMtks7ABPNkapfUukx0cUebJ+oGQyWZenCyTrZINcpxNj+W3EPz5ZhEQoN1VTuQ03IzgANQUJA6YhalQk8jJHH/K7DoeiLI9k+1JLEoMScqBIXh5W3dgLqodJiKEdJKet75e8yEzcvMiSiy5yg8hY4Svgz7dD+Emj9sOXti6s9da8JoDKu99NS7jiBl1QLkLMQmcgDVKgKuMJKy49+cvRHQpuWiSQxaBu8KZONyA88OW+pS2lvDC6fEa//9gLB2S4pIOT0oX+DSvbLFtIMDRXbpgpUXN6lzKTvXKeVXRWiTVbrETfvSbIxuqpYJdGASvgKQud/qAZ10nXoHCSW0ZzsejJ9F/yQrUMLZAHvE4MPSVOuQ0eca5Csv0FOYMp5hdHuEagjsfkOl1PKaN6eXd/s0Fs34z887zqZ217tjr0cC9oQPE2DQMiElAIRZ+mws/2W3twtiEar7PKm9ewKYmIyY0DTrvsuIDzHSWpa4eY2SPmpZXEjpLZmEZLGTWTvCqWCftpDuMPZ+I+Qa+zcxpE+zn2xPmdcEwBbasVjjhD7PMOwoFqtQhL5Af8CrVlKQHP1UMDGf683ok/NRIhPGICwUAJ4VwbQkwcliaKnwsRuivxX62BXCpYSUfa9236rAKrnIKhgkLRxaD62cr6yMChP1tHnoEL2Z4MV4DAfznN4ht6yubETVJHEKx+T0QIWMKpU62gF+aZ/AK11ncwkDIvmmOGjSJHohdegMQaCuFl7ibTyynoKeJUEMK+q317NrvAO+BCHhfm3WGmHO2YJgzIlT1AZ9RjlxMwTMYAiQsAlQl27f8EQzMv0UY0RIR7b4hENBxNEac3rPtSGoWAaoFli3Z3MYV+ojs6H0sXsVIMbdxQubOuZNKKdYYDsoes3nRiY4LvQP10+wfk8uoH0LnKzyJrp8hklAk8RH0ohwXqLBzSdjFHdXocAxA1NGoVUCJFZ09mBsxJCH53KUKt7k6sIXtK4Dfn0VhJUh2PF6Ifh2AmdaEq2RKieTIihLO7qzMA1dAKlyeg+Cteda7RvM0xcGLdfFQ5+XgB5b+S3yUVJnu5mGNwQZlgE90MN7kTlO6sIGRMa3ToJP45ktKF041znDid4jX3uEK4pHtTblFv89rBNu4RiDMIxvBDi6YdetEsIVfMMtoHfy+gr6BQ0C6xWjTV4AIP7Jz/InfVCUsEWdiU7DIPLy4TuUfN4pg04lhoUfg8tTKeOaNyFBhoOMBNaVg9p2JGA2e4F8TB2owDOdhhqJwGWdSOI+Nk/BGKTJC44wjeEIUS/ziMmZq3afLPksSDBebQr/AMeglLMEHEcODYk8DAzIQvq+zsCUlhGvEhky7pMsveNpRK46LPMFLwHCeKt9sUSUQvttGS/wtrhofQWaZERbMw8Yh42hBTQPH6JNgNgljQnCh1ukKcfPCodsK5QaDJyKKJKVln7gwWfJc71za4utRiq5KuvPWg1awm3xy6Ps4qDvRRIz7WgJ0LXzFx1vwcriYYRJSfBDgn28HZuUPmKWMZdBte2gc8OktIg0tHjO07TnyQ7gzUwaMzvUbQDWUazGb3nDYFd5nnP7wrTlBrxO0PexgtdFp1IKFRDQwBxDFhBMbxPajfgRvsitoajow6KptMZJPnLMssvuZHKssfG5hISsUhctBTMI9FhHRihZkUGWS3FLlQ/KFseqM4SJeu81ICu8ZtpCJcGlpHbgwotzobLJAF4MyrfzrymPirKTM3K57nOAsKoo0yXlT9z0e2HMnJ8fXN+ePGjc5nHoGz6vcgk057Q+tjqL8M5EVndoyg7/nyxPOoC6DmZozvox45FUZaFGZuKjwqYFj+NTMaRiaPF9Zf8GrnIL+Ymr4Qt4P97zu+KFF+A6a08LC5kEP+6n/FoMPusXsh9v2smOdLNwG2iFmnx7bw1LkHnAIAsdQupD3VfI6MAKY1bqNpHo81GsoJnT6wOy7xcPfz3Ab/4iYpb7dmQBGeWgMALOYtSzKYy0yuGDEq9MnrS7PWmUpSU5LT/OtTjU6rISWKsIeXN2TWWJn5g6JrYIzc8HFd+b+7YsknLl/55t2gNdjur0d52NsuthTD4ZOLSY//gaj8kx46AMcXjxE+CMgEDHzJwd4P4U4IoB/2rG6o4sfYGYguWbKOTCbO7DwzQPAeBFup+53qdTXjxHLf/NXMJJyJWqFnMCk7DTkXFKuFJ/VZZOPbip2HsM3k3kWu44eav0CYc1EA1JP2MKRXQKa9sAu2egbDwyTDQCZiRnWBBGzXFTVFfT4KGQfhqhCADnfyzFyyBLbePoMN2HvBoNX185IhOwSODjMKm0ebMvAG+ntw/Jmy2LmiCyHcnlLhrN8KukdiD+qnORZBZjlhuGPoByDcTCcFWb6CC+HdIsYK8NW3zjp9LBPsfFC6mx+NN+4CKKWSSO+oo/o9m30LoZ/RQxkisSY6pkfjlNvH99f8E8TEu7PZxgx+AyvB8+PZ1hKeVn4eiPs4+nt64F92DsfMfFYRfGNTJo0sPKeB80RIM6RtYgdu/CeVxft3KPOg/2NbQQ62+LnTPTt5uPf1aDf2dqs8jIHNmtVWLaHuyZ6ju3kEc2LJvlEfU3qcOo4CWaRWrwfKVauBzh8N0ujpZGRbjqHp0ZPgK855Si/4ERpweucmVdl25U4rXTPJe5VBRFiFZpnePW+hbBUEJFY7iJOLJmYPEfLKfTMmrau/qSZS4hpxTfjwpINDaJHyc6w8DO47GgZFc2sywoxn765cS444UZUOLPZMXvNBjGcYMTFhX0E84io2Ba0oKoOP/JETEeY6R17ORfh8VyMIr2DNpCaB6tQ8whGWezmBbNYZ8QgM/8Ih963+HX5BcLhF0/wLSmmYKb+OhBrn7aMKoXUxs7m3n8Ns/Q2k36yRL5NOTrr7srp45KuF4zc91IU7xm+LOIz79pgbuK2iA+vMH5kXxZxfEa+HVv+Bj5IRXu8xUgXojusySAYLLKu+totkzHDRTpuowb3MBlrFyJPd/3FJPhjDtNibMFYjvweISPdNuZzDmj/xQjuBBGOgDng247b3C7/PuyfLdo8zhofKJharxhZ555tDunXCl7s3SapPjBGdfqLsXxxfKX9bA1gDX9qEYujsLa0bxARm0JEfr9+3kbmNgwkCIHtoJ9GFxJ7t7PuLvhEfF0VN6dcxDjMs+BioXU79Y3Jbv3UiHXGqtIWA7P6MQY3MW5eb+vBEGT1bj/BdKMs+SHmVwFbSSfPSCoKYoAcPyeArTriqqH8QjnRz6HqiDAaAKa/mKoju0ZLdfSwdMcWgRHv6xFzbER/3KITs0283WisNxyNiA+9P4/4ZRKfQRdfgpDAH3ayd6zgblptNQgD6Ngu21m/HYtE1oGddbleSfQfIvZtxmGBhT1ExPxcEq24uHlwCdWUMu8yHbNYiwRO+I521hkiqY15geysOMwbwNE+wOusDTOl2q0xptNtF8Qh3i2D+EiXMdbem2gaC99PzCN4vvMm+AhMTyYkB6082Ey4GwxCG/BTarpfASAhqDsY/wQiQBgsqldXbAgII0RXK/HEKwaEwazTDdljHAdYn2wJ3Vu4NUrZZjb4/eFLn0+/Ppu1qakWc3QiFqcD7gMnwuay+gli0euJ2Bm8zJiWm7Cdw/bLNkspm6/uvZOzFpI9EJu2NwLBw0EhqJYAwOBXbBHLF3uKK+r+spW5Bjxdsa2s3tE7GdUBffsbn4jlaIuimwWvzQPwNoEPjyL4PkQwLe/keYC10wW21vrhxpScf/8RGFxsArhFTEesuDKLAGZ5HF8wETrBNBMINzklJlyv0WvjJmOE/s42gutjwLjMBoE39IgRgxt6jfoZPDbh3aYmQyco2/r8vsywY1SKQAzHhlN+RJggreBuo7QEcQZqjbvA7RQMXRWfNWh+zVGkpavas+szezq0MP3JeyrCBbFBiGCweHcLdYljeFXtqcguTUopsWM4KylGM1PYGY7h2ZelT9ZZsWN408LgCIbS8B7cuPs+5a8TIQ76MWsR9+EK0DXcpo83fzgCdHWLUNc1KRg+/AC6ekVwMjsGTzeADllfwDUdwDsDgSYYwfpghMi0IRpIyekYvET6soN+KoVWR2bVXa+tHOCS1wm2iExfd03HA63TWhNLWqU8OowGoiksIvHicypOP/Yz6TUpW1WjgKc5kfvnra1jNHnaHzsHwhIpaLfL0R9uW7toC3xu7by1LSWsK96D2wSAd04JbT5sAgnufZgNwM3PJrtap83y0QZhjuq7cd5jllHc0+St45zt4qEhB4g10uKuKHpqMysT2omLAAjN8zvnhcFdsIXgAug73iIyRI2kRO4YbjLf8Q7ZoWAdHyhMFH2P0DwY03kYEAzmc6W7styUJWvGcE2GP7X9GRHQt5uyFR1WRwd4DuywRnCU35e1kIT5SGB1IPWUB4Dh4O/gn2cTyA0ajMn3hWoYLe9k2fJLqCay8QO+fY3RwAIamc835EqwFNYBj9DD1kt7M0u0moAW5hv4to148yACh3boc4CTPNra9y6kEThaKo99FNNHodeBeAlVztGTUEMTxitVulabhqfW4APHgqCboh+WhCCXJSenkZ+JWiCpWl48K7Kyd6IWkOAXFXHYN2s0IFXxmqhJRcYZTpT7hlMhp7Z6gg8CZ+E4SzteMkeMtIgsSTctGxEkdUTZ6RJlQ8KxtYjZeqafwfPBo3vgjL6Gg2F2ReMxxVbT1TtAbslehakU205WCtw75+6E1TDiZCbGcuroHrs9Rv3hOPsNHM+Fm+flciYX5rC72ggahG+NiBwUyB5wAC4t7oV/hmNw+NPd5M+7qREHV5oqSDnsRZOas4GyihKXXSmJamM7JuOmTsSC1ITsPmz+8jvAcUNBKzZTqFh8iw4xz2KS0+IbR3D+LD7JVLCi9efKgryxsoxKicoyBCA+HvSYyK/F1TyqHCLHSW9KFGYsRYBgYIluvdH9oNNTWLtDPDSFcTMXjF23CJi1HF8n5iEr67cYu5I/w/jH1h4x79eP8MqjZcOI3XZJAVHlNlWDYpyGxq7OgFHtj3HaGbv4AraRIM9r1C5bXbq4Akbm4Rg8rYzdPMSoGzDvEeoS7h7Pbt410FVgOkCj3Lh9BzFuyChOUKPs1aGbuH4jAnsxvBZdMvGPTnrexGE8SQKUaHzHxexaVSoV2SnWZWnVqKEInuMAXuIs65Xw80s/Y6rDcCwZSocI3gRinVJQjzARcjNAeO75ed8daFVCPgtE8uChwIozC3oLt6y+96jTZ+kgxuZaDlqltLtSVbZmnkPSSDCxkvDDynIUeSbLtHLIeugCs84+wfdg/REocot5nRh0PfwOg/2j3xnCsWAHztAU7DAAEUDwfVwrPDChJqfWzMblS0fNlv23h+/Y/bEmhgzDWRjVQkxFAWJQr+D9DspARYTXM+Z6mtQxFRdeD2Xm1LTnqNh7YuhvLtTUQruO1hpcbjEyj+1C57a/0wHH+d3CP8+W1rhQcP0GDpEfB8bueaG1Zfcqfe16Dlkl7x5J0HRDnVl9a7U2S2buODCBvhZd6yONFjHvSoAh0bkLyqHQP6HNwgsIn+SuLQEmxqopro4e6AVpTl4TO6a4V/DArKv9dWL2W4DH5RlezLxvMarUOPdJDjTmR7BwTINkKeEW8zpvwj2SZ/gt3Vo3UvjS17qL2KkMWrXgNaS5sKWvB2F4+7ntlzcpp3ajjfLuOoHSM35d14J5hxzOdjheIo4lEhkxqpZH4iU4cF3IktVwU60qLHEYz5GoZP1WTY6Bih1bz6kBz1OntwTTYtChUoM+cNghwyO7vgVV5DNNx3VKiwYpDqieUT4byfXj23SSWtfcDdj29GS+DGZXHjfLM7/fr3eShe77ogjPYst63SFwbca+1W62cEOHPrty2XPh5jhK1qmGSlLY8vXDAbOZeZ39gGnb6JRoKA19Eg0loxOlQ6XtI8JWekkp0AUgnbMPggvqq5xcDZxrUlT1MXjO13pzhHSo4p4rdUGqujaxRVe9eUW1J6lLJfSHvZQZPA25GaMiGSFf0lycotoLcWUz0cygGhdZ2wlW3v7901SZy2ATZ/hUC0Kmz7bVj3nngGDw1DnmkTQijppyS/2YNclEaOK5vXi/rCkpWgwGPKvo7c9aLYWvfFoVjsghskvSt7wPfD4IyoemtgtYyHmmwt1wz6+Jdrwa9vKSVG+Hg0o3i9C3Sr7/DmFK9pNs1+KnRi3cLk6OFgG8uiSa4dS+NHCOGGPWKoo7dZcq8Z1TEXMuj6S5f9c+lqOsHwx2pbezJQO/QaDrPDSkwkKMB3il6Ds7HrmWxf036xJIuphQNG0xx3PR4hbJuxTDSHJ8SY4MgNcE5Ps/x5ZfP5a9TiBVWgSkRLcIjAqo57pewH1us61VOfy8xvKt1ivSEoKTaeYO8TraX4hn8NJ4VJSKLQLMOlids+6JWUSDTEyQLwHzIhow8Hke/BQgrb79fr5vvZpmAIHjh/b7+Xl71nhJnpCj2l2XZ42YY1gFLcoI8KxhhOisszQzPWvEIMPKjm4qI3iwpBkDCyKsLudbDKdKb15zyoRMHEvoaeZKr6rAjY2WnTPF4soMreMFpLspAw87h9VKDsRcs1znVSu/ipanatpeeJiavgxVc1iJr17RdFHbruaWs94BxiuzWV8JQ4yIye8nYNGJbdwSOmLKHYF6GwWE329mmLcYPZN8VQ8uTiRiP85kDcV5/QHf7FVv2NviJHrqWU2bhmJX7BAjP1aKpSahgCx6VnN3zI1uVy8SNwv+Imaf0/ZhMxV5daUFdeGAYBav8/PpdTKMngaBFG0Q02rD0BnK3LeNR5KGjdjnjkYhRsxg6b6tSJI0bMRWd7PW/biex7rU4UPZRsrwpL/aPpQ7wbhJMWMT7wPimCl7LWQplMDuOHSOxtZx+Ysqeb25KAYhjtfA5uTH10A7nm9gXWzPBJhKxvZTeeAJ6/v56b0qN7Mu3aq8ilidYmBeZSVhZ66TjVTEDjJYFlR51CVSmo7r5rwLMqN1s9LFuKIaBNYkgHawlgB0O3joJcJKXQaY1vVzwoECPJoBQYMWAX1jksEHMEzA9LsEFcMJ1S39DC7IQjYh1C1APcNNywDHAULzARYewJvr/sU4OmB9oC/jSYGYl8WkB8CyEcwIifU4IgYdKJaVwJRRsvDxOlrQ6wICrkEeRhYbGD7lOIbzwygJVNIW5FSoFieqor+YkpyK+CJE2hJTdj6YA/8Bc1mD6Tfl6RByMh3JbcdWmqgRwZwRqSeNVGeJPKmqHFbccizXFYdUdO8ao9NgfW/337rAhHBQxi3Gur6bImaWlpDvMvB5RD9P6rPVvxGzbC++b6sXw2eWH9+32Yvh27bj+7Z7MQaU1svwhcWszL7Fw9SBGBsMgG2hGhH7rrMswjHaOusi6GhhfuLqV5StxPWoszLCAbeK5r1L8VA0A+YknqPkHDqNhrI37+sRoxZ5Om30vEqKEK7u4GKOat0PNNUoqQAjn7OoCQB2EhebbAS8fxFzwNH0cwv/HIUmcZACeCqWeMHMzOeIYbhcNk3ns8LgvJS68JqRME5PUvWYkbum6w+m6ymaeBk+PVVPOCwM2GcR8zoxhxvCut0wE42H2xAz13i4P22uGw83LmbHASuwyaZj4bYmN2LAVfDEyAa0+H70LSalHuI5WjH0hjBWHefXZvWOYz024dgVxOLOiKlbVEEz90/gx7wB8zoxkEjzaO0ZgyEEt20d80DH0wfM68TsHDW2D4Tj91co8aUPyNh5YHbOINsHwvH7MwLIOlMA4nUisCWE75xBtoKqncUt5nViINd3uCkArEntELwTL93UBZ7TQ4TtGzG4Gw/wI+Vo2OcwutOv9ILZJijA/BC+HD2OTDYFHeIPTJlqHYaLYVmfmDK1QAyX1zTEeWf1VZhdOMPi27rlmloKspifa1u3opwRzCQD8CPBjf0FwnHeO1sTwD/fnjCvE2NXZHH532JwXNjWExyiJZ4wl3HZOI1nDI5rn1gL3+fPwjFRnMVgCMuSkw44fP8yscPchH1NuhstIrw8jm3/AqrCfT1i9gmS1rJx45YRZnXjXsa9kIHlcpBCJRtHIcRgDh5JqnQB5CN+YOc/glbnHCT/UTamZwOfc9M7ClrKo1C1Ab1OkGW6foYxPB1RUeUgcs2Rxgacoil0IldybHG0xRYc30wSqnywVzsNlY70lzf7bYxevkcguNjMVuVcoHKdl02xtkqMmtX/GdymWDNbMDFzrLGfDQHYOqPttFDnYtxiXhZT3q8fpVvJ7DRZQ/ltzWt9NgCoNgzfKy5b+A3cjl4LRnY73dfb8RuL2eOzSyQt++K/g9veVx1LJLuvR8zunWuamqyAthd02MPvA2mLNmj/puJN9YR5nRgb0rN7qqaGkf3NMwbjgJ7gq04swj/fnjCvE2N735gGBodn+B5Vw4DeA4NxXXtNnuHAdh0tLczrxACvd2B28p0OVNQW2/gA3i4mnKZ8JnJPeeqwfoTZDPbRCzC/PPnM7htdJ8Ia6xEfyD6CdCVpbhH2go/Zf79Yt5hL73axvsEQW8lJsgzGa0CgOCVxL9NB2GsEYWVLsYx3eBSrzpLYSk4vL5jpgnwsVpweyyfczFCY0uCzwTCcWk0jGYooE4quobC9OoVgQkGZT84k8QpGyh3VfBJDgEhTA5+Ue1l0kD6P3xwYWNoda2OXVgy3ZWRZhKUVS2906bq0YhruWj4bl1AsyTFf4Zu3NRi4F8wsLPz2fvs8bz4bQ4ltbbvicx84Jnu/IebQLwMmnwNF5TXC523DR7GpviDNeE+v0cLEo0g66DgCPo9r2foNhDvM68RsD0+7BMYEAHCrJEYMuiWugtuhXD3pTvj24h0YcOU+MJh4cy/yMxzyBhpMxhyAJ0Y8J0t+N6SdJZIjdvXc3ochayhHWffMOj5ZYzmGg+U+bpAX0awgwI+1hXyJywfchxwNxqsPeGKjIsP56Dotby8+4L4LEyy3UY3gA56z01/w0eUKZ4Yus953tV3gUOvAPNCAOX6B80b4EnmOo1vOt7SgZWXKlrJEJ8bvRq5S5+h286MP8M+3A3OEba9xnRjkYa0MtzE7/auwtHaYBr5P3BNG1TG10Fp41Z6zQ5nXFBKcgsFpfm/JPcmZ3qZ0qCz8PnBbWh4YsE5MCVTlAMOBW4xdi59hbiRdwVQ71GosCnst6rFKe5nPuw9Zz3xeoFfAnP7BCFZcGMREh5aYAxPAOFTl5CWFgzFJTE4hSkWHYMxPbHJKbJWMUMfbazIKH7o35W/wHEV3vAy3o7UCwzdt4Ytx29JFlAG/6a9HzLE7p0v1DzDRusbj2G7h4fTnRgw49x+YI+aHjlfurNJnH5+uOcplH+k0li7wPnOam9vt7H3d9zje14nxK/4HGMg4aq1J/M/mOKOWZhsFSZBFjaOYWxhO+5OlPbZ3PYt2ew+MPWCIMbbbB/h63uPyvmMzW9Hp5mmqjVLzRRKHjJeFzXcc9y1w8HNSQy07CAtGTGDCyfE4OeWbVH8aTlQGat0HnMy3J4N5nRhoyUu3Ph7dehmnb9dxsotkHKcKZ8Y+kuwHtRbAyxjHEozfGtBlWM8DRozmHG8tl9XMDcj+Hv0N7TAsHSAGaQrW+wEMATeG/bsJyhhwDLJAuLW6I8bOYrNaJwYPPlJtg7byeatYOtpvUT9UOgsj1cwYwBXQctFr1kmkQx0HoNNJ1iveEWW7shZtPS5z9Rd5zAv7umP3mMVNIdnNr6LUgl/EuYJscxBaXefENFXXOYkOnH3qPifRGfegus9JdOBQxE93dOB5NAEzsGTSsh0izh+ku28xSOXfYXbhM/vItjuA+dfkyLR+s96xtOEVM700GM4BOEXL7tXp1YGhBsdhsBisHYAZThG+jUPdcEUWA2FBHvID2mypBtPgUGPiwGc41LM6MLYPNLzft1Xh4mjbYIfw7awqBsNqeI+2w80vvSMGOQaL2e5Cwzuc3TgYvjjC4U8uThzNOCQND3TOnRUauDANV3XJ+ApBAL5D5jsbHGDHZBzKLgAtyUfDkC0SV18VPqWEXxolITm7au+Hf9vp2o+YI8cTYqaDz3hh1QOmbwef8cSKBwzDh4PPDkKQtevbwWe8sOoAA25avptTAdVYfTdUvvO6WDhmr0N4uU571DFcfXw9Yl4mHgExP4TbvFpLEYcY37fiLvqdU9j3reqLfmch1pamcjD6nbf4mMVKcPw0u09zG2DhzK9HjL1BojeKze8wUaIOktSJdBx1kFrUO4/jyYr8wrGZsvVi7kLs/fPtwJSH3k/MoogImXrxPoqQqPdp7iJbgcL2smK4yosKDvhW9zZDKWhAwQfMriM+eh4dpI7nEE0+dQcIRMjExPARThA1cRMHvwl4kuaFxcAuLC+7bo14pGOf7Y0SoWvIX4+YzSlcluwZfkt46r5/t5QGDtt4wDHvY70nomO032KWPaFuTxuGL/tD3b45DAeLRd3ePIxZJo66vX8MCePanvNYnyJko1ZCmanPECMENHKgRbefSobPHGjR7adSYxFmDrTo9lN5jGo9lXeUoPMm+sk7tTDu4BdjZvZis7UGvI8hgO2NUs4LjtWBHP+UBm2MgFeG88UVFSz3GT+B4PByEN8D5nVitin0Gb4PmDcGKPvF1wCsSD8/47bHGCYReQjcZvh2CfMjcrsMzCRUn1dJ23O553k/pm8xy1z3dWK2cTHvCLNv4GgSfMC8Tsxeymf4iuI5lvgBcyz9JFStNW0GaXcVF+IBIxSy3zlMUljMhfYEB5fMow+08T5gDmrDPm5HK33cXrNfj5hjhngFl4eruZhXuZneb99x6QMvlk20xTwYeM5uR3v0Ab/4OvswR9Fi1vVfNP9P0Sttm5+LWIs8B2JEbwzWRexLYlOKHizcRXMSxV7PncLRxoe1eh4tXP9fjxj5DT4mduXX964YEmPq+AlLMVp4jWWYOipqc3RjjPK+DUrct/lakt3Brn9wXXVBsKRe7h+Zp9nJM+buqERYlwsvL/RTr7x802f6wsvzs6l9nLy8JButF15ec5LWKy+/dha5RrxLHuahIXnQGp7bes+dHvD1t4Hb99VitvtSMWqaDbffxyBdcL1HjK8PNwl+f3BRWJR+x2KZLxr4ZXmUF/7lHMy6Tr7sogLmOBJYWhAPEWZELwYwHjWioqm088lnL09zbMRFFjcU9Vx8WJ9s5MvX1cZvmgHoxy3EJnjKnBEYE7yFkBSS4Cg1PMFRB5FQG8hzS5DxtKO50iesamQ0Oolz5IYqBY45sJEVIk4mQAPmHN2iEuFcXZ5zF/oIuWCbsQFFcCJuxjJmMVtrZeHLp8FHCCICuPSBmG2Rf4bnVWddS/UpqBoPigG6b66Ck4KFJzN5Nl/36NWc2zhhTZKieC1kVpJp7XDqlV4dXl5jnpbN3Goj60NiMdtXBAJgv4GjD8kDZtPHCAiD2pOTpjDybWFyzTH5oCWzY+ixa+3KWlvMJQ932ppJ1il8lNw8yOjBIuzhLUZO6w4uMhU5+cAKxp8OJsCYXDCFq0M619XFhMswZ32+2MTZxLG4SNXm4NelImtivVswqMuOqj7OBMOnTsxtwXCP4UIWXmBN8ASCEGgLpaPIaj0vpqZEejHRiRrPYgBXQlyqfSSs/AhCIrPaDyQy9Hj7FjPL3TKGuaCiqvBV7lbi+zh9saZbwLg/qxCDKLChB5N6IEWuBcfeKGHk4PCsPY7Dl4OG710+tfJoyrIYu2SIyacK/wJANdKh7Z+LeqfrH1lONtyUaTowdnl/gjkzfexxoWbawrd6UJT5ZxaRFIiJzap6pkeYvqVLH1qi2ybJO0sntDS3E2SlYN5MacfNHvD9fZ0YHH413AXq9K3GB1uz+hiLQZEK4paMru3ESAF5VuBGt4vSyBXBN5dqg3ZZmgcO6nNdj4NPW318nZi9SXlfNwf8tiXpY5VLOX7xE7ht6bYP0X6mXcTo0H4iBpnWtKshGbY4mV2EOEFvAS8B+PkvcLPpqqmZ8DGwg8vlscz6Ajz6aWXisc96BAyfVinD0/mTyYNM8F+PGHmZUY+y7iPZfKMdg8vdYrazQLaaDIALmDO9I3y/5ifmtVjfqZFZbT2M9wn+Ofbna26cmQby68jo5s0Cf4tBe6HEdNXEuRancYWlblks/ruFZYzxzp+LhXSQV+YjQzh5pz5S8hg+BHnnPmI4+BDknfxICGf6EOgXlwdBHuQDMTrYsZLCXLdjSBuOqbIe4J9vB8buxu4d0+DmnQvugK9kXnP4ADCXdVafjFrzOfzllOG3xZXBki9hyKE75wBjZj2nqd4NsoIwRr9Nrgcc3pxf3mZJ9TFcPKwPmNeJwSMZrZ7VYH7WmsXgXqCbp8VsZ8No9vUWfrgBQhaWw9ExQrnUbtjfsFuYoulgpi0GOfkAsauQr1YwO8x1p769/GSFTP4KRlwEgmI4B0cJKtRpAVancA5t6KXYGuS7870utZ/D/QaxMv4i5odwK+8ipu0ViTuP9onYFRL6jvk9qAtio38Fs6kY4qY95LOJED59fB/d9C3GSOUPcBzTzZqMvpGyLAboJ5orawW7fgO/HLesIUcw8bm8nBP4a00Qj08c6y5iafReXaeIR3RDvcGZVV0afDR319Ka+ThtK5L68+3ApNn5hRwsBiko4rCAeuU7HHT7I7D8yT7y5+lYiEv77OWbmjY0vX+nJw0rIRjODkZjBuJ+zgEh2oOEh5Q8XWk0u1MUh2TWIx8jxXO84J9vJ4YfBd+EaN1KG9FFBy0ZexguQwpVp0DPTojjSnAzYiVIaWd6n5T8+RH3UmoIVmNehlV923D5DAYutALqNnnBcfDPcHStspidbh67RCctC0eXPYvBd8liNvMXIccC/GJSo9zwNtls3Am5EfM6MRmuJS0Kj7oIg0AvkG8Qq0ADYg74lk8QDs5On28HBs0MEfLvd2Oa+A4jSzDucTRb/hSDIlHaaYCDLduZoBBdN8YtwEQoXYvq6G/gU7T/NJrtKZqPgOGkyZaCettuW1Va9eSj1gpIktQ2aTYnX0dICxfWbrOLmf8pjloBpUlDqyhg1FoBjXOKH/BVJ1paQswqLP06MVlnFNa8h/ll/eIJblW5xy9WebWjB3c3JqG5i6WC53H8AhcW4dJbGcQrRkc/VTQced2FKxITZdFJsKhbQ1XVOEzOzaHqQZ5dzAQuPKSvE7OnHcHy8QzPpo9tERnKyDI4VdRyyhC5UKnysLPmICAYvEoUFqnjq76EcctwoogkUuNS7XqtrjKIRSsFc2zliCVjChOv1J0mrGrMRVzZtprm8YSkejOrVovIBwuTMRTMrdYrRpaHO79gsq6z3OoIl6XqWrVxsysAl9seMXyLeDeYfY4s8hpbXGvnEgFcN1ICkUqNqrek7fYx246H2o4HdHQwdIDctfSwGRzAcEHHdU1CW1wA8rEPD5PouFAnwJt9WJjv4Iv4hm6Rd+eTW1r6IsYQmTBtSLGmVb+S4CmXFFw3xUyxB2kpm8ZfC1SAggYo612iNU1hyE/w1YR0dIt5nZg0KfmCiessgZj7DVwIvWhdZIPRpjcAc/h7eL+q/ViMOsNikI1w8DhaK0ownVrMLvAGGIavenBF/Ryk9nHYSUYZLkoLr+S4C84VqGUTYCmLsqQ1X+FzeNrSHeZ1Yuw08mlTCkB6gPkhHAPy7F2M3VrMwdKdICyICzmIvoQmRDOWusF4v4NXZ9A5s/B+uA65kT9rZn5TcluZNvPO/GZKBOed+e2Ao8VYTl42ll4vZcalbApiGD6rrARQVzFc6KNpOqZZf1wal0rjaWBmAXJz7vKuQH7C5wId58skLjowOxZkLpFAVySI3/HAkqVgR4KMTcgDsyJB/I44xhB1U5LPJEB6wpwn15TFwkkdDdhlqDDZtTVf9u632xlOYsMmnuAoNFkMKqahdl8YmwH5DOGGbaWcq7d/CYnVsCqeZCaT7vucjc3FdWBQLsR13VMMW5AfbQfQKWgiNPNCM+gA7KFaOFoPbasoo1nMlsUQXsAZC2dSjIwWDECadlxnyDttmisNNS387KQoURU66FyVKGpddQOfQ5HhI6bxXdS1SDX20KRIErsGBTPLT3slJxNa8YBRlmyuYAADzQ/hdvi3mOOpyGaV9y/A1YP5wdlfyMauazFobw3GKSOZ3vvKxwsYUe+y+UTpKK3yJkEdu8OAz4IoqsUQV0N14kirhEo0bh9p1VqxcLTPPmBeF8zKPGT7zitTkR1thtxGdn55ZUOy67G96OwKohedxezwn2c47hI6GtsdR12BpRGLyQY0AdhfXkNO4TwJ2aQLIwwnEY/6gidx8le6LpxEnKO4mbLoXSRBpJ80Gs1csI/tOnxD7aLduDmDw00WxVSY19eJ2dEpz3DkN2wfHkaF6wtyLa4yyrV5FzI2cm3elY8PuTbvUsma2XAVVB4fYSEt9bwGYBOmHfoT3B6v7X1kLwO7cD/AGKe/Z7jt/RZz9IDzuN3+S0sY9/CAeR2YwSqv6NYkSpoioi/BpXy8l6oUu/CNsNbpUARv/jAZzioaztHy7sgfWt4d2ayLyvdX4FZy2JhkOKTIMpWw6UmcwIpqWNiTtURJzpPUaSw1b02ayfBgduaYN4d1UezOqc/dMsSIsYYzpmg5kWW4QTPVpQ9Om1ZyD+eoqmycu8xiqw+SkV0fMK8Tk6+gJXr4UVFiLJ68cmwi8VpRQqWitEWPMYEpRyV9SfOYwJK7ktHh41JEM4FdkNf+AuFbjLYtWdJADFqvn+C4GpjFA12e8Rfp8jEaazg67kZjDUdH3Gis4eiIG8Ej2cK3jdPClxPw59nSk7PvdxjrhHzpXydtZrIlAdBD4wz3amK1k+WGfYs54FssTsApRSNbpx1ccv5C+Can82Mq9wqebBODxWLX8mhI3j0+gVEtCqoD327JUQwQnk2iB9zuxsZAPvfXidl28Gf4njXY03Ww66lph6u2waziykkfbK6WLGk4ZnXlJE989wM+qytrHxKL6iXE3K/qykl4iMY6dN+gDDTMAuHbgjHCyPEXCN/+Amk5fF8aKnddyLTrXVPbE23Eqtsj8IzZvFEzW4hMXjPHxmL2sXmGT6OXt/bTjQg2VctPEKenHyAujn4KHj5ubhWMGKGiCLKOXohBp7FlvXmEB/AAVYCxD+dtc0MMw5kSK9duCfDm5G3VYzi8UlnVrH1g1ruGgw/wDlr4ZQXCRz6nDqyXXegTsXYfMQf84mt5wj/PluyyISafjeR3pGcBfL4dIBwyHIsQjTs4HDLEHHCMjLqFf54thcc+njGo8bGYi3ewwPFehGsE4WoZ5rKOVVlA10vsIpGzUZrG76uWV0sxphzK+zRWc7x9SMbP2WJQ6meuiV2AszKgM06Fbz3xAm8Cn3EqcBmibma/+iLaD05DoiG6sM5OclQkGWMQn+MmopaXTL1tBw95VUGh5gVf9FNw6tSSL6qeitnnXFj3TdRQaKVa0VzxvrnGqq0poIyWkAKiSU6z9uPLYII7PCN+gPE2UIHrtaUUax4lbyvt4TAX034U9pXioAUuu+WHn9WiE/AW2abqgdmhY+M1ugAsr4vPk/XVNKlU3o+vbjbLwq3EtjH9kL4WEfpuWGyE5wtgPlKi+dgYCHgRPSOG8m4RLuzXuxqb0AYP09T8XIyWFsD7FQmbWL2tj/6AeZ0YNA9i1OseoYEPrTgAXhZQDi09YlAHjzG8aH6oMDYksweMWgLmYfIjzsqCohkQYgIMCAcaYYGlJ/E1tIXvHzCywP6ujwvGWhcNRmyYXu0Gy4O7qG+2ePEETbfhBlwMX3WMayfoKPrrpBpCTejhZIZIgEgOKPU9YF4Hkdpp7GNR7onfri6AUXwxiPLYQTOrfnsiJYImIA8uh5T/FQOVr0crGLldr3s3MGjxeYLvCOZ63B2eVSUa1pQ4hs6p8jmwpiRL+HqUkDvf1xqNsHZrxd63u71pnuDLdcjXg5bpwidOMGj+oOy62B8DP1klFOm5VXp4nQ/vhlbH2dwdFrWO7citAuGDHiK3CoQPQhU6by31FjMO9w0IBnBcDnv1TszeH6ym7M1JfIIP86A56LM5aRwvB3x43ValIMbCtX76Gjf3ZQHS0OY0rWnUqcotOc1II6o4LVovKrqgnL34SrcsZe6RAcdi8hYTbR+PGBzXPuvP8F1afZhGcS3ysWl7XbNhwnE7v8MsPfNr7d+cxBwGY06AjQPa9eShnj3GPplZQRCXbiSfh6S8bRPlaFMCkPOgYV9VdsrHd/8QZfdpJwZ97PPgVJtgMfsOgNbQSwPD6o4+1m8/345xLYwuHnir3n5Eltfy3PBROrXdIDtuh4ZnzBthy2L2RQGYY1lgsMAunL0jxvYBbZ27EQ/2CDHIHu3deIYvyvt8OzDrDF/6WKEax0Ah9uGAI4+06SIet/Q+27baNDJ68eDE0B88j9d4/vXhJPWGepFGeSOVP+z8sJSoFgs+SLF642Y4LSJrYfbyAeaAL3+36R3SVXm/4LrjYMlwcq1m4ZvlWpXMOmwO5mt10NRqNRxeOoixW7J7B8wP4dmMdh/usL+lW7IMXWHbXXhtxfEyKXzaXfTFx3sHOR7AqGhRaUfZ2VKNpLmmqDxMEmOULF0kRpRE5bZ4m0nPs9XNAJ6Y13JKHRu06e4bOFAt+srgEsXjyTCYlcHWiz/qDGwRiw+tk8DFIJzSshHNK7rNMuXTqJT1+6Jja9YJfJ6JeVNM+CFtgC5nON/w+EoyGIav0NioGReLSg6i6hff2agZF5dvx64XFTXjYqrN8ntRMy6KbwfCrb4IJQe82y0c/VD27JIxJNtrFvVFB2Z5ifhdZ5vh09ohx3dKTMl4ifidF5Mx09zB8CUxoYodRVGAb4oK3ijZ5vSGkm19BW/AbNbPs7NBZk2tYFhn5ZNec6KzCsLKiM6qyJsJNJT3Gh83c8ZX9hG+V3UnmDk2YiNeJ2LJYC8rskPmgwsG/R4IIxJCbZpNkcOi9LouIlG4kUTSDS9VlObtCu43DL3aLHxLhVaCwKR9Nn/DyiN6SBbYA7aEY0IWHmS0L8szg7x38NnBiBhOHQStbKHXNRboOD76gxdFDN7kFrMfmQO+xiZde3OF06SYQkMveihTpv2WJhpRcQvqdVv5MZJ8W8hih7FeG7Bvd+Uwg+XXzZO0n46fwRMsyYGZkVV+hNJnHcyMrPIQSc/gGVmlDcnVPzAzsspjJD1K5MjOhoPT3ph4SjTxnH60zKgBGMkKzAhGXIHvb6JVzPv1424vHKSFGBQ03Joywu338ZlmDIeDZl0YesliUQmr9By6viuJxN3cTsnr3FqUaxbm6xGjPPKSmb26u3TdxS1je3V3KaDAHKLLDbcx3nm00+A74O3bfgEAk4OvCtL2AYcjhA+DxVhnUcTsC9bC9wVux1RNH5uvBsxruU93dRbEtvAX2DfCkUGwmK0CtD3sK9nCzQO3okhxqV5LhGAP6QumENvgR3iyr7WQqKKvTAjM4yobRrddKUpa0pBGNKDjsNeUXV4vAknZRSQlv+AHX1xsPaT48pDtzps1t5i1gq8TYy4egcf4HTyZ0SIGnyuLQSke+95so4Wvm+EyDwej2nBnjtReW2dY5wfMYF1q5Lziiqkh96yvFRc170l/MasOzIew9utgN4XY6bWHaXcgBOvdjYYX691tMPIwtbgsBEMMlpAqDrYfFgKxCjBceP7QwELgq26f8PyqgN52B2+48+1tZgkhGO0A/uKiTRjXEYqu9hgboVaOpY5pi8rAXduvWxf83TXchC8TAHHBzOCM4/JcYG8FK9iIOaTPt2NXj+uOnc3DFNlD1ZBMLy7CbrJI7JWd+vtBTusMf75ZCtzX4yMYY2wsS4E2Nzzz+AvUg93CJeWPN3zVesW/HjEviwnmdONbgvo5hFs9HN7/eOMgfLPq1waY21ROCbVIx0dnDKWoDbEY5JQvIUcXjfHJMCOto87D2XNzBVkFPB5KZJudWpiCxqj56aPrnRqkXNN7bbj0eizwZvNdWYwNM3vG7PKZuDZuB79xL2KvTMLHrXA5hosXUxrrNMLrGC5hgXpRB2hT9Cu1pwvczAKWcMhPewPWTukhOT4ePDJirJDGTiyh1vke0kzj6Kvjls4TcMEclgzYWWQ0EY5v4sXAvVjhPVMIoPqyGshs2voJ3PI0mxG38WKs/hoFsLPmbB+yVJfCMgIVPQfvcTjb3ToDX+1p/AZudUqIMazhuvCe4YZl7Es+3AgGT/EwSy1Lrocp4CkeMlzcS+et3pd4mKVaZsoa/b9vxixVNZtrJ3ixvIeWMKvwmrw+hKs8ZVbhlWuKiu6QdWKypCK8xuXcICoxRYhGbHhDiOxastHoGE0gwA9NYN7ZKl8nZuWrBKbc24gn/DqG9YRVUkXIrHKUoPI/zNz1oRta5aLwhS+YYcW6gEAxAH6OedhxeFSwAk5jaAsbIDjYR6zcpfvJPq7VKKbewI1WKrYbLZrQZ5IUAr9Y3qgYvZHF4MUTOEg6qZKf/UNYsa+yk0R/RHXpEDuASuL7Phj7to/1aBAAh0IeMajIgjYf4VbJjdMxyjKA37OT5WBMMaUi3m+QN8OfAbKZOf2g1uDKBBPqkDdJMqhpWJZH2kvTezZcmsVY2Tpz7Oqo9RJrYNWXrj/HupZhic41pwI2neEZveC6QRxP63M4f1E4/jbrzLEHnLddq1vM68TEY632uA7Cy8RViBEhf/iSqtS2lpmLnDF8vLvTwoMW7jJSw8YkNo7Teg76WT0QPGZmDKJdK2tytxhUDz3BMYzDmr52lL/9RV1MTAIjUdhx/mLsH0YibWkwMQlsREi3CYxEFm7nZpKKTozsxEwpI3fy1FyNBDQ5K9kuzZXdbBtT/nBkflm5t5ij6ibc+h7B/rjCWM7TMgGoVbkFrH9ty+BlgZ+2ty5fUuZrRhuKvgUGPm802xByiK8RGzPSGWv5O9peDVCZYYV+VMvTlMeG8/00i3Rwy9FwyIshfJkUiVfMkt+RiYxq3xJ53ymrEdsI05saAifMievDpbcslYJTZiY3k1ORwXIQYj7hS4v2uVJGDtXLEmpfJ2ZJr9Fodx7A6EsH0VuIea3ASImccSYkxWJ2yxFicBwoCyx86gQ+3w7EShT4+iGm77x/OCYLlmEUIeIF/lxBmZzhEBB7YaucB2zoAZz3aFbOxM9FZTqeOsfwOhDyp1x6EK32CLb5R5dmzCa2NQjtSp09ALzGY8Ewfsmafutu/PWIeWn0Bz3vecoPUyHIzw+xA07TQG2FYDLKZDd5u0+TERoxL5MR+lCK5I98Cwr7L+uwttpBFXw2qpX19+fbgTnidNbvgxE5v8M4cctRA7dYbZsGZnRxy8lqPlhW22Sseaj3wP2w44IgYcQc8HwC0OhjMegXhslZ0PkN4Tb8Y19Z1u6a4BIJJ8Abjy/2eiCqKurZV5mSog4n8d/eDdGe60WGsIZTs9Uu7YkNnd9EvNZyTu3h2r5klNEIx+/DE/rLKoA4VUBwiB4wQhjm6YKnP5vnDp0fTJIyHYDKf+t4eWNKL0YHu39h4VirD1XYtiYf2mRsbUFd+pbOtnThc1t9h7DjG8ZTBHrhAnphW4oLwyyc8Z2wGHC3qEbBhlxSNYquLS3/DA5qjXvEpYf62PdS01fj52uKqq2v2421GCwZ9wTHjUUDZ71aUuYsnhHg1LeiziQOhx+WpAa5GaV2BLSgHgbqgyJm3/HbTpmNjhzh6KtoS4mi+zGGe32H2b04kysDZIZJgiMpSgZlhTMJZEDanQSdRqVmey3Yqiu3mNeJQTHTXiXGwfsBvm24thqOBbzeDt97DAW4lw+K8ZZA7S/UIPW2nA7oJC69c9q5Vger6bgIcpbeOVNdr0V3MIWeqob4bJOYLaYHlScRY4LHsEqfhaNNCCp3eXRIQk2Mrb24v+OMTGrDJtzs41j1EzNT8HgbPOFGMYspuoiWtOwMPEN0mW43BVSdbitiyxJZRFt7GTLU50WM0mCkt1kqibIw50PLM4KCdipmlUkqrWhVRSraepAVadfrkxdPyr5nA3q9YZDl8b5aDL6v7bruIywTbQUIRz3+ksk/3w4MWidsW+hfcGDEIdNpGL9oOoY/vRiok0Zxyr4N1kYM1Gks1P6W33VuGS476I5IQTtv9IZomuFRqQp/MEukMFjopUvAa15U5bUwueujmFZeVOV3KXPdOK81z0fOgnxYhQ/Ia0HQmbXRfZBdbcpTEL3l1qOEviY2HxQ1CQbvfBsjvX0OpbtbzuhlMSfdIE9hMUiy++awv8D6a7ccgtwuO0mk38G9Uuq0texi4USDbALi8HItZN+DS8VzyQJ2TQ4kYHDX/AnfQ82KMBt8DcB6r0zRvmBCkRGOOacQE82buDMcqGmgrZh7ztvwOn8qC5bn8dh5YtJO9q0Y8fANGl3PGY99k02OYg/LEivvWHEvnsxYETBh/vG2w+4YwWJYHwHUM+yOw/RZbKuavmSX/UsmJbrFQG5wLGR3IHZ6hI14Bu80C8NTemQzthhMPm4xKyu475DWAeH4/eFeXUs8+wDM68RgonGLWYnGv4HviQP8065Uvi7dfdFClJHtHqA+8QFz7Fu+Ao7h7kfafO0onIhVRm0RxMS0mppkN3Ci/tSUMYltUlVH1yUTg2snPaOFHutl2mReiJnVNsU0yYnVNXGNKNWdZuJcOs+muVGcU2KRbF41j9d5PgSMmYyDPbbCQfh4gu2YEWP3IHh61OLIo0brw4kh+Mponv0FZVlio/cnlmzvJ5vY6wHzOjH7vr9+tIm68Ha2ibrqzrrGGPFSzBK5vLK0MZz13SmZCOgj65XFRNMFYrY+F6KmA+psER6OaSDGTgMxFfpY4n8IkG3MwlHjfGDOr+73r+5JIlyauMW8LCaZkHuL8aJ89xJaLol/ot7UUuSnZIUzLzPIWcoC9TJEbEn8M47AKiTEcMmGnWwiOTM/S4cWY+exl/vEFL6esybK86L0GpHz+qc8aeMbGIJ/pKRDirVnwGJs34jZqgnbS74AoFtgoo5kiMASXc49/gZvsQpZpPHmt/AtHVco1GYTKEI576N3i7G9b0y2jeMTYL527D9vWtO05eKE4WN/n1uc3HhEWaOe93kumkVwzXCf24HBfA911z871vtnmHwcIsRcSPwGPuufXWbO3jgsDF5+wCnkqiYPwrPF/j4tjWfUnEbxEPIjeyic31WHj+Fw3hFuTwRgQCknAEtdCN98Rd1F2g6+YqjMOCvQhbo25lxrxOAEOMowjwzpOGEpFJaTvy6RRDLSq3guqhQKG5md9iaUXVLu2LYHzMtiLDVZzFYW2zV5gmMGRNsSJtazGEzTZzHbqGh7eYJjbkS7u9gHYs7nCDFI5k/wTVnhkTj98fojBl9/hOPrv/v2jzP0jzP0ZuUt5n4XveELEL4uzOOMnCwUYvrKlYknIW4zOx6EqGb5kYsTD0JUptZ3ew6ArTO0Y9m9G3q7PQcHhq+8UAyCwXzjjWt4H84iocUct3ryH0WDkd3gJ9YFUFa9R8PgGDCSFCLOoUdzSVnM0+GOD9v/DMfDbTFPhxus/wdmuHUTiISCUMI4J5wRpGnKsMB+Z11PyUp8YOkRNd4GY4+NNcUgvJoGdi1PmzzuZxhbItBitqYQhmn0eBaO7rsWg1aOukpzTkFo2dlWNU/fjFKs7tqgvhrV15BKZMD1mMrPMDhJIUe+y76Bo028rnK0PERVNa2/jJCxs7QO5cDT39g8YroxuVsMavb2me9GSbHZXncoCDbGesXf6AKXQxmkAURt3deJwX23GEy3+wRXlSIQFat+q4/BSS5Vx06aWRWdmQuS5CJyo6Nz2cVGYOFWAWsw7KSZlCKxB89OmlM5d9FoKsjoNFWFxwlROEOrxMXrtorKL0eBZ7ZfisfzwzJ+nksMSRK/TgxmYHyC56XmHN7YTVPnDzqw2SK/gYMfNna2EZY0j5Z+HX4OEjGXdMc38NsVk9WE44PFI77eMLXkUW8C0lGaghMWvvu3cFRVW8xWbndTMADhpj4RnACLQfus7cNidmk3jJjoGodYRxmvVVemQ2k3W1dGi4iXqGLNritj13DXlbFwO48sLtqqyRTX7R6r5u9kl+4+ilIFjh63199lbbHuCSYTRTju0i0lDCrZ9WB2cIEQyU7tXqDIqIUvG8TRUNqdmGHZX2DVuQjDxe/j/WMxmjayC/EsW1kokGayD1sZa5Q0GWUfvuVdbWWihh3JKJsmU61LW4tpOG6WaV1bwGnM7eCV+jox1ujSziO4MaykDllruLCSejAOTQInRi+spJ48y3kEUx7v3KWe2LyvfoRAS1U+D+cNHPfcjspYqszMd1v2mM9BHWB7Cjam7i35OjE76+0TvIFWqx4P3lY92V88wbdKqh6v78YUU6PZYi7JhIsW1H2CF9MHYqwZd+uxTszWMBVzh36PCdUx98AHlyOIs5rBE0cKu6jVKzmCOKf95ue2zvPg5BuI0uUw1QBGb/QtNQyAFIgvnKpaWD8R2OgilSJwyyjeVcTTvpdvhpCPFyG3afXMaXbvIHaA64cFIzf5gDmHDF469hdPcPSlsRj0xvgpBgUIHFdFceQXyxtn4ybV7INnyMFgZgEzNatp6v+AwX3N1MZMs0Sa2oln6v+QITVNM9U3bVrv45VtUG9s8NS3z+gBx2ivA7MSGjRNwZVUGdtkPkHh4i8ySqpBQoOmab7aqA4o84n6C7HXlaPkYYNyauOhaleO7OoCgRP+FYypogkLectjPZHD59kSOuBaDE4O+7h12bhsBD/lPXldPr5bsgrXjp3U0ihXJlkLarTWCbuKD5jXidlipTU6PMGtWgIxKLpWDZgqLhoMw1lF1TUL/yIuhouJTNX7i7i0DzGqZT0IK4+eNYUs4jrhp0FmlPesQuSeM8QIiAGi9FOVd1pG6irU7SaZgJG6KnV7HdjKQmXXJE0jtQVjwme7HWgJu4dbosqLajhaclQ6pUtI3JfYnE0nX2vj0RsZpcLzQX7WaQHbXn9fSByNCw+YA47aD+wj/Hrvh1kaXFS/HjFDnUQzHpV8y1gI0T/x+siulblsvlohZva9LcQ3JXXrtWhy1TQ2VV1QROKR6D4xz0lg9BR4/KGAwtF/Go9ftJx+WV9gW0sBfYFB6MQQQvyFyR0A3xd97uWNXqrnePebb+AoiuJuY/Qwjsr+4ggz7krwADpKw1gMes4+wbfDi03zWYzDi5u/fhmf2m8x6D5tMZg1HeH7ogTOZnplTfdpi1kJUQtIhEljYJnTYzi42UBC1AICYdpV9hi+BEKstQvOx0edlwfM68TgK4SYbMJGsIorwvH7NmwED5F1tcffWMztb76BY5UY7F2OM73GWhjcMR9YNAlFlhxCOUwfJld28s1xrvHBthignV9W8SbpHszHfBsMA/PhK5aNGA5e+eedawGvN4wNM9e2he8DbuFoFDIYbRolZBu1hRg8N8nc7xaDkvhtNJlZEgtfhPV5toTnORnfGSzbhN42T3BbCgkxKEt8h0E/I1ugaVm1QjLs7oERyUSj9iVRTxhuLFwNl1V/DBf+xun9I3lHVPebNBlQGpjl+Z0keZCXQkqYWRcM2QiXlm4xMtplg5vrNVQEB2aV6x01EP1woVlVfbVqoqvq0Yd1gEeZxTgwq3KwlmX0UmkYq+kN8+ywotqixbeYl8Vk1JPHZTu6wDn9k3PKNAW6N3zQ0kpsc6xxVC3nndTg4GWdmguV+qx2CpilDMOeH8FQotrAYaDp7rNUVwzZr5qNeej7+T0pWjZgl2Ue9Rv5nflcNRvjwNCvxf3Np133GQ0HWLYU4J+rfNkshDoxemrXTRr33F+rOuMoBApqwLQd5E/EjBa4NLXyD6Pf+Y/g50RuMdj13oLj22CrsYitvYbnCtux4PX1z7cDsyohYl7sAC7qx/eXevPSEqwqPK2GOnfmJvi+hVYzUqxgh77/FtNhrCsjEhxI8/V8LMYuYbcRewqjNh2uEgwWO8alWPBPuxZjeByMIJy+pBWvA5NTrJKpeaQhD2q6kXLaHTYogJK7jH24Q7xOBG7pE/x2rMdWP//iJy2lx/VI22KCbe0Tf473glmt+WR2/AkOa2gRK0ziGzgQzoqd2PMbhINRFVhMFzDzDhzMJ3aBLckcRlQF/qLsiIevN28Brzew7jS5ho+PcP0WE7jxgHmdGNPXx+Z6u5anSh82KGOzPZMDNRhTxH1iDjiOHuF29GinrqaPlTAKh/rSPBaoJpUFZ77/a70fQ25I+1c+GRnkGbNae52t8d/eRXi/QIPriUTW0gLoETBb+1y/kSYlB+oN4HbC+7WR19ftaX0ZjO/wUgoATGGP8Awxp7aM5IGRDDuaO2lbP5pKtVItOu+cek2k4DbfpZVSr6nUnDU/2E6ph3UtQfryt4WQT4x9Ho62EI75orYEc04aMW0a+f3IZ1g0NKhNI78f+QzdsKBOI7+2JNPWhqaN32s6w9pbOvcBteIYV8N+BPTYpSLmY8dhgi5qvpPK5tqsSiAOE0yt2slZJRBggjfugBZzm/wMyz5j6jOE7wdWMMGoFYGeAmYMtvBLoewBxyKJiDG5j+ytMf3a1lG5xehxljyBTXXmXCJIAnjpdpJEgepfzKE+xAkkWyhr+MG1Wg822dfzNl6nqZoAu+8x04ujSCYeN6u4SP6UOMLaK229nnFUta2AwE9z+yHG32icxiOIxfrsgwrB5PYXK+RcjAii6vIJcn8WMTuwCDkagqh2yQTH22GunSKGjZZzPeE4OcRUJdj1xu9pVN2aOrUjiFmv+X4onBpKnjHFbNQOfa/HA4eYRSqX1iwGx7YwP4Sv3kXfdAzHhresKZgEGjBpkz4Dvr/vkpvFYAydFN/EEFOTG2U+6WYovWan4TyV7tCRq3F33QzbkCGTdQNGw8I3Y6L+akCreYVYjl23AZ4Ws9V2zey6/Y3BGIB+3EtqH1xcOjym7aQj6Avb2lcEdmnhcVLE59uB8dc+xiu61vsZ8yN4xRP5i80deF7DtxjLys4xM18kbPPY6MmZHZ+j9cudv5ylxIbj6hN8LNRIL3d7XtUyi6waTsKyalj91nKgWM/2GWN5U8Rg/9jLE9xwnyaubSAOMLKv5yZ571Z+OUwas5bo68SsrZ2i1vnCzapt52upyj/ALMI2G/cMX2t72dCFOeD7ErHwRTJnS0p1mP8X6zBi/m+stmjgc6mO6docw8m8evkKWo4rUztYtPnl6DK0g8KXl+0Zs5WDSRHTlWbqBoUxx5rVIOZ6WxH8AfM6MWP4WFwbU9thDh/M+vpU6X3kwPtaf72sLdVWf7SYtROv8WsEYFo2LNWEGW6e4ZirDqoKY/rn14nBUpgZkihjUY+fwS2/v3Nhc5FtDmcfWXFXMuzw4SWcXWUTHBOWALUzXBi17YnXhRbP3A9zVqNo6WlVaknD5idCkibflkotbab32lbRUakllLYM5yN7o1RqaT5e4GbVsaQWjrbYQd59xIYwaxOmmrRwaMDQGC4gWuyPIZm83k9tocX+Fj7PA3zx5uOilPl1JDxboH4ZHb9OzPY6sZXu7+FQd+pz5RYcWXq66R1rSSyMgdv1qWffa63x+OIvMNvi7qGeg9S4QvVwMl+EyqKjskDSXHxu+lCNygKthRHf7ZbXVdhOoNXSj6hWar7AYU71gRKroYYnuM3BgBi8rCt7rGaXRmU0qVThxW/GS1GKka99pTWxY8IavBwbKZUDRsW0EFzW2MjK2vOa0wkvjy3llNgYWgem5qgeG3RqUip6heXMNUNVkjTw5b6yQImby+M9gqYTa5U5dukYDL5zNpk/2vHRjSY8uNc8w22APRZcWln9vk7MTl1q4fuwQLwfwj9XspRRZwoVaU23umsRDkl0EpuKEEwaZYxqJkbxEIaIo/18M5h4pGpBzK6N0zSIVpTtEWrjNPGwFkO5lL4eaeV1Hsu0HldtnKYxtGKIj8YVbs/aVvG2Zb3VaXOxVdhE1eLAXmWI2WHViF9ZdDvAqhG/WZOO7ylVwy3uJbBwSxaGJZkL/foOAzlxMHn614l5/o3BLGP9uAtxqEiNCL/J1DFYYZu3YlNtPJ3+5vf8mTtnByfb3DmY1/wSVY/l0OvYo+1eA0l1Xo8Yj3lUIdnO8X0bIh/EobgrgkhECo9r0gy6KuU6FP9jbd/Um/x/OPuWNMl1ldt+jaJGcD7rZdnjyU41IuffvQYksRa2c+d/925UBkTo/QAEi9mFrz8YKpsYzAfp2KI99qBPR18ccvXNUBDrDhb6YtddzWZXGhZ9IasTSx4Om/4CUOy2y7YO/MWgOBB8WAWLflsfC7XdFh58hNEvCwr6i1fEQe60L5zPwmAwCAeb4V54JseCPs4j0hkoBDnsGYvnxzunwylQVh6NDmL0wFLROLLu+TXMa1YnweLaVYwuFopdVjowHN5Ons/cD+QwaA5Dc314OR53y+KgR4vENHxhAMoLx6vFQlqsjQlf60erK993Uhj/w9zSkYAD8Rha/hWLYDAmdCJnjqY21cSoV2kTTEzocseWgYC47tjY8uCEudHJ/sL5sPDC2AXMWSFJ4OKq705DdgUPVyFDxBO4uAoHjBHLxdU+giP0kBaXADMAyM8V5GNwHhDb45B2u70tZAvZQEi7Hd4WDn+YQKDfwyHtmIxPbxC9hJzPK4foJy1SDBPktYqRqbz0kYO+isxx/bFT9CvCLTzG0dqhOTmZ0XaZg7gZTkdMXWhTjtDmyOEeuvcJ48KKznHNpiJ6Cjq4wMLaTZdSL/nYq5Ul8Lp2ZrpHDKOGI2dDf8h/rJXDLJrGC3FZPr+7BXiPuCyX7nZPNKtLy61suwV4j7gslx93evB1eZM88q0AdNFHYO43Or3/zkUQjBDAMeOYb1Gy4mbY0mnBGe+OJjkiIBXO2IIZ4NRIC844BDksOONAh40hEZ6idh7Fzp+pdu4ieDdDJ3AszZepDOEVEHr3zeYdgGb5RA68kWqla9j3vzPBiM+f2gN1mvPR+cBqoCjwgdVsKdXB8SyK+K6xDiwms6/AJeTkpMHphyjbSfB1zepWLnW+2vNWl5hay2WI6KqFSkIOB74ghwJfXujYWgYywlFG7Zie6fQXW0hmcWDY0L8/YTvhzc8rw29lXhfPgPdHXECdzoJn0Wanc5+jSR45n8jhoI7be9lce6jhN3puxH30wvlEDp4HjR7ImOOWYJbUmMNZdtyujFBHTPcBbP9r9EV7btYchdZUBbRI20j6IyljTDZYABj0PB0XNnJQMAuclVKsgTxuIaN1GzlOZ147NTqMlGLu+1MGB4zfZWW2Qz0Gc1HwFmnkUHKurdDIaQTp5OQy6V8UhIMcn+zxyIhlPYal0rLppOfyWl1gAbdVvMACwh56oy+ggHCJwS+CES7WjjLS0pv/g+Mx3th7hEp4p+PIM7gCqp+/5XBMIMaesxESA67xoHujPx6ZXxQupurH952kMtqGYweHBErBP3E4UBolaix5g9b7dwDkAune+sj5BM5/Evisf6PjrNPrJK0f1sRwzbkdhulu+OJ1jdGyOzgT8i/8/OkW+K2S6Q7eil0DvzeRZK2kla+5W+D3noJY1TXwO539RkfnPN65boz7HX0Z7G4lMTgoniaMLAic8eLX45UMdz19DJIcfhFFum4n+m4xFC7SdbsDzum95CJd5+fMtXq63TLndqOj2N7YcjPH3a/cicBLHF8NPSQdQg4ntkO8R7yO/bH5nR5va+esTCTNsa6EPC0KTXWn7RxksCg007YEJ0A4kMq76Eo8+zCPNMha2f83ExEeeykKmtUBUFJ+WzbxRNRxXoCS3GYef39g70EYQg6uFhdsXunjXV1f6O3KO9Xm09QpbtcXevOmVCfU6GiwB7dbPJPotOEn1PiRBF8+W1ANZOxQ9NTgk+2dg5mYGKMU47OxF290P1f3oOjBWXw/zNnkhRy8EvE4Rzp+H7NGRUi/72XPKkHctWrFnzV1lm/T8H9tlvlmX6fL8Jg1Y8MOh4u52JbTMj7s63Dhq29fhwvTHwLcJ+oUHCEsaLxzuIPIaW5K3BcCGqQg2rVP54SmIVPivkDWMAXRrn0yULbD4Aqw+dP4B8M/wWVFd24pr5+dGszalFCjSbGaIF7vJsVuWmwNJsWxCmowKQ4yA5B4sGA0R3tcG1ufkY7iPZZEGKphWv5xtXCGfUcO3upv9BXIBxeL1co3TSez3CRoOKvmwtnBNNLRF21ZRoSsKyTNOYBx1xVlxTxZcne6Txf9iz1N9rCwUYZiDpoh0GkeJRm0AaA5AyeHOdNpDUh46hDkxwudYT6Q8/Y3Ouo8/q0lPXI+kYNvsszxAWuEzY10z1rIl0+DF+U9RKogh4OAfuDolT9yV8qVn/Q23iX8+7RUl8d1alxDmdYt2x1JfKnQi9FpSIjhCN7NAvkHZr8DfjcN/d+GqIEQ4c0SwNXdbqz166bgAslkFjSteZLcTv4CDdZlj1YO4HAvcC37lDV4Rt/JDkBrH5YhczCcCHcRhvp4P/YpvsEktPv8+m5gOgHuQCNYoMP1yHLBBioOikYbqETu07XbW/hpt9kGSFo7vIXv4DcW9tXyMyP67ZyI7nmx1cQB23qFBwq0xS83YKGT9b7CAwXa+ys8UJBgGAc3klwquFlXmU7uv/AdTvpJRy/8/UYHgyndVsxhEwVdIvFCRL/3QYfLMXrYdf5dJz2UFF8fwn+rdcNPDTNmvnA+kYMX8Q7ICA+j9kB3kIA4/gsnIMj6TqbVYZ297UBZgfXSfcs+1tlwO5TntSJ5dXS9TqdDBO9lcEyA701oR8/5JI36xmENxCe8BY9Y4qhFuOg5ppLLbjZd3zINXqQN5vno53RJ1u03ODNzldoP5lM3aqAIYAh0N+dHzidy+NL05YrHZYPUoHgZI7bZHuzRyOFnoSbQ7t389ItAvqdsZ7tCwStVAOLLsl6PLTaopmnLiTkFnvXtqrD0owwoGXXKl0DXILwgB0bCOJqkb4yLqOJHN5QMUcXVBiHXs7hE1lB7C8KLj1GcIeRkqh050z3tnYzzxvOjfkQDVgIuWIcoa3YzFTO9qDd+HnQwCA5v/N2ubb2/Ws7rUcDWq1+WQK5BZlpAKcihrVXppvZtWsPjgu914HyY09yn7MZZ44cHyiuZTZHIKRPNMg2z6WkYZGqsqtUW71Tch3XLLbZL0x/msDwE6WUZYOnJPTeAPt2ax+HaghgOYC7oTYnnOotib3S/H1owDiHYCqpTSEevUJ3tFg4aN6NEjj8I7GkpEGiB2+tBPyA1uQV3fueIKHat426NKvU60PfUWPzqgJzCpx9z2GPYteWdLKzevf1loHZykw24LbMORahRKOyzzGfPU2P4mjoWp7ElJSKh7mMFa0FwUawnUB3ZlhpxUqO5wFieR/rXH+Jwjr2fOdchVQ1IrGskexrn1fW3TrKEyMqzrp043g8Ip/76EzgcXaVT3ux04egq5ATFqImZeHAUJL9Xu34uWUUyEwldLolqixKBbPgQPqAOvn6Qw1cDclA1WrmDK2lSWPnaaGH9VLrrkY53PQ4Ibk0e3oMa6wuoUhTPrGWDm6n7e3UzfRI12MfV/vUnHD5rCr9fObcDDof34bRcHDxh8U7+ifOL+4PCoeDmOuf5+n6nBTrpvasGnnZsbCXBBrvOZb3R1/XB6wFHt4bYrUcOnXJvdD5QmLPimT6Rk1fQoWVVq0MOy8tb2vKwnWpCbhqVoUGHVofcwX23kgCKVd7+jrrVtStGQDEef4v+Fa6o5ajh18G4pG6YIA/0hVuQwLXDr5xuEsaSBj+Rw0/pxFkKRleBQ7x6lb4Ukm7OiwcpMHZxipVcBwdVnm7OkUdrLMdhL/bgAur93qNNeA9v9Agzs6RKNOc2egLCryNS/wtn+pR3SgAVScGDu4ffk2/462/Q1QFd/d/oYcQWZw+z+85pRCKfAPbWQDr6TjCHu/bOub1CD1xRjjnwA6qTbd6PIf4+opoyBx/jKEnwCx1xRTu9cp/QJqRjSbdXcW5TnzA8o6TvV46P1X6Gt6t+F7tvte+hduT4s1i356zxWrZe0bq+Zm0DpHq9u1lBMwMnvtN1fc2yhJ3sy0K2XVo7N6+OtUKqJHEb6ECbvMVXq6NIErdLlrWj5/rtPkxja/xAgfRtMTjzdPj8yKAHh3me8PDdtsZwQuOtgVPH3TvEd6aaInFphEnjf4Xe23ZJjgORQRTw7jFyj0P4nw5lP9DXsvmiRAdpNnIVzWZIoP8NSxee1//FZb22823BYzom5gC27cO81O1hxrSwWmY6SzEVpnOo4ZdYXg20S0NqqlkiNKTmbJ3XKiONdhKxl34YTjNGt8QYLZRbMUbLbHt1axyjlUbSN9mKdnKsGK1hPzxsk+KVVZc00u9X2cDvlCUm6Q1O8y6RHTTzWciO6+ZxtMuO2yFhxrhGl8rx9Wfc/npLr1wua5HsLgJ9VgQvOjvv6c7AsQscGcduSIH0yCDiRjGkwPUsIXT5e68zuyY+ZMivz5HmBR4+XDvibuDYHbGR/e5+okUwnSYebuJFD9cVLK/vV85t4SH6LS/WwNHML6Zi4YO9Olmoo9/IHH4O1z41Sg/xWoa1zdDStvAMLDu5wn6HzahD3MaWQ/rY1+Feqq/7emBgleHgsHYpABHz1xHpGMeDkI6Z0WE4fGjf6autX3/eOEGmGRhf63S6wWpWQ3Q71hiJymx7K5drJO2rsuiv7lsU5SWAX5fdsOWUUkfMBmQVsLGofWSQQ85OdSBHOz0yu6JD2hsdUc+Z8PiR8gKulsxZoVNtjtjjVtjSK/2LctbgrHxrnTxNBy2aMDv16YoaM8ryK66CwBEDUeq6OLMEJx2GbLcvA5Fk/xbkaHNkwZWpA11mCCmGuK9dEWovtF9umFJj3PwmL0Hmta6nc4FxZQuicaEJ+jc9zlXU4a13uLdtHPBXDvjuJod7/2aZjfHeOYofscaZg4ktUciUTl5fugmZkl9d0P93RwQYnV+mri9uMHBSpy662YzpXJJzuLU7TAn3cPcM2Dwo5j14iZmZOMm8By3RbDGXk9PsyprmqxrQxg6H/XAfTAOkYR32O6TlLpbPQg/7QPfDfoe83wUfgZGMj8CedLzQutoVkuraKjocVffTYdew7KfNahb81VKavYtoSVlHCc8I5oDAKWLEterzQB7oRcbAZIDWRWQzbAN5rBwWDKJTY52T/3dKbuwBT+Y1ZLG7pPPYQmOzXxnmM5fDHYL4G3iHoLtAAfsr05999ooLGl+xJLgy/i2vk7glHQNqbDxyEHjaqgkdvQpdJzudeLz08cQjRwc48Z7p1Ufra20iBK5rpp4hHUZr7eg1SD4RNUiJPnyVpME3OqXLUfoU3v0Jubqdn3/gFzTTUXa/qr6Un1TGo+l1RmxDAc2Xsn0dZGbb71d7tjqc0bziRR8H1vX/PuqAX2yXvHKc1jmsQfs8n3GpTchZvfhEzlp/ZLl6p+MA2sl37oce1PUSXsWbSteF4K3sY+56PntiPx+cIVuS+bo8DsPELNff1+62d9yrmL0NzE9JF3PU4C1TXTcyi76cAWey+0lOGTNfZjkyuu3rUw6ZwywrRKcmIUdOlbMM/Deo4JBD5jQPCNzvOBPM6apVmsOax/wUw244eogSKob2IJq1v15rXFFReAiLhMQ4pAIrFr3+gR6iC6C1b72IfYCSGtWxLmXP3afrDDiBjo+k7mxR6BrfifAZhFWi+d6IqeewW7teN18a6tqpOeBtLNtxHnkbQdFjE9z788j5RM5BtXtcSOR4xElx9T5piC0TEOkTVzTnJQNtnxn4sIFFVagCE5kt+tdCeh7S8eJ8/pDLCJbF9McXTGzT1x/iFDJ0MAefYbWO07CQ3uid6kAOp36BaVhH2I2D9wwOY0FLAaeoQ8vD9yvnEzlu3WBg9XULMRn1uwcw+ZX/5QZAvzgYuLCW140Dy+sHRkPK/LwKNcJOp2n9H3eDSt9vb+wjwqpSCbfI/5WcCjkrOoLJozIZWPr49ScQfKbQ8jYerhGC1IUXpi81zjw9Fl5qeLSGmCH0YVqIrMl9mKygFcXOPkyIr4k+TEhf2vZXXNZLE/6OHO1eMQPJGx0h3RY9HFmgHdAJxPTbJlytvW3cOUmPBE5mBs3mbGY3sOghADMHHrxJvqWvgXT7RbkdkWPbab86VU3E2do1XsfAkG/XBOx2H4h9faS4EL3GLvojtXM76gASvzSVfE2ZKQ9HPtppq71W2X3dVL4iwZlD/oIjkTcUcnTpFDu23RJZbKkd5lfYJrKq0FUsGfDTK6Ks6FqulryjLVxVOD5TpRsRRf5Kt2jY4Tr4dvPiDgfy8/QUUktwp7J6hw4HWNYP9LiNbAn8o3xLs4vFXGfqfQMMX5I3+tvGqABbC5xUHSmsmJ/zYU4sG0yevoXI4WMFwXTrW4hCoxW6S/UtRGO8mI42hHK/fSkv5LjgmSGBQcmgQpuYhjZrR1+xw9K5kBjyuFsdmONn1DsdmwTm82fGR3MezIRfvoSMACvkL33MdE4gqiTGzVaPW+Qf6Lvw3hUL1oPZq8dFqpUDAeX1OaYaPq4HzOvlmyGyXgkrK1Yq5OgzSL7w6l0Q2tLJPQW6DSKMwdrV35GD2/cZ2j3QYdSYQ2vSt0z4SK5OLxxdlnh00QXke8uDkAodjBqEtBlyUaGj1EOYCh29GoS09cL0TD60zEFfQOag/eYGfY+YnQOTFCMbmIOumYWwvvGoeqP7JmL0a1HJd/F8sNo1+n8o8fpempKhom/bPAl8ZhmZmuvAqUQ63ijYVnRjLby+59/frxxbIn8D+5kwZq9p1MR22GrZ0zlOoSYxFtUsx01iL4blD+kYvRo4YsfIdZTqNewSCTJM24020ddqOt2oMEo3BGSlj8kDAkXA8XGBHNyamNUk35W4YYzA/cZdx2buVDseRO1O8uC5AlhS47bTI7IAllShLB2FbC51HcMFsKR43t2tEOhaEhoowzrTxtpOQL/2QiZKFCt+Q+faydg5h/ITa8d1QXTooWcEaeFIdRWXvUd/y+Fj2Dms2b/RtembPRvxXYEcjD0TjvQy65zs8uBbTjvfu1ykw399v2Ruy1j9OIXe9fF6y5OL78A8uRgMxQcuBjcxx41nrE79hs5HMXLC4SaHscK7iLHuoh+2N6sc3iMqYL/EtdzMiIetDUcr9BBzvPCoOKDZb+h73E17OIwIQBOOlmeQQaZjuCVzMKTzdxx2CxaZ4ZJqcxlB06J4m10yiRRczQtvlzuxgU6NrgWp1LieEYmO6WiXxTZhGO5L378j5zej+DgfYRE8rO6DVh7G2zHnFiqJmv14/yPA/VVSbA6FUM5G+94aJjeEc8JDPU63whnVwwwtMnl1ZFDQyTbLT9PJbq62PCahQitSp3ZR2hUYcqS3SOB5JjuRd+0fZ7+C1fQdOdwkTL/EHJe5GjUWgSff6HzhI4d3OHBYmOELzJtfaazFmDOhKuUyzP2S6oe+LdCW5/Bsku8EmSZVig+o4PaGSf+qucn1lpZFZbh/uGOdWVQkM5gVpDjFgzHRWCrdOG1lBmM6Hg7McVMx0/FJDw+HDftG4x5Wg9/BTMcw85eV9fmZg1sNQ+95e7IAiFva10YheziuOaQHrXL9uselxs4B7ZHA3ccgFj5pFEO5DmQszX6r57RCLo/kFJvijp2soBvEAZ8VeBrS6QJi4Q1ja7XxZnCXVfEdOXwaYiK9W8ISdG6dL7Tr8GlxHyJHd1K13YMZy3QnHbZ7ln18xE6bxaESwp9697ax20K+stEiHz+gf7F5h8WKerf+j730nDSsPh+5odf8ROvC7DsdY2xeOMHmBh7rN87yWf8PDobOejAC5JFJGM/G32e7JT5C4vPDC+ezxms8T6IRz3v/Tsf3GOwhOyEyZ4fa0YQYOQsjBxhM1jHJJokDGYeEGOmtfMXtSs1OL8WvGFtLLbbmjaA5Yvp4rVAbb5rW0ZUkpjpylzkjdOvyBg3FDi/6zTi64kLCFBVabmzaXkvnE83kuHj5aYI5DaxlrsBUwEwdVrcxDm3a45LZ6SaYWTVc1mnB0xe1dHufaAstjekYNFLvb/xrVG5P9wNY4WZI+Yn+xUbm6rV/Rw6PVdFEJ8Veh/a0DUekonfPMO2KS1/y7bCBc2Ue6ZKfGB/OcQxZQv3peGjozOlVwLaGM+gh+VaGx+ohWdTt0L7EKTFjh1dwahUzcFm9c+pdHpwxwUAHIA28MA6vmxmEr6H05jH76JiVQKDypbPaCpwPjzqU9YkTjgomc47lElQhyLYa1GU18koFWg3pciujWR7HW81XdTfR1+N+68t1WsN1mhVgdVheRNBJu9Ut/tt1s0NVJJ0dvKBxnS+x1jlwZX+/cmxAJFvJ3ix49xQsLjvVimQ3aWlgn1VFFfgbBp3FfJwoDDVmzmrJf3BusDLr8eWGLDOsYYGzHigqpAlq/vhXR5qgQYacmNUug2rWHX/8q+aaNl5W8QaN0DLndG7AJe4/+A39EcYCjVdDNEPMKISWQ/oDtMbg+LnMNbhgC50DUKqvONz4qP9sh4CTBum+dAxsiQ+endRKDKpGLEEq4O7DlUdQN9CL9wknjBhgBf1HD+O5kNYFM5XZ7I6cTPsOS4uctQ+QQ/RCc4V0RgpHDrcLOS0WQkaFp05/xQEBXyUZECKw0why7Itt/ftFjkVK+iyQD00YVgeU9k+EAPM9BzC28ZnzXB9+9YFwqwgBa7Aw3J/4/YDlrZzrwkLOJ9aBlk/8xa19OB6cpm7djN+vnI/GKUG+F/sIufDo4xcHZTJ6O3Py/wcHlU3mrJxwB0Dfdz/sD0e+T51ywh2gF3fICXcA8n3n+LYR1nZDHF4tu2EUr94gx/8+OH/C3/BFnkHk9NfCXc56mdk3utaBzVnXxXfgxEp3MkdzPC2+KP3EQct5SPv7A6fn1g0jtwlAUxrxuQrcNHMuX99pLQwtRIDY0K6MahgbckBGtR38FQ7IqLZ72KqVtDKq7RDoisO3Q2BsoGvNdawyvNm4302emvpubqMTMljA2cvetzJCSSZk8EGX50ndRugEB8w7TP3bR0LZpTwepjCO9J2IyHeYinkayIOjyx6mkhYLIHc1GDsHdL1duOPr7+9Xjg5JVZHZloLqc80wyasCJw7X0KnP8aij+Yk5bzt4fz2P4FnuxtnpN7f3K+csUx9mTDpM7xgwiYqF0QzwPQ9Tn747Og7/AZpNM7SNshfeBg1w+JnOB3sVm8ExXp7EYjASTtXetkPVA0lCcrWuH/lvmCcUTJhT6NDAVYr5Sd/otBbicm505b9wPtygkdoLCZj6Ct/l0KGLx80FdJ5iXwhEj1cz+hJgwUxHbwUUpw+y+uAvIDNKzGeGyobkUpD3GgN/yPq8bXkOkF7FBynnfsuMRiUhx01W7/TH3Gs+rfN9aXLsPJiXP9qZIItDtY1SRwqGefkLfdrKbdjgDcozVmg6hmpbRM3kkzDn2CYP9B90HWEONg9DUF7pY2kByT11DkhWU8FTZ9xLmnS+kqfOuMm6eTi6p864+bYzeGFy41GLfOFYh1tu1w1ihjQxUqVukdz5uk3qPvwiL8W7WoeRPmUypCWJ96ujPVB2kni/bhcMtoaXMgUNTY7teX6BGATcurjkFj0sa7CtfGzr+G7FgwPpLRbOEh4/2H7fSR/uGL42HWQypuyJQF/fD1MZ60AO5k4kOpxpN0P26hMavwf4w7bkn2Ijsi1BqYCf7mHi+ggCxIwnBztmL19gRBYqmPIEyZzyBDmPCbN/oPPKwKFBu9W4Pvc6gwDSUS3bTMW4PLk+d9vF7KobzsDCRx17b0ZCuF6SN/87cii/+Fqy73R0j9VjJF1i6CEczeE6VKfz6qCKZclSvipGOVd8UEHI0ZrH9fBG94s1kUFH/Shhj/NHRNzIdG68cD7MSXTUMwfza/nMMN2fANNM2YQkzr3zyCFwDpwl/j5nhMdmMkQwctCnTscVYWJxxDfK1clzgcI+0hci6cO67BOBKq4OieD/Zs6Eb/mBQOdzF/SJAeWfVRXIlqJtX1j+eWgOpHmLA7W1ypzIFx3xFAN97RJ2psYo/BwWEHr/+nn7So8e391cw8fyv5WIoLIdshdcHOlxMby2BAOUZYCOsv8NrUbjK3MQpPpxUwY6I20/cj5cRyLU7scjhEY/1oEcLOmN7mJ2IhhsQNxEzidyMM3BTxw3ekNpgY7tQjr2sAI4I9TxvSz2sQ5/iMmHj+8QptyAnu6eAUrPqLkHzrMpPkMuRKwZ6F/rCahYOAKuXYTmihwHG+KdwBxE4ubScD9OvA37zTsHz+mfOBnqwXMXfBpCWAk6HWQ6gIug3bZt73ZBaTIICxI7ZV8rWN+16zQZRHBGCOul+ANPolgwIN9gnuIa+voTOI3augvm+1j0gocx/U/7Rd60RSIJHrV75IKq6SxfMAfhrn/iYKvyc/c8qwkPE1oHKxF81sZphUhwSEfgOKTzSn+6A30xjUOJGHgqYWoF5qykVf/BwVNJe9IThsvrW95PHC4NRvaVgeMC5FXFSzFf5o7r+6X45IlHHhE+fyBicAWD4Y2IKOQ/cfCG49IQ9AN1HHT7xuWFvoC0tslVLHiXo7OYe7uZurKU2HEAZ3q7xSODY73w+Od4QhcoMdiSIvLoazonWET11f39ytFq0atkiYQv5IKfzGF75SbDr5mputv38/IDK578TL00hh+YFaTW+sFZfmA4A+IJMhzBAhn28UPsi836MvHY4qCPOmWnwJ+Xc3jWdfF4tuGXLC7VTFt6hrYcwkIrncE8+RisiHScYKSvCb6VRDIu0F3feJjloW8gZ6cljhO9U6uQTkt/D1fOprGSvdIbyDVDEp1z1MpvIByYsfZQCPLo4Z6lB0hvyxt9wfbNICIihM3WX0aw/w3D1v97QD+jrjVA3+wFzSne2fOaA76cczsYZyxj3UvfsxlVtn7W3myLpVzKSFx9bO1I+97GmLBLNVaONnrmLMMuBiV2AlNYMYmcl7twfvll2MWYxP4/RwYYOQ5mJDGRPuxY30mqQ8f6yPEbspO1DuktEji+AzkcQ4Icty1ic0KMz0FvMBKomfeU7H3sElgFqdpCFyXrsMI1d3nlKbl095t/eJEGv5Asjyffd9JnSZnqkxBj6dbbc+BUd3PJDNm0Qit+oLfpSC6hK9eSzI3CVTS85Ti1hRrekooHxIzG8Jolznqduzqmz6TXwZwxidlFn6/DmRzxi57ql17dlbFe5xQqzZ6fc6MpxZFD10GY3cxufbBeQ1n4i1sYiCynTDkq8uafMqDQfwvHvUx29L8kDgX4XRx3h6EWBw4s9YvjLkH0bBc487AQ8nQBEfI4LIQ830WF7IeFcOZrj3DmYSH0+S6q6yk0cvwW+9qsWVXX1qhfvRPqLr+uss5q1UlRT4VStGE+xLTmePChx3kstnlqf79ywm9GIb6t0L/udMMBFvFGvxbg6cpVbnS9nK6QZc70yBxUqLge5ly6ei+pJJtReYW2CdranlNPWtZ+/b1ft9Hfp8EYafK4jgWi+x05jjHKfUQ69iNTHY+c0PfqyRr+g+P1AyfQO7TL+1F/0/fbyDsg8OkYzfiLt5K0jgK1r77r+GZoL48Kclbtn1jaLzgXfcWNYC1v7dIWJxh5bvEj59ZiV2X5F24S4O+v9B1fsSRNoX1kHWHVXGQ3CX2l3D5Vczkll6vQxfmmz4Kmz7Iw5FZR/JtTFZcjldvywQHZX6ewU7dxcANHoZhTjotREyZILGcebvJFwjdPe8eTpArZHOuP3aD7Tnv56+YqqrDR6rR3euxUHp77+3anz6nQkpwTt6H34ycObxHk4ILz0XqjV0fSvo3vRNK+rWliaKT0tZ60DnHHKKcuK42svlQgba2gDWRbbrdeCND112PPm4E3cT+Y40sUSnvqucJm85LmniNnYYjzrnEcb6bTEr0dkmu/7fbOc66N2fSNFf2PF9n3dTNoKyWsHtpzPvwQ+h4+ktcylKiObC43guHmm3wFkPMD3aXqQks9cNbmOOwg0G1WYDMdhrWu27LQ9jvsrJG7Wjhrwx6GtS5B3LnABocnaaTzY3UucPDI2/QTAU9Fcdg7k4CtC6dKD8xz81LpS9uVKhjDSeFHwBUiF9+C7P2Ry/SaEBD3S7sR5/omI2gpWGoRo+8lIF30LvE7uY9H+Jxv7hkXiZ0Cq+zPdFbhbAvJQHyNBPlgv+jJkkeNJ38fmhQ8b30iE/nqOj2D8z/TMW6KOeTPfS0KwV3oFkcgs9CtKGls00WnZ0k3Xw9cjOiozhxUTk8QMEFtIroqpL4zanSrOSnEAnuzWSeu20OOwaTSnkTMbftpK1sePbrK1Vki5lpmdxsR2eeqCOt0Cx7M18XV9mvFyWRcYvxxLf/dHGO3o0jywoueZXUe21zIKRSupMaLNJHPDNF1sy9nLXUMUcYheM25mHeX+pFsWvJ5nIclxwaflMxPcuB8k3N4xXfOTJGhsII12WBcbUy2ChSApSSlq6Gt2KLxSrcYBgAcxANhjltMwXUGBXhyqTnDbkGvlOBiDhy3LAY6u9sdYeoeOdNzjNnBoSsSplfXOV2f8O/HNf+xq8N5MVrjkWOLVvMrmw+IZNDcpgOthLuZA/cm5uY931rNBwgtUv1za+Ck+8hpyzG1LM+kA1LFDgJX1IZd8TCAiBM8HN1y1w2uUSTfhE6cnQAeweuzGyJks/W7TImdPGLRYYN9aB85nxtHowxPXU47BJ5oCOk4uneIPNG79ph5wnaIPDmWgfMAd+xOXl046ezchRxeq278+YnDkQV9RZ5K5jjxMrVB7OJGv5/WkZr209zosXIeRIThRjPvGfFJTrLkK8JTMQUCTfmKCJVqIYkr4JMw55zOfyfAUe6WWbarmO6vQrullh3Ohae9Ix2blaOetofqeP7sJAWscCBMGMqBAb/h8HDAaUawLL+j47nDDvPfkXBrBZ6Pv6GjJxBz+KJB3BP9c4q0q9x3OrsGEoLK5KjIj4SwDvyBxvtvwvM/XjLDgh1JtkSnNCc+6yIhmfR5TuFPQwIECk4VbIoD+BrtQ09CrsO9Ek8KGXijU9EUfOAvKL+k0+5Bjr/4ct3+BMh92KlNDyOIMQ9xlOcc8gqrdNkgvcXlgM+U53Czxhrqa0/pl+90rHzOipWEzZ1jYB1eyxhhtwId6oC88zf1EV3NvyMH3daf6ScFnfPyeQbYAH39BzpGwbxwXCcoCSbidCWgIIzyA/21jjW937EfKFm6Rxx64RAdLqwy8mmseQn0NY/YSHaqPx2DnX3qT8iKUMNt4Gj6hW7LQ8SMI6UBaaswtpZz8RB4276Zv73A3jZX2RRL3skmJuzq+BC/3zUR2K10z0URvfmRM2VCcUc7JjqswHVV08fEXJ8MjL8oXpeN3O7jw3FUwGD/eWBQ1IY1TMHG6WN+kugqg4tbwSuNXGbhUGyXeeREg2CZlaguoIsPc8thHkQnBOT4eGUSb2Ecx/qTdAWbpTq4tNrauh2IVzuutdxsuC6B8xIay9+3JfMFysOsVHmtg/IQOSaAn3m7NAMbpLqnPmarninnas4nvavSmZaor/XnW7Cgc3iZe2KXG+eSAbMuvouj5pLsIa01DRfRKQMenhQl+5O9T7UxWKzSnaHxFZn28cqR8wP9hCpG7haxATQa3JHlpV/i/oRznSm4y6w7MhTo5TyErhvEPJjlAeA65bJUsPZT94xB4811m2nH0+jzDFjNmK5P6ewI73Qbu0QpahAkEBLVjCDL3Y+Y3fLWwGcE2AMy3jiaFu0sW1HG1g5zeNoV4+haXqf27hK1smUnXPUzcAgkfQbGd2QsHW3XgCHVIZupaLlqMxUKTN5O2tDQZh5ADUk6Nv3+UtB2gxoT9Mn5Hto9yPUaUqB+rUxiMmf8dVgQL2Tu7GKwAL8/fM6rPCgE5oDJjDSzGA2x89YnTXgd2iYC3k5RmUaZK+tDuXNwiYBYOjfSCML1j1+UP8zpH8o4tsfPJIrBen5nhM/QIKKSY9bY7kj2DSJSJKM6Q6pA6gjQ53yM7x/9OHrrQs9l3y6d2yAtq+T3bNKdIkDU/fR9KNWunQrljpiQ0ZxkexcQHh4+j5ZwvAOPYPfwfmAIeaIB7IbANHJELviA3eD4hsdhd7yB3QCY8siA7c1RND7Ngchk2G0QGLHDiu0uwjF5DU+nE4oYjuk1jEryaNABAsyMUKe8xfaBGWa212G1Kod+Xy0Q08QlsdR/O+zUwycGyGbAnVAPfWSEMAElTaiHPhJCdA+0kpHpOH9EXyP2CQyUf5ac3WHEwOJ3xFBb9ec/hJHEnb+ZyVUCNK/TPl1keaM+a3PwBRGdwSjrkoMx2E4BDAxGnZI2U8d2lVpZDFyMcQ8uYSh+PkhM7C7hHmr96ltKM3JMBdwDbGV9SZsHacXd5dODQgGhb29k+z1RPrHEvw+fvSUc8wodxXhCIGM44brJebqeGXOY5QLGYFki8+JBxoJu62Z4k/Shh4P5dDPUyYV6EHCbGbw1In7EBrdhB5cN3LdMK7m7WAFkLWbKj8MwepYCQ91082MIUXdpt9+nz8gV6i1zyDoZEvpaylzK5rWimQ9az3LCU7dQFnsh84zA1TZye79+7uGG+w3D/swn3VlMhgMYtc+Ox6S5OdaDrq1ODrzZK0UlAQL7enD45c+rbqjN948VvBiftSOsP6h90JWyOion28Pnx+eHVzI37IlhR9tcPdDDD8UWR8byYWIgK8hMHxnLaQZjMyHL/Fj9m4HxnF7+ItsaVieGmuL3FSJgU/IC3dxNC991aZtH+MwrrLd10aXiDuG7O0908AcnMi6VZ4ataB8GHOpnxvTWt2E4oFu7D9pBwwCMkypejIOzoM5qGTALyPiETwyEmBfJ7NpKl9zyd+BM7ft4s7lq3bOQd82AwihaBwGSgtkdGFr8ehwAxhsZ1BBo5ZelNJabouzIUBCi8VJ4mDdZM0VIV0lXQUTdz1IfusVaJYehSFj6wvWWcJh3W7b8o0iGRYIM00RE6Ml10/NWVdyqxvNTVNy8q7ClKm6mLnaSF4jRCJUSYwoa7mAUHcH3tpNSCGRUCqvXlqgZ62roZJUTVOLzum+Lyqz7LgNlEJ4CGCtwObJjJF37yQjRJJo+0j+U73IEYoAVvZN2GT766u/PyqZ/HTXTPtEcYRxmexCQCCaJyagDEoN01jc6tAPvg4uhmYRUAtghE07W1yY9TZo+Qh31L88VgWGG+6g+Xyw0xH4f01xgN+tLdyoO4lKkgcpPMhye8sz4WO7Fg64ccYMVrUJPmSJGw9Nwn68d3eX5Vs4GCe84+N0sniVPjA8tfXjp1iXHn2E4Ge3nv8loWTQ3WdEt5GUx96KhVQJJfB1M1zXyV16yxS0pJIM+6WQnBrey53ypj5fsd/7vKudS1wz16VJsWhLl7bxO1X7dq/r2KugeGw/TWijA0eFAQgLE8PMOHi5L5wzdXk4Hp1qe1bahB8lAx776Ich9aih87t7XHy4fQZreyHMSToqsafj5Y5iwI6r+YuzX1WcppGs+JKhEiOLWMRNUzSHitjX3ocRGNHO5lDw4pz0gaIab5j6ap/9pxcwvnf5TBOs7vaJAxtPAY5iAkSCXyGkGmTagAEcE02n2mzlQK5PIaeaeHhKJnGYcSpZ2BMnj59669tbaBLm9YicWdP5JZxugWZ90ti0R/LwfeTnNdkF0+0lGiIotIWQ3r+6FjPcpM6AdQMZ8kcvWdZKOBoAeZ7iWuzhHajdLFi14oO9L+r79PLRX8tvCGOInmQjaQsPmQbjoYt45dB7LKfauIxsk4HUQ96y1XqukZXv7fxiaOHcYINss3U/WejULkLVSs/3s0kjNATTh2cMIL0hwmGl0RaFfYNaU9f0DHFGIvDABuPyDrKHPDKwWLTxEZsFvTQoXA2RMMIZkmkJBx903WSAa8bgPAPlLAG167Fk6r82RxHMKq6zhZkAHFmAchGK/9giTm3d1kb8I8RoYthBODbvXq7NrMOqA0exF4HxlaHI6erWhyd4ahFZghuqVpy7MPNMCHKYcDljPPNMCHKZM9jaGYUXYHKZ8Fjun80wKcAC+iA8mUL2zWW1XgOjRHAfH6fxtjzN6JsfSEXtDGLIOjlOlll4GhqeuA5V5ugz1MdD/fTGhS39bx+RB0T9IX5py2nFp66x2QM210hfZn8nkMAPGZz18mcUZCwJTqFa7G6I0LDNs/f7YLbdLWcUe2gD5nWAsX8j+5GMMeo9zLxE2qY5zPwUDLIwPG2yBwdbHFDqG5Yf9xs3EbUjDgN9/Ib/cSc8MHma4rNDOh3devx3TbCSF9bOwzmD9BPAwuS/OrpZ7QDrTu2W3hQJAZ7DaGO8LGWPuwPo7bfJsgUeDHZBRLiQGWnmYsUwQ3UPkDvdk7R5Sd5h9PM0HsRWDd5g5Xc0h3UP2TpDboTMnSf6i3pdUmt201+9qMTQ3iRnJcq/IrIq7zOkuA1YMm5zW8kN3QFocL2TUD2mVoX5IDFQTqWLM1UdNRZCDtT3PZzx8INv4HOJaUHcVisTRqmsxVYat9q6imAwbvA9BM+V64ufL0+EMzHor8yXRKMBQB+1r2MVp+aTUByqvW+uTXmhtmq31lfWQZmrYezVYdhidpBeavbLG2VrNBAZGdxADoTGajybhYvi3UQGjSUFNjKbx5l5eM6lW+63WtQphleNe/h3jv2pgMvsFSDr6WoswztxKapYB8BQc273IrFwnXdr1CurgLLjBy5Q4sW3x9TK8Vq5nnZMiY35grGejM4QDaPubin8YyU8MdtWbjjC/oM8HZfFrORF6hshwDz4zPoGB6LjL/eZkEGMnPyDlqtPXRooJcxwy+9DEtF3NZJtBbO8WqqWZbLvcxpuDcttbvOxajUbYDMa7jhAcfansRl9CgY9cCtFrRPgwhutGYgXSG0eWbOEZEjns6YEchDF6ozt400b7AGFr+RdIb5HAD3jIIXQaqLS8NAbvJG4+P2fhqOE9Q5y/8eMRrFtgw2RzHDEozcP80isZrZdUDFovV7F+i4jefglDcmAI4mKzsblU931v1s9rIZe2U7RKMAP2aP0Tf6RSBKRDD7Cri8kSk+xihzCT1ymGiHawN1U89lsYIHBtiwfy2pojlA6em54p+JpyklINZLbgLznyJMnsB4YjaKI5tNHiQzouYs7e1RaopyLaXEe26Zt1gXpK5KsYTfe2XjGO/ba8K7UpmM6FY6cNZdF+alRCSAteDwCCwdf1bxh2lRGBsiUiHXMfYmPwTGTOeDbCHvEjCE4MmQRhON/o/A6CHFwUyElkI0c6ds0nDOhhKoET61gvc23LIrRu4EF80dV6Zkf1csjnRcL9gkXCli7XiiPHkVe2YD9dHBZYiIEAxMufAHcskfHuYoYVDBQM1IH63sg0CrCQ2dS6Vhvru79ihM8P4UxSI5r6AHKSLYaOgRkNktucJrYbvDOmb1kNlgxBTdOIE3UOu86eI1ua1K3Xo1lLL+X62GGOxoMh7U9g8BoGxnJix/CfQJ6F9vB2qCdkVcamB6S9GemBeq2rv5rnrYojQ3iTtr1ZJ/60vlykhIw00HjkmXuEhVY7M/WNZjOyqt95rEh9rinq97y0dXjA2kG1Z/I8Qvhda39+TtvBoQTetYBsVmv9T71g/fvw+LnTy9S6YvfwkiVC7nZd7OLxK+6dluyzKozppg7CGm5uF1P1Ou0gXcDxs3gQbL6XW0pgfJYjjj2arnNUxJr4Gd//zb4UoOcRNJF8xNgyAz5iKJWALzTmGiCyDy8o++zfA8p+D5af/2Yc8TMGJtuiGx6S612u2yId/pHwjNct1km0kwPQcLttgaImb8Q7BUsq7jxioPcXmGSRDAY1ToG57tuRq9M/h6jSg/JzHfAothwVK5Z2+7SEZfdR8Pc5pn8CHX0b4V2QfTfgJZGdLF7IT76DD74b8gYil5p+EX0/ssYl60pDTxE4QVfr/IVvMHT52Kvacq7r4z246gZfcKvDvrS8ApZz3bAv1WrFTOc6GC2csOgwAwyMBbnPBa8Ry0cLARXf5KkQIkY08cVeNeBE5Z/NXtBm3ovd4PTlokiQv9XDMvxNyegoDhADHa6Wgor56+jb0cFixGuEOBoBP7uuHAk/lIeRch20dXg4XNUJfs/VoHbpcq2ffEGEe6Txwj4kBrRYfI3GgFqk7iEWXRERxJ8t11YPzioHZLtfRD6Q44i/f0lUx7bbXKzSQ4xPQRecF1DgmRUJTejjM64koej2K6hpov7+G8ZBWzy0IlI8L1vxlIsHpGUrnkz+oKxsxQNJDkjKVjzshJN9wSih2lNQeoKpvcrRFO9JbzfJ8N6tNZLgvXY9Kc6r2tNid+FAAA89psfvEYzyQlGGbQs+fRddE89s8k1Na18NdV62X1PXN919vRBcLYSsfBH8cSdhlxgVBwHormlRBS/kJXF+EeLuHupdvY2MKinrxEnvYmg2PAP7rZLhrlUTiiQZnk0ukFvFDgOjakI8g/GH0qvmw6sWlO2t4TWCDFrcwNA396Np+QrA0/UQ0ufvYsHmTZ8U5KzUgPLT3kCKoe9UpesNot9VNJu9YWQqjyQP8ZopBKclMhYDAW+sBCQvnx0I81P5RFbqkPbh3F7kL7rwgcEXfqx4vpJzhC64gISASaC3N8pDrN64M8iPFvSB9kZZetAeFNzfMNZVZ8KQ7mtdBxIyu7dD3ZjWzt7/p/dusSFe0v4e7DjQRg+f+Q2ZTQLAwHAeqpgZyya0B415mZGgalbh96AxLyU+jtH/iYGGCSbDt3nwgLFSII6kn8XW2kqYOLKE7hqnbRkWp5eT3l+bMRYG0shCKuEZPAUwCos8xOkuD8O6TDU00JyrmuiO1SJKNTRwb395lNe8fIXht0mdxsQmXkyb+tqrm1Mbqr3+rdKz+jltzVFdxFQ2cz1MK+YyrUBKBz0dz9mxobQe/c7ANC8YMKLk1v/ytzmPxWIc5KwGBYEbkTHEsJHUSUntwSOpkdg1igZQVDUft3NlgrQwD8xpRAzOeAP1rrYxA73noAOvZErdAnQ3FUK6mpMSBAGZUjJ5ClFgCFm9ufQlU++vMkqfeURPytZeLVSwqM2vzZ9yIz1XO5Nnw2KnONUGjBln2ljDz8bQHxiOm7oN8UK/Kdr6IOjAqSvU9hc/QkmpkBl2ygEmizoD0wW9kMEoirZIZsAlSIwWCvaou/JmhkWGlQc2TGzYMvpy0tQn8tcqRpGbE2EKvXA+kYNhYczxwKR3ukOrp9Au5zDmbDF9dTOgm7w844uptwoqOPI6NsPp8boZLWVky6m74tm0BQg7kutkw8XZ1a5guYRsGaUzgr5kx3RmXJkMqM4FHkB+R0exjjltFC46xGkHYNOUnk1HpctIjFROEi9hMvPIYKTAzYVWLXIYvYo5vk5HJsEKOREf6COhEpIOKhw550shSNc9r9g4o2ggkIjGHFdwsGjMoMLffyh8jLj+opxkhplJDafpBwolOuxm5nDDibNyr2fVra/bXj11V9oO3QKbeJyrUSVBWvds2nUanJUIPqt6nUasnzsejgSMdWO8PitJpBgFimqGoVqKDqYgI9XhLq4Zuwr3utL7B3N27rUs5cOuq13f7KwoWcmbiTRqsuJ2riWGJF6/WKU/rr7T1wzXMGPOGEvhEqy2wwwch+R2PnYbk16OXLptMkkFXTYfldLG/uUiC8nOuPIix5dveVm+mCCbv4/KAXI4LWjgLEiCrDiv+bRdNCEJsqG8imAtZMAkyCrZlj44K2F5NpTXUnZKVUpHDdDD2ce/QLq/nb7Q40GN8sXvGO1GwZPFmm/jgxkV19dT2A32IZ2cenZcWE1RvOJHv7KNQGfHLzmRAM2ajWpZc2Ue0Duk892BHF6syKF8b7rAjhbp+H2MGpIrsmfx8LTU2iOBkPbiOgWPNvwLru8cAKCnSymB9KQrIgozKytCCnIGMDDZ5cq28AOdxYwV+46c8AtMm4n0kLrMOX+phfRpoxdU7PtGj3nMYWkVOY1H9IEQxCrgsK0NOX7ovtOxFbwgiLNuyZEub5s+QvOWHPny9P7b6Ja0fHnl2Ke30bglR768mswxTOuuJQwzXpLPDNNU5L7t9YwlqR0inyXWLIaITREGYlvVEqGSIvfO1wWPBtFp/HxNxjkCRYtWK9IpgZrSS3Sf+beER9M6EME1o/qNR+gLeQW5MPJA9qCYg2RQIGNLlyIQdKAQ1pDxsX0e+RP3SIEV2lZMIVi4R4KfIOa+XihTKD9UMOMuCFuo9YP4bb9AKeWpoBfyVTGc5JaZ9u/o6Ho414tqvZcjhlD29/KBOTQyTWZ/Lx8QRSU3uvsGoJGBTgKV9ZonBt6s+HJOZO7hy9ASA/NQO/kvj4+VNr+p6zVBALP+1uOWfaASxi3jQCWMW/aBShjyuwaKqDhQCWOI8aKS63svZ+ka3Kqupib6beKY2qq5f4ljqqXWBU9a3kzFyyeFTv8+2zuZ5WTN9Xe1QS1fclP3gVMqKSjVmzXpRe2zbHW+dhav6+fhQTJEEs15tIBMtPYQY6fygdFCCRUKhgBQHkUI6UTTSEZXEHRUzug64qaRVzJUjJAzGUMU51c+K9WwBUZ6/AmR5y+ZiglHgJE4qYnXe2N4beCl7j1WWyO75TIH551KC4QzCOwQqI5GR2Kw8gkM1J2gBiTHWH7IMnRGAdgZ3BtnUIkHWTuAjIs342J/6IidpazSAQP1pxY+u0NRuLjw2J2MdzIUM00p09NPd1VeaEMj0cm4aRY40UE5jbODGY00J+OmWfsC0pwQFa/5jFsZxeCsSIZ7r+pcoVYGu2sU97AZIKLc/2nrYQeinE3rZYMd6xALz1S+Dp3OggAUzucKLl4oH8AHXsh8bj0xPoHBUhIE8vFwXoLS0U59tbjk0OPQWCEin8eumbbonAtxAIGzgD2yoXP0zaTghQOSHV9VpWAHDskDkHVwFtJIdvxWCgOAPoeIgryC28MPPE5yIykG6Wv2+Z6A1E58IeJRAGQMG6HbHKMM0AKx0brzv5GeoDZuKd24WAUKSbQAiIFWCGK4IvQLsukTmD5sI4WCOKGqSXC3qe0vfwQRGm0eW5AwcYRAEgofaeBbEHGDmh04sMRVHRxRSTss8ZXJWei0xFUdLIMDS3xlckblHxdO2sJbhhs1NvAVhlM9lIR0Xpx+8GyUqwvv+QTZOfAXyf1SqA4wuoSxTUHKQA5LGZt6PJrQntzYvKl/ZFKT2DatzcOChEYyyJb3Ex0WEtr9eBW73U+z5UE4ySSMXdgEV6aM1ScuA61oNeIAsB12hCk6zZ558/A6Ph81yu8/8BoKcKggWulGYqRUsCkcZPKAGhFyFawfTH6Jl4AIGk5FtilW6SrhhQKwbYj6DFYKRLN7J3sb0O6ZsNUohSXsPM4mgtzN9ugks4sfTB33+ncMH1dSivBcBTIahYiB4uPF0FxkR1bJaUDvqcIr6NybCUgDqA9bc7wtfJaT05LeMCIpuah3gndoctHwJG/S5KLkCd6nSSMr3UnVPs9NFYQaaqLvICL7vn4mxy0+eriOnGsXrKfaZD6heuaIRW8+1Y6tz7PjQ8M3lv+NxlNYn7eSHjmfV06oA6eI2kRzXRU8tZheqNDttiabLqVN752m2O17vx9+Y3bU2o8LEevmlvs7QuQ4CneiPsEv4scvLnGjZ2vm9OUzmhbO/WYw/uoymuyB9jx17BD3P9kDbRscXbyb3XwaYd9qvA+8J2GoYhziRrcSnmb4tyu1gW6HL5Jwu250tdEo6tNAIvJsHrqVpXUXxDj4E5B2oAVA1qatlgPjExh8Qj5dabzi2VoAS56dmhYm3Ig4PWkEGIuNAYgWStSMoZ3tOOiNkhgvk3rQ3EHQ2BvZCgaKH4jbCFwhn/1Nw1x01bLP/mZhMc0Y61TeLIhG1uxBh8IaOrYobO5BdoTFBb9obxToCB7fPKbzMkMyS2OM0MOMiREp5AlTcdqOFYxIIU9ci9MCHOzsl9jigYNx2oFgstkxUTNOErBXT06Sa6HTDDMDA3eSdrnMOIg+s/lSPV2pddHKGDz+VTwpqxmTZ7IHETmvLslblYzBTPZAteIVQxuRJUN46QgindRQikLe6UU4EDsUBlXFUsWqOm3NOpgunYRw8MTNA5DcINycj5tK6E+7iqRnxGd4oAZZG6w5RF+azfO3n+V1UYeHfRrU4Ej5/Dnownyy7uk1e5A8AXahgy5M/P2T/MFk2FovjE8ofzGOu+xhZtBHZU+b+cT4BAaU79ovkbGZK4xCykf9U/806/1hEdfN1LJTQ64PXTG6dQ57jNeQ686gaPRGz4cVOBAicDIwXsloogCBFEHUNlT0Vlj2vATUarpA1MY1MKIdEURtXAPySH2SSanP0C0mwx5FEC86J17IaKgAD6aT7A60c5EBZ8BJUiwy6FLQUfft8Zc+ISY2KgKwMw9W+uaXPpGhA3XoY7QO/TBu6IzoKbji6oWsU6LRAIfH4QtDp0RfzFfUPm9VFwnC1nbDf+LTCQXm9YvvwAAr+wkF/Rf5689Jnz/2WcWRM/fwolpnDil4URWy/n3YGYsvqnUmPqcXVThi8TiAwfj356R3kLV0pdf49gN7n38BiHW4zgKj3crAr1KteBSdPjplJeNLnmHr9PhkIePoePKP5GnhT0j+AXbNk445OJ9YF4bvP7b+hfxl/Yen3e9JAaCmYAHAoUIND54omLE6di5tLPkgnKCMJR80aZrrYskH+QRVjDQC3AlkXXtUNmMjQef4BZnKf7zPf0WGGQCZWSDTZbeZEq6gVYJjIWKH3Ek2YeJIUHcSRpItL9wbCUv9BSOh2vdCxjPqwHHAAVqM7zdGPNWghl+Q6fJ6KR8gU/Fd9DswYEkcAM2UUUgOjOmAe6j/bRnuFDMn2GH+t93M5JAT7FD320sKsXNrut8e5n3bk+3xObzYyoTKNjMgBYy38ZUMWu0L4xPKR70uVgua8oCBomY6Iwymq9yBsX6OjF+R4bbHlZJ1nbldI0y3/b2dtEBWC7vNKwjT2CO4zxcoVeaTAUuhW5sYUw48TavN1s75HH+qUruN1kOuoNO02mopitdz/KlqbTo3frw5AU06091PDDr2Xxnud5jRs+W0yJwyHMHF2nhUe+0WJz/zq9A0kWnpuLs9WM0n9q9w/076Oi2Gsx2mRICvw/s3BZjYn/fi68x9eTpOgpA1cly9txZOgs7UyKu5Lif1CM0m4+w6WZ6ek96Tse2A1MsM0JKGXEKU/emrGElH74Qk6IgaPtzMt/hAhvIXWhEfPfPsiQk4aN16oc+bbv41GwE2jpMEesA5lUQre+11Pj+Wfdt3w7eVb82HQUEjODkekF74mIFGRXT//RWH7KtssEVLPQZ2iKuEBOj0gfjX86khQJu6d251t7dmCdzZs81dUM9QSSX1CZVUNpUAY93Yn1AUMVowHqHKhpYpWCIQEXJS76lgHEYoH8muW4axY/35yVDFpkdcwDCCL4xPYLw045wWeOv0bNBJrgJgeiIy3gfAsBNtuRds8jN3YV1Ybqd7zZxmBBB0bS3LHVjPGTx/ou/JOQLtiUh74ukQWcq6nVtgfn3y4SPqfcXeHPtOvJBovSb/Pi8euVG6yv1VMKQuyViNKoLrmtUiKoBT244GGHgNUDEHCZ9BOJCAb4ZE9xxJIE+BqzEk6wNP45XbT2U1mCdPBQgOPJA3EKm+tdgUBYcjMxYGNNSZAAIampgIARp6lAAAGrqPy5stZmBaPaZvBNs4yb3m4He62frIAJ+mwNAWHZq8Yj3sqRh0ZOkhvuvpW0BW7IiDnvVUytoNFw5e9SBVDj7qgc9tYKijmnr3pomqKGRtjS6UpK0xoGzdu3msSN3pzUrRxihknp4GIholcMABDAYkSymPDBmxhUQQClpwApubDQ9HIoitXAoK9mp4MxzDvDrHIJB9zPodo9YmVhIh1zNvNgwieR1HM2+J6xZMhv3a0paOPdMobChA8ZSwmRkYaGaG5fRCJjMzMmAw4biHhQNUcLvidwncDXp4paYvSvLwnuwhUA66UswoJEkEN4P5Ird+OrVIqUF3/NtNN/z3J52oqFr5JQfuRQYSK4Y8cWraLKeS+DqZ06y6QGmsyqmeUekIVd0uH9CqprwX1Sp74z3JhXjSiRovJfN2AYWX/KmoTjcy6Efv/JAD1531lz7RRQ+g5+gyu+Htiw7nxEC/4h8YUAd5mDgZhTZoKNhVT/SAB1kGZhzuaHSsn1QSp082CO4z0o1K2Wdc3MBA2e0VbcbRnQvCS4ueYXfnQvA68fFhQXgRFQIvzv/RiysJvSfrqzET44jQ2PAzCvYnhlagwDvKmQrS4iRXST+/5ywcVVJC3umuPRMju7/mJ3I8vZoShxXFqahV0nkLMw+4iMdNUhzGRfxIbun0C3oYg0khax6sUNjI2B4/ap5ayWqgmfTxM6uhFVWMv4mSjRJChA26KnWWJi0rqNRh7tyq1FlGwqKoUicH0iA6BR8XyLFjYfk/NJKv3AGiQfqObXlAKPap5/vY3AWiQYIQTFvRIKEI09GHiDnoTMQcvLoR2N8XHly5CcDj3dgwOM/5DN7piGvFHMwdwxwASkds6xcyKBovjE9gIHLWdiMwCiB0C5MQULKBuROwUz45g4PeUugaf+PUS9jIY/AUIFLlLUF4lbyNijR46V7FjiCkG0DkXBjIUYTIYtsBy1eIyL0FZ30a0sDhkSKOSrz70l+aoZYoSmSydMDruVboKvKm4YK13neFowqdPeKv5+DkcPZhXAFHjKdoIUHRlAIsV6Avg3AwsAH6FosGP0SFu3H5hW7eQGvNQ6vMtwt2HO5dp3M/kM51IMeNye90bNO0qd8aOxlhERTKMYnTBLhk4xwV8XoAn4q9ekj9Kov3ASh7jey+Bf9dQMAKEw6B7OEyR0gRpnuayI1N3pMe1j9wPjwmXBaCIJ2z46htY2vNfRA4q4efyME0Go8wZm90XwqDs0q61bEA2dynFaE81hL18KxCRzlGrhR6r/LIlUKZTvB6WYvdPLKBg0+P2xr3dzpmWd2e74Uf6N7veBpiunC4YcJvwICmdhCJCDgsBbSok3lE/4jX99nG/SBe34l0d8Qk/eJBx9WRLN0CqzbuBRk56gxwGj482UlV1Dd5YWH+b+oPIMkdlA5JAjZHhddszDOrQJA8VhICot+El7vMQhFja2Ibm/if6OHca0GDwyEjnyj4RYsEDJllDsb4cYMwLBBPkRtHgx1GRnRNam0Dr5AaI5exJuxJ5njrdexB6UHOQgKmundys/W/ge4isA4S/wJzcaILGtJfdO+0R/Gqsa/r35kua9kEJhfzZUUGnD2cxAtyfSEZwEMxgdC6TYMCt3sF368cFTDnjk87NxYZQeaFsiB7mZ+NlLDMn78atpYZfjM/DN+gnwuTpVlgtz7WngvApWlc936oir1maUoUuuqoGz6hkUOrwsdEOKmKU40mfyv1WrJnMyVEEOl715Vaj3wJwCNOAupgGfsxWeB35FBWrzXtgb7q6OHY9f3Tw/skct4k/F9xaPe+ZDlE+q1dlC4NeoL0DWrAiAzm8BwSZ1m1NzNN7za6atbWK0KzBaodSciAqrvZl6oxwKy9TVuSZD2dy5qUzj1sTjybFsevj5xiUYvcn23Yt9HwQPeOjz1zjeipGjluGOrBaIAcdzUe6ZJvBLhp/vEqhk59v3I4xnOmSBrzj/SbMjB2F+ZI18Cl/UXL2QktC+kIyswcXlp0kRHHL9h4cPjtvYdhXmbBfcbDODrLjgaxwHGBbgiQ2VLwvtExmBs5KP0agYSfcybpFro+5Vj0ub73lEEn8UoffPTtqptANvLD6otPTXvMyOmd6uEOXkPTgygIDLzNn75PZOi7bhNO0IJyagxFQs5DW1TMuH01BPbeCNBKLhURBDm8A+kWnce4KBgUKbv0+04KoZd9xJlEQtzV6GmaOI8Y4i90WoCUVOxOuJWKZ9NowqP/Oh2JRLcycYvykDfFmK66JTSWo1lLFVm52Q1+zvAobvBfxrKiVZbpwkG30hPaPHqMJB7Hdw5KBQzc4TGrmA0uQdRqF0D9VrohNKyoVaFPJckixlfU6sUBV3OUPI6lhTEdAaaQc7hE/4kcXcx5RQyPiJ2yhQUJ9BDKC5wQygsJ3EPYMOSaSxABglnfwvdXEnRHjlAx9/C85t+Ro+2S9OSzy1rWCD1qNhEuLAHdlu8T5xM5WMcbHeterfUpGhydopphhp4YLrA743dkrtkFfOBw+G7evBfhCDvChnYD2DtnrD0/JiLoHnIQdyTZO3uW3SVvniJPFAu+EVNgy0pv09OITp4znJ6LkzkCG2rPG8ncyEkkavyOs6Hty6SyWW+uvrDs6tPEadd0XZzSRf61aP9TMqeJECX06/AUrHG5d/Cj3aqaMi2F74mcfGwSpkLlwsbDlvjijxw+O3L15XHj8JJa52auvJqBEQmFfErXmZwLAbwQfa6mr1jSyymeSzzFBWhRUtJenFPQFY82oBAFafHISp9gjHhr5krWFDlJkcS3PXLsq4XuDCbM4goFLb+TGlWqJDxT31qx9umtKwmmlXvknPJC8AXGCNQZUjHw1yh+nDnc2d9wchiNpHkNu3KKYnlaNFNSJ2VZRRJgIAE7ZydP5pz9BuXrL2cexjW8CWRQpq+rjzFIcqKJakJoULQStKellrks5qlKfx1hwbelShwkGLZld+WIyTZViXQQJFYynLg2OKqI1E4bIaHbYaDPvwcwzthSIkPrttvMd2JuQaHrd0KoUmLYAxTXjiC6nss4enFEtCw2tOcyjoqTXzsuSYxDEdNBjwkvnM8f9NFPnRRpdObv93iUQcewJKQvw8tXLAmfWAYErB5SkqKw5ybQQQkQY4UukLHJcgA8mokCsBibqRBY7MaZII/Sw5X+HVAek3oJpuvmqhT1kWYCFie8YpMeBFSo0rEkF0vDDXMMXlcZetAJxU0l8Hrq8khrkWeV2A8VkxgOeSmqnEgYGBEXsIt0UmWAT/VsNulEEK6vubnGR2SA5QedAPg1Mzxjcf0/SCfIofgKKi0taO3R0oyaU/ZzJ6BE5hx66pzyBDL3zKnHtc56sburiWG42lq4qJciZ9ewjH4KjYH7yRfF4Pj5l12XwAM/0FFHYc4SSOaQFbs6/KmD6WNeZkKGxQkpDR4II5eQ/bVO3uxBAUJfRpzsYQFCByNO9sCAXOzkrba/ZmhAhgSzCTDWkf71J3BwRbzR1zYPUlV2yTjITpBE5LY01kvnjXOu31TSUJmDd3h2BS9XcsELnJlsXOjq3l1V5Fm5yYWu/t2DPpOZ23ipg3dVkWdlP9cdLb+/Ss0VFNjsDkxI/9I1AATdyGvDh+Yzx9c9CERTrM4jm8JmXyL610qbMGQ8/IUrJRW0fKajgMEc7gfWzhz1z6hVp67Lg7WCbhZ30MjiI3ZVUjrnIM6NJE/moIhXHglhGzYyDPlKf6WP02ct/YklvlZ8DdffukBvnKXxISfQKe5vrVxMY2QEMARn847SpdzAEJzVO8qWMr+zZ/OO0qXcwBCc1TvKljIPyHJ9QPrXH+LUgMntrf0VJwxdiwTGyUYOZrbBsYSAYaZTB5wzszKldq3NS7DIsrX7JXWeIxh3O4qotVlknHKNXtvXNInsJYoFTNQifW6kOHcSHZwznf9lxgfnHM7/MgOEc6bzv8wI4ZzpAliOOUj3uRscgqx9oS/nn5xJE2UOH+ZZHFLaluz2PEfqP4HLldR/xZQ+FYPMgWo5MQWljzlsCLKVYao7q3bIwXM1rWRR88Yaps1FhqtnWsx2O4XZ4omcdUp+ImfZKX+gr7RW8w6oE80TGDodtXk0rmSW+oGufZNF6/abyPnEOnQChyF0JfgKdSCd60DOKmnZUa5lPY70XlLufdlRVCBrlkRXBEZq7Th0drQ9aGOd4Tp++MUbeYPFMa6Jvc7XrbkKhqfPfoxXRGf8x+dKBk9maGigeYxrqKFoYUJXv1YDmdNgw2aCzqERFbNpEm5Yhgh0LIyazQIOx/W6zkPs483xCzjsTXDKVX1pRyYxCdysAbRfXyjXlFVbuOKaaG943jV2eodR5Le8J8bnT5gRjIL0NXX76HiLzS46HveV6i43Ghf8BXpMPDVtPJuvHE8ZcrZrf9arNXICHR9DcbMxMGLXDFb7EX+hIGDFJMe8lN0BHtkHXZXdbThuKcyYtCMPj+my+diN00cdrM96o7Pj1iPnEzkIkYj9e6MzSOLtiBty42axR7Uk4ghds4kNAUxGZLrcaP6xQZcRkdBcq0Mzlh22RZb6v/ExKup/Kjf6uiIcc3Fwlg5o/gdiT9pMxhY700ieUMWc1KwTambquwfa2mrb5k3goJHjuJhVf4an5aVubGVoM9f8b8PX/hRIMu321bFL0i6OEoCLljuhi7P5wH6/cj6Rw+0ijnoTdHP+1mVYVPIW/WmfW0MXbrEdK0u4TlRPFYLK4KiHw8Bk0K1xaA1r0KmHQOdBbGGWgBFG1xm41oCMqTKwZjRW/HYEmZPXZgKF5/uV8/kTWoCaMnMY1hQ5mH7jsTcvnY/Dy0FvwMjUxXKtzJo3a6549e8LZLvW1PWQvoTvS7O0JhGd6waObOS6j5mCGuT74gf2tNHs4Pm3vPqHMAGIaW+cz3Kz1ANgDzPyG04jEZk5iDeJdLwNsV1oh3nhvPXkjU4xtdki6vxBrWGsFIo5TKYI3XNClOuZLGm+h6OeOqtvZlBRuPvEwbi5TkRlJLGX3DK1/8hhqUDzUjQ7pdXpxBynNC/FdRjZqhJo3MoJZYL2yxz7e6/xF290KOl8tkSoy+2UFpFxmrCY60kK/OmyImv8p4mKdTCmmnmiXcMtCkRmf+AcAiozBA+yMzNy0qaHzV/+Ibw00IJ78b9GBn9/qda0TjGqEWKiMzzVfBODXlEg0hkZTIb2PJIJMuX9+1A6fhtee14Yn8CAcMb1UsLktcmRTOHj2MzPWuJyiuXodeycI7hUIgfc0L0SIq+HiQDqDHRbdnp2yHu7pCG7jpTWDRdAoqFEIxLkPkl6UFdk+2gDRQtXaAWEkOP3AdnhkbxmRB896IGRGTAs4otSrv2VmzEU1UQxIsRq00V0k8erbqm/RzP1BYeeHU942gHAg29iBPDr8dm9Nziwe33tlfyMt5ADmINvPkJi+PcHO3P+r/m+E0ox1CT4fIM+uJOn/3XZ+Bh9on+AnimDFrdrvxefDXWAW/9169HS1L7fGLEuatwrQ9eePu8R3NML+bFiWqll46Y+MlbFsuh51F/IUMx7fQu+TN/wYBd+BwakwXsh+wY7USR9YXwCA9wSmbFkVSYvwZPbk7Bif1I8UQ4/XRXiglQT2pLNuCqvmgdgKUJCVt114AmqHnQMhqqubcWs6/vjqenHrsM8kuEJiJtJw3CbGFOV/q2zXFZbgUjF71fOhzj5DDI1/AaENHFueyCQt/sap7KRt7sOlEhCQidvdx2pfXDA212HKp2VlnEaa1X85vlUeeOk6Qi56Ya4xbSN77MxBXuHv3ijj8oS7SW9BSR8T+wiRTMtNk3jcJrDhfY4TTeMMQWjmXRcdm/nX/iEpySTG/8sn3hVrmryebveJ5m6oIxyhnNPpMUIjZNjEot3zjbztAlHERpHqviZ101uJ7lyixql6BbTaLR8cFzyuvljKFRmOCqko58QcjpFEfkb7judY+8fOZ9YB6MLbJotIauE20WrSbZ4N02XYLLgLgYqzc63LQlwRpKLKvugWGldkePt21H8J/ojhFfeX8csRPIQwTQLGLtlAZ6CM2ocMGKs+iwGf3+Vi+SdpTHXz4CB+tluJ5dhH7l+tluKScGTZv1st3NrU+BZb+RuCSYFTzqQffG+MD6BQRGxyIDUOSNVkRAnkMbpqYqE7OAzp6cqEsZ8jD49VVHeb5Klmm6BvHB8BsOBLveJwyfUhZ+8Txg+oSKE5j5g+ISuvzS8oAnDp+D+/nps7fc3YAXnX59grABtEsn6azlpBVhYGNOh8LRg63xqC/fpTwhAmHlnTREYfynrAT5qoBTfsHU+dmQUOs3ZIndl7OoZv1kq703cXk2vVkd6neITKuUIddTsESwyQcVvdLZSuZdstKu5i8qPnIkXmTbPjDXsy+3MRp+ptKZ9OU/chpV7a9qXm0UsrkRdaJ8Tiy0RGPbiZuRDDncAOVj8GppXeg8h+chh+2qfWFLISeP1SLCkhA5vJX1gSQmZnkr6wJISBryUoPUgw0sJ0vmRATlsJEYO2tqR7g/zGxko8DUmEeFDoXu5k+Ef3dkjB81A/rqg7tXYDnTuD+0A9Tc2aCUFCmXN0yyPKLCRdWWlBcojCiwPx+6F75lHEFgrnOgkWxDYoYA3TMenEfBPpu4i/XDRM4EnKNLNlQ0I5mLFYX2FjktyaANUA3Lr2unkQaeyEYeLHmgcs1sceB85Qp9jvbu7lJDXWO+Ep1Yce184C0yqgOVuB0A1piOgGnMS9NhNd+90FIoCZ0XOF3va3JsdSCtyvuhj6HWYGx1C54uBN4oWKZwVO1/0ufVaooXFqgL2RIKKeOOk4ta7t4Ji55CD5kQo6geGS5tcEtJdrd/JVeGF84mctgpXXfmBwAsXOQiIhGW+0dG/ijn4eIQcuCd+oLs9s9ObGnPwXmEOeoi+0d3C2p88RyPnVod7RfEvkL6U5Hmz1AynRWB8ImO5LE0n+nhKpkzW6m3WzAEK4fDLsH34/PTtZgjMdbNMHr5BDbL5FC8Nc6leW3pgPGvuYoi7yAYJfeR2o89gOg7hyBzSyRz0Brs4guhXrLCjaB5oc9AUBMBmPxAAwHNk4nDy2bYVTgoMSVInQRDmSenFX3QBJNwLx6FMg8Dsgx/3zvBomi2dyAhkdPH3awzo4fI+aZQwLhDLYjrG1kIV0IdnxoeC7PNJq0mFjyNKMEsOPkhOcToUQhIPNye0AsNPuRWQiOHGcZ3jCB4WrmAdwcXClasjOEC4h2zkuD/qQbIi/gJdQh7pX1wHDhPT12RixTh6pyPwsb2UnlyYcVyavryBK0M8Ygf4yXWMlLPYfOzbJXFshxlhTpIuQQEqAO7y/cqZzkJmm0BOGrBsw2Sqov4+kNandaIM3cD9kaZ5opg2sYu2japcGdpHLXf6nDFW/pDzif24zfJ/0GGs/tGavY3WWrNhTJBOfmZAZ/8X5KDXMdf+zuEg46XtF9B1vteWF7sDchLgIGBZGISKZnkOTy3Dr+7cLJErzO5C9U6J1oP61Z370ERwBa2bKiVacZjKEOcqhN4T6bNIHKu6vhD6inQcGx5GV3n0q4kGOBPBfcO1tYlq+w09hJsDBzt5J1D70H3/N3SOxnrsqb7mII9fc+BuRE6gP9e/hfoff+HXtQxaWP6Bs+w7eaFalw3MO3mhYBfKCCKMaeooG1h3ssNs00LhtvJ6cQ7CEnG/fRH8NB7ttuT8Wi4sr9DCYjqXiZyHMX7kLCkqrKTf0EOP9NPZYnt/Q+dRXmJr+AXScb7eS1q/vq1s5HBwyvpeoWQrCQJlbpw28t2GZdFmdtwCeViEPtPpFkrEonFGI/9uQWCuPM6umYNlEaiztyNykPxU5/L9VOcW4anOffBTHbrMJwAevhxYlJ44duyFjR/nBI/MyHm/PG+Xt18c8foeF9KKCv2B3uAMXyRviQS9lYgX0wdmOTLSAHwSzPKyee7kNACf+qBPk/XXAnwqtmjrTDE1O9T1fFsWayZP7C6n8PW6ZN0bZ4m7dAUgPS3Bw0qG55sZZyNY3YWT7gWOyghNTZ36NJbHpbNw3ZO9jUnuRZUrZVxm6M98GxPGwsRK9ji2ZxMw5pxzW/GVN3ncYiEonp85PrmO1p8ckL5stumqBY1lmNwG1rfkgPTCWfY6am2DdE9I1noXmvUD4xMY6+VLyBpsOFY9JDfXnFZzN8yHNatBgw13OxLmr3WC5Pe34cZ55vFGDrX1Z4J9xMgdPB84FQRy2IcROZhngQT1VSXTGXoSOegUgDW80dc2urU2YKdDHYjD/lb3UjqR/rWCZyRxT/zFvA7KSK0w8set5D1l8wBUD56pgzODh6eiL6+CZfMA1EDnfgMHbAWnuSthAsg3OurYHNLWZ5pW5Mz3L8nqmsfDdtnqev8a9qb1tu0PYHVwVk7YjYw+63U70HlRomHpAdR+1I5Jm39D572FpiUGKfPXtJP26RsdW4tj+8L5EApOqB1fk7jvkMLoxgHXSy6MXDVXk9/pblDmriBcCS6Td3qHxuKF55AqtpQBdeWBQBH7Gvcpvh9lo4j9U59hu24bjtjXNJNtcBD1Q9/7EjvIIjRMYWe24rb9Qk6yitEwLDihLFWqTqtiiYXFlLDhm5ZAkCymtfXBWaInALEU88IzUZXpGBDJHPeLK25c+4EOGa4CB40yRU7AJpme7Nptl0RVDEpD/DrOZLei+HXsBk2BbSJcj2fO0Lx/p5+gAH/MZAhBgF/IoDcB/hj5FoL8voBBgwC/xOsgwDNBH3EL4qyYQWMQNO/KYRYYjeMficIV1yMNNVlie0ZmcbjEUKks7mBSEsXXvnA+BAhTEqH//IYOjpn/Yi2orRdR0kPn84IYmlr7uqCYznozclg3X8dr4JQX+095tv8EOpxWoYuwB755IBGrPLO0pSs6n5GOobzMwchD5sCepU1vH/lhUsPEjk2vt1MgYqql4NEQkGJOxuLkFMCL2IKe6R0DLc8/cQ712+rGEX/JY6T/0egw86Tu4l+pWWgRoIhrh6HP4KA93R6GgjpmLkU6Dwdy+J12vafPAbaXgH+EmoPK83fk9BURXkxJaeMwWxHkxdSasVQ6xJwXjzOfytluL6x5wiCTXgmOHbezwE1PrNCDM0Uo643+aDn2N/XI+TAnhRsSOZi1q0UC2s4ebjQ7AwjHKX6k5v4Lv8TwiTeOXelr6PEgxKlKkFwNJzeZP8ywrOJySKYBqCkWl08yfxi13AY6DTy2Fu/u39DhTv8XJ4QO7WB1tYteMA+zTcqhWIhprMOe27EnM0IKdmKO9fLyfLOx8ry3uGLT/9rfJwJ2gj1IHjmpkOHSrx7+PoqqvNohauyN4+41Y3+ilF4fCejM9aikBzoK5YVeStDf++prOUoTSFblbHtuc2efpedh1t3TXkvOK3XYuOTe68CwVS0ancXwi2/0/N9FfyJn/a0D76IQTyLScfCITssEOWPVIemtC54mcO54WDKVxa7J+UQOrn/mYJ+8llsrjv+u9Pvn5uBRg4Nf+UhZzeFfIP2xjtiu2Byw5Xx+5tBV+9LQyMGrEDXigcFzmiFXEn7s+6mdUMyefdi8RUiqWel+aLAd8YXziRy3JA78wzYMfcuSWB0YOFgSDWPx0q4SWxKrAwPTUVH5dWHSraQnjo3Iw8CulRYnwznp7/2jv5Un0p8BVi5IB9UjNJAjdDUQd11VrrtXjwAROmj71dTs0nV9un0AkhkKfdkTiC4FQIx4SXTcv3A+f2ZqDDPzw959py/bZNjE3aHakPOJHLexvNF3R4TCs/Cq44XziRzsIXNWsEuyQBFZ90pfvr4WWLKJ6U/o4B08AlHKYb9Y/sQWtpJ6DTrhvnClwlDtDlAVhuqFE+i+YUYwSd33+1AhhwcEOVjHG10XTznv3dA1Ulq+d4M4C/psVxuRjrPQF/TZrlalTcLVdI4c+mw3M1TK9osFfbar2eraYjmuHV2fRY0XJAgwB9eBvI+0Od+wDvR9ZM42rQN9H9mOGteBvo/UeA8Ol+fcb3tmxPLktscRHPhkOfHiCXRfCC/0r1gS7pmXOgLH8lvqx6v79lEXRDrVkUGr0OlOIkuP3zshGUjdYb/U+Zck5UJfD5zN5j8XHYcTnkSbzn89Bmc9ojabfwm0CuOjs5xyuY+1c8IX88rnqHM67n79saD0lXF16Fxtu0kz+BEbMGD1RgNwAb5w7Apblb+Vlf/S10YbS2xj5jbmlzYinduIHL5mkeMvFNiGRFc50lHwGBgkkvIJOZ91TQkuD9XBdLxAHulf81o7zh6F/mfGJzAw2dALGWvGpH/cO8paBHP8Rs/Uh0v9qepzKXJpvfZHPS0d2CVOlJxMju3iyJmUXquvr0UfgsG1czZzrMFfiJ92NtEFK8Ddy03qwGEJAxc33/7Pi/t3dJ5U5ODiZA4unDc6ThK+9b5wPpHj76ovvwh14wstjxUmceDxxTp+Q+d+3GZqvDS/lHWbQ6zlsSfh+/jey3X4a/YIX08mc3kW8pc2XSUddJ6vfny/crSHWMsB7UV6h9qRjlHwzFlYeVqHLUy7ySbQ3Gc1a4gZrwwsizkm6Fmikpss0yxHxSP9K5aUJ8dG6zpKLrVRDyx94xJHXklhIsZusd4Vswlezdr/vvTv64eOB4YCeCZtrYS+5MNkHHEh1ifQZKEvRxr2FgXwtBc1C30xv4PhpizfShb6IjHf1LuZhmXIV/m/x0PHHCVULKtCLwwpb6uRznXU5wE5QExyxqwZT9eHWYUa/klR+22FbNXmFTm4Rt7oDcaqv/ZjcXys8CwZZWEHl/IQvr9W+lcsCYYEC1o/eBlBLQd7gT/AE+mNvsbPS9rsmXT17fuV84mcVZpy/ByLHD9JYmm+bxyJODCSq8qhsMgxwd2cR5VxhFkfdWhyIKZjxl5eP+uk/l59xJ0zzt3RrOKzpccuF/VGx+vjpA2Nh/4L5zZaB9TyfBkcz5fBF08iXhNM91zGTMfr47hfz+vIJ85A8ZZGyVnZ9ZCuinVsTZXTUUCMhTxBwrUC0aFLMS1IXUx1tlXj3krcZdhj2E0n3aRwgjED288cH4sT1Kh3Oh47JxwJAAX+/cq51b7Wf6jlmQ4l+UrDrSzt/fzM8do36iO219fNSz+09ptAKyV9v3I+kYO1oBiK9JuOtHaZXNL7vSC9o82uMuHEhXqtu36Y3U/d5sQ4acXImm1mJzFMmG11e2hOinB+7JG8OrYWwmCgUMw9YA6OhYvev6ND5f94tYHI+v3K8ZbdxNnzfsU/0JPXn064oOIueOSE3gOHWvVOnxfN15/AwLtJ1kLbVStUdwAB3ayWk/VS7I/eR/iB4JyLrMdLfUkEt22uU1LzOGRc7oicXRy0zAVNfLXExqppXCWlRDNftnbm/eh7+jtHqqRCl6+P7uBoz2sr8RfnrPqNfisJBLG8hRvfCLruxYEsbwa4sI/HnoXsv5kYPK5s3Vi7psQTjrp/2ZOm2qqz/cADMzyhwcahSJOu5VDw0pj3T2QsG3YGV8Oyuc07g3Ni2dxKbk2dzxVlc7t6BvdHXIo2NuujjuvtJXic3OQ5NnuVTn6iop30yLEJIUkmEHTBLVNl2LfLVCl0OBSXqVLodCguU6Vw4FCkJ2M4FZHOJ8PExCJN+lwwMgUCC7QHAxWrjFCENcILF6tY8IICz4xBkG63fX2cPZeTMW8UFAe31BsnLC24XN7p98uJwiv5i6sm+wgilxFchAlNdLR7DEmGEp66ZIdIBr82PBS+XzlaO0U46tFx/v0deUnZX7GcJbNrDQjP+s5ZpSlHQcqaxdOos5tkxxO62AUOC7yUqPTzsEl77B+3K59hTLDFS4+2MUn13Kt53pa6XVujay25XwfNabEf9cj7vuWTZ4TulHB+Lc7tZNOgmnxajs3pIFssBsfANsCTuYyonTXyCaImNM5nqzpWy5MZb63Q2upjlU5yvOV7Djnzse2FnAFnu2xuxbBTGDjLmoB0nKUMjoRI//rzxvlEzly6N8YOlS8/xun1L5MU6JUqRw4vnSQCQd0MQjcXzfkgU3QRj2SII9eJekruNmrR8bRsi6GH89ZAzurFjbM22g/05XqewbTiB8ngLNHr8zMHa1mc/2ur/qPvWY6F3VDP8VjI6hLfFRgGj4XX8SXCh07zfNCquTcCAVV5AjR53J60DPV2USzlzZLNHQMhXrxj8sY7cQ5ZOWFxD8baQHSYvdPXtgrHHxghP3QlZDCM3jhLI/8PDqIYcWnvLfgdJ9EQPw2Zjb282had6SpIgufRxnF6neXNhl6yOwdRdC6+pQXgOoATO3DgdMzbrS2bJreuY/rE56nqdt/E0bMYYEyW72x7XAbvs4fH5ePI0fwA/et1tvEK/oG+ZvrrT+DwCfDOQdSvpWYpx7HIgBPoy5qRARsF6dquR85VhzRH/yWIP3gAzAhT9M7pLwSHtdQphPfI2SX9m+ngxKccEc2rpb/oez/abiUpNrSBOooscIoACG+zE0rMfMACB3zHQ+XgfRx+EziypVI3WErRsLol7tY9Vfdk6GA19XRoaunl7TWxviw2IHAAbzMj7tKJgAaBw79BVCRfJ0z31QCBngUEjS+qo8CK+37lfCKH27Web5GTXzB8MljgyoZRGRm0wrIhgtWPnKUilOQRG7O9Q6vHUUE6hIuFkgCliH6TqCz8RYO6H+m3Oir3UHXO3IiThztnNe8ONSSLMJyHO6epmVVRSfchQqk351A06wxTpCE0w/aR043Oje3lEFRyM583QcxrenBf+6ErbrFoYmkvrel8d8EFSNkUtL5fZ3Ae83qp30fpFvbQxdRS7bS7NIm9z4fiI4shZY/j975C1l77jhyXf3i1vdHLax0QtxM5K5cEDrmFY1umR5gji98eWfVoUkfEt2TVo0Ww0SLwAQH615+wnHlBIYe7MdXwQhFLzIC8GaGsh+Nqt1Brh2iEFG+vZIinCeVAiFHgQLghTseN43aJEyNw8uYPTbffOEjeTxy/8d7pDsRHKRboOqJsNHQdce3M4b6ccFUc1OLF0chn7HbZ0Es67AOXFIj+Nz9svHH5grmwUCjbG8eb0zjWK4MdcZ7NY0Dh6xD588L4xKod0REsmKGGx6a6bIE3j4U0vXGWBJFPi8I9JDaxNZcg8ggRkNBmcZ99a9WtdgjtyIlud+YgogyOCnN8V3JZSH/sobbrdota+PQb5/PKyQlPHSTj11nce+TkRKfkW0k8vPiL/NoN3o/Q3GcGHnnc8bBPr/pFe++nhseegpVRbOD3Tex9ljlruxrZD7H/v7SXe4Ln5/fPtb9zXruy3F/CFcEcCOi3PtwIrpclMgm+0SFk8Y1zK/qJEKBh1tmTwkeqgkcaOXiUJle6ZdZE6T5P3d5LRz9Nn2imzyD8LThEBw64U2YIxGSkjgyhmBlSZtw4riskguRwaFWmgwetLZh+HWUGmiu5XZsNVtUssdaqJLlga9flijUvupakmWHbmeIvimaJnam1vAbsN7cpiUFacp9LL8RQ3e1Irds1nNmSIoldO5uN9oQmgQetLAwBeGsjYdvSTO1JcGvV7uylmeIJw01iDgRPZrzsDkx/EzjwlP0jByGxFycDEN4P9HXl6CBikkRwW8oJFDcuC+m4eFw9OsCVJTD84EmQHu2d3qixyMG3LeacUBZlioNOTEDyuWXsSY4ZfrD+hky+C9IiuEbWYfH9yvlEDt8wIO7QKYcMOmpJonrlBAIeRxne2hCHJ3yfb1XkLASVPKKEkoFBLASVPOKK6nigcASVbJFI6pUqnAXBPiKXxIt1GkmGBDDHAclff14YPNihJKT7Dgx0OrTfJjT7jrrdzVgaSixIb5EAQfeBg6uFq0Vlgzl+smbYG9iclw58SUm+DXYEQcjZVVnkCH2qvkKfuEtCH7qykBXGonerYinXwlGchMN+sBq7mz1jyzc6YKHkDFrhTias33LQIBY4E6opD5wgfaDYHZw7G07QMbKCAJx3NpwgM+vsDgCeB1DQvpWVgEKPzww67E7mEeRQRp1fcg6yIPyOc0JWBxqUV8bOjNsKmskuL57fBzuplsjppGUwxzcu1gP2Xvr+YWOIhFDi+VpX5IAAjRsJyC18xl1NDN66S8x+59iB/jMhnFDrMXd+dRFGtud5COgTMaRe/k/OJUdpdq+LM7M/Cv2So+qhz1B5Jn+cZ5k+gR9BykOOW9WT+2hAykYm8yG9GPHB45XhNe90LTq9g90k0F/6AJxP5EDsGw1tfx30/p+EPfzWZzdyfHnttkLxq0rAb+Adi5weluZazfhi9BtyogoWY59rEg+IFuqC5oVv4o4k+hz6Lzt+/Npr4fjxi5JSztFvmIMXNXCI3l4kjUYmqZd2hTraywX+Tn+vgy/2R86HR6XRlY901zS4JEjmEPrx9gtXU1/aFNfMGvTvN8ZtC2xQh9MbXSBI5zFEztvFETmrWY1uL1imtEVcMR9sgMpQCbOp96icwJVeZZuKYdnoE4RV6CqGSd7Fao6T5znmpKkcVuwXC8IVLU/VICs1xSjT+SB85Axt82JUkZcujkAWDsVBnEry0awKQThsJO1XUuWfGZ/AYLvKqYF3NkxdbDT1sM15aAolrflQk04KAnqlG4aW4n1X8K3rejNw5uyqdPVOR5sUl8RHL9bO6sHjbv38vMORw+8Xa2TbbaTx1nTV8J0OxzCpn3HOkONPMRDwdtH9NZ3p7IjgboK0YP6tN/y5vGlrrU0YVxnuRrxeE+17Vvph36M04eRlp7cDBd6TBsEfi8aYsBzj0sBPHFTwke5PWuBoinR/Choctk5iWWiD/A2dzXQ+64Kt/30nfZhEkFhZkVj7dlgPj5yOJgFe8sO+l6snKuNse97SMP/5qslkhWYO2law9hwevpCDlnXkFLh2MJKggP8l0/EwYA7X8RtOpdphG7+Q0eNloz3JT8i4+7Aopxd6KfY9WYIPwCPnEznBS0SyK2dRsa/a2743c6C8Jr1e15jddlvZUzI3MOzGg3NA5Nw66K6cTEcHBDp0Jj10MA7i7zg4vMs9udzf4Y3MgwsM9v8BhqVVHG6uihvUlbyyKg64erXyjLSnQyAbcPVJp1stepp+faDVN12Z6EPk3p6FRETmNOgw0iv02P0IC4mIL5xP5PB+8Voq7Uqku2Vtcz/jXEPtTbw2DxO4lpu/uoJc0oYulephAXMBapsqmbcglAA546GgF8OErxavddoyF0dJeWe08zpfwoC5oeA5zj5SzplvEE6gi8svokZypx/sjS5hLgnv0xdOhgANKIrJ4YVnMvgGJEZ/Kp/JOM58/z1yPpHDdTun/b1/9Nluwe0COYVK9LUWOe6fziOGdBxgpPMTl/ustvDE9c5ZcbvXGGgl44VSHkvLJu5hwhBRv42QqUsDyNlkGVEM+mZkLafuYfwjZ6L/jQirqezsM2XNiMna1Aej2sOD2KKtJAW3SvaLmWxjxHyl1HeScKaTtETCIt0dqwcHYWvsMUXCalH0iQyOgtuVYWcFogsgp1BkadPhOVWqmJd2IHN0F3LuIbWHDkkO4a7IgUo0bLj38wfyPeB8chCjwR7tjl7TUoVX/AJyIEJnU/LmCrpsqYFFcOw7m7a+/gTOOqQWeMKx507WvRvnDjdxSOg16h3MSQeqUAoxUPZWDLlgE2D1bOgAve/ntUoVpucUZHXJDTlQGo5mZL9SBnbE0QxICqG0sfKOYnHgFPrN6mTqocFryBJY6phOc5E4jzZzsDnMmfnOZLYlol2BhXfL1JQ1RlOCxPouEcK751MzAAV5FjqLlTPjfIUuEfbiGJs0bTisIyV80dJKLbRuLdSLE3dHokN3RFEfgrKT4HAN9IVEy3RrhxPo7pDNmup1UHVFSO1NklAcusVqP8XuY0h1V1cvMbj/pUbW2Ukkcbs1wjwlQ2NVgP09rwjzchaFq5NgJDl2aFAAWZf39f9j712SLNl1LbF+jiIn8I45/+QI1K6WBpCmqtOIkJk0/4YIgJ+16O5xs8zU2VLd2zgZwHY6nQRB/CFloifm68Qc2xCgEjDSQ6DBkdigqv9BntBT4CBpv+tT3zCrBywdj3c4ViiG0+mpnB0hdrU5Aq/POF6w4H/4xPrzCGPZtnf4eiN0z+apO9quqmWNU7AmZUk41CW3YtWyxv2KU3gUDjW47WZE7lgdMSZKspL1tY2uX8NaUCV1CTg568bnpx1ulEDqV2pc/dfW/m8MVxTuGIlRd8lai63TIflQXU2RiCFtpDVPB852dO1jUHhaunfw84peBw0cf7djwTecqa3RaxfRNj54+LediM4CJT9LDl50VwtaQEs6HHlRiGXUvr19l1dRGnlDm6uxiYdbFR2YWUFah551QS+rzSpSnsBner7AZ41qO86r9uhl/fHSuLhXrVJsT9LoT/1md+2K/l8DsNqXHlPdnSkYjrfUC2bXChpdzbC3AWLc7rv1HzD7PdBdbH7C6khjUs+6baHZ2Q1TZreJcXNaAyJsH9J2frUbrR3bBVen9TjC3o4NOkVB8zcH3miE2x0zFw0xdjfORbt9x8ZwWW/GACXAW9w+fQd8VW+3e2k97ZhmCLOJ5x2+V517UzAGiecnjBd1vVRrVaqNMcooUtP/7cp4izTGMDUGv3DN6s+5VvyFu6sQrMqo7XKNvkI/YbANTJM+XVJhQxvjda4bXTCZIEl8Ty36JV0/qU7b8OK8PKq1b5ivE/O87wzH3yM3Zgx/YYQ+vwsjcGgIvPuziKA1WggLXPnY1KMiNB0Oq3Y1rru3FCJnki3BabbY58nR6ZEqPNnZ2zXH1odRJEdMOdb9SnNyq5VmWZY+N7VcBYig4X/znySRIpznhhheSXgXtEqBxEXs93zAK71jY8JBEX+FOQHYk+rintFU/EABXHJh/sY/zfV4Fp2CWrcnXdkla5QlMrOz16vBr+kXXCpjR64LgUIt16pAQXhYDZyPMZno3Gmvumgr633od7A1Y3G1xmbKALVlIn6dxfPqdVK7V5wM1DlO0h5AaqWx2k67TfjgOQAAHoczj3fqGvAH6joxXycGVsFfNwD1ZVgYf1Efh9VMyUMpJYHvC9Ff1CtiNWzyIAqpQjSu3AMOH3ZgzrI82FHDo6zzA3zv3oGBO/XA7Aai7/A9J1uBVY1ddROkoGTa2976hLFBBwaP/d5IDEzBA0Aj0SFLc+32ebwZPPVJ4UKnTXmFGrpEMQg/YVZ2LGIOuL6/5ht8KY1/zpEW5vaO3XKXZ/UGZ2P0I8ZWRcuy2OKWFX53aeOtjtDV0mwIn3eZjbGKdX4flyyZXRzWO/xqw5elwrHYDMw9s9r2ZatwLOrNsYeN1goxoMYfpMBfiOSDhew7IeYg7Qmqrnxxnbas4Fz/3q61pDJ6HvS7/k6gy5x9405rVW7cSWdcrarPnhU71BEOxuMDE/Y7/hqzTRU8q90OgPk1m9P3QY1kQOGTj/Xe5e4QI6h1fCi6v0HfkuWm01qqyVIigxnUt2xAtPWGMWlTLqLOipVWxNzgh5SmTU6tn8m1zBOqO2f0XzhUnwFDAn6m+pQI50VCDFvntmBaTgm2vMq2bGNFuZDtsozBLoMoMRbqrYtiUIFfobRW4DcMZ9MtYdZiokRYgRIZzhI/Yc5TMersYnY1wjkgAzHo+kU4uop1HqP49gTvOyZ6SobbN020HJR3DDp+9d+x5ZXwN4t2APyily8MrtS+mZKZMQ6MCDnl8oQRuOQfhFHFfOXPXKa3ZHMjQK9of5ne0pLtxsrRGfdSsvrwywJwwDkMhTBqExqBNn0eZuGx4O9UrWSRGO5bbGqK017WU1pSQ3+1j/OrE7yVj6txFDyHJVfCzg/0sRBnIr2SfLZABCScv4Ez5WxukI5qe+6s8YTWfBz/J/iglLFVcpWWrKb7ojZU26ooV29fGWXomm8aeKYoStoKq9qb2ilkapBoawZXGdnmlDR95bI3EPlokGi+7AmVkUe1EiV9b3AgH4Rzaj9hgHxW0Ij6PESxriNeYkSZCBzJZ4WlCEK1cvv9DGKZ6zprEMxDivCd1jkwR/QUYqYJwY+6INnmqmVBh2Cobfn0WEarC+qnQJU1YSjYSPq0sQttyydV30QMARa2VykdbGTvdqIIFYQrtbpy0NkIFPUO5MiB0H/7EbGzKZtCdvD3Zb7gNpJuabDYmJkFNsTRyRBWGpiKErJKdUaAzTQwwayEqWungbkRPW3bgJ9c8dOeEMZPnwd6fe/7TN++7WUpXtcOV3thDs0xHXeS0/p7MZpeIg5lCyG6tFV3iSbrdvnJjjVRxNT3wEQ9FEA9vTnNuIo8lBWtiWx2plXqVsC6NBBVkWyZLnDGzkK6k4Yvszdg87AF/zMDJMyGHg/DOGLYZ1ulWrZ0yRKxuN8gVQ2s8pYurXpT0t3lalK9SnV54kfUQXKP/CNGCiGman7Y/oG1amg8w0PNnVXVeFoMpspN32EA1urxoZs1asCftf1Bo1sxyBTh/IKxeN51cvI/Zzb6Bm3VIh+K+bIldYTakgabm5an/j61PNmUt7qRjygoNkF8naA4vUYeW6AnO8ga7g9N0wW+O9x59JMkO8jRjvtuy34EnsEZ5dg2xByxbXDiwX1NmAiN7N/gjvQ+TnpDzDxrAtab1K3LKRcbRy9Sl9bldJURbb6O+LiboiUrX8osRa5Kq3KGXUm/dzWLocBz0DsZNfgb0BzE5MYEgCSGki/CUXtAKmXpcJ+LSoV+XjB29lTsMnepxmiOQsAqdVkkT02jlIuc3coihfp05+DHYa5H3Dpi0FK2LwaG46SBHP49x1pXhn7qMkKLCrXkyKZG63BZa5otdzaKJ4C41gPDimu/Arv2H1XQd6ld8Yp2m3h5e7b4J/HLa/zUdcQ30fS53CN+9E8YXnJQ03/A8Gior2NYNS76otljwZl+EePp7W5ZTKqFQuRiYy0LS7XQCem7dbybQ4yX9nXoxUv7sk0dqfjX0r4EDKn419a+lDpmKj7T4E7FZ/iDhn1S4BdbigvS5oGB2HQyR52YbUQCg8c0InVGGK0/o5foEDUViXnwcmaI8bVzcV9/H2+AjIdjVhySvwgAMccTm5Bevvx4B2zgN395pbEQvqVcXI96vGNF2fEDK8qugkuz7Sg73fGlwQhmCXYV3KYjgGX7VydgE6q6WX1qcucLaXcO4YaRMPouaicj4HC1qxVbSYT7hF+DGNcfuDQajt/gOgG0y6U1Gd5YXKq1lV8/Y4oeIgvbdCJNlrEdJV1d0NZl9CJ81utwnp1LgdY9uI1ODKzn3p5i9/lY+O2jLqhskle72IU+vfNrVLbhbQKrqGySqfNcEeS7++5tz7z1sIRC6sHx3XzIb2u1SkgcIT6Km0VdEbMLB120Jwjfswf4IUBXfD9h2jIq/ozAtVhmSJzsK3gQpQPzyYzHha9ItBDHD3W4mOp9iIxzvDGRUfb2xozGOxG+rJuH9Fa3BfXrXFPEoCwImOOJZSl9g9/evqyVXydtLMwBn9bEJyKzDzwIsGxJ+PvEYMIY3llvcC4Ce7vl7jv1A2Lt+tc5q/UtfwlvtLz4joUxJyeBJgBH3f6ZgisqGM3/rjbzrjp29dEci+r8ceNTJaMB8sFGV+q1lTuHZfarnu/4OjFIYjirN/g8nTubbiBUTfIWGhBXXGQxrSo7Nw1JdbSfVj1MtM9t8nLWBVoUt3jZZy8NV+BwFhMBjv3IxBJQu0bOgHDkDG79cGwWCi44hxvpzwGI+68z+U2lD3G7vqju4qTl7E5EvQF2+Id3EANZd/iHwFcMZN3hH1ZccMVA1h3+IfAVA4n+FkcyOMr5LxjjZ6FKzzR7RxdUfDFbSJdaQolGhP2Szv22Pu6hwtqkKFAlji7BqYseTssiat8v10c2Qq9e1IpDUy9k7BqVLGs0T+XQcf0oZJmMOqeKSwp+ge015+Dv+59b6y/HIiEGWwvAAFSkk+Bk8tgWefDXflOpQwcFX44nqM7PmlM+zCqPmC/GFKqJaH+CE/ac7MiWBwfu72PKOLUt91DtGu/Afs0fuQ3Yo9LYqPqxDdhWm2xX/dgGbKtmNqt+bDltVD8bVT8QjvEoeOYBc8CxjAM61jEq4gXzdWD+IyDRWr7B0e6O7jdHtnquKXjzmFzpLNL6IwYidWmX047u/Uv4Ue0YMNtSzO/elmLamfsWHuUrAENNQWCrwuOyWrrVCQKurX3GSzA4cO2gNBuapYgh1w5K5dGeAK6tvc/F1I7pZifNTvixxxmNWAcGPxjPJN4MeIav+Zvj9CeyLjIGfT4/YTavIZcWI/Q14sYzbhX7HZttIV1q/c4JVuPmkspBlzKFWKPzoxYvckrMDud3oKz7grF5iWUxJPNTapjsqAUnlshSLT1ObahaNGMsKbs1tQbOiuZAD6mHOyJuV56Hqybu5dBxonS9yLWZXVyMoV4zWzvvLM2ZU0uaXsRkBcSk60UZzi7pehHaqAQUr9qv0Ka+WaddL7zmowbpeqHihnyx76vfPM8U1siKWL2snufQx/mruRjDL7ydtgxXUvU1w/LNYDodycfzCYRTWN7rbLlkJgUSzn/fvoMxKh7V3Cz87+o3lrE5FY/ycD+LeKQEgncvfyFj1prczsZerV3YF1ziDMVtgu4pSJtfJ2a5S4SLaO+P4eLUXi1WXkptNtGiEZc/xjiSthdJfvlQi3ld1GajmWpI/uxiYb6DB+Mo8r42A0Igbhgq7n8CIBfv9GCSj3bXPBiAdSt66KNxC6B+xOwqLJqUfwaC7wb3s92laJLOgu9nQPtQJCXThsLfp1KobWfDGXENGHZz7r6w4fD77Va64Yic1VyBK1qE/5S9R6qAkIekBKjwrb6RMBxJnkTQE0D+GH8Gc67l9xQYivAVcnyMRG7OI9eVzPz++ErM2nmIv54ZQEtOZDgWqcDMGa73QZlBNC8/3c+StiP5qhb746b7WZJ85XAcfU5xIQ6fISUSH+/mCG/KPpqYH+CUGaTrMYOFMKlFv696NOI8Y2bLSM1LClIzwqrZzxaT8nYpPTPK0GAezwqI3dazgUEp3PzjVSopIcYPf7pG+HkL4wrm0VIPvNo2PJbh8MNnr+ToLY7LlW2yGN+3Cn2c8Ek7o1jXKG+jeUcSMexHwz/JofLVjkX/zWi4h6vOMe+IaS/79wwPGEF+YPgMbGnxxIhqVqTTrXAUie/JzWIPhIFVsW0E68cZzQXXXt7uLDWKrCV3ALFQxiy2S7w+vAREhJlMBUlESU9eo7gPYa39De60QIUj9hExEAF0vJMxuBQYQoMmZWDtJ3x+OxlOwqEw7AsyHErhvm7DP+kMf9igWOIlYSYCCqkfhToEAjktTVc+iT8rDdUN4DluXsyYIj4zExNg/CIeNm9tG3AqrObivHE9WRhQxFJZ3zF7RSOFljGGVS3EYH+YN/jeHa61xfPiBgqIWWqiHx3cp6Ch7MvAi2PFrYfaKxaPi6a55mEZXDwxvpiwAH4YwyJpmMgbsFkTZkNivISnBVmLTiPxnDBQGN32jNkxn6gNx62PHnCIvDwQ6m4spoovc1OHq3vSBzZQdbhGz/rZiWqZtKLE4IxWemgCAwXv+ARU/Hg5WEO+RSkv7RUjf7FxAOoUXI0N9RDGoHLL9AnKLR8Ov+3qN8zOI8DjwU9gLWh4Bfd4wFkd5abhS26kqK9IRHA3K8AyTe2RoJrl9yvm68Qg+e63vMOhEMCBSedPqS8HvPJtkQItkjcPREqE0BL4zop0BesYka3Gr/ofomkMFTiLN/+DsvM6GRFsWrBuEa2e4AdWoJs81rBJsIapLl1I7LJUHqWVo3NhJPt2LdXHK6+FUaIKZ2X9Jwxqy3y1AhhFakJsKRhJ6h3OLgAYiIvwJtgqtEniHfgG5zrTjxi77UXMKVm312tJO7tn1UsZmwl2qly6xteAp/RHxhR+B2JUCE5pGUw1NsebyO2dWwZTr/KpVvqo0xCghodgv9cwVzetpdWVRLI0fbQ/LPxRZGkTpVXcdpZCFeXfeShJq0U4bJCn7FjcU9adkMg8UcHfwJnMEAM1SeTt4uQqVnEJS4HL0kg1BdUIZsmiY7Z8JDYFDsLTkV1AFd5JwJRMOZG+z1QKVX3UaNRpKJXB36aBwllaZI16AuO0Z/BJO9d3yZ3qwsk+Lw6onWs0aiiYlWoE+2p6g8YJBbNSrehg9SdpRZJgkUXDy4iMIe7oYwTzwQXM4rma9Qa1EA44LpAHDNRn+H7FfI0ePJ03Wi2Nql3e7FYsJYvV0XZdupnUonwad32Jxfp2IGuUlwnB7wbEKtkjNaUHw/c7EF2g64LwWLBHMPNG8btej4Dn/QOEPitWK315MmcxZhhhEbRZ4zsceQRuriemta0473CstYHMF6Vatu4wBrVnT+U+sDgpYhzlU79gJv3NCkWLP/LvsWgqlA9HzNevuV4PY2GVnt32BiuqONLqsaaKO74QMfz2onlCVm9IGUppVoNT7AjZyrfFWZf1eDtybiEXBH2thhajqtVmzbBlP8CRZTMGjZ34DqNKKpbnwQjFRfQ8NLJCjI5pR+Jq51gIR0JFOJM8viOdP00wNP4Q/fkBbNdA0d+C2bZnPgVQvRUnJJgT4Mmii9/0N3BmvWgz5vXclmUH5jHaO1rnx93+azpwJCv9hEkEOn66BdnxwzXzzeqHefvteOLQeATRqAhdAhBzwHHVNtwfDGCzpZPFNShuhbNtUNzKLbOs38HCAgezrIdgYW8hUmqWDcRe3TLLHvBJB0rYjxgjX2Di+B0BrgRHdaT/DnMbDQziTg3iUefswSDu1SBetK/A7aKq1jgu3C+9cYUEuib3yvMTb3C+QpaoAHfR94FYs2Iw3itbejnvqC18nffHI+YYa9+Pz1PVmNi4tVD+imfElyBW8CS9JO7gSYFrQNPoYTGDJwWuAU0Wkhl38KRghPJTdKtpQrDKo9qMoFkFboTzfm9jwFjEMohtWw8OxLYWjSUsyVgyZKMDBnsquBG+6EumngpuhC9my9GBpgpuhC9eozvDOk8jfDF7f4OPydpAD4ivE4HOJf4+PgGIQWfR/zTmeP+mhUDCEjrKGIPSCb8D74WfMPh+vH/4Pe+YfSMEEvze4Cidv2C+TswWK/jdCKff3wff8nwgyfUVPnj5kFgA42iaUENziCPXoQ91eaZeedYw7bTdnF1IoV8oYlnWgr6lq9OxsDgCcONmktotR+l8ouvGcmjON2BBV3SDoAh5zvYRM+UIldne4aw5bonNHW6TLRm+Y67D/ovzYswWxbDnPX/9G5y76z0+cXsHdyTDeWF3s11uieEe3kH9II8yxF4j2SR2Q0lKM1nT6MkpJpZUpPDxSmT1cEQbbQQh2IlHNZH9/M+ehZVK9lCItB2i9lqldmh+9ZBl16m9IWaxlsri6azVMqoux7rNBRLlC0WXjaBnpZZRc1mz4f1mblByGcEN1Ezhjm1Jo3LhNdq5JYo22jiQ+riHLYhpJyLsN2xf2Ct4yU+NfGogiHGvbOHpJTjpsdC0Cl5qya5ZqbibvP5erJijr9ASedqO1d38U+xLgNjSbJZxKr13w7f/ZKyPJD68gN2FBTHIrnWRWxWltmsX97hhVnQbvyTCy5doxiWPAviTLnKB/YQJ8O7tR2R43XPaha82mNd78tLhsgu71tOJWLWbEDOFtmwljHUN5HqYUp6+AuAiSRLga0mvQ+3Tfwe/G6EN+K4BxvAVdqgicljSc9sVBFXfXzbkTkkrfCdsI7Kk0c/oHaL3Ntkr6yrtUJTgRC0EaT0XaSpbr7pID0X97To0rmuSzzHWeoJfDWDUmYlZrDU6uYheQ6UdvOIZmmj+sEIslsKabrcIbtgzdE1x6EBbx7v2d6kSpM02yqBQ0U5jsSZxGint9AntS+qbo+Zx7iL7xAtmk+rYHSiuiH3O3EVFNcF76a4nSX2UfmfMtoRc2P3orzGsX+AMtpbLcKSoBT/JHxAspwMCxXEAbxt6wAuOhfQnxNeBQCmSEDsFg3aDOvv1P02bhbO0r17e3131mOEosEc64YNIGDS7yoV6iLQPtGy2uv/+67/9+r9+pX8ki81JY6ar/5/+zJIKWaMXHfzP96//GvdayaEj5TCAMq2d6RHQl2Xdn1/07DtGBvn31//+6//85X7/j1/X7/+NEiOxEfn3ieHSTn+H4YoeL5iPWCZJ3V7SJpya71eM9rRIBJqArTa8PCs88iOWBXN8fcZlecN8yH4f01+ke/swUJA+4sOwOIqcw0mKVk5lesLkVM9AVKn4MT1hXvK4peKwlaiDE/3bilTIv1ZrK7s+zmK/iOFiv4RZRXuaRXRoYboCRXuaRnRUbaBaoGSqINQon+yBVbSnWWhjafqCbaEBHRXh64POksTn9OIsA3hMb8UHnNOLow7gMbsVHfA/NTkuLoV7+1gQ5wc4DP4RpIxx0Dfm84j5umEWQYxqpZJ0JPBFQKNaqfbmzRqSphT3Z1YrTSprZQtis+KJVq1UWkB5TD/GC5ATllW8wNzmB8Dj93zMPaEm1mAdy/e/v+jfH/Eh/2uS/6+RhGfOBhLVC+ZDSMT5N4n6DfP1y0IjsI2oP66et2c/hwWML0r3hUi2AgjCXpzjQQB9yicP7rZ29fsO2jzw1lxN0Aecn/2Qe5rOc54EwCDd5i2eZQtiUjnOx6aAVVjPg+DHDW+9iYpxYGbtPozegX66DMaGPf5ZxP9LePrIjSlEpi8Y3aZH0f54AvnW40gfskT/a5L/v5qkM4LVX2jQ9AHo9J+J5rEH3Q+YcxAoQPMjZjdhhNI0+MQx9IecKrrsQRf6fsV8iux33ApISOAmoA2kJ3ZnwJeR/ry+41OWCPKo/RCJEKAC0fZmQ7m4H+A7G5vbKzEGJak3+C7AQe1z3Cgx4ruggRjntjUH2vO4UcNEmtN77Ofj3C5U66EBEDao9dAw6ITPmc6RkjWWq7sUu0woSmK8rCaUYqdPG88vAJX+XhvCiBV7k/XmNzZlIYm4f5+jkLiljrilhVz/NOkOmM3YKEElV8zDWV58c1F/miWOOFqQQAXpBnsfOwjnLve8hAGXjbH/fgrrhl6zPpPazphEGasTsI+dyck30NcJQk0QMp3mgAjYoesvk/yUNWaqwjV+wXwNGoYY8juAn8W4su3MhDHf3vUpi+jIt4YyxgvGbp6l3KCf7u/gYJdFTLgo8Pb48/YcYaZGPO8NdTO0bZ8eF83VqoK3eXpeTMkQ0zo977ErpPNLdixxQ+v0x2z2pOGbweUR83XDTKO9c9vhJPBp5HeWQtx3ISp8ugVMzJg1F4N2qDBHghs1F2ttpyFnXb0It5Fennh9w/uc3r7i7auf1ulzrnNkY+yhf8HYdT83ghz1/MRjWPRxbl/f8RmL527HhgB4FzBd3gj4dsoOwIesBwgQTEwvmK8TQ9fKwWuZ2F5G/BTWy+IDujvwdKFJkOCH/HGepUJEuKPPeLzHGXzKAhY098u6gbpwkBiUPOc4IvkT+lLInype193t0DfLYi6XdXuZ3RF922UUqJ57o4PNmL0p2J248Z8Vq69Ql1rq+3VgMKBBWjzlrkTXajpuLrk6a33R9bEq3bn6jjcp1j4aPO23c8tmnH7BqJ0Dk2yZm5S3CCN2w3VxqV6jV4trvliQgGiKodT0G3fQZ9ICi3ny8X2PoJs3pLDPwkA7hxGVnQJBnwSXP6FogAEgGBltUjcMftHC/ADvH5UwzNR62iWMr551ZIdmh+9LpMjtcRm+W5VDKz3Pzc1Hi85azgc0VzJ4XXw/C0SMArPqQBL4Kgwz68sm2wCta6ZdAe13s97M+BMWGdsXA+aA713CrpWkqlp52IxRyLPZ/RgEr5iIbhkDbGphDw5jNhuNQEfvcDSKBYhUx7gihm++FCC5m60ljIEkkb/E1FdMgyDhAEnkyMPwCylnhtaK2mYfGCyrhirhG3xlffzhTcUe9Qzft05kFXHCdaRFLAH6vutsF7Eg5oCvJJe4F3DKd9a8BJtuIuYVnvbSBmjurgdsxbAHbO6etiZ6wBOMBL1sZm19SQNEjLKxFVuPGGycQO8Yp02SEBGu79CFStGfTyhcSlAc8Apzwu/mhVC+fmlWXrTFFqOuViPpp1bbUVYTsrsmJ03rqTnIsTlwOmE37c6ZhIjbzOBNFSSRbLhco+uAWCMxA2Djks3l4IcHHNo3HZiMc96xcwdip5hsxAFO+DHnEV6v3nnVMNmvEwM15+dVLfuKrGXf2EIJnhqlzgs6m5aJz2Q7Ndn8EPjMoJ9UT942SDRdKiyhFPETZhEvYn6Aw8uRTWdNINVKWYKRrKvcrItTp1SpEyVgbZx61d/04dT79cfFelxg6ZS07hSGryM7efrgq4yBLj2w6O/wRQ5iATnE2sVzv1l8pP53T7L0IKIfMDylpz/5E/GMMDVuqocFJso+4Pc9Sifxla1CyEbPYsYFCrHVXc240KKxWIyLdusu+h/gGKpTmHL1z8SdgqqpQhiLW02iZhBa01GmPjEOFpZaotHwRMhjCrz4g9NISeucTYjR2naumaohKx1t7bS2XTTmX2FUXIlKU2b1oq2jg6ta6VPe4EAS/z7qausg4G4vPvt1YhZnvml+i5XzAy9g6MnmKgG++FYBDB2YindHeXjhn6Wba34u/X7nBle6a/B7FvzPySbe12BLTi8r/Qb/8+vQfpcg+X1imEnhaNd/npfddLBajMGv3N+SIZEbmmAecBRlGAMSyy0E4B3MEhH/Pj6PjuC1GDc6WBgiHFhY7PaK8E0IOlLZN8k+Jpod/RMGu7/+hMH38EF9xOgz+jHaO6UAWfNbtrTHcNRp3ucFMucNs1cfMLSHsC7YUBTh+3qJ/nzgceln28YxJdysDPY2PjeMwc3KtPUHRpKnomUs6e1ZgjXBlGQrn8w2pTVyrS3x43k+yPp9qaCPHi0tbhRvB7YS3gTP8MdUIhPkq3xdGO5laf50WVPJ1HwqyRzS2dekFZeZJ60dMG5eWOqhP8leh8p6IXMWto1+wRwW1UJi5d7FTHIS7i7LYjgS6wy3NKtBd7j2CMfdYo0F9xdvEaYVvJEQDhfYzRw6GCb/bJHXYOO3aJfFrve9Ci1rqdfhAYf3Q+PcN8zXiVlj/QcMLj1KCHyAWXbAtYkwA15M1uFxY1DBXmSlhge2FK+ZHuSTWWIB0t0r+EDSYwVxLnkbPb5fMQfvBQyR6Dt8Vhs5+Ene1Ua+fsbgy1clkq9zwvqRxaf7Jum/pan816Bg3aca2gLoOFKe+QnAdK2TaW7SD9C1fkBXl+8Y+Rx3BVDDB8k3nf6VT0z9j4CyKxDJy1ZJ42IFi7T9Rl6lzAW8CxwJYlqsBbP6LWcolQ4y8nl+J/x2srfL6eAFL3CokH5gdh2s8vAn9Fo6tnopVTci2LVg+ZzuumIMh4ItB6FVegdiCrzjDY7EvCwQt3fsOmgMty42rr3CDx4J7/g+MWtFbh4dxiAn2av4d/D1HX/OkXCnMnG3/e0Mx3fg9cvveMSYeDVLvB7vWCVeZR21xKt1KF0lXgWuZSTbNHOtIN1sLVauy7GgmK33eI53ONHuI+brxGzy5+97g/O5QszqRixrq18RDD67Fwtcv9ubt3L3OxbMajoDHZIFrnFCNZDb6dg9CBoTaotZDIF6Mq+Uu7Cb1C7Thb8u6g6Rx4ec8qWSBYo8UIoIO88in/k6Megmz3TO3zE8GglKc31/gJMo9jpjplD8ysWXbphlNZVYAZpB3rhvfhNgDvjmfy8j/eH38zlEOI6U7kPcXMP2CT+ynrSofP04MUPN5POchmkCl2MiiFnc8evvMTz5v8GMf0/R8uaotxnffNbJThf+nL/kEWPUOml30rEs1vc53+dlZPgWBRaLzZecXW9iRakpyUEWeKk5B8uBuFpxKSdvQn4XN7JFaXjxppc8LwSXg+QmqN2nD2tV6foT1bk84jpii7GFWFktqMehesRMgql0Mm+A/en1YJ1otEVPe94FUNTTMVoNdvgqgCJPzFaDLoFrmWeeyE2NV0DHiA3AN53XajEgnX7FBiDdu9Ra1mdeLoPr096iYeA7CDOGXi9lDvgTRs0T3sK1dGqh6qaoeeIathw1UbvKdFsO7n+jzsFlE5Tghee/17zGacK49YfgFHdymnFF/g0c1y2zqgd787eY9DKv9ysErs9z3dKzhPx1YpiIUD7HgJcNB4lW2kUr3CJq8DAwht/e5QAf2+VN7qnpktKpupudTZRiaRZRKlO68Pttl/+ccT6Y2cCxQTtuhuHb35Lu3HdoLOkfDsr5egHhpYQeHsak8bw6tcJI/G7WuUp+qj4wW5iiXYesVzgKwrzFj5VcZt6nCQ3Hn6SpMGbfyA/wQQdosMJIpczWXiJkxBxsUTDThAqrdhe1bhKWAnbklAnZcZyKHWBlYvkonFQwIqutvkplK8QC35WTMnz4myKaROjthNp0oCjhfXk0eO9atYmsToL7sh2Yx0JmO4JlHDFmc3hxbyE+QfKXJjClu6gwC/scEWPrA75fMV8nBvf0wKjuUqzZ46qXPGomSM89gU97gh9VFkoYMVG7YvKoyxBH28hVMhl0HQuRQ6WIg/eYmTlNXhwlH7T9mN18TnMdxwdriddIbRRvvAwxWydKFvqXWSNK1tFUdLxDI0qjo+nALI0oWQhgi3zAJ7d60IgSG7mI36AZGCP1EhnhsV5M2kZ/NIIf8B2RN7iDX8mGky/44Yygsd8xMEqmie62p2WyTP2Btr4sB3/dKa3lZNOAQRkgUbIqR46+Y/DmaEhm50/5cOBP4/M1+kXBdqiv3DCoZkBc3Q2z868KKXkY7scKCGFOQAbzYdynVODLfBjtXNcBB/thXNVTBLHMh9EYRylcn0zgwNeQR0YSKpDsMfC1rF1hIt/CAhDzsbVgV/4PGCSU7RtLpgDdAOhvS3cHw/DpJXIw/IARFhSLHsUyWFBRc0ueB3exoGIGmugGCyqLBZXd41dvscmC0PWcnn2WN9EBvZk8VxwLD/H2M6ZnV+3B5vgJByPhYiMcSqu/Yb5WiHfLiTAzxtvcvivNfoR4q/BaLC3f5xkqPosKCWb1gUoj0X3IB6tv1AGf32lXItAWZjAQlR8YzGbZLJzhGIb9UgDMAsX56ETS9uFO+XeFiquyWLbt5fvEbEt0XB1wJiu3kF/89TLr/DmZ2bYmMXxbaCPE9hWy9kbt9+BaqecT2vAhedvUZdON2vHhUgtmIZtutJYPYWCWTTdCTFYBm+4Bn/PjKOtDF4vsLZrPE9tneAPWzvLLo279xULnqb8HlXOaJ4zAVdIJ+iWbmSdtDeWuAQfun6yZVBw+2HVfJKKqfb8gvJ6qZD1EmnQHoXlmR+UjK6+cClLPTIuR2FC1dY5NTppCWSP6Ko1zhhDVpA1O9uH3sVkLrgMXbZzj4u0JaZwTrHQDviGfMwvnzMDO9PunP8txe75tNidx7ABIfuI/wvUdWJACUx1/ejsSAsoBWwCpLBbUUxqovAW487SzVNBFWLAo3xbodU2lXIhDzWdtFEMZSjkTDTHNJPYKKY1i9Nh/Hoox/9jv6pwuC27zonRUNmlwZRjGcIoIEjZj0O64xXTci4rJI/QzWcgzUy5ao3VnZV/wNrm0Po2zCLtVoCZaq/UZ3bcL1ETrtJ4GYhWogX4dVKDmgNO1BEF5/EOIonmDnwNsmeH7xGCSzb6hGY6T5JsbMbhuWAkIdyidQ6QDdJiQKqlhb3Ce8B+VhitLPecnbcHiHc55RsiUoSMNn1MQzn6Ar7DaIfcxrWNYH9M6pje9wfHIcnoTng6UX+MNIGSfc3M2nXaVIj3OZHDXpJG5fVFt0tHanS+FeChOwlohP9+vGDv3cjdIaLyE7/c7yYkUK3C5S6LlHcillEeeF4B1nJlrBQiXxUYR9SDh8E6upGLKGU7IvX3DIMDjo/cDB3j9/M+vY5V4vXH7GZOAYzcnRrWoNJSBY1dxpFSzRyGV8vbjrUCqFgFufxLZsLJC7p9F3yyRkGb4xJ5vAg8rK2+nLomP3M0CXlkbsQadb5Ikm5bcoNF+FwGT4A94O3Xp5XQxHBfp7dSl51NH28FUhZUwMEISNRjAHPAd6Yk8mBJy3jAmgitm5M5PzPcr5vYMM0ac2cEyCfQKQCpB2j6zSXHRDgVSq5BVS0XT6mQmajXRSkPLtmhiPkhZib8dgs7tlG/Be790mEjEKh5KHWeyy/cqRKUuMzhnR7WUTrFXab8P0i70zkfM1yktYW4RYzBGN9351zpcmFS7KOqLqfakEEWM9FnMU/kJgwnFGHcbwfNKWYqM2PGc7/DVlqthYOi/ZMye2ZtDDgJLOmIO+Foxsrw3krUSAWwxljW/kbi2rf9tRxg59Be0HWFkxpHlYWg7wuhgICvC6IRPEjlugEZk9Y7Zp3JRPa5Buh2EwyKNjObNIt0OuzOWbLRzMN0biCGfrL4+xJ/gy8S83YhqcK9kSAYbfaXAmmRLPA73wgh8BX1V658sXZYFrs0zB1w2N01H3LJCCqaTQ0BXozoOqvZ0LsmXG3xO9nBCVLKhoyOjkdWbMegA3c6SBkansejeyG9ar7apUl/eaEEWu5jlVyyTfd1M4aIwHZ7RfOD7DcHfEK4dCsQunxsmaZfs7Aij3LkfyC7uztJgprAlNe438amO0mDX/G71BpSBkM33Ja6FmkniYnfL4QbXD4/TgLruMMQccJzq7LR5G2g153waaGzRSlZ+g//5dVDBMmHywTgJaiNO/1c9LGw3ch1ev2c4+tHPwKPtR78FHgGGYxc3pv3mP8F4gi+lzrMHZluWMUSgkTOR4HMq+9wOzJsnEJj3CZ9jvcH/UNhjgJ5b3xRng5gDvkNIMv3JcTY4AEfT/IjhO4JqaMy9/AGOb8fYjl3vaQaMLvJebLHNFGFZ+L4LUpRWN32mCAsvkzguN2IL55LM4zCs2JkMH/TSv8HgzA0ze4Qps5Enom6Jnz3FdNVkvin8ftpcs/j/S1HkuNLfr5gvCg/krSf43oM8em4AUUD4xW1w7UkajFsHjVCwb1A9LRgViZ42ghjXe5CGOJ7zoC7C/CcA8pivM4jxDcPSS8fMOL5Z/6sYvYQZ9zfrhSWjLxTBmY4Qc0RhAvFOQKNncT8xYA/huGu3/Td56F/KBcGxvl8xX1Z5xWpF0euL+RG93V4qu1py5SoVpfejRMSUkWW8HImCUd9S0VQWPQziMXfrz/k1nBFzI7mfMDVKaTJD9HflEZdI1UyIuKiaCRwOLKmBy0xwukE25rycsLQBJhbhu/GWeoRbpG+//LsUY3a1rlzU1IIlIczI2ybOvFLSpfdgg9miusAYzOHEck+PcNSa/lDRB9Szvn4dzzAGKgDv0b65tltTNatKrK8b7QAlwEjgWq/MCgH5GZIkcHVml5G25GcQk2BUrLP0PD9Dno4vxKJVqP8xZt/bvFZYkQPhaGbmVUdTGMTPoPnDQfQM2X8wG44tSUw9F72D6pustc3m/vUWO73XNoPDuNLaZnMxZysusdc2g0saK6jw2cC1PeY0MefJHPfY+clc3ecRg0VgMAogk1aMVqXCSjAsIObInZgd2tHI2IipnWxaKySOo124oKLznwHAOqhqFSXchctIGQFfR1ms359SghbbyUBHsO9XzFZQLisNne4grPFEg9iZdTf4/PenFFPFEPFz1R4xLCYdS4TwzfteRvqcUtluW5tv1dIXJdy71Clm1BN/op2zid0T/M/5DmylgrPCkR5n++f1Oz7lhDs2dM5/f79iPuXDwKk+PPqXMxfMA/yL4PX570UNFsry/Ncek4MHyia4r2MSRtN69YbNKAkOMQUzEmsGAL8iVuQiIP4K/GnVv6mrMdGwNjHW65b+haWuqa0xPPw26IesibTxWtOHAPrvE7Ol7Hf4Wz3rF8zX69t/wnzGsmJCD0QafZuMI6qwJVKGlHPSXliSSpRjmUX0rpCveuQDcg09TJw+S2iGlQLPpTIDeE9Ux4jW1i2sJPuqOoZbWmlYafnVdIx6psBX1TE0muuED4Xicl0rtpTSULNzrapCj3DvQq2jEsCt3NlW6DdmfOdagb9PqheTR5NEfouX7C8dRskiGcOXxVG2rsVWiaPOv2eU6GOY31/CUaSgHT0z48d3RV2akTurS+PM1gFwr0sZj/T+ehrxgHrIzqJDLJERJG/6jPn5+QDTNxx/fgrrQ1sbi98vmM9p5qxtqAPxHQV50ugHCFn4DbAvN09RE4xB7gO/8956IyMgwOA7jsTTSfdAjY6OL2PQF9UxUbL3i2KkmVC8or6l89XkksFDlkYM2o1Nx1H3tiNDJ2IuMlEzZofGH/DfNEu2qjPG0fz3avyEwQn9HcZRbiVjtg3cQxiMA78gw7H0AmIGPW3zeuBuytDk7kacn6SLkjZIStAj5qaLplPZfADclMV06pWk0j+99yOX1J+d73aMFXd/Q3h9WgpPXeHeMJ8iS6KCzZ3PXzBfJ4bsE49w/lMOt46oqWuXWk4wAV69RpJ8LnBIgFc/U8vBFh0z4NUzlZM9sTPg0TTz+CmfQ8issCBv4JaUxw/TWPu0Fl0toX4leGnSEi9/XElOvPwR0qJ4+eNKpKLlRz7y0j/zwKQ7cW3p30HwXAFtwUG4XSH9wkGAXgGNxEFAH2YG8Z9/zlVnMeQRcyij1M/6af9u6ms6h3jb2Q9sQoqJ5WjiY4Djhj7Hc8x4H0f8+gHzGUsFzc+1NobK11wu4+sEIam9wXnUP/cXfcoCHTQxj8v3icETC1LnzxjoA6rNYrVIdYdD39DVXVbg1GlU29F6K9qRoTfpal+L8337js850ljR4NgG/csKTuAHU2GlO+DPOSpvFNZW2JTN8Le3fdzyVjQR053/gvmU48s3GZsREIMi599iwOn/MYsBREr3ImFQZ0YGj/DHkf78Oq9UHgBu3rcBPkVKxgNfDsXZKqswY0L1jhjWWqqDhUz4n5MZ4UhvcJzKh/AgDGBDH9U3YVzYq/f1y3Ibk9OQtNDFbpfTVSzJqX9PF+bVqBVyTrklLkTZ4YsE/8hIKQcXtElC+OcqsabR7ifUvir5MvglCaSFS0G6YAOsgo1iHFsBw2UXeJQBVsBwoY8CPRFLT7jAQj5M/ln4DzupRkfaKcqBqgeo4TCx1B9QITkwWKnGw+ywzgq03bQBMOgRoimp0uArptJGl79AoEVQMUHq1lepLyAWPp+lQqp9svw7FTMLy2+WBnssAYq0uz6RGRoGAN6+cpP02arbLkqgt/jeWK2EhZKJV7jGA3srE7BDYT1tIpQvRYxSf01Sts18ls3V6tPIMsjF+eLNdJnb5S8ORT8+tEmB0f64C7aIfVRnGWihOam9oSQaW0kZjFWaLRVUkkIQG3AxmJ0xH8Lpg6NyQKIiBbGzC2VpwmnJ+fKuc50ODhq6bembHdiufoYEzrm+f2QEKfYQ/EjQKbl4qaHS4TVLpcbarChGrO3q+xs8teeVJe+gvsNV8ogU5FJnYC3LT6PoArmNuhpXDdLYocOxJCIo9R2D2W/rwv76ZYlICAj/NO87Cxrzy6k5qa8VhENU12drKRidlOQjBI71FnSgptnEHXPlVkOz4H0vhUC89DHtlFlLH6dY+eSrdP1HOol66NVCzX/7mg1SdoSZYU4j0xqN1xsO1Q36SFdf0n5k46XsUVSvrkiZodr181SCXTMpl/59u4upZmYHmtMF3WDCfke4dpsXT5kqm2o95ix1TD91ITpjQcG3eFWlk34LBbNKyRkvqUlXow7fM/LHKmWZd2rKu7x8j5dXD5tWGBER/fuvVnUfdicxj36ljikhlc5UdLIux65uhiR77VP2XlZG5lRLcqUpbcxWJfjNSgIt5atPRJcv9K/vu94/Lv4jF7EkP2r34M6ZOnNrCp8DQZGMP7cjuun1X5ntjhYOKPQKpvO0rMbcTr9JTmu/CeQ4lJY6Zepu5360+3LqAdqbFOYZRNBOZfGQYwxXcvCQqk7yR/B2JW9K8dTaGeGbevXjZZHkaIoNob/QV0+Simx8ZwC5JE+SjXGlcHAlvNv35zB8nyRcd5AF/txWfV9an8L1uQsEKI4HZvvX1ciQx3+h6t8feSR03uHVjSsFdaWba9Gfupb7vy3T4uoMsGrgdaaR+wBSdrDvrrss4a5KFozQU2drobR+PEyS8iFpfmVILGHN2feRotzpwr80XMZ3biKhNHK2UmcooY6UvtDXtN8+An+MrdCRJIHJ6W3SP0LyX5Xht35Wq0ujiG9Ssfq33ST4SUHDhC5vVYr6ey8nWyHDOjFzWS2K7F0n16wT2TdgRFFL2IJUyJdcXAlAlNy3YlMX0SpL1UetvCS/KfqGREWLdIj+BdH65wZJtHaSj9DBVbhYvkzx8HJ4pOc09Nee1D12Ot2lY42AT+Rl3wlViWR9sBsFrcjsLAs6yJ3YObPkH8nmVFdL1Jsl9zNSktESvhmkO6U+qZjfdKSk6WWdGQRpyyKqUdE5RdnNJl+HbVxInzgwi3Mc78YjsTPFw6BjAWg6sTKtJD6gEEKxAIcWio+StthpJfbvErYvN2uXbvrpbWvlNU+ZvzI+Y74U07XB5L03riZSlbxDyhL1DRnMu4u/zQejG521kK3NuhOVVAMNTq/OKmU5JJtaSgLl2Ces913RIh5NqUblbB/KIWcLmSX5lqhXYeynUARzITOR2KMJ+H2fu7ag4zcYB/dBssyj6BF2N0sj2y5LyXp3Ch0zZ7hS31XjOZIUXm6Se+j53VKwtsR+jmiiI/9ojINfJrlPnSinYNO/UtroyhPBd60rBQsm6Z9ZtbX60C4vO3CORorayqLqzgc9/zHJE6mzt84nlFqT8ovOT4MVg+zM53YHIYbUzLEeVcMVCfPvL2PfcUf3KMfHUmQ7z+UdDqowVi2jA8FPIHPbmTYJJPOIVW2IoUTI2UlUrxPhOKeV/q0j4bvXtW1Fka49lVWMYT7HRQqgXgqW0JCJEkDf2Bl/y9eo/y5CWIr606JVAP2oxyTnSbntliWgmIcsJwECJOdjpZCQaWpQRjBwz4NdDoHhK1ScdjzRDSIdGjqTLd5WUZsS6DlKmop9ZavRJHvffk8iA37/n+UiL2GT/Wg45Z6+H8t+tyXJ0hQZKQzbhLTf+y937YMgQeGwMIT7YpyLgzkkzT2jMX/CHWOyJCVf4X7P7XC//+//4/dHSICRlYrFNL9/Rf+M+ToxlTEu1WhlM/sq9gut3+Yd7KpcTcGqhDknwbtR4U+k/Eem1RWTrn1Z9RWx22TRqDtcNJmuBQ6xtJOGJApGR3ozEH/smxY19tbinfst3PWcPpJk2xcXQyRwaJR2iaeoSROOztiHau6lN4nk57euKveLIFp3rH5nVjERCBzTUBeL0ZG83DVu9NaQKPJWdSRRTH2x6qK5X1md+ReFwzIlGunyMncbqd/f/dmrPyG1gbocrgp134gueBS5eMNDMTU/B1oIR5t9/RUGzIKbQIZW/YYJOsj+byR5pqlJIFwh2VQ775TiZPLWvhoSMa+fJnzn6lpavMh2BMpAx0g50S6AmRWqb3NKUSmgqxr16hKYUp/r75C7Nl5kQkKqvDol9sOa7N1dw5BSvk2eaCL/D2oNUtdAagJ1qnybk6PqQksyIDhU/j7gIJMcGNifD9FBYzpUTwv3hbSqqNssAqWJ8Or/kCMs9cJc1yVNtPXq/+hnNUZSN8D01TFZ/R/FWaSxWAm6MtDhUf0fJrI2tSroQGR2n5YCHcitAikdo36QLoHFuHt4qSQoBnEvcBOyYyCLwd73QFMm+GK1ZMWIgYwsa54HfFk3YpjeEH02kfoQA5lh1tofcFyAQNwN4p+j/ysM3aU02jvG3zDF56s28nwIXP4da0LPB60LSfW0xmKgIhofgAaTQI4Qdt91dIAIHYCfbDlAYsQgTtRRYqT5IZ+NYkAU5aKRBySKkJeL095x4AGJ6fVLpbpads2bHqQeELFvxn49hea64rFdIJ1fKtweXi4QApFSEdNNy/gI/kN+V8gOZI9s3WePHbLln6b8qLI/tojDpLOjzOW5dvYnO2MleHTwIvTFSrkBY0XoiS1LyjTv3R2Obs3pzfONwPVwoYanNVBf5V9gKKoIB3tFzLgSP5yYyQkvzfm39MeVXC7rEJT13/1H+Z8qv0iVXMp5f5uuZ5e7spcmHVJ6I13FVj92kSxIZXLJYcva2YQ2ZTQfv2K1UWrp59hVeWksoYbLKoGkfv6lu5j8XPSTkKi0TT58jeFhkuicZPCSODJaH7Hq0Wjqe0FdOjlnXFNj6dGjLsWVy+G3LPtjsWLSdAKP6i0bzLNZCKaFDznqZK+no35gErtBLtCyGY42Zy9lKTtvjbo6Qczfcp7FxSHmbzn0MpKYv6U8DLk4LlL4vZhxXezXm2LEDl7Nl1HFDp5spCx2cK206IDhX2SD6NpdkH6CIlZcYo+oIVshxNqVly4JV32D2MFF356OuzESaj8aFZdFjRPMJZbw5kahKMkQ7cKPUGXSXiDofGz0aeJ7zHJvx47wYt6y8m1BrOFS+kw0Glf72nlyPFayP19irMtZMj6lfKiTNDHNqJF/l64cdLD+IgdHbkeqri9eR7GHd03pt/Yv6NqAV1eSE3t468uvXRo6Z27kc6xkIXLL2QlwcTjun2/TCmi8AB5+7n59+yxzucQOHoISSexXbZ9hFrCYwbPRVN7DXEQ62je26uVh9hmj2jJr5ZVhnzEv25J8CpnlCbE4A762gEVKZKRCzopO28IuJXZAOJGwy6Q/dMJbg87OK2+VpfXMrmRFxVxeFeHFWp7E4ty1z66rVWf3qNgWsgUT+M0M0XVzPSK+FCGm8ly1fEOsUZygSoSdAwvrEOtsP3UxUTQoT/LSK7vrf4LoIlPy0YqPiiOnSeNeKd0WzBJ24W3Dc6xiKxfmkNX75S+LpbjE1hD05stqr85GmY/XjRCnuuuD/D6J1zuY/1xKd3dJJOtdVrwTm4PQ5r6F4O4zIpTQgLh+H9VVnGIQscat0YOC1y3EsxHNqoXx+z17kSwlYd7Tp4LuwksT9OKWIAtZSbW19+8I4tuRIIWid5+sUhJTfthXKJOieJWkvrDX3V6Oti70C/+MKquZX86pd3/VEK6HI28hzrsP74SKIX3oIAcG9g6GQ43sTs4X/3BxMaj5FcAsR0XCgtvPQkUzTJVmsDBt5E3OXEBRf+haDi2M8yilEUrXS5qYVUKnwUjnkXk/IfbX2PvWzgfIHmhEEGITlLY6TW4JDWqIWcnwEnu69LJoFtMg7StwNdrhtD+nMYIW1qI2yNL0Ojum7kVpjZhg2e9DeQHAgaZRtKypDO/VW2mMvQqjLkG3QOhtEMya8udED6MfQYWsgn9/0d9Udk4QakZutmjC6ps6wYKYkcXx14QP9feK56SgsIG3WNlWWqWMzpKC/l6NtCGokHMJT6rZ/H42BXeKdl37SCLaVZPsxA5sfhLplNK/Iatk1+Wgpl6VBMOwi/pSU3RTaayIzVmUenEeiSk6unLCt92XR4rbySjym3xlSRpTpE5JrZp/Gf9s5uK/yXWDDKP5PX3RkZRB1+H1Lbp4ctZk6dT9HnGpKw3T3xWliqacFt0asabHLkp1VdYr54m6kUGns6zAjUJzAJGgUNJ0u/0Ez2gynKSVQnxHUOtY9Oy9IsY7nRim+zUoJ1ft0l7del7s0iEKWEMOLgn0S8htcAtT356YOtEI0apN+tKQliw26S7dyAKrSfriAApedynaPAyXIn6LQTqqQ85NO6e4LcQeHSs5/NpBmcufKn0L+O8d2IXgD+JDINtCfGpnSPUR8UWITIjygvj3QE0a/T7GAtoFOEsUONJH6tnRON9e6Ch/uS72e5OeJMgrZHPCrdCjDu/yq3peyZljNRaCtPcIXWQNxmxT12VF/+vwrnFeWWOJhbVJwSSvjjx9F8pwWo26C4LBBI4YugzRzO3W74MuQcipyCFa+BN03mgkUXZEV8Ny16uFe3Wu3TXOrD63rp53piziVy39DEsVoCDCHB41+1l/n2qXEhOQmnoL+6DpEteS1jOS2rKVJlHQ2IWTLuYj90ldiOsTpexu13GSKAJNNTR9fIj6/UuFi/XVF9uaRNx6cxCKYSAFp7Y7ke1qY+caifqygX1ju+QXTDXol0dWh1hfnq7mB2+KRBUt53d0rG9Eh7L/QkSH5rDtpHAv+kYkG1v0OOjildFv3kUrEUWek0LXIeOSdbDEnYuygwscPZreYEOixNl28s1OTcJC1OrgbkLrsTTd7H4EJIRebQLsgeikIm8zgb4vZ7+F7em+K1Hp1V/aVD4oWD9KxaZk7676tBlhhIJL0U/I/cuKyJgi6CjBR/0GOxr74pXV8VHyIRQTcidfm0EXlUTMNjvR5aN44mQryFymA5mHTZQKWStnJ7p0znSJ+0mUheBlXVTG6Qvb9cP2+2AVMgDecN+/kBgabiceSrW9MEUU+K1Da8Z+yLGmGK8tjuLPrjVW1r/4TddvMPXG61G34G/6kEy1mJ5voW/CkF9EEOIXyWZxmX4RcUipn1Y1+eUXiUmZ0naIiENLpBYRVcAh0sFOZJzO7sAhErfJyZn7DAGRSnRu3oD1PQ/vm3/6WHUz/gWG/Bw42CuCHCAdEYZ7A/wf6pXu/w5qjpn+jxhRnkAOpO2zsgSBgP+jr57ELIY8jD3D/6GLz8xYIk6GcW47PsRlOC154PiIhwEqZvzkvd4ZeTGC10kjm0/MfE/FjAbH9YaY8UCDUU4QoiFK6Oa24UVZvCR6SEGDX8zIynkW2xn/kfIX+JOOo8uYvjZDTNrsbgAwWKVBYD94NmKDwH7wbJgDBCw/sUJgPzg0OnwH9oNDI2KpQ3JoxAKB/eDQiAUC+8GhEQuNhHFhZQX2gzsj5h3Yv90ZbOlRAllR/duLEcuO6QcvRoR2BmTWi2VH9IMXI5Yd0A9eDPlCdl/EssP5wX3RwSucf7svYsVZgPsC1xoQsW5CAUdFhCYw5L+IdQfyg/9CSGTG8YP/IjZ86QUr23YUP/gvYttB/OC/iA1lusIUuxHLf4GvBf9FhFZvLBEMr6+YNcGNEc1FLFVh0Y0Rof8cc6V+1YhKkVSUXP4M2RLxZ1zqQVj+DCFxHcYd7ldVAcCNIVQobgwx/CBbEzKsUoypIQ8sqEjg5IQKJX0yDTeGZADquRGTbzHjuwT9Szp3LHtdmXEXC4K8VJ1Yxv0O1pjJy0T26QmIZfuj+RoRZ320zIl+R0hgv9z6SlxxKgQbDE3YeJhmwZNB/R77tc1iLSUJECfZ9oLTR6VLDYWaeAIeiHSZWfFS59byQKQh+yUVPiMNE4Tj9UmgByKJfa4zPKcaw/JApOFwCo0dEAA/7yRk6uR/UF4OPOfh77WdzJra/hb+/Too4GGIdS8gOR4mE5G4DvAwxIrWJQSvl7aDtzghRrNmLf+DgMX/IJkc4H+YnM5eyrcQIPZH0Wt3xCXNHUm9L7G4IZJZEaYbQpiCNMFsatBbbghcG9IBYrvNRlUFWGJwQ+CGtIPUJ1k04mhxvxXvdgAHmkwStuvUtbK8EXKO5BBJjj24Iya96dT/ygzom9cLKgkDbxID0DQ4XAWkTtm6vP0k/P4vss+5Bqruf5GFjlAuDsaYVZqmEX/C8ZD/3wjol9r3DpkAdvRBzNeJgbr4WoR2/BckDmkB11lgERu3DlUkRFt7EgXX9TKJU3NdX9Cs6UCRWt4hf9GygrlcrSSrXuv7fZWs7EYXdqKEZ8uM5BgVrWahM5qc4o8En3VNUwQBxXQBss/p0mJgSQqxi1nL950Wi0U+6l55CHLRkTrXqFXhTpqDicPEm+WoaNP0LgiK9yNxCU5qv631E/sdfyX9fde2LHNcCmH0u8dHqYAgouIlTgKr+z2Xw0FfKltjxSjC/D9We36T+wzWd0ebKGihboFsXSTrvyqCKcIfpVWcwPu909e5CjwJO02xUTNtV7cPywIVxcPamauTC/qKOVkIXZQEJ1cV3tndFS+rdb6/re6oGYvQm7uAGF/3LUDwQh+HUyriPe3Skz2xP0LEQOGUzvFHF/o4XKYM9bMB82UYMWAZRi7uoOV1OlyUa8lAV8kuW2glfoJ+pnaNnbW11PVW9vgeOke5YWCSrtweWlPNNlVzoCoxHtHatmkYhkRjyaJKaYPr0gc0aiNac/QdOV2O/axRrXH66s6uOukma+7eZLmKjpT67dMX1rqBOi+nTTtkde0ia7MCiwjsX2GeS9Eekq8StypN6UqMkpujSycGHwmnkp5a1JHv4FbCzCgeF+5pjcctah9ygmji1YreWiOIC0xmLaJcVyPdxQX0PbXcQzL00FiP+NU7HA9rJyvnsxP5VjCS8941Ri2z0w9Gl+m1brgUDClSXwZr7czqT2ukjXF7tki4Uvh8zanSnyP6daQbCmamG2rngZFuKAN3jhqVM+HyuGN5jHlO6sFY2R/gyN9BTaROLAzfnd0YDrYHxsxyQEUa5ikPlnq0XdTy1hlSopeqkY10h0ie2yw7qjP9Gdc5pB7wvR7CcXQM4H8CWMxJvxGyXfip67FOg1yC+OirUVXNrXpJ8QyOLnAOKUriA780Y7NLwRKV5zRwTUIr/Cj4X6QeWdDaGscFHoQqateEnQ4tgWlenN4SP9cPjoSDGk2JW8OtwNRxcDiIc5evKlh5CeOb3jFcvP/ALPLGECqZ1lwVjDJCuMb3xOAlOU8PkxQ3bWJVkiivKIzc6r9JSaSSOZjOc6yHOJYu0eK1a4AUQsgxaMBSK8IE7fT1hYydq0uAnBwUiVjTr4bdj3fAyXw/40xA3JBrdCbkNqv9LmvG8rvWnywLv9+IxXaik5bkvTSKGzqWvMt5ros7VYt51dI5fLJ0fudyTFIWSlhsV0LFH4dxQ9KyAmigS6le9EMTjMUUkp0VTxHSiLUEO1dBTJ915YAn2xmkpqTyRx8oGCaIKUIrSIgAEvxo99Df1lW3vEKHsqOuERphU7vceGnrUSdyXV+jqpE6WWxzsuLWd8NJ2SotIzJ3wkM6o0UOdRmkiyC62JL02/8ZV+jQ5ay9hgSUiqkpjEoAonh5ao+NGOw4aoUz/gJDLYNC2TP+AUMtmOZoQ9B8weBNphi+JgPkXc27WeuDJGLhKP3kf4QUk1bmk8Xtw/vLSitIQ6kWlYteIq4nrwFnSLGVKK3TpfRDctbrxHXZv1mZHi8WxmCLLo5lZ0UEdpBaO0ZCDPJGCJ36EQNtXj6Eo2AgAnZT0ciVR8wXYRw1xT4wO5kT4SCWROxIWVFEkbgLkXiDPZHFJarXbN8ydYk2g0tZuaYhK6TCwWFtnT5KSnLVCEY8Db5ofImcVKu/UzXdqpNO4JRzqG044lf6hdRMoxVPZQiWcS6uBukPJgqteCCClCFivRW6uyOGewOF8jcYbJX6RaP9gAFnh2FmGonobF5dDPrt0xkjGpv8ROp2NMjXoW6KEl3jpKbHZYKGtG4XC4ZsR5KU8mZXsRMjtiWerwvDFeTOEk7TOWrfcn1H3+/iulat8TRdl4p1jCRpB1lMoNe+MFzZUf0WWiO3TTMNzHc1OAtzkDgMKUYnISF9v10VN9OsniAFFF09hlmYSf7i+vuck62FWahTjYC68mt9L/qC90s1puY1n9aXfkyisvoqBRqlsILZouC+klTd0JXPcllPptoHE01PksIlxqdak6omRhy5QyPkJiDcAn+6GCyl//gJr0apvjeF34DiJs9Jemj1/0ldPJUSnZhrNe5mwYUXVflfSjQSngqLh5rvFprqirUkt//GuRrV1iSFjfDrEG5J8nM96AlYP3pDOqdil28ZppZcJQxZE5xTFeOPFAHpvEYcX9U2MB06noaFHNuvoEnlRXOyzQocG3FN+jDiphKBpSchMp+NHpJE8A0I5/kBZvYoa1YxZb3Bu4OCxtLCc/sqif+wMHtbgA/Re2N9vhO/f0U2CuKNXLTwWGxFb0UJNJIEqqhBQzkHs192GkyatSU+Tt9pMCe9si75dyptxAbIr7Rqa1NZLEvPG/G4yqDBLrkoLyuXxgeg2KOuWr64Yr4DWCeNGT7rHUMX2A+Y8nxZKUZ9wsmukjpT3qK5kCXCx64YS5Cj1S5EuqdWHeuxH59yRaDUBPEi3+rqe8J8MYbLILQ3zL+EQ3LgNx2EwnMoL28qH7jwKZA7BfR4wage7wIo8jJ00+ovjRT5+UpVvEiRTxpYm6UxF2nySWwqosm7gJp8gkQ+1uQ7RmoR5jCcaFOTTxIg2zX50gpp8sntFD/W5DtG0nLilQtp8h3uVJO3dy9NPl1kEwAm0zFZVPlk3rilyic1EuUwZLalyqeLZDlQ5SV0QVT5y4SHpcpLAIQWdw+NVPk0FJZqcLixEcMKe3J/hSFelQLIpe8YUtiTo4vjBcOqfEL1DzT6BN5P1NyTuxvlB8E5LVbfCdeTRt/p5BotolGhT54otxLBeVHo1WwPCn2SQO2u0A+ry1LoE1YTaMdIiAG1fZ4/Lcb1E+bzFPoE4U54/r4VIwZCqXjutRZoksP1O8ld2nzN1lJXA3OSF/CWvAIWCO8YqS3e1fAsmK7kiUbdn0j9aakq1re9w3Po+qAvAl5BLz6gNJmkAqqkcoiVUB6oMYsLrsNT7VstarS+wGUvVfMSVKU6piSlxiXQrGqXX/nMLhgrgxS7/yU5J/LNUhBP6pYlqDp1cKlIFI4nTzBREiO0C7AEx3X+J5MqXXe6tEvLSCaQhLYEtTa1vXAfW+K5dbt1iKL1WzupJLFxymEo6YTfhpAy0u2K0plcexRLLWPdQ9fJrlw6gASYdJWhKnidMocyzIHBE5AlgjNIRoXw0FJFJ2+6ufJvIW3hufKTkBWO64W7myxTtZiNL2t4cicZoQeZoTdjctEAZa8j4ZSQ38sSy7lq2e6gJI49XeJ+AUkxQ3uDK04sMUonMCe8zcSpVIPEX5ivUEtCeaUHdb7UYezs23zJdRnYPQcLiHXLyLmQ4t9gPCRo3TCLd6dE/kU6SuR3TKoZtr4A1TAximVcdqfrmFcc39Wvt0tqHCQtPNt5bJnaV1d7tfGcbL/8ql8wqk7L0+JVUILpgw6BwsvLxEaQoLStp6QzxBzrUN4wH8JkyTebtGcIVjJS0BeDKm63urFPQDYfrzqowXVpnlwESDy03//igW6v2tMpx6T1dZuhWs/UD9kBrE7iE15z2GoZMV8nBi2lPBpg/uWnoGr/Nz+VcdEJU89Xf1A+BdaGwOZNWuEjaXZ11pixKC0otOeBJBVmLwEhGnumLSsurqDD7c8IA8H66rV3f4HJ5JxizG5u6MFXiXAHms9ZWiY/juS2nwjffcCxjAli6HSGJ0CmyAWNR3wEpdNtD9b/A76b5qAAf7bZ2Y5+qF4ZIPyB4LzQ3EBmXwnYQQPyUw/4I5F9Tpq9tlojLiSxCMR8DIA8ZzxEzCaEk8cE22skEQXVMeYnMZNItw10IT0w6fcB2GcvggBEDba1nEeT3ASLJNQKM067QCSpV5utp/cqBiZuf31/475vFigA76CwEent4n1uhJiNHLK1yZMcYKk8dYPTZBGTzp8qACcxmph0jUiz/KyHuteP1c4uXcrun6ir2oU1q8PGS8VRBw4+fZ/oQJNAOM4FIyGkaUrXQVzTQFOp4mZBT0EKl0ulEOU+TeLnSzQ4cADuFYWYJTfRu7MuzMm3ojTC6PqOcTSxchWtYhClZk6O7dLb+apSWc3IYfMmjuqoXS3pv6/2ezEDX1re5BI1RmoSyvhiNtZ+awlWkfkfSunIexm+PMISabHWPVPMSiLA1wDs1Tn+jMSq0eUc6ZZb0/gBjnffgutIeMvhE8jE3+A8pwDvXl/xdWJ2LNo7HN/BQT+SeXGp0t4JLtc+b+MKUuMgXEZOkqYlHSPPFUQCTRCxok9Y/S8tkjMjViQ+epQLCwnmWmyAPUloO3zA1z1/wDG4ijFADfhKWB6o4+PZfy9sR7I5g6oNV5Amc03ZbJEE7Fy9ySetH3M/Wit5Lg/XOXUK0Y+mqX0dXB77fjkpMWntWiUtQrPj6aDzZIKFeQh1CHsdAc/aXk4y371xwhnxjHXveH0+5TpMxIq08SSD8NJPxAffMIkiuOAY/oDh0TJciz9h0n2YG6gc78T9esPcpjcAkn2j6WZKTNkV6QOsdcXExH/50Xm1s/7cqK/OQWSJyG93aPw7OJexwhuL62bhLpKA9xmUWU8ptJ7EUEklsspNsBqMyZKMEut4xltogLZvylJDR8Ga0yJ1fArRFGpRjNnRh4VkRX2zlnNkOPeg2hib4/4vf2e5i98DhBteaMP3hc/wLVAVUsJgZh9DIHADVZLk0Z1baZHQZnZGoyEGwysra5KEIT4FGCgchbejYs4fx+v+9EEamrvmQjMjnsQ9dBHA4gQlT0hK3WkL5xQlnOp34HyyI9oPa5nyVyMcrYZ4ACqyxY35GL4SoSQoMlltuZRmO2Vl5NK0J2j8kJ/tl1XuKNF5qcbgySCkUWBFOuZUZxKLl/pgLUoUWMx9aBHV5AmXLhez1nFC5oDRHeIVv1q6WjCOX2sTN5m0tJEIucubvKE+Fu+p1Q1rRzLSlWrXgpTsqohJoqUJvEQpH+LNRNaXunqeEsnc8hGlSorTsA5J7z0rLVVCl7CqH8qMTzVK5Rt/6Da6jBKNbzz4klpFXmIipeVwH9pHkwMknMzrqiN/wpl4yZHpd64pQ6l1zUg8VRK11Ukrq7TXPzWKo61wxa5jcbzWevPFmqbLfC6L/nJdbw/RtHgJVdRKBS+UIxwTy56pqqzkpH2trqQgrwNvSJb0WBsssk0KK2lgxCEWY2PrVhqrnWyfUHtIVH/LHwXdAI5vdf8k7eoYM88T4fZFjpZkvP9RWKF5wd0T/WH6oG+jH/JpeYGnz7nBIrSbRSPcNwcYknnuwGBAUnwAZDRYY0OlHzFLQZ6DHIBRfyvhv0z0xqpczyCQYuLdrjhA61/wQQuwNj6Qt4sr+iVzL0UoHI4L+bb0n0M7CWUElJMJYy62mG5et8iag4Lyz6DxYLkPX57ncjz/jskUIpn+CkOjfcqmNWLb2HWt3bRYLBdCfJvh+zg0EvSxW1gjrZcDKdEqc2JGKr8YetXsZLXBZmUi5e5Sa8FqBKE5CINx1ZsMoFjBrAfXKAVhHrGuWnSqXGY+nyXaY7USVcVMTVrPPco6nDN4FcaPhXnH7Mk3+5o960a2BkjVkaIxIk5eLZqcWIqWFa0SxXy5modPvUSN8sD6VVMBybNyTuwSkqtD/hTrVvQ6kqSdxsvKRzixbkWt6yZ8WeOopcvMNS7c5puXAuESalz6P4JlyksUT0gGx/XHCnSyAK5LZSbiSWvLUC8N4S5axM1KdvR/dMFYi/fonTHpYZQQEtmxlCk7JsmllC8T2bFdYcmONXomBQgSMlLoA/twjSss5XDlZDWqajKzeRedvYrOb+dNJbZKVx5W6ZO6bdKu2gy84tBJRp9OG8kVs8pKBJV9A15vfOzQOYmMjDFITGMajmzIJxxuOjsDQUMbJdtQOuBZGSY9MnF4xtUR0vYh08jYITDWeX3TIR6AxzX6mFsyXfZtGIF4EW1hbN0lCWNSWI6fETheSOp9Szc4BrYxZu3jT3CYE8avjQ8A1qSlyKQsTbOrQrb2ilYBTWg12BWSlYSdW+HCU/7fjFECjDtjD2ZxKilUie/WuGMn1VBGtZW+oeLHVPgTPVvFt1dKp/gFoOhnpYThoyhhFe25OZ2OF/0wJg2oFt9JatmESNEno1c4efL3oZeQbQ36M3OfJHRLvKY8UTVIcLxBvGv6weZd0sEswM3RUq7XHPBVaOGA15eRZnj0s2xzYCAGg8jpB4wB0KDDP01UNGiWuhsWHoRvzaNSMU8o4YeYCI3vDrjOLpkFhWud5llrTldBnFqX1mXLs9icmGZEGpGillgLzZejhp7UgIktmlYoNWCKlXKTmjGdAXrz2CSJ/HRrrqFRbaD9ceqegmsxXbuC3AFfteL4Gv2Xt6Wg0P6Gsa2UKiveKmA5ia+NSuVZiqyM73BSfKU2TQ4gWY+on2to6diPbr90kUr9BseTcZEgiUSD8H1iGA6lSQ7M4h4/wWFOUNRHCFl4WvDatrKkGLIkp2npRyloHU2Uqy1duSnfS4uK5A4yjuEu1/m9db50KUXxx8umSHeuQV2dsqI0RxsMvo8YpxhcWheWbaQqvxIPptc6lBJ8XDXBREc1cknytmxcG80lUMbrwMxaVx+jBCW0aZHmSokdJw/cGFM6aZj0SWGjyR9i1vcJwi/3z26aA0OeVczs+gHDo91tMQnsOulu1yFQOd5CyuAL5jahAZDjK3XSycsqyWFy8furkJc1sVGWM28e9cy/hGMeG4eNgjXu2LfP87Km9GaRSBKwUYI2hFGMNPL2mmAjTQ1Dq8PPKM2+r2bwLduC9pc45GhLR38Hh2qRhKlbGu0bkR4ALN0nEtITR+8kjrnhvA+yp8/VShy1hHAkFs40iqI1es9yu1TsaWUIwktqfwkz0mFWdhh9EcO3+oJwcn8QhkKbUwA18R0zODEO8wDiE8Pf5WH2q4gNekMTh3o5WgdcaHwCVdzrZcN4HTQ6sFnk66VaflBS12jCZIqQk71Jl8GfDs3HqMUUXOLw1FsDXsr8EB7cVabMGIFLQ5x6jZa9XRCOySK4ipTht96STv+tST2C0V9ZoTqnTx9ZKQKXt0mw/gnf/Jgxv29/as/hfRHQ117IE1REEzvOpa1mq1pJrBBukiPpm8KbWlX8cHGFUQE1iurspe6POGWlzIaFskbRnZPF4juRMy+OncNVtAKoT5ivAyPxe4Ekv9VZeRX1dbpP1jY3yW2ZigmPoibnpusSRU1OkV1o4Tqq6bbVK1DKZ0ZJR7aNWq0F+xPScfAKpNkFLu5b97AB6m0e8H0qEX6W19wYyKhV+lxvxBj+G2b82P0MAgu4h9oL88egYmIjUlpLhuO04S7wUCHieGIVOD3gPHOlHGmDUbL9VIpsqBtcLbRemaF+kejKUi/WZ/oe4H9KabkTfrAu56IrJ2eBTKqNBD2xWXRlF1klDO7ps8bpX25DVP0OOKa0QGCuVqJdcwyQCv79ijFuJcryGE505WzegSbKcijJXuNL17PYYB/ccQZWtSXEDJ7RzAyCmOk/yNZE9w2Ox6NsRw7l+TB8HxuGg5p6YLDK8Rt8zwlykqwQrvAy7WYnSbwxlKua/ix2QA06l5a/XWeu13bUFOue6+jrmiiz16W0L6nKWqpML5ROH+ILkJFUKW4zt6rUbEQlYzY/6wUXYb9Faaqp5uyU7UtDkNCMBVd5mXQFQOcJLp+NBJilU3+MtC5cl4qxav5fVmeKXWFFUuDKaHkuGXBNy0E3yYALfrPhcXQxHvEiHgaHKoDl5QeMOwFYqBWSchHuG/AkvrTb3rnjic3V3fEnCQnt9WJoxEvfMNfMn80/gyDi4pj0Ls/M8M3V26YQhFtp70mecgdPxhigeN0B9/AGzHDgLQmwJTtGdNAVE9fHiLN4m+lXaGboPurwTXjF/wDH0EkML4KC6FbP+T9jjhOD7/kJA6osfR4JP4KZCopgxAMulSWU1890J2/Nm1pq1Nwd327ZoVmaWGeVR8Kql+wkyDBqhyWZoRRMlmqVwT0nYepIlzZBjcnm0cUJbact/SBKDM7ml7uAWdwQahcVu2NO0iWpX9V2tqUDQDEx+ZIOANLBRFiDdt0bv1lzIkGUvkIb//gS7In91VLSKGljTF6na6+4JajCCdqn6fzzoEg5S0STVOZ07r34DAJUnTjgO8mG4ZiWI5jO9yU9UKuBS+Zz1N0Wn3uwrbv0ljAhdjkxwllAW0lLPDGCUbtErYu0QrbLZGbYzQ/SKV3oDJ0fJJU0ETPlPRVOLtKCQGgZu6cDsB7IYBRIAYxLQ4i9lgTGkuMkhNH3oECH896CoecFsRVVMB1mqmDOr/kU3ouBdFTpMWQCSAINXTqaYocq6DsGU5jTmzJPGPc62jsGWhQrxv9nDH/gp2xZOYw+gfU5zPKXKN8REkGHDGLF1JYzs40P+BYlGPP74c+n/dbnUCTbO8zwfQrLOYAotyNcAm08Uh1+hkugjSdQNQUbII8oCbT0CHhGSYClJ2QSSMHSEyCQ6Vhlwlj98b0YW0BmOCZl5H/CDJFA249MZoZIoO0nZBK7sTGELOsIkUDbj+Q9zRAJsP1oHtJx17Jdacu9DN9yb7lrJA8jsdxTXuUrxowf+59ByBAKyVr2Y7LEhAw2A4YD+6fq3xmuEn4ivIy0b3ez9QiFSOZhaWTqUcIZYRFo6gkZrnUy9ShmhEWgqUfeOcMi0NQz52gWoIeP8nYstiKSd0TGAd/X4WHpObgGWHoOzDamHRYohD+NZPxnhlGgaUgIfsZRoGmICIF7pzBAj+8+TTiZTBfSGxzPDldy2YyE4ftMMRwsQgdm65I/wOFEDL492F+dURRoEZKvnlEUaBGy48LH2M0YimkIkpBh2ZEZQ4GGINtDi6GYhqB4DeYUZgwFWoIki3PGUKAlKLDVESxBB+bzLEFxaezaJCGLp7bEwc2LT1K5WuCdnKOab8W6IK2iJZ/tunPoEX51sXA1b5i/hGPv0euNQ2Mbhh8w7gRgme0XK1O8SOviHgFtsWCUFhoagLVlAJxMFF/a643TXjX69iwMnRhtA7EP5W9MHg2z6YOIMNWsZ20G8wbphNy0RKyKJjP4F7M6j8+o9+ux3q/H+mwk4SzZHzEol0MDC5LgGL41r0Z//qFkWrSS0bIxfB9usqpJ8q10aev6sclJqQtHQckga4vFogucpUTklXQn0D7HrSIWj+TPjdezwHrAdyTstV3lt3doQG+x71ihAdECgLtAOr5iBBLEa7vK+bvjRSuys6AGF7kBPimJjm01mFPjiIxB4KYsV4g4/uLsRcL8e46X7BWFQDzCwd/cG6f4lKX2zy6Cb8pTPT7av2nLlE77iXo0JjYG+Jhvyz9EkKUzLgYF8WQ3zDrCukLIIRETyHbGGHRpQkNVzPE8nolMxYRBdWhF6BhGShKYP1A60mZJD4pSAzlLPxDVVKpUJBCuGqHiTthLrKmam6ag7jWtCsO30gRwHWmbVwHzOfQEUXNsSov5zYAVD11i3h6KQULg7hQ7kJ+PZIHAfMZA9/ZjtOFUDS6cMxhihMu3GYzyEleN53usELqoG/cZRB06nQa5WE9AuVsPFwZdd/wMXp70zMnSsp1uBCW6NsAVFLGMEGE+hCoTaBqJ5X3sInARq8LcKRSwzaOEQXyO7AqceHnDaA5IrqbNibEjFs0m2YV7rAmElYNgYV7/OdpqNeaRE5Muspaki5jf0bFBnCDV4iec+NeyZTWEURjDVNrcXCqcUsNTSRfHdGyys5W5AWCyz+E8iTUvyCOVZAZJSPXDj6gJqZbMEKS+yWXmJqkyWC11g3j/nKat36wjopjopKOU7sSoIyJgyUeVrvCYIoueK8uQlAzVcA3HiG/SzlzSHSVD1QWrFSsZqpY2RGE/NKGrOWkqMHxBUYs9/TZukl2Kpjg5KaDYGs/o2nY7SxuSTNVoTyTZzGz5alUyVXMZArNPXRtLvEiwy0YjXddI/aWKEV0jWkeRILqGtue7rJ+7y+l3ItEb8+DwPGmmeJ6BqPJNoiHIbGXmoglEM45coiFIt5B4REjA2UN9gcvvMwZpa4kA6Lc94BiEbycieNPqlhtxnKBibtTlRZwphplVRcvCWtSOWlV7Vjvf1u9j1BrMeGFZG1MH+RaipEK6PCl/5hNl7YQ1fEg2OgASoa7hRkDNnmjkHQNVTlJ4BCA79m9CRvJvTsXk35yKhCF7QnLPIVI3zJkU9Qzi5BXE7AD6A34ZK1D4Xi3Li0HZBjNp0gmoTz/8nNN4xsljdw925gnmyWWKfWPQZXrC52pbesbG/H7485nDdcyjBeqAQ4LIOUB4dplqI5sHl2kKh8u0A55cpgJ+cJkKeM2LXKbYWuxYZcL8xjQyNEQfcEzADs8uU5nMk8tUm7bAYdN/W8JqfHaZSqbLg8tUEloOl2mKzy7TA75oOsU3l2mKby5TbO5y3BqMmek7P4NAmUvx5jJNHB6f0CbB8BeXaQrPLtMUnl2mss/yb3CZCoU8uEyVcB5cppJ3KCPcXaaKeXCZyjufXKZzjjeX6fyo02WawrPLdHb3eXKZHlwDxYP47DI9OBbBn0Yy/vPkMhWCf3KZEiE4PiKHy5ROE04mkM72BsezE55dpgd8n6nw5jI9MMty9hMcTsTg24P9PbpM5aufXKaJIz6NpTy5TGVHnlymtodPLlNNLnxwmUq63ZPLNMU3l+mB+TyXacrPgtD3K+brxKDwdQMk6dwoKt7whcqONO08l6XEsPafuSxlR+wDKZGhA+99xmwJImn2GRRXmAC4upPZppA/PwH4K9M/byAw59G0wL10wDf7SnR7fV6JvXRkyAml1NPuVZ9dzgR38icyX1TCGYN1fo7wEcLs0v9gCUuj9H/2jSxhFqja9v2ROLhlYVIh/WTr/RwvhZejBFKM1FmyhJV/EkSmb0tYIdrmOWFeFepTnLbzjtnfUZ8td6lAGADbxso/1bs+dHRsGytS8vTqPDuxcayQwAG2KFlbqdZWvCPjmGyOGMeSjbSsYwkDpsg61jFBjE59ZLSOWefLlqtvaB1LGDVG1jHFuM54LFFqWceSmqbVYkfWMZoRWceEJMU65makybCOyTeLdUzL3qN1DFeJrWOSPyvV20w4VuuYyBmy3mIdi7FN61iSjuy3s6hCEJ85ZeQ7jhNsY7L2osQEo7plG0scuYXHEsrAHLYxxiBtrbRzso0xHNUsKQNz+dDpg21j4oqQ022rvI1jhaxsWG9MwnT77Z+MCxXpn3pJAruEXuUSNUBfilz1nZNooGPhPoYjY8l27M70fcNMWsFS7hSqjhxipE9vHWWk/5YoGeraqOWShtDOavRIRaAarLvR1U+JD2knZ2qsY0QlVnNf5eHL+iFBFZNQxBRsvU7SqnoCLQYwPn2MFEquST+ySheS0jQfN0rTEj1m6Z9LmpYEH8++LDwn6swyl45S5Rm+CBrhIxe/U1H21m5m1OaU/RD+78ertRNWWjX3NV2UZwR15QM2YSW4VbnfywwRZ7yjG/N1YsD17jEE6R2TDgwu6juG05LD62i4IFT+aN1sCOeNYOIQ+kkp2Tskg+sqmvucpEWicFFpCiIZXNJ7jMgsod4nuebSuFVDyfomiVNBzqMkkNfissvReoV1/u1GKXPYE57TJcXnlWtHrWIqIoEmlmvx+XFaVxVTbPg1TmWQC0dPm7CT/kSzpOosF06p2oMna+HQyn1WQqCpSPGCrs4GOW1BWsj3E2Pk5boAJdqSNgxr7qrW7VSjCJjAuvYbyjj4wgSkLKiAJRutBe3c5IRntBSpAQP2jDJSnyI8Yj5Gk0KjMJKO9T3NV3AaVJckyS93bqXG4FhSJ07ri5O7ripmA4F3Vhr6QEr+qQ+rRPHHDqB4uS7rKeX7PZm81gvsO1CqFqeQVnidpHLQA9NkR9I45BIOK022NJVWEhJ9S8WWu17WQKv9I2p512Ft46Rr3OXNm+C8u6KyZVdr/01Olknb9z9oMVjrOFWl1InKL7CfSVIfm8XmIRxISaLRmnjxbJkuYeRVB7LCuDGMg+fsqn9c7T+jL+x6BXTe0p2QYF/7uiRfJ82LLON6wfsdUkygo9iEABV0dib2IOQ8iOQdjI0SJ1iHSccPd7rkK5jn4WdT8mPmG85fukdKdAB1KomibW6A/RXMHCXaQFhatRUXG06ISk2do4khWCk8SLHBzK4pvjg/5ay7N5ELg30Qo/1gNxuHS0rrA+ByMObxPYp5e8/1LJV8DiNF/yMvrvg7S1dS8mBaUn0tq0bZJKb/ytZcUmL6peR2GH3xtIPd0ra1LeesYxS2dq59R8XB4zQaD6UjTHRFDJS8OjLSf8JsGcaTPEOZ7gDHHo+Y45yeI0iwaSX6UxGuI6Xzp/vf6SU565xMfpr+17lIB0a4QzRa7/dG9cV6BopFOBe72aJyDVHx7Qq0t1VtPBiV+2h9j1FyKKvM7wwugeyahTc+8KVqAWIo3xgkUbuIRoZ7aWJudvNQdT5mBvwupPbLrQWT/mK/48yqXIXXldGysdNskwggHalfz10ZvZQSo3Do5i3nuV/fvs0D3dlpGY4mPAW2c/2VnXWbUpUkKCgPZ5G7xLql8H4Vi8/OIlEHq0a4jiT1ccN4JTxQct+B5tL5gseDOdL49xJCJ9dvavuNrX3/El7ow/FyxSTqAwMbW55mhbHGCLfFtSvOnU8QnNyFk8l44tZsYV6Ap/l8zsXHhoTvE/A1AKDMob5ww6yGAbIaK1Ar7P4C8sQK7Aq0a3iwEZOOdzwe7QPDnxDGmbuDMJEpSAPbK/nszIIhAXItWvdTqTud7HiKUzBXaorKppBP2fr0KvMkss3ghYPwdAJwA9ObLcAk9QMQ7wA8nUhvCEfuteDaKDeLyODM5NSlin7PDEFdsgarPSA/KUObQdlABjJhnDBpSe9f1Nf7HXGcI7iCf8IgSTJm19KLYLt+h2NaftQjmIsR9yryqYsonUZ0ea51YuOqEx8i+mxRDqLiEYkPH9zKj0T2Oaek0LWAp6QcN/kEbMIvxN9Q0pICdFKo3Wg9ih/dFc3lzVqofdC6NqVonssH8P2GmLRv3SP9/x0Tf8Bs4i/P9xzlj/O8Mjih8IlMxsg3OLhjCMPfkUnCfcPEHzDPZQoYvgXx8wt3Sgg/sWNs3uH8hRvD3zH+0ne8Y1hfvCmQNo/1r03PmXbvDY6iqnjl+v+i8V8nBgmxzUs9BLFIXPkG33LgOdIO+8FDxPC9JwxP9yFw+sC8EIwUiXMRQ61UkDJl0ssJtJoJorX45kxqFm2majWQRxb/5zw9z3VkGP7IWz6HOdZXzb6+aPb1RbNva1fbi2bfXjT79qrZt1f9vf4lZm90fdHs66tmX180e4ZvZlRfNft6avb1RbOvr5p9fdXs26tm3140+/ai2belXNcXzb6+aPb1rtnXf541+/qi2df18vKi2RfT7N11aPbFNPt83TT7Ypq9Mxa7Nfv6rNnXu2ZfXzT7+qLZ11fNvj5r9vVFs385mKrZ1+c7Xg8t3vKbYv4OXujD8f2o2R8Y2NjyNKtQXyWf+qzzn/C1MWMdDxXmWI0bYL/wQ5gylUEgpmx1D+BSnYC0/sVlUk5VjUqPvGPiD5ilpsWLtbnGcuGEj6Ik/Zq4/KHOiWumXys5eFbnGskcqM414oKgtTXiyS8IVtras6p1w3CplGe1rZEs9wZHSaNpjsJkWluda5bT4P2hz0F7L1boqMoMvCO+eCreqOuTjgcxFDsX5WkNlHjR9vCGCcjhooMdfMfwaI7sGu+YdB/mBqJbPEKw+48YzEF2dMkShgC0CD/Ajc6qJMv0y4qkBoFLtkwZkTVTyohYPI9cioSJn9QSKwZacaws0geRiII8GOuMKJDqIRJRkGukiIIOjxpRYDIYRBREcTV1ZhCcp4gC6TcvEQXRONmKKNDKJa6mmsxBvSMKOqa/oQVvPuoVUdDhWSIKgtlDV0RB/4ZLIgpKtUiDHVIg1SwkpKDaIZoRBZHNvyui4IBjvS2xuUq995QwokDAImNqsbgVUfC22pp4jIlVFFEg5U4kckC/DvzsBAe/PI1Et42sB5zceam8gf3dqm6lQ9hJA79/CkyID46TMR0vMb45t5j5AxCOH+zJsASBBTQjWNgf4MgNsGNyx2iYwVUpzEDWSBhEtBCRGWYQX7yQn3P3oKEDrobvV4yWoEGJFXTVyLbmd4x/He0dk15He8OQeSpiVtc7hkcLJB69Y3DW4dmMdMfAlRo02tiXMKJlZw2BoNHJXeHTIj275kDY9qRwsKMtVQGxzHpCOl2Gb2kS4J9Dv4kMDKA6xkSUgHuHGKZsHI0wn7IcbB79lvI6qOtsPeswk58A1LrKq4qV79rLAyb+gNnKF7TsO+BkHZ/wP1bhx+daSyItTOCihcXSSAuLbDfHiyi/KFudHtY5e4PzQWYL/DuGyxohZl1rc1ZueH9f4KCDyZeLDiblTlAH0zXsG3DZSi0dbK75Ze5H1MEyW2vmO2Jm7WP+5maW/5TzUp/9Ct+rvNZ5YR3wfaBOq82fXwQKGBkf0YT0jqFAPanDtZb+J0wykH8dBuXMhTnh+3vpT2UHO99SMDJEbcJAdr5lh/uQfBboI3/WcWJXuMwSmeTfOUaRzco/XSXr4xvchSsWMbTI7327kuYYibSYg3S20IGkZZ50HVdes8RFMa9KyERVy0MMYp8QDabSxv35ZQAPK/HoUH6jFZXeD2P8fEbpSJMwfB7Se19h7YdeLWcj2AJfknjkpIBOJS6Fd3u9868xL4QvXntQ6qDIg+vXZ39bLOSZQgG5PLqysILdD/BkIzyKW7HcrWT6fQecSDGL2FTrUMtGQqS8QcSmlm1tZ0IkvRmcLMecQDzAr2XwXh6AHyuMGgcfSGQnjxELn8NBG/G99fFK+Wg/RWUAMSyAtTel499zPOTVPAf/Mt7JB9GHTwVnP2Lh0/XsZdRqgXjwuVqg1sjJjp0g6WLWMuvonPBNnQdml394h+OcsJDEdUqI7Tma7wf4o/9Gi5cRZn6WwFepIFiGyKkVXAYNbcxMsWGluIITWJ5YKbHgNI5tu36kRJx2hDJLV5BcwjqK3mkDqTrsXP3qclLS4DouHllVqat9ZRNEtdadlXPzks2bvAkpWuvu/2nsinIbBmHof0/BBbZBgxNyi+0IU1VpH1M/2t5fszEBPzeR9tXKLyKADbYDPM6DR641A1nzdN/PNq1R3F/LcnJ7SNkikHBRhKDmGDFJOUUYucdIr/EL0hN0iq9fj5vcTtZdrrR3ZoLvCDBYmv0uGY+bdLnquKwcrZCGRXJzZomVKI+WUvK6aG4hN21m5WAkCdVp3d7MSGnWks+pnoqviBCSyAXK1QI5dKrWUgOpJMcOkWyRRs7QrFmWoTVUSxzOTZwwVZsVHoOo44IfmMqkVIY2N6s9IB/ItHVmWHfEj7zt3RnX1JZRpx+nPZ3HrED1O/To1brPH4puHtVkXdIKhtgRJx8RAMrtYgAiIwJA+UgcsE42LkVjs6S5aJ62rF256xE3g3QFGsTLt5o7OXKzGuRffpTTaP6RHRDcPUKHleWqQMrVpZbh/N7m8j7Pcs5+SuJd+cXdmQL2i1iRqF82NSwyO9gSjxFXnvrc2Hzux+f383m938LlEfh/Co/LLZykVVnY2ML9GqTNX6c/3Q1gaQplbmRzdHJlYW0KZW5kb2JqCjkgMCBvYmoKODcxOTQKZW5kb2JqCjEwIDAgb2JqCjw8CiAgL1Jlc291cmNlcyAxMSAwIFIKICAvVHlwZSAvUGFnZQogIC9NZWRpYUJveCBbMCAwIDI1MiAxODBdCiAgL0Nyb3BCb3ggWzAgMCAyNTIgMTgwXQogIC9CbGVlZEJveCBbMCAwIDI1MiAxODBdCiAgL1RyaW1Cb3ggWzAgMCAyNTIgMTgwXQogIC9QYXJlbnQgMTIgMCBSCiAgL0NvbnRlbnRzIDggMCBSCj4+CmVuZG9iagoxMyAwIG9iago8PAogIC9UeXBlIC9Gb250CiAgL1N1YnR5cGUgL1R5cGUxCiAgL0Jhc2VGb250IC9UaW1lcy1Cb2xkCiAgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCjE0IDAgb2JqCjw8CiAgL1R5cGUgL0ZvbnQKICAvU3VidHlwZSAvVHlwZTEKICAvQmFzZUZvbnQgL0hlbHZldGljYQogIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagoxMiAwIG9iago8PCAvVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzEwIDAgUiBdID4+CmVuZG9iagoxNSAwIG9iago8PAogIC9UeXBlIC9DYXRhbG9nCiAgL1BhZ2VzIDEyIDAgUgogIC9MYW5nICh4LXVua25vd24pCj4+CmVuZG9iagoxMSAwIG9iago8PAogIC9Gb250IDw8IC9GNyAxMyAwIFIgL0YxIDE0IDAgUiA+PgogIC9QYXR0ZXJuIDw8IC9QYTEgNiAwIFIgPj4KICAvUHJvY1NldCBbL1BERiAvSW1hZ2VCIC9JbWFnZUMgL1RleHRdCiAgL1hPYmplY3QgPDwgL0ltMSAyIDAgUiAvSW0yIDQgMCBSID4+Cj4+CmVuZG9iago3IDAgb2JqCjw8IC9Qcm9jU2V0IFsvUERGIC9JbWFnZUIgL0ltYWdlQyAvVGV4dF0gL1hPYmplY3QgPDwgL0ltMiA0IDAgUiA+PiA+PgplbmRvYmoKeHJlZgowIDE2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTM3IDAwMDAwIG4gCjAwMDAwNDY1MjEgMDAwMDAgbiAKMDAwMDA0NjU0MiAwMDAwMCBuIAowMDAwMDUyNTc2IDAwMDAwIG4gCjAwMDAwNTI1OTYgMDAwMDAgbiAKMDAwMDE0MDkwNiAwMDAwMCBuIAowMDAwMDUyOTExIDAwMDAwIG4gCjAwMDAxNDAxNzkgMDAwMDAgbiAKMDAwMDE0MDIwMCAwMDAwMCBuIAowMDAwMTQwNzQxIDAwMDAwIG4gCjAwMDAxNDA2MDYgMDAwMDAgbiAKMDAwMDE0MDM5MyAwMDAwMCBuIAowMDAwMTQwNTAwIDAwMDAwIG4gCjAwMDAxNDA2NjYgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9Sb290IDE1IDAgUgogIC9JbmZvIDEgMCBSCiAgL0lEIFs8NEU4NjczMEIyRUMwRjkwRTBBQjFBQkFFQUQyQTVCQzM+IDw0RTg2NzMwQjJFQzBGOTBFMEFCMUFCQUVBRDJBNUJDMz5dCiAgL1NpemUgMTYKPj4Kc3RhcnR4cmVmCjE0MDk5MQolJUVPRgo=";
	filename = 'abhacard.pdf';
	// Create a new Blob object from the base64-encoded PDF data
	const byteCharacters = atob(base64PdfString);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

	// Create a URL for the PDF Blob
	const pdfUrl = URL.createObjectURL(pdfBlob);

	// Create a new iframe element
	const iframe = document.createElement('iframe');
	iframe.src = pdfUrl;
	iframe.style.width = '50%';
	iframe.style.height = '50%';
	iframe.style.border = 'none';

	// Create a new modal popup element
	const modal = document.createElement('div');
	modal.style.position = 'fixed';
	modal.style.top = '0';
	modal.style.left = '0';
	modal.style.width = '100%';
	modal.style.height = '100%';
	modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
	modal.style.display = 'flex';
	modal.style.justifyContent = 'center';
	modal.style.alignItems = 'center';

	// Add the iframe to the modal popup
	modal.appendChild(iframe);

	// Create a download button
	const downloadButton = document.createElement('a');
	downloadButton.href = pdfUrl;
	downloadButton.download = filename;
	downloadButton.innerHTML = 'Download PDF';
	downloadButton.style.display = 'block';
	downloadButton.style.marginTop = '10px';
	downloadButton.style.textAlign = 'center';
	downloadButton.style.color = '#fff';
	downloadButton.style.backgroundColor = '#4CAF50';
	downloadButton.style.padding = '10px 20px';
	downloadButton.style.borderRadius = '5px';
	downloadButton.style.textDecoration = 'none';

	// Add the download button to the modal popup
	//  modal.appendChild(downloadButton);

	// Add the modal popup to the document body
	document.body.appendChild(modal);

	// Remove the modal popup and URL object when the modal is closed
	modal.addEventListener('click', function() {
		document.body.removeChild(modal);
		URL.revokeObjectURL(pdfUrl);
	});
}



function openImagePopupforqr() {

	imageUrl = "../hisglobal/bbpublic/assetsAbha/js/qr-code(1).png"
	// create the popup div element
	const popupDiv = document.createElement("div");
	popupDiv.classList.add("popup");

	// create the image element
	const image = document.createElement("img");
	image.src = imageUrl;

	// create the close button element
	const closeButton = document.createElement("button");
	closeButton.textContent = "Close";
	closeButton.addEventListener("click", () => {
		popupDiv.remove();
		location.reload();
	});

	// add the image and close button to the popup div
	popupDiv.appendChild(image);
	popupDiv.appendChild(closeButton);

	// add the popup div to the body element
	document.body.appendChild(popupDiv);
}


//---------------------

function verifyOtp() {
	//alert(111);
	if (checkConsent() === false) {
		return false;
	}
	var pat_name = $("#patientname").text();
	var firstName = pat_name.split(" ")[0];
	var healthId = firstName + mobileNo;
	var otp = $("#lblverifymobileOtp").val();
	//	alert(otp);	
	//		alert(txId);
	//		document.getElementById('genhid').style.display = "none";
	//transactionID =$("transactionId").val();

	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		aysnc: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=verifyMobileOTP&otp=" + otp + '&txId=' + txId),
		success: function(response) {
			$("#preloader").remove();
			var responses = JSON.parse(response);
			console.log(responses)
			//    alert(responses.token);
			Token = responses.token;
			//  alert(Token); 



			if (responses.isSuccess != "0") {
				Token = responses.token;

				swal("", "OTP Verified Successfully, Please click on 'Create ABHA' to create ABHA address.", "success", {
					button: "OK",
				});
				//	document.getElementById("combo1").style.display = "none";
				document.getElementById("HIDMOBILEOTP").style.display = "none";
				document.getElementById("VerifyOTPLbl").style.display = "none";
				document.getElementById("VerifyOTPLbl").style.display = "none";
				$("#lblhidcreate").removeClass("data-none");
				$('#patienthealth').addClass("data-none");

				// document.getElementById("msg").val = healthId;
				document.getElementById("Createhid").style.display = "block"
				$('#lblAbhaId').removeClass("data-none");
				//document.getElementById("lblAbhaId").style.display="block"	

				$('#msg').val(healthId);
				console.log("ABHA Address is : " + healthId);
			}
			else {

				a = responses.Error.details[0]
				console.log(a);

				swal("", responses.Error.message || responses.Error.details[0].message || responses.Error || responses.error || a, "error", {
					button: "OK",
				});
				if (responses.isSuccess == "0") {
					console.log("everything is fine till this point");
					swal("Oops", responses.error || responses.Error.message, "error", {
						button: "OK",
					});
				}
				$("#preloader").remove();
				// $('#ERRORMESSAGE').removeClass("data-none");
			}
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}
	});
	//document.getElementById("pahId").style.display="block"	
}


function mobileotpcall() {
	if (checkConsent() === false) {
		return false;
	}
	authenticationMode = document.getElementsByName("veriffydata")[0].value;
	$('#create1').addClass("data-none");
	//	alert(authenticationMode);
	if (authenticationMode == "MOBILE_OTP") {
		genOTP();
		document.getElementById("HIDMOBILEOTP").style.display = "block";
		document.getElementById("VerifyOTPLbl").style.display = "block";

		$("#btnverify").hide();
		$("#VERIFYHEALTHID").hide();
		$("#BoxpatNdhmHealthId").hide();
		// $(".box").not("." + optionValue).hide();
		// $("." + optionValue).show();
		//$("#lblhidcreate").removeClass("data-none");
		$('#VERIFYHEALTHID').addClass("data-none");
		$('#BoxpatNdhmHealthId').addClass("data-none");
		//alert("aaaaa")
		//	document.getElementById("combo1").style.display = "block";
		//	document.getElementById("btn1").style.display = "block";
		document.getElementById("HIDByAaDhar").style.display = "none";
		document.getElementById("LblAadharNo").style.display = "none";
		document.getElementById("lblverifyOtp").style.display = "none";

	}
	else if (authenticationMode == "AADHAAR_OTP") {

		$("#btnverify").hide();
		$("#VERIFYHEALTHID").hide();
		$("#BoxpatNdhmHealthId").hide();

		$("#lblhidcreate").addClass("data-none");
		document.getElementById("combo1").style.display = "none";
		document.getElementById("btn1").style.display = "none";
		//	document.getElementById("HIDByAaDhar").style.display = "block";
		document.getElementById("LblAadharNo").style.display = "block";
		document.getElementById("AadaharNoOTP").style.display = "block";
		//AadaharNoOTP
		document.getElementById("lblverifyOtp").style.display = "none";
	}
	else {

		//alert("aa")
		document.getElementById("combo1").style.display = "none";
		document.getElementById("btn1").style.display = "none";
		document.getElementById("HIDByAaDhar").style.display = "none";
		$("#btnverify").show();
		$("#VERIFYHEALTHID").show();
		$("#BoxpatNdhmHealthId").show();
		//	document.getElementById("")
		//	//  $(".box").hide();
		//	selectauthMode
	}
}


function CreatetHId() {
	if (checkConsent() === false) {
		return false;
	}
	var patient_address = $("#patient_address").text();
	//alert(patient_address);
	var dayOfBirth = $("#patient_dob").text().split("-")[0]
	var districtCode = $("#districtCode").text();
	var email = $("#email").text();
	/*		    	document.getElementById("patientfullname").innerHTML = patient_detail.patientName;
					document.getElementById("patientfname").innerHTML = patient_detail.patFirstName;
					document.getElementById("patientmname").innerHTML = patient_detail.patMiddleName;
					document.getElementById("patientlname").innerHTML = patient_detail.patLastName;*/

	var pat_name = $("#patientfullname").text();//$("#patientname").text();
	var firstName = $("#patientfname").text();//pat_name.split(" ")[0];
	var middleName = $("#patientmname").text();//"";
	var lastName = $("#patientlname").text();//"";
	var name = $("#patientname").text().split(" ")[0];

	var gender = $("#patient_gender").text();
	//alert(document.getElementById("msg").value)
	//alert($("#msg").val())
	var healthId = document.getElementById("msg").value;//$("#msg").val();//firstName +mobileNo;

	var lastName = $("#patientlname").text();//"";
	var townCode = "";
	var profilePhoto = "";
	var wardCode = "";
	var restrictions = "";
	var villageCode = "";
	var middleName = $("#patientmname").text();//"";

	var password = "";
	var pincode = "";

	var stateCode = "";
	var subdistrictCode = "";
	var patien_dob = $("#patient_dob").text();
	var yearOfBirth = patien_dob.split("-")[2];
	var mobile = mobileNo;

	//alert(firstName+"  "+middleName+"  "+lastName)
	const d = new Date(patien_dob);
	var monthOfBirth = patien_dob.split("-")[1];
	//d.getMonth()+1;
	console.log(d.getMonth() + 1);
	console.log("monthOfBirth" + monthOfBirth);
	//var monthOfBirth="0";
	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		async: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=CreateHealthIdMobile&patient_address=" + patient_address
			+ '&dayOfBirth=' + dayOfBirth +
			'&districtCode=' + districtCode + '&email=' + email + '&firstName=' + firstName + '&gender=' + gender + '&healthId=' + healthId +
			'&monthOfBirth=' + monthOfBirth + '&name=' + name + '&password=' + password + '&pincode=' + pincode + '&stateCode=' + stateCode
			+ '&subdistrictCode=' + subdistrictCode
			+ '&yearOfBirth=' + yearOfBirth + '&mobile=' + mobile + '&Token=' + Token + '&txId=' + txId + '&townCode=' + townCode + '&lastName=' + lastName + '&profilePhoto=' + profilePhoto + '&wardCode=' + wardCode + '&restrictions=' + restrictions + '&villageCode=' + villageCode + '&middleName=' + middleName + '&patien_dob=' + patien_dob),




		// "lastName": "","townCode", "profilePhoto" , "wardCode" ,"address" , "restrictions" ,"villageCode",  "middleName":	

		success: function(response) {
			$("#preloader").remove();
			console.log(response)


			localStorage.setItem("abhadetails", response);
			var responses = JSON.parse(response);



			if (responses.isSuccess == "0") {


				console.log("everything is fine till this point");
				document.getElementById("msg").value = healthId;
				swal("Oops", responses.error || responses.Error.message, "error", {
					button: "OK",
				});


				document.getElementById("Mob").style.display = "none";
				document.getElementById('patienthealth').style.display = "none";
				document.getElementById('Createhid').style.display = "block";
				// document.getElementById('genhid').style.display = "none";	
			}
			else {
				ndhm_accesstoken = responses.token;
				ndhmHealthID = responses.healthId;
				ndhmHealthIDCode = responses.healthIdNumber;
				ndhm_gender = responses.gender;
				ndhm_name = responses.firstName;
				ndhm_dob = responses.yearOfBirth;
				ndhm_address = patient_address;
				tmpData = [];

				//	alert("---------------------"+JSON.stringify(tmpData))
				//----------------------------
				if (ndhm_gender == "M") {
					ndhmpat_gender = "Male";
				}
				else if (ndhm_gender == "F") {
					ndhmpat_gender = "Female";
				}
				else {
					ndhmpat_gender = "Others";
				}
				if (document.getElementById("iskyc").checked == true) {
					isKyc = "1";
					$('#linkageconsent').addClass("data-none");
				}
				else {
					isKyc = "0";
				}
				isverified = "1";
				console.log(isKyc + "-------" + isverified)


				$('#NHDMHEALTHDETAIL').removeClass("data-none");
				swal("Congratulation", "Your ABHA Address Created Successfully, Please click on 'Confirm' to link.", "success", {
					button: "OK",
				});
				$("#hideConsent").click();
				document.getElementById('lblhidCreated').style.display = "block";
				document.getElementById('lblhidCreated1').style.display = "block";
				authenticationMode = document.getElementsByName("veriffydata")[0].value;
				//  localStorage.setItem("abhadetails",response);     
				console.log("everything is fine till this point" + authenticationMode);
				document.getElementById('patienthealth').style.display = "none";
				document.getElementById('Createhid').style.display = "none";
				document.getElementById('Mob').style.display = "none";
				//document.getElementById("lblAbhaId").style.display="block"	

				$('#msg').val(responses.healthId);
				//document.getElementById("p1").innerHTML = "ABHA Address is : "+responses.healthId;







			}
		},
		error: function(e) {
			$("#preloader").remove();

			alert('Error: ' + e);
		}
	});
}

// ----------------------hid by Aadhar------------------------------
function AadharOtp() {
	if (checkConsent() === false) {
		return false;
	}
	var regexp = /^[2-9]{1}[0-9]{11}$/;
	var aadhar = document.getElementById("AadharNo").value;

	//alert(aadhar); 

	if (aadhar != '' && aadhar.match(regexp)) {
		$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
		document.getElementById("divVERIFYDATA").style.display = "none";
		document.getElementById("btnMobileOTP").style.display = "none";
		document.getElementById("btnMobileOTPtemp").style.display = "block";

		$.ajax({

			type: "POST",
			async: "true",
			url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=AadharOtpGen&aadhar=" + aadhar),

			success: function(response) {
				$("#preloader").remove();

				var respons = JSON.parse(response);
				console.log(respons)
				//	alert("adddd");

				if (respons.isSuccess == "0") {
					console.log("errr----------------" + respons.Error.message);

					swal("", respons.Error.message || respons.error || respons.Error, "error", {
						button: "OK",
					});


					$("#preloader").remove();
					// $('#ERRORMESSAGE').removeClass("data-none");
				}
				else {
					AdahrotptxId = respons.txnId;
					localStorage.setItem("AadharotpTransactionId", AdahrotptxId);
					//	document.getElementById("lblAadharOTP").style.display = "block"
					document.getElementById("lblAadhaaarotp").style.display = "block";
					// document.getElementById("VerifyAadhaaarotp").style.display = "block";
					document.getElementById("divVERIFYDATA").style.display = "none";
					document.getElementById("btnMobileOTP").style.display = "none";

					//	alert("nilesh");
					swal("", "OTP Sent to registered Mobile Number Successfully.", "success", {
						button: "Ok",
					});

					document.getElementById("AadaharNoOTP").style.display = "none";





				}

				$("#lbltimercnt").removeClass("data-none");
				var oneMinute = 60;
				var display = document.querySelector('#timer');
				display.textContent = "01:00"; // Set initial display to 01:00
				startTimer(oneMinute, display);

			},

		});
	}
	else {
		swal("Oops", "Enter valid Aadhar Number", "error", {
			button: "OK",
		});


	}
}

function AadharOtpresend() {

	txnId = localStorage.getItem("AadharotpTransactionId");
	$.ajax({

		type: "POST",
		async: "true",
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=AadharOtpReGen&txnId=" + txnId),

		success: function(response) {
			$("#preloader").remove();

			var respons = JSON.parse(response);
			console.log(respons)
			//	alert("adddd");

			if (respons.isSuccess == "0") {
				console.log("errr----------------" + respons.Error.message);

				swal("", respons.Error.message || respons.error || respons.Error, "error", {
					button: "OK",
				});


				$("#preloader").remove();
				// $('#ERRORMESSAGE').removeClass("data-none");
			}
			else {
				AdahrotptxId = respons.txnId;
				localStorage.setItem("AadharotpTransactionId", AdahrotptxId);
				//	document.getElementById("lblAadharOTP").style.display = "block"
				document.getElementById("lblAadhaaarotp").style.display = "block";
				// document.getElementById("VerifyAadhaaarotp").style.display = "block";
				document.getElementById("divVERIFYDATA").style.display = "none";
				document.getElementById("btnMobileOTP").style.display = "none";

				//	alert("nilesh");
				swal("", "OTP resends  to registered Mobile Number Successfully.", "success", {
					button: "Ok",
				});

				document.getElementById("AadaharNoOTPresend").style.display = "none";





			}


		},

	});
}




function verifyAdhaarOtp() {
	//alert(111);
	if (checkConsent() === false) {
		return false;
	}

	var otp = $("#AadaharOTPNo").val();
	//	alert("AadaharOTPNo"+otp);
	var firstName = $("#patientfname").text();
	var mobile = $("#patient_mobile_no").text();;
	var healthId = firstName + mobile;

	var txxxId = localStorage.getItem("AadharotpTransactionId");
	//	alert(otp);	
	//		alert(txId);
	//		document.getElementById('genhid').style.display = "none";
	//transactionID =$("transactionId").val();

	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		aysnc: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=VerifyAadharotp&otp=" + otp + '&txId=' + txxxId),
		success: function(response) {
			$("#preloader").remove();
			var responses = JSON.parse(response);
			console.log(responses)


			if (responses.isSuccess != "0") {
				//	Token = responses.token;

				swal("", "OTP Verified Successfully, Please click on 'Create ABHA' to create ABHA address.", "success", {
					button: "OK",
				});
				localStorage.setItem("AadharverifyTransactionId", responses.txnId);
				//	alert("--------"+responses.txnId)
				//	document.getElementById("combo1").style.display = "none";
				document.getElementById("HIDMOBILEOTP").style.display = "none";
				document.getElementById("VerifyOTPLbl").style.display = "none";
				document.getElementById("VerifyOTPLbl").style.display = "none";
				$("#lblhidcreate").removeClass("data-none");
				$('#patienthealth').addClass("data-none");

				// document.getElementById("msg").val = healthId;
				$('#lblAbhaId').removeClass("data-none");
				document.getElementById("CreatehidByuid").style.display = "block"

				//document.getElementById("lblAbhaId").style.display="block"	

				$('#msg').val(healthId);
				//alert("$('#msg').val(healthId);");
				console.log("ABHA Address is : " + healthId);
			}
			else {
				a = responses.Error.details[0]
				console.log(a);

				swal("", responses.Error.message || responses.Error.details[0].message || responses.Error || responses.error || a, "error", {
					button: "OK",
				});

				$("#preloader").remove();
				// $('#ERRORMESSAGE').removeClass("data-none");
			}
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}
	});
	//document.getElementById("pahId").style.display="block"	
}



function checkAadhaarmobile() {
	//alert(111);
	if (checkConsent() === false) {
		return false;
	}
	var txid = localStorage.getItem("AadharverifyTransactionId");
	var mobile = $("#pateintMobNo").val();
	//	alert(otp);	
	//		alert(txId);
	//		document.getElementById('genhid').style.display = "none";
	//transactionID =$("transactionId").val();

	$(".content-wrapper").prepend('<div class="blocks" id="preloader"><div class="block"></div></div>');
	$.ajax({
		aysnc: true,
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=AadharMobileCheck&mobile=" + mobile + '&txnId=' + txid),
		success: function(response) {
			$("#preloader").remove();
			var responses = JSON.parse(response);
			console.log(responses)

			transactionId = responses.txnId;
			result = responses.mobileLinked;
			console.log("-----result--------" + result);

			console.log(responses);
			if (result) {
				Resultmobilechek = localStorage.getItem("Resultmobilechek");
				console.log("--------------" + Resultmobilechek);
				localStorage.setItem("transactionIdMobilecheck", transactionId);
				localStorage.setItem("Resultmobilechek", result);
				// createhidbyuid(transactionId,mobile);
				AadharHealthId(transactionId)
			}
			else if (result.toString().trim() == "false") {
				swal({

					text: "Mobile number not registerd with Aadhaar ,please update mobile number from pateint detail modification!!!",
					icon: "warning",
					buttons: 'ok',
					dangerMode: true,
				}).then(function() {
					$('#patAddMobileNo').focus();
				});


				return false;

			}
		},
		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}
	});
	//document.getElementById("pahId").style.display="block"	
}






function AadharHealthId(transactionId) {
	//alert("transactionId" + transactionId);
	var email = $("#email").text();
	var firstName = $("#patientfname").text();//pat_name.split(" ")[0];
	var middleName = $("#patientmname").text();//"";
	var lastName = $("#patientlname").text();//"";

	var mobile = patient_mobile_no;
	// var healthId = firstName + mobile;
	var healthId = document.getElementById("msg").value;
	//var yearOfBirth = patient_dob.split("-")[2];
	var patien_dob = $("#patient_dob").text();
	var yearOfBirth = patien_dob.split("-")[2];
	$('#lblAbhaIdAadhaar').removeClass("data-none");
	$('#msg1').val(healthId);

	console.log("email" + email + "firstName" + firstName + "middleName" + middleName + "lastName" + lastName + "mobile" + mobile + "healthId" + healthId);

	$.ajax({

		type: "POST",
		async: "true",
		url: createFHashAjaxQuery("/BLDAHIMS/bloodbank/portalAbhaID.cnt?hmode=AdharCreateHID&email=" + email
			+ '&firstName=' + firstName + '&middleName=' + middleName + '&lastName=' + lastName + '&yearOfBirth=' + yearOfBirth + '&mobile=' + mobile + '&txnId=' + transactionId + '&healthId=' + healthId),

		success: function(response) {
			$("#preloader").remove();

			var respons = JSON.parse(response);
			console.log(respons)
			localStorage.setItem("abhadetails", response);
			if (respons.isSuccess == "0") {
				//	alert(respons.Error.message);
				swal("Oops", respons.error || respons.Error.message || respons.Error.details[0].message, "error", {
					button: "Ok",
				});
				document.getElementById('LblAadharNo').style.display = "none";
				//	document.getElementById('lblAadharOTP').style.display = "none";
				document.getElementById('patienthealth').style.display = "none";
				// alert("dddddddddddd");

			}
			else {

				//-------------------------------
				if (respons.hasOwnProperty('new')) {
					if (respons.new == false) {
						swal({

							text: "Patient record already exists! Please ensure the demographics details are correct...",
							icon: "warning",
							buttons: 'ok',
							dangerMode: true,
						});

						if (respons.healthId != null && respons.healthId != '') {
							ndhmHealthID = respons.healthId;

						}
						if (respons.healthIdNumber != null && respons.healthIdNumber != "") {
							ndhmHealthIDCode = respons.healthIdNumber;
						}

						ndhm_accesstoken = respons.token;


						ndhm_gender = respons.gender;
						ndhm_name = respons.firstName;
						ndhm_dob = respons.yearOfBirth;
						ndhm_address = patient_address;
						tmpData = [];
						//----------------------------
						if (ndhm_gender == "M") {
							ndhmpat_gender = "Male";
						}
						else if (ndhm_gender == "F") {
							ndhmpat_gender = "Female";
						}
						else {
							ndhmpat_gender = "Others";
						}
						if (document.getElementById("iskyc").checked == true) {
							isKyc = "1";
							$('#linkageconsent').addClass("data-none");
						}
						else {
							isKyc = "0";
						}
						isverified = "1";
						console.log(isKyc + "-------" + isverified)

						document.getElementById('patienthealth').style.display = "none";
						$('#NHDMHEALTHDETAIL').removeClass("data-none");
						authenticationMode = document.getElementsByName("veriffydata")[0].value;
						console.log("everything is fine till this point");
						//  document.getElementById("p2").innerHTML = "ABHA Address is : "+ndhmHealthID +"&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>"+ '          ABHA Number is : '+respons.healthIdNumber; 

						//document.getElementById('lblhidCreated2').style.display = "block";
						$('#msg').val(respons.healthId);
						//-------------------------

						$("#hideConsent").click();
						$('#lblAbhaNumber').removeClass("data-none");
						$('#AbhaNumber').val(respons.healthIdNumber);
						document.getElementById('LblAadharNo').style.display = "none";
						//	document.getElementById('lblAadharOTP').style.display = "none";
						//   document.getElementById('HIDByAaDhar').style.display ="none";
						//  
						document.getElementById('CreatehidByuid').style.display = "none";

						// lblhidCreated2
						document.getElementById('lblhidCreated').style.display = "block";
						document.getElementById('lblhidCreated2').style.display = "block";


					}

					if (respons.new == true) {
						if (respons.healthId != null && respons.healthId != '') {
							ndhmHealthID = respons.healthId;

						}
						if (respons.healthIdNumber != null && respons.healthIdNumber != "") {
							ndhmHealthIDCode = respons.healthIdNumber;
						}

						ndhm_accesstoken = respons.token;
						//	ndhmHealthID = respons.healthId;
						//	ndhmHealthIDCode = respons.healthIdNumber;
						ndhm_gender = respons.gender;
						ndhm_name = respons.firstName;
						ndhm_dob = respons.yearOfBirth;
						ndhm_address = patient_address;
						tmpData = [];
						//----------------------------
						if (ndhm_gender == "M") {
							ndhmpat_gender = "Male";
						}
						else if (ndhm_gender == "F") {
							ndhmpat_gender = "Female";
						}
						else {
							ndhmpat_gender = "Others";
						}
						if (document.getElementById("iskyc").checked == true) {
							isKyc = "1";
							$('#linkageconsent').addClass("data-none");
						}
						else {
							isKyc = "0";
						}
						isverified = "1";
						console.log(isKyc + "-------" + isverified)


						document.getElementById('patienthealth').style.display = "none";
						$('#NHDMHEALTHDETAIL').removeClass("data-none");

						//------------------------------------------=============================================

						swal("Congratulation", "Your ABHA Address Created Successfully, Please click on 'Confirm' to link.", "success", {
							button: "OK",
						});
						$('#lblAbhaNumber').removeClass("data-none");
						$('#AbhaNumber').val(respons.healthIdNumber);

						//---------------------------------------------=============================================

						$("#hideConsent").click();

						authenticationMode = document.getElementsByName("veriffydata")[0].value;
						console.log("everything is fine till this point");
						//  document.getElementById("p2").innerHTML = "ABHA Address is : "+ndhmHealthID +"&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>"+ '          ABHA Number is : '+respons.healthIdNumber; 
						//document.getElementById('lblhidCreated1').style.display = "block";
						document.getElementById('lblhidCreated').style.display = "block";
						document.getElementById('lblhidCreated1').style.display = "block";
						$('#msg').val(respons.healthId);

						document.getElementById("AbhaNumber").disabled = true;
						document.getElementById("msg").disabled = true;
						//-------------------------


						document.getElementById('lblhidCreated1').style.display = "block";
						document.getElementById('LblAadharNo').style.display = "none";

						document.getElementById('CreatehidByuid').style.display = "none";
						//   document.getElementById('HIDByAaDhar').style.display ="none";
						//  document.getElementById('patienthealth').style.display ="none";
						//	document.getElementById('lblAadharOTP').style.display = "none";


					}

				}
				// alert(respons.healthIdNumber);
				//txId = respons.txnId;
				//----------------------


			}
		},

		error: function(e) {
			$("#preloader").remove();
			alert('Error: ' + e);
		}

	});



	//alert
}








function checkConsent() {
	//alert("nilesh2334444");
	//alert($('#isConsent').prop('checked'));
	if ($('#isConsent1').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			$('#divConsentId').show();
			//showConsentDiv();
			$('#isConsent1').focus();
		});
		return false;
	}
	else if ($('#isConsent2').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			//	showConsentDiv();
			$('#divConsentId').show();
			$('#isConsent2').focus();
		});
		return false;
	}
	else if ($('#isConsent3').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			//	showConsentDiv();
			$('#divConsentId').show();
			$('#isConsent3').focus();
		});
		return false;
	}
	else if ($('#isConsent4').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			//showConsentDiv();
			$('#divConsentId').show();
			$('#isConsent4').focus();
		});
		return false;
	}
	else if ($('#isConsent5').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			//showConsentDiv();
			$('#divConsentId').show();
			$('#isConsent5').focus();
		});
		return false;
	}
	else if ($('#isConsent51').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			//showConsentDiv();
			$('#divConsentId').show();
			$('#isConsent51').focus();
		});
		return false;
	}
	else if ($('#isConsent52').prop('checked') == false) {

		swal("Please view and accept the consent first!!").then(function() {
			//showConsentDiv();
			$('#divConsentId').show();
			$('#isConsent52').focus();
		});
		return false;
	}
	else {
		//document.getElementById("divConsentId").style.display = "none";
		return true;
	}
}
function showConsentDiv() {

	$('#divConsentId').show();
	$('#showConsent').hide();
	$('#hideConsent').show();
}

function hideConsentDiv() {

	$('#divConsentId').hide();
	$('#showConsent').show();
	$('#hideConsent').hide();
}

function selectall() {
	$('#isConsent1').prop('checked', true);
	$('#isConsent2').prop('checked', true);
	$('#isConsent3').prop('checked', true);
	$('#isConsent4').prop('checked', true);
	$('#isConsent5').prop('checked', true);
	$('#isConsent51').prop('checked', true);
	$('#isConsent52').prop('checked', true);
	//$('#isConsent1').prop('checked', true);

}


function ClearDivheatlh() {
	document.getElementById('lblverifyOtp').style.display = "block";
	document.getElementById('lblAadhaaarotp').style.display = "none";
	document.getElementById('btnMobileOTPtemp').style.display = "none";
	document.getElementById('LblAadharNo').style.display = "none";

	//lblAadhaaarotp    none
	//btnMobileOTPtemp
	//LblAadharNo

}

function confirmAadhar() {
	authenticationMode = document.getElementsByName("veriffydata")[0].value;
	//alert("authenticationMode" + authenticationMode);
	//	var input = document.getElementsByName("createBy")[0].value;
	if (authenticationMode.trim() == "MOBILE_OTP") {

		$("#BoxpatNdhmHealthId").show();

		document.getElementById("btnMobileOTP").style.display = "block";
		$("#btnverify").addClass("data-none");
		//document.getElementById("btnverify").style.display = "block";
		//document.getElementById("divVERIFYDATA").style.display = "block";
		//$('#divVERIFYDATA').addClass("data-none");
		$("#divVERIFYDATA").removeClass("data-none");
		//---------------

		$("#VERIFYHEALTHID").show();
		document.getElementById("lblverifyOtp").style.display = "block";
		// $(".box").not("." + optionValue).hide();
		// $("." + optionValue).show();
		$("#lblhidcreate").removeClass("data-none");
		$('#VERIFYHEALTHID').removeClass("data-none");
		//$('#BoxpatNdhmHealthId').removeClass("data-none");
		//alert("aaaaa")
		document.getElementById("combo1").style.display = "block";
		document.getElementById("btn1").style.display = "block";
		document.getElementById("HIDByAaDhar").style.display = "none";
		document.getElementById("LblAadharNo").style.display = "none";
		document.getElementById("HIDByAaDhar").style.display = "none";
		document.getElementById('Mob').style.display = "none";
		$('#create1').removeClass("data-none");
	}
	else if (authenticationMode.trim() == "AADHAAR_OTP") {
		//alert("Aadharr");
		//document.getElementById("lblverifyOtp").style.display = "block";
		/*		$("#btnverify").addClass("data-none");
				$("#VERIFYHEALTHID").hide();
				$("#BoxpatNdhmHealthId").hide();
				//	alert("nilesh122333");
				$("#lblhidcreate").addClass("data-none");
				document.getElementById("combo1").style.display = "none";
				document.getElementById("Mob").style.display = "none";
				
				document.getElementById("btn1").style.display = "none";
				document.getElementById("HIDByAaDhar").style.display = "block";
				document.getElementById("LblAadharNo").style.display = "block";
		
		
			
		*/

		//$("#BoxpatNdhmHealthId").show();
		//$("#VERIFYHEALTHID").show();
		//	$('#VERIFYHEALTHID').removeClass("data-none");
		document.getElementById("btnMobileOTP").style.display = "block";

		//document.getElementById("btnverify").style.display = "block";
		//	document.getElementById("divVERIFYDATA").style.display = "block";
		$("#divVERIFYDATA").removeClass("data-none");

		document.getElementById('Mob').style.display = "none";
		document.getElementById("HIDMOBILEOTP").style.display = "none";
		document.getElementById("VerifyOTPLbl").style.display = "none";
		//$('#create1').removeClass("data-none"); 
	} else {


	}

}

//Added by Nilesh
function openPopupWithEventHeightWidth(url, eventObj, height, width) {
	$("#searchPopupModalID").find('iframe').attr('src', url);
	$("#searchPopupButtonID").trigger('click');
}


//-------------------------------------------------- ended by nilesh -------------------------------------------------------------------
//	--------------------------------------------------------------------------------------------
//-----Added by Arun------
function toggleDonorCertificates(num){
	
	if(num==0){
		document.getElementById("showMsg").style.display = "block";
		document.getElementById("hideMsg").style.display = "none";
		document.getElementById("ttest").style.display="none";
	}
	
	if(num==1){
		document.getElementById("showMsg").style.display = "none";
		document.getElementById("hideMsg").style.display = "block";
		document.getElementById("ttest").style.display="block";
	}
	
	//validDataRows = document.getElementsByName("validDataRows")[0].value
	
}

function donorCheck(){
	var dChkBoxNum = document.getElementsByName("validRows")[0].value;
	var dataArr = JSON.parse(document.getElementsByName("tdataArr")[0].value);
	checkedDataArr = [];
	flag=false;
	for(var i=0; i<dChkBoxNum; i++){
		var checkbox = document.getElementById("checkBox"+i);
		if(checkbox.checked){
			flag=true;
			entryNo = parseInt(checkbox.getAttribute("name"));
			checkedDataArr.push(dataArr[entryNo]);
		}			
	}
	if(flag==false){
		swal("Please check at least one record to link!!").then();
	}
	console.log(dataArr);
	console.log(checkedDataArr);
	
	return flag;
}
//-----end Arun------



