"use client";
import React from "react";
import { motion } from "framer-motion";
const FinancePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div>FinancePage</div>
    </motion.div>
  );
};

export default FinancePage;
