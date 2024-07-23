package com.fashionapp.fashionService.dto;

import jakarta.validation.constraints.Email;

public class ClientIddto 
{
    @Email
    private String clientEmail;

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}
    
    

}
