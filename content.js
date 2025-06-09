// Content script for Quote Card Creator extension

// Store selected text globally
let currentSelection = '';

// Track text selection
document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  currentSelection = selection.toString().trim();
});

// Listen for keyboard shortcuts (optional - Ctrl+Shift+Q)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
    e.preventDefault();
    if (currentSelection) {
      createQuoteCard(currentSelection);
    }
  }
});

function createQuoteCard(selectedText) {
  if (!selectedText) return;
  
  // Send message to background script to create quote
  chrome.runtime.sendMessage({
    action: 'createQuote',
    text: selectedText,
    title: document.title,
    url: window.location.href
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentSelection') {
    sendResponse({ text: currentSelection });
  }
}); 