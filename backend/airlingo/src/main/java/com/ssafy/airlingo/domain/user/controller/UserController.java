package com.ssafy.airlingo.domain.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Template", description = "템플릿 API Document")
@RestController
@RequestMapping("/api")
public class UserController {

	@Operation(summary = "템플릿 화면", description = "템플릿 화면을 출력합니다.", tags = {"View"})
	@GetMapping("/test")
	public void test() {
		System.out.println("test");
	}
}
