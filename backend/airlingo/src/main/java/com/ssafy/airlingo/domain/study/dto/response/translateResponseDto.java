package com.ssafy.airlingo.domain.study.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class translateResponseDto {
	private List<String> beforeTrans;
	private List<String> afterTrans;
}

