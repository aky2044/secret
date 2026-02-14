const landingPage = document.getElementById('landingPage');
const card = document.getElementById('card');
const yesButton = document.getElementById('yesButton');
const annieButton = document.getElementById('annieButton');
const videoContainer = document.getElementById('videoContainer');
const espurrVideo = document.getElementById('espurrVideo');
const blackScreen = document.getElementById('blackScreen');
const noScreen = document.getElementById('noScreen');
const goBackButton = document.getElementById('goBackButton');
const messageBox = document.getElementById('messageBox');

function showNoScreen() {
  landingPage.classList.add('hidden');
  noScreen.classList.add('active');
}

goBackButton.addEventListener('click', () => {
  noScreen.classList.remove('active');
  landingPage.classList.remove('hidden');
});

function showCard() {
  blackScreen.classList.remove('active');
  card.classList.add('visible');
  setTimeout(() => {
    initCardBackInteraction();
  }, 100);
}

const cardFlipInner = document.querySelector('.card-flip-inner');
let cardFlipped = false;
let cardBackStartX = 0;
let cardBackStartY = 0;
let isClicking = false;

function initCardBackInteraction() {
  const cardBack = document.getElementById('cardBack');
  const cardFlipContainer = document.querySelector('.card-flip-container');
  if (!cardBack || !cardFlipContainer) return;
  
  let isDraggingBack = false;
  let prevNXBack = 0, prevNYBack = 0;

  function relPosBack(evt) {
    const r = cardBack.getBoundingClientRect();
    const cx = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const cy = evt.touches ? evt.touches[0].clientY : evt.clientY;
    return { x: cx - r.left, y: cy - r.top, w: r.width, h: r.height };
  }

  function applyTransformBack(x, y, w, h) {
    const nx = (x / w) - 0.5;
    const ny = (y / h) - 0.5;

    const dx = nx - prevNXBack;
    const dy = ny - prevNYBack;
    const speed = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 5);
    prevNXBack = nx;
    prevNYBack = ny;

    rootStyle.setProperty('--nx', nx.toFixed(4));
    rootStyle.setProperty('--ny', ny.toFixed(4));
    rootStyle.setProperty('--speed', speed.toFixed(4));

    const rotX = -(ny * MAX_TILT_DEG);
    const rotY = (nx * MAX_TILT_DEG);
    
    requestAnimationFrame(() => {
      if (!cardFlipped) {
        cardBack.style.transform = `rotateY(0deg) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
    });
  }

  function resetTransformBack() {
    if (!cardFlipped) {
      cardBack.style.transition = `transform ${RESET_MS}ms ease`;
      cardBack.style.transform = 'rotateY(0deg) rotateX(0) rotateY(0)';
    }
    
    rootStyle.setProperty('--speed', '0');
    rootStyle.setProperty('--nx', '0');
    rootStyle.setProperty('--ny', '0');
    prevNXBack = 0;
    prevNYBack = 0;
    
    setTimeout(() => {
      cardBack.style.transition = '';
    }, RESET_MS);
  }

  cardBack.addEventListener('mousedown', e => { 
    cardBackStartX = e.clientX;
    cardBackStartY = e.clientY;
    isClicking = true;
    isDraggingBack = false;
    e.preventDefault(); 
  });

  document.addEventListener('mousemove', e => { 
    if (!isClicking) return;
    
    const moveX = Math.abs(e.clientX - cardBackStartX);
    const moveY = Math.abs(e.clientY - cardBackStartY);
    
    if (moveX > 5 || moveY > 5) {
      isDraggingBack = true;
      isClicking = false;
    }
    
    if (isDraggingBack && !cardFlipped) {
      const {x, y, w, h} = relPosBack(e); 
      applyTransformBack(x, y, w, h); 
    }
  });

  document.addEventListener('mouseup', e => { 
    if (isClicking && !isDraggingBack && !cardFlipped) {
      cardFlipped = true;
      cardFlipInner.classList.add('flipped');
    }
    
    if (isDraggingBack) {
      resetTransformBack();
    }
    
    isClicking = false;
    isDraggingBack = false;
  });

  cardBack.addEventListener('touchstart', e => { 
    cardBackStartX = e.touches[0].clientX;
    cardBackStartY = e.touches[0].clientY;
    isClicking = true;
    isDraggingBack = false;
    e.preventDefault(); 
  }, { passive: false });

  cardBack.addEventListener('touchmove', e => { 
    if (!isClicking) return;
    
    const moveX = Math.abs(e.touches[0].clientX - cardBackStartX);
    const moveY = Math.abs(e.touches[0].clientY - cardBackStartY);
    
    if (moveX > 5 || moveY > 5) {
      isDraggingBack = true;
      isClicking = false;
    }
    
    if (isDraggingBack && !cardFlipped) {
      const {x, y, w, h} = relPosBack(e); 
      applyTransformBack(x, y, w, h); 
      e.preventDefault(); 
    }
  }, { passive: false });

  document.addEventListener('touchend', () => { 
    if (isClicking && !isDraggingBack && !cardFlipped) {
      cardFlipped = true;
      cardFlipInner.classList.add('flipped');
    }
    
    if (isDraggingBack) {
      resetTransformBack();
    }
    
    isClicking = false;
    isDraggingBack = false;
  });
}

function playVideo() {
  landingPage.classList.add('hidden');
  videoContainer.classList.add('active');
  
  espurrVideo.play();
  
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && videoContainer.classList.contains('active')) {
    e.preventDefault();
    if (espurrVideo.duration) {
      espurrVideo.currentTime = espurrVideo.duration;
    }
  }
});

const notifSound = document.getElementById('notifSound');
const messageText = document.getElementById('messageText');
const acceptButton = document.getElementById('acceptButton');

function typewriterEffect(text, element, callback) {
  element.textContent = '';
  element.classList.add('typing');
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      element.classList.remove('typing');
      if (callback) callback();
    }
  }, 50);
}

espurrVideo.addEventListener('ended', () => {
  videoContainer.classList.remove('active');
  blackScreen.classList.add('active');
  
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  
  espurrVideo.currentTime = 0;
  
  setTimeout(() => {
    notifSound.play().catch(e => console.log('Audio play failed:', e));
    
    const fullText = 'espurr wants to give you a gift!';
    messageText.textContent = fullText;
    messageText.style.visibility = 'hidden';
    messageText.style.opacity = '0';
    
    messageBox.classList.add('visible');
    
    setTimeout(() => {
      messageBox.classList.add('typing-ready');
      messageText.textContent = '';
      messageText.style.visibility = 'visible';
      messageText.style.opacity = '1';
      
      typewriterEffect(fullText, messageText, () => {
        setTimeout(() => {
          acceptButton.style.display = 'block';
          acceptButton.style.animationDelay = '0s';
        }, 500);
      });
    }, 200);
  }, 1000);
});

yesButton.addEventListener('click', playVideo);
annieButton.addEventListener('click', showNoScreen);

acceptButton.addEventListener('click', showCard);

const MAX_TILT_DEG = 40;
const RESET_MS = 140;

const cardInner = document.getElementById('cardInner');
const rootStyle = document.documentElement.style;

let isDragging = false;
let prevNX = 0, prevNY = 0;

function relPos(evt) {
  const r = card.getBoundingClientRect();
  const cx = evt.touches ? evt.touches[0].clientX : evt.clientX;
  const cy = evt.touches ? evt.touches[0].clientY : evt.clientY;
  return { x: cx - r.left, y: cy - r.top, w: r.width, h: r.height };
}

function applyTransform(x, y, w, h) {
  const nx = (x / w) - 0.5;
  const ny = (y / h) - 0.5;

  const dx = nx - prevNX;
  const dy = ny - prevNY;
  const speed = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 5);
  prevNX = nx;
  prevNY = ny;

  rootStyle.setProperty('--nx', nx.toFixed(4));
  rootStyle.setProperty('--ny', ny.toFixed(4));
  rootStyle.setProperty('--speed', speed.toFixed(4));

  const rotX = -(ny * MAX_TILT_DEG);
  const rotY = (nx * MAX_TILT_DEG);
  
  requestAnimationFrame(() => {
    cardInner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
}

function resetTransform() {
  cardInner.style.transition = `transform ${RESET_MS}ms ease`;
  cardInner.style.transform = 'rotateX(0) rotateY(0)';
  
  rootStyle.setProperty('--speed', '0');
  rootStyle.setProperty('--nx', '0');
  rootStyle.setProperty('--ny', '0');
  prevNX = 0;
  prevNY = 0;
  
  setTimeout(() => {
    cardInner.style.transition = '';
  }, RESET_MS);
}

card.addEventListener('mousedown', e => { 
  isDragging = true; 
  e.preventDefault(); 
});

document.addEventListener('mousemove', e => { 
  if (!isDragging) return; 
  const {x, y, w, h} = relPos(e); 
  applyTransform(x, y, w, h); 
});

document.addEventListener('mouseup', () => { 
  if (!isDragging) return; 
  isDragging = false; 
  resetTransform(); 
});

document.addEventListener('mouseleave', () => { 
  if (!isDragging) return; 
  isDragging = false; 
  resetTransform(); 
});

card.addEventListener('touchstart', e => { 
  isDragging = true; 
  e.preventDefault(); 
}, { passive: false });

card.addEventListener('touchmove', e => { 
  if (!isDragging) return; 
  const {x, y, w, h} = relPos(e); 
  applyTransform(x, y, w, h); 
  e.preventDefault(); 
}, { passive: false });

document.addEventListener('touchend', () => { 
  if (!isDragging) return; 
  isDragging = false; 
  resetTransform(); 
});
