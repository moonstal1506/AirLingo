package com.ssafy.airlingo.domain.user.repository;

import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class RefreshTokenRepository {

	private static final String REFRESH_TOKEN_KEY_PREFIX = "refreshToken:";

	private final RedisTemplate<String, String> redisTemplate;
	private final HashOperations<String, String, String> hashOperations;

	public RefreshTokenRepository(RedisTemplate<String, String> redisTemplate,
		RedisConnectionFactory redisConnectionFactory) {
		this.redisTemplate = redisTemplate;
		this.redisTemplate.setConnectionFactory(redisConnectionFactory);
		this.redisTemplate.afterPropertiesSet();
		this.hashOperations = redisTemplate.opsForHash();
	}

	public void saveRefreshToken(String userLoginId, String refreshToken) {
		log.info("RefreshTokenRepository_saveRefreshToken -> 토큰 저장");
		String key = getRefreshTokenKey(userLoginId);
		hashOperations.put(key, "token", refreshToken);
	}

	public String findRefreshToken(String userLoginId) {
		String key = getRefreshTokenKey(userLoginId);
		return hashOperations.get(key, "token");
	}

	public void deleteRefreshToken(String userLoginId) {
		log.info("RefreshTokenRepository_deleteRefreshToken -> 토큰 삭제");
		String key = getRefreshTokenKey(userLoginId);
		redisTemplate.delete(key);
	}

	private String getRefreshTokenKey(String userLoginId) {
		return REFRESH_TOKEN_KEY_PREFIX + userLoginId;
	}

	public Long countConcurrentUsers() {
		log.info("countConcurrentUsers -> 토큰 개수로 동시접속자 수 확인");
		return redisTemplate.execute((RedisCallback<Long>)connection -> connection.dbSize());
	}
}

