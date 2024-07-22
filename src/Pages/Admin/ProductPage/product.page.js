import React from 'react';
import {ProductList} from '../../../Components/ProductAdmin/ListProduct/productList.component';
import './product.page.css';

export default function ProductPage() {
	return (
		<div className="product-page">
			<h1
				style={{
					color: 'orange',
				}}
			>
				Quản lí sản phẩm
			</h1>
			<ProductList />
		</div>
	);
}
