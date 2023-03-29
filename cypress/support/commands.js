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

    const longText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt exercitationem quaerat voluptatem omnis, asperiores fugit voluptate animi id, culpa laudantium doloribus cupiditate ex debitis. Ullam quisquam nesciunt eos eum vero a itaque accusamus ratione, assumenda perspiciatis enim earum deserunt voluptates maxime quasi delectus consectetur modi at necessitatibus suscipit, laborum ducimus.1'
    cy.get('#firstName').type('Théo')
    cy.get('#lastName').type('Cruz')
    cy.get('#email').type('theocruz@gmail.com')
    cy.get('#open-text-area').type(longText,{delay: 10})
    cy.get('button[type="submit"').click() // tag button que possui o type igual a submit. No caso de uso da classe button, seria '.button'
    cy.get('.success').should('be.visible')
})
