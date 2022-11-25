package com.examly.springapp.services;

import java.util.List;

import com.examly.springapp.dto.CourseDto;
import com.examly.springapp.dto.InstituteDto;
import com.examly.springapp.utility.api.responses.ApiResponse;
import com.examly.springapp.utility.api.responses.OperationResponse;

public interface CourseService {
	
	public ApiResponse addCourse(CourseDto course);
	
	public ApiResponse deleteCourse(int id);
	
	public List<CourseDto> getAllCourses() throws Exception;
	
	public ApiResponse updateCourse(CourseDto course, int id);
	
	public List<CourseDto> searchCourse(String keyword);

}
