package com.ssafy.airlingo.domain.study.dto.request;

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
@Schema(description = "스크립트 녹음파일 저장 DTO")
public class ModifyScriptContentRequestDto {

	@Schema(description = "스크립트 ID", example = "1")
	private Long scriptId;

	@Schema(description = "스크립트 내용", example = "2")
	private String scriptContent;

	@Schema(description = "사용자 ID", example = "1")
	private Long userId;

	@Schema(description = "상대방 ID", example = "2")
	private Long otherUserId;
}