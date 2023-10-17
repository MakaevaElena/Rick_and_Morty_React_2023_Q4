import React from 'react';

export default class Pagination extends React.Component {
  render() {
    return (
      <>
        <div className="pagination">
          <div className="prev">prev</div>
          <div className="next">next</div>
        </div>
      </>
    );
  }
}
