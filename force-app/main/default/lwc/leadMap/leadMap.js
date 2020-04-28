import { LightningElement, track, wire, api } from 'lwc';
import searchLeads from '@salesforce/apex/LeadSearchController.searchLeads';

export default class leadMap extends LightningElement {
    @track markers;
    @track error;
    @track leads;

    // Private variable
    searchTerm;

    @api get searchInput() {
        return this.searchTerm;
    }

    set searchInput(value) {
        this.searchTerm = value;
    }


@wire(searchLeads, {
       searchTerm: '$searchInput'
    })
    loadLeads({ error, data }) {
        if (data) {
            console.log('value passed to apex method ' + this.searchTerm);
            console.log(data[0].State);
            this.leads = [];
            this.markers = [];
            this.leads = data;
			//each element relating to Street, State, City, PostalCode, title and Company of data array is mapped to the format within the return block
            this.markers = data.map(lead => {
                return {
                    location: {
                        Street: lead.Street,
                        State: lead.State,
                        City: lead.City,
                        PostalCode: lead.PostalCode
                    },
                    title: lead.Name,
                    description: {
                        Company: lead.Company
                    },
                    icon: 'utility:pinned'
                }
            })
            console.log('data in markers ' + this.markers[0].location.State);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.leads = undefined;
        }
        
        
    }
    
}