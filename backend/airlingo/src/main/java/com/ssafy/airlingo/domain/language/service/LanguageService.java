package com.ssafy.airlingo.domain.language.service;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.response.GradeDto;
import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;

public interface LanguageService {
	List<LanguageDto> getLanguageList();

	List<GradeDto> getGradeList();
}
