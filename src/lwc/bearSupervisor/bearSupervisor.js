/**
 * Created by boprisan on 6/23/2022.
 */

import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Bear object fields
import SUPERVISOR_FIELD from '@salesforce/schema/Bear__c.Supervisor__c'; // importing the field via a schema import ensures referential integrity
const bearFields = [SUPERVISOR_FIELD];
export default class BearSupervisor extends LightningElement {
	@api recordId; // Bear Id
	@wire(getRecord, { recordId: '$recordId', fields: bearFields })
  bear;
	get supervisorId() {
		return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
	}
}