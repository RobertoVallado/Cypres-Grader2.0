import {
    visit_page_using,
    decoy,
    to_regex,
    makeDecoy
} from '../../../support/grader-helpers.js'

describe('General style', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has Google fonts link on all pages', function() {
        cy.get('head link[rel="stylesheet"][href*="fonts.googleapis.com"]')
        visit_page_using('links.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href*="fonts.googleapis.com"]')
        visit_page_using('glossary.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href*="fonts.googleapis.com"]')
        visit_page_using('survey.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href*="fonts.googleapis.com"]')
        visit_page_using('lorem.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href*="fonts.googleapis.com"]')
    })

    it('has heading font', function() {
        decoy('h5', 'body').should('have.css', 'font-family').and('not.match', /^"?Times/)
    })
  
    it('has backup heading family type', function() {
        decoy('h5', 'body').should('have.css', 'font-family').and('match', /serif|sans-serif|monospace|cursive|fantasy/)
    })

    it('has body font', function() {
        decoy('p', 'body').should('have.css', 'font-family').and('not.match', /^"?Times/)
    })
  
    it('has backup body family type', function() {
        decoy('p', 'body').should('have.css', 'font-family').and('match', /serif|sans-serif|monospace|cursive|fantasy/)
    })

    it('has 1.3 line-height', () => {
        decoy('p', 'body').should('have.css', 'line-height', '20.8px')
    })

    it('has correct hyperlink styles', () => {
        decoy('a', 'body').should('have.css', 'text-decoration').and('match', /none/)
    })

    it('has correct hovered hyperlink styles', () => {
        throw new Error("Check: normal hyperlinks underline; header hyperlinks and back-to-top do NOT underline")
    })

    it('uses roman numerals on ordered lists', () => {
        decoy('ol', 'body').should('have.css', 'list-style-type', 'upper-roman')
    })
    
    it('has rounded corners on iframes', () => {
        cy.get('iframe').should('have.css', 'border-radius', '0px 32px')
    })

    it('has default list styling outside of form', () => {
        decoy('ul', 'body').should('have.css', 'padding', '0px 0px 0px 40px')
        decoy('ul', 'body').should('have.css', 'list-style-type', 'disc')
    })

    it('has no list styling inside form', () => {
        visit_page_using('survey.html', 'macbook-13')
        cy.get('form fieldset ul').should('have.css', 'padding', '0px')
        cy.get('form fieldset ul').should('have.css', 'list-style-type', 'none')
    })

    it('has correct nav hyperlinks styles', () => {
        cy.get('.width-wrap > header:first-child a').should('have.css', 'font-weight', '700')
        cy.get('.width-wrap > header:first-child a').should('have.css', 'text-decoration').and('match', /none/)
        cy.get('.width-wrap > header:first-child a').should('have.css', 'text-transform', 'uppercase')
        cy.get('.width-wrap > header:first-child a').should('have.css', 'letter-spacing', '4px')
    })

    it('has h1 text gradient', () => {
        cy.get('h1').should('have.css', 'background-image').and('match', /gradient/)
    })

    it('has h1 background clipped to text', () => {
        throw new Error("Check manually")
    })

    it('has .bio div', () => {
        cy.get('div.bio').should('exist')
    })

    it('has 3-column layout in .bio div', () => {
        cy.get('.bio').should('have.css', 'column-count', '3')
        cy.get('.bio').should('have.css', 'column-gap', '32px')
    })

    it('has spanning table in .bio div', () => {
        cy.get('.bio table').should('have.css', 'column-span', 'all')
    })

    it('has collapsed borders on table', () => {
        cy.get('table').should('have.css', 'border-collapse', 'collapse')
    })
  
    it('has table caption on bottom', () => {
        cy.get('table caption').should('have.css', 'caption-side', 'bottom')
    })

    it('has max 100% width for images', () => {
        cy.get('img').should('have.css', 'max-width', '100%')
    })

    it('has bio image with correct styles', () => {
        cy.get('.bio img').should('have.css', 'padding').and('not.match', /0px/)
        cy.get('.bio img').should('have.css', 'background-color').and('not.match', to_regex("rgba(0,0,0,0)"))
        cy.get('.bio img').should('have.css', 'box-shadow').and("not.match", /none/)
    })

    it('has non-bio image with correct styles', () => {
        decoy('img', 'body').should('have.css', 'padding', '0px')
        decoy('img', 'body').should('have.css', 'box-shadow', 'none')
    })

    it('has correct footer styles', () => {
       decoy('p', '.width-wrap > footer').should('have.css', 'font-size', '12px')
       decoy('p', '.width-wrap > footer').should('have.css', 'text-align', 'center')
    })

    it('has text-shadow on back-to-top link', () => {
        cy.get('[href$="top"]').should('have.css', 'text-shadow').and('not.match', /none/)
    })
  
})


describe('Link styles', function() {

    beforeEach(() => {
        visit_page_using('links.html', 'macbook-13')
    })

    it('has bullet image', () => {
        cy.request({ url: Cypress.env('root_url') + 'images/link.png'})
    })

    it('has internal style element', () => {
        cy.get('head style').should('not.be.empty')
    })

    it('has no padding on ul', () => {
        cy.get('ul').should('have.css', 'padding', '0px')
    })

    it('has 1em left-padding on list items', () => {
        cy.get('main ul li').should('have.css', 'padding', '0px 0px 0px 16px')
    })

    it('has no left-padding on header list items', () => {
        cy.get('header li').should('have.css', 'padding', '0px')
    })
    
    it('has working background-image url on list items', () => {
        cy.get('main ul li').should('have.css', 'background-image').then((bgImg) => {
            bgImg = bgImg.replace(/^\s*url\(\s*"/, "").replace(/"\s*\)$/, "")
            cy.request(bgImg)
        })
    })

    it('has correct background style on list items', () => {
        cy.get('main ul li').should('have.css', 'background-size', '10px 10px')
        cy.get('main ul li').should('have.css', 'background-repeat', 'no-repeat')
        cy.get('main ul li').should('have.css', 'background-position', '0% 50%')
    })
    
})


describe('Lorem styles', function() {

    beforeEach(() => {
        visit_page_using('lorem.html', 'macbook-13')
    })

    it('has <h1> heading', () => {
        cy.get('h1').then((el) => {
            expect(el.text()).to.match(/orem/)
        })
    })

    it('has multiple paragraphs', () => {
       cy.get('main > h1 ~ p').should('have.length.greaterThan', 2)
    })

    it('has multiple images', () => {
        cy.get('main > h1 ~ p > img').should('have.length.greaterThan', 1)
    })

    it('has floated images', () => {
        cy.get('main p img').should('have.attr', 'style').and('match', /float/)
        cy.get('main p img').should('have.css', 'float').and('match', /left|right/)
    })

    it('has 1em margin on images', () => {
        cy.get('main img').should('have.css', 'margin', '16px')
    })

    it('has internal style element', () => {
        cy.get('head style').should('not.be.empty')
    })

    it('has footer that clears floats', () => {
        cy.get('.width-wrap > footer').should('have.css', 'clear', 'both')
    })

})

