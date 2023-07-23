package com.ssafy.airlingo.domain.user.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.ssafy.airlingo.global.exception.NotExistAccountException;
import com.ssafy.airlingo.global.util.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final RecordRepository recordRepository;
	private final JwtService jwtService;

	@Override
	@Transactional
	public Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserServiceImpl_createUserAccount -> 새로운 사용자 회원가입");
		User newUserAccount = createUserAccountRequestDto.toUserEntity();
		return userRepository.save(newUserAccount).getUserId();
	}

	@Override
	public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response) throws
		NotExistAccountException {
		log.info("UserServiceImpl_login -> 사용자 로그인 시도");
		User loginUser = findUserByUserLoginId(loginRequestDto.getUserLoginId());
		if (loginUser == null)
			throw new NotExistAccountException();
		LoginResponseDto loginResponseDto = loginUser.toLoginResponseDto();

		setToken(loginUser, response);
		return loginResponseDto;
	}

	@Override
	public User findUserByUserLoginId(String userLoginId) {
		log.info("로그인ID로 유저 찾기");
		try {
			return userRepository.findUserByUserLoginId(userLoginId);
		} catch (Exception e) {
			throw new NotExistAccountException();
		}
	}

	@Override
	public void setToken(User loginUser, HttpServletResponse response) {
		log.info("로그인 성공 -> 토큰 생성");
		String accessToken = jwtService.createAccessToken("userLoginId", loginUser.getUserLoginId()); // key, value
		String refreshToken = jwtService.createRefreshToken("userLoginId", loginUser.getUserLoginId()); // key, value
		Map<String, String> map = new HashMap<String, String>();
		map.put("userLoginId", loginUser.getUserLoginId());
		map.put("token", refreshToken);
		response.setHeader("access-token", accessToken);
		response.setHeader("refresh-token", refreshToken);

		// userRepository.saveRefreshToken(map);
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
