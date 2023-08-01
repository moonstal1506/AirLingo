package com.ssafy.airlingo.domain.study.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.repository.CardRepository;
import com.ssafy.airlingo.domain.study.dto.request.CreateScriptRequestDto;
import com.ssafy.airlingo.domain.study.dto.request.ModifyScriptContentRequestDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;
import com.ssafy.airlingo.domain.study.entity.Script;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.study.repository.ScriptRepository;
import com.ssafy.airlingo.domain.study.repository.StudyRepository;
import com.ssafy.airlingo.global.exception.NotExistScriptException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScriptServiceImpl implements ScriptService {

	private final ScriptRepository scriptRepository;
	private final StudyRepository studyRepository;
	private final CardRepository cardRepository;

	@Override
	public ScriptResponseDto findScriptByScriptId(Long scriptId) {
		Script script = scriptRepository.findById(scriptId).orElseThrow(NotExistScriptException::new);
		return script.toDto();
	}

	@Override
	public void deleteScriptById(Long scriptId) {
		scriptRepository.deleteById(scriptId);
	}

	@Override
	@Transactional
	public Long createScript(CreateScriptRequestDto createScriptRequestDto) {
		log.info("ScriptServiceImpl_createScript || 녹음 파일 s3저장 및 스크립트 생성");
		Study study = studyRepository.findById(createScriptRequestDto.getStudyId()).get();
		Card card = cardRepository.findById(createScriptRequestDto.getCardId()).get();
		//s3에 녹음파일 저장 후 url반환
		//stt후 대본 프론트로 다시 반환 + 스크립트id 랑 같이
		return scriptRepository.save(Script.createNewScript(study,card,"")).getScriptId();
	}

	@Override
	@Transactional
	public void modifyScriptContent(ModifyScriptContentRequestDto modifyScriptContentRequestDto) {
		log.info("ScriptServiceImpl_modifyScriptContent || 피드백 종료후 스크립트 내용 수정");
		Script script = scriptRepository.findById(modifyScriptContentRequestDto.getScriptId()).get();

		script.modifyScriptContent(modifyScriptContentRequestDto.getScriptContent());
	}
}
