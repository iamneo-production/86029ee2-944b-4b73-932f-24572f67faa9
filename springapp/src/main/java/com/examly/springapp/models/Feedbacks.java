package com.examly.springapp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table
public class Feedbacks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	
	@NotEmpty(message="Feedback comments section should not be empty")
	@Column(nullable=true)
	private String comments;
	
	
	@ManyToOne()
	@JoinColumn(name = "User_id")
	private User user;

	public Feedbacks(int id, String comments) {
		super();
		this.id = id;
		this.comments = comments;
	}
	
	

	public Feedbacks() {
		super();
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
	
	
}
