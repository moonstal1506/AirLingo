package com.ssafy.airlingo.domain.language.entity;

import com.ssafy.airlingo.domain.language.dto.response.GradeDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "grade")
@Entity
public class Grade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long gradeId;

	@Column(nullable = false, unique = true, length = 100)
	private String gradeName;

	@Column(nullable = false)
	private int gradeScore;

	public Grade(String gradeName, int gradeScore) {
		this.gradeName = gradeName;
		this.gradeScore = gradeScore;
	}

	public GradeDto toGradeDto() {
		return GradeDto.builder()
			.gradeId(gradeId)
			.gradeName(gradeName)
			.build();
	}
}
