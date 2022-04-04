import { tw } from 'brise';
import { ClearButtonProps, FilterButtonProps } from './types';

export const ClearButton = tw.button<ClearButtonProps>`
  float-right relative no-underline cursor-pointer leading-6 hover:underline
`;

export const FilterButton = tw.button<FilterButtonProps>`
  ${({ isCurrentFilter }) =>
    isCurrentFilter ? 'border-[rgba(175,47,47,0.2)]' : ''} filter-button
`;
