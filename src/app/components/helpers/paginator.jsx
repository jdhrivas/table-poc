import React from 'react';
import Pagify from 'react-pagify';
import segmentize from 'segmentize';

const paginator = ({ pagination, pages, onSelect, onPerPage, perPage, goToLastPage, goToFirstPage, goToPage }) => (
	
	<Pagify.Context
		className="pagify-pagination"
		segments={segmentize({
			page: pagination.page,
			pages,
			beginPages: 3,
			endPages: 3,
			sidePages: 2
		})}
		onSelect={onSelect}
	>


		{/* <Pagify.Segment field="beginPages" />

		<Pagify.Ellipsis
			className="ellipsis"
			previousField="beginPages"
			nextField="previousPages"
		/>

		<Pagify.Segment field="previousPages" />
		<Pagify.Segment field="centerPage" className="selected" />
		<Pagify.Segment field="nextPages" />

		<Pagify.Ellipsis
			className="ellipsis"
			previousField="nextPages"
			nextField="endPages"
		/>

		<Pagify.Segment field="endPages" /> */}



		<div className="table-footer row">
			<div className="col-4">
				<form className="form-inline">
					<div className="input-group">
						<label>
							<select className="custom-select items-per-page" defaultValue={perPage} onChange={e => onPerPage(e.target.value)}>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="25">25</option>
								<option value="50">50</option>
							</select>
							<label className="d-none d-md-block"> per page</label>
						</label>
					</div>
				</form>
			</div>
			<div className="col-lg-4 text-center table-viewing d-none d-md-block">
				<label>{pagination.page * perPage} of {pages * perPage}</label>
			</div>
			<div className="col-lg-4">
				<nav aria-label="Page navigation" className="table-pagination nav justify-content-end">
					<ul className="pagination pagination-circle pg-blue">
						<li className="page-item">
							<button className="btn btn-paginator" type="button" onClick={goToFirstPage} disabled={pagination.page > 1 ? 0 : 1}>
								<span aria-hidden="true">&laquo;</span>
								<span className="sr-only">First</span>
							</button>
						</li>
						<li className="page-item ">
							<Pagify.Button page={pagination.page - 1}>
								<button className="btn btn-paginator" type="button"  aria-label="Previous" disabled={pagination.page > 1 ? 0 : 1}>
									<span aria-hidden="true">&lsaquo;</span>
									<span className="sr-only">Previous</span>
								</button>
							</Pagify.Button>
						</li>
						<li className="page-item active">
							<form className="form-inline" onSubmit={e => { e.preventDefault(); }} >
								<div className="form-check form-check-inline">
									<input className="form-check-input form-control page-input" type="number" max={pages} id="inlineCheckbox1" onChange={e => goToPage(e.target.value)} value={pagination.page} />
									<label className="form-check-label">of {pages}</label>
								</div>
							</form>
						</li>
						<li className="page-item">
							<Pagify.Button page={pagination.page + 1}>
								<button className="btn btn-paginator" aria-label="Next" disabled={pagination.page === pages}>
									<span aria-hidden="true">&rsaquo;</span>
									<span className="sr-only">Next</span>
								</button>
							</Pagify.Button>

						</li>
						<li className="page-item">
							<button className="btn btn-paginator" onClick={goToLastPage} disabled={pagination.page === pages}>
								<span aria-hidden="true">&raquo;</span>
								<span className="sr-only">Last</span>
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</Pagify.Context>
)
export default paginator;