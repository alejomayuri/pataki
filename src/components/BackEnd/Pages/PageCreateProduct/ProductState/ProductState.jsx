import { useEffect, useState } from 'react'
import { BoxLayout } from "@/components/BackEnd/Pages/PageCreateProduct/BoxLayout/BoxLayout"

const ProductState = ({ onChange, productState }) => {
    const [state, setState] = useState("inactive")

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value)
        onChange(e)
    }

    useEffect(() => {
        if (productState) {
            setState("active")
        } else {
            setState("inactive")
        }
    }, [productState])

    return (
        <BoxLayout title="Estado del producto" small>
            <div>
                <select name="state" onChange={handleChange}>
                    <option
                        value="inactive"
                        selected={state === "inactive" ? true : false}
                    >Inactivo</option>
                    <option
                        value="active"
                        selected={state === "active" ? true : false}
                    >Activo</option>
                </select>
            </div>
            <p>
                {
                    state === "inactive" ? (
                        "El producto no se mostrará en la tienda"
                    ) : (
                        "El producto se mostrará en la tienda y estará disponible para la venta"
                    )
                }
            </p>
        </BoxLayout>
    )
}

export { ProductState }