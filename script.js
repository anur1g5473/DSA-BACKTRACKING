// ══════════════════════════════════════════════════
// BACKTRACKING DSA ROLEPLAY - JAVASCRIPT
// ══════════════════════════════════════════════════

(function() {
    'use strict';

    // ── DOM ELEMENTS ──
    const tabs = document.querySelectorAll('.tab');
    const scenes = document.querySelectorAll('.scene');
    const fab = document.querySelector('.fab');
    const teamCards = document.querySelectorAll('.tc');

    // ── INTERSECTION OBSERVER FOR ANIMATIONS ──
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add slight delay for stagger effect
                setTimeout(() => {
                    entry.target.classList.add('vis');
                }, 60);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ── INITIALIZE OBSERVERS FOR SCENE 1 ──
    function initializeSceneObservers(sceneId) {
        const scene = document.getElementById(sceneId);
        if (!scene) return;

        const animatedElements = scene.querySelectorAll(
            '.cb, .stage, .divider, .success, .board-wrap'
        );

        animatedElements.forEach(el => {
            el.classList.remove('vis');
            observer.observe(el);
        });
    }

    // Initialize first scene
    initializeSceneObservers('s1');

    // ── TAB SWITCHING ──
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            scenes.forEach(s => s.classList.remove('active'));

            tab.classList.add('active');
            const targetScene = document.getElementById(tab.dataset.s);
            
            if (targetScene) {
                targetScene.classList.add('active');
                
                // Reset and re-observe animated elements in new scene
                initializeSceneObservers(tab.dataset.s);

                // Scroll to tabs
                document.querySelector('.tabs').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── FLOATING ACTION BUTTON (Scroll to Top) ──
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                fab.classList.toggle('show', window.scrollY > 600);
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ── TEAM CARD TOUCH EFFECTS ──
    teamCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.boxShadow = '0 0 30px rgba(168, 85, 247, .15)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.boxShadow = 'none';
            }, 300);
        }, { passive: true });
    });

    // ── KEYBOARD NAVIGATION FOR TABS ──
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            let targetIndex;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetIndex = (index + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
                return;
            }

            if (targetIndex !== undefined) {
                tabs[targetIndex].focus();
            }
        });
    });

    // ── PREFERS REDUCED MOTION ──
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--animation-duration', '0s');
            
            // Make all animated elements visible immediately
            document.querySelectorAll('.cb, .stage, .divider, .success, .board-wrap').forEach(el => {
                el.classList.add('vis');
            });
        }
    }

    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    // ── CONSOLE MESSAGE ──
    console.log(
        '%c🎭 Backtracking DSA Roleplay',
        'color: #a855f7; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cPresented by: Anurag Soni, Sanskruti, Swathya, Sreshta & Alok',
        'color: #71717a; font-size: 12px;'
    );

})();