package com.ssafy.airlingo.domain.user.service;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;

public interface UserService {
	Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto);
	UserResponseDto findUserByUserId(Long userId);
	List<RecordResponseDto> findByUserId(Long userId);
}
