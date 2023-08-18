package com.ssafy.airlingo.domain.content.service;

import java.util.List;

import com.ssafy.airlingo.domain.content.dto.response.SentenceResponseDto;

public interface SentenceService {
	List<SentenceResponseDto> getSentence();
}
