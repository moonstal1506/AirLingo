package com.ssafy.airlingo.domain.language.entity;

import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AttributeOverride(name = "createdDate", column = @Column(name = "record_created_date"))
@AttributeOverride(name = "modifiedDate", column = @Column(name = "record_modified_date"))
@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "record")
@Entity
public class Record extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long recordId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "language_id", nullable = false)
	private Language language;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "grade_id", nullable = false)
	private Grade grade;

		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "study_id", nullable = false)
		private Study study;

	public RecordResponseDto toDto() {
		return RecordResponseDto.builder()
			.recordId(recordId)
			.userId(user.getUserId())
			.user(user)
			.language(language)
			.grade(grade)
			.study(study)
			.build();
	}

	public static Record createNewRecord(User user , Language language , Grade grade , Study study){
		return Record.builder()
			.user(user)
			.language(language)
			.grade(grade)
			.study(study)
			.build();
	}

}

