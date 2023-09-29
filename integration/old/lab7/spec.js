import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


describe('Site', function() {

    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })


    it('includes viewport meta tag on all pages', function() {
        cy.get('meta[name="viewport"]')

        visit_page_using('links.html', 'macbook-13')
        cy.get('meta[name="viewport"]')

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('meta[name="viewport"]')
    })

    it('has correct viewport on all pages', function() {
        cy.get('meta[name="viewport"]')
            .should('have.attr', 'content')
            .and('match', /width=device-width/)
            .and('match', /initial-scale=1/)

        visit_page_using('links.html', 'macbook-13')
        cy.get('meta[name="viewport"]')
            .should('have.attr', 'content')
            .and('match', /width=device-width/)
            .and('match', /initial-scale=1/)

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('meta[name="viewport"]')
            .should('have.attr', 'content')
            .and('match', /width=device-width/)
            .and('match', /initial-scale=1/)
    })

    it('uses flexible image width', function() {
        var el = Cypress.$('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEXMzMyWlpacnJy+vr6jo6PFxcW3t7eqqqqxsbHbm8QuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVRYhe3QMQ6EIBAF0C+GSInF9mYTs+1ewRsQbmBlayysKefYO2asXbbYxvxHQj6ECQMAEREREf2NQ/fCtp5Zky6vtRMkSJEzhyISynWJnzH6Z8oQlzS7lEc/fLmmQUSvc16OrCPqRl1JePxQYo1ZSWVj9nxrrOb5esw+eXdvzTWfTERERHRXH4tWFZGswQ2yAAAAAElFTkSuQmCC" alt="" />')
        var wrap = Cypress.$('<div style="width: 50px"></div>')
        wrap.append(el)
        Cypress.$('header').append(wrap)
        cy.wrap(el).should('have.css', 'width').and('equal', '50px')
    })  

    it('uses auto height on flexible images', function() {
        var el = Cypress.$('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEXMzMyWlpacnJy+vr6jo6PFxcW3t7eqqqqxsbHbm8QuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVRYhe3QMQ6EIBAF0C+GSInF9mYTs+1ewRsQbmBlayysKefYO2asXbbYxvxHQj6ECQMAEREREf2NQ/fCtp5Zky6vtRMkSJEzhyISynWJnzH6Z8oQlzS7lEc/fLmmQUSvc16OrCPqRl1JePxQYo1ZSWVj9nxrrOb5esw+eXdvzTWfTERERHRXH4tWFZGswQ2yAAAAAElFTkSuQmCC" alt="" />')
        var wrap = Cypress.$('<div style="box-sizing: content-box; width: 50px"></div>')
        wrap.append(el)
        Cypress.$('header').append(wrap)
        cy.log(wrap.width() + " " + wrap.height())
        cy.wrap(el).should('have.css', 'height').and('equal', '50px')
    })

    it('shows footer <hr> on non-mobile', function() {
        cy.get('footer hr').should('be.visible')
    })

    it('hides footer <hr> on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('footer hr').should('be.hidden')
        cy.get('footer').should('be.visible')
    })

    it('shows .paperclip element on non-mobile', function() {
        cy.get('.paperclip').should('be.visible')
    })

    it('hides .paperclip element on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('.paperclip').should('be.hidden')
    })

    it('floats .mugshot element on non-mobile', function() {
        cy.get('.mugshot').should('have.css', 'float').and('equal', 'right')
    })

    it('does NOT float .mugshot element on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('.mugshot').should('have.css', 'float').and('equal', 'none')
    })

    it('has left & right margins on .mugshot on non-mobile', function() {
        cy.get('.mugshot').should('have.css', 'margin-left').and('equal', '40px')
        cy.get('.mugshot').should('have.css', 'margin-right').and('equal', '40px')
    })

    it('has NO left & right margins on .mugshot on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('.mugshot').should('have.css', 'margin-left').and('equal', '0px')
        cy.get('.mugshot').should('have.css', 'margin-right').and('equal', '0px')
    })

    it('uses grid display for <main> on non-mobile', function() {
        cy.get('main').should('have.css', 'display').and('equal', 'grid')
    })

    it('uses block display for <main> on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('main').should('have.css', 'display').and('equal', 'block')
    })

    it('has ANY .row-span-2.col-span-2 spanning 2 rows & cols on non-mobile', function() {
        var el = Cypress.$('<div id="testel" class="row-span-2 col-span-2 column-span-2"></div>')
        Cypress.$('header').append(el)
        cy.get('#testel')
          .should('have.css', 'grid-row')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
        cy.get('#testel')
          .should('have.css', 'grid-column')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
    })

    it('has ANY .row-span-2.col-span-2 spanning 1 row & col on mobile', function() {

        cy.viewport('iphone-6').then(() => {
            var el = Cypress.$('<div id="testel" class="row-span-2 col-span-2 column-span-2"></div>')
            Cypress.$('body').append(el)
            cy.get('#testel')
              .should('have.css', 'grid-row')
              .and('match', /(span 1 \/ auto)|(auto \/ span 1)/)
            cy.get('#testel')
              .should('have.css', 'grid-column')
              .and('match', /(span 1 \/ auto)|(auto \/ span 1)/)
        })
    })

    it('uses specific selector for header ul', function() {
        cy.viewport('iphone-6').then(() => {
            var el = Cypress.$('<ul id="testel"></ul>')
            Cypress.$('body').append(el)

            cy.get('#testel').should('have.css', 'display').and('equal', 'block')
        })
    })

    it('has horizontal header ul on non-mobile', function() {
        cy.get('header ul').should('have.css', 'flex-direction').and('equal', 'row')
    })

    it('has vertical header ul on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('header ul').should('have.css', 'flex-direction').and('equal', 'column')
    })

    it('has header ul with no margin on non-mobile', function() {
        cy.get('header ul').should('have.css', 'margin-top').and('equal', '0px')
        cy.get('header ul').should('have.css', 'margin-bottom').and('equal', '0px')
    })

    it('has header ul with 1em top/bottom margins on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('header ul').should('have.css', 'margin-top').and('equal', '16px')
        cy.get('header ul').should('have.css', 'margin-bottom').and('equal', '16px')
    })

    it('has header ul with normal text alignment on non-mobile', function() {
        cy.get('header ul').should('have.css', 'text-align').and('equal', 'start')  
    })

    it('has header ul with centered text alignment on mobile', function() {
        cy.viewport('iphone-6')
        cy.get('header ul').should('have.css', 'text-align').and('equal', 'center')  
    })

    it('uses specific selector for header hyperlinks', function() {
        cy.viewport('iphone-6').then(() => {
            var el = Cypress.$('<a id="testel" href="#testel">clickme</a>')
            Cypress.$('body').append(el)

            cy.get('#testel').should('have.css', 'text-decoration').and('match', /none/)
        })
    })

    it('has thick top border on header hyperlinks in non-mobile', function() {
        cy.get('header a').should('have.css', 'border-top').and('match', /4px.*solid/)
    })

    it('has NO top border on header hyperlinks in mobile', function() {
        cy.viewport('iphone-6')
        cy.get('header a').should('have.css', 'border-top').and('match', /none/)
        throw new Error('Check for no hover border..')
    })

    it('has no underline on header hyperlinks in non-mobile', function() {
        cy.get('header a').should('have.css', 'text-decoration').and('match', /none/)
    })

    it('has underline on header hyperlinks in mobile', function() {
        cy.viewport('iphone-6').then(() => {
            throw new Error('Check this manually...')
        })
    })

    it('has burger element on all pages', function() {
        cy.get('.burger')

        visit_page_using('links.html', 'macbook-13')
        cy.get('.burger')

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('.burger')
    })

    it('has burger element hidden on non-mobile ', function() {
        cy.get('.burger').should('be.hidden')
    })

    it('has burger element visible on mobile ', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('be.visible')

    })

    it('has 40px wide burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('have.css', 'width').and('equal', '40px')
    })

    it('has 25px high burger element', function() {
        cy.viewport('iphone-6').then(() => {
            cy.get('.burger').should('have.css', 'height').and('equal', '25px')
        })
    })

    it('has auto left & right margins on burger element', function() {
        cy.viewport('iphone-6', 'landscape').then(() => {
            cy.get('.burger').should('have.css', 'margin-left').and('match', /28[012].5px/)
            cy.get('.burger').should('have.css', 'margin-right').and('match', /28[012].5px/)
        })
    })

    it('has 1em top margin on burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('have.css', 'margin-top').and('equal', '16px')
    })

    it('has 5px top border on burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('have.css', 'border-top').and('match', /5px.*solid/)
    })

    it('has ONLY top border on burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('have.css', 'border-bottom').and('match', /none/)
        cy.get('.burger').should('have.css', 'border-left').and('match', /none/)
        cy.get('.burger').should('have.css', 'border-right').and('match', /none/)
    })

    it('has pointer cursor on burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('have.css', 'cursor').and('not.match', /auto|default|none/)
    })

    it('has content on ::before and ::after elements of burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').before('content').should('equal', '')
        cy.get('.burger').after('content').should('equal', '')
    })

    it('has content on ::before and ::after elements of burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').before('border-top').should('match', /5px.*solid/)
        cy.get('.burger').after('border-top').should('match', /5px.*solid/)
    })

    it('has relative position on burger', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').should('have.css', 'position').and('equal', 'relative')
    })

    it('has absolute position on ::before and ::after elements of burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').before('position').should('equal', 'absolute')
        cy.get('.burger').after('position').should('equal', 'absolute')
    })

    it('has top position spacing on ::before and ::after elements of burger element', function() {
        cy.viewport('iphone-6')
        cy.get('.burger').before('top').should('not.equal', '0px')
        cy.get('.burger').after('top').should('not.equal', '0px')
    })

    it('passes visual burger check', function() {
        throw new Error('Check this manually...')        
    })

    it('has sc logo images', function() {
        cy.request({url: Cypress.env('root_url') + 'images/sc-logo.png', failOnStatusCode: false}).then(res => { expect(res.status, "Status code").to.equal(200) })
        cy.request({ url: Cypress.env('root_url') + 'images/sc-logo@1.5x.png', failOnStatusCode: false}).then(res => { expect(res.status, "Status code").to.equal(200) })
        cy.request({ url: Cypress.env('root_url') + 'images/sc-logo@2x.png', failOnStatusCode: false}).then(res => { expect(res.status, "Status code").to.equal(200) })
        cy.request({ url: Cypress.env('root_url') + 'images/sc-logo@3x.png', failOnStatusCode: false}).then(res => { expect(res.status, "Status code").to.equal(200) })
        cy.request({ url: Cypress.env('root_url') + 'images/sc-logo@4x.png', failOnStatusCode: false}).then(res => { expect(res.status, "Status code").to.equal(200) })
    })

    it('has sc logo on all pages', function() {
        cy.get('footer img:last-child')
        
        visit_page_using('links.html', 'macbook-13')
        cy.get('footer img:last-child')

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('footer img:last-child')
    })

    it('uses correct sc logo img src', function() {
        cy.get('img[src*="mages/sc-logo.png"]')
    })

    it('uses correct sizes attr on sc logo img', function() {
        cy.get('img[src*="sc-logo"]').should('have.attr', 'sizes').and('equal', '70px')
    })

    it('has srcset on sc logo img', function() {
        cy.get('img[src*="sc-logo"][srcset]')
    })

    it('has correct srcset on sc logo img', function() {
        cy.get('img[src*="sc-logo"]').should('have.attr', 'srcset').and('match', /images\/sc-logo@1\.5x\.png\s+(105w|1.5x)/i)
        cy.get('img[src*="sc-logo"]').should('have.attr', 'srcset').and('match', /images\/sc-logo@2x\.png\s+(140w|2x)/i)
        cy.get('img[src*="sc-logo"]').should('have.attr', 'srcset').and('match', /images\/sc-logo@3x\.png\s+(210w|3x)/i)
        cy.get('img[src*="sc-logo"]').should('have.attr', 'srcset').and('match', /images\/sc-logo@4x\.png\s+(280w|4x)/i)
    })

    it('has alt on sc logo img', function() {
        cy.get('img[src*="sc-logo"]').should('have.attr', 'alt').and('not.match', /^\s*$/)
    })

})
