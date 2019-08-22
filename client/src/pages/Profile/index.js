import React, { Component } from 'react';
import {
    Container, Row, Col, Card,
    CardBody, CardTitle, Button,
    CardImg, Form, Input, InputGroup,
    InputGroupAddon, ModalHeader, ModalBody,
    Modal, ModalFooter
} from 'reactstrap';
import Navbar from '../../components/Navbar';
import logo from '../../images/orangelady.jpeg';
import './profile.css';
import NotesForm from '../../components/profile/profileForm';
import UpdateForm from '../../components/profile/updateProfile';
import API from '../../utils/API';




class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            role: "",
            city: "",
            state: "",
            phoneNumber: "",
            linkedin: "",
            projects: [],
            skills: [],
            newSkill: "",
            modal: false,

            name: "",
            userName: "",
            profId: ""
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        API.getUsr().then((res) => {
            if (res.data.user) {
                const user = res.data.user;
                const fullName = user.firstName + " " + user.lastName;
                this.setState({
                    email: user.email,
                    city: user.city,
                    userName: user.userName,
                    name: fullName,
                    state: user.stateProvince,
                    loggedIn: true,
                })
            }
        });
        API.getProfileData(this.props.match.params.usrname)
            .then((res) => {
                console.log("data from prof collection");
                console.log(res);
                console.log(this);
                this.setState({
                    projects: res.data.projects,
                    skills: res.data.dev_skills,
                    profId: res.data._id,
                    role: res.data.role,
                    phoneNumber: res.data.ph,
                    linkedin: res.data.linkedin
                });
            })

    }

    toggle() {
        console.log("In toggle");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    };

    addskill = event => {
        event.preventDefault();
        let skills = this.state.skills;
        skills.push(this.state.newSkill);
        this.setState({
            skills: skills,
            newSkill: ""
        });
        API.updateDevProfile(this.state.profId, { dev_skills: this.state.skills })
            .then(function (res) {
                console.log(res);
            });
        console.log(this.state);
    }

    updateProfile = () => {
        console.log("updating profile");
        let data = {};
        data.role = this.state.role;
        data.ph = this.state.phoneNumber;
        data.linkedin = this.state.linkedin;
        API.updateDevProfile(this.state.profId, data)
            .then(function (res) {
                console.log(res);
            });
    }

    render() {

        return (
            <>
                <Navbar />
                <Container>

                    <Row>
                        <Col-md-6>

                            <Col className="profileColumn">
                                <Card className="card-props" style={{ width: '100%' }}>
                                    <Row>
                                        <Col id="columnDetail">
                                            <CardImg className="profileImage" variant="top" src={logo} />
                                        </Col>
                                        <Col id="columnDetail" className="topTitle">
                                            <CardTitle><h3 className="mr-2">{this.state.userName}</h3></CardTitle>
                                            <CardTitle><h3 className="mr-2">{this.state.name}</h3></CardTitle>
                                        </Col>

                                    </Row><hr />
                                    <Button className="float-right" onClick={this.toggle}>Update</Button>

                                    <CardBody style={{ paddingTop: '2rem' }}>
                                        <p>Email: {this.state.email} </p>
                                        <p>Role: {this.state.role} </p>
                                    </CardBody>
                                    <CardTitle><h5 id="profileHeader">Location</h5></CardTitle>
                                    <CardBody>
                                        <p>City: {this.state.city} </p>
                                        <p>State: {this.state.state} </p>
                                    </CardBody>
                                    <CardTitle><h5 id="profileHeader">Personal Information</h5></CardTitle>
                                    <CardBody>
                                        <p>Phone Number: {this.state.phoneNumber} </p>
                                        <p>LinkedIn Profile: <a href={this.state.linkedin} style={{ color: "yellow" }}>LinkedIn Url</a> </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Col-md-6>

                        <Col-md-6>
                            <Row>
                                <Col className="profileColumn">
                                    <Card className="m-0 card-props" style={{ width: '100%' }}>
                                        <CardBody>
                                            <CardTitle><h4>Projects</h4><hr /></CardTitle>
                                            <ul style={{ 'list-style-type': 'square' }}>
                                                {this.state.projects.map(proj => {
                                                    return (
                                                        <li>
                                                            {proj}
                                                        </li>
                                                    );
                                                })
                                                }
                                            </ul>
                                            <a href="/createProject">
                                                <Button color="primary" className="float-right">Create New</Button>
                                            </a>

                                        </CardBody>
                                    </Card></Col>

                                <Col className="profileColumn">
                                    <Card className="m-0 card-props" style={{ width: '100%' }}>
                                        <CardBody>
                                            <CardTitle><h4>Notes</h4><hr /></CardTitle>
                                            <Container className="notesWindow">
                                            </Container>
                                            <NotesForm />
                                        </CardBody>
                                    </Card></Col>
                            </Row>

                            <Row>
                                <Col className="profileColumn">
                                    <Card style={{ width: '100%' }} className="card-props">
                                        <CardBody>
                                            <CardTitle><h4>Skills</h4><hr /></CardTitle>
                                            <ul style={{ 'list-style-type': 'square' }}>
                                                {this.state.skills.map(skill => {
                                                    return (
                                                        <li>
                                                            {skill}
                                                            {/* <Button className="float-right">X</Button> */}
                                                        </li>
                                                    );
                                                })
                                                }
                                            </ul>
                                            {/* <Button color="primary" className="float-right">Edit</Button> */}
                                            <Form>
                                                <InputGroup>
                                                    <Input
                                                        placeholder="Add new skill"
                                                        name="newSkill"
                                                        value={this.state.newSkill}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                            onClick={this.addskill}
                                                        >
                                                            Add
                                </Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Form>
                                        </CardBody>
                                    </Card></Col>
                            </Row>
                        </Col-md-6>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <UpdateForm data={this.state} handleInputChange={this.handleInputChange} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => {
                                this.toggle();
                                this.updateProfile(this.props.id);
                            }}>Update</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

            </>

        );
    }
}

export default Profile;
