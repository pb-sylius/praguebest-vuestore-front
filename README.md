!!!!!!!! IMPORTANT !!!!!!!!
Don't ever use npm install on this package!

Installation:
1) Clone this repository
2) Run "yarn" command
3) Run "yarn check" to check invalid dependencies

You will probably need repair those dependencies:

A) node_modules\rollup-plugin-graphql\package.json

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
