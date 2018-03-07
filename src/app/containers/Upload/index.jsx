import React from 'react';
import {ipcRenderer} from 'electron';

const UploadContainer = (props) => {
  let fileRef = null;
  const onChange = () => {
  };
  return (
    <input type="file" name="upload" ref={(ref) => fileRef = ref} onChange={onChange} />
  );
};

export default UploadContainer;
