import {
    visit_page_using,
    decoy,
    to_regex,
    makeDecoy
} from '../../../support/grader-helpers.js'

describe('Basic responsive design', function() {
    
    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has correct viewport on all pages', function() {
        cy.get('head meta[name="viewport"]')
            .should('have.attr', 'content')
            .and('match', /width=device-width/)
            .and('match', /initial-scale=1/)

        visit_page_using('links.html', 'macbook-13')
        cy.get('head meta[name="viewport"]')
            .should('have.attr', 'content')
            .and('match', /width=device-width/)
            .and('match', /initial-scale=1/)

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('head meta[name="viewport"]')
            .should('have.attr', 'content')
            .and('match', /width=device-width/)
            .and('match', /initial-scale=1/)

        visit_page_using('lorem.html', 'macbook-13')
            cy.get('head meta[name="viewport"]')
                .should('have.attr', 'content')
                .and('match', /width=device-width/)
                .and('match', /initial-scale=1/)

        visit_page_using('gallery.html', 'macbook-13')
                cy.get('head meta[name="viewport"]')
                    .should('have.attr', 'content')
                    .and('match', /width=device-width/)
                    .and('match', /initial-scale=1/)
        
        visit_page_using('survey.html', 'macbook-13')
                cy.get('head meta[name="viewport"]')
                    .should('have.attr', 'content')
                    .and('match', /width=device-width/)
                    .and('match', /initial-scale=1/)
    })

    it('sets image max width to 100%', () => {
        decoy('img', 'body').should('have.css', 'max-width', '100%')
    })

    it('uses column-width instead of column-count', () => {
        cy.get('.bio').should("have.css", 'column-width', '208px')
        cy.get('.bio').should("have.css", 'column-count', 'auto')
    })

    it('uses inline-block for .bio hyperlink', () => {
        cy.get('.bio > a').should('have.css', 'display', 'inline-block')
        decoy('a', 'body').should('have.css', 'display', 'inline')
    })

    it('animates back-to-top rotation', () => {
        cy.get('a[href="#top"]').should('have.css', 'transition').and('match', /transform.*(200ms|\.2s)/)
    })

})

describe('Gallery', function() {

    beforeEach(() => {
        visit_page_using('gallery.html', 'macbook-13')
    })

    it('has responsive grid column template', () => {
        throw new Error("Check manually")
    })

    it('removes column span on narrow screens', () => {

        let el = makeDecoy('a', '.gallery')
        el.addClass('col-span-2')
        cy.get('.gallery > .col-span-2:last-child')
          .should('have.css', 'grid-column')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)

        
        visit_page_using('gallery.html', 'iphone-6')
        el = makeDecoy('a', '.gallery')
        el.addClass('col-span-2')
        cy.get('.gallery > .col-span-2')
          .should('have.css', 'grid-column')
          .and('match', /auto/)
    })

    it('animates hover scaling', () => {
        decoy('a', '.gallery').should('have.css', 'transition').and('match', /transform.*(200ms|\.2s)/)
    })
})


describe('Table', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('shows thead, tfoot, th on large screens', () => {
        cy.get('thead, tfoot, th').should('have.css', 'display').and('not.match', /none/)
    })

    it('hides thead, tfoot, th on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('thead, tfoot, th').should('have.css', 'display').and('match', /none/)
    })

    it('has table cell display for td elements on large screens', () => {
        cy.get('td').should("have.css", 'display', 'table-cell')
    })

    it('has block display for td elements on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('td').should("have.css", 'display', 'block')
    })

    it('has 0.3em 1em padding for td elements on large screens', () => {
        cy.get('td').should("have.css", 'padding', '4.8px 16px')
    })

    it('has 0 1rem padding for td elements on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('td:not(:first-of-type)').should("have.css", 'padding', '0px 16px')
    })

    it('has first td bold and 0.3 top padding on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('td:first-of-type').should("have.css", 'padding-top', '4.8px')
        cy.get('td:first-of-type').should("have.css", 'font-weight', '700')
    })

    it('has last td italic and 0.3 bottom padding w 0.8em font-size on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('td:last-of-type').should("have.css", 'padding-bottom', '3.84px')
        cy.get('td:last-of-type').should("have.css", 'font-style', 'italic')
        cy.get('td:last-of-type').should("have.css", 'font-size', '12.8px')
    })

    it('has ::after content of "hrs/wk" last td on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('td:last-of-type').after('content').should('match', /hrs\/wk/)
    })

    it('has caption at bottom on large screens', () => {
        cy.get('table > caption').should('have.css', 'caption-side', 'bottom')
    })

    it('has caption at top on small screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('table > caption').should('have.css', 'caption-side', 'top')
    })

})

describe('Lorem', function() {

    beforeEach(() => {
        visit_page_using('lorem.html', 'iphone-3')
    })

    it('has block-level images on narrow screens', () => {
        cy.get('main img').should('have.css', 'display', 'block')
    })
})

describe('Favourites tab', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has row flex-direction on large screens', () => {
        cy.get('.favourites').should('have.css', 'flex-direction', 'row')
    })

    it('has column flex-direction on narrow screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('.favourites').should('have.css', 'flex-direction', 'column')
    })

    it('has labels w non-zero order on wide screens', () => {
        decoy('label', '.favourites').should('have.css', 'order').and('match', /-1/)
        decoy('label', 'body').should('have.css', 'order').and('match', /^0$/)
    })

    it('has labels w zero order on narrow screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('.favourites > label').should('have.css', 'order').and('match', /^0$/)
    })

    it('looks good', () => {
        throw new Error("Check manually")
    })
})

describe('Navigation menu', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has row flex-direction on wide screens', () => {
        cy.get('header nav ul').should("have.css", 'flex-direction', 'row')
    })

    it('has column flex-direction on narrow screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('header nav ul').should("have.css", 'flex-direction', 'column')
    })

    it('has align-items centered on narrow screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('header nav ul').should("have.css", 'align-items', 'center')
    })

    it('has hyperlinks w 1em top padding on wide screens', () => {
        cy.get('header nav ul a').should('have.css', 'padding-top', '16px')
    })

    it('has hyperlinks w 0.5em top padding on narow screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('header nav ul a').should('have.css', 'padding-top', '8px')
    })


    it('has hyperlinks w top border on wide screens', () => {
        cy.get('header nav ul a').should('have.css', 'border-top').and('match', /4px solid/)
    })

    it('has hyperlinks w NO top border on narow screens', () => {
        visit_page_using('index.html', 'iphone-3')
        cy.get('header nav ul a').should('have.css', 'border-top').and("match", /none/)
    })

    it('has underlined hyperlinks when hovered on narow screens', () => {
        throw new Error("Check manually")
    })
})

describe('Sandwich menu', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('is on all pages', () => {
        cy.get('header nav > input[type="checkbox"]#menu-toggle:first-child').should('exist')
        cy.get('header nav > label[for="menu-toggle"].sandwich-icon:nth-child(2)').should('exist')

        visit_page_using('links.html', 'macbook-13')
        cy.get('header nav > input[type="checkbox"]#menu-toggle:first-child').should('exist')
        cy.get('header nav > label[for="menu-toggle"].sandwich-icon:nth-child(2)').should('exist')

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('header nav > input[type="checkbox"]#menu-toggle:first-child').should('exist')
        cy.get('header nav > label[for="menu-toggle"].sandwich-icon:nth-child(2)').should('exist')

        visit_page_using('survey.html', 'macbook-13')
        cy.get('header nav > input[type="checkbox"]#menu-toggle:first-child').should('exist')
        cy.get('header nav > label[for="menu-toggle"].sandwich-icon:nth-child(2)').should('exist')

        visit_page_using('gallery.html', 'macbook-13')
        cy.get('header nav > input[type="checkbox"]#menu-toggle:first-child').should('exist')
        cy.get('header nav > label[for="menu-toggle"].sandwich-icon:nth-child(2)').should('exist')

        visit_page_using('lorem.html', 'macbook-13')
        cy.get('header nav > input[type="checkbox"]#menu-toggle:first-child').should('exist')
        cy.get('header nav > label[for="menu-toggle"].sandwich-icon:nth-child(2)').should('exist')
    })

    it('icon has no text content', () => {
        cy.get('.sandwich-icon').should('be.empty')
    })

    it('is not displayed on wide screens', () => {
        cy.get('.sandwich-icon').should('not.be.visible')
        cy.get('#menu-toggle').should('not.be.visible')
    })
})


describe('Sandwich menu on narrow screens', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'iphone-3')
    })

    it('still has checkbox hidden', () => {
        cy.get('#menu-toggle').should('not.be.visible')
    })

    it('is displayed', () => {
        cy.get('.sandwich-icon').should('be.visible')
    })

    it('is block-level', () => {
        cy.get('.sandwich-icon').should('have.css', 'display', 'block')
    })

    it('is 40 x 25px', () => {
        cy.get('.sandwich-icon').should('have.css', 'width', '40px')
        cy.get('.sandwich-icon').should('have.css', 'height', '25px')
    })

    it('has 5px top border', () => {
        cy.get('.sandwich-icon').should('have.css', 'border-top').and('match', /5px solid/)
    })

    it('has pointer cursor', () => {
        cy.get('.sandwich-icon').should('have.css', 'cursor', 'pointer')
    })

    it('has relative position', () => {
        cy.get('.sandwich-icon').should('have.css', 'position', 'relative')
    })

    it('has 1em top and bottom margin', () => {
        cy.get('.sandwich-icon').should('have.css', 'margin', '16px 107px')
    })

    it('has before and after pseudo elements with no content', () => {
        cy.get('.sandwich-icon').before('content').should('be.empty')
        cy.get('.sandwich-icon').after('content').should('be.empty')
    })

    it('has block-level ::before and ::after', () => {
        cy.get('.sandwich-icon').before('display').should('be', 'block')
        cy.get('.sandwich-icon').after('display').should('be', 'block')
    })

    it('has 40x wide ::before and ::after', () => {
        cy.get('.sandwich-icon').before('width').should('be', '40px')
        cy.get('.sandwich-icon').after('width').should('be', '40px')
    })
    
    it('has 5px top border on ::before and ::after', () => {
        cy.get('.sandwich-icon').before('border-top').should('match', /5px solid/)
        cy.get('.sandwich-icon').after('border-top').should('match', /5px solid/)
    })

    it('has absolutely positioned ::before and ::after', () => {
        cy.get('.sandwich-icon').before('position').should('be', 'absolute')
        cy.get('.sandwich-icon').after('position').should('be', 'absolute')
    })

    it('has correctly positioned ::before', () => {
        cy.get('.sandwich-icon').before('top').should('be', '5px')
    })

    it('has correctly positioned ::after', () => {
        cy.get('.sandwich-icon').after('top').should('be', '15px')
    })

    it('has retracted menu by default', () => {
        cy.get('header nav ul').should('have.css', 'height', '0px')
    })

    it('has overflow hidden on menu', () => {
        cy.get('header nav ul').should('have.css', 'overflow', 'hidden')
    })

    it('toggles menu on click', () => {
        cy.get('.sandwich-icon').click()
            .then(() => {
                cy.get('header nav ul').should('have.css', 'height').and('not.match', /0px/)
            })
        
    })

    it('animates menu toggle', () => {
        cy.get('header nav ul').should('have.css', 'transition').and('match', /height.*(200ms|0.2s)/)
    })

})

describe('Bonus', function() {
    it('transitions from sandwich to X with animation', () => {
        throw new Error("Check manually")
    })
})