import {
    launchChatWidget, selectNarniaStoreAndOpenMessageForm,
    closeChatWidget
} from '../../support/helpers/navigation';
import {
    mainWidgetIframeLocator, backToLocationsButtonLocator,
    messageModalLocator, nameInputFieldLocator,
    phoneNumberInputFieldLocator, textMessageFieldLocator,
    stores, introMessage, legal
} from '../../support/constants';
import {
    verifySendButtonIs
} from '../../support/helpers/assertions';

describe('WebChat form fields and functionality', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
        launchChatWidget();
        selectNarniaStoreAndOpenMessageForm();
    });

    it('should open the webchat form and display the correct info', () => {
        // Verify correct store name, intro message text and date
        // *currently date is hardcoded, but we could dynamically check it if needed
        // Verify terms link and that store name is present in the "legal text"
        cy.switchToMainIframe()
            .find(messageModalLocator)
            .find('h1')
            .should('have.text', stores.Narnia.name)
            .parents(messageModalLocator)
            .find(introMessage.locator)
            .should('contain', introMessage.textAndDate)
            .parents(messageModalLocator)
            .find(legal.consentTextLocator)
            .should('contain', stores.Narnia.name)
            .parents(messageModalLocator)
            .contains(legal.linkText)
            .and('have.attr', 'href', legal.linkUrl)
            .and('have.attr', 'target', '_blank')

            verifySendButtonIs('incomplete');  // Disabled
    });

    it('should fill out the name and phone fields correctly', () => {
        // Fill out name > verify text value and that checkmark is displayed
        cy.switchToMainIframe()
            .find(nameInputFieldLocator)
            .clear().type('Tester')
            .should('have.value', 'Tester')
            .parents('.TextInput')
            .find('svg.checkmark')
            .should('be.visible')
        // Fill out phone number > verify value, and that flag and checkmark are displayed
            .parents(messageModalLocator)
            .find(phoneNumberInputFieldLocator)
            .clear().type('5125506677')
            .should('have.value', '(512) 550-6677')
            .parent('.TextInput')
            .find('img.flag-svg')
            .should('be.visible')
            .parents('.TextInput')
            .find('svg.checkmark')
            .should('be.visible');
    });

    it('should fill out the message field and properly notify about remaining chars', () => {
        // Fill out message > verify text value
        cy.switchToMainIframe()
            .find(textMessageFieldLocator)
            .clear().type('Hello! I need help!')
            .should('have.value', 'Hello! I need help!')
            // Fill out message with 280 chars and notify that 20 chars remaining
            .clear().type(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas`)
            .parents('div.SendSmsPage__FormContent')
            .find('div.message-char-count')
            .find('text')
            .should('have.text', '20')
            // Add 20 more chars and notify that 0 chars remaining
            .parents('div.SendSmsPage__FormContent')
            .find(textMessageFieldLocator)
            .type('sa quis enim. Donec.')
            .parents('div.SendSmsPage__FormContent')
            .find('div.message-char-count')
            .find('text')
            .should('have.text', '0')
            // Ideally the message field should not allow a user to enter more than max number of chars which is currently 300,
            // but since it allows more than 300 I didn't write additional test cases to verify this behavior.
            .parents('div.SendSmsPage__FormContent')
            .find(textMessageFieldLocator)
            .clear(); // To clear thear the state for next tests
    });

    it('should NOT allow to submit a form with empty fields and should display a proper error message', () => {
        cy.switchToMainIframe()
            .find('button.SendButton')
            .click();
        verifySendButtonIs('invalid');
        
        // Verify error messages for each field
        cy.switchToMainIframe()
            .find(nameInputFieldLocator)
            .parent('.TextInput--invalid')
            .find('div.TextInput__TextInputError')
            .should('have.text', 'Name is required')
            .parents(messageModalLocator)
            .find(phoneNumberInputFieldLocator)
            .parent('.TextInput--invalid')
            .find('div.TextInput__TextInputError')
            .should('have.text', 'Mobile phone is required')
            .parents(messageModalLocator)
            .find(textMessageFieldLocator)
            .parent('.TextInput--invalid')
            .find('div.TextInput__TextInputError')
            .should('have.text', 'Message is required');
    });

    it('should close the chat window', () => {
        cy.get(mainWidgetIframeLocator)
            .should('be.visible');
        closeChatWidget();
        cy.get(mainWidgetIframeLocator)
            .should('not.exist');
    });

    // This test case currently fails when executed manually
    it('should use the Back arrow to navigate to the Search result page', () => {
        cy.switchToMainIframe()
            .find(backToLocationsButtonLocator)
            .click();
        cy.switchToMainIframe()
            .find('div.LocationItemsContainer')
            .should('be.visible');
    })
});