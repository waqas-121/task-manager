import React, { useState } from 'react';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleYesClick = () => {
    // Handle 'Yes' button click
    console.log('Yes button clicked');
    // Perform any desired action here
    // Close the modal
    setShowModal(false);
  };

  const handleCloseClick = () => {
    // Handle 'Close' button click
    console.log('Close button clicked');
    // Perform any desired action here
    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {/* Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="btn-close" onClick={handleCloseClick} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseClick}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleYesClick}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
