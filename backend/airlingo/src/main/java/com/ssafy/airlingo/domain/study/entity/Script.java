package com.ssafy.airlingo.domain.study.entity;

import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AttributeOverride(name = "createdDate", column = @Column(name = "script_created_date"))
@AttributeOverride(name = "modifiedDate", column = @Column(name = "script_modified_date"))
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "script")
@Entity
public class Script extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scriptId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "study_id", nullable = false)
	private Study study;

	@Lob
	@Column(nullable = false)
	private String scriptContent;

	@Column(nullable = false, length = 100)
	private String scriptUrl;
}
