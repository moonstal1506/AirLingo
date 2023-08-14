package com.ssafy.airlingo.global.util;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Component;

import java.io.*;


@Component
public class TextToSpeechService {

	public static void main(String[] args) throws Exception {
		// 서비스 계정 키 파일 경로 설정
		String credentialsPath = "C:\\ssafy/airlingo-395807-df08ac102954.json";

		// Google Cloud Text-to-Speech API 인증 설정
		GoogleCredentials credentials = ServiceAccountCredentials.fromStream(new FileInputStream(credentialsPath));
		TextToSpeechSettings settings = TextToSpeechSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build();

		// TextToSpeechClient 초기화
		try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings)) {
			// 합성할 텍스트 지정
			SynthesisInput input = SynthesisInput.newBuilder().setText("Hello, world!").build();

			// 음성 선택 설정
			VoiceSelectionParams voice =
					VoiceSelectionParams.newBuilder()
							.setLanguageCode("en-US")
							.setSsmlGender(SsmlVoiceGender.FEMALE)
							.build();

			// 오디오 설정
			AudioConfig audioConfig =
					AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

			// Text-to-Speech API 호출
			SynthesizeSpeechResponse response =
					textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

			// 음성 데이터 저장
			ByteString audioContents = response.getAudioContent();

			try (OutputStream out = new FileOutputStream("output.mp3")) {
				out.write(audioContents.toByteArray());
				System.out.println("Audio content written to file \"output.mp3\"");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
