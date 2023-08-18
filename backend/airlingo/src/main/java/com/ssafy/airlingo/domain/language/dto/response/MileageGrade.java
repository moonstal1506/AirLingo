package com.ssafy.airlingo.domain.language.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "마일리지 등급에 대한 정보")
public class MileageGrade {

	public static final MileageGrade CARGO = new MileageGrade("카고", 4);
	public static final MileageGrade ECONOMY = new MileageGrade("이코노미", 3);
	public static final MileageGrade PRESTIGE = new MileageGrade("프레스티지", 2);
	public static final MileageGrade FIRST_CLASS = new MileageGrade("퍼스트 클래스", 1);
	public static final MileageGrade COCKPIT = new MileageGrade("콕핏", 0);

	@Schema(description = "마일리지 등급 이름", example = "이코노미")
	private String MileageGradeName;

	@Schema(description = "마일리지 등급", example = "1")
	private int MileageRank;

	public static MileageGrade getMileageGrade(int mileage) {
		if (mileage < 5_000) {
			return CARGO;
		}
		if (mileage < 10_000) {
			return ECONOMY;
		}
		if (mileage < 30_000) {
			return PRESTIGE;
		}
		if (mileage < 70_000) {
			return FIRST_CLASS;
		}
		return COCKPIT;
	}
}