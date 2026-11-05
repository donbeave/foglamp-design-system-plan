import { createRoot } from 'react-dom/client';
import { ObservabilityGuideBlock } from '@/components/foglamp/blocks/guide/observability-guide';
import { Hero } from '@/components/foglamp/blocks/marketing/hero/hero';
import { OriginalAuthorsBlock } from '@/components/foglamp/blocks/marketing/original-authors-block';
import './globals.css';

createRoot(document.getElementById('root')!).render(<main><ObservabilityGuideBlock /><Hero /><OriginalAuthorsBlock /></main>);
