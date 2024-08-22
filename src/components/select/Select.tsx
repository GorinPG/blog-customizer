import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import arrowIcon from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

export interface SelectProps {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
  }

export const Select = (props: SelectProps) => {
  const { options, placeholder, selected, onChange, onClose, title } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const SelectRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isExpanded,
    rootRef: SelectRef,
    onClose,
    onChange: setIsExpanded,
  });

  useEnterSubmit({
    placeholderRef,
    onChange: setIsExpanded,
  });

  const handleOptionSelection = (option: OptionType) => {
    setIsExpanded(false);
    onChange?.(option);
  };

  const handlePlaceholderToggle: MouseEventHandler<HTMLDivElement> = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.SelectContainer}>
      {title && (
        <Text size={12} weight={800} uppercase>
          {title}
        </Text>
      )}
      <div
        className={styles.SelectWrapper}
        ref={SelectRef}
        data-is-active={isExpanded}
        data-testid='SelectWrapper'
      >
        <img
          src={arrowIcon}
          alt='иконка стрелочки'
          className={clsx(styles.arrowIndicator, { [styles.arrow_open]: isExpanded })}
        />
        <div
          className={clsx(
            styles.displayText,
            styles[selected?.optionClassName || '']
          )}
          data-status={selected ? 'selected' : 'unselected'}
          data-selected={!!selected?.value}
          onClick={handlePlaceholderToggle}
          role='button'
          tabIndex={0}
          ref={placeholderRef}
        >
          <Text
            family={
              isFontFamilyClass(selected?.className)
                ? selected?.className
                : undefined
            }
          >
            {selected?.title || placeholder}
          </Text>
        </div>
        {isExpanded && (
          <ul className={styles.optionList} data-testid='SelectList'>
            {options
              .filter((option) => selected?.value !== option.value)
              .map((option) => (
                <Option
                  key={option.value}
                  option={option}
                  onClick={() => handleOptionSelection(option)}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
