'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addArticleAction } from '@/app/actions';

export const AddArticleForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const result = await addArticleAction({
                title: title.trim(),
                author: author.trim(),
                image: image.trim(),
                summary: summary.trim(),
                content: content.trim(),
                date: new Date().toISOString().split('T')[0],
            });

            if (result.success) {
                alert('Article publié avec succès!');
                router.push('/');
            } else {
                setError(result.error || 'Erreur lors de la publication de l\'article');
            }
        } catch (err) {
            setError('Erreur lors de la publication de l\'article');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-8 mx-auto">
                <h1 className="mb-4">Ajouter une Publication</h1>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Titre *
                        </label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                            Auteur *
                        </label>
                        <input
                            id="author"
                            type="text"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            URL de l'image *
                        </label>
                        <input
                            id="image"
                            type="url"
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="form-control"
                        />
                        <small className="form-text text-muted">Entrez l'URL complète de l'image</small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="summary" className="form-label">
                            Résumé *
                        </label>
                        <textarea
                            id="summary"
                            required
                            rows={3}
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Contenu *
                        </label>
                        <textarea
                            id="content"
                            required
                            rows={10}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="form-control"
                        />
                        <small className="form-text text-muted">Vous pouvez utiliser du HTML pour la mise en forme</small>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn btn-primary"
                        >
                            {submitting ? 'Publication en cours...' : 'Publier'}
                        </button>
                        <Link href="/" className="btn btn-secondary">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
