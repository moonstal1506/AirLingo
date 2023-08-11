package com.ssafy.airlingo.domain.chat.service;

import com.ssafy.airlingo.domain.chat.entity.ChatRoom;
import com.ssafy.airlingo.domain.chat.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

	private final ChatRoomRepository chatRoomRepository;

	@Override
	public void createRoomAndEnterRoom(String roomId) {
		log.info("ChatServiceImpl_createRoomAndEnterRoom");
		ChatRoom chatRoom = null;
		System.out.println(chatRoomRepository.getTopic(roomId));
		if (chatRoomRepository.getTopic(roomId) == null) {
			log.info("createChatRoom");
			chatRoom = chatRoomRepository.createChatRoom(roomId);
			chatRoomRepository.enterChatRoom(chatRoom.getRoomId());
			return;
		}
		chatRoomRepository.enterChatRoom(chatRoomRepository.findRoomById(roomId).getRoomId());
	}

}
