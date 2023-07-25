package com.ssafy.airlingo.global.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseDateEntity {

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDate createdDate;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDate modifiedDate;
}
