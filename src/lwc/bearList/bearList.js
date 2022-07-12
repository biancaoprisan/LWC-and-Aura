import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends NavigationMixin(LightningElement) {
	searchTerm = ''; // reactive property that we can pass as a parameter of our wired Apex call to searchBears

//Code highlights:
//We retrieve the Lightning message context and store it in a messageContext property.
//We use a wired function to capture incoming bear list data and fire a custom BearListUpdate__c Lightning message with the list of bear records.
//We pass searchTerm as a dynamic parameter to our wired searchBears adapter so that each time searchTerm changes, loadBears is re-executed and we fire a new message with the new search results.
//We use the publish function that we imported from LMS to fire a BearListUpdate__c Lightning message with the bear list.
	bears;
    @wire(MessageContext) messageContext;
    @wire(searchBears, {searchTerm: '$searchTerm'})
    loadBears(result) {
      this.bears = result;
      if (result.data) {
        const message = {
          bears: result.data
        };
        publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
      }
    }

	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
//		The handleSearchTermChange function is used to react to changes in the value of the search input field.
//		 We purposefully introduce a 300 millisecond delay when updating the searchTerm reactive property.
//		  If an update is pending, we cancel it and reschedule a new one in 300 ms.
//		  This delay reduces the number of Apex calls when the user is typing letters to form a word.
//		  Each new letter triggers a call to handleSearchTermChange but ideally,
//		 searchBears is only called once when the user has finished typing. This technique is called debouncing.
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}

	handleBearView(event) {
    		// Get bear record id from bearview event
    		const bearId = event.detail;
    		// Navigate to bear record page
    		this[NavigationMixin.Navigate]({
    			type: 'standard__recordPage',
    			attributes: {
    				recordId: bearId,
    				objectApiName: 'Bear__c',
    				actionName: 'view',
    			},
    		});
    	}

//    	We import a navigation mixin that bundles utility functions dealing with navigation. A mixin lets us add functionality to a class without extending it.
//    	 This is useful when a class already extends a parent class (a class can only extend a single parent).
//        Our class extends the navigation mixin applied to the LightningElement base class.
//        We handle the bearview event in the handleBearView function.
//         We extract the bear record id from the event detail and we use the navigation mixin to navigate to a bear record page.
}


// ----------IMPERATIVE APEX ----------------

//import { LightningElement } from 'lwc';
//import ursusResources from '@salesforce/resourceUrl/ursus_park';
///** BearController.getAllBears() Apex method */
//import getAllBears from '@salesforce/apex/BearController.getAllBears';
//export default class BearList extends LightningElement {
//	bears;
//	error;
//	appResources = {
//		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
//	};
//	connectedCallback() {
//		this.loadBears();
//	}
//	loadBears() {
//		getAllBears()
//			.then(result => {
//				this.bears = result;
//			})
//			.catch(error => {
//				this.error = error;
//			});
//	}
//}