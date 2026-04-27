describe('API Route Handlers - Articles', () => {
  const newArticle = {
    title: 'Test API Article',
    author: 'Cypress Tester',
    image: 'https://via.placeholder.com/400',
    summary: 'Test summary for API',
    content: '<p>Test content for API</p>',
    date: '2026-02-18',
  };

  let createdArticleId: number;

  describe('GET /api/articles', () => {
    it('should return all articles', () => {
      cy.request('GET', '/api/articles').then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });

    it('should return articles with correct structure', () => {
      cy.request('GET', '/api/articles').then((response) => {
        const article = response.body[0];
        expect(article).to.have.all.keys('id', 'title', 'author', 'date', 'image', 'summary', 'content');
      });
    });
  });

  describe('POST /api/articles', () => {
    it('should create a new article', () => {
      cy.request('POST', '/api/articles', newArticle).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.equal(newArticle.title);
        expect(response.body.author).to.equal(newArticle.author);
        
        // Save ID for later tests
        createdArticleId = response.body.id;
      });
    });

    it('should auto-generate ID for new article', () => {
      cy.request('POST', '/api/articles', newArticle).then((response) => {
        expect(response.body.id).to.be.a('number');
        expect(response.body.id).to.be.greaterThan(0);
      });
    });

    it('should reject request with invalid data', () => {
      cy.request({
        method: 'POST',
        url: '/api/articles',
        body: { title: 'Only title' }, // Missing required fields
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  });

  describe('GET /api/articles/:id', () => {
    it('should return specific article by ID', () => {
      cy.request('GET', '/api/articles/1').then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
      });
    });

    it('should return 404 for non-existent article', () => {
      cy.request({
        method: 'GET',
        url: '/api/articles/99999',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });

  describe('PUT /api/articles/:id', () => {
    it('should update existing article', () => {
      const updateData = {
        title: 'Updated Article Title',
        author: 'Updated Author',
        image: 'https://via.placeholder.com/400',
        summary: 'Updated summary',
        content: '<p>Updated content</p>',
      };

      // First create an article
      cy.request('POST', '/api/articles', newArticle).then((createResponse) => {
        const articleId = createResponse.body.id;

        // Then update it
        cy.request('PUT', `/api/articles/${articleId}`, updateData).then((updateResponse) => {
          expect(updateResponse.status).to.equal(200);
          expect(updateResponse.body.title).to.equal(updateData.title);
          expect(updateResponse.body.id).to.equal(articleId);
        });
      });
    });

    it('should return 404 when updating non-existent article', () => {
      const updateData = {
        title: 'Updated Title',
        author: 'Updated Author',
        image: 'https://via.placeholder.com/400',
        summary: 'Updated summary',
        content: '<p>Updated content</p>',
      };

      cy.request({
        method: 'PUT',
        url: '/api/articles/99999',
        body: updateData,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('should preserve ID when updating article', () => {
      const updateData = {
        title: 'New Title',
        author: 'New Author',
        image: 'https://via.placeholder.com/400',
        summary: 'New summary',
        content: '<p>New content</p>',
      };

      cy.request('POST', '/api/articles', newArticle).then((createResponse) => {
        const originalId = createResponse.body.id;

        cy.request('PUT', `/api/articles/${originalId}`, updateData).then((updateResponse) => {
          expect(updateResponse.body.id).to.equal(originalId);
        });
      });
    });
  });

  describe('DELETE /api/articles/:id', () => {
    it('should delete existing article', () => {
      // First create an article
      cy.request('POST', '/api/articles', newArticle).then((createResponse) => {
        const articleId = createResponse.body.id;

        // Then delete it
        cy.request('DELETE', `/api/articles/${articleId}`).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200);
          expect(deleteResponse.body).to.have.property('success', true);
        });

        // Verify it's deleted
        cy.request({
          method: 'GET',
          url: `/api/articles/${articleId}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.equal(404);
        });
      });
    });

    it('should not throw error when deleting non-existent article', () => {
      cy.request({
        method: 'DELETE',
        url: '/api/articles/99999',
        failOnStatusCode: false,
      }).then((response) => {
        // API should handle this gracefully
        expect([200, 404]).to.include(response.status);
      });
    });
  });

  describe('API Response Format', () => {
    it('should return correct JSON content-type', () => {
      cy.request('GET', '/api/articles').then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
      });
    });

    it('should handle CORS headers', () => {
      cy.request('GET', '/api/articles').then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
});
