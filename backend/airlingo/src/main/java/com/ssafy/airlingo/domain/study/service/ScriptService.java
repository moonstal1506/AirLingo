package com.ssafy.airlingo.domain.study.service;

import java.io.IOException;

import com.ssafy.airlingo.domain.study.dto.request.CreateScriptRequestDto;
import com.ssafy.airlingo.domain.study.dto.request.ModifyScriptContentRequestDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;

public interface ScriptService {
	ScriptResponseDto findScriptByScriptId(Long scriptId);
	void deleteScriptById(Long scriptId);
	Long createScript(CreateScriptRequestDto createScriptRequestDto) throws IOException;
	void modifyScriptContent(ModifyScriptContentRequestDto modifyScriptContentRequestDto);
}
