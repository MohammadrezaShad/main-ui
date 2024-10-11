'use client';

import {useState} from 'react';
import {css, cx} from '@styled/css';
import {Box} from '@styled/jsx';
import Image from 'next/image';

import {IconStar} from '@/assets';
import {Ratings, Star} from '@/components/molecules/corporate-card/corporate-card.styled';

import {Gallery} from './gallery.tab';
import {InfoBox} from './info-box';
import {Overview} from './overview.tab';
import {Products} from './products.tab';

const TabContent = ({activeTab}: {activeTab: string}) => {
  if (activeTab === 'overview') {
    return <Overview />;
  }
  if (activeTab === 'products') {
    return <Products />;
  }
  if (activeTab === 'gallery') {
    return <Gallery />;
  }

  return null;
};

const BusinessPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={css({width: '100%'})}>
      <div
        style={{
          backgroundImage: `url(https://s3-alpha-sig.figma.com/img/20e4/1998/433828fd4fdc7ef5f872d45ea6d0fc42?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c~vX4iWfrjyvAZyQBcjYeU2Io7zu7U0HDd6Q-FKd4lsUc8vb7pppl1totYwc3CrLSAlZp9vgmGGT5HD3ReavCOGPGvwzsW6RrbQgTIFbE6vJqIL29A9xkxrH3gfTPtIQt2a93xkCiRxUSS4txgoLgOyCGXBWp-V6FY4GsDt7NiCnhPDCZTdc13xIDdiWTbEMmkrysRl~dULpzoyWQkXEcUdIkG65zerL-xBtmWWPvDDB0n4RRLd4lxnaiR3kABtZuAfxtQVo95j1b3CC8ChoxG18dwtoh4X2oocC~10OleOh5CJeLsYeytEbKlQT-uqzCPSdq~WAHsKdqIzzNxp64w__)`,
        }}
        className={css({
          width: '100%',
          mb: '[100px]',
          pb: '8',
          borderBottom: '1px solid #ccc',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '[160px]',
          pos: 'relative',
        })}
      >
        <div
          className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center'})}
        >
          <Box mt='4' className={css({position: 'absolute', top: '70%', left: '[227px]'})}>
            <Ratings>
              <Star bgColor='primary'>
                <IconStar className={css({w: '4', h: '4', color: 'white'})} />
              </Star>
              <Star bgColor='primary'>
                <IconStar className={css({w: '4', h: '4', color: 'white'})} />
              </Star>
              <Star bgColor='primary'>
                <IconStar className={css({w: '4', h: '4', color: 'white'})} />
              </Star>
              <Star bg='gray3'>
                <IconStar className={css({w: '4', h: '4', color: 'white'})} />
              </Star>
              <Star bg='gray3'>
                <IconStar className={css({w: '4', h: '4', color: 'white'})} />
              </Star>
            </Ratings>
          </Box>
          <div
            className={css({
              display: 'flex',
              alignItems: 'end',
              pos: 'absolute',
              bottom: '-50%',
              ps: '[43px]',
            })}
          >
            <Image
              unoptimized
              width={160}
              height={160}
              src='https://s3-alpha-sig.figma.com/img/85f8/0ab6/b2cd80dc71814cae334ccd4d16e967d6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PN5D~-i88VCL9CkSazZEKadN1Dat5oXGVGVwBmZlK6AGLtaD2nJuZ65lqoA3lgxwVRpBtw~9AueCURIJKI88zJV2y6HqunVO49aHRLR6SNXI2hR3HmNGcz5m6m9QadsZm4f2dybxhQX0~~mp2-s4rfOMOmdMWcNFGEQivV2X36HqAd8D2Nhlwuz8tByq-0ahwlqr77M3hkvzhpoi22n1sY84HG9l7G5ksWNU1iKimYZrOiKVRQLFCD3QnDuPIWAF0ZQwZgMF1rR3dMozpQEg1lBw1FJzq3FYsB9xteY1NHztYQwyjPR1AhwBa~QVaQZqUFTzEBgUh8fL6hft5GNhEA__'
              alt='Business Avatar'
              className={css({borderRadius: '50%', width: '160px', height: '160px', mr: '6'})}
            />
            <div>
              <h1 className={css({textStyle: 'h1', color: '#333333', mt: '[33px]'})}>
                Ultra Tec Water Treatment LLC
              </h1>
              <p className={css({textStyle: 'body', color: '#333333'})}>
                Dubai, UAE <span className={css({mx: '2', color: '#E3E3E3'})}>|</span> Supplier
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={css({
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '8',
          px: '4',
        })}
      >
        <div className={css({flex: '3'})}>
          <div
            className={css({display: 'flex', gap: '6', borderBottom: '1px solid #E3E3E3', mb: '6'})}
          >
            <button
              type='button'
              className={cx(
                css({
                  pb: '2.5',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'overview' ? '2px solid #44BAEB' : 'none',
                  fontWeight: '500',
                }),
              )}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              type='button'
              className={cx(
                css({
                  pb: '2.5',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'products' ? '2px solid #44BAEB' : 'none',
                  fontWeight: '500',
                }),
              )}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              type='button'
              className={cx(
                css({
                  pb: '2.5',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'gallery' ? '2px solid #44BAEB' : 'none',
                  fontWeight: '500',
                }),
              )}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>

          <TabContent activeTab={activeTab} />
        </div>

        <InfoBox />
      </div>
    </div>
  );
};

export default BusinessPage;
