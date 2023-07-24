package com.ssafy.airlingo.domain.matching.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.stream.Collectors;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ssafy.airlingo.domain.matching.request.MatchingUserDto;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class Matching {

	private final String URL = "http://localhost:8080/api/matching/result";

	private Queue<MatchingUserDto> matchingList = new LinkedList<>();

	/**
	 * 매칭 조건
	 * 1. 사용자 언어
	 *
	 * 사용자 마일리지 사용여부
	 * 2. 사용자 실력
	 * 3. 사용자 별점
	 */
	@Scheduled(fixedDelay = 10000, initialDelay = 1000) // 1초 후 10초마다 동작
	public void matching() {
		log.info("matching start");
		if (matchingList.size() > 1) {
			MatchingUserDto matchingUser1 = matchingList.poll();
			List<MatchingUserDto> matchingRequestDtoList = matchingList.stream()
				.filter(waitingUser -> waitingUser.getUserNativeLanguage().equals(matchingUser1.getUserStudyLanguage())
					&& matchingUser1.getUserNativeLanguage().equals(waitingUser.getUserStudyLanguage()))
				.collect(Collectors.toList());

			// 매칭 실패 대기열 재진입
			if(matchingRequestDtoList.isEmpty()){
				log.info("matching fail");
				matchingList.add(matchingUser1);
				return;
			}

			MatchingUserDto matchingUser2 = matchingRequestDtoList.get(0);
			matchingList.remove(matchingUser2);
			sendMatching(new MatchingResponseDto(matchingUser1, matchingUser2));
		}
	}

	public void sendMatching(MatchingResponseDto matchingResponseDto) {
		log.info("matching success : " + matchingResponseDto.toString());
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<?> requestMessage = new HttpEntity<>(matchingResponseDto, httpHeaders);
		restTemplate.postForEntity(URL, requestMessage, MatchingResponseDto.class);
	}

	public void add(MatchingUserDto matchingUserDto) {
		matchingList.add(matchingUserDto);
	}
}
