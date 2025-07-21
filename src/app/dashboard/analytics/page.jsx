"use client";
import React from "react";
import { motion } from "framer-motion";

const AnalyticsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div>AnalyticsPage</div>
    </motion.div>
  );
};

export default AnalyticsPage;
