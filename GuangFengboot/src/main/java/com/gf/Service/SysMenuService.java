package com.gf.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 * 菜单业务层
 * @author Administrator
 *
 */

import com.gf.Dao.MenuDao;
import com.gf.Po.SysMenuPo;
@Service
public class SysMenuService {
	
	@Autowired
	MenuDao   md;
	
	//显示菜单
	public  List<SysMenuPo> findMenu(SysMenuPo sp){
		return md.findMenu(sp);
		
	}
	
	//新增菜单
	public  boolean insertMenu(SysMenuPo sp) {
		return md.addSysMenu(sp)>0;
	}

	//修改菜单
	public boolean upMenu(SysMenuPo sp) {
		return md.modifySysMenu(sp)>0;
	}
	//删除菜单 
	public  boolean  deleteMenu(SysMenuPo sp) {
		return md.deleteSysMenu(sp)>0;
	}
	
	//根据id 信息查询信息
	public  SysMenuPo findbyid(SysMenuPo sp) {
		return md.findById(sp);
	}
}
