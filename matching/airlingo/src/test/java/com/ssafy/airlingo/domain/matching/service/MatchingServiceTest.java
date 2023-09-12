package com.ssafy.airlingo.domain.matching.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.ssafy.airlingo.domain.matching.request.LanguageDto;
import com.ssafy.airlingo.domain.matching.request.MatchingUserDto;

class MatchingServiceTest {

    MatchingService matchingService = new MatchingService();

    @Test
    @DisplayName("배우고 싶은 언어가 상대방의 모국어가 아니면 매칭이 되지 않는다.")
    public void isPossibleUser_differentLanguage() {
        MatchingUserDto matchingUser = MatchingUserDto.builder()
                .premium(false)
                .userStudyLanguage("한국어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("영어").build())
                .userStudyLanguageGradeScore(3)
                .userRating(3.5)
                .build();

        MatchingUserDto waitingUser = MatchingUserDto.builder()
                .premium(false)
                .userStudyLanguage("한국어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("영어").build())
                .userStudyLanguageGradeScore(2)
                .userRating(4.0)
                .build();

        assertFalse(matchingService.isPossibleUser(matchingUser, waitingUser));
    }

    @Test
    @DisplayName("모두 프리미엄이 아닌 경우 매칭 성공한다.")
    public void isPossibleUser_bothNonPremium() {
        MatchingUserDto matchingUser = MatchingUserDto.builder()
                .premium(false)
                .userStudyLanguage("한국어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("영어").build())
                .userStudyLanguageGradeScore(3)
                .userRating(3.5)
                .build();

        MatchingUserDto waitingUser = MatchingUserDto.builder()
                .premium(false)
                .userStudyLanguage("영어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("한국어").build())
                .userStudyLanguageGradeScore(2)
                .userRating(4.0)
                .build();

        assertTrue(matchingService.isPossibleUser(matchingUser, waitingUser));
    }

    @DisplayName("현재 매칭 유저만 프리미엄일 경우 상대만 프리미엄 기준을 통과하면 매칭된다.")
    @Test
    public void isPossibleUser_onePremium() {
        MatchingUserDto matchingUser = MatchingUserDto.builder()
                .premium(true)
                .userStudyLanguage("한국어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("영어").build())
                .userStudyLanguageGradeScore(3)
                .userRating(3.3)
                .build();

        MatchingUserDto waitingUser = MatchingUserDto.builder()
                .premium(false)
                .userStudyLanguage("영어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("한국어").build())
                .userStudyLanguageGradeScore(4)
                .userRating(4.8)
                .build();

        assertTrue(matchingService.isPossibleUser(matchingUser, waitingUser));
    }

    @DisplayName("둘 중 한명이 프리미엄일 때 상대방이 프리미엄 기준을 통과하지 않으면 매칭 되지 않는다.")
    @Test
    public void isPossibleUser_onePremium2() {
        MatchingUserDto matchingUser = MatchingUserDto.builder()
                .premium(true)
                .userStudyLanguage("한국어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("영어").build())
                .userStudyLanguageGradeScore(4)
                .userRating(4.5)
                .build();

        MatchingUserDto waitingUser = MatchingUserDto.builder()
                .premium(false)
                .userStudyLanguage("영어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("한국어").build())
                .userStudyLanguageGradeScore(2)
                .userRating(3.8)
                .build();

        assertFalse(matchingService.isPossibleUser(matchingUser, waitingUser));
        assertFalse(matchingService.isPossibleUser(waitingUser, matchingUser));
    }

    @DisplayName("둘다 프리미엄일 때 매칭 된다.")
    @Test
    public void testIsPossibleUser_BothPremium() {
        MatchingUserDto matchingUser = MatchingUserDto.builder()
                .premium(true)
                .userStudyLanguage("한국어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("영어").build())
                .userStudyLanguageGradeScore(4)
                .userRating(4.5)
                .build();

        MatchingUserDto waitingUser = MatchingUserDto.builder()
                .premium(true)
                .userStudyLanguage("영어")
                .userNativeLanguage(LanguageDto.builder().languageKorName("한국어").build())
                .userStudyLanguageGradeScore(4)
                .userRating(4.0)
                .build();

        assertTrue(matchingService.isPossibleUser(matchingUser, waitingUser));
    }
}
