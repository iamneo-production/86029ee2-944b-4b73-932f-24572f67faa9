package com.examly.springapp.controller;

import java.util.List;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.CourseDto;
import com.examly.springapp.dto.FeedbackDto;
import com.examly.springapp.dto.InstituteDto;
import com.examly.springapp.dto.StudentDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.services.CourseService;
import com.examly.springapp.services.FeedbackService;
import com.examly.springapp.services.InstituteService;
import com.examly.springapp.services.StudentService;
import com.examly.springapp.utility.api.responses.ApiResponse;

@CrossOrigin("http://localhost:3000")
@RestController()
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	CourseService courseService;
	
	@Autowired
	InstituteService instituteService;
	
	@Autowired
	StudentService studentService;

	@Autowired 
	FeedbackService feedbackService;


	/*---------------------------------------CoursesApi----------------------------*/
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping(
			path="/viewCourses",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CourseDto>> getAllCourses() throws Exception{
		List<CourseDto> courses = this.courseService.getAllCourses();
		return new ResponseEntity<List<CourseDto>>(courses, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping(
			path="/courses/{keyword}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CourseDto>> searchCourse(@PathVariable("keyword")String keyword) throws Exception{
		List<CourseDto> result = this.courseService.searchCourse(keyword);
		return new ResponseEntity<List<CourseDto>>(result, HttpStatus.OK);
	}
	
	
	
	/*-------------------------------------InstituteApi----------------------------*/
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping(
			path="/viewInstitutes",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<InstituteDto>> getAllInstitutes() throws Exception{
		List<InstituteDto> institutes = this.instituteService.getAllInstitutes();
		return new ResponseEntity<List<InstituteDto>>(institutes, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping(
			path="/institutes/{keyword}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<InstituteDto>> searchInstitute(@PathVariable("keyword")String keyword) throws Exception{
		List<InstituteDto> result = this.instituteService.searchInstitute(keyword);
		return new ResponseEntity<List<InstituteDto>>(result, HttpStatus.OK);
	}
	
	
	
	/*---------------------------------Admission------------------------------------*/
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@PutMapping(
			path="/addAdmission", 
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> enrollStudentToCourse(@Valid @RequestBody StudentDto studentDto ){
			
			ApiResponse response = this.studentService.enrollStudentToCourse(studentDto);
			
			
			return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@PutMapping(
			path="/editAdmission/{enrollId}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> editAdmission(@Valid @RequestBody StudentDto studentDto, @PathVariable("enrollId") int enrollId){
		ApiResponse response= this.studentService.updateStudentInfo(studentDto, enrollId);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@DeleteMapping(
			path="/deleteAdmission/{enrollId}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> deleteAdmission(@PathVariable("enrollId") int enrollId){
		ApiResponse response = this.studentService.deleteStudent(enrollId);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping(
			path="/viewAdmission",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StudentDto>> getAllMyCourses(@RequestBody UserDto userDto){
		HttpStatus status = null;
		List<StudentDto> studentAdmission = this.studentService.getAllByEmail(userDto.getEmail());
		
		if(studentAdmission != null) {
			status =  HttpStatus.OK;
		}
		else {
			status = HttpStatus.NO_CONTENT;
		}
		return new ResponseEntity<List<StudentDto>>(studentAdmission, status);
	}
	
	/*------------------------------FeedBack**********************************--*/
	
	@PostMapping(
			path="/postFeedback")
	public ResponseEntity<ApiResponse> recordFeedback(@Valid @RequestBody FeedbackDto feedbackDto){
		ApiResponse response = this.feedbackService.postFeedback(feedbackDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
}
