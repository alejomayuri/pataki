import Link from "next/link"
import { BackEndLayout } from "@/Layouts/BackEndLayout"
import { PageTitle } from "@/components/BackEnd/global/PageTitle/PageTitle"
import { PurpleBackArrow } from "@/components/global/icons/PurpleBackArrow"
import { ProductDisplayer } from "@/components/BackEnd/Pages/PagePoducts/ProductDisplayer/ProductDisplayer"

const BackPlataform_Products = () => {
    return (
        <BackEndLayout>
            <PageTitle title="Productos">
                <Link href="/backend">
                    <PurpleBackArrow width={40} height={40} />
                </Link>
            </PageTitle>
            <div className="backendWrapperFull">
                <ProductDisplayer />
            </div>
        </BackEndLayout>
    )
}

export default BackPlataform_Products