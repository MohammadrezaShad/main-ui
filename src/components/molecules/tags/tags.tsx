import {css} from '@styled/css';

import {Tag} from '@/components';
import {TagType} from '@/graphql/generated/types';

const Tags = ({tags}: {tags: TagType[]}) => (
  <ul
    className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      my: {
        base: '12',
        mdDown: '6',
      },
    })}
  >
    {tags.map(tag => (
      <Tag key={tag._id} text={tag.title} href={`/tags.${tag.slug}`} />
    ))}
  </ul>
);

export default Tags;
