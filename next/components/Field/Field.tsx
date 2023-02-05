import { Component, CSSProperties, ErrorInfo, FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Difficulty as DifficultyEnum } from '@prisma/client';
import { Difficulty } from '../../models/Difficulty';
import { State } from '../../store';
import { inputChange } from '../../store/actions';
import { Random } from '../../utils/Random';

import classes from './Field.module.scss';
import { Rating } from '../../models/Rating';
import Portal from '../Portal/Portal';
import Modal from '../Modal/Modal';
import { useField } from '../../hooks/useField';
import { FakeImagePreview } from '../../@types/interfaces/FakeImagePreview';

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
  | 'select'
  | 'dropdown'
  | 'checkbox'
  | 'difficulty'
  | 'rating';

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
    preview: string;
    previewItem: string;
  }>;
  dropDownOptions?: {
    value: string;
    label: string;
    icon?: JSX.Element;
  }[];
  labelPosition?: 'before' | 'after';
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  style?: CSSProperties;
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  maxFiles?: number;
  withPreview?: boolean;
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
  labelPosition,
  dropDownOptions,
  id,
  min,
  max,
  step,
  reducerName,
  label,
  multiple,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  onKeyUp,
  placeholder,
  value,
  withPreview,
  maxFiles = 1,
  children,
}) => {
  const [selectedPreview, setSelectedPreview] = useState<FakeImagePreview>();
  const [previews, setPreviews] = useState<FakeImagePreview[]>([]);
  const [removePreviewModalVisible, setRemovePreviewModalVisible] = useState(false);

  const dispatch = useDispatch();
  const stateValue = useField(name, reducerName);

  const _value = value || stateValue;

  const _onChange = (event: React.ChangeEvent<HTMLFieldType>) => {
    if (onChange) return onChange(event);

    if (event.target.type === 'file') {
      const target = event.target as HTMLInputElement;
      const files = Array.from(target.files ?? []);

      if (withPreview) {
        if (files) {
          const _previews: FakeImagePreview[] = [];

          for (const file of files) {
            const url = URL.createObjectURL(file);
            const id = Random.id();
            _previews.push({ id, url });
          }

          setPreviews(_previews);
          return;
        }
      }
    }

    dispatch(inputChange({ name, reducerName, value: event.target.value }));
  };

  const _onRemovePreviewModalOpen = (preview: FakeImagePreview) => {
    setRemovePreviewModalVisible(true);
    setSelectedPreview(preview);
  };

  const _onRemovePreviewModalClose = () => {
    setRemovePreviewModalVisible(false);
    setSelectedPreview(undefined);
  };

  const _onRemovePreview = () => {
    if (!selectedPreview) return;

    const newPreviews = previews.filter((preview) => preview.id !== selectedPreview.id);
    setPreviews([...newPreviews]);
    _onRemovePreviewModalClose();
  };

  let field = null;
  const randomId = useMemo(() => Random.id(), []);
  const _id = useRef(`${type}-${id ?? randomId}`).current;
  console.log(type === 'file' ? { _id } : '');

  useEffect(() => {
    if (type === 'file') {
      dispatch(inputChange({ name: 'image', reducerName, value: _id ?? '' }));
    }
  }, [type, _id, dispatch, name, reducerName]);

  switch (type) {
    case 'textarea':
      field = (
        <textarea
          className={`${classes.field} ${classNames?.field ?? ''}`}
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
          className={`${classes.field} ${classNames?.field ?? ''}`}
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

    case 'dropdown':
      if (!dropDownOptions && !children) {
        const errorMessage = 'dropDownOptions is required for dropdown field type';
        throw new Error(errorMessage);
      }

      field = (
        <div className={`${classes.dropdown} ${classNames?.field ?? ''}`}>
          <button type="button" id={_id + '-button'} aria-expanded="false">
            Dropdown button
          </button>
          {dropDownOptions ? (
            // TODO: Add aria-controls
            // TODO: create component for dropdown menu
            <ul className={classes.dropdown__menu} aria-labelledby={_id + '-button'}>
              {dropDownOptions?.map((option) => (
                <li key={option.value}>
                  <span className={classes.dropdown__item}>{option.label}</span>
                </li>
              ))}
            </ul>
          ) : (
            children
          )}
        </div>
      );
      break;

    case 'number':
      field = (
        <input
          className={`${classes.field} ${classNames?.field ?? ''}`}
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

    case 'checkbox':
      const labelElement = label ? (
        <label className={`${classes.label} ${classNames?.label ?? ''}`} htmlFor={_id}>
          {label}
        </label>
      ) : null;

      if (!labelPosition) labelPosition = 'after';

      field = (
        <>
          {labelPosition === 'before' ? labelElement : null}
          <input
            className={`${classes.field} ${classNames?.field ?? ''}`}
            type={type}
            name={name}
            id={_id}
            style={style}
            value={_value}
            onChange={_onChange}
            onFocus={onFocus}
            onClick={onClick}
          />
          {labelPosition === 'after' ? labelElement : null}
        </>
      );
      break;

    case 'file':
      const maxFilesReached = maxFiles && previews.length >= maxFiles;
      field = (
        <>
          <div
            className={`${classes['file-field__container']}
          ${maxFilesReached ? classes['file-field__container--disabled'] : ''}
          `}>
            <input
              type={type}
              name={name}
              id={_id}
              style={style}
              onChange={_onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onClick={onClick}
              multiple={multiple}
            />
            <label
              onClick={(e) => (maxFilesReached ? e.preventDefault() : null)}
              title={maxFilesReached ? 'Le nombre maximum de fichiers a été atteint' : ''}
              className={`
            ${classes.field}
            ${classNames?.field ?? ''}`}
              htmlFor={_id}>
              {label}
            </label>
          </div>
          <div className={`${classes.preview} ${classNames?.preview ?? ''}`}>
            {previews.map((preview) => (
              <div key={Random.id()} className={`${classes.preview__item} ${classNames?.previewItem ?? ''}`}>
                <img src={preview.url} alt="" id={preview.id} />
                <button
                  type="button"
                  className={`${classes.preview__button} diet-before-cross`}
                  onClick={() => _onRemovePreviewModalOpen(preview)}
                />
              </div>
            ))}

            <Portal mount={removePreviewModalVisible} animate animationDuration={300}>
              <Modal
                visible={removePreviewModalVisible}
                buttons={[
                  {
                    text: 'Annuler',

                    onClick: _onRemovePreviewModalClose,
                  },
                  {
                    text: 'Supprimer',
                    onClick: _onRemovePreview,
                  },
                ]}>
                <p>Êtes-vous sûr de vouloir supprimer cette image ?</p>
              </Modal>
            </Portal>
          </div>
        </>
      );

      break;

    case 'difficulty':
      const difficulties = Difficulty.getAll();
      let difficultyElements = [];

      for (const difficulty of difficulties) {
        const selectedDifficultyLevel = Difficulty.getDifficultyLevel(_value as DifficultyEnum);
        const difficultyLevel = Difficulty.getDifficultyLevel(difficulty as DifficultyEnum);

        let labelClasses = `${classes.label} diet-before-chef `;

        if (difficultyLevel <= selectedDifficultyLevel && _value) {
          labelClasses += classes[`difficulty--${_value.toString().toLowerCase()}`];
        }

        difficultyElements.push(
          <div key={`${_id}:${difficulty}`} className={classes.difficulty_container}>
            <input
              className={`${classes.field} ${classes.difficulty} ${classNames?.field ?? ''}`}
              type="radio"
              name={name}
              id={`${_id}:${difficulty}`}
              style={style}
              value={difficulty}
              onChange={_onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onClick={onClick}
            />
            <label
              title={Difficulty.getDifficultyLabel(difficulty)}
              className={`${labelClasses} ${classNames?.label ?? ''}`}
              htmlFor={`${_id}:${difficulty}`}
            />
          </div>,
        );
      }

      field = <div className={classes.difficulty_container}>{difficultyElements}</div>;
      break;

    case 'rating':
      const ratingElements = [];
      const selectedRating = _value as number;
      const [minRate, maxRate] = Rating.getRange();

      for (let i = minRate + 1; i <= maxRate; i++) {
        const labelClasses = `${classes.label} ${
          selectedRating >= i ? 'diet-before-star-full' : 'diet-before-star-empty'
        } ${selectedRating >= i ? classes['rating--selected'] : ''}`;

        ratingElements.push(
          <div key={`${_id}:${i}`} className={classes.rating_container}>
            <input
              className={`${classes.field} ${classes.rating} ${classNames?.field ?? ''}`}
              type="radio"
              name={name}
              id={`${_id}:${i}`}
              style={style}
              value={i}
              onChange={_onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onClick={onClick}
            />
            <label
              title={Rating.getRatingLabel(i)}
              className={`${labelClasses} ${classNames?.label ?? ''}`}
              htmlFor={`${_id}:${i}`}
            />
          </div>,
        );
      }

      field = <div className={classes.rating_container}>{ratingElements}</div>;
      break;

    default:
      field = (
        <input
          type={type}
          name={name}
          className={`${classes.field} ${classNames?.field ?? ''}`}
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
    <div
      className={`${classes.field_container} ${type === 'checkbox' ? classes['field_container--checkbox'] : ''} ${
        classNames?.container ?? ''
      }`}>
      {label && ['checkbox', 'file'].includes(type) ? null : (
        <label className={`${classes.label} ${classNames?.label ?? ''}`} htmlFor={_id}>
          {label}
        </label>
      )}
      {field}
      {error ? <span className={`${classes.error} ${classNames?.error ?? ''}`}>{error}</span> : ''}
    </div>
  );
};

export default Field;

class ErrorBoundary extends Component<{ children?: ReactNode | ReactNode[] }, { hasError: boolean }> {
  state = {
    hasError: false,
  };

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
