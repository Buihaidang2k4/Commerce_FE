import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Tiêu đề */}
      <Skeleton variant="text" width="50%" height={36} animation="wave" sx={{ mb: 2 }} />

      {/* Khối hình ảnh + spinner overlay */}
      <Box
        sx={{
          position: "relative",
          my: 2,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={220} animation="wave" />

        {/* Spinner đơn sắc */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 48,
            height: 48,
            border: "4px solid rgba(0,0,0,0.1)",
            borderTop: "4px solid #3b82f6", // xanh dương chủ đạo
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            boxShadow: "0 0 12px rgba(59,130,246,0.6)", // glow nhẹ
          }}
        />
      </Box>

      {/* Text skeleton */}
      <Skeleton variant="text" width="90%" animation="wave" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" animation="wave" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="95%" animation="wave" />

      {/* Keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}