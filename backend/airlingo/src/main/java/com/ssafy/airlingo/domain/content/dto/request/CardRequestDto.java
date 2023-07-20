package com.ssafy.airlingo.domain.content.dto.request;

import com.ssafy.airlingo.domain.content.entity.CardCode;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "대화 소주제 요청")
public class CardRequestDto {

	@Schema(description = "대화 대주제 코드", example = "FOOD", required = true)
	private CardCode cardCode;

	@Schema(description = "사용자의 사용 언어", example = "KOR", required = true)
	private String languageCode;
}
