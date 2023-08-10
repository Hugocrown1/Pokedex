import React from 'react';
import typeIconMapping from '@utils/pokeTypes';
import  {typeTranslations } from '@utils/translator';

const TypeIcon = ({ type }) => {
  const iconType = typeIconMapping[type.type.name];  
  if (!iconType) {
    return null; 
  }

  return <div className={iconType} >{typeTranslations[type.type.name]}</div>;
};

export default TypeIcon;
