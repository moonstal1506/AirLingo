package com.ssafy.airlingo.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "(LoginRequestDto) 로그인 요청 DTO")
public class LoginRequestDto {

	@NotBlank
	@Schema(description = "로그인 ID")
	private String loginId;

	@NotBlank
	@Schema(description = "로그인 PW")
	private String password;

}
