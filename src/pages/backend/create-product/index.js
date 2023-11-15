import Link from "next/link"
import { BackEndLayout } from "@/Layouts/BackEndLayout"
import { PageTitle } from "@/components/BackEnd/global/PageTitle/PageTitle"
import { PurpleBackArrow } from "@/components/global/icons/PurpleBackArrow"
import { useCreateProduct } from "@/hooks/useCreateProduct"
import { TitleAndDescription } from "@/components/BackEnd/Pages/PageCreateProduct/TitleAndDescription/TitleAndDescription"
import { ProductState } from "@/components/BackEnd/Pages/PageCreateProduct/ProductState/ProductState"
import { ProductPrice } from "@/components/BackEnd/Pages/PageCreateProduct/ProductPrice/ProductPrice"

const BackEnd = () => {
    const {
        formProduct,
        handleOnChange
    } = useCreateProduct()

    console.log("formProduct", formProduct)
    
    return (
        <BackEndLayout>
            <PageTitle title="Productos">
                <Link href="/backend">
                    <PurpleBackArrow width={40} height={40} />
                </Link>
            </PageTitle>
            <div className="backendWrapper-md">
                <div>
                    <TitleAndDescription onChange={handleOnChange} />
                    <ProductPrice onChange={handleOnChange} />
                </div>
                <div>
                    <ProductState onChange={handleOnChange} />
                </div>
            </div>
        </BackEndLayout>
    )
}

export default BackEnd