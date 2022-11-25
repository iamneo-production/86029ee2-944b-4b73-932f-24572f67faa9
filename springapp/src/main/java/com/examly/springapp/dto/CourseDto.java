package com.examly.springapp.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.examly.springapp.models.Institute;

public class CourseDto {
	
	private int id;
	
	
	@NotEmpty(message="Course Name can not be Empty or Null")
	private String name;
	
	@NotEmpty(message="Course Description can not be Empty or Null")
	private String description;
	
	@NotNull(message="Course duration should be mentioned")
	private int duration;
	
	private Institute institute;

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

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Institute getInstitute() {
		return institute;
	}

	public void setInstitute(Institute institute) {
		this.institute = institute;
	}
	

}
