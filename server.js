const texts = document.querySelector(".texts");
const feedback = document.querySelector(".feedback");

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // შერჩეული ენა

    let p = document.createElement("p");

    recognition.addEventListener("result", (e) => {
        // ხანდახან `p` უნდა შექმნათ მხოლოდ მაშინ, როცა ნაჩვენებია ახალი ფინალური ტექსტი
        const text = Array.from(e.results)
            .map((result) => result[0].transcript)
            .join("");

        if (e.results[0].isFinal) {
            texts.appendChild(p);
            p.innerText = text;
            p = document.createElement("p"); // ქმნის ახალ პარაგრაფს შემდეგი ტექსტისთვის
        } else {
            p.innerText = text; // მიმდინარე სიტყვები (interim results)
        }
    });

    recognition.addEventListener("end", () => {
        // თავიდან იწყებს "SpeechRecognition"-ის სესიის გახსნას
        recognition.start();
        feedback.innerText = "Listening...";
    });

    recognition.addEventListener("start", () => {
        feedback.innerText = "Listening...";
    });

    recognition.addEventListener("error", (e) => {
        console.error("Speech recognition error:", e.error);

        // თუ არ არის ქმედება, ან არ არის დალაგებული საუბრები
        if (e.error === "no-speech" || !e.results) {
            feedback.innerText = "No speech detected. Please try again.";
        } else {
            feedback.innerText = "Error occurred. Please try again.";
        }
    });

    // კликების მოსმენა მხოლოდ მაშინ თუ ჯერ არ არის მოქმედებაში
    document.body.addEventListener("click", () => {
        if (recognition.running === false) {
            recognition.start();
        }
        feedback.innerText = "Listening...";
    });

    // დაწყება
    recognition.start();
} else {
    console.error("SpeechRecognition is not supported in this browser.");
    feedback.innerText = "Speech recognition is not supported in this browser.";
}

