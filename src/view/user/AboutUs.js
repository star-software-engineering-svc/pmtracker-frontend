import React, { useState, useEffect } from 'react';
export function AboutUs() {

  return (
    <div className="tw-container tw-mx-auto" style={{ maxWidth: '1024px' }}>
      <div className="tw-flex tw-flex-row tw-flex-wrap">
        <div className="tw-p-3 tw-w-full md:tw-w-2/3">
          <h2>About Us</h2>
          <h3>Meet Property Management Tracker</h3>
          <p><img src="https://pm-tracker.com/images/photo.jpg" align="right" />If you want to streamline communications with your property manager, <strong>Property Management Tracker</strong> can help."PM Tracker" is a third party subscription service for co-ops, condos, and private building owners that will receive, document, and track building issues.Requests, comments, and complaints can now be tracked from start to finish.</p>
          <h3>How do we work?</h3>
          <p>Every online request or phone call is assigned with a ticket number. The complaint is now on record. The property manager can respond to the issue and the resident/tenant. Every step of the process is documented and able to be tracked.</p>
          <p>The board of directors of the property can view the progress of these issues anytime. With PM-Tracker in place, there is now streamlined communication and accountability between resident/tenant and property manager.</p>
          <h4 className="tw-text-center">Keep track of property management-related requests, questions, complaints, repairs, and more.</h4>
          <div className="box tw-m-3 tw-p-2" style={{ border: '1px solid #9f9f9f' }}>
            <p align="center"><a target="_blank" href="pdfs/bod1.pdf"><img src="https://pm-tracker.com/images/pmtracker redbutton.jpg" className="img-responsive" /></a></p>
            <p align="center">Click on the links below to learn more!</p>
            <ul>
              <li className="tw-text-lg">
                <a className="tw-text-red-500" target="_blank" href="pdfs/bod1.pdf">Board Members</a>, make sure the job gets done!
              </li>
              <li className="tw-text-lg">
                <a className="tw-text-red-500" target="_blank" href="images/how-it-works.png">Learn</a> How the Property Management Tracker works.
              </li>
              <li className="tw-text-lg">
                <a className="tw-text-red-500" target="_blank" href="pdfs/owners1.pdf">Owners</a>, stay on top of tenant requests!
              </li>
            </ul>
          </div>
          <h3>Who are we?</h3>
          <p>Our founders have a working knowledge of residential co-ops and condos as well as software development. This system has been developed keeping the needs of the tenant at heart as the founders reside in co-ops and condos themselves.</p>
          <p>For Property Managers or Board of Directors, you may reach us here: info@pm-tracker.com, or call us at: 844-PM-TRACK (844-768-7225) press option 2 for our offices.</p>
        </div>
        <div className="tw-p-3 tw-w-full md:tw-w-1/3 tw-bg-blue-100">
          <h3>See us on <a href="https://www.youtube.com/watch?v=DrAzhH1kL_k" target="_blank">
            <img src="https://pm-tracker.com/images/youtube2.png" align="absmiddle" style={{ display: 'inline' }} /></a>
          </h3>
          <ul style={{ paddingLeft: 0 }}>
            <li style={{ fontWeight: 'strong', fontSize: '16px' }}>
              <a className="tw-text-blue-500" href="https://www.youtube.com/watch?v=DrAzhH1kL_k" target="_blank"><strong>Take a look at our online demos</strong></a>
            </li>
            <li>
              <a className="tw-text-red-500" target="_blank" href="https://www.youtube.com/watch?v=CnbyXse_czc"><strong>Board Members/Building Owners</strong> click here!</a>
            </li>
            <li>
              <a className="tw-text-red-500" target="_blank" href="https://www.youtube.com/watch?v=P4REkxyHpf4"><strong>Tenants</strong> click here!</a>
            </li>
            <li>
              <a className="tw-text-red-500" target="_blank" href="https://www.youtube.com/watch?v=mbfiqdFdIWE"><strong>Property Managers</strong> click here!</a>
            </li>
            <li>
              <a className="tw-text-red-500" target="_blank" href="https://www.youtube.com/watch?v=DrAzhH1kL_k"><strong>Who are we in a nutshell</strong></a>
            </li>
          </ul>
          <img src="https://pm-tracker.com/images/conf_booth.png" className="img-responsive" />
          <p style={{ fontSize: '12px' }}><em>Our team at the "Cooperator Expo in New York City</em></p>
          <h4>Use Property Management Tracker to follow residents':</h4>
          <ul>
            <li>Repair requests</li>
            <li>Common area concerns</li>
            <li>Billing questions</li>
            <li>Concerns</li>
            <li>Cleanliness issues</li>
            <li>Appointment requests</li>
            <li>Pest control issues</li>
            <li>Security concerns</li>
            <li>Equipment problems</li>
          </ul>
          <p>... any other resident concerns or problems.</p>
        </div>
      </div>
    </div >
  );
}
