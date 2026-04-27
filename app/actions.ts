'use server';

import { Article } from '@/lib/types';
import { saveArticle } from '@/lib/indexeddb';

export async function addArticleAction(article: Omit<Article, 'id'>) {
    try {
        // Usar la API local de Next.js
        const response = await fetch('http://localhost:3001/api/articles', {
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
