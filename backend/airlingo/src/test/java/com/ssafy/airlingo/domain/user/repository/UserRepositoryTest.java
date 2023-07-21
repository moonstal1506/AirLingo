package com.ssafy.airlingo.domain.user.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.language.repository.UserLanguageRepository;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.entity.UserState;

@SpringBootTest
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    GradeRepository gradeRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    UserLanguageRepository userLanguageRepository;

    @Test
    public void insert(){
        User user = createUser();
        createUserLanguage(user);

        User byUserId = userRepository.findById(user.getUserId()).get();
        System.out.println("byUserId = " + byUserId);
    }

    private User createUser() {
        Language language = languageRepository.findById(1).orElseThrow(() -> {
            throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
        });

        User user=User.builder()
                .userNickname("userNickname6")
                .userLoginId("userLoginId6")
                .userPassword("userPassword6")
                .userEmail("userEmail6")
                .userGoogleId("6")
                .userImgUrl("비어있음")
                .userBio("비어있음")
                .userNativeLanguage(language)
                .userMileage(0)
                .userTotalMileage(0)
                .userRating(0)
                .userTotalRating(0)
                .userStudyCount(0)
                .userComplain(0)
                .userState(UserState.ACTIVE)
                .userPassportStyle(1)
                .build();
        return userRepository.save(user);
    };

    private UserLanguage createUserLanguage(User user) {
        Language interestedLanguage = languageRepository.findById(2).orElseThrow(() -> {
            throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
        });
        Grade grade = gradeRepository.findById(1).orElseThrow(() -> {
            throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
        });

        UserLanguage userLanguage = UserLanguage.builder()
                .user(user)
                .language(interestedLanguage)
                .grade(grade)
                .build();
        userLanguageRepository.save(userLanguage);
        return userLanguage;
    }

}