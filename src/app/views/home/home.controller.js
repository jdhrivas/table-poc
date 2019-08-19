import React from 'react'
import { compose } from 'redux';
import { Home } from './index'
import { generateRows, paginate, Paginator, VisibilityToggles } from '../../components/helpers'
import { cloneDeep } from 'lodash';
import * as dnd from 'reactabular-dnd';
// import * as resolve from 'table-resolver';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import * as resizable from 'reactabular-resizable';
import uuid from 'uuid';

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
class homeController extends React.Component {

	constructor(props) {
		super(props)


		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2
		})

		const resizableFormatter = resizable.column({
			onDragStart: (width, { column }) => {
			  console.log('drag start', width, column);
			},
			onDrag: (width, { column }) => {
			  this.resizableHelper.update({
				 column,
				 width
			  });
			},
			onDragEnd: (width, { column }) => {
			  console.log('drag end', width, column);
			}
		 });
		
		const columns = [
			{
				property: 'status',
				header: {
					label: 'status',
					props: {
						label: 'status',
						onMove: o => this.onMoveColumn(o)
					},
					formatters: [
					  resizableFormatter
					]
				},
				props: {
					style: {
					  width: 15
					}
				 },
				cell: {
					formatters: [
						status => <i className={status + ' icon-status'}></i>
					]
				},
				visible: true
			},
			{
				property: 'amount',
				header: {
					label: 'amount',
					props: {
						label: 'amount',
						onMove: o => this.onMoveColumn(o)
					},
					formatters: [
					  resizableFormatter
					]
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
				},
				visible: true
			},
			{
				property: 'name',
				header: {
					label: 'beneficiary',
					props: {
						label: 'beneficiary',
						onMove: o => this.onMoveColumn(o)
					},
					formatters: [
					  resizableFormatter
					]
				},
				props: {
					style: {
						width: 175
					}
				},
				visible: true
			},
			{
				property: 'company',
				header: {
					label: 'company',
					props: {
						label: 'company',
						onMove: o => this.onMoveColumn(o)
					},
					formatters: [
					  resizableFormatter
					]
				},
				props: {
					style: {
						width: 175
					}
				},
				visible: true
			},
			{
				property: 'submitted',
				header: {
					label: 'submited',
					props: {
						label: 'submited',
						onMove: o => this.onMoveColumn(o)
					},
					formatters: [
					  resizableFormatter
					]
				},
				props: {
					style: {
						width: 100
					}
				},
				visible: true
			},
		];

		

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
		this.onToggleColumn = this.onToggleColumn.bind(this);
		this.onMoveColumn = this.onMoveColumn.bind(this);
		this.tableHeader = null;
		this.tableBody = null;
	}

	componentWillMount() {
		this.resizableHelper = resizable.helper({
		  globalId: uuid.v4(),
		  getId: ({ property}) => property
		});
  
		// Patch the column definition with class names.
		this.setState({
		  columns: this.resizableHelper.initialize(this.state.columns)
		});
	 }
	 componentWillUnmount() {
		this.resizableHelper.cleanup();
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
		const toggle = <VisibilityToggles
			columns={columns}
			onToggleColumn={this.onToggleColumn}
		/>
		const renderers = {
			header: {
			  cell: dnd.Header
			}
		 };
		return (
			<div>
				<DndProvider backend={HTML5Backend}>
				<Home
					renderers={renderers}
					columns={columns}
					rows={rows}
					paginated={paginated}
					paginator={childComp}
					toggle={toggle}
					tableHeader= {this.tableHeader}
					tableBody={this.tableBody}
				/>
				</DndProvider>
			</div>
		)
	}
	onMoveColumn(labels) {
		const movedColumns = dnd.moveLabels(this.state.columns, labels);

		if (movedColumns) {
			// Retain widths to avoid flashing while drag and dropping.
			const source = movedColumns.source;
			const target = movedColumns.target;
			const sourceWidth = source.props.style && source.props.style.width;
			const targetWidth = target.props.style && target.props.style.width;

			source.props.style = {
				...source.props.style,
				width: targetWidth
			};
			target.props.style = {
				...target.props.style,
				width: sourceWidth
			};

			this.setState({
				columns: movedColumns.columns
			});
		}
	}
	onToggleColumn({ columnIndex }) {
		const columns = cloneDeep(this.state.columns);
		columns[columnIndex].visible = !columns[columnIndex].visible;
		console.log('new state', columns)
		this.setState({ columns });
	}
	goToLastPage() {
		const state = this.state;
		const pagination = state.pagination || {};
		const pages = Math.ceil(state.rows.length / pagination.perPage);
		this.onSelect(pages);
	}
	goToPage(page) {
		if (page) this.onSelect(page);
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