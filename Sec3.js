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
