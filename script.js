document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgAudio');
  const screamAudio = document.getElementById('screamAudio');
  const audioToggle = document.getElementById('audioToggle');
  const appContainer = document.getElementById('app-container');
  const jumpscare = document.getElementById('jumpscare');
  const horrorTransition1 = document.getElementById('horrorTransition1');
  const horrorTransition2 = document.getElementById('horrorTransition2');

  let audioPlaying = false;

  const playAudio = () => {
    if (!audioPlaying) {
      audio.play().then(() => {
        audioPlaying = true;
        audioToggle.textContent = '🔊';
      }).catch(() => {
        audioToggle.textContent = '🔇';
      });
    }
  };

  playAudio();

  const startAudioOnInteraction = () => {
    playAudio();
    document.removeEventListener('click', startAudioOnInteraction);
    document.removeEventListener('touchstart', startAudioOnInteraction);
  };

  document.addEventListener('click', startAudioOnInteraction);
  document.addEventListener('touchstart', startAudioOnInteraction);

  function createScreenFlash() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 150);
  }

  function triggerJumpscare() {
    jumpscare.classList.add('active');
    screamAudio.play().catch(() => {});
    setTimeout(() => jumpscare.classList.remove('active'), 2500);
  }

  function showHorrorTransition(el, callback) {
    el.classList.add('active');
    setTimeout(() => {
      el.classList.remove('active');
      if (callback) callback();
    }, 4000);
  }

  audioToggle.addEventListener('click', e => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      audioToggle.textContent = '🔊';
    } else {
      audio.pause();
      audioToggle.textContent = '🔇';
    }
  });

  function navigateToPage(pageId, transition) {
    createScreenFlash();
    showHorrorTransition(transition, () => {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(pageId);
      appContainer.style.opacity = '0';
      setTimeout(() => {
        target.classList.add('active');
        appContainer.style.opacity = '1';
      }, 400);
    });
  }

  document.getElementById('blurOverlay')
    ?.addEventListener('click', () => navigateToPage('page2', horrorTransition1));

  document.addEventListener('click', e => {
    if (e.target.classList.contains('next')) {
      navigateToPage(e.target.dataset.page, horrorTransition2);
    }
  });
});
