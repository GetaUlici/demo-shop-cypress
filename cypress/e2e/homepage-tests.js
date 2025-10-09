/// <reference types="cypress" />

describe('Homepage tests suite', () => {
  beforeEach('Visit homepage', () => {
    cy.visit('/');
  });

  it('Clicking Homepage button from the shopping cart', () => {
    cy.get('h1').should('contain', 'Products');
    cy.get('.shopping-cart-icon').first().click();
    cy.get('h1').should('contain', 'Your cart');
    cy.get('.navbar-brand').click();
    cy.get('h1').should('contain', 'Products');
  });

  it('Should display only Awesome products when searching for "Awesome"', () => {
    const expectedProducts = ['Awesome Granite Chips', 'Awesome Metal Chair', 'Awesome Soft Shirt'];

    cy.get('#input-search').type('Awesome');

    cy.get('.form-inline > :nth-child(1) > .btn').click();
    cy.log("The search engine is looking up for the keyword 'Awesome'.");

    cy.get('.card .card-link').then(($elements) => {
      const actualProductNames = [...$elements].map((el) => el.innerText.trim());

      const cleanedExpectedProducts = expectedProducts.map((p) => p.trim());

      expect(
        actualProductNames,
        `Expected ${cleanedExpectedProducts.length} results, but found ${actualProductNames.length}: ${actualProductNames.join(', ')}`
      ).to.have.length(cleanedExpectedProducts.length);

      cleanedExpectedProducts.forEach((expectedProduct) => {
        expect(
          actualProductNames,
          `Expected product "${expectedProduct}" not found in results: ${actualProductNames.join(', ')}`
        ).to.include(expectedProduct);
      });

      actualProductNames.forEach((actualProduct) => {
        expect(actualProduct, `Unexpected product found: "${actualProduct}"`).to.include('Awesome');
      });
    });
  });

  it('Negative test for the search functionality', () => {
    cy.get('#input-search').type('Dummy');
    cy.get('.form-inline > :nth-child(1) > .btn').click();
    cy.log("The search engine is looking up for the keyword 'Dummy'.");
    cy.get('.row-cols-1').should('not.contain', 'Dummy');
    cy.log("Product 'Dummy' is not displayed because it doesn't exist in the data base");
  });

  it('Accessing Help modal', () => {
    cy.get('[data-icon="question"]').click();
    cy.get('.modal-dialog').should('contain', 'Help');
  });

  it('Sorts products by Name in alphabetical order (A to Z)', () => {
    const sortOptionText = 'Sort by name (A to Z)';

    cy.get('.sort-products-select').select(sortOptionText);

    cy.get('.card .card-link').then(($productNames) => {
      const actualProductNames = Cypress._.map($productNames, 'innerText');
      const expectedProductNames = [...actualProductNames].sort();

      expect(
        actualProductNames,
        'The products are not sorted in alphabetical order.'
      ).to.deep.equal(expectedProductNames);
      cy.log(`✅ The products are sorted in alphabetical order, from A to Z, as expected.`);
    });
  });

  it.only('Sorts products by Name in  reverse alphabetical order (Z to A)', () => {
    const sortOptionText = 'Sort by name (Z to A)';

    cy.get('.sort-products-select').select(sortOptionText);

    cy.get('.card .card-link').then(($productNames) => {
      const actualProductNames = Cypress._.map($productNames, 'innerText');

      const initiallySorted = [...actualProductNames].sort();
      const expectedProductNames = initiallySorted.reverse();

      expect(
        actualProductNames,
        'The products are not sorted in reverse alphabetical order (Z to A).'
      ).to.deep.equal(expectedProductNames);
      cy.log(`✅ The products are sorted in reverse alphabetical order (Z to A), as expected.`);
    });
  });
});
