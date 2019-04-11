import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	FormGroup,
	Label,
	Col,
	Input,
	Form,
	Progress,
} from 'reactstrap';
import history from '../../utils/history';
import useCustomer from '../../Hooks/useCustomer';

const UserEdit = ({ match }) => {
	const { isLoad, userData } = useCustomer(match.params.id);
	return (
		<div>
			<Card>
				{isLoad ? (
					<CardBody>
						<Progress animated value={100} />
					</CardBody>
				) : (
					<div>
						<CardHeader>
							<Button
								style={{ marginRight: '20px' }}
								onClick={() => history.goBack()}
							>
								<i className="fa fa-arrow-left" />
							</Button>
							{userData.fullname}
						</CardHeader>
						<CardBody>
							<div>
								<Form>
									<h3 style={{ marginBottom: '10px' }}>ข้อมูลส่วนตัว</h3>
									<FormGroup row>
										<Label sm={2}>ID</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.id}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ชื่อ-นามสกุล</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.fullname}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>เบอร์โทร</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.telno}
											/>
										</Col>
									</FormGroup>
								</Form>
								<h3 style={{ marginBottom: '10px' }}>ข้อมูลธนาคาร</h3>
								<Form>
									<FormGroup row>
										<Label sm={2}>ธนาคาร</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank.bank_name}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ชื่อบัญชี</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank.bank_account_name}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>หมายเลขบัญชี</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank.bank_no}
											/>
										</Col>
									</FormGroup>
								</Form>
							</div>
						</CardBody>
					</div>
				)}
				<CardFooter>
					<Button color="primary" style={{ float: 'Left' }}>
						<i className="fa fa-floppy-o" /> บันทึกการแก้ไขข้อมูล
					</Button>
					<Button color="danger" style={{ float: 'Right' }}>
						<i className="fa fa-trash-o" /> ลบข้อมูลลูกค้า
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default UserEdit;
