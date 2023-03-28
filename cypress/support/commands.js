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

Cypress.Commands.add('PreencheFormulario', () => {
    cy.get('[id=firstName]').type('Théo')
    cy.get('[id=lastName]').type('Cruz')
    cy.get('[id=email]').type('theocruz@gmail.com')
    cy.get('[id=open-text-area]').type('Nada! Sou feliz com meu Papai',{delay: 15})
    cy.get('button').should('have.class', 'button').click()
    cy.get('span.success').should('be.visible')
})
