/// <reference types="cypress" />

describe('Checkout Page tests suite', () => {
  beforeEach('Visit homepage', () => {
    cy.visit('/');
  });

  it('Purchasing a simple product from a guest user', () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.btn-success').click();
    cy.get('[data-test="firstName"]').type('Geta');
    cy.get('[data-test="lastName"]').type('Ulici');
    cy.get('[data-test="address"]').type('Floresti');
    cy.get('.btn-success').click();
    cy.get('.btn-success').click();
    cy.get('.text-center').should('contain', 'Thank you for your order!');
  });

  it('Adding a product to wishlist', () => {
    cy.get('.card > .text-muted > [bottom="true"]').first().click();
    cy.get('[href="#/wishlist"]').click();
    cy.url().should('include', 'https://fasttrackit-test.netlify.app/#/wishlist');
    cy.get('.card').should('contain', 'Awesome Granite Chips');
  });

  it('Removing a product from wishlist', () => {
    cy.get('.card > .text-muted > [bottom="true"]').first().click();
    cy.get('[href="#/wishlist"]').click();
    cy.get('.card').should('contain', 'Awesome Granite Chips');
    cy.get('[data-icon="heart-broken"]').click();
    cy.get('div').should('not.contain', 'Awesome Granite Chips');
  });

  it('Adding a product to the shopping cart', () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('h1').should('contain', 'Your cart');
    cy.get('.container').should('contain', 'Awesome Granite Chips');
  });

  it('Removing a product from the shopping cart', () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('h1').should('contain', 'Your cart');
    cy.get('.container').should('contain', 'Awesome Granite Chips');
    cy.get('[data-icon="trash"]').click();
    cy.get('[class="text-center container"]').should(
      'contain',
      'How about adding some products in your cart?'
    );
  });

  it('Increase the amount of a product', () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.amount')
      .invoke('text')
      .then((amountValue) => {
        const cleanAmountValue = amountValue.replace('$', '');
        const price = parseFloat(cleanAmountValue);
        cy.log(price);
        const expectedTotal = price * 2;

        cy.log(`The price of the product after quantity increase should be: ${expectedTotal}`);
        cy.get('[data-icon="plus-circle"]').click();

        cy.get('.amount')
          .invoke('text')
          .then((newAmountValue) => {
            const newPrice = parseFloat(newAmountValue.replace('$', ''));
            expect(newPrice).to.eq(expectedTotal);

            cy.log(`The price of the product matches the expected total: ${expectedTotal}`);
          });
      });
  });

  it("Verify 'Continue shopping' functionality", () => {
    cy.get('.subheader-container')
      .should('have.text', 'Products')
      .then((el) => {
        cy.log(`${el.text()} page is displayed.`);
      });
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.container').should('contain', 'Awesome Granite Chips');
    cy.get('h1')
      .should('have.text', 'Your cart')
      .then((el) => {
        cy.log(`${el.text()} is displayed.`);
      });
    cy.get('.btn-danger').click();
    cy.get('.subheader-container')
      .should('have.text', 'Products')
      .then((el) => {
        cy.log(`${el.text()} page is displayed again.`);
      });
  });

  it('Cancel the order from the Checkout page', () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.container').should('contain', 'Awesome Granite Chips');
    cy.get('.btn-success').click();
    cy.get('.btn-danger').click();
    cy.get('h1')
      .should('have.text', 'Your cart')
      .then((el) => {
        cy.log(`${el.text()} is displayed, the order has been canceled.`);
      });
    cy.get('.container').should('contain', 'Awesome Granite Chips');
  });

  it('Clicking reset when a product is added to the shopping cart', () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.container').should('contain', 'Awesome Granite Chips');
    cy.get('[title="Reset the application state"]').click();
    cy.get('.container').should('not.contain', 'Awesome Granite Chips');
    cy.get('[class="text-center container"]').should(
      'contain',
      'How about adding some products in your cart?'
    );
  });

  it('Clicking reset when a product is added to the wishlist', () => {
    cy.get('.col .card ')
      .first()
      .should('contain', 'Awesome Granite Chips')
      .within(() => {
        cy.get('.fa-heart').click();
      });
    cy.get('[href="#/wishlist"]').click();
    cy.get('.container').should('contain', 'Awesome Granite Chips');
    cy.get('[title="Reset the application state"]').click();
    cy.get('.container').should('not.contain', 'Awesome Granite Chips');
  });

  it("Validation of 'First Name' field on Checkout page", () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.btn-success').click();
    cy.get('[data-test="lastName"]').type('Ulici');
    cy.get('[data-test="address"]').type('Floresti');
    cy.get('.btn-success').click();
    cy.get('[data-test="error"]').should('contain', 'First Name is required');
  });

  it("Validation of 'Last Name' field on Checkout page", () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.btn-success').click();
    cy.get('[data-test="firstName"]').type('Geta');
    cy.get('[data-test="address"]').type('Floresti');
    cy.get('.btn-success').click();
    cy.get('[data-test="error"]').should('contain', 'Last Name is required');
  });

  it("Validation of 'Address' field on Checkout page", () => {
    cy.get('[data-icon="cart-plus"]').first().click();
    cy.get('[href="#/cart"]').click();
    cy.get('.btn-success').click();
    cy.get('[data-test="firstName"]').type('Geta');
    cy.get('[data-test="lastName"]').type('Ulici');
    cy.get('.btn-success').click();
    cy.get('[data-test="error"]').should('contain', 'Address is required');
  });
});
