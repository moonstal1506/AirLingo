package com.ssafy.airlingo.domain.study.entity;

import java.util.List;

import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AttributeOverride(name = "createdDate", column = @Column(name = "study_created_date"))
@AttributeOverride(name = "modifiedDate", column = @Column(name = "study_modified_date"))
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "study")
@Entity
public class Study extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long studyId;

	@Column(nullable = false)
	private int studyTime;

	@OneToMany(mappedBy = "study", cascade = CascadeType.ALL, orphanRemoval = true)
	@Column(nullable = false)
	private List<Script> scripts;
}
