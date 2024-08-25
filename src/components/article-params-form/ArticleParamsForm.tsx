import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

type ArticleParamsFormProps = {
	initialFormState: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	updateArticleState: (newState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	initialFormState,
	updateArticleState,
}) => {
	const rootRef = useRef<HTMLFormElement | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(initialFormState);

	useEffect(() => {
		setFormState(initialFormState);
	}, [initialFormState]);

	const toggleFormOpen = () => setIsFormOpen((prevOpen) => !prevOpen);

	const handleReset = () => {
		setFormState(defaultArticleState);
		updateArticleState(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateArticleState(formState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton state={isFormOpen} toggleState={toggleFormOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit} ref={rootRef}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: option,
							}))
						}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						title='шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: option,
							}))
						}
						options={fontSizeOptions}
						name='font-size'
						title='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: option,
							}))
						}
						options={fontColors}
						placeholder='Чёрный'
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: option,
							}))
						}
						options={backgroundColors}
						placeholder='Белый'
						title='цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: option,
							}))
						}
						options={contentWidthArr}
						placeholder='Широкий'
						title='ширина контейнера'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
