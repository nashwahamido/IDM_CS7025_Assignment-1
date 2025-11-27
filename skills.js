// Skills Page JavaScript

// Interactive Particle Background Script
(function() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system (Space Effect)
    const particles = [];
    const particleCount = 150;
    const mouse = { x: null, y: null, radius: 100 };
    
    // Track mouse position
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.size = Math.random() * 1.5 + 0.5;
        }
        
        update() {
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force * 0.2;
                    this.vy -= Math.sin(angle) * force * 0.2;
                }
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.vx *= 0.98;
            this.vy *= 0.98;
            
            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -1;
                this.x = Math.max(0, Math.min(canvas.width, this.x));
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy *= -1;
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }
        }
        
        draw() {
            ctx.fillStyle = 'rgba(253, 205, 0, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    const opacity = (1 - distance / 80) * 0.15;
                    ctx.strokeStyle = `rgba(234, 125, 109, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();

// Dark/Light Mode Toggle Script
(function() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeCheckbox.checked = true;
    }
    
    themeCheckbox.addEventListener('change', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
})();

// Progress Bar Animation Script
(function() {
    // Animate progress bars on page load
    window.addEventListener('load', function() {
        const progressBars = document.querySelectorAll('.progress-bar-fill');
        
        // Reset all progress bars to 0 width
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.setAttribute('data-target-width', targetWidth);
            bar.style.width = '0%';
        });
        
        // Animate progress bars after a short delay
        setTimeout(() => {
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-target-width');
                bar.style.width = targetWidth;
            });
        }, 300);
    });
})();
