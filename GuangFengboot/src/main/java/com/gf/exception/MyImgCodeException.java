package com.gf.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * 验证码错误 异常
 * @author Administrator
 *
 */
public class MyImgCodeException extends AuthenticationException{


	private static final long serialVersionUID = 1L;

	public MyImgCodeException(String message) {
		super(message);
	}
}
