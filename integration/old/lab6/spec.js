import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


describe('Header', function() {

  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has NO ul float', function() {
      cy.get('header ul').should('have.css', 'float').and('equal', 'none')
  })

  it('has NO ul li float', function() {
      cy.get('header ul li').should('have.css', 'float').and('equal', 'none')
  })

  it('has flex ul', function() {
      cy.get('header ul').should('have.css', 'display').and('equal', 'flex')
  })

  it('has center-justified ul', function() {
      cy.get('header ul').should('have.css', 'justify-content').and('equal', 'center')
  })

})

describe('Main', function() {

  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('is a grid container', function() {
      cy.get('main').should('have.css', 'display').and('equal', 'grid')
  })

  it('has 2 equally spaced columns', function() {
      cy.get('main').should('have.css', 'grid-template-columns').and('match', /463px 463px/)
  })

  it('has 2em column gap', function() {
      var gap1 = Cypress.$('main').css('column-gap')
      var gap2 = Cypress.$('main').css('grid-column-gap')

      if ( ! (gap1 == '32px' || gap2 == '32px' ) ) {
          throw new Error("One of " + gap1 + " & " + gap2 + " must be 32px");
      }
  })

  it('has bio section that spans 2 columns', function() {
      cy.get('main section:first-child').should('have.css', 'grid-column')
        .and('match', /1 \/ (3|span 2)|span 2 \/ auto|auto \/ span 2/)
  })
})

describe('Glossary Page', function() {

  beforeEach(function() {
    visit_page_using('glossary.html', 'macbook-13')
  })

  it('has section', function() {
      cy.get('section')
  })

  it('has section as only child of main', function() {
      cy.get('main > section')
      cy.get('main > :nth-child(2)').should('not.exist')
  })

  it('has section with class "glossary"', function() {
      cy.get('section.glossary')
  })

  it('has section that spans 2 columns', function() {
      cy.get('section').should('have.css', 'grid-column').and('match', /(span 2 \/ auto)|((auto|1) \/ (span 2|3))/)
  })

})

describe('Links Page', function() {

  beforeEach(function() {
    visit_page_using('links.html', 'macbook-13')
  })

  it('has section that spans 2 columns', function() {
      cy.get('section').should('have.css', 'grid-column').and('match', /(span 2 \/ auto)|((auto|1) \/ (span 2|3))/)
  })

})

describe('Vertical Layout', function() {
    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })

    it('uses 100vh body', function() {
        cy.viewport(1000,3000)
        cy.get('body').should('have.css', 'height').and('equal', '3000px')
    })

    it('uses flexbox body', function() {
        cy.get('body').should('have.css', 'display').and('equal', 'flex')
    })

    it('uses flexbox width-wrap', function() {
        cy.get('.width-wrap').should('have.css', 'display').and('equal', 'flex')
    })

    it('uses columnn-oriented width-wrap', function() {
        cy.get('.width-wrap').should('have.css', 'flex-direction').and('equal', 'column')
    })

    it('does NOT use min-height on width-wrap', function() {
        cy.get('.width-wrap').should('have.css', 'min-height').and('equal', 'auto')
    })

    it('has footer with auto top margin', function() {
        visit_page_using('links.html', 'macbook-13')
        cy.viewport(1000,1004)
        cy.get('footer').should('have.css', 'margin-top').and('not.equal', '0px')
    })
})

describe('Gallery', function() {
    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })

    it('exists', function() {
        cy.get('.gallery')
    })

    it('uses section element', function() {
        cy.get('section.gallery')
    })

    it('comes after haiku', function() {
        cy.get('main .gallery:nth-child(4)')
    })

    it('spans 2 columns', function() {
        cy.get('.gallery').should('have.css', 'grid-column').and('match', /(span 2 \/ auto)|((auto|1) \/ (span 2|3))/)
    })

    it('has level-2 header', function() {
        cy.get('.gallery h2')
    })

    it('has level-2 header as first child', function() {
        cy.get('.gallery > h2:first-child')
    })

    it('has header with text "Photo Gallery"', function() {
        cy.get('.gallery h2').contains('Photo Gallery')
    })

    it('has .gallery-thumbnails', function() {
        cy.get('.gallery .gallery-thumbnails')
    })

    it('has .gallery-thumbnails', function() {
        cy.get('.gallery .gallery-thumbnails:nth-child(2)')
    })

    it('has .gallery-thumbnails div', function() {
        cy.get('.gallery div.gallery-thumbnails:nth-child(2)')
    })

    it('has at least one gallery thumb', function() {
        cy.get('.gallery div:nth-child(2) a').should('have.length.at.least', 1)
    })

    it('has at least 15 gallery thumbs', function() {
        cy.get('.gallery div:nth-child(2) a').should('have.length.at.least', 15)
    })

    it('has 300x600 first image', function() {
        cy.get('.gallery div:nth-child(2) a:first-child img[src$="300/600"]')
    })

    it('has 600x600 10th image', function() {
        var url = Cypress.$('.gallery div:nth-child(2) a:nth-child(10) img').attr('src')
        expect(url).to.match(/id\/\d+\/600(\/600)?\/?$/)
    })

    it('has grid container div', function() {
        cy.get('.gallery div:nth-child(2)').should('have.css', 'display').and('equal', 'grid')
    })

    it('has four 25% wide cols', function() {
        cy.get('.gallery div:nth-child(2)').should('have.css', 'grid-template-columns').and('equal', '239.5px 239.5px 239.5px 239.5px')
    })

    it('has 100% width', function() {
        cy.get('.gallery').should('have.css', 'width').and('equal', '958px')
    })

    it('has 100% width on thumbs', function() {
        cy.get('.gallery img').should('have.css', 'width').and('equal', '240px')
    })

    it('has correct thumb img selector for img width', function() {
        var el = Cypress.$('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEXMzMyWlpacnJy+vr6jo6PFxcW3t7eqqqqxsbHbm8QuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVRYhe3QMQ6EIBAF0C+GSInF9mYTs+1ewRsQbmBlayysKefYO2asXbbYxvxHQj6ECQMAEREREf2NQ/fCtp5Zky6vtRMkSJEzhyISynWJnzH6Z8oQlzS7lEc/fLmmQUSvc16OrCPqRl1JePxQYo1ZSWVj9nxrrOb5esw+eXdvzTWfTERERHRXH4tWFZGswQ2yAAAAAElFTkSuQmCC" alt="" />')
        Cypress.$('header').width(50)
        Cypress.$('header').append(el)
        cy.wrap(el).should('have.css', 'width').and('equal', '100px');
    })

    it('has thumbs with block display', function() {
        cy.get('.gallery img').should('have.css', 'display').and('equal', 'block')
    })


    it('has correct thumb img selector for block display', function() {
        var el = Cypress.$('<img src="https://via.placeholder.com/100">')
        Cypress.$('header').append(el)
        cy.wrap(el).should('have.css', 'display').and('not.equal', 'block');
    })

    it('has row-span-2 on first image', function() {
        cy.get('.gallery div:nth-child(2) a:first-child.row-span-2')
    })

    it('has first image that spans 2 rows', function() {
        cy.get('.gallery div:nth-child(2) a:first-child')
          .should('have.css', 'grid-row')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)

    })

    it('has row-span-2 on 10th image', function() {
        cy.get('.gallery div:nth-child(2) a:nth-child(10).row-span-2')
    })

    it('has col-span-2 on 10th image', function() {
        cy.get('.gallery div:nth-child(2) a:nth-child(10).col-span-2')
    })

    it('has 10th image that spans 2 rows', function() {
        cy.get('.gallery div:nth-child(2) a:nth-child(10)')
          .should('have.css', 'grid-row')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
    })

    it('has 10th image that spans 2 cols', function() {
        cy.get('.gallery div:nth-child(2) a:nth-child(10)')
          .should('have.css', 'grid-column')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
    })

    it('has correct thumb img selector for block display', function() {
        var el = Cypress.$('<img src="https://via.placeholder.com/100">')
        Cypress.$('header').append(el)
        cy.wrap(el).should('have.css', 'display').and('not.equal', 'block');
    })

    it('has ANY row-span-2 spanning 2 rows', function() {
        var el = Cypress.$('<div class="row-span-2"></div>')
        Cypress.$('header').append(el)
        cy.wrap(el)
          .should('have.css', 'grid-row')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
    })

    it('has ANY col-span-2 spanning 2 cols', function() {
        var el = Cypress.$('<div class="col-span-2"></div>')
        Cypress.$('header').append(el)
        cy.wrap(el)
          .should('have.css', 'grid-column')
          .and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
    })
})