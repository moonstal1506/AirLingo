package com.ssafy.airlingo.domain.matching.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
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

	@Transactional
	@Override
	public MatchingUserDto findMatchingUser(MatchingRequestDto matchingRequestDto) {
		log.info("findMatchingUser");
		User user = userRepository.findById(matchingRequestDto.getUserId()).get();

		// 프리미엄 매칭 가능 여부
		if (matchingRequestDto.isPremium()) {
			if (user.isImpossiblePremiumMatching(PREMIUM_MILEAGE)) {
				throw new NotEnoughMileageException();
			}
		}
		return user.toMatchingUserDto(matchingRequestDto);
	}
}
