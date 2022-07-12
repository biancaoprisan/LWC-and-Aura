/**
 * Created by boprisan on 6/23/2022.
 */

import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park'

export default class BearTile extends LightningElement {
    @api bear;  // exposes the bear property to any parent component
    appResources = {
        bearSilhouette : `${ursusResources}/standing-bear-silhouette.png`,
    };

//The handleOpenRecordClick function is called when a user clicks on the open record button of a bear tile.
//The function creates and fires a custom bearview event that holds the bear record id.
    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('bearview',{
            detail: this.bear.Id
        });
        console.log("this is here");
        this.dispatchEvent(selectEvent);
    }


}