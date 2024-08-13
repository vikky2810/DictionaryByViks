document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("dictionary-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let word = document.getElementById("word-input").value.trim();
        let resultDiv = document.getElementById("result");

        if (word) {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => response.json())
                .then(data => {
                    if (data.title === "No Definitions Found") {
                        resultDiv.innerHTML = `<p>Sorry, no definitions found for <strong>${word}</strong>.</p>`;
                    } else {
                        let definition = data[0].meanings[0].definitions[0].definition;
                        resultDiv.innerHTML = `<p><strong>${word}:</strong> ${definition}</p>`;
                    }
                })
                .catch(() => {
                    resultDiv.innerHTML = "<p>There was an error fetching the definition. Please try again later.</p>";
                });
        } else {
            resultDiv.innerHTML = "<p>Please enter a word.</p>";
        }
    });
});
