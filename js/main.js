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
  proposal:{
    title:'Project Proposal',
    date:'TBA',
    marks:'TBA',
    status:'Documented',
    description:'Initial assessment where the team presented the research problem, scope, objectives, and proposed AI-powered personalized mathematics learning platform for elementary students.',
    notes:[
      'Introduce the Grade 3–5 mathematics learning scope and motivation.',
      'Explain the four planned components: adaptive practice, progress monitoring, content analysis, and engagement/integrity monitoring.',
      'Collect supervisor and panel feedback before implementation continues.'
    ]
  },
  progress1:{
    title:'Progress Presentation-1',
    date:'TBA',
    marks:'TBA',
    status:'Documented',
    description:'First progress review focused on literature findings, refined research gap, architecture, datasets, feature design, and early component implementation.',
    notes:[
      'Present the React, Node.js/Express, Flask, and MongoDB integration architecture.',
      'Show early design for adaptive difficulty, LSTM forecasting, content analysis, and monitoring pipelines.',
      'Discuss practical, ethical, and data limitations identified during development.'
    ]
  },
  progress2:{
    title:'Progress Presentation-2',
    date:'TBA',
    marks:'TBA',
    status:'Documented',
    description:'Second progress review where the team demonstrates AI model training progress, API integration, dashboard workflows, dataset preparation, and interim evaluation evidence.',
    notes:[
      'Present Qwen2.5-Math/QLoRA, Qwen-based LoRA models, LSTM forecasting, MobileNetV2, and YOLOv8-related progress.',
      'Show UI workflows for diagnostic papers, generated practice, recommendations, feedback analysis, and teacher dashboards.',
      'Explain remaining validation needs, especially for the monitoring component.'
    ]
  },
  finalAssessment:{
    title:'Final Assessment',
    date:'TBA',
    marks:'TBA',
    status:'Finalized in report',
    description:'Final project evaluation covering the completed integrated platform, component-level evaluation, system demonstration, contribution summary, limitations, and future work.',
    notes:[
      'Demonstrate the end-to-end learning workflow from diagnostic assessment to personalized practice and recommendation.',
      'Present results: 69.20% difficulty accuracy, 1.59 count MAE, LSTM RMSE 0.10, 70% topic matching accuracy, and 90% video-feedback accuracy.',
      'Clarify that emotion/integrity monitoring is documented as a design and prototype specification with target validation metrics.'
    ]
  },
  viva:{
    title:'Viva',
    date:'TBA',
    marks:'TBA',
    status:'Preparation',
    description:'Oral examination where team members explain individual contribution, model choices, architecture decisions, results, ethical considerations, limitations, and future improvements.',
    notes:[
      'Chamith: adaptive difficulty, question-count prediction, and QLoRA MCQ generation.',
      'Fahad: continuous progress monitoring, LSTM forecasting, and resource recommendation.',
      'Jayathri: content-quality, teacher-guide, and video-feedback analysis; Janendra: emotion-aware and integrity monitoring design.'
    ]
  },
  researchPaper:{
    title:'Final Group Dissertation Report',
    date:'April 2026',
    marks:'TBA',
    status:'Completed',
    description:'Final dissertation report titled “AI-Powered Personalized Mathematics Learning Platform for Elementary Students,” documenting the integrated methodology, implementation, evaluation, discussion, conclusion, and appendices.',
    notes:[
      'Target group: elementary mathematics learners in Grades 3, 4, and 5.',
      'Main components: adaptive difficulty and MCQ generation, progress monitoring and recommendation, content quality and feedback analysis, and emotion/integrity monitoring.',
      'Linked under the Documents section as the Final Group Dissertation Report.'
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
renderMilestone(milestoneSelect.value);
updateActiveNav();
