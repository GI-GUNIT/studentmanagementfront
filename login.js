document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
	
	if (username === "user" && password === "user") {
        window.location.href = "userDashboard.html"; // Redirect to dashboard
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
	
	
});
