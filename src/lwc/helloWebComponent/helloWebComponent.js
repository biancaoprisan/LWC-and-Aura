/**
 * Created by boprisan on 6/22/2022.
 */

import { LightningElement } from 'lwc';

export default class HelloWebComponent extends LightningElement {

    greeting = "Trailblazer"; // this property is reactive; whenever the value greeting changes,
                               // the component HTML template will is automatically refreshed

    currentDate = new Date().toDateString(); // class property, using a property has the benefit of not creating a new
    //Date object for each rerender.
    get capitalizedGreeting() {
    	return `Hello ${this.greeting.toUpperCase()}!`;
    }   // getter function = expression
    handleGreetingChange(event) {
    	this.greeting = event.target.value;
    }
}