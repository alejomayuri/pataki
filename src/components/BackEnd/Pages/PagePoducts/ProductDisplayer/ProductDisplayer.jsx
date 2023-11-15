import style from './ProductDisplayer.module.css'
import { useEffect, useState } from "react";
import { SearchBar } from '../SearchBar/SearchBar'
import Link from 'next/link';

const ProductDisplayer = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="defaultItemContainer">
            <div className={style.topWrapper}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Link href="/backend/create-product">
                    <button>Crear producto</button>
                </Link>
            </div>
            <div className={style.productsLeyend}>
                <ul>
                    <li className={style.name}>
                        <p>Nombre</p>
                    </li>
                    <li className={style.sku}>
                        <p>SKU</p>
                    </li>
                    <li className={style.price}>
                        <p>Precio</p>
                    </li>
                    <li>
                        <p>Stock</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export { ProductDisplayer }