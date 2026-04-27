export interface Article {
    id: number;
    title: string;
    author: string;
    date: string;
    image: string;
    summary: string;
    content: string;
}

export interface BlogComment {
    id: number;
    articleId: number;
    date: string;
    content: string;
}
