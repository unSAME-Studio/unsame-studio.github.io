// Danmaku text messages
const danmakuMessages = [
  "wow unSAME!",
  "who are they?",
  "this is so weird",
  "this is so silly",
  "amazing games!",
  "so creative!",
  "indie vibes",
  "what is this?",
  "love the art style",
  "quirky and fun",
  "unique experience",
  "mind blown",
  "so random lol",
  "artistic genius",
  "absolutely unSAME",
  "experimental",
  "fresh ideas",
  "game jam energy",
  "pixel perfect",
  "retro feels",
  "totally bizarre",
  "what even is this",
  "need more of this",
  "oddly satisfying",
  "pure chaos",
  "i love this",
  "10/10 would play",
  "very unsame indeed",
  "innovative design",
  "brilliant madness",
  "weirdly addictive",
  "art meets gaming",
  "unexpected delight",
  "refreshingly strange",
  "beautifully chaotic",
  "surprisingly deep",
  "charmingly weird",
  "delightfully odd",
  "wonderfully bizarre",
  "creatively insane",
  "fascinatingly weird",
  "perfectly imperfect",
  "strangely compelling",
  "uniquely beautiful",
  "mysteriously fun",
  "wildly creative",
  "totally original",
  "absolutely mental",
  "genuinely unique",
  "seriously cool",
  "incredibly fresh",
  "ridiculously fun",
  "amazingly weird",
  "surprisingly good",
  "beautifully mad",
  "perfectly crazy",
  "wonderfully wild",
  "deliciously strange",
  "fantastically odd",
  "marvelously weird",
  "splendidly bizarre",
  "magnificently mad"
];

// Support messages for logo press
const supportMessages = [
  "+1",
  "I support you!",
  "Keep going!",
  "You got this!",
  "Amazing work!",
  "Love it!",
  "+1 support",
  "We believe in you!",
  "So cool!",
  "Keep creating!",
  "You're awesome!",
  "Great job!",
  "This is great!"
];

// Function to create danmaku text
function createDanmakuText(customMessage) {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  const textElement = document.createElement('div');
  textElement.className = 'danmaku-text';

  // Use custom message or random message selection
  const randomMessage = customMessage || danmakuMessages[Math.floor(Math.random() * danmakuMessages.length)];
  textElement.textContent = randomMessage;

  // Random vertical position (avoiding the logo area in the center)
  const heroHeight = heroSection.offsetHeight;
  const centerStart = heroHeight * 0.3;
  const centerEnd = heroHeight * 0.7;
  let randomTop;

  // Position either in top 30% or bottom 30% to avoid the logo
  if (Math.random() < 0.5) {
    randomTop = Math.random() * centerStart;
  } else {
    randomTop = centerEnd + Math.random() * (heroHeight - centerEnd);
  }

  textElement.style.top = randomTop + 'px';

  // Add to hero section
  heroSection.appendChild(textElement);

  // Remove element after animation completes
  setTimeout(() => {
    if (textElement.parentNode) {
      textElement.parentNode.removeChild(textElement);
    }
  }, 8000);
}

// Start danmaku effect
function startDanmaku() {
  // Create initial text immediately
  createDanmakuText();

  // Then create new text every 1.5-3 seconds
  setInterval(() => {
    createDanmakuText();
  }, Math.random() * 1500 + 1500);
}

// Function to create danmaku on logo press
function createSupportDanmaku() {
  createDanmakuText(supportMessages[Math.floor(Math.random() * supportMessages.length)]);
}

// Logo press effect for mobile and desktop
const logo = document.querySelector('.logo');

if (logo) {
  logo.addEventListener('touchstart', (e) => {
    logo.classList.add('pressed');
  });

  logo.addEventListener('touchend', (e) => {
    logo.classList.remove('pressed');
    createSupportDanmaku();
  });

  logo.addEventListener('touchcancel', (e) => {
    logo.classList.remove('pressed');
  });

  // Desktop click effect
  logo.addEventListener('mousedown', (e) => {
    createSupportDanmaku();
  });
}

// Start danmaku when page loads
window.addEventListener('load', () => {
  setTimeout(startDanmaku, 1000); // Start after 1 second delay
});
