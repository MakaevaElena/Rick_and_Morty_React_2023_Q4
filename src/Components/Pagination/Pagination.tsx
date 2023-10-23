import React from 'react';

export default class Pagination extends React.Component {
  render() {
    return (
      <>
        <h2>Pagination</h2>
        <div className="pagination">
          <div className="prev">prev</div>
          <div className="next">next</div>
        </div>
      </>
    );
  }
}
