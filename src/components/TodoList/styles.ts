import { tw } from 'brise';

import {
  CheckboxLabelProps,
  EditInputProps,
  RemoveButtonProps,
  TodoListItemProps,
  TodoTextLabelProps,
  ToggleAllInputProps,
  ToggleAllLabelProps
} from './types';

export const Main = tw.main`relative z-[2] border-t-[1px_solid_#e6e6e6] font-thin`;

export const ToggleAllInput = tw.input<ToggleAllInputProps>`
  peer w-[1px] h-[1px] border-none opacity-0 absolute right-full bottom-full
`;

export const ToggleAllLabel = tw.label<ToggleAllLabelProps>`
  w-14 h-9 text-[0] absolute top-[-52px] left-0 rotate-90 before:content-['❯'] before:text-xl before:py-3 before:px-7 before:text-[#e6e6e6] before:peer-checked:text-[#737373]
`;

export const TodoListContainer = tw.ul`m-0 p-0 list-none`;

export const TodoListItem = tw.li<TodoListItemProps>`
  relative group h-14 text-2xl border-b-[1px_solid_#ededed] last:border-none
  ${(props) => (props.currentlyEditing === props.todoId ? 'border-b-0 p-0' : '')}
`;

export const RemoveButton = tw.button<RemoveButtonProps>`
  hidden absolute top-0 right-3 bottom-0 w-10 h-10 my-auto mx-0 pt-1 text-3xl text-[#cc9a9a] transition-colors ease-out delay-200 after:content-['×'] hover:text-[#af5b5e] group-hover:block
`;

export const CheckboxLabel = tw.label<CheckboxLabelProps>`
  bg-white rounded-full border border-solid border-neutral-300 cursor-pointer h-7 w-7 left-[18px] top-[18px] absolute after:absolute after:top-2 after:left-[7px] after:h-[6px] after:w-3 after:-rotate-45 after:opacity-0 after:content-[''] after:border-2 after:border-solid after:border-white after:border-t-0 after:border-r-0 peer-checked:bg-[#66bb6a] peer-checked:border-[#66bb6a] peer-checked:after:opacity-100
`;

export const TodoTextLabel = tw.label<TodoTextLabelProps>`
  ${(props) =>
    props.completed
      ? 'line-through text-[#d9d9d9]'
      : ''} break-all transition-colors ease-in delay-300`;

export const EditInput = tw.input<EditInputProps>`
  relative focus:outline-none font-thin m-0 w-full text-2xl text-inherit p-2 border-[1px] border-solid border-neutral-400 box-border shadow-inner
  ${(props) =>
    props.currentlyEditing === props.todoId
      ? 'block py-3 px-4 ml-10 w-[calc(100%-43px)]'
      : ''}
`;
