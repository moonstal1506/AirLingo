package com.ssafy.airlingo.domain.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.service.UserService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "User Controller", description = "유저 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {

	private final UserService userService;

	@Operation(summary = "회원가입", description = "사용자가 회원가입 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "회원가입 성공")
	})
	@PostMapping("/signup")
	public ResponseResult createUserAccount(
		@Valid @RequestBody CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserController_createUserAccount -> 사용자의 회원가입");
		if (userService.createUserAccount(createUserAccountRequestDto) >= 0)
			return ResponseResult.successResponse;
		return ResponseResult.failResponse;
	}

	@Operation(summary = "로그인", description = "사용자가 로그인 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그인 성공")
	})
	@PostMapping("/login")
	public ResponseResult login(@Valid @RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
		log.info("UserController_login -> 로그인 시도");
		LoginResponseDto loginResponseDto = userService.login(loginRequestDto, response);
		return new SingleResponseResult<>(loginResponseDto);
	}

	@Operation(summary = "로그아웃", description = "사용자가 로그아웃 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그아웃 성공"),
		@ApiResponse(responseCode = "400", description = "로그아웃 실패")
	})
	@GetMapping("/logout/{userLoginId}")
	public ResponseResult logout(@PathVariable String userLoginId) {
		log.info("UserController_logout -> 로그아웃 시도, userLoginId: {}", userLoginId);
		userService.logout(userLoginId);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "단어장 전체 조회", description = "사용자가 저장한 단어를 모두 조회합니다.")
	// @ApiResponse(responseCode = "440", description = "사용자가 존재하지 않습니다")
	@GetMapping("/word/{userId}")
	public ResponseResult getWordItemListByUserId(@PathVariable Long userId) {
		log.info("UserController_getWordItemListByUserId");
		return new ListResponseResult<>(userService.getWordItemListByUserId(userId));
	}

	@Operation(summary = "GetProfile", description = "프로필 조회")
	@GetMapping("/{userId}")
	public ResponseResult findUserByUserId(@PathVariable Long userId) {
		UserResponseDto userResponseDto = userService.findUserByUserId(userId);
		return new SingleResponseResult<>(userResponseDto);
	}

	@Operation(summary = "GetAllRecordItems", description = "개인별 전체 기록 조회")
	@GetMapping("/record/{userId}")
	public ResponseResult findByUserId(@PathVariable Long userId) {
		List<RecordResponseDto> recordResponseDto = userService.findByUserId(userId);

		return new SingleResponseResult<>(recordResponseDto);
	}

}
