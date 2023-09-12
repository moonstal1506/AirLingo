package com.ssafy.airlingo.domain.matching.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.ssafy.airlingo.domain.matching.request.MatchingUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class MatchingUserConsumer {

    private final MatchingService matchingService;

    @RabbitListener(queues = "matching.queue")
    public void matchingUserConsumer(MatchingUserDto matchingRequestDto) {
        log.info("matchingUserConsumer: {}", matchingRequestDto);
        matchingService.add(matchingRequestDto);
    }
}
