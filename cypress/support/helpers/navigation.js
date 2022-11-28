import { contantButtonIframeLocator, openCloseChatWidgetLocator } from '../constants';

export function launchChatWidget() {
    cy.switchToIframe(contantButtonIframeLocator)
        .find(openCloseChatWidgetLocator)
        .click();
}

export function closeChatWidget() {
    cy.switchToIframe(contantButtonIframeLocator)
        .find(openCloseChatWidgetLocator)
        .click();
}

export function selectNarniaStoreAndOpenMessageForm() {
    cy.switchToMainIframe()
        .find('form.SearchInput')
        .clear().type('78701')
        .parents('div.LocationSelector')
        .contains('Scoreboard Sports - Narnia')
        .click();
}