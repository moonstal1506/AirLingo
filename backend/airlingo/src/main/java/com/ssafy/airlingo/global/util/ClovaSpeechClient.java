package com.ssafy.airlingo.global.util;

import com.google.gson.Gson;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClovaSpeechClient {

	// Clova Speech secret key
	private static final String SECRET = "acdcdf7a01f14f11870c82703d24948f";
	// Clova Speech invoke URL
	private static final String INVOKE_URL = "https://clovaspeech-gw.ncloud.com/external/v1/5660/9fe430e5274621be518924ed90d2355f39eeb1d4d98fb00ea0022f3a26ba5595";

	private CloseableHttpClient httpClient = HttpClients.createDefault();
	private Gson gson = new Gson();

	private static final Header[] HEADERS = new Header[] {
		new BasicHeader("Accept", "application/json"),
		new BasicHeader("X-CLOVASPEECH-API-KEY", SECRET),
	};

	public static class Boosting {
		private String words;

		public String getWords() {
			return words;
		}

		public void setWords(String words) {
			this.words = words;
		}
	}

	public static class Diarization {
		private Boolean enable = Boolean.FALSE;
		private Integer speakerCountMin;
		private Integer speakerCountMax;

		public Boolean getEnable() {
			return enable;
		}

		public void setEnable(Boolean enable) {
			this.enable = enable;
		}

		public Integer getSpeakerCountMin() {
			return speakerCountMin;
		}

		public void setSpeakerCountMin(Integer speakerCountMin) {
			this.speakerCountMin = speakerCountMin;
		}

		public Integer getSpeakerCountMax() {
			return speakerCountMax;
		}

		public void setSpeakerCountMax(Integer speakerCountMax) {
			this.speakerCountMax = speakerCountMax;
		}
	}

	public static class NestRequestEntity {
		private String language = "enkr";
		//completion optional, sync/async
		private String completion = "sync";
		//optional, used to receive the analyzed results
		private String callback;
		//optional, any data
		private Map<String, Object> userdata;
		private Boolean wordAlignment = Boolean.TRUE;
		private Boolean fullText = Boolean.TRUE;
		//boosting object array
		private List<Boosting> boostings;
		//comma separated words
		private String forbiddens;
		private Diarization diarization;
		public String getLanguage() {
			return language;
		}
		public void setLanguage(String language) {
			this.language = language;
		}
		public String getCompletion() {
			return completion;
		}
		public void setCompletion(String completion) {
			this.completion = completion;
		}
		public String getCallback() {
			return callback;
		}
		public Boolean getWordAlignment() {
			return wordAlignment;
		}
		public void setWordAlignment(Boolean wordAlignment) {
			this.wordAlignment = wordAlignment;
		}
		public Boolean getFullText() {
			return fullText;
		}
		public void setFullText(Boolean fullText) {
			this.fullText = fullText;
		}
		public void setCallback(String callback) {
			this.callback = callback;
		}
		public Map<String, Object> getUserdata() {
			return userdata;
		}
		public void setUserdata(Map<String, Object> userdata) {
			this.userdata = userdata;
		}
		public String getForbiddens() {
			return forbiddens;
		}
		public void setForbiddens(String forbiddens) {
			this.forbiddens = forbiddens;
		}
		public List<Boosting> getBoostings() {
			return boostings;
		}
		public void setBoostings(List<Boosting> boostings) {
			this.boostings = boostings;
		}
		public Diarization getDiarization() {
			return diarization;
		}
		public void setDiarization(Diarization diarization) {
			this.diarization = diarization;
		}
	}

	/**
	 * recognize media using URL
	 * @param url required, the media URL
	 * @param nestRequestEntity optional
	 * @return string
	 */
	public String url(String url, NestRequestEntity nestRequestEntity) {
		HttpPost httpPost = new HttpPost(INVOKE_URL + "/recognizer/url");
		httpPost.setHeaders(HEADERS);
		Map<String, Object> body = new HashMap<>();
		body.put("url", url);
		body.put("language", nestRequestEntity.getLanguage());
		body.put("completion", nestRequestEntity.getCompletion());
		body.put("callback", nestRequestEntity.getCallback());
		body.put("userdata", nestRequestEntity.getCallback());
		body.put("wordAlignment", nestRequestEntity.getWordAlignment());
		body.put("fullText", nestRequestEntity.getFullText());
		body.put("forbiddens", nestRequestEntity.getForbiddens());
		body.put("boostings", nestRequestEntity.getBoostings());
		body.put("diarization", nestRequestEntity.getDiarization());
		System.out.println("body.url = " + body.get("url"));
		System.out.println("body.language = " + body.get("language"));
		System.out.println("body.completion = " + body.get("completion"));
		System.out.println("body.callback = " + body.get("callback"));
		System.out.println("body.wordAlignment = " + body.get("wordAlignment"));
		System.out.println("body.forbiddens = " + body.get("forbiddens"));
		System.out.println("body.boostings = " + body.get("boostings"));
		System.out.println("body.diarization = " + body.get("diarization"));
		System.out.println("body.userdata = " + body.get("userdata"));
		System.out.println("body.fullText = " + body.get("fullText"));

		HttpEntity httpEntity = new StringEntity(gson.toJson(body), ContentType.APPLICATION_JSON);
		httpPost.setEntity(httpEntity);
		System.out.println("execute전");
		return execute(httpPost);
	}


	private String execute(HttpPost httpPost) {
		System.out.println("execute" );
		try (final CloseableHttpResponse httpResponse = httpClient.execute(httpPost)) {
			final HttpEntity entity = httpResponse.getEntity();
			System.out.println("execute2" );
			return EntityUtils.toString(entity, StandardCharsets.UTF_8);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
