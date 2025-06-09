// Quote Modal JavaScript - Chrome Extension Version
// Based on the original QuoteModal React component

// Color palette options (same as original)
const colorOptions = [
  { name: 'Light', theme: 'light', bg: '#FFFFFF', darkText: true },
  { name: 'Dark', theme: 'dark', bg: '#111111', darkText: false },
  { name: 'Blue', theme: 'blue', bg: '#EFF6FF', darkText: true },
  { name: 'Moss', theme: 'moss', bg: '#F0FDF4', darkText: true },
  { name: 'Cream', theme: 'cream', bg: '#FFFBEB', darkText: true },
  { name: 'Rose', theme: 'rose', bg: '#FFF1F2', darkText: true }
];

// State management
let currentState = {
  selectedText: '',
  postTitle: '',
  postUrl: '',
  format: 'square',
  selectedColor: 0,
  isGenerating: false,
  isMobile: window.innerWidth < 768
};

// DOM elements
let elements = {};

// Initialize the modal
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  parseUrlParams();
  setupEventListeners();
  initializeColorOptions();
  updateQuoteCard();
  checkMobileSize();
  
  // Show modal with animation
  setTimeout(() => {
    document.getElementById('modalBackdrop').style.opacity = '1';
  }, 50);
});

// Window resize handler
window.addEventListener('resize', checkMobileSize);

function initializeElements() {
  elements = {
    modalBackdrop: document.getElementById('modalBackdrop'),
    modalContainer: document.getElementById('modalContainer'),
    closeBtn: document.getElementById('closeBtn'),
    quoteCard: document.getElementById('quoteCard'),
    quoteText: document.getElementById('quoteText'),
    quoteTitle: document.getElementById('quoteTitle'),
    quoteUrl: document.getElementById('quoteUrl'),
    colorOptions: document.getElementById('colorOptions'),
    formatBtns: document.querySelectorAll('.format-btn'),
    downloadBtn: document.getElementById('downloadBtn'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    hiddenCanvas: document.getElementById('hiddenCanvas')
  };
}

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  currentState.selectedText = params.get('text') || 'Sample quote text';
  currentState.postTitle = params.get('title') || 'Page Title';
  currentState.postUrl = params.get('url') || 'example.com';
}

function setupEventListeners() {
  // Close button
  elements.closeBtn.addEventListener('click', closeModal);
  
  // Backdrop click to close
  elements.modalBackdrop.addEventListener('click', (e) => {
    if (e.target === elements.modalBackdrop) {
      closeModal();
    }
  });
  
  // Format buttons
  elements.formatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const format = e.target.dataset.format;
      changeFormat(format);
    });
  });
  
  // Action buttons
  elements.downloadBtn.addEventListener('click', handleDownload);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function initializeColorOptions() {
  elements.colorOptions.innerHTML = '';
  
  colorOptions.forEach((color, index) => {
    const btn = document.createElement('button');
    btn.className = `color-btn ${index === currentState.selectedColor ? 'active' : ''}`;
    btn.style.background = color.bg;
    btn.addEventListener('click', () => changeColor(index));
    
    // Add check icon
    const checkIcon = document.createElement('div');
    checkIcon.className = 'check-icon';
    checkIcon.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20,6 9,17 4,12"/>
      </svg>
    `;
    checkIcon.style.color = color.darkText ? '#000000' : '#ffffff';
    
    btn.appendChild(checkIcon);
    elements.colorOptions.appendChild(btn);
  });
}

function changeColor(colorIndex) {
  if (currentState.isGenerating) return;
  
  currentState.selectedColor = colorIndex;
  
  // Update active color button
  document.querySelectorAll('.color-btn').forEach((btn, index) => {
    btn.classList.toggle('active', index === colorIndex);
  });
  
  updateQuoteCard();
}

function changeFormat(format) {
  if (currentState.isGenerating) return;
  
  currentState.format = format;
  
  // Update active format button
  elements.formatBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.format === format);
  });
  
  updateQuoteCard();
}

function updateQuoteCard() {
  const color = colorOptions[currentState.selectedColor];
  const textLength = currentState.selectedText.length;
  
  // Apply color theme
  elements.quoteCard.className = `quote-card ${color.theme} ${currentState.format}`;
  
  // Add mobile class if needed
  if (currentState.isMobile) {
    elements.quoteCard.classList.add('mobile');
  }
  
  // Add long text class if needed
  if (textLength > 600) {
    elements.quoteCard.classList.add('long-text');
  }
  
  // Update content
  elements.quoteText.textContent = currentState.selectedText;
  elements.quoteTitle.textContent = currentState.postTitle;
  elements.quoteUrl.textContent = currentState.postUrl;
  
  // Calculate and apply text size
  const fontSize = calculateTextSize(textLength, currentState.format, currentState.isMobile);
  elements.quoteText.style.fontSize = fontSize;
}

function calculateTextSize(textLength, format, isMobile) {
  let baseSize;
  
  if (isMobile) {
    if (format === 'square') {
      baseSize = textLength > 800 ? 0.7 : textLength > 600 ? 0.8 : textLength > 400 ? 0.9 : 
                 textLength > 300 ? 1.0 : textLength > 200 ? 1.1 : textLength > 100 ? 1.2 : 1.3;
    } else {
      baseSize = textLength > 800 ? 0.75 : textLength > 600 ? 0.85 : textLength > 400 ? 0.95 : 
                 textLength > 300 ? 1.05 : textLength > 200 ? 1.15 : textLength > 100 ? 1.25 : 1.35;
    }
  } else {
    if (format === 'square') {
      baseSize = textLength > 800 ? 0.85 : textLength > 600 ? 0.95 : textLength > 400 ? 1.1 : 
                 textLength > 300 ? 1.2 : textLength > 200 ? 1.4 : textLength > 100 ? 1.6 : 1.8;
    } else {
      baseSize = textLength > 800 ? 0.9 : textLength > 600 ? 1.0 : textLength > 400 ? 1.2 : 
                 textLength > 300 ? 1.3 : textLength > 200 ? 1.5 : textLength > 100 ? 1.7 : 1.9;
    }
  }
  
  return `${baseSize}rem`;
}

function checkMobileSize() {
  const wasMobile = currentState.isMobile;
  currentState.isMobile = window.innerWidth < 768;
  
  if (wasMobile !== currentState.isMobile) {
    updateQuoteCard();
  }
}

async function handleDownload() {
  if (currentState.isGenerating) return;
  
  await generateImage();
}

async function generateImage() {
  currentState.isGenerating = true;
  
  // Show loading overlay
  elements.loadingOverlay.style.display = 'flex';
  
  // Disable button
  elements.downloadBtn.disabled = true;
  
  try {
    const imageDataUrl = await createImageFromCard();
    downloadImage(imageDataUrl);
    
    // Show success notification
    showNotification('Quote card downloaded successfully!', 'success');
    
  } catch (error) {
    console.error('Error generating image:', error);
    showNotification('Failed to generate image. Please try again.', 'error');
  } finally {
    currentState.isGenerating = false;
    elements.loadingOverlay.style.display = 'none';
    elements.downloadBtn.disabled = false;
  }
}

async function createImageFromCard() {
  const canvas = elements.hiddenCanvas;
  const ctx = canvas.getContext('2d');
  const color = colorOptions[currentState.selectedColor];
  
  // Set canvas dimensions
  const dimensions = getCardDimensions();
  canvas.width = dimensions.width * 2; // 2x for high DPI
  canvas.height = dimensions.height * 2;
  
  // Scale context for high DPI
  ctx.scale(2, 2);
  
  // Clear and set background
  ctx.fillStyle = color.bg;
  ctx.fillRect(0, 0, dimensions.width, dimensions.height);
  
  // Set font
  ctx.font = 'normal 16px Inter, system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Calculate text properties
  const padding = currentState.isMobile ? 20 : 32;
  const maxWidth = dimensions.width - (padding * 2);
  const textColor = color.darkText ? '#000000' : '#ffffff';
  const titleColor = color.darkText ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
  const urlColor = color.darkText ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';
  
  // Draw main quote text
  const textLength = currentState.selectedText.length;
  const fontSize = parseFloat(calculateTextSize(textLength, currentState.format, currentState.isMobile).replace('rem', '')) * 16;
  ctx.font = `500 ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = textColor;
  
  const quotedText = `"${currentState.selectedText}"`;
  const lines = wrapText(ctx, quotedText, maxWidth);
  const lineHeight = fontSize * (fontSize < 18 ? 1.6 : fontSize < 21 ? 1.5 : 1.4);
  
  // Center the text vertically
  const totalTextHeight = lines.length * lineHeight;
  const startY = (dimensions.height - totalTextHeight) / 2 - 60; // Offset for footer
  
  // Draw each line
  lines.forEach((line, index) => {
    ctx.fillText(line, padding, startY + (index * lineHeight));
  });
  
  // Draw footer
  const footerY = dimensions.height - 60;
  const titleSize = textLength > 600 ? (currentState.isMobile ? 10 : 12) : (currentState.isMobile ? 12 : 14);
  const urlSize = textLength > 600 ? (currentState.isMobile ? 8 : 10) : (currentState.isMobile ? 10 : 12);
  
  // Draw title
  ctx.font = `500 ${titleSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = titleColor;
  ctx.fillText(currentState.postTitle, padding, footerY);
  
  // Draw URL
  ctx.font = `400 ${urlSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = urlColor;
  ctx.fillText(currentState.postUrl, padding, footerY + titleSize + 4);
  
  return canvas.toDataURL('image/png', 1.0);
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function getCardDimensions() {
  if (currentState.isMobile) {
    return currentState.format === 'square' 
      ? { width: 320, height: 320 }
      : { width: 320, height: 400 };
  }
  return currentState.format === 'square'
    ? { width: 500, height: 500 }
    : { width: 500, height: 625 };
}



function downloadImage(dataUrl) {
  const link = document.createElement('a');
  link.download = `quote-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}

function closeModal() {
  // Animate out
  elements.modalBackdrop.style.opacity = '0';
  elements.modalContainer.style.transform = 'scale(0.95) translateY(20px)';
  
  // Send close message to parent window
  window.parent.postMessage({ type: 'CLOSE_QUOTE_MODAL' }, '*');
  
  setTimeout(() => {
    // Additional cleanup if needed
  }, 200);
}

// Show notification to user
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
         background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#22c55e' : '#000000'};
    color: #ffffff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 2147483649;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideDown 0.3s ease-out;
  `;
  notification.textContent = message;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 1; transform: translateX(-50%) translateY(0); }
      to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Handle messages from parent window
window.addEventListener('message', function(event) {
  // Handle any messages if needed
}); 