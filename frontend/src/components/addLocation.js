import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddLocation() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [postMessage, setPostMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        const res = axios.post("http://localhost:7000/locations/addLocation", data).then(response=>{setPostMessage(response.data);});

        if(!postMessage){
            setPostMessage(res.data);
            setTimeout(()=> {
                navigate('/locations');
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
                        <h5>Add Location Page</h5>
                        <p className="text-success">{postMessage}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">City<span className="text-danger">*</span></label>
                                        <input type="text" {...register("city", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.city?.type === "required" && "City is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">State<span className="text-danger">*</span></label>
                                        <input type="text" {...register("state", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.state?.type === "required" && "State is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Location Type<span className="text-danger">*</span></label>
                                        <select {...register("locationType", { required: true })} className="form-control">
                                            <option value="" className="disabled">--Please Select--</option>
                                            <option value="Showroom">Showroom</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Service center">Service center</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.locationType?.type === "required" && "Location Type is required"}
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

export default AddLocation;