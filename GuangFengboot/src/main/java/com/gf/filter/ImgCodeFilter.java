package com.gf.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gf.Bo.ImgCode;
import com.gf.Service.MyAuthenticationFailureHandler;
import com.gf.exception.MyImgCodeException;

import lombok.extern.java.Log;

/**
 * 验证码拦截器
 * @author Administrator
 *
 */
@Component
@Log
public class ImgCodeFilter extends OncePerRequestFilter{
	//注入failure类
	@Autowired
	private MyAuthenticationFailureHandler authenticationFailureHandler;
	
	//验证码验证方法
	public  void validateCode(HttpServletRequest request) throws AuthenticationException{
		//拿到登录时候的验证码
		String    imgcode=request.getParameter("imgcode").toLowerCase();
		//拿到服务器传的验证码
		ImgCode    sc=(ImgCode)request.getSession().getAttribute("imgcode");
		//如果 验证码不为空就 转换 不分大小写
		if(sc.getCode()!=null || !sc.getCode().equals("")) {
			sc.setCode(sc.getCode().toLowerCase());
		}
		if(sc.getCode()  == null) {
			throw new MyImgCodeException("验证码不存在");
		}else if(imgcode == null || imgcode.equals("")) {
			throw new MyImgCodeException("没有输入验证码");
		}else if(!imgcode.equals(sc.getCode())) {
			throw new MyImgCodeException("验证码输入错误 ");
		}else if(sc.getTime() < System.currentTimeMillis()) {
			request.getSession().removeAttribute("imgcode");
			throw new MyImgCodeException("验证码过期 ");
		}
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String  url=request.getRequestURI().toString();
		if(url.equals("/login")) {
			log.info("--------------验证码验证");
			try {
				validateCode(request);
				request.getSession().removeAttribute("imgcode");
				//验证码正确就通过
			}catch(AuthenticationException e) {
				authenticationFailureHandler.onAuthenticationFailure(request, response, e);
				return;
			}
			
		}
		filterChain.doFilter(request, response);
	}

}
