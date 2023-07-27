package com.ssafy.airlingo.domain.study.dto.response;

import java.time.LocalDateTime;

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
@Schema(description = "스크립트 정보")
public class UserStudyResponseDto {
	private Long scriptId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Study study;
	private String scriptContent;
	private String scriptUrl;
	private LocalDateTime createdDate;
}
