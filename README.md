[![Build Status](https://travis-ci.org/abdennour/react-annotations.svg?branch=master)](https://travis-ci.org/abdennour/react-annotations)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/react-annotations/badge.svg?branch=master)](https://coveralls.io/github/abdennour/react-annotations?branch=master)

# Overview :

This package aims to gather all react decorators/annotations.
It can include also a mature decorators existing in the open-source community. After adopting this decorator, we add it in this package with a reference to its main repository to keep the copyrights.
Also , there are decorators built from scratch.

 We are adopting `annotations` instead of `decorators` since all are capitalized. 

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
