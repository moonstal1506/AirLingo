package com.ssafy.airlingo.domain.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.user.dto.request.AddInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.DeleteInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateBioRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateImageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdatePasswordRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.service.UserService;
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
@RequestMapping(value = "/api/user")
public class UserController {

	private final UserService userService;

	@Operation(summary = "Sign Up", description = "사용자가 회원가입 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "회원가입 성공")
	})
	@PostMapping("/signup")
	public ResponseResult createUserAccount(
		@Valid @RequestBody CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserController_createUserAccount -> 사용자의 회원가입");
		if (userService.createUserAccount(createUserAccountRequestDto) >= 0) {
			return ResponseResult.successResponse;
		}
		return ResponseResult.failResponse;
	}

	@Operation(summary = "Login", description = "사용자가 로그인 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그인 성공")
	})
	@PostMapping("/login")
	public ResponseResult login(@Valid @RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
		log.info("UserController_login -> 로그인 시도");
		LoginResponseDto loginResponseDto = userService.login(loginRequestDto, response);
		return new SingleResponseResult<>(loginResponseDto);
	}

	@Operation(summary = "Logout", description = "사용자가 로그아웃 합니다.")
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

	@Operation(summary = "Delete User Account", description = "회원탈퇴")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "회원탈퇴 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "회원탈퇴 실패"),
	})
	@DeleteMapping("/delete/{userId}")
	public ResponseResult deleteUserAccount(@PathVariable Long userId) {
		log.info("UserController_deleteUserAccount -> 회원탈퇴 시도, userId: {}", userId);
		userService.deleteUserAccount(userId);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Password", description = "사용자가 비밀번호 변경 합니다.")
	@PostMapping("/password")
	public ResponseResult updatePassword(@RequestBody UpdatePasswordRequestDto updatePasswordRequestDto) {
		log.info("UserController_updatePassword -> 비밀번호 변경");
		userService.updatePassword(updatePasswordRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Bio", description = "사용자가 자기소개를 변경 합니다.")
	@PostMapping("/bio")
	public ResponseResult updateBio(@RequestBody UpdateBioRequestDto updateBioRequestDto) {
		log.info("UserController_updateBio -> 자기소개 변경");
		userService.updateBio(updateBioRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Image", description = "사용자가 프로필 사진을 변경 합니다.")
	@PostMapping("/updateImage")
	public ResponseResult UpdateImage(@RequestBody UpdateImageRequestDto updateImageRequestDto) {
		log.info("UserController_UpdateImage -> 프로필 사진 변경");
		userService.updateImage(updateImageRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Delete Image", description = "사용자가 프로필 사진을 삭제 합니다.")
	@DeleteMapping("/deleteImage")
	public ResponseResult DeleteImage(Long userId) {
		log.info("UserController_UpdateImage -> 프로필 사진 삭제");
		userService.deleteImage(userId);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Add Interest Language", description = "사용자가 관심언어를 추가합니다.")
	@PostMapping("/language")
	public ResponseResult addInterestLanguage(@RequestBody AddInterestLanguageRequestDto interestLanguageRequestDto) {
		log.info("UserController_addInterestLanguage -> 관심 언어 추가");
		userService.addInterestLanguage(interestLanguageRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Delete Interest Language", description = "사용자가 관심언어를 삭제합니다.")
	@DeleteMapping("/language")
	public ResponseResult deleteInterestLanguage(
		@RequestBody DeleteInterestLanguageRequestDto deleteInterestLanguageRequestDto) {
		log.info("UserController_deleteInterestLanguage -> 관심 언어 삭제");
		userService.deleteInterestLanguage(deleteInterestLanguageRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "GetProfile", description = "프로필 조회")
	@GetMapping("/{userId}")
	public ResponseResult findUserByUserId(@PathVariable Long userId) {
		UserResponseDto userResponseDto = userService.findUserByUserId(userId);
		return new SingleResponseResult<>(userResponseDto);
	}

	@Operation(summary = "GetDailyGrid", description = "데일리 그리드 개수 조회")
	@GetMapping("/dailyGrid/{userId}")
	public ResponseResult getDailyGridList(@PathVariable Long userId) {
		List<DailyGridResponseDto> dailyGridResponseDto = userService.findDailyGridByUserId(userId);
		return new SingleResponseResult<>(dailyGridResponseDto);
	}
}
