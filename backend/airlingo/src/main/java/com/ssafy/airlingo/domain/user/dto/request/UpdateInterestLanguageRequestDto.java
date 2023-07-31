package com.ssafy.airlingo.domain.user.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public class UpdateInterestLanguageRequestDto {
	@NotNull
	@Schema(description = "유저 ID")
	private Long userId;
	@Schema(description = "사용자 관심언어와 해당 언어의 등급")
	private List<LanguageWithGradeDto> userInterestLanguageList;

}
