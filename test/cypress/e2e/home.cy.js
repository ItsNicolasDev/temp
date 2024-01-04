// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe("Index Page Tests", () => {
  it("1st click adds a new operand component with Pug elements", () => {
    cy.visit("#/input");
    // Cliquez une fois sur le bouton "Add a new operand"
    cy.dataCy("popupbutton").click();

    cy.dataCy("popup").should("be.visible"); // Vérifiez que la popup est visible

    cy.dataCy("inputPopup").type("counter_1"); // Saisissez un nom

    cy.dataCy("addOperandButton").click(); // Ajoutez un CounterComponent

    // Vérifiez que la popup est fermée
    cy.dataCy("popup").should("not.exist");

    // Vérifiez la présence du composant operand
    cy.dataCy("counterComponent-counter_1").should("exist");

    // Vérifiez la présence des éléments Pug (label, input et cinq boutons) dans le composant operand
    cy.dataCy("counterLabel").should("exist");
    cy.dataCy("operandInput").should("exist");
    cy.dataCy("incrementButton").should("exist");
    cy.dataCy("decrementButton").should("exist");
    cy.dataCy("clearButton").should("exist");
    cy.dataCy("saveButton").should("exist");
    cy.dataCy("restoreButton").should("exist");

    // Vérifiez la présence du composant résultat après le composant operand
    cy.dataCy("resultComponent").should("exist");

    cy.dataCy("operandInput").type("10");
    cy.dataCy("operandInput").should("have.value", "10");
    cy.dataCy("resultComponent").should("contain", "10");
    cy.dataCy("saveButton").click();

    cy.dataCy("clearButton").click();
    cy.dataCy("operandInput").should("have.value", "0");
    cy.dataCy("resultComponent").should("contain", "0");

    cy.dataCy("restoreButton").click();
    cy.dataCy("operandInput").should("have.value", "10");
    cy.dataCy("resultComponent").should("contain", "10");

    //test increment and decrement Button
    cy.dataCy("incrementButton").click();
    cy.dataCy("decrementButton").click();
    cy.dataCy("decrementButton").click();
    cy.dataCy("resultComponent").should("contain", "9");
  });

  it("2nd click adds an operator menu component and operand component with Pug elements", () => {
    cy.visit("#/input");
    cy.dataCy("popupbutton").click(); // Ouvrez la popup

    cy.dataCy("inputPopup").type("counter_1"); // Saisissez un nom

    cy.dataCy("addOperandButton").click(); // Ajoutez un CounterComponent

    // Vérifiez que la popup est fermée
    cy.dataCy("popup").should("not.exist");

    // Vérifiez que le CounterComponent a été ajouté avec le nom spécifié
    cy.dataCy("counterComponent-counter_1").should("exist");

    // Vérifiez que le résultat a été calculé correctement
    cy.dataCy("resultComponent").should("contain", "0");

    // Ajoutez un autre CounterComponent
    cy.dataCy("popupbutton").click(); // Ouvrez la popup à nouveau
    cy.dataCy("inputPopup").type("Deuxième CounterComponent");
    cy.dataCy("addOperandButton").click();

    // Vérifiez la présence des 7 éléments Pug dans le composant operand
    cy.dataCy("counterLabel").should("exist");
    cy.dataCy("operandInput").should("exist");
    cy.dataCy("incrementButton").should("exist");
    cy.dataCy("decrementButton").should("exist");
    cy.dataCy("clearButton").should("exist");
    cy.dataCy("saveButton").should("exist");
    cy.dataCy("restoreButton").should("exist");
  });

  it("Displays the initial state correctly", () => {
    cy.visit("#/input");
    // Vérifiez que la popup n'est pas visible au début
    cy.dataCy("popup").should("not.exist");

    // Vérifiez que le bouton "Ajouter un CounterComponent" est présent
    cy.dataCy("popupbutton").should("exist");

    // Vérifiez qu'aucun CounterComponent n'est affiché initialement
    cy.dataCy("counterComponent").should("not.exist");
  });

  it("Opens the popup and cancels adding a CounterComponent", () => {
    cy.visit("#/input");
    cy.dataCy("popupbutton").click(); // Ouvrez la popup

    cy.dataCy("popup").should("be.visible"); // Vérifiez que la popup est visible

    cy.dataCy("inputPopup").type("Nouveau CounterComponent"); // Saisissez un nom

    cy.dataCy("cancelButton").click(); // Cliquez sur le bouton "Cancel"

    cy.dataCy("popup").should("not.exist");

    // Vérifiez que le CounterComponent n'a pas été ajouté
    cy.dataCy("counterComponent").should("have.length", 0);
  });

  it("Opens the popup, adds a CounterComponent, and calculates the sum", () => {
    cy.visit("#/input");
    cy.dataCy("popupbutton").click(); // Ouvrez la popup

    cy.dataCy("inputPopup").type("counter_1"); // Saisissez un nom

    cy.dataCy("addOperandButton").click(); // Ajoutez un CounterComponent

    // Vérifiez que la popup est fermée
    cy.dataCy("popup").should("not.exist");

    // Vérifiez que le CounterComponent a été ajouté avec le nom spécifié
    cy.dataCy("counterComponent-counter_1").should("exist");

    // Vérifiez que le résultat a été calculé correctement
    cy.dataCy("resultComponent").should("contain", "0");

    // Ajoutez un autre CounterComponent
    cy.dataCy("popupbutton").click(); // Ouvrez la popup à nouveau
    cy.dataCy("inputPopup").type("counter_1counter_2");
    cy.dataCy("addOperandButton").click();

    // Vérifiez que le popup est fermé
    cy.dataCy("popup").should("not.exist");

    // Vérifiez que le deuxième CounterComponent a été ajouté
    cy.dataCy("counterComponent-counter_1counter_2").should("exist");

    // Vérifiez que l'opérateur a été ajouté automatiquement
    cy.get(".q-btn-dropdown__arrow-container").should("exist");

    // Vérifiez que le résultat a été calculé correctement
    cy.dataCy("total").should("contain", "0");

    cy.get(".q-btn-dropdown__arrow-container").click(); // Remplacez le sélecteur par le vôtre
    cy.get("[data-cy=select]").get(`[label="+"]`).click();
    cy.get("[data-cy=select]").should("contain", "+"); // Vérifiez que l'opérateur sélectionné est affiché

    cy.dataCy("counterComponent-counter_1").dataCy("operandInput").type("12");
    cy.dataCy("counterComponent-counter_1counter_2")
      .dataCy("operandInput")
      .type("3");

    cy.dataCy("resultComponent").should("contain", "15");

    cy.get(".q-btn-dropdown__arrow-container").click();
    cy.get("[data-cy=select]").get(`[label="-"]`).click();

    cy.dataCy("resultComponent").should("contain", "9");

    cy.get(".q-btn-dropdown__arrow-container").click();
    cy.get("[data-cy=select]").get(`[label="*"]`).click();

    cy.dataCy("resultComponent").should("contain", "36");

    cy.get(".q-btn-dropdown__arrow-container").click();
    cy.get("[data-cy=select]").get(`[label="/"]`).click();

    cy.dataCy("resultComponent").should("contain", "4");
  });
  it("Test of HW3", () => {
    cy.visit("/");
    cy.dataCy("keypadPage").click();
    cy.dataCy("inputPage").click();

    cy.dataCy("popupbutton").click();
    cy.dataCy("popup").should("be.visible"); // Vérifiez que la popup est visible
    cy.dataCy("inputPopup").type("counter_1"); // Saisissez un nom
    cy.dataCy("addOperandButton").click(); // Ajoutez un CounterComponent

    cy.dataCy("incrementButton").click();
    cy.dataCy("decrementButton").click();
    cy.dataCy("decrementButton").click();
    cy.dataCy("total").should("contain", "-1");

    cy.dataCy("keypadPage").click();
    cy.dataCy("total").should("contain", "-1");

    cy.dataCy("inputPage").click();
    cy.dataCy("popupbutton").click(); // Ouvrez la popup à nouveau
    cy.dataCy("inputPopup").type("counter_1counter_2");
    cy.dataCy("addOperandButton").click();
    cy.dataCy("counterComponent-counter_1counter_2")
      .dataCy("decrementButton")
      .click();
    cy.dataCy("counterComponent-counter_1counter_2")
      .dataCy("decrementButton")
      .click();
    cy.get(".q-btn-dropdown__arrow-container").click();
    cy.get("[data-cy=select]").get(`[label="*"]`).click();

    cy.dataCy("keypadPage").click();
    cy.dataCy("total").should("contain", "2");
  });
});
