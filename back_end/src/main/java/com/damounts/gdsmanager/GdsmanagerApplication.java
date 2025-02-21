package com.damounts.gdsmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.damounts.gdsmanager" )
public class GdsmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GdsmanagerApplication.class, args);
	}

}
