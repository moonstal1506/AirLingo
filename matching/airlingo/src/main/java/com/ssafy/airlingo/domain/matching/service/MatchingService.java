package com.ssafy.airlingo.domain.matching.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
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
public class MatchingService {

	private static final int PREMIUM_GRADE_SCORE = 4;
	private static final int PREMIUM_USER_RATING = 4;
	private static final String URL = "http://localhost:8081/api/matching/result";
	private static final String FAIL_URL = "http://localhost:8081/api/matching/result-fail";

	private Queue<MatchingUserDto> matchingList = new LinkedList<>();
	private Queue<MatchingUserDto> matchingFailList = new LinkedList<>();
	private Queue<MatchingUserDto> matchingFinalFailList = new LinkedList<>();
	private final Object lock = new Object();

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
		log.info("MatchingService matching size: {}", matchingList.size());
		synchronized (lock) {
			while (matchingList.size() >= 1) {
				MatchingUserDto matchingUser1 = matchingList.poll();

				// 매칭 가능 유저 필터링
				Optional<MatchingUserDto> matchingUserDto = matchingList.stream()
					.filter(waitingUser -> isPossibleUser(matchingUser1, waitingUser))
					.findFirst();

				// 매칭 실패 대기열 재진입
				if (!matchingUserDto.isPresent()) {
					log.info("MatchingService matching fail");
					matchingFailList.add(matchingUser1);
					continue;
				}

				// 매칭 결과 반환
				MatchingUserDto matchingUser2 = matchingUserDto.get();
				matchingList.remove(matchingUser2);
				sendMatching(new MatchingResponseDto(matchingUser1, matchingUser2));
			}

			//매칭 실패한 유저 실패COUNT +1
			matchingFailList.stream().forEach(m -> m.addMatchingCount());
			matchingFailList.stream().forEach(m -> System.out.println("m.getMatchingFailCount() = " + m.getMatchingFailCount()));

			//매칭 실패 COUNT가 3회 이상인 유저들에게 실패 메시지 전송
			List<MatchingUserDto> finalFailUserList = matchingFailList.stream()
				.filter(m -> m.getMatchingFailCount() >= 3)
				.collect(Collectors.toList());

			if(finalFailUserList.size() > 0)
				sendFinalFailMatching(finalFailUserList);

			matchingList.addAll(matchingFailList.stream()
				.filter(m -> m.getMatchingFailCount() < 3)
				.collect(Collectors.toList()));
			matchingFailList = new LinkedList<>();
		}
	}

	private boolean isPossibleUser(MatchingUserDto matchingUser, MatchingUserDto waitingUser) {
		log.info("MatchingService_isPossibleUser matchingUser: {}, waitingUser: {}", matchingUser, waitingUser);
		// 언어 필터링
		if (!matchingUser.isMatchLanguage(waitingUser)) {
			return false;
		}
		// 둘다 프리미엄일 경우 둘다 프리미엄 기준을 통과해야한다.
		if (matchingUser.isPremium() && waitingUser.isPremium()) {
			return matchingUser.isPossiblePremiumUser(PREMIUM_GRADE_SCORE, PREMIUM_USER_RATING)
				&& waitingUser.isPossiblePremiumUser(PREMIUM_GRADE_SCORE, PREMIUM_USER_RATING);
		}
		// 현재 매칭 유저만 프리미엄일 경우 상대만 프리미엄 기준을 통과하면 된다.
		if (matchingUser.isPremium()) {
			return waitingUser.isPossiblePremiumUser(PREMIUM_GRADE_SCORE, PREMIUM_USER_RATING);
		}
		// 조건없이 매칭
		return true;
	}

	public void sendMatching(MatchingResponseDto matchingResponseDto) {
		log.info("MatchingService_sendMatching matching success : " + matchingResponseDto.toString());
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<?> requestMessage = new HttpEntity<>(matchingResponseDto, httpHeaders);
		restTemplate.postForEntity(URL, requestMessage, MatchingResponseDto.class);
	}

	public void sendFinalFailMatching(List<MatchingUserDto> matchingUserFailList){
		log.info("MatchingService_sendMatching matching fail ");
		log.info(matchingUserFailList.toString());

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<?> requestMessage = new HttpEntity<>(matchingUserFailList, httpHeaders);
		restTemplate.postForEntity(FAIL_URL, requestMessage, List.class);
	}

	public void add(MatchingUserDto matchingUserDto) {
		matchingList.add(matchingUserDto);
	}

	public int countWaitingUsers() {
		return matchingList.size();
	}

	public void cancelMatching(Long userId) {
		synchronized (lock) {
			matchingList= matchingList.stream().
				filter(m -> !m.getUserId().equals(userId))
				.collect(Collectors.toCollection(LinkedList::new));

		}
	}
}
