import React, { useState, useEffect } from 'react';
export function Terms() {

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-p-5">
          <span className="tw-text-xl">Terms & Conditions</span>
        </div>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4">
          <div></div>
          <div className="tw-col-span-2 tw-bg-white tw-p-3 tw-rounded-md">
            <p>By proceeding with reporting your issue, you agree that you hold Property Management Tracker,
              LLC harmless of the outcomes of having your issue addressed.</p>
            <p>
              This reported issue is between you and your property manager/management company.
              You understand that Property Management tracker is only an informational service to communicate your concerns to your property manager and
              is not involved in the actual solutions/ actions of addressing your issues.
            </p>
            <p>
              You also agree that this is not an emergency situation involving immediate health risk to you or others or there is no imminent
              threat of danger involving flood, electrical or any other hazardous conditions.
            </p>
            Thank you. PM Tracker.
          </div>
          <div></div>
        </div>
      </div >
    </div >
  );
}
