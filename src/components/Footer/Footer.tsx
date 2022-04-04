import { Filters } from '../../constants';
import { FilterButton, ClearButton } from './styles';
import { FooterProps } from './types';

export function Footer(props: FooterProps) {
  const {
    numActive,
    currentFilter,
    hasSomeCompleted,
    handleUpdateView,
    handleClear
  } = props;
  return (
    <footer className="footer">
      <span className="text-left float-left leading-7">
        <strong className="font-light">{numActive}</strong>{' '}
        {numActive === 1 ? 'item' : 'items'} left
      </span>

      <ul className="m-0 p-0 list-none absolute right-0 left-0">
        {Filters.map((filter, idx) => {
          return (
            <li className="inline" key={idx}>
              <FilterButton
                isCurrentFilter={currentFilter === filter}
                onClick={() => handleUpdateView(filter)}
              >
                {filter}
              </FilterButton>
            </li>
          );
        })}
      </ul>

      {hasSomeCompleted && (
        <ClearButton onClick={handleClear}>Clear completed</ClearButton>
      )}
    </footer>
  );
}
