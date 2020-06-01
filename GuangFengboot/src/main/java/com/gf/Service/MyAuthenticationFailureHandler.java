package com.gf.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * 登录失败的业务 处理
 * @author Administrator
 *
 */
@Service
public class MyAuthenticationFailureHandler implements AuthenticationFailureHandler{
	//注入json字符串处理对象
	private ObjectMapper  om=new ObjectMapper();

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		//判断登录请求是否为ajax请求 并做响应处理
		String xhr=request.getHeader("X-Requested-With");
		//设置响应的字符编码
		response.setCharacterEncoding("utf-8");
		if(xhr!=null && xhr.equals("XMLHttpRequest")) {
			//设置响应类型和上下文
			response.setContentType("application/json;charset=utf-8");
			//设置响应信息
			Map<String, Object> maps=new HashMap<String, Object>();
			maps.put("code", 500);
			maps.put("msg", "登陆失败");
			maps.put("data", exception);
			//把对象转换成JSON字符串传给前端
			String json=om.writeValueAsString(maps);
			response.getWriter().write(json);
			response.getWriter().flush();
			return;
		}
		
		
		response.sendRedirect("/login.html");
		
	}

}
