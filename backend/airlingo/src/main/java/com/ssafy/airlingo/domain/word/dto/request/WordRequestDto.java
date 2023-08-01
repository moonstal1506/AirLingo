package com.ssafy.airlingo.domain.word.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "(WordRequestDto) 단어 저장 요청 DTO")
public class WordRequestDto {

	@NotBlank
	@Schema(description = "검색 단어", example = "사과")
	private String wordName;

	@NotBlank
	@Schema(description = "검색 단어 뜻", example = "apple")
	private String wordDescription;
}
