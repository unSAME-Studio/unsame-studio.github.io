// Game video hover functionality
document.querySelectorAll('.game-item').forEach(item => {
  const video = item.querySelector('.game-video');
  const source = video ? video.querySelector('source') : null;

  // Only add hover effects if there's a valid video source
  if (source && !source.src.includes('placeholder')) {
    item.classList.add('has-video');

    // Only enable video on hover for desktop
    if (window.innerWidth > 768) {
      item.addEventListener('mouseenter', () => {
        video.play();
      });

      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  } else if (video) {
    // Remove the video element if there's no valid source
    video.remove();
  }
});
