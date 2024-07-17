import React from 'react';
import './financial.page.css';
import {FinancialList} from '../../../Components/Financial/financialList.component';

export const FinancialPage = () => {
	return (
		<div className="financial-page">
			<h1 class="financial-page-title">Quản lý tài chính</h1>
			<FinancialList />
		</div>
	);
};

export default FinancialPage;
