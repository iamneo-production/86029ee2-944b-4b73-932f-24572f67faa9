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
import com.examly.springapp.dto.InstituteDto;
import com.examly.springapp.dto.StudentDto;
import com.examly.springapp.services.CourseService;
import com.examly.springapp.services.InstituteService;
import com.examly.springapp.services.StudentService;
import com.examly.springapp.utility.api.responses.ApiResponse;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private CourseService courseService;
	
	@Autowired	
	private InstituteService instituteService;
	
	@Autowired
	private StudentService studentService;
	
		/*------------------------------------------CourseApi-------------------------------------------*/
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(
			path="/addCourse",
			consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> addCourse(@Valid @RequestBody CourseDto newCourse)
	{		
			ApiResponse response = courseService.addCourse(newCourse);
			if(!response.getStatus()) {
				return new ResponseEntity<ApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);	
		
	}	
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping(
			path="/editCourse/{courseId}",
			consumes=MediaType.APPLICATION_JSON_VALUE
			)
	public ResponseEntity<ApiResponse> editCourse(@Valid @RequestBody CourseDto courseDto, @PathVariable("courseId") int courseId){
		ApiResponse response = this.courseService.updateCourse(courseDto, courseId);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(path="/deleteCourse/{courseId}")
	public ResponseEntity<ApiResponse> deleteCourse(@PathVariable("courseId")int courseId) {
		ApiResponse response = this.courseService.deleteCourse(courseId);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	
		/*--------------------------------------------------InstituteApi-------------------------------*/
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(
			path="/addInstitute",
			consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> addInstitute(@Valid @RequestBody InstituteDto newInstituteDto)
	{
		ApiResponse response = instituteService.addNewInstitute(newInstituteDto);
		 
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);	
	}
	
	@PutMapping(
			path="/institute/{instituteId}/addCourse",
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> addInstituteCourse(@Valid @RequestBody CourseDto courseDto, @PathVariable("instituteId")int instituteId){
		ApiResponse response = this.instituteService.addNewCourse(courseDto, instituteId);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(path="/deleteInstitute/{instituteId}")
	public ResponseEntity<ApiResponse> deleteInstitute(@Valid @PathVariable("instituteId") int instituteId) {
		
		ApiResponse response = this.instituteService.removeInstitute(instituteId);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(
			path="/editInstitute/{instituteId}",
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> updateInstitute(@Valid @RequestBody InstituteDto instituteDto, @PathVariable("instituteId")int id ){
		
		ApiResponse response = this.instituteService.updateInstituteInfo(instituteDto, id);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		
		
	}
	
	/*-------------------------------------------------------Student Api---------------------------------------*/
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(
			path="/editStudent/{id}",
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> updateStudentInfo(@PathVariable("id") int studentId, @Valid @RequestBody StudentDto studentDto){
		ApiResponse response = this.studentService.updateStudentInfo(studentDto, studentId);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(
			path="/viewStudents", 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StudentDto>> getAllStudents(){
		List<StudentDto> students = this.studentService.getAllStudents();
		return new ResponseEntity<List<StudentDto>>(students, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(
			path="/addStudent",
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> addStudent(@Valid @RequestBody StudentDto studentDto){
		ApiResponse response = this.studentService.addNewStudent(studentDto);
	
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);	
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(
			path="/deleteStudent/{id}")
	public ResponseEntity<ApiResponse> deleteStudent(@PathVariable("id") int studentId){
		ApiResponse response=this.studentService.deleteStudent(studentId);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(
			path="/viewApplications", 
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StudentDto>> viewApplications(){
		List<StudentDto> applicants = this.studentService.getApplicants();
		
		return new ResponseEntity<List<StudentDto>>(applicants, HttpStatus.OK);
	}
	
}
