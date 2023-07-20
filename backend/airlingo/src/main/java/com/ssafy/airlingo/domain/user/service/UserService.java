package com.ssafy.airlingo.domain.user.service;

import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.entity.User;

public interface UserService {
	Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto);
}
