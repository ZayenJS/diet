import { FC, useEffect, useMemo, useRef } from 'react';
import { Random } from '../../utils/Random';

import classes from './Modal.module.scss';

interface ModalButton {
  text: string;
  className?: string;
  onClick?: () => void;
}

export interface ModalProps {
  visible: boolean;
  classNames?: Partial<{
    header: string;
    main: string;
    footer: string;
  }>;
  title?: string;
  buttons: ModalButton[];
  children: JSX.Element | JSX.Element[] | string | number | boolean | null;
}

const Modal: FC<ModalProps> = ({ classNames, visible, title, buttons, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (document.body && dialogRef.current && visible) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }

      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    } else if (dialogRef.current && !visible) {
      dialogRef.current.close();
    }

    return () => {
      if (document.body) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [visible]);

  const modalHeader = title ? (
    <header className={`${classes.header ?? ''} ${classNames?.header ?? ''}}`}>
      <h2>{title}</h2>
    </header>
  ) : null;
  const modalButtons = useMemo(
    () =>
      buttons.map((button) => {
        return (
          <button className={classes.button} key={Random.id()} onClick={button.onClick}>
            {button.text}
          </button>
        );
      }),
    [buttons],
  );

  const modalFooter =
    buttons.length > 0 ? (
      <footer className={`${classes.footer ?? ''} ${classNames?.footer ?? ''}`}>{modalButtons}</footer>
    ) : null;

  return (
    <dialog ref={dialogRef} className={classes.container}>
      {modalHeader}
      <main className={`${classes.main ?? ''} ${classNames?.main ?? ''}`}>{children}</main>
      {modalFooter}
    </dialog>
  );
};

export default Modal;
