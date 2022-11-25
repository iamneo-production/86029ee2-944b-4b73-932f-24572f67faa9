package com.examly.springapp.services.Impl;

import java.util.List;
import java.util.Optional;
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
import com.examly.springapp.services.CourseService;
import com.examly.springapp.utility.api.responses.ApiResponse;


@Service
public class CourseServiceImpl implements CourseService{
	@Autowired
	private CourseDao courseDao;

	@Autowired
	private StudentDao studentDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse addCourse(CourseDto courseDto) {
		
		Institute institute = courseDto.getInstitute();
		
		
		Set<Course> courses = this.courseDao.findByInstituteId(institute.getId());
		for(Course course:courses) {
			if((course.getName().toLowerCase()).equals((courseDto.getName().toLowerCase()))) {
				return new ApiResponse("Course Already Exists in Insititute: " + institute.getName(), false);
			}
		}
		Course newCourse = this.modelMapper.map(courseDto, Course.class);
		
		this.courseDao.save(newCourse);
		return new ApiResponse("Course added to Institute: " + institute.getName(), true);
		
	}

	@Override
	public ApiResponse deleteCourse(int id) {
		List<Student> students = this.studentDao.findAllByCourseId(id);
		if(!students.isEmpty()) {
			this.studentDao.deleteAll(students);
		}
		Course course = this.courseDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Course", "id", id));
		
		this.courseDao.delete(course);
		
		return new ApiResponse("Course has been deleted", true);
		
	}

	@Override
	public List<CourseDto> getAllCourses()throws Exception{
		List<Course> courses= this.courseDao.findAll();
		if(courses.isEmpty()) {
			throw new ResourceNotFoundException("Courses","List", "Empty");
		}
		List<CourseDto> courseDtos= courses.stream().map(course->this.modelMapper.map(course, CourseDto.class)).collect(Collectors.toList()); 
		
		return courseDtos;
	}

	@Override
	public ApiResponse updateCourse(CourseDto courseDto, int id) {
		Course course = this.courseDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Course", "id", id));
		course.setName(courseDto.getName());
		course.setDescription(courseDto.getDescription());
		course.setDuration(courseDto.getDuration());
		
		this.courseDao.save(course);
		return new ApiResponse("Course has been added", true);
	}

	@Override
	public List<CourseDto> searchCourse(String keyword) {
		List<Course> courses = this.courseDao.findByNameContainingIgnoreCase(keyword);
		
		if(courses.size() == 0) {
			throw new ResourceNotFoundException("Course", "Name", keyword);
		}
		
		List<CourseDto> courseDtos = courses.stream().map(course->this.modelMapper.map(course, CourseDto.class)).collect(Collectors.toList());
		
		return courseDtos;
	}
}
	
	
	
	


