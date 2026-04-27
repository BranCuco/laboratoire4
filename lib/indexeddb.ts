import { Article, BlogComment } from './types';

const DB_NAME = 'blog-cepi-db';
const DB_VERSION = 1;
const ARTICLES_STORE = 'articles';
const COMMENTS_STORE = 'comments';

let db: IDBDatabase | null = null;

export async function initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBOpenDBRequest).result;

            // Crear stores si no existen
            if (!database.objectStoreNames.contains(ARTICLES_STORE)) {
                database.createObjectStore(ARTICLES_STORE, { keyPath: 'id' });
            }
            if (!database.objectStoreNames.contains(COMMENTS_STORE)) {
                database.createObjectStore(COMMENTS_STORE, { keyPath: 'id' });
            }
        };
    });
}

export async function saveArticle(article: Article): Promise<void> {
    const database = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([ARTICLES_STORE], 'readwrite');
        const store = transaction.objectStore(ARTICLES_STORE);
        const request = store.put(article);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function getArticles(): Promise<Article[]> {
    const database = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([ARTICLES_STORE], 'readonly');
        const store = transaction.objectStore(ARTICLES_STORE);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

export async function getArticleById(id: number): Promise<Article | undefined> {
    const database = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([ARTICLES_STORE], 'readonly');
        const store = transaction.objectStore(ARTICLES_STORE);
        const request = store.get(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

export async function deleteArticle(id: number): Promise<void> {
    const database = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([ARTICLES_STORE], 'readwrite');
        const store = transaction.objectStore(ARTICLES_STORE);
        const request = store.delete(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function saveComment(comment: BlogComment): Promise<void> {
    const database = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([COMMENTS_STORE], 'readwrite');
        const store = transaction.objectStore(COMMENTS_STORE);
        const request = store.put(comment);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function getCommentsByArticleId(articleId: number): Promise<BlogComment[]> {
    const database = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([COMMENTS_STORE], 'readonly');
        const store = transaction.objectStore(COMMENTS_STORE);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const allComments = request.result as BlogComment[];
            const filtered = allComments.filter(c => c.articleId === articleId);
            resolve(filtered);
        };
    });
}
