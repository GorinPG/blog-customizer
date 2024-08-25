import { CSSProperties, useState } from 'react';

import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import '../../styles/index.scss';
import layoutStyles from '../../styles/index.module.scss';

export const App: React.FC = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleArticleUpdate = (updatedState: typeof defaultArticleState) => {
		setArticleState(updatedState);
	};

	return (
		<main
			className={layoutStyles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialFormState={articleState}
				updateArticleState={handleArticleUpdate}
			/>
			<Article />
		</main>
	);
};
