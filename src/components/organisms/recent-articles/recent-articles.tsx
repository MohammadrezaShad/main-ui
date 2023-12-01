import {Card} from '@/components/molecules/card';
import {css} from '@styled/css';

const RecentArticles = ({posts}: {posts: Array<any>}) => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        columnGap: 6,
      })}
    >
      {posts.map(post => (
        <Card
          key={post.id}
          title={post.title}
          articleLink={post.link}
          date={post.date}
          imageUrl={post.image}
        />
      ))}
    </div>
  );
};

export default RecentArticles;
