package com.gf.Service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 * 用户业务层
 * @author Administrator
 *
 */

import com.gf.Bo.UserLoginBo;
import com.gf.Dao.UserDao;
import com.gf.Po.UserLogin;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class SysUserLoginService {

	@Autowired
	UserDao   ud;
	//查询用户 信息 分页 及带条件
	public HashMap<String, Object> getAllUser(UserLoginBo ubo){
	PageHelper.startPage(1,10);
	List<UserLoginBo> upo=ud.getAllUser(ubo);
	PageInfo<UserLoginBo> userpo=new PageInfo<UserLoginBo>(upo);
	
	HashMap<String, Object> maps=new HashMap<String, Object>();
	maps.put("rows", userpo);
	maps.put("total", userpo.getTotal());
	
	return maps;
}
	
	//新增用户
	public  boolean addUser(UserLogin  ul) {
		return ud.addSysUser(ul)>0;
	}
	
	//修改用户
	public boolean upUser(UserLogin  ul) {
		return  ud.modifySysUser(ul)>0;
	}
	//删除用户
	public  boolean deleteUser(String username) {
		return ud.deletesUser(username)>0;
	}
	//根据登录的账号返回有无对象做判断登录
	public UserLogin isTrueUser(String username) {
		return ud.isTrueUser(username);
	}
	//根据对应的userid添加对应的角色

}
