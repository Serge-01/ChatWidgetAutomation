import {
    launchChatWidget, selectNarniaStoreAndOpenMessageForm
} from '../../support/helpers/navigation';
import {
    nameInputFieldLocator, phoneNumberInputFieldLocator,
    textMessageFieldLocator
} from '../../support/constants';
import {
    verifySendButtonIs
} from '../../support/helpers/assertions';

describe('Smoke test the webchat widget flow', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
    });

    it('should fill out the form successfully and enable the Send button', () => {
        // Verify the correct message on the landing page
        cy.get('h1')
            .should('have.text', 'All we have to decide is what to do with the time that is given us.');
        // Fill out the form
        launchChatWidget();
        selectNarniaStoreAndOpenMessageForm();
        cy.switchToMainIframe()
            .find(nameInputFieldLocator)
            .clear().type('Tester')
            .parents('form.SendSmsPage__MainContent')
            .find(phoneNumberInputFieldLocator)
            .clear().type('5125506677')
            .parents('form.SendSmsPage__MainContent')
            .find(textMessageFieldLocator)
            .clear().type('Hello! I need help!');
        verifySendButtonIs('valid'); // Enabled
        
        // Clear the message field as it persist into the next test
        cy.switchToMainIframe()
            .find(textMessageFieldLocator)
            .clear();
    });

    it('should NOT enable the Send button until the form is complete', () => {
        launchChatWidget();
        selectNarniaStoreAndOpenMessageForm();
        verifySendButtonIs('incomplete'); // Disabled

        // Fill out the Name and Phone fields, but not the Message field
        cy.switchToMainIframe()
            .find(nameInputFieldLocator)
            .clear().type('Tester')
            .parents('form.SendSmsPage__MainContent')
            .find(phoneNumberInputFieldLocator)
            .clear().type('5125506677');

        verifySendButtonIs('incomplete'); // Still disabled
    });
});