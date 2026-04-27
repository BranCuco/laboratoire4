import { Article, BlogComment } from './types';

const API_URL = 'http://localhost:3000';

/**
 * Obtener todos los artículos
 */
export async function fetchArticles(): Promise<Article[]> {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) {
        throw new Error('Error fetching articles');
    }
    return response.json();
}

/**
 * Obtener un artículo por ID
 */
export async function fetchArticleById(id: number): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching article');
    }
    return response.json();
}

/**
 * Agregar un nuevo artículo
 */
export async function addArticle(article: Omit<Article, 'id'>): Promise<Article> {
    const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    });
    if (!response.ok) {
        throw new Error('Error adding article');
    }
    return response.json();
}

/**
 * Actualizar un artículo
 */
export async function updateArticle(id: number, article: Omit<Article, 'id'>): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    });
    if (!response.ok) {
        throw new Error('Error updating article');
    }
    return response.json();
}

/**
 * Eliminar un artículo
 */
export async function deleteArticle(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Error deleting article');
    }
}

/**
 * Obtener comentarios de un artículo
 */
export async function fetchCommentsByArticleId(articleId: number): Promise<BlogComment[]> {
    const response = await fetch(`${API_URL}/comments?articleId=${articleId}`);
    if (!response.ok) {
        throw new Error('Error fetching comments');
    }
    return response.json();
}

/**
 * Agregar un nuevo comentario
 */
export async function addComment(comment: Omit<BlogComment, 'id'>): Promise<BlogComment> {
    const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    if (!response.ok) {
        throw new Error('Error adding comment');
    }
    return response.json();
}
