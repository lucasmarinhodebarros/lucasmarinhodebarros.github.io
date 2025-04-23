// script3d.js - 3D Scroll Effect

// Wait until DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-list a');
    const maxAngle = 25; // Maximum rotation angle (degrees)
  
    function updateCards() {
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;
  
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = centerY - cardCenterY;
  
        // Calculate rotation angle proportional to distance from center
        const rotateX = (distanceFromCenter / centerY) * maxAngle;
        card.style.transform = `rotateX(${rotateX}deg)`;
  
        // Toggle title visibility when in view
        if (rect.top < viewportHeight && rect.bottom > 0) {
          card.classList.add('in-view');
        } else {
          card.classList.remove('in-view');
        }
      });
    }
  
    // Initial update
    updateCards();
  
    // Update on scroll and resize for responsiveness
    window.addEventListener('scroll', updateCards, { passive: true });
    window.addEventListener('resize', updateCards);
  });
  