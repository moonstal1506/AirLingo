package com.ssafy.airlingo.domain.study.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.study.dto.response.DailyScriptResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;
import com.ssafy.airlingo.domain.study.entity.Script;
import com.ssafy.airlingo.domain.study.repository.ScriptRepository;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScriptServiceImpl implements ScriptService {

	private final UserRepository userRepository;
	private final ScriptRepository scriptRepository;

	@Override
	public List<ScriptResponseDto> findScriptByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			// 사용자를 찾지 못한 경우 빈 리스트 반환
			return Collections.emptyList();
		}
		List<ScriptResponseDto> scriptList = scriptRepository.findScriptsByUser_UserId(userId).stream()
			.map(Script::toDto)
			.collect(Collectors.toList());
		return scriptList;
	}

	@Override
	public List<DailyScriptResponseDto> findScriptByUserIdAndDate(Long userId, LocalDate createdDate) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			// 사용자를 찾지 못한 경우 빈 리스트 반환
			return Collections.emptyList();
		}

		// LocalDate를 LocalDateTime으로 변환
		LocalDateTime startOfDay = createdDate.atStartOfDay();

		List<DailyScriptResponseDto> scriptList = scriptRepository.findScriptsByUser_UserIdAndCreatedDate(userId, startOfDay).stream()
			.map(Script::toDtoDate)
			.collect(Collectors.toList());
		return scriptList;
	}

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
