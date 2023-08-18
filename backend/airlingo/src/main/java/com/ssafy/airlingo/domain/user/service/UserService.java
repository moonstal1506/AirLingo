package com.ssafy.airlingo.domain.user.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.airlingo.domain.S3.dto.S3FileDto;
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
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.global.response.ResponseResult;

import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
	// 회원가입 관련
	Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto);

	// 로그인 관련
	LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response);

	void setToken(User loginUser, HttpServletResponse response);

	// 로그아웃 관련
	void logout(String userLoginId);

	void tmpLogout(String authorizationHeader);

	// 회원탈퇴
	void deleteUserAccount(Long userId);

	// 프로필 조회 관련
	UserResponseDto findUserByUserId(Long userId);

	// 데일리 그리드
	List<DailyGridResponseDto> findDailyGridByUserId(Long userId);

	// 비밀번호 변경
	void updatePassword(UpdatePasswordRequestDto updatePasswordRequestDto);

	// 닉네임 변경
	void updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto);

	// 자기소개 변경
	void updateBio(UpdateBioRequestDto updateBioRequestDto);

	//프로필 사진 변경
	List<S3FileDto> uploadFiles(List<MultipartFile> multipartFiles, Long userId);

	//프로필 사진 삭제
	String deleteImage(Long userId);

	// 관심 언어 추가
	void addInterestLanguage(AddInterestLanguageRequestDto addInterestLanguageRequestDto);

	// 관심 언어 삭제
	void deleteInterestLanguage(DeleteInterestLanguageRequestDto deleteInterestLanguageRequestDto);

	//로그인ID 중복 체크
	void checkDuplicationLoginId(String loginId);

	//이메일 중복 체크
	void checkDuplicationEmail(String email);

	//닉네임 중복 체크
	void checkDuplicationNickname(String nickname);
}
