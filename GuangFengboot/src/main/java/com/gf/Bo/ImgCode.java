package com.gf.Bo;

import lombok.Data;

/**
 * 验证码类
 * @author Administrator
 *
 */
@Data
public class ImgCode {

		
	private String  code;
	private Long  time;
	
	public ImgCode(String code,int time) {
		this.code=code;
		this.time=System.currentTimeMillis()+time*1000;
	}
}
