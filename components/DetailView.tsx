'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article, BlogComment } from '@/lib/types';
import { getArticleById, getCommentsByArticleId } from '@/lib/indexeddb';

interface DetailViewProps {
    id: number;
}

export const DetailView = ({ id }: DetailViewProps) => {
    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState<BlogComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Intentar obtener del servidor
                const response = await fetch(`/api/articles/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setArticle(data);
                } else {
                    // Fallback: IndexedDB
                    const local = await getArticleById(id);
                    if (local) {
                        setArticle(local);
                    }
                }

                // Obtener comentarios
                try {
                    const commentsResponse = await fetch(`/api/articles/${id}/comments`);
                    if (commentsResponse.ok) {
                        const commentsData = await commentsResponse.json();
                        setComments(commentsData);
                    }
                } catch {
                    const localComments = await getCommentsByArticleId(id);
                    setComments(localComments);
                }

                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement de l\'article');
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p className="text-center py-8">Chargement...</p>;
    }

    if (error || !article) {
        return (
            <div className="row">
                <div className="col-12 col-lg-8 mx-auto">
                    <div className="alert alert-warning" role="alert">
                        {error || 'Article non trouvé'}
                        <br />
                        <Link href="/" className="btn btn-primary btn-sm mt-2">
                            Retour à l\'accueil
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-8 mx-auto">
                <article className="blog-article">
                    <h1 className="mb-3">{article.title}</h1>

                    <div className="article-meta mb-4 text-muted">
                        <span>Par <strong>{article.author}</strong></span>
                        <span className="ms-3">
                            <strong>{formatDate(article.date)}</strong>
                        </span>
                    </div>

                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="img-fluid rounded mb-4"
                            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                        />
                    )}

                    <div className="article-content mb-5">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

                    <Link href="/" className="btn btn-primary">
                        ← Retour aux articles
                    </Link>
                </article>

                <div className="comments-section mt-5">
                    <h3>Commentaires ({comments.length})</h3>

                    {comments.length === 0 ? (
                        <p className="text-muted">Aucun commentaire pour le moment.</p>
                    ) : (
                        <div className="comments-list mt-3">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment mb-3">
                                    <div className="d-flex">
                                        <div className="comment-avatar me-3"></div>
                                        <div className="flex-grow-1">
                                            <p className="small text-muted mb-2">{formatDate(comment.date)}</p>
                                            <p className="comment-text">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
