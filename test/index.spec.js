const { expect } = require('chai');
const sinon = require('sinon');
const createObserver = require('../index');

describe('testing proxy-observer', () => {
    it('should create nested observable on object type', () => {
        const myObject = {
            param: 1,
            otherParam: 2,
            object: { nestedParam: true }
        };

        const callback = sinon.fake(args => {
            console.log(args);
        });

        const observer = createObserver(myObject, callback);
        observer.param = 'nooo';
        observer.object.nestedParam = false;

        expect(callback.callCount).to.equal(2);
        expect(observer.param).to.equal('nooo');
    });

    it('should create nested observable on array type', () => {
        const myObject = [1, { nestedParam: true, other: { fak: 'test' } }, 3];

        const callback = sinon.fake();

        const observer = createObserver(myObject, callback);
        observer[0] = 'nooo';
        observer[1].nestedParam = false;
        observer[1].other.fak = 'tast';

        expect(callback.callCount).to.equal(3);
    });
});
