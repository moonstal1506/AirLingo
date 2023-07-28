package com.ssafy.airlingo.domain.study.service;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;
import com.ssafy.airlingo.domain.study.entity.Script;
import com.ssafy.airlingo.domain.study.repository.ScriptRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScriptServiceImpl implements ScriptService {

	private final ScriptRepository scriptRepository;

	@Override
	public ScriptResponseDto findScriptByScriptId(Long scriptId) {
		Script script = scriptRepository.findById(scriptId).orElse(null);
		if (script == null) {
			// 스크립트를 찾지 못한 경우 예외 처리
			throw new IllegalArgumentException("스크립트를 찾을 수 없습니다. scriptId: " + scriptId);
		}
		return script.toDto();
	}

	@Override
	public void deleteScriptById(Long scriptId) {
		scriptRepository.deleteById(scriptId);
	}
}
