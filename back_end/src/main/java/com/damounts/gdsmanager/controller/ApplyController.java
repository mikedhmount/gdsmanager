package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.Apply;
import com.damounts.gdsmanager.service.ApplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
public class ApplyController {

  private final ApplyService applyService;
  public ApplyController(ApplyService applyService) {
    this.applyService = applyService;
  }

  @GetMapping("/api/getApplies")
  public List<Apply> getApplies(){
    return applyService.getAllSorted();
  }

  @GetMapping("/api/apply")
  public ResponseEntity<String> apply() throws ParserConfigurationException, IOException, SAXException, NoSuchAlgorithmException {
    applyService.apply();
    return ResponseEntity.ok().build();
  }
}
