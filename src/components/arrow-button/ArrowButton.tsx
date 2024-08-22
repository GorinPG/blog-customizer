import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export interface ArrowButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ArrowButton = ({ isOpen, onToggle }: ArrowButtonProps) => {
  return (
	<div
	  onClick={onToggle}
	  role='button'
	  aria-label='Toggle article parameters form'
	  tabIndex={0}
	  className={clsx(styles.container, {
		[styles.container_open]: isOpen,
	  })}
	>
	  <img
		src={arrow}
		alt='иконка стрелочки'
		className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
	  />
	</div>
  );
};