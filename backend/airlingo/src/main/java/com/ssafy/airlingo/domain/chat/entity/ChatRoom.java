package com.ssafy.airlingo.domain.chat.entity;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoom implements Serializable {

	private static final long serialVersionUID = 6494678977089006639L;

	private String roomId;

	public static ChatRoom create(String roodId) {
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.roomId = roodId;
		return chatRoom;
	}
}

