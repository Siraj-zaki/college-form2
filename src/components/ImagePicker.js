import React, { Component } from "react";
import Header from '../header';
import '../index.css'
import Loader from 'react-loader-spinner'
export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    if (e.target.files[0] == undefined) {
      return
    }
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    this.props.getFile(file)
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Select Image <span className="plus">&#43;</span> </div>);
    }

    return (
      <div className="previewComponent hide-on-print" style={{ right: this.props.new ? "5%" : null }}>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input className="fileInput" id="imagepicker"
            type="file" required
            onChange={(e) => this._handleImageChange(e)} />
        </form>
        <label htmlFor="imagepicker" className="labelimage">
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </label>
      </div>
    )
  }
}
