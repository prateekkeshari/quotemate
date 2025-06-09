// Background script for Quote Card Creator extension

// Helper function to check if URL is accessible
function isAccessibleUrl(url) {
  return !url.startsWith('chrome://') && 
         !url.startsWith('chrome-extension://') && 
         !url.startsWith('edge://') && 
         !url.startsWith('about:') &&
         !url.startsWith('moz-extension://');
}

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item
  chrome.contextMenus.create({
    id: "createQuote",
    title: "Quote it",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "createQuote" && info.selectionText) {
    // Check if we can access this URL
    if (!isAccessibleUrl(tab.url)) {
      console.log('Cannot inject script into this URL:', tab.url);
      return;
    }
    
    // Inject the quote modal into the page
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showQuoteModal,
      args: [info.selectionText, tab.title, tab.url]
    }, (result) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to inject modal:', chrome.runtime.lastError.message);
      }
    });
  }
});

// Function to be injected into the page
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

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelection") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      
      // Check if we can access this URL
      if (!isAccessibleUrl(tab.url)) {
        sendResponse({ text: '', error: 'Cannot access this page' });
        return;
      }
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString()
      }, (result) => {
        if (chrome.runtime.lastError) {
          sendResponse({ text: '', error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ text: result[0].result });
        }
      });
    });
    return true; // Will respond asynchronously
  }
}); 