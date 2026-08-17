const runButton = document.getElementById("runButton");
const topicInput = document.getElementById("topic");

runButton.addEventListener("click", async function () {

    const topic = topicInput.value.trim();

    if (topic === "") {
        alert("Please enter a topic first.");
        return;
    }

    // Change button
    runButton.textContent = "Running...";
    runButton.disabled = true;

    // Get agent elements
    const statuses = document.querySelectorAll(".agent-status");
    const results = document.querySelectorAll(".agent-result");

    // Show processing
    statuses.forEach(function (status) {
        status.textContent = "Processing...";
    });

    results.forEach(function (result) {
        result.textContent = "Please wait...";
    });

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/workflow/${encodeURIComponent(topic)}`
        );

        if (!response.ok) {
            throw new Error("Backend returned an error: " + response.status);
        }

        const data = await response.json();

        console.log("Backend response:", data);

        // Research Agent
        if (data.research) {
            statuses[0].textContent = "Completed";

            results[0].textContent =
                data.research.summary || "Research completed.";
        }

        // Analysis Agent
        if (data.analysis) {
            statuses[1].textContent = "Completed";

            results[1].textContent =
                data.analysis.analysis || "Analysis completed.";
        }

        // Risk Agent
        if (data.risk) {
            statuses[2].textContent = "Completed";

            results[2].textContent =
                data.risk.risk || "Risk assessment completed.";
        }

        // Decision Agent
        if (data.decision) {
            statuses[3].textContent = "Completed";

            results[3].textContent =
                data.decision.decision || "Decision completed.";
        }

    } catch (error) {

        console.error("Workflow Error:", error);

        statuses.forEach(function (status) {
            status.textContent = "Error";
        });

        results.forEach(function (result) {
            result.textContent =
                "Could not connect to the backend. Check the browser Console.";
        });

    } finally {

        runButton.textContent = "Run Workflow";
        runButton.disabled = false;

    }

});