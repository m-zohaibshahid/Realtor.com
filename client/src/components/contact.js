import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header2";
import ContactForm from "./section-components/contact-form";
import Footer from "./global-components/footer-v2";

const ContactPage = () => {
	return (
		<div>
			<Navbar />
			{/* <PageHeader headerimg="assets/img/contact.jpg" /> */}
			<ContactForm />
			<Footer />
		</div>
	);
};

export default ContactPage;
