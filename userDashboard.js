const apiBaseUrl = "http://localhost:8080/api/students";

// Fetch all student data
async function fetchStudents() {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch student data");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Calculate average marks for each subject
function calculateAverageMarks(students) {
    const totals = { maths: 0, physics: 0, chemistry: 0 };
    students.forEach((student) => {
        totals.maths += student.maths;
        totals.physics += student.physics;
        totals.chemistry += student.chemistry;
    });

    const count = students.length;
    return {
        maths: (totals.maths / count).toFixed(2),
        physics: (totals.physics / count).toFixed(2),
        chemistry: (totals.chemistry / count).toFixed(2),
    };
}

// Find the batch topper
function findBatchTopper(students) {
    return students.reduce((topper, student) => {
        const totalMarks =
            student.maths + student.physics + student.chemistry;
        if (!topper || totalMarks > topper.totalMarks) {
            return {
                name: student.name,
                totalMarks,
            };
        }
        return topper;
    }, null);
}

// Prepare data for marks distribution chart
function prepareMarksDistribution(students) {
    return students.map((student) => ({
        name: student.name,
        totalMarks: student.maths + student.physics + student.chemistry,
    }));
}

// Render Average Marks Chart
function renderAverageMarksChart(averages) {
    const ctx = document.getElementById("averageMarksChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Maths", "Physics", "Chemistry"],
            datasets: [
                {
                    label: "Average Marks",
                    data: [averages.maths, averages.physics, averages.chemistry],
                    backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
                },
            ],
        },
    });
}

// Render Marks Distribution Chart
function renderMarksDistributionChart(distribution) {
    const ctx = document.getElementById("marksDistributionChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: distribution.map((student) => student.name),
            datasets: [
                {
                    label: "Total Marks",
                    data: distribution.map((student) => student.totalMarks),
                    backgroundColor: "#2196f3",
                    borderColor: "#2196f3",
                    fill: false,
                },
            ],
        },
    });
}

// Initialize the dashboard
async function initializeDashboard() {
    const students = await fetchStudents();

    // Calculate and display average marks
    const averages = calculateAverageMarks(students);
    renderAverageMarksChart(averages);

    // Find and display batch topper
    const batchTopper = findBatchTopper(students);
    document.getElementById("batchTopperName").textContent = batchTopper
        ? `${batchTopper.name} (${batchTopper.totalMarks} Marks)`
        : "No data available";

    // Display marks distribution
    const distribution = prepareMarksDistribution(students);
    renderMarksDistributionChart(distribution);
}

// Load the dashboard
initializeDashboard();
