'use client';

import {css, cx} from '@styled/css';

import {Comment} from '@/components';

import {Container} from './comment-list.styled';

interface CommentListProps {
  className?: string;
}

export default function CommentList({className}: CommentListProps) {
  const defaultClassName = css({});
  const commentListClass = cx(defaultClassName, className);
  const items = [1, 2, 3, 4, 5, 6];

  //   const renderComment = (inputComments: MainCommentModel[]) =>
  //     inputComments.map(comment => {
  //       const childsComment = comment.childs?.length ? renderComment(comment.childs) : null;
  //       return (
  //         <React.Fragment key={comment._id}>
  //           <CommentItem
  //             comment={comment}
  //             isLoading={isLoading}
  //             onSubmit={onSubmit}
  //             onLike={onLike}
  //             handleVerify={handleVerify}
  //           />
  //           {childsComment}
  //         </React.Fragment>
  //       );
  //     });

  return (
    <Container className={commentListClass}>
      {items.map(item => (
        <Comment
          key={item}
          className={css({
            '&:not(:last-child)': {
              pb: 6,
            },
          })}
        />
      ))}
    </Container>
  );
}
