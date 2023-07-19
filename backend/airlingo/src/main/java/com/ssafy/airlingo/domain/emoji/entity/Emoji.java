package com.ssafy.airlingo.domain.emoji.entity;

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
@Table(name = "emoji")
@Entity
public class Emoji {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer emojiId;

	@Column(nullable = false, unique = true, length = 100)
	private String emojiName;
}