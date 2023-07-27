package com.ssafy.airlingo.domain.study.dto.response;

import java.time.LocalDateTime;
import java.util.List;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 정보")
public class StudyResponseDto {
	private Long studyId;
	private int studyTime;
	private String partnerNickName;
	private String languageKorName;
	private String languageEngName;
	private LocalDateTime createdDate;
	private List<ScriptResponseDto> scripts;
}
