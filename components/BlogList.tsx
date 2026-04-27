'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { getArticles } from '@/lib/indexeddb';
import { BlogCard } from './BlogCard';
import Link from 'next/link';

export const BlogList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortValue, setSortValue] = useState('recent');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Intentar obtener del servidor primero
                const response = await fetch('/api/articles');
                if (response.ok) {
                    const data = await response.json();
                    setArticles(data);
                } else {
                    // Fallback: obtener de IndexedDB
                    const localArticles = await getArticles();
                    setArticles(localArticles);
                }
                setLoading(false);
            } catch (err) {
                // Si hay error, usar IndexedDB
                try {
                    const localArticles = await getArticles();
                    setArticles(localArticles);
                    setError('Travail hors ligne - données locales');
                } catch (e) {
                    setError('Impossible de charger les articles. Vérifiez que l\'API est démarrée.');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center py-8">Chargement des articles...</p>;
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredArticles = articles.filter((article) => {
        const title = (article.title || '').toLowerCase();
        const summary = (article.summary || '').toLowerCase();
        return title.includes(normalizedSearch) || summary.includes(normalizedSearch);
    });

    const sortedArticles = [...filteredArticles].sort((a, b) => {
        if (sortValue === 'titre') {
            return (a.title || '').localeCompare(b.title || '');
        } else if (sortValue === 'auteur') {
            return (a.author || '').localeCompare(b.author || '');
        } else {
            // recent
            return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        }
    });

    return (
        <>
            {error && (
                <div className="alert alert-warning" role="alert">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            id="searchInput"
                            className="form-control"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <select
                            id="sortFilter"
                            className="form-select"
                            value={sortValue}
                            onChange={(e) => setSortValue(e.target.value)}
                        >
                            <option value="recent">Plus récent</option>
                            <option value="titre">Titre (A-Z)</option>
                            <option value="auteur">Auteur (A-Z)</option>
                        </select>
                    </div>
                </div>
            </div>

            {sortedArticles.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Aucun article trouvé. Ajustez vos critères de recherche.
                </div>
            ) : (
                <div className="row g-4">
                    {sortedArticles.map((article) => (
                        <BlogCard key={article.id} {...article} />
                    ))}
                </div>
            )}
        </>
    );
};
