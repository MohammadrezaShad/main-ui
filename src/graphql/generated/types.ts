export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AnswerItem = {
  answer: Scalars['String']['input'];
  question: Scalars['String']['input'];
};

export type ArticleInputType = {
  author?: InputMaybe<UserOutputInputType>;
  categories?: InputMaybe<Array<CategoryInputType>>;
  content: Scalars['String']['input'];
  createUser?: InputMaybe<UserOutputInputType>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  faqs?: InputMaybe<Array<FaqInputType>>;
  hasPdf?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  readingDuration?: InputMaybe<Scalars['Int']['input']>;
  reports?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<StatusType>;
  tags?: InputMaybe<Array<TagInputType>>;
  thumbnail?: InputMaybe<ImageInputType>;
  title: Scalars['String']['input'];
  updateUser?: InputMaybe<UserOutputInputType>;
};

export type ArticleMutation = {
  __typename?: 'ArticleMutation';
  createArticle: CreateArticleOutput;
  deleteArticle: DeleteArticleOutput;
  deleteArticles: DeleteArticleOutput;
  updateArticle: UpdateArticleOutput;
};


export type ArticleMutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type ArticleMutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};


export type ArticleMutationDeleteArticlesArgs = {
  input: BulkDeleteArticleInput;
};


export type ArticleMutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};

export type ArticleQuery = {
  __typename?: 'ArticleQuery';
  findArticleById: FindArticleOutput;
  findArticleByIds: Array<ArticleType>;
  findArticleByName: FindArticleOutput;
  findRelatedArticles: FindRelatedArticlesOutput;
  getArticlePdfById?: Maybe<Scalars['String']['output']>;
  getUserArticles: GetUserArticlesOutput;
  getUserBookmarkedArticles: GetUserArticlesOutput;
  searchArticles: SearchArticleOutput;
};


export type ArticleQueryFindArticleByIdArgs = {
  input: FindArticleInput;
};


export type ArticleQueryFindArticleByIdsArgs = {
  input: BulkFindArticleInput;
};


export type ArticleQueryFindArticleByNameArgs = {
  input: FindArticleBySlugInput;
};


export type ArticleQueryFindRelatedArticlesArgs = {
  input: FindRelatedArticlesInput;
};


export type ArticleQueryGetArticlePdfByIdArgs = {
  input: DownloadArticleInput;
};


export type ArticleQueryGetUserArticlesArgs = {
  input: GetUserArticlesInput;
};


export type ArticleQueryGetUserBookmarkedArticlesArgs = {
  input: GetUserBookmarkedArticlesInput;
};


export type ArticleQuerySearchArticlesArgs = {
  input: SearchArticleInput;
};

export type ArticleType = {
  __typename?: 'ArticleType';
  _id: Scalars['String']['output'];
  author?: Maybe<UserOutputType>;
  categories?: Maybe<Array<CategoryType>>;
  commentsCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  engagementCount: Scalars['Int']['output'];
  excerpt?: Maybe<Scalars['String']['output']>;
  faqs?: Maybe<Array<FaqType>>;
  hasPdf?: Maybe<Scalars['Boolean']['output']>;
  isBookmark: Scalars['Boolean']['output'];
  isUserFavorite: Scalars['Boolean']['output'];
  likeCount: Scalars['Int']['output'];
  publishDate?: Maybe<Scalars['DateTime']['output']>;
  readingDuration?: Maybe<Scalars['Int']['output']>;
  reports?: Maybe<Array<Scalars['String']['output']>>;
  savedCount: Scalars['Int']['output'];
  seoSetting?: Maybe<SeoSettingType>;
  slug: Scalars['String']['output'];
  status?: Maybe<StatusType>;
  tags?: Maybe<Array<TagType>>;
  thumbnail?: Maybe<ImageType>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visitsCount: Scalars['Int']['output'];
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  forgetPassword: ForgetPasswordOutput;
  getTadvinoToken?: Maybe<Scalars['String']['output']>;
  resetPassword: ChangePasswordOutput;
  sendVerificationCode: SendVerificationCodeOutput;
  signup: SignupOutput;
  updateUser: AuthUpdateUserOutput;
  verifyAccount: VerifyAccountOutput;
};


export type AuthMutationForgetPasswordArgs = {
  input: ForgetPasswordInput;
};


export type AuthMutationResetPasswordArgs = {
  input: ChangePasswordInput;
};


export type AuthMutationSendVerificationCodeArgs = {
  input: SendVerificationCodeInput;
};


export type AuthMutationSignupArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  input: SignupInputType;
};


export type AuthMutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  input: UpdateUserInput;
};


export type AuthMutationVerifyAccountArgs = {
  input: VerifyAccountInput;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  getUser: UserOutputType;
  isValidAndVerifiedAccount: IsValidAndVerifiedAccountOutput;
  signin: SigninOutput;
  signinWithGoogle: SigninOutput;
};


export type AuthQueryIsValidAndVerifiedAccountArgs = {
  input: IsValidAndVerifiedAccountInput;
};


export type AuthQuerySigninArgs = {
  input: SigninInput;
};


export type AuthQuerySigninWithGoogleArgs = {
  input: GoogleTokenInput;
};

export type AuthUpdateUserOutput = {
  __typename?: 'AuthUpdateUserOutput';
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type BestUserInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type BestUserOutput = {
  __typename?: 'BestUserOutput';
  results?: Maybe<Array<User>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  userRank?: Maybe<UserRank>;
};

export type BookmarkMutation = {
  __typename?: 'BookmarkMutation';
  createBookmark: CreateBookmarkOutput;
  deleteBookmark: DeleteBookmarkOutput;
  deleteBookmarks: DeleteBookmarkOutput;
  deleteOneBookmark: DeleteBookmarkOutput;
  updateBookmark: UpdateBookmarkOutput;
};


export type BookmarkMutationCreateBookmarkArgs = {
  input: CreateBookmarkInput;
};


export type BookmarkMutationDeleteBookmarkArgs = {
  input: DeleteBookmarkInput;
};


export type BookmarkMutationDeleteBookmarksArgs = {
  input: BulkFindBookmarkInput;
};


export type BookmarkMutationDeleteOneBookmarkArgs = {
  input: DeleteOneArticleBookmarkInput;
};


export type BookmarkMutationUpdateBookmarkArgs = {
  input: UpdateBookmarkInput;
};

export type BookmarkQuery = {
  __typename?: 'BookmarkQuery';
  findBookmarkById: FindBookmarkOutput;
  findBookmarkByIds: Array<BookmarkType>;
  searchBookmarks: SearchBookmarkOutput;
};


export type BookmarkQueryFindBookmarkByIdArgs = {
  input: FindBookmarkInput;
};


export type BookmarkQueryFindBookmarkByIdsArgs = {
  input: BulkFindBookmarkInput;
};


export type BookmarkQuerySearchBookmarksArgs = {
  input: SearchBookmarkInput;
};

export type BookmarkType = {
  __typename?: 'BookmarkType';
  _id: Scalars['String']['output'];
  article: ArticleType;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserOutputType>;
};

export type BulkDeleteArticleInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteCategoryInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteCommentInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteGraphicalQuizInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteLikeInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteQuestionInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteQuizInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteSeoSettingInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteTagInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteUsersInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkFindArticleInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkFindBookmarkInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkFindLikeInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkFindSeoSettingInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkFindTagInput = {
  ids: Array<Scalars['String']['input']>;
};

export type CategoryInputType = {
  parent?: InputMaybe<CategoryInputType>;
};

export type CategoryMutation = {
  __typename?: 'CategoryMutation';
  createCategory: CreateCategoryOutput;
  deleteCategories: DeleteCategoryOutput;
  deleteCategory: DeleteCategoryOutput;
  updateCategory: UpdateCategoryOutput;
};


export type CategoryMutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type CategoryMutationDeleteCategoriesArgs = {
  input: BulkDeleteCategoryInput;
};


export type CategoryMutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type CategoryMutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type CategoryQuery = {
  __typename?: 'CategoryQuery';
  findCategoryById: FindCategoryOutput;
  findCategoryBySlug: FindCategoryOutput;
  searchCategories: SearchCategoryOutput;
};


export type CategoryQueryFindCategoryByIdArgs = {
  input: FindCategoryInput;
};


export type CategoryQueryFindCategoryBySlugArgs = {
  input: FindCategoryBySlugInput;
};


export type CategoryQuerySearchCategoriesArgs = {
  input: SearchCategoryInput;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<ImageType>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<CategoryType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSetting?: Maybe<SeoSettingType>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChangePasswordInput = {
  code: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  success: Scalars['Boolean']['output'];
};

export type CommentInputType = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  author: Scalars['String']['input'];
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  client: Scalars['String']['input'];
  content: Scalars['String']['input'];
  createUser?: InputMaybe<UserOutputInputType>;
  parent?: InputMaybe<CommentInputType>;
  post: CommentPostOutputInputType;
  type: CommentTypeEnum;
};

export type CommentMutation = {
  __typename?: 'CommentMutation';
  createAdminComment: CreateCommentOutput;
  createComment: CreateCommentOutput;
  deleteComment: DeleteCommentOutput;
  deleteComments: DeleteCommentOutput;
  editComment: EditCommentOutput;
  removeComment: DeleteCommentOutput;
  updateComment: UpdateCommentOutput;
};


export type CommentMutationCreateAdminCommentArgs = {
  input: CreateAdminCommentInput;
};


export type CommentMutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type CommentMutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type CommentMutationDeleteCommentsArgs = {
  input: BulkDeleteCommentInput;
};


export type CommentMutationEditCommentArgs = {
  input: EditCommentInput;
};


export type CommentMutationRemoveCommentArgs = {
  input: RemoveCommentInput;
};


export type CommentMutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};

export type CommentPostOutputInputType = {
  article?: InputMaybe<ArticleInputType>;
};

export type CommentPostOutputType = {
  __typename?: 'CommentPostOutputType';
  article?: Maybe<ArticleType>;
};

export type CommentQuery = {
  __typename?: 'CommentQuery';
  findCommentById: FindCommentOutput;
  searchCommentss: SearchCommentOutput;
};


export type CommentQueryFindCommentByIdArgs = {
  input: FindCommentInput;
};


export type CommentQuerySearchCommentssArgs = {
  input: SearchCommentInput;
};

export type CommentType = {
  __typename?: 'CommentType';
  _id: Scalars['String']['output'];
  approved?: Maybe<Scalars['Boolean']['output']>;
  author: Scalars['String']['output'];
  authorEmail?: Maybe<Scalars['String']['output']>;
  childs?: Maybe<Array<CommentType>>;
  client: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  isUserLike: Scalars['Boolean']['output'];
  likeCount?: Maybe<Scalars['Int']['output']>;
  parent?: Maybe<CommentType>;
  post: CommentPostOutputType;
  type: CommentTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CommentTypeEnum {
  Article = 'ARTICLE'
}

export type CoreOutput = {
  __typename?: 'CoreOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateAdminCommentInput = {
  author: Scalars['String']['input'];
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  client: Scalars['String']['input'];
  content: Scalars['String']['input'];
  parent: Scalars['String']['input'];
  post: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CreateArticleInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  content: Scalars['String']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  faqs?: InputMaybe<Array<FaqInputType>>;
  hasPdf?: InputMaybe<Scalars['Boolean']['input']>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  readingDuration?: InputMaybe<Scalars['Int']['input']>;
  reports?: InputMaybe<Array<Scalars['String']['input']>>;
  seoSetting?: InputMaybe<SeoSettingInput>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<StatusType>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateArticleOutput = {
  __typename?: 'CreateArticleOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateBookmarkInput = {
  article: Scalars['String']['input'];
};

export type CreateBookmarkOutput = {
  __typename?: 'CreateBookmarkOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  seoSetting?: InputMaybe<SeoSettingInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateCommentInput = {
  author: Scalars['String']['input'];
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  post: Scalars['String']['input'];
  token: Scalars['String']['input'];
  type: CommentTypeEnum;
};

export type CreateCommentOutput = {
  __typename?: 'CreateCommentOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateEngagementInput = {
  article: Scalars['String']['input'];
};

export type CreateEngagementOutput = {
  __typename?: 'CreateEngagementOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateGraphicalQuizInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
  quizPoints: Array<QuizPointsInputType>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateGraphicalQuizOutput = {
  __typename?: 'CreateGraphicalQuizOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateLikeInput = {
  post: Scalars['String']['input'];
  type: LikeTypeEnum;
};

export type CreateLikeOutput = {
  __typename?: 'CreateLikeOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateQuestionInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  options: Array<OptionInputType>;
  question: Scalars['String']['input'];
};

export type CreateQuestionOutput = {
  __typename?: 'CreateQuestionOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateQuizInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  questions: Array<Scalars['String']['input']>;
  reward?: InputMaybe<Scalars['Int']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateQuizOutput = {
  __typename?: 'CreateQuizOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateSeoSettingInput = {
  createUser?: InputMaybe<UserOutputInputType>;
  general?: InputMaybe<SeoGeneralSettingInputType>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  type: SeoCollectionName;
  updateUser?: InputMaybe<UserOutputInputType>;
};

export type CreateSeoSettingOutput = {
  __typename?: 'CreateSeoSettingOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  seoSetting?: InputMaybe<SeoSettingInput>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<TagStatusEnum>;
  title: Scalars['String']['input'];
};

export type CreateTagOutput = {
  __typename?: 'CreateTagOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateUserByCeo = {
  coins?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  googleId?: InputMaybe<Scalars['String']['input']>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  isVerified: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  success: Scalars['Boolean']['output'];
};

export type CreateVisitStatisticsInput = {
  article: Scalars['String']['input'];
};

export type CreateVisitStatisticsOutput = {
  __typename?: 'CreateVisitStatisticsOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteArticleInput = {
  id: Scalars['String']['input'];
};

export type DeleteArticleOutput = {
  __typename?: 'DeleteArticleOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteBookmarkInput = {
  id: Scalars['String']['input'];
};

export type DeleteBookmarkOutput = {
  __typename?: 'DeleteBookmarkOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteCategoryInput = {
  id: Scalars['String']['input'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteCommentInput = {
  id: Scalars['String']['input'];
};

export type DeleteCommentOutput = {
  __typename?: 'DeleteCommentOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteGraphicalQuizInput = {
  id: Scalars['String']['input'];
};

export type DeleteGraphicalQuizOutput = {
  __typename?: 'DeleteGraphicalQuizOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteImageInput = {
  id: Scalars['String']['input'];
};

export type DeleteImageOutput = {
  __typename?: 'DeleteImageOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteImagesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteLikeByUserInput = {
  post: Scalars['String']['input'];
  type: LikeTypeEnum;
};

export type DeleteLikeInput = {
  id: Scalars['String']['input'];
};

export type DeleteLikeOutput = {
  __typename?: 'DeleteLikeOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteOneArticleBookmarkInput = {
  articleId: Scalars['String']['input'];
};

export type DeleteQuestionInput = {
  id: Scalars['String']['input'];
};

export type DeleteQuestionOutput = {
  __typename?: 'DeleteQuestionOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteQuizInput = {
  id: Scalars['String']['input'];
};

export type DeleteQuizOutput = {
  __typename?: 'DeleteQuizOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteSeoSettingInput = {
  id: Scalars['String']['input'];
};

export type DeleteSeoSettingOutput = {
  __typename?: 'DeleteSeoSettingOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteTagInput = {
  id: Scalars['String']['input'];
};

export type DeleteTagOutput = {
  __typename?: 'DeleteTagOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteUserInput = {
  id: Scalars['String']['input'];
};

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteVisitStatisticsInput = {
  id: Scalars['String']['input'];
};

export type DeleteVisitStatisticsOutput = {
  __typename?: 'DeleteVisitStatisticsOutput';
  success: Scalars['Boolean']['output'];
};

export type DownloadArticleInput = {
  id: Scalars['String']['input'];
};

export type EditCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type EditCommentOutput = {
  __typename?: 'EditCommentOutput';
  success: Scalars['Boolean']['output'];
};

export type EndQuizInput = {
  answers: Array<AnswerItem>;
  quiz: Scalars['String']['input'];
};

export type EndQuizOutput = {
  __typename?: 'EndQuizOutput';
  correctAnswerCount: Scalars['Int']['output'];
  gainedCoins: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  wrongAnswerCount: Scalars['Int']['output'];
};

export type EngagementMutation = {
  __typename?: 'EngagementMutation';
  createEngagement: CreateEngagementOutput;
};


export type EngagementMutationCreateEngagementArgs = {
  input: CreateEngagementInput;
};

export type EngagementQuery = {
  __typename?: 'EngagementQuery';
  findEngagementById: FindEngagementOutput;
};


export type EngagementQueryFindEngagementByIdArgs = {
  input: FindEngagementInput;
};

export type EngagementType = {
  __typename?: 'EngagementType';
  _id: Scalars['String']['output'];
  article: ArticleType;
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserOutputType>;
};

export type FaqInputType = {
  answer: Scalars['String']['input'];
  question: Scalars['String']['input'];
};

export type FaqType = {
  __typename?: 'FaqType';
  answer: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type FindArticleBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindArticleInput = {
  id: Scalars['String']['input'];
};

export type FindArticleOutput = {
  __typename?: 'FindArticleOutput';
  result?: Maybe<ArticleType>;
  success: Scalars['Boolean']['output'];
};

export type FindBookmarkInput = {
  id: Scalars['String']['input'];
};

export type FindBookmarkOutput = {
  __typename?: 'FindBookmarkOutput';
  result?: Maybe<BookmarkType>;
  success: Scalars['Boolean']['output'];
};

export type FindCategoryBySlugInput = {
  parentSlug?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

export type FindCategoryInput = {
  id: Scalars['String']['input'];
};

export type FindCategoryOutput = {
  __typename?: 'FindCategoryOutput';
  result?: Maybe<CategoryType>;
  success: Scalars['Boolean']['output'];
};

export type FindCommentInput = {
  id: Scalars['String']['input'];
};

export type FindCommentOutput = {
  __typename?: 'FindCommentOutput';
  result?: Maybe<CommentType>;
  success: Scalars['Boolean']['output'];
};

export type FindEngagementInput = {
  id: Scalars['String']['input'];
};

export type FindEngagementOutput = {
  __typename?: 'FindEngagementOutput';
  result?: Maybe<EngagementType>;
  success: Scalars['Boolean']['output'];
};

export type FindGraphicalQuizInput = {
  id: Scalars['String']['input'];
};

export type FindGraphicalQuizOutput = {
  __typename?: 'FindGraphicalQuizOutput';
  result?: Maybe<GraphicalQuizType>;
  success: Scalars['Boolean']['output'];
};

export type FindLikeInput = {
  id: Scalars['String']['input'];
};

export type FindLikeOutput = {
  __typename?: 'FindLikeOutput';
  result?: Maybe<LikeType>;
  success: Scalars['Boolean']['output'];
};

export type FindQuestionInput = {
  id: Scalars['String']['input'];
};

export type FindQuestionOutput = {
  __typename?: 'FindQuestionOutput';
  result?: Maybe<QuestionType>;
  success: Scalars['Boolean']['output'];
};

export type FindQuizByPointInput = {
  id: Scalars['String']['input'];
  point: PointInputType;
};

export type FindQuizByPointOutput = {
  __typename?: 'FindQuizByPointOutput';
  result?: Maybe<QuizType>;
  success: Scalars['Boolean']['output'];
};

export type FindQuizInput = {
  id: Scalars['String']['input'];
};

export type FindQuizOutput = {
  __typename?: 'FindQuizOutput';
  result?: Maybe<QuizType>;
  success: Scalars['Boolean']['output'];
};

export type FindRelatedArticlesInput = {
  articleId: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type FindRelatedArticlesOutput = {
  __typename?: 'FindRelatedArticlesOutput';
  results?: Maybe<Array<ArticleType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindSeoSettingByIdAndTypeInput = {
  id: Scalars['String']['input'];
  type: SeoCollectionName;
};

export type FindSeoSettingInput = {
  id: Scalars['String']['input'];
};

export type FindSeoSettingOutput = {
  __typename?: 'FindSeoSettingOutput';
  result?: Maybe<SeoSettingType>;
  success: Scalars['Boolean']['output'];
};

export type FindTagBySlugInput = {
  parentSlug?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

export type FindTagInput = {
  id: Scalars['String']['input'];
};

export type FindTagOutput = {
  __typename?: 'FindTagOutput';
  result?: Maybe<TagType>;
  success: Scalars['Boolean']['output'];
};

export type FindUserInput = {
  id: Scalars['String']['input'];
};

export type FindUsersInput = {
  ids: Array<Scalars['String']['input']>;
};

export type FindVisitStatisticsInput = {
  id: Scalars['String']['input'];
};

export type FindVisitStatisticsOutput = {
  __typename?: 'FindVisitStatisticsOutput';
  result?: Maybe<VisitStatisticsType>;
  success: Scalars['Boolean']['output'];
};

export type FocusKeyword = {
  __typename?: 'FocusKeyword';
  count: Scalars['Float']['output'];
  keyword: Scalars['String']['output'];
};

export type FocusKeywordInput = {
  focusKeyword: Scalars['String']['input'];
};

export type FocusKeywordListInput = {
  focusKeywords: Array<Scalars['String']['input']>;
};

export type FocusKeywordListOutput = {
  __typename?: 'FocusKeywordListOutput';
  results: Array<FocusKeyword>;
  success: Scalars['Boolean']['output'];
};

export type FocusKeywordOutput = {
  __typename?: 'FocusKeywordOutput';
  result: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type ForgetPasswordInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type ForgetPasswordOutput = {
  __typename?: 'ForgetPasswordOutput';
  success: Scalars['Boolean']['output'];
};

export enum GenderEnum {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type GetUserArticlesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type GetUserArticlesOutput = {
  __typename?: 'GetUserArticlesOutput';
  results?: Maybe<Array<ArticleType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type GetUserBookmarkedArticlesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type GetUserVisitsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type GetUserVisitsOutput = {
  __typename?: 'GetUserVisitsOutput';
  results?: Maybe<Array<VisitStatisticsType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type GoogleTokenInput = {
  token: Scalars['String']['input'];
};

export type GraphicalQuizMutation = {
  __typename?: 'GraphicalQuizMutation';
  createGraphicalQuiz: CreateGraphicalQuizOutput;
  deleteGraphicalQuiz: DeleteGraphicalQuizOutput;
  deleteGraphicalQuizzes: DeleteGraphicalQuizOutput;
  updateGraphicalQuiz: UpdateGraphicalQuizOutput;
};


export type GraphicalQuizMutationCreateGraphicalQuizArgs = {
  input: CreateGraphicalQuizInput;
};


export type GraphicalQuizMutationDeleteGraphicalQuizArgs = {
  input: DeleteGraphicalQuizInput;
};


export type GraphicalQuizMutationDeleteGraphicalQuizzesArgs = {
  input: BulkDeleteGraphicalQuizInput;
};


export type GraphicalQuizMutationUpdateGraphicalQuizArgs = {
  input: UpdateGraphicalQuizInput;
};

export type GraphicalQuizQuery = {
  __typename?: 'GraphicalQuizQuery';
  findGraphicalQuizById: FindGraphicalQuizOutput;
  findQuizByPoint: FindQuizByPointOutput;
  getTotalCount: Scalars['Int']['output'];
  payAndFind: FindGraphicalQuizOutput;
  searchGraphicalQuizzes: SearchGraphicalQuizOutput;
};


export type GraphicalQuizQueryFindGraphicalQuizByIdArgs = {
  input: FindGraphicalQuizInput;
};


export type GraphicalQuizQueryFindQuizByPointArgs = {
  input: FindQuizByPointInput;
};


export type GraphicalQuizQueryPayAndFindArgs = {
  input: FindGraphicalQuizInput;
};


export type GraphicalQuizQuerySearchGraphicalQuizzesArgs = {
  input: SearchGraphicalQuizInput;
};

export type GraphicalQuizType = {
  __typename?: 'GraphicalQuizType';
  _id: Scalars['String']['output'];
  category?: Maybe<CategoryType>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<ImageType>;
  price?: Maybe<Scalars['Int']['output']>;
  quizPoints: Array<QuizPointsType>;
  reward?: Maybe<Scalars['Int']['output']>;
  thumbnail?: Maybe<ImageType>;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  youEarned: Scalars['Float']['output'];
};

export type ImageInputType = {
  alt?: InputMaybe<Scalars['String']['input']>;
  filename: Scalars['String']['input'];
  height: Scalars['Float']['input'];
  preview: Scalars['String']['input'];
  width: Scalars['Float']['input'];
};

export type ImageMutation = {
  __typename?: 'ImageMutation';
  deleteImage: DeleteImageOutput;
  deleteImages: DeleteImageOutput;
  updateImage: UpdateImageOutput;
  uploadImage: UploadImageOutput;
  uploadImages: CoreOutput;
};


export type ImageMutationDeleteImageArgs = {
  input: DeleteImageInput;
};


export type ImageMutationDeleteImagesArgs = {
  input: DeleteImagesInput;
};


export type ImageMutationUpdateImageArgs = {
  input: UpdateImageInput;
};


export type ImageMutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
  input?: InputMaybe<UploadImageInputType>;
};


export type ImageMutationUploadImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
};

export type ImageQuery = {
  __typename?: 'ImageQuery';
  searchImage: SearchImagesOutput;
};


export type ImageQuerySearchImageArgs = {
  input: SearchImagesInput;
};

export type ImageType = {
  __typename?: 'ImageType';
  _id: Scalars['String']['output'];
  alt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filename: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  preview: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  width: Scalars['Float']['output'];
};

export type IsValidAndVerifiedAccountInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type IsValidAndVerifiedAccountOutput = {
  __typename?: 'IsValidAndVerifiedAccountOutput';
  hasPassword: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  success: Scalars['Boolean']['output'];
};

export type LikeMutation = {
  __typename?: 'LikeMutation';
  bulkDeleteLikes: DeleteLikeOutput;
  createLike: CreateLikeOutput;
  deleteLike: DeleteLikeOutput;
  deleteLikeByUser: DeleteLikeOutput;
  updateLike: UpdateLikeOutput;
};


export type LikeMutationBulkDeleteLikesArgs = {
  input: BulkDeleteLikeInput;
};


export type LikeMutationCreateLikeArgs = {
  input: CreateLikeInput;
};


export type LikeMutationDeleteLikeArgs = {
  input: DeleteLikeInput;
};


export type LikeMutationDeleteLikeByUserArgs = {
  input: DeleteLikeByUserInput;
};


export type LikeMutationUpdateLikeArgs = {
  input: UpdateLikeInput;
};

export type LikePostOutputInputType = {
  article?: InputMaybe<ArticleInputType>;
  comment?: InputMaybe<CommentInputType>;
};

export type LikePostOutputType = {
  __typename?: 'LikePostOutputType';
  article?: Maybe<ArticleType>;
  comment?: Maybe<CommentType>;
};

export type LikeQuery = {
  __typename?: 'LikeQuery';
  findLikeById: FindLikeOutput;
  findLikeByIds: Array<LikeType>;
  searchPaperFavorite: SearchLikeOutput;
};


export type LikeQueryFindLikeByIdArgs = {
  input: FindLikeInput;
};


export type LikeQueryFindLikeByIdsArgs = {
  input: BulkFindLikeInput;
};


export type LikeQuerySearchPaperFavoriteArgs = {
  input: SearchLikeInput;
};

export type LikeType = {
  __typename?: 'LikeType';
  _id: Scalars['String']['output'];
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  post: LikePostOutputType;
  type: LikeTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserOutputType>;
};

export enum LikeTypeEnum {
  Article = 'ARTICLE',
  Comment = 'COMMENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  article: ArticleMutation;
  auth: AuthMutation;
  bookmark: BookmarkMutation;
  category: CategoryMutation;
  comment: CommentMutation;
  engagement: EngagementMutation;
  graphicalQuiz: GraphicalQuizMutation;
  image: ImageMutation;
  like: LikeMutation;
  question: QuestionMutation;
  quiz: QuizMutation;
  seoSetting: SeoSettingMutation;
  tag: TagMutation;
  users: UserMutation;
  visitStatistics: VisitStatisticsMutation;
};

export type OptionInputType = {
  answer: Scalars['String']['input'];
  isCorrect: Scalars['Boolean']['input'];
};

export type OptionType = {
  __typename?: 'OptionType';
  answer: Scalars['String']['output'];
  isCorrect: Scalars['Boolean']['output'];
};

export type PointInputType = {
  x: Scalars['Int']['input'];
  y: Scalars['Int']['input'];
};

export type PointType = {
  __typename?: 'PointType';
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  article: ArticleQuery;
  auth: AuthQuery;
  bookmark: BookmarkQuery;
  category: CategoryQuery;
  comment: CommentQuery;
  engagement: EngagementQuery;
  graphicalQuiz: GraphicalQuizQuery;
  image: ImageQuery;
  like: LikeQuery;
  question: QuestionQuery;
  quiz: QuizQuery;
  seoSetting: SeoSettingQuery;
  tag: TagQuery;
  users: UserQuery;
  visitStatistics: VisitStatisticsQuery;
};

export type QuestionMutation = {
  __typename?: 'QuestionMutation';
  createQuestion: CreateQuestionOutput;
  deleteQuestion: DeleteQuestionOutput;
  deleteQuestions: DeleteQuestionOutput;
  updateQuestion: UpdateQuestionOutput;
};


export type QuestionMutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type QuestionMutationDeleteQuestionArgs = {
  input: DeleteQuestionInput;
};


export type QuestionMutationDeleteQuestionsArgs = {
  input: BulkDeleteQuestionInput;
};


export type QuestionMutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
};

export type QuestionQuery = {
  __typename?: 'QuestionQuery';
  findQuestionById: FindQuestionOutput;
  searchQuestions: SearchQuestionOutput;
};


export type QuestionQueryFindQuestionByIdArgs = {
  input: FindQuestionInput;
};


export type QuestionQuerySearchQuestionsArgs = {
  input: SearchQuestionInput;
};

export type QuestionType = {
  __typename?: 'QuestionType';
  _id: Scalars['String']['output'];
  categories?: Maybe<Array<CategoryType>>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  options: Array<OptionType>;
  question: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type QuizMutation = {
  __typename?: 'QuizMutation';
  createQuiz: CreateQuizOutput;
  deleteQuiz: DeleteQuizOutput;
  deleteQuizzes: DeleteQuizOutput;
  endQuiz: EndQuizOutput;
  updateQuiz: UpdateQuizOutput;
};


export type QuizMutationCreateQuizArgs = {
  input: CreateQuizInput;
};


export type QuizMutationDeleteQuizArgs = {
  input: DeleteQuizInput;
};


export type QuizMutationDeleteQuizzesArgs = {
  input: BulkDeleteQuizInput;
};


export type QuizMutationEndQuizArgs = {
  input: EndQuizInput;
};


export type QuizMutationUpdateQuizArgs = {
  input: UpdateQuizInput;
};

export type QuizPointsInputType = {
  point: PointInputType;
  quiz: Scalars['String']['input'];
};

export type QuizPointsType = {
  __typename?: 'QuizPointsType';
  point: PointType;
  quiz: Scalars['String']['output'];
  quizPoints?: Maybe<QuizPointsType>;
};

export type QuizQuery = {
  __typename?: 'QuizQuery';
  findQuizById: FindQuizOutput;
  getTopQuizzes: TopQuizzesOutput;
  getTotalCount: Scalars['Int']['output'];
  payAndFind: FindQuizOutput;
  searchQuizzes: SearchQuizOutput;
};


export type QuizQueryFindQuizByIdArgs = {
  input: FindQuizInput;
};


export type QuizQueryPayAndFindArgs = {
  input: FindQuizInput;
};


export type QuizQuerySearchQuizzesArgs = {
  input: SearchQuizInput;
};

export type QuizType = {
  __typename?: 'QuizType';
  _id: Scalars['String']['output'];
  category?: Maybe<CategoryType>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  questions: Array<QuestionType>;
  reward?: Maybe<Scalars['Int']['output']>;
  thumbnail?: Maybe<ImageType>;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  youEarned: Scalars['Float']['output'];
};

export type RemoveCommentInput = {
  id: Scalars['String']['input'];
};

export enum Role {
  Admin = 'Admin',
  Author = 'Author',
  AuthorJunior = 'AuthorJunior',
  Ceo = 'CEO',
  ContentManager = 'ContentManager',
  Contributor = 'Contributor',
  Editor = 'Editor',
  FeedbackViewer = 'FeedbackViewer',
  Secretary = 'Secretary',
  SeoEditor = 'SeoEditor',
  SeoManager = 'SeoManager',
  User = 'User'
}

export type RoleOutput = {
  __typename?: 'RoleOutput';
  role: Scalars['String']['output'];
  totalCount: Scalars['Int']['output'];
};

export type SearchArticleInput = {
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  hasPdf?: InputMaybe<Scalars['Boolean']['input']>;
  isPublishing?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  showMyPosts?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<StatusType>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchArticleOutput = {
  __typename?: 'SearchArticleOutput';
  results?: Maybe<Array<ArticleType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBookmarkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchBookmarkOutput = {
  __typename?: 'SearchBookmarkOutput';
  results?: Maybe<Array<BookmarkType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchCategoryInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  isSubCategory?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchCategoryOutput = {
  __typename?: 'SearchCategoryOutput';
  results?: Maybe<Array<CategoryType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchCommentInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  post?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CommentTypeEnum>;
};

export type SearchCommentOutput = {
  __typename?: 'SearchCommentOutput';
  results?: Maybe<Array<CommentType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchGraphicalQuizInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchGraphicalQuizOutput = {
  __typename?: 'SearchGraphicalQuizOutput';
  results?: Maybe<Array<GraphicalQuizType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchImagesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchImagesOutput = {
  __typename?: 'SearchImagesOutput';
  results?: Maybe<Array<ImageType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchLikeInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeTypeEnum>;
};

export type SearchLikeOutput = {
  __typename?: 'SearchLikeOutput';
  results?: Maybe<Array<LikeType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchQuestionInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type SearchQuestionOutput = {
  __typename?: 'SearchQuestionOutput';
  results?: Maybe<Array<QuestionType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchQuizInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchQuizOutput = {
  __typename?: 'SearchQuizOutput';
  results?: Maybe<Array<QuizType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export enum SearchSortType {
  Newest = 'NEWEST',
  PostCount = 'POST_COUNT'
}

export type SearchTagInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  status?: InputMaybe<TagStatusEnum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchTagOutput = {
  __typename?: 'SearchTagOutput';
  results?: Maybe<Array<TagType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchUserByRoleInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  role: Role;
};

export type SearchUserByRoleOutput = {
  __typename?: 'SearchUserByRoleOutput';
  results?: Maybe<Array<User>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchUserInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Role>>;
  text?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUserOutput = {
  __typename?: 'SearchUserOutput';
  results?: Maybe<Array<UserOutputType>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SendVerificationCodeInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SendVerificationCodeOutput = {
  __typename?: 'SendVerificationCodeOutput';
  success: Scalars['Boolean']['output'];
};

export enum SeoCollectionName {
  Articles = 'ARTICLES',
  Categories = 'CATEGORIES',
  Tags = 'TAGS'
}

export type SeoGeneralSettingInputType = {
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  focusKeyword?: InputMaybe<Array<Scalars['String']['input']>>;
  nofollow?: InputMaybe<Scalars['Boolean']['input']>;
  noindex?: InputMaybe<Scalars['Boolean']['input']>;
  permalink?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeoGeneralSettingType = {
  __typename?: 'SeoGeneralSettingType';
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  focusKeyword?: Maybe<Array<Scalars['String']['output']>>;
  nofollow?: Maybe<Scalars['Boolean']['output']>;
  noindex?: Maybe<Scalars['Boolean']['output']>;
  permalink?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeoSettingInput = {
  general?: InputMaybe<SeoGeneralSettingInputType>;
  score?: InputMaybe<Scalars['Float']['input']>;
};

export type SeoSettingMutation = {
  __typename?: 'SeoSettingMutation';
  createSeoSetting: CreateSeoSettingOutput;
  deleteSeoSetting: DeleteSeoSettingOutput;
  deleteSeoSettings: DeleteSeoSettingOutput;
  updateSeoSetting: UpdateSeoSettingOutput;
};


export type SeoSettingMutationCreateSeoSettingArgs = {
  input: CreateSeoSettingInput;
};


export type SeoSettingMutationDeleteSeoSettingArgs = {
  input: DeleteSeoSettingInput;
};


export type SeoSettingMutationDeleteSeoSettingsArgs = {
  input: BulkDeleteSeoSettingInput;
};


export type SeoSettingMutationUpdateSeoSettingArgs = {
  input: UpdateSeoSettingInput;
};

export type SeoSettingQuery = {
  __typename?: 'SeoSettingQuery';
  findSeoSettingById: FindSeoSettingOutput;
  findSeoSettingByIdAndType: FindSeoSettingOutput;
  findSeoSettingByIds: Array<SeoSettingType>;
  getFocusKeywordListNumbers: FocusKeywordListOutput;
  getFocusKeywordNumbers: FocusKeywordOutput;
};


export type SeoSettingQueryFindSeoSettingByIdArgs = {
  input: FindSeoSettingInput;
};


export type SeoSettingQueryFindSeoSettingByIdAndTypeArgs = {
  input: FindSeoSettingByIdAndTypeInput;
};


export type SeoSettingQueryFindSeoSettingByIdsArgs = {
  input: BulkFindSeoSettingInput;
};


export type SeoSettingQueryGetFocusKeywordListNumbersArgs = {
  input: FocusKeywordListInput;
};


export type SeoSettingQueryGetFocusKeywordNumbersArgs = {
  input: FocusKeywordInput;
};

export type SeoSettingType = {
  __typename?: 'SeoSettingType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  general?: Maybe<SeoGeneralSettingType>;
  itemId?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  type: SeoCollectionName;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SigninOutput = {
  __typename?: 'SigninOutput';
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SignupInputType = {
  coins?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type SignupOutput = {
  __typename?: 'SignupOutput';
  success: Scalars['Boolean']['output'];
};

export enum StatusType {
  Draft = 'DRAFT',
  Publish = 'PUBLISH'
}

export type TagInputType = {
  parent?: InputMaybe<TagInputType>;
  status?: InputMaybe<TagStatusEnum>;
};

export type TagMutation = {
  __typename?: 'TagMutation';
  createTag: CreateTagOutput;
  deleteTag: DeleteTagOutput;
  deleteTags: DeleteTagOutput;
  updateTag: UpdateTagOutput;
};


export type TagMutationCreateTagArgs = {
  input: CreateTagInput;
};


export type TagMutationDeleteTagArgs = {
  input: DeleteTagInput;
};


export type TagMutationDeleteTagsArgs = {
  input: BulkDeleteTagInput;
};


export type TagMutationUpdateTagArgs = {
  input: UpdateTagInput;
};

export type TagQuery = {
  __typename?: 'TagQuery';
  findTagById: FindTagOutput;
  findTagByIds: Array<TagType>;
  findTagBySlug: FindTagOutput;
  searchTags: SearchTagOutput;
};


export type TagQueryFindTagByIdArgs = {
  input: FindTagInput;
};


export type TagQueryFindTagByIdsArgs = {
  input: BulkFindTagInput;
};


export type TagQueryFindTagBySlugArgs = {
  input: FindTagBySlugInput;
};


export type TagQuerySearchTagsArgs = {
  input: SearchTagInput;
};

export enum TagStatusEnum {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
  Trash = 'TRASH'
}

export type TagType = {
  __typename?: 'TagType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<ImageType>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<TagType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSetting?: Maybe<SeoSettingType>;
  slug: Scalars['String']['output'];
  status?: Maybe<TagStatusEnum>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopQuizzesOutput = {
  __typename?: 'TopQuizzesOutput';
  result?: Maybe<Array<QuizType>>;
  success: Scalars['Boolean']['output'];
};

export type UpdateArticleInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  faqs?: InputMaybe<Array<FaqInputType>>;
  hasPdf?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  readingDuration?: InputMaybe<Scalars['Int']['input']>;
  reports?: InputMaybe<Array<Scalars['String']['input']>>;
  seoSetting?: InputMaybe<SeoSettingInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusType>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateArticleOutput = {
  __typename?: 'UpdateArticleOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateBookmarkInput = {
  article?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type UpdateBookmarkOutput = {
  __typename?: 'UpdateBookmarkOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  seoSetting?: InputMaybe<SeoSettingInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryOutput = {
  __typename?: 'UpdateCategoryOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateCommentInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  post?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CommentTypeEnum>;
};

export type UpdateCommentOutput = {
  __typename?: 'UpdateCommentOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateGraphicalQuizInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  quizPoints?: InputMaybe<Array<QuizPointsInputType>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGraphicalQuizOutput = {
  __typename?: 'UpdateGraphicalQuizOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateImageInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type UpdateImageOutput = {
  __typename?: 'UpdateImageOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateLikeInput = {
  id: Scalars['String']['input'];
  post?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LikeTypeEnum>;
};

export type UpdateLikeOutput = {
  __typename?: 'UpdateLikeOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateQuestionInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  options?: InputMaybe<Array<OptionInputType>>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionOutput = {
  __typename?: 'UpdateQuestionOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateQuizInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
  questions?: InputMaybe<Array<Scalars['String']['input']>>;
  reward?: InputMaybe<Scalars['Int']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuizOutput = {
  __typename?: 'UpdateQuizOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateSeoSettingInput = {
  createUser?: InputMaybe<UserOutputInputType>;
  general?: InputMaybe<SeoGeneralSettingInputType>;
  id: Scalars['String']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<SeoCollectionName>;
  updateUser?: InputMaybe<UserOutputInputType>;
};

export type UpdateSeoSettingOutput = {
  __typename?: 'UpdateSeoSettingOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  seoSetting?: InputMaybe<SeoSettingInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TagStatusEnum>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagOutput = {
  __typename?: 'UpdateTagOutput';
  success: Scalars['Boolean']['output'];
};

export type UpdateUserByCeo = {
  coins?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  googleId?: InputMaybe<Scalars['String']['input']>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  coins?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOutput = {
  __typename?: 'UpdateUserOutput';
  success: Scalars['Boolean']['output'];
};

export type UploadImageInputType = {
  alt?: InputMaybe<Scalars['String']['input']>;
};

export type UploadImageOutput = {
  __typename?: 'UploadImageOutput';
  image?: Maybe<ImageType>;
  success: Scalars['Boolean']['output'];
};

export type UploadUserAvatarOutput = {
  __typename?: 'UploadUserAvatarOutput';
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  avatar?: Maybe<ImageType>;
  avatarStatus?: Maybe<UserAvatarStatusEnum>;
  coins?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<GenderEnum>;
  googleId?: Maybe<Scalars['String']['output']>;
  hometown?: Maybe<Scalars['String']['output']>;
  isCreatedWithSocialMedia?: Maybe<Scalars['Boolean']['output']>;
  isVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export enum UserAvatarStatusEnum {
  Draft = 'DRAFT',
  Publish = 'PUBLISH'
}

export type UserMutation = {
  __typename?: 'UserMutation';
  createUser: CreateUserOutput;
  deleteUser: DeleteUserOutput;
  deleteUsers: DeleteUserOutput;
  updateOperatorUser: UpdateUserOutput;
  updateUser: UpdateUserOutput;
  uploadAvatar: UploadUserAvatarOutput;
};


export type UserMutationCreateUserArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  input: CreateUserByCeo;
};


export type UserMutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type UserMutationDeleteUsersArgs = {
  input: BulkDeleteUsersInput;
};


export type UserMutationUpdateOperatorUserArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  input: UpdateUserInput;
};


export type UserMutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  input: UpdateUserByCeo;
};


export type UserMutationUploadAvatarArgs = {
  file: Scalars['Upload']['input'];
};

export type UserOutputInputType = {
  _id: Scalars['String']['input'];
  avatar?: InputMaybe<ImageInputType>;
  avatarStatus?: InputMaybe<UserAvatarStatusEnum>;
  coins?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  hometown?: InputMaybe<Scalars['String']['input']>;
  isCreatedWithSocialMedia?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UserOutputType = {
  __typename?: 'UserOutputType';
  _id: Scalars['String']['output'];
  articlesWrittenCount: Scalars['Int']['output'];
  articlesWrittenSavedCount: Scalars['Int']['output'];
  articlesWrittenVisitedCount: Scalars['Int']['output'];
  avatar?: Maybe<ImageType>;
  avatarStatus?: Maybe<UserAvatarStatusEnum>;
  coins?: Maybe<Scalars['Int']['output']>;
  commentsCount: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  downloadedArticlesCount: Scalars['Int']['output'];
  email?: Maybe<Scalars['String']['output']>;
  engagementCount: Scalars['Int']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<GenderEnum>;
  hometown?: Maybe<Scalars['String']['output']>;
  isCreatedWithSocialMedia?: Maybe<Scalars['Boolean']['output']>;
  isVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  savedArticlesCount: Scalars['Int']['output'];
  timeSpent: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  visitedArticlesCount: Scalars['Int']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  findUserById: UserOutputType;
  findUsersByIds: Array<UserOutputType>;
  getBestUsers: BestUserOutput;
  getUserRoles: UserRoleOutput;
  searchUser: SearchUserOutput;
  searchUserByRole: SearchUserByRoleOutput;
};


export type UserQueryFindUserByIdArgs = {
  input: FindUserInput;
};


export type UserQueryFindUsersByIdsArgs = {
  input: FindUsersInput;
};


export type UserQueryGetBestUsersArgs = {
  input: BestUserInput;
};


export type UserQuerySearchUserArgs = {
  input: SearchUserInput;
};


export type UserQuerySearchUserByRoleArgs = {
  input: SearchUserByRoleInput;
};

export type UserRank = {
  __typename?: 'UserRank';
  rank: Scalars['Int']['output'];
  user?: Maybe<User>;
};

export type UserRoleOutput = {
  __typename?: 'UserRoleOutput';
  results?: Maybe<Array<RoleOutput>>;
  success: Scalars['Boolean']['output'];
};

export type VerifyAccountInput = {
  code: Scalars['String']['input'];
};

export type VerifyAccountOutput = {
  __typename?: 'VerifyAccountOutput';
  success: Scalars['Boolean']['output'];
};

export type VisitStatisticsMutation = {
  __typename?: 'VisitStatisticsMutation';
  deleteVisitStatistics: DeleteVisitStatisticsOutput;
  recordVisitStatistics: CreateVisitStatisticsOutput;
};


export type VisitStatisticsMutationDeleteVisitStatisticsArgs = {
  input: DeleteVisitStatisticsInput;
};


export type VisitStatisticsMutationRecordVisitStatisticsArgs = {
  input: CreateVisitStatisticsInput;
};

export type VisitStatisticsQuery = {
  __typename?: 'VisitStatisticsQuery';
  findById: FindVisitStatisticsOutput;
  getUserVisits: GetUserVisitsOutput;
};


export type VisitStatisticsQueryFindByIdArgs = {
  input: FindVisitStatisticsInput;
};


export type VisitStatisticsQueryGetUserVisitsArgs = {
  input: GetUserVisitsInput;
};

export type VisitStatisticsType = {
  __typename?: 'VisitStatisticsType';
  _id: Scalars['String']['output'];
  article: ArticleType;
  clientId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserOutputType>;
};
