[![Build Status](https://travis-ci.org/abdennour/react-annotations.svg?branch=master)](https://travis-ci.org/abdennour/react-annotations)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/react-annotations/badge.svg?branch=master)](https://coveralls.io/github/abdennour/react-annotations?branch=master)

# Overview :

This package aims to be as a hub of react annotations where community gathers all react decorators/annotations here.

It  includes also a mature decorators existing in the open-source community. as well as new decorators that are built in this packages (like logger).

# Install

```bash
npm install react-annotations --save;
```

# Available annotations:

    - @Autobind
    - @ClickedOutside
    - @Log
    - @LogArgs
    - @LogMethodName
    - @LogReturned


# Example :

```js
import React, {Component} from 'react';
import {ClickedOutside, Autobind} from 'react-annotations';

@ClickedOutside
@Autobind
class Item extends Component {

   handleClickOutside() {
     this.setState({status: 'initial'});
   }

   render() {
     return (
      <div>
          {(this.state.status ==='initial') ?'' : <span>Salam</span> }
      </div>
    );
   }   
}

```

# License:

MIT .
