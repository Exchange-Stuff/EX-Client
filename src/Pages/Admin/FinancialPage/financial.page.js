import React from "react";
import Header from "../../../Components/Header/Header";
import "./financial.page.css";
import { FinancialList } from "../../../Components/Financial/financialList.component";

export const FinancialPage = () => {
  return (
    <div className="financial-page">
      <h1>Financial Ticket</h1>
      <FinancialList />
    </div>
  );
};

export default FinancialPage;
