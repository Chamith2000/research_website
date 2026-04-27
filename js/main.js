/* =========================================================
   MathsBuddy Redesigned Interactions
   Smooth navigation, scroll reveal, custom select, milestone
   rendering, hover polish, pointer glow, and responsive nav.
   ========================================================= */

(() => {
  'use strict';

  const html = document.documentElement;
  html.classList.add('js');

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

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

  const csOptions = [
    { value:'proposalReport', label:'Proposal Report Submission' },
    { value:'proposal', label:'Proposal Presentation' },
    { value:'progress1', label:'Progress Presentation 1' },
    { value:'checklist1', label:'Checklist 1 — Git Repository' },
    { value:'progress2', label:'Progress Presentation 2' },
    { value:'thesisDraft', label:'Thesis Draft Submission' },
    { value:'website', label:'Website Submission' },
    { value:'checklist2', label:'Checklist 2 — MS Planner' },
    { value:'finalPresentation', label:'Final Presentation' },
    { value:'viva', label:'Final Viva' },
    { value:'logbook', label:'Logbook Submission' },
    { value:'researchPaper', label:'Research Paper Submission' },
    { value:'finalAssessment', label:'Final Thesis Submission' }
  ];

  const dividerBefore = [2, 6, 8];

  let navLinks = [];
  let sectionItems = [];
  let activeSectionId = null;
  let scrollTicking = false;
  let cursorTicking = false;
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  function init() {
    navLinks = $$('.nav-links a[href^="#"]');
    sectionItems = navLinks.map((link) => {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (!section) return null;

      return {
        id,
        link,
        label: link.textContent.trim(),
        section,
        text: `${link.textContent} ${section.innerText}`.toLowerCase()
      };
    }).filter(Boolean);

    setupNavigation();
    setupBackToTop();
    setupScrollProgress();
    setupScrollReveal();
    setupCustomSelect();
    setupSearch();
    setupCursorGlow();
    setupCardSpotlight();
    setupRipples();
    setupInputInteractions();
    updateOnScroll();
  }

  function getHeaderOffset() {
    const nav = $('nav');
    return nav ? nav.offsetHeight + 8 : 0;
  }

  function smoothScrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top, behavior:'smooth' });
    setActiveSection(id);
  }

  function setActiveSection(id) {
    if (!id || activeSectionId === id) return;
    activeSectionId = id;

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

  function updateActiveNav() {
    if (!sectionItems.length) return;

    const marker = window.scrollY + getHeaderOffset() + 80;
    let currentId = sectionItems[0].id;

    sectionItems.forEach((item) => {
      if (item.section.offsetTop <= marker) {
        currentId = item.id;
      }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      currentId = sectionItems[sectionItems.length - 1].id;
    }

    setActiveSection(currentId);
  }

  function setupNavigation() {
    const nav = $('nav');
    const navToggle = $('.nav-toggle');
    const navMenu = $('#mainNavLinks') || $('.nav-links');

    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        event.preventDefault();
        smoothScrollTo(href.slice(1));
        closeMobileMenu(navToggle);
      });
    });

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

      document.addEventListener('click', (event) => {
        if (!document.body.classList.contains('nav-open')) return;
        if (navToggle.contains(event.target) || navMenu.contains(event.target)) return;
        closeMobileMenu(navToggle);
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMobileMenu(navToggle);
      });
    }

    function onScrollNav() {
      if (!nav) return;
      nav.classList.toggle('is-scrolled', window.scrollY > 16);
    }

    onScrollNav();
    window.addEventListener('scroll', onScrollNav, { passive:true });
  }

  function closeMobileMenu(navToggle = $('.nav-toggle')) {
    document.body.classList.remove('nav-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  }

  function setupBackToTop() {
    const backToTopButton = $('.back-to-top');
    if (!backToTopButton) return;

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'smooth' });
      setActiveSection('home');
    });
  }

  function toggleBackToTopButton() {
    const backToTopButton = $('.back-to-top');
    if (!backToTopButton) return;
    backToTopButton.classList.toggle('is-visible', window.scrollY > 360);
  }

  function setupScrollProgress() {
    window.addEventListener('scroll', requestScrollUpdate, { passive:true });
    window.addEventListener('resize', requestScrollUpdate);
  }

  function requestScrollUpdate() {
    if (scrollTicking) return;

    scrollTicking = true;
    requestAnimationFrame(() => {
      updateOnScroll();
      scrollTicking = false;
    });
  }

  function updateOnScroll() {
    updateActiveNav();
    toggleBackToTopButton();
    updateScrollProgress();
  }

  function updateScrollProgress() {
    const bar = $('.scroll-progress span');
    if (!bar) return;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    bar.style.width = `${progress}%`;
  }

  function setupScrollReveal() {
    const revealSelectors = [
      '.eyebrow',
      '.stitle',
      '.sdesc',
      '.feature-badge',
      '.dcard',
      '.domain-illus',
      '.milestone-picker',
      '.docs-layout > div',
      '.doc-item',
      '.scard',
      '.about-subtitle',
      '.about-subtitle1',
      '.mcard',
      '.cinfo',
      '.cform',
      '.email-template-card'
    ];

    const revealItems = $$(revealSelectors.join(','));
    revealItems.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 8, 7) * 55}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold:0.16,
      rootMargin:'0px 0px -50px 0px'
    });

    revealItems.forEach((element) => observer.observe(element));
  }

  function renderMilestone(key) {
    const milestone = milestones[key];
    const title = $('#milestoneTitle');
    const date = $('#milestoneDate');
    const marks = $('#milestoneMarks');
    const status = $('#milestoneStatus');
    const description = $('#milestoneDescription');
    const notes = $('#milestoneNotes');
    const detail = $('.milestone-detail');

    if (!milestone || !title || !date || !marks || !status || !description || !notes) return;

    if (detail) {
      detail.classList.remove('is-switching');
      void detail.offsetWidth;
      detail.classList.add('is-switching');
    }

    title.textContent = milestone.title;
    date.textContent = milestone.date;
    marks.textContent = milestone.marks;
    status.textContent = milestone.status;
    description.textContent = milestone.description;
    notes.innerHTML = '';

    milestone.notes.forEach((note) => {
      const noteItem = document.createElement('li');
      noteItem.textContent = note;
      notes.appendChild(noteItem);
    });
  }

  function setupCustomSelect() {
    const cs = $('#customSelect');
    const csTrigger = $('#csTrigger');
    const csLabel = $('#csLabel');
    const csList = $('#csList');
    if (!cs || !csTrigger || !csLabel || !csList) return;

    let csOpen = false;
    let currentValue = 'proposalReport';

    function buildCsList() {
      csList.innerHTML = '';

      csOptions.forEach((option, index) => {
        if (dividerBefore.includes(index)) {
          const divider = document.createElement('div');
          divider.className = 'cs-divider';
          csList.appendChild(divider);
        }

        const item = document.createElement('div');
        item.className = `cs-option${option.value === currentValue ? ' selected' : ''}`;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', option.value === currentValue ? 'true' : 'false');
        item.tabIndex = -1;
        item.dataset.value = option.value;

        const left = document.createElement('span');
        left.className = 'cs-option-left';

        const dot = document.createElement('span');
        dot.className = 'cs-dot';

        const label = document.createElement('span');
        label.textContent = option.label;

        const check = document.createElement('span');
        check.className = 'cs-check';
        check.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12"/></svg>';

        left.append(dot, label);
        item.append(left, check);
        item.addEventListener('click', () => selectOption(option.value, option.label));
        csList.appendChild(item);
      });
    }

    function openDropdown() {
      csOpen = true;
      cs.classList.add('open');
      csTrigger.setAttribute('aria-expanded', 'true');
      const selected = csList.querySelector('.selected');
      if (selected) selected.scrollIntoView({ block:'nearest' });
    }

    function closeDropdown() {
      csOpen = false;
      cs.classList.remove('open');
      csTrigger.setAttribute('aria-expanded', 'false');
    }

    function selectOption(value, label) {
      currentValue = value;
      csLabel.textContent = label;
      buildCsList();
      closeDropdown();
      renderMilestone(value);
    }

    function moveSelection(direction) {
      const currentIndex = csOptions.findIndex((option) => option.value === currentValue);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), csOptions.length - 1);
      const next = csOptions[nextIndex];
      selectOption(next.value, next.label);
      if (csOpen) openDropdown();
    }

    csTrigger.addEventListener('click', () => {
      csOpen ? closeDropdown() : openDropdown();
    });

    csTrigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        csOpen ? closeDropdown() : openDropdown();
      }
      if (event.key === 'Escape') closeDropdown();
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveSelection(1);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveSelection(-1);
      }
    });

    document.addEventListener('click', (event) => {
      if (!cs.contains(event.target)) closeDropdown();
    });

    buildCsList();
    renderMilestone(currentValue);
  }

  function setupSearch() {
    const searchForm = $('.nav-search');
    const searchInput = $('.nav-search input');
    const searchResults = $('.search-results');
    if (!searchForm || !searchInput || !searchResults) return;

    function getSearchMatches(query) {
      const term = query.trim().toLowerCase();
      if (!term) return [];
      return sectionItems.filter((item) => item.text.includes(term)).slice(0, 5);
    }

    function closeSearchResults() {
      searchForm.classList.remove('has-results');
      searchInput.setAttribute('aria-expanded', 'false');
      searchResults.innerHTML = '';
    }

    function renderSearchResults(query) {
      const matches = getSearchMatches(query);
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
      } else {
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
      }

      searchForm.classList.add('has-results');
      searchInput.setAttribute('aria-expanded', 'true');
      return matches;
    }

    searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const first = getSearchMatches(searchInput.value)[0];
      if (first) {
        smoothScrollTo(first.id);
        closeSearchResults();
        searchInput.value = '';
      }
    });

    searchResults.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-target]');
      if (!button) return;
      smoothScrollTo(button.dataset.target);
      closeSearchResults();
      searchInput.value = '';
      searchInput.blur();
    });

    document.addEventListener('click', (event) => {
      if (!searchForm.contains(event.target)) closeSearchResults();
    });

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeSearchResults();
    });
  }

  function setupCursorGlow() {
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      dot.style.opacity = '1';
      ring.style.opacity = '1';
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      cursorTicking = true;
      requestAnimationFrame(animateCursor);
    }

    window.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!cursorTicking) animateCursor();
    }, { passive:true });

    window.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    const hoverSelector = 'a, button, input, textarea, .doc-item, .scard, .dcard, .mcard, .feature-badge, .cs-trigger, .cs-option';
    document.addEventListener('mouseover', (event) => {
      if (event.target.closest(hoverSelector)) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', (event) => {
      if (event.target.closest(hoverSelector)) ring.classList.remove('is-active');
    });
  }

  function setupCardSpotlight() {
    $$('.scard').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });
  }

  function setupRipples() {
    const rippleTargets = $$('.btn, .doc-item, .slink, .back-to-top, .cs-trigger');

    rippleTargets.forEach((target) => {
      target.classList.add('ripple-target');
      target.addEventListener('pointerdown', (event) => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--rip-x', `${event.clientX - rect.left}px`);
        target.style.setProperty('--rip-y', `${event.clientY - rect.top}px`);
        target.classList.remove('is-rippling');
        void target.offsetWidth;
        target.classList.add('is-rippling');
        window.setTimeout(() => target.classList.remove('is-rippling'), 700);
      });
    });
  }

  function setupInputInteractions() {
    $$('.fg input, .fg textarea').forEach((field) => {
      const group = field.closest('.fg');
      if (!group) return;

      field.addEventListener('focus', () => group.classList.add('is-focused'));
      field.addEventListener('blur', () => group.classList.remove('is-focused'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();
