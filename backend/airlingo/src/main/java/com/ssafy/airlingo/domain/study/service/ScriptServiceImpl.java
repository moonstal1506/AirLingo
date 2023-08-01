package com.ssafy.airlingo.domain.study.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.json.simple.parser.ParseException;
import com.ssafy.airlingo.domain.S3.service.Amazon3SService;
import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.repository.CardRepository;
import com.ssafy.airlingo.domain.study.dto.request.CreateScriptRequestDto;
import com.ssafy.airlingo.domain.study.dto.request.ModifyScriptContentRequestDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptAfterSTTResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.ScriptResponseDto;
import com.ssafy.airlingo.domain.study.dto.response.SentenceResponseDto;
import com.ssafy.airlingo.domain.study.entity.Script;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.study.repository.ScriptRepository;
import com.ssafy.airlingo.domain.study.repository.StudyRepository;
import com.ssafy.airlingo.global.util.ClovaSpeechClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScriptServiceImpl implements ScriptService {

	private final ScriptRepository scriptRepository;
	private final StudyRepository studyRepository;
	private final CardRepository cardRepository;
	private final Amazon3SService amazon3SService;
	private final ClovaSpeechClient clovaSpeechClient;

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

	@Override
	@Transactional
	public ScriptAfterSTTResponseDto createScript(CreateScriptRequestDto createScriptRequestDto) throws IOException, ParseException {
		log.info("ScriptServiceImpl_createScript || 녹음 파일 s3저장 및 스크립트 생성");
		Study study = studyRepository.findById(createScriptRequestDto.getStudyId()).get();
		Card card = cardRepository.findById(createScriptRequestDto.getCardId()).get();
		String voiceFileUrl = amazon3SService.uploadVoiceFileToS3(createScriptRequestDto.getVoiceFile());

		List<SentenceResponseDto> sentenceResponseDtoList = voiceFileSTT(voiceFileUrl);
		Long scriptId = scriptRepository.save(Script.createNewScript(study, card, voiceFileUrl)).getScriptId();
		return ScriptAfterSTTResponseDto.createScriptAfterSttResponseDto(scriptId,sentenceResponseDtoList);
	}

	@Override
	@Transactional
	public void modifyScriptContent(ModifyScriptContentRequestDto modifyScriptContentRequestDto) {
		log.info("ScriptServiceImpl_modifyScriptContent || 피드백 종료후 스크립트 내용 수정");
		Script script = scriptRepository.findById(modifyScriptContentRequestDto.getScriptId()).get();
		script.modifyScriptContent(modifyScriptContentRequestDto.getScriptContent());
	}

	/**
	 * @throws IOException       ->S3에 파일업로드 실패
	 * @throws ParseException    ->STT 결과 Parse 실패
	 */
	public List<SentenceResponseDto> voiceFileSTT(String audioPath) throws ParseException {
		log.info("S3에서 음성파일 가져온후 STT");
		ClovaSpeechClient.NestRequestEntity requestEntity = new ClovaSpeechClient.NestRequestEntity();
		ClovaSpeechClient.Diarization diarization = new ClovaSpeechClient.Diarization();
		diarization.setEnable(true);
		diarization.setSpeakerCountMin(2);
		diarization.setSpeakerCountMax(2);
		requestEntity.setDiarization(diarization);
		requestEntity.setLanguage("enko");

		String result = clovaSpeechClient.url(audioPath, requestEntity);
		log.info("STT RESULT : {}",result);

		JSONParser parser = new JSONParser();
		JSONObject parse = (JSONObject) parser.parse(result);
		log.info("STT JSON RESULT : {}",parse);
		JSONArray segments = (JSONArray) parse.get("segments");
		return sttResultToSentenceResponseDto(segments);
	}

	private List<SentenceResponseDto> sttResultToSentenceResponseDto(JSONArray segments){
		log.info("STT결과 JSON TO STRING");
		List<SentenceResponseDto> sentenceResponseDtoList = new ArrayList<>();
		String content = "";

		for (int i = 0; i < segments.size(); i++) {
			JSONObject segment = (JSONObject)segments.get(i);
			String text = (String)segment.get("text");
			JSONObject speaker = (JSONObject)segment.get("speaker");
			String name = (String)speaker.get("name");
			SentenceResponseDto newSentenceResponseDto = SentenceResponseDto.createNewSentenceResponseDto(name, text);
			sentenceResponseDtoList.add(newSentenceResponseDto);
			content += (name + " : " + text) + '\n';
		}
		log.info("STT결과 : {}",content);
		return sentenceResponseDtoList;
	}
}
