import React from 'react';
import { Button, Modal } from 'antd';
import './index.scss';

const ModalComponent = ({ modalOpen, setModalOpen }) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            <Button key="submit" type="primary" disabled>
              Post
            </Button>
          ]}
      >
        <input 
            className="modal-input" 
            placeholder="What do you want to talk about?"
        />
      </Modal>
    </>
  );
};

export default ModalComponent;