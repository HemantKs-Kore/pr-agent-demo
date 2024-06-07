// Get references to the search input and FAQ accordion
const searchInput = document.getElementById("faqSearch");
const faqAccordion = document.getElementById("faqAccordion");
const clearSearchButton = document.getElementById("clearSearchButton");

// Event listener
searchInput.addEventListener("input", filterFAQs);
clearSearchButton.addEventListener("click", clearSearch);

// Initial filtering (show all FAQs)
filterFAQs();

// Function to filter FAQs based on search term
function filterFAQs() {
  console.log("Filter FAQS");
  const searchTerm = searchInput.value.toLowerCase();
  const faqItems = faqAccordion.querySelectorAll(".accordion-item");

  // Flag to track if any item matches the search term
  let anyMatch = false;

  faqItems.forEach((item) => {
    const accordionButton = item.querySelector(".accordion-button");
    const question = accordionButton.textContent; // Remove .toLowerCase()
    const answer = item.querySelector(".accordion-body").textContent; // Remove .toLowerCase()
    const answerWrapper = item.querySelector(".accordion-collapse");
    const isVisible =
      question.toLowerCase().includes(searchTerm) ||
      answer.toLowerCase().includes(searchTerm);
    item.style.display = isVisible ? "block" : "none";

    if (searchTerm) {
      if (isVisible) {
        accordionButton.classList.remove("collapsed");
        answerWrapper.classList.add("show");

        // Highlight matched terms
        // const highlightedQuestion = question.replace(
        //   new RegExp(searchTerm, "gi"),
        //   (match) => `<mark>${match}</mark>`
        // );
        // const highlightedAnswer = answer.replace(
        //   new RegExp(searchTerm, "gi"),
        //   (match) => `<mark>${match}</mark>`
        // );

        // accordionButton.innerHTML = highlightedQuestion;
        // item.querySelector(".accordion-body").innerHTML = highlightedAnswer;
        anyMatch = true;
      } else {
        accordionButton.classList.add("collapsed");
        answerWrapper.classList.remove("show");
      }
    } else {
      accordionButton.classList.add("collapsed");
      answerWrapper.classList.remove("show");
    }
  });

  // Expand all filtered items if any match found
  if (anyMatch) {
    faqItems.forEach((item) => {
      const accordionButton = item.querySelector(".accordion-button");
      const accordionCollapse = item.querySelector(".accordion-collapse");
      accordionButton.setAttribute("aria-expanded", "true");
      accordionCollapse.classList.add("show");
    });
  }

  // Show/hide clear search button
  clearSearchButton.style.display = searchTerm ? "block" : "none";
}

// Function to clear search input
function clearSearch() {
  searchInput.value = "";
  filterFAQs(); // Re-run filtering when search input is cleared
}
