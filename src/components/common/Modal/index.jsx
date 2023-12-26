import React, { useState } from 'react';
import { Button, Modal, Progress } from 'antd';
import { AiFillPicture } from "react-icons/ai";
import ReactQuill from 'react-quill';
import './index.scss';

const ModalComponent = ({ 
  modalOpen, 
  setModalOpen, 
  setStatus, 
  status, 
  sendStatus, 
  isEdit,
  updateStatus,
  uploadPostImage,
  postImage,
  setPostImage,
  currentPost,
  setCurrentPost
}) => {
  const [progress, setProgress] = useState(0);

  // console.log(currentPost.postImage?.length);

  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus('');
          setModalOpen(false);
          setPostImage('');
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus('');
          setModalOpen(false);
          setPostImage('');
          setCurrentPost({});
        }}
        footer={[
            <Button 
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit" 
            type="primary" 
            disabled={status.length > 0 ? false : true}
            >
              {isEdit ? 'Update' : 'Post'}
            </Button>
          ]}
      >
        <div className="posts-body">
          <ReactQuill 
            className="modal-input"
            placeholder="What do you want to talk about?"
            theme="snow" 
            value={status} 
            onChange={setStatus} 
          />

          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}

          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img 
              className="post-image-preview" 
              src={postImage || currentPost?.postImage} 
              alt='postImage'
            /> 
          ) : (
            <></>
          )}
        </div>

        <label for="pic-upload">
          <AiFillPicture size={35} className="picture-icon" />
        </label>
        <input 
          id="pic-upload" 
          type={"file"} 
          hidden 
          onChange={(event) => uploadPostImage(event.target.files[0], setPostImage, setProgress)}
        />

      </Modal>
    </>
  );
};

export default ModalComponent;