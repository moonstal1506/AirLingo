package com.ssafy.airlingo.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Override
	@Transactional
	public Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserServiceImpl_createUserAccount -> 새로운 사용자 회원가입");
		User newUserAccount = createUserAccountRequestDto.toUserEntity();
		return userRepository.save(newUserAccount).getUserId();
	}

}
