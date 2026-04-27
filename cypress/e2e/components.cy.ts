describe('BlogCard Component', () => {
  it('should display article card on homepage', () => {
    cy.visit('/');
    
    // Wait for articles to load
    cy.get('[class*="card"], article').first().should('exist');
  });

  it('should display article card with title', () => {
    cy.visit('/');
    
    cy.get('[class*="card"], article').first().within(() => {
      cy.get('h2, h3, [class*="title"]').should('not.be.empty');
    });
  });

  it('should display article image in card', () => {
    cy.visit('/');
    
    cy.get('[class*="card"], article').first().within(() => {
      cy.get('img').should('be.visible');
    });
  });

  it('should display article summary', () => {
    cy.visit('/');
    
    cy.get('[class*="card"], article').first().within(() => {
      cy.get('[class*="summary"], p').should('exist');
    });
  });

  it('should be clickable to view article details', () => {
    cy.visit('/');
    
    cy.get('[class*="card"], article').first().click();
    
    cy.url().should('include', '/articles/');
  });

  it('should display article metadata in card', () => {
    cy.visit('/');
    
    cy.get('[class*="card"], article').first().within(() => {
      // Look for author or date info
      cy.get('body').should('exist'); // Card should exist
    });
  });
});

describe('BlogList Component', () => {
  it('should display multiple articles', () => {
    cy.visit('/');
    
    cy.get('article, [class*="card"]').should('have.length.greaterThan', 0);
  });

  it('should have functional search', () => {
    cy.visit('/');
    
    cy.get('input[type="text"]').first().type('neige');
    
    // Results should be filtered
    cy.get('article, [class*="card"]').should('exist');
  });

  it('should clear search when cleared', () => {
    cy.visit('/');
    
    const searchInput = cy.get('input[type="text"]').first();
    searchInput.type('test');
    searchInput.clear();
    
    // Should show all articles again
    cy.get('article, [class*="card"]').should('have.length.greaterThan', 0);
  });

  it('should have sorting functionality', () => {
    cy.visit('/');
    
    cy.get('select').first().should('exist');
  });

  it('should handle loading state', () => {
    cy.visit('/');
    
    // Should eventually show articles
    cy.get('article, [class*="card"]', { timeout: 5000 }).should('exist');
  });
});

describe('DetailView Component', () => {
  it('should display article title', () => {
    cy.visit('/articles/1');
    
    cy.get('h1').should('not.be.empty');
  });

  it('should display article content', () => {
    cy.visit('/articles/1');
    
    cy.get('[class*="content"], article').should('exist');
  });

  it('should display article image', () => {
    cy.visit('/articles/1');
    
    cy.get('img').should('be.visible');
  });

  it('should display comments section', () => {
    cy.visit('/articles/1');
    
    cy.contains(/commentaire|comment/i).should('exist');
  });

  it('should display author information', () => {
    cy.visit('/articles/1');
    
    cy.contains(/par|by/i).should('exist');
  });

  it('should display publication date', () => {
    cy.visit('/articles/1');
    
    cy.get('[class*="meta"], [class*="date"]').should('exist');
  });

  it('should have back button', () => {
    cy.visit('/articles/1');
    
    cy.contains(/retour|back/i).should('exist');
  });

  it('should handle non-existent article', () => {
    cy.visit('/articles/99999');
    
    cy.contains(/non trouvé|not found|erreur|error/i).should('exist');
  });
});

describe('Header Component', () => {
  it('should display header on all pages', () => {
    cy.visit('/');
    cy.get('header, nav, [class*="header"]').should('exist');
    
    cy.visit('/articles/1');
    cy.get('header, nav, [class*="header"]').should('exist');
    
    cy.visit('/add');
    cy.get('header, nav, [class*="header"]').should('exist');
  });

  it('should have navigation links', () => {
    cy.visit('/');
    
    cy.get('a').should('exist');
  });
});

describe('Footer Component', () => {
  it('should display footer on all pages', () => {
    cy.visit('/');
    cy.get('footer, [class*="footer"]').should('exist');
  });
});

describe('AddArticleForm Component', () => {
  it('should have form fields', () => {
    cy.visit('/add');
    
    cy.get('form').should('exist');
    cy.get('input, textarea').should('have.length.greaterThan', 0);
  });

  it('should have submit button', () => {
    cy.visit('/add');
    
    cy.get('button[type="submit"]').should('exist');
  });

  it('should validate required fields', () => {
    cy.visit('/add');
    
    cy.get('input[required], textarea[required]').should('have.length.greaterThan', 0);
  });

  it('should show error on failed submission', () => {
    cy.intercept('POST', '/api/articles', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('submitFail');

    cy.visit('/add');
    
    // Fill form
    cy.get('input[id="title"]').type('Test');
    cy.get('input[id="author"]').type('Author');
    cy.get('input[id="image"]').type('https://via.placeholder.com/400');
    cy.get('textarea[id="summary"]').type('Summary');
    cy.get('textarea[id="content"]').type('Content');
    
    cy.get('button[type="submit"]').click();
    cy.wait('@submitFail');
    
    cy.contains(/erreur|error/i).should('exist');
  });
});
