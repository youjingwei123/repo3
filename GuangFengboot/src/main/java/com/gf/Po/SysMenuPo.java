package com.gf.Po;

import lombok.Data;

/**
 * 菜单类
 * @author Administrator
 *
 */
@Data
public class SysMenuPo {
	//菜单ID
	private String  menu_id;
	//菜单名字
	private String menu_name;
	//父级菜单
	private String p_menu_id;
	//菜单网页地址
	private  String  url;
	//菜单图标
	private String  default_img;
	//是否是 系统菜单
	private String is_sys_manage;
	//排序号
	private  String sort_no;
	//是否有效
	private String state;
}
