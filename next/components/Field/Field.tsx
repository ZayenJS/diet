import { CSSProperties, FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';
import { inputChange } from '../../store/actions';
import { Random } from '../../utils/Random';

import classes from './Field.module.scss';

type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'date'
  | 'url'
  | 'search'
  | 'tel'
  | 'color'
  | 'textarea'
  | 'file'
  | 'select';

type HTMLFieldType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface FieldProps {
  type: FieldType;
  name: string;
  reducerName: keyof State;
  classNames?: Partial<{
    container: string;
    label: string;
    field: string;
    error: string;
  }>;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  style?: CSSProperties;
  label?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  children?: React.ReactNode | React.ReactNode[];

  onChange?: (event: React.ChangeEvent<HTMLFieldType>) => void;
  onFocus?: (event: React.FocusEvent<HTMLFieldType>) => void;
  onBlur?: (event: React.FocusEvent<HTMLFieldType>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLFieldType>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLFieldType>) => void;
  onClick?: (event: React.MouseEvent<HTMLFieldType>) => void;
}

const Field: FC<FieldProps> = ({
  type,
  error,
  classNames,
  style,
  name,
  id,
  min,
  max,
  step,
  reducerName,
  label,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  onKeyUp,
  placeholder,
  value,
  children,
}) => {
  const dispatch = useDispatch();
  const stateValue = useSelector((state: State) => state?.[reducerName]?.[name as keyof State[keyof State]]);

  const _value = value || stateValue;

  const _onChange = (event: React.ChangeEvent<HTMLFieldType>) => {
    if (onChange) return onChange(event);

    dispatch(inputChange({ name, reducerName, value: event.target.value }));
  };

  let field = null;
  const _id = useRef(id ?? Random.id()).current;

  switch (type) {
    case 'textarea':
      field = (
        <textarea
          className={`${classes.field} ${classNames?.field ? classNames.field : ''}`}
          name={name}
          id={_id}
          style={style}
          value={_value}
          onChange={_onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
        />
      );
      break;

    case 'select':
      field = (
        <select
          className={`${classes.field} ${classNames?.field ? classNames.field : ''}`}
          name={name}
          id={_id}
          style={style}
          value={_value}
          onChange={_onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}>
          {children}
        </select>
      );
      break;

    case 'number':
      field = (
        <input
          className={`${classes.field} ${classNames?.field ? classNames.field : ''}`}
          type={type}
          name={name}
          id={_id}
          style={style}
          value={_value}
          min={min}
          max={max}
          step={step}
          onChange={_onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
        />
      );
      break;

    default:
      field = (
        <input
          type={type}
          name={name}
          id={_id}
          style={style}
          value={_value}
          onChange={_onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
        />
      );
  }

  return (
    <div className={classes.field_container}>
      {label ? (
        <label className={`${classes.label} ${classNames?.label ? classNames.label : ''}`} htmlFor={name}>
          {label}
        </label>
      ) : null}
      {field}
      {error ? <span className={`${classes.error} ${classNames?.error ? classNames.error : ''}`}>{error}</span> : ''}
    </div>
  );
};

export default Field;
