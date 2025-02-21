package com.damounts.gdsmanager.repository;

import com.damounts.gdsmanager.entity.Reader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, Long> {
  Reader findByReaderId(long id);
  Optional<Reader> findByReaderIp(String readerIp);

  @Transactional
  void deleteByReaderId(long id);
}
