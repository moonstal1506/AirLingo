package com.ssafy.airlingo.domain.matching.service;

import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.language.repository.UserLanguageRepository;
import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.ConcurrentUsersResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.study.entity.UserStudy;
import com.ssafy.airlingo.domain.study.repository.StudyRepository;
import com.ssafy.airlingo.domain.study.repository.UserStudyRepository;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.RefreshTokenRepository;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.global.exception.NotEnoughMileageException;
import com.ssafy.airlingo.global.response.SingleResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

	private static final String CONCURRENT_USERS_NUMBER_URL = "http://localhost:8082/matching/waiting-users";
    private static final int PREMIUM_MILEAGE = 3000;
	public static final int MATCHING_MILEAGE = 500;

	private final UserRepository userRepository;
    private final LanguageRepository languageRepository;
    private final UserLanguageRepository userLanguageRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final StudyRepository studyRepository;
    private final UserStudyRepository userStudyRepository;

    @Override
    public MatchingUserDto findMatchingUser(MatchingRequestDto matchingRequestDto) {
        log.info("findMatchingUser");
        User user = userRepository.findById(matchingRequestDto.getUserId()).get();
        Language studyLanguage = languageRepository.findById(matchingRequestDto.getStudyLanguageId()).get();
        UserLanguage userLanguage = userLanguageRepository.findByUserAndLanguage(user, studyLanguage);

        // 프리미엄 매칭 가능 여부
        if (matchingRequestDto.isPremium()) {
            if (user.isImpossiblePremiumMatching(PREMIUM_MILEAGE)) {
                throw new NotEnoughMileageException();
            }
        }

        System.out.println("userLanguage = " + userLanguage);
        System.out.println("studyLanguage = " + studyLanguage);
        return MatchingUserDto.toMatchingUserDto(user, userLanguage, matchingRequestDto.isPremium());
    }

    @Transactional
    @Override
    public void updateMileage(MatchingResponseDto matchingResponseDto) {
        MatchingUserDto MatchingUserDto1 = matchingResponseDto.getUser1();
        User user1 = userRepository.findById(MatchingUserDto1.getUserId()).get();
        user1.addMileage(MATCHING_MILEAGE);
        useMileage(MatchingUserDto1.isPremium(), user1);

        MatchingUserDto MatchingUserDto2 = matchingResponseDto.getUser2();
        User user2 = userRepository.findById(MatchingUserDto2.getUserId()).get();
        user2.addMileage(MATCHING_MILEAGE);
        useMileage(MatchingUserDto2.isPremium(), user2);
    }

    private void useMileage(boolean isPremium, User user) {
        if (isPremium) {
            user.useMileage(PREMIUM_MILEAGE);
        }
    }

    @Override
    public ConcurrentUsersResponseDto getConcurrentUsersSize() {
        log.info("getConcurrentUsersSize");
        RestTemplate restTemplate = new RestTemplate();
        SingleResponseResult waitingUserResult = restTemplate.getForObject(CONCURRENT_USERS_NUMBER_URL,
                SingleResponseResult.class);

        return ConcurrentUsersResponseDto.builder()
                .ConcurrentUsersSize(refreshTokenRepository.countConcurrentUsers())
                .waitingUsersSize((int) waitingUserResult.getData())
                .build();
    }

    @Transactional
    @Override
    public Long createStudy(MatchingResponseDto matchingResponseDto) {
        // Study 생성
        Study study = studyRepository.save(new Study());

        // UserStudy 생성
        createUserStudy(matchingResponseDto.getUser1(), study);
        createUserStudy(matchingResponseDto.getUser2(), study);

        return study.getStudyId();
    }

    private void createUserStudy(MatchingUserDto matchingUserDto, Study study) {
        Long userId = matchingUserDto.getUserId();
        User user = userRepository.findById(userId).get();
        Language language = languageRepository.findById(matchingUserDto.getUserStudyLanguageId()).get();

        UserStudy userStudy = UserStudy.builder()
                .study(study)
                .user(user)
                .language(language)
                .build();

        userStudyRepository.save(userStudy);
    }

}
