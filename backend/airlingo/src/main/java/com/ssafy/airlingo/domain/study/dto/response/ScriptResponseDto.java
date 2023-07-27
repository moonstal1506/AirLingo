package com.ssafy.airlingo.domain.study.dto.response;

import java.time.LocalDateTime;
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
	private Long scriptId;
	private String scriptContent;
	private String scriptUrl;
	private String korCard;
	private String engCard;
	private LocalDateTime createdDate;
}
