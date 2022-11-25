package com.examly.springapp.dto;



import javax.validation.constraints.NotEmpty;

public class InstituteDto {
	
	private int id;
	
	@NotEmpty(message="Name of the institute should not be null or empty")
	private String name;
	
	@NotEmpty(message="Description of the institute should not be null or empty")
	private String description;
	
	@NotEmpty(message="Address of the institute should be provided")
	private String address;
	
	@NotEmpty(message="Mobile of the institute should be provided")
	private String mobile;
	
	@NotEmpty(message="Email of the institute should be provided")
	private String email;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}

}
