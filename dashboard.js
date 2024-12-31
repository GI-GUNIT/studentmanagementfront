const apiBaseUrl = "http://localhost:8080/api/students";
let studentsData = []; // To store the full list of students

// Load all students
async function loadStudents() {
    try {
        const response = await fetch(apiBaseUrl);
        studentsData = await response.json(); // Store the data for filtering
        displayStudents(studentsData);
    } catch (error) {
        console.error("Error loading students:", error);
        alert("Failed to load student data.");
    }
}

// Display students in the table
function displayStudents(students) {
    const tableBody = document.getElementById("studentTable");
    tableBody.innerHTML = "";

    students.forEach((student) => {
        const row = `
            <tr>
                <td>${student.uid}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.dob}</td>
                <td>${student.maths}</td>
                <td>${student.physics}</td>
                <td>${student.chemistry}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditForm(${student.uid})">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDelete(${student.uid})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Filter students based on the search input
function filterStudents() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    const filteredStudents = studentsData.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchTerm) ||
            student.studentClass.toLowerCase().includes(searchTerm) ||
            student.dob.includes(searchTerm) ||
            student.maths.toString().includes(searchTerm) ||
            student.physics.toString().includes(searchTerm) ||
            student.chemistry.toString().includes(searchTerm)
        );
    });

    displayStudents(filteredStudents);
}

// Open the editing form with pre-filled data
async function openEditForm(uid) {
    const response = await fetch(`${apiBaseUrl}/${uid}`);
    const student = await response.json();

    document.getElementById("editUid").value = student.uid;
    document.getElementById("editName").value = student.name;
    document.getElementById("editClass").value = student.studentClass;
    document.getElementById("editDob").value = student.dob;
    document.getElementById("editMaths").value = student.maths;
    document.getElementById("editPhysics").value = student.physics;
    document.getElementById("editChemistry").value = student.chemistry;

    document.getElementById("editModal").style.display = "block";
}

// Update student data
async function updateStudent() {
    const uid = document.getElementById("editUid").value;

    const updatedStudent = {
        name: document.getElementById("editName").value,
        studentClass: document.getElementById("editClass").value,
        dob: document.getElementById("editDob").value,
        maths: parseInt(document.getElementById("editMaths").value),
        physics: parseInt(document.getElementById("editPhysics").value),
        chemistry: parseInt(document.getElementById("editChemistry").value),
    };

    await fetch(`${apiBaseUrl}/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
    });

    closeEditForm();
    loadStudents();
}

// Close the editing form
function closeEditForm() {
    document.getElementById("editModal").style.display = "none";
}

// Delete confirmation popup
async function confirmDelete(uid) {
    if (confirm("Are you sure you want to delete this student?")) {
        await fetch(`${apiBaseUrl}/${uid}`, { method: "DELETE" });
        loadStudents();
    }
}

window.onload = loadStudents;
