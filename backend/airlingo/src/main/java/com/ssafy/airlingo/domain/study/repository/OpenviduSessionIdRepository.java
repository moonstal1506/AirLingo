package com.ssafy.airlingo.domain.study.repository;

import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class OpenviduSessionIdRepository {

	private RedisTemplate<String, String> redisTemplate;

	public OpenviduSessionIdRepository(RedisTemplate<String, String> redisTemplate,
		RedisConnectionFactory redisConnectionFactory) {
		this.redisTemplate = redisTemplate;
		this.redisTemplate.setConnectionFactory(redisConnectionFactory);
		this.redisTemplate.afterPropertiesSet();
	}

	public void saveSessionId(String sessionId) {
		log.info("OpenviduSessionIdRepository_saveSessionId -> 세션ID 저장");
		redisTemplate.opsForValue().set("openvidu_" + sessionId, "true");
	}

	public boolean existsSessionId(String sessionId) {
		log.info("OpenviduSessionIdRepository_existsSessionId -> 세션ID 존재 확인");
		log.info(sessionId);
		log.info(redisTemplate.hasKey("openvidu_" + sessionId) ? "존재" : "존재하지않음");
		return redisTemplate.hasKey("openvidu_" + sessionId);
	}

	public void deleteSessionId(String sessionId) {
		log.info("OpenviduSessionIdRepository_deleteSessionId -> 세션ID 삭제");
		redisTemplate.delete("openvidu_" + sessionId);
	}
}
