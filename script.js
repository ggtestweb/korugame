// Bei Seitenladen den Dark-Mode-Status abrufen und anwenden
window.addEventListener("load", () => {
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeSwitch.checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        darkModeSwitch.checked = false;
    }
});

// Dark-Mode-Schalter-Änderungen speichern
const darkModeSwitch = document.getElementById("darkModeSwitch");
darkModeSwitch.addEventListener("change", () => {
    if (darkModeSwitch.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
    }
});

let startTime;
let isRunning = false;
let punktzahl = 0;

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
document.getElementById("schätzenButton").addEventListener("click", schätzen);
document.getElementById("resetButton").addEventListener("click", resetPunktzahl);

function startTimer() {
    startTime = Date.now();
    isRunning = true;
}

function stopTimer() {
    if (isRunning) {
        const estimatedTime = parseInt(document.getElementById("geschätzteZeit").value);
        const endTime = Date.now();
        const elapsedMinutes = (endTime - startTime) / 60000;

        if (estimatedTime >= elapsedMinutes - 10 && estimatedTime <= elapsedMinutes + 10) {
            punktzahl++;
            updatePunktzahlAnzeige();

            // Nach jeder Punktzahl-Änderung, speichern Sie die Punktzahl
            speicherePunktzahl();
        }

        isRunning = false;
    }
}

function schätzen() {
    if (isRunning) {
        alert("Bitte stoppen Sie den Timer, bevor Sie schätzen.");
    } else {
        alert("Geben Sie Ihre Schätzung ein und starten Sie den Timer.");
    }
}

function resetPunktzahl() {
    if (confirm("Möchten Sie die Punktzahl zurücksetzen?")) {
        punktzahl = 0;
        updatePunktzahlAnzeige();

        // Nach dem Zurücksetzen, speichern Sie die Punktzahl
        speicherePunktzahl();
    }
}

function updatePunktzahlAnzeige() {
    document.getElementById("punktzahl").textContent = punktzahl;
}

function speicherePunktzahl() {
    localStorage.setItem("punktzahl", punktzahl);
}

// Beim Laden der Seite, die gespeicherte Punktzahl abrufen und anzeigen
window.addEventListener("load", () => {
    const gespeichertePunktzahl = localStorage.getItem("punktzahl");
    if (gespeichertePunktzahl !== null) {
        punktzahl = parseInt(gespeichertePunktzahl);
        updatePunktzahlAnzeige();
    }
});



