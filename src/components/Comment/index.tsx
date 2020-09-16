import React, { PureComponent } from 'react';
import Valine from '@carrotwu/valine';
import './styles.scss';
import { valineAppId, valineAppKey } from '@/config';
import avatar from 'assets/images/avatar.jpg';
interface CommentProps {
  postId: number;
}

/**
 * valine评论组件
 */
export default class Comment extends PureComponent<CommentProps> {
  componentDidMount() {
    new Valine({
      el: '#ValineComment',
      appId: valineAppId,
      appKey: valineAppKey,
      //path: `/posttest`,
      avatar: 'robohash',
      placeholder: '感谢您的评论~~',
      enableQQ: true,
      requiredFields: ['nick'],
      adminName: 'carrotwu',
      adminEmail: '542425997@qq.com',
      adminImg: avatar,
      path: `/post/${this.props.postId}`
    });
  }

  render() {
    return <div id="ValineComment" />;
  }
}
