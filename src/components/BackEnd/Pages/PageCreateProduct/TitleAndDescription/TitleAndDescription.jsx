import { useState, useEffect } from "react";
import { BoxLayout } from "@/components/BackEnd/Pages/PageCreateProduct/BoxLayout/BoxLayout"

const TitleAndDescription = ({ onChange, initialName, initialDescription }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
        onChange(e)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        onChange(e)
    }

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
    }, [initialName, initialDescription])

    return (
        <BoxLayout>
            <div>
                <h3>Nombre</h3>
                <input
                    type="text"
                    onChange={handleNameChange}
                    name="name"
                    value={name}
                />
            </div>
            <div>
                <h3>Descripción</h3>
                <textarea
                    onChange={handleDescriptionChange}
                    name="description"
                    value={description}
                />
            </div>
        </BoxLayout>
    )
}

export { TitleAndDescription }