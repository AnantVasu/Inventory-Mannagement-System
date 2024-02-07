import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import axios from "axios";


function Products() {

    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pID, setPID] = useState(0);
    const { register, handleSubmit } = useForm();


    const getProducts = () => {
        fetch("http://localhost:7000/products/all").then((res) => {
            return res.json();
        })
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleEdit = (id) => {
        setPID(id);
        setShowEditModal(true);
    }

    const handleDelete = (id) => {
        setPID(id);
        setShowDeleteModal(true);
    }

    const handleClose = () => {
        const searchInput = document.getElementById('search');
        if (!searchInput.value) {
            getProducts();
        }
        const form = document.getElementById('update_form');
        form?.reset();
        setShowEditModal(false);
        setShowDeleteModal(false);
    }

    const [updateMessage, setUpdateMessage] = useState('');

    const updateProductDetails = (data) => {
        console.log(data);
        const product = products.find((x) => x.ID === pID);
        if (!data.productName) {
            data.productName = product.ProductName;
        }
        if (!data.category) {
            data.category = product.Category;
        }
        if (!data.quantity) {
            data.quantity = product.Quantity;
        }
        if (!data.currentLocation) {
            data.currentLocation = product.CurrentLocation;
        }
        if (!data.status) {
            data.status = product.Status;
        }
        if (!data.price) {
            data.price = product.Price;
        }

        axios.put("http://localhost:7000/products/" + pID, data).then((response) => setUpdateMessage(response.data));

        const form = document.getElementById('update_form');
        form.submit();
        form.reset();

        setTimeout(() => {
            setUpdateMessage('');
        }, 2500);
    }

    const [deleteMsg, setDeleteMsg] = useState('');
    const deleteProduct = () => {
        axios.delete("http://localhost:7000/products/" + pID)
            .then(() => setDeleteMsg('Deleted successfully!'));

        const form = document.getElementById('delete_form');
        form.submit();
        form.reset();

        setTimeout(() => {
            setDeleteMsg('');
        }, 2500);
    }

    const searchFilter = (searchVal) => {
        if (searchVal === "") { getProducts(); return; }
        const filterBySearch = products.filter((item) => {
            if (item.ProductName.toLowerCase()
                .includes(searchVal.toLowerCase()) || item.Category.toLowerCase()
                    .includes(searchVal.toLowerCase())) { return item; }
        })

        setProducts(filterBySearch);
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5>Products Page</h5>
                        <table className="table table-borderless table-hover table-responsive">
                            <tr>
                                <td>
                                    <div className="d-grid d-md flex justify-content-md-start mb-3">
                                        <input id='search' type="text" onChange={(e) => searchFilter(e.target.value)} placeholder="Search" className="form-control" />
                                    </div>
                                </td>
                                <td>
                                    <div className="d-grid d-md flex justify-content-md-end mb-3">
                                        <Link to="/addProduct" className="btn btn-success">Add Product</Link>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        {products.length > 0 ? (<table className="table table-bordered table-hover table-responsive">
                            <thead className="table-primary">
                                <tr>
                                    <th>SNo.</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Current Location</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((product, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{product.ID}</td>
                                            <td>{product.ProductName}</td>
                                            <td>{product.Category}</td>
                                            <td>{product.Quantity}</td>
                                            <td>{product.CurrentLocation}</td>
                                            <td>{product.Status}</td>
                                            <td>{product.Price}</td>
                                            <td>{product.Value}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Button onClick={() => handleEdit(product.ID)} className="btn btn-success mx-2">Edit</Button>
                                                    <Button onClick={() => handleDelete(product.ID)} className="btn btn-danger">Delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>) : (<><br /><br /><div class="h-50 vw-50 d-flex align-items-center justify-content-center p-1 text-primary-emphasis rounded-3">No Products to show!</div></>)}
                        {showEditModal && (
                            <Modal show={handleEdit} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update "{products.find((x) => x.ID === pID).ProductName}" Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="text-success">{updateMessage}</p>
                                    <form id="update_form" onSubmit={handleSubmit(updateProductDetails)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Product Name<span className="text-danger">*</span></label>
                                                    <input type="text" {...register("productName")} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Category<span className="text-danger">*</span></label>
                                                    <input type="text" {...register("category")} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Quantity<span className="text-danger">*</span></label>
                                                    <input type="number" {...register("quantity")} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Current Location<span className="text-danger">*</span></label>
                                                    <input type="text" {...register("currentLocation")} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Status<span className="text-danger">*</span></label>
                                                    <select {...register("status")} className="form-control" >
                                                        <option value="" className="disabled">--Please Select--</option>
                                                        <option value="In Stock">In Stock</option>
                                                        <option value="In Transit">In Transit</option>
                                                        <option value="Awaiting Health Check">Awaiting Health Check</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Price<span className="text-danger">*</span></label>
                                                    <input type="number" {...register("price")} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <Button className="mx-2" variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button type="button" onClick={handleSubmit(updateProductDetails)} variant="primary">
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                        )}
                        {showDeleteModal && (
                            <Modal show={handleDelete} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete "{products.find((x) => x.ID === pID).ProductName}"?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="text-success">{deleteMsg}</p>
                                    <form id="delete_form" onSubmit={handleSubmit(deleteProduct)}>
                                        <p className="text-danger">Are you sure you want to delete "{products.find((x) => x.ID === pID).ProductName}"?</p>
                                        <div className="btn-group">
                                            <Button variant="secondary" className="mx-2 pull-left" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button type="button" className="mx-2 pull-right" onClick={handleSubmit(deleteProduct)} variant="primary">
                                                Delete
                                            </Button>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        )}
                        {/* {showEditModal && (<UpdateProduct handleEdit={handleEdit} handleClose={handleClose}/>)} */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;