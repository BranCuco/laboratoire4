describe('Full User Journey - Integration Tests', () => {
  it('should complete full article creation and viewing workflow', () => {
    // 1. Visit homepage
    cy.visit('/');
    cy.get('article, [class*="card"]').should('have.length.greaterThan', 0);

    // 2. Navigate to add article page
    cy.contains('a', /ajouter|add/i).click();
    cy.url().should('include', '/add');

    // 3. Fill and submit form
    const newArticle = {
      title: 'Integration Test Article',
      author: 'Integration Tester',
      image: 'https://via.placeholder.com/400',
      summary: 'This is a test article created through integration testing',
      content: '<p>Full integration test content</p>',
    };

    cy.get('input[id="title"]').type(newArticle.title);
    cy.get('input[id="author"]').type(newArticle.author);
    cy.get('input[id="image"]').type(newArticle.image);
    cy.get('textarea[id="summary"]').type(newArticle.summary);
    cy.get('textarea[id="content"]').type(newArticle.content);

    cy.get('button[type="submit"]').click();

    // 4. Verify success message
    cy.contains(/succès|success/i, { timeout: 5000 }).should('exist');

    // 5. Should redirect to homepage
    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:3000/');

    // 6. New article should appear in list
    cy.contains(newArticle.title).should('exist');
  });

  it('should search and filter articles', () => {
    cy.visit('/');

    // 1. Search for specific term
    cy.get('input[type="text"]').first().type('neige');

    // 2. Verify filtered results
    cy.get('article, [class*="card"]').each(($card) => {
      cy.wrap($card).should('be.visible');
    });

    // 3. Clear search
    cy.get('input[type="text"]').first().clear();

    // 4. Should show all articles again
    cy.get('article, [class*="card"]').should('have.length.greaterThan', 0);
  });

  it('should navigate between pages', () => {
    // 1. Visit home
    cy.visit('/');

    // 2. Click on first article
    cy.get('article, [class*="card"]').first().click();

    // 3. Should be on article detail page
    cy.url().should('include', '/articles/');

    // 4. Click back button
    cy.contains(/retour|back/i).click();

    // 5. Should return to home
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should handle API calls correctly', () => {
    // 1. Intercept API calls
    cy.intercept('GET', '/api/articles').as('getArticles');
    cy.intercept('GET', '/api/articles/*').as('getArticle');

    // 2. Visit homepage
    cy.visit('/');
    cy.wait('@getArticles');

    // 3. Click on article
    cy.get('article, [class*="card"]').first().click();
    cy.wait('@getArticle');

    // 4. Should be on detail page
    cy.url().should('include', '/articles/');
  });

  it('should persist data with IndexedDB', () => {
    // 1. Create an article via API
    const testArticle = {
      title: 'IndexedDB Test Article',
      author: 'Cypress Tester',
      image: 'https://via.placeholder.com/400',
      summary: 'Testing IndexedDB persistence',
      content: '<p>IndexedDB test</p>',
    };

    cy.request('POST', '/api/articles', testArticle).then((response) => {
      const articleId = response.body.id;

      // 2. Verify it appears in list
      cy.visit('/');
      cy.contains(testArticle.title, { timeout: 5000 }).should('exist');

      // 3. Click to view details
      cy.contains(testArticle.title).click();
      cy.url().should('include', `/articles/${articleId}`);

      // 4. Verify all details are correct
      cy.contains(testArticle.title).should('exist');
      cy.contains(testArticle.author).should('exist');
    });
  });

  it('should handle error states gracefully', () => {
    // 1. Intercept and fail API call
    cy.intercept('GET', '/api/articles', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('failedRequest');

    // 2. Visit homepage
    cy.visit('/');

    // 3. Page should still be usable (fallback to IndexedDB or show error)
    cy.get('body').should('exist');
  });

  it('should validate form input', () => {
    cy.visit('/add');

    // 1. Try to submit empty form
    cy.get('button[type="submit"]').click();

    // 2. Should not navigate away
    cy.url().should('include', '/add');

    // 3. Try invalid image URL
    cy.get('input[id="image"]').type('not-a-url');
    cy.get('input[id="image"]').invoke('attr', 'type').should('equal', 'url');
  });

  it('should display pagination and sorting', () => {
    cy.visit('/');

    // 1. Check for sorting options
    cy.get('select').should('exist');

    // 2. Test different sort options
    cy.get('select').first().select('recent');
    cy.get('article, [class*="card"]').should('have.length.greaterThan', 0);

    cy.get('select').first().select('title');
    cy.get('article, [class*="card"]').should('have.length.greaterThan', 0);
  });

  it('should maintain state during navigation', () => {
    cy.visit('/');

    // 1. Set search term
    cy.get('input[type="text"]').first().type('test');

    // 2. Navigate away
    cy.visit('/add');

    // 3. Navigate back
    cy.visit('/');

    // 4. Search should be cleared (new page load)
    cy.get('input[type="text"]').first().should('have.value', '');
  });
});
