# Quote Card Creator - Chrome Extension

A Chrome extension that allows you to create beautiful quote cards from any selected text on the web.

## Features

✨ **Easy to Use**: Simply select text on any webpage, right-click, and choose "Create Quote Card"  
🎨 **Multiple Themes**: Choose from 6 beautiful color themes (Light, Dark, Blue, Moss, Cream, Rose)  
📱 **Responsive Design**: Automatically adapts to mobile and desktop layouts  
🖼️ **Two Formats**: Square (1:1) and vertical (4:5) aspect ratios  
📥 **Download & Copy**: Save quote cards as PNG files or copy to clipboard  
⌨️ **Keyboard Shortcut**: Use `Ctrl+Shift+Q` to quickly create quote cards  
🎯 **Clean Design**: Minimalist aesthetic with smooth animations  

## Installation

### Method 1: Load Unpacked Extension (Developer Mode)

1. Download or clone this repository  
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `quote-extension` folder
5. The extension should now appear in your extensions list
6. Start using it immediately - no additional setup required! 🎉

### Method 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

## Usage

### Context Menu (Recommended)
1. Select any text on a webpage
2. Right-click on the selected text
3. Choose "Create Quote Card" from the context menu
4. Customize your quote card with different colors and formats
5. Download or copy the image

### Extension Popup
1. Click the Quote Card Creator icon in your browser toolbar
2. If you have text selected, you'll see a preview
3. Click "Create Quote Card" to open the editor

### Keyboard Shortcut
1. Select text on any webpage
2. Press `Ctrl+Shift+Q` (Cmd+Shift+Q on Mac)
3. The quote card editor will open automatically

## Customization Options

- **Color Themes**: Light, Dark, Blue, Moss, Cream, Rose
- **Formats**: Square (1:1) for social media, Vertical (4:5) for stories
- **Auto-sizing**: Text automatically resizes based on content length
- **Mobile Responsive**: Cards adapt for mobile screens

## Permissions

The extension requires the following permissions:

- `activeTab`: To access the currently active tab
- `contextMenus`: To add the right-click context menu option
- `scripting`: To inject the quote modal into web pages
- `<all_urls>`: To work on any website

## Privacy

This extension:
- ✅ Works completely offline after installation
- ✅ Does not collect or transmit any personal data
- ✅ Does not track your browsing activity
- ✅ Only accesses selected text when you explicitly use the extension

## Technical Details

- Built with vanilla JavaScript for maximum performance
- Uses Canvas API for high-quality image generation
- Responsive design with CSS Grid and Flexbox
- Smooth animations with CSS transitions
- Inter font family for clean typography

## Browser Compatibility

- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)
- Requires Manifest V3 support

## Development

### Local Development
1. Clone the repository
2. Make your changes
3. Load the extension in Chrome (Developer mode)
4. Test your changes
5. Submit a pull request

### File Structure
```
quote-extension/
├── manifest.json          # Extension configuration
├── background.js           # Service worker
├── content.js             # Content script
├── content.css            # Content styles
├── popup.html             # Extension popup
├── popup.js               # Popup functionality
├── popup.css              # Popup styles
├── quote-modal.html       # Main quote editor
├── quote-modal.js         # Quote editor logic
├── quote-modal.css        # Quote editor styles
├── icons/                 # Extension icons
└── README.md              # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have feature requests, please open an issue on GitHub.

---

**Created with ❤️ by [Your Name]** 