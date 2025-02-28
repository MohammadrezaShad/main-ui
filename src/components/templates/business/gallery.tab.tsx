'use client';

import {useState} from 'react';
import {ColumnsPhotoAlbum, Photo, RowsPhotoAlbum} from 'react-photo-album';
import {css} from '@styled/css';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';

import {CompanyGalleryType} from '@/graphql';

import 'react-photo-album/columns.css';
import 'react-photo-album/rows.css';
import 'yet-another-react-lightbox/styles.css';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface Props {
  slides: CompanyGalleryType[];
}

const Gallery: React.FC<Props> = ({slides}) => {
  const photos = slides.map(({image}) => ({
    src: `${IMAGE_STORAGE_URL}/${image?.filename}-${image?._id}`,
    width: image?.width,
    height: image?.height,
  }));
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div
        className={css({
          hideBelow: 'md',
        })}
      >
        <RowsPhotoAlbum
          targetRowHeight={180}
          spacing={12}
          photos={photos as Photo[]}
          onClick={({index: current}) => setIndex(current)}
          render={{
            image: props => (
              <div className={css({border: '1px solid #eaeaea', rounded: 'lg', p: '2'})}>
                <Image
                  className={css({w: '80', h: '80', aspectRatio: 'square', objectFit: 'cover'})}
                  unoptimized
                  width={320}
                  height={320}
                  alt=''
                  src={props.src}
                />
              </div>
            ),
          }}
        />
      </div>
      <div
        className={css({
          hideFrom: 'md',
        })}
      >
        <ColumnsPhotoAlbum
          columns={1}
          spacing={12}
          photos={photos as Photo[]}
          onClick={({index: current}) => setIndex(current)}
          render={{
            image: props => (
              <div className={css({border: '1px solid #eaeaea', rounded: 'lg', p: '2'})}>
                <Image
                  className={css({
                    w: '80',
                    h: '80',
                    aspectRatio: 'square',
                    objectFit: 'cover',
                    mdDown: {w: '100%', h: 'auto'},
                  })}
                  unoptimized
                  width={320}
                  height={320}
                  alt=''
                  src={props.src}
                />
              </div>
            ),
          }}
        />
      </div>

      <Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
    </>
  );
};

export {Gallery};
