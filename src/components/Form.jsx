import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, onUpdateProduct, isUpdating, productToUpdate}) => {
    const [product, setProduct] = useState({
        id:'',name: '',price: ''
    });
    const [inputClasses, setInputClasses] = useState({
        name: "form-control",price: "form-control"
    });
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    // cargamos el form
    useEffect(() => {
        if (isUpdating && productToUpdate) {
            setProduct({
                id: productToUpdate.id,
                name: productToUpdate.name,
                price: productToUpdate.price
            });
            setIsUpdateMode(true);
            setInputClasses({
                name: "form-control is-valid",
                price: "form-control is-valid"
            });

        }
    }, [isUpdating, productToUpdate]);
    const handleSubmit =  (e) => {
        e.preventDefault();
        if (isUpdateMode) {
            onUpdateProduct(product);
            console.log("update", product);
            setIsUpdateMode(false);
        }
        else {
             onSubmit(product);
            if (product.name.trim() === "" || product.price.trim() === "") {
                setInputClasses({
                    name: product.name.trim() === "" ? "form-control is-invalid" : "form-control is-valid",
                    price: product.price.trim() === "" ? "form-control is-invalid" : "form-control is-valid"
                });
                return;
            }
        }
        setProduct({
            name: '',price: ''
        });
        setInputClasses({
            name: "form-control",price: "form-control"
        });

    }
    
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.id]: e.target.value
        })
        setInputClasses({
            ...inputClasses,
            [e.target.id]: e.target.value.trim() === "" ? "form-control is-invalid" : "form-control is-valid"
        });
       
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className={inputClasses.name} id="name" value={product.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label for="price" className="form-label">Price</label>
                <input type="text" className={inputClasses.price} id="price" value={product.price} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" >  {isUpdateMode ? "Actualizar" : "Guardar"}</button>
        </form>
    )
}

export default Form;