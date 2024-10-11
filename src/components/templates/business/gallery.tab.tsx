import {css} from '@styled/css';

import GalleryPlaceholder from './gallery-placeholder';

const Gallery: React.FC = () => (
  <div
    className={css({
      display: 'grid',
      gridTemplateAreas: `
        "large small-1 small-1"
        "large small-2 small-3"
        "small-4 small-5 small-5"
      `,
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '4',
      height: '100vh',
      width: '100%',
    })}
  >
    <div className={css({gridArea: 'large', height: '100%'})}>
      <GalleryPlaceholder />
    </div>
    <div className={css({gridArea: 'small-1', height: '100%'})}>
      <GalleryPlaceholder />
    </div>
    <div className={css({gridArea: 'small-2', height: '100%'})}>
      <GalleryPlaceholder />
    </div>
    <div className={css({gridArea: 'small-3', height: '100%'})}>
      <GalleryPlaceholder />
    </div>
    <div className={css({gridArea: 'small-4', height: '100%'})}>
      <GalleryPlaceholder />
    </div>
    <div className={css({gridArea: 'small-5', height: '100%'})}>
      <GalleryPlaceholder />
    </div>
  </div>
);

export {Gallery};
