/// <reference types="Cypress" />

describe('CAC TAT - AWS', () => {

    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      })

it('faz uma requisição HTTP 1', () => {

    cy.request('index.html')
        .then( response => {
        console.log(response)
        expect(response.status).to
        .equal(200)
        expect(response.statusText).to
        .equal('OK')
        expect(response.body).to.include('CAC TAT')             
          
    })

    cy.request('index.html')
    .its('body')
    cy.contains('#title', 'CAC TAT')
    .should('be.visible')
})

it('faz uma requisição HTTP 2', () => {

    cy.request('index.html')
    .should( response => {
        const {status, statusText, body} = response

        expect(status).to
        .equal(200)
        expect(statusText).to
        .equal('OK')
        expect(body).to
        .include('CAC TAT')
    })
})


})