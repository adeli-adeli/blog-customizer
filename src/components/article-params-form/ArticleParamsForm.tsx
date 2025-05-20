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

export const ArticleParamsForm = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const articleRef = useRef<HTMLDivElement>(null);
	const [fontFamilyOption, setfontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [fontSizeOption, setFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);

	useOutsideClickClose({
		isOpen: isModalOpen,
		onChange: setIsModalOpen,
		rootRef: articleRef,
	});

	// открытие/закрытие формы
	const handleClick = () => {
		setIsModalOpen((isOpen) => !isOpen);
	};
	const handleFontChange = (newFont: OptionType) => {
		setfontFamilyOption(newFont);
	};

	const handleFontSizeChange = (newFontSize: OptionType) => {
		setFontSizeOption(newFontSize);
	};

	const handleFontColorChange = (newFontColor: OptionType) => {
		setFontColor(newFontColor);
	};

	const handleBackgroundColorChange = (newBackgroundColor: OptionType) => {
		setBackgroundColor(newBackgroundColor);
	};

	const handleContentWidthChange = (newContentWidth: OptionType) => {
		setContentWidth(newContentWidth);
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
				<form className={styles.form}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<div>
						<Select
							title='Шрифты'
							options={fontFamilyOptions}
							selected={fontFamilyOption}
							onChange={handleFontChange}
						/>
					</div>
					<div>
						<RadioGroup
							title='Размер шрифта'
							name='radio'
							options={fontSizeOptions}
							selected={fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>
					<div>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={fontColor}
							onChange={handleFontColorChange}
						/>
					</div>
					<div>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={backgroundColor}
							onChange={handleBackgroundColorChange}
						/>
					</div>
					<div>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={contentWidth}
							onChange={handleContentWidthChange}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
