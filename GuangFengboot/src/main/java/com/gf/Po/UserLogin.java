package com.gf.Po;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
/**
 * 登录用户类继承security原有的用户类
 * @author Administrator
 *
 */
//lombok自动添加get set 等
@Data
public class UserLogin implements UserDetails{

	private static final long serialVersionUID = 1L;
	//密码
	private String password;
	//用户名
	private  String username;
	//姓名
	private String  uname;
	//性别
	private  String gender;
	//电话
	private String tel;
	
	//状态
	private  String state;
	//账户权限认证
	private  Set<GrantedAuthority> authorities;
	//账户是否有效
	private  boolean accountNonExpired=true;
	//账户 是否锁定
	private  boolean accountNonLocked=true;
	//账户是否到期
	private  boolean credentialsNonExpired=true;
	//账户是否启用
	private  boolean enabled=true;
	
	public UserLogin(String  username,String password) {
		this.username=username;
		this.password=password;
	}
	
}
