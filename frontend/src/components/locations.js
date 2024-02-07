import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import axios from "axios";


function Locations() {


    const [locations, setLocations] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [lId, setlId] = useState('');
    const { register, handleSubmit } = useForm();

    const getLocations = () => {
        fetch("http://localhost:7000/locations/all").then((res) => {
            return res.json();
        })
            .then((data) => {
                console.log(data);
                setLocations(data);
            })
    }

    useEffect(() => {
        getLocations();
    }, []);

    const handleEdit = (lId) => {
        setlId(lId);
        setShowEditModal(true);
    }

    const handleDelete = (lId) => {
        setlId(lId);
        setShowDeleteModal(true);
    }

    const handleClose = () => {
        const searchInput = document.getElementById('search');
        if(!searchInput.value){
            getLocations();
        }
        const form = document.getElementById('update_form');
        form?.reset();
        setShowEditModal(false);
        setShowDeleteModal(false);
    }

    const [updateMessage, setUpdateMessage] = useState('');

    const updateLocationDetails = (data) => {
        console.log(data);
        const location = locations.find((x) => x.Id === lId);
        if (!data.city) {
            data.city = location.City;
        }
        if (!data.state) {
            data.state = location.State;
        }
        if (!data.locationType) {
            data.locationType = location.LocationType;
        }

        const res = axios.put("http://localhost:7000/locations/" + lId, data).then((response) => setUpdateMessage(response.data));

        const form = document.getElementById('update_form');
        form.submit();
        form.reset();

        setTimeout(() => {
            setUpdateMessage('');
        }, 2500);
    }

    const [deleteMsg, setDeleteMsg] = useState('');
    const deleteLocation = () => {
        axios.delete("http://localhost:7000/locations/" + lId)
            .then(() => setDeleteMsg('Deleted successfully!'));

        const form = document.getElementById('delete_form');
        form.submit();
        form.reset();

        setTimeout(() => {
            setDeleteMsg('');
        }, 2500);
    }

    const searchFilter = (searchVal) => {
        if (searchVal === "") { getLocations(); return; }
        const filterBySearch = locations.filter((item) => {
            if (item.City.toLowerCase()
                .includes(searchVal.toLowerCase()) || item.State.toLowerCase()
                .includes(searchVal.toLowerCase())) { return item; }
        })

        setLocations(filterBySearch);
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5>Locations Page</h5>
                        <table className="table table-borderless table-hover table-responsive">
                        <tr>
                        <td>
                        <div className="d-grid d-md flex justify-content-md-start mb-3">
                            <input id="search" type="text" onChange={(e)=>searchFilter(e.target.value)} placeholder="Search" className="form-control"/>
                        </div>
                        </td>
                        <td>
                        <div className="d-grid d-md flex justify-content-md-end mb-3">
                            <Link to="/addLocation" className="btn btn-success">Add Location</Link>
                        </div>
                        </td>
                        </tr>
                        </table>

                        {locations.length > 0 ? (<table className="table table-bordered table-hover table-responsive">
                            <thead className="table-primary">
                                <tr>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Location Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {locations.map((location, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{location.City}</td>
                                            <td>{location.State}</td>
                                            <td>{location.LocationType}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Button onClick={() => handleEdit(location.Id)} className="btn btn-success mx-2">Edit</Button>
                                                    <Button onClick={() => handleDelete(location.Id)} className="btn btn-danger">Delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>) : (<><br/><br/><div class="h-50 vw-50 d-flex align-items-center justify-content-center p-1 text-primary-emphasis rounded-3">No Locations to show!</div></>)}
                        {showEditModal && (
                            <Modal show={handleEdit} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update "{locations.find((x) => x.Id === lId).City}" Location Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="text-success">{updateMessage}</p>
                                    <form id="update_form" onSubmit={handleSubmit(updateLocationDetails)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">City<span className="text-danger">*</span></label>
                                                    <input type="text" {...register("city")} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">State<span className="text-danger">*</span></label>
                                                    <input type="text" {...register("state")} className="form-control" />
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
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <Button className="mx-2" variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button type="button" onClick={handleSubmit(updateLocationDetails)} variant="primary">
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
                                    <Modal.Title>Delete "{locations.find((x) => x.Id === lId)?.City}"?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="text-success">{deleteMsg}</p>
                                    <form id="delete_form" onSubmit={handleSubmit(deleteLocation)}>
                                        <p className="text-danger">Are you sure you want to delete "{locations.find((x) => x.Id === lId)?.City}"?</p>
                                        <div className="btn-group">
                                            <Button variant="secondary" className="mx-2 pull-left" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button type="button" className="mx-2 pull-right" onClick={handleSubmit(deleteLocation)} variant="primary">
                                                Delete
                                            </Button>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Locations;