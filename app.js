const students = [ 
    { ID: 1, name: 'Alice', email: 'alice@example.com', age: 21, grade: 'A', degree: 'Btech'}, 
    { ID: 2, name: 'Bob', email: 'bob@example.com' , age: 22, grade: 'B', degree: 'MBA'}, 
    { ID: 3, name: 'Charlie', email: 'charlie@example.com', age: 20, grade: 'C', degree:'Arts'} 
];
console.log(' 1 ');
// const NAME = document.getElementById('name');
// const EMAIL = document.getElementById('email');
// const CGPA = document.getElementById('GPA');
// const AGE = document.getElementById('age');
// const DEGREE = document.getElementById('degree');

const tableBody = document.getElementById('StuTb');
const form = document.getElementById('STform');
const submitButton = document.getElementById('addSt');
const searchInput = document.getElementById('SearchInputTEXT');

let editStudentId = null;
console.log(' 2 ');

function renderStudentsTable() {
  tableBody.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');
    console.log('in the R S T function');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td class="INtbodyTD" >${student.name}</td>
      <td class="INtbodyTD" >${student.email}</td>
      <td class="INtbodyTD" >${student.age}</td>
      <td class="INtbodyTD" >${student.grade}</td>
      <td class="INtbodyTD" >${student.degree}
            <button class="edit-button" data-id="${student.ID}">Edit</button> 
            <button class="delete-button" data-id="${student.ID}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function resetForm() {
  form.reset();
  submitButton.textContent = 'Add Student';
  editStudentId = null;
}

function addStudent(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const grade = document.getElementById('GPA').value;
  const age = document.getElementById('age').value;
  const degree = document.getElementById('degree').value;

  if (name && age && grade && degree && email) {
    if (editStudentId) {
      const studentIndex = students.findIndex(student => student.ID === editStudentId);
      if (studentIndex !== -1) {
        students[studentIndex] = { ID: editStudentId, name, age, grade, degree, email };
        editStudentId = null;
      }
    } else {
      const newStudentId = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
      students.push({ ID: newStudentId, name, age, grade, degree, email });
    }

    renderStudentsTable();
    resetForm();
  }
}

function editStudent(event) {
  const studentId = event.target.dataset.id;
  const student = students.find(student => student.ID === Number(studentId));

  if (student) {
    document.getElementById('student-id').value = student.ID;
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('GPA').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;
    submitButton.textContent = 'Edit Student';
    editStudentId = student.ID;
  }
}

function deleteStudent(event) {
  const studentId = event.target.dataset.id;
  const studentIndex = students.findIndex(student => student.ID === Number(studentId));

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    renderStudentsTable();
  }
}

function searchStudents() {
  const searchText = searchInput.value.toLowerCase();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchText) ||
    student.email.toLowerCase().includes(searchText) ||
    student.degree.toLowerCase().includes(searchText)
  );

  tableBody.innerHTML = '';
  filteredStudents.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td class="INtbodyTD" >${student.name}</td>
      <td class="INtbodyTD" >${student.email}</td>
      <td class="INtbodyTD" >${student.age}</td>
      <td class="INtbodyTD" >${student.grade}</td>
      <td class="INtbodyTD" >${student.degree}
        <button class="edit-button" data-id="${student.ID}">Edit</button>
        <button class="delete-button" data-id="${student.ID}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

renderStudentsTable();

form.addEventListener('submit', addStudent);
tableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    editStudent(event);
  } else if (event.target.classList.contains('delete-button')) {
    deleteStudent(event);
  }
});
searchInput.addEventListener('input', searchStudents);
