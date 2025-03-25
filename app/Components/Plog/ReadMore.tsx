"use client"; 

import { Typography } from "@mui/material";
import React, { useState } from "react";

const ReadMore = ({ fullContent }: { fullContent: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Typography component="p" sx={{ textAlign: "justify", color: "text.primary", lineHeight: 1.7 }}>
      {fullContent.length <= 600 ? (
        fullContent
      ) : (
        <>
          {expanded ? fullContent : fullContent.substring(0, 600) + "... "}
          <Typography
            component="span"
            sx={{ color: "#3d5afe", cursor: "pointer", fontWeight: "bold", marginLeft: "5px" }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read less" : "Read more"}
          </Typography>
        </>
      )}
    </Typography>
  );
};

export default ReadMore;
