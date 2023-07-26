package com.ssafy.airlingo.domain.matching.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.language.repository.UserLanguageRepository;
import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.global.exception.NotEnoughMileageException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

	private static final int PREMIUM_MILEAGE = 3000;

	private final UserRepository userRepository;
	private final LanguageRepository languageRepository;
	private final UserLanguageRepository userLanguageRepository;

	@Transactional
	@Override
	public MatchingUserDto findMatchingUser(MatchingRequestDto matchingRequestDto) {
		log.info("findMatchingUser");
		User user = userRepository.findById(matchingRequestDto.getUserId()).get();
		Language studyLanguage = languageRepository.findById(matchingRequestDto.getStudyLanguageId()).get();
		UserLanguage userLanguage = userLanguageRepository.findByUserAndLanguage(user, studyLanguage);

		// 프리미엄 매칭 가능 여부
		if (matchingRequestDto.isPremium()) {
			if (user.isImpossiblePremiumMatching(PREMIUM_MILEAGE)) {
				throw new NotEnoughMileageException();
			}
		}

		return MatchingUserDto.toMatchingUserDto(user, userLanguage, matchingRequestDto.isPremium());
	}

	public void useMileage(MatchingResponseDto matchingResponseDto) {
		useMileage(matchingResponseDto.getUser1());
		useMileage(matchingResponseDto.getUser2());
	}

	private void useMileage(MatchingUserDto matchingUser) {
		if (matchingUser.isPremium()) {
			User user = userRepository.findById(matchingUser.getUserId()).get();
			user.useMileage(PREMIUM_MILEAGE);
		}
	}
}

