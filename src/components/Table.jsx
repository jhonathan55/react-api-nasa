import React, { useState, useEffect } from "react";
import Button from "./Button";
import Swal from "sweetalert2";
const Table = ({ productsData, searchTerm, onUpdateProduct}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = filteredData ? Math.ceil(filteredData?.length / itemsPerPage) : 0;

    useEffect(() => {
        setData(productsData);
        if (searchTerm === "" || !productsData) {
            setFilteredData(productsData);
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = productsData.filter(item =>
                item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.price.toLowerCase().includes(lowerCaseSearchTerm)
            );
            setFilteredData(filtered);
        }
    }, [productsData, searchTerm]);
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        setCurrentPage(newPage);
    };
    const onUpdate = (item) => {
        console.log(item, "update item");
        onUpdateProduct(true, { ...item });
    }
    const onDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/product/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log(data);
            setFilteredData(filteredData.filter(item => item.id !== id));

        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Deseas eliminar el colaborador?',
            text: "Eliminaras permanentemente este colaborador!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id);
            }
        })
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                {/* <th>ID</th> */}
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.length === 0 && searchTerm !== "" ? (
                    <tr key={1}>
                        <td colSpan="2" className="text-center">
                            No se encontraron coincidencias
                        </td>
                    </tr>
                ) : (
                    filteredData
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item, index) => (
                            <tr key={item.id}>
                                {/* <td>{item.id}</td> */}
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button type='warning' icon="edit" onClick={(e) => onUpdate(item)} />
                                    <Button type='danger' icon="delete" onClick={(e) => handleDelete(item.id)} />
                                </td>
                            </tr>
                        ))
                )}
            </tbody>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(1)}
                        >
                            First
                        </button>
                    </li>
                    <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                {currentPage - 1}
                            </button>
                        </li>
                    )}
                    <li className="page-item active">
                        <button className="page-link" onClick={() => handlePageChange(currentPage)}>
                            {currentPage}
                        </button>
                    </li>
                    {currentPage < totalPages && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                {currentPage + 1}
                            </button>
                        </li>
                    )}
                    <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                    <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(totalPages)}
                        >
                            Last
                        </button>
                    </li>
                </ul>
            </nav>
        </table>
    )
}

export default Table;