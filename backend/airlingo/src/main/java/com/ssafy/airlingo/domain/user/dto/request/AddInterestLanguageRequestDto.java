package com.ssafy.airlingo.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "(AddInterestLanguageRequestDto) 관심 언어 추가 DTO")
public class AddInterestLanguageRequestDto {

	@NotNull
	@Schema(description = "유저 ID", example = "1")
	private Long userId;

	@Schema(description = "사용자 관심언어와 해당 언어의 등급")
	private List<LanguageWithGradeDto> userInterestLanguageList;
}
