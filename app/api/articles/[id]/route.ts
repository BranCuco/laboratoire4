import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/lib/types';

// Datos con artículos reales del proyecto anterior
let articles: Article[] = [
    {
        id: 1,
        title: "Whitehorse n'avait pas vu autant de neige en décembre depuis plus de 40 ans",
        author: "Radio-Canada",
        date: "2026-01-15",
        image: "https://images.radio-canada.ca/q_auto,w_700/v1/ici-info/16x9/yukon-neige-voiture.jpg",
        summary: "Résumé de la première publication du blog...",
        content: "<p>Whitehorse a connu des chutes de neige exceptionnelles en décembre, les plus importantes depuis plus de quatre décennies. La capitale du Yukon a été transformée en un paysage hivernal spectaculaire.</p><h2>Des conditions météorologiques historiques</h2><p>Les météorologues ont enregistré des accumulations record qui ont surpris même les résidents les plus aguerris. Ces conditions ont créé à la fois des défis et des opportunités pour la communauté locale.</p>",
    },
    {
        id: 2,
        title: "Toute une ville canadienne ensevelie sous la neige par le blizzard",
        author: "Ouest-France",
        date: "2026-01-20",
        image: "https://media.ouest-france.fr/v1/pictures/MjAyMDAxNWNhZjkyZGE3NjVjN2YwODc1MjJhM2JjZDA2OTNkZmY?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=05e59234dd02b278ffc1975f7666ded1e5ff3a8f155d40f4691f7aae01925449",
        summary: "Résumé de la deuxième publication du blog...",
        content: "<p>Une tempête hivernale d'une rare intensité s'est abattue sur une ville canadienne, paralysant complètement les activités et ensevelissant les infrastructures sous une épaisse couche de neige.</p><h2>Une tempête sans précédent</h2><p>Les vents violents et les chutes de neige abondantes ont créé des conditions de blizzard qui ont rendu les déplacements impossibles pendant plusieurs jours.</p>",
    },
    {
        id: 3,
        title: "Niagara l'hiver : mystère et boules de glace",
        author: "L'Express",
        date: "2026-01-10",
        image: "https://l-express.ca/wp-content/uploads/2017/12/100009546-1024x683.jpg",
        summary: "Résumé de la troisième publication du blog...",
        content: "<p>Les chutes du Niagara offrent un spectacle unique en hiver, lorsque le froid intense transforme le paysage en une œuvre d'art glacée. Un phénomène rare attire particulièrement l'attention : les boules de glace.</p><h2>Un spectacle naturel fascinant</h2><p>Quand les températures plongent sous zéro, la brume des chutes gèle instantanément, créant des formations de glace spectaculaires.</p>",
    },
    {
        id: 4,
        title: "Les résidents temporaires au Canada face aux nouvelles restrictions à l'immigration",
        author: "Maudits Français",
        date: "2026-01-25",
        image: "https://mauditsfrancais.ca/wp-content/uploads/sites/7/2024/09/canadian-flag-1229484_1280-e1762457887500.jpg",
        summary: "Résumé de la quatrième publication du blog...",
        content: "<p>Le gouvernement canadien a annoncé de nouvelles mesures qui affectent les résidents temporaires, suscitant des inquiétudes et des questions au sein de cette communauté importante.</p><h2>Changements dans la politique d'immigration</h2><p>Les nouvelles restrictions visent à réguler le nombre de résidents temporaires au pays.</p>",
    },
    {
        id: 5,
        title: "Équipe Canada à Beijing 2022 : Jour 5",
        author: "Olympique Canada",
        date: "2022-02-09",
        image: "https://olympique.ca/wp-content/uploads/sites/2/2022/02/LH_20220209_28506.jpg?quality=100&w=1131",
        summary: "Résumé de la cinquième publication du blog...",
        content: "<p>Le cinquième jour des Jeux olympiques d'hiver de Beijing 2022 a été marqué par des performances exceptionnelles des athlètes canadiens.</p><h2>Des moments mémorables</h2><p>Les compétitions de cette journée ont offert des moments palpitants, avec plusieurs athlètes canadiens atteignant le podium.</p>",
    },
    {
        id: 6,
        title: "Record de froid au Yukon : -58°C enregistré",
        author: "CBC News",
        date: "2026-02-01",
        image: "https://images.radio-canada.ca/q_auto,w_700/v1/ici-info/16x9/yukon-neige-voiture.jpg",
        summary: "Un froid extrême s'abat sur le Yukon...",
        content: "<p>Un record de température a été enregistré dans le nord du Yukon avec -58°C. Les résidents sont invités à rester à l'intérieur.</p><h2>Précautions nécessaires</h2><p>Les autorités recommandent de limiter les déplacements et de vérifier régulièrement les systèmes de chauffage.</p>",
    },
    {
        id: 7,
        title: "Festival d'hiver de Québec : un succès malgré le froid",
        author: "Le Soleil",
        date: "2026-02-10",
        image: "https://images.radio-canada.ca/q_auto,w_700/v1/ici-info/16x9/yukon-neige-voiture.jpg",
        summary: "Le Carnaval de Québec bat son plein...",
        content: "<p>Malgré des températures glaciales, le Festival d'hiver de Québec attire des milliers de visiteurs venus célébrer l'hiver québécois.</p><h2>Des activités pour tous</h2><p>Sculptures sur glace, défilés et activités sportives animent les rues de la vieille capitale.</p>",
    },
    {
        id: 3161,
        title: "Nouvel Article de Test",
        author: "Cypress Test",
        date: "2026-02-18",
        image: "https://via.placeholder.com/400",
        summary: "Ceci est un résumé de test",
        content: "<p>Ceci est le contenu de test</p>",
    },
];

// GET /api/articles/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const articleId = parseInt(id);
        const article = articles.find(a => a.id === articleId);

        if (!article) {
            return NextResponse.json(
                { error: 'Article non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors du chargement de l'article" },
            { status: 500 }
        );
    }
}

// PUT /api/articles/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const articleId = parseInt(id);
        const data = await request.json();

        const index = articles.findIndex(a => a.id === articleId);
        if (index === -1) {
            return NextResponse.json(
                { error: 'Article non trouvé' },
                { status: 404 }
            );
        }

        articles[index] = {
            ...articles[index],
            ...data,
            id: articleId, // Preservar ID
        };

        return NextResponse.json(articles[index]);
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour de l'article" },
            { status: 400 }
        );
    }
}

// DELETE /api/articles/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const articleId = parseInt(id);

        articles = articles.filter(a => a.id !== articleId);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la suppression de l'article" },
            { status: 500 }
        );
    }
}
