package com.ssafy.airlingo.domain.matching.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "각 언어에 대한 정보")
public class LanguageDto {

	@Schema(description = "언어 ID", example = "1")
	private Long languageId;

	@Schema(description = "언어 한국어버전", example = "한국어")
	private String languageKorName;

	@Schema(description = "언어 영어버전", example = "Korean")
	private String languageEngName;

	@Schema(description = "국가 이미지 URL", example = "http://Language.s3.amazonaws.com/image.png")
	private String imageUrl;
}
