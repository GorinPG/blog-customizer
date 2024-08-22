import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  OptionType,
} from 'src/constants/articleProps';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type FormProps = {
  formState: {
    fontFamilyOption: OptionType;
    fontColor: OptionType;
    backgroundColor: OptionType;
    contentWidth: OptionType;
    fontSizeOption: OptionType;
  };
  setFormState: React.Dispatch<
    React.SetStateAction<{
      fontFamilyOption: OptionType;
      fontColor: OptionType;
      backgroundColor: OptionType;
      contentWidth: OptionType;
      fontSizeOption: OptionType;
    }>
  >;
  resetForm: () => void;
  submitForm: (e: FormEvent<HTMLFormElement>) => void;
};

export function ArticleParamsForm({
  formState,
  setFormState,
  resetForm,
  submitForm,
}: FormProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        toggleSidebar();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
	<>
	  <ArrowButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />
	  <aside
		className={clsx(styles.sidebar, { [styles.sidebar_open]: isSidebarOpen })}
	  >
		<form className={styles.formLayout} onSubmit={submitForm} ref={formRef}>
		  <Text as='h2' size={31} weight={800} uppercase>
			Задайте параметры
		  </Text>
		  <Select
			selected={formState.fontFamilyOption}
			onChange={(option: OptionType) =>
			  setFormState({
				...formState,
				fontFamilyOption: option,
			  })
			}
			options={fontFamilyOptions}
			placeholder='Open Sans'
			title='шрифт'
		  />
		  <RadioGroup
			selected={formState.fontSizeOption}
			onChange={(option: OptionType) =>
			  setFormState({
				...formState,
				fontSizeOption: option,
			  })
			}
			options={fontSizeOptions}
			name='font-size'
			title='размер шрифта'
		  />
		  <Select
			selected={formState.fontColor}
			onChange={(option: OptionType) =>
			  setFormState({
				...formState,
				fontColor: option,
			  })
			}
			options={fontColors}
			placeholder='Чёрный'
			title='цвет шрифта'
		  />
		  <Separator />
		  <Select
			selected={formState.backgroundColor}
			onChange={(option: OptionType) =>
			  setFormState({
				...formState,
				backgroundColor: option,
			  })
			}
			options={backgroundColors}
			placeholder='Белый'
			title='цвет фона'
		  />
		  <Select
			selected={formState.contentWidth}
			onChange={(option: OptionType) =>
			  setFormState({
				...formState,
				contentWidth: option,
			  })
			}
			options={contentWidthArr}
			placeholder='Широкий'
			title='ширина контейнера'
		  />
		  <div className={styles.bottomContainer}>
			<Button title='Сбросить' type='reset' onClick={resetForm} />
			<Button title='Применить' type='submit' />
		  </div>
		</form>
	  </aside>
	</>
  );
}