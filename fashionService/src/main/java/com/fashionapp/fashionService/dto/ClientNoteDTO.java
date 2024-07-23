package com.fashionapp.fashionService.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class ClientNoteDTO 
{
    @Email
    private String clientEmail;
    
    @NotEmpty
    private String clientNote;

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}

	public String getClientNote() {
		return clientNote;
	}

	public void setClientNote(String clientNote) {
		this.clientNote = clientNote;
	}
    
    

}
