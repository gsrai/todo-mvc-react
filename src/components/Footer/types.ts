import { ButtonHTMLAttributes } from 'react';
import { Filter } from '../../types';

export type FooterProps = {
  readonly numActive: number;
  readonly currentFilter: Filter;
  readonly handleUpdateView: (filter: Filter) => void;
  readonly handleClear: VoidFunction;
  readonly hasSomeCompleted: boolean;
};

export type ClearButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly isCurrentFilter: boolean;
};
