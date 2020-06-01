package com.gf.Dao;
/**
 * 菜单dao
 * @author Administrator
 *
 */

import java.util.List;

import com.gf.Po.SysMenuPo;

public interface MenuDao {

	//显示菜单
	public List<SysMenuPo> findMenu(SysMenuPo sp);
	
	//新增菜单
	public  int addSysMenu(SysMenuPo sp);
	
	//修改菜单
	public  int  modifySysMenu(SysMenuPo sp);
	
	//删除菜单
	public  int deleteSysMenu(SysMenuPo sp);
	
	//根据菜单id 查询信息
	public  SysMenuPo findById(SysMenuPo sp);
}
