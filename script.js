// Smooth scroll for navigation links
document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.querySelector(href).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Post card hover effect
document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        const title = post.querySelector('h4').textContent.toLowerCase();
        const content = post.querySelector('p:not(.meta)').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

// Category filtering (works with search input)
const categoryButtons = document.querySelectorAll('.cat-btn');
let activeCategory = 'all';

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter');
        filterPosts();
    });
});

// Enhanced search + category filter combined
searchInput.addEventListener('input', () => filterPosts());

function filterPosts(){
    const term = searchInput.value.trim().toLowerCase();
    const posts = document.querySelectorAll('.post-card');

    posts.forEach(post => {
        const title = post.querySelector('h4').textContent.toLowerCase();
        const excerptEl = post.querySelector('p:not(.meta)');
        const excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
        const cat = post.getAttribute('data-category') || '';

        const matchesSearch = !term || title.includes(term) || excerpt.includes(term);
        const matchesCategory = activeCategory === 'all' || cat === activeCategory;

        if (matchesSearch && matchesCategory) {
            post.style.display = 'flex';
            post.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
        } else {
            post.style.display = 'none';
        }
    });
}

// Subscribe form handling (unchanged)
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            alert(`Thanks for subscribing, ${name}! We'll send updates to ${email}`);
            subscribeForm.reset();
        }
    });
}