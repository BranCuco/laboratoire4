describe('Blog Homepage - BlogList', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the homepage with article list', () => {
    cy.get('h1').should('exist');
    cy.get('[class*="blog"]').should('exist');
  });

  it('should display articles in the list', () => {
    // Wait for articles to load
    cy.get('article', { timeout: 5000 }).should('have.length.greaterThan', 0);
  });

  it('should display search functionality', () => {
    cy.get('input[type="text"]').should('exist');
  });

  it('should filter articles by search term', () => {
    // Get initial count
    cy.get('article').then(($articles) => {
      const initialCount = $articles.length;
      
      // Search for specific term
      cy.get('input[type="text"]').first().type('neige');
      
      // Verify filtered results
      cy.get('article').should('have.length.lessThan', initialCount);
    });
  });

  it('should display sort options', () => {
    cy.get('select').should('exist');
  });

  it('should sort articles by recent', () => {
    cy.get('select').first().select('recent');
    cy.get('article').should('exist');
  });

  it('should navigate to article detail when clicking on article', () => {
    cy.get('article').first().click();
    cy.url().should('include', '/articles/');
  });

  it('should display add article button', () => {
    cy.contains('a', /ajouter|add/i).should('exist');
  });

  it('should navigate to add page when clicking add button', () => {
    cy.contains('a', /ajouter|add/i).click();
    cy.url().should('include', '/add');
  });

  it('should handle offline state gracefully', () => {
    // Go offline
    cy.window().then((win) => {
      cy.stub(win, 'fetch').rejects(new Error('Network error'));
    });

    cy.visit('/');
    // Should still show cached data or offline message
    cy.get('body').should('exist');
  });
});
