package com.fashionapp.fashionService.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "client_Data")
public class ClientEntity 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(name = "client_email", nullable = false)
    private String clientEmail;

    @Column(name = "client_phone_number")
    private String clientPhoneNumber;
    
    @Column(name = "client_note")
    private String clientNote;
    
    @Column(name = "gender")
    private String gender;
    
    
    
    
    public String getClientNote() {
		return clientNote;
	}

	public void setClientNote(String clientNote) {
		this.clientNote = clientNote;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	@Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo", columnDefinition="LONGBLOB")
    private byte[] clientPhoto;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag1", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag1;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag2", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag2;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag3", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag3;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag4", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag4;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag5", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag5;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag6", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag6;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag7", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag7;
    
    @Lob // Use @Lob annotation for large objects like images
    @Column(name="client_photo_flag8", columnDefinition="LONGBLOB")
    private byte[] clientPhotoFlag8;

    public byte[] getClientPhotoFlag5() {
		return clientPhotoFlag5;
	}

	public void setClientPhotoFlag5(byte[] clientPhotoFlag5) {
		this.clientPhotoFlag5 = clientPhotoFlag5;
	}

	public byte[] getClientPhotoFlag6() {
		return clientPhotoFlag6;
	}

	public void setClientPhotoFlag6(byte[] clientPhotoFlag6) {
		this.clientPhotoFlag6 = clientPhotoFlag6;
	}

	public byte[] getClientPhotoFlag7() {
		return clientPhotoFlag7;
	}

	public void setClientPhotoFlag7(byte[] clientPhotoFlag7) {
		this.clientPhotoFlag7 = clientPhotoFlag7;
	}

	public byte[] getClientPhotoFlag8() {
		return clientPhotoFlag8;
	}

	public void setClientPhotoFlag8(byte[] clientPhotoFlag8) {
		this.clientPhotoFlag8 = clientPhotoFlag8;
	}

	@Column(name = "client_address")
    private String clientAddress;

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
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

	public byte[] getClientPhoto() {
		return clientPhoto;
	}

	public void setClientPhoto(byte[] clientPhoto) {
		this.clientPhoto = clientPhoto;
	}

	public byte[] getClientPhotoFlag1() {
		return clientPhotoFlag1;
	}

	public void setClientPhotoFlag1(byte[] clientPhotoFlag1) {
		this.clientPhotoFlag1 = clientPhotoFlag1;
	}

	public byte[] getClientPhotoFlag2() {
		return clientPhotoFlag2;
	}

	public void setClientPhotoFlag2(byte[] clientPhotoFlag2) {
		this.clientPhotoFlag2 = clientPhotoFlag2;
	}

	public byte[] getClientPhotoFlag3() {
		return clientPhotoFlag3;
	}

	public void setClientPhotoFlag3(byte[] clientPhotoFlag3) {
		this.clientPhotoFlag3 = clientPhotoFlag3;
	}

	public byte[] getClientPhotoFlag4() {
		return clientPhotoFlag4;
	}

	public void setClientPhotoFlag4(byte[] clientPhotoFlag4) {
		this.clientPhotoFlag4 = clientPhotoFlag4;
	}

	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}
}
