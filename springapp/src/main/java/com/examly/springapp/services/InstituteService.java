package com.examly.springapp.services;

import java.util.List;

import com.examly.springapp.dto.CourseDto;
import com.examly.springapp.dto.InstituteDto;
import com.examly.springapp.models.Course;
import com.examly.springapp.utility.api.responses.ApiResponse;

public interface InstituteService {
	
	public InstituteDto getInstitute(int instituteId) throws Exception;
	
	public List<InstituteDto> getAllInstitutes() throws Exception;
	
	public ApiResponse addNewInstitute(InstituteDto instituteDto);
	
	public ApiResponse removeInstitute(int id);
	
	public ApiResponse updateInstituteInfo(InstituteDto instituteDto, int id);
	
	public List<InstituteDto> searchInstitute(String keyword);
	
	public List<CourseDto> getAllInstituteCourses(int instituteId);
	
	public ApiResponse addNewCourse(CourseDto newCourseDto, int instituteId);
	

}
