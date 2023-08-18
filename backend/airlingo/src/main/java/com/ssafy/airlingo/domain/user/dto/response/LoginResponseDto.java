package com.ssafy.airlingo.domain.user.dto.response;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;
import com.ssafy.airlingo.domain.language.entity.Language;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Schema(description = "(LoginResponseDto) 로그인 요청 후 반환 DTO - 로그인 성공한 사용자의 ID, 닉네임 반환")
public class LoginResponseDto {
	@Schema(description = "로그인유저 PK", example = "1")
	private Long userId;

	@Schema(description = "로그인유저 로그인 ID", example = "airlingo")
	private String userLoginId;

	@Schema(description = "로그인유저 닉네임", example = "에어링고")
	private String userNickname;

	@Schema(description = "로그인유저 프로필 이미지 URL", example = "http://User.s3.amazonaws.com")
	private String userImgUrl;

	@Schema(description = "로그인유저 모국어")
	private Language userNativeLanguage;

	@Schema(description = "로그인유저 관심언어")
	private List<LanguageDto> userLanguages;

}
