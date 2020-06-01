package com.gf.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gf.Po.UserLogin;

import lombok.extern.java.Log;
/**
 * 用于登录 的账号密码跟数据库 匹配业务
 * @author Administrator
 *
 */
@Service
//logback日志添加
@Log
public class UserLoginService implements UserDetailsService {
	//密码加密解密器
	@Autowired
	private PasswordEncoder pe;
	//用户业务层
	@Autowired
	SysUserLoginService us;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("查询用户对象");
		//匹配到响应的账号后返回对象进行比对
		if(username.trim().equals("admin")) {
			//返回数据库查询的对象进行 匹配
			return new UserLogin("admin", pe.encode("123123"));
		}	
		//否则 
		throw new UsernameNotFoundException("该用户不存在");
	}

}
