package com.ssafy.airlingo.domain.user.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.language.dto.response.RecordResponseDto;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.WordResponseDto;
import com.ssafy.airlingo.domain.user.entity.DailyGrid;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.entity.Word;
import com.ssafy.airlingo.domain.user.repository.DailyGridRepository;
import com.ssafy.airlingo.domain.user.repository.RecordRepository;
import com.ssafy.airlingo.domain.user.repository.RefreshTokenRepository;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.domain.user.repository.WordRepository;
import com.ssafy.airlingo.global.exception.EmptyWordListException;
import com.ssafy.airlingo.global.exception.NotExistAccountException;
import com.ssafy.airlingo.global.exception.NotExistWordException;
import com.ssafy.airlingo.global.util.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final RecordRepository recordRepository;
	private final JwtService jwtService;
	private final RefreshTokenRepository refreshTokenRepository;
	private final WordRepository wordRepository;
	private final LanguageRepository languageRepository;
	private final GradeRepository gradeRepository;
	private final DailyGridRepository dailyGridRepository;

	@Override
	@Transactional
	public Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserServiceImpl_createUserAccount -> 새로운 사용자 회원가입");
		User newUserAccount = createUserAccountRequestDto.toUserEntity(languageRepository, gradeRepository);
		return userRepository.save(newUserAccount).getUserId();
	}

	@Override
	public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response) {
		log.info("UserServiceImpl_login -> 사용자 로그인 시도");
		User loginUser = findUserByUserLoginIdAndUserPassword(loginRequestDto.getUserLoginId(),
			loginRequestDto.getUserPassword());
		LoginResponseDto loginResponseDto = loginUser.toLoginResponseDto();

		setToken(loginUser, response);
		return loginResponseDto;
	}

	@Override
	public User findUserByUserLoginIdAndUserPassword(String userLoginId, String userPassword) {
		log.info("UserServiceImpl_findUserByUserLoginIdAndPassword -> ID, PW로 유저 찾기");
		try {
			return userRepository.findUserByUserLoginIdAndUserPassword(userLoginId, userPassword);
		} catch (Exception e) {
			throw new NotExistAccountException();
		}
	}

	@Override
	public void setToken(User loginUser, HttpServletResponse response) {
		log.info("UserServiceImpl_setToken -> 로그인 성공, 토큰 생성");
		String accessToken = jwtService.createAccessToken("userLoginId", loginUser.getUserLoginId()); // key, value
		String refreshToken = jwtService.createRefreshToken("userLoginId", loginUser.getUserLoginId()); // key, value

		response.setHeader("access-token", accessToken);
		response.setHeader("refresh-token", refreshToken);

		refreshTokenRepository.saveRefreshToken(loginUser.getUserLoginId(), refreshToken);
	}

	@Override
	public void logout(String userLoginId) {
		log.info("UserServiceImpl_logout -> 로그아웃 중");
		refreshTokenRepository.deleteRefreshToken(userLoginId);
	}

	@Override
	public UserResponseDto findUserByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		// 사용자를 찾지 못한 경우 일단 null
		if (user == null) {
			return null;
		}
		// User(Entity)를 UserResponseDto로 변환
		return user.toDto();
	}

	@Override
	public List<RecordResponseDto> findByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			// 사용자를 찾지 못한 경우 빈 리스트
			return Collections.emptyList();
		}

		List<RecordResponseDto> recordList = recordRepository.findRecordByUser(user)
			.stream()
			.map(r -> r.toDto())
			.collect(Collectors.toList());
		return recordList;
	}

	public List<DailyGridResponseDto> findDailyGridByUserId(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			// 사용자를 찾지 못한 경우 빈 리스트 반환
			return Collections.emptyList();
		}
		List<DailyGridResponseDto> dailyGridList = dailyGridRepository.findDailyGridByUser(user)
			.stream()
			.map(DailyGrid::toDto)
			.collect(Collectors.toList());
		return dailyGridList;
	}

	@Override
	public List<WordResponseDto> getWordListByUserId(Long userId) {
		log.info("UserServiceImpl_getWordListByUserId -> 저장한 모든 단어 조회");

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
		log.info("UserServiceImpl_getWordTestListByUserId -> 단어 테스트 리스트 조회");

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
		log.info("UserServiceImpl_deleteWordByWordId -> 단어 삭제");

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
}
