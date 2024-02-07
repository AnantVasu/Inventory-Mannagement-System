import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [postMessage, setPostMessage] = useState('');
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);

    const getLocations = () => {
        fetch("http://localhost:7000/locations/all").then((res) => {
            return res.json();
        })
            .then((data) => {
                console.log(data);
                setLocations(data);
            })
    }

    useEffect(()=>{
        getLocations();
    },[]); useEffect(()=>{

    })

    const onSubmit = (data) => {
        console.log(data);

        const res = axios.post("http://localhost:7000/products/addProduct", data).then(response=>{setPostMessage(response.data);});

        if(!postMessage){
            setPostMessage(res.data);
            setTimeout(()=> {
                navigate('/products');
            }, 2000);
        } else {
            setPostMessage("Some Error Occured!");
            console.log("Some Error occured!");
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5>Add Product Page</h5>
                        <p className="text-success">{postMessage}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Product Name<span className="text-danger">*</span></label>
                                        <input type="text" {...register("productName", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.productName?.type === "required" && "Product Name is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Category<span className="text-danger">*</span></label>
                                        <input type="text" {...register("category", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.category?.type === "required" && "Category is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Quantity<span className="text-danger">*</span></label>
                                        <input type="number" {...register("quantity", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.quantity?.type === "required" && "Quantity is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Current Location<span className="text-danger">*</span></label>
                                        <select {...register("currentLocation", { required: true })} className="form-control">
                                            <option value="" className="disabled">--Please Select--</option>
                                            {locations.map((location,idx)=>{
                                                return (
                                                    <option value={location.City} className="disabled">{location.City}</option>
                                                );
                                            })}
                                        </select>
                                        <span className="text-danger">
                                            {errors.currentLocation?.type === "required" && "Current Location is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Status<span className="text-danger">*</span></label>
                                        <select {...register("status", { required: true })} className="form-control">
                                            <option value="" className="disabled">--Please Select--</option>
                                            <option value="In Stock">In Stock</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="Awaiting Health Check">Awaiting Health Check</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.status?.type === "required" && "Status is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Price<span className="text-danger">*</span></label>
                                        <input type="number" {...register("price", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.price?.type === "required" && "Price is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label"></label>
                                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;