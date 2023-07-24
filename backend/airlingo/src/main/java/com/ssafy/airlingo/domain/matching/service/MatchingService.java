package com.ssafy.airlingo.domain.matching.service;

import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;

public interface MatchingService {

	MatchingUserDto findMatchingUser(MatchingRequestDto matchingRequestDto);
}
