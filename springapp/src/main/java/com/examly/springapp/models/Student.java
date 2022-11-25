package com.examly.springapp.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="students")
public class Student {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="studentId")
	private int id;
	
	@Column(nullable=false)
	private String firstname;
	
	@Column(nullable=true)
	private String lastname;
		
	@Column(nullable=true)
	private String mothername;
	
	@Column(nullable=true)
	private String fathername;
	
	@Column(nullable=false)
	private String gender;
	
	@Column(name="studentDOB", nullable=false)
	private Date dob;
	
	@Column(nullable=false)
	private String email;
	
	@Column(nullable=false)
	private String address;
	
	@Column(nullable=false)
	private String mobile;
	
	@Column(nullable=false)
	private int sslc;
	
	@Column(nullable=false)
	private int hsc;
	
	@Column(columnDefinition = "varchar(255) default 'Pending'")
	private String eligibility;
	
	@ManyToOne()
	@JoinColumn(name="course_id")
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

	public String getMothername() {
		return mothername;
	}

	public void setMothername(String mothername) {
		this.mothername = mothername;
	}

	public String getFathername() {
		return fathername;
	}

	public void setFathername(String fathername) {
		this.fathername = fathername;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	
	
}
