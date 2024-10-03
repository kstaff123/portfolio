document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const textItems = document.querySelectorAll('.text-list ul li');
  
    let positions = [7, 5, 3];
    let isCooldown = false;
  
    function updateCarousel() {
      carouselItems.forEach((item, index) => {
        item.setAttribute('data-index', positions[index]);
        updatePosition(item, positions[index]);
      });
  
      updateHighlightedText();
    }
  
    function updatePosition(item, newIndex) {
      if (newIndex === 7) {
        item.style.transform = 'translate(-400px, 200px)';
      } else if (newIndex === 5) {
        item.style.transform = 'translate(0, 0)';
      } else if (newIndex === 3) {
        item.style.transform = 'translate(400px, -200px)';
      }
    }
  
    function updateHighlightedText() {
      const centerIndex = Math.floor(positions.length / 2); 
      const centerDataIndex = positions[centerIndex]; 
  
      textItems.forEach((textItem) => {
        if (parseInt(textItem.getAttribute('data-index'), 10) === centerDataIndex) {
          textItem.classList.add('highlight');
        } else {
          textItem.classList.remove('highlight');
        }
      });
    }
  
    document.addEventListener('wheel', (event) => {
      if (isCooldown) return;
  
      isCooldown = true;
      setTimeout(() => {
        isCooldown = false;
      }, 600);
  
      if (event.deltaY < 0) {
        positions.unshift(positions.pop());
      } else if (event.deltaY > 0) {
        positions.push(positions.shift());
      }
  
      updateCarousel();
    });
  
    textItems.forEach((textItem) => {
      textItem.addEventListener('mouseenter', () => {
        const targetIndex = parseInt(textItem.getAttribute('data-index'), 10);
        let currentPosition = positions.indexOf(targetIndex);
        if (currentPosition === 1) return;
  
        if (currentPosition === 0) {
          positions.unshift(positions.pop());
        } else if (currentPosition === 2) {
          positions.push(positions.shift());
        }
  
        updateCarousel();
      });
  
      textItem.addEventListener('click', () => {
        const targetIndex = parseInt(textItem.getAttribute('data-index'), 10);
        let currentPosition = positions.indexOf(targetIndex);
        if (currentPosition === 1) return;
  
        if (currentPosition === 0) {
          positions.unshift(positions.pop());
        } else if (currentPosition === 2) {
          positions.push(positions.shift());
        }
  
        updateCarousel();
      });
    });
  
    // Add click event listeners to carousel items
    carouselItems.forEach((carouselItem) => {
      carouselItem.addEventListener('click', () => {
        const url = carouselItem.getAttribute('data-url');
        if (url) {
          window.location.href = url;
        }
      });
  
      // Add hover event listeners to change image source
      const img = carouselItem.querySelector('img');
      const hoverImg = document.createElement('img');
      hoverImg.src = img.src.replace('.png', 'after.png');
      hoverImg.classList.add('hover-img');
      carouselItem.appendChild(hoverImg);
  
      carouselItem.addEventListener('mouseenter', () => {
        hoverImg.style.opacity = 1;
      });
  
      carouselItem.addEventListener('mouseleave', () => {
        hoverImg.style.opacity = 0;
      });
    });
  
    updateCarousel();
});