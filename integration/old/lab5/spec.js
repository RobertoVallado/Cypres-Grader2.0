import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


function checkLayout() {

  it('has layout changes', function() {
  })

}

describe('Mugshot', function() {

  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('and all elements have border-box box sizing', function() {
      var el = Cypress.$('<address>')
      Cypress.$('body').append(el)
      cy.wrap(el).should('have.css', 'box-sizing').and('equal', 'border-box');
  })

  it('paperclip image is in images folder', function() {
      cy.request(Cypress.env('root_url') + 'images/paperclip.png' )
  })

  it('has paperclip as first child', function() {
      cy.get('.mugshot > .paperclip:first-child')
  })

  it('has paperclip background image', function() {
    cy.get('.paperclip').should('have.css', 'background-image').and('match', /paperclip\.png/)
  })

  it('has correct url for paperclip background image', function() {
    var bg = Cypress.$('.paperclip').css('background-image').replace(/^url\("?/, "").replace(/"?\)$/, "")
    cy.request(bg)
  })

  it('has correct paperclip dimensions', function() {
      cy.get('.paperclip').should('have.css', 'width').and('equal', '50px')
      cy.get('.paperclip').should('have.css', 'height').and('equal', '50px')
  })

  it('has paperclip background-size: contain', function() {
      cy.get('.paperclip').should('have.css', 'background-size').and('equal', 'contain')  
  })

  it('has absolute position for paperclip', function() {
      cy.get('.paperclip').should('have.css', 'position').and('equal', 'absolute')
  })

  it('has paperclip positioned relative to mugshot', function() {
      cy.get('.mugshot').should('have.css', 'position').and('not.equal', 'static')
  })

  it('has correct paperclip position', function() {
     cy.get('.paperclip').should('have.css', 'top').and('match', /-(9|10|11)px/) 
     cy.get('.paperclip').should('have.css', 'right').and('match', /-[678]px/) 
  })

  it('floats right', function() {
      cy.get('.mugshot').should('have.css', 'float').and('equal', 'right')
  })

  it('has relative position', function() {
      cy.get('.mugshot').should('have.css', 'position').and('equal', 'relative')
  })

  it('has correct relative position', function() {
      cy.get('.mugshot').should('have.css', 'top').and('equal', '-16px')
  })

  it('is cleared by next section', function() {
      cy.get('section:nth-child(2)').should('have.css', 'clear').and('match', /both|right/)
  })

})

describe('Header', function() {
  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has right-floated ul', function() {
      cy.get('header ul').should('have.css', 'float').and('equal', 'right')
  })

  it('has left-floated ul lis', function() {
      cy.get('header ul > li').should('have.css', 'float').and('equal', 'left')
  })

  it('has overflow on nav', function() {
      cy.get('header nav').should('have.css', 'overflow').and('not.equal', 'visible')
  })

  it('has 4px solid translucent top border', function() {
      cy.get('header').should('have.css', 'border-top-width').and('equal', '4px')
      cy.get('header').should('have.css', 'border-top-style').and('equal', 'solid')
      cy.get('header').should('have.css', 'border-top-color').and('match', to_regex('rgba(0,0,0,0.1)'))

      cy.get('header').should('have.css', 'border-bottom-width').and('equal', '0px')
  })

  it('has -2em left/right margins', function() {
      cy.get('header').should('have.css', 'margin').and('equal', '0px -32px')
  })

  it('has 2em left/right margins on nav', function() {
      cy.get('header nav').should('have.css', 'margin-left').and('equal', '32px')
      cy.get('header nav').should('have.css', 'margin-right').and('equal', '32px')
  })  

  it('has 1px dotted bottom border on nav', function() {
      cy.get('header nav').should('have.css', 'border-bottom-width').and('equal', '1px')
      cy.get('header nav').should('have.css', 'border-bottom-style').and('equal', 'dotted')
      cy.get('header nav').should('have.css', 'border-bottom-color').and('match', to_regex('rgba(0,0,0,0.3)'))
  })

  it('has correct nav link selector', function() {
      cy.get('header a').should('have.css', 'padding-top').and('equal', '16px')
      cy.get('header a').should('have.css', 'padding-bottom').and('equal', '8px')

      var el = Cypress.$('<a href="https://www.saultcollege.ca">Sault College</a>')
      Cypress.$('body').append(el)
      cy.wrap(el).should('have.css', 'padding-top').and('not.equal', '16px');
      cy.wrap(el).should('have.css', 'padding-bottom').and('not.equal', '8px');
  })

  it('has correct hyperlink padding', function() {
      cy.get('header a').should('have.css', 'padding-top').and('equal', '16px')
      cy.get('header a').should('have.css', 'padding-bottom').and('equal', '8px')
  })

  it('has correct hyperlink margin', function() {
      cy.get('header a').should('have.css', 'margin').and('equal', '0px 16px')
  })

  it('has correct hyperlink display', function() {
      cy.get('header a').should('have.css', 'display').and('equal', 'block')
  })

  it('has hyperlink hover', function() {
      var css = Cypress.$('link[href$="main.css"]').attr('href')
      cy.request(Cypress.env('root_url') + css).then( response => {
        expect(response.body).to.match(/(header\s*>?\s*)?(nav)?\s*>?\s*(ul)?\s*>?\s*(li)?\s*>?\s*a:hover/)
      })
  })

  it('has default transparent border on nav', function() {
      cy.get('header a').should('have.css', 'border-top-width').and('equal', '4px')
      cy.get('header a').should('have.css', 'border-top-style').and('equal', 'solid')
      cy.get('header a').should('have.css', 'border-top-color').and('match', /rgba\(.*0\)/)
  })

  it('has -4px top margin on nav', function() {
      cy.get('header nav').should('have.css', 'margin-top').and('equal', '-4px')
  })

})

describe('Back-to-top Link', function() {

  beforeEach(function() { visit_page_using('index.html', 'macbook-13') })

  it('has target on on all pages', function() {
      cy.get('header#top')

      visit_page_using('links.html', 'macbook-13')
      cy.get('header#top')

      visit_page_using('glossary.html', 'macbook-13')
      cy.get('header#top')
  })

  it('exists on on all pages', function() {
      cy.get('.back-to-top')

      visit_page_using('links.html', 'macbook-13')
      cy.get('.back-to-top')

      visit_page_using('glossary.html', 'macbook-13')
      cy.get('.back-to-top')
  })

  it('is last child of width-wrap', function() {
      cy.get('.width-wrap > .back-to-top:last-child')
  })

  it('has hyperlink to target', function() {
      cy.get('.back-to-top>a[href="#top"]')
  })

  it('has correct hyperlink text', function() {
      cy.get('.back-to-top>a').contains("◤")
  })

  it('has right-aligned container', function() {
      cy.get('.back-to-top').should('have.css', 'text-align').and('equal', 'right')
  })

  it('has -0.5em right margin on container', function() {
      cy.get('.back-to-top').should('have.css', 'margin-right').and('equal', '-8px')
  })

  it('has 50% transparent container', function() {
      cy.get('.back-to-top').should('have.css', 'opacity').and('equal', '0.5')
  })

  it('has no transparency on hover', function() {
      var css = Cypress.$('link[href$="main.css"]').attr('href')
      cy.request(Cypress.env('root_url') + css).then( response => {
        expect(response.body).to.match(/\.back-to-top:hover/)
      })
  })

  it('has hyperlink with fixed position', function() {
      cy.get('.back-to-top>a').should('have.css', 'position').and('equal', 'fixed')
  })

  it('has hyperlink with correct fixed position', function() {
      cy.get('.back-to-top>a').should('have.css', 'bottom').and('equal', '56px')
  })

})