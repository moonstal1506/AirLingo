package com.ssafy.airlingo.domain.study.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.airlingo.domain.study.dto.response.DailyScriptResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.global.entity.BaseDateEntity;
import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AttributeOverride(name = "createdDate", column = @Column(name = "script_created_date"))
@AttributeOverride(name = "modifiedDate", column = @Column(name = "script_modified_date"))
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "script")
@Entity
public class Script extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scriptId;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "study_id", nullable = false)
	private Study study;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Lob
	@Column(nullable = false)
	private String scriptContent;

	@Column(nullable = false, length = 100)
	private String scriptUrl;

	public ScriptResponseDto toDto(){
		return ScriptResponseDto.builder()
			.scriptId(this.getScriptId())
			.scriptContent(this.getScriptContent())
			.scriptUrl(this.getScriptUrl())
			.createdDate(this.getCreatedDate())
			.build();
	}

	public DailyScriptResponseDto toDtoDate(){
		return DailyScriptResponseDto.builder()
			.scriptId(this.getScriptId())
			.scriptContent(this.getScriptContent())
			.scriptUrl(this.getScriptUrl())
			.createdDate(this.getCreatedDate().toLocalDate())
			.build();
	}

}
