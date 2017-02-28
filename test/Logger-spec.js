import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import {mount, shallow} from 'enzyme';
import  {
   Log,
   LogAll,
   LogArgs,
   LogMethodName,
   LogReturned
} from '../src';

function mergeArgs(spyOrStub) {
  return Array.from({length: spyOrStub.callCount}, (v, k) => k).map(call =>
     spyOrStub.getCall(call).args
  ).reduce((all, next) => [...all, ...next], [])
}

describe(`Logger`, () => {
  let consoleInfo;
  beforeEach(() => {
    consoleInfo = sinon.spy(console, 'info');
  });
  afterEach(() => {
    consoleInfo.restore();
  });
  describe(`LogReturned`, () => {
    it(`logs the returned value of the annotated method`, () => {
        const AnyComponent= (() => {
           class C extends React.Component {
              @LogReturned
              hello() {
               return 'it returns hello';
              }
              componentDidMount() {
                 this.hello();
              }
              render() {
                 return (<span></span>)
              }
           }
           return C;
       })();
       mount(<AnyComponent />);
       expect(consoleInfo.called).toBeTruthy();
       expect(consoleInfo.getCall(0).args).toInclude('it returns hello');
    });
  });

  describe(`LogMethodName`, () => {
    let AnyComponent;
    beforeEach(() => {
       AnyComponent= (() => {
         class C extends React.Component {
            @LogMethodName
            handleClick() {
             return 'something';
            }
            componentDidMount() {
               this.handleClick();
            }
            render() {
               return (<span></span>)
            }
         }
         return C;
     })();
    });

    it(`logs the method name`, () => {
       mount(<AnyComponent />);
       expect(consoleInfo.called).toBeTruthy();
       expect(consoleInfo.getCall(0).args).toInclude('handleClick');
    });

    it(`logs the class name of the annotated method`, () => {
       mount(<AnyComponent />);
       expect(consoleInfo.called).toBeTruthy();
       expect(consoleInfo.getCall(0).args).toInclude('C');
    });
  });

  describe(`LogArgs`, () => {
    let AnyComponent;
    beforeEach(() => {
       AnyComponent= (() => {
         class C extends React.Component {
            @LogArgs
            handleClick(a, b) {
             return 'something';
            }

            @LogArgs
            handleMouse(a) {
             return 'something';
            }
            componentDidMount() {
               this.handleClick('cl', 'ick' );
               this.handleMouse('mouse');
            }
            render() {
               return (<span></span>)
            }
         }
         return C;
     })();
    });

    it(`logs arguments`, () => {
       mount(<AnyComponent />);
       expect(consoleInfo.calledTwice).toBeTruthy();
       expect(consoleInfo.getCall(0).args).toInclude('ick');
       expect(consoleInfo.getCall(1).args).toInclude('mouse');
    });


  });

  describe(`LogAll`, () => {
    let AnyComponent;
    beforeEach(() => {
       AnyComponent= (() => {
         class C extends React.Component {
            @LogAll
            handleClick(a, b) {
             return 'something';
            }
            @LogAll  
            handleMouse() {

            }

            componentDidMount() {
               this.handleClick('cl', 'ick' );
               this.handleMouse('mouse');
            }
            render() {
               return (<span></span>)
            }
         }
         return C;
     })();
    });

    it(`logs all info about the annotated method including: its classname, its arguments, its returned value.`, () => {
       mount(<AnyComponent />);
       expect(consoleInfo.called).toBeTruthy();

       const argsLogging= mergeArgs(consoleInfo);
       expect(argsLogging).toInclude('handleClick'); // log method name.
       expect(argsLogging).toInclude('C'); // log class name of the instance that has the annotated method
       expect(argsLogging).toInclude('mouse'); // log 1ˢᵗ argument of the 2ⁿᵈ call.
       expect(argsLogging).toInclude('something'); // log returned value.

    });


  });

});
