import { sum } from '../src/sum'

describe('сумма двух чисел', ()=>{
    it('1+1=2', ()=>{
        expect(sum(1,1)).toEqual(2);
    });
});