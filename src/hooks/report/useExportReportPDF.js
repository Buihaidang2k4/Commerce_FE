import { useMutation } from "@tanstack/react-query";
import reportService from "../../services/reportService";

export default function useExportOrderPdf() {
  return useMutation({
    mutationFn: (orderId) => reportService.exportOrderReportPDF(orderId),
  });
}