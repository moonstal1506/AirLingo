package com.ssafy.airlingo.domain.study.service;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.chat.repository.RedisLockRepository;
import com.ssafy.airlingo.global.openvidu.OpenViduManager;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LettuceLockOpenviduService {

	private final RedisLockRepository redisLockRepository;
	private final OpenViduManager openViduManager;

	public Recording startRecording(String sessionId) throws
		InterruptedException,
		OpenViduJavaClientException,
		OpenViduHttpException {
		while (!redisLockRepository.lock(sessionId)) {
			Thread.sleep(200);
		}
		Recording recording = null;
		try {
			recording = openViduManager.startRecording(sessionId);
		} finally {
			redisLockRepository.unlock(sessionId);
		}
		return recording;
	}

	public Recording stopRecording(String recordingId) throws
		InterruptedException,
		OpenViduJavaClientException,
		OpenViduHttpException {
		while (!redisLockRepository.lock(recordingId)) {
			Thread.sleep(200);
		}
		Recording recording = null;
		try {
			recording = openViduManager.stopRecording(recordingId);
		} finally {
			redisLockRepository.unlock(recordingId);
		}
		return recording;
	}
}
