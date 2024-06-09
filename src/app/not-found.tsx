import {css} from '@styled/css';
import {cookies} from 'next/headers';

// @ts-expect-error it probably soesn't generate any error
import notFoundImage from '@/assets/images/404-2.svg?url';
import {Footer, Header} from '@/components';
import MobileNavbar from '@/components/organisms/mobile-navbar/mobile-navbar';
import {CookieName} from '@/constants';
import {getUser} from '@/graphql';

export default async function NotFound() {
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';

  const data = await getUser(authToken);

  return (
    <>
      <Header userData={data} />
      <div
        className={css({
          bgColor: '#FBC886',
          flex: '1',
          overflow: 'hidden',
          mdDown: {
            pt: '50%',
          },
        })}
      >
        <div
          style={{backgroundImage: `url(${notFoundImage.src})`}}
          className={css({
            height: 'calc(100vh - 164px)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            position: 'relative',
            mdDown: {
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            },
          })}
        >
          <div
            className={css({
              textStyle: 'h4',
              color: 'text.primary',
              mt: '4',
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              mdDown: {
                top: 'unset',
                bottom: '50%',
              },
            })}
          >
            PAGE NOT FOUND
          </div>
        </div>
      </div>
      <Footer />
      <div
        className={css({
          hideFrom: 'md',
          zIndex: 50,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        })}
      >
        <MobileNavbar userData={data} />
      </div>
    </>
  );
}
