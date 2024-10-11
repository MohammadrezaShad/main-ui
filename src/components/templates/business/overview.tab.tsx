import {css} from '@styled/css';

import {IconTickCircle} from '@/assets';

const Overview = () => (
  <div>
    <h2 className={css({textStyle: 'headline3', color: '#333333'})}>About</h2>
    <p className={css({mt: '4', color: 'gray.700', lineHeight: '1.6'})}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
      congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi
      porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id
      aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum.
      Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at
      consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor
      pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est
      sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut
      enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat.
      Nisi vitae suscipit tellus mauris a diam maecenas sed.
    </p>
    <p className={css({mt: '4', color: 'gray.700', lineHeight: '1.6'})}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
      congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi
      porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id
      aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum.
      Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at
      consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor
      pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est
      sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum.
    </p>
    <div className={css({mt: '6'})}>
      <h2 className={css({textStyle: 'headline3', color: '#333333'})}>Product & Services</h2>
      <ul
        className={css({
          mt: '2',
          listStyle: 'none',
          display: 'flex',
          flexDir: 'column',
          gap: '3',
          pl: '4',
        })}
      >
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          Water Ionizer
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          Water Softening
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          Reverse Osmosis
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          Self Cleaning Filters
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          copper silver lonization
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          filters fitting and parts
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          accessories
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            textTransform: 'capitalize',
          })}
        >
          <IconTickCircle
            className={css({
              w: '5',
              h: '5',
              color: 'success',
            })}
          />
          water quality testers
        </li>
      </ul>
    </div>
  </div>
);

export {Overview};
