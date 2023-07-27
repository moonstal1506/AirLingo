package com.ssafy.airlingo.domain.study.service;

import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;

public interface ScriptService {
	ScriptResponseDto findScriptByScriptId(Long scriptId);
	void deleteScriptById(Long scriptId);
}
