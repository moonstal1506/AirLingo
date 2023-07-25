package com.ssafy.airlingo.domain.study.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.airlingo.domain.study.dto.response.DailyScriptResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;

public interface ScriptService {
	List<ScriptResponseDto> findScriptByUserId(Long userId);
	List<DailyScriptResponseDto> findScriptByUserIdAndDate(Long userId, LocalDate createdDate);
	ScriptResponseDto findScriptByScriptId(Long scriptId);
	void deleteScriptById(Long scriptId);
}
