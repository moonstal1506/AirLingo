package com.ssafy.airlingo.global.handler;

import java.io.IOException;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

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

	/** sessionId 전달 메서드
	 *  convertAndSendToUser(user, destination, payload): WebSocket을 통해 특정 사용자에게 개별적인 메시지를 보낼 수 있음
	 *  user: 메시지를 받을 사용자의 식별자입니다. 일반적으로 사용자의 고유한 값이나 닉네임 등을 사용
	 * 	destination: 메시지를 전송할 대상 경로
	 * 	payload: 전송할 메시지의 내용
	 */
	public void sendSessionIdToUsers(String sessionId, List<String> userNicknames) {
		for (String userNickname : userNicknames) {
			messagingTemplate.convertAndSendToUser(userNickname, "/queue/sessionId", sessionId);
		}
	}
}
