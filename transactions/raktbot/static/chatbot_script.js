window.onload=function openbox() {
  document.getElementById("myForm").style.display = "block";
  var timer = setTimeout(function(){document.getElementById("myForm").style.display = "none";}, 4000);
  $(document.getElementById("myForm")).on("click",function(){
  clearTimeout(timer);
});
};

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm_cb() {
  document.getElementById("myForm").style.display = "none";
}
$(document).ready(function(){
	
$('textarea').keypress(
    function bot_answer(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            var msg = $(this).val();
			$(this).val('');
			if(msg!='')
			$('<div class="msg_b">'+msg+'</div>').insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			var myvar=setTimeout(function myfun(){$('<div class="msg_c">'+'Bot is typing'+'</div>').insertBefore('.msg_push');},1500);
			var msg_formated=msg.replace(/\s+/g, '%20').toLowerCase();
			if(msg_formated.includes("+")){
				msg_formated=msg_formated.replace("+", " positive ");
			}
			else if(msg_formated.includes("+ve")){
				msg_formated=msg_formated.replace("+ve", " positive ");
			}
			else if(msg_formated.includes("-")){
				msg_formated=msg_formated.replace("-", " negative ");
			}
			else if(msg_formated.includes("-ve")){
				msg_formated=msg_formated.replace("-ve", " negative ");
			}
//			var myurl='/BLDAHIMS/service/chat/rb?msg='+msg_formated;
//			var myurl='http://10.10.36.77:5000/post?msg='+msg_formated;
			var myurl='/ml_war/service/chat/rb?msg='+msg_formated;
			/*alert(myurl);*/
			$.ajax({
				 	type: "post",
			        url: myurl,
			        dataType: "html",
			        success: function(results){
			        	var botHtml = '<div class="msg_a">' + results + '</div>';
						clearTimeout(myvar);
						$('.msg_c').remove();
						$('<div class="msg_a">'+botHtml+'</div>').insertBefore('.msg_push');
						$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			        },
					error: function(results) {
						alert("There is an error. "+results.stringfy);
						console.log(results.stringfy);
					},
			    });
        }
    });

	
});