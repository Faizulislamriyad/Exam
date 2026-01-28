document.addEventListener("DOMContentLoaded", function () {
  const examTableBody = document.getElementById("examTableBody");
  const togglePastBtn = document.getElementById("togglePastBtn");
  const statusText = document.getElementById("statusText");

  // Store the current state
  let showPastExams = true;

  // Function to parse date from table cell
  function parseExamDate(dateCell) {
    const dateText = dateCell.textContent.trim();
    // Extract date parts (e.g., "5 January 2026")
    const dateMatch = dateText.match(/(\d+)\s+([A-Za-z]+)\s+(\d+)/);
    if (dateMatch) {
      const day = parseInt(dateMatch[1]);
      const month = dateMatch[2];
      const year = parseInt(dateMatch[3]);

      // Convert month name to month index (0-11)
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthIndex = monthNames.indexOf(month);

      // Create date object (time is always 10:00 AM)
      return new Date(year, monthIndex, day, 10, 0, 0);
    }
    return null;
  }

  // Function to check if an exam date has passed
  function isPastExam(examDate) {
    const now = new Date();
    return examDate < now;
  }

  // Function to update the table based on current date
  function updateExamTable() {
    const rows = examTableBody.querySelectorAll("tr");
    let pastExamsCount = 0;
    let upcomingExamsCount = 0;

    rows.forEach((row) => {
      const dateCell = row.querySelector(".exam-date");
      if (dateCell) {
        const examDate = parseExamDate(dateCell);

        if (examDate && isPastExam(examDate)) {
          row.classList.add("past-exam");
          pastExamsCount++;

          // Hide or show based on toggle state
          if (!showPastExams) {
            row.classList.add("hidden");
          } else {
            row.classList.remove("hidden");
          }
        } else {
          row.classList.remove("past-exam", "hidden");
          upcomingExamsCount++;
        }
      }
    });

    // Update status text
    if (showPastExams) {
      statusText.textContent = `Showing all exams (${pastExamsCount} past, ${upcomingExamsCount} upcoming)`;
      togglePastBtn.textContent = "Hide Past Exams";
    } else {
      statusText.textContent = `Showing ${upcomingExamsCount} upcoming exams (${pastExamsCount} past exams hidden)`;
      togglePastBtn.textContent = "Show All Exams";
    }
  }

  // Toggle button click handler
  togglePastBtn.addEventListener("click", function () {
    showPastExams = !showPastExams;
    updateExamTable();
  });

  // Initial update when page loads
  updateExamTable();

  // Optional: Update every minute to handle time changes
  setInterval(updateExamTable, 60000);
});
