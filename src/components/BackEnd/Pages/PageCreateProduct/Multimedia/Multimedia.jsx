import style from "./Multimedia.module.css";
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { ImageProduct } from "./ImageProduct/ImageProduct";
import UploadImage from "@/components/global/icons/UploadImage";


const Multimedia = ({ showProgress, uploadValue, onChange, handleDeleteImage, images }) => {
    return (
        <BoxLayout title="Multimedia">
            <div className={style.prevImageWrapper}>
                <div>
                    <div className={style.imageContainer}>
                        <UploadImage width="100px" height="100px" />
                    </div>
                    {showProgress && <progress value={uploadValue} max="100" />}
                </div>
                {!showProgress && (
                    <div className={style.fileInput}>
                        <input type="file" name='image' onChange={onChange} multiple />
                        <p>
                            o arrastra y suelta la imágen que deseas subir
                        </p>
                    </div>
                )}
            </div>
            <div>
                {images && images.length > 0 && (
                    <>
                        <h3>Imágenes del producto</h3>
                        <div className={style.images__wrapper}>
                            {
                                images.map((image, index) => (
                                    <ImageProduct key={index} image={image} handleDeleteImage={handleDeleteImage} />
                                ))
                            }
                        </div>
                    </>
                )}
            </div>
        </BoxLayout>
    )
}

export { Multimedia };