import { DetailView } from '@/components/DetailView';

interface ArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata = {
    title: 'Détail de l\'article | Blog du CEPI',
};

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { id } = await params;
    const articleId = parseInt(id);

    return <DetailView id={articleId} />;
}
