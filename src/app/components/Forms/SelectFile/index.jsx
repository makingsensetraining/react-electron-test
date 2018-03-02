import React from 'react';

import { composePure, withState, withHandlers, withProps } from '../../../utils/composepure';

const SelectFile = ({ file, setImagePreviewUrl, _handleSubmit, name, label, actualimg, _handleImageChange, $imagePreview }) => (
  <div className="row">
    <form onSubmit={e => _handleSubmit(e)} encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="input-file-din" className="col-2 col-form-label">{label}</label>
        <div className="col-10">
          <input
            className="fileInput"
            type="file"
            onChange={e => _handleImageChange(e)}
            accept="image/*"
            name={name}
            id="input-file-din"
          />
          <button
            className="submitButton"
            type="submit"
            onClick={e => _handleSubmit(e)}
          >
              Upload Image
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card text-center">
            <div className="card-header">
              Actual
            </div>
            <div className="card-body">
              {actualimg}
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card text-center">
            <div className="card-header">
              Preview
            </div>
            <div className="card-body">
              {$imagePreview}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default composePure(
  withState('file', 'setFile', ''),
  withState('imagePreviewUrl', 'setImagePreviewUrl', ''),
  withHandlers({
    _handleSubmit: props => (event) => {
      event.preventDefault();
      props.uploadPhoto({ file: props.file, form: event.target, name: props.name });
      props.setImagePreviewUrl(null);
    },
    _handleImageChange: props => (event) => {
      event.preventDefault();
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        props.setFile(file);
        props.setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    },
  }),
  withProps(props => ({
    $imagePreview: props.imagePreviewUrl ? (<img src={props.imagePreviewUrl} />) : (<div className="previewText">Please select an Image for Preview</div>),
  })),
)(SelectFile);
