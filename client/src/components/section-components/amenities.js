import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Amenities = (props) => {
  const { property, userId, reload } = props;

  var nf = new Intl.NumberFormat();

  return (
    <>
      <div className="main mr-4">
        <table className="price-table">
          <tbody>
            <tr>
              <td className="price-blank"></td>
              <td className="price-blank"></td>
              <td className="price-blank"></td>
            </tr>

            <tr>
              <td></td>
              <td className="price"></td>
            </tr>
            <tr>
              <td>
                <a href="#wordpress-asset-updates" className="price-table-help">
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Sites
              </td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>
                <a href="#wordpress-core-updates" className="price-table-help">
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Data Retention
              </td>
              <td>30 Days</td>
              <td>90 Days</td>
              <td>180 Days</td>
            </tr>
            <tr>
              <td>
                <a
                  href="#wordpress-security-monitoring"
                  className="price-table-help"
                >
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Chart Annotations
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="#wordpress-uptime-monitoring"
                  className="price-table-help"
                >
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Uptime Monitoring
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="#wordpress-malware-cleanup"
                  className="price-table-help"
                >
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Weekly Reports
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="#wordpress-security-audit"
                  className="price-table-help"
                >
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Security Audit
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="#wordpress-security-audit"
                  className="price-table-help"
                >
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                On-Demand Audit
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="#wordpress-priority-support"
                  className="price-table-help"
                >
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Priority Support
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-times"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#wordpress-billing" className="price-table-help">
                  <i className="far fa-fw fa-question-circle"></i>
                </a>{" "}
                Easy Billing + No Contracts
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
              <td>
                <i className="fas fa-check"></i>
              </td>
            </tr>
            {/* <tr>
              <td></td>
              <td className="price">
                <a href="#">Get started</a>
              </td>
              <td className="price">
                <a href="#">Get started</a>
              </td>
              <td className="price">
                <a href="#">Get started</a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Amenities;
