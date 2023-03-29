/// <reference types="Cypress" />

//it.only - irá executar somente o teste com o método.

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {
       
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt exercitationem quaerat voluptatem omnis, asperiores fugit voluptate animi id, culpa laudantium doloribus cupiditate ex debitis. Ullam quisquam nesciunt eos eum vero a itaque accusamus ratione, assumenda perspiciatis enim earum deserunt voluptates maxime quasi delectus consectetur modi at necessitatibus suscipit, laborum ducimus.1'
       
        cy.get('#firstName').type('Théo') // # - busca pelo ID
        cy.get('#lastName').type('Cruz')
        cy.get('#email').type('theocruz@gmail.com')
        cy.get('#open-text-area').type(longText,{delay: 15}) // delay default é 10
        cy.get('button[type="submit"').click()
        cy.get('.success').should('be.visible')
  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
       
        cy.get('#firstName').type('Théo') // # - busca pelo ID
        cy.get('#lastName').type('Cruz')
        cy.get('#email').type('theocruzgmail.com')
        cy.get('#open-text-area').type('Feliz em ficar com papai!',{delay: 15}) // delay default é 10
        cy.get('button[type="submit"').click()
        cy.get('.error').should('be.visible')
  
    })

    it('campo telefone continua vazio quando digitado valor não númerico', function() {

        cy.get('#phone')
        .type('abcd')
        .should('have.value', '')

})


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário'
, function() {

    cy.get('#firstName').type('Théo') // # - busca pelo ID
    cy.get('#lastName').type('Cruz')
    cy.get('#email').type('theocruz@gmail.com')
    cy.get('#open-text-area').type('Feliz em ficar com papai!',{delay: 15}) // delay default é 10
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"').click()
    cy.get('span.error').should('be.visible')

})

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('[id=firstName]').type('Théo').
        should('have.value', 'Théo').
        clear().should('have.value','')
        
        cy.get('[id=lastName]').type('Cruz').
        should('have.value', 'Cruz').
        clear().should('have.value','')

        cy.get('[id=firstName]').type('theocruz@gmail.com')
        .should('have.value', 'theocruz@gmail.com')
        .clear().should('have.value','')

        cy.get('#phone')
        .type('33333333')
        .should('have.value', '33333333')
        .clear().should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function() {

        cy.get('button[type="submit"').click()
        cy.get('.error').should('be.visible')

    })

    it.only('envia o formuário com sucesso usando um comando customizado', function() {

        cy.PreencheFormulario()
        
    })

  })