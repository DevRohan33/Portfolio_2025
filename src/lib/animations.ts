
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Function to handle scroll animations
export const handleScrollAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Instead of adding a class that tries to @apply another class,
          // directly add the animation class
          if (entry.target.classList.contains('fade-up-element')) {
            entry.target.classList.add('animate-fade-up');
          } else if (entry.target.classList.contains('fade-down-element')) {
            entry.target.classList.add('animate-fade-down');
          } else if (entry.target.classList.contains('slide-in-left-element')) {
            entry.target.classList.add('animate-slide-in-left');
          } else if (entry.target.classList.contains('slide-in-right-element')) {
            entry.target.classList.add('animate-slide-in-right');
          } else if (entry.target.classList.contains('scale-element')) {
            entry.target.classList.add('animate-scale');
          } else {
            // Default animation
            entry.target.classList.add('animate-fade-up');
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach((el) => observer.observe(el));
};
