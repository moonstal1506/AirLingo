package com.ssafy.airlingo.domain.word.controller;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import com.ssafy.airlingo.domain.word.dto.request.WordRequestDto;
import com.ssafy.airlingo.domain.word.service.WordService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Tag(name = "Word Controller", description = "단어 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/word")
public class WordController {

	private final WordService wordService;

	@Operation(summary = "Get Word List", description = "단어장 전체 조회")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "단어장 조회 성공"),
			@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@GetMapping("/{userId}")
	public ResponseResult getWordListByUserId(@PathVariable Long userId) {
		log.info("WordController_getWordListByUserId -> 저장한 모든 단어 조회 시작");
		return new ListResponseResult<>(wordService.getWordListByUserId(userId));
	}

	@Operation(summary = "Get Word Test List", description = "단어 테스트 리스트 조회")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "단어 테스트 리스트 조회 성공"),
			@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@GetMapping("/test/{userId}")
	public ResponseResult getWordTestListByUserId(@PathVariable Long userId) {
		log.info("WordController_getWordTestListByUserId -> 단어 테스트 리스트 조회 시작");
		return new ListResponseResult<>(wordService.getWordTestListByUserId(userId));
	}

	@Operation(summary = "Delete Words", description = "선택한 단어 리스트 삭제")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "단어 삭제 성공"),
			@ApiResponse(responseCode = "460", description = "요청한 단어가 존재하지 않습니다"),
			@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@DeleteMapping("/{userId}")
	public ResponseResult deleteWordByWordId(@PathVariable Long userId, @RequestBody Long[] wordIds) {
		log.info("WordController_deleteWordByWordId -> 단어 삭제 시작");
		wordService.deleteWordsByUserIdAndWordIds(userId, wordIds);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Save Word", description = "단어 저장")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "단어 저장 성공"),
			@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@PostMapping("/{userId}")
	public ResponseResult saveWordByUserId(@PathVariable Long userId, @RequestBody WordRequestDto wordRequestDto) {
		log.info("WordController_saveWordByUserId -> 단어 저장 시작");
		wordService.saveWordByUserId(userId, wordRequestDto);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Play TTS", description = "단어 저장")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "단어 저장 성공"),
			@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@GetMapping("/tts")
	public ResponseEntity<byte[]> playTTS() throws IOException {
		log.info("WordController_playTTS -> 발음 듣기");
		String credentialsPath = "C:\\ssafy/airlingo-395807-df08ac102954.json"; // 실제 경로로 변경
		InputStream credentialsStream = new FileInputStream(credentialsPath);
		GoogleCredentials credentials = ServiceAccountCredentials.fromStream(credentialsStream);

		TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
				.setCredentialsProvider(FixedCredentialsProvider.create(credentials))
				.build();

		try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings)) {
			SynthesisInput input = SynthesisInput.newBuilder().setText("Hello, world!").build();
			VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
					.setLanguageCode("en-US")
					.setSsmlGender(SsmlVoiceGender.FEMALE)
					.build();
			AudioConfig audioConfig = AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
			SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
			ByteString audioContents = response.getAudioContent();

			// 바이트 배열 형태의 음성 데이터와 HTTP 상태코드 200을 반환
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM);
			return ResponseEntity.ok()
					.headers(headers)
					.body(audioContents.toByteArray()); // ByteString을 바이트 배열로 변환
		}
	}
}
