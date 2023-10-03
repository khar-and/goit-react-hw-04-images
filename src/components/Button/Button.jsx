import React from 'react';
import { BtnLoadMore, ButtonWrap } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonWrap>
      <BtnLoadMore type="button" onClick={onClick}>
        Load More
      </BtnLoadMore>
    </ButtonWrap>
  );
};

export default Button;
