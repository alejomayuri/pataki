import { useState } from "react"

export const useCreateProduct = () => {
    const FORM_STATE = {
        name: null,
        description: null,
        state: 'inactivo',
        regular_price: null,
        offer_price: null,
        currency: 'PEN'
    }

    const [formProduct, setFormProduct] = useState(FORM_STATE)

    const handleOnChange = (e) => setFormProduct({
        ...formProduct,
        [e.target.name]: e.target.value
    })

    return {
        formProduct,
        handleOnChange
    }
}