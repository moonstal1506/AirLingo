package com.ssafy.airlingo.domain.study.dto.response;

import java.time.LocalDateTime;

import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Schema(description = "스크립트 정보")
public class ScriptResponseDto {

	@Schema(description = "스크립트 ID", example = "1")
	private Long scriptId;

	@Schema(description = "스크립트 내용", example = "안녕하세요")
	private String scriptContent;

	@Schema(description = "스크립트 url", example = "http://User.s3.amazonaws.com")
	private String scriptUrl;

	@Schema(description = "스크립트 주제 한국어", example = "음식")
	private String korCard;

	@Schema(description = "스크립트 주제 영어", example = "FOOD")
	private String engCard;

	@Schema(description = "스크립트 생성 시각", example = "2023-07-31 16:19:27.689513")
	private LocalDateTime createdDate;

	@Schema(description = "스크립트 수정 시각", example = "2023-07-31 16:19:27.689513")
	private LocalDateTime modifiedDate;

}
