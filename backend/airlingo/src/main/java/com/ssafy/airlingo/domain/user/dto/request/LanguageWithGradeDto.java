package com.ssafy.airlingo.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "언어, 등급 요청 DTO")
public class LanguageWithGradeDto {

	@NotNull
	@Schema(description = "언어 ID", example = "1")
	private Long languageId;

	@NotNull
	@Schema(description = "등급 ID", example = "1")
	private Long gradeId;
}
