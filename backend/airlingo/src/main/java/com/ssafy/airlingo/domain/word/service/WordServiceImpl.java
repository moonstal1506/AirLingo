package com.ssafy.airlingo.domain.word.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.domain.word.dto.request.WordRequestDto;
import com.ssafy.airlingo.domain.word.dto.response.WordResponseDto;
import com.ssafy.airlingo.domain.word.entity.Word;
import com.ssafy.airlingo.domain.word.repository.WordRepository;
import com.ssafy.airlingo.global.exception.EmptyWordListException;
import com.ssafy.airlingo.global.exception.NotExistAccountException;
import com.ssafy.airlingo.global.exception.NotExistWordException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class WordServiceImpl implements WordService {

	private final WordRepository wordRepository;
	private final UserRepository userRepository;

	@Override
	public List<WordResponseDto> getWordListByUserId(Long userId) {
		log.info("WordServiceImpl_getWordListByUserId -> 저장한 모든 단어 조회");

		// userId를 이용하여 데이터베이스에서 해당 유저가 저장한 단어들을 조회
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		List<Word> wordList = wordRepository.findByUser(user);

		// 조회 결과가 없는 경우, EmptyWordListException을 던짐 => 프론트에서 필요없을 수도 있음
		if (wordList.isEmpty()) {
			throw new EmptyWordListException();
		}

		// 조회한 단어 리스트를 WordResponseDto로 변환하여 리스트로 반환
		return wordList.stream().map(Word::toWordResponseDto).collect(Collectors.toList());
	}

	@Override
	public List<WordResponseDto> getWordTestListByUserId(Long userId) {
		log.info("WordServiceImpl_getWordTestListByUserId -> 단어 테스트 리스트 조회");

		// userId를 이용하여 데이터베이스에서 해당 유저가 저장한 단어들을 조회
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		List<Word> wordList = wordRepository.findByUser(user);

		// 조회 결과가 없는 경우, EmptyWordListException을 던짐 => 테스트 불가
		if (wordList.isEmpty()) {
			throw new EmptyWordListException();
		}

		List<Word> wordTestList = getRandomWords(wordList, 10);

		// 랜덤 단어 리스트를 WordResponseDto로 변환하여 리스트로 반환
		return wordTestList.stream().map(Word::toWordResponseDto).collect(Collectors.toList());
	}

	// 랜덤 단어 리스트 반환
	private List<Word> getRandomWords(List<Word> wordList, int count) {
		if (wordList.size() <= count) {
			return wordList;
		}

		List<Word> randomWords = new ArrayList<>(wordList);
		Collections.shuffle(randomWords);

		return randomWords.subList(0, count);
	}

	@Override
	public void deleteWordsByUserIdAndWordIds(Long userId, Long[] wordIds) {
		log.info("WordServiceImpl_deleteWordByWordId -> 단어 삭제");

		// 해당 wordId에 해당하는 단어를 데이터베이스에서 조회
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		for (Long wordId : wordIds) {
			// userId와 wordId로 해당 단어를 찾아서 삭제
			Word word = wordRepository.findByUserAndWordId(user, wordId);

			if (word != null) {
				// 단어를 데이터베이스에서 삭제
				wordRepository.delete(word);
			} else {
				// 조회된 단어가 없는 경우, NotExistWordException을 던짐
				throw new NotExistWordException();
			}
		}
	}

	@Override
	public void saveWordByUserId(Long userId, WordRequestDto wordRequestDto) {
		log.info("WordServiceImpl_saveWordByUserId -> 단어 저장");

		User user = userRepository.findById(userId).get();
		String wordName = wordRequestDto.getWordName();
		String wordDescription = wordRequestDto.getWordDescription();

		Word word = Word.builder().user(user).wordName(wordName).wordDescription(wordDescription).build();
		wordRepository.save(word);
	}
}
