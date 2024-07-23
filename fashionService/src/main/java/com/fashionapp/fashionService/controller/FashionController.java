package com.fashionapp.fashionService.controller;

import java.io.IOException;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fashionapp.fashionService.dto.ClientDto;
import com.fashionapp.fashionService.dto.ClientIddto;
import com.fashionapp.fashionService.dto.ClientNoteDTO;
import com.fashionapp.fashionService.repository.ClientRepo;
import com.fashionapp.fashionService.service.ClientServiceImp;
import com.itextpdf.text.DocumentException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class FashionController 
{
	@Autowired
	ClientRepo clientrepo;
	
	@Autowired
	ClientServiceImp clientservice;
	
	@PostMapping("/addclientdetails")
	ResponseEntity<?> addClientDetails(@Valid @RequestBody ClientDto clientdto)
	{

		return new ResponseEntity<>(clientservice.addClientDetails(clientdto),HttpStatus.OK);
	}
	
	@GetMapping("/showclientdetails")
	ResponseEntity<?> showAllClientDetails()
	{

		return new ResponseEntity<>(clientservice.getAllClientDetails(),HttpStatus.OK);
	}
	
	@GetMapping("/search")
	ResponseEntity<?> searchDetails(@RequestParam("searchParam") String searchParam, @RequestParam("iDisplayStart") String iDisplayStart,
			@RequestParam("iDisplayLength") String iDisplayLength)
	{
		JSONObject list = clientservice.searchfor(searchParam, Integer.parseInt(iDisplayStart),
				Integer.parseInt(iDisplayLength));
		return new ResponseEntity(list,HttpStatus.OK);
	}
	
	@PostMapping("/getclientdetails")
	ResponseEntity<?> showClientDetails(@RequestBody ClientIddto clientdto)
	{
		return new ResponseEntity<>(clientservice.getClientDetails(clientdto),HttpStatus.OK);
	}
	
	@PostMapping("/getclientphotos")
	ResponseEntity<?> showClientPhotos(@RequestBody ClientIddto clientdto)
	{
		return new ResponseEntity<>(clientservice.getClientPhotos(clientdto),HttpStatus.OK);
	}
	
	@PostMapping("/deleteclientdetails")
	ResponseEntity<?> deleteClientDetails(@RequestBody ClientIddto clientdto)
	{
		return new ResponseEntity<>(clientservice.deleteClientDetails(clientdto),HttpStatus.OK);
	}
	
	@PostMapping("/editclientdetails")
	ResponseEntity<?> updateClientDetails(@RequestBody ClientDto clientdto)
	{
		System.out.println(clientdto.getClientGender());
		return new ResponseEntity<>(clientservice.updateClientDetails(clientdto),HttpStatus.OK);
	}
	
	@PostMapping("/upload/flag/{email}/{rgb}")
	ResponseEntity<?> uploadFlagImages(@RequestPart("file") MultipartFile file,@PathVariable("email") String email,@PathVariable("rgb") String rgb)
	{
		
		if(file!=null)
		{
			System.out.println("File Present in flag function");
			return new ResponseEntity<>(clientservice.uploadFlagImage(file, email,rgb),HttpStatus.OK);
		}
		else
		{
			System.out.println("File Not Present");
			return new ResponseEntity<>("ERROR",HttpStatus.OK);

		}
		
	}
	
	@PostMapping("/upload/{email}")
	ResponseEntity<?> uploadImages(@RequestPart("file") MultipartFile file,@PathVariable("email") String email)
	{
		
		if(file!=null)
		{
			System.out.println("File Present");
			return new ResponseEntity<>(clientservice.uploadImage(file, email),HttpStatus.OK);
		}
		else
		{
			System.out.println("File Not Present");
			return new ResponseEntity<>("ERROR",HttpStatus.OK);

		}
		
	}
	
	@PostMapping("/generatepdf")
	ResponseEntity<?> generatePDFClientDetails(@RequestBody ClientIddto clientdto)
	{
        byte[] pdfBytes;
        try {
            pdfBytes = clientservice.generatePDFClientDetails(clientdto);
        } catch (DocumentException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=client-details.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
	}
	
	@PostMapping("/addnote")
	ResponseEntity<?> addClientNotes(@RequestBody ClientNoteDTO clientnote)
	{
		return new ResponseEntity<>(clientservice.addClientNotes(clientnote),HttpStatus.OK);
	}

}
