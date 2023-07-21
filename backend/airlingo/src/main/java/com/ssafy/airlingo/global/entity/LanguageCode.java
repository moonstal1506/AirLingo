package com.ssafy.airlingo.global.entity;

import lombok.Getter;

@Getter
public enum LanguageCode {
	KOR("KOR"),
	ENG("ENG");

	private String code;

	LanguageCode(String code) {
		this.code = code;
	}
}
