package com.gf.exception;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.ServletWebRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * 控制器增强  例如异常处理统一处理
 * @author Administrator
 *
 */
@Controller
public class MyExceptionError implements ErrorController{
	
	 private ObjectMapper  op=new ObjectMapper();
	 @Autowired
	 private  ErrorAttributes ea;
		//异常处理
		@RequestMapping("/error")
		public String excHandler(HttpServletRequest request,HttpServletResponse response) throws IOException{
			//拿到当前异常
			ServletWebRequest  swf=new ServletWebRequest(request);
			Throwable  e=ea.getError(swf);
			//判断请求类型是不是ajax请求来做响应的异常处理
			System.out.println("-----出现异常--------"+e.getClass().getName());
			String xhr=request.getHeader("X-Requested-With");
			if(xhr == null || xhr.trim().equals("") || !xhr.trim().equals("XMLHttpRequest")) {
				
				return "/erro.html";
			}
			System.out.println("-------------------------------------");
			HashMap<String, Object> maps=new HashMap<String, Object>();
			maps.put("code", 500);
			//设置请求方式和字符编码
			response.setContentType("application/json;charset=utf-8");
			response.setCharacterEncoding("utf-8");
			response.setStatus(200);
			
			//设置返回前端的数据把异常对象转换成json字符串
			String json=op.writeValueAsString(maps);
			response.getWriter().write(json);
			response.getWriter().flush();
			return null;
		}
		@Override
		public String getErrorPath() {
			// TODO Auto-generated method stub
			return "/error";
		}
}
