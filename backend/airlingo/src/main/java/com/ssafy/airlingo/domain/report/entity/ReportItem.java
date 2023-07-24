package com.ssafy.airlingo.domain.report.entity;

import com.ssafy.airlingo.domain.report.dto.response.ReportItemResponseDto;
import com.ssafy.airlingo.global.entity.LanguageCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "report_item")
@Entity
public class ReportItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reportItemId;

	@Column(nullable = false, unique = true)
	private String reportItemKor;

	@Column(nullable = false, unique = true)
	private String reportItemEng;

	public ReportItemResponseDto toReportItemResponseDto(String languageCode) {
		return ReportItemResponseDto.builder()
			.reportItemId(reportItemId)
			.reportItem(languageCode.equals(LanguageCode.KOR.toString())
				? reportItemKor
				: reportItemEng)
			.build();
	}
}
