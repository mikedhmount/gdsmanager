package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.*;
import com.damounts.gdsmanager.repository.ApplyRepository;
import com.damounts.gdsmanager.repository.ReaderRepository;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.*;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class ApplyService {

  private final ApplyRepository applyRepository;
  private final ReaderService readerService;
  private final GdsService gdsService;
  private final XMLParserService xmlParserService;

  public ApplyService(ApplyRepository applyRepository, ReaderService readerService, GdsService gdsService, XMLParserService xmlParserService) {
    this.applyRepository = applyRepository;
    this.readerService = readerService;
    this.gdsService = gdsService;
    this.xmlParserService = xmlParserService;
  }

  public List<Apply> getAll() {
    return applyRepository.findAll();
  }
  public Apply findById(Long id) {
    return applyRepository.findById(id).orElse(null);
  }
  public void save(Apply apply) {
    applyRepository.save(apply);
  }
  public void delete(Apply apply) {
    applyRepository.delete(apply);
  }

  public List<Apply> getAllSorted(){
    return applyRepository.findAll(Sort.by(
      Sort.Order.asc("readerId"),
      Sort.Order.asc("commandType")
    ));
  }

  public List<Reader> getAllReaders() {
    return readerService.getAllReaders();
  }

  public void apply() throws ParserConfigurationException, IOException, SAXException, NoSuchAlgorithmException {
    //      Get all Applies
    List<Apply> applies = getAllSorted();
    long previousId = 0;
    for (Apply apply : applies) {
      //    Get reader info
      Reader reader = readerService.getReaderById(apply.getReaderId());
      if(apply.getReaderId() != previousId){

        //    Login
        String response = gdsService.login(apply.getReaderId());
        //    Parse response for ChallengeCode
        String auth = xmlParserService.parseLogin(response);
        //    MD5 ChallengeCode and required string
        String challengeResponse = fixChallenge(auth, reader.getReaderPassword());
        //    Auth
        String authResponse = gdsService.Auth(challengeResponse, apply.getReaderId());
        System.out.println(authResponse);
      }
      if(apply.getCommandType() == 1){
        String addHolidayResponse = gdsService.addHoliday(apply);
        System.out.println(addHolidayResponse);
        delete(apply);
      }
      if(apply.getCommandType() == 2){
        //    Add Schedule
        String ScheduleResponse = gdsService.addSchedule(apply);
        System.out.println(ScheduleResponse);
        delete(apply);
      }
      if(apply.getCommandType() == 3){
        //    Add Groups
        String GroupResponse = gdsService.addGroup(apply);
        System.out.println(GroupResponse);
        delete(apply);
      }
      if(apply.getCommandType() == 4){
        //    Add Members
      }

    }
  }

  public String fixChallenge(String challenge, String password) throws UnsupportedEncodingException, NoSuchAlgorithmException {
    String challengeString = challenge + ":GDS3710lZpRsFzCbM:" + password;
    byte[] bytesOfChallenge = challengeString.getBytes(StandardCharsets.UTF_8);

    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] md5Digest = md.digest(bytesOfChallenge);
    BigInteger no = new BigInteger(1, md5Digest);
    String hashText = no.toString(16);
    while (hashText.length() < 32) {
      hashText = "0" + hashText;
    }
    return hashText;
  }





//                Holidays

//      Saves holiday to be applied for each reader
  public ResponseEntity<String> commitHoliday(Holiday holiday){
    List<Reader> readers = getAllReaders();
    for (Reader reader : readers) {
      Apply apply = new Apply();
      apply.setReaderId(reader.getReaderId());
      apply.setReaderIp(reader.getReaderIp());
      apply.setReaderPort(reader.getReaderPort());
      apply.setCommandType(1);
      String holidayStartDate = holiday.getHolidayStart().toString().replace("-", "");
      String holidayEndDate = holiday.getHolidayEnd().toString().replace("-", "");
      apply.setCommand("https://" + reader.getReaderIp() + ":" + reader.getReaderPort() +
        "/goform/config?cmd=set&P" + holiday.getHolidayId() + "=" +
        holiday.getHolidayName() + "," + holidayStartDate + "@" + holidayEndDate);
      save(apply);
    }
    return ResponseEntity.ok().build();
  }
//    Deletes holiday to be applied for each reader -- Hold off on this until it's figured out


  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  //                Groups

  //      Saves Group
  public ResponseEntity<String> commitGroup(Group group) {
    List<Reader> readers = getAllReaders();
    for (Reader reader : readers) {
      Apply apply = new Apply();
      apply.setReaderId(reader.getReaderId());
      apply.setReaderIp(reader.getReaderIp());
      apply.setReaderPort(reader.getReaderPort());
      apply.setCommandType(3);
      apply.setCommand("https://" + reader.getReaderIp() + ":" + reader.getReaderPort() +
        "/goform/config?cmd=set&groupid=" + group.getGroupId() + "&groupname=" + group.getGroupName() + "&schid=" + group.getSchedId());
      save(apply);
    }
    return ResponseEntity.ok().build();
  }

  //      Delete Group

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//              Schedules

//      Save Schedule
  public ResponseEntity<String> commitSchedule(Schedule schedule) {
    List<Reader> readers = getAllReaders();
    for (Reader reader : readers) {
      Apply apply = new Apply();
      apply.setReaderId(reader.getReaderId());
      apply.setReaderIp(reader.getReaderIp());
      apply.setReaderPort(reader.getReaderPort());
      apply.setCommandType(2);
      int holidayTime = 0;
      if(schedule.isHolidays()){
        holidayTime = 1;
      }
      String sundayStart = schedule.getSundayStart().toString().replace(":", "");
      String sundayEnd = schedule.getSundayEnd().toString().replace(":", "");
      String mondayStart = schedule.getMondayStart().toString().replace(":", "");
      String mondayEnd = schedule.getMondayEnd().toString().replace(":", "");
      String tuesdayStart = schedule.getTuesdayStart().toString().replace(":", "");
      String tuesdayEnd = schedule.getTuesdayEnd().toString().replace(":", "");
      String wednesdayStart = schedule.getWednesdayStart().toString().replace(":", "");
      String wednesdayEnd = schedule.getWednesdayEnd().toString().replace(":", "");
      String thursdayStart = schedule.getThursdayStart().toString().replace(":", "");
      String thursdayEnd = schedule.getThursdayEnd().toString().replace(":", "");
      String fridayStart = schedule.getFridayStart().toString().replace(":", "");
      String fridayEnd = schedule.getFridayEnd().toString().replace(":", "");
      String saturdayStart = schedule.getSaturdayStart().toString().replace(":", "");
      String saturdayEnd = schedule.getSaturdayEnd().toString().replace(":", "");
      apply.setCommand("https://" + reader.getReaderIp() + ":" + reader.getReaderPort() +
        "/goform/config?cmd=set&P" + schedule.getScheduleId() + "=" + schedule.getScheduleName() + "@" + holidayTime +
        ",0@" + sundayStart + "@" + sundayEnd + ",1@" + mondayStart + "@" + mondayEnd +
        ",2@" + tuesdayStart + "@" + tuesdayEnd + ",3@" + wednesdayStart + "@" + wednesdayEnd +
        ",4@" + thursdayStart + "@" + thursdayEnd + ",5@" + fridayStart + "@" + fridayEnd +
        ",6@" + saturdayStart + "@" + saturdayEnd);
      save(apply);

    }
    return ResponseEntity.ok().build();
  }



}
