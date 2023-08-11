package com.ssafy.airlingo.domain.matching.service;

import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.ConcurrentUsersResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.domain.matching.response.PremiumResponseDto;

public interface MatchingService {

	MatchingUserDto findMatchingUser(MatchingRequestDto matchingRequestDto);

	void updateMileage(MatchingResponseDto matchingResponseDto);

	ConcurrentUsersResponseDto getConcurrentUsersSize();

	Long createStudy(MatchingResponseDto matchingResponseDto);

	PremiumResponseDto isPossiblePremiumMatching(Long userId);
}
