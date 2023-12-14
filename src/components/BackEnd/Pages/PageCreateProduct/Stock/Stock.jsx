import style from "./Stock.module.css";
import { useState, useEffect } from "react";
import { BoxLayout } from "../BoxLayout/BoxLayout";

const Stock = ({ onChange, initialStock, initialSaleWithoutStock }) => {
    const [stockState, setStockState] = useState(null)
    const [saleWithoutStockState, setSaleWithoutStockState] = useState(null)

    const handleStockChange = (e) => {
        setStockState(e.target.value)
        onChange(e)
        console.log(e.target.type)
    }

    const handleSaleWithoutStockChange = (e) => {
        setSaleWithoutStockState(!saleWithoutStockState)
        onChange(e)
    }

    useEffect(() => {
        setStockState(initialStock)
        setSaleWithoutStockState(initialSaleWithoutStock)
    }, [initialStock, initialSaleWithoutStock])

    return (
        <BoxLayout title="Inventario">
            <div>
                <h3>Stock</h3>
                <input
                    type="text"
                    onChange={handleStockChange}
                    name="stock"
                    value={stockState}
                />
            </div>
            <div className={style.noStock}>
                <div>
                    <input type="checkbox" name="saleWithoutStock" 
                        onChange={handleSaleWithoutStockChange}
                        checked={saleWithoutStockState}
                    />
                    <label htmlFor="saleWithoutStock">Continuar vendiendo cuando esté agotado</label>
                </div>
            </div>
        </BoxLayout>
    );
}

export { Stock };