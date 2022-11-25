package com.examly.springapp.dto;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class RegisterDto {
	private int id;
	
	@NotEmpty(message="Role cannot be empty or null: Needs to either Admin or User")
	private String role;
	
	@NotEmpty(message="Username is not specified")
	private String name;
	
	@NotEmpty(message="User's contact is not specified")
	private String contact;
	
	@NotEmpty(message="Password has to be created or specified")
	private String password;
	
	@Email(message="Email is not specified")
	@NotEmpty(message="Email can not be empty")
	private String email;

	

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String userContact) {
		this.contact = userContact;
	}
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
}
