
// ===== DynamicCarousel Class (Bootstrap 5) =====
class DynamicCarousel {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      data: [],
      defaultPosition: 'center',
      autoPlay: true,
      interval: 5000,
      indicators: true
    }, options);
    this.carousel = null;
    this.init();
  }
  init() {
    this.renderCarousel();
    this.attachEventListeners();
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
  }
  renderCarousel() {
    this.container.innerHTML = `
      <div id="mainCarousel" class="carousel slide" data-bs-ride="${this.options.autoPlay ? 'carousel' : 'false'}">
        ${this.options.indicators ? this.renderIndicators() : ''}
        <div class="carousel-inner">
          ${this.renderCarouselItems()}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
    // Ensure the container has the correct class
    this.container.classList.add('carousel-container');
    this.carousel = new bootstrap.Carousel(this.container.querySelector('#mainCarousel'), {
      interval: this.options.interval
    });
  }
  renderIndicators() {
    if (this.options.data.length <= 0) return '';
    let indicators = '<div class="carousel-indicators">';
    this.options.data.forEach((_, index) => {
      indicators += `<button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="${index}" 
        ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>`;
    });
    indicators += '</div>';
    return indicators;
  }
  renderCarouselItems() {
    if (this.options.data.length <= 0) {
      return '<div class="carousel-item active"><div class="d-flex align-items-center justify-content-center h-100">No slides available</div></div>';
    }
    return this.options.data.map((slide, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${slide.image}" alt="${slide.title}">
        <div class="carousel-caption caption-${slide.position || this.options.defaultPosition}">
          ${slide.title ? `<h3>${slide.title}</h3>` : ''}
          ${slide.subtitle ? `<h4>${slide.subtitle}</h4>` : ''}
          ${slide.description ? `<p>${slide.description}</p>` : ''}
          ${slide.button ? `<a href="${slide.button.link}" class="btn btn-primary mt-2">${slide.button.text}</a>` : ''}
        </div>
      </div>
    `).join('');
  }
  attachEventListeners() {
    // Custom event listeners if needed
  }
  startAutoPlay() {
    if (this.carousel) {
      this.carousel.cycle();
    }
  }
  stopAutoPlay() {
    if (this.carousel) {
      this.carousel.pause();
    }
  }
  next() {
    if (this.carousel) {
      this.carousel.next();
    }
  }
  prev() {
    if (this.carousel) {
      this.carousel.prev();
    }
  }
  goTo(index) {
    if (this.carousel) {
      this.carousel.to(index);
    }
  }
  updateData(newData) {
    this.options.data = newData;
    this.renderCarousel();
  }
  addSlide(slideData) {
    this.options.data.push(slideData);
    this.renderCarousel();
  }
  removeSlide(index) {
    if (index >= 0 && index < this.options.data.length) {
      this.options.data.splice(index, 1);
      this.renderCarousel();
    }
  }
  changeCaptionPosition(position) {
    const captions = this.container.querySelectorAll('.carousel-caption');
    captions.forEach(caption => {
      caption.classList.remove('caption-top-left', 'caption-top-right', 'caption-bottom-left', 'caption-bottom-right', 'caption-center', 'caption-custom');
      caption.classList.add(`caption-${position}`);
    });
  }
  destroy() {
    if (this.carousel) {
      this.carousel.dispose();
      this.container.innerHTML = '';
    }
  }
}

// ===== Initialize the carousel with real homepage data =====
document.addEventListener('DOMContentLoaded', function() {
  const carouselData = [
    {
      image: "img/carousel-1.jpg",
      title: "Welcome to Main Street School",
      subtitle: "Nurturing Excellence, Building Character",
      description: "Where every child's unique potential is discovered and developed through personalized learning experiences.",
      position: "top-left",
      button: { text: "Enroll Now", link: "contact.html#new-students" }
    },
    {
      image: "img/carousel-2.jpg",
      title: "Individualized Learning",
      subtitle: "Every Child is Unique",
      description: "Our personalized curriculum adapts to each student's learning style, pace, and interests.",
      position: "top-left",
      button: { text: "Enroll Now", link: "contact.html#new-students" }
    },
    {
      image: "img/carousel-3.jpg",
      title: "Whole Child Development",
      subtitle: "Academic Excellence & Character Building",
      description: "We focus on developing not just academic skills, but also social, emotional, and character development.",
      position: "top-left",
      button: { text: "Enroll Now", link: "contact.html#new-students" }
    },
    {
      image: "img/carousel-4.webp",
      title: "Project-Based Learning",
      subtitle: "Hands-On Education",
      description: "Students learn through engaging, real-world projects that make education meaningful and memorable.",
      position: "top-left",
      button: { text: "Enroll Now", link: "contact.html#new-students" }
    },
    {
      image: "img/carousel-6.webp",
      title: "Preschool to 12th Grade",
      subtitle: "Complete Educational Journey",
      description: "From early childhood through high school graduation, we provide a continuous, supportive learning environment.",
      position: "top-left",
      button: { text: "Enroll Now", link: "contact.html#new-students" }
    }
  ];
  new DynamicCarousel('carousel-container', {
    data: carouselData,
    defaultPosition: 'top-left',
    autoPlay: true,
    interval: 5000,
    indicators: true
  });
});
