# A designer's guide to building Widgets in Figma

August 31, 2023
Hosted by [Free A ssociation](https://www.freeassociation.com)
Presenter/Author: Kyle Truscott

### Overview

This package contains the simple `Button Explorer` widget presented during the live webinar. Feel free to use this code as a starting point for your journey into building design tools.

The code is an extension of the out-of-the-box widget that Figma will create for you. It uses TypeScript and NPM, which are both normal tools for creating javascript based apps.

### Installation

1. Download Visual Studio Code: [https://code.visualstudio.com/](https://code.visualstudio.com/).
2. Install the Node JS language runtime: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
    * Note: you may already have this on your computer
3. Unzip this folder to your computer's hardrive.
4. From the Figma desktop app, use the `Widgets > Development > Import widget from manifest...` item to locate the `manifest.json` file contained within this folder.

### Working on the plugin

1. Open Visual Code Studio
2. Use the `File > Open Folder...` menu item to locate this folder to open it.
3. Use the `Terminal > Run Task...` menu item, and locate the `npm: install` item
    * This will download all the required pieces of software needed for the widget to work
4. Use the `Terminal > Run Build Task...` menu item, and locate the `npm: watch` item
    * As you modify files, VS Code will regenerate the widget code for you

### Helpful Links

* [Chromas JS documentation](https://gka.github.io/chroma.js/)
* [General intro to Figma APIs](https://www.figma.com/widget-docs/)
* [Figma Widget API Reference](https://www.figma.com/widget-docs/api/api-reference/)

### Ideas to explore

* Test a variety of fonts all at once
    * See [loadFontAsync](https://www.figma.com/plugin-docs/api/properties/figma-loadfontasync/)
* Generate a color palette from 3-4 starting colors by systematically increasing/decreasing brightness
    * See [chroma.brighten()](https://gka.github.io/chroma.js/#color-brighten) and [chroma.darken()](https://gka.github.io/chroma.js/#color-darken)
* Compose the buttons within a dialog box alongside other text content
* Create an input field that lets you enter a hex value directly
    * See [Input](https://www.figma.com/widget-docs/api/component-Input/)


