import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from '../posts/CreatePost';

function CreatePostModal({setShowModal}){
    // const [showModal, setShowModal] = useState(false);

    return (
        <>
  
            {
                (
                    <Modal onClose={()=>setShowModal(false)}>
                        <CreatePostForm hideModal={()=>setShowModal(false)} />
                    </Modal>
                )
            }
        </>
    )
}

export default CreatePostModal;
