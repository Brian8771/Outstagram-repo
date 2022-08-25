import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from '../posts/EditPost';

function EditPostModal({post,setShowModal}){
    // const [showModal, setShowModal] = useState(false);
    
    return(
        <>
        {/* <i className="fa-solid fa-pen" onClick={()=>setShowModal(true)}></i> */}
        { (
                <Modal onClose={()=>setShowModal(false)}>

                    <EditPostForm hideModal={()=> setShowModal(false)} post={post} />
                </Modal>
            )
        }
        </>
    )
}

export default EditPostModal
