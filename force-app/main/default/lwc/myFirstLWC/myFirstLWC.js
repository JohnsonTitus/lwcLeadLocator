import { LightningElement, track } from 'lwc';

export default class MyFirstLWC extends LightningElement {
    //track decorator are to declare the property as private
	//both searchTerm and searchInput has the keyword
	//value entered by the user
	@track searchTerm;
    @track searchInput;
    @track searchComplete = false;


    handleNewSearch(event) {
        this.searchTerm = event.target.value; 
    }

    handleSearchComplete(event) {
        this.searchInput = event.detail;
        this.searchComplete = true;
}


}
