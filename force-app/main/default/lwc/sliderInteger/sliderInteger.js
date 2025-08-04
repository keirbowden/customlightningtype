import { LightningElement } from 'lwc';

export default class SliderInteger extends LightningElement {
    value;

    handleChange(event) {
        event.stopPropagation();
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('valuechange', {
                detail: {
                    value: this.value
                }
            })
        );
    }
}