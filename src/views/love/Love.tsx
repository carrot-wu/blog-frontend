import React from 'react';
import './styles.scss';
import { Header } from 'components';

const Love: React.FC = () => {
  return (
    <div className="love-wrapper">
      <Header />
      <div className="love-content">
        <span>完善中</span>
      </div>
    </div>
  );
};
export default Love;
