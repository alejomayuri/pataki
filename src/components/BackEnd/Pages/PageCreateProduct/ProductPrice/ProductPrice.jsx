import style from "./ProductPrice.module.css";
import { useState, useEffect } from "react";
import { BoxLayout } from "../BoxLayout/BoxLayout";

const ProductPrice = ({ onChange, price, comparisonPrice }) => {
    const [priceState, setPriceState] = useState(null)
    const [comparisonPriceState, setComparisonPriceState] = useState(null)

    const handlePriceChange = (e) => {
        setPriceState(e.target.value)
        onChange(e)
    }

    const handleComparisonPriceChange = (e) => {
        setComparisonPriceState(e.target.value)
        onChange(e)
    }

    useEffect(() => {
        setPriceState(price)
        setComparisonPriceState(comparisonPrice)
    }, [price, comparisonPrice])

    return (
        <BoxLayout title="Precio">
            <div className="backendWrapper-md">
                <div>
                    <h3>Precio regular</h3>
                    <div className={style.priceInput__wrapper}>
                        <select
                            onChange={onChange}
                            name="currency"
                            className={style.currency}
                        >
                            <option defaultValue value="PEN">PEN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <input
                            type="text"
                            onChange={handlePriceChange}
                            name="regular_price"   
                            value={priceState}
                        />
                    </div>
                </div>
                <div>
                    <h3>Precio de oferta</h3>
                    <input
                        type="text"
                        onChange={handleComparisonPriceChange}
                        name="offer_price"
                        value={comparisonPriceState}
                    />
                </div>
            </div>
            <p className="info">
                El <b>precio regular</b> es el precio base del producto. Si el producto tiene un <b>precio de oferta</b>, el precio regular se mostrará tachado y el precio de oferta se mostrará en su lugar. Si el prducto tiene un <b>precio variable</b> (por ejemplo, un producto que se vende por tallas), puedes dejar el precio en blanco.
            </p>
        </BoxLayout>
    );
}

export { ProductPrice };