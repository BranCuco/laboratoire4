describe('Article Detail - DetailView', () => {
  const testArticleId = 1;

  beforeEach(() => {
    cy.visit(`/articles/${testArticleId}`);
  });

  it('should display article details page', () => {
    cy.get('h1').should('exist');
    cy.get('article').should('exist');
  });

  it('should display article title', () => {
    cy.get('h1').should('not.be.empty');
  });

  it('should display article metadata (author and date)', () => {
    cy.contains(/par|by/i).should('exist');
    cy.get('.article-meta, [class*="meta"]').should('exist');
  });

  it('should display article image', () => {
    cy.get('img').should('exist');
  });

  it('should display article content', () => {
    cy.get('[class*="content"]').should('exist');
  });

  it('should display comments section', () => {
    cy.contains(/commentaires|comments/i).should('exist');
  });

  it('should display back button', () => {
    cy.contains(/retour|back/i).should('exist');
  });

  it('should navigate back to homepage when clicking back button', () => {
    cy.contains(/retour|back/i).click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should handle invalid article ID', () => {
    cy.visit('/articles/99999');
    cy.contains(/non trouvé|not found/i).should('exist');
  });

  it('should fetch article from API', () => {
    cy.intercept('GET', '/api/articles/*').as('getArticle');
    cy.visit(`/articles/${testArticleId}`);
    cy.wait('@getArticle');
  });

  it('should display HTML content properly', () => {
    cy.get('[class*="content"]').then(($content) => {
      // Verify HTML is rendered, not escaped
      expect($content.html()).not.to.include('&lt;');
    });
  });
});
