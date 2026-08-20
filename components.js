/* ===== SWIMMING POOL & AQUATIC CENTER — SHARED COMPONENTS ===== */
'use strict';

/* ─── THEME & DIRECTION ─────────────────────────────────────────── */
(function initThemeDir() {
    const html = document.documentElement;
    const saved = localStorage.getItem('aqua_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('aqua_dir') === 'rtl') html.setAttribute('dir', 'rtl');
})();

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('aqua_theme', html.classList.contains('dark') ? 'dark' : 'light');
    document.querySelectorAll('[id$="-theme-icon"]').forEach(updateThemeIcon);
}
function updateThemeIcon(el) {
    if (!el) return;
    el.className = document.documentElement.classList.contains('dark')
        ? 'fas fa-sun text-sm text-sky-400'
        : 'fas fa-moon text-sm text-slate-500 dark:text-slate-400';
}
function toggleDir() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('aqua_dir', isRTL ? 'ltr' : 'rtl');
    document.querySelectorAll('[id$="-dir-btn"]').forEach(btn => {
        btn.textContent = isRTL ? 'LTR' : 'RTL';
    });
}

/* ─── NAVBAR INJECTION ─────────────────────────────────────────── */
function injectNav() {
    const el = document.getElementById('main-nav');
    if (!el) return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = [
        { href: 'index.html', label: 'Home' },
        { href: 'home2.html', label: 'Home 2' },
        { href: 'about.html', label: 'About' },
        { href: 'programs.html', label: 'Programs' },
        { href: 'coaches.html', label: 'Coaches' },
        { href: 'facilities.html', label: 'Facilities' },
        { href: 'pricing.html', label: 'Pricing' },
        { href: 'contact.html', label: 'Contact' },
    ];

    const navLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        const activeClass = isActive ? 'text-[#0077B6] dark:text-sky-400 font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:text-[#0077B6] dark:hover:text-sky-400';
        return `<a href="${l.href}" class="${activeClass} font-semibold text-sm transition-colors relative group">
            ${l.label}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0077B6] transition-all group-hover:w-full ${isActive ? 'w-full' : ''}"></span>
        </a>`;
    }).join('');

    el.innerHTML = `
    <nav class="bg-white/95 dark:bg-[#1B2A4A]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-3 shrink-0 logo-bounce" aria-label="AquaElite Swimming Academy Home">
                    <div class="relative w-10 h-10 shrink-0">
                        <img src="assets/images/logo.png" alt="AquaElite Logo" class="w-10 h-10 rounded-xl object-cover shadow-lg" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                        <div style="display:none;" class="w-10 h-10 bg-[#0077B6] rounded-xl items-center justify-center shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M15 55 Q25 45 35 55 Q45 65 55 55 Q65 45 75 55" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
                                <path d="M10 68 Q20 58 30 68 Q40 78 50 68 Q60 58 70 68" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
                                <circle cx="55" cy="35" r="8" fill="white" opacity="0.9"/>
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col leading-none">
                        <span class="font-black text-slate-900 dark:text-white text-base tracking-tight" style="font-family:'Poppins',sans-serif;">AQUA</span>
                        <span class="font-bold text-[#0077B6] dark:text-sky-400 text-[10px] tracking-[0.2em] uppercase">Swimming Academy</span>
                    </div>
                </a>

                <!-- Desktop Nav -->
                <div class="hidden xl:flex items-center gap-5">
                    ${navLinksHTML}
                </div>

                <!-- Right CTAs + Icons -->
                <div class="flex items-center gap-2">
                    <!-- RTL Toggle -->
                    <button id="nav-dir-btn" onclick="toggleDir()" class="hidden xl:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-600 dark:text-slate-400 hover:border-[#0077B6]/50 transition-all" title="Toggle Direction">${document.documentElement.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR'}</button>
                    <!-- Dark Mode -->
                    <button onclick="toggleTheme()" class="hidden xl:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0077B6]/50 transition-all" title="Toggle Theme" aria-label="Toggle dark mode">
                        <i id="nav-theme-icon" class="${document.documentElement.classList.contains('dark') ? 'fas fa-sun text-sm text-sky-400' : 'fas fa-moon text-sm text-slate-500'}"></i>
                    </button>
                    <!-- CTAs -->
                    <a href="login.html" class="hidden xl:inline-flex btn-secondary text-xs px-4 h-9 items-center justify-center">Login</a>
                    <a href="contact.html" class="hidden xl:inline-flex btn-primary text-xs px-4 h-9 items-center justify-center">Enroll Now</a>
                    <!-- Mobile Hamburger -->
                    <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors" aria-label="Open menu">
                        <i class="fas fa-bars text-slate-600 dark:text-slate-300"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Backdrop -->
        <div id="mobile-backdrop" onclick="toggleMobileMenu()" class="hidden xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 top-16"></div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden xl:hidden absolute top-full left-0 right-0 w-full bg-white dark:bg-[#1B2A4A] border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50">
            <div class="px-4 py-5 flex flex-col gap-1 max-w-7xl mx-auto">
                ${links.map(l => {
                    const isActive = page === l.href;
                    return `<a href="${l.href}" class="block px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? 'bg-[#0077B6] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'} transition-colors">${l.label}</a>`;
                }).join('')}
                <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                    <a href="contact.html" class="btn-primary text-xs h-11 flex items-center justify-center text-center w-full">Enroll Now</a>
                    <a href="login.html" class="btn-secondary text-xs h-11 flex items-center justify-center text-center w-full">Login</a>
                </div>
                <div class="flex items-center gap-2 mt-3 justify-center">
                    <button id="mob-dir-btn" onclick="toggleDir()" class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-600 dark:text-slate-400">${document.documentElement.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR'}</button>
                    <button onclick="toggleTheme()" class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <i id="mob-theme-icon" class="${document.documentElement.classList.contains('dark') ? 'fas fa-sun text-sm text-sky-400' : 'fas fa-moon text-sm text-slate-500'}"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>`;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const btnIcon = document.querySelector('#mobile-menu-btn i');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (backdrop) backdrop.classList.remove('hidden');
        if (btnIcon) btnIcon.className = 'fas fa-xmark text-slate-600 dark:text-slate-300';
    } else {
        menu.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
        if (btnIcon) btnIcon.className = 'fas fa-bars text-slate-600 dark:text-slate-300';
    }
}

// Close mobile menu on click outside
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const btn = document.getElementById('mobile-menu-btn');
    if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        menu.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
        const btnIcon = document.querySelector('#mobile-menu-btn i');
        if (btnIcon) btnIcon.className = 'fas fa-bars text-slate-600 dark:text-slate-300';
    }
});

/* ─── FOOTER INJECTION ─────────────────────────────────────────── */
function injectFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="bg-[#0b0c10] text-white pt-16 pb-8 border-t border-white/5" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <!-- Column 1: Brand -->
                <div>
                    <a href="index.html" class="flex items-center gap-3 mb-6" aria-label="AquaElite Home">
                        <div class="relative w-10 h-10 shrink-0">
                            <img src="assets/images/logo.png" alt="AquaElite Logo" class="w-10 h-10 rounded-xl object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                            <div style="display:none;" class="w-10 h-10 bg-[#0077B6] rounded-xl items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M15 55 Q25 45 35 55 Q45 65 55 55 Q65 45 75 55" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
                                    <path d="M10 68 Q20 58 30 68 Q40 78 50 68 Q60 58 70 68" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-col leading-none">
                            <span class="font-black text-white text-base tracking-tight" style="font-family:'Poppins',sans-serif;">AQUA</span>
                            <span class="font-bold text-sky-400 text-[10px] tracking-[0.2em] uppercase">Swimming Academy</span>
                        </div>
                    </a>
                    <p class="text-slate-400 text-sm leading-relaxed mb-6">
                        Premier swimming programs for all ages and skill levels. Certified coaches, Olympic-standard facilities, and a passion for aquatic excellence.
                    </p>
                    <div class="flex items-center gap-3">
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="Facebook"><i class="fab fa-facebook-f text-sm"></i></a>
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><i class="fab fa-instagram text-sm"></i></a>
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="YouTube"><i class="fab fa-youtube text-sm"></i></a>
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="Twitter"><i class="fab fa-x-twitter text-sm"></i></a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div>
                    <h3 class="font-black text-xs uppercase tracking-widest text-white mb-6" style="font-family:'Poppins',sans-serif;">Quick Links</h3>
                    <ul class="space-y-3">
                        <li><a href="index.html" class="text-slate-400 hover:text-white text-sm transition-colors">Home</a></li>
                        <li><a href="home2.html" class="text-slate-400 hover:text-white text-sm transition-colors">Home 2 — Premium</a></li>
                        <li><a href="about.html" class="text-slate-400 hover:text-white text-sm transition-colors">About Academy</a></li>
                        <li><a href="programs.html" class="text-slate-400 hover:text-white text-sm transition-colors">Programs</a></li>
                        <li><a href="coaches.html" class="text-slate-400 hover:text-white text-sm transition-colors">Coaches</a></li>
                        <li><a href="facilities.html" class="text-slate-400 hover:text-white text-sm transition-colors">Facilities</a></li>
                    </ul>
                </div>

                <!-- Column 3: Resources -->
                <div>
                    <h3 class="font-black text-xs uppercase tracking-widest text-white mb-6" style="font-family:'Poppins',sans-serif;">Resources</h3>
                    <ul class="space-y-3">
                        <li><a href="contact.html" class="text-slate-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
                        <li><a href="coming-soon.html" class="text-slate-400 hover:text-white text-sm transition-colors">Coming Soon</a></li>
                        <li><a href="coming-soon.html" class="text-slate-400 hover:text-white text-sm transition-colors">News & Updates</a></li>
                        <li><a href="pricing.html" class="text-slate-400 hover:text-white text-sm transition-colors">Membership Plans</a></li>
                        <li><a href="404.html" class="text-slate-400 hover:text-white text-sm transition-colors">404 Page</a></li>
                        <li><a href="login.html" class="text-slate-400 hover:text-white text-sm transition-colors">Sign In</a></li>
                    </ul>
                </div>

                <!-- Column 4: Stay Updated -->
                <div>
                    <div class="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
                        <h3 class="font-black text-base text-white mb-2" style="font-family:'Poppins',sans-serif;">Stay Updated</h3>
                        <p class="text-slate-400 text-xs leading-relaxed mb-4">
                            Subscribe for training updates, swim meet schedules & exclusive camp announcements.
                        </p>
                        <form onsubmit="event.preventDefault(); alert('Subscribed successfully!'); this.reset();" class="space-y-3">
                            <input type="email" placeholder="your@email.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none text-white placeholder-slate-500" required>
                            <button type="submit" class="w-full bg-[#0077B6] hover:bg-[#005f8a] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-slate-500 text-xs">&copy; ${new Date().getFullYear()} AQUA SWIMMING ACADEMY. ALL RIGHTS RESERVED.</p>
                <div class="flex items-center gap-6 text-slate-500 text-xs">
                    <a href="#" class="hover:text-white transition-colors">PRIVACY</a>
                    <a href="#" class="hover:text-white transition-colors">TERMS</a>
                    <a href="tel:+919876543210" class="hover:text-white transition-colors">+91 98765 43210</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/* ─── BACK TO TOP ─────────────────────────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── SCROLL REVEAL ───────────────────────────────────────────── */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
}

/* ─── COUNTER ANIMATION ───────────────────────────────────────── */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const step = Math.max(1, Math.floor(target / 60));
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current.toLocaleString() + suffix;
                if (current >= target) clearInterval(timer);
            }, 25);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
}

/* ─── ACCORDION ───────────────────────────────────────────────── */
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.acc-icon');
    const isOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content.open').forEach(el => {
        el.classList.remove('open');
        const prevIcon = el.previousElementSibling.querySelector('.acc-icon');
        if (prevIcon) prevIcon.style.transform = 'rotate(0deg)';
    });
    if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

/* ─── SPOTLIGHT EFFECT ────────────────────────────────────────── */
function initSpotlight() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });
}

/* ─── PROGRAM TABS ────────────────────────────────────────────── */
function switchProgramTab(tabId, btn) {
    document.querySelectorAll('.program-tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.program-tab-btn').forEach(b => {
        b.classList.remove('bg-[#0077B6]', 'text-white', 'shadow-lg');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
    });
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.remove('hidden');
    if (btn) {
        btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        btn.classList.add('bg-[#0077B6]', 'text-white', 'shadow-lg');
    }
}

/* ─── CONTACT FORM ────────────────────────────────────────────── */
function submitContactForm(e) {
    e.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    const success = document.getElementById('contact-success');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Sending...'; btn.disabled = true; }
    setTimeout(() => {
        if (btn) btn.style.display = 'none';
        if (success) success.classList.remove('hidden');
        e.target.reset();
    }, 1500);
}

/* ─── AUTH HELPERS ────────────────────────────────────────────── */
function togglePwd(inputId, iconId) {
    const inp = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    if (icon) icon.className = inp.type === 'password' ? 'fas fa-eye text-sm' : 'fas fa-eye-slash text-sm';
}
function submitLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Signing in...'; btn.disabled = true; }
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
}
function submitSignup(e) {
    e.preventDefault();
    const btn = document.getElementById('signup-btn');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Creating Account...'; btn.disabled = true; }
    setTimeout(() => { window.location.href = 'index.html'; }, 1800);
}
function toggleAuthTheme() {
    toggleTheme();
    const icon = document.getElementById('auth-theme-icon');
    if (icon) updateThemeIcon(icon);
}
function toggleAuthDir() {
    toggleDir();
    const btn = document.getElementById('auth-dir-btn');
    if (btn) btn.textContent = document.documentElement.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR';
}

/* ─── STICKY NAV SCROLL STATE ─────────────────────────────────── */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ─── NOTIFY FORM (Coming Soon) ──────────────────────────────── */
function submitNotify(e) {
    e.preventDefault();
    const success = document.getElementById('notify-success');
    const input = document.getElementById('notify-email');
    if (success) success.classList.remove('hidden');
    if (input) input.value = '';
}

/* ─── HOME 2 TESTIMONIALS SLIDER & FILTER CONTROLLER ───────────── */
function initHome2Testimonials() {
    const section = document.getElementById('home2-testimonials');
    if (!section) return;

    const track = document.getElementById('testimonial-track');
    if (!track) return;

    const filterBtns = section.querySelectorAll('.testimonial-filter-btn');
    const allSlides = Array.from(track.querySelectorAll('.testimonial-slide-item'));
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');
    const dotsContainer = document.getElementById('testimonial-dots');

    let currentCategory = 'all';
    let visibleSlides = [...allSlides];
    let currentIndex = 0;
    let autoPlayTimer = null;

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        if (visibleSlides.length <= 1) return;

        visibleSlides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `testimonial-dot ${idx === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    function updateTrack() {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const offset = currentIndex * 100;
        track.style.transform = `translateX(${isRTL ? offset : -offset}%)`;

        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((d, idx) => {
                d.classList.toggle('active', idx === currentIndex);
            });
        }
    }

    function goToSlide(index) {
        if (visibleSlides.length === 0) return;
        if (index < 0) {
            currentIndex = visibleSlides.length - 1;
        } else if (index >= visibleSlides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateTrack();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function filterCategory(category) {
        currentCategory = category;
        currentIndex = 0;

        filterBtns.forEach(btn => {
            const isMatch = btn.dataset.category === category;
            btn.classList.toggle('active', isMatch);
        });

        allSlides.forEach(slide => {
            const slideCat = slide.dataset.category;
            const matches = category === 'all' || slideCat === category;
            slide.style.display = matches ? 'block' : 'none';
        });

        visibleSlides = allSlides.filter(slide => slide.style.display !== 'none');
        renderDots();
        updateTrack();
    }

    // Filter button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterCategory(btn.dataset.category || 'all');
        });
    });

    // Arrow navigation
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto Play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, 5500);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    section.addEventListener('mouseenter', stopAutoPlay);
    section.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 40;
        const diff = touchEndX - touchStartX;
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        if (Math.abs(diff) > threshold) {
            if (diff < 0) {
                isRTL ? prevSlide() : nextSlide();
            } else {
                isRTL ? nextSlide() : prevSlide();
            }
        }
    }

    // Initial setup
    filterCategory('all');
    startAutoPlay();
}

/* ─── HOME 2: BATCH & LANE MATCHER ────────────────────────────── */
function initBatchMatcher() {
    const container = document.getElementById('batch-matcher');
    if (!container) return;

    let selectedLevel = 'adult-beginner';
    let selectedSlot = 'morning';

    const levelBtns = container.querySelectorAll('[data-matcher-level]');
    const slotBtns = container.querySelectorAll('[data-matcher-slot]');

    const batchNameEl = document.getElementById('matcher-batch-name');
    const batchCoachEl = document.getElementById('matcher-batch-coach');
    const batchLaneEl = document.getElementById('matcher-batch-lane');
    const batchTimeEl = document.getElementById('matcher-batch-time');
    const batchRatioEl = document.getElementById('matcher-batch-ratio');
    const batchCtaEl = document.getElementById('matcher-cta-btn');

    const matcherData = {
        'adult-beginner': {
            morning: { name: 'Dawn Hydro-Confidence Squad', coach: 'Coach Rajesh Kumar', lane: 'Lane 1-2 (Shallow Basin)', time: '06:30 AM - 07:30 AM', ratio: '1:4 Max' },
            afternoon: { name: 'Midday Adult Foundation Batch', coach: 'Coach Priya Sharma', lane: 'Lane 2 (Hydrotherapy Warm Pool)', time: '01:00 PM - 02:00 PM', ratio: '1:4 Max' },
            evening: { name: 'Executive Sunset Stroke Lab', coach: 'Coach Rajesh Kumar', lane: 'Lane 3 (Olympic Heated)', time: '07:00 PM - 08:00 PM', ratio: '1:5 Max' }
        },
        'kids': {
            morning: { name: 'Weekend Little Splashers Academy', coach: 'Coach Priya Sharma', lane: 'Learner Beach Entry Basin', time: '08:00 AM - 09:00 AM', ratio: '1:3 Max' },
            afternoon: { name: 'Junior Dolphin Skill Builders', coach: 'Coach Priya Sharma', lane: 'Learner Pool (30°C Warm)', time: '04:00 PM - 05:00 PM', ratio: '1:4 Max' },
            evening: { name: 'Twilight Young Cadets', coach: 'Coach Priya Sharma', lane: 'Learner Pool (30°C Warm)', time: '05:30 PM - 06:30 PM', ratio: '1:4 Max' }
        },
        'competitive': {
            morning: { name: 'Apex Elite Dawn Sprint Squad', coach: 'Head Coach Rajesh Kumar', lane: 'Lanes 4-6 (Olympic 50M Full Length)', time: '05:30 AM - 07:30 AM', ratio: '1:6 Max' },
            afternoon: { name: 'High-Performance Video & Stroke Clinic', coach: 'Head Coach Rajesh Kumar', lane: 'Lanes 5-8 (Omega Touchpad Ready)', time: '03:30 PM - 05:30 PM', ratio: '1:6 Max' },
            evening: { name: 'Championship Endurance & Race Prep', coach: 'Head Coach Rajesh Kumar', lane: 'Lanes 4-7 (Olympic 50M Pace Clock)', time: '06:00 PM - 08:00 PM', ratio: '1:6 Max' }
        },
        'fitness': {
            morning: { name: 'Morning Master Lap Conditioning', coach: 'Coach Arjun Nair', lane: 'Lanes 7-8 (Deep Basin)', time: '07:00 AM - 08:00 AM', ratio: '1:8 Max' },
            afternoon: { name: 'Hydro-Aerobics & Joint Decompression', coach: 'Coach Arjun Nair', lane: 'Hydrotherapy Therapy Basin', time: '11:30 AM - 12:30 PM', ratio: '1:10 Max' },
            evening: { name: 'Sunset Cardio Aqua-Burn', coach: 'Coach Arjun Nair', lane: 'Therapy & Multi-Lane Basin', time: '06:30 PM - 07:30 PM', ratio: '1:8 Max' }
        }
    };

    function updateMatcherResult() {
        const data = matcherData[selectedLevel]?.[selectedSlot] || matcherData['adult-beginner']['morning'];
        if (batchNameEl) batchNameEl.textContent = data.name;
        if (batchCoachEl) batchCoachEl.textContent = data.coach;
        if (batchLaneEl) batchLaneEl.textContent = data.lane;
        if (batchTimeEl) batchTimeEl.textContent = data.time;
        if (batchRatioEl) batchRatioEl.textContent = data.ratio;
        if (batchCtaEl) batchCtaEl.href = `contact.html?program=${encodeURIComponent(data.name)}&time=${encodeURIComponent(data.time)}`;
    }

    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            levelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedLevel = btn.dataset.matcherLevel;
            updateMatcherResult();
        });
    });

    slotBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            slotBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSlot = btn.dataset.matcherSlot;
            updateMatcherResult();
        });
    });

    updateMatcherResult();
}

/* ─── HOME 2: BASIN & FACILITY EXPLORER ───────────────────────── */
function initBasinExplorer() {
    const container = document.getElementById('basin-explorer');
    if (!container) return;

    const tabBtns = container.querySelectorAll('.basin-tab-btn');
    const basinPanels = container.querySelectorAll('.basin-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.basinTarget;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            basinPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.remove('hidden');
                    panel.classList.add('animate-fade-in');
                } else {
                    panel.classList.add('hidden');
                    panel.classList.remove('animate-fade-in');
                }
            });
        });
    });
}

/* ─── HOME 2: PRICING ANNUAL/MONTHLY SWITCHER ─────────────────── */
function initPricingToggle() {
    const track = document.getElementById('pricing-toggle-track');
    if (!track) return;

    let isAnnual = false;
    const priceBasic = document.getElementById('price-val-basic');
    const pricePro = document.getElementById('price-val-pro');
    const priceElite = document.getElementById('price-val-elite');
    const labelPeriod = document.querySelectorAll('.price-period-label');
    const saveBadges = document.querySelectorAll('.annual-save-badge');

    function updatePrices() {
        if (isAnnual) {
            track.classList.add('active');
            if (priceBasic) priceBasic.textContent = '₹2,399';
            if (pricePro) pricePro.textContent = '₹4,799';
            if (priceElite) priceElite.textContent = '₹7,999';
            labelPeriod.forEach(l => l.textContent = '/month (billed yearly)');
            saveBadges.forEach(b => b.classList.remove('opacity-0'));
        } else {
            track.classList.remove('active');
            if (priceBasic) priceBasic.textContent = '₹2,999';
            if (pricePro) pricePro.textContent = '₹5,999';
            if (priceElite) priceElite.textContent = '₹9,999';
            labelPeriod.forEach(l => l.textContent = '/month');
            saveBadges.forEach(b => b.classList.add('opacity-0'));
        }
    }

    track.addEventListener('click', () => {
        isAnnual = !isAnnual;
        updatePrices();
    });
}

/* ─── HOME 2: VIRTUAL POOL TOUR MODAL ─────────────────────────── */
function initVirtualTourModal() {
    const openBtns = document.querySelectorAll('[data-open-tour-modal]');
    const modal = document.getElementById('virtual-tour-modal');
    const closeBtn = document.getElementById('close-tour-modal-btn');
    if (!modal) return;

    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
}

/* ─── HOME 2: DISCIPLINE TABS ─────────────────────────────────── */
function initDisciplineTabs() {
    const tabBtns = document.querySelectorAll('.discipline-pill-btn');
    const cards = document.querySelectorAll('.discipline-card-item');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.discipline;

            cards.forEach(card => {
                const cardCat = card.dataset.disciplineCat;
                if (target === 'all' || cardCat === target) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-fade-in');
                }
            });
        });
    });
}

/* ─── HOME 2: AUTOMATIC 3-SLIDE HERO CAROUSEL ────────────────── */
function initHeroAutoSlider() {
    const slides = document.querySelectorAll('.hero-slide-item');
    const dots = document.querySelectorAll('.hero-slider-dot');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const heroSection = document.getElementById('home2-hero-section');
    if (!slides.length) return;

    let currentIndex = 0;
    let autoTimer = null;
    const intervalTime = 5000;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.remove('hidden');
                slide.classList.add('animate-fade-in');
            } else {
                slide.classList.add('hidden');
                slide.classList.remove('animate-fade-in');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startAutoPlay();
        });
    });

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });

    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoPlay);
        heroSection.addEventListener('mouseleave', startAutoPlay);
    }

    showSlide(0);
    startAutoPlay();
}

/* ─── HOME 2: QUICK BOOKING CAPSULE ───────────────────────────── */
function initBookingCapsule() {
    const form = document.getElementById('hero-booking-capsule-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const goal = document.getElementById('capsule-goal')?.value || 'General';
        const age = document.getElementById('capsule-age')?.value || 'Adult';
        window.location.href = `contact.html?goal=${encodeURIComponent(goal)}&age=${encodeURIComponent(age)}`;
    });
}

/* ─── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    injectNav();
    injectFooter();
    initNavbarScroll();
    initBackToTop();
    initScrollReveal();
    initCounters();
    initSpotlight();
    initHome2Testimonials();
    initBatchMatcher();
    initBasinExplorer();
    initPricingToggle();
    initVirtualTourModal();
    initDisciplineTabs();
    initHeroAutoSlider();
    initBookingCapsule();
});



