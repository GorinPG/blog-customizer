import { CSSProperties, useState, FormEvent } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import layoutStyles from './styles/index.module.scss';

export const App: React.FC = () => {
  const [articleState, setArticleState] = useState(defaultArticleState);
  const [settingsState, setSettingsState] = useState(defaultArticleState);

  const handleReset = () => {
    setSettingsState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArticleState({
      ...articleState,
      fontFamilyOption: settingsState.fontFamilyOption,
      fontSizeOption: settingsState.fontSizeOption,
      fontColor: settingsState.fontColor,
      contentWidth: settingsState.contentWidth,
      backgroundColor: settingsState.backgroundColor,
    });
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
      }
    >
      <ArticleParamsForm
        formState={settingsState}
        setFormState={setSettingsState}
        resetForm={handleReset}
        submitForm={handleSubmit}
      />
      <Article />
    </main>
  );
};
