package com.ssafy.airlingo.domain.study.service;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;

import com.ssafy.airlingo.domain.study.dto.request.CreateScriptRequestDto;
import com.ssafy.airlingo.domain.study.dto.request.ModifyScriptContentRequestDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptAfterSTTResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.SentenceResponseDto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;

public interface ScriptService {
	ScriptResponseDto findScriptByScriptId(Long scriptId);

	void deleteScriptById(Long scriptId);

	ScriptAfterSTTResponseDto createScript(String sessionId, Long studyId, Long cardId) throws
		IOException,
		ParseException;

	void modifyScriptContent(ModifyScriptContentRequestDto modifyScriptContentRequestDto, HttpServletRequest request);

	List<SentenceResponseDto> voiceFileSTT(String audioPath) throws ParseException;
}
