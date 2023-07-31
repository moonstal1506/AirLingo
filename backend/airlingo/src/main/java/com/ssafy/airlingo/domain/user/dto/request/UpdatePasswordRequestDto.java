package com.ssafy.airlingo.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "(UpdatePasswordRequestDto) 비밀번호 변경 요청 DTO")
public class UpdatePasswordRequestDto {

	@NotNull
	@Schema(description = "유저 ID")
	private Long userId;

	@NotBlank
	@Schema(description = "로그인 PW")
	private String userPassword;

}
