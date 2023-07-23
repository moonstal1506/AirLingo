package com.ssafy.airlingo.domain.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Schema(description = "(LoginResponseDto) 로그인 요청 후 반환 DTO - 로그인 성공한 사용자의 ID, 닉네임 반환")
public class LoginResponseDto {
	@Schema(description = "로그인유저 PK")
	private Long userId;

	@Schema(description = "로그인유저 로그인 ID")
	private String userLoginId;

	@Schema(description = "로그인유저 닉네임")
	private String userNickname;
}
