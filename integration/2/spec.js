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

  it('has div as only body child', () => {
      cy.get('body > div').should('exist')
      cy.get('body > *').should('have.length', 1)
  })

  it('has .width-wrap', () => {
    cy.get('body > div.width-wrap').should('exist')
  })

  it('has <header> <main> <footer> inside .with-wrap', () => {
    cy.get('.width-wrap > header')
    cy.get('.width-wrap > main')
    cy.get('.width-wrap > footer')
    cy.get('header + main + footer')

    cy.get('header').should('have.length', 1)
    cy.get('main').should('have.length', 1)
    cy.get('footer').should('have.length', 1)
  })

  it('has id #top on header', () => {
    cy.get('header#top')
  })

  it('has back-to-top link', () => {
    cy.get('.width-wrap > a:last-child')
      .should('exist')
      .should('contain', '◤')
      .should('have.attr', 'href').and('match', /^#top$/)
  })

  it('has correct title on back-to-top link', () => {
    cy.get('.width-wrap > a:last-child')
      .should('have.attr', 'title').and('match', /^back to top$/i)
  })

  it('has <nav> in <header>', () => {
    cy.get('header > nav').should('exist')
    cy.get('header > *').should('have.length', 1)
  })

  it('has <ul> in <nav>', () => {
    cy.get('nav > ul').should('exist')
    cy.get('nav > *').should('have.length', 1)
  })

  it('has 3 <li>s in <ul>', () => {
    cy.get('ul > li').should('exist').and('have.length', 3)
    cy.get('ul > *').should('have.length', 3)
  })

  it('has Home link', () => {
    cy.get('li > a[href="index.html"]').should('contain', 'Home')
  })

  it('has Links link', () => {
    cy.get('li > a[href="links.html"]').should('contain', 'Links')
  })

  it('has Glossary link', () => {
    cy.get('li > a[href="glossary.html"]').should('contain', 'Glossary')
  })

  it('has <h1> first in <main>', () => {
    cy.get('main > h1:first-child')
      .should('exist')
  })

  it('has welcome message in <h1>', () => {
    cy.get('main > h1:first-child')
      .invoke('text')
      .should('match', /welcome/i)
  })

  it('has 2 paragraphs after <h1>', () => {
    cy.get('h1 + p + p')
    cy.get('h1 ~ p').should('not.be.empty')
  })

  it('has h2 after bio paragraphs', () => {
    cy.get('h2').should($el => {
      const $t = $el.text()
      expect($t).to.match(/favou?rite/i)
    })
  })

  it('has images folder', function() {
    cy.request(Cypress.env('root_url') + 'images' )
  })

  it('has logo image', () => {
    cy.request({ url: Cypress.env('root_url') + 'images/logo.png', failOnStatusCode: false})
      .then((pngRes) => {
        cy.request({ url: Cypress.env('root_url') + 'images/logo.jpg', failOnStatusCode: false })
          .then((jpgRes) => {
            expect([pngRes.status, jpgRes.status]).to.contain(200)
          })
      })
  })

  it('has image hyperlink after favourites heading', () => {
    cy.get('h2+a[href]>img[src^="images"]').should('exist')
  })

  it('has hyperlinked logo', () => {
    cy.get('h2+a').should('have.attr', 'href').and('not.be.empty')
  })

  it('has 2 favourite things <h3>s', () => {
    cy.get('h2 ~ h3').should('have.length', 2)
  })

  it('has favourite things <ul> with three items', () => {
    cy.get('h2 ~ h3 + ol').should('exist')
    cy.get('h2 ~ h3 + ol > li').should('have.length.greaterThan', 2)
  })

  it('has favourite things haiku', () => {
    cy.get('h2 ~ h3 + p').should('exist')
  })

  it('uses <br> for newlines in haiku', () => {
    cy.get('h2 ~ h3 + p > br').should('have.length', 3)
  })
  
  it('has <cite> in haiku', () => {
    cy.get('h2 ~ h3 + p > cite').should('exist').and('contain', 'by')
  })

  it('has <span> in haiku <cite>', () => {
    cy.get('h2 ~ h3 + p > cite > span').should('exist').and('not.contain', 'by')
  })

  it('has span.author in haiku', () => {
    cy.get('h2 ~ h3 + p > cite > span.author').should('exist')
  })

  it('has <hr> as first child in <footer>', () => {
    cy.get('footer > hr:first-child').should('exist')
  })

  it('has <blockquote> after footer <hr>', () => {
    cy.get('footer > hr + blockquote').should('exist')
  })

  it('has <blockquote> has emdash', () => {
    cy.get('footer blockquote cite').should('exist').contains('—')
  })

  it('has <cite> in footer blockquote', () => {
    cy.get('footer blockquote > cite').should('exist').and('contain', '—')
  })

  it('has <span> in blockquote cite', () => {
    cy.get('footer blockquote > cite > span').should('exist').and('not.contain', '—')
  })
  
  it('has span.autor in blockquote cite', () => {
    cy.get('footer blockquote > cite > span.author').should('exist')
  })

  it('has paragraph after footer blockquote', () => {
    cy.get('footer blockquote + p').should($el => {
      const $t = $el.text()
      const re = new RegExp(`©.*${(new Date()).getFullYear()}|2020`)
      expect($t).to.match(re)
    })
  })

  it('has footer email link', function() {
    cy.get('footer a[href^="mailto:"')
  })

  it('has footer email link that sets subject', function() {
    cy.get('footer a[href*="?subject="')
  })

  it('has author meta', () => {
    cy.get('head > meta[name="author"][content]')
  })

  it('has description meta', () => {
    cy.get('head > meta[name="description"][content]')
  })

  it('has lang attribute', () => {
    cy.get('html[lang]')
  })

  it('has "Found me!" comment', () => {
    cy.request(Cypress.env('root_url') + 'index.html' ).then( res => {
      expect(res.body).to.match(/<!--.*ound me.*-->/i)
    })
  })

})


describe('Favicon', function() {

  beforeEach(() => {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has favicon image', function() {
      cy.request({ 
          url: Cypress.env('root_url') + 'favicon.ico',
          failOnStatusCode: false
      }).then((r) => {
        // If we don't find one in the root, try the images subdir
        if ( r.status == 404 ) {
          cy.request({ 
            url: Cypress.env('root_url') + 'images/favicon.ico',
            failOnStatusCode: false
          }).then((r2) => {
            if ( r2.status == 404 ) {
              // If we don't find one there, try the favicon subdir
              if ( r.status == 404 ) {
                cy.request({ 
                  url: Cypress.env('root_url') + 'favicon/favicon.ico',
                  failOnStatusCode: false
                }).then((r2) => {
                  if ( r2.status == 404 ) {
                    throw Error("Could not find favicon.ico in root, images, or favicon folder");
                  }
                })
              }
            }
          })
        }
      })
  })

  it('has favicon link', function() {
      cy.get('head link[rel="icon"][href*="favicon"]')
  })

})

describe('links.html', function() {

  beforeEach(() => {
    visit_page_using('links.html', 'macbook-13')
  })

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

