document.getElementById("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const fitnessLevel = document.getElementById("fitnessLevel").value;

    try {
        const response = await fetch("http://localhost:3000/api/fitness", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                weight: weight,
                height: height,
                fitnessLevel: fitnessLevel
            })
        });

        const data = await response.json();

        if (data.message) {
            document.getElementById("recommendations").innerHTML = `
                <h2>AI Recommendations</h2>
                <p>${data.message}</p>
            `;
        } else {
            document.getElementById("recommendations").innerHTML = `
                <h2>Error</h2>
                <p>Unable to fetch recommendations. Please try again.</p>
            `;
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        document.getElementById("recommendations").innerHTML = `
            <h2>Error</h2>
            <p>Unable to fetch recommendations. Please try again later.</p>
        `;
    }
});
