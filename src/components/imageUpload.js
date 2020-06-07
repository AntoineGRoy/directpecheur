import React, { useContext, useState } from 'react'
import { db, storage, auth, config } from '../firebase'
import { UserContext } from '../usercontext'
import '../css/imageUpload.css'
import { motion } from 'framer-motion'

function ImageUpload() {
    const [image, setImage] = useState(null)
    const [info, setInfo] = useState(null);
    const [changeImage, setChangeImage] = useState(false);
    const { userInfos } = useContext(UserContext);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        } else { console.log('NO FILE') }
    }
    const handleUpload = (e) => {
        if (image) {
            e.preventDefault()
            const uploadTask = storage.ref(`${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapShot => {

                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref()
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            setInfo('All Done !');
                            db.collection("users").doc(auth.currentUser.uid).set({
                                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${image.name}?alt=media`,

                            }, { merge: true })
                                .then(function () {
                                    console.log("Document successfully written!" + auth.currentUser);
                                    window.location.reload(false);
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                    setInfo('Sorry...It doesn\'t work')
                                });
                        })
                }
            );
        } else {
            setInfo('Choose An Image')
        }


    }
    const uploadMotion = {

        on: {
            y: 5,
            width: '14rem',
            opacity: 1

        },
        off: {
            y: 200,
            width: '14rem',
            opacity: 0
        },

    }
    const containerMotion = {

        on: {
            height: 'auto'

        },
        off: {
            height: 'auto',

        },

    }
    const buttonsMotion = {

        on: {
            opacity: 1,

        },
        off: {
            opacity: 0,
        },

    }
    return (

        <motion.div positionTransition variants={containerMotion} initial={`off`} animate={!changeImage ? `off` : `on`}
            transition={{
                duration: 1.5,
            }} style={{ marginTop: '1rem', width: '100vw', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: "250px", display: 'flex', flexDirection: "column" }}>
                <h3>{userInfos.username}<br />{userInfos.email}</h3>
                <img style={{ width: '4rem', margin: '1rem auto' }} alt="user-avatar" src={userInfos.imageUrl} />
                <h4 style={{ cursor: 'pointer', textDecoration: 'underline overline', marginTop: '-.5rem' }} onClick={() => { setChangeImage(!changeImage) }}>
                    Change Image</h4>
            </div>
            <motion.div
                transition={{
                    duration: 1,
                    ease: "easeInOut"
                }}
                variants={uploadMotion} initial={`off`} animate={!changeImage ? `off` : `on`}
                style={{ margin: '1rem', zIndex: 99, background: 'rebeccapurple', color: 'white', borderRadius: '12px', width: '20rem' }}>
                <motion.div style={{ opacity: 0 }} variants={buttonsMotion} initial={`off`} animate={!changeImage ? `off` : `on`}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        delay: .5
                    }} >
                    <input className="inputfile" id="myFileInput" type='file' onChange={handleChange} />
                    <label htmlFor="myFileInput"><div style={{ transitionProperty: 'height', transition: '1s linear', border: '1px solid orange', margin: '1rem', padding: '.5rem', color: 'orange', background: 'white' }}>{image ? 'File Ready' : 'Choose a file'}</div></label>
                    <button className='submit-file' style={{ margin: '.5rem auto', padding: '.5rem' }} onClick={handleUpload}>Upload</button>
                    <h3 style={{ color: 'red' }}>{info}</h3>
                    <h3 onClick={() => { setChangeImage(false) }} style={{ margin: '1rem', cursor: 'pointer' }}>Cancel</h3>
                </motion.div>
            </motion.div>

        </motion.div>


    )
}

export default ImageUpload
