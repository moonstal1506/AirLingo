package com.ssafy.airlingo.domain.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssafy.airlingo.domain.chat.entity.ChatMessage;
import com.ssafy.airlingo.domain.chat.entity.ChatRoom;
import com.ssafy.airlingo.domain.chat.repository.ChatRoomRepository;
import com.ssafy.airlingo.domain.chat.service.ChatService;
import com.ssafy.airlingo.domain.chat.service.LettuceLockChatService;
import com.ssafy.airlingo.domain.chat.service.RedisPublisher;
import com.ssafy.airlingo.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Chat Controller", description = "채팅 컨트롤러")
@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping(value = "/api")
public class ChatController {

	private final RedisPublisher redisPublisher;
	private final ChatRoomRepository chatRoomRepository;
	private final ChatService chatService;
	private final LettuceLockChatService lettuceLockChatService;

	/**
	 * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
	 */
	@MessageMapping("/chat/message")
	public void message(ChatMessage message) {
		log.info("ChatController_message || Websocket에 발행된 메시지를 redis로 발행한다(publish)");
		log.info(message.getRoomId() + " " + message.getUserNickname() + " " + message.getContent());
		redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
	}

	@PostMapping("/chat/room")
	@ResponseBody
	public ResponseResult createRoom(@RequestParam String roomId) throws InterruptedException {
		log.info("ChatController_createRoom || 채팅방 생성 및 참가");
		lettuceLockChatService.createRoomAndEnterRoom(roomId);
		return ResponseResult.successResponse;
	}

	@GetMapping("/chat/room/{roomId}")
	@ResponseBody
	public ChatRoom roomInfo(@PathVariable String roomId) {
		log.info("ChatController_roomInfo || 채팅방 정보");
		return chatRoomRepository.findRoomById(roomId);
	}
}