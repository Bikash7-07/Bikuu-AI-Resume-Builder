const fields = [
    "name",
    "job",
    "email",
    "phone",
    "location",
    "summary",
    "education",
    "skills",
    "projects",
    "experience"
];


const previewIds = {
    name: "previewName",
    job: "previewJob",
    email: "previewEmail",
    phone: "previewPhone",
    location: "previewLocation",
    summary: "previewSummary",
    education: "previewEducation",
    skills: "previewSkills",
    projects: "previewProjects",
    experience: "previewExperience"
};


const defaults = {
    name: "Your Name",
    job: "Your Professional Title",
    email: "email@example.com",
    phone: "Phone",
    location: "Location",

    summary:
        "Your professional summary will appear here.",

    education:
        "Your education will appear here.",

    skills:
        "Your skills will appear here.",

    projects:
        "Your projects will appear here.",

    experience:
        "Your experience will appear here."
};


/* SCROLL */

function scrollToBuilder() {

    document
        .getElementById("builder")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function scrollToTemplates() {

    document
        .getElementById("templates")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* RESUME UPDATE */

function updateResume() {

    fields.forEach(function(field) {

        const input =
            document.getElementById(field);

        const preview =
            document.getElementById(
                previewIds[field]
            );

        const value =
            input.value.trim();

        preview.textContent =
            value || defaults[field];

    });


    /* PROGRESS */

    let completed = 0;

    fields.forEach(function(field) {

        const value =
            document
                .getElementById(field)
                .value
                .trim();

        if (value !== "") {
            completed++;
        }

    });


    const percentage =
        Math.round(
            (completed / fields.length) * 100
        );


    document.getElementById(
        "progress"
    ).textContent =
        percentage + "% Complete";


    /* SAVE */

    const resumeData = {};

    fields.forEach(function(field) {

        resumeData[field] =
            document
                .getElementById(field)
                .value;

    });


    localStorage.setItem(
        "bikuuResume",
        JSON.stringify(resumeData)
    );
}


/* TEMPLATE */

function chooseTemplate(templateName) {

    document.getElementById(
        "selectedTemplate"
    ).textContent =
        templateName + " Template";


    scrollToBuilder();

}


/* CHATBOT */

function toggleChat() {

    const chatbot =
        document.getElementById("chatbot");

    const button =
        document.querySelector(".chat-button");


    const isClosed =
        getComputedStyle(chatbot).display === "none";


    if (isClosed) {

        chatbot.style.display = "flex";

        button.style.display = "none";

    } else {

        chatbot.style.display = "none";

        button.style.display = "block";

    }

}


/* OPEN AI */

function openAI() {

    const chatbot =
        document.getElementById("chatbot");


    if (
        getComputedStyle(chatbot).display ===
        "none"
    ) {

        toggleChat();

    }


    quickMessage(
        "Improve my resume"
    );

}


/* QUICK MESSAGE */

function quickMessage(message) {

    const input =
        document.getElementById(
            "chatInput"
        );

    input.value = message;

    sendMessage();

}


/* SEND MESSAGE */

function sendMessage() {

    const input =
        document.getElementById(
            "chatInput"
        );

    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    addMessage(
        message,
        "user"
    );


    input.value = "";


    setTimeout(function() {

        const response =
            getAIResponse(message);


        addMessage(
            response,
            "bot"
        );

    }, 400);

}


/* ADD CHAT MESSAGE */

function addMessage(
    message,
    type
) {

    const messages =
        document.getElementById(
            "messages"
        );


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "message " + type;


    div.innerHTML =
        message;


    messages.appendChild(div);


    messages.scrollTop =
        messages.scrollHeight;

}


/* AI RESPONSE */

function getAIResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("summary")
    ) {

        return `
            📝 <strong>Summary Tip</strong><br><br>

            Keep your professional summary
            around 2–4 lines.

            Mention your role, strongest skills,
            experience/projects and career goal.
        `;

    }


    if (
        text.includes("skill")
    ) {

        return `
            🛠️ <strong>Skills Tip</strong><br><br>

            Add skills relevant to the job
            you are applying for.

            Example:
            JavaScript, Python, SQL, Git,
            React and Communication.
        `;

    }


    if (
        text.includes("project")
    ) {

        return `
            📁 <strong>Project Tip</strong><br><br>

            Explain what you built,
            technologies used,
            your role and the result.

            Start with action words such as
            Developed, Designed or Implemented.
        `;

    }


    if (
        text.includes("improve") ||
        text.includes("resume")
    ) {

        return `
            🚀 <strong>Resume Improvement Tips</strong><br><br>

            ✓ Use clear headings<br>
            ✓ Add relevant keywords<br>
            ✓ Show measurable achievements<br>
            ✓ Keep formatting professional<br>
            ✓ Avoid unnecessary information
        `;

    }


    return `
        🤖 I'm Bikuu AI.

        Try asking me:

        <br><br>

        • Improve my resume<br>
        • Suggest skills<br>
        • Write a summary<br>
        • Help with my project
    `;

}


/* LOAD SAVED DATA */

function loadResume() {

    const saved =
        localStorage.getItem(
            "bikuuResume"
        );


    if (!saved) {
        return;
    }


    try {

        const data =
            JSON.parse(saved);


        fields.forEach(function(field) {

            if (
                data[field] !== undefined
            ) {

                document.getElementById(
                    field
                ).value =
                    data[field];

            }

        });

    } catch (error) {

        console.log(
            "Could not load saved resume."
        );

    }

}


/* START */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadResume();


        fields.forEach(function(field) {

            document
                .getElementById(field)
                .addEventListener(
                    "input",
                    updateResume
                );

        });


        updateResume();

    }
);