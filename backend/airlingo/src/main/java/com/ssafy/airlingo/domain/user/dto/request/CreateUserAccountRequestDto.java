package com.ssafy.airlingo.domain.user.dto.request;

import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.user.entity.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Schema(description = "(CreateUserAccountRequestDto) 회원가입 요청 DTO")
public class CreateUserAccountRequestDto {
	@NotBlank
	@Schema(description = "사용자 닉네임")
	private String userNickname;

	@NotBlank
	@Schema(description = "사용자 로그인 ID")
	private String userLoginId;

	@NotBlank
	@Schema(description = "사용자 비밀번호")
	private String userPassword;

	@Email
	@Schema(description = "사용자 이메일")
	private String userEmail;

	@NotBlank
	@Schema(description = "사용자 모국어")
	private Language userNativeLanguage;

	public User toUserEntity() {
		return User.builder()
			.userNickname(userNickname)
			.userLoginId(userLoginId)
			.userPassword(userPassword)
			.userEmail(userEmail)
			.userNativeLanguage(userNativeLanguage)
			.build();
	}

}
