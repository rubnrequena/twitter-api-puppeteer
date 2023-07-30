export interface TwitterSearch {
  data: Data;
}

export interface Data {
  search_by_raw_query: SearchByRawQuery;
}

export interface SearchByRawQuery {
  search_timeline: SearchTimeline;
}

export interface SearchTimeline {
  timeline: Timeline;
}

export interface Timeline {
  instructions: Instruction[];
  responseObjects: ResponseObjects;
}

export interface Instruction {
  type: string;
  entries: Entry[];
}

export interface Entry {
  entryId: string;
  sortIndex: string;
  content: Content;
}

export interface Content {
  entryType: EntryTypeEnum;
  __typename: EntryTypeEnum;
  itemContent?: ItemContent;
  feedbackInfo?: FeedbackInfo;
  clientEventInfo?: ContentClientEventInfo;
  value?: string;
  cursorType?: string;
}

export enum EntryTypeEnum {
  TimelineTimelineCursor = "TimelineTimelineCursor",
  TimelineTimelineItem = "TimelineTimelineItem",
}

export interface ContentClientEventInfo {
  component: Component;
  element: Element;
  details: Details;
}

export enum Component {
  Result = "result",
}

export interface Details {
  timelinesDetails: TimelinesDetails;
}

export interface TimelinesDetails {
  controllerData: string;
}

export enum Element {
  Tweet = "tweet",
}

export interface FeedbackInfo {
  feedbackKeys: string[];
}

export interface ItemContent {
  itemType: ItemTypeEnum;
  __typename: ItemTypeEnum;
  tweet_results: TweetResults;
  tweetDisplayType: TweetDisplayType;
}

export enum ItemTypeEnum {
  TimelineTweet = "TimelineTweet",
}

export enum TweetDisplayType {
  Tweet = "Tweet",
}

export interface TweetResults {
  result: TweetResultsResult;
}

export interface TweetResultsResult {
  __typename: TweetDisplayType;
  rest_id: string;
  core: Core;
  edit_control: EditControl;
  is_translatable: boolean;
  views: Views;
  source: string;
  legacy: FluffyLegacy;
}

export interface Core {
  user_results: UserResults;
}

export interface UserResults {
  result: UserResultsResult;
}

export interface UserResultsResult {
  __typename: Typename;
  id: ID;
  rest_id: string;
  affiliates_highlighted_label: AffiliatesHighlightedLabel;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  profile_image_shape: ProfileImageShape;
  legacy: PurpleLegacy;
  professional: Professional;
}

export enum Typename {
  User = "User",
}

export interface AffiliatesHighlightedLabel {}

export enum ID {
  VXNlcjo4MDE2MjkzNDExNTk0NTY3Njg = "VXNlcjo4MDE2MjkzNDExNTk0NTY3Njg=",
}

export interface PurpleLegacy {
  following: boolean;
  can_dm: boolean;
  can_media_tag: boolean;
  created_at: CreatedAt;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: PurpleEntities;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  location: Location;
  media_count: number;
  name: LegacyName;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_image_url_https: string;
  profile_interstitial_type: string;
  screen_name: ScreenName;
  statuses_count: number;
  translator_type: TranslatorType;
  url: string;
  verified: boolean;
  want_retweets: boolean;
  withheld_in_countries: any[];
}

export enum CreatedAt {
  ThuNov2403314300002016 = "Thu Nov 24 03:31:43 +0000 2016",
}

export interface PurpleEntities {
  description: Description;
  url: Description;
}

export interface Description {
  urls: URL[];
}

export interface URL {
  display_url: DisplayURL;
  expanded_url: string;
  url: string;
  indices: number[];
}

export enum DisplayURL {
  InstagramCOM = "instagram.com",
  LottoactivoCOM = "lottoactivo.com",
}

export enum Location {
  CaracasVenezuela = "Caracas, Venezuela",
}

export enum LegacyName {
  ElPatronusLottoactivo = "El Patronus Lottoactivo",
}

export enum ScreenName {
  Lottoactivo = "lottoactivo",
}

export enum TranslatorType {
  None = "none",
}

export interface Professional {
  rest_id: string;
  professional_type: ProfessionalType;
  category: Category[];
}

export interface Category {
  id: number;
  name: CategoryName;
  icon_name: IconName;
}

export enum IconName {
  IconBriefcaseStroke = "IconBriefcaseStroke",
}

export enum CategoryName {
  CasinosYJuegos = "Casinos y juegos",
}

export enum ProfessionalType {
  Business = "Business",
}

export enum ProfileImageShape {
  Circle = "Circle",
}

export interface EditControl {
  edit_tweet_ids: string[];
  editable_until_msecs: string;
  is_edit_eligible: boolean;
  edits_remaining: string;
}

export interface FluffyLegacy {
  bookmark_count: number;
  bookmarked: boolean;
  created_at: string;
  conversation_id_str: string;
  display_text_range: number[];
  entities: FluffyEntities;
  extended_entities: ExtendedEntities;
  favorite_count: number;
  favorited: boolean;
  full_text: string;
  is_quote_status: boolean;
  lang: Lang;
  possibly_sensitive: boolean;
  possibly_sensitive_editable: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  retweeted: boolean;
  user_id_str: string;
  id_str: string;
}

export interface FluffyEntities {
  media: Media[];
  user_mentions: any[];
  urls: any[];
  hashtags: Hashtag[];
  symbols: any[];
}

export interface Hashtag {
  indices: number[];
  text: string;
}

export interface Media {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_url_https: string;
  type: Type;
  url: string;
  features: Features;
  sizes: Sizes;
  original_info: OriginalInfo;
  media_key?: string;
  ext_media_availability?: EXTMediaAvailability;
}

export interface EXTMediaAvailability {
  status: Status;
}

export enum Status {
  Available = "Available",
}

export interface Features {
  large: OrigClass;
  medium: OrigClass;
  small: OrigClass;
  orig: OrigClass;
}

export interface OrigClass {
  faces: FocusRect[];
}

export interface FocusRect {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface OriginalInfo {
  height: number;
  width: number;
  focus_rects: FocusRect[];
}

export interface Sizes {
  large: ThumbClass;
  medium: ThumbClass;
  small: ThumbClass;
  thumb: ThumbClass;
}

export interface ThumbClass {
  h: number;
  w: number;
  resize: Resize;
}

export enum Resize {
  Crop = "crop",
  Fit = "fit",
}

export enum Type {
  Photo = "photo",
}

export interface ExtendedEntities {
  media: Media[];
}

export enum Lang {
  CA = "ca",
  Es = "es",
}

export interface Views {
  count: string;
  state: State;
}

export enum State {
  EnabledWithCount = "EnabledWithCount",
}

export interface ResponseObjects {
  feedbackActions: FeedbackAction[];
}

export interface FeedbackAction {
  key: string;
  value: Value;
}

export interface Value {
  feedbackType: string;
  prompt: string;
  confirmation: string;
  childKeys?: string[];
  hasUndoAction: boolean;
  confirmationDisplayType: string;
  icon?: string;
  clientEventInfo: ValueClientEventInfo;
}

export interface ValueClientEventInfo {
  action: string;
  component: Component;
  element: string;
}
