package com.ssafy.airlingo.domain.study.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.airlingo.domain.study.entity.Study;

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
@Schema(description = "날짜별 스크립트 목록")
public class DailyScriptResponseDto {
	private LocalDate createdDate;
	private Long scriptId;
	private String scriptContent;
	private String scriptUrl;
}
