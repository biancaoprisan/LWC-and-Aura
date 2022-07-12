import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Set Bear object fields
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
const bearFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD
];  // list of hardcoded field names
export default class BearLocation extends LightningElement {
  @api recordId; // automatically receives the current record id
  name;
  mapMarkers = [];
  @wire(getRecord, { recordId: '$recordId', fields: bearFields }) //the params are the recordId and the fields that we wish to retrieve
  loadBear({ error, data }) { // thanks to @wire decorator, loadBear is automatically called when the component is loaded or when the record id changes
    if (error) {
      
    } else if (data) {
      // Get Bear data
      this.name =  getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform bear data into map markers
      this.mapMarkers = [{
        location: { Latitude, Longitude },
        title: this.name,
        description: `Coords: ${Latitude}, ${Longitude}`
      }];
    }
  }
  get cardTitle() {
    return (this.name) ? `${this.name}'s location` : 'Bear location';
  }
}