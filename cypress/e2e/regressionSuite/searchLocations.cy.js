import {
    launchChatWidget
} from '../../support/helpers/navigation';
import {
    selectLocationsModalLocator, legal
} from '../../support/constants';

describe('Search Locations modal', () => {
    
    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
        launchChatWidget();
    });

    it('should allow to enter a zip code and display the locations', () => {
        // Verify header and terms link
        cy.switchToMainIframe()
            .contains('Select Location')
            .should('be.visible')
            .parents(selectLocationsModalLocator)
            .contains(legal.linkText)
            .should('be.visible')
            .and('have.attr', 'href', legal.linkUrl)
            .and('have.attr', 'target', '_blank')
        // Clear the default zip code using the 'x' icon and verify zip code is blank
            .parents(selectLocationsModalLocator)
            .find('button.SearchInput__Reset')
            .click()
        cy.switchToMainIframe()
            .find('input[name="Search Locations"]')
            .should('be.visible')
            .and('have.value', '')
        // Type another valid zip code and verify the number of stores populated
            .type('78701')
            .should('have.value', '78701')
            .parents(selectLocationsModalLocator)
            .find('div.LocationItemsContainer')
            .should('be.visible')
            .children()
            .should('have.length', 3);
    });
})