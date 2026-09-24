const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "NovaTech Solutions",
    domain: "Frontend Development",
    location: "Chennai",
    duration: "1 Month",
    stipend: "₹8,000 / month"
  },
  {
    id: 2,
    title: "Web Development Intern",
    company: "BrightWeb Labs",
    domain: "Web Development",
    location: "Remote",
    duration: "2 Months",
    stipend: "₹10,000 / month"
  },
  {
    id: 3,
    title: "React Developer Intern",
    company: "PixelCraft Technologies",
    domain: "Frontend Development",
    location: "Bengaluru",
    duration: "3 Months",
    stipend: "₹12,000 / month"
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    company: "CodeBase Systems",
    domain: "Backend Development",
    location: "Chennai",
    duration: "2 Months",
    stipend: "₹9,000 / month"
  },
  {
    id: 5,
    title: "Full Stack Developer Intern",
    company: "CloudNova",
    domain: "Full Stack Development",
    location: "Remote",
    duration: "3 Months",
    stipend: "₹15,000 / month"
  },
  {
    id: 6,
    title: "UI/UX Design Intern",
    company: "DesignSphere",
    domain: "UI/UX Design",
    location: "Chennai",
    duration: "1 Month",
    stipend: "₹7,000 / month"
  },
  {
    id: 7,
    title: "JavaScript Web Intern",
    company: "WebForge",
    domain: "Web Development",
    location: "Remote",
    duration: "1 Month",
    stipend: "₹6,000 / month"
  },
  {
    id: 8,
    title: "Node.js Intern",
    company: "DevBridge",
    domain: "Backend Development",
    location: "Hyderabad",
    duration: "3 Months",
    stipend: "₹11,000 / month"
  },
  {
    id: 9,
    title: "React Frontend Intern",
    company: "TechOrbit",
    domain: "Frontend Development",
    location: "Chennai",
    duration: "2 Months",
    stipend: "₹10,000 / month"
  }
];

const searchInput = document.getElementById("search");
const domainSelect = document.getElementById("domain");
const clearButton = document.getElementById("clearFilters");
const internshipList = document.getElementById("internshipList");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
const resultCount = document.getElementById("resultCount");

function createInternshipCard(internship) {
  const card = document.createElement("article");
  card.className = "internship-card";

  card.innerHTML = `
    <span class="domain">${internship.domain}</span>

    <h3>${internship.title}</h3>

    <p class="company">${internship.company}</p>

    <dl class="details">
      <div class="detail">
        <dt>Location</dt>
        <dd>${internship.location}</dd>
      </div>

      <div class="detail">
        <dt>Duration</dt>
        <dd>${internship.duration}</dd>
      </div>

      <div class="detail">
        <dt>Stipend</dt>
        <dd>${internship.stipend}</dd>
      </div>
    </dl>

    <a
      class="apply-btn"
      href="#"
      aria-label="Apply for ${internship.title} at ${internship.company}"
    >
      View Internship
    </a>
  `;

  return card;
}

function renderInternships(list) {
  internshipList.innerHTML = "";
  emptyState.classList.add("hidden");
  errorState.classList.add("hidden");

  resultCount.textContent = `${list.length} internship${list.length === 1 ? "" : "s"} found`;

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  const fragment = document.createDocumentFragment();

  list.forEach((internship) => {
    fragment.appendChild(createInternshipCard(internship));
  });

  internshipList.appendChild(fragment);
}

function filterInternships() {
  try {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedDomain = domainSelect.value;

    const filtered = internships.filter((internship) => {
      const searchableText = `
        ${internship.title}
        ${internship.company}
        ${internship.domain}
        ${internship.location}
      `.toLowerCase();

      const matchesSearch =
        searchTerm === "" || searchableText.includes(searchTerm);

      const matchesDomain =
        selectedDomain === "all" ||
        internship.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });

    renderInternships(filtered);
  } catch (error) {
    internshipList.innerHTML = "";
    emptyState.classList.add("hidden");
    errorState.classList.remove("hidden");
    resultCount.textContent = "";
    console.error("Filtering error:", error);
  }
}

function clearFilters() {
  searchInput.value = "";
  domainSelect.value = "all";
  filterInternships();
  searchInput.focus();
}

searchInput.addEventListener("input", filterInternships);
domainSelect.addEventListener("change", filterInternships);
clearButton.addEventListener("click", clearFilters);

// Initial render
renderInternships(internships);