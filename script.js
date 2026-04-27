// ====================================
// AI TECH HUB - JAVASCRIPT FUNCTIONALITY
// ==================================== 

// AI Tools Data
const aiTools = [
    { id: 1, name: 'TensorFlow', category: 'dl', description: 'Open-source machine learning framework for neural networks', icon: '🧠' },
    { id: 2, name: 'PyTorch', category: 'dl', description: 'Deep learning framework with dynamic computation graphs', icon: '🔥' },
    { id: 3, name: 'NLTK', category: 'nlp', description: 'Natural Language Toolkit for text processing', icon: '💬' },
    { id: 4, name: 'Scikit-learn', category: 'ml', description: 'Machine learning library for data analysis and modeling', icon: '📊' },
    { id: 5, name: 'OpenCV', category: 'cv', description: 'Computer vision library for image and video processing', icon: '📸' },
    { id: 6, name: 'Keras', category: 'dl', description: 'High-level neural networks API built on TensorFlow', icon: '🎯' },
    { id: 7, name: 'Hugging Face', category: 'nlp', description: 'Platform for NLP models and transformers', icon: '🤗' },
    { id: 8, name: 'Apache Spark', category: 'ml', description: 'Distributed data processing framework', icon: '⚡' },
    { id: 9, name: 'YOLO', category: 'cv', description: 'Real-time object detection system', icon: '🎯' },
];

// Blog Posts Data
const blogPosts = [
    { id: 1, title: 'Getting Started with Machine Learning', date: 'April 20, 2026', excerpt: 'Learn the fundamentals of ML and how to build your first model.', icon: '🤖' },
    { id: 2, title: 'The Future of AI in 2026', date: 'April 18, 2026', excerpt: 'Exploring emerging AI trends and technologies shaping the future.', icon: '🚀' },
    { id: 3, title: 'Deep Learning Best Practices', date: 'April 15, 2026', excerpt: 'Essential tips and tricks for training deep neural networks effectively.', icon: '🧠' },
];

// ====================================
// DOM Elements
// ====================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const loginBtn = document.getElementById('loginBtn');
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toSignup = document.getElementById('toSignup');
const toLogin = document.getElementById('toLogin');
const ctaBtn = document.getElementById('ctaBtn');
const toolsGrid = document.getElementById('toolsGrid');
const blogGrid = document.getElementById('blogGrid');
const toolsSearchInput = document.getElementById('toolsSearchInput');
const toolsCategory = document.getElementById('toolsCategory');
const contactForm = document.getElementById('contactForm');

// ====================================
// Initialize on Page Load
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    loadThemePreference();
    renderTools();
    renderBlog();
    setupEventListeners();
});

// ====================================
// Theme Toggle (Dark Mode)
// ====================================

function loadThemePreference() {
    // Check if user has saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    } else {
        // Use system preference if available
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
    }
}

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    
    // Save user preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ====================================
// Hamburger Menu Toggle
// ====================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====================================
// Login/Signup Modal
// ====================================

// Open login/signup modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.classList.add('active');
});

// Close modal
closeModal.addEventListener('click', () => {
    authModal.classList.remove('active');
});

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Toggle between login and signup forms
toSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// ====================================
// Render AI Tools
// ====================================

function renderTools(filter = 'all', searchTerm = '') {
    toolsGrid.innerHTML = '';
    
    const filteredTools = aiTools.filter(tool => {
        const matchesCategory = filter === 'all' || tool.category === filter;
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredTools.length === 0) {
        toolsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No tools found. Try a different search.</p>';
        return;
    }

    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="#" class="tool-link">Learn More →</a>
        `;
        toolsGrid.appendChild(toolCard);
    });
}

// ====================================
// Render Blog Posts
// ====================================

function renderBlog() {
    blogGrid.innerHTML = '';
    
    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-image">${post.icon}</div>
            <div class="blog-content">
                <div class="blog-date">${post.date}</div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

// ====================================
// Search and Filter Tools
// ====================================

toolsSearchInput.addEventListener('input', () => {
    const searchTerm = toolsSearchInput.value;
    const category = toolsCategory.value;
    renderTools(category, searchTerm);
});

toolsCategory.addEventListener('change', () => {
    const searchTerm = toolsSearchInput.value;
    const category = toolsCategory.value;
    renderTools(category, searchTerm);
});

// ====================================
// Global Search (from hero section)
// ====================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.trim()) {
        // Scroll to tools section
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
        // Update tools search
        toolsSearchInput.value = searchTerm;
        renderTools('all', searchTerm);
    }
});

// Allow Enter key to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// ====================================
// CTA Button
// ====================================

ctaBtn.addEventListener('click', () => {
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
});

// ====================================
// Contact Form Handling
// ====================================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    // Validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message (Frontend only)
    alert(`Thank you ${name}! Your message has been received. We'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// ====================================
// Login Form Submission
// ====================================

document.querySelectorAll('.auth-form form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get the form inputs
        const inputs = form.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
        
        // Check if all inputs are filled
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
        });
        
        if (!allFilled) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message (Frontend only)
        const formType = form.parentElement.id === 'loginForm' ? 'logged in' : 'signed up';
        alert(`Success! You have been ${formType} successfully.`);
        
        // Close modal
        authModal.classList.remove('active');
        
        // Reset form
        form.reset();
    });
});

// ====================================
// Setup Event Listeners
// ====================================

function setupEventListeners() {
    // Add hover effects to learning cards
    const learnBtns = document.querySelectorAll('.learn-btn');
    learnBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('You will be redirected to the learning material.');
        });
    });
    
    // Add click effects to tool cards
    const toolLinks = document.querySelectorAll('.tool-link');
    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('You will be redirected to the tool website.');
        });
    });
    
    // Add click effects to blog cards
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('You will be redirected to the full blog post.');
        });
    });
}

// ====================================
// Smooth Scrolling for Anchor Links
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a modal or form toggle
        if (href === '#' || this.classList.contains('auth-toggle')) {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// Scroll Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all tool cards, blog cards, and learning cards
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.tool-card, .blog-card, .learning-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
});

// ====================================
// Mobile Responsiveness
// ====================================

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ====================================
// Console Message
// ====================================

console.log('%cWelcome to AI Tech Hub! 🚀', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #ec4899; font-size: 12px;');