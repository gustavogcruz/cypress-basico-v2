/// <reference types="Cypress" />

describe('CAC TAT - Política de privacidade', () => {

    beforeEach(() => {
        cy.visit('./src/privacy.html')
      })

it('testa a página da política de privacidade de forma independente 1', () => {
    cy.get('h1[id="title"]')
    .should('have.text', 'CAC TAT - Política de privacidade')
    
})

it('testa a página da política de privacidade de forma independente 2', () => {
    cy.get('.privacy')
    cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
    .should('be.visible') 
})


})
