package com.ssafy.airlingo.domain.user.service;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.WordResponseDto;
import com.ssafy.airlingo.domain.user.entity.User;

import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
	// 회원가입 관련
	Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto);

	// 로그인 관련
	LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response);

	User findUserByUserLoginIdAndUserPassword(String userLoginId, String userPassword);

	void setToken(User loginUser, HttpServletResponse response);

	// 로그아웃 관련
	void logout(String userLoginId);

	// 프로필 조회 관련
	UserResponseDto findUserByUserId(Long userId);

	List<DailyGridResponseDto> findDailyGridByUserId(Long userId);

	List<RecordResponseDto> findByUserId(Long userId);

	// 단어장 관련
	List<WordResponseDto> getWordListByUserId(Long userId);

	List<WordResponseDto> getWordTestListByUserId(Long userId);

	void deleteWordByWordId(Long wordId);

}
