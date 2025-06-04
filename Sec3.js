contentHTML += `</ul>`;
  } else {
    contentHTML += `<p class="info-text">No AI matches found from your resume analysis yet. Please go back to the Home page and analyze your resume, or enter preferred companies below.</p>`;
  }
  contentHTML += `<hr class="section-divider">`;

  contentHTML += `<h2>Enter Your Preferred Companies for Salary Analysis</h2>`;
  contentHTML += `<p class="info-text">Enter up to 5 company names to get a simulated salary analysis. For best results, use full company names (e.g., "Google", "Infosys").</p>`;
  contentHTML += `<div id="preferred-companies-input-area">`;
  for (let i = 0; i < 5; i++) {
    contentHTML += `<input type="text" class="preferred-company-input" placeholder="Preferred Company ${i + 1}" aria-label="Preferred Company ${i + 1} for salary analysis">`;
  }
  contentHTML += `</div>`;
  contentHTML += `<button id="analyze-salary-btn" class="app-button" aria-label="Analyze salaries for entered companies">Analyze Salaries for Preferred Companies</button>`;
  contentHTML += `<div id="salary-analysis-results" style="margin-top: 20px; display: none;"></div>`; // Results container
  contentHTML += `<hr class="section-divider">`;
  contentHTML += `<p class="info-text" style="margin-top:20px;">Click "Home" in the header to return to the main resume analyzer.</p>`;

  UIManager.showBlankPage(contentHTML);

  const analyzeSalaryBtn = document.getElementById('analyze-salary-btn');
  if (analyzeSalaryBtn) {
    analyzeSalaryBtn.addEventListener('click', handleSalaryAnalysis);
  }
}

async function handleSalaryAnalysis() {
  const resultsContainer = document.getElementById('salary-analysis-results');
  if (!resultsContainer) return;

  resultsContainer.innerHTML = '<p class="info-text loading-spinner">Analyzing salaries, please wait...</p>'; // Show loading message
  resultsContainer.style.display = 'block'; // Make it visible
  
  // Disable the button during analysis to prevent multiple clicks
  const analyzeSalaryBtn = document.getElementById('analyze-salary-btn');
  if (analyzeSalaryBtn) {
    analyzeSalaryBtn.disabled = true;
  }

  try {
    // Simulate an asynchronous operation
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5 seconds delay

    const preferredInputs = document.querySelectorAll('.preferred-company-input');
    let hasInput = false;
    let salaryResultsHTML = '<h3>Simulated Salary Analysis:</h3><ul class="salary-results-list">';

    // It's crucial to ensure `resumeTextArea` is accessible in this scope or passed as an argument.
    // Assuming `resumeTextArea` is a globally accessible element or can be retrieved here.
    const resumeTextArea = document.getElementById('resume-text-area'); // Add this line if resumeTextArea isn't globally available
    if (!resumeTextArea) {
      throw new Error("Resume text area not found. Cannot determine experience level.");
    }
    
    const analysisForExpLevel = AISimulator.analyzeResume(resumeTextArea.value || ""); // Get current exp level for context

    preferredInputs.forEach(input => {
      const companyName = input.value.trim();
      if (companyName) {
        hasInput = true;
        const salary = AISimulator.simulateSalaryForCompany(companyName, analysisForExpLevel.experienceLevel);
        const companyLink = AISimulator.getSimulatedCompanyLink(companyName);
        salaryResultsHTML += `<li><strong><a href="${companyLink}" target="_blank" class="company-link">${companyName}</a>:</strong> ${salary}</li>`;
      }
    });

    if (!hasInput) {
      salaryResultsHTML = "<p class='info-text'>Please enter at least one company name above to analyze.</p>"; // Changed to p tag for better styling
    } else {
        salaryResultsHTML += `</ul><p class='info-text' style='font-size:0.8em; text-align:center; margin-top:10px;'>Note: Salary data is illustrative, simulated for demonstration (May 2025). Experience level for this custom analysis is based on the last analyzed resume: <strong>${analysisForExpLevel.experienceLevel}</strong>. Results may vary. Links are simulated.</p>`;
    }
    resultsContainer.innerHTML = salaryResultsHTML;

  } catch (error) {
    console.error("Error during salary analysis:", error);
    resultsContainer.innerHTML = `<p class="error-text">An error occurred during salary analysis. Please try again. (${error.message})</p>`;
  } finally {
    // Re-enable the button after analysis is complete or an error occurs
    const analyzeSalaryBtn = document.getElementById('analyze-salary-btn');
    if (analyzeSalaryBtn) {
      analyzeSalaryBtn.disabled = false;
    }
  }
}
// Existing JavaScript code:
// ... (function that calls showSalaryAnalysisPage) ...

// function showSalaryAnalysisPage() { // Assuming this function exists
//   let contentHTML = `<h1>Salary Insights</h1>`;
//   // ... (other initial HTML content for this page) ...
//   // The following is from your provided snippet that generates part of the page:
//   if (GlobalData.aiMatches && GlobalData.aiMatches.length > 0) { // Example check
//     contentHTML += `<h2>Salary Data Based on Your Resume Matches</h2><ul>`;
//     GlobalData.aiMatches.forEach(match => { // Example data
//       contentHTML += `<li>${match.jobTitle} at ${match.companyName}: ${match.estimatedSalary || 'N/A'}</li>`;
//     });
//     contentHTML += `</ul>`;
//   } else {
//     contentHTML += `<p class="info-text">No AI matches found from your resume analysis yet. Please go back to the Home page and analyze your resume, or enter preferred companies below.</p>`;
//   }
//   contentHTML += `<hr class="section-divider">`;

//   contentHTML += `<h2>Enter Your Preferred Companies for Salary Analysis</h2>`;
//   contentHTML += `<p class="info-text">Enter up to 5 company names to get a simulated salary analysis. For best results, use full company names (e.g., "Google", "Infosys").</p>`;
//   contentHTML += `<div id="preferred-companies-input-area">`;
//   for (let i = 0; i < 5; i++) {
//     contentHTML += `<input type="text" class="preferred-company-input" placeholder="Preferred Company ${i + 1}" aria-label="Preferred Company ${i + 1} for salary analysis">`;
//   }
//   contentHTML += `</div>`;
//   contentHTML += `<button id="analyze-salary-btn" class="app-button" aria-label="Analyze salaries for entered companies">Analyze Salaries for Preferred Companies</button>`;
//   contentHTML += `<div id="salary-analysis-results" style="margin-top: 20px; display: none;"></div>`; // Results container
//   contentHTML += `<hr class="section-divider">`;
//   contentHTML += `<p class="info-text" style="margin-top:20px;">Click "Home" in the header to return to the main resume analyzer.</p>`;

//   UIManager.showBlankPage(contentHTML); // Or your method to display content

//   const analyzeSalaryBtn = document.getElementById('analyze-salary-btn');
//   if (analyzeSalaryBtn) {
//     analyzeSalaryBtn.addEventListener('click', handleSalaryAnalysis);
//   }
// }


async function handleSalaryAnalysis() {
  const resultsContainer = document.getElementById('salary-analysis-results');
  if (!resultsContainer) {
    console.error("Salary analysis results container not found.");
    return;
  }

  resultsContainer.innerHTML = '<p class="info-text loading-spinner">Analyzing salaries, please wait...</p>'; // Show loading message
  resultsContainer.style.display = 'block'; // Make it visible

  // Disable the button during analysis to prevent multiple clicks
  const analyzeSalaryBtn = document.getElementById('analyze-salary-btn');
  if (analyzeSalaryBtn) {
    analyzeSalaryBtn.disabled = true;
  }

  try {
    // Simulate an asynchronous operation (e.g., API call to your backend)
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5 seconds delay

    const preferredInputs = document.querySelectorAll('.preferred-company-input');
    let hasInput = false;
    let salaryResultsHTML = '<h3>Simulated Salary Analysis:</h3><ul class="salary-results-list">';

    // It's crucial to ensure `resumeTextArea` is accessible in this scope or passed as an argument.
    // Assuming `resumeTextArea` is a globally accessible element or can be retrieved here.
    // Note: Your CSS uses #resume-text, ensure this ID 'resume-text-area' is correct or align them.
    const resumeTextArea = document.getElementById('resume-text-area');
    if (!resumeTextArea) {
      throw new Error("Resume text area ('resume-text-area') not found. Cannot determine experience level for context.");
    }

    const resumeText = resumeTextArea.value || "";
    // Get current exp level (or other relevant context) from resume analysis
    const analysisForExpLevel = AISimulator.analyzeResume(resumeText);

    // ---- START OF ADDED/UPDATED LINES ----

    // Ensure analysisForExpLevel and its properties are valid for salary simulation.
    // This part depends heavily on the structure of `analysisForExpLevel`
    // and what `AISimulator.simulateSalaryForCompany` expects.
    if (!analysisForExpLevel || typeof analysisForExpLevel.experienceLevel === 'undefined') {
      // If experience level is critical and not found, inform the user.
      // Alternatively, you could proceed with a "general" analysis if your simulator supports it.
      throw new Error("Could not determine experience level from resume analysis. Please ensure your resume is analyzed.");
    }
    const experienceLevel = analysisForExpLevel.experienceLevel; // e.g., "5-7 years", "Entry Level"

    preferredInputs.forEach(input => {
      const companyName = input.value.trim();
      if (companyName) {
        hasInput = true;
        // This is a placeholder for your actual salary simulation logic.
        // AISimulator.simulateSalaryForCompany should be a function you define/have.
        // It would ideally take company name, experience level, role (if available), location, etc.
        let estimatedSalary = "Salary data simulation not available."; // Default message
        if (typeof AISimulator.simulateSalaryForCompany === 'function') {
          // Example: You might pass more context if available
          estimatedSalary = AISimulator.simulateSalaryForCompany(companyName, experienceLevel /*, otherFactors */);
        } else {
          console.warn(`AISimulator.simulateSalaryForCompany is not defined. Displaying placeholder for ${companyName}.`);
          // Provide a more informative placeholder if the function isn't ready
          estimatedSalary = `Simulated salary for ${companyName} (Experience: ${experienceLevel}) would appear here.`;
        }
        salaryResultsHTML += `<li><strong>${companyName}:</strong> ${estimatedSalary}</li>`;
      }
    });

    if (!hasInput) {
      // If no companies were entered, update HTML to show a message instead of an empty list.
      salaryResultsHTML = '<h3>Simulated Salary Analysis:</h3><p class="info-text">Please enter at least one company name to get a salary analysis.</p>';
    } else {
      salaryResultsHTML += `</ul>`; // Close the list tag if there were entries
    }

    resultsContainer.innerHTML = salaryResultsHTML;

    // ---- END OF ADDED/UPDATED LINES ----

  } catch (error) {
    console.error("Error during salary analysis:", error);
    if (resultsContainer) { // Ensure resultsContainer is still valid
      // Display a user-friendly error message
      resultsContainer.innerHTML = `<p class="info-text error-text">An error occurred during salary analysis: ${error.message}. Please check your inputs or try again later.</p>`;
    }
  } finally {
    // Re-enable the button regardless of success or failure
    if (analyzeSalaryBtn) {
      analyzeSalaryBtn.disabled = false;
    }
  }
}

// Dummy AISimulator object for demonstration purposes. Replace with your actual implementation.
// const AISimulator = {
//   analyzeResume: function(resumeText) {
//     // Basic example: This should be a more sophisticated analysis in a real app
//     if (resumeText.toLowerCase().includes("senior") || resumeText.toLowerCase().includes("manager") || (resumeText.match(/years experience/i) && parseInt(resumeText) > 5) ) {
//       return { experienceLevel: "Senior Level (5+ years)" };
//     } else if (resumeText.toLowerCase().includes("junior") || resumeText.length > 10) {
//       return { experienceLevel: "Mid Level (2-5 years)" };
//     } else if (resumeText.length > 0) {
//       return { experienceLevel: "Entry Level (0-2 years)" };
//     }
//     return { experienceLevel: "Not specified" }; // Default if no keywords found
//   },
//   simulateSalaryForCompany: function(companyName, experienceLevel, otherFactors = {}) {
//     // This is a placeholder for actual salary simulation.
//     // In a real app, this might involve a database lookup, API call, or complex heuristics.
//     // For now, it returns a generic string.
//     let baseSalary = 50000;
//     if (experienceLevel.includes("Senior")) baseSalary += 40000;
//     if (experienceLevel.includes("Mid")) baseSalary += 20000;

//     if (companyName.toLowerCase().includes("google") || companyName.toLowerCase().includes("microsoft")) {
//         baseSalary *= 1.2;
//     } else if (companyName.toLowerCase().includes("infosys") || companyName.toLowerCase().includes("tcs")) {
//         baseSalary *= 0.8;
//     }
//     const S$ = '$'; // Using S$ to avoid LaTeX interpretation issues in some markdown renderers
//     return `${S$}${baseSalary.toLocaleString()} - ${S$}${(baseSalary + 20000).toLocaleString()} per year (context: ${experienceLevel})`;
//   }
// };

// Ensure UIManager and GlobalData are defined if you uncomment the showSalaryAnalysisPage
// const UIManager = { showBlankPage: (html) => document.body.innerHTML = html }; // very basic mock
// const GlobalData = { aiMatches: [] }; // basic mock

// Example call to set up the page (if needed for testing)
// showSalaryAnalysisPage();
