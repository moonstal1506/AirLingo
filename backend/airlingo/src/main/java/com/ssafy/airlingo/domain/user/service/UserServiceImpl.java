package com.ssafy.airlingo.domain.user.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.RecordRepository;
import com.ssafy.airlingo.domain.user.repository.UserRepository;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final RecordRepository recordRepository;

	@Override
	@Transactional
	public Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserServiceImpl_createUserAccount -> 새로운 사용자 회원가입");
		User newUserAccount = createUserAccountRequestDto.toUserEntity();
		return userRepository.save(newUserAccount).getUserId();
	}

	@Override
	public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response) {
		log.info("UserServiceImpl_login -> 로그인");
		return LoginResponseDto;
	}

	@Override
	public UserResponseDto findUserByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		// 사용자를 찾지 못한 경우 일단 null
		if (user == null) {
			return null;
		}
		// User(Entity)를 UserResponseDto로 변환
		return user.toDto();
	}


	@Override
	public List<RecordResponseDto> findByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			// 사용자를 찾지 못한 경우 빈 리스트
			return Collections.emptyList();
		}

		List<RecordResponseDto> recordList = recordRepository.findRecordByUser(user).stream()
			.map(r -> r.toDto())
			.collect(Collectors.toList());
		return recordList;
	}

}
