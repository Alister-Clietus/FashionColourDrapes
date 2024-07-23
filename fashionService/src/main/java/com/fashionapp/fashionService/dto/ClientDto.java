package com.fashionapp.fashionService.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ClientDto 
{

	@NotEmpty
    private String clientName;

	@NotEmpty
    private String username;
	
	@NotEmpty
    @Email
    private String clientEmail;

    @NotEmpty
    private String clientPhoneNumber;
    
    @NotEmpty
    private String clientAddress;
    
    
    @NotEmpty
    private String pincode;
    


	public String getPincode() {
		return pincode;
	}

	@NotEmpty
    private String clientGender;
    
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

    
	public String getClientGender() {
		return clientGender;
	}

	public void setClientGender(String clientGender) {
		this.clientGender = clientGender;
	}


	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}

	public String getClientPhoneNumber() {
		return clientPhoneNumber;
	}

	public void setClientPhoneNumber(String clientPhoneNumber) {
		this.clientPhoneNumber = clientPhoneNumber;
	}
    
    

}
