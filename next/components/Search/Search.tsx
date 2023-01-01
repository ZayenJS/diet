import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Random } from '../../utils/Random';

import classes from './Search.module.scss';

export interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const inputRandomId = new Random<string>('string');
  const listRandomId = new Random<string>('string');
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search) {
      router.push(`/recherche?q=${search}`);
    }
  };

  return (
    <form onSubmit={onSearch} className={classes.container}>
      <input
        ref={inputRef}
        id={inputRandomId.data}
        list={listRandomId.data}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        type="search"
        placeholder="Je recherche une recette, un ingrédient..."
      />
      <datalist id={listRandomId.data}>
        <option value="Poulet" />
        <option value="Poisson" />
        <option value="Boeuf" />
        <option value="Porc" />
        <option value="Légumes" />
        <option value="Fruits" />
        <option value="Pâtes" />
        <option value="Riz" />
        <option value="Pain" />
      </datalist>
      <button className={`${classes.search} diet-before-search`} type="submit"></button>
    </form>
  );
};

export default Search;
