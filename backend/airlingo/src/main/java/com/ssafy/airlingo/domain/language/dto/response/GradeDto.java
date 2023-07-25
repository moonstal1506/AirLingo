package com.ssafy.airlingo.domain.language.dto.response;

import com.ssafy.airlingo.domain.language.entity.Grade;

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
@Schema(description = "각 등급에 대한 정보")
public class GradeDto {

	@Schema(description = "등급 ID", example = "1")
	private Long gradeId;

	@Schema(description = "등급 이름", example = "A1")
	private String gradeName;

	public GradeDto(Grade grade) {
		this.gradeId = grade.getGradeId();
		this.gradeName = grade.getGradeName();
	}
}