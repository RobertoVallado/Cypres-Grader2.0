import {
    visit_page_using
  } from '../../../support/grader-helpers.js'

  describe('Figure', function() {
    

    beforeEach(() => {
      visit_page_using('index.html', 'macbook-13')
    })
    
    it('has figure', () => {
      cy.get('h2 + figure img')
    })

    it('has figcaption', () => {
      cy.get('figure > figcaption').should('exist').and('not.be.empty')
    })
  
  })
  

  describe('Mugshot', function() {

    beforeEach(() => {
      visit_page_using('index.html', 'macbook-13')
    })

    it('has clickable mugshot', () => {
      cy.get('h1 + a > img')
    })

    it('uses web-ready thumbnail', function() {
      let thumbFilename = Cypress.$('h1 + a img').attr('src')
      
      cy.request(Cypress.env('root_url') + thumbFilename).then((thumbResponse) => {
          expect(parseInt(thumbResponse.headers['content-length']))
              .to.be.lessThan(80000)
      })
    })

    it('uses web-ready main image', function() {
      let fullFilename = Cypress.$('h1 + a').attr('href')
      
      cy.request(Cypress.env('root_url') + fullFilename).then((fullResponse) => {
          expect(parseInt(fullResponse.headers['content-length']))
              .to.be.lessThan(600000)
      })
    })

    it('has correct sizes attr', () => {
      cy.get('h1 + a > img').should('have.attr', 'sizes').and('match', /\(\s*max-width\s*:\s*500px\s*\)\s+150px\s*,\s*300px/)
    })
    
    it('has correct srcset attr', () => {
      cy.get('h1 + a > img')
        .should('have.attr', 'srcset')
        .and('match', /(images?|img)\/.+\.(jpg|jpeg|png)\s+150w/i)
        .and('match', /(images?|img)\/.+\.(jpg|jpeg|png)\s+300w/i)
        .and('match', /150w\s*,|300w,\s*/i)
    })

    it('has alt text', function() {
      cy.get('h1 + a img').should('have.attr', 'alt').and('not.be.empty')
    })
    
  })
    

  describe('Logo', function() {

    beforeEach(() => {
      visit_page_using('index.html', 'macbook-13')
    })

    it('has logo <picture> as last child of <footer>', () => {
      cy.get('footer > picture:last-child').should('exist')
    })

    it('has svg source', () => {
      cy.get('footer > picture:last-child > source').should('have.attr', 'type').and('equal', 'image/svg+xml')
      cy.get('footer > picture:last-child > source').should('have.attr', 'srcset').and('match', /sc-logo.svg/)
    })

    it('has img fallback', () => {
      cy.get('footer > picture:last-child > img').should('have.attr', 'src').and('match', /sc-logo.png/)
    })

    it('has 70px width', () => {
      cy.get('footer > picture:last-child > img[width="70"]')
    })

    it('has alt text', function() {
      cy.get('footer > picture:last-child > img').should('have.attr', 'alt').and('not.be.empty')
    })

    it('has correct srcset', () => {
      cy.get('footer > picture:last-child > img')
        .should('have.attr', 'srcset')
        .and('match', /(.*(images?|img)\/(sc-logo\/)?sc-logo(@1\.5x|@2x)?\.png){3}/i)
        .and('match', /(.*x\s*){2}/i)

      cy.get('footer > picture:last-child > img').should('not.have.attr', 'sizes')
    })


  })

  describe('Audio', function() {

    beforeEach(() => {
      visit_page_using('index.html', 'macbook-13')
    })

    it('has level-3 heading', () => {
      cy.get('main > h3').invoke('text').should('match', /audio ?book/i)
    })

    it('has audio element', () => {
      cy.get('main > audio')
    })

    it('has controls', () => {
      cy.get('main > audio[controls]')
    })

    it('has librivox src', () => {
      let src = Cypress.$('main > audio').attr('src')
      let source = Cypress.$('main > audio > source').attr('src')

      expect(/librivox/i.test(src) || /librivox/i.test(source)).to.equal(true)
    })

    it('has correct fallback link', () => {
      let href = Cypress.$('main > audio a').attr('href')

      expect(href).to.not.equal(undefined)
    })

    it('has appropriate fallback link text', () => {
      throw new Error("Check this")
    })

  })


  describe('YouTube video', function() {

    beforeEach(() => {
      visit_page_using('index.html', 'macbook-13')
    })

    it('has level-3 heading', () => {
      cy.get('main > h3:last-of-type').should('contain', 'Video')
    })

    it('has iframe element', () => {
      cy.get('main > h3:last-of-type + iframe[src*="youtube"]')
    })

  })