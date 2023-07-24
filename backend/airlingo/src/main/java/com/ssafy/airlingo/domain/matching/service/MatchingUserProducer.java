package com.ssafy.airlingo.domain.matching.service;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.global.rabbitmq.Producer;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MatchingUserProducer {

	private final Producer producer;

	private static final String EXCHANGE = "matching.exchange";
	private static final String ROUTE_KEY = "matching.key";

	public void sendMatchingUser(MatchingUserDto matchingUserDto) {
		producer.producer(EXCHANGE, ROUTE_KEY, matchingUserDto);
	}
}
