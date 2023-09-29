import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


function checkLayout() {

  it('has layout changes', function() {
  })

}

describe('Width Wrap', function() {

  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('exists', function() {
      cy.get('.width-wrap')
  })

  it('exists in all pages', function() {
      visit_page_using('glossary.html', 'macbook-13')
      cy.get('.width-wrap')
      visit_page_using('links.html', 'macbook-13')
      cy.get('.width-wrap')
  })

  it('is only child of body', function() {
      cy.get('body > .width-wrap')
      cy.get('body > *').should('have.lengthOf', 1)
  })

  it('has max-width of 1024px', function() {
      cy.get('.width-wrap').should('have.css', 'max-width', '1024px')
  })

  it('has auto left & right margins', function() {
      cy.get('.width-wrap').should('have.css', 'margin-left').and('equal', '95px')
      cy.get('.width-wrap').should('have.css', 'margin-right').and('equal', '95px')
  })

  it('has no width', function() {
      visit_page_using('index.html', 'iphone-3')
      cy.get('.width-wrap').should('have.css', 'width').and('match', /25\dpx/)
  })

  it('has 2em left & right padding', function() {
      cy.get('.width-wrap').should('have.css', 'padding-left', '32px')
      cy.get('.width-wrap').should('have.css', 'padding-right', '32px')
  })

  it('has 3em bottom margin', function() {
      cy.get('.width-wrap').should('have.css', 'margin-bottom', '48px')
  })

  it('has 3em bottom margin on footer', function() {
      cy.get('.width-wrap').should('have.css', 'margin-bottom', '48px')
  })

  it('has solid black 1px 30% transparent left/right/bottom borders', function() {
    cy.get('.width-wrap').should('have.css', 'border-bottom', '1px solid rgba(0, 0, 0, 0.3)')
    cy.get('.width-wrap').should('have.css', 'border-left', '1px solid rgba(0, 0, 0, 0.3)')
    cy.get('.width-wrap').should('have.css', 'border-right', '1px solid rgba(0, 0, 0, 0.3)')
  })

  it('has no top border', function() {
      cy.get('.width-wrap').should('have.css', 'border-top').and('match', /none/)
  })

  it('has no header ul margin', function() {
      cy.get('header ul').should('have.css', 'margin', '0px')
  })

  it('doesn\'t override non-heaer ul margins', function() {
      visit_page_using('links.html', 'macbook-13')
      cy.get('main ul').should('have.css', 'margin').and('not.equal', '0px')  
  })

  it('has no header ul padding', function() {
      cy.get('header ul').should('have.css', 'padding', '0px')
  })

  it('doesn\'t override non-heaer ul padding', function() {
      visit_page_using('links.html', 'macbook-13')
      cy.get('main ul').should('have.css', 'padding').and('not.equal', '0px')  
  })

  it('has different bg color than body', function() {
      let mainColor = Cypress.$('body').css('background-color')
      cy.get('.width-wrap').should('have.css', 'background-color').and('not.match', to_regex(mainColor))
  })

  it('has box-shadow', function() {
      cy.get('.width-wrap').should('have.css', 'box-shadow').and('not.equal', 'none')
  })

  it('has correct box-shadow', function() {
      cy.get('.width-wrap').should('have.css', 'box-shadow').and('match', /rgba\(.*0\.2\) 0px 0px 4px 0px/)
  })

})

describe('Headings', function() {

  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('have correct figure > img selector', function() {
      var i = Cypress.$('<img src="https://via.placeholder.com/150">')
      Cypress.$('body').append(i)
      cy.wrap(i).should('have.css', 'box-shadow').and('equal', 'none')
  })

  it('have box-shadowed image', function() {
    cy.get('figure img').should('have.css', 'box-shadow').and('not.equal', 'none')
  })

  it('have correctly box-shadowed image', function() {
    cy.get('figure img').should('have.css', 'box-shadow').and('match', /rgba\(.*0\.5\) 2px 2px 3px 0px/)
  })

  it('have text-shadow', function() {
    cy.get('h1').should('have.css', 'text-shadow').and('not.equal', 'none')
    cy.get('h2').should('have.css', 'text-shadow').and('not.equal', 'none')
  })

  it('have correct text-shadow', function() {
    cy.get('h1').should('have.css', 'text-shadow').and('match', /rgba\(.*0\.2\) 1px 1px 1px/)
    cy.get('h2').should('have.css', 'text-shadow').and('match', /rgba\(.*0\.2\) 1px 1px 1px/)
  })

  it('are transparent in color', function() {
    cy.get('h1').should('have.css', 'color').and('match', /rgba\(\d+,\s*\d+,\s*\d+,\s*0\)/)
    cy.get('h2').should('have.css', 'color').and('match', /rgba\(\d+,\s*\d+,\s*\d+,\s*0\)/)
  })

  it('use background-clip: text', function() {
    cy.get('h1').should('have.css', 'background-clip', 'text')
    cy.get('h2').should('have.css', 'background-clip', 'text')
  })

  it('use vendor prefixes for background-clip', function() {
    cy.get('h1').should('have.css', '-webkit-background-clip', 'text')
    cy.get('h2').should('have.css', '-webkit-background-clip', 'text')
  })

  it('use gradient background', function() {
    cy.get('h1').should('have.css', 'background-image').and('match', /-gradient/)
    cy.get('h2').should('have.css', 'background-image').and('match', /-gradient/)
  })


  it('has hyperlink to cssgradient.io on links pages', function() {
    visit_page_using('links.html', 'macbook-13')
    cy.get('main ul li a[href*="cssgradient"][target="_blank"]')
  })

})

describe('<hr>', function() {

  beforeEach(function() {
    visit_page_using('index.html', 'macbook-13')
  })

  it('has correct footer > hr selector', function() {
      var h = Cypress.$('<hr>')
      Cypress.$('body').append(h)
      expect(h.width()).to.equal(Cypress.$('body').width()-2)

  })

  it('has 50vw width', function() {
      Cypress.$('body').width(500)
      cy.get('footer hr').should('have.css', 'width').and('equal', '640px')
  })

  it('has 300px min-width', function() {
      cy.get('footer hr').should('have.css', 'min-width').and('equal', '300px')  
  })

  it('has 80% max-width', function() {
      throw new Error("TODO: test this properly")
  })  

  it('has top and bottom margins', function() {
      cy.get('footer hr').should('have.css', 'margin').and('match', /36px.*24px/)
  })

  it('has auto left/right margins', function() {
    throw new Error("TODO: test this properly")
  })

  it('has top and bottom borders', function() {
      cy.get('footer hr').should('have.css', 'border-top').and('not.equal', 'none')
      cy.get('footer hr').should('have.css', 'border-bottom').and('not.equal', 'none')
  })

  it('has correct top and bottom borders', function() {
      cy.get('footer hr').should('have.css', 'border-top').and('match', /3px\s*solid/)
      cy.get('footer hr').should('have.css', 'border-bottom').and('match', /8px\s*dotted/)
  })

  it('has same top and bottom border color', function() {
      var topColor = Cypress.$('footer hr').css('border-top-color')
      var botColor = Cypress.$('footer hr').css('border-bottom-color')
      expect(topColor).to.equal(botColor)
  })

  it('has no left/right border', function() {
      cy.get('footer hr').should('have.css', 'border-right').and('match', /none/)
      cy.get('footer hr').should('have.css', 'border-left').and('match', /none/)
  })

  it('has top-right and top-left border radius', function() {
      cy.get('footer hr').should('have.css', 'border-top-right-radius').and('equal', '8px')
      cy.get('footer hr').should('have.css', 'border-top-left-radius').and('equal', '8px')  
  })

  it('has NO bot-right and bot-left border radius', function() {
      cy.get('footer hr').should('have.css', 'border-bottom-right-radius').and('equal', '0px')
      cy.get('footer hr').should('have.css', 'border-bottom-left-radius').and('equal', '0px')  
  })
})