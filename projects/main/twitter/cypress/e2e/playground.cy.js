describe('Describe', () => {
  it('test', () => {
    cy.visit('/');

    cy.contains('Home');

    cy.get('.tweet header strong').should('have.text', 'Gustavo Morales');

    cy.get('.tweet').as('tweet');
    cy.get('@tweet').should('not.be.empty');
    cy.get('@tweet').find('[data-cy="comment"]').contains('0');

    cy.get('nav')
      .children()
      .first()
      .children()
      .last()
      .should('have.class', 'nav-link')
      .and('have.attr', 'href', '/explore');
  });
});
