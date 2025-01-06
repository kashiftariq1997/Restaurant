import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function CommonModal({ open, setOpen, children }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%)",
            width: "fit-content",
            "@media (max-width:600px)": {
              width: "90%",
            },
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            // p: 2,
            borderRadius: "10px",
          }}
        >
          <button
            className="absolute right-4 top-4 text-2xl text-primary"
            onClick={handleClose}
          >
            <AiOutlineCloseCircle />
          </button>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
