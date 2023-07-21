package com.ssafy.airlingo.domain.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.report.entity.ReportItem;

@Repository
public interface ReportItemRepository extends JpaRepository<ReportItem, Long> {
	public List<ReportItem> findAll();
}
