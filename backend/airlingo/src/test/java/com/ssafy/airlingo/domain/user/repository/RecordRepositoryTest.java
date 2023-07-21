// package com.ssafy.airlingo.domain.user.repository;
//
// import java.util.List;
//
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
//
// import com.ssafy.airlingo.domain.language.entity.Grade;
// import com.ssafy.airlingo.domain.language.entity.Language;
// import com.ssafy.airlingo.domain.language.entity.Record;
// import com.ssafy.airlingo.domain.language.repository.GradeRepository;
// import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
// import com.ssafy.airlingo.domain.language.repository.UserLanguageRepository;
// import com.ssafy.airlingo.domain.study.entity.Study;
// import com.ssafy.airlingo.domain.study.repository.StudyRepository;
// import com.ssafy.airlingo.domain.user.entity.User;
// import com.ssafy.airlingo.domain.user.entity.UserState;
//
// @SpringBootTest
// class RecordRepositoryTest {
//
//     @Autowired
//     RecordRepository recordRepository;
//
//     @Autowired
//     UserRepository userRepository;
//
//     @Autowired
//     GradeRepository gradeRepository;
//
//     @Autowired
//     LanguageRepository languageRepository;
//
//     @Autowired
//     UserLanguageRepository userLanguageRepository;
//
//     @Autowired
//     StudyRepository studyRepository;
//
//     @Test
//     public void insert() {
//         User user = createUser();
//
//         Language language = languageRepository.findById(1).orElseThrow(() -> {
//             throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
//         });
//
//         Grade grade = gradeRepository.findById(1).orElseThrow(() -> {
//             throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
//         });
//
//         Study study = Study.builder()
//                 .studyTime(10).build();
//         Study savedStudy = studyRepository.save(study);
//
//         Record record = Record.builder()
//                 .user(user)
//                 .language(language)
//                 .grade(grade)
//                 .study(savedStudy)
//                 .build();
//         Record savedRecord = recordRepository.save(record);
//         System.out.println("savedRecord.toString() = " + savedRecord.toString());
//     }
//
//     private User createUser() {
//         Language language = languageRepository.findById(1).orElseThrow(() -> {
//             throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
//         });
//
//         User user = User.builder()
//                 .userNickname("userNickname7")
//                 .userLoginId("userLoginId7")
//                 .userPassword("userPassword7")
//                 .userEmail("userEmail7")
//                 .userGoogleId("7")
//                 .userImgUrl("비어있음")
//                 .userBio("비어있음")
//                 .userNativeLanguage(language)
//                 .userMileage(0)
//                 .userTotalMileage(0)
//                 .userRating(0)
//                 .userTotalRating(0)
//                 .userStudyCount(0)
//                 .userComplain(0)
//                 .userState(UserState.ACTIVE)
//                 .userPassportStyle(1)
//                 .build();
//         return userRepository.save(user);
//     }
//
//     @Test
//     public void find() {
//         User user = userRepository.findById(2L).orElseThrow(() -> {
//             throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
//         });
//
//         //지연로딩
//         List<Record> records = recordRepository.findByUser(user);
//         System.out.println(records.get(0).getRecordId());
//
//         //fetch join으로 다 가져옴
//         List<Record> fetchRecord = recordRepository.findRecordByUser(user);
//         System.out.println(fetchRecord.get(0));
//     }
//
// }