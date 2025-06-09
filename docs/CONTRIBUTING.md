# Contributing to Quote Card Creator

Thank you for your interest in contributing! Here's how you can help improve this Chrome extension.

## Development Setup

1. Fork this repository
2. Clone your fork: `git clone https://github.com/yourusername/quotemate.git`
3. Load the extension in Chrome:
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

## Making Changes

1. Create a new branch: `git checkout -b feature-name`
2. Make your changes
3. Test the extension thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push and create a pull request

## Code Style

- Use clean, readable JavaScript
- Follow existing formatting patterns
- Add comments for complex logic
- Test on multiple websites

## File Structure

```
├── manifest.json           # Extension configuration
├── background.js            # Service worker
├── content.js              # Content script
├── popup.html/js/css       # Extension popup
├── quote-modal.html/js/css # Main quote editor
├── icons/                  # Extension icons
└── docs/                   # Documentation
```

## Testing

- Test on different websites
- Verify context menu works
- Check keyboard shortcuts
- Test on Chrome internal pages (should show proper error)
- Verify quote card generation and download

## Submitting Issues

- Check existing issues first
- Provide clear reproduction steps
- Include browser version and OS
- Add screenshots if helpful

Thanks for contributing! 🎉 