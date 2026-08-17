const runButton = document.getElementById("runButton");
const topicInput = document.getElementById("topic");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


runButton.addEventListener("click", async function () {

    const topic = topicInput.value.trim();

    if (topic === "") {
        alert("Please enter a topic first.");
        return;
    }


    // ========================================
    // BUTTON
    // ========================================

    runButton.textContent = "Running...";
    runButton.disabled = true;


    // ========================================
    // AGENT ELEMENTS
    // ========================================

    const statuses =
        document.querySelectorAll(".agent-status");

    const results =
        document.querySelectorAll(".agent-result");


    // ========================================
    // EXECUTIVE SUMMARY ELEMENTS
    // ========================================

    const summaryTopic =
        document.getElementById("summaryTopic");

    const recommendationText =
        document.getElementById("recommendationText");

    const confidenceValue =
        document.getElementById("confidenceValue");


    // ========================================
    // RESET AGENT CARDS
    // ========================================

    statuses.forEach(function (status) {

        status.textContent = "Waiting...";

    });


    results.forEach(function (result) {

        result.textContent = "Please wait...";

    });


    // ========================================
    // RESET SUMMARY
    // ========================================

    if (summaryTopic) {

        summaryTopic.textContent = topic;

    }


    if (recommendationText) {

        recommendationText.textContent =
            "Generating recommendation...";

    }


    if (confidenceValue) {

        confidenceValue.textContent = "--";

    }


    // ========================================
    // RESET PROGRESS BAR
    // ========================================

    if (progressFill) {

        progressFill.style.width = "0%";

    }


    if (progressText) {

        progressText.textContent = "0%";

    }


    // ========================================
    // STEP 1 — RESEARCH
    // ========================================

    updateStatus(
        0,
        "🔎 Researching..."
    );


    if (progressFill) {

        progressFill.style.width = "25%";

    }


    if (progressText) {

        progressText.textContent = "25%";

    }


    const step1 = setTimeout(function () {

        updateStatus(
            0,
            "✓ Research Completed"
        );

        updateStatus(
            1,
            "🧠 Analyzing..."
        );


        if (progressFill) {

            progressFill.style.width = "50%";

        }


        if (progressText) {

            progressText.textContent = "50%";

        }

    }, 1500);


    // ========================================
    // STEP 2 — ANALYSIS
    // ========================================

    const step2 = setTimeout(function () {

        updateStatus(
            1,
            "✓ Analysis Completed"
        );

        updateStatus(
            2,
            "⚠️ Assessing Risks..."
        );


        if (progressFill) {

            progressFill.style.width = "75%";

        }


        if (progressText) {

            progressText.textContent = "75%";

        }

    }, 3000);


    // ========================================
    // STEP 3 — RISK
    // ========================================

    const step3 = setTimeout(function () {

        updateStatus(
            2,
            "✓ Risk Assessment Completed"
        );

        updateStatus(
            3,
            "🎯 Making Decision..."
        );


        if (progressFill) {

            progressFill.style.width = "100%";

        }


        if (progressText) {

            progressText.textContent = "100%";

        }

    }, 4500);


    // ========================================
    // STEP 4 — DECISION PROCESSING
    // ========================================

    const step4 = setTimeout(function () {

        updateStatus(
            3,
            "Processing decision..."
        );

    }, 6000);


    // ========================================
    // BACKEND REQUEST
    // ========================================

    try {

        const response = await fetch(

            `http://127.0.0.1:8000/workflow/${encodeURIComponent(topic)}`

        );


        if (!response.ok) {

            throw new Error(
                "Backend returned an error: " +
                response.status
            );

        }


        const data = await response.json();


        console.log(
            "Backend response:",
            data
        );


        // ========================================
        // WAIT FOR VISUAL WORKFLOW
        // ========================================

        await new Promise(function (resolve) {

            setTimeout(
                resolve,
                6500
            );

        });


        // ========================================
        // STOP TIMERS
        // ========================================

        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
        clearTimeout(step4);


        // ========================================
        // RESEARCH AGENT
        // ========================================

        if (data.research) {

            statuses[0].textContent =
                "✓ Completed";


            results[0].textContent =
                data.research.summary ||
                "Research completed.";

        }


        // ========================================
        // ANALYSIS AGENT
        // ========================================

        if (data.analysis) {

            statuses[1].textContent =
                "✓ Completed";


            results[1].textContent =
                data.analysis.analysis ||
                "Analysis completed.";

        }


        // ========================================
        // RISK AGENT
        // ========================================

        if (data.risk) {

            statuses[2].textContent =
                "✓ Completed";


            results[2].textContent =
                data.risk.risk ||
                "Risk assessment completed.";

        }


        // ========================================
        // DECISION AGENT
        // ========================================

        if (data.decision) {

            statuses[3].textContent =
                "✓ Completed";


            results[3].textContent =
                data.decision.decision ||
                "Decision completed.";


            // ========================================
            // RECOMMENDATION
            // ========================================

            if (recommendationText) {

                recommendationText.textContent =
                    data.decision.recommendation ||
                    "Proceed with implementation.";

            }


            // ========================================
            // CONFIDENCE
            // ========================================

            if (confidenceValue) {

                confidenceValue.textContent =
                    data.decision.confidence ||
                    "--";

            }

        }


        // ========================================
        // FINAL PROGRESS
        // ========================================

        if (progressFill) {

            progressFill.style.width = "100%";

        }


        if (progressText) {

            progressText.textContent = "100%";

        }


    } catch (error) {

        console.error(
            "Workflow Error:",
            error
        );


        // ========================================
        // STOP TIMERS
        // ========================================

        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
        clearTimeout(step4);


        // ========================================
        // ERROR STATUS
        // ========================================

        statuses.forEach(function (status) {

            status.textContent =
                "❌ Error";

        });


        results.forEach(function (result) {

            result.textContent =
                "Could not connect to the backend. " +
                "Check the browser Console.";

        });


        // ========================================
        // ERROR SUMMARY
        // ========================================

        if (recommendationText) {

            recommendationText.textContent =
                "Unable to generate recommendation.";

        }


        if (confidenceValue) {

            confidenceValue.textContent =
                "--";

        }


        // ========================================
        // ERROR PROGRESS
        // ========================================

        if (progressFill) {

            progressFill.style.width = "0%";

        }


        if (progressText) {

            progressText.textContent = "Error";

        }

    } finally {

        // ========================================
        // RESET BUTTON
        // ========================================

        runButton.textContent =
            "Run Workflow";

        runButton.disabled =
            false;

    }

});


// ========================================
// STATUS UPDATE FUNCTION
// ========================================

function updateStatus(index, message) {

    const statuses =
        document.querySelectorAll(".agent-status");


    if (statuses[index]) {

        statuses[index].textContent =
            message;

    }

}

            