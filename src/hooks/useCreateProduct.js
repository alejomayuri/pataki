import { useEffect, useState } from "react"
import { getStorage } from "@/firebase/client"
import { useRouter } from "next/router"

export const useCreateProduct = () => {
    const FORM_STATE = {
        name: null,
        description: null,
        images: [],
        state: 'inactivo',
        regular_price: null,
        offer_price: null,
        currency: 'PEN',
        stock: 0,
        saleWithoutStock: false
    }

    const [formProduct, setFormProduct] = useState(FORM_STATE)

    const [uploadValue, setUploadValue] = useState(0)
    const [showProgress, setShowProgress] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)

    const router = useRouter()

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Manejar campos de texto
        if (type !== 'checkbox') {
            setFormProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            // Manejar campos de checkbox
            setFormProduct((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        }
    };

    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            const reader = new FileReader()

            reader.onload = function(e) {
                img.onload = function() {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height

                    if (width > maxWidth) {
                        height *= maxWidth / width
                        width = maxWidth
                    }

                    if (height > maxHeight) {
                        width *= maxHeight / height
                        height = maxHeight
                    }

                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, height)

                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, { type: file.type })
                        resolve(resizedFile) // Resolvemos la promesa con el archivo redimensionado
                    , file.type})
                }

                img.src = e.target.result
            }

            reader.readAsDataURL(file)
        })
    }

    // Para borrar las fotos del storage en caso la págine se actualoce o se cierre
    const filesToDelete = []
    let formSubmitted = false

    if (typeof window !== 'undefined') {
        // Aquí va la lógica que bora las imágenes del storage si no se sube el form, se actualiza o cierra la página, o si se cambia a otra página
        window.addEventListener('beforeunload', async () => {
            await deleteFilesFromStorage()
        })

        window.addEventListener('unload', async () => {
            await deleteFilesFromStorage()
        })
    }

    useEffect(() => {
        // Función que se ejecuta al cambiar de "página" en la SPA
        const handleRouteChange = async () => {
            // Borrar archivos del Storage solo si el formulario no ha sido enviado
            if (!formSubmitted) {
                await deleteFilesFromStorage()
            }
        }
    
        // Agregar el evento de cambio de ruta
        router.events.on('routeChangeStart', handleRouteChange)
    
        // Limpiar el evento al desmontar el componente
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        };
    }, [formSubmitted, router])

    const handleOnChangeImage = async (e) => {
        const files = e.target.files
        const maxWith = 500  // Tamaño máximo deseado
        const maxHeight = 500
        const storageRef = getStorage().ref("products") // Ruta de almacenamiento en Firebase Storage

        const storageRefPromises = []
        const totalFiles = files.length
        let uploadedFiles = 0

        for (let i = 0; i < totalFiles; i++) {
            const file = files[i]

            try {
                // Redimensionar cada imagen antes de subirla
                const resizedFile = await resizeImage(file, maxWith, maxHeight)
                const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 12)}_${resizedFile.name}`
                const storageChildRef = storageRef.child(uniqueFileName)

                const task = storageChildRef.put(resizedFile)

                filesToDelete.push(storageChildRef);

                const promise = new Promise((resolve, reject) => {
                    task.then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            resolve(url)
                        })
                    }).catch((err) => reject(err))

                    task.on("state_changed", (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
                        setUploadValue(progress)
                        setShowProgress(true)
                        if (progress === 100) {
                            uploadedFiles++;
                        }
                        console.log("progress", progress)
                    })
                    
                    task.then(() => {
                        // Cuando todos los archivos se hayan subido, actualizamos el estado y ocultamos la barra de carga
                        if (uploadedFiles === totalFiles) {
                            setUploadValue(100)
                            setShowProgress(false)
                            setDisabledButton(false)
                        }
                    })
                })

                storageRefPromises.push(promise)
            } catch (err) {
                console.log(err)
            }
        }

        // Esperar a que se suban todas las imágenes y actualizar el estado con las URL de las imágenes
        Promise.all(storageRefPromises).then((urls) => {
            setFormProduct((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...urls],
            }));
            setUploadValue(0);
            setDisabledButton(false);
            setShowProgress(false);
        }).catch((err) => console.log(err));
    }

    const deleteFilesFromStorage = async () => {
        const deletePromises = filesToDelete.map((fileRef) => fileRef.delete());
        
        try {
            await Promise.all(deletePromises);
            console.log('Archivos eliminados exitosamente.');
        } catch (error) {
            console.error('Error al eliminar archivos:', error);
        }
    };

    const handleDeleteImage = (url) => {
        const imageIndex = formProduct.images.findIndex(img => img === url);

        if (imageIndex !== -1) {
            const updatedImages = formProduct.images.filter(img => img !== url)
            setFormProduct({
                ...formProduct,
                images: updatedImages
            });

                // Elimina el archivo correspondiente al índice de la imagen
                const extractFileName = (url) => {
                    const parts = url.split("/");
                    const encodedFileName = parts[parts.length - 1].split("?")[0];
                    const fileName = decodeURIComponent(encodedFileName);
                    return fileName;
                };
                const imageName = extractFileName(url);
                const storageRef = getStorage().ref(`${imageName}`);
                storageRef.delete();
            
        }

        setShowProgress(false);
        setUploadValue(0);
    }

    return {
        formProduct,
        showProgress,
        uploadValue,
        disabledButton,
        handleOnChange,
        handleOnChangeImage,
        handleDeleteImage
    }
}