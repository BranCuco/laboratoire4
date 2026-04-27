import { BlogList } from '@/components/BlogList';

export const metadata = {
    title: 'Blog du CEPI',
    description: 'Blog du Centre d\'Expertise et de Perfectionnement en Informatique',
};

export default function Home() {
    return (
        <>
            <BlogList />
        </>
    );
}


