import React, { useEffect, useState, useRef } from "react";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

  export default function Image({setImage,image,setIsImage}) {
    const [state, setState] = React.useState({
        loading: false,
      });
    const { loading, imageUrl } = state;
    
   
      const  handleChange = async(info) => {
        if (info.file.status === 'uploading') {
          setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
          {  setState({
              imageUrl,
              loading: false,
            });
            setImage(imageUrl)
            setIsImage(true);
            // image=imageUrl
          
          }
          );
        }
      };
      const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };
    console.log("image---",state,image)
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
      function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
          alert("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
      }
      
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {image ? <img src={image} alt="avatar" style={{ width: '120px',height:"100px" }} /> : uploadButton}
      </Upload>
    );
  }


