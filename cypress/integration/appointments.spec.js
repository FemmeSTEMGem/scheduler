describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday")
  })

  it("should book an interview", () => {
    cy.get("[alt=Add]")
    .first()
    .click()

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']").click()

    cy.contains("Save").click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .click({force: true})

    cy.get("[alt='Tori Malcolm']")
    .click()

    cy.get("[data-testid=student-name-input]")
    .clear()
    .type("Shannon Piccinin")

    cy.contains("Save").click()

    cy.contains(".appointment__card--show", "Tori Malcolm")
    cy.contains(".appointment__card--show", "Shannon Piccinin")
  })

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
    .click({force: true})

    cy.contains("Confirm").click()

    cy.contains("Deleting").should("exist")
    cy.contains("Deleting").should('not.exist')

    cy.contains(".appointment__card--show", "Archie Coheh")
    .should('not.exist')
  })
});


// 		2) Clicks the delete button for the existing appointment
// 		3) Clicks the confirm button
//    4) Sees that the appointment slot is empty
