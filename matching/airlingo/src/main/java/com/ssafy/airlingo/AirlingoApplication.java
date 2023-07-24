package com.ssafy.airlingo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AirlingoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AirlingoApplication.class, args);
	}

}
