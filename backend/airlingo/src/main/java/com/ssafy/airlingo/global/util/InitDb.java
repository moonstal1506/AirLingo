package com.ssafy.airlingo.global.util;

import java.util.ArrayList;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.entity.CardCode;
import com.ssafy.airlingo.domain.content.entity.Sentence;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.report.entity.ReportItem;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.study.entity.UserStudy;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.entity.UserState;
import com.ssafy.airlingo.domain.word.entity.Word;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Profile("dev")
@Component
@RequiredArgsConstructor
public class InitDb {

	private final InitService initService;

	@PostConstruct
	public void init() {
		initService.reportItemInit();
		initService.CardInit();
		initService.gradeInit();
		initService.languageInit();
		initService.userAndStudyInit();
		initService.sentenceInit();
	}

	@Component
	@Transactional
	@RequiredArgsConstructor
	static class InitService {

		private final EntityManager em;

		public void CardInit() {
			Card cf1 = Card.builder()
				.cardCode(CardCode.FOOD)
				.cardKor("좋아하는 요리나 음식 종류가 있으신가요?")
				.cardEng("eng")
				.build();

			Card cf2 = Card.builder()
				.cardCode(CardCode.FOOD)
				.cardKor("자주 요리하시나요? 가장 자신 있는 요리는 무엇인가요?")
				.cardEng("eng2")
				.build();

			Card ct1 = Card.builder()
				.cardCode(CardCode.TRAVEL)
				.cardKor("가장 기억에 남는 여행 경험을 한 번 공유해 주실 수 있나요?")
				.cardEng("eng")
				.build();

			Card ct2 = Card.builder()
				.cardCode(CardCode.TRAVEL)
				.cardKor("여행지를 선택할 때 예산, 문화, 자연 등 어떤 점을 고려하시나요?")
				.cardEng("eng2")
				.build();

			Card cw1 = Card.builder()
				.cardCode(CardCode.WEATHER)
				.cardKor("오늘 날씨가 어떤가요?")
				.cardEng("eng")
				.build();

			Card cw2 = Card.builder()
				.cardCode(CardCode.WEATHER)
				.cardKor("오늘 날씨가 어떤가요?")
				.cardEng("eng2")
				.build();

			Card ch1 = Card.builder()
				.cardCode(CardCode.HOBBY)
				.cardKor("가장 좋아하는 취미가 무엇인가요? 어떤 매력 때문에 그 취미를 가장 좋아하세요?")
				.cardEng("eng")
				.build();

			Card ch2 = Card.builder()
				.cardCode(CardCode.HOBBY)
				.cardKor("최근에 관심을 갖고 있는 새로운 취미가 있으신가요?")
				.cardEng("eng2")
				.build();

			em.persist(cf1);
			em.persist(cf2);
			em.persist(cw1);
			em.persist(cw2);
			em.persist(ch1);
			em.persist(ch2);
			em.persist(ct1);
			em.persist(ct2);
		}

		/**
		 *  신고항목 초기화
		 */
		public void reportItemInit() {

			ReportItem r1 = ReportItem.builder()
				.reportItemKor("욕설 또는 공격적인 언어")
				.reportItemEng("Profanity or Offensive Language")
				.build();

			ReportItem r2 = ReportItem.builder()
				.reportItemKor("부적절한 행동")
				.reportItemEng("Hateful Behavior")
				.build();

			ReportItem r3 = ReportItem.builder()
				.reportItemKor("부적절한 콘텐츠")
				.reportItemEng("Inappropriate Content")
				.build();

			ReportItem r4 = ReportItem.builder()
				.reportItemKor("스팸 또는 원치 않는 메시지")
				.reportItemEng("Spam or Unwanted Messages")
				.build();

			ReportItem r5 = ReportItem.builder()
				.reportItemKor("저작권 침해 ")
				.reportItemEng("Copyright Infringement")
				.build();

			ReportItem r6 = ReportItem.builder()
				.reportItemKor("사칭")
				.reportItemEng("Impersonation")
				.build();

			ReportItem r7 = ReportItem.builder()
				.reportItemKor("기타(위 범주에 포함되지 않는 기타 문제의 경우)")
				.reportItemEng("ETC")
				.build();

			em.persist(r1);
			em.persist(r2);
			em.persist(r3);
			em.persist(r4);
			em.persist(r5);
			em.persist(r6);
			em.persist(r7);
		}

		public void languageInit() {
			Language l1 = Language.builder()
				.languageKorName("한국어")
				.languageEngName("Korean")
				.imageUrl("https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg")
				.build();

			Language l2 = Language.builder()
				.languageKorName("영어")
				.languageEngName("English")
				.imageUrl("https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-britain-icon.svg")
				.build();

			Language l3 = Language.builder()
				.languageKorName("일본어")
				.languageEngName("Japanese")
				.imageUrl("https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-japan-icon.svg")
				.build();

			Language l4 = Language.builder()
				.languageKorName("중국어")
				.languageEngName("Chinese")
				.imageUrl("https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-china-icon.svg")
				.build();

			em.persist(l1);
			em.persist(l2);
			em.persist(l3);
			em.persist(l4);
		}

		public void gradeInit() {
			Grade g1 = Grade.builder()
				.gradeName("A1")
				.gradeKorName("입문")
				.gradeScore(1)
				.build();

			Grade g2 = Grade.builder()
				.gradeName("A2")
				.gradeKorName("초급")
				.gradeScore(2)
				.build();

			Grade g3 = Grade.builder()
				.gradeName("B1")
				.gradeKorName("중급")
				.gradeScore(3)
				.build();

			Grade g4 = Grade.builder()
				.gradeName("B2")
				.gradeKorName("중상급")
				.gradeScore(4)
				.build();

			Grade g5 = Grade.builder()
				.gradeName("C1")
				.gradeKorName("상급")
				.gradeScore(5)
				.build();

			Grade g6 = Grade.builder()
				.gradeName("C2")
				.gradeKorName("최상급")
				.gradeScore(6)
				.build();

			em.persist(g1);
			em.persist(g2);
			em.persist(g3);
			em.persist(g4);
			em.persist(g5);
			em.persist(g6);
		}

		public void userAndStudyInit() {
			User u1 = User.builder()
				.userNickname("user1")
				.userLoginId("user1")
				.userPassword("1234")
				.userEmail("user1@gmail.com")
				.userGoogleId("")
				.userImgUrl(
					"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png")
				.userBio("")
				.userNativeLanguage(
					Language.builder().languageId(1L).languageKorName("한국어").languageEngName("Korean").build())
				.userMileage(100)
				.userTotalMileage(1000)
				.userRating(3.0)
				.userTotalRating(6.0)
				.userStudyCount(2)
				.userComplain(0)
				.userState(UserState.ACTIVE)
				.userPassportStyle(1)
				.build();

			User u2 = User.builder()
				.userNickname("user2")
				.userLoginId("user2")
				.userPassword("12345")
				.userEmail("user2@gmail.com")
				.userGoogleId("")
				.userImgUrl(
					"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png")
				.userBio("")
				.userNativeLanguage(
					Language.builder().languageId(2L).languageKorName("영어").languageEngName("English").build())
				.userMileage(3200)
				.userTotalMileage(3200)
				.userRating(4)
				.userTotalRating(8)
				.userComplain(0)
				.userState(UserState.ACTIVE)
				.userPassportStyle(1)
				.userStudyCount(2)
				.build();

			ArrayList<UserLanguage> uls1 = new ArrayList<>();
			ArrayList<UserLanguage> uls2 = new ArrayList<>();

			Language l1 = new Language(1L, "한국어", "Korean",
				"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg");
			Language l2 = new Language(2L, "영어", "English",
				"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-britain-icon.svg");
			Language l3 = new Language(3L, "일본어", "Japanese",
				"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-japan-icon.svg");
			Language l4 = new Language(4L, "중국어", "Chinese",
				"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-china-icon.svg");
			Grade g1 = new Grade(1L, "A1", "입문", 1);
			Grade g2 = new Grade(2L, "A2", "초급", 2);
			Grade g3 = new Grade(3L, "B1", "중급", 3);
			UserLanguage u1l2 = UserLanguage.builder().user(u1).language(l2).grade(g1).build();
			UserLanguage u1l3 = UserLanguage.builder().user(u1).language(l3).grade(g2).build();
			UserLanguage u2l1 = UserLanguage.builder().user(u2).language(l1).grade(g3).build();

			em.persist(u1);
			em.persist(u2);
			em.persist(u1l2);
			em.persist(u1l3);
			em.persist(u2l1);

			Study s1 = Study.builder()
				.studyTime(15)
				.build();

			Study s2 = Study.builder()
				.studyTime(20)
				.build();

			Study s3 = Study.builder()
				.studyTime(15)
				.build();

			em.persist(s1);
			em.persist(s2);
			em.persist(s3);

			UserStudy us1 = UserStudy.builder()
				.study(s1)
				.user(u1)
				.language(l2)
				.build();

			UserStudy us2 = UserStudy.builder()
				.study(s1)
				.user(u2)
				.language(l1)
				.build();

			UserStudy us3 = UserStudy.builder()
				.study(s2)
				.user(u1)
				.language(l3)
				.build();

			UserStudy us4 = UserStudy.builder()
				.study(s2)
				.user(u2)
				.language(l1)
				.build();

			UserStudy us5 = UserStudy.builder()
				.study(s3)
				.user(u1)
				.language(l3)
				.build();

			UserStudy us6 = UserStudy.builder()
				.study(s3)
				.user(u2)
				.language(l1)
				.build();

			em.persist(us1);
			em.persist(us2);
			em.persist(us3);
			em.persist(us4);
			em.persist(us5);
			em.persist(us6);

			Word word1 = Word.builder()
				.user(u1)
				.wordName("airline")
				.wordDescription("항공사")
				.build();
			Word word2 = Word.builder()
				.user(u1)
				.wordName("airplane")
				.wordDescription("비행기")
				.build();
			Word word3 = Word.builder()
				.user(u1)
				.wordName("language")
				.wordDescription("언어")
				.build();
			Word word4 = Word.builder()
				.user(u1)
				.wordName("lingual")
				.wordDescription("혀의, 말의, 언어의")
				.build();
			Word word5 = Word.builder()
				.user(u1)
				.wordName("bilingual")
				.wordDescription("두 개 언어를 할 줄 아는")
				.build();
			Word word6 = Word.builder()
				.user(u1)
				.wordName("world")
				.wordDescription("세계")
				.build();
			Word word7 = Word.builder()
				.user(u1)
				.wordName("travel")
				.wordDescription("여행")
				.build();
			Word word8 = Word.builder()
				.user(u1)
				.wordName("passport")
				.wordDescription("여권")
				.build();
			Word word9 = Word.builder()
				.user(u1)
				.wordName("lounge")
				.wordDescription("라운지, 느긋하게 서있다, 휴게실")
				.build();
			Word word10 = Word.builder()
				.user(u1)
				.wordName("foreigner")
				.wordDescription("외국인")
				.build();
			Word word11 = Word.builder()
				.user(u1)
				.wordName("neighborhood")
				.wordDescription("근처, 인근, 이웃")
				.build();
			Word word12 = Word.builder()
				.user(u1)
				.wordName("旅行")
				.wordDescription("여행")
				.build();
			Word word13 = Word.builder()
				.user(u1)
				.wordName("飛行機")
				.wordDescription("비행기")
				.build();
			Word word14 = Word.builder()
				.user(u1)
				.wordName("話す")
				.wordDescription("말하다")
				.build();

			em.persist(word1);
			em.persist(word2);
			em.persist(word3);
			em.persist(word4);
			em.persist(word5);
			em.persist(word6);
			em.persist(word7);
			em.persist(word8);
			em.persist(word9);
			em.persist(word10);
			em.persist(word11);
			em.persist(word12);
			em.persist(word13);
			em.persist(word14);
		}

		public void sentenceInit() {
			Sentence sentence1 = Sentence.builder()
				.sentenceEng("As far as I am concerned, the report should be finished now.")
				.sentenceKor("제가 아는 바에 의하면 지금쯤 보고서가 완성되었어야 하는데요.")
				.build();

			Sentence sentence2 = Sentence.builder()
				.sentenceEng("I've completed the research but I still need time to write up the report.")
				.sentenceKor("연구를 끝냈습니다만, 보고서를 작성하기 위한 시간이 더 필요해요.")
				.build();

			Sentence sentence3 = Sentence.builder()
				.sentenceEng("We do have a table in the garden if you'd prefer to eat out there.")
				.sentenceKor("밖에서 식사하는 것이 좋다면 정원에 테이블이 준비되어 있습니다.")
				.build();

			Sentence sentence4 = Sentence.builder()
				.sentenceEng("he receptionist wants to know if you can help her with her computer.")
				.sentenceKor("접수원은 당신이 컴퓨터에 관련된 도움을 줄 수 있는지 알고 싶어해요.")
				.build();

			Sentence sentence5 = Sentence.builder()
				.sentenceEng("You still have to deal with traffic.")
				.sentenceKor("여전히 교통 문제를 해결해야 할거에요.")
				.build();

			em.persist(sentence1);
			em.persist(sentence2);
			em.persist(sentence3);
			em.persist(sentence4);
			em.persist(sentence5);
		}
	}
}
