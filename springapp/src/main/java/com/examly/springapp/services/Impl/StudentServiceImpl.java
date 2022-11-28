package com.examly.springapp.services.Impl;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dao.CourseDao;
import com.examly.springapp.dao.StudentDao;
import com.examly.springapp.dao.UserDao;
import com.examly.springapp.dto.CourseDto;
import com.examly.springapp.dto.StudentDto;
import com.examly.springapp.exceptions.ResourceNotFoundException;
import com.examly.springapp.exceptions.TableEmptyException;
import com.examly.springapp.models.Course;
import com.examly.springapp.models.Email;
import com.examly.springapp.models.Student;
import com.examly.springapp.models.User;
import com.examly.springapp.services.EmailService;
import com.examly.springapp.services.SmsService;
import com.examly.springapp.services.StudentService;
import com.examly.springapp.utility.api.responses.ApiResponse;


@Service
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	private StudentDao studentDao;
	
	@Autowired 
	private CourseDao courseDao;
	
	@Autowired 
	private UserDao userDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private SmsService smsService;
	

	
	
	private ApiResponse checkStudentEnrollment(StudentDto studentDto) {
		
		ApiResponse response = new ApiResponse(null, false);
		
		String courseName = studentDto.getCourse().getName();
		String email = studentDto.getEmail();
		int courseId = studentDto.getCourse().getId();
		
		Course enrollCourse = this.courseDao.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course", "Id", courseId));
		
		if(!courseName.equals(enrollCourse.getName())) {
			throw new ResourceNotFoundException("Course", "Name", courseName);
		}
		
		List<Student> students = this.studentDao.findAllByEmail(email);
		
		if(!students.isEmpty()) {
			for(Student stud: students) {
				if(stud.getCourse().getId() == enrollCourse.getId()) {
					if(stud.getEligibility().equalsIgnoreCase("Pending")) {
						response.setMessage("You have already applied for " + enrollCourse.getName() + " with Institute: " + enrollCourse.getInstitute().getName());
						response.setStatus(true);
						break;
					}
					else if(stud.getEligibility().equalsIgnoreCase("Accepted")) {
						response.setMessage("Already Enrolled in " + enrollCourse.getName() + " with Institute: " + enrollCourse.getInstitute().getName());
						response.setStatus(true);
						break;
					}
				}
			}
		}
		return response;
	}
	
	
	
	@Override
	public ApiResponse addNewStudent(StudentDto studentDto) {
		ApiResponse response = new ApiResponse(null, false);
		
		String email = studentDto.getEmail();
		
		this.userDao.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User", "Email", email));
		
		response = this.checkStudentEnrollment(studentDto);
		
		if(response.getStatus() == true) {
			response.setStatus(false);
			return response;
		}
		
		Student newStudent = this.modelMapper.map(studentDto, Student.class);
		this.studentDao.save(newStudent);
		response.setMessage("Student has been added");
		response.setStatus(true);
		
		return response;
	}
		
	@Override
	public ApiResponse enrollStudentToCourse(StudentDto studentDto ) {
		ApiResponse response = new ApiResponse(null, false);
		
		String email = studentDto.getEmail();
		Course enrollCourse = studentDto.getCourse();

		User user = this.userDao.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User", "Email", email));
		
		response = this.checkStudentEnrollment(studentDto);

		if(response.getStatus() == true){
			response.setStatus(false);
			return response;
		}
		
		Student student = this.modelMapper.map(studentDto, Student.class);
			
		this.studentDao.save(student);
		
		response.setMessage("Application for " + enrollCourse.getName() + " sent ");
		response.setStatus(true);
		
		String emailMessage = String.format("Dear %s,"+"\n"+"Your Application for "+enrollCourse.getName()+"-"+ enrollCourse.getInstitute().getName()+"has been sent successfuly", studentDto.getFirstname());
		String status = this.emailService.sendSimpleEmail(new Email(email,emailMessage, "Enrollment Application Notification"));
		System.out.println(status);
		
		this.smsService.sendSms("Your application for " + enrollCourse.getName() + "-" + enrollCourse.getInstitute().getName() + " has been sent", studentDto.getMobile());
		
		return response;
	}

	@Override
	public ApiResponse deleteStudent(int studentId) {
		Student student = this.studentDao.findById(studentId).orElseThrow(()->new ResourceNotFoundException("Student", "id", studentId));
		
		this.studentDao.delete(student);
		return new ApiResponse("Student with Id : " + student.getId()+" has been deleted", true);
	}

	@Override
	public ApiResponse updateStudentInfo(StudentDto studentDto, int studentId) {
		Student student = this.studentDao.findById(studentId).orElseThrow(()->new ResourceNotFoundException("Student", "id", studentId));
		
		student.setAddress(studentDto.getAddress());
		student.setDob(studentDto.getDob());
		student.setEmail(studentDto.getEmail());
		student.setFathername(studentDto.getFathername());
		student.setFirstname(studentDto.getFirstname());
		student.setLastname(studentDto.getLastname());
		student.setGender(studentDto.getGender());
		student.setMothername(studentDto.getMothername());
		student.setMobile(studentDto.getMobile());
		student.setSslc(studentDto.getSslc());
		student.setHsc(studentDto.getHsc());
		student.setEligibility(studentDto.getEligibility());
		
		this.studentDao.save(student);
		return new ApiResponse("Student with Id: "+student.getId()+" has been updated", true);
	}
	

	@Override
	public List<StudentDto> getAllStudents() {
		List<Student> students =this.studentDao.getAllStudents();
		if(students.isEmpty()) {
			throw new TableEmptyException("Students");
		}
		
		List<StudentDto> studentDtos = students.
											stream()
											.map(student->this.modelMapper.map(student, StudentDto.class))
											.collect(Collectors.toList());
		
		return  studentDtos;
	}

	@Override
	public List<CourseDto> getAllMyCourses(String email) {
		List<Student> students = this.studentDao.findAllByEmail(email);
		
		if(students != null) {
			List<Course> courses = new ArrayList<>();
			for(Student student: students) {
				courses.add(student.getCourse());
			}
			

			List<CourseDto> courseDtos = courses.stream().map(course->this.modelMapper.map(course, CourseDto.class)).collect(Collectors.toList());
			return courseDtos;
			
		}
		return null;
	}

	@Override
	public List<StudentDto> getApplicants() {
		List<Student> applicants = this.studentDao.getAllApplicants();
		if(applicants.isEmpty()) {
			return null;
		}
		List<StudentDto> applicantDtos  = applicants.stream().map(applicant->this.modelMapper.map(applicant, StudentDto.class)).collect(Collectors.toList());
		return applicantDtos;
	}

	@Override
	public List<StudentDto> getAllByEmail(String email) {
		List<Student> studentAdmissions = this.studentDao.findAllByEmail(email);
		if(studentAdmissions.isEmpty()) {
			return null;
		}
		List<StudentDto> studentAdmissionDtos = studentAdmissions.stream().map(student->this.modelMapper.map(student, StudentDto.class)).collect(Collectors.toList());
		
		return studentAdmissionDtos;
	}

}
