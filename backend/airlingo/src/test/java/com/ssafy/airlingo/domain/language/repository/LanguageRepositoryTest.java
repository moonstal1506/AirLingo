package com.ssafy.airlingo.domain.language.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.airlingo.domain.language.entity.Language;

@SpringBootTest
class LanguageRepositoryTest {

	@Autowired
	LanguageRepository languageRepository;

	@Test
	public void insert() {
		Language kor = new Language(1L, "한국어", "Korean");
		Language eng = new Language(2L, "영어", "English");
		Language jpn = new Language(3L, "일본어", "Japanese");
		Language chn = new Language(4L, "중국어", "Chinese");

		languageRepository.save(kor);
		languageRepository.save(eng);
		languageRepository.save(jpn);
		languageRepository.save(chn);
	}
}