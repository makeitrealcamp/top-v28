describe('Sign In', function () {
  beforeEach(function () {
    cy.fixture('user.json').as('user');
  });

  it('with correct credentials', function () {
    // TODO: Add Intercept
    // cy.visit('/signin');
    // cy.get('input[name="email"]').clear().type(this.user.email);
    // cy.get('input[name="password"]').clear().type('12345678');
    // cy.get('button[type="submit"]').click();

    cy.login(this.user.email, '12345678');

    cy.contains(this.user.username);
  });

  it('will failed with incorrect credentials', function () {
    // TODO: Add Intercept
    // cy.visit('/signin');
    // cy.get('input[name="email"]').clear().type(this.user.email);
    // cy.get('input[name="password"]').clear().type('123456');
    // cy.get('button[type="submit"]').click();

    cy.login(this.user.email, '123456');

    cy.contains('Invalid email or password');
  });
});
