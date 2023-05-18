export interface Config {
  PORT: string;
  HEADLESS: HeadlessType;
  HOST: string;
  TIMEOUT: string;
  GRAFANA_USER: string;
  GRAFANA_PASSWORD: string;
  GRAFANA_HOST: string;
}

export interface TwitterResponse {
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  result: UserResult;
}

export interface UserResult {
  __typename: UserDisplayTypeEnum;
  timeline_v2: TimelineV2;
}

export enum UserDisplayTypeEnum {
  User = "User",
}

export interface TimelineV2 {
  timeline: Timeline;
}

export interface Timeline {
  instructions: Instruction[];
  responseObjects: ResponseObjects;
}

export interface Instruction {
  type: string;
  entries?: EntryElement[];
  entry?: PurpleEntry;
}

export interface EntryElement {
  entryId: string;
  sortIndex: string;
  content: PurpleContent;
}

export interface PurpleContent {
  entryType: EntryTypeEnum;
  __typename: EntryTypeEnum;
  itemContent?: PurpleItemContent;
  items?: ItemElement[];
  displayType?: string;
  header?: Header;
  footer?: Footer;
  clientEventInfo?: ContentClientEventInfo;
  value?: string;
  cursorType?: string;
  stopOnEmptyResponse?: boolean;
}

export enum EntryTypeEnum {
  TimelineTimelineCursor = "TimelineTimelineCursor",
  TimelineTimelineItem = "TimelineTimelineItem",
  TimelineTimelineModule = "TimelineTimelineModule",
}

export interface ContentClientEventInfo {
  component: string;
  details: PurpleDetails;
}

export interface PurpleDetails {
  timelinesDetails: PurpleTimelinesDetails;
}

export interface PurpleTimelinesDetails {
  injectionType: string;
}

export interface Footer {
  displayType: string;
  text: string;
  landingUrl: LandingURL;
}

export interface LandingURL {
  url: string;
  urlType: string;
}

export interface Header {
  displayType: string;
  text: string;
  sticky: boolean;
}

export interface PurpleItemContent {
  itemType: ItemTypeEnum;
  __typename: ItemTypeEnum;
  tweet_results: PurpleTweetResults;
  tweetDisplayType: TweetDisplayType;
  promotedMetadata?: PromotedMetadata;
}

export enum ItemTypeEnum {
  TimelineTweet = "TimelineTweet",
}

export interface PromotedMetadata {
  advertiser_results: SerResults;
  disclosureType: string;
  experimentValues: ExperimentValue[];
  impressionId: string;
  clickTrackingInfo: ClickTrackingInfo;
}

export interface SerResults {
  result: AdvertiserResultsResult;
}

export interface AdvertiserResultsResult {
  __typename: UserDisplayTypeEnum;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: UnmentionData;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  profile_image_shape: ProfileImageShape;
  legacy: PurpleLegacy;
  professional?: Professional;
}

export interface UnmentionData {}

export interface PurpleLegacy {
  can_dm: boolean;
  can_media_tag: boolean;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  location: string;
  media_count: number;
  name: string;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_image_url_https: string;
  profile_interstitial_type: string;
  screen_name: string;
  statuses_count: number;
  translator_type: TranslatorType;
  url: string;
  verified: boolean;
  verified_type?: Type;
  want_retweets: boolean;
  withheld_in_countries: any[];
  following?: boolean;
}

export interface Entities {
  description: Description;
  url: Description;
}

export interface Description {
  urls: URL[];
}

export interface URL {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export enum TranslatorType {
  None = "none",
  Regular = "regular",
}

export enum Type {
  Business = "Business",
}

export interface Professional {
  rest_id: string;
  professional_type: Type;
  category: Category[];
}

export interface Category {
  id: number;
  name: Name;
  icon_name: IconName;
}

export enum IconName {
  IconBriefcaseStroke = "IconBriefcaseStroke",
}

export enum Name {
  CasinosYJuegos = "Casinos y juegos",
  CienciaYTecnología = "Ciencia y tecnología",
  Educación = "Educación",
  EmpresaDeTelecomunicaciones = "Empresa de telecomunicaciones",
}

export enum ProfileImageShape {
  Circle = "Circle",
  Square = "Square",
}

export interface ClickTrackingInfo {
  urlParams: ExperimentValue[];
}

export interface ExperimentValue {
  key: Key;
  value: string;
}

export enum Key {
  DisplayDisplayStyle = "display.display_style",
  Twclid = "twclid",
  WebsiteCardVariation = "website_card_variation",
}

export enum TweetDisplayType {
  EmphasizedPromotedTweet = "EmphasizedPromotedTweet",
  Tweet = "Tweet",
}

export interface PurpleTweetResults {
  result: PurpleResult;
}

export interface PurpleResult {
  __typename: TweetDisplayType;
  rest_id: string;
  core: Core;
  unmention_data: UnmentionData;
  edit_control: EditControl;
  edit_perspective: EditPerspective;
  is_translatable: boolean;
  views: Views;
  source: string;
  legacy: FluffyLegacy;
  quick_promote_eligibility: QuickPromoteEligibility;
  card?: Card;
  unified_card?: UnifiedCard;
  note_tweet?: NoteTweet;
}

export interface Card {
  rest_id: string;
  legacy: CardLegacy;
}

export interface CardLegacy {
  binding_values: BindingValue[];
  card_platform: CardPlatform;
  name: string;
  url: string;
  user_refs_results: any[];
}

export interface BindingValue {
  key: string;
  value: Value;
}

export interface Value {
  image_value?: ImageValue;
  type: ValueType;
  string_value?: string;
  scribe_key?: string;
  image_color_value?: ImageColorValue;
}

export interface ImageColorValue {
  palette: Palette[];
}

export interface Palette {
  rgb: RGB;
  percentage: number;
}

export interface RGB {
  blue: number;
  green: number;
  red: number;
}

export interface ImageValue {
  alt: Alt;
  height: number;
  width: number;
  url: string;
}

export enum Alt {
  ExploratoryTestingStrategiesQATeamsXray = "exploratory-testing-strategies-qa-teams-xray",
}

export enum ValueType {
  Image = "IMAGE",
  ImageColor = "IMAGE_COLOR",
  String = "STRING",
}

export interface CardPlatform {
  platform: Platform;
}

export interface Platform {
  audience: Audience;
  device: Device;
}

export interface Audience {
  name: string;
}

export interface Device {
  name: string;
  version: string;
}

export interface Core {
  user_results: SerResults;
}

export interface EditControl {
  edit_tweet_ids: string[];
  editable_until_msecs: string;
  is_edit_eligible: boolean;
  edits_remaining: string;
}

export interface EditPerspective {
  favorited: boolean;
  retweeted: boolean;
}

export interface FluffyLegacy {
  bookmark_count: number;
  bookmarked: boolean;
  created_at: string;
  conversation_id_str: string;
  display_text_range: number[];
  entities: Entit;
  extended_entities?: ExtendedEntities;
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
  scopes?: Scopes;
}

export interface Entit {
  media?: EntitiesMedia[];
  user_mentions: UserMention[];
  urls: URL[];
  hashtags: Hashtag[];
  symbols: any[];
}

export interface Hashtag {
  indices: number[];
  text: string;
}

export interface EntitiesMedia {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_url_https: string;
  type: MediaType;
  url: string;
  features: Features;
  sizes: Sizes;
  original_info: OriginalInfo;
}

export interface Features {
  large?: OrigClass;
  medium?: OrigClass;
  small?: OrigClass;
  orig?: OrigClass;
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
  focus_rects?: FocusRect[];
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

export enum MediaType {
  Photo = "photo",
  Video = "video",
}

export interface UserMention {
  id_str: string;
  name: string;
  screen_name: string;
  indices: number[];
}

export interface ExtendedEntities {
  media: ExtendedEntitiesMedia[];
}

export interface ExtendedEntitiesMedia {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_key: string;
  media_url_https: string;
  type: MediaType;
  url: string;
  ext_media_availability: EXTMediaAvailability;
  features: Features;
  sizes: Sizes;
  original_info: OriginalInfo;
  additional_media_info?: AdditionalMediaInfo;
  mediaStats?: MediaStats;
  video_info?: VideoInfo;
}

export interface AdditionalMediaInfo {
  monetizable: boolean;
}

export interface EXTMediaAvailability {
  status: Status;
}

export enum Status {
  Available = "Available",
}

export interface MediaStats {
  viewCount: number;
}

export interface VideoInfo {
  aspect_ratio: number[];
  duration_millis: number;
  variants: Variant[];
}

export interface Variant {
  bitrate?: number;
  content_type: string;
  url: string;
}

export enum Lang {
  En = "en",
  Es = "es",
  It = "it",
  Pt = "pt",
}

export interface Scopes {
  followers: boolean;
}

export interface NoteTweet {
  is_expandable: boolean;
  note_tweet_results: NoteTweetResults;
}

export interface NoteTweetResults {
  result: NoteTweetResultsResult;
}

export interface NoteTweetResultsResult {
  id: string;
  text: string;
  entity_set: Entit;
}

export interface QuickPromoteEligibility {
  eligibility: Eligibility;
}

export enum Eligibility {
  IneligibleNotProfessional = "IneligibleNotProfessional",
}

export interface UnifiedCard {
  card_fetch_state: string;
}

export interface Views {
  count: string;
  state: State;
}

export enum State {
  EnabledWithCount = "EnabledWithCount",
}

export interface ItemElement {
  entryId: string;
  item: ItemItem;
}

export interface ItemItem {
  itemContent: ItemItemContent;
  clientEventInfo: ItemClientEventInfo;
}

export interface ItemClientEventInfo {
  component: string;
  element: string;
  details: FluffyDetails;
}

export interface FluffyDetails {
  timelinesDetails: FluffyTimelinesDetails;
}

export interface FluffyTimelinesDetails {
  injectionType: string;
  sourceData: string;
  controllerData?: string;
}

export interface ItemItemContent {
  itemType: string;
  __typename: string;
  user_results: SerResults;
  userDisplayType: UserDisplayTypeEnum;
  socialContext?: SocialContext;
  promotedMetadata?: PromotedMetadata;
}

export interface SocialContext {
  type: string;
  contextType: string;
  text: string;
}

export interface PurpleEntry {
  entryId: string;
  sortIndex: string;
  content: FluffyContent;
}

export interface FluffyContent {
  entryType: EntryTypeEnum;
  __typename: EntryTypeEnum;
  itemContent: FluffyItemContent;
  clientEventInfo: ContentClientEventInfo;
}

export interface FluffyItemContent {
  itemType: ItemTypeEnum;
  __typename: ItemTypeEnum;
  tweet_results: FluffyTweetResults;
  tweetDisplayType: TweetDisplayType;
  socialContext: SocialContext;
}

export interface FluffyTweetResults {
  result: FluffyResult;
}

export interface FluffyResult {
  __typename: TweetDisplayType;
  rest_id: string;
  core: Core;
  unmention_data: UnmentionData;
  edit_control: EditControl;
  edit_perspective: EditPerspective;
  is_translatable: boolean;
  views: Views;
  source: string;
  legacy: TentacledLegacy;
  quick_promote_eligibility: QuickPromoteEligibility;
}

export interface TentacledLegacy {
  bookmark_count: number;
  bookmarked: boolean;
  created_at: string;
  conversation_id_str: string;
  display_text_range: number[];
  entities: Entit;
  favorite_count: number;
  favorited: boolean;
  full_text: string;
  is_quote_status: boolean;
  lang: Lang;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  retweeted: boolean;
  user_id_str: string;
  id_str: string;
}

export interface ResponseObjects {
  feedbackActions: any[];
  immediateReactions: any[];
}

export type DetailValue = "full" | "simple";
export type HeadlessType = boolean | "new" | undefined;
