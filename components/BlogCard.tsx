'use client';

import Link from 'next/link';
import { Article } from '@/lib/types';

export const BlogCard = ({ id, title, summary, image }: Article) => {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card blog-card h-100">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="card-img-top"
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{summary}</p>
                </div>
                <div className="card-footer bg-transparent">
                    <Link
                        href={`/articles/${id}`}
                        className="btn btn-primary btn-sm"
                    >
                        Lire plus
                    </Link>
                </div>
            </div>
        </div>
    );
};
