// src/pages/TermsAndConditions.jsx
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Terms and Conditions</h1>
      <p>Welcome to <strong>KNOT & LOVE</strong>. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using the website.</p>

      <h2 className="text-lg font-semibold mt-4">User Eligibility</h2>
      <ul className="list-disc pl-6">
        <li>You must be at least 13 years old or have parental consent to use the website.</li>
        <li>By registering, you confirm that all information provided is accurate and up to date.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">Product Information and Display</h2>
      <ul className="list-disc pl-6">
        <li>We strive to provide clear and accurate descriptions and images of all handmade products.</li>
        <li>Users can access high-resolution images and zoom features to view products clearly.</li>
        <li>Product colours may vary slightly due to device display settings.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">Orders and Payments</h2>
      <ul className="list-disc pl-6">
        <li>By placing an order, you agree to pay the listed price, including applicable taxes and shipping fees.</li>
        <li>We accept payments through credit/debit cards, digital wallets, etc.</li>
        <li>Orders are subject to availability. We reserve the right to cancel any order and issue a full refund.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">Shipping and Delivery</h2>
      <ul className="list-disc pl-6">
        <li>Shipping timelines and charges will be specified during checkout.</li>
        <li>We are not responsible for delays caused by external factors (e.g., weather, courier issues).</li>
        <li>Users will receive tracking information once the product is shipped.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">Returns, Refunds, and Cancellations</h2>
      <ul className="list-disc pl-6">
        <li><strong>Returns:</strong> Users can return products within 7 days of delivery if the product is defective or significantly different from the description.</li>
        <li><strong>Refunds:</strong> Refunds will be processed within 2 business days once the returned product is received and inspected.</li>
        <li><strong>Cancellations:</strong> Orders can only be cancelled before shipment.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">User Accounts and Security</h2>
      <ul className="list-disc pl-6">
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>Notify us immediately of any unauthorized account activity.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">Intellectual Property</h2>
      <ul className="list-disc pl-6">
        <li>All content, including images, product descriptions, logos, and website design, is the intellectual property of KNOT & LOVE.</li>
        <li>You may not copy, reproduce, or distribute any content without permission.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">Privacy Policy</h2>
      <p>Your personal information is handled according to our Privacy Policy, which outlines data collection, storage, and usage practices.</p>
    </div>
  );
};

export default TermsAndConditions;
