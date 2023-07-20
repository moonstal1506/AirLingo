package com.ssafy.airlingo.domain.user.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.service.UserService;
import com.ssafy.airlingo.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {

	private final UserService userService;

	@Operation(summary = "회원가입", description = "사용자가 회원가입을 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "회원가입 성공")
	})
	@PostMapping("/signup")
	public ResponseResult createUserAccount(@Valid @RequestBody CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserController_createUserAccount -> 사용자의 회원가입");
		if(userService.createUserAccount(createUserAccountRequestDto) >= 0)
			return ResponseResult.successResponse;
		return ResponseResult.failResponse;
	}



}
