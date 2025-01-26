const texts = document.querySelector(".texts");
const feedback = document.querySelector(".feedback");

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    let p = document.createElement("p");

    recognition.addEventListener("result", (e) => {
        texts.appendChild(p);
        const text = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");

        // recognition.lang = 'EN';

        p.innerText = text;

        if (e?.results[0].isFinal) {
            p = document.createElement("p");
        }
    });

    recognition.addEventListener("end", (e) => {
        recognition.start();
        feedback.innerText = "Listening...";
    });

    recognition.addEventListener("start", () => {
        feedback.innerText = "Listening...";
    });

    recognition.addEventListener("error", (e) => {
        console.error("Speech recognition error:", e.error);
        // Handle "no-speech" error
        if (e.error === "no-speech" || !e.results) {
            feedback.innerText = "No speech detected. Please try again.";
        } else {
            feedback.innerText = "Error occurred. Please try again.";
        }
    });

    document.body.addEventListener("click", () => {
        recognition.start();
        feedback.innerText = "Listening...";
    });

    recognition.start();
} else {
    console.error("SpeechRecognition is not supported in this browser.");
    feedback.innerText = "Speech recognition is not supported in this browser.";
}
