package com.ssafy.airlingo.domain.word.controller;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.TextToSpeechSettings;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.protobuf.ByteString;
import com.ssafy.airlingo.domain.word.dto.request.WordRequestDto;
import com.ssafy.airlingo.domain.word.service.WordService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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

	@Operation(summary = "Play TTS", description = "tts 실행")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "tts 실행 성공"),
	})
	@GetMapping("/tts")
	public ResponseEntity<byte[]> playTTS(String target, String text) throws IOException {
		System.out.println(target);
		System.out.println(text);
		log.info("WordController_playTTS -> 발음 듣기");
		String credentialsPath = "C:\\ssafy/airlingo-395807-df08ac102954.json"; // 실제 경로로 변경
		InputStream credentialsStream = new FileInputStream(credentialsPath);
		GoogleCredentials credentials = ServiceAccountCredentials.fromStream(credentialsStream);

		TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
			.setCredentialsProvider(FixedCredentialsProvider.create(credentials))
			.build();

		try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings)) {
			// 합성할 텍스트 지정
			SynthesisInput input = SynthesisInput.newBuilder().setText(text).build();

			// 음성 선택 설정
			VoiceSelectionParams voice =
				VoiceSelectionParams.newBuilder()
					.setLanguageCode(target)
					.setSsmlGender(SsmlVoiceGender.FEMALE)
					.build();

			// 오디오 설정
			AudioConfig audioConfig =
				AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

			// Text-to-Speech API 호출
			SynthesizeSpeechResponse response =
				textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

			// 음성 데이터 가져오기
			ByteString audioContents = response.getAudioContent();

			// MP3 파일 저장 경로 설정
			String mp3FilePath = "C:\\ssafy\\AirLingo\\frontend\\airlingo\\public\\output.mp3";

			// MP3 파일 저장
			Path path = Path.of(mp3FilePath);
			Files.write(path, audioContents.toByteArray(), StandardOpenOption.CREATE);

			// 음성 데이터를 byte 배열로 변환하여 클라이언트에게 전송
			byte[] audioBytes = audioContents.toByteArray();

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			headers.setContentDispositionFormData("attachment", "output.mp3");

			return new ResponseEntity<>(audioBytes, headers, HttpStatus.OK);
		}
	}
}
