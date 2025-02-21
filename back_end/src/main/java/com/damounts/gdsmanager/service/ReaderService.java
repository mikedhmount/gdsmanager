package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.Reader;
import com.damounts.gdsmanager.repository.ReaderRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReaderService {

  private ReaderRepository readerRepository;
  private PasswordEncoder passwordEncoder;
  public ReaderService(ReaderRepository readerRepository, PasswordEncoder passwordEncoder) {
    this.readerRepository = readerRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public List<Reader> getAllReaders(){
    return readerRepository.findAll();
  }
  public Reader getReaderById(Long id){
    return readerRepository.findByReaderId(id);
  }
  public Reader saveReader(Reader reader){
//    reader.setReaderPassword(passwordEncoder.encode(reader.getReaderPassword()));
    return readerRepository.save(reader);
  }
  public Reader updateReader(Reader reader){
//    reader.setReaderPassword(passwordEncoder.encode(reader.getReaderPassword()));
    return readerRepository.save(reader);
  }
  public void deleteReader(Long readerId){
    readerRepository.deleteByReaderId(readerId);
  }
}
