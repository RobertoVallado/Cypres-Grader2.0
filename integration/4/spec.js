import {
    visit_page_using
  } from '../../../support/grader-helpers.js'

  describe('Table', function() {
    

    beforeEach(() => {
      visit_page_using('index.html', 'macbook-13')
    })

    it('exists', () => {
      cy.get('main > table').should('exist')
    })

    it('has caption', () => {
      cy.get('main > table > caption:first-child').should('exist').and('contain', 'Courses')
    })
    
    it('has 8 header cells', () => {
      cy.get('table th').should('have.length.greaterThan', 6)
    })

    it('has thead with 2 rows', () => {
      cy.get('table > thead > tr').should('have.length', 2)
    })

    it('has thead with 5 header cells rows', () => {
      cy.get('table > thead > tr > th').should('have.length', 5)
    })

    it('has thead with first header spanning 2 rows', () => {
      cy.get('table > thead > tr:first-child > th:first-child[rowspan="2"][scope="col"]')
    })

    it('has thead with second header, first row spanning 3 cols', () => {
      cy.get('table > thead > tr:first-child > th:nth-child(2)[colspan="3"][scope="colgroup"]')
    })

    it('has second row with 3 header cols', () => {
      cy.get('table > thead > tr:nth-child(2) > th[scope="col"]').should('have.length', 3)
    })

    it('has tfoot with 1 row', () => {
      cy.get('table > tfoot > tr').should('have.length', 1)
    })

    it('has tfoot with 1 row header that spans 3 cols', () => {
      cy.get('table > tfoot > tr > th:first-child[colspan="3"][scope="row"]').should('have.length', 1)
    })

    it('has tfoot with 1 data cell', () => {
      cy.get('table > tfoot > tr > td').should('have.length', 1).and('not.be.empty')
    })

    it('has tbody with several rows', () => {
      cy.get('table > tbody > tr').should('have.length.greaterThan', 3)
    })

    it('has tbody with 2 row headers that each span several rows', () => {
      cy.get('table > tbody > tr > th:first-child[rowspan][scope="rowgroup"]').should('have.length.greaterThan', 0)

      let rows = Cypress.$('table > tbody > tr').length
      let headers = Cypress.$('table > tbody th')
      let rowspan1 = parseInt(headers.eq(0).attr('rowspan'))

      let rowspan2 = headers.length > 1 ? parseInt(headers.eq(1).attr('rowspan')) : 0
      
      expect(rows).to.equal(rowspan1 + rowspan2)
    })

    it('has tbody rows with data', () => {
      let rows = Cypress.$('table > tbody > tr').length
      let cells = Cypress.$('table > tbody > tr > td').length

      expect(cells).to.equal(rows*3)
    })
  })
  
  function it_is_grouped_with_label(name, label_regex, props=null) {

    it(`has ${name} grouped in <p> with <label>`, () => {
      let field = Cypress.$('[name="' + name + '"]')

      expect(field.parent().prop('tagName')).to.equal('P', "Field parent is <p>")

      let siblings = field.siblings()
      expect(siblings.length).to.equal(1, "Field has one sibling")

      let label = siblings.eq(0)
      expect(label.prop('tagName')).to.equal('LABEL', "Sibling is label")

      expect(label.attr('for')).to.equal(field.attr('id'), "For and id match")

      expect(label.text()).to.match(label_regex, "Correct label text")
    })

    if ( props && props.required ) {
      it(`has ${name} with accessible 'required' label`, () => {
        let id = Cypress.$('[name="' + name + '"]').attr('id')
        cy.get(`label[for="${id}"] abbr[title="required"][aria-label="required"]`).should('exist').and('not.be.empty')
      })
    }  
  }
  function it_has_control(type, name, label_regex, props=null) {

      it('has ' + name + ' control', function() {
          if ( type === 'select' ) {
            cy.get(`form select[name="${name}"]`)
          } else if ( type === 'textarea' ) {
            cy.get(`form textarea[name="${name}"]`)
          } else {
            cy.get(`form input[type="${type}"][name="${name}"]`)
          }
      })

      it_is_grouped_with_label(name, label_regex, props)
      
      if ( props ) {
        for ( const key in props ) {
          let val = props[key]
          if ( typeof val === "boolean" && val ) {
            it(`has ${key} set in ${name}`, () => {
              cy.get(`[name="${name}"][${key}]`)  
            })
          } else if ( typeof val === "string" ) {
            it(`has ${name} with ${key}=${val}`, () => {
              cy.get(`[name="${name}"][${key}="${val}"]`)
            })
          }
        }
      }

  }

  describe('Form', function() {
    

    beforeEach(() => {
      visit_page_using('survey.html', 'macbook-13')
    })

    it('has level-1 heading', () => {
      cy.get('main > h1').should('contain', 'Survey')
    })

    it('has form', () => {
      cy.get('main > form').should('exist')
    })

    it_has_control('text', 'name_field', /name/i, {required: true})
    it_has_control('email', 'email_field', /email/i, {required: true})
    it_has_control('number', 'best_whole_number', /number/i, {min: "1"})
    it_has_control('date', 'best_day', /day/i)
    it_has_control('select', 'best_bear', /bear/i, {required: true})

    it('has best_bear field options', () => {
      cy.get('[name="best_bear"] > option').should('have.length.greaterThan', 3)
      cy.get('[name="best_bear"] > option:first-child').should('exist').and('have.value','')
    })

    it('has fieldset legend', () => {
      cy.get('fieldset > legend:first-child').should((el) => {
        expect(el.text()).to.match(/button/i)
      })
    })

    it('has fieldset radio button list', () => {
      cy.get('form fieldset ul > li > input[type="radio"]').should('have.length', 3)
      cy.get('input[type="radio"][value="yes"]').should('have.length', 1)
      cy.get('input[type="radio"][value="no"]').should('have.length', 1)
      cy.get('input[type="radio"][value="?"]').should('have.length', 1)
    })

    it('has one radio button checked by default', () => {
      cy.get('input[type="radio"][checked][value="?"]').should('have.length', 1)
    })

    it('has radio buttons in a group', () => {
      let name = Cypress.$('input[type="radio"]').attr('name')

      cy.get(`input[name="${name}"]`).should('have.length', 3)
    })

    it('has labels for radio buttons', () => {
      cy.get('input[type="radio"]').then((r) => {
        r.each((i, item) => {
          let id = item.id
          cy.get(`li > label[for="${id}"]`).should('have.length', 1)
        })
      })
    })

    it_has_control('textarea', 'life_meaning', /meaning/i, {rows: "5", cols: "50", placeholder: true})

    it('has button', () => {
      cy.get('form > p > button[type="submit"]').should((el) => {
        expect(el.text()).to.match(/send|submit/i)
      })
    })

    it('has method POST', () => {
      cy.get('form[method="post"]')
    })

    it('has formspree action', () => {
      cy.get('form[action*="formspree"]')
    })

  })