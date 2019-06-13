import React from 'react'
import { compose } from 'redux';
import { Home } from './index'
import { generateRows, paginate, Paginator } from '../../components/helpers'


const schema = {
	type: 'object',
	properties: {
		id: {
			type: 'string'
		},
		status: {
			type: 'string'
		},
		amount: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		country: {
			type: 'string'
		},
		submitted: {
			type: 'string'
		},
		company: {
			type: 'string'
		},

	}
}

const rows = generateRows(100, schema)// initial rows

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})

const columns = [
	{
		property: 'status',
		header: {
			label: 'status'
		},
		cell: {
			formatters: [
				status => <i className={status + ' icon-status'}></i>
			],
			props: {
				style: {
					width: 15
				}
			}
		}
	},
	{
		property: 'amount',
		header: {
			label: 'amount'
		},
		cell: {
			formatters: [
				amount => formatter.format(amount)
			]
		},
		props: {
			style: {
				textAlign: 'right',
				width: 50
			}
		}
	},
	{
		property: 'name',
		header: {
			label: 'beneficiary'
		}
	},
	{
		property: 'company',
		header: {
			label: 'company'
		}
	},
	{
		property: 'submitted',
		header: {
			label: 'submited'
		}
	},
];

class homeController extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			searchColumn: 'all',
			query: {}, // Search query
			columns,
			rows,
			pagination: { // initial pagination settings
				page: 1,
				perPage: 10
			}
		};
		this.onSelect = this.onSelect.bind(this);
		this.onPerPage = this.onPerPage.bind(this);
		this.goToLastPage = this.goToLastPage.bind(this);
		this.goToFirstPage = this.goToFirstPage.bind(this);
		this.goToPage = this.goToPage.bind(this);
	}

	render() {
		const { rows, columns, pagination } = this.state;
		const paginated = compose(
			paginate(pagination)
		)(rows);

		const childComp = <Paginator
		pagination={pagination}
		pages={paginated.amount}
		perPage={pagination.perPage}
		onSelect={this.onSelect}
		onPerPage={this.onPerPage}
		goToLastPage={this.goToLastPage}
		goToFirstPage={this.goToFirstPage}
		goToPage={this.goToPage}
	/>
		return (
			<div>
				<Home
					columns={columns}
					rows={rows}
					paginated={paginated}
					paginator={childComp}
				/>
			</div>
		)
	}
	goToLastPage() {
		const state = this.state;
		const pagination = state.pagination || {};
		const pages = Math.ceil(state.rows.length / pagination.perPage);
		this.onSelect(pages);
	}
	goToPage(page){
		if(page) this.onSelect(page);
	}
	goToFirstPage() {
		this.onSelect(1);
	}
	onSelect(page) {
		const pages = Math.ceil(
			this.state.rows.length / this.state.pagination.perPage
		);
		this.setState({
			pagination: {
				...this.state.pagination,
				page: Math.min(Math.max(page, 1), pages)
			}
		});
	}
	onPerPage(value) {
		this.setState({
			pagination: {
				...this.state.pagination,
				perPage: parseInt(value, 10)
			}
		});
	}
}


export default homeController;