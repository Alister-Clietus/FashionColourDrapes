package com.fashionapp.fashionService.service;

import java.io.IOException;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.fashionapp.fashionService.dto.ClientDto;
import com.fashionapp.fashionService.dto.ClientIddto;
import com.fashionapp.fashionService.dto.ClientNoteDTO;
import com.itextpdf.text.DocumentException;

public interface ClientService 
{
	ResponseEntity<?> addClientDetails(ClientDto clientdto);
	ResponseEntity<?> addClientNotes(ClientNoteDTO clientnote);
	ResponseEntity<?> updateClientDetails(ClientDto clientdto);
	ResponseEntity<?> deleteClientDetails(ClientIddto clientdto);
	JSONObject getAllClientDetails();
	JSONObject getClientDetails(ClientIddto clientdto);
	JSONObject getClientPhotos(ClientIddto clientdto);
	ResponseEntity<?> uploadImage(MultipartFile file,String email);
	ResponseEntity<?> uploadFlagImage(MultipartFile file,String email,String rgb);
	public JSONObject searchfor(String searchParam,int start, int pageSize);
	public byte[]  generatePDFClientDetails(ClientIddto clientdto) throws DocumentException, IOException;

}
