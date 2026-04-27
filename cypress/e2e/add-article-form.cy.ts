describe('Add Article Form - AddArticleForm', () => {
  beforeEach(() => {
    cy.visit('/add');
  });

  it('should display add article form', () => {
    cy.contains(/ajouter|add/i).should('exist');
    cy.get('form').should('exist');
  });

  it('should have all required input fields', () => {
    cy.get('input[id="title"]').should('exist');
    cy.get('input[id="author"]').should('exist');
    cy.get('input[id="image"]').should('exist');
    cy.get('textarea[id="summary"]').should('exist');
    cy.get('textarea[id="content"]').should('exist');
  });

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Form should not submit
    cy.url().should('include', '/add');
  });

  it('should fill form and submit successfully', () => {
    const article = {
      title: 'Test Article',
      author: 'Test Author',
      image: 'https://via.placeholder.com/400',
      summary: 'Test summary',
      content: '<p>Test content</p>',
    };

    cy.get('input[id="title"]').type(article.title);
    cy.get('input[id="author"]').type(article.author);
    cy.get('input[id="image"]').type(article.image);
    cy.get('textarea[id="summary"]').type(article.summary);
    cy.get('textarea[id="content"]').type(article.content);

    cy.get('button[type="submit"]').click();

    // Should show success and redirect
    cy.contains(/succès|success/i, { timeout: 5000 }).should('exist');
  });

  it('should redirect to homepage after successful submission', () => {
    const article = {
      title: 'Test Article 2',
      author: 'Test Author 2',
      image: 'https://via.placeholder.com/400',
      summary: 'Test summary 2',
      content: '<p>Test content 2</p>',
    };

    cy.get('input[id="title"]').type(article.title);
    cy.get('input[id="author"]').type(article.author);
    cy.get('input[id="image"]').type(article.image);
    cy.get('textarea[id="summary"]').type(article.summary);
    cy.get('textarea[id="content"]').type(article.content);

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:3000/');
  });

  it('should display cancel button', () => {
    cy.contains(/annuler|cancel/i).should('exist');
  });

  it('should navigate to homepage when clicking cancel', () => {
    cy.contains(/annuler|cancel/i).click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should display error message on submission failure', () => {
    // Intercept and fail the API call
    cy.intercept('POST', '/api/articles', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('submitFail');

    const article = {
      title: 'Test Article Error',
      author: 'Test Author',
      image: 'https://via.placeholder.com/400',
      summary: 'Test summary',
      content: '<p>Test content</p>',
    };

    cy.get('input[id="title"]').type(article.title);
    cy.get('input[id="author"]').type(article.author);
    cy.get('input[id="image"]').type(article.image);
    cy.get('textarea[id="summary"]').type(article.summary);
    cy.get('textarea[id="content"]').type(article.content);

    cy.get('button[type="submit"]').click();
    cy.wait('@submitFail');

    cy.contains(/erreur|error/i).should('exist');
  });

  it('should validate image URL format', () => {
    cy.get('input[id="image"]').type('not-a-valid-url');
    cy.get('input[id="image"]').invoke('attr', 'type').should('equal', 'url');
  });
});
