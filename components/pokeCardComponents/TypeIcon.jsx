import React from 'react';
import typeIconMapping from '@utils/pokeTypes';
import  {typeTranslations } from '@utils/translator';

const TypeIcon = ({ type }) => {
  const iconType = typeIconMapping[type];  
  if (!iconType) {
    return null; 
  }

  return <div className={iconType} >{typeTranslations[type]}</div>;
};

export default TypeIcon;
