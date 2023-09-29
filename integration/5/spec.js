import {
    visit_page_using,
    decoy,
    to_regex,
    makeDecoy
} from '../../../support/grader-helpers.js'

describe('Stylesheets', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })


    it('has main.css', function() {
        cy.request(Cypress.env('root_url') + 'styles/main.css' )
    })

    it('has normalize.css', function() {
        cy.request(Cypress.env('root_url') + 'styles/normalize.css' )
    })
    
    it('links normalize.css', function() {
        cy.get('head link[rel="stylesheet"][href$="normalize.css"]')
    })

    it('links normalize.css before main.css', function() {
        cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="ain.css"]')
    })

    it('links css on all pages', function() {
        visit_page_using('glossary.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href$="normalize.css"]')
        cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="ain.css"]')

        visit_page_using('links.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href$="normalize.css"]')  
        cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="ain.css"]')

        visit_page_using('survey.html', 'macbook-13')
        cy.get('head link[rel="stylesheet"][href$="normalize.css"]')  
        cy.get('head link[rel="stylesheet"][href$="normalize.css"] ~ link[rel="stylesheet"][href$="ain.css"]')
        
    })

})



describe('General styles', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })


    it('has all elements with border-box box sizing', function() {
        decoy('address', 'body').should('have.css', 'box-sizing').and('equal', 'border-box');
    })


    it('has width-wrap max-width of 960px', function() {
        cy.get('.width-wrap').should('have.css', 'max-width', '960px')
    })

    it('has width-wrap centered with auto margins', function() {
        cy.get('.width-wrap').should('have.css', 'margin-left', '160px')
        cy.get('.width-wrap').should('have.css', 'margin-right', '160px')
    })

    it('has width-wrap padding', function() {
        cy.get('.width-wrap').should('have.css', 'padding-left', '32px')
        cy.get('.width-wrap').should('have.css', 'padding-bottom', '32px')
        cy.get('.width-wrap').should('have.css', 'padding-top', '0px')
        cy.get('.width-wrap').should('have.css', 'padding-right', '32px')
    })

    it('has width-wrap margin', function() {
        cy.get('.width-wrap').should('have.css', 'margin-bottom', '48px')
    })
    
    it('has correct <hr> width', () => {
        cy.get('footer hr').should('have.css', 'width', '640px')
        cy.get('footer hr').should('have.css', 'max-width', '890px')
        cy.get('footer hr').should('have.css', 'min-width', '300px')
    })

    it('has correct <hr> margin', () => {
        cy.get('footer hr').should('have.css', 'margin-top', '48px')
        cy.get('footer hr').should('have.css', 'margin-bottom', '32px')
    })

    it('has correct <hr> border', () => {
        cy.get('footer hr').should('have.css', 'border-top').and('match', /none/)
        cy.get('footer hr').should('have.css', 'border-left').and('match', /none/)
        cy.get('footer hr').should('have.css', 'border-right').and('match', /none/)

        cy.get('footer hr').should('have.css', 'border-bottom').and('match', /3px dotted/)
    })

    it('has colon after dt elements', () => {
        decoy('dt', 'body')
        .then($els => {
            const win = $els[0].ownerDocument.defaultView
            const after = win.getComputedStyle($els[0], 'after')
            const contentValue = after.getPropertyValue('content')
            // the returned value will have double quotes around it, but this is correct
            expect(contentValue).to.match(/:/)
        })
    })
})

describe('Color scheme', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has .width-wrap bg color', () => {
        cy.get('.width-wrap').should('have.css', 'background-color').and('not.match', to_regex("#00000000"))
    })

    it('has body bg color different than .width-wrap', () => {
        let mainColor = Cypress.$('body').css('background-color')
        cy.get('.width-wrap').should('have.css', 'background-color').and('not.match', to_regex(mainColor))  
    })

    it('has non-default text color', () => {
        cy.get('body').should('have.css', 'color').and('not.match', to_regex("#000"))
    })

    it('has non-default heading color', () => {
        cy.get('h1,h2,h3').should('have.css', 'color').and('not.match', to_regex("rgb(21, 3, 26)"))
    })

    it('has non-default hyperlink color', () => {
        decoy('a', 'body').should('have.css', 'color').and('not.match', to_regex("rgb(21, 3, 26)"))
    })

    it('has different nav hyperlink color than main hyperlink color', () => {
        let mainColor = makeDecoy('a', 'body').css('color')
        cy.get('header nav a').should('have.css', 'color').and('not.match', to_regex(mainColor))
    })

    it('has non-default selected text color', () => {
        decoy('p', 'body')
        .then($els => {
            const win = $els[0].ownerDocument.defaultView
            const after = win.getComputedStyle($els[0], 'selection')
            const contentValue = after.getPropertyValue('background-color')
            // the returned value will have double quotes around it, but this is correct
            expect(contentValue).to.not.match(to_regex("#00000000"))
        })
    })
})


describe('Site Header', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has 4px top border on header', () => {
        cy.get('.width-wrap > header:first-child').should('have.css', 'border-top').and('match', /4px solid rgba\((0|255), (0|255), (0|255), 0.1\)/)
        cy.get('.width-wrap > header:first-child').should('have.css', 'border-bottom').and('match', /none/)
        cy.get('.width-wrap > header:first-child').should('have.css', 'border-left').and('match', /none/)
        cy.get('.width-wrap > header:first-child').should('have.css', 'border-right').and('match', /none/)
    })

    it('has -2em left/right margin on header', () => {
        cy.get('.width-wrap > header:first-child').should('have.css', 'margin-left', '-32px')
        cy.get('.width-wrap > header:first-child').should('have.css', 'margin-right', '-32px')
    })

    it('has bottom border on nav', () => {
        cy.get('.width-wrap > header:first-child > nav').should('have.css', 'border-bottom').and('match', /1px dotted rgba\((0|255), (0|255), (0|255), 0.3\)/)
        cy.get('.width-wrap > header:first-child > nav').should('have.css', 'border-top').and('match', /none/)
        cy.get('.width-wrap > header:first-child > nav').should('have.css', 'border-left').and('match', /none/)
        cy.get('.width-wrap > header:first-child > nav').should('have.css', 'border-right').and('match', /none/)
    })

    it('has 2em left/right padding on nav', () => {
        cy.get('.width-wrap > header:first-child > nav').should('have.css', 'margin-left', '32px')
        cy.get('.width-wrap > header:first-child > nav').should('have.css', 'margin-right', '32px')
    })

    it('clears margin and padding in header nav ul', () => {
        cy.get('.width-wrap > header:first-child ul').should('have.css', 'margin', '0px')
        cy.get('.width-wrap > header:first-child ul').should('have.css', 'padding', '0px')
    })

    it('displays nav list items as inline', () => {
        cy.get('.width-wrap > header:first-child li').should('have.css', 'display', 'inline')
    })

    it('has transparent top border on nav hyperlinks', () => {
        cy.get('.width-wrap > header:first-child a').should('have.css', 'border-top').and('match', /4px solid.*rgba\(.*0\)/)
        cy.get('.width-wrap > header:first-child a').should('have.css', 'border-bottom').and('match', /none/)
        cy.get('.width-wrap > header:first-child a').should('have.css', 'border-left').and('match', /none/)
        cy.get('.width-wrap > header:first-child a').should('have.css', 'border-right').and('match', /none/)
    })

    it('has colored top border on hovered nav hyperlinks', () => {
        throw new Error("Check manually")
    })

    it('displays nav hyperlinks as inline-block', () => {
        cy.get('.width-wrap > header:first-child a').should('have.css', 'display', 'inline-block')
    })

    it('has correct margin and padding on nav hyperlinks', () => {
        cy.get('.width-wrap > header:first-child a').should('have.css', 'margin-top', '-4px')
        cy.get('.width-wrap > header:first-child a').should('have.css', 'margin-left', '16px')
        cy.get('.width-wrap > header:first-child a').should('have.css', 'margin-right', '16px')
        cy.get('.width-wrap > header:first-child a').should('have.css', 'padding-top', '16px')
        cy.get('.width-wrap > header:first-child a').should('have.css', 'padding-bottom', '8px')
    })
    
})



describe('Table', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })
 
    it('has correct padding table cells', () => {
        cy.get('td,th').should('have.css', 'padding', '4.8px 16px')
    })

    it('has correct bg for th cells', () => {
        cy.get('th, thead td, tfoot td').should('have.css', 'background-color').and('match', /rgba\((0|255), (0|255), (0|255), 0.2\)/)
    })

    it('has correct bg for td cells', () => {
        cy.get('td').should('have.css', 'background-color').and('match', /rgba\((0|255), (0|255), (0|255), 0.05\)/)
    })

    it('has correct bg for td cells in even rows', () => {
        cy.get('tbody tr:nth-child(even) td').should('have.css', 'background-color').and('match', /rgba\((0|255), (0|255), (0|255), 0.15\)/)
    })
    
})


describe('Form', function() {

    beforeEach(() => {
        visit_page_using('survey.html', 'macbook-13')
    })
 
    it('displays non-radio/checkbox labels as blocks', () => {
        cy.get('label').should('have.css', 'display', 'block')
    })

    it('displays radio/checkbox labels as inline', () => {
        cy.get('input[type="checkbox"] + label, input[type="radio"] + label').should('have.css', 'display', 'inline')
    })

    it('clears styles on submit controls', () => {
        var el = Cypress.$(`<input type="submit">`)
        Cypress.$('form').append(el)
        cy.get('[type="submit"]').should('have.css', 'border').and('match', /none/)
        cy.get('[type="submit"]').should('have.css', 'padding', '16px 48px')
    })

    it('has non-default colors on submit controls', () => {
        var el = Cypress.$(`<input type="submit">`)
        Cypress.$('form').append(el)
        cy.get('[type="submit"]').should('have.css', 'color').and('not.match', to_regex('rgb(0, 0, 0)'))
        cy.get('[type="submit"]').should('have.css', 'background-color').and('not.match', to_regex('rgb(239, 239, 239)'))
    })

    it('has non-default colors on invalid controls', () => {
        let mainColor = Cypress.$('[name="name_field"]').css('background-color')
        cy.get('[name="name_field"]').type("a")
        cy.get('[name="name_field"]').should('have.css', 'background-color').and('not.match', to_regex(mainColor))
        
    })
})