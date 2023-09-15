describe('Tweets', () => {
  beforeEach(function () {
    cy.fixture('user.json').as('user');
  });

  it('can load tweets', function () {
    cy.intercept('api/tweets/', {
      fixture: 'tweets.json',
    }).as('preload');

    cy.visit('/');
    cy.wait('@preload');

    cy.contains('Cypress');
  });

  it.only('an authenticated user can post a tweet', function () {
    cy.intercept('POST', 'api/users/signin', {
      fixture: 'signedUser.json',
    }).as('signedUser');

    cy.intercept('GET', 'api/tweets/', {
      fixture: 'tweets.json',
    }).as('preload');

    cy.intercept('POST', 'api/tweets', {
      fixture: 'tweet.json',
    }).as('create');

    // Sign In
    // cy.visit('/signin');
    // cy.get('input[name="email"]').clear().type(this.user.email);
    // cy.get('input[name="password"]').clear().type('12345678');
    // cy.get('button[type="submit"]').click();
    cy.login(this.user.email, '12345678');

    cy.intercept('GET', 'api/tweets/', {
      fixture: 'tweets2.json',
    }).as('list');

    cy.get('textarea[name="content"]').type('Hello from Cypress');
    cy.get('button[type="submit"]').click();

    cy.wait('@list');

    cy.contains('Hello from Cypress');
  });
});
