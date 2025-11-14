import AlertIcon20 from "@/assets/icons/ic-alert-20.svg";
import AlertIcon24 from "@/assets/icons/ic-alert-24.svg";
import BestIcon from "@/assets/icons/ic-best.svg";
import BoardIcon20 from "@/assets/icons/ic-board-20.svg";
import BoardIcon24 from "@/assets/icons/ic-board-24.svg";
import CalendarIcon12 from "@/assets/icons/ic-calendar-12.svg";
import CalendarIcon16 from "@/assets/icons/ic-calendar-16.svg";
import CheckCompactIcon from "@/assets/icons/ic-check-compact.svg";
import CheckPrimaryIcon from "@/assets/icons/ic-check-primary.svg";
import CheckboxIcon16 from "@/assets/icons/ic-checkbox-16.svg";
import CheckboxIcon18 from "@/assets/icons/ic-checkbox-18.svg";
import CheckboxCheckIcon16 from "@/assets/icons/ic-checkbox-check-16.svg";
import CheckboxCheckIcon18 from "@/assets/icons/ic-checkbox-check-18.svg";
import ChessIcon20 from "@/assets/icons/ic-chess-20.svg";
import ChessIcon24 from "@/assets/icons/ic-chess-24.svg";
import ChevronLeftIcon16 from "@/assets/icons/ic-chevron-left-16.svg";
import ChevronLeftIcon24 from "@/assets/icons/ic-chevron-left-24.svg";
import ChevronRightIcon16 from "@/assets/icons/ic-chevron-right-16.svg";
import ChevronRightIcon24 from "@/assets/icons/ic-chevron-right-24.svg";
import ClockIcon12 from "@/assets/icons/ic-clock-12.svg";
import ClockIcon16 from "@/assets/icons/ic-clock-16.svg";
import CommentShadowIcon28 from "@/assets/icons/ic-comment-shadow-28.svg";
import CommentShadowIcon40 from "@/assets/icons/ic-comment-shadow-40.svg";
import CommentShadowIcon48 from "@/assets/icons/ic-comment-shadow-48.svg";
import CommentIcon from "@/assets/icons/ic-comment.svg";
import DoneShadowIcon28 from "@/assets/icons/ic-done-shadow-28.svg";
import DoneShadowIcon40 from "@/assets/icons/ic-done-shadow-40.svg";
import DoneShadowIcon48 from "@/assets/icons/ic-done-shadow-48.svg";
import DotsIcon16 from "@/assets/icons/ic-dots-16.svg";
import DotsIcon24 from "@/assets/icons/ic-dots-24.svg";
import ExpandIcon24 from "@/assets/icons/ic-expand-24.svg";
import ExpandIcon28 from "@/assets/icons/ic-expand-28.svg";
import FoldIcon24 from "@/assets/icons/ic-fold-24.svg";
import FoldIcon28 from "@/assets/icons/ic-fold-28.svg";
import FolderIcon28 from "@/assets/icons/ic-folder-28.svg";
import FolderIcon40 from "@/assets/icons/ic-folder-40.svg";
import FolderIcon48 from "@/assets/icons/ic-folder-48.svg";
import GearIcon20 from "@/assets/icons/ic-gear-20.svg";
import GearIcon24 from "@/assets/icons/ic-gear-24.svg";
import HeartIcon16 from "@/assets/icons/ic-heart-16.svg";
import HeartIcon24 from "@/assets/icons/ic-heart-24.svg";
import HeartFillIcon16 from "@/assets/icons/ic-heart-fill-16.svg";
import HeartFillIcon24 from "@/assets/icons/ic-heart-fill-24.svg";
import ImageIcon from "@/assets/icons/ic-image.svg";
import InvisibleIcon from "@/assets/icons/ic-invisible.svg";
import MagnifierIcon24 from "@/assets/icons/ic-magnifier-24.svg";
import MagnifierIcon32 from "@/assets/icons/ic-magnifier-32.svg";
import MenuIcon from "@/assets/icons/ic-menu.svg";
import PencilIcon from "@/assets/icons/ic-pencil.svg";
import Person24 from "@/assets/icons/ic-person-24.svg";
import Person40 from "@/assets/icons/ic-person-40.svg";
import PlusIcon16 from "@/assets/icons/ic-plus-16.svg";
import PlusIcon24 from "@/assets/icons/ic-plus-24.svg";
import ProgressDoneIcon16 from "@/assets/icons/ic-progress-done-16.svg";
import ProgressDoneIcon20 from "@/assets/icons/ic-progress-done-20.svg";
import RepeatIcon12 from "@/assets/icons/ic-repeat-12.svg";
import RepeatIcon16 from "@/assets/icons/ic-repeat-16.svg";
import SecessionIcon from "@/assets/icons/ic-secession.svg";
import ThumbupIcon from "@/assets/icons/ic-thumbup.svg";
import TriangleDownIcon20 from "@/assets/icons/ic-triangle-down-20.svg";
import TriangleDownIcon24 from "@/assets/icons/ic-triangle-down-24.svg";
import UnionIcon36 from "@/assets/icons/ic-union-36.svg";
import UnionIcon48 from "@/assets/icons/ic-union-48.svg";
import VisibleIcon from "@/assets/icons/ic-visible.svg";
import XmarkIcon12 from "@/assets/icons/ic-xmark-12.svg";
import XmarkIcon18 from "@/assets/icons/ic-xmark-18.svg";
import XmarkIcon24 from "@/assets/icons/ic-xmark-24.svg";
import { FC, SVGProps } from "react";
import { IconSize } from "./types";

export type IconName =
  | "alert"
  | "board"
  | "calendar"
  | "checkCompact"
  | "checkPrimary"
  | "checkbox"
  | "checkboxCheck"
  | "chess"
  | "chevronLeft"
  | "chevronRight"
  | "clock"
  | "comment"
  | "dots"
  | "expand"
  | "fold"
  | "gear"
  | "heart"
  | "heartFill"
  | "image"
  | "invisible"
  | "magnifier"
  | "menu"
  | "pencil"
  | "person"
  | "plus"
  | "progressDone"
  | "repeat"
  | "secession"
  | "thumbup"
  | "triangleDown"
  | "visible"
  | "xmark"
  | "union"
  | "folder"
  | "doneShadow"
  | "commentShadow"
  | "best";

const Icons: Record<
  IconName,
  Partial<Record<IconSize, FC<SVGProps<SVGSVGElement>>>>
> = {
  alert: {
    large: AlertIcon24,
    small: AlertIcon20,
  },
  board: {
    large: BoardIcon24,
    small: BoardIcon20,
  },
  calendar: {
    large: CalendarIcon16,
    small: CalendarIcon12,
  },
  checkCompact: {
    large: CheckCompactIcon,
  },
  checkPrimary: {
    large: CheckPrimaryIcon,
  },
  checkbox: {
    large: CheckboxIcon18,
    small: CheckboxIcon16,
  },
  checkboxCheck: {
    large: CheckboxCheckIcon18,
    small: CheckboxCheckIcon16,
  },
  chess: {
    large: ChessIcon24,
    small: ChessIcon20,
  },
  chevronLeft: {
    large: ChevronLeftIcon24,
    small: ChevronLeftIcon16,
  },
  chevronRight: {
    large: ChevronRightIcon24,
    small: ChevronRightIcon16,
  },
  clock: {
    large: ClockIcon16,
    small: ClockIcon12,
  },
  comment: {
    large: CommentIcon,
  },
  dots: {
    large: DotsIcon24,
    small: DotsIcon16,
  },
  expand: {
    large: ExpandIcon28,
    small: ExpandIcon24,
  },
  fold: {
    large: FoldIcon28,
    small: FoldIcon24,
  },
  gear: {
    large: GearIcon24,
    small: GearIcon20,
  },
  heart: {
    large: HeartIcon24,
    small: HeartIcon16,
  },
  heartFill: {
    large: HeartFillIcon24,
    small: HeartFillIcon16,
  },
  image: {
    large: ImageIcon,
  },
  invisible: {
    large: InvisibleIcon,
  },
  magnifier: {
    large: MagnifierIcon32,
    small: MagnifierIcon24,
  },
  menu: {
    large: MenuIcon,
  },
  pencil: {
    large: PencilIcon,
  },
  person: {
    large: Person40,
    small: Person24,
  },
  plus: {
    large: PlusIcon24,
    small: PlusIcon16,
  },
  progressDone: {
    large: ProgressDoneIcon20,
    small: ProgressDoneIcon16,
  },
  repeat: {
    large: RepeatIcon16,
    small: RepeatIcon12,
  },
  secession: {
    large: SecessionIcon,
  },
  thumbup: {
    large: ThumbupIcon,
  },
  triangleDown: {
    large: TriangleDownIcon24,
    small: TriangleDownIcon20,
  },
  visible: {
    large: VisibleIcon,
  },
  xmark: {
    large: XmarkIcon24,
    medium: XmarkIcon18,
    small: XmarkIcon12,
  },
  union: {
    large: UnionIcon48,
    small: UnionIcon36,
  },
  folder: {
    large: FolderIcon48,
    medium: FolderIcon40,
    small: FolderIcon28,
  },
  doneShadow: {
    large: DoneShadowIcon48,
    medium: DoneShadowIcon40,
    small: DoneShadowIcon28,
  },
  commentShadow: {
    large: CommentShadowIcon48,
    medium: CommentShadowIcon40,
    small: CommentShadowIcon28,
  },
  best: {
    large: BestIcon,
  },
} as const;

export default Icons;
