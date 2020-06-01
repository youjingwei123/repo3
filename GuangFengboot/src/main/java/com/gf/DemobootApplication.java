package com.gf;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"com.gf.Dao"})
public class DemobootApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemobootApplication.class, args);
	}

}
