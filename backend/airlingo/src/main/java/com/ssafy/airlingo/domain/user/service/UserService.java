package com.ssafy.airlingo.domain.user.service;

import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;

public interface UserService {
	int createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto);
}
