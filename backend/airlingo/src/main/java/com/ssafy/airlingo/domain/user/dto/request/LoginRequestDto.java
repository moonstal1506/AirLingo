package com.ssafy.airlingo.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "(LoginRequestDto) 로그인 요청 DTO")
public class LoginRequestDto {

	@NotBlank
	@Schema(description = "로그인 ID", example = "airlingo")
	private String userLoginId;

	@NotBlank
	@Schema(description = "로그인 PW", example = "airlingo")
	private String userPassword;

}
