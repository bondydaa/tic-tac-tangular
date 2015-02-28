#Tic-Tac-Tangular

## FED Boilerplate

Author: [Matt Fender](http://www.fender.me)

[LICENSE](LICENSE)

A ready-to-develop set of dependencies for a Front End Developer building static HTML.

Inspired by the Front End Boilerplate used at [The Nerdery](http://www.nerdery.com).

## Installation

1. Run `npm install` to install task dependencies.
2. Run `bower install` to install project code dependencies.
3. Run `grunt bower` to hook up bower dependencies and Requre.js.
4. Run `grunt build` to create an initial build in the web folder.

## Development

1. In the web folder, run `vagrant up` to create a virtual machine bootstrapped to serve the web folder. Go to localhost:1337 to see the server root.
2. In the project root, run `grunt watch` to have grunt listen for file changes and run tasks automatically.

## Technology Colophon

- grunt
- time-grunt
- bower
- angular
- angular-route
- bootstrap-sass
- handlebars
- assemble
- grunt-bower-requirejs
- grunt-contrib-copy
- grunt-contrib-watch
- grunt-sass
- grunt-prettify