import { SliderHandle } from "../src/plugin/view/SliderHandle";
import { SliderLine } from "../src/plugin/view/SliderLine";
const $ = require('jquery');

describe('Check SliderHandle',()=>{
    let line = new SliderLine();
    let handle = new SliderHandle(line);
    

    it('Tag of element must be <div></div>', ()=>{
        expect(handle.$elem.get(0).nodeName).toEqual('div');
    });
});