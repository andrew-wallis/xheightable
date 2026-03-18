# xheightable

xheightable is a tool for pairing fonts using their x-heights. Find the perfect pairing from over 100 of the most popular fonts from Google and Adobe.

## Tech Stack

| Category   | Tools                                                                                  |
|------------|----------------------------------------------------------------------------------------|
| Build tool | Vite                                                                                   |
| Language   | JavaScript (ES Module)                                                                 |
| Styling    | CSS                                                                                    |
| Deployment | GitHub Pages/FTP Deployment from dist folder (@todo set up Git connection with remote) |

## Getting Started

### Prerequistes

* Node.js
* npm

### Installation

```
npm install
```

### Development

```
npm run dev
```

### Build

```
npm run build
```

### Deploy

```
npm run deploy
```

## Project Structure

```
/
├── dist/
├── node_module/
├── public/
│   ├── assets/
│   │   ├── ...
│   ├── data/
│   │   ├── fonts.csv
│   ├── .htaccess
│   ├── xheightable.png
├── src/
│   ├── Components/
│   │   ├── Elements/
│   │   │   ├── Button.js
│   │   │   ├── Icons.js
│   │   │   ├── ListItem.js
│   │   │   ├── Select.js
│   │   ├── Modules/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Help/
│   │   │   ├── Samples/
│   │   │   ├── Sidebar/
│   │   │   ├── Test/
│   ├── helpers/
│   │   ├── ...
│   ├── utils/
│   │   ├── ...
│   ├── App.js
│   ├── main.js
│   ├── preflight.css
│   ├── store.js
│   ├── style.css
├── .gitignore
├── config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── vite.config.js
```

## Core Concepts

**main.js**
Bootstraps the app:
- Loads CSV data
- Creates store
- Passes data into App

**App.js**
Main application controller:
- Constructs layout
- Initializes modules
- Handles global UI logic (sidebar, viewport)

**store.js**
Custom state manager:
- Holds central data object
- Allows subscribing functions
- Triggers updates when state changes

### Components

**Elements**
Reusable UI elements.

Example:
- Button
- Dropdown
- Toggle

Elements receive actions as arguments.

**Modules**
Top-level UI sections:
- Header
- Footer
- Sidebar
- Samples
- Test Area

Modules compose Elements and handle UI logic.

### Helpers vs Utils

helpers/
Shared domain logic used across modules.

utils/
Low-level developer utilities.

Example:
- DOM search helpers
- sorting utilities

### Data Flow

CSV → main.js → store → App → Modules → Elements

```
           main.js
              │
              ▼
            store
              │
              ▼
            App.js
      ┌───────┼────────┐
      ▼       ▼        ▼
   Header   Sidebar   Samples
      │       │        │
      ▼       ▼        ▼
  Elements  Elements  Elements
```



## Configuration

### config.js

config.js sets the baseURL per environment. This is currently set to / for both production and non-production.

If the app is deployed to Github and it uses Github’s default url (rather than a custom TLD) then this needs to be set to the project name. e.g. if the URL is deployed to myaccount.github.io/myproject then the production baseURL should be set to "/myproject".

### postcss.config.js

PostCSS is enabled in this project but is not used.

## Application

### main.js

Bootstraps application. App currently uses a local CSV file for storing app data. main.js declares CSV file names and fetches app data and parses into a JS object, initialData.

The application uses a custom “store” for state management. This is initialised here with the initialData passed as an object.

The application then mounts inside #app element from the index.html file, with store passed as a variable.

### store.js

A custom state management module. An initialData (fonts object) is passed into the data object.

It provides the following utilities:

* getData() - returns data object
* setData() - updates data object and triggers notify function
* subscribe() - adds a listener function 

The following functions subscribe to the store:

| Function              | Location   |
|-----------------------|------------|
| updateAside()         | App.js     |
| updateHelp()          | Help.js    |
| updateSamples()       | Samples.js |
| updatePrimaryList()   | Sidebar.js |
| updateSecondaryList() | Sidebar.js |
| updateTest()          | Test.js    |


### App.js

The App.js sets the global app structure and data object.

#### Initiate Data

Sets the initial store data object (initial states for help, lock and sidebar, primary/secondary font and sort, test title/paragraph text, viewport)

#### Structure 

Global app structure. Uses vanilla JS to build out page structure:

* Header
* App Container
* Main Content (including Samples and Test text)
* Sidebar
* Sidebar Overlay
* Footer
* Help (hidden modal)

#### Sidebar Functions

Sidebar show/hide functions are kept here rather than the Sidebar module as the App Container element is manipulated rather than the Sidebar element itself.

#### Viewport Functions

The *viewport* width is kept in the store and used throughout the app - e.g. for setting the length of the sample text. 

The *top* attribute of the sidebar is also set here so the sidebar on mobile keeps the sample area in view while remaining large enough to interact with the lists. (This includes some magic numbers, but essentially the sidebar should be at least 448px high, accounting for iPhone SE screens).

The viewport function is run either:

* On resize - a debounce function is in place to stop this happening repeatedly

* On update - a MutationObserver function is used to watch for changes in the DOM.

### Modules

#### Footer

Footer.js - creates the site footer.

Functions:

* **displayHelp()** - opens *Help* modal
* **getDefaultTheme()** - looks at browser preferences and local storage for theme before reverting to default light theme. Triggered on application load.
* **toggleTheme()** - switches between light and dark mode. Transitions are disabled during this.
* **setTheme*()** - sets theme by adding document attribute, updating theme switch label and writing mode to local storage. Used by toggleTheme() and getDefaultTheme()

#### Header

Header.js - creates the site header.
HeaderLogo.js - creates the site logo. Kept in a separate file due to length of embedded SVG.

Functions:

* **sayHi()** - opens mailto email address (used to obfuscate mail)

#### Help

Help.js - creates the help modal.
HelpContent.js - creates the help modal content. Kept in separate file due to length of embedded SVG.

Functions:

* **closeHelp()** - sets store *help* attribute to false.
* **updateHelp()** - Toggles Help modal visibility according to the store's *help* attribute.