package com.gf.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gf.Service.MyAuthenticationFailureHandler;
import com.gf.Service.MyAuthenticationSuccessHandler;
import com.gf.filter.ImgCodeFilter;
/**
 * 登录拦截器 配置
 * @author Administrator
 *
 */

@Configuration
public class MyWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter{
	//注入success类
	@Autowired
	private MyAuthenticationSuccessHandler successHandler;
	
	//注入failure类
	@Autowired
	private MyAuthenticationFailureHandler authenticationFailureHandler;
	//注入验证码拦截器
	@Autowired
	private ImgCodeFilter  imgcodef;
	
	//注入密码加密器
	@Bean
	public PasswordEncoder getPasswordEncode() {
		return new BCryptPasswordEncoder();
	}

	@Override
	//拦截器配置
	protected void configure(HttpSecurity http) throws Exception {
		http
		//设置 验证码拦截器
		.addFilterBefore(imgcodef, UsernamePasswordAuthenticationFilter.class)
		//取消默认的拦截 配置
		.httpBasic().disable()
		//关闭跨站请求伪造
		.csrf().disable()
		//设置不需要认证的请求 permitAll() 匹配 通过
		.authorizeRequests()
		.antMatchers("/login","/sendImgcode","/loginconmand","/login.html","/phonelogin.html","/login","/js/*.js","/easyui/**/*.js","/easyui/*.js","/easyui/**/*.css","/img/*.png","/easyui/themes/icons/*.png","/easyui/themes/material-blue/images/*.png").permitAll()
		//除了以上请求外 其他请求都需要认证
		.anyRequest().authenticated()
		.and()
		//自定义表单登录配置
		.formLogin()
		//根据controller返回 登录 页面 未通过登录的请求一律返回到该地址
		.loginPage("/loginconmand")
		//登录处理请求
		.loginProcessingUrl("/login")
		//登录成功之后的处理器返回success
		.successHandler(successHandler)
		//登录失败后的处理器返回
		.failureHandler(authenticationFailureHandler);
	
		
	}
	

}
