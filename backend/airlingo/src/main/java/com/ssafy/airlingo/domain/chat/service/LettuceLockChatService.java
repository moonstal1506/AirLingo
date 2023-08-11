package com.ssafy.airlingo.domain.chat.service;

import com.ssafy.airlingo.domain.chat.repository.RedisLockRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LettuceLockChatService {

	private final RedisLockRepository redisLockRepository;
	private final ChatService chatService;

	public void createRoomAndEnterRoom(String roomId) throws InterruptedException {
		while (!redisLockRepository.lock(roomId)) {
			Thread.sleep(100);
		}

		try {
			chatService.createRoomAndEnterRoom(roomId);
		} finally {
			redisLockRepository.unlock(roomId);
		}
	}
}
