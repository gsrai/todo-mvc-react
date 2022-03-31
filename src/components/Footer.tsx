import { Filters } from '../constants';
import { Filter } from '../types';

type FooterProps = {
  readonly numActive: number;
  readonly currentFilter: Filter;
  readonly handleUpdateView: (filter: Filter) => void;
  readonly handleClear: VoidFunction;
  readonly hasSomeCompleted: boolean;
};

function Footer(props: FooterProps) {
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
              <button
                className={`${
                  currentFilter === filter ? 'border-[rgba(175,47,47,0.2)]' : ''
                } filter-button`}
                onClick={() => handleUpdateView(filter)}
              >
                {filter}
              </button>
            </li>
          );
        })}
      </ul>

      {hasSomeCompleted && (
        <button
          onClick={handleClear}
          className="float-right relative no-underline cursor-pointer leading-5 hover:underline"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default Footer;
