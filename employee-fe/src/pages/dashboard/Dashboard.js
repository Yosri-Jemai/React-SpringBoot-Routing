import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Col, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/Employees");
                const data = await response.json();
                setEmployees(data);
            }catch(err){
                console.log(err.message);
            }
        }
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/deleteEmployee/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    // remove from state
                    setEmployees(employees.filter((emp) => emp.id !== id));
                } else {
                    console.error("Failed to delete employee");
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    const handleUpdate = (id) => {
        if (window.confirm("Are you sure you want to update employee?")) {
            navigate(`/employee/${id}`)
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Department</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Button variant="outline-secondary" className="me-2" onClick={() => handleUpdate(employee.id)}>Update</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Dashboard;