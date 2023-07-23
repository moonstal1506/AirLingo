package com.ssafy.airlingo.global.util;

import java.security.SecureRandom;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
	public static final Logger logger = LoggerFactory.getLogger(JwtService.class);

	private static final int KEY_SIZE_BITS = 256; // 키의 비트 수 (256비트 사용)

	private static final int ACCESS_TOKEN_EXPIRE_MINUTES = 30; // minutes
	private static final int REFRESH_TOKEN_EXPIRE_MINUTES = 2; // weeks

	public <T> String createAccessToken(String key, T data) {
		return create("access-token", key, data, 1000 * 60 * ACCESS_TOKEN_EXPIRE_MINUTES); // ms
	}

	public <T> String createRefreshToken(String key, T data) {
		return create("refresh-token", key, data, 1000 * 60 * 60 * 24 * 7 * REFRESH_TOKEN_EXPIRE_MINUTES); // ms
	}

	/**
	 * subject : sub의 value로 들어갈 토큰 제목
	 * key : claim의 키
	 * data : claim에 담을 value
	 * expire : 토큰 유효기간 설정을 위한 값(밀리초 단위)
	 * jwt 토큰의 구성 : header+payload+signature
	 */
	public <T> String create(String subject, String key, T data, long expire) {
		// Payload : 토큰 제목 (Subject), 생성일 (IssuedAt), 유효기간 (Expiration), 데이터 (Claim)
		Claims claims = Jwts.claims()
			// 토큰 제목 access-token/refresh-token
			.setSubject(subject)
			// 생성일
			.setIssuedAt(new Date())
			// 만료일 (유효기간)
			.setExpiration(new Date(System.currentTimeMillis() + expire));

		// 저장할 data의 key, value => loginId, loginUser.getUserLoginId()
		claims.put(key, data);

		String jwt = Jwts.builder()
			// Header : 해쉬 알고리즘, 토큰 타입
			.setHeaderParam("alg", "HS256")
			.setHeaderParam("typ", "JWT")
			// Payload
			.setClaims(claims)
			// Signature : secret key를 활용한 암호화
			.signWith(SignatureAlgorithm.HS256, this.generateKey())
			.compact(); // 직렬화 처리

		return jwt;
	}

	// Signature에 사용될 secret key 생성
	private byte[] generateKey() {
		byte[] keyBytes = new byte[KEY_SIZE_BITS / 8];
		SecureRandom secureRandom = new SecureRandom();
		secureRandom.nextBytes(keyBytes);
		return Keys.hmacShaKeyFor(keyBytes).getEncoded();
	}

	// //	전달 받은 토큰이 제대로 생성된것인지 확인 하고 문제가 있다면 UnauthorizedException을 발생.
	// public boolean checkToken(String jwt) {
	// 	try {
	// 		// setSigningKey : JWS 서명 검증을 위한  secret key 세팅
	// 		// parseClaimsJws : 파싱하여 원본 jws 만들기
	// 		Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
	// 		// Claims 는 Map의 구현체 형태
	// 		logger.debug("claims: {}", claims);
	// 		return true;
	// 	} catch (Exception e) {
	// 		logger.error(e.getMessage());
	// 		throw new ExpiredRefreshTokenException();
	// 	}
	// }
	//
	// public Map<String, Object> get(String key) {
	// 	HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes())
	// 		.getRequest();
	// 	String jwt = request.getHeader("access-token");
	// 	Jws<Claims> claims = null;
	// 	try {
	// 		claims = Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(jwt);
	// 	} catch (Exception e) {
	// 		throw new ExpiredRefreshTokenException();
	// 	}
	// 	Map<String, Object> value = claims.getBody();
	// 	logger.info("value : {}", value);
	// 	return value;
	// }
}
