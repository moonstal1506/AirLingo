package com.ssafy.airlingo.domain.chat.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {

	private String roomId; // 방번호
	private String userNickname; // 메시지 보낸사람
	private String content; // 메시지
	private String userImgUrl; //유저 프로필 이미지
}