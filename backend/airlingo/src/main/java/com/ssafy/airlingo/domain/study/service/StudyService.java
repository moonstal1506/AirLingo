package com.ssafy.airlingo.domain.study.service;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.airlingo.domain.language.dto.request.EvaluateUserRequestDto;
import com.ssafy.airlingo.domain.study.dto.response.StudyResponseDto;

public interface StudyService {
	List<StudyResponseDto> findStudyByUserIdAndDate(Long userId, LocalDate createdDate);

	void finishStudy(EvaluateUserRequestDto evaluateUserRequestDto);
}
