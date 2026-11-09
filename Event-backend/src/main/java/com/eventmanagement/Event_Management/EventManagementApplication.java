package com.eventmanagement.Event_Management;

import com.eventmanagement.Event_Management.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EventManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventManagementApplication.class, args);
	}
	@Bean
	CommandLineRunner seed(UserService userService) {
		return args -> userService.seedAdmin();
	}
}
