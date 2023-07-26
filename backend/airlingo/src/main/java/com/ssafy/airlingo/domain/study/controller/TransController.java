package com.ssafy.airlingo.domain.study.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.study.dto.response.translateResponseDto;
import com.ssafy.airlingo.domain.study.service.TransService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "번역 API")
public class TransController {

	private final TransService transService;

	@Operation(summary ="문장 번역")
	@PostMapping("/api/translate")
	public translateResponseDto translateSentences(@RequestParam List<String> sentences,
		@RequestParam Long beforeLng,
		@RequestParam Long afterLng) {
		return transService.getTransSentence(sentences, beforeLng, afterLng);
	}
}
