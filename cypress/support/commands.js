// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('PreencheCamposObrigatoriosEnviaFormulario', () => {
    cy.clock()
    const shortText = Cypress._.repeat('Feliz em ficar com papai! ',5) //repedição do texto da const shortText por 5 vezes
    cy.get('#firstName')
    .type('Théo')
    cy.get('#lastName')
    .type('Cruz')
    cy.get('#email')
    .type('theocruz@gmail.com')
    cy.get('#open-text-area')
    //.type(shortText,{delay: 10})
    .invoke('val', shortText)
    .should('have.value', shortText)
    cy.get('button[type="submit"')
    .click()
    //cy.get('.success')
    cy.contains('.success', 'Mensagem enviada com sucesso')
    .should('be.visible')
    .tick(3000)
    cy.contains('.success', 'Mensagem enviada com sucesso')
    .should('not.be.visible')
})
