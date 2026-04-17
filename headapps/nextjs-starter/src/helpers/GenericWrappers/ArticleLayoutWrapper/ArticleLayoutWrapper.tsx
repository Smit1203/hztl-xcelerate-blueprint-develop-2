import { tv } from 'tailwind-variants';
import ArticleCardWrapper, { ArticleModel } from '../ArticleCardWrapper/ArticleCardWrapper';
import { useIsTablet } from 'lib/hooks/useIsTablet';
import { useIsMobile } from 'lib/hooks/useIsMobile';

export type ArticleLayoutWrapperProps = {
  articles: ArticleModel[];
};

const ArticleLayoutWrapper = (props: ArticleLayoutWrapperProps) => {
  const articles = props?.articles;
  const { base, articleCardWrapper } = TAILWIND_VARIANTS();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  return (
    <div className={base()}>
      {/* Render full rows in a 3-column grid */}
      <div
        className={`${articleCardWrapper()} grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-3`}
      >
        {articles.slice(0, Math.floor(articles.length / 3) * 3).map((article) => (
          <ArticleCardWrapper
            key={article.id}
            article={article}
            isHorizontalCardLayout={isTablet && !isMobile}
            isOneColHorizontalLayout={false}
          />
        ))}
      </div>
      {/* Render last row if it has 1 or 2 cards */}
      {articles.length % 3 === 2 && (
        <div
          className={`${articleCardWrapper()} grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2`}
        >
          {articles.slice(-2).map((article) => (
            <ArticleCardWrapper
              key={article.id}
              article={article}
              isHorizontalCardLayout={!isMobile}
              isOneColHorizontalLayout={false}
            />
          ))}
        </div>
      )}
      {articles.length % 3 === 1 && (
        <div className={`${articleCardWrapper()} grid-cols-1 sm:grid-cols-1 lg:grid-cols-1`}>
          <ArticleCardWrapper
            key={articles[articles.length - 1].id}
            article={articles[articles.length - 1]}
            isHorizontalCardLayout={!isMobile}
            isOneColHorizontalLayout={!isTablet && !isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleLayoutWrapper;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['flex', 'flex-col'],
    mainTitleStyle: [
      'text-component-feature-title',
      'font-typography-header-font-family',
      'text-typography-header-medium-font-size',
      'font-bold',
      'leading[38.4px]',
    ],
    articleCardWrapper: ['grid', 'gap-6', 'm-auto'],
    viewMoreButtonWrapper: ['m-auto'],
    viewMoreButton: [
      'flex',
      'items-center',
      'py-spacing-spacing-16',
      'px-spacing-spacing-24',
      'gap-spacing-spacing-8',
      'border-general-border-width-button',
      'border-component-button-primary-outline-border',
      'rounded-general-border-radius-button',
      'bg-component-button-primary-outline-bg',
    ],
    loaderStyle: ['text-center'],
    noArticleStyle: ['text-center', 'text-lg', 'font-semibold', 'text-color-text-text'],
    loadMoreTextStyle: [
      'text-component-button-primary-outline-text',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-semibold',
      'leading-6',
    ],
    loaderSVGIconStyle: ['inline animate-spin', 'w-10', 'text-color-text-text'],
  },
});
