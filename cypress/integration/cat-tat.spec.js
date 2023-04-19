/// <reference types="Cypress" />

//it.only - irá executar somente o teste com o método.
//it.skip - ignora o teste

describe('CAC    TAT', () => {

    const tresMiliSegundos = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {
       
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt exercitationem quaerat voluptatem omnis, asperiores fugit voluptate animi id, culpa laudantium doloribus cupiditate ex debitis. Ullam quisquam nesciunt eos eum vero a itaque accusamus ratione, assumenda perspiciatis enim earum deserunt voluptates maxime quasi delectus consectetur modi at necessitatibus suscipit, laborum ducimus.1'
        
        cy.clock()

        cy.get('#firstName')
        .type('Théo') // # - busca pelo ID
        cy.get('#lastName')
        .type('Cruz')
        cy.get('#email')
        .type('theocruz@gmail.com')
        cy.get('#open-text-area')
        .type(longText,{delay: 10}) // delay default é 10
        cy.get('button[type="submit"')
        .click()  // tag button que possui o type igual a submit. No caso de uso da classe button, seria '.button'

        cy.get('.success')
        .should('be.visible')
      
        .tick(tresMiliSegundos)
        
        cy.get('.success')
        .should('not.be.visible')
  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()
        cy.get('#firstName')
        .type('Théo') // # - busca pelo ID
        cy.get('#lastName')
        .type('Cruz')
        cy.get('#email')
        .type('theocruzgmail.com')
        cy.get('#open-text-area')
        .type('Feliz em ficar com papai!',{delay: 30}) // delay default é 10
        cy.contains('button', 'Enviar')
        .click()
        cy.contains('.error', 'Valide os campos obrigatórios!')
        .should('be.visible')
        .tick(3000)
        cy.contains('.error', 'Valide os campos obrigatórios!')
        .should('not.be.visible')  
    })

    it('campo telefone continua vazio quando digitado valor não númerico', function() {

        cy.get('#phone')
        .type('abcd')
        .should('have.value', '')

    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.clock()
    cy.get('#firstName')
    .type('Théo') // # - busca pelo ID
    cy.get('#lastName')
    .type('Cruz')
    cy.get('#email')
    .type('theocruz@gmail.com')
    cy.get('#open-text-area')
    .type('Feliz em ficar com papai!',{delay: 15}) // delay default é 10
    cy.get('#phone-checkbox')
    .check()
    cy.get('button[type="submit"')
    .click()
    //cy.get('span.error')
    cy.contains('.error', 'Valide os campos obrigatórios!')
    .should('be.visible')
    .tick(3000)
    cy.contains('.error', 'Valide os campos obrigatórios!')
    .should('not.be.visible')
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
        cy.clock()
        cy.get('button[type="submit"')
        .click()
        cy.contains('.error', 'Valide os campos obrigatórios!')
        .should('be.visible')
        .tick(3000)
        cy.contains('.error', 'Valide os campos obrigatórios!')
        .should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {

        cy.PreencheCamposObrigatoriosEnviaFormulario()
        
    })

    //Campos de seleção suspensa

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('select').select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('select').select(1)
        .should('have.value', 'blog')

    })

    Cypress._.times(10, () => {    // repete a função por N indicado no primeiro argumento da função .times()
        
        it('seleciona um produto de forma aleatória',  () => {

        cy.get('select option')
        .its('length', {log: false})
        .then( n => { // 'select option' - seleciona todas as options presentes no select
        cy.get('select')
        .select(Cypress._.random(1, n - 1)) // apresentava erro quando acessava o indice 0. Foi colocada para iniciar a partir do indice 1
       })  
      
        })
    })

    //Input do tipo radio

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]').check('feedback') //cy.get('input[type="radio"][value="feedback"').check() - seletor já localiza pelo value
        .should('be.checked')
    })

    it('marca cada tipo de atendimento 1', () => {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(  // iteração por um array quando cy.get retorna mais de um mesmo tipo de elemento.
            radio => {
        cy.wrap(radio).check() // wrap - "empacota" algo para usar mais adiante
        //cy.wrap(radio)
        .should('be.checked')
        })
    })

    it('marca cada tipo de atendimento 2', () => {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .check()
        .should('be.checked')
    })

    //Input do tipo checkbox

    it('marca ambos checkboxes, depois desmarca o último 1', () => {
        cy.get('input[type="checkbox"]')
        .should('have.length',2)
        .each(
            checkbox => {
        cy.wrap(checkbox)
        .check()   
        .should('be.checked')             
            })
        cy.get('input[type="checkbox"]').last() // retorna o último elemento do tipo indicado no cy.get()
        .uncheck()  
        .should('not.be.checked')  // verifica que o campo não está marcado.
    })

    it('marca ambos checkboxes, depois desmarca o último 2', () => {
        cy.get('input[type="checkbox"]')
        .should('have.length',2)
        .check()
        .should('be.checked')
        .last()
        .uncheck()  
        .should('not.be.checked')  // verifica que o campo não está marcado.
    })

    // upload de arquivos

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(input => { // pode ser usado o .then()
        //console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .then(input => {
        //console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json',{encoding: null}).as('arquivoExemplo')
        cy.get('input[type="file"]')
        .selectFile('@arquivoExemplo')
        .then(input => {
        //console.log(input)
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    // lidando com links em nova aba

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        //cy.get('#privacy a ')
        cy.get('a[href="privacy.html"]')
        .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link 1', () => {
        cy.get('a[href="privacy.html"]').as('privacyPage')
        .invoke('removeAttr', 'target')
        .should('not.have.attr','target')
        cy.get('@privacyPage')
        .click()
        cy.get('h1[id="title"]')
        .should('have.text', 'CAC TAT - Política de privacidade')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link 2', () => {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
        .should('be.visible')       

    })

    // invoke('show'), invoke('hide')

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('encontra o gato escondido', () => {
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        /*cy.get('#title')
        .invoke('text', 'GALO FORTE E VINGADOR')
        cy.get('#subtitle')
        .invoke('text', 'CAMPEÃO DOS CAMPEÕES')*/
        

    })

  })