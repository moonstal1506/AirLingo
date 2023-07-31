package com.ssafy.airlingo.domain.word.service;

import java.util.List;

import com.ssafy.airlingo.domain.word.dto.request.WordRequestDto;
import com.ssafy.airlingo.domain.word.dto.response.WordResponseDto;

public interface WordService {
	List<WordResponseDto> getWordListByUserId(Long userId);

	List<WordResponseDto> getWordTestListByUserId(Long userId);

	void deleteWordsByUserIdAndWordIds(Long userId, Long[] wordIds);

	void saveWordByUserId(Long userId, WordRequestDto wordRequestDto);
}
