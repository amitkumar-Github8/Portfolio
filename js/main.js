// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollReveal with error handling
    let sr;
    try {
        sr = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 2000,
            reset: true
        });

        // Reveal animations for different sections
        sr.reveal('.home__content', {});
        sr.reveal('.home__img', {delay: 200});
        sr.reveal('.about__content', {delay: 200});
        sr.reveal('.about__img', {delay: 400});
        sr.reveal('.skills__title', {});
        sr.reveal('.skills__item', {interval: 200});
        sr.reveal('.projects__title', {});
        sr.reveal('.project__card', {interval: 200});
        sr.reveal('.blog__title', {});
        sr.reveal('.blog__card', {interval: 200});
        // Remove social section from ScrollReveal to prevent conflicts
        // sr.reveal('.social__title', {});
        // sr.reveal('.social__card', {interval: 200});
    } catch (error) {
        console.error('ScrollReveal initialization failed:', error);
    }

    // Mobile Menu Toggle with error handling
    const menuBtn = document.querySelector('.header__menu-btn');
    const menu = document.querySelector('.header__menu');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside with event delegation
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }

    // Smooth scrolling with error handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                if (menu && menuBtn) {
                    menu.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect with debouncing
    const headerElement = document.querySelector('.header');
    let lastScroll = 0;
    let scrollTimeout;

    if (headerElement) {
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    headerElement.classList.remove('scroll-up');
                    return;
                }
                
                if (currentScroll > lastScroll && !headerElement.classList.contains('scroll-down')) {
                    headerElement.classList.remove('scroll-up');
                    headerElement.classList.add('scroll-down');
                } else if (currentScroll < lastScroll && headerElement.classList.contains('scroll-down')) {
                    headerElement.classList.remove('scroll-down');
                    headerElement.classList.add('scroll-up');
                }
                lastScroll = currentScroll;
            });
        });
    }

    // Reveal animations on scroll with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Typing effect with error handling
    const titleElement = document.querySelector('.home__title span');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';

        let i = 0;
        let typingTimeout;
        
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                typingTimeout = setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect
        typeWriter();
    }

    // Card hover effects with error handling
    const addHoverEffect = (cards, className) => {
        if (!cards.length) return;
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    };

    addHoverEffect(document.querySelectorAll('.project__card'), 'project__card');
    addHoverEffect(document.querySelectorAll('.blog__card'), 'blog__card');
    addHoverEffect(document.querySelectorAll('.social__card'), 'social__card');

    // Skills animation with Intersection Observer
    const skillItems = document.querySelectorAll('.skills__item');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.3s ease ${index * 0.1}s`;
        skillsObserver.observe(item);
    });

    // Dynamic typing effect with error handling
    const titles = [
        "Cloud and DevOps Developer",
        "Problem Solver"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    let typingTimer;

    function typeEffect() {
        const typingElement = document.querySelector('.home__content p');
        if (!typingElement) return;
        
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingTimer = setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingTimer = setTimeout(typeEffect, 500);
        } else {
            typingTimer = setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
        }
    }

    // Start typing effect
    typeEffect();

    // Cleanup function
    window.addEventListener('beforeunload', () => {
        if (typingTimer) clearTimeout(typingTimer);
        if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
        if (sr) sr.destroy();
        if (skillsObserver) skillsObserver.disconnect();
        if (revealObserver) revealObserver.disconnect();
    });
});

// AI-Powered Content Recommendations
const projects = [
    {
        title: "Automate AWS Infrastructure Using Terraform",
        description: "A project to automate the provisioning and management of AWS infrastructure using Terraform scripts.",
        image: "https://via.placeholder.com/300",
        github: "#"
    },
    {
        title: "Smart S3 Deployment",
        description: "A solution for efficient and automated deployment of static websites to AWS S3 with versioning and security.",
        image: "https://via.placeholder.com/300",
        github: "#"
    },
    {
        title: "Chatbot Using RAG Model",
        description: "Developed a chatbot leveraging the Retrieval-Augmented Generation (RAG) model for intelligent and context-aware responses.",
        image: "https://via.placeholder.com/300",
        github: "#"
    },
    {
        title: "AI-Powered Portfolio",
        description: "A dynamic portfolio website with AI features including content recommendations and interactive elements.",
        image: "https://via.placeholder.com/300",
        github: "#"
    }
];

// Function to recommend projects based on user interaction
function recommendProjects() {
    const projectsGrid = document.querySelector('.projects__grid');
    if (!projectsGrid) return;
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Add recommended projects
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project__card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project__links">
                <a href="${project.github}" class="project__link"><i class='bx bxl-github'></i> GitHub</a>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Call recommendProjects on page load
window.addEventListener('load', recommendProjects);

// Interactive skill cards
document.querySelectorAll('.skills__item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Force dark mode
const style = document.createElement('style');
style.textContent = `
    :root {
        --dark: #0a0a0a;
        --darker: #050505;
        --light: #e0e0e0;
        --lighter: #ffffff;
    }
    
    body {
        background-color: var(--dark);
        color: var(--light);
    }
    
    .header {
        background-color: var(--darker);
    }
    
    .project__card, .blog__card, .social__card {
        background-color: var(--darker);
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// Add CSS for progress bar
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--gradient);
        z-index: 1000;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(progressStyle);

// Update progress bar on scroll
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Add CSS for particles
    const particlesStyle = document.createElement('style');
    particlesStyle.textContent = `
        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            width: 5px;
            height: 5px;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float 15s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particlesStyle);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// Call createParticles on page load
window.addEventListener('load', createParticles);

// Ensure social section is visible and stable
document.addEventListener('DOMContentLoaded', () => {
    const socialSection = document.querySelector('.social');
    if (socialSection) {
        // Remove any conflicting styles
        socialSection.style.removeProperty('display');
        socialSection.style.removeProperty('visibility');
        socialSection.style.removeProperty('opacity');
        
        // Add a class to ensure visibility
        socialSection.classList.add('social-visible');
        
        // Add CSS to ensure social section is always visible
        const socialStyle = document.createElement('style');
        socialStyle.textContent = `
            .social-visible {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 10 !important;
            }
            
            .social__card {
                pointer-events: auto !important;
                cursor: pointer !important;
            }
        `;
        document.head.appendChild(socialStyle);
    }
}); 