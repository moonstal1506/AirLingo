package com.ssafy.airlingo.global.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component
public class PapagoService {

	// Clova Speech secret key
	private static final String clientId = "SuTMpnrVjv0o4os8h8sY";//애플리케이션 클라이언트 아이디값";
	// Clova Speech invoke URL
	private static final String clientSecret = "GpByIa7sin";//애플리케이션 클라이언트 시크릿값";

	private static final String apiURL = "https://openapi.naver.com/v1/papago/n2mt";

	public String getTranslatedWord(String source, String target , String text){
		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("X-Naver-Client-Id", clientId);
		requestHeaders.put("X-Naver-Client-Secret", clientSecret);

		String responseBody = post(apiURL, requestHeaders, text,source,target);
		JsonParser parser = new JsonParser();
		JsonObject jsonObject = parser.parse(responseBody).getAsJsonObject();
		String translatedText = jsonObject.getAsJsonObject("message").getAsJsonObject("result").get("translatedText").getAsString();
		return translatedText;
	}

	private static String post(String apiUrl, Map<String, String> requestHeaders, String text , String source, String target) {
		HttpURLConnection con = connect(apiUrl);
		String postParams = "source="+ source +"&target="+target+"&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
		try {
			con.setRequestMethod("POST");
			for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
				con.setRequestProperty(header.getKey(), header.getValue());
			}

			con.setDoOutput(true);
			try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
				wr.write(postParams.getBytes());
				wr.flush();
			}

			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
				return readBody(con.getInputStream());
			} else {  // 에러 응답
				return readBody(con.getErrorStream());
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}

	private static HttpURLConnection connect(String apiUrl){
		try {
			URL url = new URL(apiUrl);
			return (HttpURLConnection)url.openConnection();
		} catch (MalformedURLException e) {
			throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
		} catch (IOException e) {
			throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
		}
	}

	private static String readBody(InputStream body){
		InputStreamReader streamReader = new InputStreamReader(body);

		try (BufferedReader lineReader = new BufferedReader(streamReader)) {
			StringBuilder responseBody = new StringBuilder();

			String line;
			while ((line = lineReader.readLine()) != null) {
				responseBody.append(line);
			}

			return responseBody.toString();
		} catch (IOException e) {
			throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
		}
	}
}
