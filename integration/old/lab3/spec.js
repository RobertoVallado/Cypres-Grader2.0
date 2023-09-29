import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


function checkLayout() {

  it('has layout changes', function() {
    cy.get('body > .width-wrap')
    cy.get('body > *').should('have.length', 1)
  })

}

describe('normalize.css', function() {
  it('has normalize.css', function() {
    cy.request(Cypress.env('root_url') + 'styles/normalize.css' )
  })

  it('links normalize.css', function() {
      visit_page_using('index.html', 'macbook-13')
      cy.get('head link[rel="stylesheet"][href$="normalize.css"]')
  })

  it('links normalize.css before main.css', function() {
      visit_page_using('index.html', 'macbook-13')
      cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="main.css"]')
  })

  it('links normalize.css on all pages', function() {
      visit_page_using('glossary.html', 'macbook-13')
      cy.get('head link[rel="stylesheet"][href$="normalize.css"]')
      cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="main.css"]')

      visit_page_using('links.html', 'macbook-13')
      cy.get('head link[rel="stylesheet"][href$="normalize.css"]')  
      cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="main.css"]')
  })

  it('has hyperlink to normalize.css on links pages', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[href*="normalize"]')
  })

  it('opens normalize hyperlink in new tab', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[target="_blank"][href*="normalize"]')
  })
})

describe('Photo', function() {

  beforeEach(() => {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has images folder', function() {
      cy.request(Cypress.env('root_url') + 'images' )
  })

  it('has figure', function() {
    cy.get('figure')  
  })

  it('has figure after h1', function() {
      cy.get('h1 + figure')
  })

  it('has mugshot class on figure', function() {
      cy.get('h1 + figure.mugshot')
  })

  it('has figure caption', function() {
      cy.get('h1 + figure figcaption').should('not.be.empty')
  })

  it('has figure img', function() {
      cy.get('h1 + figure img')
  })

  it('has figure img alt text', function() {
      cy.get('h1 + figure img').should('have.attr', 'alt').and('not.be.empty')
  })

  it('has figure img hyperlink', function() {
      cy.get('h1 + figure a img')
  })

  it('uses thumbnail for main image', function() {
    let thumbFilename = Cypress.$('h1 + figure img').attr('src')
    let fullFilename = Cypress.$('h1 + figure a').attr('href')

    cy.request(Cypress.env('root_url') + thumbFilename).then((thumbResponse) => {
      cy.request(Cypress.env('root_url') + fullFilename).then((fullResponse) => {
        expect(parseInt(thumbResponse.headers['content-length']))
            .to.be.lessThan(parseInt(fullResponse.headers['content-length']))
      })
    })
  })

  it('uses web-ready thumbnail', function() {
    let thumbFilename = Cypress.$('h1 + figure img').attr('src')
    
    cy.request(Cypress.env('root_url') + thumbFilename).then((thumbResponse) => {
        expect(thumbResponse.headers['content-length'])
            .to.be.lessThan(80000)
    })
  })

  it('uses web-ready main image', function() {
    let fullFilename = Cypress.$('h1 + figure a').attr('href')
    
    cy.request(Cypress.env('root_url') + fullFilename).then((fullResponse) => {
        expect(fullResponse.headers['content-length'])
            .to.be.lessThan(1000000)
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
              throw Error("Could not find favicon.ico in root or images folder");
            }
          })
        }
      })
  })

  it('has favicon link', function() {
      cy.get('head link[rel="icon"][href*="favicon"]')
  })

  it('links favicon on all pages', function() {
      visit_page_using('glossary.html', 'macbook-13')
      cy.get('head link[rel="icon"][href*="favicon"]')

      visit_page_using('links.html', 'macbook-13')
      cy.get('head link[rel="icon"][href*="favicon"]')
  })

  it('has hyperlink to favicon generator on links pages', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[href*="favicon"]')
  })

  it('opens favicon generator hyperlink in new tab', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[target="_blank"][href*="favicon"]')
  })

})

describe('BG Image', function() {

  beforeEach(() => {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has bg-image on h1 & h2', function() {
      cy.get('h1').should('have.css', 'background-image').and('not.equal', 'none')
      cy.get('h2').should('have.css', 'background-image').and('not.equal', 'none')
  })

  it('has only repeat-x', function() {
    cy.get('h1').should('have.css', 'background-repeat', 'repeat-x')  
  })

  it('has correct bg image url', function() {
    cy.get('h1').should('have.css', 'background-image').then((bgImg) => {
      bgImg = bgImg.replace(/^\s*url\(\s*"/, "").replace(/"\s*\)$/, "")
      cy.request(bgImg)
    })
  })
})

describe('Text', function() {

  beforeEach(() => {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has Google fonts link', function() {
    cy.get('head link[rel="stylesheet"][href*="fonts.googleapis.com"]')
  })

  it('has heading font', function() {
      cy.get('h1').should('have.css', 'font-family').then((ff) => {
        expect(/^"?Times/.test(ff), 'Expected non-defalt heading font').to.be.false
      })
  })

  it('has backup heading family type', function() {
      cy.get('h1').should('have.css', 'font-family').then((ff) => {
        expect(/serif|sans-serif|monospace|cursive|fantasy/.test(ff)).to.be.true
      })
  })

  it('has body font', function() {
      cy.get('body').should('have.css', 'font-family').then((ff) => {
        expect(/^"?Times/.test(ff), 'Expected non-defalt body font').to.be.false
      })
  })

  it('has backup body family type', function() {
      cy.get('body').should('have.css', 'font-family').then((ff) => {
        expect(/serif|sans-serif|monospace|cursive|fantasy/.test(ff)).to.be.true
      })
  })

  it('has hyperlink to google fonts on links pages', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[href*="fonts.google.com"]')
  })

  it('has hyperlink to fontpair on links pages', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[href*="fontpair"]')
  })

  it('opens google fonts hyperlink in new tab', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[target="_blank"][href*="fonts.google.com"]')
  })

  it('opens fontpair hyperlink in new tab', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[target="_blank"][href*="fontpair"]')
  })

  it('has .bio section', function() {
    cy.get('section.bio h1')
  })

  it('has .bio p indent', function() {
    cy.get('.bio p').should('have.css', 'text-indent', '48px')
  })

  it('does NOT indent non-bio p', function() {
      cy.get('footer p').should('have.css', 'text-indent', '0px')
  })

  it('has centered footer', function() {
      cy.get('footer').should('have.css', 'text-align', 'center')
      cy.get('p').should('have.css', 'text-align', 'start')
  })

  it('has 12px footer font size', function() {
    cy.get('footer').should('have.css', 'font-size', '12px')
  })

  it('has 70% byline font size', function() {
    cy.get('footer .byline').should('have.css', 'font-size', '8.4px')
    cy.get('main section:last-child .byline').should('have.css', 'font-size', '11.2px')
  })

  it('has no underlines in hyperlinks', function() {
    cy.get('a').should('have.css', 'text-decoration').and('contain', 'none')
  })

  it('has uppercase #page-copyright', function() {
      cy.get('#page-copyright').should('have.css', 'text-transform', 'uppercase')
  })

  it('has #page-copyright letter spacing', function() {
      cy.get('#page-copyright').should('have.css', 'letter-spacing', '3px')
  })

  it('has no list styletype in header', function() {
      cy.get('header nav li').should('have.css', 'list-style-type', 'none')
  })

  it('has non-disc list styletype in <ul>', function() {
      visit_page_using('links.html', 'macbook-13')
      cy.get('main ul li').should('have.css', 'list-style-type').and('not.contain', 'disc')
  })
})

