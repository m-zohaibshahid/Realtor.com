import React, { Component } from "react";
import NetworError from "../components/networks/NetworError";
// import NetworkError from "./NetworkError";
// import AddProperty from "../components/section-components/add-property";
export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false,
    };

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener("online", this.handleConnectionChange);
      window.addEventListener("offline", this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener("online", this.handleConnectionChange);
      window.removeEventListener("offline", this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        const webPing = setInterval(() => {
          fetch("//google.com", {
            mode: "no-cors",
          })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing);
              });
            })
            .catch(() => this.setState({ isDisconnected: true }));
        }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    };

    render() {
      const { isDisconnected } = this.state;
      return (
        <>
          <div>
            {isDisconnected && (
              <div className="navbar-top">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      Please check your internet connection...
                      <div className="msin">
                        <div className="cont_principal">
                          <div className="cont_error">
                            <h1>Oops</h1>
                            <p>Network connection is lost</p>
                          </div>
                          <div className="cont_aura_1"></div>
                          <div className="cont_aura_2"></div>
                        </div>
                      </div>
                      {/* <NetworError /> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ComposedComponent {...this.props} />
          </div>
          {/* <AddProperty {...this.props.isDisconnected} /> */}
        </>
      );
    }
  }

  return NetworkDetector;
}
