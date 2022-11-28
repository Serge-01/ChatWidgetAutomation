export function verifySendButtonIs(state) {
    cy.switchToMainIframe()
        .find('button.SendButton')
        .invoke('attr', 'class')
        .then(classAttr => {
            expect(classAttr).to.contain(`SendButton--${state}`);
        });
}