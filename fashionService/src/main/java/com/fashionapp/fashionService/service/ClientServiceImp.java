package com.fashionapp.fashionService.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.fashionapp.fashionService.dto.ClientDto;
import com.fashionapp.fashionService.dto.ClientIddto;
import com.fashionapp.fashionService.dto.ClientNoteDTO;
import com.fashionapp.fashionService.entity.ClientEntity;
import com.fashionapp.fashionService.repository.ClientRepo;
import com.fashionapp.fashionService.repository.specifications.SecurityUserSpec;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;


@Service
public class ClientServiceImp implements ClientService
{
	private static Logger logger = LogManager.getLogger(ClientServiceImp.class);
	@Autowired
	ClientRepo clientrepo;


	public ResponseEntity<?> addClientDetails(ClientDto clientdto) {
	    try {
	        // Check if a client with the same email address already exists
	        Optional<ClientEntity> existingClient = Optional.ofNullable(clientrepo.findByClientEmail(clientdto.getClientEmail()));
	        if (existingClient.isPresent()) {
	            // Client with the same email already exists
	            logger.info("Client with the email address already exists.");
	            return new ResponseEntity<>("Failed to add client details: Client with this email already exists.", HttpStatus.CONFLICT);
	        }

	        // Proceed to add new client
	        ClientEntity entity = new ClientEntity();
	        entity.setClientAddress(clientdto.getClientAddress());
	        entity.setClientEmail(clientdto.getClientEmail());
	        entity.setClientName(clientdto.getClientName());
	        entity.setClientPhoneNumber(clientdto.getClientPhoneNumber());
	        entity.setGender(clientdto.getClientGender());
	        clientrepo.save(entity);

	        logger.info("Client Added to the Database");
	        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	    } catch (Exception e) {
	        logger.info("Exception Occurred in Adding Data to Client");
	        logger.error("Error: " + e.getMessage(), e);
	        return new ResponseEntity<>("Failed to add client details: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}



	public ResponseEntity<?> updateClientDetails(ClientDto clientdto) {
	    try {
	        ClientEntity cliententity = clientrepo.findByClientEmail(clientdto.getClientEmail());
	        
	        if (cliententity == null) {
	            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
	        }
	        
	        cliententity.setClientAddress(clientdto.getClientAddress());
	        cliententity.setClientEmail(clientdto.getClientEmail());
	        cliententity.setClientPhoneNumber(clientdto.getClientPhoneNumber());
	        cliententity.setClientName(clientdto.getClientName());
	        cliententity.setGender(clientdto.getClientGender());
	        clientrepo.save(cliententity);
	        logger.info("Client Data Updated Successfully");
	        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	    } catch (Exception e) {
	    	logger.info("Exception Occured in Updating Data to Client");
	    	logger.error("Error : " + e.getMessage(), e);
	        return new ResponseEntity<>("Failed to update client details: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	public ResponseEntity<?> deleteClientDetails(ClientIddto clientdto) {
	    try {
	        ClientEntity cliententity = clientrepo.findByClientEmail(clientdto.getClientEmail());
	        
	        if (cliententity == null) {
	            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
	        }
	        
	        clientrepo.deleteById(cliententity.getClientId());
	        return new ResponseEntity<>("DELETED", HttpStatus.OK);
	    } catch (Exception e) {
	    	logger.error("Error : " + e.getMessage(), e);
	        return new ResponseEntity<>("Failed to delete client details: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	public JSONObject getAllClientDetails() 
	{
		JSONObject result = new JSONObject();
		try {
//			PageRequest pageable = PageRequest.of(start / pageSize, pageSize);
//			Specification<EntityClass> spec = SecurityUserSpec.getUserSpec(searchParam);
//			Page<EntityClass> usersList = repo.findAll(spec,pageable);
			List<ClientEntity> usersList = clientrepo.findAll();

			JSONArray array = new JSONArray();
//			JSONArray countByStatus = countByStatus(spec);
			for (ClientEntity users : usersList) {
				JSONObject obj = new JSONObject();
				obj.put("ID", users.getClientId());
				obj.put("NAME", users.getClientName());
				obj.put("EMAIL", users.getClientEmail());
				obj.put("PHONENUMBER", users.getClientPhoneNumber());
				obj.put("ADDRESS", users.getClientAddress());
				array.add(obj);
			}
			result.put("aaData", array);
			result.put("iTotalDisplayRecords", clientrepo.findAll().size());
//			result.put("iTotalRecords", repo.findAll(spec).size());
//			result.put("countByStatus", countByStatus);
		} catch (Exception e) {
			logger.error("Error : " + e.getMessage(), e);
		}
		return result;
	}

	
	public ResponseEntity<?> uploadImage(MultipartFile file,String email)
	{
		try
		{
			System.out.println(email);
			Optional<ClientEntity> profile = Optional.ofNullable(clientrepo.findByClientEmail(email));
		    if (profile.isPresent()) {
		    	ClientEntity entity=profile.get();
		    	byte[] imageBytes = file.getBytes();
		    	entity.setClientPhoto(imageBytes);
		    	clientrepo.save(entity);
		        return new ResponseEntity<>("OK", HttpStatus.OK);
		    } else {
		        return new ResponseEntity<>("ERROR: Person not found", HttpStatus.NOT_FOUND);
		    }
		}
		catch(Exception e)
		{
	        return new ResponseEntity<>("ERROR", HttpStatus.NOT_FOUND);
		}
	}


	public JSONObject getClientDetails(ClientIddto clientdto) 
	{
		JSONObject result = new JSONObject();
		JSONObject obj = new JSONObject();
		ClientEntity cliententity = clientrepo.findByClientEmail(clientdto.getClientEmail());
		if (cliententity == null) {
			obj.put("STATUS", "FAILED");
			return obj;
        }
		obj.put("STATUS", "SUCCESS");
		obj.put("ID", cliententity.getClientId());
		obj.put("USERNAME", cliententity.getClientName());
		obj.put("NAME", cliententity.getClientName());
		obj.put("EMAIL", cliententity.getClientEmail());
		obj.put("PHONENUMBER", cliententity.getClientPhoneNumber());
		obj.put("ADDRESS", cliententity.getClientAddress());
		obj.put("PINCODE", cliententity.getClientPhoneNumber());
		obj.put("GENDER", cliententity.getGender());
		obj.put("IMAGE", cliententity.getClientPhoto());

		result.put("aaData", obj);
		return result;
	}
	
	public ResponseEntity<?> uploadFlagImage(MultipartFile file,String email,String rgb)
	{
		try
		{
			Optional<ClientEntity> profile = Optional.ofNullable(clientrepo.findByClientEmail(email));
		    if (profile.isPresent()) {
		    	ClientEntity entity=profile.get();
		    	byte[] imageBytes = file.getBytes();
		    	if(rgb.equals("red1"))
		    	{
			    	entity.setClientPhotoFlag1(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		    	else if(rgb.equals("red2"))
		    	{
			    	entity.setClientPhotoFlag2(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		    	else if(rgb.equals("red3"))
		    	{
			    	entity.setClientPhotoFlag3(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		    	else if(rgb.equals("red4"))
		    	{
			    	entity.setClientPhotoFlag4(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		    	else if(rgb.equals("silver"))
		    	{
			    	entity.setClientPhotoFlag5(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		    	else if(rgb.equals("gold"))
		    	{
			    	entity.setClientPhotoFlag6(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		    	else
		    	{
			    	entity.setClientPhotoFlag7(imageBytes);
			    	clientrepo.save(entity);
			    	return new ResponseEntity<>("OK", HttpStatus.OK);
		    	}
		        
		    } 
		    else 
		    {
		        return new ResponseEntity<>("ERROR: Person not found", HttpStatus.NOT_FOUND);
		    }
		}
		catch(Exception e)
		{
	        return new ResponseEntity<>("ERROR", HttpStatus.NOT_FOUND);
		}
	}
	
	public JSONObject getClientPhotos(ClientIddto clientdto)
	{
		System.out.println();
		JSONObject result = new JSONObject();
		JSONObject obj = new JSONObject();
		ClientEntity cliententity = clientrepo.findByClientEmail(clientdto.getClientEmail());
		if (cliententity == null) {
			obj.put("STATUS", "FAILED");
			return obj;
        }
		obj.put("STATUS", "SUCCESS");
		obj.put("ID", cliententity.getClientId());
		obj.put("USERNAME", cliententity.getClientName());
		obj.put("PHOTO1", cliententity.getClientPhotoFlag1());
		obj.put("PHOTO2", cliententity.getClientPhotoFlag2());
		obj.put("PHOTO3", cliententity.getClientPhotoFlag3());
		obj.put("PHOTO4", cliententity.getClientPhotoFlag4());
		obj.put("PHOTO5", cliententity.getClientPhotoFlag5());
		obj.put("PHOTO6", cliententity.getClientPhotoFlag6());
		obj.put("PHOTO7", cliententity.getClientPhotoFlag7());
		obj.put("PHOTO8", cliententity.getClientPhotoFlag8());
		result.put("aaData", obj);
		return result;
	}
	
	public JSONObject searchfor(String searchParam,int start, int pageSize) 
	{
		JSONObject result = new JSONObject();
		try {
			PageRequest pageable = PageRequest.of(start / pageSize, pageSize);
			Specification<ClientEntity> spec = SecurityUserSpec.getUserSpec(searchParam);
			Page<ClientEntity> usersList = clientrepo.findAll(spec,pageable);
			JSONArray array = new JSONArray();
//			JSONArray countByStatus = countByStatus(spec);
			for (ClientEntity users : usersList) {
				JSONObject obj = new JSONObject();
				obj.put("ID", users.getClientId());
				obj.put("NAME", users.getClientName());
				obj.put("EMAIL", users.getClientEmail());
				obj.put("PHONENUMBER", users.getClientPhoneNumber());
				obj.put("ADDRESS", users.getClientAddress());
				array.add(obj);
			}
			result.put("aaData", array);
			result.put("iTotalDisplayRecords", clientrepo.findAll().size());
			result.put("iTotalRecords", clientrepo.findAll(spec).size());
			result.put("countByStatus", 22);
		} catch (Exception e) {
			logger.error("Error:" + e.getMessage(), e);
		}
		return result;
	}
	
	public byte[] generatePDFClientDetails(ClientIddto clientdto) throws DocumentException, IOException {
		try {
		    ClientEntity client = clientrepo.findByClientEmail(clientdto.getClientEmail());
		    if (client == null) {
		        return null;
		    }

		    ByteArrayOutputStream out = new ByteArrayOutputStream();
		    Document document = new Document(PageSize.A4, 50, 50, 50, 50);
		    PdfWriter.getInstance(document, out);
		    document.open();

		    // Adding title
		    Font titleFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD, BaseColor.BLUE);
		    Paragraph title = new Paragraph("Client Details", titleFont);
		    title.setAlignment(Element.ALIGN_CENTER);
		    document.add(title);
		    document.add(Chunk.NEWLINE);

		    // Adding client details in a table
		    PdfPTable table = new PdfPTable(2);
		    table.setWidthPercentage(100);
		    table.setSpacingBefore(10f);
		    table.setSpacingAfter(10f);

		    Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
		    PdfPCell header;

		    header = new PdfPCell(new Phrase("Field", headerFont));
		    header.setBackgroundColor(BaseColor.GRAY);
		    table.addCell(header);

		    header = new PdfPCell(new Phrase("Details", headerFont));
		    header.setBackgroundColor(BaseColor.GRAY);
		    table.addCell(header);

		    // Adding client details
		    addClientDetail(table, "Client ID:", client.getClientId().toString());
		    addClientDetail(table, "Client Name:", client.getClientName());
		    addClientDetail(table, "Phone Number:", client.getClientPhoneNumber());
		    addClientDetail(table, "Gender:", client.getGender());
		    addClientDetail(table, "Address:", client.getClientAddress());

		    document.add(table);

		    // Adding client profile photo
		    Paragraph profilePhotoTitle = new Paragraph("Client Profile Photo", titleFont);
		    profilePhotoTitle.setSpacingBefore(20f);
		    profilePhotoTitle.setSpacingAfter(10f);
		    document.add(profilePhotoTitle);

		    PdfPTable profilePhotoTable = new PdfPTable(1);
		    profilePhotoTable.setWidthPercentage(100);
		    profilePhotoTable.setSpacingBefore(10f);
		    profilePhotoTable.setSpacingAfter(10f);

		    addImageToTable(profilePhotoTable, client.getClientPhoto());
		    document.add(profilePhotoTable);

		    // Adding flagged photos
		    Paragraph flaggedPhotosTitle = new Paragraph("Flagged Photos", titleFont);
		    flaggedPhotosTitle.setSpacingBefore(20f);
		    flaggedPhotosTitle.setSpacingAfter(10f);
		    document.add(flaggedPhotosTitle);

		    PdfPTable flaggedPhotosTable = new PdfPTable(3);
		    flaggedPhotosTable.setWidthPercentage(100);
		    flaggedPhotosTable.setSpacingBefore(10f);
		    flaggedPhotosTable.setSpacingAfter(10f);

		    addImageToTable(flaggedPhotosTable, client.getClientPhotoFlag1());
		    addImageToTable(flaggedPhotosTable, client.getClientPhotoFlag3());
		    addImageToTable(flaggedPhotosTable, client.getClientPhotoFlag4());
		    addImageToTable(flaggedPhotosTable, client.getClientPhotoFlag5());
		    addImageToTable(flaggedPhotosTable, client.getClientPhotoFlag6());
		    addImageToTable(flaggedPhotosTable, client.getClientPhotoFlag7());

		    document.add(flaggedPhotosTable);

		    document.close();
		    return out.toByteArray();
		} catch (Exception e) {
		    logger.error("Error : " + e.getMessage(), e);
		    return null;
		}
	}

	private void addClientDetail(PdfPTable table, String field, String value) {
	    PdfPCell cell;

	    cell = new PdfPCell(new Phrase(field));
	    table.addCell(cell);

	    cell = new PdfPCell(new Phrase(value));
	    table.addCell(cell);
	}

	private void addImageToTable(PdfPTable table, byte[] imageBytes) throws DocumentException, IOException {
	    if (imageBytes != null) {
	        Image image = Image.getInstance(imageBytes);
	        image.scaleToFit(150, 150);
	        PdfPCell cell = new PdfPCell(image);
	        cell.setBorder(Rectangle.NO_BORDER);
	        cell.setPadding(10);
	        table.addCell(cell);
	    } else {
	        PdfPCell cell = new PdfPCell();
	        cell.setBorder(Rectangle.NO_BORDER);
	        cell.setPadding(10);
	        table.addCell(cell);
	    }
	}
	
	public ResponseEntity<?> addClientNotes(ClientNoteDTO clientnote)
	{
	    try {
	        ClientEntity cliententity = clientrepo.findByClientEmail(clientnote.getClientEmail());
	        
	        if (cliententity == null) {
	            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
	        }
	        cliententity.setClientNote(clientnote.getClientNote());
	        clientrepo.save(cliententity);
	        logger.info("Client Note Uploaded Successfully");
	        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	    } catch (Exception e) {
	    	logger.info("Exception Occured in Updating Data to Client");
	    	logger.error("Error : " + e.getMessage(), e);
	        return new ResponseEntity<>("Failed to update client details: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
    



	
	
}
