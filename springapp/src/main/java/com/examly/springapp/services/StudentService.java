package com.examly.springapp.services;


import java.util.List;

import com.examly.springapp.dto.CourseDto;
import com.examly.springapp.dto.StudentDto;
import com.examly.springapp.utility.api.responses.ApiResponse;

public interface StudentService {
	
	public ApiResponse addNewStudent(StudentDto studentDto);
	
	public ApiResponse enrollStudentToCourse(StudentDto studentDto );
	
	public ApiResponse deleteStudent(int studentId);
	
	public ApiResponse updateStudentInfo(StudentDto studentDto , int studentId); 
	
	
	public List<StudentDto> getAllStudents();
	
	public List<StudentDto> getAllByEmail(String email);
	
	public List<CourseDto> getAllMyCourses(String email);
	
	public List<StudentDto> getApplicants();
	
}
