package com.ssafy.airlingo.domain.language.repository;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.airlingo.domain.language.entity.Grade;

@SpringBootTest
class GradeRepositoryTest {

	@Autowired
	GradeRepository gradeRepository;

	@Test
	public void insert() {
		Grade a1 = new Grade("A1", 1);
		Grade a2 = new Grade("A2", 2);
		Grade b1 = new Grade("B1", 3);
		Grade b2 = new Grade("B2", 4);
		Grade c1 = new Grade("C1", 5);
		Grade c2 = new Grade("C2", 6);


		//데이터베이스에 저장
		Grade savedA1 = gradeRepository.save(a1);
		gradeRepository.save(a2);
		gradeRepository.save(b1);
		gradeRepository.save(b2);
		gradeRepository.save(c1);
		gradeRepository.save(c2);

		//데이터베이스에 저장되어있는 총 개수 리턴
		long count = gradeRepository.count();
		System.out.println("===============================");
		System.out.println("count = " + count);

		//모든 데이터 가져오기
		List<Grade> all = gradeRepository.findAll();
		System.out.println("===============================");
		System.out.println(all);

		//id로 찾기
		Grade findGrade = gradeRepository.findById(savedA1.getGradeId())
			.orElseThrow(() -> {
				throw new IllegalArgumentException("존재하지 않는 아이디 입니다.");
			});
		System.out.println("===============================");
		System.out.println("findGrade = " + findGrade);

		//컬럼명으로 찾기-> repository에 메소드명 작성해야 사용가능
		Grade byGradeName = gradeRepository.findByGradeName("C2");
		System.out.println("===============================");
		System.out.println("byGradeName = " + byGradeName);

		//삭제
		//        gradeRepository.delete(findGrade);
		//        gradeRepository.deleteAll();
	}

}