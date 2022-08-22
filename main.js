const handleInput = document.querySelector("#handle-input");

document.querySelector("#submit-button").addEventListener("click", getLanguageData);
document.querySelector("#form").addEventListener("submit", getLanguageData);

function getLanguageData(event) {
    fetch(`https://codeforces.com/api/user.status?handle=${handleInput.value}`)
        .then((response) => response.json())
        .then(function (jsonData) {
            const languageFrequency = {};

            for (let ele of jsonData.result) {
                if (ele.verdict === "OK") {
                    const programmingLanguage = ele.programmingLanguage;
                    if (!languageFrequency.hasOwnProperty(programmingLanguage)) {
                        languageFrequency[programmingLanguage] = 1;
                    } else {
                        languageFrequency[programmingLanguage]++;
                    }
                }
            }
            return languageFrequency;
        })
        .then((languageFrequency) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const data = {
                labels: Object.keys(languageFrequency),
                datasets: [
                    {
                        label: "Programming language",
                        data: Object.values(languageFrequency),
                        backgroundColor: [
                            "#d50000",
                            "#c51162",
                            "#aa00ff",
                            "#6200ea",
                            "#304ffe",
                            "#2962ff",
                            "#0091ea",
                            "#00b8d4",
                            "#00bfa5",
                            "#00c853",
                            "#64dd17",
                            "#aeea00",
                            "#ffd600",
                            "#ffab00",
                            "#ff6d00",
                            "#dd2c00",
                        ],
                        hoverOffset: 2,
                    },
                ],
            };
            const config = {
                type: "doughnut",
                data: data,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Programming language usage frequency",
                        },
                    },
                },
            };
            const languageStats = document.querySelector(".language-stats-canvas-container");
            clearContentsOf(languageStats);
            languageStats.appendChild(canvas);
            document.querySelector(".language-stats").style.display = "flex";
            const chart = new Chart(ctx, config);
        })
        .catch(function () {
            alert("Error");
        });

    fetch(`https://codeforces.com/api/user.rating?handle=${handleInput.value}`)
        .then((response) => response.json())
        .then(function (jsonData) {
            const rating = {};

            for (let ele of jsonData.result) {
                const contestName = ele.contestName;
                const newRating = ele.newRating;
                rating[contestName] = newRating;
            }
            return rating;
        })
        .then((rating) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const data = {
                labels: Object.keys(rating),
                datasets: [
                    {
                        label: "Rating",
                        data: Object.values(rating),
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                ],
            };
            const config = {
                type: "line",
                data: data,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Trends in Rating",
                        },
                    },
                },
            };

            const ratingStats = document.querySelector(".rating-stats-canvas-container");
            clearContentsOf(ratingStats);
            ratingStats.appendChild(canvas);
            document.querySelector(".rating-stats").style.display = "flex";
            const chart = new Chart(ctx, config);
        })
        .catch(function () {
            alert("Error");
        });
    event.preventDefault();
    return false;
}

function clearContentsOf(container) {
    container.innerHTML = "";
}
