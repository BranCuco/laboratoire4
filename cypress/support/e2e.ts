import type { Article } from '../../lib/types';

// Extend Cypress Chainable with custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      addArticleViaAPI(article: Omit<Article, 'id'>): Chainable<any>;
      deleteArticleViaAPI(id: number): Chainable<any>;
      updateArticleViaAPI(id: number, article: Omit<Article, 'id'>): Chainable<any>;
    }
  }
}

beforeEach(() => {
  // Clear IndexedDB before each test
  cy.window().then((win) => {
    const req = win.indexedDB.deleteDatabase('blog-cepi-db');
    req.onsuccess = () => {
      console.log('IndexedDB cleared');
    };
  });
});

// Custom command to add an article via API
Cypress.Commands.add('addArticleViaAPI', (article: Omit<Article, 'id'>) => {
  return cy.request('POST', '/api/articles', article);
});

// Custom command to delete an article via API
Cypress.Commands.add('deleteArticleViaAPI', (id: number) => {
  return cy.request('DELETE', `/api/articles/${id}`);
});

// Custom command to update an article via API
Cypress.Commands.add('updateArticleViaAPI', (id: number, article: Omit<Article, 'id'>) => {
  return cy.request('PUT', `/api/articles/${id}`, article);
});
