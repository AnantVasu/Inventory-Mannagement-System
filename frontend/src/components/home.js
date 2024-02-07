import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

function Home() {
    const text = '5';
    const [dashBoardData, setDashBoardData] = useState({});
    const getDashBoardData = () => {
        fetch("http://localhost:7000/").then((res) => {
            return res.json();
        })
            .then((data) => {
                console.log(data);
                setDashBoardData(data);
            })
    }

    useEffect(()=>{
        getDashBoardData();
    }, []);

    return (
        <div className="mx-5">
            <h1>Products</h1>
            <div className="row">
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >Total Products</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[0]?.totalProducts}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >Total Store Value</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >${dashBoardData[1]?.totalStoreValue}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >Out of Stock</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[2]?.outOfStockCount}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >All Categories</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[3]?.allCategories}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>


            <h1>Locations</h1>
            <div className="row">
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >Total Locations</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[4]?.totalLocations}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >Cities</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[5]?.totalCities}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >States</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[6]?.totalStates}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 my-4">
                    <Card style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><p className="h3 text-center" >Location Types</p></Card.Title>
                            <Card.Text>
                                <p className="h1 text-center" >{dashBoardData[7]?.totalLocationTypes}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>

    );
}

export default Home;