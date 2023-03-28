/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
  })

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
       
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
       
        cy.get('[id=firstName]').type('Théo')
        cy.get('[id=lastName]').type('Cruz')
        cy.get('[id=email]').type('theocruz@gmail.com')
        cy.get('[id=open-text-area]').type('Nada! Sou feliz com meu Papai',{delay: 15})
        cy.contains('Enviar').should('have.class', 'button').click()
        cy.get('span.success').should('be.visible')
  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
       
        cy.contains('Enviar').should('have.class', 'button').click()
        cy.get('span.error').should('be.visible')
  
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário'
, function() {

    cy.get('input#phone-checkbox').check()
    cy.contains('Enviar').should('have.class', 'button').click()
    cy.get('span.error').should('be.visible')

})

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('[id=firstName]').type('Théo').
        should('have.value', 'Théo').
        clear().should('have.value','')
        
        cy.get('[id=lastName]').type('Cruz').
        should('have.value', 'Cruz').
        clear().should('have.value','')

        cy.get('[id=firstName]').type('theocruz@gmail.com').
        should('have.value', 'theocruz@gmail.com').
        clear().should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function() {

        cy.contains('Enviar').should('have.class', 'button').click()
        cy.get('span.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {

        cy.PreencheFormulario()
        
    })

  })