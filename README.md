!!!!!!!! IMPORTANT !!!!!!!!
Don't ever use npm install on this package!

This repository includes all node_modules with fixed dependencies, so you don't need installation.

Installation:
1) Clone this repository
2) Run "yarn" command to make sure everythig is ok - use only in case that the application does not work
3) Run "yarn check" to check invalid dependencies - use only in case you applied 2)

Open packages\sylius\theme\middleware.config.js and change paths for api and imagePaths to your running server.

Go to packages\sylius\theme\middleware.config.js and replace api and imagePaths.

npm run build:sylius
- buids production ready version

"peerDependencies": {
    "graphql": "^0.9.0 || ^0.10.0"
} =>
"peerDependencies": {
    "graphql": "^0.8.0 || ^0.9.0 || ^0.10.0 || ^0.11.0 || ^0.12.0 || ^0.13.0 || ^14.0.0 || ^15.0.0 || ^16.0.0"
},

B) node_modules\vue-jest\package.json

"peerDependencies": {
    "@babel/core": "7.x",
    "babel-jest": ">= 24 < 27",
    "jest": "26.x",
    "ts-jest": ">= 24 < 27 ",
    "vue": "^2.x",
    "vue-template-compiler": "^2.x"
} =>
  "peerDependencies": {
    "@babel/core": "7.x",
    "babel-jest": ">= 24 < 27",
    "jest": "24.9.0",
    "ts-jest": ">= 24 < 28",
    "vue": "^2.x",
    "vue-template-compiler": "^2.x"
  }
