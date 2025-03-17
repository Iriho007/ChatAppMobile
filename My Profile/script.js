document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s';
        });
        tag.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
});