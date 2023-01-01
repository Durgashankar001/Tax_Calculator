import Table from "../../src/Components/Table"
import App from "../../src/App"
import { invoices } from "../../db.json"

describe('Test the tax functionality in Table', () => {
  beforeEach(() => {
    cy.mount(<Table />)
    cy.mount(<App />)
  })
// check initial condition
  it('check everything is working fine', () => {
    cy.get('[data-cy="show-tax"]').contains("Calculated Tax Value :");
    cy.get('[data-cy="tax-value"]').contains("You are not selecting anything")
  })

  //validte table function
  const checkTable = (data, index) => {
    cy.get("tbody tr").eq(index).contains("td", data.sno)
    cy.get("tbody tr").eq(index).contains("td", data.amount)
    cy.get("tbody tr").eq(index).contains("td", data.item_type)
    cy.get("tbody tr").eq(index).contains("td","Calculate")
  }
//check the table validation condition
  it("checking the table validation", () => {
    cy.get("tbody tr").should("have.length", invoices.length)
    invoices.forEach((e,i)=>{
      checkTable(e,i)
    })
  })

//check the tax rate part in the table
  it("checking the tax rate part", () => {
    invoices.forEach((e, i) => {
      const x = e.item_type == 0 ? "5%" : e.item_type == 1 ? "8%" : e.item_type == 2 ? "12%" : null
      if (x) {
        cy.get("tbody tr").eq(i).contains(x == null ? "NA" : x)
      }
    })
  })


  //checking the main functionality that works on to calculate the tax
  it("check tax functionality", () => {
    invoices.forEach((e, i) => {
      const x = e.item_type == 0 ? 0.05 : e.item_type == 1 ? 0.08 : e.item_type == 2 ? 0.12 : null
      if (x) {
        cy.get("tbody tr").eq(i)
          .find('button')
          .click().then(() => {
            cy.get('[data-cy="tax-value"]').contains(e.amount * x)
          })
      }
    })
  })
})