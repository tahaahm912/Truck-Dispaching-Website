        // Initialize Lucide icons
        lucide.createIcons();

        // ==================== DARK / LIGHT THEME ====================
        (function() {
            const saved = localStorage.getItem('rmTheme');
            if (saved === 'dark') {
                document.documentElement.classList.add('dark-mode');
                document.getElementById('themeIconSun').classList.remove('hidden');
                document.getElementById('themeIconMoon').classList.add('hidden');
            }
        })();

        function toggleTheme() {
            const html = document.documentElement;
            const sunIcon = document.getElementById('themeIconSun');
            const moonIcon = document.getElementById('themeIconMoon');
            const isDark = html.classList.toggle('dark-mode');
            localStorage.setItem('rmTheme', isDark ? 'dark' : 'light');
            if (isDark) {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }

        // ==================== SPA NAVIGATION ====================
        function navigateTo(page) {
            // Hide all pages
            document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active-page'));
            // Show target page
            const target = document.getElementById('page-' + page);
            if (target) target.classList.add('active-page');

            // Update nav active state
            document.querySelectorAll('[data-nav]').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.nav === page) link.classList.add('active');
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Re-trigger animations for new page
            setTimeout(() => {
                initScrollAnimations();
                if (page === 'home') initCountUp();
            }, 100);
        }

        // ==================== NAVBAR SCROLL BEHAVIOR ====================
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 80) {
                navbar.style.background = 'rgba(7, 17, 29, 0.95)';
                navbar.style.backdropFilter = 'blur(12px)';
                navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });

        // ==================== MOBILE MENU ====================
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMobileMenuBtn = document.getElementById('closeMobileMenu');
        const mobileBackdrop = document.getElementById('mobileBackdrop');

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            mobileBackdrop.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            mobileBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);

        // ==================== SCROLL ANIMATIONS ====================
        function initScrollAnimations() {
            const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            reveals.forEach(el => {
                // Reset for re-observation on page switch
                if (!el.classList.contains('active') || el.closest('.page-section:not(.active-page)')) {
                    el.classList.remove('active');
                }
                observer.observe(el);
            });
        }

        // ==================== COUNT UP ANIMATION ====================
        function initCountUp() {
            const counters = document.querySelectorAll('.count-up');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.dataset.target);
                        animateCounter(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 60;
            const duration = 2000;
            const stepTime = duration / 60;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + (target >= 1000 ? '+' : '+');
            }, stepTime);
        }

        // ==================== TESTIMONIAL SLIDER ====================
        let currentSlide = 0;
        const track = document.getElementById('testimonialTrack');
        const dots = document.getElementById('sliderDots');
        let slidesPerView = 3;

        function updateSlidesPerView() {
            if (window.innerWidth < 768) slidesPerView = 1;
            else if (window.innerWidth < 1024) slidesPerView = 2;
            else slidesPerView = 3;
        }

        function getMaxSlide() {
            const totalSlides = 5;
            return Math.max(0, totalSlides - slidesPerView);
        }

        function updateSlider() {
            updateSlidesPerView();
            const percentage = (currentSlide * 100) / slidesPerView;
            // Use pixel-based transform for more control
            const slideWidth = 100 / slidesPerView;
            track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

            // Update dots
            const totalDots = getMaxSlide() + 1;
            dots.innerHTML = '';
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.className = `w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-accent-500 w-8' : 'bg-navy-200 hover:bg-navy-300'}`;
                dot.onclick = () => goToSlide(i);
                dots.appendChild(dot);
            }
        }

        function slideTestimonials(direction) {
            const maxSlide = getMaxSlide();
            currentSlide = Math.max(0, Math.min(maxSlide, currentSlide + direction));
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        window.addEventListener('resize', () => {
            updateSlider();
        });

        // Auto-advance slider
        let sliderInterval = setInterval(() => {
            if (currentSlide >= getMaxSlide()) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateSlider();
        }, 5000);

        // Pause on hover
        track.parentElement.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        track.parentElement.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                if (currentSlide >= getMaxSlide()) currentSlide = 0;
                else currentSlide++;
                updateSlider();
            }, 5000);
        });

        // ==================== FORM HANDLING ====================
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validatePhone(phone) {
            return phone.replace(/\D/g, '').length >= 7;
        }

        function showFieldError(fieldName) {
            const errorEl = document.querySelector(`[data-error="${fieldName}"]`);
            if (errorEl) errorEl.classList.remove('hidden');
        }

        function hideFieldError(fieldName) {
            const errorEl = document.querySelector(`[data-error="${fieldName}"]`);
            if (errorEl) errorEl.classList.add('hidden');
        }

        function hideAllErrors(form) {
            form.querySelectorAll('[data-error]').forEach(el => el.classList.add('hidden'));
        }

        // Quick Contact Form
        function handleQuickForm(e) {
            e.preventDefault();
            const form = e.target;
            hideAllErrors(form);

            let valid = true;
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            const email = form.email.value.trim();

            if (!name) { showFieldError('name'); valid = false; }
            if (!validatePhone(phone)) { showFieldError('phone'); valid = false; }
            if (!validateEmail(email)) { showFieldError('email'); valid = false; }

            if (valid) {
                showToast('Message Sent!', "We'll contact you within 1 hour to discuss your dispatching needs.", 'success');
                form.reset();
            }
        }

        // Contact Form
        function handleContactForm(e) {
            e.preventDefault();
            const form = e.target;
            hideAllErrors(form);

            let valid = true;
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name) { showFieldError('name'); valid = false; }
            if (!validatePhone(phone)) { showFieldError('phone'); valid = false; }
            if (!validateEmail(email)) { showFieldError('email'); valid = false; }
            if (!message) { showFieldError('message'); valid = false; }

            if (valid) {
                const btn = document.getElementById('contactSubmitBtn');
                btn.innerHTML = '<svg class="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    showToast('Quote Request Sent!', "Our dispatch team will reach out within 1 hour with your personalized quote.", 'success');
                    form.reset();
                    btn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Send Message';
                    btn.disabled = false;
                    lucide.createIcons();
                }, 1500);
            }
        }

        // Driver Registration Form
        function handleDriverForm(e) {
            e.preventDefault();
            const form = e.target;
            hideAllErrors(form);

            let valid = true;
            const fullName = form.fullName.value.trim();
            const phone = form.driverPhone.value.trim();
            const email = form.driverEmail.value.trim();
            const truckType = form.driverTruckType.value;
            const experience = form.experience.value;
            const agreeTerms = form.agreeTerms.checked;

            if (!fullName) { showFieldError('fullName'); valid = false; }
            if (!validatePhone(phone)) { showFieldError('driverPhone'); valid = false; }
            if (!validateEmail(email)) { showFieldError('driverEmail'); valid = false; }
            if (!truckType) { showFieldError('driverTruckType'); valid = false; }
            if (!experience) { showFieldError('experience'); valid = false; }
            if (!agreeTerms) { showFieldError('agreeTerms'); valid = false; }

            if (valid) {
                const btn = document.getElementById('driverSubmitBtn');
                btn.innerHTML = '<svg class="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Submitting...';
                btn.disabled = true;

                setTimeout(() => {
                    form.classList.add('hidden');
                    document.getElementById('driverSuccess').classList.remove('hidden');
                    lucide.createIcons();
                    showToast('Registration Complete!', 'Welcome to RouteMasters Pro family!', 'success');
                }, 2000);
            }
        }

        // ==================== FILE UPLOAD UI ====================
        function handleFileSelect(input) {
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';

            Array.from(input.files).forEach(file => {
                const size = file.size < 1024 * 1024
                    ? (file.size / 1024).toFixed(1) + ' KB'
                    : (file.size / (1024 * 1024)).toFixed(1) + ' MB';

                const item = document.createElement('div');
                item.className = 'flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-navy-200';
                item.innerHTML = `
                    <div class="flex items-center gap-3">
                        <i data-lucide="file" class="w-5 h-5 text-accent-500 flex-shrink-0"></i>
                        <div>
                            <p class="text-sm font-medium text-navy-900 truncate max-w-[200px]">${file.name}</p>
                            <p class="text-xs text-navy-400">${size}</p>
                        </div>
                    </div>
                    <button type="button" onclick="this.parentElement.remove()" class="text-navy-400 hover:text-red-500 transition-colors">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                `;
                fileList.appendChild(item);
            });

            lucide.createIcons();
        }

        // ==================== TOAST NOTIFICATIONS ====================
        let toastTimeout;

        function showToast(title, message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastTitle = document.getElementById('toastTitle');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = document.getElementById('toastIcon');

            toastTitle.textContent = title;
            toastMessage.textContent = message;

            if (type === 'success') {
                toastIcon.className = 'w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0';
                toastIcon.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5 text-green-400"></i>';
            } else if (type === 'error') {
                toastIcon.className = 'w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0';
                toastIcon.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5 text-red-400"></i>';
            }

            lucide.createIcons();
            toast.classList.add('show');

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(hideToast, 5000);
        }

        function hideToast() {
            document.getElementById('toast').classList.remove('show');
        }

        // ==================== INITIALIZATION ====================
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            initCountUp();
            updateSlider();
        });


        // ==================== LEGAL MODAL ====================
        const legalContent = {
            privacy: {
                title: 'Privacy Policy',
                icon: 'shield',
                html: `
                    <p class="text-xs text-navy-400">Last updated: January 1, 2025</p>
                    <p>RouteMasters Pro ("we," "our," or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our dispatch services.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">1. Information We Collect</h3>
                    <p>We may collect personal information you provide directly to us, including:</p>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                        <li>Full name, email address, and phone number</li>
                        <li>CDL number, DOT/MC number, and other carrier credentials</li>
                        <li>Truck type, equipment details, and preferred lanes</li>
                        <li>Payment and billing information</li>
                        <li>Communications and correspondence with our team</li>
                    </ul>
                    <p>We also automatically collect certain technical data such as IP address, browser type, device identifiers, and usage patterns through cookies and analytics tools.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                        <li>Provide, maintain, and improve our dispatch services</li>
                        <li>Communicate with you about loads, updates, and service changes</li>
                        <li>Process payments and send invoices</li>
                        <li>Verify your credentials and compliance with carrier requirements</li>
                        <li>Send promotional communications (you may opt out at any time)</li>
                        <li>Respond to inquiries and support requests</li>
                    </ul>

                    <h3 class="text-base font-bold text-navy-900 mt-4">3. Information Sharing</h3>
                    <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                        <li>Freight brokers and shippers as necessary to execute your loads</li>
                        <li>Service providers who assist us in operating our business</li>
                        <li>Government authorities when required by law</li>
                    </ul>

                    <h3 class="text-base font-bold text-navy-900 mt-4">4. Data Security</h3>
                    <p>We implement industry-standard security measures including SSL encryption, secure server storage, and access controls to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">5. Your Rights</h3>
                    <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at <strong>privacy@routemasterspro.com</strong>.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">6. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. We will notify you of changes by posting the new policy on this page with an updated date.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">7. Contact Us</h3>
                    <p>For privacy-related questions, contact us at <strong>dispatch@routemasterspro.com</strong> or call <strong>(800) 555-1234</strong>.</p>
                `
            },
            terms: {
                title: 'Terms of Service',
                icon: 'file-text',
                html: `
                    <p class="text-xs text-navy-400">Last updated: January 1, 2025</p>
                    <p>These Terms of Service ("Terms") govern your access to and use of RouteMasters Pro's website and dispatch services. By using our services, you agree to these Terms in full.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">1. Eligibility</h3>
                    <p>You must be at least 18 years of age, hold a valid Commercial Driver's License (CDL) or be an authorized fleet operator, and have an active USDOT number to use our services. By registering, you confirm that all information you provide is accurate and current.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">2. Dispatch Services</h3>
                    <p>RouteMasters Pro acts as a third-party dispatch service. We negotiate and book freight loads on your behalf with licensed freight brokers and shippers. We are not a freight broker, carrier, or shipper. You remain solely responsible for the safe and legal transportation of all loads.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">3. Fees and Payment</h3>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                        <li>Dispatch fees are charged as a percentage of the gross load revenue (5%, 4%, or 3% depending on your selected plan).</li>
                        <li>Fees are due upon receipt of payment from the broker/shipper.</li>
                        <li>Late payments may result in suspension of dispatch services.</li>
                        <li>All fees are non-refundable once a load has been successfully booked and accepted.</li>
                    </ul>

                    <h3 class="text-base font-bold text-navy-900 mt-4">4. Carrier Responsibilities</h3>
                    <p>As a carrier, you are responsible for:</p>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                        <li>Maintaining valid operating authority, insurance, and all required permits</li>
                        <li>Complying with all federal, state, and local transportation regulations including FMCSA rules</li>
                        <li>Ensuring your equipment is safe, properly maintained, and road-worthy</li>
                        <li>Honoring all load commitments booked through our service</li>
                        <li>Promptly notifying us of any issues, delays, or accidents</li>
                    </ul>

                    <h3 class="text-base font-bold text-navy-900 mt-4">5. Cancellations</h3>
                    <p>Canceling an accepted load without cause may result in penalties from the broker and/or termination of your account with RouteMasters Pro. We reserve the right to terminate service for repeated cancellations or violations of broker agreements.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">6. Limitation of Liability</h3>
                    <p>RouteMasters Pro shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including lost loads, delayed payments, or cargo claims. Our maximum liability shall not exceed the fees paid to us in the 30 days preceding the claim.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">7. Termination</h3>
                    <p>Either party may terminate services with 7 days written notice. We reserve the right to terminate immediately for violations of these Terms, fraudulent activity, or non-payment.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">8. Governing Law</h3>
                    <p>These Terms shall be governed by the laws of the State of Illinois. Any disputes shall be resolved through binding arbitration in Chicago, IL.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">9. Contact</h3>
                    <p>For questions about these Terms, email us at <strong>legal@routemasterspro.com</strong>.</p>
                `
            },
            disclaimer: {
                title: 'Disclaimer',
                icon: 'alert-triangle',
                html: `
                    <p class="text-xs text-navy-400">Last updated: January 1, 2025</p>

                    <h3 class="text-base font-bold text-navy-900 mt-2">General Disclaimer</h3>
                    <p>The information provided on this website and through RouteMasters Pro's services is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, services, or related materials.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">No Guarantee of Earnings</h3>
                    <p>Any references to revenue increases, earnings improvements, or financial results (such as "20–35% revenue increase") are based on averages reported by our driver community and are not guarantees of future results. Individual results will vary based on factors including load availability, geographic region, equipment type, market conditions, and driver availability.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">Third-Party Services</h3>
                    <p>RouteMasters Pro works with third-party freight brokers, load boards, and shippers. We do not control these third parties and cannot be held responsible for their actions, delays, non-payment, or any other issues arising from their services. Load rates and availability are subject to market fluctuations and are not guaranteed.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">Regulatory Compliance</h3>
                    <p>It is the sole responsibility of the carrier/driver to maintain compliance with all applicable FMCSA regulations, state transportation laws, HOS (Hours of Service) rules, weight limits, and any other applicable legal requirements. RouteMasters Pro does not provide legal, compliance, or regulatory advice.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">Website Availability</h3>
                    <p>We do not guarantee that our website or services will be available at all times, uninterrupted, or error-free. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">External Links</h3>
                    <p>Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>

                    <h3 class="text-base font-bold text-navy-900 mt-4">Contact</h3>
                    <p>If you have questions about this disclaimer, please contact us at <strong>dispatch@routemasterspro.com</strong> or <strong>(800) 555-1234</strong>.</p>
                `
            }
        };

        function openLegalModal(type) {
            const data = legalContent[type];
            if (!data) return;
            document.getElementById('legalModalTitle').textContent = data.title;
            document.getElementById('legalModalBody').innerHTML = data.html;
            const iconEl = document.getElementById('legalModalIcon');
            iconEl.innerHTML = `<i data-lucide="${data.icon}" class="w-5 h-5 text-white"></i>`;
            const modal = document.getElementById('legalModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            lucide.createIcons();
        }

        function closeLegalModal() {
            const modal = document.getElementById('legalModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLegalModal();
            }
        });
