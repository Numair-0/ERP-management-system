import { studentRepository } from '../repositories/studentRepository.js';

function validate(body) {
  if (!body?.name?.trim()) return 'Student name is required.';
  if (!body?.className?.trim()) return 'Course or class is required.';
  return null;
}

export async function listStudents(request, response, next) {
  try { response.json({ data: await studentRepository.list(request.query) }); } catch (error) { next(error); }
}

export async function getStudent(request, response, next) {
  try {
    const data = await studentRepository.findById(request.params.studentId);
    if (!data) return next(Object.assign(new Error('Student not found.'), { statusCode: 404 }));
    response.json({ data });
  } catch (error) { next(error); }
}

export async function createStudent(request, response, next) {
  try {
    const validationError = validate(request.body);
    if (validationError) return next(Object.assign(new Error(validationError), { statusCode: 400 }));
    response.status(201).json({ data: await studentRepository.create(request.body), message: 'Student created successfully.' });
  } catch (error) { next(error.code === 11000 ? Object.assign(new Error('Admission number already exists.'), { statusCode: 409 }) : error); }
}

export async function updateStudent(request, response, next) {
  try {
    const validationError = validate(request.body);
    if (validationError) return next(Object.assign(new Error(validationError), { statusCode: 400 }));
    const data = await studentRepository.update(request.params.studentId, request.body);
    if (!data) return next(Object.assign(new Error('Student not found.'), { statusCode: 404 }));
    response.json({ data, message: 'Student updated successfully.' });
  } catch (error) { next(error); }
}

export async function deleteStudent(request, response, next) {
  try {
    const data = await studentRepository.softDelete(request.params.studentId);
    if (!data) return next(Object.assign(new Error('Student not found.'), { statusCode: 404 }));
    response.json({ data, message: 'Student archived successfully.' });
  } catch (error) { next(error); }
}