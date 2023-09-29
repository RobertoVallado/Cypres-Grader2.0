import {
  visit_page_using,
  it_has_correct_css,
  to_regex
} from '../../../support/grader-helpers.js'


describe('Table', function() {

    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })

    it('is in section between haiku and gallery', function() {
        cy.get('section:nth-child(4) table')
    })

    it('has level-2 heading as immediate older sibling', function() {
        cy.get('section:nth-child(4) h2 + table')
    })

    it('has border-collapse', function() {
        cy.get('table').should('have.css', 'border-collapse').and('equal', 'collapse')
    })

    it('has first-row heading cells', function() {
        cy.get('table tr:first-child th').should('have.length', 3)
    })

    it('has two rows with a first cell that spans the other rows', function() {
        cy.get('table tr [rowspan]:first-child').should('have.length', 2).and('have.attr', 'rowspan').and('be.greaterThan', 1)
    })

    it('has two 2-cell rows and the rest 3-cell rows', function() {
        var rows = Cypress.$('table tr')

        var totalRows = rows.length;
        var rowsWith2Cells = 0;
        var rowsWith3Cells = 0;
        rows.each(function() {
            var cells = Cypress.$(this).find('td,th')

            if ( cells.length == 2 ) {
                rowsWith2Cells += 1;
            } else if ( cells.length == 3 ) {
                rowsWith3Cells += 1;
            } else {
                throw new Error("Table has row with less than 2 or more than 3 cells")
            }
        })

        expect(rowsWith2Cells, "total minus 2 rows with 2 cells").to.equal(totalRows-3)
        expect(rowsWith3Cells, "3 rows with 3 cells").to.equal(3)
    })

    it('has th cells with 10% alpha black bg', function() {
        cy.get('table th').should('have.css', 'background-color').and('match', to_regex('rgba(0,0,0,0.1'))
    })

    it('has td cells in odd rows with 10% alpha black bg', function() {
        cy.get('table tr:nth-child(odd) td').should('have.css', 'background-color').and('match', to_regex('rgba(0,0,0,0.1'))
    })

    it('has td cells in even rows with 5% alpha black bg', function() {
        cy.get('table tr:nth-child(even) td').should('have.css', 'background-color').and('match', to_regex('rgba(0,0,0,0.05'))
    })

    it('has 0.3em top bottom and 1em left right cell padding', function() {
        cy.get('table th').should('have.css', 'padding').and('equal', '4.8px 16px')
        cy.get('table td').should('have.css', 'padding').and('equal', '4.8px 16px')
    })

    it('has 3px solid left right border on all cells', function() {
        var bgcolor = Cypress.$('.width-wrap').css('background-color')
        cy.get('table th').should('have.css', 'border-left').and('equal', '3px solid ' + bgcolor)
        cy.get('table th').should('have.css', 'border-right').and('equal', '3px solid ' + bgcolor)
        cy.get('table td').should('have.css', 'border-left').and('equal', '3px solid ' + bgcolor)
        cy.get('table td').should('have.css', 'border-right').and('equal', '3px solid ' + bgcolor)
    })


    it('has 3px solid top border on cells in 2nd and 7th rows', function() {
        var bgcolor = Cypress.$('.width-wrap').css('background-color')
        cy.get('table tr:nth-child(2) th').should('have.css', 'border-top').and('equal', '3px solid ' + bgcolor)
        cy.get('table tr:nth-child(2) td').should('have.css', 'border-top').and('equal', '3px solid ' + bgcolor)
        cy.get('table tr:nth-child(7) th').should('have.css', 'border-top').and('equal', '3px solid ' + bgcolor)
        cy.get('table tr:nth-child(7) td').should('have.css', 'border-top').and('equal', '3px solid ' + bgcolor)
    })

    it('passes visual check', function() {
        throw new Error("Do visual check of table")
    })
})

function it_has_label_for(field_name) {

    it('has label for ' + field_name, function() {
        var id = Cypress.$('[name="' + field_name + '"]').attr('id')
        cy.get('label[for="' + id + '"] + #' + id)
    })

}
function it_has_input_with_label(type, field_name) {
    it('has ' + field_name, function() {
        cy.get('.survey form input[type="' + type + '"][name="' + field_name + '"]')
    })

    it_has_label_for(field_name)

}

describe('Form', function() {

    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })

    it('is in section that is last child of <main>', function() {
        cy.get('main > section:last-child.survey form')
    })

    it('section spans 2 grid columns', function() {
        cy.get('.survey').should('have.css', 'grid-column').and('match', /(span 2 \/ auto)|(auto \/ span 2)/)
    })

    it('has level-2 heading as immediate older sibling', function() {
        cy.get('.survey > h2 + form')
    })

    it_has_input_with_label('text', 'name_field')

    it('has required name_field', function() {
        cy.get('[name="name_field"]:required')
    })

    it_has_input_with_label('email', 'email_field')

    it('has required email_field', function() {
        cy.get('[name="email_field"]:required')
    })

    it_has_input_with_label('number', 'best_integer')

    it('has best_integer field with step of 1', function() {
        throw new Error("Make this a requirement next year")
        cy.get('[name="best_integer"]').should('have.attr', 'step').and('equal', '1')
    })

    it_has_input_with_label('date', 'best_day')

    it('has best_bear', function() {
        cy.get('.survey form select[name="best_bear"]')
    })

    it_has_label_for('best_bear')

    it('has 7 best_bear options', function() {
        cy.get('[name="best_bear"] > option').should('have.length', 7)
    })

    it('has 4 labels as siblings (for radio buttons)', function() {
        cy.get('.survey form label + label + label + label')
    })

    it('has 3 radios nested inside labels', function() {
        cy.get('label > [type="radio"]').should('have.length', 3)
    })

    it('has 3 radios in same group', function() {
        var $radios = Cypress.$('label > [type="radio"]')

        var s = new Set();
        $radios.each(function() {
            s.add(Cypress.$(this).attr('name'))
        })

        expect(s.size, "only 1 group name").to.equal(1)
    })

    it('has yes radio', function() {
        cy.get('[type="radio"][value="yes"]')
    })

    it('has no radio', function() {
        cy.get('[type="radio"][value="no"]')
    })

    it('has ? radio', function() {
        cy.get('[type="radio"][value="?"]')
    })

    it('has ? radio check', function() {
        cy.get('[type="radio"][value="?"]:checked')
    })

    it('has life_meaning', function() {
        cy.get('.survey form textarea[name="life_meaning"]')
    })

    it_has_label_for('life_meaning')

    it('has life_meaning with 10 text rows', function() {
        cy.get('[name="life_meaning"][rows="10"]')
    })

    it('has life_meaning with placeholder', function() {
        cy.get('[name="life_meaning"][placeholder]').should('have.attr', 'placeholder').and('not.be.empty')
    })

    it('has submit button', function() {
        cy.get('.survey form [type="submit"]')
    })

    it('is grid container', function() {
        cy.get('.survey form').should('have.css', 'display').and('equal', 'grid')
    })

    it('has labels with 1em top 0.5em bottom margin', function() {
        cy.get('form label').should('have.css', 'margin-top').and('equal', '16px')
        cy.get('form label').should('have.css', 'margin-bottom').and('equal', '8px')
    })

    it('has send button with 1em top margin', function() {
        cy.get('form [type="submit"]').should('have.css', 'margin-top').and('equal', '24px')
    })

    it('has right-justify-selfed send button', function() {
        cy.get('form [type="submit"]').should('have.css', 'justify-self').and('equal', 'end')
    })

    it('has send button with 24px font size', function() {
        cy.get('form [type="submit"]').should('have.css', 'font-size').and('equal', '24px')
    })

    it('has send button with 1em t/b and 2em l/r padding', function() {
        cy.get('form [type="submit"]').should('have.css', 'padding').and('equal', '24px 48px')
    })

    it('has method POST', function() {
        cy.get('.survey form').should('have.attr', 'method').and('match', /^post$/i)
    })

    it('has formspree action', function() {
        cy.get('.survey form').should('have.attr', 'action').and('match', /^https:\/\/formspree\.io\//i)
    })

})

describe('Burger', function() {

    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })

    it('has checkbox companion', function() {
        cy.get('header nav input[type="checkbox"]')
    })

    it('has checkbox companion on all pages', function() {
        visit_page_using('links.html', 'macbook-13')
        cy.get('header nav input[type="checkbox"] ~ label.burger')  

        visit_page_using('glossary.html', 'macbook-13')
        cy.get('header nav input[type="checkbox"] ~ label.burger')  
    })

    it('is label', function() {
        cy.get('header nav label.burger')
    })

    it('is label for checkbox', function() {
        var label_for = Cypress.$('header nav label.burger').attr('for')
        var cb_id = Cypress.$('header nav input[type="checkbox"]').attr('id')

        expect(label_for, "burger label is same as cb id").to.equal(cb_id)
    })

    it('has hidden checkbox companion', function() {
        cy.get('header nav [type="checkbox"]').should('not.be.visible')
    })

    it('has block display', function() {
        visit_page_using('index.html', 'iphone-6')
        cy.wait(50)
        cy.get('label.burger').should('have.css', 'display').and('equal', 'block')
    })

})

describe('Menu', function() {

    beforeEach(function() {
      visit_page_using('index.html', 'iphone-6')
    })

    it('is visible on non-mobile', function() {
        visit_page_using('index.html', 'macbook-13')

        cy.get('header nav ul').should('be.visible')
    })

    it('is retracted by default', function() {
        cy.get('header nav ul').should('have.css', 'height').and('equal', '0px')
    })

    it('has retracted menu visual fixes', function() {
        cy.get('header nav ul').should('have.css', 'overflow').and('equal', 'hidden')
        cy.get('header nav ul').should('have.css', 'margin-top').and('equal', '16px')
        cy.get('header nav ul').should('have.css', 'margin-bottom').and('equal', '16px')

        cy.get('header nav ul').should('have.css', 'padding-top').and('equal', '0px')
        cy.get('header nav ul').should('have.css', 'padding-bottom').and('equal', '0px')
    })

    it('expands when burger is clicked', function() {

        cy.get('.burger').click().then(() => {
            cy.wait(550)
            cy.get('header nav ul').should('have.css', 'height').and('match', /\d\d\d*px/)
        })
        
    })

    it('has height transition', function() {
        cy.get('header nav ul').should('have.css', 'transition')
    })

    it('has correct height transition-property', function() {
        cy.get('header nav ul').should('have.css', 'transition-property').and('equal', 'height')
    })

    it('has correct height transition-duration', function() {
        cy.get('header nav ul').should('have.css', 'transition-duration').and('equal', '0.5s')
    })

    it('has correct height transition-timing-function', function() {
        cy.get('header nav ul').should('have.css', 'transition-timing-function').and('equal', 'ease-in-out')
    })

    it('animates burger icon', function() {
        throw new Error("Check burger icon animation manually: \n - main rotation \n - bottom bar rotation \n - middle bar opacity \n - transition animation on EACH of the above")
    })

})


describe('Script', function() {

    beforeEach(function() {
      visit_page_using('index.html', 'macbook-13')
    })

    it('is loaded in head', function() {
        cy.get('head script[src*="aguette"]')
    })

    it('is loadable', function() {
        var url = Cypress.$('head script[src*="aguette"]').attr('src')

        cy.request(Cypress.env('root_url') + url)
    })

    it('has stylesheet linked in head', function() {
        cy.get('head link[href*="aguette"]')
    })

    it('has loadable stylesheet', function() {
        var url = Cypress.$('head link[href*="aguette"]').attr('href')

        cy.request(Cypress.env('root_url') + url)
    })

    it('has body script', function() {
        cy.get('body script')
    })

    it('is initialized', function() {
        cy.get('.gallery a:first-child').click()
        cy.wait(500)
        cy.get('#baguetteBox-overlay').should('be.visible')
    })
})