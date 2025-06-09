# Installation Guide - Quote Card Creator Chrome Extension

## Quick Start

### Step 1: Install Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `quote-extension` folder
5. The extension is now installed!

## Usage

### Method 1: Right-Click Context Menu (Recommended)
1. Select any text on a webpage
2. Right-click and choose "Create Quote Card"
3. Customize and download your quote card

### Method 2: Extension Icon
1. Click the Quote Card Creator icon in your toolbar
2. If text is selected, click "Create Quote Card"

### Method 3: Keyboard Shortcut
1. Select text on any page
2. Press `Ctrl+Shift+Q` (Windows/Linux) or `Cmd+Shift+Q` (Mac)

## Troubleshooting

### Extension Not Loading?
- Make sure all files are in the `quote-extension` folder
- Check that `manifest.json` is in the root of the folder
- Ensure Developer mode is enabled in Chrome

### Context Menu Not Appearing?
- Try refreshing the page after installing the extension
- Make sure you have text selected before right-clicking

### Icons Missing?
- SVG icons are already included in the `icons/` folder
- If you see icon errors, make sure all SVG files are present: icon16.svg, icon32.svg, icon48.svg, icon128.svg

### Modal Not Opening?
- Check if the page allows content scripts (some sites block them)
- Try on a different website
- Check the Chrome console for error messages

## Features Overview

✅ **6 Color Themes**: Light, Dark, Blue, Moss, Cream, Rose  
✅ **2 Formats**: Square (1:1) and Vertical (4:5)  
✅ **Auto Text Sizing**: Adapts to content length  
✅ **High Quality**: 2x resolution for crisp images  
✅ **Copy & Download**: Save as PNG or copy to clipboard  
✅ **Mobile Responsive**: Works on all screen sizes  
✅ **Keyboard Shortcuts**: Quick access with Ctrl+Shift+Q  

## Browser Support

- ✅ Chrome 88+
- ✅ Microsoft Edge 88+
- ✅ Brave Browser
- ✅ Any Chromium-based browser with Manifest V3 support

## Privacy & Permissions

This extension:
- 🔒 Works completely offline
- 🔒 No data collection or tracking
- 🔒 Only accesses selected text when you use it
- 🔒 No network requests (except for loading Google Fonts)

Required permissions:
- `activeTab` - Access current page to get selected text
- `contextMenus` - Add right-click menu option
- `scripting` - Inject the quote modal
- `<all_urls>` - Work on any website

## Need Help?

If you encounter any issues:
1. Check this troubleshooting guide
2. Try refreshing the page and reinstalling
3. Test on a different website
4. Check the browser console for errors

---

Enjoy creating beautiful quote cards! 🎨✨ 