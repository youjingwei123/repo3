package com.gf.Bo;

import com.gf.Po.UserLogin;

import lombok.Data;
@Data
public class UserLoginBo extends  UserLogin{

	public UserLoginBo(String username, String password) {
		super(username, password);
	}
	private static final long serialVersionUID = 1L;
	//根据用户id 和 用户姓名 查询的属性
	private String keyWord;


}
