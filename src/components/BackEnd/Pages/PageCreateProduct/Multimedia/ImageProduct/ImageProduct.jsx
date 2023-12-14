import style from "./ImageProduct.module.css";
import { useState } from "react";
import DeleteIcon from "@/components/global/icons/DeleteIcon";

const ImageProduct = ({ image, handleDeleteImage }) => {
    const [showDelete, setShowDelete] = useState(false)

    const handleEnter = () => {
        setShowDelete(true)
    }

    const handleLeave = () => {
        setShowDelete(false)
    }

    return (
        <div
            className={style.imageContainer}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <img src={image} alt="image" />
            {
                showDelete && (
                    <button className={style.deleteImageBtn} onClick={() => handleDeleteImage(image)}>
                        <DeleteIcon width="20px" height="20px" fill="#838383" />
                    </button>
                    // <DeleteIcon width="20px" height="20px" fill="#838383" />
                )
            }
        </div>
    )
}

export { ImageProduct }