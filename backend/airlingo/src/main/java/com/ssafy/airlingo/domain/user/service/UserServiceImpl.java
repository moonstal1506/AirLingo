package com.ssafy.airlingo.domain.user.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.language.repository.UserLanguageRepository;
import com.ssafy.airlingo.domain.user.dto.request.AddInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.DeleteImageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.DeleteInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateBioRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateImageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdatePasswordRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UserRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.entity.DailyGrid;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.DailyGridRepository;
import com.ssafy.airlingo.domain.language.repository.RecordRepository;
import com.ssafy.airlingo.domain.user.repository.RefreshTokenRepository;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.domain.word.repository.WordRepository;
import com.ssafy.airlingo.global.exception.NotExistAccountException;
import com.ssafy.airlingo.global.util.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private static final String DEFAULT_IMAGE = "https://www.google.com/url?sE";

	private final UserRepository userRepository;
	private final RecordRepository recordRepository;
	private final JwtService jwtService;
	private final RefreshTokenRepository refreshTokenRepository;
	private final WordRepository wordRepository;
	private final LanguageRepository languageRepository;
	private final GradeRepository gradeRepository;
	private final DailyGridRepository dailyGridRepository;
	private final UserLanguageRepository userLanguageRepository;

	@Override
	@Transactional
	public Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserServiceImpl_createUserAccount -> 새로운 사용자 회원가입");
		User newUserAccount = createUserAccountRequestDto.toUserEntity(languageRepository, gradeRepository);
		return userRepository.save(newUserAccount).getUserId();
	}

	@Override
	public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response) {
		log.info("UserServiceImpl_login -> 사용자 로그인 시도");
		User loginUser = findUserByUserLoginIdAndUserPassword(loginRequestDto.getUserLoginId(),
			loginRequestDto.getUserPassword());
		LoginResponseDto loginResponseDto = loginUser.toLoginResponseDto();

		setToken(loginUser, response);
		return loginResponseDto;
	}

	@Override
	public User findUserByUserLoginIdAndUserPassword(String userLoginId, String userPassword) {
		log.info("UserServiceImpl_findUserByUserLoginIdAndPassword -> ID, PW로 유저 찾기");
		try {
			return userRepository.findUserByUserLoginIdAndUserPassword(userLoginId, userPassword);
		} catch (Exception e) {
			throw new NotExistAccountException();
		}
	}

	@Override
	public void setToken(User loginUser, HttpServletResponse response) {
		log.info("UserServiceImpl_setToken -> 로그인 성공, 토큰 생성");
		String accessToken = jwtService.createAccessToken("userLoginId", loginUser.getUserLoginId()); // key, value
		String refreshToken = jwtService.createRefreshToken("userLoginId", loginUser.getUserLoginId()); // key, value

		response.setHeader("access-token", accessToken);
		response.setHeader("refresh-token", refreshToken);

		refreshTokenRepository.saveRefreshToken(loginUser.getUserLoginId(), refreshToken);
	}

	@Override
	public void logout(String userLoginId) {
		log.info("UserServiceImpl_logout -> 로그아웃 중");
		refreshTokenRepository.deleteRefreshToken(userLoginId);
	}

	@Override
	@Transactional
	public void updatePassword(UpdatePasswordRequestDto updatePasswordRequestDto) {
		log.info("UserServiceImpl_updatePassword");
		User user = userRepository.findById(updatePasswordRequestDto.getUserId()).get();
		user.updatePassword(updatePasswordRequestDto.getUserPassword());
	}

	@Override
	@Transactional
	public void updateBio(UpdateBioRequestDto updateBioRequestDto) {
		log.info("UserServiceImpl_updateBio");
		User user = userRepository.findById(updateBioRequestDto.getUserId()).get();
		user.updateBio(updateBioRequestDto.getUserBio());
	}

	@Override
	@Transactional
	public void updateImage(UpdateImageRequestDto updateImageRequestDto) {
		log.info("UserServiceImpl_updateImage");
		User user = userRepository.findById(updateImageRequestDto.getUserId()).get();
		user.updateImage(updateImageRequestDto.getUserImgUrl());
	}

	@Override
	@Transactional
	public void deleteImage(Long userId) {
		log.info("UserServiceImpl_deleteImage");
		User user = userRepository.findById(userId).get();
		user.updateImage(DEFAULT_IMAGE);
	}

	@Override
	@Transactional
	public void addInterestLanguage(AddInterestLanguageRequestDto addInterestLanguageRequestDto) {
		log.info("UserServiceImpl_addInterestLanguage");
		User user = userRepository.findById(addInterestLanguageRequestDto.getUserId()).get();
		Language language = languageRepository.findByLanguageId(addInterestLanguageRequestDto.getLanguageId());
		Grade grade = gradeRepository.findByGradeId(addInterestLanguageRequestDto.getGradeId());
		UserLanguage userLanguage = UserLanguage.builder()
			.user(user)
			.language(language)
			.grade(grade)
			.build();
		userLanguageRepository.save(userLanguage);
	}


	@Override
	@Transactional
	public void deleteInterestLanguage(DeleteInterestLanguageRequestDto deleteInterestLanguageRequestDto) {
		log.info("UserServiceImpl_deleteInterestLanguage");
		User user = userRepository.findById(deleteInterestLanguageRequestDto.getUserId()).get();
		Language language = languageRepository.findByLanguageId(deleteInterestLanguageRequestDto.getLanguageId());

		userLanguageRepository.deleteByUserAndLanguage(user,language);
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

	public List<DailyGridResponseDto> findDailyGridByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			// 사용자를 찾지 못한 경우 빈 리스트 반환
			return Collections.emptyList();
		}
		List<DailyGridResponseDto> dailyGridList = dailyGridRepository.findDailyGridByUser(user)
			.stream()
			.map(DailyGrid::toDto)
			.collect(Collectors.toList());
		return dailyGridList;
	}
}
