package com.ssafy.airlingo.domain.language.dto.response;

public class MileageGrade {

	public static String getMileageGrade(int mileage) {
		if (mileage < 5_000) {
			return "카고";
		}
		if (mileage < 10_000) {
			return "이코노미";
		}
		if (mileage < 30_000) {
			return "프레스티지";
		}
		if (mileage < 70_000) {
			return "퍼스트 클래스";
		}
		return "콕핏";
	}
}
