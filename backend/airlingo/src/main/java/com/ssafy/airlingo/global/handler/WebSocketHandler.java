package com.ssafy.airlingo.global.handler;

import java.io.IOException;
import java.util.List;

import org.springframework.lang.Nullable;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

	private final SimpMessagingTemplate messagingTemplate;

	public WebSocketHandler(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
		// 메시지 수신 처리 (필요에 따라 구현)
	}

	/**
	 * sessionId 전달 메서드
	 * convertAndSendToUser(user, destination, payload): WebSocket을 통해 특정 사용자에게 개별적인 메시지를 보낼 수 있음
	 * user: 메시지를 받을 사용자의 식별자입니다. 일반적으로 사용자의 고유한 값이나 닉네임 등을 사용
	 * destination: 메시지를 전송할 대상 경로
	 * payload: 전송할 메시지의 내용
	 */
	// sessionId 및 MatchingResponseDto 전달 메서드
	public void sendSessionIdAndMatchingDataToUsers(String sessionId, Long studyId,
													MatchingResponseDto matchingResponseDto,
													List<String> userNicknames) {
		// sessionId와 MatchingResponseDto를 JSON 형식으로 변환하여 전달
		String matchingData =
				"{\"sessionId\": \"" + sessionId + "\", \"studyId\": \"" + studyId + "\", \"matchingResponseDto\": "
						+ new Gson().toJson(matchingResponseDto) + "}";

		for (String userNickname : userNicknames) {
			messagingTemplate.convertAndSendToUser(userNickname, "/queue/matchingData", matchingData,
					createHeaders(null));
		}
	}

	private MessageHeaders createHeaders(@Nullable String sessionId) {
		SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
		if (sessionId != null)
			headerAccessor.setSessionId(sessionId);
		headerAccessor.setLeaveMutable(true);
		return headerAccessor.getMessageHeaders();
	}

}
