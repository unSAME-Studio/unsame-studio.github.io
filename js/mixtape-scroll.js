// Mixtape Hero - Infinite Scrolling Game Covers
// Randomly loads covers from the covers folder

document.addEventListener('DOMContentLoaded', () => {
  // All available game covers
  const gameCovers = [
    '1159.png',
    'amoeba.png',
    'bobaomatic.png',
    'bubblewrap+.png',
    'canorous.png',
    'emotionless.png',
    'flamingowhisky.png',
    'gmyh.png',
    'gulltastrophe.png',
    'hophopdonut.png',
    'laughline.png',
    'laughwithme.png',
    'littlecleaner.png',
    'lovestickin.png',
    'microwavestory.png',
    'plugitin.png',
    'potarumaku.png',
    'root.png',
    'runway.png',
    'sauce.png',
    'seasidepicnic.png',
    'shine.png',
    'splitclash.png',
    'spookypicturegame.png',
    'stockup.png',
    'suffocate.png',
    'thejamgame.png',
    'tlr.png',
    'tmdtneptot.png',
    'touchofradium.png',
    'touhoubouncebounce.png',
    'trashbeat.png'
  ];

  // Shuffle array function
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Populate scroll rows with random covers
  const scrollRows = document.querySelectorAll('.scroll-row');

  scrollRows.forEach(row => {
    // Clear existing placeholder content
    row.innerHTML = '';

    // Get shuffled covers for this row
    const shuffledCovers = shuffleArray(gameCovers);

    // Create 12 game covers per row (will be doubled for seamless scroll)
    for (let i = 0; i < 12; i++) {
      const coverDiv = document.createElement('div');
      coverDiv.className = 'game-cover';

      const img = document.createElement('img');
      img.src = `images/covers/${shuffledCovers[i % shuffledCovers.length]}`;
      img.alt = 'Game Cover';

      coverDiv.appendChild(img);
      row.appendChild(coverDiv);
    }

    // Double the content for seamless infinite scroll
    const items = row.innerHTML;
    row.innerHTML += items;
  });
});
