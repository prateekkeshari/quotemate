# Quote Card Creator

A Chrome extension that lets you create beautiful quote cards from any text on the web.

![Extension Demo](https://img.shields.io/badge/Chrome_Extension-v1.0.0-blue?logo=googlechrome)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎯 Select text and right-click to "Quote it"
- ⌨️ Keyboard shortcut: `Ctrl + Shift + Q`
- 🎨 6 beautiful color themes
- 📐 Multiple format options (Square/Vertical)
- 📥 Download as PNG or copy to clipboard
- 🌐 Works on any webpage
- 📱 Mobile-responsive design

## 🚀 Quick Start

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked" and select the extension folder
5. Start creating quote cards!

## 📖 Usage

1. **Select** any text on a webpage
2. **Right-click** and choose "Quote it" (or use `Ctrl + Shift + Q`)
3. **Customize** your quote card with themes and formats
4. **Download** or copy your quote card

## 📁 Project Structure

```
quotemate/
├── manifest.json           # Extension configuration
├── background.js           # Service worker
├── content.js             # Content script injection
├── popup.html/js/css      # Extension popup interface
├── quote-modal.html/js/css # Main quote card editor
├── icons/                 # Extension icons (16px to 128px)
├── docs/                  # Documentation
│   ├── INSTALLATION.md    # Detailed installation guide
│   └── CONTRIBUTING.md    # Developer contribution guide
├── CHANGELOG.md           # Version history
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details on how to get started.

## 📋 Documentation

- **[Installation Guide](docs/INSTALLATION.md)** - Detailed setup instructions
- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute to the project
- **[Changelog](CHANGELOG.md)** - Version history and updates

## 🛠️ Technical Details

- **Framework**: Vanilla JavaScript (no dependencies)
- **Manifest**: Version 3
- **Canvas API**: High-quality image generation
- **Font**: Inter family for clean typography
- **Permissions**: `activeTab`, `contextMenus`, `scripting`

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🌟 Support

If you find this extension helpful, please consider:
- ⭐ Starring this repository
- 🐛 Reporting issues
- 🔧 Contributing improvements
- 📢 Sharing with others

---

**Made with ❤️ for the web community** 