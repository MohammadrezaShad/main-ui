export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {[_ in K]?: never};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  DateTime: {input: any; output: any};
  Object: {input: any; output: any};
  Upload: {input: any; output: any};
};

export type ActiveSurveyWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type ActorShort = {
  __typename?: 'ActorShort';
  asCharacter?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Ages = {
  __typename?: 'Ages';
  findAgeBySlug: FindAgesOutput;
  findAgesById: FindAgesOutput;
  findAgesByIds: Array<AgesType>;
  searchAges: SearchAgesOutput;
};

export type AgesFindAgeBySlugArgs = {
  input: FindAgesBySlugInput;
};

export type AgesFindAgesByIdArgs = {
  input: FindAgesInput;
};

export type AgesFindAgesByIdsArgs = {
  input: FindAgesGroupInput;
};

export type AgesSearchAgesArgs = {
  input: SearchAgesInput;
};

export type AgesType = {
  __typename?: 'AgesType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['Float']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AlbumListResponse = {
  __typename?: 'AlbumListResponse';
  findAlbumById: FindAlbumListOutput;
  findAlbumByMultimedia: FindAlbumListOutput;
  searchAlbums: SearchAlbumListOutput;
};

export type AlbumListResponseFindAlbumByIdArgs = {
  input: FindAlbumListInput;
};

export type AlbumListResponseFindAlbumByMultimediaArgs = {
  input: FindAlbumByMultimediaInput;
};

export type AlbumListResponseSearchAlbumsArgs = {
  input: SearchAlbumListInput;
};

export type AlbumListType = {
  __typename?: 'AlbumListType';
  _id: Scalars['String']['output'];
  albumItems?: Maybe<Array<AlbumType>>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AlbumResponse = {
  __typename?: 'AlbumResponse';
  findAlbumById: FindAlbumOutput;
  findAlbumsByIds: Array<AlbumType>;
  getAllMultimediaImagesFromImdb: ImageData;
  getFamousCastOfMultimediaImagesFromImdb: FamousCastImageOutput;
  getFullCast: FullCastData;
  getMultimediaNewPhotos: FamousCastImageOutput;
  searchAlbums: SearchAlbumOutput;
  selectImage: SelectAlbumImageOutput;
};

export type AlbumResponseFindAlbumByIdArgs = {
  input: FindAlbumInput;
};

export type AlbumResponseFindAlbumsByIdsArgs = {
  input: FindAlbumsInput;
};

export type AlbumResponseGetAllMultimediaImagesFromImdbArgs = {
  id: Scalars['String']['input'];
};

export type AlbumResponseGetFamousCastOfMultimediaImagesFromImdbArgs = {
  input: FamousCastImageInput;
};

export type AlbumResponseGetFullCastArgs = {
  id: Scalars['String']['input'];
};

export type AlbumResponseGetMultimediaNewPhotosArgs = {
  input: GetMultimediaNewPhotosInput;
};

export type AlbumResponseSearchAlbumsArgs = {
  input: SearchAlbumInput;
};

export type AlbumResponseSelectImageArgs = {
  input: SelectAlbumImageInput;
};

export type AlbumType = {
  __typename?: 'AlbumType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  crewItems?: Maybe<Array<CrewItemType>>;
  dimensions?: Maybe<Array<ImageDimension>>;
  image?: Maybe<MediaLibraryImageType>;
  isExcluded: Scalars['Boolean']['output'];
  multimedia: MultimediaType;
  originalSource?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  forgetPassword: ForgetPasswordOutput;
  getTadvinoToken?: Maybe<Scalars['String']['output']>;
  resetPassword: ChangePasswordOutput;
  sendVerificationCode: SendVerificationCodeOutput;
  signUpWithGoogle: SignupOutput;
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

export type AuthMutationSignUpWithGoogleArgs = {
  input: TokenInput;
};

export type AuthMutationSignupArgs = {
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
  signInWithGoogle: SigninOutput;
  signin: SigninOutput;
};

export type AuthQueryIsValidAndVerifiedAccountArgs = {
  input: IsValidAndVerifiedAccountInput;
};

export type AuthQuerySignInWithGoogleArgs = {
  input: TokenInput;
};

export type AuthQuerySigninArgs = {
  input: SigninInput;
};

export type AuthUpdateUserOutput = {
  __typename?: 'AuthUpdateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type AwardModel = {
  __typename?: 'AwardModel';
  id?: Maybe<Scalars['Float']['output']>;
  multimedia?: Maybe<MultimediaType>;
  status?: Maybe<AwardStatus>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type AwardResponse = {
  __typename?: 'AwardResponse';
  findAwardById: FindAwardOutput;
  findAwardByIds: Array<AwardType>;
  searchAward: SearchAwardOutput;
};

export type AwardResponseFindAwardByIdArgs = {
  input: FindAwardInput;
};

export type AwardResponseFindAwardByIdsArgs = {
  input: FindAwardsInput;
};

export type AwardResponseSearchAwardArgs = {
  input: SearchAwardInput;
};

export enum AwardStatus {
  Nominated = 'NOMINATED',
  Won = 'WON',
}

export type AwardType = {
  __typename?: 'AwardType';
  _id: Scalars['Int']['output'];
  awardType?: Maybe<FestivalAwardType>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type BiographyBookmarkResponse = {
  __typename?: 'BiographyBookmarkResponse';
  findBiographyBookmarkById: FindBiographyBookmarksOutput;
  findBiographyBookmarkByIds: Array<BiographyBookmarkType>;
  searchBiographyBookmark: SearchBiographyBookmarkOutput;
};

export type BiographyBookmarkResponseFindBiographyBookmarkByIdArgs = {
  input: FindBiographyBookmarkInput;
};

export type BiographyBookmarkResponseFindBiographyBookmarkByIdsArgs = {
  input: FindBiographyBookmarksInput;
};

export type BiographyBookmarkResponseSearchBiographyBookmarkArgs = {
  input: SearchBiographyBookmarkInput;
};

export type BiographyBookmarkType = {
  __typename?: 'BiographyBookmarkType';
  _id: Scalars['Int']['output'];
  biography: BiographyType;
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type BiographyResponse = {
  __typename?: 'BiographyResponse';
  bookmark: BiographyBookmarkResponse;
  findBiographyById: FindBiographyOutput;
  findByCrewSlug: FindBiographyByCrewSlugOutput;
  richSnippet: BiographyRichsnippetResponse;
  searchBiography: SearchBiographyOutput;
};

export type BiographyResponseFindBiographyByIdArgs = {
  input: FindBiographyInput;
};

export type BiographyResponseFindByCrewSlugArgs = {
  input: FindBiographyByCrewSlugInput;
};

export type BiographyResponseSearchBiographyArgs = {
  input: SearchBiographyInput;
};

export type BiographyRichsnippetResponse = {
  __typename?: 'BiographyRichsnippetResponse';
  findBiographyRichsnippetById: FindBiographyRichsnippetOutput;
  findBiographyRichsnippetByIds: Array<BiographyRichsnippetType>;
  getBiographyVotesDetails: Array<BiographyVotesDetails>;
  searchBiographyRichsnippet: SearchBiographyRichsnippetOutput;
};

export type BiographyRichsnippetResponseFindBiographyRichsnippetByIdArgs = {
  input: FindBiographyRichsnippetInput;
};

export type BiographyRichsnippetResponseFindBiographyRichsnippetByIdsArgs = {
  input: FindBiographyRichsnippetGroupInput;
};

export type BiographyRichsnippetResponseSearchBiographyRichsnippetArgs = {
  input: SearchBiographyRichsnippetInput;
};

export type BiographyRichsnippetType = {
  __typename?: 'BiographyRichsnippetType';
  _id: Scalars['Int']['output'];
  biography: BiographyType;
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  score: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type BiographyScore = {
  __typename?: 'BiographyScore';
  percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  votesCount?: Maybe<Scalars['Int']['output']>;
};

export type BiographyType = {
  __typename?: 'BiographyType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  crew?: Maybe<TemporaryCrewType>;
  festival?: Maybe<FestivalObject>;
  isBookmark: Scalars['Boolean']['output'];
  multimedia?: Maybe<Array<MultimediaType>>;
  richsnippets?: Maybe<RichsnippetType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type BiographyVotesDetails = {
  __typename?: 'BiographyVotesDetails';
  biography?: Maybe<Scalars['Int']['output']>;
  scoreGroup?: Maybe<Array<BiographyScore>>;
  totalVotesCount?: Maybe<Scalars['Int']['output']>;
};

export enum BooleanEnum {
  False = 'FALSE',
  True = 'TRUE',
}

export enum BoxOfficeCurrencyEnum {
  Dollar = 'DOLLAR',
  Euro = 'EURO',
  Pond = 'POND',
  Rial = 'RIAL',
  Toman = 'TOMAN',
}

export type BoxOfficeResponse = {
  __typename?: 'BoxOfficeResponse';
  findBoxOfficeById: FindBoxOfficeOutput;
  findBoxOfficeByIds: Array<BoxOfficeType>;
  searchBoxOffice: SearchBoxOfficeOutput;
};

export type BoxOfficeResponseFindBoxOfficeByIdArgs = {
  input: FindBoxOfficeInput;
};

export type BoxOfficeResponseFindBoxOfficeByIdsArgs = {
  input: FindBoxOfficesInput;
};

export type BoxOfficeResponseSearchBoxOfficeArgs = {
  input: SearchBoxOfficeInput;
};

export type BoxOfficeShort = {
  __typename?: 'BoxOfficeShort';
  budget?: Maybe<Scalars['String']['output']>;
  cumulativeWorldwideGross?: Maybe<Scalars['String']['output']>;
  grossUsa?: Maybe<Scalars['String']['output']>;
  openingWeekendUsa?: Maybe<Scalars['String']['output']>;
};

export enum BoxOfficeSuffixEnum {
  Hezar = 'HEZAR',
  Miliard = 'MILIARD',
  Milion = 'MILION',
}

export type BoxOfficeType = {
  __typename?: 'BoxOfficeType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  currencyType: BoxOfficeCurrencyEnum;
  multimedia?: Maybe<MultimediaType>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  sale: Scalars['String']['output'];
  suffixType: BoxOfficeSuffixEnum;
  title: Scalars['String']['output'];
  type: BoxOfficeTypeEnum;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum BoxOfficeTypeEnum {
  Foreign = 'FOREIGN',
  Iranian = 'IRANIAN',
}

export enum BroadCastTypeEnum {
  CurrentWeek = 'CURRENT_WEEK',
  LastWeek = 'LAST_WEEK',
  NextWeek = 'NEXT_WEEK',
}

export type BroadcastResponse = {
  __typename?: 'BroadcastResponse';
  findBroadcastByCategory: FindBroadcastOutput;
  findBroadcastByCountry: FindBroadcastOutput;
  findBroadcastById: FindBroadcastOutput;
  searchBroadcast: SearchBroadcastOutput;
  weeklyBroadcast: WeeklyBroadcast;
};

export type BroadcastResponseFindBroadcastByCategoryArgs = {
  input: FindBroadcastByCategoryInput;
};

export type BroadcastResponseFindBroadcastByCountryArgs = {
  input: FindBroadcastByCountryInput;
};

export type BroadcastResponseFindBroadcastByIdArgs = {
  input: FindBroadcastInput;
};

export type BroadcastResponseSearchBroadcastArgs = {
  input: SearchBroadcastInput;
};

export type BroadcastResponseWeeklyBroadcastArgs = {
  input: WeeklyBroadCastInput;
};

export type BroadcastType = {
  __typename?: 'BroadcastType';
  _id: Scalars['Int']['output'];
  categories?: Maybe<Array<CategoriesType>>;
  countries?: Maybe<Array<CountriesType>>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type BugReportResponse = {
  __typename?: 'BugReportResponse';
  findBugReportById: FindBugReportOutput;
  findBugReportByIds: Array<BugReportType>;
  searchBugReport: SearchBugReportOutput;
};

export type BugReportResponseFindBugReportByIdArgs = {
  input: FindBugReportInput;
};

export type BugReportResponseFindBugReportByIdsArgs = {
  input: FindBugReportsInput;
};

export type BugReportResponseSearchBugReportArgs = {
  input: SearchBugReportInput;
};

export enum BugReportState {
  Checked = 'CHECKED',
  Draft = 'DRAFT',
}

export enum BugReportTarget {
  Multimedia = 'MULTIMEDIA',
  Paper = 'PAPER',
}

export type BugReportType = {
  __typename?: 'BugReportType';
  _id: Scalars['String']['output'];
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  reasons?: Maybe<Array<Scalars['String']['output']>>;
  state: BugReportState;
  targetId?: Maybe<Scalars['Float']['output']>;
  targetType: BugReportTarget;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type BulkDeleteBiographyRichsnippetInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteCategoriesInput = {
  categoriesIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteCollectionsInput = {
  collectionIds: Array<Scalars['String']['input']>;
};

export type BulkDeleteMainMenuInput = {
  mainMenuIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteMultimediaInput = {
  multimediaIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteMultimediaRichsnippetInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteNetworkBiographyRichsnippetInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type BulkDeletePaperCategoriesInput = {
  categoriesIds: Array<Scalars['Int']['input']>;
};

export type BulkDeletePaperEditorChoicesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeletePaperInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type BulkDeletePaperRichsnippetInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type BulkDeletePaperShowcaseInput = {
  showcaseIds: Array<Scalars['String']['input']>;
};

export type BulkDeletePersonInput = {
  personIds: Array<Scalars['String']['input']>;
};

export type BulkDeletePodcastInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteRedirectsInput = {
  redirectIds: Array<Scalars['String']['input']>;
};

export type BulkDeleteRolesInput = {
  rolesIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteSeoDataInput = {
  seoDataIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteSeoSettingsInput = {
  seoSettingsIds: Array<Scalars['Int']['input']>;
};

export type BulkDeleteShowcaseInput = {
  showcaseIds: Array<Scalars['String']['input']>;
};

export type BulkDeleteTextTrackingInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type BulkDeleteUsersInput = {
  usersIds: Array<Scalars['Int']['input']>;
};

export type CastItem = {
  __typename?: 'CastItem';
  asCharacter?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<CastType>>;
};

export type CastName = {
  __typename?: 'CastName';
  count: Scalars['Int']['output'];
  crew: TemporaryCrewType;
};

export type CastShort = {
  __typename?: 'CastShort';
  items?: Maybe<Array<CastShortItem>>;
  job?: Maybe<Scalars['String']['output']>;
};

export type CastShortItem = {
  __typename?: 'CastShortItem';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum CastType {
  Actor = 'ACTOR',
  Director = 'DIRECTOR',
  Guest = 'GUEST',
  Musician = 'MUSICIAN',
  Producer = 'PRODUCER',
  Puppeteer = 'PUPPETEER',
  Singer = 'SINGER',
  VoiceActor = 'VOICE_ACTOR',
  Writer = 'WRITER',
}

export type CastWidgetInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  role: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type Categories = {
  __typename?: 'Categories';
  findCategoriesByIds: FindCategoriesOutput;
  findCategoryById: FindCategoryOutput;
  findCategoryBySlug: FindCategoryOutput;
  searchCategories: SearchCategoriesOutput;
};

export type CategoriesFindCategoriesByIdsArgs = {
  input: FindCategoriesInput;
};

export type CategoriesFindCategoryByIdArgs = {
  input: FindCategoryInput;
};

export type CategoriesFindCategoryBySlugArgs = {
  input: FindCategoryBySlugInput;
};

export type CategoriesSearchCategoriesArgs = {
  input: SearchCategoriesInput;
};

export type CategoriesType = {
  __typename?: 'CategoriesType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<CategoriesType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CategoryClicked = {
  __typename?: 'CategoryClicked';
  category: CategoriesType;
  clickCount: Scalars['Int']['output'];
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  findPaperCategoriesByIds: Array<PaperCategoryType>;
  findPaperCategoryById: FindPaperCategoryOutput;
  findPaperCategoryBySlug: FindPaperCategoryOutput;
  searchPaperCategory: SearchPaperCategoryOutput;
};

export type CategoryResponseFindPaperCategoriesByIdsArgs = {
  input: FindPaperCategoriesInput;
};

export type CategoryResponseFindPaperCategoryByIdArgs = {
  input: FindPaperCategoryInput;
};

export type CategoryResponseFindPaperCategoryBySlugArgs = {
  input: FindPaperCategoryBySlugInput;
};

export type CategoryResponseSearchPaperCategoryArgs = {
  input: SearchPaperCategoryInput;
};

export enum CategoryResponseType {
  Category = 'CATEGORY',
  SubCategory = 'SUB_CATEGORY',
}

export type CategoryWidgetInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  termId?: InputMaybe<Scalars['Int']['input']>;
  termTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  code: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ClientIdClicked = {
  __typename?: 'ClientIdClicked';
  clickCount: Scalars['Int']['output'];
  clientId: Scalars['String']['output'];
};

export type ClientIdSearch = {
  __typename?: 'ClientIdSearch';
  clientId: Scalars['String']['output'];
  searchCount: Scalars['Int']['output'];
};

export type ClientResult = {
  __typename?: 'ClientResult';
  engine: Scalars['String']['output'];
  engineVersion: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  findCollectionById: FindCollectionOutput;
  findCollectionByIds: Array<CollectionType>;
  findCollectionBySlug: FindCollectionOutput;
  searchCollection: SearchCollectionOutput;
};

export type CollectionFindCollectionByIdArgs = {
  input: FindCollectionInput;
};

export type CollectionFindCollectionByIdsArgs = {
  input: FindCollectionGroupInput;
};

export type CollectionFindCollectionBySlugArgs = {
  input: FindCollectionBySlugInput;
};

export type CollectionSearchCollectionArgs = {
  input: SearchCollectionInput;
};

export type CollectionFilterInputType = {
  ages?: InputMaybe<Array<Scalars['Int']['input']>>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  crew?: InputMaybe<Array<Scalars['Int']['input']>>;
  dubbedTypes?: InputMaybe<Array<Scalars['Int']['input']>>;
  genres?: InputMaybe<Array<Scalars['Int']['input']>>;
  imdb?: InputMaybe<Scalars['Int']['input']>;
  originalNetwork?: InputMaybe<Array<Scalars['Int']['input']>>;
  release?: InputMaybe<Scalars['Int']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CollectionFilterType = {
  __typename?: 'CollectionFilterType';
  ages?: Maybe<Array<Scalars['Int']['output']>>;
  categories?: Maybe<Array<Scalars['Int']['output']>>;
  countries?: Maybe<Array<Scalars['Int']['output']>>;
  crew?: Maybe<Array<Scalars['Int']['output']>>;
  dubbedTypes?: Maybe<Array<Scalars['Int']['output']>>;
  genres?: Maybe<Array<Scalars['Int']['output']>>;
  imdb?: Maybe<Scalars['Int']['output']>;
  originalNetwork?: Maybe<Array<Scalars['Int']['output']>>;
  release?: Maybe<Scalars['Int']['output']>;
  years?: Maybe<Array<Scalars['Int']['output']>>;
};

export type CollectionListWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export enum CollectionName {
  Ages = 'AGES',
  Album = 'ALBUM',
  AlbumList = 'ALBUM_LIST',
  Analytics = 'ANALYTICS',
  Award = 'AWARD',
  Biography = 'BIOGRAPHY',
  BiographyBookmark = 'BIOGRAPHY_BOOKMARK',
  BiographyRichsnippet = 'BIOGRAPHY_RICHSNIPPET',
  BoxOffice = 'BOX_OFFICE',
  Broadcast = 'BROADCAST',
  BugReport = 'BUG_REPORT',
  Categories = 'CATEGORIES',
  Collection = 'COLLECTION',
  Comments = 'COMMENTS',
  Contacts = 'CONTACTS',
  Countries = 'COUNTRIES',
  Crew = 'CREW',
  Devices = 'DEVICES',
  DistributionCompany = 'DISTRIBUTION_COMPANY',
  DownloadAndStreamAnalytics = 'DOWNLOAD_AND_STREAM_ANALYTICS',
  DownloadAndStreamTrends = 'DOWNLOAD_AND_STREAM_TRENDS',
  DubbedType = 'DUBBED_TYPE',
  EditorChoice = 'EDITOR_CHOICE',
  Embed = 'EMBED',
  Episodes = 'EPISODES',
  Festival = 'FESTIVAL',
  FestivalDetail = 'FESTIVAL_DETAIL',
  FilmingLocation = 'FILMING_LOCATION',
  Footprints = 'FOOTPRINTS',
  Genres = 'GENRES',
  Image = 'IMAGE',
  InternalLinks = 'INTERNAL_LINKS',
  Language = 'LANGUAGE',
  Links = 'LINKS',
  MagSeoBox = 'MAG_SEO_BOX',
  MainMenu = 'MAIN_MENU',
  MediaLibrary = 'MEDIA_LIBRARY',
  Menu = 'MENU',
  Multimedia = 'MULTIMEDIA',
  MultimediaBookmark = 'MULTIMEDIA_BOOKMARK',
  MultimediaCommentsFavorite = 'MULTIMEDIA_COMMENTS_FAVORITE',
  MultimediaFavorite = 'MULTIMEDIA_FAVORITE',
  MultimediaPhotos = 'MULTIMEDIA_PHOTOS',
  MultimediaRating = 'MULTIMEDIA_RATING',
  MultimediaRichsnippet = 'MULTIMEDIA_RICHSNIPPET',
  MultimediaTemporaryPhotos = 'MULTIMEDIA_TEMPORARY_PHOTOS',
  MultimediaTrends = 'MULTIMEDIA_TRENDS',
  MultimediaVisitStatistics = 'MULTIMEDIA_VISIT_STATISTICS',
  Music = 'MUSIC',
  MusicEpisode = 'MUSIC_EPISODE',
  MusicLink = 'MUSIC_LINK',
  NetworkBiography = 'NETWORK_BIOGRAPHY',
  NetworkBiographyRichsnippet = 'NETWORK_BIOGRAPHY_RICHSNIPPET',
  News = 'NEWS',
  NewsCategory = 'NEWS_CATEGORY',
  NewsComments = 'NEWS_COMMENTS',
  NewsCommentsFavorite = 'NEWS_COMMENTS_FAVORITE',
  NewsEditorChoice = 'NEWS_EDITOR_CHOICE',
  NewsFavorite = 'NEWS_FAVORITE',
  NewsLink = 'NEWS_LINK',
  NewsRichsnippet = 'NEWS_RICHSNIPPET',
  NewsShowcase = 'NEWS_SHOWCASE',
  NewsTag = 'NEWS_TAG',
  NewsVisitStatistics = 'NEWS_VISIT_STATISTICS',
  NotFoundReport = 'NOT_FOUND_REPORT',
  OriginalNetwork = 'ORIGINAL_NETWORK',
  Paper = 'PAPER',
  PaperCategory = 'PAPER_CATEGORY',
  PaperComments = 'PAPER_COMMENTS',
  PaperCommentsFavorite = 'PAPER_COMMENTS_FAVORITE',
  PaperEditorChoice = 'PAPER_EDITOR_CHOICE',
  PaperFavorite = 'PAPER_FAVORITE',
  PaperLinks = 'PAPER_LINKS',
  PaperRichsnippet = 'PAPER_RICHSNIPPET',
  PaperShowcase = 'PAPER_SHOWCASE',
  PaperTag = 'PAPER_TAG',
  PaperVisitStatistics = 'PAPER_VISIT_STATISTICS',
  PersonsBank = 'PERSONS_BANK',
  Pin = 'PIN',
  Podcasts = 'PODCASTS',
  ProducerCompany = 'PRODUCER_COMPANY',
  Redirect = 'REDIRECT',
  Roles = 'ROLES',
  SearchAnalytics = 'SEARCH_ANALYTICS',
  SeoBox = 'SEO_BOX',
  SeoData = 'SEO_DATA',
  SeoSettings = 'SEO_SETTINGS',
  Showcase = 'SHOWCASE',
  SuggestToWatch = 'SUGGEST_TO_WATCH',
  Survey = 'SURVEY',
  SurveyComments = 'SURVEY_COMMENTS',
  SurveyCommentsFavorite = 'SURVEY_COMMENTS_FAVORITE',
  SurveyVotes = 'SURVEY_VOTES',
  Tags = 'TAGS',
  TagFilter = 'TAG_FILTER',
  TextTracking = 'TEXT_TRACKING',
  TrendLinks = 'TREND_LINKS',
  Users = 'USERS',
  UserImage = 'USER_IMAGE',
  Videos = 'VIDEOS',
  VideoGallery = 'VIDEO_GALLERY',
  WeeklySchedule = 'WEEKLY_SCHEDULE',
  Widgets = 'WIDGETS',
  Years = 'YEARS',
}

export type CollectionType = {
  __typename?: 'CollectionType';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  coverPreview?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<CollectionFilterType>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  isContentApproved?: Maybe<Scalars['Boolean']['output']>;
  mobileThumbnail?: Maybe<Scalars['String']['output']>;
  mobileThumbnailPreview?: Maybe<Scalars['String']['output']>;
  multimedia?: Maybe<Array<MultimediaType>>;
  originalContent?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<CollectionType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailPreview?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CollectionWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  postId?: InputMaybe<Scalars['String']['input']>;
  postTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export type ComingSoonWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type Comments = {
  __typename?: 'Comments';
  favorite: MultimediaCommentsFavoriteResponse;
  findCommentsById: FindCommentsOutput;
  findCommentsByIds: Array<CommentsType>;
  searchComments: SearchCommentsOutput;
};

export type CommentsFindCommentsByIdArgs = {
  input: FindCommentsInput;
};

export type CommentsFindCommentsByIdsArgs = {
  input: FindCommentsGroupInput;
};

export type CommentsSearchCommentsArgs = {
  input: SearchCommentsInput;
};

export type CommentsType = {
  __typename?: 'CommentsType';
  _id: Scalars['Int']['output'];
  approved?: Maybe<BooleanEnum>;
  author: Scalars['String']['output'];
  authorEmail?: Maybe<Scalars['String']['output']>;
  childs?: Maybe<Array<CommentsType>>;
  client: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  favoriteCount?: Maybe<Scalars['Float']['output']>;
  isUserFavorite: Scalars['Boolean']['output'];
  multimedia: MultimediaType;
  parent?: Maybe<CommentsType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type CompanyInputDto = {
  originalNetwork: Scalars['Int']['input'];
  visibility?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CompanyShort = {
  __typename?: 'CompanyShort';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type CompanyType = {
  __typename?: 'CompanyType';
  originalNetwork: OriginalNetworkType;
  visibility?: Maybe<Scalars['Boolean']['output']>;
};

export type ContactType = {
  __typename?: 'ContactType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CoreOutput = {
  __typename?: 'CoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Countries = {
  __typename?: 'Countries';
  findCountriesById: FindCountriesOutput;
  findCountriesByIds: Array<CountriesType>;
  findCountryBySlug: FindCountriesOutput;
  searchCountries: SearchCountriesOutput;
};

export type CountriesFindCountriesByIdArgs = {
  input: FindCountriesInput;
};

export type CountriesFindCountriesByIdsArgs = {
  input: FindCountriesGroupInput;
};

export type CountriesFindCountryBySlugArgs = {
  input: FindCountryBySlugInput;
};

export type CountriesSearchCountriesArgs = {
  input: SearchCountriesInput;
};

export type CountriesType = {
  __typename?: 'CountriesType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<CountriesType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum CountryResponseType {
  Country = 'COUNTRY',
  SubCountry = 'SUB_COUNTRY',
}

export type CountryWidgetInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  termId?: InputMaybe<Scalars['Int']['input']>;
  termTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export type CreateAdminCommentInput = {
  content: Scalars['String']['input'];
  multimedia: Scalars['Float']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  token: Scalars['String']['input'];
};

export type CreateAdminPaperCommentInput = {
  content: Scalars['String']['input'];
  paper: Scalars['Float']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreateAdminSurveyCommentInput = {
  content: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  survey: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CreateAgeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  slug: Scalars['String']['input'];
};

export type CreateAgeOutput = {
  __typename?: 'CreateAgeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateAlbumInput = {
  albumItems: Array<CreateImageAlbumItem>;
  description?: InputMaybe<Scalars['String']['input']>;
  excludedItems?: InputMaybe<Array<ExcludeAlbumImageItem>>;
  multimedia: Scalars['Int']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title: Scalars['String']['input'];
};

export type CreateAlbumOutput = {
  __typename?: 'CreateAlbumOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateAnalyticsInput = {
  clientId: Scalars['String']['input'];
  pageTitle: Scalars['String']['input'];
  pageUrl: Scalars['String']['input'];
  siteId: Scalars['Float']['input'];
  version: Scalars['String']['input'];
};

export type CreateAnalyticsOutput = {
  __typename?: 'CreateAnalyticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateAwardInput = {
  awardType?: InputMaybe<FestivalAwardType>;
  title: Scalars['String']['input'];
};

export type CreateAwardOutput = {
  __typename?: 'CreateAwardOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: AwardType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateBiographyBookmarkInput = {
  biography: Scalars['Float']['input'];
};

export type CreateBiographyBookmarkOutput = {
  __typename?: 'CreateBiographyBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateBiographyInput = {
  crew?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBiographyOutput = {
  __typename?: 'CreateBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateBiographyRichsnippetInput = {
  biography: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type CreateBiographyRichsnippetOutput = {
  __typename?: 'CreateBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateBoxOfficeInput = {
  currencyType: BoxOfficeCurrencyEnum;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  sale: Scalars['String']['input'];
  suffixType: BoxOfficeSuffixEnum;
  title: Scalars['String']['input'];
  type: BoxOfficeTypeEnum;
};

export type CreateBoxOfficeOutput = {
  __typename?: 'CreateBoxOfficeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateBroadcastInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBroadcastOutput = {
  __typename?: 'CreateBroadcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  results: BroadcastType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateBugReportInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  reasons?: InputMaybe<Array<Scalars['String']['input']>>;
  targetId?: InputMaybe<Scalars['Float']['input']>;
  targetType: BugReportTarget;
};

export type CreateBugReportOutput = {
  __typename?: 'CreateBugReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateCollectionInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CollectionFilterInputType>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  isContentApproved?: InputMaybe<Scalars['Boolean']['input']>;
  mobileThumbnail?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Array<Scalars['Int']['input']>>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateCollectionOutput = {
  __typename?: 'CreateCollectionOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateCommentInput = {
  author: Scalars['String']['input'];
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  multimedia: Scalars['Float']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  token: Scalars['String']['input'];
};

export type CreateCommentOutput = {
  __typename?: 'CreateCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateContactsInput = {
  description: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CreateContactsOutput = {
  __typename?: 'CreateContactsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateCountryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
};

export type CreateCountryOutput = {
  __typename?: 'CreateCountryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateCrewInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  biography?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  birthplace?: InputMaybe<Scalars['String']['input']>;
  children?: InputMaybe<Array<Scalars['String']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  deathdate?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  father?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  income?: InputMaybe<Scalars['Int']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isShowcase?: InputMaybe<BooleanEnum>;
  mother?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  otherJobs?: InputMaybe<Array<Scalars['String']['input']>>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  person?: InputMaybe<Scalars['String']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  secondaryName?: InputMaybe<Scalars['String']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  sibling?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  socialMediaAccounts?: InputMaybe<Array<Scalars['String']['input']>>;
  spouses?: InputMaybe<Array<CreatePersonSpouseInputType>>;
  trademarks?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateCrewOutput = {
  __typename?: 'CreateCrewOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateDistributionCompanyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateDistributionCompanyOutput = {
  __typename?: 'CreateDistributionCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateDownloadAndStreamAnalyticsInput = {
  episode?: InputMaybe<Scalars['Int']['input']>;
  linkType: LinkType;
  multimedia: Scalars['Int']['input'];
  referenceUrl?: InputMaybe<Scalars['String']['input']>;
  source: Scalars['String']['input'];
};

export type CreateDownloadAndStreamAnalyticsOutput = {
  __typename?: 'CreateDownloadAndStreamAnalyticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateDubbedTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  slug: Scalars['String']['input'];
};

export type CreateDubbedTypeOutput = {
  __typename?: 'CreateDubbedTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateEditorChoiceInput = {
  multimedia: Scalars['Float']['input'];
};

export type CreateEditorChoiceOutput = {
  __typename?: 'CreateEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateEmbedInput = {
  codeType?: InputMaybe<EmbedCodeType>;
  contentType?: InputMaybe<EmbedContentTypeEnum>;
  downloadOptions?: InputMaybe<DownloadOptionsInputType>;
  embedType?: InputMaybe<EmbedTypeEnum>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  onlinePlayOptions?: InputMaybe<OnlinePlayOptionsInputType>;
  pictureGalleryOptions?: InputMaybe<PictureGalleryOptionsInputType>;
  podcastOptions?: InputMaybe<PodcastOptionsInputType>;
  scoresOptions?: InputMaybe<ScoresOptionsInputType>;
  soundtrackOptions?: InputMaybe<SoundtrackOptionsInputType>;
  trailerOptions?: InputMaybe<TrailerOptionsInputType>;
};

export type CreateEmbedOutput = {
  __typename?: 'CreateEmbedOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: EmbedType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateEpisodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dubbedType?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  hasPage?: InputMaybe<Scalars['Boolean']['input']>;
  links?: InputMaybe<Array<Scalars['Int']['input']>>;
  onlinePlaybackUrl?: InputMaybe<Scalars['String']['input']>;
  ordinal?: InputMaybe<Scalars['Int']['input']>;
  post?: InputMaybe<Scalars['Int']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateEpisodeOutput = {
  __typename?: 'CreateEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: EpisodesType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateFestivalDetailInput = {
  crew?: InputMaybe<Array<FestivalCrewInputType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  festival: Scalars['Float']['input'];
  festivalYear: Scalars['Float']['input'];
  multimedia?: InputMaybe<Array<FestivalMultimediaInputType>>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title: Scalars['String']['input'];
};

export type CreateFestivalDetailOutput = {
  __typename?: 'CreateFestivalDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateFestivalInput = {
  awards?: InputMaybe<Array<Scalars['Float']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  festivalDetails?: InputMaybe<Array<Scalars['Float']['input']>>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateFestivalOutput = {
  __typename?: 'CreateFestivalOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateFilmingLocationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateFilmingLocationOutput = {
  __typename?: 'CreateFilmingLocationOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateGenreInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
};

export type CreateGenreOutput = {
  __typename?: 'CreateGenreOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateHomePageSeoInput = {
  seoData: SeoDataInput;
  seoSettings: SeoSettingsInput;
};

export type CreateHomePageSeoOutput = {
  __typename?: 'CreateHomePageSeoOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateImageAlbumInput = {
  items: Array<CreateImageAlbumItem>;
  multimedia: Scalars['Int']['input'];
};

export type CreateImageAlbumItem = {
  crewItems: Array<CrewItemInput>;
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateImageAlbumOutput = {
  __typename?: 'CreateImageAlbumOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateInternalLinkInput = {
  link: Scalars['String']['input'];
  linkOptions?: InputMaybe<LinkOptionsInputType>;
  paragraph?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type CreateInternalLinkOutput = {
  __typename?: 'CreateInternalLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateLanguageInput = {
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateLanguageOutput = {
  __typename?: 'CreateLanguageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateLinkInputType = {
  dubbedType?: InputMaybe<Scalars['Int']['input']>;
  encoder?: InputMaybe<Scalars['String']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  type: LinkType;
};

export type CreateLinkOutput = {
  __typename?: 'CreateLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: LinksType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMagSeoInput = {
  seoData: SeoDataInput;
  seoSettings: SeoSettingsInput;
};

export type CreateMainMenuInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  link?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateMainMenuOutput = {
  __typename?: 'CreateMainMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateManyEpisodeInput = {
  createEpisodeInput: Array<CreateEpisodeInput>;
};

export type CreateManyEpisodeOutput = {
  __typename?: 'CreateManyEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results: Array<EpisodesType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateManyMusicEpisodeInput = {
  createEpisodeInput: Array<CreateMusicEpisodeInput>;
};

export type CreateManyMusicEpisodeOutput = {
  __typename?: 'CreateManyMusicEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results: Array<MusicEpisodeType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMenuInput = {
  items?: InputMaybe<Array<MenuItemInputType>>;
};

export type CreateMenuOutput = {
  __typename?: 'CreateMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMultimediaBookmarkInput = {
  multimedia: Scalars['Float']['input'];
};

export type CreateMultimediaBookmarkOutput = {
  __typename?: 'CreateMultimediaBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMultimediaCommentsFavoriteInput = {
  comment: Scalars['Float']['input'];
};

export type CreateMultimediaFavoriteInput = {
  multimedia: Scalars['Float']['input'];
};

export type CreateMultimediaFavoriteOutput = {
  __typename?: 'CreateMultimediaFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMultimediaInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  boxOffice?: InputMaybe<MultimediaCUrrencyInputType>;
  broadcastStatus?: InputMaybe<MediaBroadcastStatusType>;
  budget?: InputMaybe<MultimediaCUrrencyInputType>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  crew?: InputMaybe<Array<MultimediaCrewInputType>>;
  distributionCompanies?: InputMaybe<Array<Scalars['Int']['input']>>;
  dubbedType?: InputMaybe<Scalars['Int']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Array<Scalars['Int']['input']>>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  filmingLocations?: InputMaybe<Array<Scalars['Int']['input']>>;
  genres?: InputMaybe<Array<Scalars['Int']['input']>>;
  hasTimestamps?: InputMaybe<Scalars['Boolean']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  imdbScore?: InputMaybe<Scalars['Float']['input']>;
  imdbVotes?: InputMaybe<Scalars['Float']['input']>;
  isContentApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isDownloadAndStreamAuth?: InputMaybe<Scalars['Boolean']['input']>;
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isSuggestion?: InputMaybe<Scalars['Boolean']['input']>;
  languages?: InputMaybe<Array<Scalars['Int']['input']>>;
  metacriticScore?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalNetwork?: InputMaybe<Array<Scalars['Int']['input']>>;
  podcast?: InputMaybe<Scalars['String']['input']>;
  producerCompanies?: InputMaybe<Array<Scalars['Int']['input']>>;
  publishDate?: InputMaybe<Scalars['String']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  restartBroadcastingDate?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  rottenTomatoesScore?: InputMaybe<Scalars['Float']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  showcase?: InputMaybe<CreateShowcaseInMultimedia>;
  status: MultimediaStatusEnum;
  stopBroadcastingDate?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateMultimediaRichsnippetInput = {
  multimedia: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type CreateMultimediaRichsnippetOutput = {
  __typename?: 'CreateMultimediaRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMusicEpisodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Array<Scalars['Int']['input']>>;
  music?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title: Scalars['String']['input'];
  type?: InputMaybe<MusicEpisodeTypeEnum>;
};

export type CreateMusicEpisodeOutput = {
  __typename?: 'CreateMusicEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: MusicEpisodeType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMusicInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  isContentApproved?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  musicEpisodes?: InputMaybe<Array<Scalars['Int']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  persons?: InputMaybe<Array<Scalars['Int']['input']>>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  status: MusicStatusEnum;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMusicLinkInput = {
  encoder?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  musicEpisode?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  type: MusicLinkTypeEnum;
};

export type CreateMusicLinkOutput = {
  __typename?: 'CreateMusicLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: MusicLinkType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMusicOutput = {
  __typename?: 'CreateMusicOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateNetworkBiographyInput = {
  originalNetwork?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateNetworkBiographyOutput = {
  __typename?: 'CreateNetworkBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateNetworkBiographyRichsnippetInput = {
  biography: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type CreateNetworkBiographyRichsnippetOutput = {
  __typename?: 'CreateNetworkBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateNotFoundReportInput = {
  path: Scalars['String']['input'];
};

export type CreateNotFoundReportOutput = {
  __typename?: 'CreateNotFoundReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateOrUpdateVotingInput = {
  crewVotes: Array<SurveyCrewVoteInputType>;
  survey: Scalars['String']['input'];
};

export type CreateOrUpdateVotingOutput = {
  __typename?: 'CreateOrUpdateVotingOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateOriginalNetworkInput = {
  CEOs?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  establishedYear?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  headOffice?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  socialMediaAccounts?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOriginalNetworkOutput = {
  __typename?: 'CreateOriginalNetworkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  type: PaperContentType;
};

export type CreatePaperCategoryOutput = {
  __typename?: 'CreatePaperCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperCommentInput = {
  author: Scalars['String']['input'];
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  paper: Scalars['Float']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperCommentOutput = {
  __typename?: 'CreatePaperCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperCommentsFavoriteInput = {
  comment: Scalars['Float']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperCommentsFavoriteOutput = {
  __typename?: 'CreatePaperCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperEditorChoiceInput = {
  paper: Scalars['Float']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperEditorChoiceOutput = {
  __typename?: 'CreatePaperEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperFavoriteInput = {
  paper: Scalars['Float']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperFavoriteOutput = {
  __typename?: 'CreatePaperFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  companies?: InputMaybe<Array<CompanyInputDto>>;
  content: Scalars['String']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isWide?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia?: InputMaybe<Array<PaperMultimediaInputDto>>;
  name: Scalars['String']['input'];
  paperType: PaperContentType;
  persons?: InputMaybe<Array<PersonInputDto>>;
  publishDate?: InputMaybe<Scalars['String']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  showcase?: InputMaybe<CreateShowcaseInPaper>;
  status: PaperStatus;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePaperLinkInput = {
  links: Array<Scalars['String']['input']>;
  paper: Scalars['Float']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperLinkOutput = {
  __typename?: 'CreatePaperLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperOutput = {
  __typename?: 'CreatePaperOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperRichsnippetInput = {
  paper: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperRichsnippetOutput = {
  __typename?: 'CreatePaperRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperShowcaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  paper: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperShowcaseOutput = {
  __typename?: 'CreatePaperShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaperVisitStatisticsInput = {
  paper: Scalars['Float']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreatePaperVisitStatisticsOutput = {
  __typename?: 'CreatePaperVisitStatisticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePersonInput = {
  approved?: Scalars['Boolean']['input'];
  biography?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  birthplace?: InputMaybe<Scalars['String']['input']>;
  children?: InputMaybe<Array<Scalars['String']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  deathdate?: InputMaybe<Scalars['String']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  father?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  mother?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  otherJobs?: InputMaybe<Array<Scalars['String']['input']>>;
  secondaryName?: InputMaybe<Scalars['String']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  sibling?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  socialMediaAccounts?: InputMaybe<Array<Scalars['String']['input']>>;
  spouses?: InputMaybe<Array<CreatePersonSpouseInputType>>;
};

export type CreatePersonOutput = {
  __typename?: 'CreatePersonOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: PersonsBankType;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePersonSpouseInputType = {
  divorceDate?: InputMaybe<Scalars['String']['input']>;
  marriageDate?: InputMaybe<Scalars['String']['input']>;
  spouse: Scalars['String']['input'];
};

export type CreatePersonSpouseType = {
  __typename?: 'CreatePersonSpouseType';
  divorceDate?: Maybe<Scalars['String']['output']>;
  marriageDate?: Maybe<Scalars['String']['output']>;
  spouse: Scalars['String']['output'];
};

export type CreatePinInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromDate: Scalars['String']['input'];
  isHomePage?: InputMaybe<Scalars['Boolean']['input']>;
  paper: Scalars['Int']['input'];
  toDate: Scalars['String']['input'];
};

export type CreatePinOutput = {
  __typename?: 'CreatePinOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePodcastInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  status: PodcastStatusType;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePodcastOutput = {
  __typename?: 'CreatePodcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateProducerCompanyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProducerCompanyOutput = {
  __typename?: 'CreateProducerCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateRedirectInput = {
  newPath: Scalars['String']['input'];
  oldPath: Scalars['String']['input'];
  type: RedirectType;
};

export type CreateRedirectOutput = {
  __typename?: 'CreateRedirectOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateRolesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  persons?: InputMaybe<Array<Scalars['Int']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRolesOutput = {
  __typename?: 'CreateRolesOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSearchAnalyticsInput = {
  multimedia?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type CreateSearchAnalyticsOutput = {
  __typename?: 'CreateSearchAnalyticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSeoBoxInput = {
  description?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSeoBoxOutput = {
  __typename?: 'CreateSeoBoxOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSeoDataInput = {
  head: Scalars['String']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  type: SeoCollectionName;
};

export type CreateSeoDataOutput = {
  __typename?: 'CreateSeoDataOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSeoSettingsInput = {
  general?: InputMaybe<SeoGeneralSettingsInputType>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  type: SeoCollectionName;
};

export type CreateSeoSettingsOutput = {
  __typename?: 'CreateSeoSettingsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateShowcaseInMultimedia = {
  createUser?: InputMaybe<UserOutputInputType>;
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  updateUser?: InputMaybe<UserOutputInputType>;
};

export type CreateShowcaseInPaper = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type CreateShowcaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  multimedia: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateShowcaseOutput = {
  __typename?: 'CreateShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSuggestToWatchInput = {
  multimedia: Scalars['Int']['input'];
};

export type CreateSuggestToWatchOutput = {
  __typename?: 'CreateSuggestToWatchOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSurveyCommentInput = {
  author: Scalars['String']['input'];
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  survey: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CreateSurveyCommentOutput = {
  __typename?: 'CreateSurveyCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSurveyCommentsFavoriteInput = {
  comment: Scalars['Float']['input'];
};

export type CreateSurveyCommentsFavoriteOutput = {
  __typename?: 'CreateSurveyCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSurveyInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  finishDate: Scalars['String']['input'];
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia: Scalars['Int']['input'];
  selectedCrews: Array<SurveyCrewInput>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSurveyOutput = {
  __typename?: 'CreateSurveyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateTagFilterInput = {
  filter?: InputMaybe<TagFilterItemsInputType>;
  tag?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateTagFilterOutput = {
  __typename?: 'CreateTagFilterOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TagFilterItemsInputType>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<TagStatusEnum>;
};

export type CreateTagOutput = {
  __typename?: 'CreateTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateTextTrackingInput = {
  addedWordCount?: InputMaybe<Scalars['Int']['input']>;
  currentText?: InputMaybe<Scalars['String']['input']>;
  itemId: Scalars['Int']['input'];
  previousText?: InputMaybe<Scalars['String']['input']>;
  previousTotalWordCount?: InputMaybe<Scalars['Int']['input']>;
  removedWordCount?: InputMaybe<Scalars['Int']['input']>;
  totalWordCount?: InputMaybe<Scalars['Int']['input']>;
  type: TextTrackingCollectionName;
  unchangedWordCount?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateTextTrackingOutput = {
  __typename?: 'CreateTextTrackingOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateTrendLinksInput = {
  link: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateTrendLinksOutput = {
  __typename?: 'CreateTrendLinksOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateUserByCeo = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isVerified: Scalars['Boolean']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateVideoGalleyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  multimedia: Scalars['Int']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<VideoItem>>;
};

export type CreateVideoGalleyOutput = {
  __typename?: 'CreateVideoGalleyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateVideoInput = {
  crewItems?: InputMaybe<Array<CrewItemInput>>;
  duration?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  multimedia: Scalars['Int']['input'];
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: VideoType;
  url: Scalars['String']['input'];
};

export type CreateVideoOutput = {
  __typename?: 'CreateVideoOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateYearInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug: Scalars['String']['input'];
};

export type CreateYearOutput = {
  __typename?: 'CreateYearOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CrewData = {
  __typename?: 'CrewData';
  cover?: Maybe<Scalars['String']['output']>;
  crew?: Maybe<Array<TemporaryCrewType>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export enum CrewEnum {
  Director = 'DIRECTOR',
  Guest = 'GUEST',
  Music = 'MUSIC',
  Producer = 'PRODUCER',
  Puppeteer = 'PUPPETEER',
  Singer = 'SINGER',
  Star = 'STAR',
  VoiceActor = 'VOICE_ACTOR',
  Writer = 'WRITER',
}

export type CrewItemInput = {
  crew: Scalars['Int']['input'];
  type: Array<CastType>;
};

export type CrewItemInputType = {
  __typename?: 'CrewItemInputType';
  crew: Scalars['Int']['output'];
  type: Array<CastType>;
};

export type CrewItemType = {
  __typename?: 'CrewItemType';
  crew: TemporaryCrewType;
  type: Array<CastType>;
};

export type CrewOutputType = {
  __typename?: 'CrewOutputType';
  _id?: Maybe<Scalars['Int']['output']>;
  album?: Maybe<Array<AlbumType>>;
  approved?: Maybe<Scalars['Boolean']['output']>;
  awards?: Maybe<Array<FestivalDetailType>>;
  biography?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['String']['output']>;
  birthplace?: Maybe<Scalars['String']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<PersonsBankType>>;
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deathdate?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  descriptionWordCount?: Maybe<Scalars['Float']['output']>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  father?: Maybe<PersonsBankType>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  imdbId?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  isShowcase?: Maybe<BooleanEnum>;
  maritalStatus?: Maybe<MaritalStatusType>;
  mother?: Maybe<PersonsBankType>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Array<Scalars['String']['output']>>;
  nickname?: Maybe<Scalars['String']['output']>;
  originalDescription?: Maybe<Scalars['String']['output']>;
  otherJobs?: Maybe<Array<Scalars['String']['output']>>;
  parent?: Maybe<Scalars['Int']['output']>;
  personId?: Maybe<Scalars['String']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  previousDescription?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<CrewEnum>>;
  secondaryName?: Maybe<Scalars['String']['output']>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  sibling?: Maybe<Array<PersonsBankType>>;
  slug?: Maybe<Scalars['String']['output']>;
  socialMediaAccounts?: Maybe<Array<Scalars['String']['output']>>;
  spouses?: Maybe<Array<PersonSpouseType>>;
  type?: Maybe<CrewEnum>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<VideoObjectType>>;
};

export type CrewResponse = {
  __typename?: 'CrewResponse';
  biography: BiographyResponse;
  findCrewById: FindCrewOutput;
  findCrewByIds: Array<TemporaryCrewType>;
  findCrewBySlug: FindCrewOutput;
  findOrCreateCrew: FindOrCreateCrewOutput;
  searchCrew: SearchCrewOutput;
};

export type CrewResponseFindCrewByIdArgs = {
  input: FindCrewInput;
};

export type CrewResponseFindCrewByIdsArgs = {
  input: FindCrewGroupInput;
};

export type CrewResponseFindCrewBySlugArgs = {
  input: FindCrewBySlugInput;
};

export type CrewResponseFindOrCreateCrewArgs = {
  input: FindOrCreateCrewInput;
};

export type CrewResponseSearchCrewArgs = {
  input: SearchCrewInput;
};

export enum CrewSortType {
  ByMedia = 'BY_MEDIA',
  Newest = 'NEWEST',
}

export enum CurrencyEnum {
  Dollar = 'DOLLAR',
  Euro = 'EURO',
  Pond = 'POND',
  Rial = 'RIAL',
  Toman = 'TOMAN',
}

export enum DaysEnum {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type DeleteAgeInput = {
  ageId: Scalars['Int']['input'];
};

export type DeleteAgeOutput = {
  __typename?: 'DeleteAgeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteAgesInput = {
  agesIds: Array<Scalars['Int']['input']>;
};

export type DeleteAlbumInput = {
  imageId: Scalars['String']['input'];
};

export type DeleteAlbumListInput = {
  albumId: Scalars['String']['input'];
};

export type DeleteAlbumOutput = {
  __typename?: 'DeleteAlbumOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteAlbumsInput = {
  imageIds: Array<Scalars['String']['input']>;
};

export type DeleteAlbumsListInput = {
  albumIds: Array<Scalars['String']['input']>;
};

export type DeleteAwardInput = {
  id: Scalars['Int']['input'];
};

export type DeleteAwardOutput = {
  __typename?: 'DeleteAwardOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteAwardsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteBiographyBookmarkInput = {
  id: Scalars['Int']['input'];
};

export type DeleteBiographyBookmarkOutput = {
  __typename?: 'DeleteBiographyBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteBiographyBookmarksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteBiographyInput = {
  id: Scalars['Int']['input'];
};

export type DeleteBiographyOutput = {
  __typename?: 'DeleteBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteBiographyRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type DeleteBiographyRichsnippetOutput = {
  __typename?: 'DeleteBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteBiographysInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteBoxOfficeInput = {
  id: Scalars['Int']['input'];
};

export type DeleteBoxOfficeOutput = {
  __typename?: 'DeleteBoxOfficeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteBoxOfficesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteBroadcastInput = {
  broadcastId: Scalars['Int']['input'];
};

export type DeleteBroadcastOutput = {
  __typename?: 'DeleteBroadcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteBroadcastsInput = {
  broadcastIds: Array<Scalars['Int']['input']>;
};

export type DeleteBugReportInput = {
  id: Scalars['String']['input'];
};

export type DeleteBugReportOutput = {
  __typename?: 'DeleteBugReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteBugReportsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteBulkEditorChoicesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteBulkSuggestToWatchInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteCategoryInput = {
  categoryId: Scalars['Int']['input'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCollcetionOutput = {
  __typename?: 'DeleteCollcetionOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCollectionInput = {
  collectionId: Scalars['String']['input'];
};

export type DeleteCommentInput = {
  commentId: Scalars['Int']['input'];
};

export type DeleteCommentOutput = {
  __typename?: 'DeleteCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCommentsInput = {
  commentIds: Array<Scalars['Int']['input']>;
};

export type DeleteContactsInput = {
  contactId: Scalars['Int']['input'];
};

export type DeleteContactsOutput = {
  __typename?: 'DeleteContactsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCountriesInput = {
  countriesIds: Array<Scalars['Int']['input']>;
};

export type DeleteCountryInput = {
  countryId: Scalars['Int']['input'];
};

export type DeleteCountryOutput = {
  __typename?: 'DeleteCountryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCrewInput = {
  crewId: Scalars['Int']['input'];
};

export type DeleteCrewOutput = {
  __typename?: 'DeleteCrewOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCrewsInput = {
  crewIds: Array<Scalars['Int']['input']>;
};

export type DeleteDistributionCompanyInput = {
  id: Scalars['Int']['input'];
};

export type DeleteDistributionCompanyOutput = {
  __typename?: 'DeleteDistributionCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteDistributionCompanysInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteDubbedTypeInput = {
  dubbedTypeId: Scalars['Int']['input'];
};

export type DeleteDubbedTypeOutput = {
  __typename?: 'DeleteDubbedTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteDubbedTypesInput = {
  dubbedTypeIds: Array<Scalars['Int']['input']>;
};

export type DeleteEditorChoiceInput = {
  id: Scalars['String']['input'];
};

export type DeleteEditorChoiceOutput = {
  __typename?: 'DeleteEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteEmbedInput = {
  embedId: Scalars['String']['input'];
};

export type DeleteEmbedOutput = {
  __typename?: 'DeleteEmbedOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteEmbedsInput = {
  embedIds: Array<Scalars['String']['input']>;
};

export type DeleteEpisodeInput = {
  episodeId: Scalars['Int']['input'];
};

export type DeleteEpisodeOutput = {
  __typename?: 'DeleteEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteEpisodesInput = {
  episodesIds: Array<Scalars['Int']['input']>;
};

export type DeleteFestivalDetailInput = {
  id: Scalars['Int']['input'];
};

export type DeleteFestivalDetailOutput = {
  __typename?: 'DeleteFestivalDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteFestivalDetailsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteFestivalInput = {
  id: Scalars['Int']['input'];
};

export type DeleteFestivalOutput = {
  __typename?: 'DeleteFestivalOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteFestivalsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteFilmingLocationInput = {
  id: Scalars['Int']['input'];
};

export type DeleteFilmingLocationOutput = {
  __typename?: 'DeleteFilmingLocationOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteGalleriesInput = {
  galleryIds: Array<Scalars['String']['input']>;
};

export type DeleteGalleryInput = {
  galleryId: Scalars['String']['input'];
};

export type DeleteGalleryOutput = {
  __typename?: 'DeleteGalleryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteGenreInput = {
  genreId: Scalars['Int']['input'];
};

export type DeleteGenreOutput = {
  __typename?: 'DeleteGenreOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteGenresInput = {
  genresIds: Array<Scalars['Int']['input']>;
};

export type DeleteHomePageSeoOutput = {
  __typename?: 'DeleteHomePageSeoOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteImagesInput = {
  mediaLibraryIds: Array<Scalars['Int']['input']>;
};

export type DeleteImagesOutput = {
  __typename?: 'DeleteImagesOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteInternalLinkInput = {
  id: Scalars['String']['input'];
};

export type DeleteInternalLinkOutput = {
  __typename?: 'DeleteInternalLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteInternalLinksInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteLanguageInput = {
  id: Scalars['Int']['input'];
};

export type DeleteLanguageOutput = {
  __typename?: 'DeleteLanguageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteLanguagesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteLinkInput = {
  linkId: Scalars['Int']['input'];
};

export type DeleteLinkOutput = {
  __typename?: 'DeleteLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteLinksInput = {
  linkIds: Array<Scalars['Int']['input']>;
};

export type DeleteMainMenuInput = {
  mainMenuId: Scalars['Int']['input'];
};

export type DeleteMainMenuOutput = {
  __typename?: 'DeleteMainMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMultimediaBookmarkInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMultimediaBookmarkOutput = {
  __typename?: 'DeleteMultimediaBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMultimediaBookmarksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteMultimediaCommentsFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMultimediaCommentsFavoriteOutput = {
  __typename?: 'DeleteMultimediaCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMultimediaCommentsFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteMultimediaFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMultimediaFavoriteOutput = {
  __typename?: 'DeleteMultimediaFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMultimediaFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteMultimediaInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMultimediaRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type DeleteMusicEpisodeInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMusicEpisodeOutput = {
  __typename?: 'DeleteMusicEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMusicEpisodesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteMusicInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMusicLinkInput = {
  id: Scalars['Int']['input'];
};

export type DeleteMusicLinkOutput = {
  __typename?: 'DeleteMusicLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMusicLinksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteMusicOutput = {
  __typename?: 'DeleteMusicOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMusicsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteNetworkBiographyInput = {
  id: Scalars['Int']['input'];
};

export type DeleteNetworkBiographyOutput = {
  __typename?: 'DeleteNetworkBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteNetworkBiographyRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type DeleteNetworkBiographyRichsnippetOutput = {
  __typename?: 'DeleteNetworkBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteNetworkBiographysInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteNotFoundReportInput = {
  reportId: Scalars['Int']['input'];
};

export type DeleteNotFoundReportOutput = {
  __typename?: 'DeleteNotFoundReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteNotFoundReportsInput = {
  reportIds: Array<Scalars['Int']['input']>;
};

export type DeleteOneBiographyBookmarkInput = {
  biographyId: Scalars['Int']['input'];
};

export type DeleteOneMultimediaBookmarkInput = {
  multimediaId: Scalars['Int']['input'];
};

export type DeleteOneMultimediaFavoriteInput = {
  multimediaId: Scalars['Int']['input'];
};

export type DeleteOnePaperFavoriteInput = {
  paperId: Scalars['Int']['input'];
};

export type DeleteOriginalNetworkInput = {
  id: Scalars['Int']['input'];
};

export type DeleteOriginalNetworkOutput = {
  __typename?: 'DeleteOriginalNetworkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteOriginalNetworksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeletePaperCategoryInput = {
  categoryId: Scalars['Int']['input'];
};

export type DeletePaperCategoryOutput = {
  __typename?: 'DeletePaperCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperCommentInput = {
  commentId: Scalars['Int']['input'];
};

export type DeletePaperCommentOutput = {
  __typename?: 'DeletePaperCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperCommentsFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type DeletePaperCommentsFavoriteOutput = {
  __typename?: 'DeletePaperCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperCommentsFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeletePaperCommentsInput = {
  commentIds: Array<Scalars['Int']['input']>;
};

export type DeletePaperEditorChoiceInput = {
  id: Scalars['String']['input'];
};

export type DeletePaperEditorChoiceOutput = {
  __typename?: 'DeletePaperEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type DeletePaperFavoriteOutput = {
  __typename?: 'DeletePaperFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeletePaperInput = {
  id: Scalars['Int']['input'];
};

export type DeletePaperLinkInput = {
  id: Scalars['Int']['input'];
};

export type DeletePaperLinkOutput = {
  __typename?: 'DeletePaperLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperLinksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeletePaperOutput = {
  __typename?: 'DeletePaperOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type DeletePaperRichsnippetOutput = {
  __typename?: 'DeletePaperRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperShowcaseInput = {
  showcaseId: Scalars['String']['input'];
};

export type DeletePaperShowcaseOutput = {
  __typename?: 'DeletePaperShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePaperVisitStatisticsInput = {
  id: Scalars['String']['input'];
};

export type DeletePaperVisitStatisticsOutput = {
  __typename?: 'DeletePaperVisitStatisticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePersonInput = {
  personId: Scalars['String']['input'];
};

export type DeletePersonOutput = {
  __typename?: 'DeletePersonOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePinInput = {
  pinId: Scalars['Int']['input'];
};

export type DeletePinOutput = {
  __typename?: 'DeletePinOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePinsInput = {
  pinIds: Array<Scalars['Int']['input']>;
};

export type DeletePodcastInput = {
  id: Scalars['String']['input'];
};

export type DeletePodcastOutput = {
  __typename?: 'DeletePodcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteProducerCompanyInput = {
  id: Scalars['Int']['input'];
};

export type DeleteProducerCompanyOutput = {
  __typename?: 'DeleteProducerCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteProducerCompanysInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteRedirectInput = {
  redirectId: Scalars['String']['input'];
};

export type DeleteRedirectOutput = {
  __typename?: 'DeleteRedirectOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteRichsnippetOutput = {
  __typename?: 'DeleteRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteRolesInput = {
  rolesId: Scalars['Int']['input'];
};

export type DeleteRolesOutput = {
  __typename?: 'DeleteRolesOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSeoDataInput = {
  seoDataId: Scalars['Int']['input'];
};

export type DeleteSeoDataOutput = {
  __typename?: 'DeleteSeoDataOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSeoSettingsInput = {
  seoSettingsId: Scalars['Int']['input'];
};

export type DeleteSeoSettingsOutput = {
  __typename?: 'DeleteSeoSettingsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteShowcaseInput = {
  showcaseId: Scalars['String']['input'];
};

export type DeleteShowcaseOutput = {
  __typename?: 'DeleteShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSuggestToWatchInput = {
  id: Scalars['String']['input'];
};

export type DeleteSuggestToWatchOutput = {
  __typename?: 'DeleteSuggestToWatchOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSurveyCommentInput = {
  commentId: Scalars['Int']['input'];
};

export type DeleteSurveyCommentOutput = {
  __typename?: 'DeleteSurveyCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSurveyCommentsFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type DeleteSurveyCommentsFavoriteOutput = {
  __typename?: 'DeleteSurveyCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSurveyCommentsFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteSurveyCommentsInput = {
  commentIds: Array<Scalars['Int']['input']>;
};

export type DeleteSurveyInput = {
  id: Scalars['String']['input'];
};

export type DeleteSurveyOutput = {
  __typename?: 'DeleteSurveyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteSurveysInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteTagFilterInput = {
  id: Scalars['Int']['input'];
};

export type DeleteTagFilterOutput = {
  __typename?: 'DeleteTagFilterOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteTagFiltersInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type DeleteTagInput = {
  tagId: Scalars['Int']['input'];
};

export type DeleteTagOutput = {
  __typename?: 'DeleteTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteTagsInput = {
  tagIds: Array<Scalars['Int']['input']>;
};

export type DeleteTextTrackingInput = {
  id: Scalars['Int']['input'];
};

export type DeleteTextTrackingOutput = {
  __typename?: 'DeleteTextTrackingOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteTrendLinksInput = {
  trendLinkId: Scalars['Int']['input'];
};

export type DeleteTrendLinksOutput = {
  __typename?: 'DeleteTrendLinksOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteUserImageInput = {
  userId: Scalars['Int']['input'];
};

export type DeleteUserImagesOutput = {
  __typename?: 'DeleteUserImagesOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteUserInput = {
  userId: Scalars['Int']['input'];
};

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteVideoInput = {
  videoId: Scalars['Int']['input'];
};

export type DeleteVideoOutput = {
  __typename?: 'DeleteVideoOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteVideosInput = {
  videoIds: Array<Scalars['Int']['input']>;
};

export type DeleteYearInput = {
  yearId: Scalars['Int']['input'];
};

export type DeleteYearOutput = {
  __typename?: 'DeleteYearOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteYearsInput = {
  yearsIds: Array<Scalars['Int']['input']>;
};

export type DeviceMutation = {
  __typename?: 'DeviceMutation';
  createDevice: CoreOutput;
  removeDevice: CoreOutput;
  updateDevice: CoreOutput;
};

export type DeviceMutationRemoveDeviceArgs = {
  id: Scalars['String']['input'];
};

export type DeviceMutationUpdateDeviceArgs = {
  updateDeviceInput: UpdateDeviceInput;
};

export type DeviceQuery = {
  __typename?: 'DeviceQuery';
  findDevice: FindDeviceOutput;
  searchDevices: SearchDeviceOutput;
};

export type DeviceQuerySearchDevicesArgs = {
  input: SearchDeviceInput;
};

export type DeviceResult = {
  __typename?: 'DeviceResult';
  brand: Scalars['String']['output'];
  model: Scalars['String']['output'];
  type: MatomoDeviceType;
};

export type DeviceType = {
  __typename?: 'DeviceType';
  _id: Scalars['String']['output'];
  client?: Maybe<ClientResult>;
  clientId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  device?: Maybe<DeviceResult>;
  os?: Maybe<OsResult>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userAgent: Scalars['String']['output'];
};

export type DistributionCompanyResponse = {
  __typename?: 'DistributionCompanyResponse';
  findDistributionCompanyById: FindDistributionCompanyOutput;
  findDistributionCompanyByIds: Array<DistributionCompanyType>;
  searchDistributionCompany: SearchDistributionCompanyOutput;
};

export type DistributionCompanyResponseFindDistributionCompanyByIdArgs = {
  input: FindDistributionCompanyInput;
};

export type DistributionCompanyResponseFindDistributionCompanyByIdsArgs = {
  input: FindDistributionCompaniesInput;
};

export type DistributionCompanyResponseSearchDistributionCompanyArgs = {
  input: SearchDistributionCompanyInput;
};

export type DistributionCompanyType = {
  __typename?: 'DistributionCompanyType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type DownloadAndStreamAnalytics = {
  __typename?: 'DownloadAndStreamAnalytics';
  findByMultimediaWithClientIdNumbers: FindByMultimediaWithClientIdNumbersOutput;
  findByMultimediaWithLinkTypeNumbers: FindByMultimediaWithLinkTypeNumbersOutput;
  findNumberOfClickLinkTypesOnMultimedia: FindNumberOfClickLinkTypesOnMultimediaOutput;
  findNumberOfDownloadsByClientId: FindNumberOfDownloadsByClientOutput;
  getTrendsDownload: SearchTrendsDownloadOutput;
  search: SearchDownloadAndStreamAnalyticsOutput;
  searchClickNumbersByClient: SearchNumberOfClickByClientsOutput;
  searchClickNumbersByLinkType: SearchNumberOfClickByLinkTypeOutput;
  searchClickNumbersOnCategory: SearchNumberOfClickOnCategoryOutput;
  searchClickNumbersOnMultimedia: SearchNumberOfClickOnMultimediaOutput;
  searchClickNumbersOnSubCategory: SearchNumberOfClickOnCategoryOutput;
  searchMostDownloaded: SearchTheMostDownloadsByLinkTypeOutput;
};

export type DownloadAndStreamAnalyticsFindByMultimediaWithClientIdNumbersArgs = {
  input: FindByMultimediaWithClientIdNumbersInput;
};

export type DownloadAndStreamAnalyticsFindByMultimediaWithLinkTypeNumbersArgs = {
  input: FindByMultimediaWithLinkTypeNumbersInput;
};

export type DownloadAndStreamAnalyticsFindNumberOfClickLinkTypesOnMultimediaArgs = {
  input: FindNumberOfClickLinkTypesOnMultimediaInput;
};

export type DownloadAndStreamAnalyticsFindNumberOfDownloadsByClientIdArgs = {
  input: FindNumberOfDownloadsByClientInput;
};

export type DownloadAndStreamAnalyticsGetTrendsDownloadArgs = {
  input: SearchTrendsDownloadInput;
};

export type DownloadAndStreamAnalyticsSearchArgs = {
  input: SearchDownloadAndStreamAnalyticsInput;
};

export type DownloadAndStreamAnalyticsSearchClickNumbersByClientArgs = {
  input: SearchNumberOfClickByClientsInput;
};

export type DownloadAndStreamAnalyticsSearchClickNumbersByLinkTypeArgs = {
  input: SearchNumberOfClickByLinkTypeInput;
};

export type DownloadAndStreamAnalyticsSearchClickNumbersOnCategoryArgs = {
  input: SearchNumberOfClickOnCategoryInput;
};

export type DownloadAndStreamAnalyticsSearchClickNumbersOnMultimediaArgs = {
  input: SearchNumberOfClickOnMultimediaInput;
};

export type DownloadAndStreamAnalyticsSearchClickNumbersOnSubCategoryArgs = {
  input: SearchNumberOfClickOnCategoryInput;
};

export type DownloadAndStreamAnalyticsSearchMostDownloadedArgs = {
  input: SearchTheMostDownloadsByLinkTypeInput;
};

export type DownloadAndStreamAnalyticsType = {
  __typename?: 'DownloadAndStreamAnalyticsType';
  _id: Scalars['String']['output'];
  clientId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  episode?: Maybe<EpisodesType>;
  linkType: LinkType;
  multimedia: MultimediaType;
  multimediaType: MultimediaTypeEnum;
  referenceUrl?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type DownloadAndStreamTrendsOutput = {
  __typename?: 'DownloadAndStreamTrendsOutput';
  _id: Scalars['String']['output'];
  changesPercent?: Maybe<Scalars['Int']['output']>;
  currentCount?: Maybe<Scalars['Int']['output']>;
  multimediaId?: Maybe<Scalars['Int']['output']>;
  pastCount?: Maybe<Scalars['Int']['output']>;
};

export type DownloadAndStreamTrendsResponse = {
  __typename?: 'DownloadAndStreamTrendsResponse';
  downloadAndStreamTrendsSearch: SearchDownloadAndStreamTrendsOutput;
};

export type DownloadAndStreamTrendsResponseDownloadAndStreamTrendsSearchArgs = {
  input: SearchDownloadAndStreamTrendsInput;
};

export enum DownloadAndStreamTrendsSortType {
  DownTrend = 'DOWN_TREND',
  UpTrend = 'UP_TREND',
}

export enum DownloadAndStreamTrendsTypeEnum {
  Month = 'MONTH',
  Today = 'TODAY',
  Week = 'WEEK',
  Yesterday = 'YESTERDAY',
}

export type DownloadOptions = {
  __typename?: 'DownloadOptions';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  borderColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  contentTextColor?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  isDownloadTitleVisible?: Maybe<Scalars['Boolean']['output']>;
};

export type DownloadOptionsInputType = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  borderColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  buttonTextColor?: InputMaybe<Scalars['String']['input']>;
  contentTextColor?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  isDownloadTitleVisible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DubbedType = {
  __typename?: 'DubbedType';
  findDubbedTypeById: FindDubbedTypeOutput;
  findDubbedTypeByIds: Array<DubbedTypeType>;
  searchDubbedType: SearchDubbedTypeOutput;
};

export type DubbedTypeFindDubbedTypeByIdArgs = {
  input: FindDubbedTypeInput;
};

export type DubbedTypeFindDubbedTypeByIdsArgs = {
  input: FindDubbedTypeGroupInput;
};

export type DubbedTypeSearchDubbedTypeArgs = {
  input: SearchDubbedTypeInput;
};

export type DubbedTypeType = {
  __typename?: 'DubbedTypeType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<DubbedTypeType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type EditCommentInput = {
  commentId: Scalars['Int']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
};

export type EditCommentOutput = {
  __typename?: 'EditCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EditSurveyCommentInput = {
  commentId: Scalars['Int']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
};

export type EditSurveyCommentOutput = {
  __typename?: 'EditSurveyCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EditorChoice = {
  __typename?: 'EditorChoice';
  findEditorChoiceById: FindEditorChoiceOutput;
  findEditorChoiceByIds: Array<EditorChoiceType>;
  searchEditorChoice: SearchEditorChoiceOutput;
};

export type EditorChoiceFindEditorChoiceByIdArgs = {
  input: FindEditorChoiceInput;
};

export type EditorChoiceFindEditorChoiceByIdsArgs = {
  input: FindEditorChoiceGroupInput;
};

export type EditorChoiceSearchEditorChoiceArgs = {
  input: SearchEditorChoiceInput;
};

export type EditorChoiceType = {
  __typename?: 'EditorChoiceType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type EditorChoiceWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export enum EmbedCodeType {
  Amp = 'AMP',
  Iframe = 'IFRAME',
  Script = 'SCRIPT',
}

export enum EmbedContentTypeEnum {
  Download = 'DOWNLOAD',
  OnlinePlay = 'ONLINE_PLAY',
  PictureGallery = 'PICTURE_GALLERY',
  Podcast = 'PODCAST',
  Scores = 'SCORES',
  Soundtrack = 'SOUNDTRACK',
  Trailer = 'TRAILER',
}

export type EmbedResponse = {
  __typename?: 'EmbedResponse';
  findEmbedById: FindEmbedOutput;
  searchEmbed: SearchEmbedOutput;
};

export type EmbedResponseFindEmbedByIdArgs = {
  input: FindEmbedInput;
};

export type EmbedResponseSearchEmbedArgs = {
  input: SearchEmbedInput;
};

export type EmbedType = {
  __typename?: 'EmbedType';
  _id: Scalars['String']['output'];
  codeType?: Maybe<EmbedCodeType>;
  contentType?: Maybe<EmbedContentTypeEnum>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadOptions?: Maybe<DownloadOptions>;
  embedType?: Maybe<EmbedTypeEnum>;
  multimedia?: Maybe<MultimediaType>;
  onlinePlayOptions?: Maybe<OnlinePlayOptions>;
  pictureGalleryOptions?: Maybe<PictureGalleryOptions>;
  podcastOptions?: Maybe<PodcastOptions>;
  scoresOptions?: Maybe<ScoresOptions>;
  soundtrackOptions?: Maybe<SoundtrackOptions>;
  trailerOptions?: Maybe<TrailerOptions>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum EmbedTypeEnum {
  List = 'LIST',
  Modal = 'MODAL',
}

export type Episodes = {
  __typename?: 'Episodes';
  findEpisodesById: FindEpisodesOutput;
  findEpisodesByIds: Array<EpisodesType>;
  findEpisodesWithPageByInfo: FindEpisodesOutput;
  searchEpisodes: SearchEpisodesOutput;
};

export type EpisodesFindEpisodesByIdArgs = {
  input: FindEpisodesInput;
};

export type EpisodesFindEpisodesByIdsArgs = {
  input: FindEpisodesGroupInput;
};

export type EpisodesFindEpisodesWithPageByInfoArgs = {
  input: FindEpisodeWithPageInput;
};

export type EpisodesSearchEpisodesArgs = {
  input: SearchEpisodesInput;
};

export type EpisodesData = {
  __typename?: 'EpisodesData';
  episodeNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imDbRating?: Maybe<Scalars['String']['output']>;
  imDbRatingCount?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  plot?: Maybe<Scalars['String']['output']>;
  released?: Maybe<Scalars['String']['output']>;
  seasonNumber?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type EpisodesType = {
  __typename?: 'EpisodesType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dubbedType?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  hasPage?: Maybe<Scalars['Boolean']['output']>;
  links?: Maybe<Array<LinksType>>;
  multimedia?: Maybe<MultimediaType>;
  onlinePlaybackUrl?: Maybe<Scalars['String']['output']>;
  ordinal?: Maybe<Scalars['Int']['output']>;
  originalReleaseDate?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Scalars['Int']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailPreview?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ExcludeAlbumImageItem = {
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type FamousCastImageInput = {
  imdbId: Scalars['String']['input'];
  shouldGetAll?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FamousCastImageOutput = {
  __typename?: 'FamousCastImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  persons?: Maybe<Array<CastItem>>;
  results?: Maybe<Array<ImageDataDetail>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FestivalAwardInput = {
  __typename?: 'FestivalAwardInput';
  _id?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AwardStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FestivalAwardInputType = {
  _id?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<AwardStatus>;
};

export enum FestivalAwardType {
  CrewAward = 'CREW_AWARD',
  MultimediaAward = 'MULTIMEDIA_AWARD',
}

export type FestivalCrewInputType = {
  awards?: InputMaybe<Array<FestivalAwardInputType>>;
  crewId: Scalars['Int']['input'];
  multimediaId: Scalars['Int']['input'];
};

export type FestivalCrewOutputType = {
  __typename?: 'FestivalCrewOutputType';
  _id: Scalars['Int']['output'];
  album?: Maybe<Array<AlbumType>>;
  approved?: Maybe<Scalars['Boolean']['output']>;
  awards?: Maybe<Array<TemporaryAward>>;
  biography?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['String']['output']>;
  birthplace?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<PersonsBankType>>;
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deathdate?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  descriptionWordCount?: Maybe<Scalars['Float']['output']>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  father?: Maybe<PersonsBankType>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  imdbId?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  isShowcase?: Maybe<BooleanEnum>;
  maritalStatus?: Maybe<MaritalStatusType>;
  mother?: Maybe<PersonsBankType>;
  multimedia?: Maybe<MultimediaType>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Array<Scalars['String']['output']>>;
  nickname?: Maybe<Scalars['String']['output']>;
  originalDescription?: Maybe<Scalars['String']['output']>;
  otherJobs?: Maybe<Array<Scalars['String']['output']>>;
  parent?: Maybe<Scalars['Int']['output']>;
  personId?: Maybe<Scalars['String']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  previousDescription?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<CrewEnum>>;
  secondaryName?: Maybe<Scalars['String']['output']>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  sibling?: Maybe<Array<PersonsBankType>>;
  slug?: Maybe<Scalars['String']['output']>;
  socialMediaAccounts?: Maybe<Array<Scalars['String']['output']>>;
  spouses?: Maybe<Array<PersonSpouseType>>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<VideoObjectType>>;
};

export type FestivalDetailResponse = {
  __typename?: 'FestivalDetailResponse';
  findFestivalDetailByFestivalSlugAndYear: FindFestivalDetailOutput;
  findFestivalDetailById: FindFestivalDetailOutput;
  searchFestivalDetail: SearchFestivalDetailOutput;
};

export type FestivalDetailResponseFindFestivalDetailByFestivalSlugAndYearArgs = {
  input: FindFestivalDetailByFestivalSlugAndYearInput;
};

export type FestivalDetailResponseFindFestivalDetailByIdArgs = {
  input: FindFestivalDetailInput;
};

export type FestivalDetailResponseSearchFestivalDetailArgs = {
  input: SearchFestivalDetailInput;
};

export type FestivalDetailType = {
  __typename?: 'FestivalDetailType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  crew?: Maybe<Array<FestivalCrewOutputType>>;
  description?: Maybe<Scalars['String']['output']>;
  festival: FestivalType;
  festivalYear: Scalars['Float']['output'];
  multimedia?: Maybe<Array<FestivalMultimediaOutputType>>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FestivalModel = {
  __typename?: 'FestivalModel';
  awards?: Maybe<Array<AwardModel>>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FestivalMultimediaInputType = {
  awards?: InputMaybe<Array<FestivalAwardInputType>>;
  multimediaId: Scalars['Int']['input'];
};

export type FestivalMultimediaOutputType = {
  __typename?: 'FestivalMultimediaOutputType';
  _id: Scalars['Int']['output'];
  age?: Maybe<UserOutputType>;
  awards?: Maybe<Array<TemporaryAward>>;
  boxOffice?: Maybe<MultimediaCurrency>;
  broadcastStatus?: Maybe<MediaBroadcastStatusType>;
  budget?: Maybe<MultimediaCurrency>;
  categories?: Maybe<Array<Scalars['Float']['output']>>;
  content?: Maybe<Scalars['String']['output']>;
  countries?: Maybe<Array<CountriesType>>;
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  crew?: Maybe<Array<CrewOutputType>>;
  distributionCompanies?: Maybe<Array<DistributionCompanyType>>;
  dubbedType?: Maybe<DubbedTypeType>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  episodes?: Maybe<Array<Scalars['Float']['output']>>;
  excerpt?: Maybe<Scalars['String']['output']>;
  filmingLocations?: Maybe<Array<FilmingLocationType>>;
  genres?: Maybe<Array<Scalars['Float']['output']>>;
  imdbId?: Maybe<Scalars['String']['output']>;
  imdbScore?: Maybe<Scalars['Float']['output']>;
  imdbVotes?: Maybe<Scalars['Float']['output']>;
  isContentApproved?: Maybe<Scalars['Boolean']['output']>;
  languages?: Maybe<Array<LanguageType>>;
  metacriticScore?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalNetwork?: Maybe<Array<OriginalNetworkType>>;
  podcast?: Maybe<PodcastType>;
  previousContent?: Maybe<Scalars['String']['output']>;
  producerCompanies?: Maybe<Array<ProducerCompanyType>>;
  publishDate?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  restartBroadcastingDate?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<RolesType>>;
  rottenTomatoesScore?: Maybe<Scalars['Float']['output']>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  status?: Maybe<MultimediaStatusEnum>;
  stopBroadcastingDate?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<TagsType>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  year?: Maybe<YearsType>;
};

export type FestivalObject = {
  __typename?: 'FestivalObject';
  festivals?: Maybe<Array<FestivalModel>>;
  numberOfAwardsNominated?: Maybe<Scalars['Int']['output']>;
  numberOfAwardsWon?: Maybe<Scalars['Int']['output']>;
};

export type FestivalResponse = {
  __typename?: 'FestivalResponse';
  findFestivalById: FindFestivalOutput;
  findFestivalBySlug: FindFestivalOutput;
  searchFestival: SearchFestivalOutput;
  searchFestivalByCrewSlug: FindFestivalByCrewSlugOutput;
};

export type FestivalResponseFindFestivalByIdArgs = {
  input: FindFestivalInput;
};

export type FestivalResponseFindFestivalBySlugArgs = {
  input: FindFestivalBySlugInput;
};

export type FestivalResponseSearchFestivalArgs = {
  input: SearchFestivalInput;
};

export type FestivalResponseSearchFestivalByCrewSlugArgs = {
  input: FindFestivalByCrewSlugInput;
};

export type FestivalType = {
  __typename?: 'FestivalType';
  _id: Scalars['Int']['output'];
  awards?: Maybe<Array<AwardType>>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  festivalDetails: Array<FestivalDetailType>;
  image?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FilmingLocationResponse = {
  __typename?: 'FilmingLocationResponse';
  findFilmingLocationById: FindFilmingLocationOutput;
  findFilmingLocationByIds: Array<FilmingLocationType>;
  searchFilmingLocation: SearchFilmingLocationOutput;
};

export type FilmingLocationResponseFindFilmingLocationByIdArgs = {
  input: FindFilmingLocationInput;
};

export type FilmingLocationResponseFindFilmingLocationByIdsArgs = {
  input: FindFilmingLocationsInput;
};

export type FilmingLocationResponseSearchFilmingLocationArgs = {
  input: SearchFilmingLocationInput;
};

export type FilmingLocationType = {
  __typename?: 'FilmingLocationType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FindAgesBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindAgesGroupInput = {
  ageIds: Array<Scalars['Int']['input']>;
};

export type FindAgesInput = {
  id: Scalars['Int']['input'];
};

export type FindAgesOutput = {
  __typename?: 'FindAgesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<AgesType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindAlbumByMultimediaInput = {
  name: Scalars['String']['input'];
};

export type FindAlbumInput = {
  id: Scalars['String']['input'];
};

export type FindAlbumListInput = {
  id: Scalars['String']['input'];
};

export type FindAlbumListOutput = {
  __typename?: 'FindAlbumListOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<AlbumListType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindAlbumOutput = {
  __typename?: 'FindAlbumOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<AlbumType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindAlbumsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type FindAwardInput = {
  id: Scalars['Int']['input'];
};

export type FindAwardOutput = {
  __typename?: 'FindAwardOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<AwardType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindAwardsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindBiographyBookmarkInput = {
  id: Scalars['Int']['input'];
};

export type FindBiographyBookmarksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindBiographyBookmarksOutput = {
  __typename?: 'FindBiographyBookmarksOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BiographyBookmarkType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBiographyByCrewSlugInput = {
  slug: Scalars['String']['input'];
};

export type FindBiographyByCrewSlugOutput = {
  __typename?: 'FindBiographyByCrewSlugOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BiographyType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBiographyByNetworkSlugInput = {
  slug: Scalars['String']['input'];
};

export type FindBiographyByNetworkSlugOutput = {
  __typename?: 'FindBiographyByNetworkSlugOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<NetworkBiographyType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBiographyInput = {
  id: Scalars['Int']['input'];
};

export type FindBiographyOutput = {
  __typename?: 'FindBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BiographyType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBiographyRichsnippetGroupInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type FindBiographyRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type FindBiographyRichsnippetOutput = {
  __typename?: 'FindBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BiographyRichsnippetType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBoxOfficeInput = {
  id: Scalars['Int']['input'];
};

export type FindBoxOfficeOutput = {
  __typename?: 'FindBoxOfficeOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BoxOfficeType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBoxOfficesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindBroadcastByCategoryInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type FindBroadcastByCountryInput = {
  countryId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type FindBroadcastInput = {
  id: Scalars['Int']['input'];
};

export type FindBroadcastOutput = {
  __typename?: 'FindBroadcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BroadcastType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBugReportInput = {
  id: Scalars['String']['input'];
};

export type FindBugReportOutput = {
  __typename?: 'FindBugReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<BugReportType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindBugReportsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type FindByMultimediaWithClientIdNumbersInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  multimedia: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type FindByMultimediaWithClientIdNumbersOutput = {
  __typename?: 'FindByMultimediaWithClientIdNumbersOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<ClientIdClicked>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindByMultimediaWithLinkTypeNumbersInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  multimedia: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type FindByMultimediaWithLinkTypeNumbersOutput = {
  __typename?: 'FindByMultimediaWithLinkTypeNumbersOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LinkTypeClicked>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindByTitleWithClientIdNumbersInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type FindByTitleWithClientIdNumbersOutput = {
  __typename?: 'FindByTitleWithClientIdNumbersOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<ClientIdSearch>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindCategoriesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindCategoriesOutput = {
  __typename?: 'FindCategoriesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Array<CategoriesType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindCategoryBySlugInput = {
  parentSlug?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

export type FindCategoryInput = {
  id: Scalars['Int']['input'];
};

export type FindCategoryOutput = {
  __typename?: 'FindCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<CategoriesType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindCollectionBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindCollectionGroupInput = {
  collectionIds: Array<Scalars['String']['input']>;
};

export type FindCollectionInput = {
  id: Scalars['String']['input'];
};

export type FindCollectionOutput = {
  __typename?: 'FindCollectionOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<CollectionType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindCommentsGroupInput = {
  commentIds: Array<Scalars['Int']['input']>;
};

export type FindCommentsInput = {
  id: Scalars['Int']['input'];
};

export type FindCommentsOutput = {
  __typename?: 'FindCommentsOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<CommentsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindCountriesGroupInput = {
  countryIds: Array<Scalars['Int']['input']>;
};

export type FindCountriesInput = {
  id: Scalars['Int']['input'];
};

export type FindCountriesOutput = {
  __typename?: 'FindCountriesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<CountriesType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindCountryBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindCrewBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindCrewGroupInput = {
  crewIds: Array<Scalars['Int']['input']>;
};

export type FindCrewInput = {
  id: Scalars['Int']['input'];
};

export type FindCrewOutput = {
  __typename?: 'FindCrewOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<TemporaryCrewType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindDeviceOutput = {
  __typename?: 'FindDeviceOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<DeviceType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindDistributionCompaniesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindDistributionCompanyInput = {
  id: Scalars['Int']['input'];
};

export type FindDistributionCompanyOutput = {
  __typename?: 'FindDistributionCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<DistributionCompanyType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindDubbedTypeGroupInput = {
  dubbedTypeIds: Array<Scalars['Int']['input']>;
};

export type FindDubbedTypeInput = {
  id: Scalars['Int']['input'];
};

export type FindDubbedTypeOutput = {
  __typename?: 'FindDubbedTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<DubbedTypeType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindEditorChoiceGroupInput = {
  editorChoiceIds: Array<Scalars['String']['input']>;
};

export type FindEditorChoiceInput = {
  id: Scalars['Int']['input'];
};

export type FindEditorChoiceOutput = {
  __typename?: 'FindEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<EditorChoiceType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindEmbedInput = {
  id: Scalars['String']['input'];
};

export type FindEmbedOutput = {
  __typename?: 'FindEmbedOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<EmbedType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindEpisodeWithPageInput = {
  ordinal: Scalars['Int']['input'];
  post: Scalars['Int']['input'];
  season: Scalars['Int']['input'];
};

export type FindEpisodesGroupInput = {
  episodeIds: Array<Scalars['Int']['input']>;
};

export type FindEpisodesInput = {
  id: Scalars['Int']['input'];
};

export type FindEpisodesOutput = {
  __typename?: 'FindEpisodesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<EpisodesType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindFestivalByCrewSlugInput = {
  slug: Scalars['String']['input'];
};

export type FindFestivalByCrewSlugOutput = {
  __typename?: 'FindFestivalByCrewSlugOutput';
  result?: Maybe<FestivalObject>;
};

export type FindFestivalBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindFestivalDetailByFestivalSlugAndYearInput = {
  festivalSlug: Scalars['String']['input'];
  festivalYear: Scalars['Int']['input'];
};

export type FindFestivalDetailInput = {
  id: Scalars['Int']['input'];
};

export type FindFestivalDetailOutput = {
  __typename?: 'FindFestivalDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<FestivalDetailType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindFestivalInput = {
  id: Scalars['Int']['input'];
};

export type FindFestivalOutput = {
  __typename?: 'FindFestivalOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<FestivalType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindFilmingLocationInput = {
  id: Scalars['Int']['input'];
};

export type FindFilmingLocationOutput = {
  __typename?: 'FindFilmingLocationOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<FilmingLocationType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindFilmingLocationsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindFootprintInput = {
  id: Scalars['Int']['input'];
};

export type FindFootprintOutput = {
  __typename?: 'FindFootprintOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<FootprintType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindGenreBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindGenreGroupInput = {
  genreIds: Array<Scalars['Int']['input']>;
};

export type FindGenreInput = {
  id: Scalars['Int']['input'];
};

export type FindGenresOutput = {
  __typename?: 'FindGenresOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<GenresType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindHomePageSeoOutput = {
  __typename?: 'FindHomePageSeoOutput';
  error?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindImageByIdInput = {
  id: Scalars['Int']['input'];
};

export type FindImageByUserIdInput = {
  userId: Scalars['Int']['input'];
};

export type FindImagesGroupInput = {
  imageIds: Array<Scalars['Int']['input']>;
};

export type FindInternalLinkInput = {
  id: Scalars['String']['input'];
};

export type FindInternalLinkOutput = {
  __typename?: 'FindInternalLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<InternalLinksType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindInternalLinksInput = {
  ids: Array<Scalars['String']['input']>;
};

export type FindLanguageInput = {
  id: Scalars['Int']['input'];
};

export type FindLanguageOutput = {
  __typename?: 'FindLanguageOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<LanguageType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindLanguagesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindLinksGroupInput = {
  linkIds: Array<Scalars['Int']['input']>;
};

export type FindLinksInput = {
  id: Scalars['Int']['input'];
};

export type FindLinksOutput = {
  __typename?: 'FindLinksOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<LinksType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMainMenuGroupInput = {
  mainMenuIds: Array<Scalars['Int']['input']>;
};

export type FindMainMenuInput = {
  mainMenuId: Scalars['Int']['input'];
};

export type FindMainMenuOutput = {
  __typename?: 'FindMainMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MainMenuType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMainWidgetInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  showAllSurveys?: Scalars['Boolean']['input'];
};

export type FindMenuByIdInput = {
  menuId: Scalars['String']['input'];
};

export type FindMenuByIdsInput = {
  menuIds: Array<Scalars['String']['input']>;
};

export type FindMenuByParentIdInput = {
  parentId: Scalars['String']['input'];
};

export type FindMenuOutput = {
  __typename?: 'FindMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MenuType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMultimediaBookmarkInput = {
  id: Scalars['Int']['input'];
};

export type FindMultimediaBookmarksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindMultimediaBookmarksOutput = {
  __typename?: 'FindMultimediaBookmarksOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MultimediaBookmarkType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMultimediaByNameInput = {
  name: Scalars['String']['input'];
};

export type FindMultimediaByReleaseDateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type FindMultimediaByReleaseDateOutput = {
  __typename?: 'FindMultimediaByReleaseDateOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindMultimediaCommentsFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type FindMultimediaCommentsFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindMultimediaCommentsFavoritesOutput = {
  __typename?: 'FindMultimediaCommentsFavoritesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MultimediaCommentFavoriteType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMultimediaFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type FindMultimediaFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindMultimediaFavoritesOutput = {
  __typename?: 'FindMultimediaFavoritesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MultimediaFavoriteType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMultimediaInput = {
  id: Scalars['Int']['input'];
};

export type FindMultimediaOutput = {
  __typename?: 'FindMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MultimediaType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMultimediaRichsnippetGroupInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type FindMultimediaRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type FindMultimediaRichsnippetOutput = {
  __typename?: 'FindMultimediaRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MultimediaRichsnippetType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMusicByMultimediaInput = {
  multimediaName: Scalars['String']['input'];
};

export type FindMusicEpisodeInput = {
  id: Scalars['Int']['input'];
};

export type FindMusicEpisodeOutput = {
  __typename?: 'FindMusicEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MusicEpisodeType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMusicEpisodesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindMusicInput = {
  id: Scalars['Int']['input'];
};

export type FindMusicLinkInput = {
  id: Scalars['Int']['input'];
};

export type FindMusicLinkOutput = {
  __typename?: 'FindMusicLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MusicLinkType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMusicLinksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindMusicOutput = {
  __typename?: 'FindMusicOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<MusicType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindMusicsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindNetworkBiographyInput = {
  id: Scalars['Int']['input'];
};

export type FindNetworkBiographyOutput = {
  __typename?: 'FindNetworkBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<NetworkBiographyType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindNetworkBiographyRichsnippetGroupInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type FindNetworkBiographyRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type FindNetworkBiographyRichsnippetOutput = {
  __typename?: 'FindNetworkBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<NetworkBiographyRichsnippetType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindNotFoundReportInput = {
  reportId: Scalars['Int']['input'];
};

export type FindNotFoundReportOutput = {
  __typename?: 'FindNotFoundReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<NotFoundReportType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindNumberOfClickLinkTypesOnMultimediaInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  multimedia: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type FindNumberOfClickLinkTypesOnMultimediaOutput = {
  __typename?: 'FindNumberOfClickLinkTypesOnMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LinkTypeClicked>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindNumberOfDownloadsByClientInput = {
  clientId: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  linkType?: InputMaybe<LinkType>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type FindNumberOfDownloadsByClientOutput = {
  __typename?: 'FindNumberOfDownloadsByClientOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<DownloadAndStreamAnalyticsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindNumberOfSearchByClientInput = {
  clientId: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type FindNumberOfSearchByClientOutput = {
  __typename?: 'FindNumberOfSearchByClientOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SearchAnalyticsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindOrCreateCrewInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type FindOrCreateCrewOutput = {
  __typename?: 'FindOrCreateCrewOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<TemporaryCrewType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindOriginalNetworkBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindOriginalNetworkInput = {
  id: Scalars['Int']['input'];
};

export type FindOriginalNetworkOutput = {
  __typename?: 'FindOriginalNetworkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<OriginalNetworkType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindOriginalNetworksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindPaperByNameInput = {
  name: Scalars['String']['input'];
  type: PaperContentType;
};

export type FindPaperCategoriesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindPaperCategoryBySlugInput = {
  slug: Scalars['String']['input'];
  type: PaperContentType;
};

export type FindPaperCategoryInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperCategoryOutput = {
  __typename?: 'FindPaperCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperCategoryType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperCommentInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperCommentsFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperCommentsFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindPaperCommentsFavoritesOutput = {
  __typename?: 'FindPaperCommentsFavoritesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperCommentsFavoriteType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperCommentsInput = {
  commentIds: Array<Scalars['Int']['input']>;
};

export type FindPaperCommentsOutput = {
  __typename?: 'FindPaperCommentsOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperCommentsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperEditorChoiceGroupInput = {
  editorChoiceIds: Array<Scalars['String']['input']>;
};

export type FindPaperEditorChoiceInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperEditorChoiceOutput = {
  __typename?: 'FindPaperEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperEditorChoiceType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindPaperFavoritesOutput = {
  __typename?: 'FindPaperFavoritesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperFavoriteType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperLinkInput = {
  id: Scalars['Int']['input'];
};

export type FindPaperLinkOutput = {
  __typename?: 'FindPaperLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperLinksType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperLinksInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindPaperOutput = {
  __typename?: 'FindPaperOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperRichsnippetGroupInput = {
  richsnippetIds: Array<Scalars['Int']['input']>;
};

export type FindPaperRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
};

export type FindPaperRichsnippetOutput = {
  __typename?: 'FindPaperRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperRichsnippetType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperShowcaseGroupInput = {
  showcaseIds: Array<Scalars['String']['input']>;
};

export type FindPaperShowcaseInput = {
  id: Scalars['String']['input'];
};

export type FindPaperShowcaseOutput = {
  __typename?: 'FindPaperShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperShowcaseType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPaperVisitStatisticsInput = {
  id: Scalars['String']['input'];
};

export type FindPaperVisitStatisticssOutput = {
  __typename?: 'FindPaperVisitStatisticssOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PaperVisitStatisticsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPapersGroupInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindPapersVisitStatisticsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type FindPersonInput = {
  personId: Scalars['String']['input'];
};

export type FindPersonOutput = {
  __typename?: 'FindPersonOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PersonsBankType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPersonsInput = {
  personIds: Array<Scalars['String']['input']>;
};

export type FindPinInput = {
  id: Scalars['Int']['input'];
};

export type FindPinOutput = {
  __typename?: 'FindPinOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PinType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPodcastInput = {
  podcastId: Scalars['String']['input'];
};

export type FindPodcastOutput = {
  __typename?: 'FindPodcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<PodcastType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindPodcastsInput = {
  podcastIds: Array<Scalars['String']['input']>;
};

export type FindProducerCompaniesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindProducerCompanyInput = {
  id: Scalars['Int']['input'];
};

export type FindProducerCompanyOutput = {
  __typename?: 'FindProducerCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<ProducerCompanyType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindRedirectByOldPathInput = {
  oldPath: Scalars['String']['input'];
};

export type FindRedirectInput = {
  redirectId: Scalars['String']['input'];
};

export type FindRedirectOutput = {
  __typename?: 'FindRedirectOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<RedirectsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindRelatedPapersInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paper: Scalars['Int']['input'];
};

export type FindRelatedPapersOutput = {
  __typename?: 'FindRelatedPapersOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindRolesGroupInput = {
  roleIds: Array<Scalars['Int']['input']>;
};

export type FindRolesOutput = {
  __typename?: 'FindRolesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<RolesType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FindSeoBoxOutput = {
  __typename?: 'FindSeoBoxOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SeoBoxType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindSeoDataByIdAndTypeInput = {
  id: Scalars['Int']['input'];
  type: SeoCollectionName;
};

export type FindSeoDataGroupInput = {
  seoDataIds: Array<Scalars['Int']['input']>;
};

export type FindSeoDataInput = {
  id: Scalars['Int']['input'];
};

export type FindSeoDataOutput = {
  __typename?: 'FindSeoDataOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SeoDataType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindSeoSettingsByIdAndTypeInput = {
  id: Scalars['Int']['input'];
  type: SeoCollectionName;
};

export type FindSeoSettingsGroupInput = {
  seoSettingsIds: Array<Scalars['Int']['input']>;
};

export type FindSeoSettingsInput = {
  id: Scalars['Int']['input'];
};

export type FindSeoSettingsOutput = {
  __typename?: 'FindSeoSettingsOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SeoSettingsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindShowcaseGroupInput = {
  showcaseIds: Array<Scalars['String']['input']>;
};

export type FindShowcaseInput = {
  id: Scalars['Int']['input'];
};

export type FindShowcaseOutput = {
  __typename?: 'FindShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<ShowcaseType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindSuggestToWatchGroupInput = {
  suggestionsIds: Array<Scalars['String']['input']>;
};

export type FindSuggestToWatchInput = {
  id: Scalars['Int']['input'];
};

export type FindSuggestToWatchOutput = {
  __typename?: 'FindSuggestToWatchOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SuggestToWatchType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindSurveyBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindSurveyCommentsFavoriteInput = {
  id: Scalars['Int']['input'];
};

export type FindSurveyCommentsFavoritesInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindSurveyCommentsFavoritesOutput = {
  __typename?: 'FindSurveyCommentsFavoritesOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SurveyCommentFavoriteType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindSurveyCommentsGroupInput = {
  commentIds: Array<Scalars['Int']['input']>;
};

export type FindSurveyCommentsInput = {
  id: Scalars['Int']['input'];
};

export type FindSurveyCommentsOutput = {
  __typename?: 'FindSurveyCommentsOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SurveyCommentsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindSurveyInput = {
  id: Scalars['String']['input'];
};

export type FindSurveyOutput = {
  __typename?: 'FindSurveyOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<SurveyOutput>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindTagFilterInput = {
  id: Scalars['Int']['input'];
};

export type FindTagFilterOutput = {
  __typename?: 'FindTagFilterOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<TagFilterType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindTagFiltersInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindTagsBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindTagsGroupInput = {
  tagIds: Array<Scalars['Int']['input']>;
};

export type FindTagsInput = {
  id: Scalars['Int']['input'];
};

export type FindTagsOutput = {
  __typename?: 'FindTagsOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<TagsType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindTextTrackingByItemIdAndTypeInput = {
  itemId: Scalars['Int']['input'];
  type: TextTrackingCollectionName;
};

export type FindTextTrackingGroupInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type FindTextTrackingInput = {
  id: Scalars['Int']['input'];
};

export type FindTextTrackingOutput = {
  __typename?: 'FindTextTrackingOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<TextTrackingType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindTrendLinkGroupInput = {
  trendLinksIds: Array<Scalars['Int']['input']>;
};

export type FindTrendLinkInput = {
  id: Scalars['Int']['input'];
};

export type FindTrendLinkOutput = {
  __typename?: 'FindTrendLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<TrendLinkType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindUserInput = {
  id: Scalars['Int']['input'];
};

export type FindUsersInput = {
  userIds: Array<Scalars['Int']['input']>;
};

export type FindVideoGalleryByMultimediaInput = {
  name: Scalars['String']['input'];
};

export type FindVideoGalleryInput = {
  id: Scalars['String']['input'];
};

export type FindVideoGalleryOutput = {
  __typename?: 'FindVideoGalleryOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<VideoGalleryObjectType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindVideoInput = {
  id: Scalars['Int']['input'];
};

export type FindVideoOutput = {
  __typename?: 'FindVideoOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<VideoObjectType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FindYearBySlugInput = {
  slug: Scalars['String']['input'];
};

export type FindYearGroupInput = {
  yearIds: Array<Scalars['Int']['input']>;
};

export type FindYearInput = {
  id: Scalars['Int']['input'];
};

export type FindYearsOutput = {
  __typename?: 'FindYearsOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<YearsType>;
  status?: Maybe<Scalars['Int']['output']>;
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
  error?: Maybe<Scalars['String']['output']>;
  results: Array<FocusKeyword>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FocusKeywordOutput = {
  __typename?: 'FocusKeywordOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: Scalars['Int']['output'];
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum FootprintOperation {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export type FootprintType = {
  __typename?: 'FootprintType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  module: CollectionName;
  newChange?: Maybe<Scalars['Object']['output']>;
  oldChange?: Maybe<Scalars['Object']['output']>;
  operation: FootprintOperation;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: UserOutputType;
};

export type Footprints = {
  __typename?: 'Footprints';
  findById: FindFootprintOutput;
  search: SearchFootprintOutput;
};

export type FootprintsFindByIdArgs = {
  input: FindFootprintInput;
};

export type FootprintsSearchArgs = {
  input: SearchFootprintInput;
};

export type ForgetPasswordInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type ForgetPasswordOutput = {
  __typename?: 'ForgetPasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FullCastData = {
  __typename?: 'FullCastData';
  actors?: Maybe<Array<ActorShort>>;
  directors?: Maybe<CastShort>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  imDbId?: Maybe<Scalars['String']['output']>;
  others?: Maybe<Array<CastShort>>;
  singers?: Maybe<CastShort>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  writers?: Maybe<CastShort>;
  year?: Maybe<Scalars['String']['output']>;
};

export type GenreWidgetInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  termId?: InputMaybe<Scalars['Int']['input']>;
  termTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export type GenresResponse = {
  __typename?: 'GenresResponse';
  findGenreById: FindGenresOutput;
  findGenreByIds: Array<GenresType>;
  findGenreBySlug: FindGenresOutput;
  searchGenres: SearchGenresOutput;
};

export type GenresResponseFindGenreByIdArgs = {
  input: FindGenreInput;
};

export type GenresResponseFindGenreByIdsArgs = {
  input: FindGenreGroupInput;
};

export type GenresResponseFindGenreBySlugArgs = {
  input: FindGenreBySlugInput;
};

export type GenresResponseSearchGenresArgs = {
  input: SearchGenresInput;
};

export type GenresType = {
  __typename?: 'GenresType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['Float']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type GetMultimediaNewPhotosInput = {
  imdbId: Scalars['String']['input'];
};

export type GlobalSearchInput = {
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<GlobalSearchType>;
};

export type GlobalSearchOutput = {
  __typename?: 'GlobalSearchOutput';
  crew?: Maybe<Array<TemporaryCrewType>>;
  festival?: Maybe<Array<FestivalType>>;
  multimedia?: Maybe<Array<MultimediaType>>;
  originalNetwork?: Maybe<Array<OriginalNetworkType>>;
  paper?: Maybe<Array<PaperType>>;
};

export enum GlobalSearchType {
  Crew = 'CREW',
  Festival = 'FESTIVAL',
  Multimedia = 'MULTIMEDIA',
  OriginalNetwork = 'ORIGINAL_NETWORK',
  Paper = 'PAPER',
}

export type ImageData = {
  __typename?: 'ImageData';
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  imDbId?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<ImageDataDetail>>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type ImageDataDetail = {
  __typename?: 'ImageDataDetail';
  image?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ImageDimension = {
  __typename?: 'ImageDimension';
  size: Size;
  type?: Maybe<Scalars['String']['output']>;
};

export enum ImageDimensionType {
  Cast = 'cast',
  CastThumbnail = 'castThumbnail',
  LazyBlur = 'lazyBlur',
  Original = 'original',
  Thumbnail = 'thumbnail',
  ThumbnailLarge = 'thumbnailLarge',
}

export type ImdbDataInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  crew?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type ImdbDataOutput = {
  __typename?: 'ImdbDataOutput';
  error?: Maybe<Scalars['String']['output']>;
  result: CrewData;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ImdbResponse = {
  __typename?: 'ImdbResponse';
  downloadImages: Scalars['String']['output'];
  ratings: RatingData;
  search: ImdbSearchOutput;
  searchAll: ImdbSearchOutput;
  searchCompany: ImdbSearchOutput;
  searchEpisode: ImdbSearchOutput;
  searchKeyword: ImdbSearchOutput;
  searchMovie: ImdbSearchOutput;
  searchName: ImdbSearchOutput;
  searchSeries: ImdbSearchOutput;
  searchTitle: ImdbSearchOutput;
  title: ImdbTitleOutput;
};

export type ImdbResponseDownloadImagesArgs = {
  id: Scalars['String']['input'];
  size: Scalars['String']['input'];
};

export type ImdbResponseRatingsArgs = {
  id: Scalars['String']['input'];
};

export type ImdbResponseSearchArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchAllArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchCompanyArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchEpisodeArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchKeywordArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchMovieArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchNameArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchSeriesArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseSearchTitleArgs = {
  expression: Scalars['String']['input'];
};

export type ImdbResponseTitleArgs = {
  id: Scalars['String']['input'];
  options?: InputMaybe<Array<ImdbTitleOptions>>;
};

export type ImdbSearchOutput = {
  __typename?: 'ImdbSearchOutput';
  errorMessage?: Maybe<Scalars['String']['output']>;
  expression?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<ImdbSearchOutputResult>>;
  searchType?: Maybe<Scalars['String']['output']>;
};

export type ImdbSearchOutputResult = {
  __typename?: 'ImdbSearchOutputResult';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  resultType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum ImdbTitleOptions {
  FullActor = 'FullActor',
  FullCast = 'FullCast',
  Images = 'Images',
  Posters = 'Posters',
  Ratings = 'Ratings',
  Trailer = 'Trailer',
  Wikipedia = 'Wikipedia',
}

export type ImdbTitleOutput = {
  __typename?: 'ImdbTitleOutput';
  actorList?: Maybe<Array<ActorShort>>;
  awards?: Maybe<Scalars['String']['output']>;
  boxOffice?: Maybe<BoxOfficeShort>;
  companies?: Maybe<Scalars['String']['output']>;
  companyList?: Maybe<Array<CompanyShort>>;
  contentRating?: Maybe<Scalars['String']['output']>;
  countries?: Maybe<Scalars['String']['output']>;
  countryList?: Maybe<Array<KeyValueItem>>;
  directorList?: Maybe<Array<StarShort>>;
  directors?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullCast?: Maybe<FullCastData>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  genreList?: Maybe<Array<KeyValueItem>>;
  genres?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imDbRating?: Maybe<Scalars['String']['output']>;
  imDbRatingVotes?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  images?: Maybe<PosterData>;
  keywordList?: Maybe<Array<Scalars['String']['output']>>;
  keywords?: Maybe<Scalars['String']['output']>;
  languageList?: Maybe<Array<KeyValueItem>>;
  languages?: Maybe<Scalars['String']['output']>;
  metacriticRating?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  plot?: Maybe<Scalars['String']['output']>;
  plotLocal?: Maybe<Scalars['String']['output']>;
  plotLocalIsRtl?: Maybe<Scalars['Boolean']['output']>;
  posters?: Maybe<PosterData>;
  ratings?: Maybe<RatingData>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  runtimeMins?: Maybe<Scalars['String']['output']>;
  runtimeStr?: Maybe<Scalars['String']['output']>;
  similars?: Maybe<Array<SimilarShort>>;
  starList?: Maybe<Array<StarShort>>;
  stars?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  trailer?: Maybe<TrailerData>;
  tvEpisodeInfo?: Maybe<Array<TvSeriesInfo>>;
  tvSeriesInfo?: Maybe<Array<SimilarShort>>;
  type?: Maybe<Scalars['String']['output']>;
  wikipedia?: Maybe<WikipediaData>;
  writerList?: Maybe<Array<StarShort>>;
  writers?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type InternalLinkResponse = {
  __typename?: 'InternalLinkResponse';
  findInternalLinkById: FindInternalLinkOutput;
  findInternalLinksByIds: Array<InternalLinksType>;
  searchInternalLinks: SearchInternalLinkOutput;
};

export type InternalLinkResponseFindInternalLinkByIdArgs = {
  input: FindInternalLinkInput;
};

export type InternalLinkResponseFindInternalLinksByIdsArgs = {
  input: FindInternalLinksInput;
};

export type InternalLinkResponseSearchInternalLinksArgs = {
  input: SearchInternalLinkInput;
};

export type InternalLinksType = {
  __typename?: 'InternalLinksType';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  linkOptions?: Maybe<LinkOptionsType>;
  paragraph?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type IsValidAndVerifiedAccountInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type IsValidAndVerifiedAccountOutput = {
  __typename?: 'IsValidAndVerifiedAccountOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasPassword: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type KeyValueItem = {
  __typename?: 'KeyValueItem';
  key: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type LanguageResponse = {
  __typename?: 'LanguageResponse';
  findLanguageById: FindLanguageOutput;
  findLanguageByIds: Array<LanguageType>;
  searchLanguage: SearchLanguageOutput;
};

export type LanguageResponseFindLanguageByIdArgs = {
  input: FindLanguageInput;
};

export type LanguageResponseFindLanguageByIdsArgs = {
  input: FindLanguagesInput;
};

export type LanguageResponseSearchLanguageArgs = {
  input: SearchLanguageInput;
};

export type LanguageType = {
  __typename?: 'LanguageType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  postCount?: Maybe<Scalars['Int']['output']>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type LatestWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type LinkOptionsInputType = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  referrerPolicy?: InputMaybe<Scalars['String']['input']>;
  rel?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkOptionsType = {
  __typename?: 'LinkOptionsType';
  download?: Maybe<Scalars['Boolean']['output']>;
  hidden?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  referrerPolicy?: Maybe<Scalars['String']['output']>;
  rel?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum LinkType {
  Bluray = 'BLURAY',
  DubbedAudio = 'DUBBED_AUDIO',
  OnlinePlay = 'ONLINE_PLAY',
  P240 = 'P240',
  P360 = 'P360',
  P480 = 'P480',
  P540 = 'P540',
  P720 = 'P720',
  P1080 = 'P1080',
  P1080Hq = 'P1080HQ',
  Subtitle = 'SUBTITLE',
}

export type LinkTypeClicked = {
  __typename?: 'LinkTypeClicked';
  clickCount: Scalars['Int']['output'];
  linkType: LinkType;
};

export type LinkTypeClickedByClient = {
  __typename?: 'LinkTypeClickedByClient';
  clickCount: Scalars['Int']['output'];
  clientId: Scalars['String']['output'];
};

export type LinkTypeMostDownloaded = {
  __typename?: 'LinkTypeMostDownloaded';
  clients: Array<LinkTypeClickedByClient>;
  linkType: LinkType;
  totalDownloaded: Scalars['Int']['output'];
};

export type LinksResponse = {
  __typename?: 'LinksResponse';
  findLinksById: FindLinksOutput;
  findLinksByIds: Array<LinksType>;
  searchLinks: SearchLinksOutput;
};

export type LinksResponseFindLinksByIdArgs = {
  input: FindLinksInput;
};

export type LinksResponseFindLinksByIdsArgs = {
  input: FindLinksGroupInput;
};

export type LinksResponseSearchLinksArgs = {
  input: SearchLinksInput;
};

export type LinksType = {
  __typename?: 'LinksType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dubbedType?: Maybe<Scalars['Int']['output']>;
  encoder?: Maybe<Scalars['String']['output']>;
  episode?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  type: LinkType;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MainMenu = {
  __typename?: 'MainMenu';
  findMainMenuById: FindMainMenuOutput;
  findMainMenuByIds: Array<MainMenuType>;
  searchMainMenu: SearchMainMenuOutput;
};

export type MainMenuFindMainMenuByIdArgs = {
  input: FindMainMenuInput;
};

export type MainMenuFindMainMenuByIdsArgs = {
  input: FindMainMenuGroupInput;
};

export type MainMenuSearchMainMenuArgs = {
  input: SearchMainMenuInput;
};

export type MainMenuBaseItem = {
  __typename?: 'MainMenuBaseItem';
  _id?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type MainMenuResponse = {
  __typename?: 'MainMenuResponse';
  _id?: Maybe<Scalars['Float']['output']>;
  fields?: Maybe<Array<MainMenuBaseItem>>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type MainMenuType = {
  __typename?: 'MainMenuType';
  _id: Scalars['Int']['output'];
  categories?: Maybe<Array<CategoriesType>>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MainWidgetOutput =
  | MainWidgetResponseActiveSurvey
  | MainWidgetResponseCast
  | MainWidgetResponseCollection
  | MainWidgetResponseCollectionList
  | MainWidgetResponseComingSoon
  | MainWidgetResponseData
  | MainWidgetResponseEditorChoice
  | MainWidgetResponseLatest
  | MainWidgetResponseMostUpToDateSeries
  | MainWidgetResponsePassiveSurvey
  | MainWidgetResponseShowcase
  | MainWidgetResponseWeeklyBroadcast;

export type MainWidgetResponseActiveSurvey = {
  __typename?: 'MainWidgetResponseActiveSurvey';
  activeSurvey?: Maybe<SurveyOutput>;
  id: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseCast = {
  __typename?: 'MainWidgetResponseCast';
  id: Scalars['String']['output'];
  results?: Maybe<Array<TemporaryCrewType>>;
  role: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseCollection = {
  __typename?: 'MainWidgetResponseCollection';
  id: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  results?: Maybe<Array<MultimediaType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
  url?: Maybe<Scalars['String']['output']>;
};

export type MainWidgetResponseCollectionList = {
  __typename?: 'MainWidgetResponseCollectionList';
  id: Scalars['String']['output'];
  results?: Maybe<Array<CollectionType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
  url?: Maybe<Scalars['String']['output']>;
};

export type MainWidgetResponseComingSoon = {
  __typename?: 'MainWidgetResponseComingSoon';
  id: Scalars['String']['output'];
  results?: Maybe<Array<MultimediaType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseData = {
  __typename?: 'MainWidgetResponseData';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaType>>;
  slug?: Maybe<Scalars['String']['output']>;
  termId: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
  url?: Maybe<Scalars['String']['output']>;
};

export type MainWidgetResponseEditorChoice = {
  __typename?: 'MainWidgetResponseEditorChoice';
  id: Scalars['String']['output'];
  results?: Maybe<Array<MultimediaType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseLatest = {
  __typename?: 'MainWidgetResponseLatest';
  id: Scalars['String']['output'];
  results?: Maybe<Array<MultimediaType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseMostUpToDateSeries = {
  __typename?: 'MainWidgetResponseMostUpToDateSeries';
  id: Scalars['String']['output'];
  results?: Maybe<Array<MultimediaType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponsePassiveSurvey = {
  __typename?: 'MainWidgetResponsePassiveSurvey';
  id: Scalars['String']['output'];
  passiveSurvey?: Maybe<Array<SurveyOutput>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseShowcase = {
  __typename?: 'MainWidgetResponseShowcase';
  id: Scalars['String']['output'];
  results?: Maybe<Array<MultimediaType>>;
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
};

export type MainWidgetResponseWeeklyBroadcast = {
  __typename?: 'MainWidgetResponseWeeklyBroadcast';
  id: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  type: MainWidgetType;
  weeklyBroadcast?: Maybe<WeeklyBroadcast>;
};

export enum MainWidgetType {
  ActiveSurvey = 'ACTIVE_SURVEY',
  Cast = 'CAST',
  Category = 'CATEGORY',
  Collection = 'COLLECTION',
  CollectionList = 'COLLECTION_LIST',
  ComingSoon = 'COMING_SOON',
  Country = 'COUNTRY',
  EditorChoice = 'EDITOR_CHOICE',
  Genre = 'GENRE',
  Latest = 'LATEST',
  MostUpToDateSeries = 'MOST_UP_TO_DATE_SERIES',
  PassiveSurvey = 'PASSIVE_SURVEY',
  Showcase = 'SHOWCASE',
  Tag = 'TAG',
  WeeklyBroadcast = 'WEEKLY_BROADCAST',
  Year = 'YEAR',
}

export enum MaritalStatusType {
  Married = 'MARRIED',
  Single = 'SINGLE',
}

export enum MatomoDeviceType {
  FeaturePhone = 'FEATURE_PHONE',
  Phablet = 'PHABLET',
  Smartphone = 'SMARTPHONE',
  SmartDisplay = 'SMART_DISPLAY',
  Tablet = 'TABLET',
  Wearable = 'WEARABLE',
}

export type Media = {
  __typename?: 'Media';
  ages: Ages;
  awards: AwardResponse;
  bookmark: MultimediaBookmarkResponse;
  boxOffice: BoxOfficeResponse;
  broadcast: BroadcastResponse;
  categories: Categories;
  collection: Collection;
  comments: Comments;
  countries: Countries;
  crew: CrewResponse;
  distributionCompany: DistributionCompanyResponse;
  downloadAndStreamAnalytics: DownloadAndStreamAnalytics;
  downloadAndStreamTrends: DownloadAndStreamTrendsResponse;
  dubbedType: DubbedType;
  editorChoice: EditorChoice;
  episodes: Episodes;
  favorite: MultimediaFavoriteResponse;
  festival: FestivalResponse;
  festivalDetail: FestivalDetailResponse;
  filmingLocation: FilmingLocationResponse;
  genres: GenresResponse;
  language: LanguageResponse;
  links: LinksResponse;
  mediaLibrary: MediaLibrary;
  multimedia: Multimedia;
  multimediaTrends: MultimediaTrendsResponse;
  music: MusicResponse;
  musicEpisode: MusicEpisodeResponse;
  musicLink: MusicLinkResponse;
  originalNetwork: OriginalNetworkResponse;
  podcast: Podcast;
  producerCompany: ProducerCompanyResponse;
  roles: Roles;
  showcase: Showcase;
  suggestToWatch: SuggestToWatch;
  survey: Survey;
  tagFilter: TagFilterResponse;
  years: YearsResponse;
};

export enum MediaBroadcastStatusType {
  CompletePublishing = 'COMPLETE_PUBLISHING',
  Publishing = 'PUBLISHING',
  StopPublishing = 'STOP_PUBLISHING',
}

export type MediaLibrary = {
  __typename?: 'MediaLibrary';
  findImageByIds: Array<MediaLibraryType>;
  getAllImages: SearchMediaLibrariesOutput;
  selectImage: SelectImageOutput;
};

export type MediaLibraryFindImageByIdsArgs = {
  input: FindImagesGroupInput;
};

export type MediaLibraryGetAllImagesArgs = {
  input: SearchMediaLibrariesInput;
};

export type MediaLibrarySelectImageArgs = {
  input: SelectImageInput;
};

export type MediaLibraryImageType = {
  __typename?: 'MediaLibraryImageType';
  filename: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type MediaLibraryType = {
  __typename?: 'MediaLibraryType';
  _id: Scalars['Int']['output'];
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<Array<ImageDimension>>;
  image?: Maybe<MediaLibraryImageType>;
  preview: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  user: User;
};

export type Menu = {
  __typename?: 'Menu';
  findMenuById: FindMenuOutput;
  findMenuByIds: Array<MenuType>;
  findMenuByParentId: Array<MenuType>;
  getMenu: Array<MenuType>;
  searchMenu: SearchMenuOutput;
};

export type MenuFindMenuByIdArgs = {
  input: FindMenuByIdInput;
};

export type MenuFindMenuByIdsArgs = {
  input: FindMenuByIdsInput;
};

export type MenuFindMenuByParentIdArgs = {
  input: FindMenuByParentIdInput;
};

export type MenuSearchMenuArgs = {
  input: SearchMenuInput;
};

export type MenuItemInputType = {
  _id: Scalars['String']['input'];
  isMobileOnly?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  ordinal?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MenuType = {
  __typename?: 'MenuType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  isMobileOnly?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  ordinal?: Maybe<Scalars['Int']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MostUpToDateSeriesWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type MulimediaClicked = {
  __typename?: 'MulimediaClicked';
  clickCount: Scalars['Int']['output'];
  multimedia: MultimediaType;
};

export type Multimedia = {
  __typename?: 'Multimedia';
  findMultimediaById: FindMultimediaOutput;
  findMultimediaByName: FindMultimediaOutput;
  findMultimediaWithTodayReleaseDate: FindMultimediaByReleaseDateOutput;
  findMultimediaWithUpcomingReleaseDate: FindMultimediaByReleaseDateOutput;
  richsnippets: MultimediaRichsnippetResponse;
  searchEditorChoiceMultimediaByCategory: SearchMultimediaOutput;
  searchEditorChoiceMultimediaByCountry: SearchMultimediaOutput;
  searchLatestMultimediaByCategory: SearchMultimediaOutput;
  searchLatestMultimediaByCountry: SearchMultimediaOutput;
  searchMultimedia: SearchMultimediaOutput;
  searchMultimediaByCategory: SearchMultimediaByCategoryOutput;
  searchMultimediaByCollection: SearchMultimediaOutput;
  searchMultimediaByCountry: SearchMultimediaByCountryOutput;
  searchMultimediaByGenre: SearchMultimediaOutput;
  searchMultimediaByYear: SearchMultimediaOutput;
  searchRelatedMultimedia: SearchRelatedMultimediaOutput;
  searchSuggestToWatchMultimediaByCategory: SearchMultimediaOutput;
  searchSuggestToWatchMultimediaByCountry: SearchMultimediaOutput;
  suggestionMultimedia: SuggestionMultimediaOutput;
};

export type MultimediaFindMultimediaByIdArgs = {
  input: FindMultimediaInput;
};

export type MultimediaFindMultimediaByNameArgs = {
  input: FindMultimediaByNameInput;
};

export type MultimediaFindMultimediaWithTodayReleaseDateArgs = {
  input: FindMultimediaByReleaseDateInput;
};

export type MultimediaFindMultimediaWithUpcomingReleaseDateArgs = {
  input: FindMultimediaByReleaseDateInput;
};

export type MultimediaSearchEditorChoiceMultimediaByCategoryArgs = {
  input: SearchEditorChoiceMultimediaByCategoryInput;
};

export type MultimediaSearchEditorChoiceMultimediaByCountryArgs = {
  input: SearchEditorChoiceMultimediaByCountryInput;
};

export type MultimediaSearchLatestMultimediaByCategoryArgs = {
  input: SearchLatestMultimediaByCategoryInput;
};

export type MultimediaSearchLatestMultimediaByCountryArgs = {
  input: SearchLatestMultimediaByCountryInput;
};

export type MultimediaSearchMultimediaArgs = {
  input: SearchMultimediaInput;
};

export type MultimediaSearchMultimediaByCategoryArgs = {
  input: SearchMultimediaByCategoryInput;
};

export type MultimediaSearchMultimediaByCollectionArgs = {
  input: SearchMultimediaByCollectionInput;
};

export type MultimediaSearchMultimediaByCountryArgs = {
  input: SearchMultimediaByCountryInput;
};

export type MultimediaSearchMultimediaByGenreArgs = {
  input: SearchMultimediaByGenreInput;
};

export type MultimediaSearchMultimediaByYearArgs = {
  input: SearchMultimediaByYearInput;
};

export type MultimediaSearchRelatedMultimediaArgs = {
  input: SearchRelatedMultimediaInput;
};

export type MultimediaSearchSuggestToWatchMultimediaByCategoryArgs = {
  input: SearchSuggestToWatchMultimediaByCategoryInput;
};

export type MultimediaSearchSuggestToWatchMultimediaByCountryArgs = {
  input: SearchSuggestToWatchMultimediaByCountryInput;
};

export type MultimediaSuggestionMultimediaArgs = {
  input: SuggestionMultimediaInput;
};

export type MultimediaBookmarkResponse = {
  __typename?: 'MultimediaBookmarkResponse';
  findMultimediaBookmarkById: FindMultimediaBookmarksOutput;
  findMultimediaBookmarkByIds: Array<MultimediaBookmarkType>;
  searchMultimediaBookmark: SearchMultimediaBookmarkOutput;
};

export type MultimediaBookmarkResponseFindMultimediaBookmarkByIdArgs = {
  input: FindMultimediaBookmarkInput;
};

export type MultimediaBookmarkResponseFindMultimediaBookmarkByIdsArgs = {
  input: FindMultimediaBookmarksInput;
};

export type MultimediaBookmarkResponseSearchMultimediaBookmarkArgs = {
  input: SearchMultimediaBookmarkInput;
};

export type MultimediaBookmarkType = {
  __typename?: 'MultimediaBookmarkType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type MultimediaCUrrencyInputType = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<CurrencyEnum>;
};

export type MultimediaCommentFavoriteType = {
  __typename?: 'MultimediaCommentFavoriteType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  comment: CommentsType;
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type MultimediaCommentsFavoriteResponse = {
  __typename?: 'MultimediaCommentsFavoriteResponse';
  findMultimediaCommentsFavoriteById: FindMultimediaCommentsFavoritesOutput;
  findMultimediaCommentsFavoriteByIds: Array<MultimediaCommentFavoriteType>;
  searchMultimediaCommentsFavorite: SearchMultimediaCommentsFavoriteOutput;
};

export type MultimediaCommentsFavoriteResponseFindMultimediaCommentsFavoriteByIdArgs = {
  input: FindMultimediaCommentsFavoriteInput;
};

export type MultimediaCommentsFavoriteResponseFindMultimediaCommentsFavoriteByIdsArgs = {
  input: FindMultimediaCommentsFavoritesInput;
};

export type MultimediaCommentsFavoriteResponseSearchMultimediaCommentsFavoriteArgs = {
  input: SearchMultimediaCommentsFavoriteInput;
};

export type MultimediaCrew = {
  __typename?: 'MultimediaCrew';
  character?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  type: CrewEnum;
};

export type MultimediaCrewInputType = {
  character?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  type: CrewEnum;
};

export type MultimediaCurrency = {
  __typename?: 'MultimediaCurrency';
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<CurrencyEnum>;
};

export type MultimediaFavoriteResponse = {
  __typename?: 'MultimediaFavoriteResponse';
  findMultimediaFavoriteById: FindMultimediaFavoritesOutput;
  findMultimediaFavoriteByIds: Array<MultimediaFavoriteType>;
  searchMultimediaFavorite: SearchMultimediaFavoriteOutput;
};

export type MultimediaFavoriteResponseFindMultimediaFavoriteByIdArgs = {
  input: FindMultimediaFavoriteInput;
};

export type MultimediaFavoriteResponseFindMultimediaFavoriteByIdsArgs = {
  input: FindMultimediaFavoritesInput;
};

export type MultimediaFavoriteResponseSearchMultimediaFavoriteArgs = {
  input: SearchMultimediaFavoriteInput;
};

export type MultimediaFavoriteType = {
  __typename?: 'MultimediaFavoriteType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type MultimediaRichsnippetResponse = {
  __typename?: 'MultimediaRichsnippetResponse';
  findMultimediaRichsnippetById: FindMultimediaRichsnippetOutput;
  findMultimediaRichsnippetByIds: Array<MultimediaRichsnippetType>;
  getVotesDetails: Array<VotesDetails>;
  searchMultimediaRichsnippet: SearchMultimediaRichsnippetOutput;
};

export type MultimediaRichsnippetResponseFindMultimediaRichsnippetByIdArgs = {
  input: FindMultimediaRichsnippetInput;
};

export type MultimediaRichsnippetResponseFindMultimediaRichsnippetByIdsArgs = {
  input: FindMultimediaRichsnippetGroupInput;
};

export type MultimediaRichsnippetResponseSearchMultimediaRichsnippetArgs = {
  input: SearchMultimediaRichsnippetInput;
};

export type MultimediaRichsnippetType = {
  __typename?: 'MultimediaRichsnippetType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  score: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type MultimediaSeoApprovalType = {
  __typename?: 'MultimediaSeoApprovalType';
  items?: Maybe<SeoApprovalItemsType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
};

export enum MultimediaSortType {
  Date = 'DATE',
  ImdbScore = 'IMDB_SCORE',
  MostControversial = 'MOST_CONTROVERSIAL',
  MostPopular = 'MOST_POPULAR',
  Newest = 'NEWEST',
  ReleaseDate = 'RELEASE_DATE',
}

export enum MultimediaStatusEnum {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
  Trash = 'TRASH',
}

export type MultimediaTrendsOutput = {
  __typename?: 'MultimediaTrendsOutput';
  _id: Scalars['String']['output'];
  changesPercent?: Maybe<Scalars['Int']['output']>;
  currentCount?: Maybe<Scalars['Int']['output']>;
  pageTitle?: Maybe<Scalars['String']['output']>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  pastCount?: Maybe<Scalars['Int']['output']>;
};

export type MultimediaTrendsResponse = {
  __typename?: 'MultimediaTrendsResponse';
  multimediaTrendsSearch: SearchMultimediaTrendsOutput;
};

export type MultimediaTrendsResponseMultimediaTrendsSearchArgs = {
  input: SearchMultimediaTrendsInput;
};

export enum MultimediaTrendsSortType {
  DownTrend = 'DOWN_TREND',
  UpTrend = 'UP_TREND',
}

export enum MultimediaTrendsTypeEnum {
  Month = 'MONTH',
  Today = 'TODAY',
  Week = 'WEEK',
  Yesterday = 'YESTERDAY',
}

export type MultimediaType = {
  __typename?: 'MultimediaType';
  _id: Scalars['Int']['output'];
  age?: Maybe<AgesType>;
  album?: Maybe<MutimediaAlbumOutput>;
  author?: Maybe<UserOutputType>;
  boxOffice?: Maybe<MultimediaCurrency>;
  broadcastStatus?: Maybe<MediaBroadcastStatusType>;
  budget?: Maybe<MultimediaCurrency>;
  categories?: Maybe<Array<CategoriesType>>;
  collections: Array<CollectionType>;
  commentsCount: Scalars['Float']['output'];
  content?: Maybe<Scalars['String']['output']>;
  countries?: Maybe<Array<CountriesType>>;
  cover?: Maybe<Scalars['String']['output']>;
  coverPreview?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  crew?: Maybe<Array<CrewOutputType>>;
  distributionCompanies?: Maybe<Array<DistributionCompanyType>>;
  downloadAndStreamCount: Scalars['Float']['output'];
  dubbedType?: Maybe<DubbedTypeType>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  episodes: Array<EpisodesType>;
  excerpt?: Maybe<Scalars['String']['output']>;
  favoriteCount: Scalars['Float']['output'];
  filmingLocations?: Maybe<Array<FilmingLocationType>>;
  genres?: Maybe<Array<GenresType>>;
  imdbId?: Maybe<Scalars['String']['output']>;
  imdbScore?: Maybe<Scalars['Float']['output']>;
  imdbVotes?: Maybe<Scalars['Float']['output']>;
  isBookmark: Scalars['Boolean']['output'];
  isContentApproved?: Maybe<Scalars['Boolean']['output']>;
  isDownloadAndStreamAuth?: Maybe<Scalars['Boolean']['output']>;
  isEditorChoice: Scalars['Boolean']['output'];
  isSuggestToWatch: Scalars['Boolean']['output'];
  isUserFavorite: Scalars['Boolean']['output'];
  languages?: Maybe<Array<LanguageType>>;
  lastCollection?: Maybe<CollectionType>;
  lastEpisodeWithOnlinePlaybackUrl?: Maybe<EpisodesType>;
  linkTypes?: Maybe<Array<LinkType>>;
  mediaDubbedType?: Maybe<Array<MultimediaTypeEnum>>;
  metacriticScore?: Maybe<Scalars['Float']['output']>;
  multimediaTypes?: Maybe<Array<MultimediaTypeEnum>>;
  music?: Maybe<MusicType>;
  name?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  originalCreatedAt?: Maybe<Scalars['String']['output']>;
  originalCrew?: Maybe<Array<MultimediaCrew>>;
  originalNetwork?: Maybe<Array<OriginalNetworkType>>;
  podcast?: Maybe<PodcastType>;
  producerCompanies?: Maybe<Array<ProducerCompanyType>>;
  publishDate?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  restartBroadcastingDate?: Maybe<Scalars['String']['output']>;
  richsnippets?: Maybe<RichsnippetType>;
  roles?: Maybe<Array<RolesType>>;
  rottenTomatoesScore?: Maybe<Scalars['Float']['output']>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  seoApprovals?: Maybe<MultimediaSeoApprovalType>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  showcase?: Maybe<ShowcaseType>;
  status: MultimediaStatusEnum;
  stopBroadcastingDate?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<TagsType>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailPreview?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userRate: Scalars['Float']['output'];
  videos?: Maybe<MutimediaVideosOutput>;
  viewCount: Scalars['Float']['output'];
  year?: Maybe<YearsType>;
};

export enum MultimediaTypeEnum {
  Dubbed = 'DUBBED',
  Original = 'ORIGINAL',
  Subbed = 'SUBBED',
}

export type MultimediaWithEpisodes = {
  __typename?: 'MultimediaWithEpisodes';
  episodes?: Maybe<Array<EpisodesType>>;
  multimedia?: Maybe<MultimediaType>;
};

export type MusicEpisodeResponse = {
  __typename?: 'MusicEpisodeResponse';
  findMusicEpisodeById: FindMusicEpisodeOutput;
  findMusicEpisodeByIds: Array<MusicEpisodeType>;
  searchMusicEpisode: SearchMusicEpisodeOutput;
};

export type MusicEpisodeResponseFindMusicEpisodeByIdArgs = {
  input: FindMusicEpisodeInput;
};

export type MusicEpisodeResponseFindMusicEpisodeByIdsArgs = {
  input: FindMusicEpisodesInput;
};

export type MusicEpisodeResponseSearchMusicEpisodeArgs = {
  input: SearchMusicEpisodeInput;
};

export type MusicEpisodeType = {
  __typename?: 'MusicEpisodeType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Array<MusicLinkType>>;
  music?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  title: Scalars['String']['output'];
  type?: Maybe<MusicEpisodeTypeEnum>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum MusicEpisodeTypeEnum {
  Album = 'ALBUM',
  Single = 'SINGLE',
}

export type MusicLinkResponse = {
  __typename?: 'MusicLinkResponse';
  findMusicLinkById: FindMusicLinkOutput;
  findMusicLinkByIds: Array<MusicLinkType>;
  searchMusicLink: SearchMusicLinkOutput;
};

export type MusicLinkResponseFindMusicLinkByIdArgs = {
  input: FindMusicLinkInput;
};

export type MusicLinkResponseFindMusicLinkByIdsArgs = {
  input: FindMusicLinksInput;
};

export type MusicLinkResponseSearchMusicLinkArgs = {
  input: SearchMusicLinkInput;
};

export type MusicLinkType = {
  __typename?: 'MusicLinkType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  encoder?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  musicEpisode?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  type: MusicLinkTypeEnum;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum MusicLinkTypeEnum {
  Mp3_128 = 'MP3_128',
  Mp3_192 = 'MP3_192',
  Mp3_320 = 'MP3_320',
}

export type MusicResponse = {
  __typename?: 'MusicResponse';
  findMusicById: FindMusicOutput;
  findMusicByIds: Array<MusicType>;
  findMusicByMultimedia: FindMusicOutput;
  searchMusic: SearchMusicOutput;
};

export type MusicResponseFindMusicByIdArgs = {
  input: FindMusicInput;
};

export type MusicResponseFindMusicByIdsArgs = {
  input: FindMusicsInput;
};

export type MusicResponseFindMusicByMultimediaArgs = {
  input: FindMusicByMultimediaInput;
};

export type MusicResponseSearchMusicArgs = {
  input: SearchMusicInput;
};

export enum MusicStatusEnum {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
  Trash = 'TRASH',
}

export type MusicType = {
  __typename?: 'MusicType';
  _id: Scalars['Int']['output'];
  author?: Maybe<UserOutputType>;
  content?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  isContentApproved?: Maybe<Scalars['Boolean']['output']>;
  multimedia: MultimediaType;
  musicEpisodes: Array<MusicEpisodeType>;
  name?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  persons?: Maybe<Array<TemporaryCrewType>>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  status: MusicStatusEnum;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MutateAges = {
  __typename?: 'MutateAges';
  covertImageUrls: CoreOutput;
  createAge: CreateAgeOutput;
  deleteAge: DeleteAgeOutput;
  deleteAges: DeleteAgeOutput;
  updateAge: UpdateAgeOutput;
};

export type MutateAgesCreateAgeArgs = {
  input: CreateAgeInput;
};

export type MutateAgesDeleteAgeArgs = {
  input: DeleteAgeInput;
};

export type MutateAgesDeleteAgesArgs = {
  input: DeleteAgesInput;
};

export type MutateAgesUpdateAgeArgs = {
  input: UpdateAgeInput;
};

export type MutateAlbumListResponse = {
  __typename?: 'MutateAlbumListResponse';
  createAlbum: CreateAlbumOutput;
  deleteAlbum: DeleteAlbumOutput;
  deleteAlbumImage: DeleteAlbumOutput;
  deleteAlbumImages: DeleteAlbumOutput;
  deleteAlbums: DeleteAlbumOutput;
  updateAlbum: UpdateAlbumOutput;
  uploadImage: UploadAlbumImageOutput;
};

export type MutateAlbumListResponseCreateAlbumArgs = {
  input: CreateAlbumInput;
};

export type MutateAlbumListResponseDeleteAlbumArgs = {
  input: DeleteAlbumListInput;
};

export type MutateAlbumListResponseDeleteAlbumImageArgs = {
  input: DeleteAlbumInput;
};

export type MutateAlbumListResponseDeleteAlbumImagesArgs = {
  input: DeleteAlbumsInput;
};

export type MutateAlbumListResponseDeleteAlbumsArgs = {
  input: DeleteAlbumsListInput;
};

export type MutateAlbumListResponseUpdateAlbumArgs = {
  input: UpdateAlbumInput;
};

export type MutateAlbumListResponseUploadImageArgs = {
  file: Scalars['Upload']['input'];
  input: UploadImageAlbumInput;
};

export type MutateAlbumResponse = {
  __typename?: 'MutateAlbumResponse';
  createAlbum: CreateImageAlbumOutput;
  deleteImage: DeleteAlbumOutput;
  deleteImages: DeleteAlbumOutput;
  uploadImage: UploadAlbumImageOutput;
};

export type MutateAlbumResponseCreateAlbumArgs = {
  input: CreateImageAlbumInput;
};

export type MutateAlbumResponseDeleteImageArgs = {
  input: DeleteAlbumInput;
};

export type MutateAlbumResponseDeleteImagesArgs = {
  input: DeleteAlbumsInput;
};

export type MutateAlbumResponseUploadImageArgs = {
  file: Scalars['Upload']['input'];
  input: UploadAlbumImageInput;
};

export type MutateAnalytics = {
  __typename?: 'MutateAnalytics';
  createAnalytics: CreateAnalyticsOutput;
};

export type MutateAnalyticsCreateAnalyticsArgs = {
  input: CreateAnalyticsInput;
};

export type MutateAwardResponse = {
  __typename?: 'MutateAwardResponse';
  createAward: CreateAwardOutput;
  deleteAward: DeleteAwardOutput;
  deleteAwards: DeleteAwardOutput;
  updateAward: UpdateAwardOutput;
};

export type MutateAwardResponseCreateAwardArgs = {
  input: CreateAwardInput;
};

export type MutateAwardResponseDeleteAwardArgs = {
  input: DeleteAwardInput;
};

export type MutateAwardResponseDeleteAwardsArgs = {
  input: DeleteAwardsInput;
};

export type MutateAwardResponseUpdateAwardArgs = {
  input: UpdateAwardInput;
};

export type MutateBiographyBookmarkResponse = {
  __typename?: 'MutateBiographyBookmarkResponse';
  bulkDeleteBiographyBookmarks: DeleteBiographyBookmarkOutput;
  createBiographyBookmark: CreateBiographyBookmarkOutput;
  deleteBiographyBookmark: DeleteBiographyBookmarkOutput;
  deleteOneBiographyBookmark: DeleteBiographyBookmarkOutput;
  updateBiographyBookmark: UpdateBiographyBookmarkOutput;
};

export type MutateBiographyBookmarkResponseBulkDeleteBiographyBookmarksArgs = {
  input: DeleteBiographyBookmarksInput;
};

export type MutateBiographyBookmarkResponseCreateBiographyBookmarkArgs = {
  input: CreateBiographyBookmarkInput;
};

export type MutateBiographyBookmarkResponseDeleteBiographyBookmarkArgs = {
  input: DeleteBiographyBookmarkInput;
};

export type MutateBiographyBookmarkResponseDeleteOneBiographyBookmarkArgs = {
  input: DeleteOneBiographyBookmarkInput;
};

export type MutateBiographyBookmarkResponseUpdateBiographyBookmarkArgs = {
  input: UpdateBiographyBookmarkInput;
};

export type MutateBiographyResponse = {
  __typename?: 'MutateBiographyResponse';
  bookmark: MutateBiographyBookmarkResponse;
  createBiography: CreateBiographyOutput;
  deleteBiographies: DeleteBiographyOutput;
  deleteBiography: DeleteBiographyOutput;
  richSnippet: MutateBiographyRichsnippetResponse;
  updateBiography: UpdateBiographyOutput;
};

export type MutateBiographyResponseCreateBiographyArgs = {
  input: CreateBiographyInput;
};

export type MutateBiographyResponseDeleteBiographiesArgs = {
  input: DeleteBiographysInput;
};

export type MutateBiographyResponseDeleteBiographyArgs = {
  input: DeleteBiographyInput;
};

export type MutateBiographyResponseUpdateBiographyArgs = {
  input: UpdateBiographyInput;
};

export type MutateBiographyRichsnippetResponse = {
  __typename?: 'MutateBiographyRichsnippetResponse';
  createBiographyRichsnippet: CreateBiographyRichsnippetOutput;
  deleteBiographyRichsnippet: DeleteBiographyRichsnippetOutput;
  deleteBiographyRichsnippets: DeleteBiographyRichsnippetOutput;
  increaseBiographyRichsnippetScores: Scalars['Boolean']['output'];
  updateBiographyRichsnippet: UpdateBiographyRichsnippetOutput;
};

export type MutateBiographyRichsnippetResponseCreateBiographyRichsnippetArgs = {
  input: CreateBiographyRichsnippetInput;
};

export type MutateBiographyRichsnippetResponseDeleteBiographyRichsnippetArgs = {
  input: DeleteBiographyRichsnippetInput;
};

export type MutateBiographyRichsnippetResponseDeleteBiographyRichsnippetsArgs = {
  input: BulkDeleteBiographyRichsnippetInput;
};

export type MutateBiographyRichsnippetResponseUpdateBiographyRichsnippetArgs = {
  input: UpdateBiographyRichsnippetInput;
};

export type MutateBoxOfficeResponse = {
  __typename?: 'MutateBoxOfficeResponse';
  bulkDeleteBoxOffice: DeleteBoxOfficeOutput;
  createBoxOffice: CreateBoxOfficeOutput;
  deleteBoxOffice: DeleteBoxOfficeOutput;
  updateBoxOffice: UpdateBoxOfficeOutput;
};

export type MutateBoxOfficeResponseBulkDeleteBoxOfficeArgs = {
  input: DeleteBoxOfficesInput;
};

export type MutateBoxOfficeResponseCreateBoxOfficeArgs = {
  input: CreateBoxOfficeInput;
};

export type MutateBoxOfficeResponseDeleteBoxOfficeArgs = {
  input: DeleteBoxOfficeInput;
};

export type MutateBoxOfficeResponseUpdateBoxOfficeArgs = {
  input: UpdateBoxOfficeInput;
};

export type MutateBroadcastResponse = {
  __typename?: 'MutateBroadcastResponse';
  createBroadcast: CreateBroadcastOutput;
  deleteBroadcast: DeleteBroadcastOutput;
  deleteBroadcasts: DeleteBroadcastOutput;
  updateBroadcast: UpdateBroadcastOutput;
};

export type MutateBroadcastResponseCreateBroadcastArgs = {
  input: CreateBroadcastInput;
};

export type MutateBroadcastResponseDeleteBroadcastArgs = {
  input: DeleteBroadcastInput;
};

export type MutateBroadcastResponseDeleteBroadcastsArgs = {
  input: DeleteBroadcastsInput;
};

export type MutateBroadcastResponseUpdateBroadcastArgs = {
  input: UpdateBroadcastInput;
};

export type MutateBugReportResponse = {
  __typename?: 'MutateBugReportResponse';
  createBugReport: CreateBugReportOutput;
  deleteBugReport: DeleteBugReportOutput;
  deleteBugReports: DeleteBugReportOutput;
  updateBugReport: UpdateBugReportOutput;
};

export type MutateBugReportResponseCreateBugReportArgs = {
  input: CreateBugReportInput;
};

export type MutateBugReportResponseDeleteBugReportArgs = {
  input: DeleteBugReportInput;
};

export type MutateBugReportResponseDeleteBugReportsArgs = {
  input: DeleteBugReportsInput;
};

export type MutateBugReportResponseUpdateBugReportArgs = {
  input: UpdateBugReportInput;
};

export type MutateCategories = {
  __typename?: 'MutateCategories';
  covertImageUrls: CoreOutput;
  createCategory: CreateCategoryOutput;
  deleteCategories: DeleteCategoryOutput;
  deleteCategory: DeleteCategoryOutput;
  updateCategory: UpdateCategoryOutput;
};

export type MutateCategoriesCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutateCategoriesDeleteCategoriesArgs = {
  input: BulkDeleteCategoriesInput;
};

export type MutateCategoriesDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};

export type MutateCategoriesUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type MutateCategoryResponse = {
  __typename?: 'MutateCategoryResponse';
  createPaperCategory: CreatePaperCategoryOutput;
  deletePaperCategories: DeletePaperCategoryOutput;
  deletePaperCategory: DeletePaperCategoryOutput;
  updatePaperCategory: UpdatePaperCategoryOutput;
};

export type MutateCategoryResponseCreatePaperCategoryArgs = {
  input: CreatePaperCategoryInput;
};

export type MutateCategoryResponseDeletePaperCategoriesArgs = {
  input: BulkDeletePaperCategoriesInput;
};

export type MutateCategoryResponseDeletePaperCategoryArgs = {
  input: DeletePaperCategoryInput;
};

export type MutateCategoryResponseUpdatePaperCategoryArgs = {
  input: UpdatePaperCategoryInput;
};

export type MutateCollectionResponse = {
  __typename?: 'MutateCollectionResponse';
  createCollection: CreateCollectionOutput;
  deleteCollection: DeleteCollcetionOutput;
  deleteCollections: DeleteCollcetionOutput;
  updateCollection: UpdateCollectionOutput;
};

export type MutateCollectionResponseCreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MutateCollectionResponseDeleteCollectionArgs = {
  input: DeleteCollectionInput;
};

export type MutateCollectionResponseDeleteCollectionsArgs = {
  input: BulkDeleteCollectionsInput;
};

export type MutateCollectionResponseUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};

export type MutateComments = {
  __typename?: 'MutateComments';
  createAdminCommentInDatabase: CreateCommentOutput;
  createComment: CoreOutput;
  createCommentInDatabase: CreateCommentOutput;
  deleteComment: DeleteCommentOutput;
  deleteComments: DeleteCommentOutput;
  editComment: EditCommentOutput;
  favorite: MutateMultimediaCommentsFavoriteResponse;
  removeComment: DeleteCommentOutput;
  updateComment: UpdateCommentOutput;
};

export type MutateCommentsCreateAdminCommentInDatabaseArgs = {
  input: CreateAdminCommentInput;
};

export type MutateCommentsCreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutateCommentsCreateCommentInDatabaseArgs = {
  input: CreateCommentInput;
};

export type MutateCommentsDeleteCommentArgs = {
  input: DeleteCommentInput;
};

export type MutateCommentsDeleteCommentsArgs = {
  input: DeleteCommentsInput;
};

export type MutateCommentsEditCommentArgs = {
  input: EditCommentInput;
};

export type MutateCommentsRemoveCommentArgs = {
  input: RemoveCommentInput;
};

export type MutateCommentsUpdateCommentArgs = {
  input: UpdateCommentInput;
};

export type MutateContacts = {
  __typename?: 'MutateContacts';
  createContact: CreateContactsOutput;
  deleteContact: DeleteContactsOutput;
  sendTicket: CoreOutput;
  updateContact: UpdateContactsOutput;
};

export type MutateContactsCreateContactArgs = {
  input: CreateContactsInput;
};

export type MutateContactsDeleteContactArgs = {
  input: DeleteContactsInput;
};

export type MutateContactsSendTicketArgs = {
  input: SendTicketInput;
};

export type MutateContactsUpdateContactArgs = {
  input: UpdateContactsInput;
};

export type MutateCountries = {
  __typename?: 'MutateCountries';
  covertImageUrls: CoreOutput;
  createCountry: CreateCountryOutput;
  deleteCountries: DeleteCountryOutput;
  deleteCountry: DeleteCountryOutput;
  updateCountry: UpdateCountryOutput;
};

export type MutateCountriesCreateCountryArgs = {
  input: CreateCountryInput;
};

export type MutateCountriesDeleteCountriesArgs = {
  input: DeleteCountriesInput;
};

export type MutateCountriesDeleteCountryArgs = {
  input: DeleteCountryInput;
};

export type MutateCountriesUpdateCountryArgs = {
  input: UpdateCountryInput;
};

export type MutateCrewsResponse = {
  __typename?: 'MutateCrewsResponse';
  biography: MutateBiographyResponse;
  covertImageUrls: CoreOutput;
  createCrew: CreateCrewOutput;
  deleteCrew: DeleteCrewOutput;
  deleteCrews: DeleteCrewOutput;
  updateCrew: UpdateCrewOutput;
};

export type MutateCrewsResponseCreateCrewArgs = {
  input: CreateCrewInput;
};

export type MutateCrewsResponseDeleteCrewArgs = {
  input: DeleteCrewInput;
};

export type MutateCrewsResponseDeleteCrewsArgs = {
  input: DeleteCrewsInput;
};

export type MutateCrewsResponseUpdateCrewArgs = {
  input: UpdateCrewInput;
};

export type MutateDistributionCompanyResponse = {
  __typename?: 'MutateDistributionCompanyResponse';
  bulkDeleteDistributionCompany: DeleteDistributionCompanyOutput;
  createDistributionCompany: CreateDistributionCompanyOutput;
  deleteDistributionCompany: DeleteDistributionCompanyOutput;
  updateDistributionCompany: UpdateDistributionCompanyOutput;
};

export type MutateDistributionCompanyResponseBulkDeleteDistributionCompanyArgs = {
  input: DeleteDistributionCompanysInput;
};

export type MutateDistributionCompanyResponseCreateDistributionCompanyArgs = {
  input: CreateDistributionCompanyInput;
};

export type MutateDistributionCompanyResponseDeleteDistributionCompanyArgs = {
  input: DeleteDistributionCompanyInput;
};

export type MutateDistributionCompanyResponseUpdateDistributionCompanyArgs = {
  input: UpdateDistributionCompanyInput;
};

export type MutateDownloadAndStreamAnalytics = {
  __typename?: 'MutateDownloadAndStreamAnalytics';
  createDownloadAndStreamAnalytics: CreateDownloadAndStreamAnalyticsOutput;
};

export type MutateDownloadAndStreamAnalyticsCreateDownloadAndStreamAnalyticsArgs = {
  input: CreateDownloadAndStreamAnalyticsInput;
};

export type MutateDubbedTypeResponse = {
  __typename?: 'MutateDubbedTypeResponse';
  covertImageUrls: CoreOutput;
  createDubbedType: CreateDubbedTypeOutput;
  deleteDubbedType: DeleteDubbedTypeOutput;
  deleteDubbedTypes: DeleteDubbedTypeOutput;
  updateDubbedType: UpdateDubbedTypeOutput;
};

export type MutateDubbedTypeResponseCreateDubbedTypeArgs = {
  input: CreateDubbedTypeInput;
};

export type MutateDubbedTypeResponseDeleteDubbedTypeArgs = {
  input: DeleteDubbedTypeInput;
};

export type MutateDubbedTypeResponseDeleteDubbedTypesArgs = {
  input: DeleteDubbedTypesInput;
};

export type MutateDubbedTypeResponseUpdateDubbedTypeArgs = {
  input: UpdateDubbedTypeInput;
};

export type MutateEditorChoice = {
  __typename?: 'MutateEditorChoice';
  createEditorChoice: CreateEditorChoiceOutput;
  deleteBulkEditorChoices: DeleteEditorChoiceOutput;
  deleteEditorChoice: DeleteEditorChoiceOutput;
  updateEditorChoice: UpdateEditorChoiceOutput;
};

export type MutateEditorChoiceCreateEditorChoiceArgs = {
  input: CreateEditorChoiceInput;
};

export type MutateEditorChoiceDeleteBulkEditorChoicesArgs = {
  input: DeleteBulkEditorChoicesInput;
};

export type MutateEditorChoiceDeleteEditorChoiceArgs = {
  input: DeleteEditorChoiceInput;
};

export type MutateEditorChoiceUpdateEditorChoiceArgs = {
  input: UpdateEditorChoiceInput;
};

export type MutateEmbedResponse = {
  __typename?: 'MutateEmbedResponse';
  createEmbed: CreateEmbedOutput;
  deleteEmbed: DeleteEmbedOutput;
  deleteEmbeds: DeleteEmbedOutput;
  updateEmbed: UpdateEmbedOutput;
};

export type MutateEmbedResponseCreateEmbedArgs = {
  input: CreateEmbedInput;
};

export type MutateEmbedResponseDeleteEmbedArgs = {
  input: DeleteEmbedInput;
};

export type MutateEmbedResponseDeleteEmbedsArgs = {
  input: DeleteEmbedsInput;
};

export type MutateEmbedResponseUpdateEmbedArgs = {
  input: UpdateEmbedInput;
};

export type MutateEpisodesResponse = {
  __typename?: 'MutateEpisodesResponse';
  covertImageUrls: CoreOutput;
  createEpisode: CreateEpisodeOutput;
  createManyEpisode: CreateManyEpisodeOutput;
  deleteEpisode: DeleteEpisodeOutput;
  deleteEpisodes: DeleteEpisodeOutput;
  updateEpisode: UpdateEpisodeOutput;
  updateManyEpisode: UpdateEpisodeOutput;
};

export type MutateEpisodesResponseCreateEpisodeArgs = {
  input: CreateEpisodeInput;
};

export type MutateEpisodesResponseCreateManyEpisodeArgs = {
  input: CreateManyEpisodeInput;
};

export type MutateEpisodesResponseDeleteEpisodeArgs = {
  input: DeleteEpisodeInput;
};

export type MutateEpisodesResponseDeleteEpisodesArgs = {
  input: DeleteEpisodesInput;
};

export type MutateEpisodesResponseUpdateEpisodeArgs = {
  input: UpdateEpisodeInput;
};

export type MutateEpisodesResponseUpdateManyEpisodeArgs = {
  input: UpdateManyEpisodeInput;
};

export type MutateFestivalDetailResponse = {
  __typename?: 'MutateFestivalDetailResponse';
  bulkDeleteFestivalDetail: DeleteFestivalDetailOutput;
  createFestivalDetail: CreateFestivalDetailOutput;
  deleteFestivalDetail: DeleteFestivalDetailOutput;
  updateFestivalDetail: UpdateFestivalDetailOutput;
};

export type MutateFestivalDetailResponseBulkDeleteFestivalDetailArgs = {
  input: DeleteFestivalDetailsInput;
};

export type MutateFestivalDetailResponseCreateFestivalDetailArgs = {
  input: CreateFestivalDetailInput;
};

export type MutateFestivalDetailResponseDeleteFestivalDetailArgs = {
  input: DeleteFestivalDetailInput;
};

export type MutateFestivalDetailResponseUpdateFestivalDetailArgs = {
  input: UpdateFestivalDetailInput;
};

export type MutateFestivalResponse = {
  __typename?: 'MutateFestivalResponse';
  bulkDeleteFestival: DeleteFestivalOutput;
  createFestival: CreateFestivalOutput;
  deleteFestival: DeleteFestivalOutput;
  updateFestival: UpdateFestivalOutput;
};

export type MutateFestivalResponseBulkDeleteFestivalArgs = {
  input: DeleteFestivalsInput;
};

export type MutateFestivalResponseCreateFestivalArgs = {
  input: CreateFestivalInput;
};

export type MutateFestivalResponseDeleteFestivalArgs = {
  input: DeleteFestivalInput;
};

export type MutateFestivalResponseUpdateFestivalArgs = {
  input: UpdateFestivalInput;
};

export type MutateFilmingLocationResponse = {
  __typename?: 'MutateFilmingLocationResponse';
  bulkDeleteFilmingLocation: DeleteFilmingLocationOutput;
  createFilmingLocation: CreateFilmingLocationOutput;
  deleteFilmingLocation: DeleteFilmingLocationOutput;
  updateFilmingLocation: UpdateFilmingLocationOutput;
};

export type MutateFilmingLocationResponseBulkDeleteFilmingLocationArgs = {
  input: DeleteProducerCompanysInput;
};

export type MutateFilmingLocationResponseCreateFilmingLocationArgs = {
  input: CreateFilmingLocationInput;
};

export type MutateFilmingLocationResponseDeleteFilmingLocationArgs = {
  input: DeleteFilmingLocationInput;
};

export type MutateFilmingLocationResponseUpdateFilmingLocationArgs = {
  input: UpdateFilmingLocationInput;
};

export type MutateGenres = {
  __typename?: 'MutateGenres';
  covertImageUrls: CoreOutput;
  createGenre: CreateGenreOutput;
  deleteGenre: DeleteGenreOutput;
  deleteGenres: DeleteGenreOutput;
  updateGenre: UpdateGenreOutput;
};

export type MutateGenresCreateGenreArgs = {
  input: CreateGenreInput;
};

export type MutateGenresDeleteGenreArgs = {
  input: DeleteGenreInput;
};

export type MutateGenresDeleteGenresArgs = {
  input: DeleteGenresInput;
};

export type MutateGenresUpdateGenreArgs = {
  input: UpdateGenreInput;
};

export type MutateImage = {
  __typename?: 'MutateImage';
  uploadImage: UploadImageOutput;
  uploadImages: UploadImageOutput;
};

export type MutateImageUploadImageArgs = {
  file: Scalars['Upload']['input'];
  input?: InputMaybe<UploadImageInputType>;
};

export type MutateImageUploadImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
};

export type MutateInternalLinkResponse = {
  __typename?: 'MutateInternalLinkResponse';
  bulkDeleteInternalLinks: DeleteInternalLinkOutput;
  createInternalLinks: CreateInternalLinkOutput;
  deleteInternalLinks: DeleteInternalLinkOutput;
  updateInternalLinks: UpdateInternalLinkOutput;
};

export type MutateInternalLinkResponseBulkDeleteInternalLinksArgs = {
  input: DeleteInternalLinksInput;
};

export type MutateInternalLinkResponseCreateInternalLinksArgs = {
  input: CreateInternalLinkInput;
};

export type MutateInternalLinkResponseDeleteInternalLinksArgs = {
  input: DeleteInternalLinkInput;
};

export type MutateInternalLinkResponseUpdateInternalLinksArgs = {
  input: UpdateInternalLinkInput;
};

export type MutateLanguageResponse = {
  __typename?: 'MutateLanguageResponse';
  bulkDeleteLanguages: DeleteLanguageOutput;
  createLanguage: CreateLanguageOutput;
  deleteLanguage: DeleteLanguageOutput;
  updateLanguage: UpdateLanguageOutput;
};

export type MutateLanguageResponseBulkDeleteLanguagesArgs = {
  input: DeleteLanguagesInput;
};

export type MutateLanguageResponseCreateLanguageArgs = {
  input: CreateLanguageInput;
};

export type MutateLanguageResponseDeleteLanguageArgs = {
  input: DeleteLanguageInput;
};

export type MutateLanguageResponseUpdateLanguageArgs = {
  input: UpdateLanguageInput;
};

export type MutateLinksResponse = {
  __typename?: 'MutateLinksResponse';
  createLink: CreateLinkOutput;
  deleteLink: DeleteLinkOutput;
  deleteLinks: DeleteLinkOutput;
  updateLink: UpdateLinkOutput;
};

export type MutateLinksResponseCreateLinkArgs = {
  input: CreateLinkInputType;
};

export type MutateLinksResponseDeleteLinkArgs = {
  input: DeleteLinkInput;
};

export type MutateLinksResponseDeleteLinksArgs = {
  input: DeleteLinksInput;
};

export type MutateLinksResponseUpdateLinkArgs = {
  input: UpdateLinkInput;
};

export type MutateMainMenu = {
  __typename?: 'MutateMainMenu';
  createMainMenu: CreateMainMenuOutput;
  deleteMainMenu: DeleteMainMenuOutput;
  deleteMainMenus: DeleteMainMenuOutput;
  updateMainMenu: UpdateMainMenuOutput;
};

export type MutateMainMenuCreateMainMenuArgs = {
  input: CreateMainMenuInput;
};

export type MutateMainMenuDeleteMainMenuArgs = {
  input: DeleteMainMenuInput;
};

export type MutateMainMenuDeleteMainMenusArgs = {
  input: BulkDeleteMainMenuInput;
};

export type MutateMainMenuUpdateMainMenuArgs = {
  input: UpdateMainMenuInput;
};

export type MutateMedia = {
  __typename?: 'MutateMedia';
  ages: MutateAges;
  awards: MutateAwardResponse;
  bookmark: MutateMultimediaBookmarkResponse;
  boxOffice: MutateBoxOfficeResponse;
  broadcast: MutateBroadcastResponse;
  categories: MutateCategories;
  collection: MutateCollectionResponse;
  comments: MutateComments;
  countries: MutateCountries;
  crews: MutateCrewsResponse;
  distributionCompany: MutateDistributionCompanyResponse;
  downloadAndStreamAnalytics: MutateDownloadAndStreamAnalytics;
  dubbedTypes: MutateDubbedTypeResponse;
  editorChoice: MutateEditorChoice;
  episodes: MutateEpisodesResponse;
  favorite: MutateMultimediaFavoriteResponse;
  festival: MutateFestivalResponse;
  festivalDetail: MutateFestivalDetailResponse;
  filmingLocation: MutateFilmingLocationResponse;
  genres: MutateGenres;
  language: MutateLanguageResponse;
  links: MutateLinksResponse;
  mediaLibrary: MutateMediaLibrary;
  multimedia: MutateMultimedia;
  music: MutateMusicResponse;
  musicEpisode: MutateMusicEpisodeResponse;
  musicLink: MutateMusicLinkResponse;
  originalNetwork: MutateOriginalNetworkResponse;
  podcast: MutatePodcast;
  producerCompany: MutateProducerCompanyResponse;
  roles: MutateRolesResponse;
  showcase: MutateShowcaseResponse;
  suggestToWatch: MutateSuggestToWatch;
  survey: MutateSurvey;
  tagFilter: MutateTagFilterResponse;
  years: MutateYearsResponse;
};

export type MutateMediaLibrary = {
  __typename?: 'MutateMediaLibrary';
  deleteImages: DeleteImagesOutput;
  updateAllImagesPreview: CoreOutput;
  updateImage: UpdateImageOutput;
  uploadImages: UploadImageOutput;
};

export type MutateMediaLibraryDeleteImagesArgs = {
  input: DeleteImagesInput;
};

export type MutateMediaLibraryUpdateImageArgs = {
  input: UpdateImageInput;
};

export type MutateMediaLibraryUploadImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
};

export type MutateMenu = {
  __typename?: 'MutateMenu';
  createMenu: CreateMenuOutput;
  deleteMenu: CoreOutput;
  updateMenu: UpdateMenuOutput;
};

export type MutateMenuCreateMenuArgs = {
  input: CreateMenuInput;
};

export type MutateMenuUpdateMenuArgs = {
  input: UpdateMenuInput;
};

export type MutateMultimedia = {
  __typename?: 'MutateMultimedia';
  bulkDeleteMultimedia: CoreOutput;
  covertImageUrls: CoreOutput;
  createMultimedia: CoreOutput;
  deleteMultimedia: CoreOutput;
  richsnippets: MutateMultimediaRichsnippetResponse;
  syncImdbData: ImdbDataOutput;
  updateMultimedia: CoreOutput;
  updateMultimediaScoresFromImdbApi: CoreOutput;
};

export type MutateMultimediaBulkDeleteMultimediaArgs = {
  input: BulkDeleteMultimediaInput;
};

export type MutateMultimediaCreateMultimediaArgs = {
  input: CreateMultimediaInput;
};

export type MutateMultimediaDeleteMultimediaArgs = {
  input: DeleteMultimediaInput;
};

export type MutateMultimediaSyncImdbDataArgs = {
  input: ImdbDataInput;
};

export type MutateMultimediaUpdateMultimediaArgs = {
  input: UpdateMultimediaInput;
};

export type MutateMultimediaBookmarkResponse = {
  __typename?: 'MutateMultimediaBookmarkResponse';
  bulkDeleteMultimediaBookmarks: DeleteMultimediaBookmarkOutput;
  createMultimediaBookmark: CreateMultimediaBookmarkOutput;
  deleteMultimediaBookmark: DeleteMultimediaBookmarkOutput;
  deleteOneMultimediaBookmark: DeleteMultimediaBookmarkOutput;
  updateMultimediaBookmark: UpdateMultimediaBookmarkOutput;
};

export type MutateMultimediaBookmarkResponseBulkDeleteMultimediaBookmarksArgs = {
  input: DeleteMultimediaBookmarksInput;
};

export type MutateMultimediaBookmarkResponseCreateMultimediaBookmarkArgs = {
  input: CreateMultimediaBookmarkInput;
};

export type MutateMultimediaBookmarkResponseDeleteMultimediaBookmarkArgs = {
  input: DeleteMultimediaBookmarkInput;
};

export type MutateMultimediaBookmarkResponseDeleteOneMultimediaBookmarkArgs = {
  input: DeleteOneMultimediaBookmarkInput;
};

export type MutateMultimediaBookmarkResponseUpdateMultimediaBookmarkArgs = {
  input: UpdateMultimediaBookmarkInput;
};

export type MutateMultimediaCommentsFavoriteResponse = {
  __typename?: 'MutateMultimediaCommentsFavoriteResponse';
  bulkDeleteMultimediaCommentsFavorites: DeleteMultimediaCommentsFavoriteOutput;
  createMultimediaCommentsFavorite: CreateMultimediaFavoriteOutput;
  deleteMultimediaCommentsFavorite: DeleteMultimediaCommentsFavoriteOutput;
  updateMultimediaCommentsFavorite: UpdateMultimediaCommentsFavoriteOutput;
};

export type MutateMultimediaCommentsFavoriteResponseBulkDeleteMultimediaCommentsFavoritesArgs = {
  input: DeleteMultimediaCommentsFavoritesInput;
};

export type MutateMultimediaCommentsFavoriteResponseCreateMultimediaCommentsFavoriteArgs = {
  input: CreateMultimediaCommentsFavoriteInput;
};

export type MutateMultimediaCommentsFavoriteResponseDeleteMultimediaCommentsFavoriteArgs = {
  input: DeleteMultimediaCommentsFavoriteInput;
};

export type MutateMultimediaCommentsFavoriteResponseUpdateMultimediaCommentsFavoriteArgs = {
  input: UpdateMultimediaCommentsFavoriteInput;
};

export type MutateMultimediaFavoriteResponse = {
  __typename?: 'MutateMultimediaFavoriteResponse';
  bulkDeleteMultimediaFavorites: DeleteMultimediaFavoriteOutput;
  createMultimediaFavorite: CreateMultimediaFavoriteOutput;
  deleteMultimediaFavorite: DeleteMultimediaFavoriteOutput;
  deleteOneMultimediaFavorite: DeleteMultimediaFavoriteOutput;
  updateMultimediaFavorite: UpdateMultimediaFavoriteOutput;
};

export type MutateMultimediaFavoriteResponseBulkDeleteMultimediaFavoritesArgs = {
  input: DeleteMultimediaFavoritesInput;
};

export type MutateMultimediaFavoriteResponseCreateMultimediaFavoriteArgs = {
  input: CreateMultimediaFavoriteInput;
};

export type MutateMultimediaFavoriteResponseDeleteMultimediaFavoriteArgs = {
  input: DeleteMultimediaFavoriteInput;
};

export type MutateMultimediaFavoriteResponseDeleteOneMultimediaFavoriteArgs = {
  input: DeleteOneMultimediaFavoriteInput;
};

export type MutateMultimediaFavoriteResponseUpdateMultimediaFavoriteArgs = {
  input: UpdateMultimediaFavoriteInput;
};

export type MutateMultimediaRichsnippetResponse = {
  __typename?: 'MutateMultimediaRichsnippetResponse';
  createMultimediaRichsnippet: CreateMultimediaRichsnippetOutput;
  deleteMultimediaRichsnippet: DeleteRichsnippetOutput;
  deleteMultimediaRichsnippets: DeleteRichsnippetOutput;
  increaseRichsnippetScores: Scalars['Boolean']['output'];
  updateMultimediaRichsnippet: UpdateMultimediaRichsnippetOutput;
};

export type MutateMultimediaRichsnippetResponseCreateMultimediaRichsnippetArgs = {
  input: CreateMultimediaRichsnippetInput;
};

export type MutateMultimediaRichsnippetResponseDeleteMultimediaRichsnippetArgs = {
  input: DeleteMultimediaRichsnippetInput;
};

export type MutateMultimediaRichsnippetResponseDeleteMultimediaRichsnippetsArgs = {
  input: BulkDeleteMultimediaRichsnippetInput;
};

export type MutateMultimediaRichsnippetResponseUpdateMultimediaRichsnippetArgs = {
  input: UpdateMultimediaRichsnippetInput;
};

export type MutateMusicEpisodeResponse = {
  __typename?: 'MutateMusicEpisodeResponse';
  bulkDeleteMusicEpisode: DeleteMusicEpisodeOutput;
  createManyMusicEpisode: CreateManyMusicEpisodeOutput;
  createMusicEpisode: CreateMusicEpisodeOutput;
  deleteMusicEpisode: DeleteMusicEpisodeOutput;
  updateManyEpisode: UpdateMusicEpisodeOutput;
  updateMusicEpisode: UpdateMusicEpisodeOutput;
};

export type MutateMusicEpisodeResponseBulkDeleteMusicEpisodeArgs = {
  input: DeleteMusicEpisodesInput;
};

export type MutateMusicEpisodeResponseCreateManyMusicEpisodeArgs = {
  input: CreateManyMusicEpisodeInput;
};

export type MutateMusicEpisodeResponseCreateMusicEpisodeArgs = {
  input: CreateMusicEpisodeInput;
};

export type MutateMusicEpisodeResponseDeleteMusicEpisodeArgs = {
  input: DeleteMusicEpisodeInput;
};

export type MutateMusicEpisodeResponseUpdateManyEpisodeArgs = {
  input: UpdateManyMusicEpisodeInput;
};

export type MutateMusicEpisodeResponseUpdateMusicEpisodeArgs = {
  input: UpdateMusicEpisodeInput;
};

export type MutateMusicLinkResponse = {
  __typename?: 'MutateMusicLinkResponse';
  bulkDeleteMusicLink: DeleteMusicLinkOutput;
  createMusicLink: CreateMusicLinkOutput;
  deleteMusicLink: DeleteMusicLinkOutput;
  updateMusicLink: UpdateMusicLinkOutput;
};

export type MutateMusicLinkResponseBulkDeleteMusicLinkArgs = {
  input: DeleteMusicLinksInput;
};

export type MutateMusicLinkResponseCreateMusicLinkArgs = {
  input: CreateMusicLinkInput;
};

export type MutateMusicLinkResponseDeleteMusicLinkArgs = {
  input: DeleteMusicLinkInput;
};

export type MutateMusicLinkResponseUpdateMusicLinkArgs = {
  input: UpdateMusicLinkInput;
};

export type MutateMusicResponse = {
  __typename?: 'MutateMusicResponse';
  bulkDeleteMusic: DeleteMusicOutput;
  createMusic: CreateMusicOutput;
  deleteMusic: DeleteMusicOutput;
  updateMusic: UpdateMusicOutput;
};

export type MutateMusicResponseBulkDeleteMusicArgs = {
  input: DeleteMusicsInput;
};

export type MutateMusicResponseCreateMusicArgs = {
  input: CreateMusicInput;
};

export type MutateMusicResponseDeleteMusicArgs = {
  input: DeleteMusicInput;
};

export type MutateMusicResponseUpdateMusicArgs = {
  input: UpdateMusicInput;
};

export type MutateNetworkBiographyResponse = {
  __typename?: 'MutateNetworkBiographyResponse';
  createNetworkBiography: CreateNetworkBiographyOutput;
  deleteNetworkBiography: DeleteNetworkBiographyOutput;
  deleteNetworkBiographys: DeleteNetworkBiographyOutput;
  richSnippet: MutateNetworkBiographyRichsnippetResponse;
  updateNetworkBiography: UpdateNetworkBiographyOutput;
};

export type MutateNetworkBiographyResponseCreateNetworkBiographyArgs = {
  input: CreateNetworkBiographyInput;
};

export type MutateNetworkBiographyResponseDeleteNetworkBiographyArgs = {
  input: DeleteNetworkBiographyInput;
};

export type MutateNetworkBiographyResponseDeleteNetworkBiographysArgs = {
  input: DeleteNetworkBiographysInput;
};

export type MutateNetworkBiographyResponseUpdateNetworkBiographyArgs = {
  input: UpdateNetworkBiographyInput;
};

export type MutateNetworkBiographyRichsnippetResponse = {
  __typename?: 'MutateNetworkBiographyRichsnippetResponse';
  createNetworkBiographyRichsnippet: CreateNetworkBiographyRichsnippetOutput;
  deleteNetworkBiographyRichsnippet: DeleteNetworkBiographyRichsnippetOutput;
  deleteNetworkBiographyRichsnippets: DeleteNetworkBiographyRichsnippetOutput;
  increaseNetworkBiographyRichsnippetScores: Scalars['Boolean']['output'];
  updateNetworkBiographyRichsnippet: UpdateNetworkBiographyRichsnippetOutput;
};

export type MutateNetworkBiographyRichsnippetResponseCreateNetworkBiographyRichsnippetArgs = {
  input: CreateNetworkBiographyRichsnippetInput;
};

export type MutateNetworkBiographyRichsnippetResponseDeleteNetworkBiographyRichsnippetArgs = {
  input: DeleteNetworkBiographyRichsnippetInput;
};

export type MutateNetworkBiographyRichsnippetResponseDeleteNetworkBiographyRichsnippetsArgs = {
  input: BulkDeleteNetworkBiographyRichsnippetInput;
};

export type MutateNetworkBiographyRichsnippetResponseUpdateNetworkBiographyRichsnippetArgs = {
  input: UpdateNetworkBiographyRichsnippetInput;
};

export type MutateNotFoundReport = {
  __typename?: 'MutateNotFoundReport';
  createNotFoundReport: CreateNotFoundReportOutput;
  deleteNotFoundReport: DeleteNotFoundReportOutput;
  deleteNotFoundReports: DeleteNotFoundReportOutput;
  updateNotFoundReport: UpdateNotFoundReportOutput;
};

export type MutateNotFoundReportCreateNotFoundReportArgs = {
  input: CreateNotFoundReportInput;
};

export type MutateNotFoundReportDeleteNotFoundReportArgs = {
  input: DeleteNotFoundReportInput;
};

export type MutateNotFoundReportDeleteNotFoundReportsArgs = {
  input: DeleteNotFoundReportsInput;
};

export type MutateNotFoundReportUpdateNotFoundReportArgs = {
  input: UpdateNotFoundReportInput;
};

export type MutateOriginalNetworkResponse = {
  __typename?: 'MutateOriginalNetworkResponse';
  biography: MutateNetworkBiographyResponse;
  bulkDeleteOriginalNetworks: DeleteOriginalNetworkOutput;
  covertImageUrls: CoreOutput;
  createOriginalNetwork: CreateOriginalNetworkOutput;
  deleteOriginalNetwork: DeleteOriginalNetworkOutput;
  updateOriginalNetwork: UpdateOriginalNetworkOutput;
};

export type MutateOriginalNetworkResponseBulkDeleteOriginalNetworksArgs = {
  input: DeleteOriginalNetworksInput;
};

export type MutateOriginalNetworkResponseCreateOriginalNetworkArgs = {
  input: CreateOriginalNetworkInput;
};

export type MutateOriginalNetworkResponseDeleteOriginalNetworkArgs = {
  input: DeleteOriginalNetworkInput;
};

export type MutateOriginalNetworkResponseUpdateOriginalNetworkArgs = {
  input: UpdateOriginalNetworkInput;
};

export type MutatePaperCommentResponse = {
  __typename?: 'MutatePaperCommentResponse';
  createAdminPaperCommentInDatabase: CreatePaperCommentOutput;
  createPaperComment: CoreOutput;
  createPaperCommentInDatabase: CreatePaperCommentOutput;
  deletePaperComment: DeletePaperCommentOutput;
  deletePaperComments: DeletePaperCommentOutput;
  favorite: MutatePaperCommentsFavoriteResponse;
  updatePaperComment: UpdatePaperCommentOutput;
};

export type MutatePaperCommentResponseCreateAdminPaperCommentInDatabaseArgs = {
  input: CreateAdminPaperCommentInput;
};

export type MutatePaperCommentResponseCreatePaperCommentArgs = {
  input: CreatePaperCommentInput;
};

export type MutatePaperCommentResponseCreatePaperCommentInDatabaseArgs = {
  input: CreatePaperCommentInput;
};

export type MutatePaperCommentResponseDeletePaperCommentArgs = {
  input: DeletePaperCommentInput;
};

export type MutatePaperCommentResponseDeletePaperCommentsArgs = {
  input: DeletePaperCommentsInput;
};

export type MutatePaperCommentResponseUpdatePaperCommentArgs = {
  input: UpdatePaperCommentInput;
};

export type MutatePaperCommentsFavoriteResponse = {
  __typename?: 'MutatePaperCommentsFavoriteResponse';
  bulkDeletePaperCommentsFavorites: DeletePaperCommentsFavoriteOutput;
  createPaperCommentsFavorite: CreatePaperCommentsFavoriteOutput;
  deletePaperCommentsFavorite: DeletePaperCommentsFavoriteOutput;
  updatePaperCommentsFavorite: UpdatePaperCommentsFavoriteOutput;
};

export type MutatePaperCommentsFavoriteResponseBulkDeletePaperCommentsFavoritesArgs = {
  input: DeletePaperCommentsFavoritesInput;
};

export type MutatePaperCommentsFavoriteResponseCreatePaperCommentsFavoriteArgs = {
  input: CreatePaperCommentsFavoriteInput;
};

export type MutatePaperCommentsFavoriteResponseDeletePaperCommentsFavoriteArgs = {
  input: DeletePaperCommentsFavoriteInput;
};

export type MutatePaperCommentsFavoriteResponseUpdatePaperCommentsFavoriteArgs = {
  input: UpdatePaperCommentsFavoriteInput;
};

export type MutatePaperEditorChoiceResponse = {
  __typename?: 'MutatePaperEditorChoiceResponse';
  bulkDeletePaperEditorChoice: DeletePaperEditorChoiceOutput;
  createPaperEditorChoice: CreatePaperEditorChoiceOutput;
  deletePaperEditorChoice: DeletePaperEditorChoiceOutput;
  updatePaperEditorChoice: UpdatePaperEditorChoiceOutput;
};

export type MutatePaperEditorChoiceResponseBulkDeletePaperEditorChoiceArgs = {
  input: BulkDeletePaperEditorChoicesInput;
};

export type MutatePaperEditorChoiceResponseCreatePaperEditorChoiceArgs = {
  input: CreatePaperEditorChoiceInput;
};

export type MutatePaperEditorChoiceResponseDeletePaperEditorChoiceArgs = {
  input: DeletePaperEditorChoiceInput;
};

export type MutatePaperEditorChoiceResponseUpdatePaperEditorChoiceArgs = {
  input: UpdatePaperEditorChoiceInput;
};

export type MutatePaperFavoriteResponse = {
  __typename?: 'MutatePaperFavoriteResponse';
  bulkDeletePaperFavorites: DeletePaperFavoriteOutput;
  createPaperFavorite: CreatePaperFavoriteOutput;
  deleteOnePaperFavorite: DeletePaperFavoriteOutput;
  deletePaperFavorite: DeletePaperFavoriteOutput;
  updatePaperFavorite: UpdatePaperFavoriteOutput;
};

export type MutatePaperFavoriteResponseBulkDeletePaperFavoritesArgs = {
  input: DeletePaperFavoritesInput;
};

export type MutatePaperFavoriteResponseCreatePaperFavoriteArgs = {
  input: CreatePaperFavoriteInput;
};

export type MutatePaperFavoriteResponseDeleteOnePaperFavoriteArgs = {
  input: DeleteOnePaperFavoriteInput;
};

export type MutatePaperFavoriteResponseDeletePaperFavoriteArgs = {
  input: DeletePaperFavoriteInput;
};

export type MutatePaperFavoriteResponseUpdatePaperFavoriteArgs = {
  input: UpdatePaperFavoriteInput;
};

export type MutatePaperLinksResponse = {
  __typename?: 'MutatePaperLinksResponse';
  bulkDeletePaperLinks: DeletePaperLinkOutput;
  createPaperLink: CreatePaperLinkOutput;
  deletePaperLink: DeletePaperLinkOutput;
  updatePaperLink: UpdatePaperLinkOutput;
};

export type MutatePaperLinksResponseBulkDeletePaperLinksArgs = {
  input: DeletePaperLinksInput;
};

export type MutatePaperLinksResponseCreatePaperLinkArgs = {
  input: CreatePaperLinkInput;
};

export type MutatePaperLinksResponseDeletePaperLinkArgs = {
  input: DeletePaperLinkInput;
};

export type MutatePaperLinksResponseUpdatePaperLinkArgs = {
  input: UpdatePaperLinkInput;
};

export type MutatePaperResponse = {
  __typename?: 'MutatePaperResponse';
  category: MutateCategoryResponse;
  comments: MutatePaperCommentResponse;
  createPaper: CreatePaperOutput;
  deletePaper: DeletePaperOutput;
  deletePapers: DeletePaperOutput;
  editorChoice: MutatePaperEditorChoiceResponse;
  favorite: MutatePaperFavoriteResponse;
  paperLinks: MutatePaperLinksResponse;
  pin: MutatePinResponse;
  richsnippet: MutatePaperRichsnippetResponse;
  showcase: MutatePaperShowcaseResponse;
  updatePaper: UpdatePaperOutput;
  visitStatistics: MutatePaperVisitStatisticsResponse;
};

export type MutatePaperResponseCreatePaperArgs = {
  input: CreatePaperInput;
};

export type MutatePaperResponseDeletePaperArgs = {
  input: DeletePaperInput;
};

export type MutatePaperResponseDeletePapersArgs = {
  input: BulkDeletePaperInput;
};

export type MutatePaperResponseUpdatePaperArgs = {
  input: UpdatePaperInput;
};

export type MutatePaperRichsnippetResponse = {
  __typename?: 'MutatePaperRichsnippetResponse';
  createPaperRichsnippet: CreatePaperRichsnippetOutput;
  deletePaperRichsnippet: DeletePaperRichsnippetOutput;
  deletePaperRichsnippets: DeletePaperRichsnippetOutput;
  updatePaperRichsnippet: UpdatePaperRichsnippetOutput;
};

export type MutatePaperRichsnippetResponseCreatePaperRichsnippetArgs = {
  input: CreatePaperRichsnippetInput;
};

export type MutatePaperRichsnippetResponseDeletePaperRichsnippetArgs = {
  input: DeletePaperRichsnippetInput;
};

export type MutatePaperRichsnippetResponseDeletePaperRichsnippetsArgs = {
  input: BulkDeletePaperRichsnippetInput;
};

export type MutatePaperRichsnippetResponseUpdatePaperRichsnippetArgs = {
  input: UpdatePaperRichsnippetInput;
};

export type MutatePaperShowcaseResponse = {
  __typename?: 'MutatePaperShowcaseResponse';
  createPaperShowcase: CreatePaperShowcaseOutput;
  deletePaperShowcase: DeletePaperShowcaseOutput;
  deletePaperShowcases: DeletePaperShowcaseOutput;
  updatePaperShowcase: UpdatePaperShowcaseOutput;
};

export type MutatePaperShowcaseResponseCreatePaperShowcaseArgs = {
  input: CreatePaperShowcaseInput;
};

export type MutatePaperShowcaseResponseDeletePaperShowcaseArgs = {
  input: DeletePaperShowcaseInput;
};

export type MutatePaperShowcaseResponseDeletePaperShowcasesArgs = {
  input: BulkDeletePaperShowcaseInput;
};

export type MutatePaperShowcaseResponseUpdatePaperShowcaseArgs = {
  input: UpdatePaperShowcaseInput;
};

export type MutatePaperVisitStatisticsResponse = {
  __typename?: 'MutatePaperVisitStatisticsResponse';
  createPaperVisitStatistics: CreatePaperVisitStatisticsOutput;
  deletePaperVisitStatistics: DeletePaperVisitStatisticsOutput;
  recordPaperVisitStatistics: CreatePaperVisitStatisticsOutput;
  updatePaperVisitStatistics: UpdatePaperVisitStatisticsOutput;
};

export type MutatePaperVisitStatisticsResponseCreatePaperVisitStatisticsArgs = {
  input: CreatePaperVisitStatisticsInput;
};

export type MutatePaperVisitStatisticsResponseDeletePaperVisitStatisticsArgs = {
  input: DeletePaperVisitStatisticsInput;
};

export type MutatePaperVisitStatisticsResponseRecordPaperVisitStatisticsArgs = {
  input: CreatePaperVisitStatisticsInput;
};

export type MutatePaperVisitStatisticsResponseUpdatePaperVisitStatisticsArgs = {
  input: UpdatePaperVisitStatisticsInput;
};

export type MutatePersonsBank = {
  __typename?: 'MutatePersonsBank';
  createPerson: CreatePersonOutput;
  deletePerson: DeletePersonOutput;
  deletePersons: DeletePersonOutput;
  transferCrewsToPersonsBank: DeletePersonOutput;
  updatePerson: UpdatePersonOutput;
};

export type MutatePersonsBankCreatePersonArgs = {
  input: CreatePersonInput;
};

export type MutatePersonsBankDeletePersonArgs = {
  input: DeletePersonInput;
};

export type MutatePersonsBankDeletePersonsArgs = {
  input: BulkDeletePersonInput;
};

export type MutatePersonsBankUpdatePersonArgs = {
  input: UpdatePersonInput;
};

export type MutatePinResponse = {
  __typename?: 'MutatePinResponse';
  createPin: CreatePinOutput;
  deletePin: DeletePinOutput;
  deletePins: DeletePinOutput;
  updatePin: UpdatePinOutput;
};

export type MutatePinResponseCreatePinArgs = {
  input: CreatePinInput;
};

export type MutatePinResponseDeletePinArgs = {
  input: DeletePinInput;
};

export type MutatePinResponseDeletePinsArgs = {
  input: DeletePinsInput;
};

export type MutatePinResponseUpdatePinArgs = {
  input: UpdatePinInput;
};

export type MutatePodcast = {
  __typename?: 'MutatePodcast';
  createPodcast: CreatePodcastOutput;
  deletePodcast: DeletePodcastOutput;
  deletePodcasts: DeletePodcastOutput;
  updatePodcast: UpdatePodcastOutput;
};

export type MutatePodcastCreatePodcastArgs = {
  input: CreatePodcastInput;
};

export type MutatePodcastDeletePodcastArgs = {
  input: DeletePodcastInput;
};

export type MutatePodcastDeletePodcastsArgs = {
  input: BulkDeletePodcastInput;
};

export type MutatePodcastUpdatePodcastArgs = {
  input: UpdatePodcastInput;
};

export type MutateProducerCompanyResponse = {
  __typename?: 'MutateProducerCompanyResponse';
  bulkDeleteProducerCompany: DeleteProducerCompanyOutput;
  createProducerCompany: CreateProducerCompanyOutput;
  deleteProducerCompany: DeleteProducerCompanyOutput;
  updateProducerCompany: UpdateProducerCompanyOutput;
};

export type MutateProducerCompanyResponseBulkDeleteProducerCompanyArgs = {
  input: DeleteProducerCompanysInput;
};

export type MutateProducerCompanyResponseCreateProducerCompanyArgs = {
  input: CreateProducerCompanyInput;
};

export type MutateProducerCompanyResponseDeleteProducerCompanyArgs = {
  input: DeleteProducerCompanyInput;
};

export type MutateProducerCompanyResponseUpdateProducerCompanyArgs = {
  input: UpdateProducerCompanyInput;
};

export type MutateRedirectResponse = {
  __typename?: 'MutateRedirectResponse';
  createRedirect: CreateRedirectOutput;
  deleteRedirect: DeleteRedirectOutput;
  deleteRedirects: DeleteRedirectOutput;
  updateRedirect: UpdateRedirectOutput;
};

export type MutateRedirectResponseCreateRedirectArgs = {
  input: CreateRedirectInput;
};

export type MutateRedirectResponseDeleteRedirectArgs = {
  input: DeleteRedirectInput;
};

export type MutateRedirectResponseDeleteRedirectsArgs = {
  input: BulkDeleteRedirectsInput;
};

export type MutateRedirectResponseUpdateRedirectArgs = {
  input: UpdateRedirectInput;
};

export type MutateRolesResponse = {
  __typename?: 'MutateRolesResponse';
  covertImageUrls: CoreOutput;
  createRole: CreateRolesOutput;
  deleteRole: DeleteRolesOutput;
  deleteRoles: DeleteRolesOutput;
  updateRole: UpdateRolesOutput;
};

export type MutateRolesResponseCreateRoleArgs = {
  input: CreateRolesInput;
};

export type MutateRolesResponseDeleteRoleArgs = {
  input: DeleteRolesInput;
};

export type MutateRolesResponseDeleteRolesArgs = {
  input: BulkDeleteRolesInput;
};

export type MutateRolesResponseUpdateRoleArgs = {
  input: UpdateRolesInput;
};

export type MutateSearchAnalytics = {
  __typename?: 'MutateSearchAnalytics';
  createSearchAnalytics: CreateSearchAnalyticsOutput;
  recordSearchTarget: RecordSearchTargetOutput;
};

export type MutateSearchAnalyticsCreateSearchAnalyticsArgs = {
  input: CreateSearchAnalyticsInput;
};

export type MutateSearchAnalyticsRecordSearchTargetArgs = {
  input: RecordSearchTargetInput;
};

export type MutateSeedResponse = {
  __typename?: 'MutateSeedResponse';
  addAllCrewToElastic: CoreOutput;
  addAllMultimediaToElastic: CoreOutput;
  createBiographyForAllCrews: CoreOutput;
  removeExtraCategories: CoreOutput;
  removeExtraCountries: CoreOutput;
  updateAllImagesUrlDomain: CoreOutput;
};

export type MutateSeoDataResponse = {
  __typename?: 'MutateSeoDataResponse';
  bulkDeleteSeoData: DeleteSeoDataOutput;
  createSeoData: CreateSeoDataOutput;
  deleteSeoData: DeleteSeoDataOutput;
  updateSeoData: UpdateSeoDataOutput;
};

export type MutateSeoDataResponseBulkDeleteSeoDataArgs = {
  input: BulkDeleteSeoDataInput;
};

export type MutateSeoDataResponseCreateSeoDataArgs = {
  input: CreateSeoDataInput;
};

export type MutateSeoDataResponseDeleteSeoDataArgs = {
  input: DeleteSeoDataInput;
};

export type MutateSeoDataResponseUpdateSeoDataArgs = {
  input: UpdateSeoDataInput;
};

export type MutateSeoResponse = {
  __typename?: 'MutateSeoResponse';
  createHomePageSeo: CreateHomePageSeoOutput;
  createHompageSeoBox: CreateSeoBoxOutput;
  createMagSeo: CreateHomePageSeoOutput;
  createMagSeoBox: CreateSeoBoxOutput;
  deleteHomePageSeo: DeleteHomePageSeoOutput;
  deleteHomePageSeoBox: CoreOutput;
  deleteMagSeo: DeleteHomePageSeoOutput;
  deleteMagSeoBox: CoreOutput;
  updateHomePageSeo: UpdateHomePageSeoOutput;
  updateHomePageSeoBox: UpdateSeoBoxOutput;
  updateMagSeo: UpdateHomePageSeoOutput;
  updateMagSeoBox: UpdateSeoBoxOutput;
};

export type MutateSeoResponseCreateHomePageSeoArgs = {
  input: CreateHomePageSeoInput;
};

export type MutateSeoResponseCreateHompageSeoBoxArgs = {
  input: CreateSeoBoxInput;
};

export type MutateSeoResponseCreateMagSeoArgs = {
  input: CreateMagSeoInput;
};

export type MutateSeoResponseCreateMagSeoBoxArgs = {
  input: CreateSeoBoxInput;
};

export type MutateSeoResponseUpdateHomePageSeoArgs = {
  input: UpdateHomePageSeoInput;
};

export type MutateSeoResponseUpdateHomePageSeoBoxArgs = {
  input: UpdateSeoBoxInput;
};

export type MutateSeoResponseUpdateMagSeoArgs = {
  input: UpdateMagSeoInput;
};

export type MutateSeoResponseUpdateMagSeoBoxArgs = {
  input: UpdateSeoBoxInput;
};

export type MutateSeoSettingsResponse = {
  __typename?: 'MutateSeoSettingsResponse';
  bulkDeleteSeoSettings: DeleteSeoSettingsOutput;
  createSeoSettings: CreateSeoSettingsOutput;
  deleteSeoSettings: DeleteSeoSettingsOutput;
  updateSeoSettings: UpdateSeoSettingsOutput;
};

export type MutateSeoSettingsResponseBulkDeleteSeoSettingsArgs = {
  input: BulkDeleteSeoSettingsInput;
};

export type MutateSeoSettingsResponseCreateSeoSettingsArgs = {
  input: CreateSeoSettingsInput;
};

export type MutateSeoSettingsResponseDeleteSeoSettingsArgs = {
  input: DeleteSeoSettingsInput;
};

export type MutateSeoSettingsResponseUpdateSeoSettingsArgs = {
  input: UpdateSeoSettingsInput;
};

export type MutateShowcaseResponse = {
  __typename?: 'MutateShowcaseResponse';
  createShowcase: CreateShowcaseOutput;
  deleteShowcase: DeleteShowcaseOutput;
  deleteShowcases: DeleteShowcaseOutput;
  updateShowcase: UpdateShowcaseOutput;
};

export type MutateShowcaseResponseCreateShowcaseArgs = {
  input: CreateShowcaseInput;
};

export type MutateShowcaseResponseDeleteShowcaseArgs = {
  input: DeleteShowcaseInput;
};

export type MutateShowcaseResponseDeleteShowcasesArgs = {
  input: BulkDeleteShowcaseInput;
};

export type MutateShowcaseResponseUpdateShowcaseArgs = {
  input: UpdateShowcaseInput;
};

export type MutateSuggestToWatch = {
  __typename?: 'MutateSuggestToWatch';
  createSuggestToWatch: CreateSuggestToWatchOutput;
  deleteBulkSuggestToWatch: DeleteSuggestToWatchOutput;
  deleteSuggestToWatch: DeleteSuggestToWatchOutput;
  updateSuggestToWatch: UpdateSuggestToWatchOutput;
};

export type MutateSuggestToWatchCreateSuggestToWatchArgs = {
  input: CreateSuggestToWatchInput;
};

export type MutateSuggestToWatchDeleteBulkSuggestToWatchArgs = {
  input: DeleteBulkSuggestToWatchInput;
};

export type MutateSuggestToWatchDeleteSuggestToWatchArgs = {
  input: DeleteSuggestToWatchInput;
};

export type MutateSuggestToWatchUpdateSuggestToWatchArgs = {
  input: UpdateSuggestToWatchInput;
};

export type MutateSurvey = {
  __typename?: 'MutateSurvey';
  createSurvey: CreateSurveyOutput;
  deleteSurvey: DeleteSurveyOutput;
  deleteSurveys: DeleteSurveyOutput;
  surveyComments: MutateSurveyCommentsResponse;
  updateSurvey: UpdateSurveyOutput;
  vote: CreateOrUpdateVotingOutput;
};

export type MutateSurveyCreateSurveyArgs = {
  input: CreateSurveyInput;
};

export type MutateSurveyDeleteSurveyArgs = {
  input: DeleteSurveyInput;
};

export type MutateSurveyDeleteSurveysArgs = {
  input: DeleteSurveysInput;
};

export type MutateSurveyUpdateSurveyArgs = {
  input: UpdateSurveyInput;
};

export type MutateSurveyVoteArgs = {
  input: CreateOrUpdateVotingInput;
};

export type MutateSurveyCommentsFavoriteResponse = {
  __typename?: 'MutateSurveyCommentsFavoriteResponse';
  bulkDeleteSurveyCommentsFavorites: DeleteSurveyCommentsFavoriteOutput;
  createSurveyCommentsFavorite: CreateSurveyCommentsFavoriteOutput;
  deleteSurveyCommentsFavorite: DeleteSurveyCommentsFavoriteOutput;
  updateSurveyCommentsFavorite: UpdateSurveyCommentsFavoriteOutput;
};

export type MutateSurveyCommentsFavoriteResponseBulkDeleteSurveyCommentsFavoritesArgs = {
  input: DeleteSurveyCommentsFavoritesInput;
};

export type MutateSurveyCommentsFavoriteResponseCreateSurveyCommentsFavoriteArgs = {
  input: CreateSurveyCommentsFavoriteInput;
};

export type MutateSurveyCommentsFavoriteResponseDeleteSurveyCommentsFavoriteArgs = {
  input: DeleteSurveyCommentsFavoriteInput;
};

export type MutateSurveyCommentsFavoriteResponseUpdateSurveyCommentsFavoriteArgs = {
  input: UpdateSurveyCommentsFavoriteInput;
};

export type MutateSurveyCommentsResponse = {
  __typename?: 'MutateSurveyCommentsResponse';
  createAdminSurveyComment: CreateSurveyCommentOutput;
  createSurveyComment: CreateSurveyCommentOutput;
  deleteSurveyComment: DeleteSurveyCommentOutput;
  deleteSurveyComments: DeleteSurveyCommentOutput;
  editSurveyComment: EditSurveyCommentOutput;
  favorite: MutateSurveyCommentsFavoriteResponse;
  removeSurveyComment: DeleteSurveyCommentOutput;
  updateSurveyComment: UpdateSurveyCommentOutput;
};

export type MutateSurveyCommentsResponseCreateAdminSurveyCommentArgs = {
  input: CreateAdminSurveyCommentInput;
};

export type MutateSurveyCommentsResponseCreateSurveyCommentArgs = {
  input: CreateSurveyCommentInput;
};

export type MutateSurveyCommentsResponseDeleteSurveyCommentArgs = {
  input: DeleteSurveyCommentInput;
};

export type MutateSurveyCommentsResponseDeleteSurveyCommentsArgs = {
  input: DeleteSurveyCommentsInput;
};

export type MutateSurveyCommentsResponseEditSurveyCommentArgs = {
  input: EditSurveyCommentInput;
};

export type MutateSurveyCommentsResponseRemoveSurveyCommentArgs = {
  input: RemoveSurveyCommentInput;
};

export type MutateSurveyCommentsResponseUpdateSurveyCommentArgs = {
  input: UpdateSurveyCommentInput;
};

export type MutateTagFilterResponse = {
  __typename?: 'MutateTagFilterResponse';
  createTagFilter: CreateTagFilterOutput;
  deleteTagFilter: DeleteTagFilterOutput;
  deleteTagFilters: DeleteTagFilterOutput;
  updateTagFilter: UpdateTagFilterOutput;
};

export type MutateTagFilterResponseCreateTagFilterArgs = {
  input: CreateTagFilterInput;
};

export type MutateTagFilterResponseDeleteTagFilterArgs = {
  input: DeleteTagFilterInput;
};

export type MutateTagFilterResponseDeleteTagFiltersArgs = {
  input: DeleteTagFiltersInput;
};

export type MutateTagFilterResponseUpdateTagFilterArgs = {
  input: UpdateTagFilterInput;
};

export type MutateTags = {
  __typename?: 'MutateTags';
  covertImageUrls: CoreOutput;
  createTag: CreateTagOutput;
  deleteTag: DeleteTagOutput;
  deleteTags: DeleteTagOutput;
  updateTag: UpdateTagOutput;
  updateTagStatus: CoreOutput;
};

export type MutateTagsCreateTagArgs = {
  input: CreateTagInput;
};

export type MutateTagsDeleteTagArgs = {
  input: DeleteTagInput;
};

export type MutateTagsDeleteTagsArgs = {
  input: DeleteTagsInput;
};

export type MutateTagsUpdateTagArgs = {
  input: UpdateTagInput;
};

export type MutateTextTrackingResponse = {
  __typename?: 'MutateTextTrackingResponse';
  createTextTracking: CreateTextTrackingOutput;
  deletePaperShowcase: DeleteTextTrackingOutput;
  deleteTextTracking: DeleteTextTrackingOutput;
  updateTextTracking: UpdateTextTrackingOutput;
};

export type MutateTextTrackingResponseCreateTextTrackingArgs = {
  input: CreateTextTrackingInput;
};

export type MutateTextTrackingResponseDeletePaperShowcaseArgs = {
  input: DeleteTextTrackingInput;
};

export type MutateTextTrackingResponseDeleteTextTrackingArgs = {
  input: BulkDeleteTextTrackingInput;
};

export type MutateTextTrackingResponseUpdateTextTrackingArgs = {
  input: UpdateTextTrackingInput;
};

export type MutateTrendLinks = {
  __typename?: 'MutateTrendLinks';
  createTrendLink: CreateTrendLinksOutput;
  deleteTrendLink: DeleteTrendLinksOutput;
  updateTrendLink: UpdateTrendLinksOutput;
};

export type MutateTrendLinksCreateTrendLinkArgs = {
  input: CreateTrendLinksInput;
};

export type MutateTrendLinksDeleteTrendLinkArgs = {
  input: DeleteTrendLinksInput;
};

export type MutateTrendLinksUpdateTrendLinkArgs = {
  input: UpdateTrendLinksInput;
};

export type MutateUserImage = {
  __typename?: 'MutateUserImage';
  deleteImage: DeleteUserImagesOutput;
  deleteImageByUser: DeleteUserImagesOutput;
  updateImage: UploadUserImageOutput;
  updateStatus: UpdateUserImageOutput;
  uploadImage: UploadUserImageOutput;
};

export type MutateUserImageDeleteImageArgs = {
  input: DeleteUserImageInput;
};

export type MutateUserImageUpdateImageArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
};

export type MutateUserImageUpdateStatusArgs = {
  input: UpdateUserImageInput;
};

export type MutateUserImageUploadImageArgs = {
  file: Scalars['Upload']['input'];
};

export type MutateUserResponse = {
  __typename?: 'MutateUserResponse';
  createUser: CreateUserOutput;
  deleteUser: DeleteUserOutput;
  deleteUsers: DeleteUserOutput;
  updateOperatorUser: UpdateUserOutput;
  updateUser: UpdateUserOutput;
};

export type MutateUserResponseCreateUserArgs = {
  input: CreateUserByCeo;
};

export type MutateUserResponseDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutateUserResponseDeleteUsersArgs = {
  input: BulkDeleteUsersInput;
};

export type MutateUserResponseUpdateOperatorUserArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  input: UpdateUserInput;
};

export type MutateUserResponseUpdateUserArgs = {
  input: UpdateUserByCeo;
};

export type MutateVideoGalleryResponse = {
  __typename?: 'MutateVideoGalleryResponse';
  createGallery: CreateVideoGalleyOutput;
  createVideo: CreateVideoOutput;
  deleteGalleries: DeleteGalleryOutput;
  deleteGallery: DeleteGalleryOutput;
  deleteVideo: DeleteVideoOutput;
  deleteVideos: DeleteVideoOutput;
  transferEpisodeTrailersToVideos: CoreOutput;
  updateGallery: UpdateVideoGalleryOutput;
  updateVideo: UpdateVideoOutput;
};

export type MutateVideoGalleryResponseCreateGalleryArgs = {
  input: CreateVideoGalleyInput;
};

export type MutateVideoGalleryResponseCreateVideoArgs = {
  input: CreateVideoInput;
};

export type MutateVideoGalleryResponseDeleteGalleriesArgs = {
  input: DeleteGalleriesInput;
};

export type MutateVideoGalleryResponseDeleteGalleryArgs = {
  input: DeleteGalleryInput;
};

export type MutateVideoGalleryResponseDeleteVideoArgs = {
  input: DeleteVideoInput;
};

export type MutateVideoGalleryResponseDeleteVideosArgs = {
  input: DeleteVideosInput;
};

export type MutateVideoGalleryResponseUpdateGalleryArgs = {
  input: UpdateVideoGalleryInput;
};

export type MutateVideoGalleryResponseUpdateVideoArgs = {
  input: UpdateVideoInput;
};

export type MutateWidgets = {
  __typename?: 'MutateWidgets';
  createWidget: WidgetsOutput;
  deleteWidget: WidgetsOutput;
  updateWidget: WidgetsOutput;
};

export type MutateWidgetsCreateWidgetArgs = {
  input: WidgetsInput;
};

export type MutateWidgetsUpdateWidgetArgs = {
  input: WidgetsInput;
};

export type MutateYearsResponse = {
  __typename?: 'MutateYearsResponse';
  covertImageUrls: CoreOutput;
  createYear: CreateYearOutput;
  deleteYear: DeleteYearOutput;
  deleteYears: DeleteYearOutput;
  updateYear: UpdateYearOutput;
};

export type MutateYearsResponseCreateYearArgs = {
  input: CreateYearInput;
};

export type MutateYearsResponseDeleteYearArgs = {
  input: DeleteYearInput;
};

export type MutateYearsResponseDeleteYearsArgs = {
  input: DeleteYearsInput;
};

export type MutateYearsResponseUpdateYearArgs = {
  input: UpdateYearInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  album: MutateAlbumResponse;
  albumList: MutateAlbumListResponse;
  analytics: MutateAnalytics;
  auth: AuthMutation;
  bugReport: MutateBugReportResponse;
  contacts: MutateContacts;
  devices: DeviceMutation;
  embed: MutateEmbedResponse;
  image: MutateImage;
  internalLinks: MutateInternalLinkResponse;
  mainMenus: MutateMainMenu;
  media: MutateMedia;
  menu: MutateMenu;
  notFoundReports: MutateNotFoundReport;
  papers: MutatePaperResponse;
  personsBank: MutatePersonsBank;
  redirects: MutateRedirectResponse;
  searchAnalytics: MutateSearchAnalytics;
  seed: MutateSeedResponse;
  seo: MutateSeoResponse;
  seoData: MutateSeoDataResponse;
  seoSettings: MutateSeoSettingsResponse;
  tags: MutateTags;
  textTracking: MutateTextTrackingResponse;
  trendLinks: MutateTrendLinks;
  userImages: MutateUserImage;
  users: MutateUserResponse;
  videoGallery: MutateVideoGalleryResponse;
  widgets: MutateWidgets;
};

export type MutimediaAlbumOutput = {
  __typename?: 'MutimediaAlbumOutput';
  count?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Array<AlbumType>>;
};

export type MutimediaVideosOutput = {
  __typename?: 'MutimediaVideosOutput';
  count?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<VideoObjectType>>;
};

export type NetworkBiographyResponse = {
  __typename?: 'NetworkBiographyResponse';
  findByNetworkSlug: FindBiographyByNetworkSlugOutput;
  findNetworkBiographyById: FindNetworkBiographyOutput;
  richSnippet: NetworkBiographyRichsnippetResponse;
  searchNetworkBiography: SearchNetworkBiographyOutput;
};

export type NetworkBiographyResponseFindByNetworkSlugArgs = {
  input: FindBiographyByNetworkSlugInput;
};

export type NetworkBiographyResponseFindNetworkBiographyByIdArgs = {
  input: FindNetworkBiographyInput;
};

export type NetworkBiographyResponseSearchNetworkBiographyArgs = {
  input: SearchNetworkBiographyInput;
};

export type NetworkBiographyRichsnippetResponse = {
  __typename?: 'NetworkBiographyRichsnippetResponse';
  findNetworkBiographyRichsnippetById: FindNetworkBiographyRichsnippetOutput;
  findNetworkBiographyRichsnippetByIds: Array<NetworkBiographyRichsnippetType>;
  getNetworkBiographyVotesDetails: Array<NetworkBiographyVotesDetails>;
  searchNetworkBiographyRichsnippet: SearchNetworkBiographyRichsnippetOutput;
};

export type NetworkBiographyRichsnippetResponseFindNetworkBiographyRichsnippetByIdArgs = {
  input: FindNetworkBiographyRichsnippetInput;
};

export type NetworkBiographyRichsnippetResponseFindNetworkBiographyRichsnippetByIdsArgs = {
  input: FindNetworkBiographyRichsnippetGroupInput;
};

export type NetworkBiographyRichsnippetResponseSearchNetworkBiographyRichsnippetArgs = {
  input: SearchNetworkBiographyRichsnippetInput;
};

export type NetworkBiographyRichsnippetType = {
  __typename?: 'NetworkBiographyRichsnippetType';
  _id: Scalars['Int']['output'];
  biography: NetworkBiographyType;
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  score: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type NetworkBiographyScore = {
  __typename?: 'NetworkBiographyScore';
  percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  votesCount?: Maybe<Scalars['Int']['output']>;
};

export type NetworkBiographyType = {
  __typename?: 'NetworkBiographyType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  festival?: Maybe<FestivalObject>;
  multimedia?: Maybe<Array<MultimediaType>>;
  originalNetwork?: Maybe<OriginalNetworkType>;
  richsnippets?: Maybe<RichsnippetType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type NetworkBiographyVotesDetails = {
  __typename?: 'NetworkBiographyVotesDetails';
  biography?: Maybe<Scalars['Int']['output']>;
  scoreGroup?: Maybe<Array<NetworkBiographyScore>>;
  totalVotesCount?: Maybe<Scalars['Int']['output']>;
};

export type NotFoundReport = {
  __typename?: 'NotFoundReport';
  findNotFoundReportById: FindNotFoundReportOutput;
  searchNotFoundReport: SearchNotFoundReportOutput;
};

export type NotFoundReportFindNotFoundReportByIdArgs = {
  input: FindNotFoundReportInput;
};

export type NotFoundReportSearchNotFoundReportArgs = {
  input: SearchNotFoundReportInput;
};

export enum NotFoundReportSortType {
  LeastCount = 'LEAST_COUNT',
  MostCount = 'MOST_COUNT',
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
}

export type NotFoundReportType = {
  __typename?: 'NotFoundReportType';
  _id: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type OnlinePlayOptions = {
  __typename?: 'OnlinePlayOptions';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  borderColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  contentTextColor?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  isAutoPlay?: Maybe<Scalars['Boolean']['output']>;
  isMuteInitialPlay?: Maybe<Scalars['Boolean']['output']>;
  isOnlinePlayTitleVisible?: Maybe<Scalars['Boolean']['output']>;
};

export type OnlinePlayOptionsInputType = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  borderColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  buttonTextColor?: InputMaybe<Scalars['String']['input']>;
  contentTextColor?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  isAutoPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isMuteInitialPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isOnlinePlayTitleVisible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OriginalNetworkResponse = {
  __typename?: 'OriginalNetworkResponse';
  biography: NetworkBiographyResponse;
  findOriginalNetworkById: FindOriginalNetworkOutput;
  findOriginalNetworkByIds: Array<OriginalNetworkType>;
  findOriginalNetworkBySlug: FindOriginalNetworkOutput;
  searchOriginalNetwork: SearchOriginalNetworkOutput;
};

export type OriginalNetworkResponseFindOriginalNetworkByIdArgs = {
  input: FindOriginalNetworkInput;
};

export type OriginalNetworkResponseFindOriginalNetworkByIdsArgs = {
  input: FindOriginalNetworksInput;
};

export type OriginalNetworkResponseFindOriginalNetworkBySlugArgs = {
  input: FindOriginalNetworkBySlugInput;
};

export type OriginalNetworkResponseSearchOriginalNetworkArgs = {
  input: SearchOriginalNetworkInput;
};

export type OriginalNetworkType = {
  __typename?: 'OriginalNetworkType';
  CEOs?: Maybe<Array<Scalars['String']['output']>>;
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  establishedYear?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  headOffice?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['Float']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  socialMediaAccounts?: Maybe<Array<Scalars['String']['output']>>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type OsResult = {
  __typename?: 'OsResult';
  name: Scalars['String']['output'];
  platform: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type PaginationInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type PaperCategoryType = {
  __typename?: 'PaperCategoryType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<PaperCategoryType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  type: PaperContentType;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PaperCommentResponse = {
  __typename?: 'PaperCommentResponse';
  favorite: PaperCommentsFavoriteResponse;
  findPaperCommentsById: FindPaperCommentsOutput;
  findPaperCommentsByIds: Array<PaperCommentsType>;
  searchPaperComments: SearchPaperCommentOutput;
};

export type PaperCommentResponseFindPaperCommentsByIdArgs = {
  input: FindPaperCommentInput;
};

export type PaperCommentResponseFindPaperCommentsByIdsArgs = {
  input: FindPaperCommentsInput;
};

export type PaperCommentResponseSearchPaperCommentsArgs = {
  input: SearchPaperCommentInput;
};

export type PaperCommentsFavoriteResponse = {
  __typename?: 'PaperCommentsFavoriteResponse';
  findPaperCommentsFavoriteById: FindPaperCommentsFavoritesOutput;
  findPaperCommentsFavoriteByIds: Array<PaperCommentsFavoriteType>;
  searchPaperCommentsFavorite: SearchPaperCommentsFavoriteOutput;
};

export type PaperCommentsFavoriteResponseFindPaperCommentsFavoriteByIdArgs = {
  input: FindPaperCommentsFavoriteInput;
};

export type PaperCommentsFavoriteResponseFindPaperCommentsFavoriteByIdsArgs = {
  input: FindPaperCommentsFavoritesInput;
};

export type PaperCommentsFavoriteResponseSearchPaperCommentsFavoriteArgs = {
  input: SearchPaperCommentsFavoriteInput;
};

export type PaperCommentsFavoriteType = {
  __typename?: 'PaperCommentsFavoriteType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  comment: PaperCommentsType;
  createdAt?: Maybe<Scalars['String']['output']>;
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type PaperCommentsType = {
  __typename?: 'PaperCommentsType';
  _id: Scalars['Int']['output'];
  approved?: Maybe<BooleanEnum>;
  author: Scalars['String']['output'];
  authorEmail?: Maybe<Scalars['String']['output']>;
  childs?: Maybe<Array<PaperCommentsType>>;
  client: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  favoriteCount?: Maybe<Scalars['Float']['output']>;
  isUserFavorite: Scalars['Boolean']['output'];
  paper: PaperType;
  parent?: Maybe<PaperCommentsType>;
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export enum PaperContentType {
  Article = 'ARTICLE',
  News = 'NEWS',
  Paper = 'PAPER',
}

export type PaperEditorChoiceResponse = {
  __typename?: 'PaperEditorChoiceResponse';
  findPaperEditorChoiceById: FindPaperEditorChoiceOutput;
  findPaperEditorChoiceByIds: Array<PaperEditorChoiceType>;
  searchPaperEditorChoice: SearchPaperEditorChoiceOutput;
};

export type PaperEditorChoiceResponseFindPaperEditorChoiceByIdArgs = {
  input: FindPaperEditorChoiceInput;
};

export type PaperEditorChoiceResponseFindPaperEditorChoiceByIdsArgs = {
  input: FindPaperEditorChoiceGroupInput;
};

export type PaperEditorChoiceResponseSearchPaperEditorChoiceArgs = {
  input: SearchPaperEditorChoiceInput;
};

export type PaperEditorChoiceType = {
  __typename?: 'PaperEditorChoiceType';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  paper: PaperType;
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PaperFavoriteResponse = {
  __typename?: 'PaperFavoriteResponse';
  findPaperFavoriteById: FindPaperFavoritesOutput;
  findPaperFavoriteByIds: Array<PaperFavoriteType>;
  searchPaperFavorite: SearchPaperFavoriteOutput;
};

export type PaperFavoriteResponseFindPaperFavoriteByIdArgs = {
  input: FindPaperFavoriteInput;
};

export type PaperFavoriteResponseFindPaperFavoriteByIdsArgs = {
  input: FindPaperFavoritesInput;
};

export type PaperFavoriteResponseSearchPaperFavoriteArgs = {
  input: SearchPaperFavoriteInput;
};

export type PaperFavoriteType = {
  __typename?: 'PaperFavoriteType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  paper: PaperType;
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type PaperLinksResponse = {
  __typename?: 'PaperLinksResponse';
  findPaperLinkById: FindPaperLinkOutput;
  findPaperLinksByIds: Array<PaperLinksType>;
  searchPaperLink: SearchPaperLinkOutput;
};

export type PaperLinksResponseFindPaperLinkByIdArgs = {
  input: FindPaperLinkInput;
};

export type PaperLinksResponseFindPaperLinksByIdsArgs = {
  input: FindPaperLinksInput;
};

export type PaperLinksResponseSearchPaperLinkArgs = {
  input: SearchPaperLinkInput;
};

export type PaperLinksType = {
  __typename?: 'PaperLinksType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Array<Scalars['String']['output']>>;
  paper: Scalars['Int']['output'];
  type?: Maybe<PaperContentType>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PaperMultimediaInputDto = {
  multimedia: Scalars['Int']['input'];
  visibility?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaperMultimediaType = {
  __typename?: 'PaperMultimediaType';
  multimedia: MultimediaType;
  visibility?: Maybe<Scalars['Boolean']['output']>;
};

export type PaperResponse = {
  __typename?: 'PaperResponse';
  category: CategoryResponse;
  comments: PaperCommentResponse;
  editorChoice: PaperEditorChoiceResponse;
  favorite: PaperFavoriteResponse;
  findPaperById: FindPaperOutput;
  findPaperByIds: Array<PaperType>;
  findPaperByName: FindPaperOutput;
  findRelatedPapers: FindRelatedPapersOutput;
  paperLinks: PaperLinksResponse;
  pin: PinResponse;
  richsnippet: PaperRichsnippetResponse;
  searchPaper: SearchPaperOutput;
  showcase: PaperShowcaseResponse;
  visitStatistics: PaperVisitStatisticsResponse;
};

export type PaperResponseFindPaperByIdArgs = {
  input: FindPaperInput;
};

export type PaperResponseFindPaperByIdsArgs = {
  input: FindPapersGroupInput;
};

export type PaperResponseFindPaperByNameArgs = {
  input: FindPaperByNameInput;
};

export type PaperResponseFindRelatedPapersArgs = {
  input: FindRelatedPapersInput;
};

export type PaperResponseSearchPaperArgs = {
  input: SearchPaperInput;
};

export type PaperRichsnippetResponse = {
  __typename?: 'PaperRichsnippetResponse';
  findPaperRichsnippetById: FindPaperRichsnippetOutput;
  findPaperRichsnippetByIds: Array<PaperRichsnippetType>;
  searchPaperRichsnippet: SearchPaperRichsnippetOutput;
};

export type PaperRichsnippetResponseFindPaperRichsnippetByIdArgs = {
  input: FindPaperRichsnippetInput;
};

export type PaperRichsnippetResponseFindPaperRichsnippetByIdsArgs = {
  input: FindPaperRichsnippetGroupInput;
};

export type PaperRichsnippetResponseSearchPaperRichsnippetArgs = {
  input: SearchPaperRichsnippetInput;
};

export type PaperRichsnippetType = {
  __typename?: 'PaperRichsnippetType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  paper: PaperType;
  score: Scalars['Int']['output'];
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type PaperSeoApprovalType = {
  __typename?: 'PaperSeoApprovalType';
  items?: Maybe<SeoApprovalItemsType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
};

export type PaperShowcaseResponse = {
  __typename?: 'PaperShowcaseResponse';
  findPaperShowcaseById: FindPaperShowcaseOutput;
  findPaperShowcaseByIds: Array<PaperShowcaseType>;
  searchPaperShowcase: SearchPaperShowcaseOutput;
};

export type PaperShowcaseResponseFindPaperShowcaseByIdArgs = {
  input: FindPaperShowcaseInput;
};

export type PaperShowcaseResponseFindPaperShowcaseByIdsArgs = {
  input: FindPaperShowcaseGroupInput;
};

export type PaperShowcaseResponseSearchPaperShowcaseArgs = {
  input: SearchPaperShowcaseInput;
};

export type PaperShowcaseType = {
  __typename?: 'PaperShowcaseType';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  paper: PaperType;
  title: Scalars['String']['output'];
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum PaperStatus {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
}

export type PaperType = {
  __typename?: 'PaperType';
  _id: Scalars['Int']['output'];
  author?: Maybe<User>;
  categories?: Maybe<Array<PaperCategoryType>>;
  commentCount?: Maybe<Scalars['Int']['output']>;
  companies?: Maybe<Array<CompanyType>>;
  content: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  favoriteCount: Scalars['Float']['output'];
  isEditorChoice: Scalars['Boolean']['output'];
  isPinActive: Scalars['Boolean']['output'];
  isUserFavorite: Scalars['Boolean']['output'];
  isWide?: Maybe<Scalars['Boolean']['output']>;
  multimedia?: Maybe<Array<PaperMultimediaType>>;
  name: Scalars['String']['output'];
  paperType: PaperContentType;
  persons?: Maybe<Array<PersonType>>;
  publishDate?: Maybe<Scalars['String']['output']>;
  richsnippet?: Maybe<RichsnippetType>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  seoApprovals?: Maybe<PaperSeoApprovalType>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  showcase?: Maybe<PaperShowcaseType>;
  status: PaperStatus;
  tags?: Maybe<Array<TagsType>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailPreview?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userRate: Scalars['Float']['output'];
};

export type PaperVisitStatisticsResponse = {
  __typename?: 'PaperVisitStatisticsResponse';
  findPaperVisitStatisticsById: FindPaperVisitStatisticssOutput;
  findPaperVisitStatisticsByIds: Array<PaperVisitStatisticsType>;
  searchPaperVisitStatistics: SearchPaperVisitStatisticsOutput;
};

export type PaperVisitStatisticsResponseFindPaperVisitStatisticsByIdArgs = {
  input: FindPaperVisitStatisticsInput;
};

export type PaperVisitStatisticsResponseFindPaperVisitStatisticsByIdsArgs = {
  input: FindPapersVisitStatisticsInput;
};

export type PaperVisitStatisticsResponseSearchPaperVisitStatisticsArgs = {
  input: SearchPaperVisitStatisticsInput;
};

export type PaperVisitStatisticsType = {
  __typename?: 'PaperVisitStatisticsType';
  _id: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  lastWeekCount: Scalars['Int']['output'];
  paper: PaperType;
  type?: Maybe<PaperContentType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PassiveSurveyWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type PersonInputDto = {
  person: Scalars['String']['input'];
  visibility?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PersonSpouseType = {
  __typename?: 'PersonSpouseType';
  divorceDate?: Maybe<Scalars['String']['output']>;
  marriageDate?: Maybe<Scalars['String']['output']>;
  spouse: PersonsBankType;
};

export type PersonType = {
  __typename?: 'PersonType';
  person?: Maybe<PersonsBankType>;
  visibility?: Maybe<Scalars['Boolean']['output']>;
};

export type PersonsBank = {
  __typename?: 'PersonsBank';
  findPersonById: FindPersonOutput;
  findPersonsByIds: Array<PersonsBankType>;
  searchPersonsBank: SearchPersonsBankOutput;
};

export type PersonsBankFindPersonByIdArgs = {
  input: FindPersonInput;
};

export type PersonsBankFindPersonsByIdsArgs = {
  input: FindPersonsInput;
};

export type PersonsBankSearchPersonsBankArgs = {
  input: SearchPersonsBankInput;
};

export type PersonsBankType = {
  __typename?: 'PersonsBankType';
  _id: Scalars['String']['output'];
  approved: Scalars['Boolean']['output'];
  biography?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['String']['output']>;
  birthplace?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<PersonsBankType>>;
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deathdate?: Maybe<Scalars['String']['output']>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  father?: Maybe<PersonsBankType>;
  height?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imdbId?: Maybe<Scalars['String']['output']>;
  mother?: Maybe<PersonsBankType>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Array<Scalars['String']['output']>>;
  nickname?: Maybe<Scalars['String']['output']>;
  otherJobs?: Maybe<Array<Scalars['String']['output']>>;
  secondaryName?: Maybe<Scalars['String']['output']>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  sibling?: Maybe<Array<PersonsBankType>>;
  slug?: Maybe<Scalars['String']['output']>;
  socialMediaAccounts?: Maybe<Array<Scalars['String']['output']>>;
  spouses?: Maybe<Array<PersonSpouseType>>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PictureGalleryOptions = {
  __typename?: 'PictureGalleryOptions';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  borderColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  contentTextColor?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  isGalleryTitleVisible?: Maybe<Scalars['Boolean']['output']>;
};

export type PictureGalleryOptionsInputType = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  borderColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  buttonTextColor?: InputMaybe<Scalars['String']['input']>;
  contentTextColor?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  isGalleryTitleVisible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PinResponse = {
  __typename?: 'PinResponse';
  findPinById: FindPinOutput;
  searchPin: SearchPinOutput;
};

export type PinResponseFindPinByIdArgs = {
  input: FindPinInput;
};

export type PinResponseSearchPinArgs = {
  input: SearchPinInput;
};

export type PinType = {
  __typename?: 'PinType';
  _id: Scalars['Int']['output'];
  categories?: Maybe<Array<PaperCategoryType>>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  fromDate: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isHomePage?: Maybe<Scalars['Boolean']['output']>;
  paper: PaperType;
  toDate: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PlotData = {
  __typename?: 'PlotData';
  html?: Maybe<Scalars['String']['output']>;
  plainText?: Maybe<Scalars['String']['output']>;
};

export type Podcast = {
  __typename?: 'Podcast';
  findPodcastById: FindPodcastOutput;
  findPodcastByIds: Array<PodcastType>;
  searchPodcast: SearchPodcastOutput;
};

export type PodcastFindPodcastByIdArgs = {
  input: FindPodcastInput;
};

export type PodcastFindPodcastByIdsArgs = {
  input: FindPodcastsInput;
};

export type PodcastSearchPodcastArgs = {
  input: SearchPodcastInput;
};

export type PodcastOptions = {
  __typename?: 'PodcastOptions';
  borderColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  bottomBackgroundColor?: Maybe<Scalars['String']['output']>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  contentTextColor?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  isAutoPlay?: Maybe<Scalars['Boolean']['output']>;
  isPodcastTitleVisible?: Maybe<Scalars['Boolean']['output']>;
  topBackgroundColor?: Maybe<Scalars['String']['output']>;
};

export type PodcastOptionsInputType = {
  borderColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  bottomBackgroundColor?: InputMaybe<Scalars['String']['input']>;
  buttonTextColor?: InputMaybe<Scalars['String']['input']>;
  contentTextColor?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  isAutoPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isPodcastTitleVisible?: InputMaybe<Scalars['Boolean']['input']>;
  topBackgroundColor?: InputMaybe<Scalars['String']['input']>;
};

export enum PodcastStatusType {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
}

export type PodcastType = {
  __typename?: 'PodcastType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  status: PodcastStatusType;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PosterData = {
  __typename?: 'PosterData';
  backdrops?: Maybe<Array<PosterDataItem>>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  imDbId: Scalars['String']['output'];
  posters?: Maybe<Array<PosterDataItem>>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PosterDataItem = {
  __typename?: 'PosterDataItem';
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ProducerCompanyResponse = {
  __typename?: 'ProducerCompanyResponse';
  findProducerCompanyById: FindProducerCompanyOutput;
  findProducerCompanyByIds: Array<ProducerCompanyType>;
  searchProducerCompany: SearchProducerCompanyOutput;
};

export type ProducerCompanyResponseFindProducerCompanyByIdArgs = {
  input: FindProducerCompanyInput;
};

export type ProducerCompanyResponseFindProducerCompanyByIdsArgs = {
  input: FindProducerCompaniesInput;
};

export type ProducerCompanyResponseSearchProducerCompanyArgs = {
  input: SearchProducerCompanyInput;
};

export type ProducerCompanyType = {
  __typename?: 'ProducerCompanyType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  album: AlbumResponse;
  albumList: AlbumListResponse;
  analytics: Analytics;
  auth: AuthQuery;
  bugReport: BugReportResponse;
  contacts: Contacts;
  devices: DeviceQuery;
  embed: EmbedResponse;
  footprints: Footprints;
  globalSearch: GlobalSearchOutput;
  imdb: ImdbResponse;
  internalLinks: InternalLinkResponse;
  mainMenu: Array<MainMenuResponse>;
  mainMenus: MainMenu;
  media: Media;
  menu: Menu;
  notFoundReports: NotFoundReport;
  papers: PaperResponse;
  personsBank: PersonsBank;
  redirects: RedirectResponse;
  search: SearchOutput;
  searchAnalytics: SearchAnalytics;
  seed: Scalars['Boolean']['output'];
  seo: SeoResponse;
  seoData: SeoDataResponse;
  seoSettings: SeoSettingsResponse;
  tags: Tags;
  textTracking: TextTrackingResponse;
  trendLinks: TrendLinks;
  userImages: UserImage;
  users: UserResponse;
  videoGallery: VideoGalleryResponse;
  widgets: WidgetsResponse;
};

export type QueryGlobalSearchArgs = {
  input: GlobalSearchInput;
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type RatingData = {
  __typename?: 'RatingData';
  errorMessage?: Maybe<Scalars['String']['output']>;
  filmAffinity?: Maybe<Scalars['String']['output']>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  imDb?: Maybe<Scalars['String']['output']>;
  imDbId?: Maybe<Scalars['String']['output']>;
  metacritic?: Maybe<Scalars['String']['output']>;
  rottenTomatoes?: Maybe<Scalars['String']['output']>;
  theMovieDb?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type RecordSearchTargetInput = {
  multimedia?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type RecordSearchTargetOutput = {
  __typename?: 'RecordSearchTargetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RedirectResponse = {
  __typename?: 'RedirectResponse';
  findRedirectById: FindRedirectOutput;
  findRedirectByOldPath: FindRedirectOutput;
  searchRedirect: SearchRedirectOutput;
  searchRedirectByPath: SearchRedirectOutput;
};

export type RedirectResponseFindRedirectByIdArgs = {
  input: FindRedirectInput;
};

export type RedirectResponseFindRedirectByOldPathArgs = {
  input: FindRedirectByOldPathInput;
};

export type RedirectResponseSearchRedirectArgs = {
  input: SearchRedirectInput;
};

export type RedirectResponseSearchRedirectByPathArgs = {
  input: SearchRedirectByPathInput;
};

export enum RedirectType {
  ContentRemoved = 'CONTENT_REMOVED',
  Detected = 'DETECTED',
  NotAvailableByRules = 'NOT_AVAILABLE_BY_RULES',
  PermanentRedirect = 'PERMANENT_REDIRECT',
  PermanentTransfer = 'PERMANENT_TRANSFER',
  SeeOther = 'SEE_OTHER',
  TemporaryVeer = 'TEMPORARY_VEER',
}

export type RedirectsType = {
  __typename?: 'RedirectsType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  newPath: Scalars['String']['output'];
  oldPath: Scalars['String']['output'];
  type: RedirectType;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type RemoveCommentInput = {
  commentId: Scalars['Int']['input'];
};

export type RemoveSurveyCommentInput = {
  commentId: Scalars['Int']['input'];
};

export type RichsnippetType = {
  __typename?: 'RichsnippetType';
  bestRating?: Maybe<Scalars['Int']['output']>;
  ratingCount?: Maybe<Scalars['Int']['output']>;
  ratingValue?: Maybe<Scalars['Float']['output']>;
  worstRating?: Maybe<Scalars['Int']['output']>;
};

export enum Role {
  Admin = 'Admin',
  Author = 'Author',
  AuthorJunior = 'AuthorJunior',
  Ceo = 'CEO',
  Contributor = 'Contributor',
  Editor = 'Editor',
  FeedbackViewer = 'FeedbackViewer',
  Secretary = 'Secretary',
  SeoEditor = 'SeoEditor',
  SeoManager = 'SeoManager',
  User = 'User',
}

export type RoleOutput = {
  __typename?: 'RoleOutput';
  role: Scalars['String']['output'];
  totalCount: Scalars['Int']['output'];
};

export type RolesType = {
  __typename?: 'RolesType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  persons?: Maybe<Array<TemporaryCrewType>>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Score = {
  __typename?: 'Score';
  percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  votesCount?: Maybe<Scalars['Int']['output']>;
};

export type ScoresOptions = {
  __typename?: 'ScoresOptions';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  primaryTextColor?: Maybe<Scalars['String']['output']>;
  secondaryTextColor?: Maybe<Scalars['String']['output']>;
};

export type ScoresOptionsInputType = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  primaryTextColor?: InputMaybe<Scalars['String']['input']>;
  secondaryTextColor?: InputMaybe<Scalars['String']['input']>;
};

export type SearchAgesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchAgesOutput = {
  __typename?: 'SearchAgesOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<AgesType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchAlbumInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  crewIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  originalSource?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchAlbumListInput = {
  albumTitle?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  crewIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  imageTitle?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  originalSource?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchAlbumListOutput = {
  __typename?: 'SearchAlbumListOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<AlbumListType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchAlbumOutput = {
  __typename?: 'SearchAlbumOutput';
  allItemsCount?: Maybe<Scalars['Int']['output']>;
  crewList?: Maybe<Array<CastName>>;
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<AlbumType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchAnalytics = {
  __typename?: 'SearchAnalytics';
  findByTitleWithClientIdNumbers: FindByTitleWithClientIdNumbersOutput;
  findNumberOfSearchByClientId: FindNumberOfSearchByClientOutput;
  search: SearchSearchAnalyticsOutput;
  searchNumberOfSearchByClients: SearchNumberOfSearchByClientsOutput;
  searchNumberOfSearchByMultimedia: SearchNumberOfSearchByMultimediaOutput;
  searchNumberOfSearchOnTitle: SearchNumberOfSearchOnTitleOutput;
};

export type SearchAnalyticsFindByTitleWithClientIdNumbersArgs = {
  input: FindByTitleWithClientIdNumbersInput;
};

export type SearchAnalyticsFindNumberOfSearchByClientIdArgs = {
  input: FindNumberOfSearchByClientInput;
};

export type SearchAnalyticsSearchArgs = {
  input: SearchSearchAnalyticsInput;
};

export type SearchAnalyticsSearchNumberOfSearchByClientsArgs = {
  input: SearchNumberOfSearchByClientsInput;
};

export type SearchAnalyticsSearchNumberOfSearchByMultimediaArgs = {
  input: SearchNumberOfSearchByMultimediaInput;
};

export type SearchAnalyticsSearchNumberOfSearchOnTitleArgs = {
  input: SearchNumberOfSearchOnTitleInput;
};

export type SearchAnalyticsType = {
  __typename?: 'SearchAnalyticsType';
  _id: Scalars['String']['output'];
  clientId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  multimedia?: Maybe<MultimediaType>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type SearchAwardInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<FestivalAwardType>;
};

export type SearchAwardOutput = {
  __typename?: 'SearchAwardOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<AwardType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBiographyBookmarkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchBiographyBookmarkOutput = {
  __typename?: 'SearchBiographyBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<BiographyBookmarkType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBiographyInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  crewId?: InputMaybe<Scalars['Int']['input']>;
  fromBirthdate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toBirthdate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchBiographyOutput = {
  __typename?: 'SearchBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<BiographyType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBiographyRichsnippetInput = {
  biographyId?: InputMaybe<Scalars['Int']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchBiographyRichsnippetOutput = {
  __typename?: 'SearchBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<BiographyRichsnippetType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBoxOfficeInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BoxOfficeTypeEnum>;
};

export type SearchBoxOfficeOutput = {
  __typename?: 'SearchBoxOfficeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<BoxOfficeType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBroadcastInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchBroadcastOutput = {
  __typename?: 'SearchBroadcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<BroadcastType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchBugReportInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<BugReportState>;
};

export type SearchBugReportOutput = {
  __typename?: 'SearchBugReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<BugReportType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchCategoriesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  isSubCategory?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  treeSort?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchCategoriesOutput = {
  __typename?: 'SearchCategoriesOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<CategoriesType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchCollectionInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia?: InputMaybe<Array<Scalars['Int']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchCollectionOutput = {
  __typename?: 'SearchCollectionOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<CollectionType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchCommentsInput = {
  approved?: InputMaybe<BooleanEnum>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  multimedia?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchCommentsOutput = {
  __typename?: 'SearchCommentsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<CommentsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchContactOutput = {
  __typename?: 'SearchContactOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<ContactType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchContactsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchCountriesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  isSubCountry?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  treeSort?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchCountriesOutput = {
  __typename?: 'SearchCountriesOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<CountriesType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchCrewInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasDescription?: InputMaybe<Scalars['Boolean']['input']>;
  hasImage?: InputMaybe<Scalars['Boolean']['input']>;
  hasName?: InputMaybe<Scalars['Boolean']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  hasSlug?: InputMaybe<Scalars['Boolean']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  persons?: InputMaybe<Array<Scalars['String']['input']>>;
  secondaryName?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<CrewSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchCrewOutput = {
  __typename?: 'SearchCrewOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TemporaryCrewType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchDeviceInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<MatomoDeviceType>;
};

export type SearchDeviceOutput = {
  __typename?: 'SearchDeviceOutput';
  error?: Maybe<Scalars['String']['output']>;
  results: Array<DeviceType>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchDistributionCompanyInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchDistributionCompanyOutput = {
  __typename?: 'SearchDistributionCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<DistributionCompanyType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchDownloadAndStreamAnalyticsInput = {
  category?: InputMaybe<Scalars['Int']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  linkType?: InputMaybe<LinkType>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchDownloadAndStreamAnalyticsOutput = {
  __typename?: 'SearchDownloadAndStreamAnalyticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<DownloadAndStreamAnalyticsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchDownloadAndStreamTrendsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  limit?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  sortType: DownloadAndStreamTrendsSortType;
  type: DownloadAndStreamTrendsTypeEnum;
};

export type SearchDownloadAndStreamTrendsOutput = {
  __typename?: 'SearchDownloadAndStreamTrendsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<DownloadAndStreamTrendsOutput>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchDubbedTypeInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchDubbedTypeOutput = {
  __typename?: 'SearchDubbedTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<DubbedTypeType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchEditorChoiceInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchEditorChoiceMultimediaByCategoryInput = {
  category: Scalars['Float']['input'];
  multimediaLimit?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchEditorChoiceMultimediaByCountryInput = {
  country: Scalars['Float']['input'];
  multimediaLimit?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchEditorChoiceOutput = {
  __typename?: 'SearchEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<EditorChoiceType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchEmbedInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchEmbedOutput = {
  __typename?: 'SearchEmbedOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<EmbedType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchEpisodesInput = {
  blockPost?: InputMaybe<Scalars['Int']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  hasPage?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  post?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchEpisodesOutput = {
  __typename?: 'SearchEpisodesOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<EpisodesType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchFestivalDetailInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  festivalId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchFestivalDetailOutput = {
  __typename?: 'SearchFestivalDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<FestivalDetailType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchFestivalInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchFestivalOutput = {
  __typename?: 'SearchFestivalOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<FestivalType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchFilmingLocationInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchFilmingLocationOutput = {
  __typename?: 'SearchFilmingLocationOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<FilmingLocationType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchFootprintInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  module?: InputMaybe<CollectionName>;
  operation?: InputMaybe<FootprintOperation>;
  originalTitle?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type SearchFootprintOutput = {
  __typename?: 'SearchFootprintOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<FootprintType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchGenresInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchGenresOutput = {
  __typename?: 'SearchGenresOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<GenresType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchInput = {
  ages?: InputMaybe<Array<Scalars['Int']['input']>>;
  authors?: InputMaybe<Array<Scalars['Int']['input']>>;
  category?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  crew?: InputMaybe<Array<Scalars['Int']['input']>>;
  dubbedType?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  genres?: InputMaybe<Array<Scalars['Int']['input']>>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  isBookmark?: InputMaybe<Scalars['Boolean']['input']>;
  isComingSoon?: InputMaybe<Scalars['Boolean']['input']>;
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isMiniSearch?: InputMaybe<Scalars['Boolean']['input']>;
  isShowcase?: InputMaybe<Scalars['Boolean']['input']>;
  isSuggestToWatch?: InputMaybe<Scalars['Boolean']['input']>;
  maxRate?: InputMaybe<Scalars['Float']['input']>;
  maxReleaseDate?: InputMaybe<Scalars['Int']['input']>;
  minRate?: InputMaybe<Scalars['Float']['input']>;
  minReleaseDate?: InputMaybe<Scalars['Int']['input']>;
  ninIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  originalNetwork?: InputMaybe<Array<Scalars['Int']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  podcasts?: InputMaybe<Array<Scalars['String']['input']>>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  showMyPosts?: InputMaybe<Scalars['Boolean']['input']>;
  sortType?: InputMaybe<MultimediaSortType>;
  status?: InputMaybe<MultimediaStatusEnum>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SearchInternalLinkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInternalLinkOutput = {
  __typename?: 'SearchInternalLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<InternalLinksType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchLanguageInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchLanguageOutput = {
  __typename?: 'SearchLanguageOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LanguageType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchLatestMultimediaByCategoryInput = {
  category: Scalars['Float']['input'];
  multimediaLimit?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchLatestMultimediaByCountryInput = {
  country: Scalars['Float']['input'];
  multimediaLimit?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchLinksInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchLinksOutput = {
  __typename?: 'SearchLinksOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LinksType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMainMenuInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchMainMenuOutput = {
  __typename?: 'SearchMainMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MainMenuType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMediaLibrariesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchMediaLibrariesOutput = {
  __typename?: 'SearchMediaLibrariesOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MediaLibraryType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMenuInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  isMobileOnly?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchMenuOutput = {
  __typename?: 'SearchMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MenuType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMultimediaBookmarkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMultimediaBookmarkOutput = {
  __typename?: 'SearchMultimediaBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaBookmarkType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMultimediaByCategoryInput = {
  category: Scalars['Float']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchMultimediaByCategoryOutput =
  | SearchMultimediaGroupByCategoryOutput
  | SearchMultimediaOutput;

export type SearchMultimediaByCollectionInput = {
  collection: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMultimediaByCountryInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  country: Scalars['Float']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  sortType?: InputMaybe<MultimediaSortType>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchMultimediaByCountryOutput =
  | SearchMultimediaGroupByCountryOutput
  | SearchMultimediaOutput;

export type SearchMultimediaByGenreInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  genre: Scalars['Float']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchMultimediaByYearInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
  year: Scalars['Int']['input'];
};

export type SearchMultimediaCommentsFavoriteInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMultimediaCommentsFavoriteOutput = {
  __typename?: 'SearchMultimediaCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaCommentFavoriteType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMultimediaFavoriteInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMultimediaFavoriteOutput = {
  __typename?: 'SearchMultimediaFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaFavoriteType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMultimediaGroupByCategory = {
  __typename?: 'SearchMultimediaGroupByCategory';
  _id: Scalars['Float']['output'];
  items: Array<MultimediaType>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SearchMultimediaGroupByCategoryOutput = {
  __typename?: 'SearchMultimediaGroupByCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SearchMultimediaGroupByCategory>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  type: CategoryResponseType;
};

export type SearchMultimediaGroupByCountry = {
  __typename?: 'SearchMultimediaGroupByCountry';
  _id: Scalars['Float']['output'];
  items: Array<MultimediaType>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SearchMultimediaGroupByCountryOutput = {
  __typename?: 'SearchMultimediaGroupByCountryOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SearchMultimediaGroupByCountry>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  type: CountryResponseType;
};

export type SearchMultimediaInput = {
  ages?: InputMaybe<Array<Scalars['Int']['input']>>;
  authors?: InputMaybe<Array<Scalars['Int']['input']>>;
  category?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  crew?: InputMaybe<Array<Scalars['Int']['input']>>;
  dubbedType?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  genres?: InputMaybe<Array<Scalars['Int']['input']>>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  isBookmark?: InputMaybe<Scalars['Boolean']['input']>;
  isComingSoon?: InputMaybe<Scalars['Boolean']['input']>;
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isMiniSearch?: InputMaybe<Scalars['Boolean']['input']>;
  isShowcase?: InputMaybe<Scalars['Boolean']['input']>;
  isSuggestToWatch?: InputMaybe<Scalars['Boolean']['input']>;
  maxRate?: InputMaybe<Scalars['Float']['input']>;
  maxReleaseDate?: InputMaybe<Scalars['Int']['input']>;
  minRate?: InputMaybe<Scalars['Float']['input']>;
  minReleaseDate?: InputMaybe<Scalars['Int']['input']>;
  ninIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  originalNetwork?: InputMaybe<Array<Scalars['Int']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  podcasts?: InputMaybe<Array<Scalars['String']['input']>>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  showMyPosts?: InputMaybe<Scalars['Boolean']['input']>;
  sortType?: InputMaybe<MultimediaSortType>;
  status?: InputMaybe<MultimediaStatusEnum>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SearchMultimediaOutput = {
  __typename?: 'SearchMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMultimediaRichsnippetInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  multimediaId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMultimediaRichsnippetOutput = {
  __typename?: 'SearchMultimediaRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaRichsnippetType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMultimediaTrendsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  limit?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  sortType: MultimediaTrendsSortType;
  type: MultimediaTrendsTypeEnum;
};

export type SearchMultimediaTrendsOutput = {
  __typename?: 'SearchMultimediaTrendsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaTrendsOutput>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMusicEpisodeInput = {
  blockMusic?: InputMaybe<Scalars['Int']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  music?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMusicEpisodeOutput = {
  __typename?: 'SearchMusicEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MusicEpisodeType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMusicInput = {
  authors?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  ninIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  showMyPosts?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<MusicStatusEnum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchMusicLinkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchMusicLinkOutput = {
  __typename?: 'SearchMusicLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MusicLinkType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchMusicOutput = {
  __typename?: 'SearchMusicOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MusicType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNetworkBiographyInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  originalNetworkId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchNetworkBiographyOutput = {
  __typename?: 'SearchNetworkBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<NetworkBiographyType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNetworkBiographyRichsnippetInput = {
  biographyId?: InputMaybe<Scalars['Int']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchNetworkBiographyRichsnippetOutput = {
  __typename?: 'SearchNetworkBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<NetworkBiographyRichsnippetType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNotFoundReportInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<NotFoundReportSortType>;
};

export type SearchNotFoundReportOutput = {
  __typename?: 'SearchNotFoundReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<NotFoundReportType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfClickByClientsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNumberOfClickByClientsOutput = {
  __typename?: 'SearchNumberOfClickByClientsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LinkTypeClickedByClient>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfClickByLinkTypeInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNumberOfClickByLinkTypeOutput = {
  __typename?: 'SearchNumberOfClickByLinkTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LinkTypeClicked>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfClickOnCategoryInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNumberOfClickOnCategoryOutput = {
  __typename?: 'SearchNumberOfClickOnCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<CategoryClicked>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfClickOnMultimediaInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  unwatched?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchNumberOfClickOnMultimediaOutput = {
  __typename?: 'SearchNumberOfClickOnMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MulimediaClicked>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfSearchByClientsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNumberOfSearchByClientsOutput = {
  __typename?: 'SearchNumberOfSearchByClientsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SearchedByClient>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfSearchByMultimediaInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNumberOfSearchByMultimediaOutput = {
  __typename?: 'SearchNumberOfSearchByMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SearchedByMultimedia>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchNumberOfSearchOnTitleInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNumberOfSearchOnTitleOutput = {
  __typename?: 'SearchNumberOfSearchOnTitleOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TitleSearched>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchOriginalNetworkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchOriginalNetworkOutput = {
  __typename?: 'SearchOriginalNetworkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<OriginalNetworkType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchOutput = {
  __typename?: 'SearchOutput';
  crew?: Maybe<TemporaryCrewType>;
  error?: Maybe<Scalars['String']['output']>;
  multimedia?: Maybe<Array<MultimediaType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperCategoryInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  isSubCategory?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  treeSort?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperCategoryOutput = {
  __typename?: 'SearchPaperCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperCategoryType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperCommentInput = {
  approved?: InputMaybe<BooleanEnum>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paper?: InputMaybe<Scalars['Float']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperCommentOutput = {
  __typename?: 'SearchPaperCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperCommentsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperCommentsFavoriteInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchPaperCommentsFavoriteOutput = {
  __typename?: 'SearchPaperCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperCommentsFavoriteType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperEditorChoiceInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paper?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperEditorChoiceOutput = {
  __typename?: 'SearchPaperEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperEditorChoiceType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperFavoriteInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperFavoriteOutput = {
  __typename?: 'SearchPaperFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperFavoriteType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperInput = {
  authors?: InputMaybe<Array<Scalars['Int']['input']>>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  exceptionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  isCategory?: InputMaybe<Scalars['Boolean']['input']>;
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isHomePage?: InputMaybe<Scalars['Boolean']['input']>;
  isPublishing?: InputMaybe<Scalars['Boolean']['input']>;
  isShowcase?: InputMaybe<Scalars['Boolean']['input']>;
  isWide?: InputMaybe<Scalars['Boolean']['input']>;
  multimediaIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  originalNetworks?: InputMaybe<Array<Scalars['Int']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  personIds?: InputMaybe<Array<Scalars['String']['input']>>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  showMyPosts?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PaperStatus>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperLinkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperLinkOutput = {
  __typename?: 'SearchPaperLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperLinksType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperOutput = {
  __typename?: 'SearchPaperOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperRichsnippetInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paperId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<PaperContentType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchPaperRichsnippetOutput = {
  __typename?: 'SearchPaperRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperRichsnippetType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperShowcaseInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paper?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperShowcaseOutput = {
  __typename?: 'SearchPaperShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperShowcaseType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPaperVisitStatisticsInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paperTitle?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<VisitStatisticsSortType>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type SearchPaperVisitStatisticsOutput = {
  __typename?: 'SearchPaperVisitStatisticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PaperVisitStatisticsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPersonsBankInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  hasImage?: InputMaybe<Scalars['Boolean']['input']>;
  hasName?: InputMaybe<Scalars['Boolean']['input']>;
  hasSlug?: InputMaybe<Scalars['Boolean']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  secondaryName?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchPersonsBankOutput = {
  __typename?: 'SearchPersonsBankOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PersonsBankType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPinInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  isHomePage?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paperTitle?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchPinOutput = {
  __typename?: 'SearchPinOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PinType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchPodcastInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<PodcastStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SearchPodcastOutput = {
  __typename?: 'SearchPodcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<PodcastType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchProducerCompanyInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchProducerCompanyOutput = {
  __typename?: 'SearchProducerCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<ProducerCompanyType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchRedirectByPathInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path: Scalars['String']['input'];
};

export type SearchRedirectInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  newPath?: InputMaybe<Scalars['String']['input']>;
  oldPath?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<RedirectType>;
};

export type SearchRedirectOutput = {
  __typename?: 'SearchRedirectOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<RedirectsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchRelatedMultimediaInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchRelatedMultimediaOutput = {
  __typename?: 'SearchRelatedMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<MultimediaType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchRelatedVideosInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  videoId: Scalars['Int']['input'];
};

export type SearchRelatedVideosOutput = {
  __typename?: 'SearchRelatedVideosOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<VideoObjectType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchRolesInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  persons?: InputMaybe<Array<Scalars['Int']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchRolesOutput = {
  __typename?: 'SearchRolesOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<RolesType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchSearchAnalyticsInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchSearchAnalyticsOutput = {
  __typename?: 'SearchSearchAnalyticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SearchAnalyticsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchShowcaseInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchShowcaseOutput = {
  __typename?: 'SearchShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<ShowcaseType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export enum SearchSortType {
  Newest = 'NEWEST',
  PostCount = 'POST_COUNT',
}

export type SearchSuggestToWatchInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchSuggestToWatchMultimediaByCategoryInput = {
  category: Scalars['Float']['input'];
  multimediaLimit?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchSuggestToWatchMultimediaByCountryInput = {
  country: Scalars['Float']['input'];
  multimediaLimit?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<MultimediaStatusEnum>;
};

export type SearchSuggestToWatchOutput = {
  __typename?: 'SearchSuggestToWatchOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SuggestToWatchType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchSurveyCommentsFavoriteInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchSurveyCommentsFavoriteOutput = {
  __typename?: 'SearchSurveyCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SurveyCommentFavoriteType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchSurveyCommentsInput = {
  approved?: InputMaybe<BooleanEnum>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  survey?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchSurveyCommentsOutput = {
  __typename?: 'SearchSurveyCommentsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SurveyCommentsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchSurveyInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  showPending?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchSurveyOutput = {
  __typename?: 'SearchSurveyOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<SurveyOutput>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTagFilterInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tag?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchTagFilterOutput = {
  __typename?: 'SearchTagFilterOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TagFilterType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTagsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  status?: InputMaybe<TagStatusEnum>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchTagsOutput = {
  __typename?: 'SearchTagsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TagsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTextTrackingInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  itemId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<TextTrackingCollectionName>;
  user?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchTextTrackingOutput = {
  __typename?: 'SearchTextTrackingOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TextTrackingType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTheMostDownloadsByLinkTypeInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  linkType?: InputMaybe<LinkType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchTheMostDownloadsByLinkTypeOutput = {
  __typename?: 'SearchTheMostDownloadsByLinkTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<LinkTypeMostDownloaded>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTrandsLinkOutput = {
  __typename?: 'SearchTrandsLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TrandsLink>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTrendLinksInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchTrendLinksOutput = {
  __typename?: 'SearchTrendLinksOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TrendLinkType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTrendsDownloadInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  trendsDownloadType: TrendsDownloadType;
};

export type SearchTrendsDownloadOutput = {
  __typename?: 'SearchTrendsDownloadOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<TrandsDownload>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchTrendsLinkInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  trendsLinkType: TrendsLinkType;
};

export type SearchUserByRoleInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  role: Role;
};

export type SearchUserByRoleOutput = {
  __typename?: 'SearchUserByRoleOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<User>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchUserImageInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<UserImageStatusEnum>;
};

export type SearchUserImageOutput = {
  __typename?: 'SearchUserImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<UserImageType>>;
  status?: Maybe<Scalars['Int']['output']>;
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
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<UserOutputType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchVideoByCrewOutput = {
  __typename?: 'SearchVideoByCrewOutput';
  allItemsCount?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<VideoObjectType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  videoTypes?: Maybe<Array<VideoTypeItem>>;
};

export type SearchVideoByCrewSlugInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  types?: InputMaybe<Array<VideoType>>;
};

export type SearchVideoGalleryInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  crewIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  galleryTitle?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  videoTitle?: InputMaybe<Scalars['String']['input']>;
};

export type SearchVideoGalleryOutput = {
  __typename?: 'SearchVideoGalleryOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<VideoGalleryObjectType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchVideoInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  crewIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  multimedia: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<VideoType>>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type SearchVideoOutput = {
  __typename?: 'SearchVideoOutput';
  allItemsCount?: Maybe<Scalars['Int']['output']>;
  crewList?: Maybe<Array<CastName>>;
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<VideoObjectType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  videoTypes?: Maybe<Array<VideoTypeItem>>;
};

export type SearchYearsInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  fromSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SearchSortType>;
  text?: InputMaybe<Scalars['String']['input']>;
  toSeoReviewDate?: InputMaybe<Scalars['String']['input']>;
};

export type SearchYearsOutput = {
  __typename?: 'SearchYearsOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<YearsType>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SearchedByClient = {
  __typename?: 'SearchedByClient';
  clientId: Scalars['String']['output'];
  searchCount: Scalars['Int']['output'];
};

export type SearchedByMultimedia = {
  __typename?: 'SearchedByMultimedia';
  multimedia?: Maybe<MultimediaType>;
  searchCount: Scalars['Int']['output'];
};

export type SelectAlbumImageInput = {
  dimensionType: ImageDimensionType;
  imageId: Scalars['String']['input'];
};

export type SelectAlbumImageOutput = {
  __typename?: 'SelectAlbumImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  requestedUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SelectImageInput = {
  dimensionType: ImageDimensionType;
  isWebp?: InputMaybe<Scalars['Boolean']['input']>;
  mediaLibraryId: Scalars['Int']['input'];
};

export type SelectImageOutput = {
  __typename?: 'SelectImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  requestedUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SendTicketInput = {
  description: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SendVerificationCodeInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SendVerificationCodeOutput = {
  __typename?: 'SendVerificationCodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SeoApprovalItemsInputType = {
  age?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['Boolean']['input']>;
  collection?: InputMaybe<Scalars['Boolean']['input']>;
  country?: InputMaybe<Scalars['Boolean']['input']>;
  crew?: InputMaybe<Scalars['Boolean']['input']>;
  dubbedType?: InputMaybe<Scalars['Boolean']['input']>;
  genre?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['Boolean']['input']>;
  originalNetwork?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['Boolean']['input']>;
  seoBox?: InputMaybe<Scalars['Boolean']['input']>;
  tag?: InputMaybe<Scalars['Boolean']['input']>;
  year?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeoApprovalItemsType = {
  __typename?: 'SeoApprovalItemsType';
  age?: Maybe<Scalars['Boolean']['output']>;
  category?: Maybe<Scalars['Boolean']['output']>;
  collection?: Maybe<Scalars['Boolean']['output']>;
  country?: Maybe<Scalars['Boolean']['output']>;
  crew?: Maybe<Scalars['Boolean']['output']>;
  dubbedType?: Maybe<Scalars['Boolean']['output']>;
  genre?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['Boolean']['output']>;
  originalNetwork?: Maybe<Scalars['Boolean']['output']>;
  role?: Maybe<Scalars['Boolean']['output']>;
  seoBox?: Maybe<Scalars['Boolean']['output']>;
  tag?: Maybe<Scalars['Boolean']['output']>;
  year?: Maybe<Scalars['Boolean']['output']>;
};

export type SeoBoxType = {
  __typename?: 'SeoBoxType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum SeoCollectionName {
  AlbumList = 'ALBUM_LIST',
  Award = 'AWARD',
  Biography = 'BIOGRAPHY',
  Broadcast = 'BROADCAST',
  Categories = 'CATEGORIES',
  Collection = 'COLLECTION',
  Countries = 'COUNTRIES',
  Crew = 'CREW',
  DistributionCompany = 'DISTRIBUTION_COMPANY',
  Episodes = 'EPISODES',
  Festival = 'FESTIVAL',
  FestivalDetail = 'FESTIVAL_DETAIL',
  Genres = 'GENRES',
  HomePage = 'HOME_PAGE',
  Mag = 'MAG',
  Multimedia = 'MULTIMEDIA',
  Music = 'MUSIC',
  MusicEpisode = 'MUSIC_EPISODE',
  MusicLink = 'MUSIC_LINK',
  NetworkBiography = 'NETWORK_BIOGRAPHY',
  OriginalNetwork = 'ORIGINAL_NETWORK',
  Paper = 'PAPER',
  PaperCategory = 'PAPER_CATEGORY',
  PaperTag = 'PAPER_TAG',
  ProducerCompany = 'PRODUCER_COMPANY',
  Survey = 'SURVEY',
  Tags = 'TAGS',
  VideosGallery = 'VIDEOS_GALLERY',
  Years = 'YEARS',
}

export type SeoDataInput = {
  head: Scalars['String']['input'];
};

export type SeoDataResponse = {
  __typename?: 'SeoDataResponse';
  findSeoDataById: FindSeoDataOutput;
  findSeoDataByIdAndType: FindSeoDataOutput;
  findSeoDataByIds: Array<SeoDataType>;
};

export type SeoDataResponseFindSeoDataByIdArgs = {
  input: FindSeoDataInput;
};

export type SeoDataResponseFindSeoDataByIdAndTypeArgs = {
  input: FindSeoDataByIdAndTypeInput;
};

export type SeoDataResponseFindSeoDataByIdsArgs = {
  input: FindSeoDataGroupInput;
};

export type SeoDataType = {
  __typename?: 'SeoDataType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  head: Scalars['String']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  type: SeoCollectionName;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type SeoGeneralSettingsInputType = {
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  focusKeyword?: InputMaybe<Array<Scalars['String']['input']>>;
  nofollow?: InputMaybe<Scalars['Boolean']['input']>;
  noindex?: InputMaybe<Scalars['Boolean']['input']>;
  permalink?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeoGeneralSettingsType = {
  __typename?: 'SeoGeneralSettingsType';
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  focusKeyword?: Maybe<Array<Scalars['String']['output']>>;
  nofollow?: Maybe<Scalars['Boolean']['output']>;
  noindex?: Maybe<Scalars['Boolean']['output']>;
  permalink?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeoResponse = {
  __typename?: 'SeoResponse';
  getHomePageSeo: FindHomePageSeoOutput;
  getHomePageSeoBox: FindSeoBoxOutput;
  getMagSeo: FindHomePageSeoOutput;
  getMagSeoBox: FindSeoBoxOutput;
};

export type SeoSettingsInput = {
  general?: InputMaybe<SeoGeneralSettingsInputType>;
  score?: InputMaybe<Scalars['Float']['input']>;
};

export type SeoSettingsResponse = {
  __typename?: 'SeoSettingsResponse';
  findSeoSettingsById: FindSeoSettingsOutput;
  findSeoSettingsByIdAndType: FindSeoSettingsOutput;
  findSeoSettingsByIds: Array<SeoSettingsType>;
  getFocusKeywordListNumbers: FocusKeywordListOutput;
  getFocusKeywordNumbers: FocusKeywordOutput;
};

export type SeoSettingsResponseFindSeoSettingsByIdArgs = {
  input: FindSeoSettingsInput;
};

export type SeoSettingsResponseFindSeoSettingsByIdAndTypeArgs = {
  input: FindSeoSettingsByIdAndTypeInput;
};

export type SeoSettingsResponseFindSeoSettingsByIdsArgs = {
  input: FindSeoSettingsGroupInput;
};

export type SeoSettingsResponseGetFocusKeywordListNumbersArgs = {
  input: FocusKeywordListInput;
};

export type SeoSettingsResponseGetFocusKeywordNumbersArgs = {
  input: FocusKeywordInput;
};

export type SeoSettingsType = {
  __typename?: 'SeoSettingsType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  general?: Maybe<SeoGeneralSettingsType>;
  itemId?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  type: SeoCollectionName;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Showcase = {
  __typename?: 'Showcase';
  findShowcaseById: FindShowcaseOutput;
  findShowcaseByIds: Array<ShowcaseType>;
  searchShowcase: SearchShowcaseOutput;
};

export type ShowcaseFindShowcaseByIdArgs = {
  input: FindShowcaseInput;
};

export type ShowcaseFindShowcaseByIdsArgs = {
  input: FindShowcaseGroupInput;
};

export type ShowcaseSearchShowcaseArgs = {
  input: SearchShowcaseInput;
};

export type ShowcaseType = {
  __typename?: 'ShowcaseType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ShowcaseWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SigninOutput = {
  __typename?: 'SigninOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SignupInputType = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SignupOutput = {
  __typename?: 'SignupOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SimilarShort = {
  __typename?: 'SimilarShort';
  id: Scalars['String']['output'];
  imDbRating?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Size = {
  __typename?: 'Size';
  height: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type SoundtrackOptions = {
  __typename?: 'SoundtrackOptions';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  borderColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  contentTextColor?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  isAutoPlay?: Maybe<Scalars['Boolean']['output']>;
  isMuteInitialPlay?: Maybe<Scalars['Boolean']['output']>;
  isSoundtrackTitleVisible?: Maybe<Scalars['Boolean']['output']>;
};

export type SoundtrackOptionsInputType = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  borderColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  buttonTextColor?: InputMaybe<Scalars['String']['input']>;
  contentTextColor?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  isAutoPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isMuteInitialPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isSoundtrackTitleVisible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StarShort = {
  __typename?: 'StarShort';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  auth: User;
};

export type SuggestToWatch = {
  __typename?: 'SuggestToWatch';
  findSuggestToWatchById: FindSuggestToWatchOutput;
  findSuggestToWatchByIds: Array<SuggestToWatchType>;
  searchSuggestToWatch: SearchSuggestToWatchOutput;
};

export type SuggestToWatchFindSuggestToWatchByIdArgs = {
  input: FindSuggestToWatchInput;
};

export type SuggestToWatchFindSuggestToWatchByIdsArgs = {
  input: FindSuggestToWatchGroupInput;
};

export type SuggestToWatchSearchSuggestToWatchArgs = {
  input: SearchSuggestToWatchInput;
};

export type SuggestToWatchType = {
  __typename?: 'SuggestToWatchType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type SuggestionMultimedia = {
  __typename?: 'SuggestionMultimedia';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  permaLink: Scalars['String']['output'];
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SuggestionMultimediaInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SuggestionMultimediaOutput = {
  __typename?: 'SuggestionMultimediaOutput';
  error?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<SuggestionMultimedia>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type Survey = {
  __typename?: 'Survey';
  findSurveyById: FindSurveyOutput;
  findSurveyBySlug: FindSurveyOutput;
  getSurveyResult: SurveyResultOutput;
  searchSurveys: SearchSurveyOutput;
  surveyComments: SurveyCommentsResponse;
};

export type SurveyFindSurveyByIdArgs = {
  input: FindSurveyInput;
};

export type SurveyFindSurveyBySlugArgs = {
  input: FindSurveyBySlugInput;
};

export type SurveyGetSurveyResultArgs = {
  input: SurveyResultInput;
};

export type SurveySearchSurveysArgs = {
  input: SearchSurveyInput;
};

export type SurveyCommentFavoriteType = {
  __typename?: 'SurveyCommentFavoriteType';
  _id: Scalars['Int']['output'];
  client: Scalars['String']['output'];
  comment: SurveyCommentsType;
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type SurveyCommentsFavoriteResponse = {
  __typename?: 'SurveyCommentsFavoriteResponse';
  findSurveyCommentsFavoriteById: FindSurveyCommentsFavoritesOutput;
  findSurveyCommentsFavoriteByIds: Array<SurveyCommentFavoriteType>;
  searchSurveyCommentsFavorite: SearchSurveyCommentsFavoriteOutput;
};

export type SurveyCommentsFavoriteResponseFindSurveyCommentsFavoriteByIdArgs = {
  input: FindSurveyCommentsFavoriteInput;
};

export type SurveyCommentsFavoriteResponseFindSurveyCommentsFavoriteByIdsArgs = {
  input: FindSurveyCommentsFavoritesInput;
};

export type SurveyCommentsFavoriteResponseSearchSurveyCommentsFavoriteArgs = {
  input: SearchSurveyCommentsFavoriteInput;
};

export type SurveyCommentsResponse = {
  __typename?: 'SurveyCommentsResponse';
  favorite: SurveyCommentsFavoriteResponse;
  findSurveyCommentsById: FindSurveyCommentsOutput;
  findSurveyCommentsByIds: Array<SurveyCommentsType>;
  searchSurveyComments: SearchSurveyCommentsOutput;
};

export type SurveyCommentsResponseFindSurveyCommentsByIdArgs = {
  input: FindSurveyCommentsInput;
};

export type SurveyCommentsResponseFindSurveyCommentsByIdsArgs = {
  input: FindSurveyCommentsGroupInput;
};

export type SurveyCommentsResponseSearchSurveyCommentsArgs = {
  input: SearchSurveyCommentsInput;
};

export type SurveyCommentsType = {
  __typename?: 'SurveyCommentsType';
  _id: Scalars['Int']['output'];
  approved?: Maybe<BooleanEnum>;
  author: Scalars['String']['output'];
  authorEmail?: Maybe<Scalars['String']['output']>;
  childs?: Maybe<Array<SurveyCommentsType>>;
  client: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  favoriteCount?: Maybe<Scalars['Float']['output']>;
  isUserFavorite: Scalars['Boolean']['output'];
  parent?: Maybe<SurveyCommentsType>;
  survey: SurveyType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type SurveyCrewInput = {
  crew: Scalars['Int']['input'];
  exitOrdinal?: InputMaybe<Scalars['Float']['input']>;
  primaryRole?: InputMaybe<Scalars['String']['input']>;
  roleChangeCause?: InputMaybe<Scalars['String']['input']>;
  secondaryRole?: InputMaybe<Scalars['String']['input']>;
};

export type SurveyCrewType = {
  __typename?: 'SurveyCrewType';
  crew: TemporaryCrewType;
  exitOrdinal?: Maybe<Scalars['Float']['output']>;
  primaryRole?: Maybe<Scalars['String']['output']>;
  roleChangeCause?: Maybe<Scalars['String']['output']>;
  secondaryRole?: Maybe<Scalars['String']['output']>;
};

export type SurveyCrewVoteInput = {
  __typename?: 'SurveyCrewVoteInput';
  crew: Scalars['Int']['output'];
  rate: Scalars['Int']['output'];
};

export type SurveyCrewVoteInputType = {
  crew: Scalars['Int']['input'];
  rate: Scalars['Int']['input'];
};

export type SurveyCrewVoteOutput = {
  __typename?: 'SurveyCrewVoteOutput';
  crew: TemporaryCrewType;
  rate: Scalars['Float']['output'];
};

export type SurveyOutput = {
  __typename?: 'SurveyOutput';
  _id: Scalars['String']['output'];
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  crewVotes?: Maybe<Array<SurveyCrewVoteInput>>;
  description?: Maybe<Scalars['String']['output']>;
  episode?: Maybe<EpisodesType>;
  excerpt?: Maybe<Scalars['String']['output']>;
  finishDate: Scalars['DateTime']['output'];
  isEditorChoice?: Maybe<Scalars['Boolean']['output']>;
  isUserVoted: Scalars['Boolean']['output'];
  multimedia: MultimediaType;
  selectedCrews: Array<SurveyCrewType>;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  votersCount: Scalars['Int']['output'];
};

export type SurveyResultInput = {
  id: Scalars['String']['input'];
};

export type SurveyResultOutput = {
  __typename?: 'SurveyResultOutput';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Array<SurveyCrewVoteOutput>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SurveyType = {
  __typename?: 'SurveyType';
  _id: Scalars['String']['output'];
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  episode?: Maybe<EpisodesType>;
  excerpt?: Maybe<Scalars['String']['output']>;
  finishDate: Scalars['DateTime']['output'];
  isEditorChoice?: Maybe<Scalars['Boolean']['output']>;
  multimedia: MultimediaType;
  selectedCrews: Array<SurveyCrewType>;
  slug: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TagFilterInputType = {
  filter?: InputMaybe<TagFilterItemsInputType>;
  tag?: InputMaybe<Scalars['Float']['input']>;
};

export type TagFilterItemsInputType = {
  ages?: InputMaybe<Array<Scalars['Int']['input']>>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  crew?: InputMaybe<Array<Scalars['Int']['input']>>;
  dubbedTypes?: InputMaybe<Array<Scalars['Int']['input']>>;
  genres?: InputMaybe<Array<Scalars['Int']['input']>>;
  imdb?: InputMaybe<Scalars['Int']['input']>;
  originalNetwork?: InputMaybe<Array<Scalars['Int']['input']>>;
  release?: InputMaybe<Scalars['Int']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type TagFilterItemsType = {
  __typename?: 'TagFilterItemsType';
  ages?: Maybe<Array<Scalars['Int']['output']>>;
  categories?: Maybe<Array<Scalars['Int']['output']>>;
  countries?: Maybe<Array<Scalars['Int']['output']>>;
  crew?: Maybe<Array<Scalars['Int']['output']>>;
  dubbedTypes?: Maybe<Array<Scalars['Int']['output']>>;
  genres?: Maybe<Array<Scalars['Int']['output']>>;
  imdb?: Maybe<Scalars['Int']['output']>;
  originalNetwork?: Maybe<Array<Scalars['Int']['output']>>;
  release?: Maybe<Scalars['Int']['output']>;
  years?: Maybe<Array<Scalars['Int']['output']>>;
};

export type TagFilterResponse = {
  __typename?: 'TagFilterResponse';
  findTagFilterById: FindTagFilterOutput;
  findTagFilterByIds: Array<TagFilterType>;
  searchTagFilter: SearchTagFilterOutput;
};

export type TagFilterResponseFindTagFilterByIdArgs = {
  input: FindTagFilterInput;
};

export type TagFilterResponseFindTagFilterByIdsArgs = {
  input: FindTagFiltersInput;
};

export type TagFilterResponseSearchTagFilterArgs = {
  input: SearchTagFilterInput;
};

export type TagFilterType = {
  __typename?: 'TagFilterType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<TagFilterItemsType>;
  tag?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum TagStatusEnum {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
  Trash = 'TRASH',
}

export type TagWidgetInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  termId?: InputMaybe<Scalars['Int']['input']>;
  termTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export type Tags = {
  __typename?: 'Tags';
  findTagBySlug: FindTagsOutput;
  findTagsById: FindTagsOutput;
  findTagsByIds: Array<TagsType>;
  searchTags: SearchTagsOutput;
};

export type TagsFindTagBySlugArgs = {
  input: FindTagsBySlugInput;
};

export type TagsFindTagsByIdArgs = {
  input: FindTagsInput;
};

export type TagsFindTagsByIdsArgs = {
  input: FindTagsGroupInput;
};

export type TagsSearchTagsArgs = {
  input: SearchTagsInput;
};

export type TagsType = {
  __typename?: 'TagsType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<TagsType>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  status?: Maybe<TagStatusEnum>;
  tagFilter?: Maybe<TagFilterType>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TemporaryAward = {
  __typename?: 'TemporaryAward';
  _id?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AwardStatus>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TemporaryCrewType = {
  __typename?: 'TemporaryCrewType';
  _id: Scalars['Int']['output'];
  album?: Maybe<Array<AlbumType>>;
  approved?: Maybe<Scalars['Boolean']['output']>;
  awards?: Maybe<Array<FestivalDetailType>>;
  biography?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['String']['output']>;
  birthplace?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<PersonsBankType>>;
  cover?: Maybe<Scalars['String']['output']>;
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deathdate?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  descriptionWordCount?: Maybe<Scalars['Float']['output']>;
  englishTitle?: Maybe<Scalars['String']['output']>;
  father?: Maybe<PersonsBankType>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  imdbId?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  isShowcase?: Maybe<BooleanEnum>;
  maritalStatus?: Maybe<MaritalStatusType>;
  mother?: Maybe<PersonsBankType>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Array<Scalars['String']['output']>>;
  nickname?: Maybe<Scalars['String']['output']>;
  originalDescription?: Maybe<Scalars['String']['output']>;
  otherJobs?: Maybe<Array<Scalars['String']['output']>>;
  parent?: Maybe<Scalars['Int']['output']>;
  personId?: Maybe<Scalars['String']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  previousDescription?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<CrewEnum>>;
  secondaryName?: Maybe<Scalars['String']['output']>;
  secondaryTitle?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  sibling?: Maybe<Array<PersonsBankType>>;
  slug?: Maybe<Scalars['String']['output']>;
  socialMediaAccounts?: Maybe<Array<Scalars['String']['output']>>;
  spouses?: Maybe<Array<PersonSpouseType>>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<VideoObjectType>>;
};

export enum TextTrackingCollectionName {
  Crew = 'CREW',
  Multimedia = 'MULTIMEDIA',
  Paper = 'PAPER',
}

export type TextTrackingResponse = {
  __typename?: 'TextTrackingResponse';
  findTextTrackingById: FindTextTrackingOutput;
  findTextTrackingByIds: Array<TextTrackingType>;
  findTextTrackingByItemIdAndType: TextTrackingType;
  searchTextTracking: SearchTextTrackingOutput;
};

export type TextTrackingResponseFindTextTrackingByIdArgs = {
  input: FindTextTrackingInput;
};

export type TextTrackingResponseFindTextTrackingByIdsArgs = {
  input: FindTextTrackingGroupInput;
};

export type TextTrackingResponseFindTextTrackingByItemIdAndTypeArgs = {
  input: FindTextTrackingByItemIdAndTypeInput;
};

export type TextTrackingResponseSearchTextTrackingArgs = {
  input: SearchTextTrackingInput;
};

export type TextTrackingType = {
  __typename?: 'TextTrackingType';
  _id: Scalars['Int']['output'];
  addedWordCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  currentText?: Maybe<Scalars['String']['output']>;
  itemId: Scalars['Int']['output'];
  previousText?: Maybe<Scalars['String']['output']>;
  previousTotalWordCount?: Maybe<Scalars['Int']['output']>;
  removedWordCount?: Maybe<Scalars['Int']['output']>;
  totalWordCount?: Maybe<Scalars['Int']['output']>;
  type: TextTrackingCollectionName;
  unchangedWordCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserOutputType>;
};

export type TitleSearched = {
  __typename?: 'TitleSearched';
  searchCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type TokenInput = {
  token: Scalars['String']['input'];
};

export type TrailerData = {
  __typename?: 'TrailerData';
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  imDbId: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  linkEmbed?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploadDate?: Maybe<Scalars['String']['output']>;
  videoDescription?: Maybe<Scalars['String']['output']>;
  videoId?: Maybe<Scalars['String']['output']>;
  videoTitle?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type TrailerOptions = {
  __typename?: 'TrailerOptions';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  borderColor?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['Float']['output']>;
  buttonTextColor?: Maybe<Scalars['String']['output']>;
  contentTextColor?: Maybe<Scalars['String']['output']>;
  iconColor?: Maybe<Scalars['String']['output']>;
  isAutoPlay?: Maybe<Scalars['Boolean']['output']>;
  isMuteInitialPlay?: Maybe<Scalars['Boolean']['output']>;
  isVideoTitleVisible?: Maybe<Scalars['Boolean']['output']>;
};

export type TrailerOptionsInputType = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  borderColor?: InputMaybe<Scalars['String']['input']>;
  borderRadius?: InputMaybe<Scalars['Float']['input']>;
  buttonTextColor?: InputMaybe<Scalars['String']['input']>;
  contentTextColor?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  isAutoPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isMuteInitialPlay?: InputMaybe<Scalars['Boolean']['input']>;
  isVideoTitleVisible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TrandsDownload = {
  __typename?: 'TrandsDownload';
  changesPercent?: Maybe<Scalars['Int']['output']>;
  currentCount?: Maybe<Scalars['Int']['output']>;
  multimediaId?: Maybe<Scalars['String']['output']>;
  multimediaTitle?: Maybe<Scalars['String']['output']>;
  pastCount?: Maybe<Scalars['Int']['output']>;
};

export type TrandsLink = {
  __typename?: 'TrandsLink';
  changesPercent?: Maybe<Scalars['Int']['output']>;
  currentCount?: Maybe<Scalars['Int']['output']>;
  pageTitle?: Maybe<Scalars['String']['output']>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  pastCount?: Maybe<Scalars['Int']['output']>;
};

export type TrendLinkType = {
  __typename?: 'TrendLinkType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum TrendsDownloadType {
  DownTrend = 'DOWN_TREND',
  UpTrend = 'UP_TREND',
}

export enum TrendsLinkType {
  DownTrend = 'DOWN_TREND',
  UpTrend = 'UP_TREND',
}

export type TvSeriesInfo = {
  __typename?: 'TvSeriesInfo';
  creatorList?: Maybe<Array<Scalars['String']['output']>>;
  creators?: Maybe<Array<Scalars['String']['output']>>;
  seasons?: Maybe<Array<Scalars['String']['output']>>;
  yearEnd?: Maybe<Scalars['String']['output']>;
};

export type UpdateAgeInput = {
  ageId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAgeOutput = {
  __typename?: 'UpdateAgeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateAlbumInput = {
  albumId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  excludedItems?: InputMaybe<Array<ExcludeAlbumImageItem>>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAlbumOutput = {
  __typename?: 'UpdateAlbumOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateAwardInput = {
  awardType?: InputMaybe<FestivalAwardType>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAwardOutput = {
  __typename?: 'UpdateAwardOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateBiographyBookmarkInput = {
  biography?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateBiographyBookmarkOutput = {
  __typename?: 'UpdateBiographyBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateBiographyInput = {
  crew?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateBiographyOutput = {
  __typename?: 'UpdateBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateBiographyRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type UpdateBiographyRichsnippetOutput = {
  __typename?: 'UpdateBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateBoxOfficeInput = {
  currencyType?: InputMaybe<BoxOfficeCurrencyEnum>;
  id: Scalars['Int']['input'];
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  sale?: InputMaybe<Scalars['String']['input']>;
  suffixType?: InputMaybe<BoxOfficeSuffixEnum>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BoxOfficeTypeEnum>;
};

export type UpdateBoxOfficeOutput = {
  __typename?: 'UpdateBoxOfficeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateBroadcastInput = {
  broadcastId: Scalars['Int']['input'];
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBroadcastOutput = {
  __typename?: 'UpdateBroadcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateBugReportInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  reasons?: InputMaybe<Array<Scalars['String']['input']>>;
  state: BugReportState;
  targetId?: InputMaybe<Scalars['Float']['input']>;
  targetType?: InputMaybe<BugReportTarget>;
};

export type UpdateBugReportOutput = {
  __typename?: 'UpdateBugReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCategoryInput = {
  categoryId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryOutput = {
  __typename?: 'UpdateCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCollectionInput = {
  collectionId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CollectionFilterInputType>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  isContentApproved?: InputMaybe<Scalars['Boolean']['input']>;
  mobileThumbnail?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Array<Scalars['Int']['input']>>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCollectionOutput = {
  __typename?: 'UpdateCollectionOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCommentInput = {
  approved?: InputMaybe<BooleanEnum>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  commentId: Scalars['Int']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  createUser?: InputMaybe<UserOutputInputType>;
  parent?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCommentOutput = {
  __typename?: 'UpdateCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateContactsInput = {
  contactId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactsOutput = {
  __typename?: 'UpdateContactsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCountryInput = {
  countryId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCountryOutput = {
  __typename?: 'UpdateCountryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCrewInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  biography?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  birthplace?: InputMaybe<Scalars['String']['input']>;
  children?: InputMaybe<Array<Scalars['String']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  crewId: Scalars['Int']['input'];
  deathdate?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  father?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  income?: InputMaybe<Scalars['Int']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isShowcase?: InputMaybe<BooleanEnum>;
  mother?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  otherJobs?: InputMaybe<Array<Scalars['String']['input']>>;
  parent?: InputMaybe<Scalars['Int']['input']>;
  person?: InputMaybe<Scalars['String']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  secondaryName?: InputMaybe<Scalars['String']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  sibling?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  socialMediaAccounts?: InputMaybe<Array<Scalars['String']['input']>>;
  spouses?: InputMaybe<Array<CreatePersonSpouseInputType>>;
  trademarks?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateCrewOutput = {
  __typename?: 'UpdateCrewOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateDeviceInput = {
  id: Scalars['String']['input'];
  userAgent?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDistributionCompanyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDistributionCompanyOutput = {
  __typename?: 'UpdateDistributionCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateDubbedTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dubbedTypeId: Scalars['Int']['input'];
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDubbedTypeOutput = {
  __typename?: 'UpdateDubbedTypeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateEditorChoiceInput = {
  id: Scalars['String']['input'];
  multimedia?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateEditorChoiceOutput = {
  __typename?: 'UpdateEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateEmbedInput = {
  codeType?: InputMaybe<EmbedCodeType>;
  contentType?: InputMaybe<EmbedContentTypeEnum>;
  downloadOptions?: InputMaybe<DownloadOptionsInputType>;
  embedId: Scalars['String']['input'];
  embedType?: InputMaybe<EmbedTypeEnum>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  onlinePlayOptions?: InputMaybe<OnlinePlayOptionsInputType>;
  pictureGalleryOptions?: InputMaybe<PictureGalleryOptionsInputType>;
  podcastOptions?: InputMaybe<PodcastOptionsInputType>;
  scoresOptions?: InputMaybe<ScoresOptionsInputType>;
  soundtrackOptions?: InputMaybe<SoundtrackOptionsInputType>;
  trailerOptions?: InputMaybe<TrailerOptionsInputType>;
};

export type UpdateEmbedOutput = {
  __typename?: 'UpdateEmbedOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateEpisodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dubbedType?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  episodeId: Scalars['Int']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  hasPage?: InputMaybe<Scalars['Boolean']['input']>;
  links?: InputMaybe<Array<Scalars['Int']['input']>>;
  onlinePlaybackUrl?: InputMaybe<Scalars['String']['input']>;
  ordinal?: InputMaybe<Scalars['Int']['input']>;
  post?: InputMaybe<Scalars['Int']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEpisodeOutput = {
  __typename?: 'UpdateEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateFestivalDetailInput = {
  crew?: InputMaybe<Array<FestivalCrewInputType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  festival?: InputMaybe<Scalars['Float']['input']>;
  festivalYear?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  multimedia?: InputMaybe<Array<FestivalMultimediaInputType>>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFestivalDetailOutput = {
  __typename?: 'UpdateFestivalDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateFestivalInput = {
  awards?: InputMaybe<Array<Scalars['Float']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  festivalDetails?: InputMaybe<Array<Scalars['Float']['input']>>;
  id: Scalars['Int']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFestivalOutput = {
  __typename?: 'UpdateFestivalOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateFilmingLocationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFilmingLocationOutput = {
  __typename?: 'UpdateFilmingLocationOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateGenreInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  genreId: Scalars['Int']['input'];
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGenreOutput = {
  __typename?: 'UpdateGenreOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateHomePageSeoInput = {
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
};

export type UpdateHomePageSeoOutput = {
  __typename?: 'UpdateHomePageSeoOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateImageInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  mediaLibraryId: Scalars['Int']['input'];
  preview?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateImageOutput = {
  __typename?: 'UpdateImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateInternalLinkInput = {
  id: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  linkOptions?: InputMaybe<LinkOptionsInputType>;
  paragraph?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInternalLinkOutput = {
  __typename?: 'UpdateInternalLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateLanguageInput = {
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLanguageOutput = {
  __typename?: 'UpdateLanguageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateLinkInput = {
  dubbedType?: InputMaybe<Scalars['Int']['input']>;
  encoder?: InputMaybe<Scalars['String']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  linkId: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LinkType>;
};

export type UpdateLinkOutput = {
  __typename?: 'UpdateLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMagSeoInput = {
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
};

export type UpdateMainMenuInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  link?: InputMaybe<Scalars['String']['input']>;
  mainMenuId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMainMenuOutput = {
  __typename?: 'UpdateMainMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateManyEpisodeInput = {
  updateEpisodeInput: Array<UpdateEpisodeInput>;
};

export type UpdateManyMusicEpisodeInput = {
  updateEpisodeInput: Array<UpdateMusicEpisodeInput>;
};

export type UpdateMenuInput = {
  items?: InputMaybe<Array<MenuItemInputType>>;
};

export type UpdateMenuOutput = {
  __typename?: 'UpdateMenuOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMultimediaBookmarkInput = {
  id: Scalars['Int']['input'];
  multimedia?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMultimediaBookmarkOutput = {
  __typename?: 'UpdateMultimediaBookmarkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMultimediaCommentsFavoriteInput = {
  comment?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateMultimediaCommentsFavoriteOutput = {
  __typename?: 'UpdateMultimediaCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMultimediaFavoriteInput = {
  id: Scalars['Int']['input'];
  multimedia?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMultimediaFavoriteOutput = {
  __typename?: 'UpdateMultimediaFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMultimediaInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  boxOffice?: InputMaybe<MultimediaCUrrencyInputType>;
  broadcastStatus?: InputMaybe<MediaBroadcastStatusType>;
  budget?: InputMaybe<MultimediaCUrrencyInputType>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  crew?: InputMaybe<Array<MultimediaCrewInputType>>;
  distributionCompanies?: InputMaybe<Array<Scalars['Int']['input']>>;
  dubbedType?: InputMaybe<Scalars['Int']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Array<Scalars['Int']['input']>>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  filmingLocations?: InputMaybe<Array<Scalars['Int']['input']>>;
  genres?: InputMaybe<Array<Scalars['Int']['input']>>;
  hasTimestamps?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  imdbId?: InputMaybe<Scalars['String']['input']>;
  imdbScore?: InputMaybe<Scalars['Float']['input']>;
  imdbVotes?: InputMaybe<Scalars['Float']['input']>;
  isContentApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isDownloadAndStreamAuth?: InputMaybe<Scalars['Boolean']['input']>;
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isSuggestion?: InputMaybe<Scalars['Boolean']['input']>;
  languages?: InputMaybe<Array<Scalars['Int']['input']>>;
  metacriticScore?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalNetwork?: InputMaybe<Array<Scalars['Int']['input']>>;
  podcast?: InputMaybe<Scalars['String']['input']>;
  producerCompanies?: InputMaybe<Array<Scalars['Int']['input']>>;
  publishDate?: InputMaybe<Scalars['String']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  restartBroadcastingDate?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  rottenTomatoesScore?: InputMaybe<Scalars['Float']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  showcase?: InputMaybe<CreateShowcaseInMultimedia>;
  status?: InputMaybe<MultimediaStatusEnum>;
  stopBroadcastingDate?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMultimediaRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type UpdateMultimediaRichsnippetOutput = {
  __typename?: 'UpdateMultimediaRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMusicEpisodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  links?: InputMaybe<Array<Scalars['Int']['input']>>;
  music?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MusicEpisodeTypeEnum>;
};

export type UpdateMusicEpisodeOutput = {
  __typename?: 'UpdateMusicEpisodeOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMusicInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  isContentApproved?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  musicEpisodes?: InputMaybe<Array<Scalars['Int']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  persons?: InputMaybe<Array<Scalars['Int']['input']>>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  status?: InputMaybe<MusicStatusEnum>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMusicLinkInput = {
  encoder?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  musicEpisode?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MusicLinkTypeEnum>;
};

export type UpdateMusicLinkOutput = {
  __typename?: 'UpdateMusicLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMusicOutput = {
  __typename?: 'UpdateMusicOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateNetworkBiographyInput = {
  id: Scalars['Int']['input'];
  originalNetwork?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateNetworkBiographyOutput = {
  __typename?: 'UpdateNetworkBiographyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateNetworkBiographyRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type UpdateNetworkBiographyRichsnippetOutput = {
  __typename?: 'UpdateNetworkBiographyRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateNotFoundReportInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  reportId: Scalars['Int']['input'];
};

export type UpdateNotFoundReportOutput = {
  __typename?: 'UpdateNotFoundReportOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateOriginalNetworkInput = {
  CEOs?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  establishedYear?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  headOffice?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  socialMediaAccounts?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOriginalNetworkOutput = {
  __typename?: 'UpdateOriginalNetworkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperCategoryInput = {
  categoryId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperCategoryOutput = {
  __typename?: 'UpdatePaperCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperCommentInput = {
  approved?: InputMaybe<BooleanEnum>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  commentId: Scalars['Int']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePaperCommentOutput = {
  __typename?: 'UpdatePaperCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperCommentsFavoriteInput = {
  comment?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperCommentsFavoriteOutput = {
  __typename?: 'UpdatePaperCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperEditorChoiceInput = {
  id: Scalars['String']['input'];
  paper?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperEditorChoiceOutput = {
  __typename?: 'UpdatePaperEditorChoiceOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperFavoriteInput = {
  id: Scalars['Int']['input'];
  paper?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperFavoriteOutput = {
  __typename?: 'UpdatePaperFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  companies?: InputMaybe<Array<CompanyInputDto>>;
  content?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  isWide?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia?: InputMaybe<Array<PaperMultimediaInputDto>>;
  name?: InputMaybe<Scalars['String']['input']>;
  paperType?: InputMaybe<PaperContentType>;
  persons?: InputMaybe<Array<PersonInputDto>>;
  publishDate?: InputMaybe<Scalars['String']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  seoApprovalItems?: InputMaybe<SeoApprovalItemsInputType>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  showcase?: InputMaybe<CreateShowcaseInPaper>;
  status?: InputMaybe<PaperStatus>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaperLinkInput = {
  id: Scalars['Int']['input'];
  links?: InputMaybe<Array<Scalars['String']['input']>>;
  paper?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperLinkOutput = {
  __typename?: 'UpdatePaperLinkOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperOutput = {
  __typename?: 'UpdatePaperOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperRichsnippetInput = {
  richsnippetId: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};

export type UpdatePaperRichsnippetOutput = {
  __typename?: 'UpdatePaperRichsnippetOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperShowcaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  paper?: InputMaybe<Scalars['Float']['input']>;
  showcaseId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperShowcaseOutput = {
  __typename?: 'UpdatePaperShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaperVisitStatisticsInput = {
  id: Scalars['String']['input'];
  paper?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaperContentType>;
};

export type UpdatePaperVisitStatisticsOutput = {
  __typename?: 'UpdatePaperVisitStatisticsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePersonInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  biography?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  birthplace?: InputMaybe<Scalars['String']['input']>;
  children?: InputMaybe<Array<Scalars['String']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  deathdate?: InputMaybe<Scalars['String']['input']>;
  englishTitle?: InputMaybe<Scalars['String']['input']>;
  father?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  imdbId?: InputMaybe<Scalars['String']['input']>;
  mother?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  otherJobs?: InputMaybe<Array<Scalars['String']['input']>>;
  personId: Scalars['String']['input'];
  secondaryName?: InputMaybe<Scalars['String']['input']>;
  secondaryTitle?: InputMaybe<Scalars['String']['input']>;
  sibling?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  socialMediaAccounts?: InputMaybe<Array<Scalars['String']['input']>>;
  spouses?: InputMaybe<Array<CreatePersonSpouseInputType>>;
};

export type UpdatePersonOutput = {
  __typename?: 'UpdatePersonOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePinInput = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  isHomePage?: InputMaybe<Scalars['Boolean']['input']>;
  paper?: InputMaybe<Scalars['Int']['input']>;
  pinId: Scalars['Int']['input'];
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePinOutput = {
  __typename?: 'UpdatePinOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePodcastInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  podcastId: Scalars['String']['input'];
  status?: InputMaybe<PodcastStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePodcastOutput = {
  __typename?: 'UpdatePodcastOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateProducerCompanyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProducerCompanyOutput = {
  __typename?: 'UpdateProducerCompanyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateRedirectInput = {
  newPath?: InputMaybe<Scalars['String']['input']>;
  oldPath?: InputMaybe<Scalars['String']['input']>;
  redirectId: Scalars['String']['input'];
  type?: InputMaybe<RedirectType>;
};

export type UpdateRedirectOutput = {
  __typename?: 'UpdateRedirectOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateRolesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  persons?: InputMaybe<Array<Scalars['Int']['input']>>;
  rolesId: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRolesOutput = {
  __typename?: 'UpdateRolesOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSeoBoxInput = {
  description?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSeoBoxOutput = {
  __typename?: 'UpdateSeoBoxOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSeoDataInput = {
  head?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  seoDataId: Scalars['Int']['input'];
  type?: InputMaybe<SeoCollectionName>;
};

export type UpdateSeoDataOutput = {
  __typename?: 'UpdateSeoDataOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSeoSettingsInput = {
  general?: InputMaybe<SeoGeneralSettingsInputType>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  seoSettingsId: Scalars['Int']['input'];
  type?: InputMaybe<SeoCollectionName>;
};

export type UpdateSeoSettingsOutput = {
  __typename?: 'UpdateSeoSettingsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateShowcaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Scalars['Float']['input']>;
  showcaseId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShowcaseOutput = {
  __typename?: 'UpdateShowcaseOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSuggestToWatchInput = {
  id: Scalars['String']['input'];
  multimedia?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSuggestToWatchOutput = {
  __typename?: 'UpdateSuggestToWatchOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSurveyCommentInput = {
  approved?: InputMaybe<BooleanEnum>;
  author?: InputMaybe<Scalars['String']['input']>;
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  commentId: Scalars['Int']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  createUser?: InputMaybe<UserOutputInputType>;
  parent?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateSurveyCommentOutput = {
  __typename?: 'UpdateSurveyCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSurveyCommentsFavoriteInput = {
  comment?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateSurveyCommentsFavoriteOutput = {
  __typename?: 'UpdateSurveyCommentsFavoriteOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSurveyInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  finishDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isEditorChoice?: InputMaybe<Scalars['Boolean']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  selectedCrews?: InputMaybe<Array<SurveyCrewInput>>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSurveyOutput = {
  __typename?: 'UpdateSurveyOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateTagFilterInput = {
  filter?: InputMaybe<TagFilterItemsInputType>;
  id: Scalars['Int']['input'];
  tag?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateTagFilterOutput = {
  __typename?: 'UpdateTagFilterOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TagFilterItemsInputType>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TagStatusEnum>;
  tagFilter?: InputMaybe<TagFilterInputType>;
  tagId: Scalars['Int']['input'];
};

export type UpdateTagOutput = {
  __typename?: 'UpdateTagOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateTextTrackingInput = {
  addedWordCount?: InputMaybe<Scalars['Int']['input']>;
  currentText?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  itemId?: InputMaybe<Scalars['Int']['input']>;
  previousText?: InputMaybe<Scalars['String']['input']>;
  previousTotalWordCount?: InputMaybe<Scalars['Int']['input']>;
  removedWordCount?: InputMaybe<Scalars['Int']['input']>;
  totalWordCount?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<TextTrackingCollectionName>;
  unchangedWordCount?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTextTrackingOutput = {
  __typename?: 'UpdateTextTrackingOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateTrendLinksInput = {
  link?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trendLinkId: Scalars['Int']['input'];
};

export type UpdateTrendLinksOutput = {
  __typename?: 'UpdateTrendLinksOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateUserByCeo = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  userId: Scalars['Int']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserImageInput = {
  status?: InputMaybe<UserImageStatusEnum>;
  userId: Scalars['Int']['input'];
};

export type UpdateUserImageOutput = {
  __typename?: 'UpdateUserImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOutput = {
  __typename?: 'UpdateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateVideoGalleryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  galleryId: Scalars['String']['input'];
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<VideoItem>>;
};

export type UpdateVideoGalleryOutput = {
  __typename?: 'UpdateVideoGalleryOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateVideoInput = {
  crewItems?: InputMaybe<Array<CrewItemInput>>;
  duration?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  multimedia?: InputMaybe<Scalars['Int']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<VideoType>;
  url?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['Int']['input'];
};

export type UpdateVideoOutput = {
  __typename?: 'UpdateVideoOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateYearInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSeoApproval?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isDescriptionApproved?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['Float']['input']>;
  seoData?: InputMaybe<SeoDataInput>;
  seoSettings?: InputMaybe<SeoSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  yearId: Scalars['Int']['input'];
};

export type UpdateYearOutput = {
  __typename?: 'UpdateYearOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UploadAlbumImageInput = {
  crewItems?: InputMaybe<Array<CrewItemInput>>;
  multimedia: Scalars['Int']['input'];
};

export type UploadAlbumImageOutput = {
  __typename?: 'UploadAlbumImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UploadImageAlbumInput = {
  albumId: Scalars['String']['input'];
  crewItems?: InputMaybe<Array<CrewItemInput>>;
};

export type UploadImageInputType = {
  alt?: InputMaybe<Scalars['String']['input']>;
};

export type UploadImageOutput = {
  __typename?: 'UploadImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UploadUserImageOutput = {
  __typename?: 'UploadUserImageOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  isCreatedWithSocialMedia?: Maybe<Scalars['Boolean']['output']>;
  isVerified: Scalars['Boolean']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserImage = {
  __typename?: 'UserImage';
  findById: UserImageType;
  findByUserId: UserImageType;
  getAvatar: UserImageType;
  search: SearchUserImageOutput;
  searchAllPublishedUserImages: SearchUserImageOutput;
};

export type UserImageFindByIdArgs = {
  input: FindImageByIdInput;
};

export type UserImageFindByUserIdArgs = {
  input: FindImageByUserIdInput;
};

export type UserImageSearchArgs = {
  input: SearchUserImageInput;
};

export type UserImageSearchAllPublishedUserImagesArgs = {
  input: PaginationInput;
};

export enum UserImageStatusEnum {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
}

export type UserImageType = {
  __typename?: 'UserImageType';
  _id: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  image?: Maybe<MediaLibraryImageType>;
  status?: Maybe<UserImageStatusEnum>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  user: UserOutputType;
};

export type UserOutputInputType = {
  _id: Scalars['Float']['input'];
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isCreatedWithSocialMedia?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified: Scalars['Boolean']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserOutputType = {
  __typename?: 'UserOutputType';
  _id: Scalars['Float']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  isCreatedWithSocialMedia?: Maybe<Scalars['Boolean']['output']>;
  isVerified: Scalars['Boolean']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserRatingItemData = {
  __typename?: 'UserRatingItemData';
  percent?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
  votes?: Maybe<Scalars['String']['output']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  findUserById: UserOutputType;
  findUsersByIds: Array<UserOutputType>;
  getUserRoles: UserRoleOutput;
  searchUser: SearchUserOutput;
  searchUserByRole: SearchUserByRoleOutput;
};

export type UserResponseFindUserByIdArgs = {
  input: FindUserInput;
};

export type UserResponseFindUsersByIdsArgs = {
  input: FindUsersInput;
};

export type UserResponseSearchUserArgs = {
  input: SearchUserInput;
};

export type UserResponseSearchUserByRoleArgs = {
  input: SearchUserByRoleInput;
};

export type UserRoleOutput = {
  __typename?: 'UserRoleOutput';
  error?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<RoleOutput>>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type VerifyAccountInput = {
  code: Scalars['String']['input'];
};

export type VerifyAccountOutput = {
  __typename?: 'VerifyAccountOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type VideoGalleryObjectType = {
  __typename?: 'VideoGalleryObjectType';
  _id: Scalars['String']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  seoData?: Maybe<SeoDataType>;
  seoSettings?: Maybe<SeoSettingsType>;
  title?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<VideoObjectType>>;
};

export type VideoGalleryResponse = {
  __typename?: 'VideoGalleryResponse';
  findGalleryById: FindVideoGalleryOutput;
  findGalleryByMultimedia: FindVideoGalleryOutput;
  findVideoById: FindVideoOutput;
  searchGalleries: SearchVideoGalleryOutput;
  searchRelatedVideos: SearchRelatedVideosOutput;
  searchVideosByCrewSlug: SearchVideoByCrewOutput;
  searchVideosByMultimedia: SearchVideoOutput;
};

export type VideoGalleryResponseFindGalleryByIdArgs = {
  input: FindVideoGalleryInput;
};

export type VideoGalleryResponseFindGalleryByMultimediaArgs = {
  input: FindVideoGalleryByMultimediaInput;
};

export type VideoGalleryResponseFindVideoByIdArgs = {
  input: FindVideoInput;
};

export type VideoGalleryResponseSearchGalleriesArgs = {
  input: SearchVideoGalleryInput;
};

export type VideoGalleryResponseSearchRelatedVideosArgs = {
  input: SearchRelatedVideosInput;
};

export type VideoGalleryResponseSearchVideosByCrewSlugArgs = {
  input: SearchVideoByCrewSlugInput;
};

export type VideoGalleryResponseSearchVideosByMultimediaArgs = {
  input: SearchVideoInput;
};

export type VideoItem = {
  crewItems?: InputMaybe<Array<CrewItemInput>>;
  duration?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: VideoType;
  url: Scalars['String']['input'];
};

export type VideoObjectType = {
  __typename?: 'VideoObjectType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  crewItems?: Maybe<Array<CrewItemType>>;
  duration?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  multimedia: MultimediaType;
  releaseDate?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: VideoType;
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export enum VideoType {
  Clip = 'CLIP',
  Featurette = 'FEATURETTE',
  Interview = 'INTERVIEW',
  Trailer = 'TRAILER',
  Video = 'VIDEO',
}

export type VideoTypeItem = {
  __typename?: 'VideoTypeItem';
  count: Scalars['Int']['output'];
  type: VideoType;
};

export enum VisitStatisticsSortType {
  LeastVisits = 'LEAST_VISITS',
  MostVisits = 'MOST_VISITS',
}

export type VotesDetails = {
  __typename?: 'VotesDetails';
  multimedia?: Maybe<Scalars['Int']['output']>;
  scoreGroup?: Maybe<Array<Score>>;
  totalVotesCount?: Maybe<Scalars['Int']['output']>;
};

export type WeeklyBroadCastInput = {
  broadcastType?: BroadCastTypeEnum;
  category?: InputMaybe<Scalars['Int']['input']>;
  country?: InputMaybe<Scalars['Int']['input']>;
  day?: InputMaybe<DaysEnum>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type WeeklyBroadcast = {
  __typename?: 'WeeklyBroadcast';
  friday?: Maybe<Array<MultimediaWithEpisodes>>;
  monday?: Maybe<Array<MultimediaWithEpisodes>>;
  saturday?: Maybe<Array<MultimediaWithEpisodes>>;
  sunday?: Maybe<Array<MultimediaWithEpisodes>>;
  thursday?: Maybe<Array<MultimediaWithEpisodes>>;
  tuesday?: Maybe<Array<MultimediaWithEpisodes>>;
  wednesday?: Maybe<Array<MultimediaWithEpisodes>>;
};

export type WeeklyBroadcastWidgetInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
};

export type WidgetsInput = {
  activeSurvey?: InputMaybe<ActiveSurveyWidgetInput>;
  cast?: InputMaybe<Array<CastWidgetInput>>;
  category?: InputMaybe<Array<CategoryWidgetInput>>;
  collection?: InputMaybe<Array<CollectionWidgetInput>>;
  collectionList?: InputMaybe<Array<CollectionListWidgetInput>>;
  comingSoon?: InputMaybe<ComingSoonWidgetInput>;
  country?: InputMaybe<Array<CountryWidgetInput>>;
  editorChoice?: InputMaybe<EditorChoiceWidgetInput>;
  genre?: InputMaybe<Array<GenreWidgetInput>>;
  latest?: InputMaybe<LatestWidgetInput>;
  mostUpToDateSeries?: InputMaybe<MostUpToDateSeriesWidgetInput>;
  passiveSurvey?: InputMaybe<PassiveSurveyWidgetInput>;
  showcase?: InputMaybe<ShowcaseWidgetInput>;
  tag?: InputMaybe<Array<TagWidgetInput>>;
  weeklyBroadcast?: InputMaybe<WeeklyBroadcastWidgetInput>;
  year?: InputMaybe<Array<YearWidgetInput>>;
};

export type WidgetsOutput = {
  __typename?: 'WidgetsOutput';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type WidgetsResponse = {
  __typename?: 'WidgetsResponse';
  mainWidget?: Maybe<Array<MainWidgetOutput>>;
};

export type WidgetsResponseMainWidgetArgs = {
  input: FindMainWidgetInput;
};

export type WikipediaData = {
  __typename?: 'WikipediaData';
  errorMessage?: Maybe<Scalars['String']['output']>;
  fullTitle?: Maybe<Scalars['String']['output']>;
  imDbId: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  plotFull?: Maybe<PlotData>;
  plotShort?: Maybe<PlotData>;
  title?: Maybe<Scalars['String']['output']>;
  titleInLanguage?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type YearWidgetInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  termId?: InputMaybe<Scalars['Int']['input']>;
  termTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MainWidgetType>;
  url: Scalars['String']['input'];
};

export type YearsResponse = {
  __typename?: 'YearsResponse';
  findYearById: FindYearsOutput;
  findYearByIds: Array<YearsType>;
  findYearBySlug: FindYearsOutput;
  searchYears: SearchYearsOutput;
};

export type YearsResponseFindYearByIdArgs = {
  input: FindYearInput;
};

export type YearsResponseFindYearByIdsArgs = {
  input: FindYearGroupInput;
};

export type YearsResponseFindYearBySlugArgs = {
  input: FindYearBySlugInput;
};

export type YearsResponseSearchYearsArgs = {
  input: SearchYearsInput;
};

export type YearsType = {
  __typename?: 'YearsType';
  _id: Scalars['Int']['output'];
  createUser?: Maybe<UserOutputType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasSeoApproval?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  imagePreview?: Maybe<Scalars['String']['output']>;
  isDescriptionApproved?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  originalDescription?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['Float']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  seoData?: Maybe<SeoDataType>;
  seoReviewDate?: Maybe<Scalars['String']['output']>;
  seoSettings?: Maybe<SeoSettingsType>;
  slug: Scalars['String']['output'];
  updateUser?: Maybe<UserOutputType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Analytics = {
  __typename?: 'analytics';
  getClientId: Scalars['String']['output'];
  getTrendsLink: SearchTrandsLinkOutput;
};

export type AnalyticsGetTrendsLinkArgs = {
  input: SearchTrendsLinkInput;
};

export type Contacts = {
  __typename?: 'contacts';
  searchContacts: SearchContactOutput;
};

export type ContactsSearchContactsArgs = {
  input: SearchContactsInput;
};

export type Roles = {
  __typename?: 'roles';
  findRoleById: FindRolesOutput;
  findRolesByIds: Array<RolesType>;
  searchRoles: SearchRolesOutput;
};

export type RolesFindRoleByIdArgs = {
  roleId: Scalars['Float']['input'];
};

export type RolesFindRolesByIdsArgs = {
  input: FindRolesGroupInput;
};

export type RolesSearchRolesArgs = {
  input: SearchRolesInput;
};

export type TrendLinks = {
  __typename?: 'trendLinks';
  findTrendLinkById: FindTrendLinkOutput;
  findTrendLinksByIds: Array<TrendLinkType>;
  searchCachedTrendLinks: SearchTrendLinksOutput;
  searchTrendLinks: SearchTrendLinksOutput;
};

export type TrendLinksFindTrendLinkByIdArgs = {
  input: FindTrendLinkInput;
};

export type TrendLinksFindTrendLinksByIdsArgs = {
  input: FindTrendLinkGroupInput;
};

export type TrendLinksSearchTrendLinksArgs = {
  input: SearchTrendLinksInput;
};
