import React from 'react'
const Metrics = (props) => 
	<div className="row metrics">
	<div className="col-3">
	  <div className="tile">
		 <div className="tile-title">Pending E-bills</div>
		 <div className="text-center tile-content">
			 <i className="tile-icon far fa-hourglass"></i>
			 <h4> 124 </h4>
			 <div className="tile-amount">
				 325,005 USD
			 </div>
		 </div>
	  </div>
	</div>
	<div className="col-9">
	  <div className="row">
		 <div className="col-6">
			<div className="tile">
			  <div className="tile-title">Clients</div>
			</div>
		 </div>
		 <div className="col-6">
			<div className="tile">
			  <div className="tile-title"> Account Aging</div>
			</div>
		 </div>
	  </div>
	</div>
 </div>
export default Metrics;