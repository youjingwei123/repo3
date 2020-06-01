package com.gf.Dao;
/**
 * 用户dao层
 * @author Administrator
 *
 */

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.gf.Bo.UserLoginBo;
import com.gf.Po.RoleMemberPo;
import com.gf.Po.UserLogin;

public interface UserDao {

	//查询所有用户信息分页显示以及根据用户编号或者姓名查询
	public List<UserLoginBo> getAllUser(UserLoginBo ubo);
	
	//新增用户信息
	public int addSysUser(UserLogin ul);
	
	//修改用户信息 
	public   int modifySysUser(UserLogin ul);
	
	//删除用户 
	public  int deletesUser(@Param("username")String username);
	
	//登录界面验证账号密码
	public UserLogin  isTrueUser(@Param("username")String username);
	//添加对应userid增加对应角色
	public   int  addRoleMember(RoleMemberPo rm);
	//根据userid  删除对应角色
	public  int   removeRoleMemberById(@Param("username")String username);
}
