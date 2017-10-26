# bci2k.js

> A javascript connector for BCI2000

[![NPM Version][npm-image]][npm-url]

bci2k.js relies on a binary server called BCI2000Web, which allows browsers to communicate with Operator using the Operator Scripting language and stream data in to the browser using websockets.

## Install

```bash
npm install --save bci2k
```

## Usage

### Connect to BCI2000

```js
var bci2k = require( 'bci2k' );
var connection = new bci2k.Connection();

connection.connect( '127.0.0.1' )
            .then( function( event ) {
                console.log( 'Yay!' );
            } )
            .catch( function( reason ) {
                console.log( 'Boo.' );
            } );
```

### Execute system commands

```js
connection.execute( 'Get System State' )
            .then( function( state ) {
                console.log( 'System state is ' + state );
            } );

connection.resetSystem()
            .then( function() {
                console.log( 'System has been reset.' );
            } );
```

### Tap data from part of the signal processing chain

```js
var dataConnection = null;

// Tap into the raw signal

var setupSourceConnection = function( dataConnection ) {

    dataConnection.onSignalProperties = function( properties ) {
        console.log( 'Recording from channels: ' + properties.channels );
    };

    dataConnection.onGenericSignal = function( signal ) {
        if ( signal.length > 0 ) {
            console.log( 'Got one sample block of data with ' + signal.length + ' channels and ' + signal[0].length + ' samples.' );
        }
    };

    dataConnection.onStateVector = function( stateVector ) {
        console.log( 'Current stimulus code: ' + stateVector['StimulusCode'] );
    };

};

connection.tap( 'Source' )
            .then( setupSourceConnection )
            .catch( function( reason ) {
                console.log( 'Could not tap Source: ' + reason );
            } );
```

### And more!

## Development

```bash
npm run build
```

```bash
npm run build-min
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/bci2k.svg
[npm-url]: https://npmjs.org/package/bci2k
