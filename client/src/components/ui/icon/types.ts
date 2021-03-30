import { Color } from '../types';

export interface IIcon {
  color: Color;
  width?: number;
  size?: number;
  className?: string;
}

export interface IIcons extends IIcon {
  type:
  'Feather' |
  'Plus' |
  'PlusCircle' |
  'Search' |
  'BarChart' |
  'EditSquare' |
  'Edit' |
  'Cross' |
  'Delete' |
  'Trash' |
  'TrashTwo';
}
