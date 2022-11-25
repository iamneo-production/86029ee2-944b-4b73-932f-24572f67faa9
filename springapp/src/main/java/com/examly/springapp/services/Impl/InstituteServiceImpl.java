package com.examly.springapp.services.Impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dao.CourseDao;
import com.examly.springapp.dao.InstituteDao;
import com.examly.springapp.dao.StudentDao;
import com.examly.springapp.dto.CourseDto;
import com.examly.springapp.dto.InstituteDto;
import com.examly.springapp.exceptions.ResourceNotFoundException;
import com.examly.springapp.models.Course;
import com.examly.springapp.models.Institute;
import com.examly.springapp.models.Student;
import com.examly.springapp.services.InstituteService;
import com.examly.springapp.utility.api.responses.ApiResponse;


@Service
public class InstituteServiceImpl implements InstituteService{
	
	@Autowired
	private InstituteDao instituteDao;
	
	@Autowired
	private CourseDao courseDao;
	
	@Autowired
	private StudentDao studentDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public InstituteDto getInstitute(int instituteId) {
		Institute institute = this.instituteDao.findById(instituteId).orElseThrow(()->new ResourceNotFoundException("Institute", "Id", instituteId));
		
		return this.modelMapper.map(institute, InstituteDto.class);
	}


	@Override
	public List<InstituteDto> getAllInstitutes() {
		List<Institute> institutes = this.instituteDao.findAll();
		if(institutes.size() == 0) {
			throw new ResourceNotFoundException("Institutes", "List", "Empty");
		}
		List<InstituteDto> instituteDtos = institutes.stream().map(institute->this.modelMapper.map(institute, InstituteDto.class)).collect(Collectors.toList());
		return instituteDtos;
		
	}
	
	@Override 
	public List<InstituteDto> searchInstitute(String keyword){
		List<Institute> institutes = this.instituteDao.findByNameContainingIgnoreCase(keyword);
		
		if(institutes.size() == 0) {
			throw new ResourceNotFoundException("Institute", "Name", keyword);
		}
		
		List<InstituteDto> instituteDtos = institutes.stream().map(institute->this.modelMapper.map(institute, InstituteDto.class)).collect(Collectors.toList());
		
		return instituteDtos;
	}
	
	@Override
	public List<CourseDto> getAllInstituteCourses(int instituteId){
		Institute institute = this.instituteDao.findById(instituteId).orElseThrow(()->new ResourceNotFoundException("Institute", "Id", instituteId));
		List<CourseDto> coursesDtos = institute.getCourses().stream().map(course->this.modelMapper.map(course, CourseDto.class)).collect(Collectors.toList());
		
		return coursesDtos;
	}
	
	@Override
	public ApiResponse addNewInstitute(InstituteDto instituteDto) {
		ApiResponse response = new ApiResponse(null, false);
		Institute institute = this.modelMapper.map(instituteDto, Institute.class);
		String name = institute.getName();
		if(this.instituteDao.findByName(name) !=null) {
			response.setMessage("Institute Already Exists");
			response.setStatus(false);
			return response;
		}
		this.instituteDao.save(institute);
		response.setMessage("Institute has been Added");
		response.setStatus(true);
		
		return response;
	}
	
	@Override 
	public ApiResponse addNewCourse(CourseDto newCourseDto, int instituteId) {
		Institute institute = this.instituteDao.findById(instituteId).orElseThrow(()->new ResourceNotFoundException("Institute", "Id", instituteId));
		
		Set<Course> instituteCourses= institute.getCourses();
		
		Course newCourse = this.modelMapper.map(newCourseDto, Course.class);
		newCourse.setInstitute(institute);
		
		if(!instituteCourses.isEmpty()) {
			for(Course course: instituteCourses) {
				if(course.getName().equalsIgnoreCase(newCourse.getName()))
					return new ApiResponse("Course Already Exists", false);
			}
		}
		else {
			instituteCourses = new HashSet<>();
		}
		
		instituteCourses.add(newCourse);
		
		institute.setCourses(instituteCourses);
		
		this.courseDao.save(newCourse);
		
		this.instituteDao.save(institute);
		
		return new ApiResponse("Course Added", true);
	}
	

	@Override
	public ApiResponse removeInstitute(int id) {
		
		Institute institute = this.instituteDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Institute", "id", id));
		
		Set<Course> courses = institute.getCourses();
		
		if(!courses.isEmpty()) {
			List<Student> students = new ArrayList<>();
			for(Course course: courses) {
				students = this.studentDao.findAllByCourseId(course.getId());
				if(!students.isEmpty()) {
					this.studentDao.deleteAll(students);
				}
			}
		}
		
		this.instituteDao.delete(institute);
		
		ApiResponse response = new ApiResponse("Institute has been Removed", true);
		
		return response;
	}

	@Override
	public ApiResponse updateInstituteInfo(InstituteDto instituteDto, int id) {
		Institute institute = this.instituteDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Institute", "id", id));
		
		institute.setName(instituteDto.getName());
		institute.setAddress(instituteDto.getAddress());
		institute.setDescription(instituteDto.getDescription());
		institute.setEmail(instituteDto.getEmail());
		institute.setMobile(instituteDto.getMobile());
		
		this.instituteDao.save(institute);
		
		return new ApiResponse("Institute has been Updated", true);
	}

	
}
