package com.damounts.gdsmanager.repository;

import com.damounts.gdsmanager.entity.Apply;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {

  List<Apply> findAllBy(Sort sort);

}
