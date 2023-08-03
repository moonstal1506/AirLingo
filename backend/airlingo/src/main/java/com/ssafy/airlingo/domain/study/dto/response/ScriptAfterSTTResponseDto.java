package com.ssafy.airlingo.domain.study.dto.response;

import java.util.List;

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
@Schema(description = "녹음 파일 STT후 1차 스크립트 반환")
public class ScriptAfterSTTResponseDto {

	@Schema(description = "스크립트 ID", example = "1")
	private Long scriptId;

	@Schema(description = "스크립트 내용", example = "2")
	private List<SentenceResponseDto> sentenceResponseDtoList;

	public static ScriptAfterSTTResponseDto createScriptAfterSttResponseDto(Long scriptId,
		List<SentenceResponseDto> sentenceResponseDtoList) {
		return ScriptAfterSTTResponseDto.builder()
			.scriptId(scriptId)
			.sentenceResponseDtoList(sentenceResponseDtoList)
			.build();
	}
}
