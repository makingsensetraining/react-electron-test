import React from 'react';

const UploadContainer = (props) => {
  let fileRef = null;
  const onChange = () => {
    console.log(fileRef.files);
  };
  return (
    <input type="file" name="upload" ref={(ref) => fileRef = ref} onChange={onChange} />
  );
};

export default UploadContainer;
