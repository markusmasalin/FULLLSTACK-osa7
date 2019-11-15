describe('Blog ', function() {
  beforeEach(function() {
    
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Markus Masalin',
      username: 'mmasalin',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.contains('login')
    cy.get('input:first')
      .type('mmasalin')
    cy.get('input:last')
      .type('salainen')
    cy.contains('login')
      .click()

  })
    it('user can login', function () {

    
    cy.contains('Markus Masalin logged in')
  
    cy.contains('create')
      .click()
    cy.get('#title')
      .type('a blog created by cypress')
    cy.get('#author')
      .type('cypress')
    cy.get('#url').type('https://skintdad.co.uk/')
    cy.get('#createButton')
      .click()
    cy.contains('cypress')
  })

  it('find a user', function () {
    cy.contains('users')
      .click()

    cy.contains('Markus Masalin')
      
    
 
    })


})