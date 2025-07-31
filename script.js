document.addEventListener('DOMContentLoaded', function() {
           
            document.getElementById('year').textContent = new Date().getFullYear();

           
            function createParticles() {
                const particlesContainer = document.querySelector('.particles');
                const particleCount = 50;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    const size = Math.random() * 5 + 1;
                    const posX = Math.random() * window.innerWidth;
                    const duration = Math.random() * 10 + 5;
                    const delay = Math.random() * 5;
                    
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}px`;
                    particle.style.bottom = `-${size}px`;
                    particle.style.animationDuration = `${duration}s`;
                    particle.style.animationDelay = `${delay}s`;
                    
                   
                    const opacity = Math.random() * 0.5 + 0.1;
                    particle.style.opacity = opacity;
                   
                    const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0', '#4895ef'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.background = randomColor;
                    
                    particlesContainer.appendChild(particle);
                }
            }
            
            createParticles();

          
            const navToggle = document.getElementById('navToggle');
            const navList = document.getElementById('navList');
            
            navToggle.addEventListener('click', function() {
                navList.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-times');
                this.querySelector('i').classList.toggle('fa-bars');
            });
         
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (navList.classList.contains('active')) {
                        navList.classList.remove('active');
                        navToggle.querySelector('i').classList.remove('fa-times');
                        navToggle.querySelector('i').classList.add('fa-bars');
                    }
                    
                 
                    navLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                });
            });

          
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });

            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

         
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });

         
            const themeBtn = document.getElementById('themeBtn');
            const themeOptions = document.getElementById('themeOptions');
            const themeOptionBtns = document.querySelectorAll('.theme-option');
            
            themeBtn.addEventListener('click', function() {
                themeOptions.classList.toggle('active');
               
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                this.textContent = currentTheme === 'light' ? '☀️' : 
                                 currentTheme === 'dark' ? '🌙' : '🌈';
            });
            
            themeOptionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const theme = this.getAttribute('data-theme');
                    document.documentElement.setAttribute('data-theme', theme);
                    themeOptions.classList.remove('active');
                    
                  
                    localStorage.setItem('portfolio-theme', theme);
                    
      
                    themeBtn.textContent = this.textContent.trim();
                });
            });
            
         
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
            }
            
            const skillTracks = document.querySelectorAll('.skills-track');
            skillTracks.forEach(track => {
                const items = track.innerHTML;
                track.innerHTML = items + items; 
            });

         
            const contactForm = document.getElementById('contactForm');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const formSuccess = document.querySelector('.form-success');

            function validateName() {
                const nameValue = nameInput.value.trim();
                const nameGroup = nameInput.closest('.form-group');
                
                if (nameValue === '') {
                    nameGroup.classList.add('error');
                    nameGroup.classList.remove('success');
                    return false;
                } else {
                    nameGroup.classList.remove('error');
                    nameGroup.classList.add('success');
                    return true;
                }
            }

            function validateEmail() {
                const emailValue = emailInput.value.trim();
                const emailGroup = emailInput.closest('.form-group');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailValue === '' || !emailRegex.test(emailValue)) {
                    emailGroup.classList.add('error');
                    emailGroup.classList.remove('success');
                    return false;
                } else {
                    emailGroup.classList.remove('error');
                    emailGroup.classList.add('success');
                    return true;
                }
            }

            function validateMessage() {
                const messageValue = messageInput.value.trim();
                const messageGroup = messageInput.closest('.form-group');
                
                if (messageValue === '') {
                    messageGroup.classList.add('error');
                    messageGroup.classList.remove('success');
                    return false;
                } else {
                    messageGroup.classList.remove('error');
                    messageGroup.classList.add('success');
                    return true;
                }
            }

           
            nameInput.addEventListener('input', validateName);
            emailInput.addEventListener('input', validateEmail);
            messageInput.addEventListener('input', validateMessage);

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isNameValid = validateName();
                const isEmailValid = validateEmail();
                const isMessageValid = validateMessage();
                
                if (isNameValid && isEmailValid && isMessageValid) {
                   
                    setTimeout(() => {
                        contactForm.reset();
                        formSuccess.classList.add('active');
                        
                        document.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('success');
                        });
                   
                        setTimeout(() => {
                            formSuccess.classList.remove('active');
                        }, 5000);
                    }, 1000);
                }
            });
        });