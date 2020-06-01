//登录界面登录
function  onlogin(){

	$.post("/login",
			{"username":$("#username").val(),
			"password":$("#password").val(),
			"imgcode":$("#img-code").val()
			},
			function(data){
		console.log(data);
			if(data.msg=="登陆成功"){
				
				window.location.href="/view/index.html"
			}else if(data.msg=="登陆失败"){
				
				$("#hint").html(data.data.message);
			}
			
			
	},"json")
}

//验证码生成
function  upsendImgcode(){
	 $("#imgcode").attr("src","/sendImgcode");
}