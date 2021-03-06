# Dots and Boxes

[Dots and Boxes](https://en.wikipedia.org/wiki/Dots_and_Boxes) starts with an empty grid of dots. Two players take turns adding a single horizontal or vertical line between two unjoined adjacent dots. Each player has a color that can identify who have a move. A player who completes the fourth side of a 1×1 box earns one point and takes another turn. (A cell is filled a color that identifies the player in the box) The game ends when no more lines can be placed. The winner is the player with the most points. The board may be of any size grid from 1×1 to 10×10.

### Tech

Dots and Boxes uses a number of open source projects to work properly:

* [ React ](http://example.com) - A JavaScript library for building user interfaces
* [ React-responsive-modal ](https://github.com/konvajs/react-konva) - a simple library for creating responsive modal windows compatible with React
* [ React-konva ](https://github.com/pradel/react-responsive-modal) - is a JavaScript library for drawing complex canvas graphics using React

Dots and Boxes itself is open source with a [public repository][dill]
 on GitHub.

### Installation and start the game for Linux

Dots and Boxes requires [Node.js](https://nodejs.org/).

```
sudo apt update
sudo apt install nodejs
```
[npm](https://www.npmjs.com/) is a package manager for Node.js
```
sudo apt install npm
```
We will use npm to install the create-react-app 
```
sudo npm install -g create-react-app
```
If you want to create a new single 
page application with React
```
create-react-app name-app
cd name-app
```
Install react-konva and konva libraries
```
npm install react-konva konva --save
```
Install react-responsive-modal library
```
npm install react-responsive-modal --save
```

To start the application, you need copy the source code into empty project

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
In the project directory, you can run:
```
npm start
```