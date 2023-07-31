package com.ssafy.airlingo.domain.study.service;

import com.ssafy.airlingo.domain.study.dto.request.CreateScriptRequestDto;
import com.ssafy.airlingo.domain.study.dto.request.ModifyScriptContentRequestDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;

public interface ScriptService {
	ScriptResponseDto findScriptByScriptId(Long scriptId);
	void deleteScriptById(Long scriptId);
	Long createScript(CreateScriptRequestDto createScriptRequestDto);
	void modifyScriptContent(ModifyScriptContentRequestDto modifyScriptContentRequestDto);
}
