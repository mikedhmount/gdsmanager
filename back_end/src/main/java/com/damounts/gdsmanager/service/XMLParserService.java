package com.damounts.gdsmanager.service;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;

@Service
public class XMLParserService {

  public String parseLogin(String loginString) throws ParserConfigurationException, IOException, SAXException {
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();
    Document document = builder.parse(new InputSource(new StringReader(loginString)));

    NodeList nodeList = document.getElementsByTagName("ChallengeCode");
    Node node = null;
    for (int i = 0; i < nodeList.getLength(); i++) {
      node = nodeList.item(i);
    }
    assert node != null;
    return node.getTextContent();
  }
}
