package com.ssafy.airlingo.domain.study.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.study.entity.Script;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {

}
