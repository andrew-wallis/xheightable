# xheightable

xheightable is a tool for pairing fonts using their x-heights. Find the perfect pairing from over 100 of the most popular fonts from Google and Adobe.

## Tech Stack

| Category   | Tools                                                                                  |
|------------|----------------------------------------------------------------------------------------|
| Build tool | Vite                                                                                   |
| Language   | JavaScript (ES Module)                                                                 |
| Styling    | CSS                                                                                    |
| Deployment | GitHub Pages/FTP Deployment from dist folder (@todo set up Git connection with remote) |

## Getting Starter

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