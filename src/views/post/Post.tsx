import React, { useEffect, useMemo } from 'react';
import generatoc from '@utils/generatoc';
import marked from 'marked';
import useFormatDate from '@hooks/useFormatDate';
import { Loading } from '@components/index';
import { useHistory, useParams } from 'react-router';
import { usePromise, useTitle } from '@hooks/index';
import { getArticleById } from '@services/article';
import './styles.less';
import './generatoc.css';

const gecContent = '.content';
const gecHeading = ['h2', 'h3', 'h4', 'h5'];
const gecSelector = '#toc';

const Prism = window && window.Prism;
marked.setOptions({
  highlight(code: string, lang: any) {
    return Prism.highlight(code, Prism.languages[lang], lang);
  },
});
const Post: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    promiseFn: getArticleDetail,
    res: { data },
    loading,
  } = usePromise(async (id: string) => getArticleById({ id }), [id]);
  const { title, content = '', createdStamp } = data;
  const time = useFormatDate(createdStamp);
  // 修改标题
  useTitle(title);
  useEffect(() => {
    if (!id) {
      //不存在id
      history.replace('/home');
    } else {
      getArticleDetail(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    generatoc.destroy();
    generatoc.init({
      content: gecContent,
      heading: gecHeading,
      selector: gecSelector,
      scrollElement: '.content',
    });
  });
  const html = useMemo(() => marked(content), [content]);
  return (
    <div className="content">
      {loading ? (
        <div className="post-loading">
          <Loading size={50}>文章加载中</Loading>
        </div>
      ) : (
        <div className="post">
          <div className="title">{title}</div>
          <div className="byline">
            <div className="author">carrotWu</div>
            <div className="time">{time}</div>
          </div>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div id="toc" />
        </div>
      )}
    </div>
  );
};
export default Post;
