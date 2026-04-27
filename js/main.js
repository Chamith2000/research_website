const backToTopButton = document.querySelector('.back-to-top');
const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const sectionItems = navLinks.map((link) => {
  const id = link.getAttribute('href').slice(1);
  const section = document.getElementById(id);

  if (!section) {
    return null;
  }

  return {
    id,
    link,
    label:link.textContent.trim(),
    section,
    text:`${link.textContent} ${section.innerText}`.toLowerCase()
  };
}).filter(Boolean);
const searchForm = document.querySelector('.nav-search');
const searchInput = document.querySelector('.nav-search input');
const searchResults = document.querySelector('.search-results');
const milestoneSelect = document.querySelector('#milestoneSelect');
const milestoneTitle = document.querySelector('#milestoneTitle');
const milestoneDate = document.querySelector('#milestoneDate');
const milestoneMarks = document.querySelector('#milestoneMarks');
const milestoneStatus = document.querySelector('#milestoneStatus');
const milestoneDescription = document.querySelector('#milestoneDescription');
const milestoneNotes = document.querySelector('#milestoneNotes');
const milestones = {
  proposalReport: {
    title: 'Proposal Report Submission',
    date: '15th August 2025',
    marks: '6%',
    status: 'Completed',
    description: 'Individual report submitted by each team member explaining their specific component of the system, including planned approach, methodology, and contribution to the final MathsBuddy platform.',
    notes: [
      'Individual submission — each member describes their own component in detail.',
      'Covers planned methodology and how the component integrates with the overall system.',
      'Submitted by 15th August 2025 — worth 6% of the final grade.'
    ]
  },
  proposal: {
    title: 'Proposal Presentation',
    date: '8th – 12th September 2025',
    marks: '6%',
    status: 'Completed',
    description: 'Group presentation to an academic panel introducing the MathsBuddy research project — covering the research problem, objectives, and the methodology behind the AI-powered mathematics learning system.',
    notes: [
      'Introduce the Grade 3–5 mathematics learning scope and research motivation.',
      'Explain the four planned components: adaptive practice, progress monitoring, content analysis, and engagement/integrity monitoring.',
      'Collect supervisor and panel feedback before implementation continues.'
    ]
  },
  progress1: {
    title: 'Progress Presentation 1',
    date: '5th – 9th January 2026',
    marks: '15%',
    status: 'Completed',
    description: 'First progress review where the project should be approximately 50% complete. The team demonstrates current progress, work completed, remaining tasks, and provides evidence such as a live demo, simulation, or partial system.',
    notes: [
      'Present the React, Node.js/Express, Flask, and MongoDB integration architecture.',
      'Show early design for adaptive difficulty, LSTM forecasting, content analysis, and monitoring pipelines.',
      'Discuss practical, ethical, and data limitations identified during development.'
    ]
  },
  checklist1: {
    title: 'Checklist 1 — Git Repository',
    date: '11th January 2026',
    marks: '2%',
    status: 'Completed',
    description: 'Submit the Git repository link with a properly documented README.md file as evidence of project management and version control practices.',
    notes: [
      'Repository must be accessible and contain a well-structured README.md.',
      'README should include project overview, setup instructions, and team details.',
      'Submitted by 11th January 2026 — worth 2% of the final grade.'
    ]
  },
  progress2: {
    title: 'Progress Presentation 2',
    date: '9th – 12th March 2026',
    marks: '18%',
    status: 'Completed',
    description: 'Second progress review requiring all four components to be integrated and the system at least 90% complete. A nearly finished solution must be demonstrated to the panel.',
    notes: [
      'All four components (adaptive MCQ, progress monitoring, content analysis, emotion/integrity monitoring) must be integrated.',
      'Present Qwen2.5-Math/QLoRA, LSTM forecasting, MobileNetV2, and YOLOv8 progress.',
      'Show UI workflows for diagnostic papers, generated practice, recommendations, and teacher dashboards.'
    ]
  },
  thesisDraft: {
    title: 'Thesis Draft Submission',
    date: '26th April 2026',
    marks: 'N/A',
    status: 'Completed',
    description: 'Draft versions of both the individual and group thesis must be submitted by this date ahead of the final submission deadline on 13th May 2026.',
    notes: [
      'Both individual and group thesis drafts due by 26th April 2026.',
      'Should cover Introduction, Methodology, and Results sections.',
      'Final submission deadline is 13th May 2026.'
    ]
  },
  website: {
    title: 'Website Submission',
    date: '26th April 2026',
    marks: '2%',
    status: 'Completed',
    description: 'Project website showcasing the research must be submitted by 26th April 2026 and will be evaluated between 27th April – 6th May 2026. The site must include project overview, milestones, presentation slides, documents, About Us, and Contact Us sections.',
    notes: [
      'Website must include: project overview, milestones, slides, documents, About Us, and Contact sections.',
      'Submitted by 26th April 2026 — evaluation period: 27th April – 6th May 2026.',
      'Worth 2% of the final grade.'
    ]
  },
  checklist2: {
    title: 'Checklist 2 — MS Planner Report',
    date: '30th April 2026',
    marks: '2%',
    status: 'Pending',
    description: 'Submit the MS Planner report exported from the project management tool as evidence of structured task planning and team management throughout the project.',
    notes: [
      'Export and submit the MS Planner report by 30th April 2026.',
      'Report should reflect all tasks, assignments, and completion status.',
      'Worth 2% of the final grade.'
    ]
  },
  finalPresentation: {
    title: 'Final Presentation',
    date: '27th April – 6th May 2026',
    marks: '10%',
    status: 'Pending',
    description: 'Final presentation of the fully completed MathsBuddy platform to the academic panel. The entire system must be finished, clearly explaining the implementation, component results, and research findings.',
    notes: [
      'Demonstrate the full end-to-end workflow: diagnostic assessment → adaptive practice → recommendation.',
      'Present final results: 69.20% difficulty accuracy, 1.59 count MAE, LSTM RMSE 0.10, 70% topic matching, 90% video-feedback accuracy.',
      'Clarify that emotion/integrity monitoring is documented as a design and prototype specification.'
    ]
  },
  viva: {
    title: 'Final Viva',
    date: '27th April – 6th May 2026',
    marks: '10%',
    status: 'Pending',
    description: 'Oral examination where each team member answers questions based on their individual research work, model choices, architecture decisions, results, ethical considerations, limitations, and future improvements.',
    notes: [
      'Chamith: adaptive difficulty, question-count prediction, and QLoRA MCQ generation.',
      'Fahad: continuous progress monitoring, LSTM forecasting, and resource recommendation.',
      'Jayathri: content-quality, teacher-guide, and video-feedback analysis; Janendra: emotion-aware and integrity monitoring design.'
    ]
  },
  logbook: {
    title: 'Logbook Submission',
    date: '27th April – 6th May 2026',
    marks: '2%',
    status: 'Pending',
    description: 'Detailed record of daily work submitted during the viva period, including tasks completed, supervisor feedback and comments, and signatures confirming supervision.',
    notes: [
      'Record all tasks completed throughout the project duration.',
      'Include supervisor feedback, meeting notes, and signed confirmations.',
      'Worth 2% of the final grade.'
    ]
  },
  researchPaper: {
    title: 'Research Paper Submission',
    date: '8th May 2026',
    marks: '10%',
    status: 'Pending',
    description: 'Formal research paper summarising the MathsBuddy study, methodology, and results must be submitted by 8th May 2026.',
    notes: [
      'Paper should formally document the research problem, methodology, and key evaluation results.',
      'Must follow the academic paper format required by the module.',
      'Worth 10% of the final grade.'
    ]
  },
  finalAssessment: {
    title: 'Final Thesis Submission',
    date: '13th May 2026',
    marks: 'Individual 15% + Group 4%',
    status: 'Pending',
    description: 'Final individual thesis (15%) and group thesis (4%) must be submitted by 13th May 2026. These documents cover the entire research including Introduction, Methodology, Results and findings.',
    notes: [
      'Individual thesis covers your specific component in full detail (15%).',
      'Group thesis documents the integrated MathsBuddy platform as a whole (4%).',
      'Draft versions were due 26th April 2026; final submission closes 13th May 2026.'
    ]
  }
};

function setActiveSection(id){
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current','page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function updateActiveNav(){
  const marker = window.scrollY + 120;
  let currentId = sectionItems[0]?.id;

  sectionItems.forEach((item) => {
    if (item.section.offsetTop <= marker) {
      currentId = item.id;
    }
  });

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 8) {
    currentId = sectionItems[sectionItems.length - 1]?.id;
  }

  if (currentId) {
    setActiveSection(currentId);
  }
}

function toggleBackToTopButton(){
  backToTopButton.classList.toggle('is-visible', window.scrollY > 320);
}

function renderMilestone(key){
  const milestone = milestones[key];

  if (!milestone) {
    return;
  }

  milestoneTitle.textContent = milestone.title;
  milestoneDate.textContent = milestone.date;
  milestoneMarks.textContent = milestone.marks;
  milestoneStatus.textContent = milestone.status;
  milestoneDescription.textContent = milestone.description;
  milestoneNotes.innerHTML = '';

  milestone.notes.forEach((note) => {
    const noteItem = document.createElement('li');
    noteItem.textContent = note;
    milestoneNotes.appendChild(noteItem);
  });
}

function getSearchMatches(query){
  const term = query.trim().toLowerCase();

  if (!term) {
    return [];
  }

  return sectionItems.filter((item) => item.text.includes(term)).slice(0,5);
}

function closeSearchResults(){
  if (!searchForm || !searchInput || !searchResults) { return; }
  searchForm.classList.remove('has-results');
  searchInput.setAttribute('aria-expanded','false');
  searchResults.innerHTML = '';
}

function renderSearchResults(query){
  const matches = getSearchMatches(query);

  if (!searchForm || !searchInput || !searchResults) { return matches; }
  searchResults.innerHTML = '';

  if (!query.trim()) {
    closeSearchResults();
    return matches;
  }

  if (!matches.length) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'search-empty';
    emptyItem.textContent = 'No results found';
    searchResults.appendChild(emptyItem);
    searchForm.classList.add('has-results');
    searchInput.setAttribute('aria-expanded','true');
    return matches;
  }

  matches.forEach((item) => {
    const resultItem = document.createElement('li');
    const resultButton = document.createElement('button');
    const title = document.createElement('span');
    const meta = document.createElement('span');

    resultButton.type = 'button';
    resultButton.dataset.target = item.id;
    title.className = 'search-title';
    title.textContent = item.label;
    meta.className = 'search-meta';
    meta.textContent = 'Section';

    resultButton.append(title, meta);
    resultItem.appendChild(resultButton);
    searchResults.appendChild(resultItem);
  });

  searchForm.classList.add('has-results');
  searchInput.setAttribute('aria-expanded','true');
  return matches;
}

function scrollToSection(id){
  const item = sectionItems.find((sectionItem) => sectionItem.id === id);

  if (!item) {
    return;
  }

  item.section.scrollIntoView({behavior:'smooth', block:'start'});
  setActiveSection(id);
  closeSearchResults();
  if (searchInput) {
    searchInput.value = '';
    searchInput.blur();
  }
}

backToTopButton.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
  setActiveSection('home');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveSection(link.getAttribute('href').slice(1));
  });
});

window.addEventListener('scroll', () => {
  toggleBackToTopButton();
  updateActiveNav();
}, {passive:true});

toggleBackToTopButton();
const csOptions = [
  {value:'proposalReport', label:'Proposal Report Submission'},
  {value:'proposal',       label:'Proposal Presentation'},
  {value:'progress1',      label:'Progress Presentation 1'},
  {value:'checklist1',     label:'Checklist 1 — Git Repository'},
  {value:'progress2',      label:'Progress Presentation 2'},
  {value:'thesisDraft',    label:'Thesis Draft Submission'},
  {value:'website',        label:'Website Submission'},
  {value:'checklist2',     label:'Checklist 2 — MS Planner'},
  {value:'finalPresentation', label:'Final Presentation'},
  {value:'viva',           label:'Final Viva'},
  {value:'logbook',        label:'Logbook Submission'},
  {value:'researchPaper',  label:'Research Paper Submission'},
  {value:'finalAssessment',label:'Final Thesis Submission'}
];
const dividerBefore = [2, 6, 8];

const cs       = document.getElementById('customSelect');
const csTrigger= document.getElementById('csTrigger');
const csLabel  = document.getElementById('csLabel');
const csList   = document.getElementById('csList');
let csOpen = false;
let currentValue = 'proposalReport';

function buildCsList() {
  csList.innerHTML = '';
  csOptions.forEach((opt, i) => {
    if (dividerBefore.includes(i)) {
      const div = document.createElement('div');
      div.className = 'cs-divider';
      csList.appendChild(div);
    }
    const el = document.createElement('div');
    el.className = 'cs-option' + (opt.value === currentValue ? ' selected' : '');
    el.setAttribute('role', 'option');
    el.setAttribute('aria-selected', opt.value === currentValue ? 'true' : 'false');
    el.dataset.value = opt.value;
    el.innerHTML = `
      <span class="cs-option-left">
        <span class="cs-dot"></span>
        <span>${opt.label}</span>
      </span>
      <span class="cs-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>`;
    el.addEventListener('click', () => csSelectOption(opt.value, opt.label));
    csList.appendChild(el);
  });
}

function csOpenDropdown() {
  csOpen = true; cs.classList.add('open');
  csTrigger.setAttribute('aria-expanded', 'true');
  const sel = csList.querySelector('.selected');
  if (sel) sel.scrollIntoView({ block: 'nearest' });
}
function csCloseDropdown() {
  csOpen = false; cs.classList.remove('open');
  csTrigger.setAttribute('aria-expanded', 'false');
}
function csSelectOption(value, text) {
  currentValue = value;
  csLabel.textContent = text;
  buildCsList();
  csCloseDropdown();
  renderMilestone(value);
}

csTrigger.addEventListener('click', () => csOpen ? csCloseDropdown() : csOpenDropdown());
csTrigger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); csOpen ? csCloseDropdown() : csOpenDropdown(); }
  if (e.key === 'Escape') csCloseDropdown();
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const idx = csOptions.findIndex(o => o.value === currentValue);
    const next = csOptions[Math.min(idx + 1, csOptions.length - 1)];
    csSelectOption(next.value, next.label);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    const idx = csOptions.findIndex(o => o.value === currentValue);
    const prev = csOptions[Math.max(idx - 1, 0)];
    csSelectOption(prev.value, prev.label);
  }
});
document.addEventListener('click', e => { if (!cs.contains(e.target)) csCloseDropdown(); });

buildCsList();
renderMilestone(currentValue);
updateActiveNav();