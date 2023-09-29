import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


function checkLayout() {

  it('has layout changes', function() {
    cy.get('head link[rel="stylesheet"][href$="main.css"]')
    cy.get('footer blockquote span.byline')
    cy.get('footer p#page-copyright')
  })

}

describe('main.css', function() {
  it('has main.css', function() {
    cy.request(Cypress.env('root_url') + 'styles/main.css' )
  })
})

describe('index.html', function() {

  beforeEach(() => {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has stylesheet link', function() {
    cy.get('head link[rel="stylesheet"][href^="style"]')
    cy.get('head link[rel="stylesheet"][href$="main.css"]')
  })

  it('has footer author .byline', function() {
    cy.get('footer blockquote span.byline')
  })

  it('has footer #copyright', function() {
    cy.get('footer p#page-copyright')
  })

  it('has three sections in main', function() {
      cy.get('main > section').should('have.length', 3)
  })

  it('has bio section', function() {
    cy.get('main > section:first-child > h1')
    cy.get('main > section:first-child > p')
    cy.get('main > section:first-child > p')
  })
  
  it('has fav section', function() {
    cy.get('main > section:nth-child(2) > h2')
    cy.get('main > section:nth-child(2) > ol')
  })

  it('has haiku section', function() {
    cy.get('main > section:nth-child(3) > h2')
    cy.get('main > section:nth-child(3)  p')
  })

  it('has byline class in haiku section', function() {
    cy.get('main > section:nth-child(3) p span.byline')
  })

  it('has body bg color', function() {
    cy.get('body').should('have.css', 'background-color').and('not.match', to_regex('#fff'));
  })

  it('has heading color', function() {
    cy.get('h1').should('have.css', 'color').and('not.match', to_regex('#000'));
    cy.get('h2').should('have.css', 'color').and('not.match', to_regex('#000'));
  })

  it('has hyperlink color', function() {
    cy.get('footer a').should('have.css', 'color').and('not.match', /rgb\(0,\s*0,\s*2[345]\d\)/);
  })

  it('has different nav link color', function() {
    let mainColor = Cypress.$('footer a').css('color')
    cy.get('header nav a').should('have.css', 'color').and('not.match', to_regex(mainColor))
  })

  it('has transparent bylines', function() {
      cy.get('.byline').should('have.css', 'color').and('match', /rgba\(\d+,\s*\d+,\s*\d+,\s*0\.5\)/)
  })

  it('has #page-copyright color', function() {
      cy.get('#page-copyright').should('have.css', 'color').and('not.match', to_regex('#000'))
  })

  it('has inline style', function() {
    cy.get('h2 + p > span[style]')
  })

  it('has correct inline style', function() {
    let mainColor = Cypress.$('body').css('background-color')
    cy.get('h2 + p > span[style]').should('have.css', 'background-color')
      .and('not.match', to_regex(mainColor))
      .and('not.match', to_regex('#00000000'))
  })
})

describe('links.html', function() {

  beforeEach(() => {
    visit_page_using('links.html', 'macbook-13')
  })

  checkLayout()

  it('has section', function() {
    cy.get('main > section')
  })

  it('has section id', function() {
    cy.get('section#useful-links')
  })

  it('has new links', function() {
    cy.get('main ul li').should('have.length', 4)
  })

  it('links open in new window', function() {
    cy.get('main ul li a[target="_blank"]').should('have.length', 4)
  })

  it('has embedded style', function() {
    cy.get('style').contains(/#useful-links.*\s*a/)
  })

  it('has correct link style', function() {
    let mainColor = Cypress.$('footer a').css('color')
    cy.get('main ul a').should('have.css', 'color').and('not.match', to_regex(mainColor))
  })
})

describe('glossary.html', function() {

  beforeEach(() => { 
    visit_page_using('glossary.html', 'macbook-13')
  })

  checkLayout()
})

