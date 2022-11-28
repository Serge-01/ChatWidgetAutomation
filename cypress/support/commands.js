// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

import { mainWidgetIframeLocator } from './constants';

Cypress.Commands.add('switchToMainIframe', () => {
    return cy
        .get(mainWidgetIframeLocator)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
});

Cypress.Commands.add('switchToIframe', (iframeSelector) => {
    return cy
        .get(iframeSelector)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
});
