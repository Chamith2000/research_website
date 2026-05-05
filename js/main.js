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
      description: 'This is an individual report that explains how each specific component of the system will be developed over the year.',
      notes: [
        'Clearly describes the approach and planned methodology.',
        'Explains how the individual component contributes to the final system.',
        'Submitted on 15th August 2025 and worth 6%.'
      ]
    },
    proposal: {
      title: 'Proposal Presentation',
      date: '8th – 12th September 2025',
      marks: '6%',
      status: 'Completed',
      description: 'In this stage, the group presents the initial project proposal to an academic panel.',
      notes: [
        'Highlights the research problem and project objectives.',
        'Explains the methodology behind the AI-powered mathematics learning system.',
        'Presented between 8th and 12th September 2025 and worth 6%.'
      ]
    },
    progress1: {
      title: 'Progress Presentation 1',
      date: '5th – 9th January 2026',
      marks: '15%',
      status: 'Completed',
      description: 'At this stage, the project should be approximately 50% completed.',
      notes: [
        'Demonstrate current progress and percentage of completion.',
        'Explain work completed so far and remaining tasks.',
        'Provide evidence such as a live demo, simulation, or partial system.'
      ]
    },
    progress2: {
      title: 'Progress Presentation 2',
      date: '9th – 12th March 2026',
      marks: '18%',
      status: 'Completed',
      description: 'By this point, the project should be close to completion and ready for a nearly finished demonstration.',
      notes: [
        'All four components must be integrated.',
        'The system should be at least 90% complete.',
        'A nearly finished solution should be demonstrated.'
      ]
    },
    checklists: {
      title: 'Checklist Submissions',
      date: '11th January 2026 and 30th April 2026',
      marks: '2%',
      status: 'Completed',
      description: 'Checklist submissions confirm project management evidence and development tracking for the research project.',
      notes: [
        'Checklist 1: submit Git repository with a properly documented README.md by 11th January 2026.',
        'Checklist 2: submit MS Planner report exported from the project management tool by 30th April 2026.',
        'Both checklist submissions together are worth 2%.'
      ]
    },
    finalThesis: {
      title: 'Final Thesis Submissions',
      date: '13th May 2026',
      marks: 'Individual 15% + Group 4%',
      status: 'Pending',
      description: 'Final individual thesis and group thesis submissions cover the complete research project.',
      notes: [
        'Individual Thesis is worth 15%; Group Thesis is worth 4%.',
        'Draft versions must be submitted by 26th April 2026.',
        'Documents should cover the introduction, methodology, results, and findings.'
      ]
    },
    finalPresentation: {
      title: 'Final Presentation',
      date: '27th April – 6th May 2026',
      marks: '10%',
      status: 'In Progress',
      description: 'The complete research project must be fully finished for this presentation.',
      notes: [
        'Clearly explain the entire system.',
        'Present the implementation approach.',
        'Explain the final results.'
      ]
    },
    viva: {
      title: 'Final Viva',
      date: '27th April – 6th May 2026',
      marks: '10%',
      status: 'In Progress',
      description: 'An oral examination where each member answers questions based on their research work and the developed system.',
      notes: [
        'Answer questions about the individual research component.',
        'Explain system design, implementation choices, and results.',
        'Conducted between 27th April and 6th May 2026 and worth 10%.'
      ]
    },
    website: {
      title: 'Website Submission',
      date: '26th April 2026',
      marks: '2%',
      status: 'Completed',
      description: 'A project website must be created to present the research project and supporting materials.',
      notes: [
        'Include project overview and research details.',
        'Show milestones, progress, presentation slides, and documents.',
        'Include About Us and Contact Us sections; evaluation is between 27th April and 6th May 2026.'
      ]
    },
    researchPaper: {
      title: 'Research Paper Submission',
      date: '8th May 2026',
      marks: '10%',
      status: 'Pending',
      description: 'A formal research paper summarizing the study, methodology, and results must be submitted.',
      notes: [
        'Summarize the research problem and study background.',
        'Describe the methodology.',
        'Present the results and submit by 8th May 2026.'
      ]
    },
    logbook: {
      title: 'Logbook Submission',
      date: '27th April – 6th May 2026',
      marks: '2%',
      status: 'Pending',
      description: 'A detailed record of daily work must be submitted during the final evaluation period.',
      notes: [
        'Include tasks completed.',
        'Include supervisor feedback and comments.',
        'Include signatures confirming supervision.'
      ]
    }
  };

  const csOptions = [
    { value:'proposalReport', label:'Proposal Report Submission' },
    { value:'proposal', label:'Proposal Presentation' },
    { value:'progress1', label:'Progress Presentation 1' },
    { value:'progress2', label:'Progress Presentation 2' },
    { value:'checklists', label:'Checklist Submissions' },
    { value:'finalThesis', label:'Final Thesis Submissions' },
    { value:'finalPresentation', label:'Final Presentation' },
    { value:'viva', label:'Final Viva' },
    { value:'website', label:'Website Submission' },
    { value:'researchPaper', label:'Research Paper Submission' },
    { value:'logbook', label:'Logbook Submission' }
  ];

  const dividerBefore = [2, 4, 6, 8];

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
      '.tech-stack-card',
      '.tech-item',
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

    const hoverSelector = 'a, button, input, textarea, .doc-item, .scard, .dcard, .tech-item, .mcard, .feature-badge, .cs-trigger, .cs-option';
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
