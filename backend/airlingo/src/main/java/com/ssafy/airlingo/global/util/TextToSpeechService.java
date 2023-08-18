package com.ssafy.airlingo.global.util;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

@Component
public class TextToSpeechService {

	public byte[] playTTS(String target, String text) throws IOException {
		String credentialsPath = "./../../backend/airlingo/src/main/resources/airlingo-395807-df08ac102954.json"; // 실제 경로로 변경
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
			String mp3FilePath = "../../frontend/airlingo/public/output.mp3";

			// MP3 파일 저장
			Path path = Path.of(mp3FilePath);
			Files.write(path, audioContents.toByteArray(), StandardOpenOption.CREATE);

			// 음성 데이터를 byte 배열로 변환하여 클라이언트에게 전송
			byte[] audioBytes = audioContents.toByteArray();
			return audioBytes;
		}
	}
}
