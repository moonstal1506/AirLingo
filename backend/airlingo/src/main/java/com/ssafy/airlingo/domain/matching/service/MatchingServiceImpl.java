package com.ssafy.airlingo.domain.matching.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.domain.report.dto.request.ReportUserRequestDto;
import com.ssafy.airlingo.domain.report.entity.ReportItem;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

	private final UserRepository userRepository;

	@Transactional
	@Override
	public MatchingUserDto findMatchingUser(MatchingRequestDto matchingRequestDto){
		log.info("findMatchingUser");
		User user = userRepository.findById(matchingRequestDto.getUserId()).orElseThrow(() -> {
			throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
		});

		return user.toMatchingUserDto(matchingRequestDto);
	}
}
