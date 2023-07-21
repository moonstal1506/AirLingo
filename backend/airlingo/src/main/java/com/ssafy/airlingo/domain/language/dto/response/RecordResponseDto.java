package com.ssafy.airlingo.domain.language.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordResponseDto {
	private Long recordId;
	private Long userId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private User user;

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Language language;
	private Grade grade;
	private Study study;

}
