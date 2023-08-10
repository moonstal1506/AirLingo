package com.ssafy.airlingo.domain.user.controller;

import java.util.List;

import com.ssafy.airlingo.domain.S3.dto.S3FileDto;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.airlingo.domain.S3.service.Amazon3SService;
import com.ssafy.airlingo.domain.user.dto.request.AddInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.DeleteInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateBioRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdatePasswordRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.service.UserService;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
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
	@DeleteMapping("/{userId}")
	public ResponseResult deleteUserAccount(@PathVariable Long userId) {
		log.info("UserController_deleteUserAccount -> 회원탈퇴 시도, userId: {}", userId);
		userService.deleteUserAccount(userId);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Password", description = "사용자가 비밀번호 변경 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "비밀번호 변경 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "비밀번호 변경 실패")
	})
	@PatchMapping("/password")
	public ResponseResult updatePassword(@RequestBody UpdatePasswordRequestDto updatePasswordRequestDto) {
		log.info("UserController_updatePassword -> 비밀번호 변경");
		userService.updatePassword(updatePasswordRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Nickname", description = "사용자가 닉네임를 변경 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "닉네임 변경 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "닉네임 변경 실패")
	})
	@PatchMapping("/nickname")
	public ResponseResult updateNickname(@RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
		log.info("UserController_updateNickname -> 닉네임 변경");
		userService.updateNickname(updateNicknameRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Bio", description = "사용자가 자기소개를 변경 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "자기소개 변경 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "자기소개 변경 실패")
	})
	@PatchMapping("/bio")
	public ResponseResult updateBio(@RequestBody UpdateBioRequestDto updateBioRequestDto) {
		log.info("UserController_updateBio -> 자기소개 변경");
		userService.updateBio(updateBioRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Update Image", description = "사용자가 프로필 사진을 변경 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "프로필사진 변경 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "프로필사진 변경 실패"),
		@ApiResponse(responseCode = "491", description = "사진 파일이 비어 있습니다.")
	})
	@PatchMapping("/updateImage")
	public ResponseResult updateImage(@RequestPart(value = "files") List<MultipartFile> multipartFiles, Long userId) {
		log.info("UserController_UpdateImage -> 프로필 사진 변경");
		return new SingleResponseResult<>(userService.uploadFiles(multipartFiles, userId).get(0));
	}

	@Operation(summary = "Delete Image", description = "사용자가 프로필 사진을 삭제 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "프로필사진 삭제 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "프로필사진 삭제 실패")
	})
	@DeleteMapping("/deleteImage")
	public ResponseResult DeleteImage(Long userId) {
		log.info("UserController_UpdateImage -> 프로필 사진 삭제");
		return new SingleResponseResult<>(userService.deleteImage(userId));
	}

	@Operation(summary = "Add Interest Language", description = "사용자가 관심언어를 추가합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "관심언어 추가 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "관심언어 추가 실패")
	})
	@PostMapping("/language")
	public ResponseResult addInterestLanguage(@RequestBody AddInterestLanguageRequestDto interestLanguageRequestDto) {
		log.info("UserController_addInterestLanguage -> 관심 언어 추가");
		userService.addInterestLanguage(interestLanguageRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Delete Interest Language", description = "사용자가 관심언어를 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "관심언어 삭제 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "관심언어 삭제 실패")
	})
	@DeleteMapping("/language")
	public ResponseResult deleteInterestLanguage(
		@RequestBody DeleteInterestLanguageRequestDto deleteInterestLanguageRequestDto) {
		log.info("UserController_deleteInterestLanguage -> 관심 언어 삭제");
		userService.deleteInterestLanguage(deleteInterestLanguageRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Get Profile", description = "프로필 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "프로필조회 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "프로필조회 실패")
	})
	@GetMapping("/{userId}")
	public ResponseResult findUserByUserId(@PathVariable Long userId) {
		log.info("UserController_findUserByUserId -> 프로필 조회");
		UserResponseDto userResponseDto = userService.findUserByUserId(userId);
		return new SingleResponseResult<>(userResponseDto);
	}

	@Operation(summary = "Get Daily Grid", description = "데일리 그리드 개수 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "데일리그리드 조회 성공"),
		@ApiResponse(responseCode = "470", description = "회원이 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "데일리그리드 조회 실패")
	})
	@GetMapping("/dailyGrid/{userId}")
	public ResponseResult getDailyGridList(@PathVariable Long userId) {
		log.info("UserController_getDailyGridList -> 데일리 그리드 조회");
		List<DailyGridResponseDto> dailyGridResponseDto = userService.findDailyGridByUserId(userId);
		return new SingleResponseResult<>(dailyGridResponseDto);
	}
}
