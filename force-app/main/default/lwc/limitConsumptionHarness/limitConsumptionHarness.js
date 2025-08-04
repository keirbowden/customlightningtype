import { LightningElement } from 'lwc';

export default class LimitConsumptionHarness extends LightningElement {
    slidervalue=50;
    value=[{
            name:'Order Committed',
            snapshots: [
                {name:'SN-001', cpu:5, heap:15, capturedDT:new Date(Date.now()-5000*86400)},
                {name:'SN-002', cpu:10, heap:20, capturedDT:new Date(Date.now()-4000*86400)},
                {name:'SN-003', cpu:9, heap:18, capturedDT:new Date(Date.now()-3000*86400)},
                {name:'SN-004', cpu:12, heap:450, capturedDT:new Date(Date.now()-2000*86400)},
            ]
    }];

    slidervaluechange(event) {
        this.slidervalue=event.detail.value;
    }
}