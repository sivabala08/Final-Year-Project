	// Numeric only control handler
jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        
               return false;
    }
        });
    });
};
	
	// Validations here
			function numericOnly(e){
				if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
					               return false;
				}else
					return true;
			
			}
			$(document).ready(function () {
  				$("#loginMobile ,#preRegisterMobile ,#preRegisterAdminEnterOTP ,#changePasswordMobile ,#changePasswordOTP").keypress(function (e) {
					    return numericOnly(e);
   				});
			});
			
	// Validations end
		
	$('#backToLogin ').click(function(){
			$('.reg').css('display', 'none');
			$('.sign').css('display', 'block');
			$('.error').css('display', 'none');
			$("#loginFail").css("display" , "none");
	});
	$('#signInCard').click(function(){
			$('.sign').css('display', 'block');
		  $('.reg').css('display', 'none');
		  $('.forgotpassword').css('display', 'none');
		  $('.otp').css('display', 'none');
		  $('.forgotpasswordenterotp').css('display', 'none');
	});
	
	
	$('.signup').click(function(){
		$('#preRegisterMobile').val('');
		$('#preRegisterPassword').val(''); 
		$('#preRegisterConfirmPassword').val('');
		$('.error').css('display', 'none');
	});
	
	$('.forgot-pwd').click(function(){
		$('#changePasswordMobile').val('');
		$('.error').css('display', 'none');
	});
	
	$('#preRegisterMobile').blur(function(){
			ajaxCallIsMobileNoExist($('#preRegisterMobile').val().trim());
			
				
			
	});
	
	
	$('.changepasswordgetotp').click(function(){
				
				if($('#changePasswordMobile').val().trim() == ''){
						$('.error').css('display', 'none');
						$('.changePasswordMobileAlert').css('display', 'block');
				}else{
						$('.sign').css('display', 'none');
						$('.reg').css('display', 'none');
						$('.forgotpassword').css('display', 'none');
						$('.otp').css('display', 'none');
						$('.forgotpasswordenterotp').css('display', 'block');
						
				$.ajax({
					
						url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=PRE_REGISTER_ADMIN_GET_OTP"
						,data : {
								mobile : $('#changePasswordMobile').val().trim()
					}
				}).done(function(data){
					
						data = jQuery.parseJSON(data);
						if(data.status == '1'){
							//alert(data.otp);
						}else{
							 alert("Something Went Wrong ,Please contact to Administrator");
						}
				});
				
				}
	
	});
	
	// Forget Password Grp Admin
	$('#saveChangeForgetPassword').click(function(){
			
			var otp = $('#changePasswordOTP').val().trim();
			var password =  $('#changePasswordNew').val().trim();
			var confirmPassword = $('#changePasswordConfirmNew').val().trim();
			
			if( otp == ''){
				//alert("Please enter valid otp");
				$('.error').css('display', 'none');
				$('.changePasswordMobileOTPAlert').css('display', 'block');
			
			}else if(password == ''){
				//alert("Please enter password");
				$('.error').css('display', 'none');
				$('.changePasswordNewAlert').css('display', 'block');
			}else if (confirmPassword == ''){
				//alert("Please enter confirm password");
				$('.error').css('display', 'none');
				$('.changePasswordConfirmNewAlert').css('display', 'block');
			}
			else if(password != confirmPassword){
				alert("Please enter same password ");
			}
			else{
				var id2 = '#changePasswordConfirmNew';
				var id1 = '#changePasswordNew'; 
				passHash(id1 , id2);
				
				$.ajax({
					
						 url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=GRP_ADMIN_CHANGE_PSWRD"
						,data : {
						 otp : otp
						,password : $('#changePasswordNew').val().trim()
						,mobile : $('#changePasswordMobile').val().trim()
					}
				}).done(function(data){
				
				data = jQuery.parseJSON(data);
				if(data.status == '1' && data.flag == '1'){
						$('#changePasswordOTP').val('');
						$('#changePasswordNew').val('');
						$('#changePasswordConfirmNew').val('');
						passHash(id1 , id2);
						submitform('NEW');
				}
				else if(data.flag == '2'){
						$('.error').css('display', 'none');
						$('.changePasswordMobileOTPIncorrectAlert').css('display', 'block');
				
				}
				else if(data.flag == '3'){
						$('.error').css('display', 'none');
						$('.changePasswordMobileOTPExpiredAlert').css('display', 'block');
				
				}
				});
						
			}
			
			
	});
	
	
	$('.signin ').click(function(){
		
			loginAdmin();
	});
	$('#loginPassword, #loginMobile').keypress(function (e) {
			 var key = e.which;
			 if(key == 13)  
			  {
			    loginAdmin();
			      
			  }
});
	
	function loginAdmin(){
	
		var flag = false;
		if($('#loginMobile').val().trim() == ''){
				//alert('Please enter Mobile');
				$('.error').css('display', 'none');
				$('.loginMobileAlert').css('display', 'block');
		
		}else if($('#loginPassword').val().trim() == ''){
				//alert('Please enter Password');
				$('.error').css('display', 'none');
				$('.loginPasswordAlert').css('display', 'block');
		
		}
		else{
				flag = true;
				$('.error').css('display', 'none');
				$('input[name=userName]').val($('#loginMobile').val().trim());
				var id = '#loginPassword';
				loginPassHash(id);				
				$('input[name=password]').val($('#loginPassword').val().trim());
				submitform('GRP_ADMIN_LOGIN');
				event.preventDefault();
		}
		if(!flag){
		
				return false;
		}
	}
	 // Pre-Registration of Group Admin 
	
	$('#preRegisterGetOtp').click(function(){
		
		var flag = false;
		if($('#preRegisterMobile').val().trim() == '' || $('#preRegisterMobile').val().trim().length < 10){
			//alert("Please enter Mobile");
			$('.error').css('display', 'none');
			$('.preRegisterMobileAlert').css('display', 'block');
			
		}else if($('#preRegisterPassword').val() == ''){
			//alert("Please enter correct password");
			$('.error').css('display', 'none');
			$('.preRegisterPasswordAlert').css('display', 'block');
		}else if($('#preRegisterConfirmPassword').val() == ''){
			//alert("Please enter correct password");
			$('.error').css('display', 'none');
			$('.preRegisterConfirmPasswordAlert').css('display', 'block');
		}else if($('#preRegisterPassword').val() != $('#preRegisterConfirmPassword').val()){
			//alert("Please enter correct password");
			$('.error').css('display', 'none');
			$('.preRegisterPasswordNotMatchedAlert').css('display', 'block');
		}else if($('#preRegisterPassword').val().trim().length < 6 || $('#preRegisterConfirmPassword').val().trim().length < 6){
			$('.error').css('display', 'none');
			$('.preRegisterPasswordLengthAlert').css('display', 'block');
			$('.preRegisterPasswordConfirmLengthAlert').css('display', 'block');
		}	
		else{
			$('.error').css('display', 'none');
			flag = true;
			
		}
		if(!flag)
			return;
		else{
			$.ajax({
			
				url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=PRE_REGISTER_ADMIN_GET_OTP"
			  , data : {
				mobile : $('#preRegisterMobile').val()
				,password :$('#preRegisterPassword').val()
				,confirmPassword : $('#preRegisterConfirmPassword').val()
			} 
			}).done(function(data){
					data = jQuery.parseJSON(data);
					
					if(data.status == "1"){
						var id1 = '#preRegisterPassword';
						var id2 =  '#preRegisterConfirmPassword';
						passHash(id1 , id2 );
						$('.sign').css('display', 'none');
						$('.reg').css('display', 'none');
						$('.forgotpassword').css('display', 'none');
						$('.otp').css('display', 'block');
						//alert(data.otp);
			
					}else{
						alert("Something gone wrong refresh your page");
					}
			});
		}	
		
	});
	
	$('.validateotp').click(function(){
	
		var otp = $('#preRegisterAdminEnterOTP').val();
		var mobile = $('#preRegisterMobile').val();
		var password  = $('#preRegisterPassword').val();
		var confirmPassword = $('#preRegisterConfirmPassword').val();
		
		if(otp == ''){
		alert("Please enter Valid OTP");
		return false;
		}else{
			$.ajax({
			url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=PRE_REGISTER_ADMIN_VALIDATE_OTP"
			,data : {
				mobile : mobile
				,otp : otp
			}
			
			}).done(function(data){
				
				data = jQuery.parseJSON(data);
				
				if(data.status == '1'){
							
							if(data.flag == '1'){
								//alert("validate");
								saveDonorGroupAdminLogin();
							}else{
								alert("Invalidate");
							}
				
				}else{
					alert("Something went wrong. Please contact to Administrator");
				}
			});
		}
	});
	
	function saveDonorGroupAdminLogin(){
	
		var mobile = $('#preRegisterMobile').val();
		var password  = $('#preRegisterPassword').val();
		var confirmPassword = $('#preRegisterConfirmPassword').val();
		$.ajax({
			url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=PRE_REGISTER_ADMIN_LOGIN"
			,data : {
				mobile : mobile
				,password: password
			}
			
			}).done(function(data){
				
				data = jQuery.parseJSON(data);
				if(data.status == '1'){
					$('input[name=userName]').val(mobile);
					$('input[name=password]').val(password);
					submitform('PRE_REGISTER_ADMIN_LOGIN_REDIRECT');
					/*$.ajax({
							url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=PRE_REGISTER_ADMIN_LOGIN_REDIRECT",
							data : {
									mobile : mobile
									,password: password
							}
					}).done(function(data){
						
					});*/
					
				}else{
				alert('Something went wrong ,Please contact to administrator');
				}
			});
		
		
		
	}
	
	
	function loginPassHash(id1){
		var isSuccess;

	 var pwd = $(id1).val();
	 var saltedPass =  pwd;
	 var hashObj = new jsSHA(saltedPass, "ASCII");
	 try 
	 {
		hashedPass = hashObj.getHash("SHA-1", "HEX");
		
     }
	catch(e)
	{
		isSuccess = false;	
	}
	//alert(hashedPass);
	$(id1).val(hashedPass);
	
	}
function passHash(id1 , id2)
{
	 var isSuccess;

	 var pwd = $(id1).val();
	 var pwd1 = $(id2).val();
	 var saltedPass =  pwd;
	 var saltedPass1 =  pwd1;
	 var hashObj = new jsSHA(saltedPass, "ASCII");
	 var hashObj1 = new jsSHA(saltedPass1, "ASCII");
	 try 
	 {
		hashedPass = hashObj.getHash("SHA-1", "HEX");
		hashedPass1 = hashObj1.getHash("SHA-1", "HEX");
		
     }
	catch(e)
	{
		isSuccess = false;	
	}
	//alert(hashedPass);
	$(id1).val(hashedPass);
	$(id2).val(hashedPass1);
	//alert("hashedPass "+hashedPass +"  hashedPass1 "+hashedPass1);
}

function submitform(mode){

	document.getElementsByName('hmode')[0].value = mode;
	document.forms[0].submit();

}

function ajaxCallIsMobileNoExist(mobile){
	 var ok = false;
	$.ajax({
			url : "/BLDAHIMS/bloodbank/voluntryDonorsGroupRegistration.cnt?hmode=IS_MOBILENO_EXIST"
		   ,data : {
		   		mobile : mobile
		   }
	}).done(function(data){
			data = jQuery.parseJSON(data);
			if(data.status == '1' && data.code == '200'){
				alert("User already registered with this mobile");
				$('.preRegisterClass').css('display' ,'none');
				$('.sign').css('display' ,'block');
				
				ok = true;
			}
			return ok;
	});
	
	
	
	

}