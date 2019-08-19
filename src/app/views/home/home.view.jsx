import React from 'react'
import * as Table from 'reactabular-table';
import Metrics from './home.metrics'
import Toolbar from './home.toolbar'
import * as Sticky from 'reactabular-sticky';


const Home = (props) =>
  <div className="row main">
    <div className="col">
      <div className="row page-title">
        <div className="col-12">
          <h3 className="text-center">E-Billing Management</h3>
        </div>
      </div>
      <Metrics ></Metrics>
      <Toolbar toggle={props.toggle} ></Toolbar>
      <div className="row page-content">
        <div className="col-12">
          <Table.Provider
            renderers={props.renderers}
            className="table table-striped"
            
            columns={props.columns.filter(column => column.visible)}>
            <Table.Header className="" />
            <Table.Body rows={props.paginated.rows} rowKey="id" />
          </Table.Provider>
          {props.paginator}
        </div>
      </div>
    </div>
  </div>
export default Home;