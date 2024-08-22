import React, { useState, FormEvent } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
  const [currentPageState, setCurrentPageState] = useState(defaultArticleState);
  const [currentFormState, setCurrentFormState] = useState(defaultArticleState);

  const handleReset = () => {
    setCurrentFormState(defaultArticleState);
    setCurrentPageState(defaultArticleState);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPageState({
      ...currentPageState,
      fontFamilyOption: currentFormState.fontFamilyOption,
      fontSizeOption: currentFormState.fontSizeOption,
      fontColor: currentFormState.fontColor,
      contentWidth: currentFormState.contentWidth,
      backgroundColor: currentFormState.backgroundColor,
    });
  };

  return (
    <main
      className={styles.main}
      style={
        {
          '--font-family': currentPageState.fontFamilyOption.value,
          '--font-size': currentPageState.fontSizeOption.value,
          '--font-color': currentPageState.fontColor.value,
          '--container-width': currentPageState.contentWidth.value,
          '--bg-color': currentPageState.backgroundColor.value,
        } as React.CSSProperties
      }
    >
      <ArticleParamsForm
        formState={currentFormState}
        setFormState={setCurrentFormState}
        resetForm={handleReset}
        submitForm={handleFormSubmit}
      />
      <Article />
    </main>
  );
};
