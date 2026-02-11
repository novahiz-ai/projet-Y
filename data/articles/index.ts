
import { TFunction } from 'i18next';
import { Article } from '../../types';

export const getArticles = (t: TFunction): Article[] => {
  const articleIds = [
    { id: 'art-1', cat: 'immo' },
    { id: 'art-2', cat: 'auto' },
    { id: 'art-3', cat: 'travaux' },
    { id: 'art-4', cat: 'perso' },
    { id: 'art-5', cat: 'rachat' },
    { id: 'art-6', cat: 'assurance' },
    { id: 'art-7', cat: 'perso' },
    { id: 'art-8', cat: 'projet' },
    { id: 'art-9', cat: 'perso' },
    { id: 'art-10', cat: 'rachat' },
    { id: 'art-11', cat: 'immo' },
    { id: 'art-12', cat: 'auto' },
    { id: 'art-13', cat: 'perso' },
    { id: 'art-14', cat: 'projet' },
    { id: 'art-15', cat: 'assurance' },
    { id: 'art-16', cat: 'perso' },
    { id: 'art-17', cat: 'perso' },
    { id: 'art-18', cat: 'perso' }
  ];

  const images = {
    'art-1': "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    'art-2': "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    'art-3': "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    'art-4': "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    'art-5': "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    'art-6': "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=800",
    'art-7': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    'art-8': "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    'art-9': "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    'art-10': "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
    'art-11': "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800",
    'art-12': "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    'art-13': "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    'art-14': "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    'art-15': "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800",
    'art-16': "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800",
    'art-17': "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    'art-18': "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
  };

  return articleIds.map(item => {
    const key = item.id.replace('-', '');
    const rawSections = t(`articles.${key}.sections`, { ns: 'guide', returnObjects: true });
    const sectionsArray = Array.isArray(rawSections) ? rawSections : [];

    return {
      id: item.id,
      category: item.cat,
      categoryLabel: t(`filters.${item.cat}`, { ns: 'guide' }),
      title: t(`articles.${key}.title`, { ns: 'guide' }),
      excerpt: t(`articles.${key}.excerpt`, { ns: 'guide' }),
      readTime: t(`articles.${key}.readTime`, { ns: 'guide', defaultValue: "10 min" }),
      image: images[item.id as keyof typeof images],
      author: t(`articles.${key}.author`, { ns: 'guide', defaultValue: "L'équipe Younited" }),
      isFeatured: item.id === 'art-1' || item.id === 'art-5' || item.id === 'art-10',
      sections: sectionsArray.map((s: any, idx: number) => ({
        id: `s-${item.id}-${idx}`,
        title: s.t || '',
        content: s.c || '',
        type: s.type || 'text',
        items: s.items || []
      }))
    };
  });
};
