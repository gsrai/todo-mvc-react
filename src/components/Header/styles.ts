import { tw } from 'brise';
import { NewTodoInputProps } from './types';

export const Title = tw.h1`
  absolute -top-28 w-full text-8xl font-thin text-center text-[rgba(175,47,47,0.15)]
`;

export const NewTodoInput = tw.input<NewTodoInputProps>`
  input-placeholder focus:outline-none relative m-0 w-full text-2xl font-thin text-inherit py-4 pr-4 pl-16 border-none box-border shadow-inner bg-[rgba(0,0,0,0.003)]
`;
