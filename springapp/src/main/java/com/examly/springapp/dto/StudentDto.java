package com.examly.springapp.dto;

import java.util.Date;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.examly.springapp.models.Course;

public class StudentDto {

	private int id;
	
	@NotEmpty(message="Student's firstname needs to be given")
	private String firstname;
	
	@NotEmpty(message="Student's lastname needs to be given")
	private String lastname;
	
	@NotEmpty(message="Student Address needs to given")
	private String address;
	
	@NotNull(message="Date of Birth needs to be given")
	private Date dob;
	
	@NotNull(message=" SSLC needs to be given")
	private int sslc;
	
	@NotNull(message="High School Marks needs to given")
	private int hsc;
	
	private String eligibility;
	
	@NotEmpty(message="Father's name needs to be given")
	private String fathername;
	
	@NotEmpty(message="Mother's name needs to be given")
	private String mothername;
	
	@NotEmpty(message="Email needs to be specified")
	@Email(message="invalid format of email")
	private String  email;
	
	@NotEmpty(message="mobile number needs to be given")
	private String mobile;
	
	@NotEmpty(message="Gender must be given")
	private String gender;
	
	@NotNull(message="Course should not be empty")
	private Course course;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public int getSslc() {
		return sslc;
	}

	public void setSslc(int sslc) {
		this.sslc = sslc;
	}

	public int getHsc() {
		return hsc;
	}

	public void setHsc(int hsc) {
		this.hsc = hsc;
	}

	public String getEligibility() {
		return eligibility;
	}

	public void setEligibility(String eligibility) {
		this.eligibility = eligibility;
	}

	public String getFathername() {
		return fathername;
	}

	public void setFathername(String fathername) {
		this.fathername = fathername;
	}

	public String getMothername() {
		return mothername;
	}

	public void setMothername(String mothername) {
		this.mothername = mothername;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	
}
