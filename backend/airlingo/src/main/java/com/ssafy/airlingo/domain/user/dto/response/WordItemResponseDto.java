package com.ssafy.airlingo.domain.user.dto.response;

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
@Schema(description = "각 단어에 대한 정보")
public class WordItemResponseDto {
	@Schema(description = "단어 ID", example = "1", required = true)
	private Long wordId;

	@Schema(description = "단어", example = "apple", required = true)
	private String wordName;

	@Schema(description = "단어 뜻", example = "사과", required = true)
	private String wordDescription;
}
