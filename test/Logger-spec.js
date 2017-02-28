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

});
