/* This script handles the content assignment of project data */

const ProjectNames = [
    "pushbox",
    "parucare"
];

let ProjectText = [];

/* Load all project html files */
for (let i = 0; i < ProjectNames.length; i++) {
    ProjectText.push("");

    fetch("/static/assets/pages/projects/" + ProjectNames[i] + ".html")
        .then(response => response.text())
        .then(text => ProjectText[i] = text);
}

function LoadProject(button, btnIndex) {
    const projTextArea = document.getElementById("project_data_area");
    const modal = document.getElementById("project-modal");
    const modalContent = document.querySelector(".modal-content");

    if (!projTextArea || !modal || !modalContent) return;

    const activeButton = document.querySelector(".proj-button-active");
    if (activeButton) {
        activeButton.classList.remove("proj-button-active");
    }

    button.classList.add("proj-button-active");

    modal.style.display = "flex";
    modal.style.opacity = 0;

    projTextArea.innerHTML = ProjectText[btnIndex];

    // Reset overlay scroll to top
    modalContent.scrollTop = 0;

    requestAnimationFrame(() => {
        modal.style.opacity = 1;
    });
}

/* Close Modal Function */
function CloseModal() {
    const projTextArea = document.getElementById("project_data_area");
    const modal = document.getElementById("project-modal");

    if (!modal || !projTextArea) return;

    modal.style.opacity = 0;
    
    // Wait for fade-out animation to finish before hiding the display element completely
    setTimeout(() => {
        modal.style.display = "none";
        projTextArea.innerHTML = "";
        
        // Clean up active class indicators
        const activeButton = document.querySelector(".proj-button-active");
        if (activeButton) {
            activeButton.classList.remove("proj-button-active");
        }
    }, 300);
}

/* Filter projects */
function filterProjects(category) {
    const projects = document.querySelectorAll(".proj-button");

    projects.forEach(project => {
        if (category === "all") {
            project.style.display = "block";
        } else {
            if (project.classList.contains(category)) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        }
    });
}