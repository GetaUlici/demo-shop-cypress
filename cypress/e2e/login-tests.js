/// <reference types="cypress" />

describe('Login tests suite', () => {
  beforeEach('Visit homepage', () => {
    cy.visit('/');
  });

  it('Login test', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('.navbar-text').should('contain', 'Hello guest!');
    cy.get('[data-test="username"]').type('dino');
    cy.get('[data-test="password"]').type('choochoo');
    cy.get('form > .btn').click();
    cy.get('.navbar-text').should('contain', 'Hi dino');
  });

  it('Successfully sign out a user test', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('[data-test="username"]').type('dino');
    cy.get('[data-test="password"]').type('choochoo');
    cy.get('form > .btn').click();
    cy.get('.navbar-text').should('contain', 'Hi dino');
    cy.get('[data-icon="sign-out-alt"]').click();
    cy.get('.navbar-text').should('contain', 'Hello guest!');
  });

  it('Entering incorrect username test', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('[data-test="username"]').type('din');
    cy.get('[data-test="password"]').type('choochoo');
    cy.get('form > .btn').click();
    cy.get('[data-test="error"]').should('contain', 'Incorrect username or password!');
  });

  it('Entering incorrect password', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('[data-test="username"]').type('dino');
    cy.get('[data-test="password"]').type('choocho');
    cy.get('form > .btn').click();
    cy.get('[data-test="error"]').should('contain', 'Incorrect username or password!');
  });

  it('Entering incorrect username and incorrect password', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('[data-test="username"]').type('din');
    cy.get('[data-test="password"]').type('choocho');
    cy.get('form > .btn').click();
    cy.get('[data-test="error"]').should('contain', 'Incorrect username or password!');
  });

  it('Null input on username field', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('[data-test="password"]').type('choochoo');
    cy.get('form > .btn').click();
    cy.get('[data-test="error"]').should('contain', 'Please fill in the username!');
  });

  it('Null input on password field', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('[data-test="username"]').type('dino');
    cy.get('form > .btn').click();
    cy.get('[data-test="error"]').should('contain', 'Please fill in the password!');
  });

  it('Clicking Reset when a user is logged in', () => {
    cy.get('[data-icon="sign-in-alt"]').click();
    cy.get('.navbar-text').should('contain', 'Hello guest!');
    cy.get('[data-test="username"]').type('dino');
    cy.get('[data-test="password"]').type('choochoo');
    cy.get('form > .btn').click();
    cy.get('.navbar-text').should('contain', 'Hi dino');
    cy.get(':nth-child(2) > .btn').click();
    cy.get('.navbar-text').should('contain', 'Hello guest!');
  });
});
