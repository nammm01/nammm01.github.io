/*
    This script handles the navigation selection between the main content buttons.
*/

const ContentNames =
[
    "projects",
    "education",
    "work",
    "skills",
    "achievements"
];

const TextAreaMinHeightExtended = "0px";
const TextAreaMinHeightClosed = "0px";
const TransitionDuration = 200;

let IncludeText = [];
let lastButtonIndex = -1;
let buttonLock = false;

/* Load all html pages */
for (let i = 0; i < ContentNames.length; ++i)
{
    IncludeText.push("");

    fetch("/static/assets/pages/" + ContentNames[i] + ".html")
        .then(response => response.text())
        .then(text =>
        {
            IncludeText[i] = text;
        })
        .catch(error =>
        {
            console.error("Failed to load:", ContentNames[i], error);
        });
}

/* Show content */
function revealIncludeText(textArea, index)
{
    if (!IncludeText[index])
    {
        textArea.innerHTML = "<p>Loading...</p>";
        textArea.style.opacity = 1;
        return;
    }

    if (textArea.style.opacity === "0" || textArea.style.opacity === "")
    {
        textArea.innerHTML = IncludeText[index];
        textArea.style.opacity = "1";
    }
    else
    {
        textArea.style.opacity = "0";

        setTimeout(() =>
        {
            textArea.innerHTML = IncludeText[index];
            textArea.style.opacity = "1";
        }, TransitionDuration / 2);
    }
}

/* Hide content */
function hideIncludeText(textArea)
{
    textArea.style.opacity = "0";

    setTimeout(() =>
    {
        textArea.innerHTML = "";
        textArea.style.minHeight = TextAreaMinHeightClosed;
    }, TransitionDuration / 2);
}

document.addEventListener("DOMContentLoaded", function ()
{
    const textArea = document.getElementById("data_selection_area");
    const projectArea = document.getElementById("project_data_area");

    let buttons = [];

    for (let i = 0; i < ContentNames.length; ++i)
    {
        buttons.push(
            document.getElementById(ContentNames[i] + "-Button")
        );
    }

    for (let i = 0; i < buttons.length; ++i)
    {
        buttons[i].addEventListener("click", function ()
        {
            if (buttonLock)
                return;

            buttonLock = true;

            if (i === lastButtonIndex)
            {
                buttons.forEach(button =>
                {
                    button.className = "btn btn-5 kd-button";
                });

                hideIncludeText(textArea);

                if (projectArea)
                {
                    projectArea.innerHTML = "";
                    projectArea.style.opacity = "0";
                }

                lastButtonIndex = -1;
            }
            else
            {
                buttons.forEach((button, index) =>
                {
                    button.className =
                        index === i
                            ? "btn btn-5 kd-button"
                            : "btn btn-5 kd-button-idle";
                });

                revealIncludeText(textArea, i);

                textArea.style.minHeight = TextAreaMinHeightExtended;

                if (projectArea)
                {
                    projectArea.innerHTML = "";
                    projectArea.style.opacity = "0";
                }

                lastButtonIndex = i;
            }

            setTimeout(() =>
            {
                buttonLock = false;
            }, TransitionDuration);
        });
    }
});