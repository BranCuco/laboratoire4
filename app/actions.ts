'use server';

import { Article } from '@/lib/types';
import { saveArticle, deleteArticle } from '@/lib/indexeddb';

export async function addArticleAction(article: Omit<Article, 'id'>) {
    try {
        // Usar la API local de Next.js
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Erreur du serveur');
        }

        const newArticle = await response.json();

        // Guardar en IndexedDB también (en el cliente)
        try {
            await saveArticle(newArticle);
        } catch (e) {
            console.warn('Erreur lors de la sauvegarde dans IndexedDB:', e);
        }

        return { success: true, article: newArticle };
    } catch (error) {
        console.error('Erreur dans addArticleAction:', error);
        return {
            success: false,
            error: 'Impossible de publier l\'article. Vérifiez que l\'API est active.',
        };
    }
}

export async function updateArticleAction(id: number, article: Omit<Article, 'id'>) {
    try {
        const response = await fetch(`/api/articles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Erreur du serveur');
        }

        const updatedArticle = await response.json();

        // Guardar en IndexedDB también
        try {
            await saveArticle(updatedArticle);
        } catch (e) {
            console.warn('Erreur lors de la sauvegarde dans IndexedDB:', e);
        }

        return { success: true, article: updatedArticle };
    } catch (error) {
        console.error('Erreur dans updateArticleAction:', error);
        return {
            success: false,
            error: 'Impossible de mettre à jour l\'article. Vérifiez que l\'API est active.',
        };
    }
}

export async function deleteArticleAction(id: number) {
    try {
        const response = await fetch(`/api/articles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erreur du serveur');
        }

        // Supprimer de IndexedDB aussi
        try {
            await deleteArticle(id);
        } catch (e) {
            console.warn('Erreur lors de la suppression dans IndexedDB:', e);
        }

        return { success: true };
    } catch (error) {
        console.error('Erreur dans deleteArticleAction:', error);
        return {
            success: false,
            error: 'Impossible de supprimer l\'article. Vérifiez que l\'API est active.',
        };
    }
}
