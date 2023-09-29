import {
    visit_page_using,
    decoy,
    to_regex,
    makeDecoy
} from '../../../support/grader-helpers.js'

describe('Nav header', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has non-inline list items', () => {
        cy.get('header nav li').should('have.css', 'display').and('not.match', /inline/)
    })

    it('has no bullets in list', () => {
        cy.get('header nav ul').should('have.css', 'list-style-type').and('match', /none/)
        decoy('ul', 'body').should('have.css', 'list-style-type').and('not.match', /none/)
    })

    it('has flex ul', () => {
        cy.get('header nav ul').should('have.css', 'display').and('match', /flex/)
        decoy('ul', 'body').should('have.css', 'display').and('not.match', /flex/)
    })

    it('has horizontally centered list items', () => {
        cy.get('header nav ul').should('have.css', 'justify-content').and('match', /center/)
    })

})


describe('Tab layout', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has correct HTML layout', () => {
        cy.get('h2+div>input[type="radio"]').should('have.length', 5)
        cy.get('h2+div>label').should('have.length', 5)
        cy.get('h2+div>div').should('have.length', 5)
        cy.get('h2+div>*').should('have.length', 15)
        cy.get('h2+div>div>figure').should('have.length', 1)
        cy.get('h2+div>div>ol').should('have.length', 1)
        cy.get('h2+div>div>p').should('have.length', 1)
        cy.get('h2+div>div>iframe').should('have.length', 1)
        cy.get('h2+div>div>audio').should('have.length', 1)
    })

    it('has div.favourites', () => {
        cy.get('h2+div.favourites').should('exist')
    })

    it('has radio group', () => {
        let names = new Set()
        cy.get('.favourites input[type="radio"]').then($el => {
            $el.each((i, item) => {
                let n = item.getAttribute('name')
                names.add(n)
            })

            expect(names.size, "Number of different names").to.equal(1)
        })
    })

    it('has unique radio ids', () => {
        let ids = new Set()
        cy.get('.favourites input[type="radio"]').then($el => {
            $el.each((i, item) => {
                ids.add(item.id)
            })

            expect(ids.size, "Number of different ids").to.equal(5)
        })
    })

    it('has labels paired with inputs', () => {
        cy.get('.favourites input').then(el => {
            let $input = Cypress.$(el)
            let $next = $input.next()

            expect($next[0].tagName, "Element type").to.equal("LABEL")
            expect($next.attr('for'), "Label for matches input id").to.equal($input.attr('id'))
        })
    })

    it('has first input checked', () => {
        cy.get('.favourites > input:first-of-type:checked').should('exist')
    })

    it('has unselected tab content hidden', () => {
        cy.get('.favourites input:not(:checked) + * + div').should("have.css", "display", "none")
    })

    it('has selected tab content visible', () => {
        cy.get('.favourites label:first-of-type').click()
        cy.get('.favourites input:checked + * + div').should("have.css", "display").and('not.match', /none/)
    })

    it('has hidden inputs', () => {
        cy.get('.favourites input').should('be.not.visible')
        decoy('input', 'body').should('be.visible')
    })

    it('has favourites div as flex container', () => {
        cy.get('.favourites').should('have.css', 'display', 'flex')
    })

    it('has favourites div wrapping', () => {
        cy.get('.favourites').should('have.css', 'flex-wrap', 'wrap')
    })

    it('has favourites labels ordered before content divs', () => {
        cy.get('.favourites > label').then(el => {
            el.each((i, item) => {
                expect(Cypress.$(item).css('order'), "Order less than 0").to.be.lessThan(0)
            })
        })

        decoy('label', 'body').should('have.css', 'order', '0')
    })

    it('has content divs set to 100% width', () => {
        cy.get('.favourites > div').should('have.css', 'width', '894px')
    })

    it('has thoughtful style', () => {
        throw new Error("Check manually")
    })

})



describe('Gallery', function() {

    beforeEach(() => {
        visit_page_using('gallery.html', 'macbook-13')
    })

    it('has heading', () => {
        cy.get('h1').should($el => {
            const $t = $el.text()
            expect($t, "Gallery heading").to.match(/gallery/i)
        })
    })

    it('has .gallery div', () => {
        cy.get('h1 + div.gallery').should('exist')
    })

    it('has gallery thumbnail links', () => {
        cy.get('.gallery > a > img').should('have.length.greaterThan', 14)
    })

    it('has 300x600 image', () => {
        cy.get('.gallery img[src*="300/600"]').should('exist')
    })

    it('has 600x600 image', () => {
        cy.get('.gallery img[src*="600/600"]').should('exist')
    })

    it('has .gallery div as grid container', () => {
        cy.get('.gallery').should('have.css', 'display', 'grid')
    })

    it('has 4-equal-fraction-column template', () => {
        cy.get('.gallery').should('have.css', 'grid-template-columns', '216px 216px 216px 216px')
    })

    it('has img elements set to max-width 100%', () => {
        cy.get('img').should('have.css', 'max-width', '100%')
    })

    it('has img elements display as block', () => {
        cy.get('img').should('have.css', 'display', 'block')
        decoy('img', 'body').should('have.css', 'display', 'inline')
    })

    it('has row-span-2 on first image', function() {
        cy.get('.gallery > a:first-child.row-span-2').should('exist')
    })

    it('has row-span-2 and col-span-2 on 10th image', function() {
        cy.get('.gallery > a:nth-child(10).row-span-2').should('exist')
        cy.get('.gallery > a:nth-child(10).col-span-2').should('exist')
    })

    it('has .row-span-2 elements spanning 2 rows', function() {
        let el = makeDecoy('a', '.gallery')
        el.addClass('row-span-2')
        cy.get('.gallery > .row-span-2:last-child')
          .should('have.css', 'grid-row')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)

    })

    it('has .col-span-2 elements spanning 2 columns', function() {
        let el = makeDecoy('a', '.gallery')
        el.addClass('col-span-2')
        cy.get('.gallery > .col-span-2:last-child')
          .should('have.css', 'grid-column')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)

    })

    it('has 10px gutter', () => {
        cy.get('.gallery').should('have.css', 'gap', '10px')
    })

    it('has 100% width and height on gallery images', () => {
        cy.get('img').should('have.css', 'width', '216px')
        cy.get('img').should('have.css', 'height', '442px')

        decoy('img', 'body').should('have.css', 'width').and('not.match', /0px/)
    })

    it('has img elements with object-fit cover', () => {
        cy.get('img').should('have.css', 'object-fit', 'cover')
        decoy('img', 'body').should('have.css', 'object-fit').and('not.match', /cover/)
    })

    it('has 1.1x scaled gallery thumbnail hyperlinks on hover', () => {
        throw new Error("Check manually")
    })

})

describe('Paperclip', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('exists', () => {
        cy.request({ url: Cypress.env('root_url') + 'images/paperclip.png'})
    })

    it('is last child of selfie hyperlink', () => {
        cy.get('.bio > a > img[src*="paperclip"]:last-child').should('exist')
    })

    it('has class "paperclip"', () => {
        cy.get('.bio > a > img.paperclip:last-child').should('exist')
    })

    it('has no background or box-shadow', () => {
        cy.get('.paperclip').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        cy.get('.paperclip').should('have.css', 'background-image', 'none')
        cy.get('.paperclip').should('have.css', 'box-shadow', 'none')
    })

    it('has 20% width', () => {
        cy.get('.paperclip').should("have.css", 'width', '56px')
    })
    
    it('has block-level hyperlinks in .bio', () => {
        decoy('a', '.bio').should("have.css", 'display', 'block')
        decoy('a', 'body').should("have.css", 'display').and('not.match', /block/)
    })

    it('has relative position on .bio hyperlink', () => {
        cy.get('.bio > a').should('have.css', 'position').and('not.match', /static/)
    })

    it('has absolute position', () => {
        cy.get('.paperclip').should('have.css', 'position', 'absolute')
        cy.get('.paperclip').should('have.css', 'top').and('match', /-[1-9]/)
        cy.get('.paperclip').should('have.css', 'right').and('match', /-[1-9]/)
    })

    it('looks correctly positioned', () => {
        throw new Error("Check manually")
    })
})


describe('Back-to-top link', function() {

    beforeEach(() => {
        visit_page_using('index.html', 'macbook-13')
    })

    it('has -25px left margin', () => {
        cy.get('a[href="#top"]').should('have.css', 'margin', '0px 0px 0px -25px')
    })

    it('has sticky position', () => {
        cy.get('a[href="#top"]').should('have.css', 'position', 'sticky')
    })

    it('has sticky position 10px from bottom', () => {
        cy.get('a[href="#top"]').should('have.css', 'bottom', '10px')
    })

    it('is inline-block', () => {
        cy.get('a[href="#top"]').should('have.css', 'display', 'inline-block')
    })

    it('rotates on hover', () => {
        throw new Error("Check manually")
    })

})