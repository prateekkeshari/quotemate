// Popup script for Quote Card Creator extension

document.addEventListener('DOMContentLoaded', async () => {
  const selectionArea = document.getElementById('selectionArea');
  const noSelection = document.getElementById('noSelection');
  const selectedText = document.getElementById('selectedText');
  const createBtn = document.getElementById('createBtn');

  // Helper function to check if URL is accessible
  function isAccessibleUrl(url) {
    return !url.startsWith('chrome://') && 
           !url.startsWith('chrome-extension://') && 
           !url.startsWith('edge://') && 
           !url.startsWith('about:') &&
           !url.startsWith('moz-extension://');
  }

  // Get current selection from the active tab
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we can access this URL
    if (!isAccessibleUrl(tab.url)) {
      selectionArea.style.display = 'none';
      noSelection.style.display = 'block';
      document.querySelector('#noSelection p').textContent = 'Extension cannot access this page.';
      document.querySelector('#noSelection small').textContent = 'Try using the extension on a regular webpage.';
      return;
    }
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString().trim()
    }, (result) => {
      // Check for chrome.runtime.lastError
      if (chrome.runtime.lastError) {
        console.log('Script execution failed:', chrome.runtime.lastError.message);
        selectionArea.style.display = 'none';
        noSelection.style.display = 'block';
        document.querySelector('#noSelection p').textContent = 'Cannot access this page.';
        document.querySelector('#noSelection small').textContent = 'Try using the extension on a regular webpage.';
        return;
      }
      
      if (result && result[0] && result[0].result) {
        const text = result[0].result;
        if (text.length > 0) {
          // Show selection area
          selectionArea.style.display = 'block';
          noSelection.style.display = 'none';
          
          // Display selected text (truncate if too long)
          const displayText = text.length > 200 ? text.substring(0, 200) + '...' : text;
          selectedText.textContent = displayText;
          
          // Store full text for later use
          selectedText.dataset.fullText = text;
        } else {
          // No selection
          selectionArea.style.display = 'none';
          noSelection.style.display = 'block';
          document.querySelector('#noSelection p').textContent = 'No text selected on the current page.';
          document.querySelector('#noSelection small').textContent = 'Select some text and try again!';
        }
      } else {
        // No selection
        selectionArea.style.display = 'none';
        noSelection.style.display = 'block';
        document.querySelector('#noSelection p').textContent = 'No text selected on the current page.';
        document.querySelector('#noSelection small').textContent = 'Select some text and try again!';
      }
    });
  } catch (error) {
    console.error('Error getting selection:', error);
    selectionArea.style.display = 'none';
    noSelection.style.display = 'block';
    document.querySelector('#noSelection p').textContent = 'Cannot access this page.';
    document.querySelector('#noSelection small').textContent = 'Try using the extension on a regular webpage.';
  }

  // Handle create button click
  createBtn.addEventListener('click', async () => {
    const fullText = selectedText.dataset.fullText;
    if (!fullText) return;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Double-check URL accessibility before injecting
      if (!isAccessibleUrl(tab.url)) {
        console.error('Cannot inject script into this URL:', tab.url);
        return;
      }
      
      // Close popup
      window.close();
      
      // Inject quote modal into the page
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showQuoteModal,
        args: [fullText, tab.title, tab.url]
      }, (result) => {
        if (chrome.runtime.lastError) {
          console.error('Failed to inject modal:', chrome.runtime.lastError.message);
        }
      });
    } catch (error) {
      console.error('Error creating quote card:', error);
    }
  });

  // Handle options link
  document.getElementById('optionsLink').addEventListener('click', (e) => {
    e.preventDefault();
    // Could open an options page in the future
    console.log('Options clicked - feature coming soon!');
  });
});

// Function to be injected into the page (same as in background.js)
function showQuoteModal(selectedText, pageTitle, pageUrl) {
  // Check if modal is already open
  if (document.getElementById('quote-card-extension-modal')) {
    return;
  }

  // Create and inject the modal
  const modalContainer = document.createElement('div');
  modalContainer.id = 'quote-card-extension-modal';
  modalContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2147483647;
    pointer-events: none;
  `;

  // Create iframe for the modal
  const iframe = document.createElement('iframe');
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    pointer-events: auto;
  `;
  
  // Get the extension URL for the modal
  const extensionUrl = chrome.runtime.getURL('quote-modal.html');
  const params = new URLSearchParams({
    text: selectedText,
    title: pageTitle,
    url: pageUrl
  });
  iframe.src = `${extensionUrl}?${params.toString()}`;

  modalContainer.appendChild(iframe);
  document.body.appendChild(modalContainer);

  // Listen for close message from iframe
  window.addEventListener('message', function(event) {
    if (event.data.type === 'CLOSE_QUOTE_MODAL') {
      const modal = document.getElementById('quote-card-extension-modal');
      if (modal) {
        modal.remove();
      }
    }
  });
} 