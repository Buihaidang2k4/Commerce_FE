// services/reportService.js
import apiBase from "./apiBase";

const reportService = {
    exportOrderReportPDF: (orderId) =>
        apiBase.post(
            `/report/report-order-pdf/${orderId}`,
            {},
            { responseType: "blob" }
        ),
};

export default reportService;
