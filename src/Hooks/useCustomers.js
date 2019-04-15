import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import history from '../utils/history';
const swal = withReactContent(Swal);
const useCustomers = limit => {
	const [isLoad, setLoad] = useState(true);
	const [customerList, setCustomerList] = useState([]);
	const [filter, setFilter] = useState('');
	const [order, setOrder] = useState('');
	const [toggleAsc, setToggleAsc] = useState(true);
	const [page, setPage] = useState(1);

	const deleteUser = async id => {
		const prompt = await swal.fire({
			titleText: 'ยืนยันการลยข้อมูลลูกค้า',
			text: `ทำการลบข้อมูลแบบ soft delete  ${id}`,
			showCancelButton: true,
		});
		if (prompt) {
			try {
				const { data: response } = await axios.delete(
					`/api/v1/customers?id=${id}`,
				);
				if (response.data.status === true) {
					await swal.fire('Result', 'ลบผู้ใช้เสร็จสมบูรณ์', 'info');
					history.go('/customers');
				}
			} catch (error) {
				console.log(error);
				await swal.fire('Error', 'กรุณาลองใหม่อีกครั้งครับ', 'error');
				history.go('/customers');
			}
		}
	};

	useEffect(() => {
		let url = `/api/v1/customers?page=${page}&limit=${limit}`;
		setLoad(true);
		setCustomerList([]);
		if (filter.length > 0) {
			url += `&filter=${JSON.stringify({
				fullname: filter,
			})}&options=like`;
		}

		if (order.length > 0) {
			const orderValue = toggleAsc ? -1 : 1;
			if (orderValue === -1) {
				url += `&orderby=${JSON.stringify({ order: orderValue })}`;
			}
		}
		axios.get(url).then(({ data }) => {
			const { data: responseData } = data;
			setLoad(false);
			setCustomerList(responseData.customers);
		});
	}, [page, filter, order, toggleAsc]);

	return {
		isLoad,
		customerList,
		setFilter,
		filter,
		setOrder,
		setToggleAsc,
		toggleAsc,
		order,
		page,
		setPage,
		deleteUser,
	};
};

export default useCustomers;
