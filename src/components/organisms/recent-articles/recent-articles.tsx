import {Card} from '@/components/molecules/card';
import {grid} from '@styled/patterns';

const RecentArticles = ({posts}: {posts: Array<any>}) => {
  return (
    <div
      className={grid({
        gridTemplateColumns: '3',
        gap: 6,
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
