import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type ParamsProps = {
	setPageStyle: (params: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ setPageStyle }: ParamsProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [forData, setFormData] = useState(defaultArticleState);
	const articleRef = useRef<HTMLDivElement>(null);

	// зарытие вне сайдбара
	useOutsideClickClose({
		isOpen: isModalOpen,
		onChange: setIsModalOpen,
		rootRef: articleRef,
	});

	// открытие/закрытие сайдбара
	const handleClick = () => {
		setIsModalOpen((isOpen) => !isOpen);
	};

	const handleChange = (
		key: keyof typeof defaultArticleState,
		value: OptionType
	) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	// обработка сабмита
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageStyle(forData);
		setIsModalOpen(false);
	};

	//обработка ресета
	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageStyle(defaultArticleState);
		setFormData(defaultArticleState);
		setIsModalOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isModalOpen} onClick={handleClick} />
			<aside
				ref={articleRef}
				className={clsx(
					styles.container,
					isModalOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<h1 className={styles.title}>Задайте параметры</h1>

					<Select
						title='Шрифты'
						options={fontFamilyOptions}
						selected={forData.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='radio'
						options={fontSizeOptions}
						selected={forData.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={forData.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
					/>
					<div className={styles.separator}></div>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={forData.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={forData.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
