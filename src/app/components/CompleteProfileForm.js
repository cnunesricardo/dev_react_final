import React,{useState, useEffect, useRef} from "react";
import { useForm } from 'react-hook-form'
import AvatarEditor from "react-avatar-editor";
import { ProductContainer, ProductImageProd, CardButton } from '@/app/styles/ProductsStyles'

const ZoomSlider = ({zoom, onZoomChange }) => {
    return(
        <input 
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
        />     
    );
};

const CompleteProfileForm = ({ user }) => {
    const { register, setValue, handleSubmit } = useForm();
    const [editedImage, setEditedImage] = useState(null);
    const [zoom, setZoom] = useState(2);
    const editorRef = useRef(null);

    useEffect(() =>{    
        setValue('name', user.name)
        setValue('email', user.email)

    }, [user, setValue])

    const handleZoomChange = (newZoom) => {
        setZoom(newZoom)
    };

    const handleImageChange = (e) => {
        const file =  e.target.files[0];
        setEditedImage(file);
    }

    const handleImageCrop = () => {
        if(editorRef.current){
            const canvas = editorRef.current.getImageScaledToCanvas();
            canvas.toBlob((blob) => {
                setEditedImage(blob);
            });
        }
    };

    const handleSave = () => {
        handleImageCrop();
        setEditedImage(null);
    };

    const handleCancel = () => {
        setEditedImage(null)
    };

    const onSubmit = (data) => {
        const onSubmit = async () => {
            try {
                const response = await axios.post('https://someapi.com/newUser', data)
                console.log('Resposta da API (post): ', response.data)
                
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    return(
        <form className="container mx-auto max-w-screen-sm rounded-lg shadow-x1 text-lg">
            <div className="pt-5">
                <label htmlFor="name" className="block">
                    Name:
                </label>
                <input {...register('name')} id="name" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block">
                    E-mail:
                </label>
                <input {...register('email')} id="email" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block">
                    Mobile:
                </label>
                <input {...register('phone')} id="phone" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="block">
                    Image:
                </label>

                <input type="file" 
                    onChange={handleImageChange}
                    accept="image/*" 
                    id="image" 
                    className="py-2 px-3"
                />
            </div>

            {editedImage && (
                <>
                    <AvatarEditor
                        ref={editorRef}
                        image={editedImage}
                        width={200}
                        height={200}
                        border={10}
                        color={[255, 255, 255, 0.6]}
                        rotate={0}
                        scale={zoom}
                    />
                    <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange}></ZoomSlider>
                
                    <div className="flex justify">
                        <button type="submit" onClick={handleCancel} className="bg-orange-500 text-white border-none p-2 cursor-pointer rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg">
                            Cancel
                        </button>
                    </div>

                </>
            )}

            <div className="flex justify">
                <button type="submit" onSubmit={onSubmit} className="bg-orange-500 text-white border-none p-2 cursor-pointer rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg">
                Save
                </button>
            </div>

        </form>
    );
};
export default CompleteProfileForm;

