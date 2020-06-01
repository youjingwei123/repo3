(function($) {
	"use strict";


	/*==================================================================
    [ Focus input ]*/
	$('.input100').each(function() {
		$(this).on('blur', function() {
			if ($(this).val().trim() != "") {
				$(this).addClass('has-val');
			} else {
				$(this).removeClass('has-val');
			}
		})
	});


	/*==================================================================
	[ Validate ]*/
	var input = $('.validate-input .input100');

	//登录验证
	$('#loginUser').click(function() {
		var flag = true;
		for (var i = 0; i < input.length; i++) {
			if (validate(input[i]) == false) {
				showValidate(input[i]);
				flag = false;
			}
		}
		if($("#code-login").val() == null){
			flag = false;
		}
		var loginData = $('.validate-form').serializeArray();
		var json = serializeToObject(loginData);
		if (flag) {
 			$.post("/login", json, function(data) {
 				console.log(data)
				if (data.flag) {
					location = "/index.html";
				} else {
					$("#err").html(data.exception.message);
				}
			}, "json");
		}
	});

	$('.validate-form .input100').each(function() {
		$(this).focus(function() {
			hideValidate(this);
			$("#err").html("");
		});
	});
	$('.vali-input .input1000').each(function() {
		$(this).focus(function() {
			hideValidate(this);
		});
	});

	function validate(input) {
		if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
			if ($(input).val().trim().match(
					/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
				) == null) {
				return false;
			}
		} else {
			if ($(input).val().trim() == '') {
				return false;
			}
		}
	}

	function showValidate(input) {
		var thisAlert = $(input).parent();
		$(thisAlert).addClass('alert-validate');
	}

	function hideValidate(input) {
		var thisAlert = $(input).parent();
		$(thisAlert).removeClass('alert-validate');
	}

	$("#login-option").click(function() {
		$("#phoneLogin-div").css({
			"display": "none"
		});
		$("#login-btn").css({
			"display": "block"
		});
	});
	//手机登录页面
	$("#show-phone-login-div").click(function() {
		var login_div = $("#phoneLogin-div");
		if (login_div.css("display") == "none") {
			login_div.css({
				"display": "block"
			});
			$("#login-btn").css({
				"display": "none"
			});
		} else {
			login_div.css({
				"display": "none"
			});
			$("#login-btn").css({
				"display": "block"
			});
		}
	});
	var phone_input = $('.vali-input .input1000');

	//登录验证
	$("#phone").blur(function() {
		var pattern = /^1[345678]\d{9}$/;
		var flag = pattern.test($("#phone").val());
		if (!flag) {
			$("#phone-lable").attr("data-validate", "请输入正确的手机号");
			showValidate($("#phone"));
		}
	});
	$("#phone").focus(function() {
		$("#phone-lable").attr("data-validate", "请输入手机号");
	});
	//点击获取验证码
	$("#getCode").click(function() {
		var pattern = /^1[345678]\d{9}$/;
		var flag = pattern.test($("#phone").val());
		if (!flag) {
			$("#phone-lable").attr("data-validate", "请输入正确的手机号");
			showValidate($("#phone"));
		} else {
			var len = 60;
			var codeButton = $("#getCode");
			codeButton.html(len + 's' + "后重新发送");
			$.get('/phoneCode',function(data){
				console.log(data);
			});
			var time = setInterval(function() {
				codeButton.html((--len) + 's' + "后重新发送");
				$("#getCode").attr("disabled", "true");
				if (len == -1) {
					$("#getCode").removeAttr("disabled");
					$("#getCode").html("获 取 验 证 码");
					clearInterval(time);
				}
			}, 1000);
		}
	});
	$("#phoneLogin").click(function() {
		var flag = true;
		for (var i = 0; i < phone_input.length; i++) {
			if (validate(phone_input[i]) == false) {
				showValidate(phone_input[i]);
				flag = false;
			}
		}
		var phone_info = $("#phoneForm").serializeArray();
		var json = serializeToObject(phone_info);
		$.post('/phoneLogin',json,function(data){
			if(data.flag){
				location = '/index.html';
			}else{
				$("#err-phone").html(data.exception.message);
			}
		},"json");
	});
	//跟换验证码
	$("#image-code").click(function(){
		$("#image-code").attr("src","/imageCode");
	});
})(jQuery);
