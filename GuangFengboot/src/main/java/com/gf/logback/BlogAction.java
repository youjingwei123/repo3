package com.gf.logback;

import org.slf4j.Logger;
/**
 * 日志引导类	
 */
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class BlogAction {

	//定义一个全局的记录器，通过LoggerFactory获取
    private final static Logger logger = LoggerFactory.getLogger(BlogAction.class); 
    /**
    * @param args
    */
    @RequestMapping("/")
   public static void main(String[] args) {
       logger.info("logback 成功了");
       logger.error("logback 成功了");
   }
}
