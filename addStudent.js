const apiBaseUrl = "http://localhost:8080/api/students";

document.getElementById("addStudentForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const newStudent = {
        name: document.getElementById("name").value,
        studentClass: document.getElementById("studentClass").value,
        dob: document.getElementById("dob").value,
        maths: parseInt(document.getElementById("maths").value),
        physics: parseInt(document.getElementById("physics").value),
        chemistry: parseInt(document.getElementById("chemistry").value),
    };

    try {
        const response = await fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        });

        if (response.ok) {
            alert("Student added successfully!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Failed to add student.");
        }
    } catch (error) {
        console.error("Error adding student:", error);
    }
});
