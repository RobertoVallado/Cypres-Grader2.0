import {
  visit_page_using
} from '../../../support/grader-helpers.js'

function checkLayout() {

  it('has correct layout', function() {
    cy.title().should('match', /csd120 website/i)
    cy.get('header ~ main')
    cy.get('main ~ footer')
    cy.get('header nav ul > li a[href="index.html"]')
    cy.get('header nav ul > li a[href="glossary.html"]')
    cy.get('header nav ul > li a[href="links.html"]')
    cy.get('footer p').contains('©');
    cy.get('footer a').should('exist').should('not.be.empty')
  })
}

describe('index.html', function() {

  beforeEach(() => {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has title', function() {
      cy.title().should('match', /csd120 website/i)
  })

  it('has header element', function() {
    cy.get('header')
  })

  it('has main element', function() {
    cy.get('main')
  })
  
  it('has footer element', function() {
    cy.get('footer')
  })

  it('has header, main, footer in correct order', function() {
    cy.get('header ~ main')
    cy.get('main ~ footer')
  })

  it('has nav inside header', function() {
    cy.get('header nav')
  })

  it('has ul inside header nav', function() {
    cy.get('header nav ul')
  })

  it('has list item inside header nav', function() {
    cy.get('header nav ul > li')
  })

  it('has hyperlink inside header nav', function() {
    cy.get('header nav ul > li a')
  })

  it('has correct nav links', function() {
    cy.get('header nav ul > li a[href="index.html"]')
    cy.get('header nav ul > li a[href="glossary.html"]')
    cy.get('header nav ul > li a[href="links.html"]')
  })

  it('has main h1', function() {
    cy.get('main h1')
  })

  it('has main h1 content', function() {
    cy.get('main h1').should('not.be.empty')
  })

  it('has 2 paragraphs', function() {
    cy.get('main p').should('have.length.at.least', 2).should('not.be.empty')
  })

  it('has paragraphs in main after heading', function() {
    cy.get('main h1 ~ p')
  })

  it('has h2', function() {
    cy.get('main h2').should('not.be.empty')
  })

  it('has h2 in main after paragraphs paragraphs', function() {
    cy.get('main p ~ h2')
  })

  it('has ol in main', function() {
    cy.get('main ol')
  })

  it('has ol after h2', function() {
    cy.get('main h2 + ol')
  })

  it('has 3 ol items', function() {
    cy.get('main ol > li').should('have.length.at.least', 3).should('not.be.empty')
  })

  it('has second h2', function() {
    cy.get('main h2 ~ h2')
  })

  it('has haiku h2', function() {
    cy.get('main h2').contains(/haiku/i)
  })

  it('has paragraph after h2', function() {
    cy.get('main h2 + p')
  })

  it('has linebreaks in haiku', function() {
    cy.get('main h2 + p br').should('have.length.at.least', 2)
  })

  it('has emphasised haiku author line', function() {
    cy.get('main em').contains(/by/i)
  })

  it('has strong haiku author', function() {
    let s = Cypress.$('main em strong')
    let b = Cypress.$('main em b')

    if ( s.length != 0 ) {
      cy.get('main em strong').should('exist').should('not.be.empty').should('not.contain', 'by')
    } else if ( b.length != 0 ) {
      cy.get('main em b').should('exist').should('not.be.empty').should('not.contain', 'by')
    } else {
      throw new Error("Could not find 'main em strong' or 'main em b'")
    }
  })

  it('has <hr>', function() {
    cy.get('hr')
  })

  it('has <hr> as first child of footer', function() {
    cy.get('footer > hr:first-child')
  })

  it('has footer blockquote', function() {
    cy.get('footer blockquote')
  })

  it('has blockquote attribution linebreak', function() {
    cy.get('footer blockquote br')
  })

  it('has emphasised attribution', function() {
    cy.get('footer blockquote br ~ em')
  })

  it('has blockquote attribution line', function() {
    cy.get('footer blockquote').should('contain', '—')
  })

  it('footer has copyright paragraph', function() {
      cy.get('footer p').contains('©');
  })

  it('footer has link', function() {
      cy.get('footer a').should('exist').should('not.be.empty')
  })

  it('footer link is email link', function() {
    cy.get('footer a[href^="mailto:"')
  })

  it('footer link sets subject', function() {
    cy.get('footer a[href*="?subject="')
  })

})

describe('links.html', function() {

  beforeEach(() => {
    visit_page_using('links.html', 'macbook-13')
  })

  checkLayout()

  it('has useful links heading', function() {
    cy.get('main h1').contains(/useful links/i)
  })

  it('has ul after h1', function() {
    cy.get('main h1 ~ ul')
  })

  it('has list item', function() {
    cy.get('main ul > li')
  })

  it('has list item link', function() {
    cy.get('main ul > li > a')
  })

  it('has correct list item link', function() {
    cy.get('main ul > li > a[href*=validator]')
  })

  it('has correct text for list item link', function() {
    cy.get('main ul > li > a').contains(/validator/i)
  })

  it('list item link opens in new tab', function() {
    cy.get('main ul > li > a[target="_blank"]')
  })

})

describe('glossary.html', function() {

  beforeEach(() => {
    visit_page_using('glossary.html', 'macbook-13')
  })

  checkLayout()

  it('has heading', function() {
    cy.get('main h1').contains(/glossary/i)
  })

  it('has dl after h1', function() {
    cy.get('main h1 ~ dl')
  })

  it('has at least 3 definitions', function() {
    cy.get('main dd').should('have.length.at.least', 3)
    cy.get('main dt').should('have.length.at.least', 3)
  })

  it('has correct syntax for dl', function() {
    cy.get('dl>dt')
    cy.get('dl>dd')
    cy.get('dd > dt').should('not.exist')
    cy.get('dt > dd').should('not.exist')
  })


})
